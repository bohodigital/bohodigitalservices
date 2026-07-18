import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const { chromium } = await import(
  process.env.QA_PLAYWRIGHT_CORE_URL ?? "playwright-core"
);

const baseUrl = (process.env.BOHO_QA_BASE_URL ?? "http://127.0.0.1:4173")
  .replace(/\/+$/, "");
const baseOrigin = new URL(baseUrl).origin;
const accessToken = process.env.BOHO_QA_ACCESS_TOKEN
  ?? process.env.QA_SITES_BYPASS_TOKEN;
const authenticatedContext = accessToken
  ? {
      extraHTTPHeaders: {
        "OAI-Sites-Authorization": `Bearer ${accessToken}`,
      },
    }
  : {};
const outputDir = process.env.BOHO_QA_OUTPUT_DIR
  ?? new URL(
    "../artifacts/CR-2026-07-18-BOHO-INDUSTRIES-REBOOT-001/headless/",
    import.meta.url,
  ).pathname.replace(/^\/(.:)/, "$1");

const industryRoutes = [
  "/industries/",
  "/industries/home-improvement-contractors/",
  "/industries/local-service-businesses/",
  "/industries/brick-and-mortar-retail-hospitality/",
  "/industries/online-retail-ecommerce/",
  "/industries/professional-b2b-services/",
];

const childRoutes = industryRoutes.slice(1);

const scenarios = [
  { name: "desktop-1440", viewport: { width: 1440, height: 1000 } },
  { name: "tablet-900", viewport: { width: 900, height: 1100 } },
  {
    name: "mobile-390",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  },
  // A 720 CSS-pixel viewport represents a 1440-pixel layout at 200% zoom.
  { name: "zoom-200", viewport: { width: 720, height: 900 } },
];

const expectedChapterIds = [
  "project-businesses",
  "local-services",
  "retail-hospitality",
  "ecommerce",
  "professional-b2b",
];

const expectedSelectorLabels = [
  "Estimate a project",
  "Book or request service",
  "Visit or reserve",
  "Buy a product",
  "Start a qualified conversation",
];

const expectedTableHeaders = [
  "Customer path",
  "Customer needs to know",
  "Trust usually comes from",
  "Valuable action",
];

const allowedAnalyticsEvents = new Set([
  "industry_selector_click",
  "industry_page_click",
  "industry_pricing_click",
  "industry_evidence_click",
  "industry_review_start",
  "industry_review_complete",
]);

const allowedAnalyticsAttributes = new Set([
  "data-umami-event",
  "data-umami-event-business_model",
  "data-umami-event-source_section",
  "data-umami-event-destination_type",
  "data-umami-event-cta_label",
]);

const allowedBusinessModels = new Set([
  "project-business",
  "local-service",
  "retail-hospitality",
  "ecommerce",
  "professional-b2b",
  "hybrid",
]);

const businessModelPrefills = [
  {
    query: "business_model=project-business",
    label: "project-business",
    expected: "High-value project business",
  },
  {
    query: "business_model=local-service",
    label: "local-service",
    expected: "Local service business",
  },
  {
    query: "business_model=retail-hospitality",
    label: "retail-hospitality",
    expected: "Retail, hospitality, food, or venue",
  },
  {
    query: "business_model=ecommerce",
    label: "ecommerce",
    expected: "Ecommerce or product business",
  },
  {
    query: "business_model=professional-b2b",
    label: "professional-b2b",
    expected: "Professional or B2B service",
  },
  {
    query: "business_model=hybrid",
    label: "hybrid",
    expected: "Hybrid business",
  },
  {
    query: "business_model=unknown-model",
    label: "unknown",
    expected: "",
  },
  {
    query: "business_model=ecommerce&business_model=hybrid",
    label: "repeated",
    expected: "",
  },
];

await mkdir(outputDir, { recursive: true });

