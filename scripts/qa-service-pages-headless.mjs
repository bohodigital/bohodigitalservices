import { mkdir, writeFile } from "node:fs/promises";

const { chromium } = await import(process.env.QA_PLAYWRIGHT_CORE_URL ?? "playwright-core");

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:4177";
const baseOrigin = new URL(baseUrl).origin;
const sitesBypassToken = process.env.QA_SITES_BYPASS_TOKEN;
const authenticatedContext = sitesBypassToken
  ? { extraHTTPHeaders: { "OAI-Sites-Authorization": `Bearer ${sitesBypassToken}` } }
  : {};
const artifactDir = process.env.QA_ARTIFACT_DIR
  ?? new URL(
    "../artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/headless/",
    import.meta.url,
  ).pathname.replace(/^\/(.:)/, "$1");

const serviceRoutes = [
  "/services/ongoing-seo/",
  "/services/web-design-redesign/",
  "/services/provider-rescue/",
  "/services/research-audits-strategy/",
  "/services/custom-digital-solutions/",
];

const routeSpecs = [
  {
    path: "/services/",
    requiredLinks: [
      { pathname: serviceRoutes[0], labelPattern: "ongoing seo|search growth" },
      { pathname: serviceRoutes[1], labelPattern: "web design|website redesign" },
      { pathname: serviceRoutes[2], labelPattern: "provider rescue|migration" },
      { pathname: serviceRoutes[3], labelPattern: "research|audit|strategy" },
      { pathname: serviceRoutes[4], labelPattern: "custom|digital solutions" },
    ],
  },
  {
    path: serviceRoutes[0],
    requiredLinks: [
      { pathname: "/start/", labelPattern: "free review" },
      { pathname: "/pricing/", hash: "#ongoing-seo", labelPattern: "pricing" },
    ],
  },
  {
    path: serviceRoutes[1],
    requiredLinks: [
      { pathname: "/start/", labelPattern: "website review|free review" },
      { pathname: "/pricing/", hash: "#web-design", labelPattern: "pricing" },
    ],
  },
  {
    path: serviceRoutes[2],
    requiredLinks: [
      { pathname: "/start/", labelPattern: "rescue assessment|start" },
      { pathname: "/emergency/", labelPattern: "emergency" },
      { pathname: "/pricing/", hash: "#provider-rescue", labelPattern: "pricing" },
    ],
  },
  {
    path: serviceRoutes[3],
    requiredLinks: [
      { pathname: "/start/", labelPattern: "free review" },
      { pathname: "/pricing/", hash: "#analytics-reporting", labelPattern: "pricing" },
      { pathname: "/resources/", hash: "#analysis-dashboard", labelPattern: "analytics|platform|repository" },
    ],
  },
  {
    path: serviceRoutes[4],
    requiredLinks: [
      { pathname: "/start/", labelPattern: "discovery|free review" },
      { pathname: "/pricing/", hash: "#custom-solutions", labelPattern: "pricing" },
    ],
  },
  {
    path: "/pricing/",
    requiredIds: [
      "ongoing-seo",
      "analytics-reporting",
      "web-design",
      "hosting-email",
      "provider-rescue",
      "audits-strategy",
      "custom-solutions",
    ],
  },
  {
    path: "/work/",
    requiredIds: ["website-work", "provider-rescue", "report-method", "public-tools"],
  },
  {
    path: "/resources/",
    requiredIds: ["analysis-dashboard", "provider-rescue-checklist", "report-standard"],
  },
  {
    path: "/start/",
    requireForm: true,
  },
];

const scenarios = [
  { name: "desktop-1440", viewport: { width: 1440, height: 1000 } },
  { name: "mobile-390", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: "tablet-768", viewport: { width: 768, height: 1024 } },
  // A 640 CSS-pixel viewport represents a 1280-pixel layout at 200% browser zoom.
  { name: "zoom-200", viewport: { width: 640, height: 800 } },
];

