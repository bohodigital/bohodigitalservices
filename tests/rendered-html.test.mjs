import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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

  const response = await (typeof handler === "function"
    ? handler(request)
    : handler.fetch(
        request,
        {
          ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
        },
        { waitUntil() {}, passThroughOnException() {} },
      ));

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location) return render(new URL(location, origin).pathname, origin);
  }

  return response;
}

const publicRoutes = [
  "/",
  "/services/",
  "/services/website-design-redesign/",
  "/services/website-migration-provider-rescue/",
  "/services/custom-tools-automation/",
  "/services/local-seo-search-visibility/",
  "/services/lead-generation-conversion/",
  "/services/ongoing-seo-growth/",
  "/services/technical-seo-site-health/",
  "/services/research-audits-analytics/",
  "/industries/",
  "/industries/home-improvement-contractors/",
  "/industries/local-service-businesses/",
  "/industries/brick-and-mortar-retail-hospitality/",
  "/industries/online-retail-ecommerce/",
  "/industries/professional-b2b-services/",
  "/resources/",
  "/learn/",
  "/learn/glossary/",
  "/learn/website-buying/",
  "/learn/provider-rescue/",
  "/tools/",
  "/about/",
  "/contact/",
  "/start/",
  "/emergency/",
  "/privacy/",
  "/terms/",
  "/accessibility/",
];

const retiredRoutes = [
  "/pricing/",
  "/lab/",
  "/lab/claims-we-refuse-to-make/",
  "/lab/in-house-brands/",
  "/lab/in-house-brands/how-biscuit/",
  "/learn/bad-seo-field-guide/",
  "/learn/small-business-seo/",
  "/learn/local-search/",
  "/learn/ai-search-visibility/",
  "/learn/featured-rank-builder/",
];

function localReferences(html, attribute) {
  const elementPattern = attribute === "href" ? "a" : "(?:img|script)";
  return [...html.matchAll(new RegExp(`<${elementPattern}\\b[^>]*\\s${attribute}="([^"]+)"`, "gi"))]
    .map((match) => match[1])
    .filter((value) => value.startsWith("/") && !value.startsWith("//"));
}

