import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

import { readGlossarySource } from "./glossary-source.mjs";

const siteUrl = "https://bohodigitalservices.com";
const out = new URL("../out/", import.meta.url);
const { clusterSlugs, entries, sourceIds } = await readGlossarySource();
const slugs = new Set();

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim();
}

assert.ok(entries.length > 0, "glossary source parser found no entries");

for (const entry of entries) {
  assert.ok(entry.term, "glossary entry lacks a term");
  assert.ok(entry.shortDefinition, `${entry.term ?? "unknown entry"} lacks a short preview`);
  assert.match(entry.slug ?? "", /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${entry.term} has an unsafe slug`);
  assert.ok(!slugs.has(entry.slug), `duplicate glossary slug: ${entry.slug}`);
  slugs.add(entry.slug);
  assert.ok(clusterSlugs.has(entry.slug), `${entry.slug} lacks a cluster assignment`);
}

for (const entry of entries) {
  for (const related of entry.relatedTermSlugs) {
    assert.ok(slugs.has(related), `${entry.slug} has unresolved related term ${related}`);
  }
  for (const sourceId of entry.sourceIds) {
    assert.ok(sourceIds.has(sourceId), `${entry.slug} has unresolved source ${sourceId}`);
  }
}

const sitemap = await readFile(new URL("sitemap.xml", out), "utf8");
const sitemapGlossaryUrls = [
  ...sitemap.matchAll(/<loc>(https:\/\/bohodigitalservices\.com\/learn\/glossary\/[a-z0-9-]+\/)<\/loc>/g),
].map((match) => match[1]);
assert.equal(sitemapGlossaryUrls.length, entries.length, "glossary sitemap parity mismatch");
assert.equal(new Set(sitemapGlossaryUrls).size, entries.length, "duplicate glossary sitemap URL");

const hub = await readFile(new URL("learn/glossary/index.html", out), "utf8");
const canonicals = new Set();
let noindexCount = 0;

for (const entry of entries) {
  const route = `/learn/glossary/${entry.slug}/`;
  const canonical = `${siteUrl}${route}`;
  const pageUrl = new URL(`learn/glossary/${entry.slug}/index.html`, out);
  await access(pageUrl);
  const html = await readFile(pageUrl, "utf8");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decodeHtml(match[1]));
  assert.deepEqual(h1s, [entry.term], `${route} must have exactly one term H1`);
  assert.ok(decodeHtml(html).includes(entry.shortDefinition), `${route} lacks its canonical preview`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  assert.match(html, /<meta name="robots" content="index, follow"\/>/i, `${route} is not indexable`);
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) noindexCount += 1;
  assert.match(html, /<meta name="description" content="[^"]+"/i, `${route} lacks a description`);
  assert.match(html, /<nav\b[^>]*aria-label="Breadcrumb"/i, `${route} lacks labeled breadcrumbs`);
  assert.match(html, /href="\/learn\/glossary\/"[^>]*>Return to the complete glossary/i);
  assert.match(hub, new RegExp(`href="${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${route} is orphaned from the hub`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${route} is missing from sitemap`);
  assert.ok(!canonicals.has(canonical), `duplicate canonical: ${canonical}`);
  canonicals.add(canonical);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((schema) => schema["@type"] === "DefinedTerm"), `${route} lacks DefinedTerm JSON-LD`);
  assert.ok(schemas.some((schema) => schema["@type"] === "BreadcrumbList"), `${route} lacks BreadcrumbList JSON-LD`);

  for (const related of entry.relatedTermSlugs) {
    assert.match(html, new RegExp(`href="/learn/glossary/${related}/"`), `${route} lacks related link ${related}`);
  }
}

const vanity = entries.find((entry) => entry.slug === "vanity-metrics");
assert.ok(vanity, "Vanity metrics route is required");
assert.equal(
  vanity.shortDefinition,
  "Vanity metrics are numbers that look impressive without helping a team make better decisions.",
  "Vanity metrics must preserve the historical source preview verbatim",
);

const vanityHtml = await readFile(
  new URL("learn/glossary/vanity-metrics/index.html", out),
  "utf8",
);
const linkedScripts = [...vanityHtml.matchAll(/<script\b[^>]*src="([^"]+)"/gi)]
  .map((match) => match[1])
  .filter((src) => src.startsWith("/_next/static/"));
let shippedFullGlossary = false;
for (const src of linkedScripts) {
  const script = await readFile(new URL(src.slice(1), out), "utf8");
  if (script.includes("Vanity metrics are numbers that look impressive") && script.includes("A computer or program that receives requests")) {
    shippedFullGlossary = true;
  }
}
assert.equal(shippedFullGlossary, false, "term page ships the full glossary in client JavaScript");

assert.equal(noindexCount, 0, "noindex glossary pages");
console.log(JSON.stringify({
  glossaryRecords: entries.length,
  stableSlugs: slugs.size,
  generatedDetailPages: entries.length,
  sitemapGlossaryUrls: sitemapGlossaryUrls.length,
  noindexGlossaryPages: noindexCount,
  slugCollisions: 0,
  unresolvedRelatedTerms: 0,
  fullGlossaryInTermClientBundle: shippedFullGlossary,
}));