const screenshotRoutes = new Set(["/services/", ...serviceRoutes]);
const screenshotScenarios = new Set(["desktop-1440", "mobile-390"]);
const rawEditorialLabels = [
  "Page metadata",
  "SEO title:",
  "Meta description:",
  "Canonical route:",
  "Destination:",
];

await mkdir(artifactDir, { recursive: true });

const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  routeCount: routeSpecs.length,
  scenarioCount: scenarios.length,
  checkedPages: routeSpecs.length * scenarios.length,
  scenarios: {},
  transientRetries: [],
  failures: [],
  failureCount: 0,
};

function routeLabel(route) {
  return route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "-") || "home";
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
    if (url.origin === baseOrigin || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
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
    // External requests are intentionally blocked so QA cannot leak off-host.
    if (message.text().includes("Failed to load resource: net::ERR_FAILED")) return;
    diagnostics.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "failed";
    if (sameOrigin(request.url()) && errorText !== "net::ERR_ABORTED") {
      diagnostics.failedLocalRequests.push(`${request.url()} (${errorText})`);
    }
  });
  page.on("response", (response) => {
    if (sameOrigin(response.url()) && response.status() >= 400) {
      diagnostics.badLocalResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  return diagnostics;
}

async function settleLazyAssets(page) {
  await page.evaluate(async () => {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const step = Math.max(300, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y <= height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 20));
    }

    await Promise.race([
      Promise.allSettled([...document.images].map((image) => image.decode?.())),
      new Promise((resolve) => window.setTimeout(resolve, 1_000)),
    ]);

    window.scrollTo(0, 0);
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
  });
  await page.waitForTimeout(120);
}

async function settleInteractiveHydration(page) {
  await page.waitForFunction(() => {
    const trigger = document.querySelector(".definition-term__trigger");
    if (!trigger) return true;
    return Object.keys(trigger).some((key) => key.startsWith("__reactProps$"));
  }, null, { timeout: 10_000 }).catch(() => {});
}

