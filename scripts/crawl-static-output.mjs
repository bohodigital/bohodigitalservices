import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputRoot = fileURLToPath(new URL("../out/", import.meta.url));
const redirects = new Map(
  (await readFile(join(outputRoot, "_redirects"), "utf8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [source, destination, status] = line.split(/\s+/);
      assert.equal(status, "301");
      return [source, destination];
    }),
);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
  const redirect = redirects.get(pathname);
  if (redirect) {
    response.writeHead(301, { location: redirect });
    response.end();
    return;
  }

  const relativePath = pathname === "/"
    ? "index.html"
    : pathname.endsWith("/")
      ? `${pathname.slice(1)}index.html`
      : pathname.slice(1);
  try {
    const body = await readFile(join(outputRoot, relativePath));
    response.writeHead(200, {
      "content-type": contentTypes[extname(relativePath)] ?? "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end(await readFile(join(outputRoot, "404.html")));
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
assert.ok(address && typeof address !== "string");
const origin = `http://127.0.0.1:${address.port}`;

try {
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const canonicalPaths = [
    ...sitemap.matchAll(/<loc>https:\/\/bohodigitalservices\.com([^<]+)<\/loc>/g),
  ].map((match) => match[1]);

  for (const path of canonicalPaths) {
    const response = await fetch(`${origin}${path}`, { redirect: "manual" });
    assert.equal(response.status, 200, `${path} did not return 200`);
    if (path.startsWith("/learn/glossary/") && path !== "/learn/glossary/") {
      const html = await response.text();
      assert.match(html, /<h1\b/i, `${path} lacks a rendered H1`);
      assert.doesNotMatch(
        html.match(/<meta\b[^>]*name="robots"[^>]*>/i)?.[0] ?? "",
        /noindex|nofollow/i,
        `${path} is blocked from indexing`,
      );
    }
  }

  for (const [source, destination] of redirects) {
    const response = await fetch(`${origin}${source}`, { redirect: "manual" });
    assert.equal(response.status, 301, `${source} did not return 301`);
    assert.equal(response.headers.get("location"), destination, `${source} destination mismatch`);
    const destinationPath = destination.split("#", 1)[0];
    const finalResponse = await fetch(`${origin}${destinationPath}`, { redirect: "manual" });
    assert.equal(finalResponse.status, 200, `${source} destination does not return 200`);
  }

  for (const path of ["/robots.txt", "/sitemap.xml"]) {
    assert.equal((await fetch(`${origin}${path}`)).status, 200, `${path} did not return 200`);
  }

  console.log(JSON.stringify({
    localOrigin: origin,
    canonicalRoutesCrawled: canonicalPaths.length,
    redirectVariantsCrawled: redirects.size,
    robotsAndSitemap: 2,
    failures: 0,
  }));
} finally {
  await new Promise((resolve, reject) =>
    server.close((error) => error ? reject(error) : resolve()),
  );
}
