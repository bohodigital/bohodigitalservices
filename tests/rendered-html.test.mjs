import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

let handlerPromise;

async function loadHandler() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}`);
  handlerPromise ??= import(workerUrl.href).then((module) => module.default);
  return handlerPromise;
}

async function render(pathname = "/", origin = "http://localhost") {
  const handler = await loadHandler();
  const request = new Request(`${origin}${pathname}`, {
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

test("server-renders the governed Boho digital-engineering homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const requiredHeadings = [
    "Local visibility, lead systems, and websites built by people who understand the machinery.",
    "Marketing systems are still systems.",
    "A six-stage engineering method.",
    "Website design built around clarity, trust, search, and action.",
    "Five service lanes, one accountable system.",
    "Website migration and provider rescue without losing what works.",
    "Website and local SEO strategy shaped by how customers choose.",
    "Tools and proof governed by evidence.",
    "Ongoing SEO and website growth tied to visible priorities and decisions.",
    "Tired of talking to people who cannot explain the system?",
    "Scope follows diagnosis, not a package menu.",
    "Talk to someone who can explain the machinery.",
  ];

  for (const heading of requiredHeadings) {
    assert.ok(html.includes(heading), `missing homepage heading: ${heading}`);
  }

  assert.match(html, /<meta[^>]+name="robots"[^>]+index, follow/i);
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to content/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /aria-controls="mobile-menu-/i);
  assert.match(html, /href="\/emergency\/"/i);
  assert.doesNotMatch(html, /how-boho-works-v2-transparent\.png/i);
  assert.doesNotMatch(html, /Discover, Design, Build, Launch/i);
  assert.doesNotMatch(html, /Scope, review, and launch gates are/i);
  assert.match(html, /definition-website-clarity-/i);
  assert.match(html, /definition-trust-signal-/i);
  assert.match(html, /definition-customer-discovery-/i);
  assert.match(html, /definition-customer-action-/i);
  assert.match(html, /href="\/contact\/"[^>]*>[\s\S]*?Talk to Someone Technical/i);
  assert.match(html, /href="\/tools\/"[^>]*>[\s\S]*?See What We Build/i);
  assert.doesNotMatch(html, /Claim Your Territory|one client per industry/i);
  assert.match(html, /Representative editorial photography, not Boho staff or client work/i);
  assert.match(html, /aria-label="Homepage journey"/i);
  for (const stage of ["Diagnose", "Prioritize", "Engineer", "Deploy", "Measure", "Improve"]) {
    assert.match(html, new RegExp(`>${stage}<`, "i"));
  }
  assert.match(html, /href="\/services\/research-audits-analytics\/"/i);
  assert.match(html, /href="\/services\/ongoing-seo-growth\/"/i);
  assert.match(html, /href="\/services\/custom-tools-automation\/"/i);
  assert.equal((html.match(/class="service-card /g) ?? []).length, 5);
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
  assert.match(
    html,
    /<link[^>]+rel="icon"[^>]+href="https:\/\/bohodigitalservices\.com\/brand\/boho-search-icon-v2\.png"/i,
  );
  assert.doesNotMatch(html, /<link[^>]+rel="icon"[^>]+href="[^\"]*\/favicon\.ico"/i);
  const organizationJson = html.match(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i,
  )?.[1];
  assert.ok(organizationJson, "homepage is missing Organization structured data");
  const organization = JSON.parse(organizationJson);
  assert.equal(organization["@type"], "Organization");
  assert.equal(organization.name, "Boho Digital Services");
  assert.equal(organization.url, "https://bohodigitalservices.com/");
  assert.equal(
    organization.logo.url,
    "https://bohodigitalservices.com/brand/boho-organization-logo-v2.png",
  );
  assert.equal(organization.logo.width, 720);
  assert.equal(organization.logo.height, 720);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("publishes selective crawl controls and blocks preview-host indexing", async () => {
  const robots = await readFile(
    new URL("../dist/client/robots.txt", import.meta.url),
    "utf8",
  );
  assert.match(robots, /User-agent: GPTBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: OAI-SearchBot/);
  assert.match(robots, /User-agent: ClaudeBot/);
  assert.match(robots, /User-agent: \*[\s\S]*Allow: \//);
  assert.doesNotMatch(robots, /Disallow:\s*\//);
  assert.match(
    robots,
    /Sitemap: https:\/\/bohodigitalservices\.com\/sitemap\.xml/,
  );

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /(?:application|text)\/xml/i,
  );
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/services\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/services\/custom-tools-automation\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/resources\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/learn\/website-buying\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/learn\/provider-rescue\//);
  assert.match(sitemap, /https:\/\/bohodigitalservices\.com\/learn\/glossary\//);
  assert.doesNotMatch(sitemap, /https:\/\/bohodigitalservices\.com\/tools\//);
  assert.doesNotMatch(sitemap, /https:\/\/bohodigitalservices\.com\/pricing\//);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/bohodigitalservices\.com\/lab\/<\/loc>/);
  assert.doesNotMatch(sitemap, /https:\/\/bohodigitalservices\.com\/lab\/claims-we-refuse-to-make\//);
  assert.doesNotMatch(sitemap, /https:\/\/bohodigitalservices\.com\/learn\/small-business-seo\//);
  assert.doesNotMatch(sitemap, /\/lab\/in-house-brands\//);

  const homeResponse = await render();
  const home = await homeResponse.text();
  assert.match(
    home,
    /<link[^>]+rel="canonical"[^>]+href="https:\/\/bohodigitalservices\.com\/"/i,
  );
  assert.match(home, /<meta[^>]+name="robots"[^>]+index, follow/i);

  const serviceResponse = await render("/services");
  const service = await serviceResponse.text();
  assert.match(
    service,
    /<link[^>]+rel="canonical"[^>]+href="https:\/\/bohodigitalservices\.com\/services\/"/i,
  );
  assert.match(service, /<meta[^>]+name="robots"[^>]+index, follow/i);

  for (const route of ["/tools", "/pricing", "/lab", "/lab/claims-we-refuse-to-make", "/learn/small-business-seo"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<meta[^>]+name="robots"[^>]+noindex, nofollow/i);
  }

  const previewResponse = await render("/", "https://governance-review.pages.dev");
  assert.equal(previewResponse.headers.get("X-Robots-Tag"), "noindex, nofollow");
  const previewRobots = await render("/robots.txt", "https://governance-review.pages.dev");
  assert.equal(previewRobots.headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.match(await previewRobots.text(), /User-agent: \*[\s\S]*Disallow: \//);
  const canonicalResponse = await render("/", "https://bohodigitalservices.com");
  assert.equal(canonicalResponse.headers.get("X-Robots-Tag"), null);
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
    "../dist/client/brand/boho-search-icon-v2.png",
    "../dist/client/brand/boho-organization-logo-v2.png",
    "../dist/client/brand/github-invertocat-white.svg",
    "../dist/client/diagrams/boho-hosting-architecture-v2.png",
    "../dist/client/diagrams/how-boho-works-v2-transparent.png",
    "../dist/client/visuals/research-notebook.webp",
    "../dist/client/visuals/industry-contractors.webp",
    "../dist/client/visuals/industry-local-service.webp",
    "../dist/client/visuals/industry-retail.webp",
    "../dist/client/visuals/industry-ecommerce.webp",
    "../dist/client/visuals/industry-b2b.webp",
    "../dist/client/visuals/met-water-textile.webp",
    "../dist/client/visuals/creative-process.webp",
    "../dist/client/visuals/migration-infrastructure.webp",
    "../dist/client/visuals/growth-analysis.webp",
    "../dist/client/visuals/homepage-design-studio-v2.webp",
    "../dist/client/visuals/homepage-industry-contractors-v2.webp",
    "../dist/client/visuals/homepage-industry-local-service-v2.webp",
    "../dist/client/visuals/homepage-industry-retail-v2.webp",
    "../dist/client/visuals/homepage-industry-ecommerce-v2.webp",
    "../dist/client/visuals/homepage-industry-b2b-v2.webp",
    "../dist/client/favicon.ico",
    "../dist/client/boho-digital-services-social-v2.png",
  ]) {
    await access(new URL(asset, import.meta.url));
  }

  for (const [asset, expectedHash] of [
    [
      "../dist/client/brand/boho-search-icon-v2.png",
      "1e81e960e5482bac8d90d79b0f3f30bf80e8cfcaba474e199c001a396060052b",
    ],
    [
      "../dist/client/brand/boho-organization-logo-v2.png",
      "150794420fc0b94df35105efa9ef2e5d7c5c4a49dfb3e2853a3581e8151790e7",
    ],
  ]) {
    const bytes = await readFile(new URL(asset, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expectedHash);
  }
});

test("resolves every local asset referenced by every rendered route", async () => {
  const [coreSource, audienceSource] = await Promise.all([
    readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/audiencePages.ts", import.meta.url), "utf8"),
  ]);
  const slugs = [...`${coreSource}\n${audienceSource}`.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1]);
  const routes = [...new Set(slugs.map((slug) => slug === "/" ? "/" : slug.replace(/\/$/, "")))];
  const assetPaths = new Set();

  function collectAsset(reference) {
    if (!reference || reference.startsWith("data:")) return;

    const url = new URL(reference, "http://localhost");
    if (url.origin !== "http://localhost") return;

    const pathname = url.pathname;
    if (
      pathname.startsWith("/assets/") ||
      pathname.startsWith("/brand/") ||
      pathname.startsWith("/diagrams/") ||
      pathname.startsWith("/visuals/") ||
      pathname === "/favicon.ico" ||
      pathname === "/boho-digital-services-social-v2.png"
    ) {
      assetPaths.add(pathname);
    }
  }

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render for asset audit`);
    const html = await response.text();

    for (const match of html.matchAll(/(?:src|href|content)="([^"]+)"/g)) {
      collectAsset(match[1]);
    }
  }

  for (const pathname of [...assetPaths]) {
    const fileUrl = new URL(`../dist/client${pathname}`, import.meta.url);
    const fileStat = await stat(fileUrl);
    assert.ok(fileStat.isFile(), `${pathname} is not a file in the packaged client`);
    assert.ok(fileStat.size > 0, `${pathname} is empty in the packaged client`);

    if (pathname.endsWith(".css")) {
      const css = await readFile(fileUrl, "utf8");
      for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        collectAsset(new URL(match[1], `http://localhost${pathname}`).toString());
      }
    }
  }

  for (const pathname of assetPaths) {
    const fileStat = await stat(new URL(`../dist/client${pathname}`, import.meta.url));
    assert.ok(fileStat.size > 0, `${pathname} is missing or empty after CSS dependency expansion`);
  }

  assert.ok(assetPaths.size >= 16, `asset audit found only ${assetPaths.size} local assets`);
});