const report = {
  baseUrl,
  outputDir,
  generatedAt: new Date().toISOString(),
  strictlyHeadless: true,
  routeCount: industryRoutes.length,
  scenarioCount: scenarios.length,
  checkedPages: industryRoutes.length * scenarios.length,
  scenarios: {},
  formPrefill: [],
  screenshots: [],
  transientRetries: [],
  failures: [],
  failureCount: 0,
};

function routeUrl(pathname, search = "") {
  const url = new URL(pathname, `${baseUrl}/`);
  url.search = search;
  return url.href;
}

function sameOrigin(url) {
  try {
    return new URL(url).origin === baseOrigin;
  } catch {
    return false;
  }
}

async function keepQaLocal(scope) {
  await scope.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (
      url.origin === baseOrigin
      || url.hostname === "localhost"
      || url.hostname === "127.0.0.1"
    ) {
      await route.continue();
    } else {
      await route.abort();
    }
  });
}

function addPageDiagnostics(page) {
  const diagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedLocalRequests: [],
    badLocalResponses: [],
  };

  page.on("pageerror", (error) => diagnostics.pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // External analytics and Turnstile requests are deliberately blocked so
    // this headless audit never leaks traffic off the target host.
    if (message.text().includes("Failed to load resource: net::ERR_FAILED")) return;
    diagnostics.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "failed";
    if (sameOrigin(request.url()) && errorText !== "net::ERR_ABORTED") {
      diagnostics.failedLocalRequests.push(
        `${request.url()} (${errorText})`,
      );
    }
  });
  page.on("response", (response) => {
    if (sameOrigin(response.url()) && response.status() >= 400) {
      diagnostics.badLocalResponses.push(
        `${response.status()} ${response.url()}`,
      );
    }
  });

  return diagnostics;
}

async function settleLazyAssets(page) {
  await page.evaluate(async () => {
    const height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
    const step = Math.max(300, Math.floor(window.innerHeight * 0.75));

    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 20));
    }

    await Promise.race([
      Promise.allSettled(
        [...document.images].map((image) => image.decode?.()),
      ),
      new Promise((resolve) => window.setTimeout(resolve, 1_000)),
    ]);

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    await new Promise((resolve) =>
      window.requestAnimationFrame(() => resolve())
    );
  });
  await page.waitForTimeout(120);
}

