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

test("maps Pricing and Work compatibility aliases to meaningful groups", async () => {
  const pricing = await render("/pricing/");
  for (const [alias, group] of [
    ["web-design", "websites"],
    ["website-work", "websites"],
    ["provider-rescue", "provider-rescue"],
    ["analytics-reporting", "ongoing-seo"],
    ["audits-strategy", "research-audits"],
  ]) {
    assert.equal(countId(pricing, alias), 1, `${alias} alias count`);
    if (alias === group) {
      assert.match(pricing, new RegExp(`<section[^>]+id="${group}"`));
    } else {
      assert.match(pricing, new RegExp(`<section[^>]+id="${group}"[\\s\\S]*?id="${alias}"[\\s\\S]*?<\\/section>`));
    }
  }
  const work = await render("/work/");
  for (const [alias, group] of [
    ["sample-report", "evidence-group-public-technical-records"],
    ["public-tools", "evidence-group-current-owned-property-work"],
  ]) {
    assert.equal(countId(work, alias), 1, `${alias} alias count`);
    assert.match(work, new RegExp(`<section[^>]+id="${group}"[\\s\\S]*?id="${alias}"[\\s\\S]*?<\\/section>`));
  }
});

test("links every Work summary to a distinct expanded evidence destination", async () => {
  const html = await render("/work/");
  const expected = [
    "/work/#evidence-website-ownership-map",
    "/work/#evidence-vanity-metrics-redirect-plan",
    "/work/#evidence-route-validation-report",
    "/work/#evidence-boho-analytics-site-graph",
    "/work/#evidence-rank-builder-publishing-system",
    "/work/#evidence-better-grades-interface",
  ];
  const summary = html.match(/<section class="commercial-section commercial-evidence-summary"[\s\S]*?<\/section>/)?.[0] ?? "";
  const links = [...summary.matchAll(/href="([^"]+)"[^>]*>Open the evidence<\/a>/g)].map((match) => match[1]);
  assert.deepEqual(links.slice(0, expected.length), expected);
  assert.equal(new Set(links).size, links.length);
  assert.ok(links.every((link) => link !== "/work/" && link !== "#"));
  for (const destination of expected) assert.equal(countId(html, destination.split("#")[1]), 1, `${destination} detail count`);
});

test("renders exact Work organization, statuses, and evidence fields", async () => {
  const html = await render("/work/");
  for (const text of [
    "Evidence, labeled honestly",
    "Inspect the work by source and status.",
    "Every item states where it came from, what it demonstrates, what it does not demonstrate, and whether it is current, historical, sample, synthetic, or conceptual.",
    "Current owned-property work",
    "Public technical records",
    "Samples and concept work",
    "Source class",
    "What this demonstrates",
    "What this does not demonstrate",
    "Current status",
  ]) assert.ok(html.includes(text), `Work is missing: ${text}`);
  assert.doesNotMatch(html, />Case study</);
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

test("renders three exact decision fields on all five service routes", async () => {
  for (const route of [
    "/services/ongoing-seo/",
    "/services/web-design-redesign/",
    "/services/provider-rescue/",
    "/services/custom-digital-solutions/",
    "/services/research-audits-strategy/",
  ]) {
    const html = await render(route);
    for (const label of ["What Boho needs from you", "What changes the price", "Example deliverable"]) {
      assert.match(html, new RegExp(`<h2>${label}<\\/h2>[\\s\\S]*?<p>[^<]+<\\/p>`), `${route} lacks ${label}`);
    }
  }
});

test("resolves navigation labels from the accepted adapter", async () => {
  const navigation = await source("app/content/navigation.ts");
  assert.match(navigation, /commercialNavigationLinks/);
  assert.doesNotMatch(navigation, /\blabel:\s*"(?:Services|Industries|Pricing|Work|Resources|About|Contact|Local Visibility & Lead Systems|Websites & Managed Hosting|Provider Rescue & Migration|Custom Tools & Automation|Research, Analytics & Improvement|Services overview)"/);
  const mobile = await source("app/components/MobileMenu.tsx");
  assert.match(mobile, /item\.href/);
  assert.match(await render("/"), /href="\/services\/"[^>]*>[\s\S]*?Services overview/);
});

test("preserves progressive-disclosure values while closed", async () => {
  const client = await source("app/components/commercial/CommercialInquiryFormClient.tsx");
  assert.match(client, /hidden=\{!detailsOpen\}/);
  assert.doesNotMatch(client, /detailsOpen\s*\?\s*<div className="commercial-form__grid">\{optionalFields\.map\(renderField\)\}<\/div>\s*:\s*null/);
});

test("renders Homepage metadata from selected commercial slots", async () => {
  const html = await render("/");
  const normalizedHtml = html.replaceAll("&amp;", "&");
  const title = "Boho Digital Services | Web Design, Technical SEO & Digital Engineering";
  const description = "Chicago-based Boho Digital Services builds and repairs websites, search visibility, provider migrations, analytics, and focused digital systems with public starting prices and documented work.";
  const socialTitle = "Elegant websites and technical SEO, without the agency fog.";
  const socialDescription = "Boho builds and repairs the systems that help people find a business, understand it, trust it, and take the next step.";
  assert.deepEqual(
    [...normalizedHtml.matchAll(/<title>([^<]+)<\/title>/g)].map((match) => match[1]),
    [title],
    "Homepage must expose exactly one accepted title",
  );
  for (const [attribute, key, value] of [
    ["name", "description", description],
    ["property", "og:title", socialTitle],
    ["property", "og:description", socialDescription],
    ["name", "twitter:title", socialTitle],
    ["name", "twitter:description", socialDescription],
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
  assert.match(client, /function trackCommercialEvent[\s\S]*?try\s*\{[\s\S]*?umami\?\.track\(event\)[\s\S]*?\}\s*catch\s*\{/);
  assert.match(client, /let confirmedSuccess = false;[\s\S]*?confirmedSuccess = true;[\s\S]*?\}\s*if \(confirmedSuccess\) \{[\s\S]*?setNotice\(\{ kind: "success"[\s\S]*?trackCommercialEvent/);
  assert.doesNotMatch(client, /try \{[\s\S]*?setNotice\(\{ kind: "success"[\s\S]*?\}\s*catch \{/);
  assert.doesNotMatch(client, /trackCommercialEvent\([^)]*,[^)]*\)/);
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
