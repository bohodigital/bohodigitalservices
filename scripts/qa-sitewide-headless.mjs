import { mkdir, writeFile } from "node:fs/promises";

const { chromium } = await import(process.env.QA_PLAYWRIGHT_CORE_URL ?? "playwright-core");

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:4177";
const baseOrigin = new URL(baseUrl).origin;
const sitesBypassToken = process.env.QA_SITES_BYPASS_TOKEN;
const authenticatedContext = sitesBypassToken
  ? { extraHTTPHeaders: { "OAI-Sites-Authorization": `Bearer ${sitesBypassToken}` } }
  : {};
const artifactDir = process.env.QA_ARTIFACT_DIR
  ?? new URL("../artifacts/CR-2026-07-16-BOHO-SITEWIDE-GLOSSARY-PRODUCTION-001/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");

const routes = [
  "/",
  "/services/",
  "/services/ongoing-seo/",
  "/services/web-design-redesign/",
  "/services/provider-rescue/",
  "/services/research-audits-strategy/",
  "/services/custom-digital-solutions/",
  "/pricing/",
  "/work/",
  "/about/",
  "/contact/",
  "/start/",
  "/emergency/",
  "/privacy/",
  "/terms/",
  "/accessibility/",
  "/industries/",
  "/industries/home-improvement-contractors/",
  "/industries/local-service-businesses/",
  "/industries/brick-and-mortar-retail-hospitality/",
  "/industries/online-retail-ecommerce/",
  "/industries/professional-b2b-services/",
  "/resources/",
  "/learn/",
  "/learn/glossary/",
  "/tools/",
  "/learn/website-buying/",
  "/learn/provider-rescue/",
  "/definitely-not-a-real-page/",
];

const scenarios = [
  { name: "desktop-1440", viewport: { width: 1440, height: 1000 } },
  { name: "tablet-768", viewport: { width: 768, height: 1024 } },
  { name: "mobile-390", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  // A 640 CSS-pixel viewport represents a 1280-pixel layout at 200% browser zoom.
  { name: "zoom-200", viewport: { width: 640, height: 800 } },
];

const screenshotRoutes = new Set([
  "/",
  "/about/",
  "/tools/",
  "/learn/glossary/",
  "/privacy/",
  "/contact/",
  "/start/",
  "/emergency/",
]);

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  ...(process.env.QA_BROWSER_EXECUTABLE ? { executablePath: process.env.QA_BROWSER_EXECUTABLE } : {}),
  headless: true,
});

const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  routeCount: routes.length,
  scenarios: {},
  interactions: {},
  transientRetries: [],
  failures: [],
};

const semanticAudit = {
  baseUrl,
  generatedAt: report.generatedAt,
  results: [],
};

function routeLabel(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "-");
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