async function loadRouteWithRetry(context, pathname, label) {
  const transientRetries = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const page = await context.newPage();
    const diagnostics = addPageDiagnostics(page);
    let response = null;

    try {
      response = await page.goto(routeUrl(pathname), {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
      if ((response?.status() ?? 0) >= 500) {
        throw new Error(`document returned ${response?.status()}`);
      }
      await page.locator("main").waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(220);
      await settleLazyAssets(page);

      if (
        diagnostics.badLocalResponses.some((item) => /^5\d\d\b/.test(item))
      ) {
        throw new Error("a same-origin asset returned a 5xx response");
      }

      return {
        attemptCount: attempt,
        diagnostics,
        exception: null,
        page,
        response,
        transientRetries,
      };
    } catch (error) {
      const exception = error instanceof Error ? error.message : String(error);
      const hasFiveXx = (response?.status() ?? 0) >= 500
        || diagnostics.badLocalResponses.some((item) => /^5\d\d\b/.test(item));

      if (hasFiveXx && attempt < 3) {
        transientRetries.push({
          attempt,
          documentStatus: response?.status() ?? null,
          diagnostics,
          exception,
        });
        await page.close();
        await new Promise((resolve) => setTimeout(resolve, attempt * 350));
        continue;
      }

      return {
        attemptCount: attempt,
        diagnostics,
        exception,
        page,
        response,
        transientRetries,
      };
    }
  }

  throw new Error(`unreachable route retry state for ${label}`);
}

async function collectUniversalMetrics(page) {
  return page.evaluate(({ eventNames, attributeNames, modelNames }) => {
    const parseTimeList = (value) => value.split(",").map((part) => {
      const trimmed = part.trim();
      if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed) / 1_000;
      if (trimmed.endsWith("s")) return Number.parseFloat(trimmed);
      return Number.parseFloat(trimmed) || 0;
    });
    const maximum = (values) => Math.max(0, ...values);

    const localBrokenImages = [...document.images]
      .filter((image) => {
        const resolved = new URL(
          image.currentSrc || image.src,
          window.location.href,
        );
        return resolved.origin === window.location.origin
          && image.complete
          && image.naturalWidth === 0;
      })
      .map((image) => image.currentSrc || image.src);

    const robots = [...document.querySelectorAll('meta[name="robots" i]')]
      .map((meta) => meta.getAttribute("content") ?? "");

    const analyticsNodes = [
      ...document.querySelectorAll("main [data-umami-event]"),
    ];
    const analytics = analyticsNodes.map((element) => {
      const attributes = Object.fromEntries(
        element.getAttributeNames()
          .filter((name) => name.startsWith("data-umami-event"))
          .map((name) => [name, element.getAttribute(name) ?? ""]),
      );
      return {
        tagName: element.tagName.toLowerCase(),
        text: element.textContent?.replace(/\s+/g, " ").trim() ?? "",
        attributes,
      };
    });
    const analyticsViolations = [];

    for (const entry of analytics) {
      const event = entry.attributes["data-umami-event"];
      if (!eventNames.includes(event)) {
        analyticsViolations.push(`unsupported event ${JSON.stringify(event)}`);
      }

      for (const [name, value] of Object.entries(entry.attributes)) {
        if (!attributeNames.includes(name)) {
          analyticsViolations.push(`unsupported attribute ${name}`);
        }
        if (
          /(?:^|[?&])(email|name|phone|website|businessType|message|budget)=/i
            .test(value)
          || /businessType/i.test(value)
        ) {
          analyticsViolations.push(
            `query or form key leaked through ${name}`,
          );
        }
      }

      const businessModel = entry.attributes[
        "data-umami-event-business_model"
      ];
      if (businessModel && !modelNames.includes(businessModel)) {
        analyticsViolations.push(
          `unsupported business model ${JSON.stringify(businessModel)}`,
        );
      }
    }

    const motionViolations = [];
    for (const element of document.querySelectorAll("main, main *")) {
      const style = getComputedStyle(element);
      const animationSeconds = maximum(parseTimeList(style.animationDuration));
      const transitionSeconds = maximum(parseTimeList(style.transitionDuration));
      const iterationCounts = style.animationIterationCount
        .split(",")
        .map((value) => value.trim() === "infinite"
          ? Number.POSITIVE_INFINITY
          : Number.parseFloat(value) || 0);
      const iterationCount = maximum(iterationCounts);

      if (
        animationSeconds > 0.001
        || transitionSeconds > 0.001
        || iterationCount > 1
      ) {
        motionViolations.push({
          tagName: element.tagName.toLowerCase(),
          className: typeof element.className === "string"
            ? element.className
            : "",
          animationSeconds,
          transitionSeconds,
          iterationCount,
        });
      }
    }

    const main = document.querySelector("main");
    const mainText = main?.innerText.replace(/\s+/g, " ").trim() ?? "";
    return {
      h1Count: document.querySelectorAll("h1").length,
      mainCount: document.querySelectorAll("main").length,
      mainClassName: main?.className ?? "",
      documentOverflow:
        document.documentElement.scrollWidth
        - document.documentElement.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      localBrokenImages,
      robots,
      noindex: robots.some((value) => /noindex/i.test(value)),
      definitionTriggerCount:
        document.querySelectorAll("main .definition-term__trigger").length,
      sectionSidebarCount:
        document.querySelectorAll("main .section-sidebar").length,
      reducedMotionMatches:
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      motionViolations,
      analyticsCount: analytics.length,
      analytics,
      analyticsViolations,
      mainWordCount: mainText ? mainText.split(" ").length : 0,
      figureCount: main?.querySelectorAll("figure.industry-figure").length ?? 0,
      eagerHeroImageCount:
        main?.querySelectorAll('.industry-detail-hero img[loading="eager"]').length
        ?? 0,
      industryFaqCount:
        main?.querySelectorAll(".industry-detail-faq details.faq-item").length
        ?? 0,
      evidenceRecordCount:
        main?.querySelectorAll(".industry-detail-evidence__record").length
        ?? 0,
    };
  }, {
    eventNames: [...allowedAnalyticsEvents],
    attributeNames: [...allowedAnalyticsAttributes],
    modelNames: [...allowedBusinessModels],
  });
}

