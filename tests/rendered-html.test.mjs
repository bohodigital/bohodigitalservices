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
