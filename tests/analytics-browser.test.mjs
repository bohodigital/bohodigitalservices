import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { chromium } from "playwright-core";

const bootstrap = await readFile(new URL("../public/analytics-bootstrap.js", import.meta.url), "utf8");
const sites = [
  {
    name: "Boho Digital Services",
    host: "bohodigitalservices.com",
    alternateHost: "www.bohodigitalservices.com",
    gaId: "G-5CV8L2SE2R",
    umamiWebsiteId: "aecddac8-8ad4-49c4-b791-60b161c95155",
  },
  {
    name: "BetterGrades",
    host: "bettergrades.net",
    alternateHost: "www.bettergrades.net",
    gaId: "G-9X96S9GZQ2",
    umamiWebsiteId: "7810f828-f3f0-4296-95e3-e01e8c37f234",
  },
  {
    name: "How Biscuit",
    host: "howbiscuit.com",
    alternateHost: "www.howbiscuit.com",
    gaId: "G-NG0NQMVFEH",
    umamiWebsiteId: "fefef93c-b1d6-4d04-95d3-064af3d38a41",
  },
  {
    name: "Rank Builder SEO",
    host: "rankbuilderseo.com",
    alternateHost: "www.rankbuilderseo.com",
    gaId: "G-3VYXZ0H1P8",
    umamiWebsiteId: "297e47a1-fd92-42f1-a34d-5a7698e8a58f",
  },
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const secret = "tracker-parity-secret-value";
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function html(site) {
  return `<!doctype html><html><head><title>${site.name}</title><script defer src="/analytics-bootstrap.js" data-analytics-bootstrap="boho-v2" data-umami-script-url="https://analytics.bohodigitalservices.com/script.js" data-umami-website-id="${site.umamiWebsiteId}" data-umami-domains="${site.host},${site.alternateHost}" data-ga-id="${site.gaId}" data-ga-public-hosts="${site.host},${site.alternateHost}"></script></head><body>analytics parity</body></html>`;
}

const umamiStub = `window.umami={track(payload){fetch("https://analytics.bohodigitalservices.com/api/send",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)})}};`;
const gaStub = `(()=>{function send(entry){if(entry&&entry[0]==="event"&&entry[1]==="page_view"){const fields=entry[2]||{};const params=new URLSearchParams({dl:fields.page_location||"",dp:fields.page_path||"",dr:fields.page_referrer||""});fetch("https://www.google-analytics.com/g/collect?"+params)}}for(const entry of window.dataLayer||[])send(entry);const original=window.dataLayer.push.bind(window.dataLayer);window.dataLayer.push=function(){for(const entry of arguments)send(entry);return original(...arguments)}})();`;

function classify(request) {
  const url = new URL(request.url());
  if (url.hostname === "analytics.bohodigitalservices.com" && url.pathname === "/script.js") return "umamiLoader";
  if (url.hostname === "analytics.bohodigitalservices.com" && url.pathname === "/api/send") return "umamiCollect";
  if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") return "gaLoader";
  if (
    (url.hostname === "google-analytics.com" || url.hostname.endsWith(".google-analytics.com"))
    && url.pathname.endsWith("/g/collect")
  ) return "gaCollect";
  return null;
}

async function openHarness(browser, site, viewport, initScript, providerScripts = {}) {
  const context = await browser.newContext({ viewport });
  if (initScript) await context.addInitScript(initScript);
  const requests = [];
  const pageErrors = [];
  context.on("request", (request) => {
    const kind = classify(request);
    if (kind) requests.push({ kind, url: request.url(), postData: request.postData() });
    else if (process.env.DEBUG_ANALYTICS_REQUESTS === "1") {
      requests.push({ kind: "other", url: request.url(), postData: request.postData() });
    }
  });
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (request.resourceType() === "document") {
      await route.fulfill({ status: 200, contentType: "text/html", body: html(site) });
    } else if (url.pathname === "/analytics-bootstrap.js") {
      await route.fulfill({ status: 200, contentType: "application/javascript", body: bootstrap });
    } else if (url.hostname === "analytics.bohodigitalservices.com" && url.pathname === "/script.js") {
      await route.fulfill({ status: 200, contentType: "application/javascript", body: providerScripts.umami || umamiStub });
    } else if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") {
      await route.fulfill({ status: 200, contentType: "application/javascript", body: providerScripts.ga || gaStub });
    } else if (classify(request)) {
      await route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" }, body: "" });
    } else {
      await route.abort();
    }
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(error.message));
  return { context, page, requests, pageErrors };
}

function count(harness, kind) {
  return harness.requests.filter((request) => request.kind === kind).length;
}

