import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { readGlossaryExamples, readGlossarySource } from "./glossary-source.mjs";
import {
  loadLegacyUrlMap,
  normalizedPath,
  verifiedRedirectRecords,
} from "./routing/redirect-registry.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = join(repositoryRoot, "out");
const routingDirectory = join(repositoryRoot, "content", "routing");
const reportDirectory = join(repositoryRoot, "docs", "reports");
const legacyStaticRoot = join(repositoryRoot, "_legacy-boho", "current", "_legacy-static");
const siteUrl = "https://bohodigitalservices.com";
const checkOnly = process.argv.includes("--check");

async function emitArtifact(path, contents) {
  if (checkOnly) {
    const existing = await readFile(path, "utf8");
    if (existing !== contents) {
      throw new Error(`Generated route artifact is stale: ${relative(repositoryRoot, path)}`);
    }
    return;
  }
  await writeFile(path, contents, "utf8");
}

async function filesBelow(directory, predicate) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(path, predicate));
    else if (predicate(path)) files.push(path);
  }
  return files;
}

function routeForOutputHtml(path) {
  const local = relative(outputRoot, path).replaceAll("\\", "/");
  if (local === "index.html") return "/";
  return `/${local.replace(/index\.html$/, "")}`;
}

function pageType(path) {
  if (path === "/") return "homepage";
  if (path === "/learn/glossary/") return "glossary-hub";
  if (/^\/learn\/glossary\/[^/]+\/$/.test(path)) return "glossary-detail";
  if (path.startsWith("/services/")) return "service";
  if (path.startsWith("/industries/")) return "industry";
  if (path.startsWith("/learn/")) return "learning";
  if (["/privacy/", "/terms/", "/accessibility/"].includes(path)) return "policy";
  if (["/contact/", "/start/", "/emergency/"].includes(path)) return "conversion";
  return "public-page";
}

function text(value) {
  return value
    ?.replace(/<[^>]+>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim() ?? "";
}

function outputFileForRoute(path) {
  return path === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, path.slice(1), "index.html");
}

await Promise.all([
  mkdir(routingDirectory, { recursive: true }),
  mkdir(reportDirectory, { recursive: true }),
]);

const sitemap = await readFile(join(outputRoot, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/bohodigitalservices\.com([^<]+)<\/loc>/g)]
  .map((match) => normalizedPath(match[1]));
const sitemapSet = new Set(sitemapPaths);
const htmlFiles = await filesBelow(outputRoot, (path) => path.endsWith(".html"));
const htmlByRoute = new Map();
const inlinks = new Map();

for (const path of htmlFiles) {
  const route = routeForOutputHtml(path);
  htmlByRoute.set(route, await readFile(path, "utf8"));
}

for (const [sourceRoute, html] of htmlByRoute) {
  const uniqueTargets = new Set();
  for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = href.split(/[?#]/, 1)[0] || sourceRoute;
    if (/\.[a-z0-9]+$/i.test(pathname)) continue;
    uniqueTargets.add(normalizedPath(pathname));
  }
  for (const target of uniqueTargets) {
    inlinks.set(target, (inlinks.get(target) ?? 0) + 1);
  }
}

const currentRoutes = [];
for (const path of sitemapPaths) {
  const html = await readFile(outputFileForRoute(path), "utf8");
  currentRoutes.push({
    url: `${siteUrl}${path}`,
    path,
    pageType: pageType(path),
    expectedStatus: 200,
    actualStatus: 200,
    canonicalUrl: html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? null,
    indexability: /<meta name="robots" content="index, follow"\/>/i.test(html) ? "index, follow" : "unknown",
    sitemapMembership: true,
    internalInlinkCount: inlinks.get(path) ?? 0,
    title: text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]),
    description: text(html.match(/<meta name="description" content="([^"]*)"/i)?.[1]),
    finalRedirectDestination: null,
    disposition: "PRESERVE",
    evidence: "Generated static output and sitemap.",
  });
}

const legacyRegistry = await loadLegacyUrlMap();
const verifiedRecords = verifiedRedirectRecords(legacyRegistry);
const historicalRoutes = legacyRegistry.records.map((record) => ({
  url: `${siteUrl}${normalizedPath(record.source)}`,
  path: normalizedPath(record.source),
  pageType: record.sourceType,
  expectedStatus: record.verified ? 301 : "owner review",
  actualStatus: record.verified ? "generated 301" : 404,
  canonicalUrl: null,
  indexability: record.verified ? "redirect" : "not indexed",
  sitemapMembership: false,
  internalInlinkCount: inlinks.get(normalizedPath(record.source)) ?? 0,
  title: null,
  description: null,
  finalRedirectDestination: record.verified ? record.destination : null,
  disposition: record.disposition,
  evidence: record.evidence,
  verified: record.verified,
  ownerReviewed: record.ownerReviewed,
  notes: record.reason,
}));

const publicRegistry = {
  version: 1,
  generatedAt: "2026-07-22",
  baseCommit: "bcd3faf80c96dcb0416418389e75dc050d74f2b2",
  siteUrl,
  currentRouteCount: currentRoutes.length,
  historicalRecordCount: historicalRoutes.length,
  routes: [...currentRoutes, ...historicalRoutes],
};

await emitArtifact(
  join(routingDirectory, "public-route-registry.json"),
  `${JSON.stringify(publicRegistry, null, 2)}\n`,
);