test("keeps the design system accessible, governed, and free of starter artifacts", async () => {
  const [page, layout, homepage, components, mobileMenu, brandCarousel, brandData, brandsPage, brandPage, operatingCycle, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/Homepage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MobileMenu.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BrandPreviewCarousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content/inHouseBrands.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/InHouseBrandsPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/InHouseBrandPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content/operatingCycle.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import Homepage from/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.match(layout, /index:\s*true/);
  assert.match(layout, /follow:\s*true/);
  assert.match(layout, /G-5CV8L2SE2R/);
  assert.match(layout, /aecddac8-8ad4-49c4-b791-60b161c95155/);
  assert.match(layout, /data-domains="bohodigitalservices\.com,www\.bohodigitalservices\.com"/);
  assert.match(layout, /data-do-not-track="true"/);
  assert.match(layout, /data-exclude-search="true"/);
  assert.match(layout, /boho-digital-services-social-v2\.png/);
  assert.match(layout, /boho-search-icon-v2\.png/);
  assert.match(layout, /boho-organization-logo-v2\.png/);
  assert.equal((layout.match(/googletagmanager\.com/g) ?? []).length, 1);
  assert.equal((layout.match(/analytics\.bohodigitalservices\.com/g) ?? []).length, 1);
  assert.match(homepage, /className="home-section hero"/);
  assert.match(homepage, /className="hero-editorial hero-editorial--process"/);
  assert.match(homepage, /className="method-summary-list"/);
  assert.match(homepage, /className="method-summary-list__icon"/);
  assert.match(homepage, /className="design-principle__icon"/);
  assert.doesNotMatch(homepage, /how-boho-works-v2-transparent\.png/);
  assert.doesNotMatch(homepage, /<BrandPreviewCarousel \/>/);
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
  for (const [name, url, id] of [
    ["How Biscuit", "https://howbiscuit.com", "how-biscuit"],
    ["RankBuilder SEO", "https://rankbuilderseo.com", "rank-builder-seo"],
    ["Better Grades", "https://bettergrades.net", "better-grades"],
  ]) {
    assert.ok(brandData.includes(name), `brand data is missing ${name}`);
    assert.ok(brandData.includes(url), `brand data is missing ${url}`);
    assert.ok(brandData.includes(id), `brand data is missing ${id}`);
  }
  assert.match(brandCarousel, /sandbox="allow-same-origin allow-scripts"/);
  assert.match(brandCarousel, /brand-preview-frame__guard/);
  assert.match(brandCarousel, /activeBrand\.labPath/);
  assert.match(brandCarousel, /setInterval/);
  assert.match(brandCarousel, /6500/);
  assert.match(brandCarousel, /prefers-reduced-motion/);
  assert.match(brandCarousel, /Pause automatic brand previews/);
  assert.match(brandCarousel, /aria-controls="brand-preview-panel"/);
  assert.doesNotMatch(brandCarousel, /href=\{brand\.url\}/);
  assert.match(brandsPage, /id=\{brand\.id\}/);
  assert.match(brandsPage, /href=\{brand\.labPath\}/);
  assert.match(brandPage, /BrandPreviewFrame brand=\{brand\}/);
  for (const stage of ["Diagnose", "Prioritize", "Engineer", "Deploy", "Measure", "Improve"]) {
    assert.ok(operatingCycle.includes(`title: "${stage}"`), `operating cycle is missing ${stage}`);
  }
  assert.equal((operatingCycle.match(/href:/g) ?? []).length, 6);
  assert.doesNotMatch(homepage, /Prioritize, Improve, Measure, Adjust|Discover, Design, Build, Grow/);
  assert.match(components, /export function FormField/);
  assert.match(components, /export function FormStatusMessage/);
  assert.match(css, /--burnished-gold:\s*#e3ae3d/i);
  assert.match(css, /--verdigris:\s*#1e5e5b/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.match(css, /brand-preview-progress 6500ms/i);
  assert.match(css, /@media \(max-width:\s*30rem\)/i);
  for (let index = 1; index <= 6; index += 1) {
    assert.match(css, new RegExp(`\\.service-card--${index} \\.service-card__pattern`));
  }
  assert.doesNotMatch(css, /mosaic-wing|boho-flow|system-node|system-connector/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

test("renders the in-house brand Lab with live, non-navigating previews", async () => {
  const response = await render("/lab/in-house-brands");
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const [name, id] of [
    ["How Biscuit", "how-biscuit"],
    ["RankBuilder SEO", "rank-builder-seo"],
    ["Better Grades", "better-grades"],
  ]) {
    assert.ok(html.includes(name), `brand Lab is missing ${name}`);
    assert.ok(html.includes(`id="${id}"`), `brand Lab is missing #${id}`);
  }

  assert.match(html, /src="https:\/\/howbiscuit\.com\/"/i);
  assert.doesNotMatch(html, /<a[^>]+href="https:\/\/(?:howbiscuit\.com|rankbuilderseo\.com|bettergrades\.net)/i);
  assert.match(html, /Live, non-interactive preview/);
  assert.match(html, /noindex, nofollow/);
});

test("renders dedicated internal Lab files for every owned property", async () => {
  for (const [route, name, url] of [
    ["/lab/in-house-brands/how-biscuit", "How Biscuit", "https://howbiscuit.com/"],
    ["/lab/in-house-brands/rank-builder-seo", "RankBuilder SEO", "https://rankbuilderseo.com/"],
    ["/lab/in-house-brands/better-grades", "Better Grades", "https://bettergrades.net/"],
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();
    assert.ok(html.includes(name), `${route} is missing ${name}`);
    assert.ok(html.includes(`src="${url}"`), `${route} is missing its live preview`);
    assert.match(html, /Owned work, not a client claim/);
    assert.doesNotMatch(html, new RegExp(`<a[^>]+href="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"));
  }
});

test("server-renders all configured routes with working fragment targets", async () => {
  const [coreSource, audienceSource] = await Promise.all([
    readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/audiencePages.ts", import.meta.url), "utf8"),
  ]);
  const slugs = [...`${coreSource}\n${audienceSource}`.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1]);

  assert.equal(slugs.length, 49);
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

test("renders the governed commercial lanes, claims, and honest contact fallback", async () => {
  const [websiteResponse, customResponse, researchResponse, aboutResponse, contactResponse, pricingResponse, navigationSource, coreSource] = await Promise.all([
    render("/services/website-design-redesign"),
    render("/services/custom-tools-automation"),
    render("/services/research-audits-analytics"),
    render("/about"),
    render("/contact"),
    render("/pricing"),
    readFile(new URL("../app/content/navigation.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8"),
  ]);

  for (const response of [websiteResponse, customResponse, researchResponse, aboutResponse, contactResponse, pricingResponse]) {
    assert.equal(response.status, 200);
  }

  const websiteHtml = await websiteResponse.text();
  const customHtml = await customResponse.text();
  const researchHtml = await researchResponse.text();
  const aboutHtml = await aboutResponse.text();
  const contactHtml = await contactResponse.text();
  const pricingHtml = await pricingResponse.text();

  assert.ok(coreSource.includes("Standard managed hosting is included at no separate hosting charge for eligible websites while an active qualifying retainer remains in good standing."));
  assert.match(websiteHtml, /<title>Websites &amp; Managed Hosting \| Boho Digital Services<\/title>/i);
  assert.match(customHtml, /Custom Tools &amp; Automation/);
  assert.match(customHtml, /Automate a stable decision, not a vague frustration/);
  assert.match(customHtml, /Build the Missing Tool/);
  assert.match(customHtml, /Dashboards, analytics, and monitoring/);
  assert.match(customHtml, /APIs, data normalization, and publishing/);
  assert.match(researchHtml, /A dashboard is not a decision/);
  assert.match(researchHtml, /where platforms disagree/);
  assert.match(customHtml, /Diagnose → Prioritize → Engineer → Deploy → Measure → Improve/);
  assert.match(aboutHtml, /practical operating description, not a licensed-profession claim/i);
  assert.match(aboutHtml, /does not represent professional-engineer licensure/i);
  assert.match(contactHtml, /This form cannot send a message/i);
  assert.match(contactHtml, /mailto:contact@bohemiandigital\.org/);
  assert.match(contactHtml, /Preview form — not connected/);
  assert.doesNotMatch(contactHtml, /<form[^>]+action=/i);
  assert.match(pricingHtml, /no current public rates are approved/i);
  const pricingVisibleMarkup = pricingHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(pricingVisibleMarkup, /\$\d/);

  for (const label of [
    "Local Visibility & Lead Systems",
    "Websites & Managed Hosting",
    "Provider Rescue & Migration",
    "Custom Tools & Automation",
    "Research, Analytics & Improvement",
  ]) {
    assert.ok(navigationSource.includes(label), `service navigation is missing ${label}`);
  }
  assert.ok(navigationSource.indexOf('{ label: "Tools"') < navigationSource.indexOf('{ label: "Resources"'));
});

test("resolves every rendered local link and cross-page fragment", async () => {
  const [coreSource, audienceSource] = await Promise.all([
    readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/audiencePages.ts", import.meta.url), "utf8"),
  ]);
  const slugs = [...`${coreSource}\n${audienceSource}`.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((match) => match[1]);
  const knownPaths = new Set(["/", ...slugs.map((slug) => slug.endsWith("/") ? slug : `${slug}/`)]);
  const rendered = new Map();

  async function htmlFor(path) {
    const canonicalPath = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
    if (!rendered.has(canonicalPath)) {
      const response = await render(canonicalPath === "/" ? "/" : canonicalPath.slice(0, -1));
      assert.equal(response.status, 200, `${canonicalPath} did not render`);
      rendered.set(canonicalPath, await response.text());
    }
    return rendered.get(canonicalPath);
  }

  for (const sourcePath of knownPaths) {
    const html = await htmlFor(sourcePath);
    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const url = new URL(match[1], "https://bohodigitalservices.com");
      if (["/assets/", "/brand/", "/diagrams/", "/visuals/"].some((prefix) => url.pathname.startsWith(prefix))) continue;
      if (["/favicon.ico", "/boho-digital-services-social-v2.png", "/sitemap.xml", "/robots.txt"].includes(url.pathname)) continue;
      const targetPath = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/+$/, "")}/`;
      assert.ok(knownPaths.has(targetPath), `${sourcePath} links to unknown route ${url.pathname}`);
      if (url.hash) {
        const targetHtml = await htmlFor(targetPath);
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(targetHtml.includes(`id="${id}"`), `${sourcePath} links to missing ${targetPath}#${id}`);
      }
    }
  }
});

test("keeps buyer resources primary and broad research secondary", async () => {
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
    "Buyer guidance for decisions that change ownership, cost, or risk.",
    "Website buying",
    "Provider rescue",
    "Plain-language glossary",
    "Skip the taxonomy. Name the problem.",
    "Evidence rules stay available without becoming the primary sales path.",
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
    "/learn/website-buying/",
    "/learn/provider-rescue/",
    "/learn/glossary/",
    "/lab/claims-we-refuse-to-make/",
  ]) {
    assert.ok(resourceNavigationSource.includes(route), `Resources navigation is missing ${route}`);
  }
  assert.doesNotMatch(resourceNavigationSource, /label: "Small-business SEO"/);
  assert.doesNotMatch(resourceNavigationSource, /label: "Local search"/);
  assert.doesNotMatch(resourceNavigationSource, /label: "Rank Builder research"/);
});

test("renders the governed capability index, glossary, definitions, and diagrams", async () => {
  const [toolsResponse, glossaryResponse, definitionComponent, knowledgeSource, typesSource, audienceSource] = await Promise.all([
    render("/tools"),
    render("/learn/glossary"),
    readFile(new URL("../app/components/DefinitionTerm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/types.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/content/audiencePages.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(toolsResponse.status, 200);
  assert.equal(glossaryResponse.status, 200);

  const toolsHtml = await toolsResponse.text();
  const glossaryHtml = await glossaryResponse.text();

  assert.equal((toolsHtml.match(/<a[^>]+aria-current="page"[^>]*>/g) ?? []).length, 1);
  assert.match(glossaryHtml, /id="term-technical-seo"/);

  for (const name of [
    "Verified current",
    "Demonstrated public",
    "Internal working system",
    "Prototype or experiment",
    "Planned",
    "Historical or archived",
    "Prohibited claim",
  ]) {
    assert.ok(toolsHtml.includes(name), `capability index is missing ${name}`);
  }
  assert.doesNotMatch(typesSource, /\|\s*"Draft"/);
  assert.doesNotMatch(audienceSource, /status:\s*"Draft"/);

  assert.match(toolsHtml, /Public capability profiles · 0 accepted/);
  assert.match(toolsHtml, /no accepted proofEligible=true record/i);
  assert.match(toolsHtml, /How the name becomes a page/);
  assert.match(toolsHtml, /A reviewable path from owner access to the live website/);
  assert.match(toolsHtml, /boho-hosting-architecture-v2\.png/);
  assert.match(toolsHtml, /Read the diagram as text/);
  assert.match(toolsHtml, /class="delivery-route"/);
  assert.match(toolsHtml, /Static assets stay on the asset path/);
  assert.doesNotMatch(toolsHtml, /mosaic-wing|boho-flow/);
  assert.doesNotMatch(toolsHtml, /Working catalog ·/);
  assert.doesNotMatch(toolsHtml, /Rank Builder SEO/);
  assert.doesNotMatch(toolsHtml, /How Biscuit/);
  assert.match(toolsHtml, /developers\.cloudflare\.com/);
  assert.match(toolsHtml, /docs\.github\.com/);
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
  assert.match(glossaryHtml, /Related system terms/);
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