async function waitForCounts(harness, expected) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (Object.entries(expected).every(([kind, value]) => count(harness, kind) === value)) return;
    await delay(20);
  }
  assert.deepEqual(Object.fromEntries(Object.keys(expected).map((kind) => [kind, count(harness, kind)])), expected);
}

function assertSanitized(harness, site) {
  for (const request of harness.requests.filter(({ kind }) => kind === "gaCollect")) {
    const url = new URL(request.url);
    const location = new URL(url.searchParams.get("dl"));
    assert.equal(location.origin, `https://${site.host}`);
    assert.equal(location.search, "");
    assert.equal(location.hash, "");
    assert.equal(url.searchParams.get("dp"), location.pathname);
    const referrer = url.searchParams.get("dr");
    if (referrer) {
      const parsed = new URL(referrer);
      assert.equal(parsed.search, "");
      assert.equal(parsed.hash, "");
    }
  }
  for (const request of harness.requests.filter(({ kind }) => kind === "umamiCollect")) {
    const payload = JSON.parse(request.postData);
    assert.deepEqual(Object.keys(payload).sort(), ["url", "website"]);
    const location = new URL(payload.url);
    assert.equal(location.origin, `https://${site.host}`);
    assert.equal(location.search, "");
    assert.equal(location.hash, "");
    assert.equal(payload.website, site.umamiWebsiteId);
  }
  assert.doesNotMatch(JSON.stringify(harness.requests), new RegExp(secret, "i"));
}

async function navigateAndWait(page, expression) {
  await page.evaluate(expression);
  await delay(80);
}

test("real Chromium sends one privacy-bounded pageview per provider and pathname", { timeout: 120_000 }, async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
  });
  try {
    for (const site of sites) {
      for (const viewport of viewports) {
        const harness = await openHarness(browser, site, viewport);
        try {
          await harness.page.goto(`https://${site.host}/initial/?lead=${secret}#${secret}`, { waitUntil: "load" });
          await waitForCounts(harness, { gaLoader: 1, umamiLoader: 1, gaCollect: 1, umamiCollect: 1 });

          await navigateAndWait(harness.page, () => history.pushState({}, "", "/next/?lead=tracker-parity-secret-value#private"));
          await waitForCounts(harness, { gaCollect: 2, umamiCollect: 2 });
          for (const action of [
            () => history.pushState({}, "", "/next/?lead=changed"),
            () => history.pushState({}, "", "/next/#changed"),
            () => history.replaceState({}, "", "/next/?replace=same#same"),
          ]) await navigateAndWait(harness.page, action);
          assert.equal(count(harness, "gaCollect"), 2);
          assert.equal(count(harness, "umamiCollect"), 2);

          await navigateAndWait(harness.page, () => history.back());
          await navigateAndWait(harness.page, () => history.back());
          assert.equal(count(harness, "gaCollect"), 2);
          assert.equal(count(harness, "umamiCollect"), 2);
          await navigateAndWait(harness.page, () => history.back());
          await waitForCounts(harness, { gaCollect: 3, umamiCollect: 3 });
          await navigateAndWait(harness.page, () => history.forward());
          await waitForCounts(harness, { gaCollect: 4, umamiCollect: 4 });
          await navigateAndWait(harness.page, () => history.forward());
          assert.equal(count(harness, "gaCollect"), 4);
          assert.equal(count(harness, "umamiCollect"), 4);

          await harness.page.reload({ waitUntil: "load" });
          await waitForCounts(harness, { gaLoader: 2, umamiLoader: 2, gaCollect: 5, umamiCollect: 5 });
          assertSanitized(harness, site);
          assert.deepEqual(harness.pageErrors, [], `${site.name} ${viewport.name}`);
        } finally {
          await harness.context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
});

test("real Chromium suppresses both providers before load on privacy and host exclusions", { timeout: 120_000 }, async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
  });
  try {
    for (const site of sites) {
      for (const [name, url, initScript] of [
        ["DNT", `https://${site.host}/initial/`, () => Object.defineProperty(navigator, "doNotTrack", { configurable: true, value: "1" })],
        ["webdriver", `https://${site.host}/initial/`, () => Object.defineProperty(navigator, "webdriver", { configurable: true, value: true })],
        ["Pages", `https://${site.host.replace(/\..*$/, "")}.pages.dev/initial/`, null],
        ["preview", `https://preview.${site.host}/initial/`, null],
        ["localhost", "http://localhost/initial/", null],
        ["owner-only", `https://owner.${site.host}/initial/`, null],
        ["arbitrary", `https://${site.host}.evil.example/initial/`, null],
      ]) {
        const harness = await openHarness(browser, site, viewports[0], initScript);
        try {
          await harness.page.goto(url, { waitUntil: "load" });
          await delay(80);
          assert.equal(harness.requests.length, 0, `${site.name} ${name}`);
          assert.deepEqual(harness.pageErrors, [], `${site.name} ${name}`);
        } finally {
          await harness.context.close();
        }
      }

      const qa = await openHarness(browser, site, viewports[0]);
      try {
        await qa.page.goto(`https://${site.host}/initial/?boho_qa=1`, { waitUntil: "load" });
        await delay(80);
        assert.equal(qa.requests.length, 0, `${site.name} QA set`);
        await qa.page.goto(`https://${site.host}/initial/`, { waitUntil: "load" });
        await delay(80);
        assert.equal(qa.requests.length, 0, `${site.name} QA session persistence`);

        const separateTab = await qa.context.newPage();
        await separateTab.goto(`https://${site.host}/initial/`, { waitUntil: "load" });
        await waitForCounts(qa, { gaLoader: 1, umamiLoader: 1, gaCollect: 1, umamiCollect: 1 });
        await separateTab.close();

        await qa.page.goto(`https://${site.host}/initial/?boho_qa=0&lead=${secret}`, { waitUntil: "load" });
        await waitForCounts(qa, { gaLoader: 2, umamiLoader: 2, gaCollect: 2, umamiCollect: 2 });
        assertSanitized(qa, site);
        assert.deepEqual(qa.pageErrors, [], `${site.name} QA clear`);
      } finally {
        await qa.context.close();
      }
    }
  } finally {
    await browser.close();
  }
});


