import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/", origin = "http://localhost") {
  const url = new URL(pathname, origin);
  const decodedPath = decodeURIComponent(url.pathname);
  const relativePath = decodedPath === "/"
    ? "index.html"
    : decodedPath.endsWith("/")
      ? `${decodedPath.slice(1)}index.html`
      : decodedPath.slice(1);
  const fileUrl = new URL(`../out/${relativePath}`, import.meta.url);

  try {
    const body = await readFile(fileUrl);
    const contentType = decodedPath.endsWith(".xml")
      ? "application/xml; charset=utf-8"
      : decodedPath.endsWith(".txt")
        ? "text/plain; charset=utf-8"
        : "text/html; charset=utf-8";
    return new Response(body, { status: 200, headers: { "content-type": contentType } });
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    const body = await readFile(new URL("../out/404.html", import.meta.url));
    return new Response(body, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
}

const publicRoutes = [
  "/",
  "/services/",
  "/services/ongoing-seo/",
  "/services/web-design-redesign/",
  "/services/provider-rescue/",
  "/services/research-audits-strategy/",
  "/services/custom-digital-solutions/",
  "/pricing/",
  "/work/",
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
  "/services/ongoing-seo-growth/",
  "/services/local-seo-search-visibility/",
  "/services/lead-generation-conversion/",
  "/services/technical-seo-site-health/",
  "/services/website-design-redesign/",
  "/services/website-migration-provider-rescue/",
  "/services/research-audits-analytics/",
  "/services/custom-tools-automation/",
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

test("pre-renders the contract-backed commercial homepage decision path", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  for (const heading of [
    "Elegant websites and technical SEO, without the agency fog.",
    "You do not need to diagnose the system before contacting Boho.",
    "Name the problem before choosing the service.",
    "See the work, the method, and the limits of the evidence.",
    "A website is more than its page files.",
    "A clear next step, not an immediate sales ambush.",
    "You do not need to diagnose it first.",
  ]) {
    assert.ok(html.includes(heading), `missing homepage heading: ${heading}`);
  }

  assert.match(html, /Public pricing\. Documented work\. Clear scope\. No mystery retainers\./i);
  assert.match(html, /Chicago-based\. Remote work available\./i);
  assert.match(html, /New website — Starting at \$1,500/i);
  assert.match(html, /Small or straightforward website: usually 4–8 weeks/i);
  assert.match(html, /href="\/start\/"[^>]*>[\s\S]*?Send the Situation/i);
  assert.match(html, /href="\/pricing\/"/i);
  assert.match(html, /href="\/work\/"/i);
  assert.match(html, /class="commercial-services__mosaic"/);
  assert.match(html, /data-umami-event="commercial_primary_cta"/i);
  assert.match(html, /data-umami-event="commercial_pricing_cta"/i);
  assert.match(html, /data-umami-event="commercial_evidence_open"/i);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-5CV8L2SE2R/i);
  assert.match(html, /analytics\.bohodigitalservices\.com\/script\.js/i);
  assert.match(html, /data-do-not-track="true"/i);
  assert.match(html, /og-boho-digital-engineering-20260714\.png/i);
  assert.doesNotMatch(html, /Free Boho Analytics|publicly available Boho Analytics|open-source Boho Analytics/i);
});

