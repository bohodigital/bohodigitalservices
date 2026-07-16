import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "file:///C:/Users/a1009/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright-core@1.61.1/node_modules/playwright-core/index.mjs";

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:4177";
const artifactDir = process.env.QA_ARTIFACT_DIR
  ?? new URL("../artifacts/CR-2026-07-16-BOHO-POPUP-PRIORITY-GLOSSARY-001/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
});
const results = { desktop: {}, mobile: {}, coverage: {}, errors: [] };

function collectErrors(page, label) {
  page.on("pageerror", (error) => results.errors.push(`${label}: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (request.url().startsWith(baseUrl)) {
      results.errors.push(`${label}: ${request.url()} (${request.failure()?.errorText ?? "failed"})`);
    }
  });
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const desktopPage = await desktop.newPage();
collectErrors(desktopPage, "desktop");
await desktopPage.goto(`${baseUrl}/tools/`, { waitUntil: "networkidle" });

const clippedTrigger = desktopPage.locator(".selected-tool-card .definition-term__trigger").first();
await clippedTrigger.waitFor({ state: "visible" });
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

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mobilePage = await mobile.newPage();
collectErrors(mobilePage, "mobile");
await mobilePage.goto(`${baseUrl}/tools/`, { waitUntil: "networkidle" });
const mobileTrigger = mobilePage.locator(".selected-tool-card .definition-term__trigger").first();
await mobileTrigger.scrollIntoViewIfNeeded();
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
await mobile.close();

const coverage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
collectErrors(coverage, "coverage");
const expectedCoverage = {
  "/": ["dashboard", "platform"],
  "/tools/": ["codebase", "platform"],
  "/services/technical-seo-site-health/": ["http-status-code"],
  "/learn/provider-rescue/": ["baseline", "cutover"],
  "/definitely-not-a-real-page/": ["not-found-404"],
};
for (const [route, slugs] of Object.entries(expectedCoverage)) {
  await coverage.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
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
if (results.mobile.priority.closeTabIndex !== "0" || results.mobile.priority.linkTabIndex !== "0") process.exitCode = 1;
if (results.mobile.closeButtonClosed !== "false") process.exitCode = 1;
for (const route of Object.values(results.coverage)) {
  if (Object.values(route).some((count) => count < 1)) process.exitCode = 1;
}
if (results.errors.length) process.exitCode = 1;
