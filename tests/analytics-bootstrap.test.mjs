import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../public/analytics-bootstrap.js", import.meta.url), "utf8");
const production = {
  host: "bohodigitalservices.com",
  alternateHost: "www.bohodigitalservices.com",
  gaId: "G-5CV8L2SE2R",
  umamiWebsiteId: "aecddac8-8ad4-49c4-b791-60b161c95155",
};

function execute({
  host = production.host,
  pathname = "/services/",
  search = "?boho_qa=0&email=private%40example.com",
  hash = "#private",
  referrer = "https://referrer.example/from?token=private#fragment",
  webdriver = false,
  doNotTrack = "0",
  windowDoNotTrack = "0",
  storage = new Map(),
  storageThrows = false,
  existingWindow = {},
  umamiDomains = `${production.host},${production.alternateHost}`,
  gaHosts = `${production.host},${production.alternateHost}`,
  umamiLoadOnAppend = false,
} = {}) {
  const appended = [];
  const timers = [];
  const listeners = new Map();
  const documentElement = { dataset: {} };
  const config = { dataset: {
    umamiScriptUrl: "https://analytics.bohodigitalservices.com/script.js",
    umamiWebsiteId: production.umamiWebsiteId,
    umamiDomains,
    gaId: production.gaId,
    gaPublicHosts: gaHosts,
  } };
  const document = {
    currentScript: config,
    documentElement,
    referrer,
    head: {
      appendChild(script) {
        appended.push(script);
        if (umamiLoadOnAppend && script.src === config.dataset.umamiScriptUrl) script.dispatch("load");
      },
    },
    createElement() {
      const attributes = new Map();
      const scriptListeners = new Map();
      return {
        async: false,
        src: "",
        setAttribute(name, value) { attributes.set(name, String(value)); },
        getAttribute(name) { return attributes.get(name) ?? null; },
        addEventListener(name, callback) { scriptListeners.set(name, callback); },
        dispatch(name) { scriptListeners.get(name)?.(); },
      };
    },
  };
  const sessionStorage = {
    getItem(key) {
      if (storageThrows) throw new Error("storage unavailable");
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      if (storageThrows) throw new Error("storage unavailable");
      storage.set(key, value);
    },
    removeItem(key) {
      if (storageThrows) throw new Error("storage unavailable");
      storage.delete(key);
    },
  };
  const location = {
    hostname: host,
    origin: `https://${host}`,
    pathname,
    search,
    hash,
  };
  function setLocation(value) {
    const url = new URL(value, `${location.origin}${location.pathname}${location.search}${location.hash}`);
    Object.assign(location, {
      hostname: url.hostname,
      origin: url.origin,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
    });
  }
  const history = {
    pushState(_state, _unused, url) { if (url != null) setLocation(url); },
    replaceState(_state, _unused, url) { if (url != null) setLocation(url); },
  };
  const window = {
    ...existingWindow,
    location,
    history,
    doNotTrack: windowDoNotTrack,
    setTimeout(callback) { timers.push(callback); return timers.length; },
    addEventListener(name, callback) { listeners.set(name, callback); },
  };
  vm.runInNewContext(
    source,
    {
      URL,
      URLSearchParams,
      document,
      encodeURIComponent,
      navigator: { webdriver, doNotTrack, msDoNotTrack: doNotTrack },
      sessionStorage,
      window,
    },
    { timeout: 250 },
  );
  return {
    appended,
    documentElement,
    storage,
    window,
    runTimers() {
      let count = 0;
      while (timers.length > 0) {
        assert.ok(count < 100, "timer queue did not terminate");
        timers.shift()();
        count += 1;
      }
      return count;
    },
    pop(value) { setLocation(value); listeners.get("popstate")?.(); },
  };
}

function pageviews(result) {
  return (result.window.dataLayer ?? [])
    .map((entry) => Array.from(entry))
    .filter((entry) => entry[0] === "event" && entry[1] === "page_view");
}

function activateUmami(result) {
  const tracked = [];
  result.window.umami = { track(payload) { tracked.push(payload); } };
  result.appended[0].dispatch("load");
  return tracked;
}

