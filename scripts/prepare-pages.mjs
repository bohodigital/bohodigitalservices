import { access, copyFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const outputDirectory = fileURLToPath(new URL("../out/", import.meta.url));
const indexPage = fileURLToPath(new URL("../out/index.html", import.meta.url));
const robotsFile = fileURLToPath(new URL("../out/robots.txt", import.meta.url));
const sitemapFile = fileURLToPath(new URL("../out/sitemap.xml", import.meta.url));
const headersFile = fileURLToPath(new URL("../out/_headers", import.meta.url));

await Promise.all([
  access(outputDirectory),
  access(indexPage),
  access(robotsFile),
  access(sitemapFile),
]);

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

// Pages serves this artifact directly. Content-hashed Next assets can be cached
// indefinitely; HTML keeps the platform default so a deployment replaces it.
await writeFile(
  headersFile,
  [
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
  ].join("\n"),
  "utf8",
);

console.log("Prepared static out/ for Cloudflare Pages (no Worker runtime).");