async function collectHubAudit(page) {
  return page.evaluate(({ chapterIds, selectorLabels, tableHeaders }) => {
    const clean = (value) => value?.replace(/\s+/g, " ").trim() ?? "";
    const selectorLinks = [
      ...document.querySelectorAll(
        "#customer-paths .customer-path-selector__routes a[href]",
      ),
    ];
    const table = document.querySelector(".industry-comparison table");

    return {
      title: document.title,
      metaDescription:
        document.querySelector('meta[name="description"]')?.getAttribute("content")
        ?? "",
      headline: clean(document.querySelector("main h1")?.textContent),
      hubMainCount: document.querySelectorAll("main.industries-page").length,
      selectorSectionCount: document.querySelectorAll("#customer-paths").length,
      selectorListCount: document.querySelectorAll(
        "#customer-paths .customer-path-selector__routes",
      ).length,
      selectorLinks: selectorLinks.map((link) => ({
        href: link.getAttribute("href") ?? "",
        hash: new URL(link.href, window.location.href).hash,
        label: clean(link.querySelector("strong")?.textContent),
      })),
      expectedSelectorHashes: chapterIds.map((id) => `#${id}`),
      expectedSelectorLabels: selectorLabels,
      comparisonTableCount:
        document.querySelectorAll(".industry-comparison table").length,
      comparisonHeaders: table
        ? [...table.querySelectorAll("thead th")].map((cell) => clean(cell.textContent))
        : [],
      expectedComparisonHeaders: tableHeaders,
      comparisonRowCount: table?.querySelectorAll("tbody tr").length ?? 0,
      chapterCounts: chapterIds.map((id) => ({
        id,
        count: document.querySelectorAll(`#${CSS.escape(id)}`).length,
      })),
      pricingSectionCount: document.querySelectorAll(
        ".industries-pricing h2#industries-pricing-title",
      ).length,
      faqContainerCount:
        document.querySelectorAll(".industries-final__faq").length,
      faqCount:
        document.querySelectorAll(
          ".industries-final__faq details.faq-item",
        ).length,
      heroActionCount:
        document.querySelectorAll(".industries-hero .industries-actions a").length,
      heroActionsInViewport: [
        ...document.querySelectorAll(".industries-hero .industries-actions a"),
      ].filter((link) => {
        const rect = link.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
      }).length,
    };
  }, {
    chapterIds: expectedChapterIds,
    selectorLabels: expectedSelectorLabels,
    tableHeaders: expectedTableHeaders,
  });
}

function compareArrays(actual, expected) {
  return actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);
}

