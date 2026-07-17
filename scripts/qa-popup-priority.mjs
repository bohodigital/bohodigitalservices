import { mkdir, writeFile } from "node:fs/promises";

const { chromium } = await import(process.env.QA_PLAYWRIGHT_CORE_URL ?? "playwright-core");

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:4177";
const baseOrigin = new URL(baseUrl).origin;
const sitesBypassToken = process.env.QA_SITES_BYPASS_TOKEN;
const authenticatedContext = sitesBypassToken
  ? { extraHTTPHeaders: { "OAI-Sites-Authorization": `Bearer ${sitesBypassToken}` } }
  : {};
const artifactDir = process.env.QA_ARTIFACT_DIR
  ?? new URL("../artifacts/CR-2026-07-16-BOHO-POPUP-PRIORITY-GLOSSARY-001/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  ...(process.env.QA_BROWSER_EXECUTABLE ? { executablePath: process.env.QA_BROWSER_EXECUTABLE } : {}),
  headless: true,
});
const results = { desktop: {}, mobile: {}, coverage: {}, errors: [] };

function collectErrors(page, label) {
  page.on("pageerror", (error) => results.errors.push(`${label}: ${error.message}`));
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "failed";
    // A route-to-route navigation can cancel in-flight development modules.
    // That is a browser lifecycle event, not a failed local asset request.
    if (request.url().startsWith(baseUrl) && errorText !== "net::ERR_ABORTED") {
      results.errors.push(`${label}: ${request.url()} (${errorText})`);
    }
  });
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

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  ...authenticatedContext,
});
await keepQaLocal(desktop);
const desktopPage = await desktop.newPage();
collectErrors(desktopPage, "desktop");
await desktopPage.goto(`${baseUrl}/tools/`, { waitUntil: "domcontentloaded" });
await desktopPage.locator("main").waitFor();

const adjacentTriggers = desktopPage.locator(".knowledge-hero__intro .definition-term__trigger");
if (await adjacentTriggers.count() < 2) {
  throw new Error("Expected at least two adjacent definition triggers in the Tools hero.");
}
const firstAdjacentTrigger = adjacentTriggers.nth(0);
const secondAdjacentTrigger = adjacentTriggers.nth(1);
const openPopovers = desktopPage.locator("body > .definition-term__popover--open");

await firstAdjacentTrigger.hover();
await desktopPage.locator('body > .definition-term__popover--open[data-ready="true"]').waitFor({ state: "visible" });
const rapidAfterFirst = await openPopovers.count();
await secondAdjacentTrigger.hover();
const rapidImmediate = await openPopovers.count();
await desktopPage.waitForTimeout(250);
const rapidSettled = await openPopovers.count();

await firstAdjacentTrigger.click();
await secondAdjacentTrigger.hover();
await desktopPage.waitForTimeout(350);
const clickThenHover = {
  count: await openPopovers.count(),
  firstExpanded: await firstAdjacentTrigger.getAttribute("aria-expanded"),
  secondExpanded: await secondAdjacentTrigger.getAttribute("aria-expanded"),
};
await desktopPage.keyboard.press("Escape");
await desktopPage.waitForTimeout(50);
const staleFocusEscape = {
  count: await openPopovers.count(),
  focusReturnedToActiveTrigger: await secondAdjacentTrigger.evaluate(
    (trigger) => document.activeElement === trigger,
  ),
};

await firstAdjacentTrigger.focus();
await secondAdjacentTrigger.focus();
await desktopPage.waitForTimeout(50);
const keyboardTransfer = {
  count: await openPopovers.count(),
  firstExpanded: await firstAdjacentTrigger.getAttribute("aria-expanded"),
  secondExpanded: await secondAdjacentTrigger.getAttribute("aria-expanded"),
};
await desktopPage.mouse.click(2, 500);
await desktopPage.waitForTimeout(50);
const outsidePointerClosed = await openPopovers.count();

await desktopPage.evaluate(() => {
  const countOpen = () => document.querySelectorAll("body > .definition-term__popover--open").length;
  const state = { max: countOpen(), observer: null };
  state.observer = new MutationObserver(() => {
    state.max = Math.max(state.max, countOpen());
  });
  state.observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  window.__definitionPopoverSweep = state;
});
for (let index = 0; index < Math.min(await adjacentTriggers.count(), 8); index += 1) {
  await adjacentTriggers.nth(index).hover();
  await desktopPage.waitForTimeout(20);
}
await desktopPage.waitForTimeout(250);
const rapidSweepMaximum = await desktopPage.evaluate(() => {
  const state = window.__definitionPopoverSweep;
  state?.observer?.disconnect();
  return state?.max ?? -1;
});
await desktopPage.mouse.move(2, 500);
await desktopPage.waitForTimeout(200);

