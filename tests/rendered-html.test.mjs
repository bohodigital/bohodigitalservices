import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import "./commercial-release-candidate.test.mjs";

const root = new URL("../", import.meta.url);
const publicRoutes = [
  "/", "/services/", "/pricing/", "/work/", "/start/", "/about/", "/industries/",
  "/services/web-design-redesign/", "/services/ongoing-seo/", "/services/website-help/",
  "/services/custom-digital-solutions/", "/services/provider-rescue/", "/services/research-audits-strategy/",
  "/tools/", "/resources/", "/learn/website-buying/", "/emergency/", "/contact/",
  "/privacy/", "/terms/", "/accessibility/",
  "/industries/home-improvement-contractors/", "/industries/local-service-businesses/",
  "/industries/brick-and-mortar-retail-hospitality/", "/industries/online-retail-ecommerce/",
  "/industries/professional-b2b-services/",
];

async function read(path) { return readFile(new URL(path, root), "utf8"); }
async function render(route) {
  return read(`out/${route === "/" ? "index.html" : `${route.slice(1)}index.html`}`);
}

test("renders every closeout route with one H1 and complete index metadata", async () => {
  for (const route of publicRoutes) {
    const html = await render(route);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} must have one H1`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${route} lacks title`);
    assert.match(html, /<meta name="description" content="[^"]+"/i, `${route} lacks description`);
    assert.match(html, /<link rel="canonical" href="https:\/\/bohodigitalservices\.com\//i, `${route} lacks canonical`);
    assert.doesNotMatch(html, /noindex/i, `${route} unexpectedly noindex`);
  }
});

test("resolves every rendered local page link and asset", async () => {
  for (const route of publicRoutes) {
    const html = await render(route);
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const pathname = new URL(href, "https://bohodigitalservices.com").pathname;
      if (!pathname) continue;
      const output = pathname === "/" ? "out/index.html" : pathname.endsWith("/") ? `out/${pathname.slice(1)}index.html` : `out${pathname}`;
      await assert.doesNotReject(access(new URL(output, root)), `${route} has broken link ${href}`);
    }
    for (const [, src] of html.matchAll(/<(?:img|script)\b[^>]*\ssrc="(\/[^"]+)"/gi)) {
      await assert.doesNotReject(access(new URL(`out${src}`, root)), `${route} has missing asset ${src}`);
    }
  }
});

test("keeps all redirects one hop with no loop and no canonical Work redirect", async () => {
  const rules = (await read("out/_redirects")).trim().split("\n").filter(Boolean).map((line) => line.split(/\s+/));
  const destinations = new Map(rules.map(([from, to]) => [from, to]));
  assert.equal(destinations.has("/work/"), false);
  for (const [from, to] of destinations) {
    const pathname = to.split("#")[0];
    assert.notEqual(from, pathname, `redirect loop at ${from}`);
    assert.equal(destinations.has(pathname), false, `redirect chain from ${from} through ${pathname}`);
  }
});

test("FAQ structured data matches visible Homepage questions and answers", async () => {
  const html = await render("/");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faq = blocks.flatMap((block) => block["@graph"] ?? [block]).find((item) => item["@type"] === "FAQPage");
  assert.ok(faq);
  for (const item of faq.mainEntity) {
    assert.ok(html.includes(item.name));
    assert.ok(html.includes(item.acceptedAnswer.text.replaceAll("&", "&amp;")) || html.includes(item.acceptedAnswer.text));
  }
});