function hubAuditErrors(audit) {
  const errors = [];
  if (audit.title !== "Website & SEO Services by Industry | Boho Digital Services") {
    errors.push(`unexpected title: ${JSON.stringify(audit.title)}`);
  }
  if (
    audit.metaDescription
    !== "See how Boho adapts websites, SEO, reporting, provider rescue, and digital systems for contractors, local services, retail, ecommerce, and professional firms."
  ) {
    errors.push(`unexpected meta description: ${JSON.stringify(audit.metaDescription)}`);
  }
  if (audit.headline !== "Build around the way your customers actually decide.") {
    errors.push(`unexpected hub h1: ${JSON.stringify(audit.headline)}`);
  }
  if (audit.hubMainCount !== 1) {
    errors.push(`expected one main.industries-page; found ${audit.hubMainCount}`);
  }
  if (audit.selectorSectionCount !== 1 || audit.selectorListCount !== 1) {
    errors.push(
      `expected one customer-path selector; found section=${audit.selectorSectionCount}, list=${audit.selectorListCount}`,
    );
  }
  const hashes = audit.selectorLinks.map((link) => link.hash);
  const labels = audit.selectorLinks.map((link) => link.label);
  if (!compareArrays(hashes, audit.expectedSelectorHashes)) {
    errors.push(`unexpected selector hashes: ${JSON.stringify(hashes)}`);
  }
  if (!compareArrays(labels, audit.expectedSelectorLabels)) {
    errors.push(`unexpected selector labels: ${JSON.stringify(labels)}`);
  }
  if (audit.comparisonTableCount !== 1) {
    errors.push(
      `expected one semantic comparison table; found ${audit.comparisonTableCount}`,
    );
  }
  if (!compareArrays(audit.comparisonHeaders, audit.expectedComparisonHeaders)) {
    errors.push(
      `unexpected comparison headers: ${JSON.stringify(audit.comparisonHeaders)}`,
    );
  }
  if (audit.comparisonRowCount !== 5) {
    errors.push(`expected five comparison rows; found ${audit.comparisonRowCount}`);
  }
  for (const chapter of audit.chapterCounts) {
    if (chapter.count !== 1) {
      errors.push(`expected one #${chapter.id}; found ${chapter.count}`);
    }
  }
  if (audit.pricingSectionCount !== 1) {
    errors.push(
      `expected one Industries pricing section; found ${audit.pricingSectionCount}`,
    );
  }
  if (audit.faqContainerCount !== 1 || audit.faqCount < 1) {
    errors.push(
      `expected populated Industries FAQ; found container=${audit.faqContainerCount}, details=${audit.faqCount}`,
    );
  }
  if (audit.heroActionCount !== 2) {
    errors.push(`expected two hub hero actions; found ${audit.heroActionCount}`);
  }
  return errors;
}

async function auditFaqKeyboard(page, pathname) {
  const selector = pathname === "/industries/"
    ? ".industries-final__faq details.faq-item"
    : "main.industry-detail details.faq-item";
  const disclosures = page.locator(selector);
  const count = await disclosures.count();
  const result = { selector, count, tested: false, errors: [] };

  if (count < 1) {
    result.errors.push("no FAQ disclosure found");
    return result;
  }

  const disclosure = disclosures.first();
  const summary = disclosure.locator("summary").first();
  if ((await summary.count()) !== 1 || !(await summary.isVisible())) {
    result.errors.push("first FAQ summary is missing or not visible");
    return result;
  }

  const initialOpen = await disclosure.evaluate((element) => element.open);
  await disclosure.evaluate((element) => {
    element.open = false;
  });
  await summary.scrollIntoViewIfNeeded();
  await summary.focus();
  const focused = await summary.evaluate(
    (element) => document.activeElement === element,
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(40);
  const openedByEnter = await disclosure.evaluate((element) => element.open);
  await disclosure.evaluate((element, open) => {
    element.open = open;
  }, initialOpen);

  result.tested = true;
  result.focused = focused;
  result.openedByEnter = openedByEnter;
  if (!focused) result.errors.push("keyboard focus did not reach FAQ summary");
  if (!openedByEnter) result.errors.push("Enter did not open FAQ disclosure");
  return result;
}

async function captureScreenshots(page, pathname, scenarioName) {
  const captures = [];

  async function captureViewport(filename) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    await page.waitForTimeout(40);
    const path = join(outputDir, filename);
    await page.screenshot({
      path,
      fullPage: false,
      animations: "disabled",
      caret: "hide",
    });
    captures.push({ filename, path, type: "viewport" });
  }

  async function captureElement(selector, filename) {
    const locator = page.locator(selector);
    await locator.waitFor({ state: "visible", timeout: 10_000 });
    const path = join(outputDir, filename);
    await locator.screenshot({
      path,
      animations: "disabled",
      caret: "hide",
      // Element screenshots stitch tall sections while the production header is
      // sticky. Hide fixed/sticky chrome only for these isolated review plates
      // so it cannot be repeated through or obscure the captured section.
      style: ".site-header, .skip-link { visibility: hidden !important; }",
    });
    captures.push({ filename, path, type: "element", selector });
  }

  if (pathname === "/industries/" && scenarioName === "desktop-1440") {
    await captureViewport("desktop-1440-industries-hub-top.png");
    for (const [index, id] of expectedChapterIds.entries()) {
      await captureElement(
        `#${id}`,
        `desktop-1440-hub-chapter-${String(index + 1).padStart(2, "0")}-${id}.png`,
      );
    }
    await captureElement(
      ".industries-pricing",
      "desktop-1440-industries-pricing.png",
    );
  }

  if (pathname === "/industries/" && scenarioName === "mobile-390") {
    await captureViewport("mobile-390-industries-hub.png");
  }

  if (pathname === childRoutes[0] && scenarioName === "desktop-1440") {
    await captureViewport("desktop-1440-representative-industry-child.png");
    await captureElement(
      ".industry-detail-guide",
      "desktop-1440-representative-child-field-guide.png",
    );
    await captureElement(
      ".industry-detail-services",
      "desktop-1440-representative-child-service-routes.png",
    );
  }

  return captures;
}

