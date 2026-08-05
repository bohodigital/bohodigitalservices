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
      const [pathname] = href.split("#");
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

test("primary service pages render their completed visual evidence and handoff content", async () => {
  const expectations = new Map([
    ["/services/web-design-redesign/", [8, "/demos/junk-removal-homepage.webp", "The launch should still make sense after the handoff."]],
    ["/services/ongoing-seo/", [8, "/proof/about/rank-builder-seo-homepage.png", "Each cycle ends with work you can inspect."]],
    ["/services/provider-rescue/", [7, "/diagrams/boho-hosting-architecture-v2.png", "A rescue should leave the next operator less dependent."]],
    ["/services/research-audits-strategy/", [8, "/proof/tools/boho-analytics-dashboard-v2.png", "A review should make the decision easier."]],
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

test("current analytics screenshot is labeled as illustrative public evidence", async () => {
  for (const route of ["/resources/", "/services/research-audits-strategy/"]) {
    const html = await render(route);
    assert.ok(html.includes("/proof/tools/boho-analytics-dashboard-v2.png"), `${route} lacks the current dashboard`);
    assert.ok(html.includes("Sanitized illustrative data"), `${route} lacks the data disclaimer`);
    assert.ok(html.includes("Public repository screenshot"), `${route} lacks the evidence label`);
    assert.ok(html.includes("Not client data"), `${route} lacks the client-data disclaimer`);
  }
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