test("normal production load queues exactly one sanitized pageview per provider", () => {
  const result = execute();
  assert.equal(result.appended.length, 2);
  assert.equal(result.appended[0].src, "https://analytics.bohodigitalservices.com/script.js");
  assert.equal(result.appended[1].src, "https://www.googletagmanager.com/gtag/js?id=G-5CV8L2SE2R");
  for (const [name, value] of [
    ["data-auto-pageview", "false"],
    ["data-exclude-search", "true"],
    ["data-exclude-hash", "true"],
    ["data-do-not-track", "true"],
  ]) assert.equal(result.appended[0].getAttribute(name), value);
  assert.equal(pageviews(result).length, 1);
  assert.deepEqual({ ...pageviews(result)[0][2] }, {
    page_location: "https://bohodigitalservices.com/services/",
    page_path: "/services/",
    page_referrer: "https://referrer.example/from",
  });
  const umami = activateUmami(result);
  assert.deepEqual(umami.map((payload) => ({ ...payload })), [{
    website: production.umamiWebsiteId,
    url: "https://bohodigitalservices.com/services/",
  }]);
  assert.doesNotMatch(JSON.stringify({ ga: result.window.dataLayer, umami }), /private|token|email|%40|#fragment|#private/i);
});

test("Umami load without an API terminates and later flushes each pending pageview once", () => {
  const unavailable = execute({ umamiLoadOnAppend: true });
  assert.equal(unavailable.runTimers(), 1);
  assert.equal(unavailable.runTimers(), 0);

  const recovering = execute();
  recovering.window.history.pushState({}, "", "/pricing/?lead=private#start");
  assert.equal(recovering.runTimers(), 1);
  recovering.appended[0].dispatch("load");
  const tracked = [];
  recovering.window.umami = { track(payload) { tracked.push(payload); } };
  assert.equal(recovering.runTimers(), 1);
  assert.deepEqual(tracked.map((payload) => ({ ...payload })), [
    {
      website: production.umamiWebsiteId,
      url: "https://bohodigitalservices.com/services/",
    },
    {
      website: production.umamiWebsiteId,
      url: "https://bohodigitalservices.com/pricing/",
    },
  ]);
  assert.equal(recovering.runTimers(), 0);
  assert.equal(tracked.length, 2);
});

test("pathname transitions are counted once while duplicate, query, hash, and same-path history are ignored", () => {
  const result = execute();
  const umami = activateUmami(result);
  result.window.history.pushState({}, "", "/pricing/?lead=private#start");
  result.runTimers();
  assert.equal(pageviews(result).length, 2);
  assert.equal(umami.length, 2);
  assert.equal(pageviews(result)[1][2].page_location, "https://bohodigitalservices.com/pricing/");
  assert.equal(umami[1].url, "https://bohodigitalservices.com/pricing/");
  for (const url of ["/pricing/?lead=other", "/pricing/?lead=other#details", "/pricing/"]) {
    result.window.history.pushState({}, "", url);
    result.runTimers();
  }
  result.pop("/pricing/?back=same");
  result.runTimers();
  assert.equal(pageviews(result).length, 2);
  assert.equal(umami.length, 2);
  result.pop("/services/?back=meaningful");
  result.runTimers();
  assert.equal(pageviews(result).length, 3);
  assert.equal(umami.length, 3);
});

test("hard reloads and duplicate bootstraps do not duplicate pageviews", () => {
  assert.equal(pageviews(execute()).length, 1);
  assert.equal(pageviews(execute()).length, 1);
  const duplicate = execute({ existingWindow: { __bohoAnalyticsLoaded: true } });
  assert.equal(duplicate.appended.length, 0);
  assert.equal(duplicate.window.dataLayer, undefined);
});

test("DNT, webdriver, QA session state, and non-production hosts suppress before network load", () => {
  for (const options of [
    { doNotTrack: "1" },
    { windowDoNotTrack: "1" },
    { webdriver: true },
    { host: "bohodigitalservices.pages.dev" },
    { host: "preview.bohodigitalservices.com" },
    { host: "localhost" },
    { host: "owner.bohodigitalservices.com" },
    { host: "bohodigitalservices.com.evil.example" },
  ]) {
    const result = execute(options);
    assert.equal(result.appended.length, 0, JSON.stringify(options));
    assert.equal(result.window.dataLayer, undefined, JSON.stringify(options));
  }
  const storage = new Map();
  const marked = execute({ search: "?boho_qa=1", storage });
  assert.equal(marked.appended.length, 0);
  assert.equal(marked.documentElement.dataset.analyticsSuppressed, "boho-qa");
  assert.equal(storage.get("boho_qa"), "1");
  assert.equal(execute({ search: "", storage }).appended.length, 0);
  const cleared = execute({ search: "?boho_qa=0", storage });
  assert.equal(cleared.appended.length, 2);
  assert.equal(storage.has("boho_qa"), false);
  assert.equal(execute({ search: "?boho_qa=1", storageThrows: true }).appended.length, 0);
});

test("provider host allowlists must be identical and nonempty", () => {
  assert.equal(execute({ umamiDomains: "", gaHosts: "" }).appended.length, 0);
  assert.equal(execute({ gaHosts: production.host }).appended.length, 0);
  assert.equal(execute({ umamiDomains: `${production.alternateHost},${production.host}` }).appended.length, 2);
});

test("source configures manual privacy-bounded pageviews without new identifiers", () => {
  assert.equal((source.match(/window\.gtag\("event", "page_view"/g) ?? []).length, 1);
  assert.match(source, /send_page_view:\s*false/);
  assert.match(source, /allow_google_signals:\s*false/);
  assert.match(source, /allow_ad_personalization_signals:\s*false/);
  assert.doesNotMatch(source, /user_id|user_properties|localStorage|identify\(/i);
});