function addUniversalErrors(metrics, errors) {
  if (metrics.h1Count !== 1) errors.push(`expected one h1; found ${metrics.h1Count}`);
  if (metrics.mainCount !== 1) errors.push(`expected one main; found ${metrics.mainCount}`);
  if (metrics.documentOverflow > 1 || metrics.bodyOverflow > 1) {
    errors.push(
      `horizontal overflow document=${metrics.documentOverflow}px body=${metrics.bodyOverflow}px`,
    );
  }
  if (metrics.localBrokenImages.length) {
    errors.push(`broken local images: ${metrics.localBrokenImages.join(", ")}`);
  }
  if (metrics.noindex) {
    errors.push(`noindex meta: ${metrics.robots.join(", ")}`);
  }
  if (metrics.definitionTriggerCount !== 0) {
    errors.push(
      `Industries main contains ${metrics.definitionTriggerCount} glossary trigger(s)`,
    );
  }
  if (metrics.sectionSidebarCount !== 0) {
    errors.push(
      `Industries main contains ${metrics.sectionSidebarCount} section sidebar(s)`,
    );
  }
  if (!metrics.reducedMotionMatches) {
    errors.push("reduced-motion media query did not match in reduced-motion context");
  }
  if (metrics.motionViolations.length) {
    errors.push(
      `reduced-motion violations: ${JSON.stringify(metrics.motionViolations.slice(0, 10))}`,
    );
  }
  if (metrics.analyticsCount < 1) {
    errors.push("no Industries analytics event markup found");
  }
  if (metrics.analyticsViolations.length) {
    errors.push(
      `analytics contract violations: ${metrics.analyticsViolations.join("; ")}`,
    );
  }
}