test("deployed provider loaders preserve exactly-one manual pageviews", {
  timeout: 120_000,
  skip: process.env.ANALYTICS_LIVE_PROVIDER_TEST !== "1",
}, async () => {
  const umamiResponse = await fetch("https://analytics.bohodigitalservices.com/script.js");
  assert.equal(umamiResponse.ok, true);
  const umami = await umamiResponse.text();
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
  });
  try {
    for (const site of sites.filter(({ name }) =>
      !process.env.ANALYTICS_SITE_FILTER || name === process.env.ANALYTICS_SITE_FILTER
    )) {
      const gaResponse = await fetch(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(site.gaId)}`);
      assert.equal(gaResponse.ok, true, site.name);
      const harness = await openHarness(browser, site, viewports[0], null, {
        umami,
        ga: await gaResponse.text(),
      });
      try {
        await harness.page.goto(`https://${site.host}/initial/?lead=${secret}#${secret}`, { waitUntil: "load" });
        await waitForCounts(harness, { gaLoader: 1, umamiLoader: 1, umamiCollect: 1 });
        await delay(800);
        const gaPageviews = () => harness.requests.filter(({ kind, url }) =>
          kind === "gaCollect" && new URL(url).searchParams.get("en") === "page_view"
        ).length;
        assert.equal(gaPageviews(), 1, `${site.name} initial`);
        await navigateAndWait(harness.page, () => history.pushState({}, "", "/next/?lead=tracker-parity-secret-value#private"));
        for (let attempt = 0; attempt < 100 && gaPageviews() < 2; attempt += 1) await delay(100);
        assert.equal(gaPageviews(), 2, `${site.name} pathname`);
        assert.equal(count(harness, "umamiCollect"), 2, site.name);
        await navigateAndWait(harness.page, () => history.pushState({}, "", "/next/?lead=changed#changed"));
        await delay(2500);
        assert.equal(gaPageviews(), 2, `${site.name} same pathname`);
        assert.equal(count(harness, "umamiCollect"), 2, site.name);

        for (const request of harness.requests.filter(({ kind }) => kind === "gaCollect")) {
          const url = new URL(request.url);
          const location = new URL(url.searchParams.get("dl"));
          assert.equal(location.origin, `https://${site.host}`);
          assert.equal(location.search, "");
          assert.equal(location.hash, "");
          assert.equal(url.searchParams.get("dp"), location.pathname);
        }
        for (const request of harness.requests.filter(({ kind }) => kind === "umamiCollect")) {
          const body = JSON.parse(request.postData);
          assert.equal(body.type, "event");
          assert.deepEqual(Object.keys(body.payload).sort(), ["url", "website"]);
          const location = new URL(body.payload.url);
          assert.equal(location.origin, `https://${site.host}`);
          assert.equal(location.search, "");
          assert.equal(location.hash, "");
        }
        assert.doesNotMatch(JSON.stringify(harness.requests), new RegExp(secret, "i"));
        assert.deepEqual(harness.pageErrors, [], site.name);
      } finally {
        await harness.context.close();
      }
    }
  } finally {
    await browser.close();
  }
});