results.desktop.singleOpen = {
  rapidAfterFirst,
  rapidImmediate,
  rapidSettled,
  clickThenHover,
  staleFocusEscape,
  keyboardTransfer,
  outsidePointerClosed,
  rapidSweepMaximum,
};

const clippedTrigger = desktopPage.locator(".selected-tool-card .definition-term__trigger").first();
await clippedTrigger.waitFor({ state: "visible" });
await desktopPage.waitForTimeout(1_500);
await clippedTrigger.scrollIntoViewIfNeeded();
await clippedTrigger.hover();
await desktopPage.locator("body > .definition-term__popover--open").waitFor({ state: "visible" });
results.desktop.hoverOpened = await clippedTrigger.getAttribute("aria-expanded");
results.desktop.priority = await desktopPage.evaluate(() => {
  const trigger = document.querySelector(".selected-tool-card .definition-term__trigger");
  const card = trigger?.closest(".selected-tool-card");
  const popup = document.querySelector("body > .definition-term__popover--open");
  const bounds = popup?.getBoundingClientRect();
  const topmost = bounds
    ? document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
    : null;
  return {
    bodyChild: popup?.parentElement === document.body,
    escapedClippedCard: Boolean(card && popup && !card.contains(popup)),
    clippingAncestorOverflow: card ? getComputedStyle(card).overflow : null,
    position: popup ? getComputedStyle(popup).position : null,
    zIndex: popup ? getComputedStyle(popup).zIndex : null,
    topmost: Boolean(popup && topmost && (popup === topmost || popup.contains(topmost))),
    insideViewport: Boolean(bounds
      && bounds.left >= 0
      && bounds.top >= 0
      && bounds.right <= window.innerWidth
      && bounds.bottom <= window.innerHeight),
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});

const triggerBounds = await clippedTrigger.boundingBox();
const popupBounds = await desktopPage.locator("body > .definition-term__popover--open").boundingBox();
if (triggerBounds && popupBounds) {
  await desktopPage.mouse.move(triggerBounds.x + triggerBounds.width / 2, triggerBounds.y + triggerBounds.height / 2);
  await desktopPage.mouse.move(popupBounds.x + popupBounds.width / 2, popupBounds.y + popupBounds.height / 2);
  await desktopPage.waitForTimeout(180);
}
results.desktop.hoverBridgeOpen = await desktopPage.locator("body > .definition-term__popover--open").isVisible();
await desktopPage.screenshot({ path: `${artifactDir}/popup-priority-desktop.png`, fullPage: false });

await clippedTrigger.focus();
await desktopPage.keyboard.press("Escape");
results.desktop.escapeClosed = await clippedTrigger.getAttribute("aria-expanded");
await desktop.close();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  ...authenticatedContext,
});
await keepQaLocal(mobile);
const mobilePage = await mobile.newPage();
collectErrors(mobilePage, "mobile");
await mobilePage.goto(`${baseUrl}/tools/`, { waitUntil: "domcontentloaded" });
await mobilePage.locator("main").waitFor();
const mobileTrigger = mobilePage.locator(".selected-tool-card .definition-term__trigger").first();
await mobileTrigger.scrollIntoViewIfNeeded();
await mobilePage.waitForTimeout(1_500);
await mobileTrigger.click();
await mobilePage.locator("body > .definition-term__popover--open").waitFor({ state: "visible" });
await mobilePage.waitForTimeout(250);
results.mobile.priority = await mobilePage.evaluate(() => {
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
    insideViewport: Boolean(bounds
      && bounds.left >= 0
      && bounds.top >= 0
      && bounds.right <= window.innerWidth
      && bounds.bottom <= window.innerHeight),
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    closeTabIndex: popup?.querySelector(".definition-term__close")?.getAttribute("tabindex"),
    linkTabIndex: popup?.querySelector("a")?.getAttribute("tabindex"),
  };
});
await mobilePage.screenshot({ path: `${artifactDir}/popup-priority-mobile-390.png`, fullPage: false });
await mobilePage.locator("body > .definition-term__popover--open .definition-term__close").click();
results.mobile.closeButtonClosed = await mobileTrigger.getAttribute("aria-expanded");