async function loadRouteWithRetry(context, spec, label) {
  const transientRetries = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const page = await context.newPage();
    const diagnostics = addPageDiagnostics(page);
    let response = null;

    try {
      response = await page.goto(new URL(spec.path, baseUrl).href, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
      if ((response?.status() ?? 0) >= 500) {
        throw new Error(`document returned ${response?.status()}`);
      }
      await page.locator("main").waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(220);
      await settleLazyAssets(page);
      await settleInteractiveHydration(page);

      if (diagnostics.badLocalResponses.some((item) => /^5\d\d\b/.test(item))) {
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

async function collectPageMetrics(page, spec) {
  return page.evaluate(({ requiredLinks, requiredIds, requireForm, editorialLabels }) => {
    const localBrokenImages = [...document.images]
      .filter((image) => {
        const resolved = new URL(image.currentSrc || image.src, window.location.href);
        return resolved.origin === window.location.origin && image.complete && image.naturalWidth === 0;
      })
      .map((image) => image.currentSrc || image.src);

    const bodyText = document.body.innerText.toLocaleLowerCase();
    const leakedEditorialLabels = editorialLabels.filter((label) => (
      bodyText.includes(label.toLocaleLowerCase())
    ));
    const mainLinks = [...document.querySelectorAll("main a[href]")];
    const linkChecks = (requiredLinks ?? []).map((expected) => {
      const matches = mainLinks.filter((link) => {
        const resolved = new URL(link.getAttribute("href") ?? "", window.location.href);
        return resolved.origin === window.location.origin
          && resolved.pathname === expected.pathname
          && resolved.hash === (expected.hash ?? "");
      });
      const pattern = new RegExp(expected.labelPattern, "i");
      const labelMatches = matches.filter((link) => pattern.test(link.textContent?.replace(/\s+/g, " ").trim() ?? ""));
      return {
        ...expected,
        matchCount: matches.length,
        labelMatchCount: labelMatches.length,
        labels: matches.map((link) => link.textContent?.replace(/\s+/g, " ").trim() ?? ""),
      };
    });

    const requiredIdChecks = (requiredIds ?? []).map((id) => ({
      id,
      count: document.querySelectorAll(`[id="${CSS.escape(id)}"]`).length,
    }));
    const forms = [...document.querySelectorAll("main form")];
    const submitControls = forms.flatMap((form) => [...form.querySelectorAll('button[type="submit"], input[type="submit"]')]);

    return {
      h1Count: document.querySelectorAll("h1").length,
      mainCount: document.querySelectorAll("main").length,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      localBrokenImages,
      leakedEditorialLabels,
      linkChecks,
      requiredIdChecks,
      formCheck: {
        required: Boolean(requireForm),
        formCount: forms.length,
        submitControlCount: submitControls.length,
      },
      glossaryTriggerCount: document.querySelectorAll(".definition-term__trigger").length,
    };
  }, {
    requiredLinks: spec.requiredLinks ?? [],
    requiredIds: spec.requiredIds ?? [],
    requireForm: spec.requireForm ?? false,
    editorialLabels: rawEditorialLabels,
  });
}

async function auditFaqKeyboard(page) {
  const details = page.locator("main details");
  const result = { detailsCount: await details.count(), tested: [], errors: [] };

  for (let index = 0; index < result.detailsCount; index += 1) {
    const disclosure = details.nth(index);
    const summary = disclosure.locator("summary").first();
    if ((await summary.count()) === 0 || !(await summary.isVisible())) continue;

    const label = (await summary.textContent())?.replace(/\s+/g, " ").trim() ?? `details ${index + 1}`;
    const initialOpen = await disclosure.evaluate((element) => element.open);
    await summary.scrollIntoViewIfNeeded();
    await summary.focus();
    const focused = await summary.evaluate((element) => document.activeElement === element);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(35);
    const afterEnter = await disclosure.evaluate((element) => element.open);
    await page.keyboard.press("Space");
    await page.waitForTimeout(35);
    const afterSpace = await disclosure.evaluate((element) => element.open);
    await disclosure.evaluate((element, open) => {
      element.open = open;
    }, initialOpen);

    const test = { label, focused, initialOpen, afterEnter, afterSpace };
    result.tested.push(test);
    if (!focused || afterEnter === initialOpen || afterSpace !== initialOpen) {
      result.errors.push(JSON.stringify(test));
    }
  }

  return result;
}

async function auditGlossaryPopovers(page, scenario) {
  const triggers = page.locator(".definition-term__trigger:visible");
  const triggerCount = await triggers.count();
  const result = {
    triggerCount,
    testedTriggerCount: 0,
    maximumOpenCount: 0,
    states: [],
    closedAfterEscape: null,
    errors: [],
  };
  if (triggerCount === 0) return result;

  await page.evaluate(() => {
    const countOpen = () => document.querySelectorAll("body > .definition-term__popover--open").length;
    const state = { maximumOpenCount: countOpen(), observer: null };
    state.observer = new MutationObserver(() => {
      state.maximumOpenCount = Math.max(state.maximumOpenCount, countOpen());
    });
    state.observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    window.__servicePagePopupQa = state;
  });

  const countToTest = Math.min(triggerCount, 2);
  for (let index = 0; index < countToTest; index += 1) {
    const trigger = triggers.nth(index);
    await trigger.scrollIntoViewIfNeeded();
    if (scenario.hasTouch) {
      await trigger.click();
    } else {
      await trigger.focus();
    }

    try {
      await page.locator("body > .definition-term__popover--open").waitFor({
        state: "visible",
        timeout: 2_500,
      });
      await page.waitForTimeout(60);
    } catch {
      result.errors.push(`trigger ${index + 1} did not open a glossary popup`);
      continue;
    }

    const state = await page.evaluate(() => {
      const popups = [...document.querySelectorAll("body > .definition-term__popover--open")];
      const popup = popups[0];
      const bounds = popup?.getBoundingClientRect();
      const centerX = bounds ? Math.min(window.innerWidth - 1, Math.max(0, bounds.left + bounds.width / 2)) : 0;
      const centerY = bounds ? Math.min(window.innerHeight - 1, Math.max(0, bounds.top + bounds.height / 2)) : 0;
      const topmost = bounds ? document.elementFromPoint(centerX, centerY) : null;
      return {
        openCount: popups.length,
        position: popup ? getComputedStyle(popup).position : null,
        zIndex: popup ? getComputedStyle(popup).zIndex : null,
        topmost: Boolean(popup && topmost && (popup === topmost || popup.contains(topmost))),
        insideViewport: Boolean(bounds
          && bounds.left >= -1
          && bounds.top >= -1
          && bounds.right <= window.innerWidth + 1
          && bounds.bottom <= window.innerHeight + 1),
      };
    });
    result.testedTriggerCount += 1;
    result.states.push(state);
    if (state.openCount !== 1 || state.position !== "fixed" || !state.topmost || !state.insideViewport) {
      result.errors.push(JSON.stringify(state));
    }
  }

  await page.keyboard.press("Escape");
  await page.waitForTimeout(60);
  result.closedAfterEscape = await page.locator("body > .definition-term__popover--open").count();
  result.maximumOpenCount = await page.evaluate(() => {
    const state = window.__servicePagePopupQa;
    state?.observer?.disconnect();
    return state?.maximumOpenCount ?? -1;
  });

  if (result.maximumOpenCount > 1) {
    result.errors.push(`maximum simultaneous popup count was ${result.maximumOpenCount}`);
  }
  if (result.closedAfterEscape !== 0) {
    result.errors.push(`Escape left ${result.closedAfterEscape} popup(s) open`);
    const closeButton = page.locator("body > .definition-term__popover--open .definition-term__close").first();
    if (await closeButton.isVisible().catch(() => false)) await closeButton.click();
  }

  return result;
}

let browser;
try {
  browser = await chromium.launch({
    ...(process.env.QA_BROWSER_EXECUTABLE ? { executablePath: process.env.QA_BROWSER_EXECUTABLE } : {}),
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

    for (const spec of routeSpecs) {
      const label = `${scenario.name}:${spec.path}`;
      const loaded = await loadRouteWithRetry(context, spec, label);
      const {
        page,
        response,
        diagnostics,
        attemptCount,
        transientRetries,
      } = loaded;
      const errors = [];
      if (transientRetries.length) {
        report.transientRetries.push({ label, retries: transientRetries });
      }

      try {
        if (loaded.exception) throw new Error(loaded.exception);

        const metrics = await collectPageMetrics(page, spec);
        const faq = await auditFaqKeyboard(page);
        const popovers = await auditGlossaryPopovers(page, scenario);

        const status = response?.status() ?? null;
        if (status !== 200) errors.push(`expected document status 200; found ${status}`);
        if (new URL(page.url()).pathname !== spec.path) {
          errors.push(`expected final path ${spec.path}; found ${new URL(page.url()).pathname}`);
        }
        if (metrics.h1Count !== 1) errors.push(`expected one h1; found ${metrics.h1Count}`);
        if (metrics.mainCount !== 1) errors.push(`expected one main; found ${metrics.mainCount}`);
        if (metrics.horizontalOverflow > 1) errors.push(`horizontal overflow ${metrics.horizontalOverflow}px`);
        if (metrics.localBrokenImages.length) {
          errors.push(`broken local images: ${metrics.localBrokenImages.join(", ")}`);
        }
        if (metrics.leakedEditorialLabels.length) {
          errors.push(`raw editorial labels: ${metrics.leakedEditorialLabels.join(", ")}`);
        }
        for (const link of metrics.linkChecks) {
          const target = `${link.pathname}${link.hash ?? ""}`;
          if (link.matchCount < 1) errors.push(`missing required main link to ${target}`);
          else if (link.labelMatchCount < 1) {
            errors.push(`link to ${target} does not match label /${link.labelPattern}/i: ${link.labels.join(" | ")}`);
          }
        }
        for (const idCheck of metrics.requiredIdChecks) {
          if (idCheck.count !== 1) errors.push(`expected one #${idCheck.id}; found ${idCheck.count}`);
        }
        if (
          metrics.formCheck.required
          && (metrics.formCheck.formCount < 1 || metrics.formCheck.submitControlCount < 1)
        ) {
          errors.push(`expected an intake form and submit control: ${JSON.stringify(metrics.formCheck)}`);
        }
        errors.push(...faq.errors.map((error) => `FAQ keyboard: ${error}`));
        errors.push(...popovers.errors.map((error) => `glossary popup: ${error}`));
        errors.push(...diagnostics.pageErrors.map((error) => `pageerror: ${error}`));
        errors.push(...diagnostics.consoleErrors.map((error) => `console: ${error}`));
        errors.push(...diagnostics.failedLocalRequests.map((error) => `failed local request: ${error}`));
        errors.push(...diagnostics.badLocalResponses.map((error) => `bad local response: ${error}`));

        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = "auto";
          window.scrollTo(0, 0);
          if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        });
        await page.waitForFunction(() => window.scrollY === 0);
        await page.waitForTimeout(80);
        if (screenshotScenarios.has(scenario.name) && screenshotRoutes.has(spec.path)) {
          // Capture on a fresh page so prior keyboard and popup scrolling cannot
          // leave a sticky compositor layer between positions.
          const capturePage = await context.newPage();
          await keepQaLocal(capturePage);
          await capturePage.goto(new URL(spec.path, baseUrl).href, {
            waitUntil: "domcontentloaded",
            timeout: 30_000,
          });
          await capturePage.locator("main").waitFor();
          await capturePage.evaluate(async () => {
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, 0);
            await Promise.race([
              Promise.allSettled([...document.images].map((image) => image.decode?.())),
              new Promise((resolve) => window.setTimeout(resolve, 1_000)),
            ]);
          });
          await capturePage.addStyleTag({
            // Sticky compositing is tested on the interaction page. Static
            // positioning keeps headless review captures deterministic.
            content: ".site-header,.pricing-index,.service-document-index{position:static!important}",
          });
          await capturePage.screenshot({
            path: `${artifactDir}/${scenario.name}-${routeLabel(spec.path)}.png`,
            // Viewport captures avoid Chromium's 16,384 px full-page texture
            // ceiling, which can wrap very long service pages back to the top.
            fullPage: false,
            animations: "disabled",
            caret: "hide",
          });
          await capturePage.close();
        }

        report.scenarios[scenario.name][spec.path] = {
          status,
          finalUrl: page.url(),
          attemptCount,
          transientRetries,
          metrics,
          faq,
          popovers,
          diagnostics,
          errors,
        };
      } catch (error) {
        errors.push(`exception: ${error instanceof Error ? error.message : String(error)}`);
        errors.push(...diagnostics.pageErrors.map((item) => `pageerror: ${item}`));
        errors.push(...diagnostics.consoleErrors.map((item) => `console: ${item}`));
        errors.push(...diagnostics.failedLocalRequests.map((item) => `failed local request: ${item}`));
        errors.push(...diagnostics.badLocalResponses.map((item) => `bad local response: ${item}`));
        report.scenarios[scenario.name][spec.path] = {
          status: response?.status() ?? null,
          finalUrl: page.url(),
          attemptCount,
          transientRetries,
          diagnostics,
          errors,
        };
      }

      if (errors.length) report.failures.push({ label, errors });
      await page.close();
    }

    await context.close();
  }
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
  `${artifactDir}/service-pages-headless-qa.json`,
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({
  routeCount: report.routeCount,
  scenarioCount: report.scenarioCount,
  checkedPages: report.checkedPages,
  screenshotCount: screenshotRoutes.size * screenshotScenarios.size,
  failureCount: report.failureCount,
  failures: report.failures,
}, null, 2));

if (report.failureCount) process.exitCode = 1;