async function auditFormPrefills(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    ...authenticatedContext,
  });
  await keepQaLocal(context);

  try {
    for (const testCase of businessModelPrefills) {
      const page = await context.newPage();
      const diagnostics = addPageDiagnostics(page);
      const errors = [];
      let response = null;

      try {
        response = await page.goto(routeUrl("/start/", testCase.query), {
          waitUntil: "domcontentloaded",
          timeout: 30_000,
        });
        await page.locator("main").waitFor({ state: "visible", timeout: 15_000 });
        const field = page.locator('main input[name="businessType"]');
        await field.waitFor({ state: "visible", timeout: 10_000 });

        if (testCase.expected) {
          await page.waitForFunction(
            ({ name, expected }) => {
              const input = document.querySelector(`input[name="${name}"]`);
              return input instanceof HTMLInputElement
                && input.value === expected;
            },
            { name: "businessType", expected: testCase.expected },
            { timeout: 5_000 },
          );
        } else {
          // Give the client effect enough time to run before proving that an
          // unknown or repeated value was deliberately ignored.
          await page.waitForTimeout(350);
        }

        const initialValue = await field.inputValue();
        const editable = await field.isEditable();
        const editedValue = testCase.expected
          ? `${testCase.expected} (edited)`
          : "Owner-entered business type";
        if (editable) await field.fill(editedValue);
        const valueAfterEdit = await field.inputValue();

        if (response?.status() !== 200) {
          errors.push(`expected status 200; found ${response?.status() ?? "none"}`);
        }
        if (initialValue !== testCase.expected) {
          errors.push(
            `expected initial value ${JSON.stringify(testCase.expected)}; found ${JSON.stringify(initialValue)}`,
          );
        }
        if (!editable) errors.push("businessType input is not editable");
        if (valueAfterEdit !== editedValue) {
          errors.push(
            `edit did not persist: expected ${JSON.stringify(editedValue)}, found ${JSON.stringify(valueAfterEdit)}`,
          );
        }
        errors.push(...diagnostics.pageErrors.map((item) => `pageerror: ${item}`));
        errors.push(...diagnostics.consoleErrors.map((item) => `console: ${item}`));
        errors.push(...diagnostics.failedLocalRequests.map(
          (item) => `failed local request: ${item}`,
        ));
        errors.push(...diagnostics.badLocalResponses.map(
          (item) => `bad local response: ${item}`,
        ));

        report.formPrefill.push({
          label: testCase.label,
          query: testCase.query,
          expected: testCase.expected,
          initialValue,
          editable,
          editedValue,
          valueAfterEdit,
          diagnostics,
          errors,
        });
      } catch (error) {
        errors.push(`exception: ${error instanceof Error ? error.message : String(error)}`);
        errors.push(...diagnostics.pageErrors.map((item) => `pageerror: ${item}`));
        errors.push(...diagnostics.consoleErrors.map((item) => `console: ${item}`));
        report.formPrefill.push({
          label: testCase.label,
          query: testCase.query,
          expected: testCase.expected,
          diagnostics,
          errors,
        });
      }

      if (errors.length) {
        report.failures.push({
          label: `form prefill:${testCase.label}`,
          errors,
        });
      }
      await page.close();
    }
  } finally {
    await context.close();
  }
}

