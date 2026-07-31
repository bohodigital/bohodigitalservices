import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

async function render(pathname = "/") {
  const decodedPath = decodeURIComponent(new URL(pathname, "https://bohodigitalservices.com").pathname);
  const relativePath = decodedPath === "/"
    ? "index.html"
    : decodedPath.endsWith("/")
      ? `${decodedPath.slice(1)}index.html`
      : decodedPath.slice(1);
  return readFile(new URL(`out/${relativePath}`, repositoryRoot), "utf8");
}

function countId(html, id) {
  return (html.match(new RegExp(`\\bid="${id}"`, "g")) ?? []).length;
}

test("renders exact incident routing and unique Start compatibility anchors", async () => {
  const html = await render("/start/");
  for (const text of [
    "Active incident?",
    "Use Emergency Help for an active website or provider incident.",
    "The ordinary project form is not monitored as an emergency channel. Use Emergency Help when a website is down, a launch is failing, access has been lost, or a provider action is actively threatening a working system. Emergency review depends on authority, access, capacity, and risk.",
    "Open Emergency Help",
  ]) assert.ok(html.includes(text), `Start is missing: ${text}`);
  assert.match(html, /href="\/emergency\/"[^>]*>Open Emergency Help<\/a>/);
  assert.equal(countId(html, "project-inquiry"), 1);
  assert.equal(countId(html, "visibility-check-request"), 1);
});

test("carries the four canonical services into Pricing and the editable Start form", async () => {
  const form = await source("app/components/commercial/CommercialInquiryForm.tsx");
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  const commercial = await source("app/content/commercialReset.ts");
  const pricing = await source("app/components/PricingPage.tsx");
  assert.match(pricing, /href="\/start\/"/);
  for (const service of [
    "Business Website",
    "Ongoing SEO & Local Growth",
    "Website Help",
    "Custom System",
  ]) {
    assert.ok(commercial.includes(`"${service}"`), `Start is missing ${service}`);
  }
  assert.match(form, /freeReviewServiceOptions/);
  assert.match(client, /new URLSearchParams\(search\)/);
  assert.match(client, /useSyncExternalStore/);
  assert.match(client, /service instanceof HTMLSelectElement/);
  assert.match(client, /pricing_lead_complete/);
  assert.doesNotMatch(client, /message\s*=\s*(?:params|attribution)/);
});

test("renders exactly four canonical Pricing rows with stable website and SEO anchors", async () => {
  const pricing = await render("/pricing/");
  assert.equal(countId(pricing, "business-websites"), 1);
  assert.equal(countId(pricing, "ongoing-seo"), 1);
  const summary = pricing.match(/<table class="pricing-summary-table">[\s\S]*?<\/table>/)?.[0] ?? "";
  assert.equal((summary.match(/<tr\b/g) ?? []).length, 5);
  for (const service of [
    "Business Websites",
    "Ongoing SEO &amp; Local Growth",
    "Website Help",
    "Custom Systems",
  ]) {
    assert.ok(summary.includes(service), `Pricing is missing ${service}`);
  }
});

test("retires the Work route and removes every public Work link", async () => {
  await assert.rejects(
    render("/work/"),
    (error) => error?.code === "ENOENT",
    "Work must not render a static page",
  );
  const publicRoutes = [
    "/",
    "/services/",
    "/pricing/",
    "/industries/",
    "/resources/",
    "/tools/",
    "/about/",
  ];
  for (const route of publicRoutes) {
    assert.doesNotMatch(await render(route), /href="\/work(?:\/|#|")/i, `${route} retains a Work link`);
  }
  assert.match(await source("out/_redirects"), /(?:^|\n)\/work\s+\/services\/\s+301(?:\n|$)/);
  assert.match(await source("out/_redirects"), /(?:^|\n)\/work\/\s+\/services\/\s+301(?:\n|$)/);
});