test("publishes route-specific search metadata and useful structured data", async () => {
  const [homepage, provider] = await Promise.all([
    render("/"),
    render("/services/provider-rescue/"),
  ]);

  for (const [html, values] of [
    [homepage, {
      title: "Provider Rescue &amp; Website Help | Boho Digital Services",
      description: "Recover control of your domain, hosting, content, analytics, and accounts before changing website providers. Chicago-based website help starts at $200.",
      canonical: "https://bohodigitalservices.com/",
    }],
    [provider, {
      title: "Website Migration, Ownership Recovery &amp; Provider Rescue | Boho",
      description: "Map ownership and dependencies, preserve useful URLs and assets, leave an unsuitable provider, migrate carefully, and verify the agreed website and customer paths.",
      canonical: "https://bohodigitalservices.com/services/provider-rescue/",
    }],
  ]) {
    assert.ok(html.includes(`<title>${values.title}</title>`));
    assert.ok(html.includes(`name="description" content="${values.description}"`));
    assert.ok(html.includes(`rel="canonical" href="${values.canonical}"`));
    assert.ok(html.includes(`property="og:url" content="${values.canonical}"`));
    assert.match(html, /property="og:title" content="[^"]+"/);
    assert.match(html, /property="og:description" content="[^"]+"/);
    assert.match(html, /name="twitter:title" content="[^"]+"/);
    assert.match(html, /name="twitter:description" content="[^"]+"/);
  }

  const homepageBlocks = [...homepage.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const homepageGraph = homepageBlocks.flatMap((block) => block["@graph"] ?? [block]);
  assert.ok(homepageGraph.some((item) => item["@type"] === "WebSite"));
  assert.ok(homepageGraph.some((item) => item["@type"] === "ItemList"));

  const providerBlocks = [...provider.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const providerGraph = providerBlocks.flatMap((block) => block["@graph"] ?? [block]);
  assert.ok(providerGraph.some((item) => item["@type"] === "BreadcrumbList"));
  assert.ok(providerGraph.some((item) => item["@type"] === "Service"));
  assert.doesNotMatch(`${homepage}${provider}`, /"@type":"Person"/);
  assert.match(homepage, /href="\/brand\/boho-search-icon-v2-96\.png"/);
});

test("keeps the generated 404 out of search without publishing a canonical", async () => {
  const html = await read("out/404.html");
  assert.equal((html.match(/<meta name="robots" content="noindex"\/?/g) ?? []).length, 1);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /name="description"/);
});

test("primary service pages render their completed visual evidence and handoff content", async () => {
  const expectations = new Map([
    ["/services/web-design-redesign/", [8, "/demos/junk-removal-homepage.webp", "The launch should still make sense after the handoff."]],
    ["/services/ongoing-seo/", [8, "/proof/about/rank-builder-seo-homepage.png", "Each cycle ends with work you can inspect."]],
    ["/services/provider-rescue/", [4, "/diagrams/boho-hosting-architecture-v2.png", "A rescue should leave the next operator less dependent."]],
    ["/services/research-audits-strategy/", [8, "/proof/tools/boho-analytics-demo-command-center-20260806.webp", "A review should make the decision easier."]],
    ["/services/custom-digital-solutions/", [8, "/proof/tools/boho-secret-broker.png", "A custom system needs more than working code."]],
  ]);

  for (const [route, [minimumImages, requiredAsset, requiredHeading]] of expectations) {
    const html = await render(route);
    assert.ok((html.match(/<img\b/gi) ?? []).length >= minimumImages, `${route} is visually underfilled`);
    assert.ok(html.includes(requiredAsset), `${route} lacks its route-specific evidence asset`);
    assert.ok(html.includes(requiredHeading), `${route} lacks its completed handoff section`);
    assert.doesNotMatch(html, /<article[^>]*>\s*<\/article>/i, `${route} contains a blank card`);
  }
});

test("current analytics product evidence is public, open source, and unmistakably synthetic", async () => {
  for (const route of ["/", "/resources/", "/services/research-audits-strategy/"]) {
    const html = await render(route);
    assert.ok(html.includes("/proof/tools/boho-analytics-demo-command-center-20260806.webp"), `${route} lacks the current dashboard`);
    assert.match(html, /Synthetic demo/i, `${route} lacks the synthetic-data disclaimer`);
    assert.match(html, /open.source/i, `${route} lacks the open-source label`);
    assert.match(html, /No client data/i, `${route} lacks the client-data disclaimer`);
  }
});

test("homepage product mosaic opens internal product tours in new tabs before outbound documentation", async () => {
  const html = await render("/");
  for (const [modifier, href] of [
    ["command", "/resources/#boho-analytics-command-center"],
    ["plot", "/resources/#boho-analytics-plot-builder"],
    ["graph", "/resources/#boho-site-graph"],
  ]) {
    const card = html.match(new RegExp(`<a[^>]*class="analytics-product-ad__visual analytics-product-ad__visual--${modifier}"[^>]*>`))?.[0];
    assert.ok(card, `homepage lacks the ${modifier} product preview`);
    assert.ok(card.includes(`href="${href}"`), `${modifier} preview bypasses its internal product tour`);
    assert.ok(card.includes('target="_blank"'), `${modifier} preview does not preserve the homepage tab`);
    assert.ok(card.includes('rel="noopener noreferrer"'), `${modifier} preview lacks safe new-tab behavior`);
    assert.ok(card.includes('data-analytics-destination-type="internal_tool_detail"'));
  }
  assert.match(html, /class="analytics-product-ad__term analytics-product-ad__term--seo"[^>]*href="\/services\/ongoing-seo\/"/);
  assert.match(html, /class="analytics-product-ad__term analytics-product-ad__term--open"[^>]*href="\/resources\/#analysis-dashboard"[^>]*target="_blank"/);
  assert.match(html, /href="https:\/\/github\.com\/bohodigital\/boho-analytics-platform#quick-start-with-a-blank-configuration"[^>]*target="_blank"/);
});

test("resources provides complete internal landing sections and keeps deliberate source links outbound", async () => {
  const html = await render("/resources/");
  for (const id of ["analysis-dashboard", "boho-analytics-command-center", "boho-analytics-plot-builder", "boho-site-graph"]) {
    assert.match(html, new RegExp(`id="${id}"`), `resources lacks #${id}`);
  }
  for (const phrase of [
    "Compare the signals without erasing where they came from.",
    "Build the chart the decision actually requires.",
    "See where pages lead—and where the site structure runs out of road.",
    "The software stays free whether or not you hire Boho.",
  ]) assert.ok(html.includes(phrase), `resources tour lacks: ${phrase}`);
  assert.match(html, /href="https:\/\/github\.com\/bohodigital\/boho-analytics-platform"[^>]*target="_blank"/);
  assert.match(html, /href="https:\/\/github\.com\/bohodigital\/boho-analytics-platform\/blob\/main\/docs\/providers\.md"[^>]*target="_blank"/);
  assert.match(html, /href="https:\/\/github\.com\/bohodigital\/boho-analytics-platform\/blob\/main\/docs\/site-graph\/engine\.md"[^>]*target="_blank"/);
});

test("software showcase previews stay on Boho product profiles before linking to repositories", async () => {
  const [research, custom, tools, work] = await Promise.all([
    render("/services/research-audits-strategy/"),
    render("/services/custom-digital-solutions/"),
    render("/tools/"),
    render("/work/"),
  ]);

  for (const html of [research, custom]) {
    for (const href of [
      "/resources/#boho-analytics-command-center",
      "/resources/#boho-analytics-plot-builder",
      "/resources/#boho-site-graph",
    ]) assert.match(html, new RegExp(`class="service-showcase__card-link" href="${href}"[^>]*target="_blank"`));
    assert.doesNotMatch(html, /class="service-showcase__card-link" href="https:\/\/github\.com\/bohodigital\//);
  }
  assert.match(custom, /class="service-showcase__card-link" href="\/tools\/#secret-broker"[^>]*target="_blank"/);
  assert.match(custom, /class="service-showcase__card-link" href="\/tools\/#bsuite-mcp-monitor"[^>]*target="_blank"/);

  for (const id of ["secret-broker", "bsuite-mcp-monitor"]) assert.match(tools, new RegExp(`id="${id}"`));
  assert.match(work, /class="reset-work-tool-card__link"[^>]*href="\/resources\/#analysis-dashboard"[^>]*target="_blank"/);
  assert.doesNotMatch(work, /class="reset-work-tool-card__link"[^>]*href="https:\/\/github\.com\/bohodigital\//);
});

test("website service page presents the demo library and links every planning tier to a live demo", async () => {
  const html = await render("/services/web-design-redesign/");
  assert.ok(html.includes("Check out our demo library."));
  assert.ok(html.includes("Browse all eight demos"));
  assert.ok(html.includes("/work/#demo-library"));
  for (const [label, host] of [
    ["See an $850 demo", "junkremoval.demos.bohodigitalservices.com"],
    ["See an expanded demo", "landscaping.demos.bohodigitalservices.com"],
    ["See a multi-location demo", "dentistry.demos.bohodigitalservices.com"],
    ["See an interactive demo", "pestcontrol.demos.bohodigitalservices.com"],
  ]) {
    assert.ok(html.includes(label), `website scope cards lack ${label}`);
    assert.ok(html.includes(host), `website scope cards lack ${host}`);
  }
  assert.ok((html.match(/Tour the demo/gi) ?? []).length >= 6, "demo mosaic cards are not visibly actionable");
});
