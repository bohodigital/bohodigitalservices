import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

let handlerPromise;

async function loadHandler() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}`);
  handlerPromise ??= import(workerUrl.href).then((module) => module.default);
  return handlerPromise;
}

async function render(pathname = "/") {
  const handler = await loadHandler();
  const request = new Request(`http://localhost${pathname}`, {
    headers: { accept: "text/html" },
  });

  return typeof handler === "function"
    ? handler(request)
    : handler.fetch(
        request,
        {
          ASSETS: {
            fetch: async () => new Response("Not found", { status: 404 }),
          },
        },
        {
          waitUntil() {},
          passThroughOnException() {},
        },
      );
}

test("server-renders the complete private Boho homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const requiredHeadings = [
    "Research-led website design, local SEO, and digital growth.",
    "A digital marketing package is not a business strategy.",
    "Research before recommendations.",
    "Website design built around clarity, trust, search, and action.",
    "Website, SEO, migration, and lead-generation services.",
    "Website migration and provider rescue without losing what works.",
    "Website and SEO strategy shaped by how customers choose.",
    "Resources, research, and proof you can inspect.",
    "Ongoing SEO tied to visible priorities and decisions.",
    "We only work with one client per industry and service area, claim your territory today!",
    "Lean overhead, practical pricing, and more useful work.",
    "Start with a Local Visibility Check.",
  ];

  for (const heading of requiredHeadings) {
    assert.ok(html.includes(heading), `missing homepage heading: ${heading}`);
  }

  assert.match(html, /<meta[^>]+name="robots"[^>]+noindex/i);
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to content/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /aria-controls="mobile-menu-/i);
  assert.match(html, /href="\/emergency\/"/i);
  assert.match(html, /How Boho Works: Discover, we review your goals/i);
  assert.doesNotMatch(html, /Discover, design, build, launch/i);
  assert.doesNotMatch(html, /Scope, review, and launch gates are/i);
  assert.match(html, /definition-website-clarity-/i);
  assert.match(html, /definition-trust-signal-/i);
  assert.match(html, /definition-customer-discovery-/i);
  assert.match(html, /definition-customer-action-/i);
  assert.match(html, /href="\/start\/"[^>]*>[\s\S]*?Claim Your Territory/i);
  assert.match(html, /Public-domain textile detail from The Met Open Access collection/i);
  assert.match(html, /Photography shows representative business settings/i);
  assert.doesNotMatch(html, /Concept interface/i);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-5CV8L2SE2R/i);
  assert.match(html, /analytics\.bohodigitalservices\.com\/script\.js/i);
  assert.match(html, /data-website-id="aecddac8-8ad4-49c4-b791-60b161c95155"/i);
  assert.match(
    html,
    /data-domains="bohodigitalservices\.com,www\.bohodigitalservices\.com"/i,
  );
  assert.match(html, /data-do-not-track="true"/i);
  assert.match(html, /data-exclude-search="true"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps compiled styles and approved public assets on the Pages static path", async () => {
  const response = await render();
  const html = await response.text();
  const stylesheet = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i)?.[1]
    ?? html.match(/<link[^>]+href="([^"]+)"[^>]+rel="stylesheet"/i)?.[1];

  assert.ok(stylesheet, "rendered homepage is missing its compiled stylesheet");
  assert.match(stylesheet, /^\/assets\/[^?]+\.css(?:\?|$)/);
  await access(new URL(`../dist/client${stylesheet}`, import.meta.url));

  const routes = JSON.parse(
    await readFile(new URL("../dist/client/_routes.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(routes.include, ["/*"]);
  for (const route of [
    "/assets/*",
    "/brand/*",
    "/diagrams/*",
    "/visuals/*",
    "/favicon.ico",
    "/boho-digital-services-social-v2.png",
  ]) {
    assert.ok(routes.exclude.includes(route), `Pages routes must exclude ${route}`);
  }

  for (const asset of [
    "../dist/client/brand/boho-bee-logo-v2-256.png",
    "../dist/client/brand/boho-bee-logo-v2-transparent.png",
    "../dist/client/brand/github-invertocat-white.svg",
    "../dist/client/diagrams/boho-hosting-architecture-v2.png",
    "../dist/client/diagrams/how-boho-works-v1.png",
    "../dist/client/visuals/research-notebook.webp",
    "../dist/client/visuals/industry-contractors.webp",
    "../dist/client/visuals/industry-local-service.webp",
    "../dist/client/visuals/industry-retail.webp",
    "../dist/client/visuals/industry-ecommerce.webp",
    "../dist/client/visuals/industry-b2b.webp",
    "../dist/client/visuals/met-water-textile.webp",
    "../dist/client/favicon.ico",
    "../dist/client/boho-digital-services-social-v2.png",
  ]) {
    await access(new URL(asset, import.meta.url));
  }
});

test("keeps the design system accessible, private, and free of starter artifacts", async () => {
  const [page, layout, homepage, components, mobileMenu, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/Homepage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MobileMenu.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import Homepage from/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.match(layout, /index:\s*false/);
  assert.match(layout, /follow:\s*false/);
  assert.match(layout, /G-5CV8L2SE2R/);
  assert.match(layout, /aecddac8-8ad4-49c4-b791-60b161c95155/);
  assert.match(layout, /data-domains="bohodigitalservices\.com,www\.bohodigitalservices\.com"/);
  assert.match(layout, /data-do-not-track="true"/);
  assert.match(layout, /data-exclude-search="true"/);
  assert.match(layout, /boho-digital-services-social-v2\.png/);
  assert.match(layout, /favicon\.ico/);
  assert.equal((layout.match(/googletagmanager\.com/g) ?? []).length, 1);
  assert.equal((layout.match(/analytics\.bohodigitalservices\.com/g) ?? []).length, 1);
  assert.match(homepage, /className="home-section hero"/);
  assert.match(homepage, /className="hero-editorial hero-editorial--process"/);
  assert.match(homepage, /className="method-summary-list"/);
  assert.match(homepage, /className="method-summary-list__icon"/);
  assert.match(homepage, /className="design-principle__icon"/);
  assert.match(homepage, /how-boho-works-v1\.png/);
  assert.match(homepage, /className="design-reference"/);
  assert.match(homepage, /className="buyer-panel__image"/);
  assert.doesNotMatch(homepage, /ResearchRouteVisual|ConceptCaption|signal-path/);
  assert.doesNotMatch(homepage, /function MosaicWing/);
  assert.equal((homepage.match(/className="home-section/g) ?? []).length, 12);
  assert.match(components, /className="skip-link"/);
  assert.match(components, /boho-bee-logo-v2-transparent\.png/);
  assert.match(components, /mailto:contact@bohemiandigital\.org/);
  assert.match(components, /mailto:webmaster@bohemiandigital\.org/);
  assert.match(components, /https:\/\/github\.com\/bohodigital/);
  assert.match(components, /<MobileMenu navigation=/);
  assert.match(mobileMenu, /aria-expanded=\{open\}/);
  assert.match(mobileMenu, /event\.key === "Escape"/);
  assert.match(mobileMenu, /aria-modal="true"/);
  assert.match(components, /export function FormField/);
  assert.match(components, /export function FormStatusMessage/);
  assert.match(css, /--burnished-gold:\s*#e3ae3d/i);
  assert.match(css, /--verdigris:\s*#1e5e5b/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.match(css, /@media \(max-width:\s*30rem\)/i);
  for (let index = 1; index <= 6; index += 1) {
    assert.match(css, new RegExp(`\\.service-card--${index} \\.service-card__pattern`));
  }
  assert.doesNotMatch(css, /mosaic-wing|boho-flow|system-node|system-connector/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

test("server-renders all configured routes with working fragment targets", async () => {
  const [coreSource, audienceSource] = await Promise.all([
    readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/audiencePages.ts", import.meta.url), "utf8"),
  ]);
  const slugs = [...`${coreSource}\n${audienceSource}`.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(slugs.length, 45);
  assert.equal(new Set(slugs).size, slugs.length);

  for (const slug of slugs) {
    const route = slug === "/" ? "/" : slug.replace(/\/$/, "");
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();

    assert.match(html, /<main\b/i, `${route} is missing its main landmark`);
    assert.match(html, /<h1\b/i, `${route} is missing its page heading`);

    const fragmentTargets = [
      ...html.matchAll(/href="#([a-zA-Z][a-zA-Z0-9_-]*)"/g),
    ].map((match) => match[1]);

    for (const target of fragmentTargets) {
      assert.ok(
        html.includes(`id="${target}"`),
        `${route} links to missing fragment #${target}`,
      );
    }
  }
});

test("consolidates Learn, Tools, and Lab under an accessible Resources hub", async () => {
  const [resourcesResponse, learnResponse, toolsResponse, labResponse, mobileMenuSource, resourceNavigationSource] = await Promise.all([
    render("/resources"),
    render("/learn"),
    render("/tools"),
    render("/lab"),
    readFile(new URL("../app/components/MobileMenu.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content/navigation.ts", import.meta.url), "utf8"),
  ]);

  for (const response of [resourcesResponse, learnResponse, toolsResponse, labResponse]) {
    assert.equal(response.status, 200);
  }

  const resourcesHtml = await resourcesResponse.text();
  for (const text of [
    "Useful answers, working systems, and evidence you can inspect.",
    "Practical guides",
    "Plain-language glossary",
    "Tools &amp; systems",
    "The Boho Lab",
    "Skip the taxonomy. Name the problem.",
    "Open the Lab when the method matters as much as the answer.",
  ]) {
    assert.ok(resourcesHtml.includes(text), `Resources hub is missing: ${text}`);
  }

  assert.match(resourcesHtml, /href="\/learn\/"/);
  assert.match(resourcesHtml, /href="\/tools\/"/);
  assert.match(resourcesHtml, /href="\/lab\/"/);
  assert.match(resourcesHtml, /aria-label="Open Resources menu"/);
  assert.match(resourcesHtml, /aria-expanded="false"/);
  assert.match(mobileMenuSource, /className="mobile-menu__group"/);
  assert.match(mobileMenuSource, /className="mobile-menu__subnav"/);
  assert.match(resourcesHtml, /class="section-sidebar__groups"/);
  assert.match(resourcesHtml, /aria-label="Resource collections"/);
  assert.match(resourcesHtml, /href="\/resources\/"[^>]*aria-current="page"|aria-current="page"[^>]*href="\/resources\/"/);
  assert.match(resourcesHtml, /href="\/learn\/glossary\/#term-technical-seo"/);
  for (const route of [
    "/lab/market-map-examples/",
    "/lab/success-signal-studies/",
    "/lab/in-house-brands/",
    "/lab/public-teardowns/",
  ]) {
    assert.ok(resourceNavigationSource.includes(route), `Resources sidebar is missing ${route}`);
  }
});

test("renders the source-backed glossary, tools catalog, definitions, and diagrams", async () => {
  const [toolsResponse, glossaryResponse, definitionComponent, knowledgeSource] = await Promise.all([
    render("/tools"),
    render("/learn/glossary"),
    readFile(new URL("../app/components/DefinitionTerm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(toolsResponse.status, 200);
  assert.equal(glossaryResponse.status, 200);

  const toolsHtml = await toolsResponse.text();
  const glossaryHtml = await glossaryResponse.text();

  assert.equal((toolsHtml.match(/<a[^>]+aria-current="page"[^>]*>/g) ?? []).length, 1);
  assert.match(glossaryHtml, /id="term-technical-seo"/);

  for (const name of [
    "GitHub",
    "Cloudflare",
    "Cloudflare Pages",
    "API keys",
    "MCP servers",
    "Python automation",
    "Web crawling",
    "Google Analytics",
    "Google Search Console",
    "Google Business Profile",
  ]) {
    assert.ok(toolsHtml.includes(name), `tools page is missing ${name}`);
  }

  assert.match(toolsHtml, /Boho Central Servers/);
  assert.match(toolsHtml, /How the name becomes a page/);
  assert.match(toolsHtml, /A reviewable path from owner access to the live website/);
  assert.match(toolsHtml, /boho-hosting-architecture-v2\.png/);
  assert.match(toolsHtml, /Read the diagram as text/);
  assert.match(toolsHtml, /class="delivery-route"/);
  assert.match(toolsHtml, /Static assets stay on the asset path/);
  assert.doesNotMatch(toolsHtml, /mosaic-wing|boho-flow/);
  assert.match(toolsHtml, /Rank Builder SEO/);
  assert.match(toolsHtml, /How Biscuit/);
  assert.match(toolsHtml, /developers\.cloudflare\.com/);
  assert.match(toolsHtml, /docs\.github\.com/);
  assert.match(toolsHtml, /modelcontextprotocol\.io/);
  assert.match(toolsHtml, /developers\.google\.com/);
  assert.match(glossaryHtml, /Most used in the current site copy/);
  assert.match(glossaryHtml, /Master glossary/);
  assert.match(glossaryHtml, /Search the glossary/);
  assert.match(glossaryHtml, /Filter by system/);
  assert.match(glossaryHtml, /Glossary table of contents/);
  assert.match(glossaryHtml, /class="glossary-row"/);
  assert.match(glossaryHtml, /Read more/);
  assert.match(glossaryHtml, /Section menu/);
  assert.match(glossaryHtml, /id="term-dns"/);
  assert.match(glossaryHtml, /id="term-server"/);
  assert.match(glossaryHtml, /id="term-mcp-server"/);
  assert.match(glossaryHtml, /id="term-website-clarity"/);
  assert.match(glossaryHtml, /id="term-trust-signal"/);
  assert.match(glossaryHtml, /id="term-customer-discovery"/);
  assert.match(glossaryHtml, /id="term-customer-action"/);
  assert.match(glossaryHtml, /Deeper tool documentation/);
  assert.doesNotMatch(glossaryHtml, /class="glossary-entry-grid"/);
  assert.doesNotMatch(glossaryHtml, /Glossary migration in progress/);

  for (const html of [toolsHtml, glossaryHtml]) {
    const externalAnchors = [...html.matchAll(/<a\s+([^>]*href="https?:\/\/[^>]+)>/gi)];
    assert.ok(externalAnchors.length > 0, "expected official external links");
    for (const [, attributes] of externalAnchors) {
      assert.match(attributes, /target="_blank"/i, "external link must open a new tab");
      assert.match(attributes, /rel="noopener noreferrer"/i, "external link must isolate the opener");
    }
  }

  assert.match(definitionComponent, /event\.key === "Escape"/);
  assert.match(definitionComponent, /onMouseEnter/);
  assert.match(definitionComponent, /onFocus/);
  assert.match(definitionComponent, /onClick/);
  assert.match(definitionComponent, /onClick=\{\(\) => setOpen\(true\)\}/);
  assert.doesNotMatch(definitionComponent, /setOpen\(\(value\) => !value\)/);
  assert.match(definitionComponent, /role="group"/);
  assert.match(definitionComponent, /pointerdown/);

  assert.ok((knowledgeSource.match(/term:/g) ?? []).length >= 55);
  assert.ok((knowledgeSource.match(/name: "/g) ?? []).length >= 10);
});

test("propagates glossary popovers and section menus through primary page families", async () => {
  for (const route of [
    "/",
    "/services",
    "/services/technical-seo-site-health",
    "/industries/local-service-businesses",
    "/learn/small-business-seo",
    "/lab",
    "/pricing",
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();
    assert.match(html, /class="definition-term"/, `${route} has no glossary popup term`);
    if (route !== "/") {
      assert.match(html, /class="section-sidebar"/, `${route} has no section navigation`);
    }
  }
});