test("renders every intentional public route and retires internal placeholder shelves", async () => {
  for (const route of publicRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();
    assert.equal((html.match(/<main\b/gi) ?? []).length, 1, `${route} main count`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} h1 count`);
    assert.equal((html.match(/<footer\b/gi) ?? []).length, 1, `${route} footer count`);
    const renderedLinks = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
    for (const link of renderedLinks) {
      assert.doesNotMatch(link, /definition-term__trigger/i, `${route} nests a glossary trigger inside a link`);
    }
  }

  for (const route of retiredRoutes) {
    const response = await render(route);
    assert.equal(response.status, 404, `${route} should be retired`);
  }
});

test("loads Google Analytics and first-party analytics on every public route", async () => {
  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    const scriptTags = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
    const googleLoaderTags = scriptTags.filter((tag) =>
      /src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-5CV8L2SE2R"/i.test(tag),
    );
    const googleConfigTags = scriptTags.filter((tag) =>
      /window\.dataLayer = window\.dataLayer \|\| \[\]/.test(tag)
      && /gtag\('config', 'G-5CV8L2SE2R'\)/.test(tag)
      && !/self\.__next_f\.push/.test(tag),
    );
    const firstPartyTags = scriptTags.filter((tag) =>
      /src="https:\/\/analytics\.bohodigitalservices\.com\/script\.js"/i.test(tag),
    );

    assert.equal(googleLoaderTags.length, 1, `${route} Google Analytics loader count`);
    assert.equal(googleConfigTags.length, 1, `${route} Google Analytics config count`);
    assert.equal(firstPartyTags.length, 1, `${route} first-party analytics loader count`);
    assert.match(firstPartyTags[0], /data-website-id="aecddac8-8ad4-49c4-b791-60b161c95155"/i, `${route} first-party website ID`);
  }
});

test("renders the Industries decision system without commercial glossary interruptions", async () => {
  const industryRoutes = publicRoutes.filter((route) => route.startsWith("/industries/"));
  const hub = await (await render("/industries/")).text();
  const hubMain = hub.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";

  assert.match(hub, /<title>Website &amp; SEO Services by Industry \| Boho Digital Services<\/title>/i);
  assert.match(
    hub,
    /<meta name="description" content="See how Boho adapts websites, SEO, reporting, provider rescue, and digital systems for contractors, local services, retail, ecommerce, and professional firms\."\/>/i,
  );
  assert.match(hubMain, /<h1[^>]*>Build around the way your customers actually decide\.<\/h1>/i);
  assert.equal((hubMain.match(/customer-path-selector__routes/g) ?? []).length, 1);
  assert.equal((hubMain.match(/data-umami-event="industry_selector_click"/g) ?? []).length, 6);
  assert.match(hubMain, /<table>[\s\S]*Customer needs to know[\s\S]*Trust usually comes from[\s\S]*Valuable action[\s\S]*<\/table>/i);

  for (const anchor of [
    "customer-paths",
    "project-businesses",
    "local-services",
    "retail-hospitality",
    "ecommerce",
    "professional-b2b",
  ]) {
    assert.match(hubMain, new RegExp(`id="${anchor}"`, "i"), `missing Industries anchor ${anchor}`);
  }

  for (const value of [
    "project-business",
    "local-service",
    "retail-hospitality",
    "ecommerce",
    "professional-b2b",
    "hybrid",
  ]) {
    assert.match(hubMain, new RegExp(`business_model=${value}`, "i"), `missing review preselection ${value}`);
  }

  for (const [label, value] of [
    ["Free Initial Review", "Free"],
    ["Boho Analytics Platform", "Free"],
    ["Analyst-Reviewed Monthly Report", "Starting at $95 per month"],
    ["Ongoing SEO &amp; Search Growth", "Starting at $450 per month"],
    ["Focused Website Improvement", "Starting at $750"],
    ["New Website or Substantial Redesign", "Starting at $1,500"],
    ["Provider Rescue Assessment", "Starting at $350"],
    ["Migration or Rescue Assistance", "Starting at $1,000"],
    ["Standalone Review, Audit, or Research", "Starting at $350"],
    ["Custom Discovery and Feasibility", "Starting at $500"],
    ["Focused Custom Build", "Starting at $2,500"],
  ]) {
    assert.ok(hubMain.includes(label), `missing governed price label ${label}`);
    assert.ok(hubMain.includes(value), `missing governed price value ${value}`);
  }

  assert.match(hubMain, /100% of the eligible fee/i);
  assert.match(hubMain, /accepted within 90 days/i);
  assert.match(hubMain, /Evidence cards stay hidden until their destinations are complete and verified\./i);
  assert.match(hubMain, /does not publish fictional clients, fabricated testimonials/i);
  assert.equal(
    (hubMain.match(/The initial review is free and uses public information to identify the next useful discussion\./g) ?? []).length,
    5,
    "every business-model chapter must state the free-review boundary",
  );

  const allowedEvents = new Set([
    "industry_selector_click",
    "industry_page_click",
    "industry_pricing_click",
    "industry_evidence_click",
    "industry_review_start",
    "industry_review_complete",
  ]);
  for (const match of hubMain.matchAll(/data-umami-event="([^"]+)"/g)) {
    assert.ok(allowedEvents.has(match[1]), `unapproved Industries event ${match[1]}`);
  }
  const allowedEventAttributes = new Set([
    "business_model",
    "source_section",
    "destination_type",
    "cta_label",
  ]);
  for (const match of hubMain.matchAll(/data-umami-event-([a-z_]+)=/g)) {
    assert.ok(allowedEventAttributes.has(match[1]), `unapproved Industries analytics attribute ${match[1]}`);
  }

  const uniqueCopy = new Map([
    ["/industries/home-improvement-contractors/", "Does this company do the exact kind of project I need?"],
    ["/industries/local-service-businesses/", "Do not send health, patient, or other sensitive personal data"],
    ["/industries/brick-and-mortar-retail-hospitality/", "Are the hours, menu, products, events, and availability current?"],
    ["/industries/online-retail-ecommerce/", "Can I find the right category or product without knowing the store’s internal terms?"],
    ["/industries/professional-b2b-services/", "Who will do the work and how do they work?"],
  ]);

  for (const route of industryRoutes) {
    const html = await (await render(route)).text();
    const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
    assert.doesNotMatch(main, /definition-term__trigger|section-sidebar|>On this page</i, `${route} retains an automatic glossary or duplicate menu`);
    assert.doesNotMatch(main, /noindex|nofollow/i, `${route} is not indexable`);
    if (route !== "/industries/") {
      const figureCount = (main.match(/class="industry-figure /g) ?? []).length;
      assert.ok(figureCount >= 6 && figureCount <= 8, `${route} must render six to eight meaningful visuals`);
      const readableText = main
        .replace(/<[^>]+>/g, " ")
        .replace(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi, " ")
        .trim();
      const wordCount = readableText.split(/\s+/).filter(Boolean).length;
      assert.ok(wordCount >= 2_200 && wordCount <= 3_500, `${route} must retain substantial differentiated child-page content`);
      assert.match(main, /Representative setting · Not client work · No measured result\./i);
      assert.match(main, /loading="eager"[^>]*fetchPriority="high"/i);
      assert.match(main, /Candidate artifact type/i);
      assert.match(main, new RegExp(uniqueCopy.get(route).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    }
  }

  const formSource = await readFile(new URL("../app/components/DraftForm.tsx", import.meta.url), "utf8");
  assert.match(formSource, /getAll\("business_model"\)/);
  assert.match(formSource, /values\.length !== 1/);
  assert.match(formSource, /config\.formId !== "visibility-check"/);
  assert.match(formSource, /payload\.ok === true[\s\S]*trackIndustryReviewComplete/);
});

test("renders the twelve-scene About story with scientific proof and unambiguous glossary links", async () => {
  const response = await render("/about/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  for (const heading of [
    "I come from professional scientific research. I built Boho because this problem has a clear answer.",
    "Scientific research, software engineering, and original technical problem-solving.",
    "I am used to problems without known answers. This one already has an answer.",
    "Custom where necessary. Reusable where sensible.",
    "We test on our own properties before asking clients to carry the risk.",
    "The subject changed. The underlying work did not.",
    "Too much digital work is expensive because of the organization around it, not the difficulty of the work itself.",
    "You do not meet a salesperson and disappear into a delivery system.",
    "Boho uses automation and artificial intelligence because useful tools should be used.",
    "Boho is new. The professional background is real. The missing client history will not be invented.",
    "Boho operating beliefs",
    "Tell Boho what your business is facing.",
  ]) {
    assert.ok(html.includes(heading), `missing About storyboard heading: ${heading}`);
  }

  for (const image of [
    "/proof/about/science/electron-cloud.png",
    "/proof/about/science/brain-mri.jpg",
    "/proof/about/science/brain-fmri.jpg",
    "/proof/about/science/ode-phase-field.png",
    "/proof/about/science/cajal-purkinje-neuron.jpg",
    "/proof/about/rank-builder-seo-homepage.png",
    "/proof/about/how-biscuit-homepage.png",
    "/proof/about/better-grades-homepage.png",
  ]) {
    assert.match(html, new RegExp(`src="${image.replaceAll("/", "\\/")}"`, "i"));
  }

  for (const url of [
    "https://rankbuilderseo.com/",
    "https://howbiscuit.com/",
    "https://bettergrades.net/",
  ]) {
    assert.match(html, new RegExp(`href="${url.replaceAll("/", "\\/")}"`, "i"));
  }

  assert.match(html, /href="\/contact\/"[^>]*>[\s\S]*?Talk to Someone Technical/i);
  assert.match(html, /href="\/services\/"[^>]*>[\s\S]*?Review Boho’s Services/i);
  assert.match(html, /class="definition-term__popover"/i);
  assert.match(html, /That is the company I built\./i);
  assert.ok(
    html.indexOf("WHAT BOHO BELIEVES") < html.indexOf("PROFESSIONAL BACKGROUND"),
    "Boho beliefs should follow the hero before professional background",
  );
  assert.doesNotMatch(html, /href="\/learn\/glossary\/lead\/"/i);
  assert.doesNotMatch(html, /about-technical-portrait|about-system-flow/i);
  assert.match(html, /Data without direction\./i);
  assert.match(html, /Access without accountability\./i);
  assert.match(html, /A business should know what it controls\./i);
  assert.doesNotMatch(html, /Bohemian is an operating philosophy|Seven ways the philosophy enters the work|Low overhead is part of the product/i);
});

test("publishes the exact Contact, Start, and Emergency route split", async () => {
  const forbidden = /preview form|not connected|working draft|private draft|review build|does not transmit|cannot send a message|nothing was sent|form is disconnected/i;
  for (const route of publicRoutes) {
    assert.doesNotMatch(await (await render(route)).text(), forbidden, `${route} contains stale caveat copy`);
  }

  const contact = await (await render("/contact/")).text();
  const contactMain = contact.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
  assert.doesNotMatch(contactMain, /<form\b/i);
  assert.match(contactMain, /href="\/start\/"[^>]*>Send the Situation/i);
  assert.match(contactMain, /href="mailto:contact@bohemiandigital\.org"[^>]*>Email Boho/i);
  assert.match(contactMain, /href="mailto:webmaster@bohemiandigital\.org"[^>]*>Email the webmaster/i);
  assert.match(contactMain, /href="\/emergency\/"[^>]*>Emergency Website Help/i);

  const formRoutes = [
    {
      route: "/start/",
      fields: ["businessName", "companyWebsite", "consent", "email", "message", "name", "service", "website"],
    },
    {
      route: "/emergency/",
      fields: ["authority", "began", "businessName", "companyWebsite", "consent", "description", "email", "impact", "incidentType", "name", "priorChange", "website"],
    },
  ];
  for (const expected of formRoutes) {
    const html = await (await render(expected.route)).text();
    const form = html.match(/<form\b[\s\S]*?<\/form>/i)?.[0];
    assert.ok(form, `${expected.route} lacks its production form`);
    assert.match(html, /href="\/privacy\/"/i);
    const names = [...form.matchAll(/\bname="([^"]+)"/gi)].map((match) => match[1]).sort();
    assert.deepEqual(names, [...expected.fields].sort(), `${expected.route} field contract`);
  }

  const start = await (await render("/start/")).text();
  const startForm = start.match(/<form\b[\s\S]*?<\/form>/i)?.[0] ?? "";
  assert.doesNotMatch(startForm, /Emergency Website Help/i);

  const clientSource = await readFile(new URL("../app/components/commercial/CommercialInquiryFormClient.tsx", import.meta.url), "utf8");
  assert.match(clientSource, /\[200, 201, 202\]\.includes\(response\.status\) && payload\.ok === true/);
  assert.ok(clientSource.indexOf("payload.ok === true") < clientSource.indexOf("commercial_standard_inquiry_success"));
  assert.match(clientSource, /commercial_emergency_inquiry_success/);
  assert.doesNotMatch(clientSource, /data-umami-event-[a-z-]+=/i);
});

test("keeps candidate prices centralized and publishes the complete assessment-credit conditions", async () => {
  const pricing = await (await render("/pricing/")).text();
  for (const anchor of [
    "analytics-reporting",
    "ongoing-seo",
    "web-design",
    "hosting-email",
    "provider-rescue",
    "audits-strategy",
    "custom-solutions",
  ]) {
    assert.match(pricing, new RegExp(`id="${anchor}"`, "i"));
  }
  for (const condition of [
    /credited in full toward a larger engagement in the same service category/i,
    /proposal controls eligibility, timing, and exclusions/i,
    /included at no separate hosting charge for an eligible website/i,
    /not a promise of unlimited infrastructure or unlimited support/i,
  ]) {
    assert.match(pricing, condition);
  }

  const servicesSource = await readFile(new URL("../app/components/ServicesPage.tsx", import.meta.url), "utf8");
  const pricingSource = await readFile(new URL("../app/components/PricingPage.tsx", import.meta.url), "utf8");
  const coreSource = await readFile(new URL("../app/content/corePages.ts", import.meta.url), "utf8");
  const generatorSource = await readFile(new URL("../scripts/generate-service-page-data.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(servicesSource, /\$\d/);
  assert.doesNotMatch(pricingSource, /\$\d/);
  assert.doesNotMatch(coreSource.slice(coreSource.indexOf('slug: "/pricing/"'), coreSource.indexOf('slug: "/about/"')), /\$\d/);
  assert.match(generatorSource, /approvedCurrencyAmounts/);
  assert.match(generatorSource, /rendered currency amounts do not match/);
});

test("publishes the commercial Services decision layer and exact pricing inventory", async () => {
  const services = await (await render("/services/")).text();
  for (const phrase of [
    "Start with the problem. Buy only the work it actually needs.",
    "Name what is going wrong before choosing the service.",
    "Compare the smallest complete starting point.",
    "Not every problem deserves a retainer.",
  ]) {
    assert.match(services, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }

  const serviceRoutes = [
    "/services/ongoing-seo/",
    "/services/web-design-redesign/",
    "/services/provider-rescue/",
    "/services/custom-digital-solutions/",
    "/services/research-audits-strategy/",
  ];
  for (const route of serviceRoutes) {
    const html = await (await render(route)).text();
    assert.match(html, /commercial-service-layer/i, `${route} lacks its decision layer`);
    assert.match(html, /Starting at \$|— Starting at \$/i, `${route} lacks starting pricing`);
    assert.match(html, /This is a fit when/i, `${route} lacks fit guidance`);
    assert.match(html, /Start somewhere else when/i, `${route} lacks not-fit guidance`);
    assert.match(html, /Usually included/i, `${route} lacks included scope`);
    assert.match(html, /Not included unless the proposal says so/i, `${route} lacks scope exclusions`);
    assert.match(html, /href="\/start\/"/i, `${route} lacks the primary CTA`);
    assert.doesNotMatch(html, /Free Boho Analytics|publicly available Boho Analytics|open-source Boho Analytics/i);
  }

  const pricing = await (await render("/pricing/")).text();
  for (const price of [
    "Initial public review — Free",
    "SEO reporting — Starting at $95 per month",
    "SEO implementation — Starting at $450 per month",
    "Focused website improvement — Starting at $750",
    "New website — Starting at $1,500",
    "Substantial redesign — Starting at $1,500",
    "Provider Rescue Assessment — Starting at $350",
    "Migration assistance — Starting at $1,000",
    "Focused audit or strategy — Starting at $350",
    "Custom discovery — Starting at $500",
    "Focused custom build — Starting at $2,500",
  ]) {
    assert.ok(pricing.includes(price), `missing exact price: ${price}`);
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
  assert.match(accessibility, /href="\/learn\/glossary\/wcag\/"/i);
  assert.match(accessibility, /principles as its design and testing target/i);
  assert.match(accessibility, /mailto:webmaster@bohemiandigital\.org/i);
  assert.match(accessibility, /Statement updated July 14, 2026/i);
});

test("realigns Tools around five system families, two decision visuals, and exactly three selected identities", async () => {
  const tools = await (await render("/tools/")).text();
  assert.match(tools, /Systems built to make digital work cheaper, clearer, and easier to operate\./i);
  assert.match(tools, /Mature/i);
  assert.match(tools, /href="\/learn\/glossary\/platform\/"/i);
  assert.match(tools, /handle the commodity infrastructure\. Boho engineers the operating system around the business\./i);
  assert.match(tools, /Custom software is one option, not the opening assumption\./i);
  assert.match(tools, /We repair before replacing, integrate before rebuilding, and write custom software only when the missing capability is worth owning\./i);
  assert.match(tools, /Three public brands, three different search questions\./i);
  assert.match(tools, /Tools explains what Boho builds and operates\. The glossary explains the technical language underneath it\./i);
  assert.match(tools, /Build the missing tool/i);
  for (const anchor of ["visual-layered-infrastructure", "system-families", "repair-integrate-build", "visual-repair-integrate-build", "selected-tools", "websites", "visual-systems-library", "glossary-bridge"]) {
    assert.match(tools, new RegExp(`id="${anchor}"`, "i"), `missing stable Tools anchor #${anchor}`);
  }
  assert.equal((tools.match(/data-system-family="[^"]+"/g) ?? []).length, 5);
  const selectedIds = [...tools.matchAll(/data-selected-tool-id="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(selectedIds, ["bsuite-mcp-monitor", "secret-broker", "analysis-dashboard"]);
  const selectedToolsSection = tools.match(/<section\b[^>]*id="selected-tools"[\s\S]*?<\/section>/i)?.[0] ?? "";
  assert.ok(selectedToolsSection, "missing selected-tools section");
  assert.equal((selectedToolsSection.match(/data-evidence-type="[^"]+"/g) ?? []).length, 3);
  assert.match(selectedToolsSection, /Short memo/i);
  assert.match(selectedToolsSection, /github\.com\/bohodigital\/bsuite-mcp-monitor/i);
  assert.match(selectedToolsSection, /github\.com\/bohodigital\/boho-secret-broker/i);
  assert.match(selectedToolsSection, /github\.com\/bohodigital\/boho-analytics-platform/i);
  assert.match(selectedToolsSection, /proof\/tools\/bsuite-mcp-monitor\.png/i);
  assert.match(selectedToolsSection, /proof\/tools\/boho-secret-broker\.png/i);
  assert.match(selectedToolsSection, /proof\/tools\/boho-analytics-platform\.png/i);

  const websitesSection = tools.match(/<section\b[^>]*id="websites"[\s\S]*?<\/section>/i)?.[0] ?? "";
  assert.ok(websitesSection, "missing websites section");
  assert.equal((websitesSection.match(/data-proof-category="owned-website"/g) ?? []).length, 3);
  assert.doesNotMatch(websitesSection, /bohodigitalservices\.com/i);
  assert.match(websitesSection, /howbiscuit\.com/i);
  assert.match(websitesSection, /bettergrades\.net/i);
  assert.match(websitesSection, /rankbuilderseo\.com/i);
  assert.match(websitesSection, /SEO learning lens/i);
  assert.match(websitesSection, /github\.com\/bohodigital\/howbiscuit/i);
  assert.match(websitesSection, /github\.com\/bohodigital\/rankbuilderseo/i);
  assert.match(websitesSection, /github\.com\/bohodigital\/bettergrades/i);
  assert.match(websitesSection, /proof\/properties\/howbiscuit\.png/i);
  assert.match(websitesSection, /proof\/properties\/rankbuilderseo\.png/i);
  assert.match(websitesSection, /proof\/properties\/bettergrades\.png/i);
  assert.equal((tools.match(/class="systems-visual /g) ?? []).length, 2);
  assert.match(tools, /<meta[^>]+name="robots"[^>]+index, follow/i);
  assert.doesNotMatch(tools, /0 accepted|prohibited claim|capability classifications|no empty proof shelf/i);
  assert.doesNotMatch(tools, /<h[1-4][^>]*>\s*(?:GitHub|Cloudflare|Google Analytics)\s*</i);

  const resources = await (await render("/resources/")).text();
  assert.match(resources, /Buyer guidance for decisions that change ownership, cost, or risk/i);
  assert.match(resources, /Website buying/i);
  assert.match(resources, /Provider rescue/i);
  assert.match(resources, /Plain-language glossary/i);
  assert.match(resources, /Web Design &amp; Website Redesign/i);
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

test("uses accessible glossary definition popups with direct glossary fallbacks", async () => {
  const homepage = await (await render("/about/")).text();
  for (const slug of ["analytics", "automation", "workflow", "deployment"]) {
    assert.match(homepage, new RegExp(`href="/learn/glossary/${slug}/"`, "i"));
  }
  assert.match(homepage, /class="definition-term__trigger"/i);
  assert.match(homepage, /aria-expanded="false"/i);
  assert.match(homepage, /class="definition-term__popover"/i);
  assert.match(homepage, /class="definition-term__ornament"/i);
  assert.match(homepage, /class="definition-term__heading"/i);
  assert.match(homepage, /class="definition-term__badge"/i);
  assert.match(homepage, /role="group"/i);
  assert.match(homepage, /Close [^"]+ definition/i);
  assert.doesNotMatch(homepage, /class="definition-term__link"/i);

  const definitionSource = await readFile(new URL("../app/components/DefinitionTerm.tsx", import.meta.url), "utf8");
  const definedTextSource = await readFile(new URL("../app/components/DefinedText.tsx", import.meta.url), "utf8");
  const globalStyles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(definitionSource, /onMouseEnter=/);
  assert.match(definitionSource, /onFocusCapture=/);
  assert.match(definitionSource, /event\.key === "Escape"/);
  assert.match(definitionSource, /pointerdown/);
  assert.match(definitionSource, /createPortal\(popover, document\.body\)/);
  assert.match(definitionSource, /containsInteractiveTarget/);
  assert.match(definitionSource, /--definition-(?:anchor-x|left|top)/);
  assert.match(globalStyles, /\.definition-term__ornament/);
  assert.match(globalStyles, /linear-gradient\(145deg, #fffaf0 0%, #efe2c9 100%\)/);
  assert.match(globalStyles, /\.definition-term__popover a:hover/);
  assert.match(globalStyles, /\.definition-term__popover\s*\{[\s\S]*?position:\s*fixed/);
  assert.match(globalStyles, /z-index:\s*2147483000/);
  assert.doesNotMatch(globalStyles, /--definition-shift-x/);
  assert.match(definedTextSource, /excludeSlugs/);

  const glossary = await (await render("/learn/glossary/")).text();
  assert.match(glossary, /Technical language, translated before it becomes leverage/i);
  assert.match(glossary, /Related system family/i);
  assert.match(glossary, /System clusters/i);
  assert.equal((glossary.match(/id="cluster-[^"]+"/g) ?? []).length, 13);
  assert.match(glossary, /Filter by cluster/i);
  assert.match(glossary, /Last reviewed July 16, 2026/i);
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
  assert.match(knowledgeSource, /automaticLabels\?: string\[\]/);
  assert.match(knowledgeSource, /lastReviewed:/);
  assert.equal((knowledgeSource.match(/^    slug: /gm) ?? []).length, 153);
  assert.match(knowledgeSource, /"Privacy and data governance"/);
  assert.equal((systemsSource.match(/id: "(?:websites-publishing|hosting-release|measurement-search-signals|operations-automation|secure-integrations-custom-tools)"/g) ?? []).length, 5);

  const sourceCatalog = knowledgeSource.slice(
    knowledgeSource.indexOf("export const knowledgeSources"),
    knowledgeSource.indexOf("export const sourcesById"),
  );
  const sourceIds = new Set([...sourceCatalog.matchAll(/^    id: "([^"]+)",/gm)].map((match) => match[1]));
  const entryCatalog = knowledgeSource.slice(
    knowledgeSource.indexOf("const glossaryEntrySeeds"),
    knowledgeSource.indexOf("export const glossaryEntries"),
  );
  const entrySlugs = new Set([...entryCatalog.matchAll(/^    slug: "([^"]+)",/gm)].map((match) => match[1]));
  for (const match of entryCatalog.matchAll(/relatedTermSlugs: \[([^\]]*)\]/g)) {
    for (const slug of [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])) {
      assert.ok(entrySlugs.has(slug), `unknown related glossary slug ${slug}`);
    }
  }
  for (const match of entryCatalog.matchAll(/sourceIds: \[([^\]]*)\]/g)) {
    for (const sourceId of [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])) {
      assert.ok(sourceIds.has(sourceId), `unknown glossary source ${sourceId}`);
    }
  }

  const glossary = await (await render("/learn/glossary/")).text();
  const addedSlugs = [
    "platform",
    "website-architecture",
    "dashboard",
    "baseline",
    "source-code",
    "codebase",
    "cutover",
    "http-status-code",
    "not-found-404",
    "redirect-301",
  ];
  for (const slug of addedSlugs) {
    const row = glossary.match(new RegExp(`<details\\b[^>]*id="term-${slug}"[\\s\\S]*?<\\/details>`, "i"))?.[0] ?? "";
    assert.ok(row, `missing expanded glossary row ${slug}`);
    assert.match(row, /Why it matters/i, `${slug} lacks why-it-matters copy`);
    assert.match(row, /Common misunderstanding/i, `${slug} lacks misconception copy`);
    assert.match(row, /Ownership implications/i, `${slug} lacks ownership copy`);
    assert.match(row, /Business implications/i, `${slug} lacks business copy`);
    assert.match(row, /Official sources/i, `${slug} lacks source links`);
  }

  for (const slug of [
    "cloudflare",
    "cloudflare-turnstile",
    "cloudflare-d1",
    "umami",
    "ssh",
    "artificial-intelligence",
    "wcag",
    "assistive-technology",
    "url",
    "crawlability",
    "indexability",
    "form-endpoint",
    "css",
    "magnetic-resonance-imaging",
    "functional-magnetic-resonance-imaging",
    "ordinary-differential-equation",
  ]) {
    const row = glossary.match(new RegExp(`<details\\b[^>]*id="term-${slug}"[\\s\\S]*?<\\/details>`, "i"))?.[0] ?? "";
    assert.ok(row, `missing required glossary row ${slug}`);
    assert.match(row, /Why it matters/i, `${slug} lacks why-it-matters copy`);
    assert.match(row, /Common misunderstanding/i, `${slug} lacks misconception copy`);
    assert.match(row, /Official sources/i, `${slug} lacks source links`);
  }
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

test("keeps automatic glossary matches context-safe across ambiguous business language", async () => {
  const about = await (await render("/about/")).text();
  assert.doesNotMatch(about, /href="\/learn\/glossary\/(?:client|build|production-environment|lead)\//i);
  assert.match(about, /href="\/learn\/glossary\/artificial-intelligence\/"/i);
  for (const slug of ["magnetic-resonance-imaging", "functional-magnetic-resonance-imaging", "ordinary-differential-equation"]) {
    assert.match(about, new RegExp(`href="/learn/glossary/${slug}/"`, "i"), `/about/ lacks ${slug}`);
  }

  const websiteDesign = await (await render("/services/web-design-redesign/")).text();
  assert.doesNotMatch(websiteDesign, /href="\/learn\/glossary\/(?:client|credential)\//i);

  const retail = await (await render("/industries/brick-and-mortar-retail-hospitality/")).text();
  assert.doesNotMatch(retail, /href="\/learn\/glossary\/(?:accessibility|event)\//i);

  const tools = await (await render("/tools/")).text();
  assert.doesNotMatch(tools, /href="\/learn\/glossary\/(?:lead|production-environment)\//i);
  for (const slug of ["cloudflare", "umami", "ssh", "self-hosted", "mit-license", "topic-cluster"]) {
    assert.match(tools, new RegExp(`href="/learn/glossary/${slug}/"`, "i"), `/tools/ lacks ${slug}`);
  }

  const privacy = await (await render("/privacy/")).text();
  for (const slug of ["cloudflare", "cloudflare-turnstile", "cloudflare-d1", "ip-address", "user-agent", "do-not-track", "browser-storage", "page-view", "request-log"]) {
    assert.match(privacy, new RegExp(`href="/learn/glossary/${slug}/"`, "i"), `/privacy/ lacks ${slug}`);
  }


  const websiteBuying = await (await render("/learn/website-buying/")).text();
  assert.doesNotMatch(websiteBuying, /href="\/learn\/glossary\/production-environment\/"/i);
});

test("keeps the commercial visual system responsive and glossary routes connected", async () => {
  const commercialStyles = await readFile(new URL("../app/components/commercial/commercial.css", import.meta.url), "utf8");
  const knowledgeSource = await readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8");

  assert.match(commercialStyles, /@media \(max-width: 760px\)/);
  assert.match(commercialStyles, /prefers-reduced-motion: reduce/);
  assert.match(commercialStyles, /:focus-visible/);

  const glossary = await (await render("/learn/glossary/")).text();
  const entrySlugs = [...knowledgeSource.matchAll(/^    slug: "([^"]+)",/gm)].map((match) => match[1]);
  assert.equal(new Set(entrySlugs).size, entrySlugs.length, "glossary slugs must be unique");
  for (const slug of entrySlugs) {
    assert.match(glossary, new RegExp(`id="term-${slug}"`, "i"), `missing rendered glossary entry ${slug}`);
  }

  for (const route of ["/learn/website-buying/", "/learn/provider-rescue/", "/resources/", "/tools/", "/privacy/"]) {
    const html = await (await render(route)).text();
    assert.match(html, /href="\/learn\/glossary\/[a-z0-9-]+\/"/i, `${route} lacks a glossary definition link`);
  }
});

test("publishes permanent indexable glossary detail routes with canonical schema", async () => {
  const knowledgeSource = await readFile(new URL("../app/content/knowledge.ts", import.meta.url), "utf8");
  const entryCatalog = knowledgeSource.slice(
    knowledgeSource.indexOf("const glossaryEntrySeeds"),
    knowledgeSource.indexOf("export const glossaryEntries"),
  );
  const entries = [...entryCatalog.matchAll(/^\s+term: "([^"]+)",\n\s+slug: "([^"]+)",[\s\S]*?^\s+shortDefinition: "([^"]+)",/gm)]
    .map((match) => ({ term: match[1], slug: match[2], preview: match[3] }));
  assert.equal(entries.length, 153);

  const sitemap = await (await render("/sitemap.xml")).text();
  const hub = await (await render("/learn/glossary/")).text();
  const canonicals = new Set();

  for (const { term, slug } of entries) {
    const route = `/learn/glossary/${slug}/`;
    const html = await (await render(route)).text();
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} H1 count`);
    assert.match(html, new RegExp(`<h1>${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h1>`, "i"));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://bohodigitalservices\\.com${route.replaceAll("/", "\\/")}"`, "i"));
    const robotsTags = html.match(/<meta\b[^>]*name="robots"[^>]*>/gi) ?? [];
    assert.deepEqual(robotsTags, ['<meta name="robots" content="index, follow"/>']);
    assert.match(html, /"@type":"DefinedTerm"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /<meta property="og:image" content="https:\/\/bohodigitalservices\.com\/og-boho-digital-engineering-20260714\.png"\/>/i);
    assert.match(html, new RegExp(`<meta name="twitter:title" content="${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} Definition \\| Boho Digital Services"`, "i"));
    assert.match(html, /aria-label="Breadcrumb"/i);
    assert.match(html, /Return to the complete glossary/i);
    assert.match(hub, new RegExp(`href="${route.replaceAll("/", "\\/")}"`, "i"), `${route} lacks hub inlink`);
    assert.match(sitemap, new RegExp(`https://bohodigitalservices\\.com${route.replaceAll("/", "\\/")}`), `${route} missing from sitemap`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    assert.ok(canonical && !canonicals.has(canonical), `${route} canonical is missing or duplicated`);
    canonicals.add(canonical);
  }

  const vanity = await (await render("/learn/glossary/vanity-metrics/")).text();
  assert.match(vanity, /Vanity metrics are numbers that look impressive without helping a team make better decisions\./);
  assert.match(vanity, /Last reviewed\s*(?:<!--.*?-->\s*)?July 22, 2026/);
  assert.doesNotMatch(vanity, /Common misunderstanding/);
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
  const robots = await readFile(new URL("../out/robots.txt", import.meta.url), "utf8");
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

    const pagesResponse = await render(route, "https://bohodigitalservices.pages.dev");
    assert.equal(pagesResponse.headers.get("x-robots-tag"), null, `${route} has a Pages indexing-block header`);
    const pagesHtml = await pagesResponse.text();
    const pagesRobotsTags = [...pagesHtml.matchAll(/<meta\b[^>]*\bname="robots"[^>]*>/gi)].map((match) => match[0]);
    assert.equal(pagesRobotsTags.length, 1, `${route} Pages robots meta count`);
    assert.match(pagesRobotsTags[0], /content="index, follow"/i, `${route} is not indexable on Pages`);
    assert.doesNotMatch(pagesRobotsTags[0], /noindex|nofollow/i, `${route} retains a Pages indexing block`);
  }

  const pagesRobotsResponse = await render("/robots.txt", "https://bohodigitalservices.pages.dev");
  assert.equal(pagesRobotsResponse.headers.get("x-robots-tag"), null, "Pages robots.txt has an indexing-block header");
  const pagesRobots = await pagesRobotsResponse.text();
  assert.match(pagesRobots, /User-agent: \*[\s\S]*Allow: \//i);
  assert.doesNotMatch(pagesRobots, /Disallow: \//i);

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

test("ships public pages as static assets without a Worker runtime", async () => {
  for (const path of [
    "../out/index.html",
    "../out/about/index.html",
    "../out/tools/index.html",
    "../out/learn/glossary/index.html",
    "../out/contact/__next.$c$slug.__PAGE__.txt",
    "../out/robots.txt",
    "../out/sitemap.xml",
    "../out/_headers",
  ]) {
    await assert.doesNotReject(access(new URL(path, import.meta.url)), `missing static artifact ${path}`);
  }

  await assert.rejects(
    access(new URL("../out/_worker.js", import.meta.url)),
    (error) => error?.code === "ENOENT",
    "static Pages output must not include a Worker entry point",
  );
  await assert.rejects(
    access(new URL("../.wrangler/deploy/config.json", import.meta.url)),
    (error) => error?.code === "ENOENT",
    "stale generated Worker deployment config must be removed",
  );

  const headers = await readFile(new URL("../out/_headers", import.meta.url), "utf8");
  assert.match(headers, /\/\*[\s\S]*Cache-Control:[^\n]*no-transform/i);
  assert.match(headers, /\/_next\/static\/\*[\s\S]*max-age=31536000[\s\S]*immutable/i);
  assert.doesNotMatch(headers, /noindex|nofollow|x-robots-tag/i);

  const wranglerConfig = await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");
  assert.match(wranglerConfig, /"pages_build_output_dir"\s*:\s*"\.\/out"/);
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
    "../worker/index.ts",
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
        access(new URL(`../out${pathname}`, import.meta.url)),
        `${route} references missing asset ${pathname}`,
      );
    }
  }
  await assert.doesNotReject(access(new URL("../out/og-boho-digital-engineering-20260714.png", import.meta.url)));
});

test("keeps the public shell accessible and free of starter artifacts", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to main content/i);
  assert.match(html, /aria-controls="mobile-menu-/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /<script[^>]+type="application\/ld\+json"/i);
  assert.match(html, /<link[^>]+rel="icon"[^>]+boho-search-icon-v2\.png/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape|Lorem ipsum/i);
});