test("bounds the complete emergency problem payload without truncation", async () => {
  const form = await source("app/components/commercial/CommercialInquiryForm.tsx");
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  assert.match(form, /publicName: "description"[\s\S]*maxLength: 7500/);
  assert.match(client, /EMERGENCY_PROBLEM_MAX_LENGTH\s*=\s*8_000/);
  assert.match(client, /Keep the incident description under 7,500 characters so the complete emergency message can be delivered\./);
  assert.match(client, /problem\.length\s*>\s*EMERGENCY_PROBLEM_MAX_LENGTH/);
  assert.doesNotMatch(client, /\.slice\([^)]*EMERGENCY_PROBLEM_MAX_LENGTH/);
});

test("aligns all five indexed service routes to the four-service model", async () => {
  const expectations = new Map([
    ["/services/ongoing-seo/", ["ONGOING SEO &amp; LOCAL GROWTH · FROM $450/MONTH", "Ongoing SEO &amp; Local Growth — starting at $450 per month"]],
    ["/services/web-design-redesign/", ["BUSINESS WEBSITES · FROM $850", "Business Websites — starting at $850"]],
    ["/services/provider-rescue/", ["WEBSITE HELP · PROVIDER RESCUE", "Website Help — starting at $200"]],
    ["/services/custom-digital-solutions/", ["CUSTOM SYSTEMS · FROM $1,500", "Custom Systems — starting at $1,500"]],
    ["/services/research-audits-strategy/", ["WEBSITE HELP · RESEARCH, AUDITS, AND STRATEGY", "Website Help — starting at $200"]],
  ]);
  for (const [route, texts] of expectations) {
    const html = await render(route);
    for (const text of texts) assert.ok(html.includes(text), `${route} lacks ${text}`);
  }
});

test("publishes the locked primary navigation and four-service menu", async () => {
  const navigation = await source("app/content/navigation.ts");
  const commercial = await source("app/content/commercialReset.ts");
  for (const label of [
    "Services",
    "Industries",
    "Pricing",
    "About",
    "Contact",
    "Business Websites",
    "Ongoing SEO & Local Growth",
    "Website Help",
    "Custom Systems",
  ]) assert.ok(
    navigation.includes(`"${label}"`) || commercial.includes(`"${label}"`),
    `navigation is missing ${label}`,
  );
  assert.doesNotMatch(navigation, /Local Visibility & Lead Systems|Websites & Managed Hosting|Research, Analytics & Improvement|Custom Tools & Automation/);
  const mobile = await source("app/components/MobileMenu.tsx");
  assert.match(mobile, /item\.href/);
  assert.match(await render("/"), /href="\/services\/"[^>]*>Services<\/a>/);
});

test("preserves progressive-disclosure values while closed", async () => {
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  assert.match(client, /hidden=\{!detailsOpen\}/);
  assert.doesNotMatch(client, /detailsOpen\s*\?\s*<div className="commercial-form__grid">\{optionalFields\.map\(renderField\)\}<\/div>\s*:\s*null/);
});

