import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

import {
  loadLegacyUrlMap,
  normalizedPath,
  pagesRedirectRules,
  validateRedirectRegistry,
  verifiedRedirectRecords,
} from "./routing/redirect-registry.mjs";

const out = new URL("../out/", import.meta.url);
const registry = await loadLegacyUrlMap();
const summary = validateRedirectRegistry(registry);
const verified = verifiedRedirectRecords(registry);
const expectedRules = pagesRedirectRules(verified);
const actualRules = (await readFile(new URL("_redirects", out), "utf8"))
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

assert.deepEqual(actualRules, expectedRules, "_redirects must be generated only from the canonical registry");

const sitemap = await readFile(new URL("sitemap.xml", out), "utf8");
const canonicalPaths = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/bohodigitalservices\.com([^<]+)<\/loc>/g)]
    .map((match) => normalizedPath(match[1])),
);
const retiredSource = await readFile(
  new URL("../app/content/publicPages.ts", import.meta.url),
  "utf8",
);
const retiredPaths = [
  ...retiredSource.matchAll(/^\s*"([^"]+)",?$/gm),
].map((match) => normalizedPath(match[1]));
const registrySources = new Set(registry.records.map((record) => normalizedPath(record.source)));

for (const retiredPath of retiredPaths) {
  assert.ok(
    registrySources.has(retiredPath),
    `retired route lacks a governed disposition: ${retiredPath}`,
  );
}

for (const record of verified) {
  const source = normalizedPath(record.source);
  const destination = normalizedPath(record.destination);
  assert.ok(!canonicalPaths.has(source), `canonical current route is redirected: ${source}`);
  assert.ok(canonicalPaths.has(destination), `redirect destination is not canonical: ${record.destination}`);

  const destinationFile = destination === "/"
    ? new URL("index.html", out)
    : new URL(`${destination.slice(1)}index.html`, out);
  await access(destinationFile);

  const fragment = record.destination.split("#", 2)[1];
  if (fragment) {
    const html = await readFile(destinationFile, "utf8");
    const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(html, new RegExp(`id="${escaped}"`, "i"), `missing redirect fragment: ${record.destination}`);
  }
}

const vanityRules = actualRules.filter((line) =>
  line.startsWith("/ask-the-owl/dictionary/vanity-metrics"),
);
assert.deepEqual(vanityRules, [
  "/ask-the-owl/dictionary/vanity-metrics /learn/glossary/vanity-metrics/ 301",
  "/ask-the-owl/dictionary/vanity-metrics/ /learn/glossary/vanity-metrics/ 301",
]);

console.log(JSON.stringify({
  registryRecords: summary.allSourceCount,
  verifiedRedirectRecords: summary.verifiedSourceCount,
  generatedRules: actualRules.length,
  redirectChains: 0,
  redirectLoops: 0,
}));