const mobileAdjacentTriggers = mobilePage.locator(".knowledge-hero__intro .definition-term__trigger");
const firstMobileAdjacent = mobileAdjacentTriggers.nth(0);
const secondMobileAdjacent = mobileAdjacentTriggers.nth(1);
await firstMobileAdjacent.click();
await secondMobileAdjacent.click();
await mobilePage.waitForTimeout(100);
results.mobile.singleOpen = {
  count: await mobilePage.locator("body > .definition-term__popover--open").count(),
  firstExpanded: await firstMobileAdjacent.getAttribute("aria-expanded"),
  secondExpanded: await secondMobileAdjacent.getAttribute("aria-expanded"),
};
await mobilePage.locator("body > .definition-term__popover--open .definition-term__close").click();
await mobile.close();

const coverage = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  ...authenticatedContext,
});
await keepQaLocal(coverage);
collectErrors(coverage, "coverage");
const expectedCoverage = {
  "/": ["dashboard", "platform"],
  "/tools/": ["codebase", "platform"],
  "/services/research-audits-strategy/": ["http-status-code"],
  "/learn/provider-rescue/": ["baseline", "cutover"],
  "/definitely-not-a-real-page/": ["not-found-404"],
};
for (const [route, slugs] of Object.entries(expectedCoverage)) {
  await coverage.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await coverage.locator("main").waitFor();
  results.coverage[route] = {};
  for (const slug of slugs) {
    results.coverage[route][slug] = await coverage.locator(`a[href="/learn/glossary/#term-${slug}"]`).count();
  }
}
await coverage.close();

await browser.close();
await writeFile(`${artifactDir}/browser-qa.json`, `${JSON.stringify(results, null, 2)}\n`, "utf8");
console.log(JSON.stringify(results, null, 2));

for (const mode of [results.desktop.priority, results.mobile.priority]) {
  if (!mode.bodyChild || mode.position !== "fixed" || mode.zIndex !== "2147483000") process.exitCode = 1;
  if (!mode.topmost || !mode.insideViewport || mode.horizontalOverflow > 0) process.exitCode = 1;
}
if (results.desktop.priority.clippingAncestorOverflow !== "hidden") process.exitCode = 1;
if (!results.desktop.priority.escapedClippedCard || results.desktop.hoverOpened !== "true" || !results.desktop.hoverBridgeOpen) process.exitCode = 1;
if (results.desktop.escapeClosed !== "false") process.exitCode = 1;
if (
  results.desktop.singleOpen.rapidAfterFirst !== 1
  || results.desktop.singleOpen.rapidImmediate > 1
  || results.desktop.singleOpen.rapidSettled !== 1
  || results.desktop.singleOpen.clickThenHover.count !== 1
  || results.desktop.singleOpen.clickThenHover.firstExpanded !== "false"
  || results.desktop.singleOpen.clickThenHover.secondExpanded !== "true"
  || results.desktop.singleOpen.staleFocusEscape.count !== 0
  || !results.desktop.singleOpen.staleFocusEscape.focusReturnedToActiveTrigger
  || results.desktop.singleOpen.keyboardTransfer.count !== 1
  || results.desktop.singleOpen.keyboardTransfer.firstExpanded !== "false"
  || results.desktop.singleOpen.keyboardTransfer.secondExpanded !== "true"
  || results.desktop.singleOpen.outsidePointerClosed !== 0
  || results.desktop.singleOpen.rapidSweepMaximum > 1
) process.exitCode = 1;
if (results.mobile.priority.closeTabIndex !== "0" || results.mobile.priority.linkTabIndex !== "0") process.exitCode = 1;
if (results.mobile.closeButtonClosed !== "false") process.exitCode = 1;
if (
  results.mobile.singleOpen.count !== 1
  || results.mobile.singleOpen.firstExpanded !== "false"
  || results.mobile.singleOpen.secondExpanded !== "true"
) process.exitCode = 1;
for (const route of Object.values(results.coverage)) {
  if (Object.values(route).some((count) => count < 1)) process.exitCode = 1;
}
if (results.errors.length) process.exitCode = 1;