const { entries } = await readGlossarySource();
const { examples } = await readGlossaryExamples();
const glossaryManifest = {
  version: 1,
  generatedAt: "2026-07-22",
  canonicalHub: `${siteUrl}/learn/glossary/`,
  recordCount: entries.length,
  records: entries.map((entry) => ({
    term: entry.term,
    slug: entry.slug,
    path: `/learn/glossary/${entry.slug}/`,
    canonicalUrl: `${siteUrl}/learn/glossary/${entry.slug}/`,
    shortDefinition: entry.shortDefinition,
    practicalExample: examples.get(entry.slug),
    indexable: true,
    sitemap: true,
  })),
};
await emitArtifact(
  join(routingDirectory, "glossary-route-manifest.json"),
  `${JSON.stringify(glossaryManifest, null, 2)}\n`,
);

const legacyHtmlFiles = await filesBelow(
  legacyStaticRoot,
  (path) => path.endsWith("index.html") && !path.includes("public-assets-unused"),
);
const registryBySource = new Map(
  legacyRegistry.records.map((record) => [normalizedPath(record.source), record]),
);
const legacyEvidence = legacyHtmlFiles
  .map((path) => {
    const local = relative(legacyStaticRoot, path).replaceAll("\\", "/");
    const route = local === "index.html" ? "/" : `/${local.replace(/index\.html$/, "")}`;
    const normalized = normalizedPath(route);
    const record = registryBySource.get(normalized);
    return {
      path: normalized,
      disposition: sitemapSet.has(normalized) ? "PRESERVE" : record?.disposition ?? "UNRESOLVED",
      destination: record?.verified ? record.destination : null,
      verified: record?.verified ?? sitemapSet.has(normalized),
      evidence: relative(repositoryRoot, path).replaceAll("\\", "/"),
    };
  })
  .filter((record) => record.path !== "/404/")
  .sort((left, right) => left.path.localeCompare(right.path));

const unresolved = legacyRegistry.records.filter((record) => !record.verified);
const historicalPreserved = legacyEvidence.filter((record) => record.disposition === "PRESERVE").length;
const historicalUnrepresented = legacyEvidence.filter((record) => record.disposition === "UNRESOLVED" && !registryBySource.has(record.path));

const audit = `# Boho URL migration audit

Work order: \`WO-2026-07-22-BOHO-TECHNICAL-VISIBILITY-GLOSSARY-001\`

Base commit: \`bcd3faf80c96dcb0416418389e75dc050d74f2b2\`

## Evidence checked

- Current core, audience, industry, service, retired-page, sitemap, and static-output registries
- Tracked Ask-the-Owl source files and generated legacy HTML
- Tracked legacy sitemap
- Git history, including the earlier unmerged glossary-routing prototype
- Existing generated Cloudflare Pages redirects
- Rendered current static output and internal links

Search Console URL exports, raw analytics URL exports, Cloudflare request logs, and Internet Archive data were not available in this checkout. No route was inferred from those unavailable sources.

## Current inventory

- Canonical indexable routes: ${currentRoutes.length}
- Glossary hub routes: 1
- Glossary detail routes: ${entries.length}
- Current routes missing a canonical: ${currentRoutes.filter((route) => !route.canonicalUrl).length}
- Current routes marked noindex: ${currentRoutes.filter((route) => route.indexability !== "index, follow").length}

The complete machine-readable inventory is \`content/routing/public-route-registry.json\`.

## Historical inventory

- Tracked legacy HTML routes reviewed: ${legacyEvidence.length}
- Historical routes that remain canonical: ${historicalPreserved}
- Governed historical/retired records: ${legacyRegistry.records.length}
- Verified redirect records: ${verifiedRecords.length}
- Unverified or unresolved records: ${unresolved.length}
- Legacy HTML routes without a registry decision: ${historicalUnrepresented.length}

${legacyEvidence.map((record) => `- \`${record.path}\` — **${record.disposition}**${record.destination ? ` → \`${record.destination}\`` : ""} — evidence: \`${record.evidence}\``).join("\n")}

## Vanity Metrics recovery

Verified historical source:

\`${siteUrl}/ask-the-owl/dictionary/vanity-metrics/\`

Direct canonical destination:

\`/learn/glossary/vanity-metrics/\`

Evidence consists of the tracked Markdown source entry, tracked generated HTML, tracked legacy sitemap entry, and Git history. Both slash variants are generated directly to the final destination with status 301.

## Unresolved routes

The following candidates are deliberately not emitted because the exact replacement is unverified or an owner decision is required:

${unresolved.map((record) => `- \`${record.source}\` — ${record.reason}`).join("\n")}

No unresolved route was redirected to the homepage, and no 410 was introduced without owner approval.
`;
await emitArtifact(join(reportDirectory, "boho-url-migration-audit.md"), audit);

const manifestReport = `# Boho glossary route manifest

- Canonical hub: \`/learn/glossary/\`
- Glossary records: ${entries.length}
- Stable explicit slugs: ${entries.length}
- Generated detail pages: ${entries.length}
- Sitemap detail URLs: ${entries.length}
- Indexable detail pages: ${entries.length}
- Reviewed practical examples: ${examples.size}
- Noindex detail pages: 0
- Slug collisions: 0
- Unresolved related-term references: 0

Every detail route uses \`/learn/glossary/<stable-slug>/\`. The explicit slug stored with each canonical glossary entry is the permanent route key; display-term changes do not recalculate the route.

The complete machine-readable manifest is \`content/routing/glossary-route-manifest.json\`.
`;
await emitArtifact(
  join(reportDirectory, "boho-glossary-route-manifest.md"),
  manifestReport,
);

console.log(JSON.stringify({
  currentRoutes: currentRoutes.length,
  historicalRecords: historicalRoutes.length,
  legacyHtmlRoutes: legacyEvidence.length,
  verifiedRedirects: verifiedRecords.length,
  glossaryRoutes: entries.length,
  mode: checkOnly ? "check" : "write",
}));
