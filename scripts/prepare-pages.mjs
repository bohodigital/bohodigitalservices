import { access, copyFile, readdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import {
  loadLegacyUrlMap,
  pagesRedirectRules,
  validateRedirectRegistry,
  verifiedRedirectRecords,
} from "./routing/redirect-registry.mjs";

const outputDirectory = fileURLToPath(new URL("../out/", import.meta.url));
const indexPage = fileURLToPath(new URL("../out/index.html", import.meta.url));
const robotsFile = fileURLToPath(new URL("../out/robots.txt", import.meta.url));
const sitemapFile = fileURLToPath(new URL("../out/sitemap.xml", import.meta.url));
const headersFile = fileURLToPath(new URL("../out/_headers", import.meta.url));
const redirectsFile = fileURLToPath(new URL("../out/_redirects", import.meta.url));
const staleWorkerDeployConfig = fileURLToPath(
  new URL("../.wrangler/deploy/", import.meta.url),
);

await Promise.all([
  access(outputDirectory),
  access(indexPage),
  access(robotsFile),
  access(sitemapFile),
]);

// A previous vinext build may leave a generated Worker configuration here.
// Wrangler prioritizes it over the root Pages configuration, so remove it
// before any static preview or production upload.
await rm(staleWorkerDeployConfig, { recursive: true, force: true });

async function materializeFlightAliases(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const childDirectory = join(directory, entry.name);
    if (entry.name.startsWith("__next.") && entry.name.includes("$")) {
      for (const payload of await readdir(childDirectory, { withFileTypes: true })) {
        if (!payload.isFile()) continue;
        await copyFile(
          join(childDirectory, payload.name),
          join(directory, `${entry.name}.${payload.name}`),
        );
      }
      continue;
    }

    await materializeFlightAliases(childDirectory);
  }
}

// Next emits dynamic-segment Flight payloads in nested directories, while its
// client prefetcher requests the equivalent dotted filename. Static hosts do
// not perform that mapping, so publish explicit aliases alongside each route.
await materializeFlightAliases(outputDirectory);

const legacyUrlMap = await loadLegacyUrlMap();
validateRedirectRegistry(legacyUrlMap);
const redirectRules = pagesRedirectRules(verifiedRedirectRecords(legacyUrlMap));

await writeFile(redirectsFile, `${redirectRules.join("\n")}\n`, "utf8");

// Pages serves this artifact directly. Prevent edge HTML rewrites that would
// diverge from React's pre-rendered markup; cache content-hashed assets forever.
await writeFile(
  headersFile,
  [
    "/*",
    "  Cache-Control: public, max-age=0, must-revalidate, no-transform",
    "",
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
  ].join("\n"),
  "utf8",
);

console.log("Prepared static out/ for Cloudflare Pages (no Worker runtime).");