let browser;
try {
  browser = await chromium.launch({
    ...(process.env.QA_BROWSER_EXECUTABLE
      ? { executablePath: process.env.QA_BROWSER_EXECUTABLE }
      : {}),
    headless: true,
  });

  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: scenario.viewport,
      isMobile: scenario.isMobile ?? false,
      hasTouch: scenario.hasTouch ?? false,
      reducedMotion: "reduce",
      ...authenticatedContext,
    });
    await keepQaLocal(context);
    report.scenarios[scenario.name] = {};

    for (const pathname of industryRoutes) {
      const label = `${scenario.name}:${pathname}`;
      const loaded = await loadRouteWithRetry(context, pathname, label);
      const {
        page,
        response,
        diagnostics,
        attemptCount,
        transientRetries,
      } = loaded;
      const errors = [];
      let metrics = null;
      let hubAudit = null;
      let faq = null;
      let captures = [];

      if (transientRetries.length) {
        report.transientRetries.push({ label, retries: transientRetries });
      }

      try {
        if (loaded.exception) throw new Error(loaded.exception);

        metrics = await collectUniversalMetrics(page);
        addUniversalErrors(metrics, errors);

        if (pathname === "/industries/") {
          hubAudit = await collectHubAudit(page);
          errors.push(...hubAuditErrors(hubAudit));
          if (
            scenario.name === "desktop-1440"
            && hubAudit.heroActionsInViewport !== 2
          ) {
            errors.push(
              `expected both hub hero actions inside the desktop viewport; found ${hubAudit.heroActionsInViewport}`,
            );
          }
        } else {
          const childMainCount = await page.locator("main.industry-detail").count();
          if (childMainCount !== 1) {
            errors.push(
              `expected one main.industry-detail; found ${childMainCount}`,
            );
          }
          if (metrics.mainWordCount < 2_200 || metrics.mainWordCount > 3_500) {
            errors.push(
              `child content length ${metrics.mainWordCount} words is outside the 2200–3500 target`,
            );
          }
          if (metrics.figureCount < 6 || metrics.figureCount > 8) {
            errors.push(
              `child visual count ${metrics.figureCount} is outside the 6–8 target`,
            );
          }
          if (metrics.eagerHeroImageCount !== 1) {
            errors.push(
              `expected one eager child hero image; found ${metrics.eagerHeroImageCount}`,
            );
          }
          if (metrics.industryFaqCount !== 4) {
            errors.push(
              `expected four model-specific FAQs; found ${metrics.industryFaqCount}`,
            );
          }
          if (metrics.evidenceRecordCount !== 1) {
            errors.push(
              `expected one model-specific evidence record; found ${metrics.evidenceRecordCount}`,
            );
          }
        }

        captures = await captureScreenshots(page, pathname, scenario.name);
        report.screenshots.push(...captures);

        faq = await auditFaqKeyboard(page, pathname);
        errors.push(...faq.errors.map((item) => `FAQ keyboard: ${item}`));

        const status = response?.status() ?? null;
        if (status !== 200) errors.push(`expected document status 200; found ${status}`);
        if (new URL(page.url()).pathname !== pathname) {
          errors.push(
            `expected final path ${pathname}; found ${new URL(page.url()).pathname}`,
          );
        }
        errors.push(...diagnostics.pageErrors.map((item) => `pageerror: ${item}`));
        errors.push(...diagnostics.consoleErrors.map((item) => `console: ${item}`));
        errors.push(...diagnostics.failedLocalRequests.map(
          (item) => `failed local request: ${item}`,
        ));
        errors.push(...diagnostics.badLocalResponses.map(
          (item) => `bad local response: ${item}`,
        ));
      } catch (error) {
        errors.push(`exception: ${error instanceof Error ? error.message : String(error)}`);
        errors.push(...diagnostics.pageErrors.map((item) => `pageerror: ${item}`));
        errors.push(...diagnostics.consoleErrors.map((item) => `console: ${item}`));
        errors.push(...diagnostics.failedLocalRequests.map(
          (item) => `failed local request: ${item}`,
        ));
        errors.push(...diagnostics.badLocalResponses.map(
          (item) => `bad local response: ${item}`,
        ));
      }

      report.scenarios[scenario.name][pathname] = {
        status: response?.status() ?? null,
        finalUrl: page.url(),
        attemptCount,
        transientRetries,
        metrics,
        hubAudit,
        faq,
        captures,
        diagnostics,
        errors,
      };

      if (errors.length) report.failures.push({ label, errors });
      await page.close();
    }

    await context.close();
  }

  await auditFormPrefills(browser);
} catch (error) {
  report.failures.push({
    label: "headless QA runner",
    errors: [error instanceof Error ? error.stack ?? error.message : String(error)],
  });
} finally {
  await browser?.close();
}

report.failureCount = report.failures.length;
await writeFile(
  join(outputDir, "industries-headless-qa.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({
  routeCount: report.routeCount,
  scenarioCount: report.scenarioCount,
  checkedPages: report.checkedPages,
  formPrefillCases: report.formPrefill.length,
  screenshotCount: report.screenshots.length,
  failureCount: report.failureCount,
  failures: report.failures,
}, null, 2));

if (report.failureCount) process.exitCode = 1;