function addPageDiagnostics(page, label, errors) {
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (message.text().includes("Failed to load resource: net::ERR_FAILED")) return;
    if (label.endsWith("/definitely-not-a-real-page/") && message.text().includes("status of 404")) return;
    errors.push(`console: ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "failed";
    if (request.url().startsWith(baseUrl) && errorText !== "net::ERR_ABORTED") {
      errors.push(`request: ${request.url()} (${errorText})`);
    }
  });
  page.on("response", (response) => {
    if (!response.url().startsWith(baseUrl) || response.status() < 400) return;
    const allowedNotFoundDocument = label.endsWith("/definitely-not-a-real-page/")
      && response.request().resourceType() === "document"
      && response.status() === 404;
    if (!allowedNotFoundDocument) errors.push(`response: ${response.status()} ${response.url()}`);
  });
}

async function settleLazyImages(page) {
  await page.evaluate(async () => {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += Math.max(300, Math.floor(window.innerHeight * 0.75))) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 20));
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
  });
  await page.waitForTimeout(120);
}

async function loadRouteWithRetry(context, route, label) {
  const transientRetries = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const page = await context.newPage();
    const errors = [];
    let response = null;
    addPageDiagnostics(page, label, errors);

    try {
      response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
      if ((response?.status() ?? 0) >= 500) {
        throw new Error(`document returned ${response?.status()}`);
      }
      await page.locator("main").waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(220);
      await settleLazyImages(page);

      if (errors.some((error) => /^response: 5\d\d\b/.test(error))) {
        throw new Error("a same-origin asset returned a 5xx response");
      }

      return {
        attemptCount: attempt,
        errors,
        exception: null,
        page,
        response,
        transientRetries,
      };
    } catch (error) {
      const exception = error instanceof Error ? error.message : String(error);
      const hasFiveXx = (response?.status() ?? 0) >= 500
        || errors.some((item) => /^response: 5\d\d\b/.test(item));

      if (hasFiveXx && attempt < 3) {
        transientRetries.push({
          attempt,
          documentStatus: response?.status() ?? null,
          errors: [...errors],
          exception,
        });
        await page.close();
        await new Promise((resolve) => setTimeout(resolve, attempt * 350));
        continue;
      }

      return {
        attemptCount: attempt,
        errors,
        exception,
        page,
        response,
        transientRetries,
      };
    }
  }

  throw new Error(`unreachable route retry state for ${label}`);
}

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

  for (const route of routes) {
    const label = `${scenario.name}:${route}`;
    const loaded = await loadRouteWithRetry(context, route, label);
    const { page, response, errors, attemptCount, transientRetries } = loaded;
    if (transientRetries.length) {
      report.transientRetries.push({ label, retries: transientRetries });
    }

    try {
      if (loaded.exception) throw new Error(loaded.exception);

      const metrics = await page.evaluate(() => {
        const localBrokenImages = [...document.images]
          .filter((item) => {
            const resolved = new URL(item.currentSrc || item.src, window.location.href);
            return resolved.origin === window.location.origin && item.complete && item.naturalWidth === 0;
          })
          .map((item) => item.currentSrc || item.src);
        const robots = [...document.querySelectorAll('meta[name="robots"]')]
          .map((item) => item.getAttribute("content") ?? "");
        return {
          h1Count: document.querySelectorAll("h1").length,
          mainCount: document.querySelectorAll("main").length,
          horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          localBrokenImages,
          robots,
          glossaryTriggerCount: document.querySelectorAll(".definition-term__trigger").length,
        };
      });

      if (scenario.name === "desktop-1440" && route !== "/definitely-not-a-real-page/") {
        const highlights = await page.evaluate(() => [...document.querySelectorAll(".definition-term__trigger")]
          .map((trigger) => {
            const contextElement = trigger.closest("p, li, dd, dt, figcaption, blockquote, h1, h2, h3, h4");
            const glossaryHref = trigger.closest(".definition-term")
              ?.querySelector('a[href*="#term-"]')
              ?.getAttribute("href");
            const contextClone = contextElement?.cloneNode(true);
            if (contextClone instanceof Element) {
              contextClone.querySelectorAll(".definition-term__popover, .definition-term__mark")
                .forEach((element) => element.remove());
            }
            return {
              slug: glossaryHref?.split("#term-")[1] ?? "unknown",
              label: trigger.textContent?.trim() ?? "",
              context: contextClone?.textContent?.replace(/\s+/g, " ").trim()
                ?? trigger.parentElement?.textContent?.replace(/\s+/g, " ").trim()
                ?? "",
            };
          }));
        semanticAudit.results.push({ route, highlights });
      }

      if (metrics.h1Count !== 1) errors.push(`expected one h1; found ${metrics.h1Count}`);
      if (metrics.mainCount !== 1) errors.push(`expected one main; found ${metrics.mainCount}`);
      if (metrics.horizontalOverflow > 1) errors.push(`horizontal overflow ${metrics.horizontalOverflow}px`);
      if (metrics.localBrokenImages.length) errors.push(`broken local images: ${metrics.localBrokenImages.join(", ")}`);
      if (route !== "/definitely-not-a-real-page/" && metrics.robots.some((value) => /noindex/i.test(value))) {
        errors.push(`noindex meta: ${metrics.robots.join(", ")}`);
      }

      if (screenshotRoutes.has(route)) {
        await page.screenshot({
          path: `${artifactDir}/${scenario.name}-${routeLabel(route)}.png`,
          fullPage: false,
          animations: "disabled",
          caret: "initial",
        });
      }

      report.scenarios[scenario.name][route] = {
        status: response?.status() ?? null,
        finalUrl: page.url(),
        attemptCount,
        transientRetries,
        ...metrics,
        errors,
      };
    } catch (error) {
      errors.push(`exception: ${error instanceof Error ? error.message : String(error)}`);
      report.scenarios[scenario.name][route] = {
        status: response?.status() ?? null,
        finalUrl: page.url(),
        attemptCount,
        transientRetries,
        errors,
      };
    }

    if (errors.length) report.failures.push({ label, errors });
    await page.close();
  }

  await context.close();
}

const interactionContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  ...authenticatedContext,
});
await keepQaLocal(interactionContext);

const toolsPage = await interactionContext.newPage();
await toolsPage.goto(`${baseUrl}/tools/`, { waitUntil: "domcontentloaded" });
await toolsPage.locator("main").waitFor();
await toolsPage.waitForTimeout(800);
const trigger = toolsPage.locator(".selected-tool-card .definition-term__trigger").first();
await trigger.focus();
await toolsPage.locator("body > .definition-term__popover--open").waitFor();
const focusOpened = await trigger.getAttribute("aria-expanded");
const popupPriority = await toolsPage.evaluate(() => {
  const popup = document.querySelector("body > .definition-term__popover--open");
  const bounds = popup?.getBoundingClientRect();
  const topmost = bounds
    ? document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
    : null;
  return {
    bodyChild: popup?.parentElement === document.body,
    position: popup ? getComputedStyle(popup).position : null,
    zIndex: popup ? getComputedStyle(popup).zIndex : null,
    topmost: Boolean(popup && topmost && (popup === topmost || popup.contains(topmost))),
  };
});
await toolsPage.keyboard.press("Escape");
await toolsPage.waitForTimeout(50);
const escapeClosed = await trigger.getAttribute("aria-expanded");
await trigger.hover();
await toolsPage.locator("body > .definition-term__popover--open").waitFor();
const hoverOpened = await trigger.getAttribute("aria-expanded");
await toolsPage.mouse.move(2, 500);
await toolsPage.waitForTimeout(200);

const adjacentTriggers = toolsPage.locator(".knowledge-hero__intro .definition-term__trigger");
const firstAdjacent = adjacentTriggers.nth(0);
const secondAdjacent = adjacentTriggers.nth(1);
await firstAdjacent.click();
await secondAdjacent.hover();
await toolsPage.waitForTimeout(350);
const clickThenHover = {
  count: await toolsPage.locator("body > .definition-term__popover--open").count(),
  firstExpanded: await firstAdjacent.getAttribute("aria-expanded"),
  secondExpanded: await secondAdjacent.getAttribute("aria-expanded"),
};
await toolsPage.keyboard.press("Escape");
await toolsPage.waitForTimeout(50);
const activeEscape = {
  count: await toolsPage.locator("body > .definition-term__popover--open").count(),
  focusReturnedToActiveTrigger: await secondAdjacent.evaluate(
    (definitionTrigger) => document.activeElement === definitionTrigger,
  ),
};
report.interactions.popup = {
  focusOpened,
  escapeClosed,
  hoverOpened,
  popupPriority,
  clickThenHover,
  activeEscape,
};
await toolsPage.close();

const glossaryPage = await interactionContext.newPage();
await glossaryPage.goto(`${baseUrl}/learn/glossary/`, { waitUntil: "domcontentloaded" });
await glossaryPage.locator("main").waitFor();
await glossaryPage.waitForTimeout(800);
const search = glossaryPage.locator('.glossary-controls input[type="search"]');
await search.fill("Cloudflare");
await glossaryPage.waitForTimeout(100);
const cloudflareVisible = await glossaryPage.locator("#term-cloudflare").count();
await search.fill("Umami");
await glossaryPage.waitForTimeout(100);
const umamiVisible = await glossaryPage.locator("#term-umami").count();
await search.fill("");
const clusterSelect = glossaryPage.locator(".glossary-controls select");
await clusterSelect.selectOption({ label: "Analytics and measurement" });
await glossaryPage.waitForTimeout(100);
const clusterLabels = await glossaryPage.locator(".glossary-row__cluster").allTextContents();
await clusterSelect.selectOption({ label: "All clusters" });
const allTerms = await glossaryPage.locator(".glossary-row").count();
report.interactions.glossary = {
  cloudflareVisible,
  umamiVisible,
  selectedCluster: "Analytics and measurement",
  clusterLabels,
  allTerms,
};
await glossaryPage.close();
await interactionContext.close();

if (focusOpened !== "true" || escapeClosed !== "false" || hoverOpened !== "true") {
  report.failures.push({ label: "popup interaction", errors: [JSON.stringify(report.interactions.popup)] });
}
if (!popupPriority.bodyChild || popupPriority.position !== "fixed" || popupPriority.zIndex !== "2147483000" || !popupPriority.topmost) {
  report.failures.push({ label: "popup priority", errors: [JSON.stringify(popupPriority)] });
}
if (
  clickThenHover.count !== 1
  || clickThenHover.firstExpanded !== "false"
  || clickThenHover.secondExpanded !== "true"
  || activeEscape.count !== 0
  || !activeEscape.focusReturnedToActiveTrigger
) {
  report.failures.push({ label: "popup single-open ownership", errors: [JSON.stringify({ clickThenHover, activeEscape })] });
}
if (cloudflareVisible < 1 || umamiVisible < 1 || allTerms !== 152) {
  report.failures.push({ label: "glossary interaction", errors: [JSON.stringify(report.interactions.glossary)] });
}
if (clusterLabels.some((label) => label !== "Analytics and measurement")) {
  report.failures.push({ label: "glossary cluster filter", errors: clusterLabels });
}

await browser.close();
await writeFile(`${artifactDir}/sitewide-headless-qa.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${artifactDir}/semantic-context-audit.json`, `${JSON.stringify(semanticAudit, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  routeCount: report.routeCount,
  scenarioCount: scenarios.length,
  checkedPages: routes.length * scenarios.length,
  interactions: report.interactions,
  failureCount: report.failures.length,
  failures: report.failures,
}, null, 2));

if (report.failures.length) process.exitCode = 1;