test("renders the locked Homepage metadata", async () => {
  const html = await render("/");
  const normalizedHtml = html.replaceAll("&amp;", "&");
  const title = "Business Websites from $850 | Free Hosting | Boho";
  const description = "Custom business websites from $850 with eligible hosting at $0 per month in a Cloudflare account your business owns. Ongoing SEO, website help, and custom systems from Boho.";
  assert.deepEqual(
    [...normalizedHtml.matchAll(/<title>([^<]+)<\/title>/g)].map((match) => match[1]),
    [title],
    "Homepage must expose exactly one accepted title",
  );
  for (const [attribute, key, value] of [
    ["name", "description", description],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ]) {
    const pattern = new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`, "g");
    assert.deepEqual(
      [...normalizedHtml.matchAll(pattern)].map((match) => match[1]),
      [value],
      `Homepage must expose exactly one accepted ${key}`,
    );
  }
  assert.ok(normalizedHtml.includes(`"description":"${description}"`));
});

test("keeps confirmed success final when analytics fails", async () => {
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  assert.match(client, /function trackCommercialEvent[\s\S]*?try\s*\{[\s\S]*?umami\?\.track\(event,\s*properties\)[\s\S]*?\}\s*catch\s*\{/);
  assert.match(client, /let confirmedSuccess = false;[\s\S]*?confirmedSuccess = true;[\s\S]*?\}\s*if \(confirmedSuccess\) \{[\s\S]*?setNotice\(\{ kind: "success"[\s\S]*?trackCommercialEvent/);
  assert.doesNotMatch(client, /try \{[\s\S]*?setNotice\(\{ kind: "success"[\s\S]*?\}\s*catch \{/);
  assert.match(client, /pricing_lead_complete[\s\S]*?path:\s*attribution\.analyticsPath[\s\S]*?offer_id:/);
});

test("terminates Turnstile polling and keeps one widget lifecycle", async () => {
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  assert.match(client, /pollTimerRef/);
  assert.match(client, /stopTurnstilePolling\(\)/);
  assert.match(client, /try \{[\s\S]*?widgetIdRef\.current\s*=\s*window\.turnstile\.render[\s\S]*?stopTurnstilePolling\(\);[\s\S]*?\} catch \{[\s\S]*?stopTurnstilePolling\(\)/);
  assert.match(client, /handleScriptError[\s\S]*?stopTurnstilePolling\(\)[\s\S]*?addEventListener\("error", handleScriptError\)/);
  assert.match(client, /return \(\) => \{[\s\S]*?stopTurnstilePolling\(\)[\s\S]*?removeEventListener\("error", handleScriptError\)[\s\S]*?turnstile\.remove/);
  assert.match(client, /function resetTurnstile\(\) \{[\s\S]*?stopTurnstilePolling\(\)[\s\S]*?try \{[\s\S]*?turnstile\.reset[\s\S]*?\} catch \{/);
  assert.doesNotMatch(client, /const poll = window\.setInterval/);
});

test("restores desktop-menu focus to the dropdown that handled Escape", async () => {
  const navigation = await source("app/components/DesktopNavigation.tsx");
  assert.match(navigation, /dropdownToggleRefs/);
  assert.match(navigation, /dropdownToggleRefs\.current\.get\(openLabel\)/);
  assert.doesNotMatch(navigation, /const dropdownToggleRef =/);
});

test("keeps generated artifacts current and Analytics availability blocked", async () => {
  const result = spawnSync(process.execPath, ["scripts/commercial-copy-build.mjs", "--check"], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const contract = JSON.parse(await source("content/commercial/commercial-copy-contract.json"));
  assert.equal(contract.corrections.analyticsAvailability.targetApproved, false);
  assert.equal(contract.corrections.analyticsAvailability.replacementText, null);
  const blocked = JSON.parse(await source("content/commercial/blocked-copy.json"));
  assert.equal(blocked.items.length, 1);
  assert.equal(blocked.items[0].key, "product.bohoAnalytics.publicFreeAvailability");
  assert.equal(blocked.items[0].targetApproved, false);
  assert.equal(blocked.items[0].replacementText, null);
  assert.ok(blocked.items[0].currentClaims.length > 0);
});

async function walk(directory, relative = "") {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".next", "dist", "node_modules", "out"].includes(entry.name)) continue;
    const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) found.push(...await walk(new URL(`${entry.name}/`, directory), nextRelative));
    else found.push(nextRelative);
  }
  return found;
}

test("contains no backup, scratch, placeholder, or temporary files", async () => {
  const files = await walk(repositoryRoot);
  const prohibited = files.filter((path) => (
    /(?:^|\/)(?:scratch|placeholder|temp|tmp)(?:[./_-]|$)/i.test(path)
    || /\.(?:orig|bak|backup|scratch|temp|tmp)$/i.test(path)
    || /~$/.test(path)
  ));
  assert.deepEqual(prohibited, []);
});