function idForFragment(fragment) {
  return fragment.replace(/^#/, "");
}

test("server-renders the focused Boho homepage and approved marketing message", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  for (const heading of [
    "Local visibility, lead systems, and websites built by people who understand the machinery.",
    "Marketing systems are still systems.",
    "A six-stage engineering method.",
    "Five service lanes, one accountable system.",
    "Website design built around clarity, trust, discovery, and action.",
    "Provider rescue without losing what still works.",
    "When the right tool does not exist, we build it.",
    "Tired of talking to people who cannot explain the system?",
    "Scope follows diagnosis, not a package menu.",
    "Talk to someone who can explain the machinery.",
  ]) {
    assert.ok(html.includes(heading), `missing homepage heading: ${heading}`);
  }

  assert.match(html, /Built by digital engineers\. Explained in plain English\./i);
  assert.match(html, /Most agencies start with a package\. Boho starts with the business\./i);
  assert.equal((html.match(/class="service-card /g) ?? []).length, 5);
  assert.equal((html.match(/class="method-summary-list__link"/g) ?? []).length, 6);
  assert.match(html, /href="\/contact\/"[^>]*>[\s\S]*?Talk to Someone Technical/i);
  assert.match(html, /href="\/tools\/"[^>]*>[\s\S]*?Explore Boho Systems/i);
  assert.match(html, /We use mature platforms for mature problems and custom engineering for the gaps that matter\./i);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-5CV8L2SE2R/i);
  assert.match(html, /analytics\.bohodigitalservices\.com\/script\.js/i);
  assert.match(html, /data-do-not-track="true"/i);
  assert.match(html, /og-boho-digital-engineering-20260714\.png/i);
  assert.match(html, /class="hero-editorial hero-editorial--artwork"/i);
  assert.match(html, /alt="Boho editorial collage with a bee, botanical forms, mapped routes, and engineering-grid details"/i);
  assert.match(html, /class="definition-term__link"/i);
  assert.doesNotMatch(html, /definition-term__popover|definition-term__mark/i);
  assert.doesNotMatch(html, /Representative editorial photography|Homepage journey|proof-eligible/i);
});

test("renders every intentional public route and retires internal placeholder shelves", async () => {
  for (const route of publicRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();
    assert.equal((html.match(/<main\b/gi) ?? []).length, 1, `${route} main count`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} h1 count`);
    assert.equal((html.match(/<footer\b/gi) ?? []).length, 1, `${route} footer count`);
  }

  for (const route of retiredRoutes) {
    const response = await render(route);
    assert.equal(response.status, 404, `${route} should be retired`);
  }
});

test("publishes the three production form contracts without stale caveats", async () => {
  const forbidden = /preview form|not connected|working draft|private draft|review build|no public (?:street|office) address|without presenting a public office address|proof-eligible|awaiting real|secondary archive|Rank Builder migration|does not transmit|cannot send a message|nothing was sent|form is disconnected/i;
  const formRoutes = [
    {
      route: "/contact/",
      formId: "contact",
      action: "boho_contact",
      fields: [
        "budget", "businessName", "businessType", "companyWebsite", "consent",
        "email", "message", "name", "provider", "service", "serviceArea",
        "timing", "valuableAction", "valuableOffer", "website",
      ],
    },
    {
      route: "/start/",
      formId: "visibility-check",
      action: "boho_visibility_check",
      fields: [
        "budget", "businessName", "businessType", "companyWebsite", "competitors",
        "consent", "email", "name", "provider", "scopeAcknowledgement",
        "serviceArea", "stuck", "timing", "topOffer", "valuableAction", "website",
      ],
    },
    {
      route: "/emergency/",
      formId: "emergency",
      action: "boho_emergency",
      fields: [
        "authorizedAccess", "began", "businessName", "companyWebsite", "consent",
        "deadline", "email", "error", "impact", "name", "platform", "priorChange",
        "problem", "providerContact", "website",
      ],
    },
  ];

  for (const route of publicRoutes) {
    const response = await render(route);
    const html = await response.text();
    assert.doesNotMatch(html, forbidden, `${route} contains internal caveat copy`);
  }

  for (const expected of formRoutes) {
    const html = await (await render(expected.route)).text();
    const form = html.match(/<form\b[\s\S]*?<\/form>/i)?.[0];
    assert.ok(form, `${expected.route} lacks its production form`);
    assert.match(form, new RegExp(`data-form-id="${expected.formId}"`, "i"));
    assert.match(form, new RegExp(`data-turnstile-action="${expected.action}"`, "i"));
    assert.match(form, /data-turnstile-sitekey="0x4AAAAAAD2AbgQjicGIajbI"/i);
    assert.match(form, /href="\/privacy\/"/i);
    assert.match(html, /href="mailto:contact@bohemiandigital\.org/i);
    const names = [...form.matchAll(/\bname="([^"]+)"/gi)]
      .map((match) => match[1])
      .sort();
    assert.deepEqual(names, [...expected.fields].sort(), `${expected.route} field contract`);
  }

  const formRouteSet = new Set(formRoutes.map((item) => item.route));
  for (const route of publicRoutes.filter((item) => !formRouteSet.has(item))) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /<form\b/i, `${route} unexpectedly contains a form`);
  }
});

test("publishes factual privacy, terms, and accessibility pages", async () => {
  const privacy = await (await render("/privacy/")).text();
  assert.match(privacy, /Republic of Bohemia LLC/i);
  assert.match(privacy, /Google Analytics/i);
  assert.match(privacy, /analytics\.bohodigitalservices\.com/i);
  assert.match(privacy, /Cloudflare/i);
  assert.match(privacy, /Turnstile/i);
  assert.match(privacy, /Cloudflare D1/i);
  assert.match(privacy, /scheduled for deletion after 90 days/i);
  assert.match(privacy, /Effective July 15, 2026/i);

  const terms = await (await render("/terms/")).text();
  assert.match(terms, /separately accepted agreement/i);
  assert.match(terms, /Republic of Bohemia LLC/i);
  assert.match(terms, /Effective July 14, 2026/i);

  const accessibility = await (await render("/accessibility/")).text();
  assert.match(accessibility, /WCAG 2\.2 AA principles/i);
  assert.match(accessibility, /mailto:webmaster@bohemiandigital\.org/i);
  assert.match(accessibility, /Statement updated July 14, 2026/i);
});

test("realigns Tools around five system families, two decision visuals, and exactly three selected identities", async () => {
  const tools = await (await render("/tools/")).text();
  assert.match(tools, /Systems built to make digital work cheaper, clearer, and easier to operate\./i);
  assert.match(tools, /Mature platforms handle the commodity infrastructure\. Boho engineers the operating system around the business\./i);
  assert.match(tools, /Custom software is one option, not the opening assumption\./i);
  assert.match(tools, /We repair before replacing, integrate before rebuilding, and write custom software only when the missing capability is worth owning\./i);
  assert.match(tools, /Websites are part of the proof\./i);
  assert.match(tools, /Tools explains what Boho builds and operates\. The glossary explains the technical language underneath it\./i);
  assert.match(tools, /Build the missing tool/i);
  for (const anchor of ["visual-layered-infrastructure", "system-families", "repair-integrate-build", "visual-repair-integrate-build", "selected-tools", "websites", "visual-systems-library", "glossary-bridge"]) {
    assert.match(tools, new RegExp(`id="${anchor}"`, "i"), `missing stable Tools anchor #${anchor}`);
  }
  assert.equal((tools.match(/data-system-family="[^"]+"/g) ?? []).length, 5);
  const selectedIds = [...tools.matchAll(/data-selected-tool-id="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(selectedIds, ["bsuite-mcp-monitor", "secret-broker", "analysis-dashboard"]);
  assert.equal((tools.match(/data-proof-category="owned-website"/g) ?? []).length, 4);
  assert.match(tools, /bohodigitalservices\.com/i);
  assert.match(tools, /howbiscuit\.com/i);
  assert.match(tools, /bettergrades\.net/i);
  assert.match(tools, /rankbuilderseo\.com/i);
  assert.equal((tools.match(/class="systems-visual /g) ?? []).length, 2);
  assert.match(tools, /<meta[^>]+name="robots"[^>]+index, follow/i);
  assert.doesNotMatch(tools, /0 accepted|prohibited claim|capability classifications|no empty proof shelf/i);
  assert.doesNotMatch(tools, /<h[1-4][^>]*>\s*(?:GitHub|Cloudflare|Google Analytics)\s*</i);

  const resources = await (await render("/resources/")).text();
  assert.match(resources, /Buyer guidance for decisions that change ownership, cost, or risk/i);
  assert.match(resources, /Website buying/i);
  assert.match(resources, /Provider rescue/i);
  assert.match(resources, /Plain-language glossary/i);
  assert.match(resources, /Websites &amp; managed hosting/i);
  assert.match(resources, /Get a technical second opinion before the expensive decision/i);
  assert.doesNotMatch(resources, />\s*Lab\s*<|Tools &amp; systems|How Boho builds tools|secondary evidence|Rank Builder/i);

  const guides = await (await render("/learn/")).text();
  const guidesMain = guides.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? guides;
  assert.match(guides, /Website buying/i);
  assert.match(guides, /Provider rescue/i);
  assert.match(guides, /Plain-language glossary/i);
  assert.doesNotMatch(guidesMain, /Local SEO|AI search|Search Console|Business Profile|Custom Tools and Automation|GitHub|Cloudflare|MCP servers|Python automation/i);

  const knowledgeSource = await readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8");
  const knowledgePageSource = await readFile(new URL("../app/components/KnowledgePages.tsx", import.meta.url), "utf8");
  const systemsSource = await readFile(new URL("../app/content/systems.ts", import.meta.url), "utf8");
  assert.doesNotMatch(knowledgeSource, /export (?:type|const) ToolProfile|export const toolProfiles/i);
  assert.doesNotMatch(knowledgeSource, /relatedToolSlugs|cloudflare-workers-pricing|github-pages-api/i);
  assert.doesNotMatch(knowledgePageSource, /export function GlossaryPage|toolProfilesBySlug/i);
  assert.match(systemsSource, /export const systemFamilies/);
  assert.match(systemsSource, /export const selectedTools/);
  assert.match(systemsSource, /export const ownedWebsites/);
});

test("uses link-based glossary definitions without popovers or horizontal-overflow machinery", async () => {
  const homepage = await (await render("/")).text();
  for (const slug of ["website-clarity", "trust-signal", "customer-discovery", "customer-action"]) {
    assert.match(homepage, new RegExp(`href="/learn/glossary/#term-${slug}"`, "i"));
  }
  assert.doesNotMatch(homepage, /aria-expanded="true"[^>]+definition|definition-term__popover/i);

  const glossary = await (await render("/learn/glossary/")).text();
  assert.match(glossary, /Technical language, translated before it becomes leverage/i);
  assert.match(glossary, /Related system family/i);
  assert.match(glossary, /System clusters/i);
  assert.equal((glossary.match(/id="cluster-[^"]+"/g) ?? []).length, 11);
  assert.match(glossary, /Filter by cluster/i);
  assert.match(glossary, /Last reviewed July 11, 2026/i);
  assert.doesNotMatch(glossary, /small question mark|Every popup/i);
  assert.doesNotMatch(glossary, /old mascot-led|no entries are fabricated|definition standard|published definitions are reviewed|repeatable scan|traffic data can replace|reviewed against linked sources|MCP…/i);
});

test("keeps the expanded glossary architecture complete and connected", async () => {
  const knowledgeSource = await readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8");
  const systemsSource = await readFile(new URL("../app/content/systems.ts", import.meta.url), "utf8");
  assert.match(knowledgeSource, /ownershipImplications\?: string/);
  assert.match(knowledgeSource, /businessImplications\?: string/);
  assert.match(knowledgeSource, /relatedSystemFamilies\?: SystemFamilyId\[\]/);
  assert.match(knowledgeSource, /relatedVisualIds\?: SystemVisualId\[\]/);
  assert.match(knowledgeSource, /lastReviewed:/);
  assert.equal((knowledgeSource.match(/^    slug: /gm) ?? []).length, 61);
  assert.equal((systemsSource.match(/id: "(?:websites-publishing|hosting-release|measurement-search-signals|operations-automation|secure-integrations-custom-tools)"/g) ?? []).length, 5);

  const glossary = await (await render("/learn/glossary/")).text();
  for (const familyAnchor of [
    "family-websites-publishing",
    "family-hosting-release",
    "family-measurement-search-signals",
    "family-operations-automation",
    "family-secure-integrations-custom-tools",
  ]) {
    assert.match(glossary, new RegExp(`href="/tools/#${familyAnchor}"`, "i"));
  }
});

test("keeps claim and release boundaries persistent for this private review candidate", async () => {
  const systemsSource = await readFile(new URL("../app/content/systems.ts", import.meta.url), "utf8");
  const toolsSource = await readFile(new URL("../app/components/KnowledgePages.tsx", import.meta.url), "utf8");
  const homepageSource = await readFile(new URL("../app/Homepage.tsx", import.meta.url), "utf8");
  const serviceSource = await readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8");
  const releaseGuard = JSON.parse(await readFile(new URL("../artifacts/CR-2026-07-15-BOHO-TOOLS-SYSTEMS-REALIGNMENT-001/release-guard.json", import.meta.url), "utf8"));
  const scanned = [systemsSource, toolsSource, homepageSource, serviceSource].join("\n");
  assert.doesNotMatch(scanned, /built from the ground up/i);
  assert.equal(releaseGuard.productionDeployment, false);
  assert.equal(releaseGuard.productionFormsChanged, false);
  assert.equal(releaseGuard.selectedToolIds.length, 3);
  assert.deepEqual(releaseGuard.selectedToolIds, ["bsuite-mcp-monitor", "secret-broker", "analysis-dashboard"]);
});

test("publishes clean crawl controls and a sitemap containing only public routes", async () => {
  const robots = await readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*[\s\S]*Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/bohodigitalservices\.com\/sitemap\.xml/i);

  for (const route of publicRoutes) {
    const response = await render(route, "https://bohodigitalservices.com");
    assert.equal(response.headers.get("x-robots-tag"), null, `${route} has an indexing-block header`);
    const html = await response.text();
    const robotsTags = [...html.matchAll(/<meta\b[^>]*\bname="robots"[^>]*>/gi)].map((match) => match[0]);
    assert.equal(robotsTags.length, 1, `${route} robots meta count`);
    assert.match(robotsTags[0], /content="index, follow"/i, `${route} is not indexable`);
    assert.doesNotMatch(robotsTags[0], /noindex|nofollow/i, `${route} retains an indexing block`);
  }

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  for (const route of publicRoutes) {
    assert.match(sitemap, new RegExp(`https://bohodigitalservices\\.com${route.replaceAll("/", "\\/")}`), `${route} missing from sitemap`);
  }
  for (const route of retiredRoutes) {
    assert.doesNotMatch(sitemap, new RegExp(`https://bohodigitalservices\\.com${route.replaceAll("/", "\\/")}`), `${route} leaked into sitemap`);
  }
});

test("contains no residual indexing blocks in source while keeping retired routes unavailable", async () => {
  const crawlControlSources = [
    "../app/[...slug]/page.tsx",
    "../app/sitemap.ts",
    "../app/content/types.ts",
    "../app/content/corePages.ts",
    "../app/content/audiencePages.ts",
    "../app/components/InHouseBrandPage.tsx",
    "../app/components/InHouseBrandsPage.tsx",
  ];

  for (const path of crawlControlSources) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.doesNotMatch(source, /noindex|nofollow|noIndex/i, `${path} retains an indexing block`);
  }

  for (const route of retiredRoutes) {
    const response = await render(route);
    assert.equal(response.status, 404, `${route} should remain retired`);
  }
});

test("ships the exact owner-supplied Boho collage", async () => {
  const artwork = await readFile(new URL("../public/og-boho-digital-engineering-20260714.png", import.meta.url));
  const digest = createHash("sha256").update(artwork).digest("hex");
  assert.equal(digest, "aba7d7ffa937fc604621543d408920c4228f948df2fa912299b9620b355c5131");
});

test("resolves every rendered local link and fragment on the public surface", async () => {
  const cache = new Map();
  async function htmlFor(route) {
    if (!cache.has(route)) {
      const response = await render(route);
      assert.equal(response.status, 200, `${route} did not render`);
      cache.set(route, await response.text());
    }
    return cache.get(route);
  }

  for (const route of publicRoutes) {
    const html = await htmlFor(route);
    for (const href of localReferences(html, "href")) {
      const [path, fragment] = href.split("#", 2);
      const targetRoute = path || route;
      if (targetRoute.startsWith("/assets/") || targetRoute.startsWith("/brand/")) continue;
      const targetHtml = await htmlFor(targetRoute);
      if (fragment) {
        const escaped = idForFragment(fragment).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        assert.match(targetHtml, new RegExp(`id="${escaped}"`, "i"), `${href} has no target from ${route}`);
      }
    }
  }
});

test("resolves every local asset referenced by public HTML", async () => {
  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    for (const src of localReferences(html, "src")) {
      const pathname = decodeURIComponent(src.split("?", 1)[0]);
      await assert.doesNotReject(
        access(new URL(`../dist/client${pathname}`, import.meta.url)),
        `${route} references missing asset ${pathname}`,
      );
    }
  }
  await assert.doesNotReject(access(new URL("../dist/client/og-boho-digital-engineering-20260714.png", import.meta.url)));
});

test("keeps the public shell accessible and free of starter artifacts", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to content/i);
  assert.match(html, /aria-controls="mobile-menu-/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /<script[^>]+type="application\/ld\+json"/i);
  assert.match(html, /<link[^>]+rel="icon"[^>]+boho-search-icon-v2\.png/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape|Lorem ipsum/i);
});
