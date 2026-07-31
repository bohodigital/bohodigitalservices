import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import "./commercial-release-candidate.test.mjs";

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
  "/work/",
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mainContent(html) {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
}

function imageTags(html) {
  return html.match(/<img\b[^>]*>/gi) ?? [];
}

function attributeValue(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}="([^"]*)"`, "i"))?.[1];
}

test("pre-renders the commercial-reset Homepage with locked copy and four services", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const main = mainContent(html);
  for (const text of [
    "CUSTOM BUSINESS WEBSITES",
    "Business websites from $850. Hosting stays free.",
    "Eligible hosting costs $0 per month.",
    "If you stop working with Boho, the website stays where it is.",
    "For eligible static websites using Cloudflare’s Free plan.",
    "Client ownership receipt",
    "Eligible hosting",
    "$0/month",
    "Cloudflare account",
    "Revocable",
    "Active Boho contract required",
    "FOUR WAYS TO WORK WITH BOHO",
    "Build it. Grow it. Fix it. Automate it.",
    "Four services. Everything else is scope.",
    "Hosting should not become a leash.",
    "The price changes with the work, not the label.",
    "Real systems. Live on the web.",
    "From first review to launch.",
    "Could your next website cost $0 per month to host?",
  ]) assert.ok(html.includes(text), `missing Homepage copy: ${text}`);
  assert.doesNotMatch(
    main,
    /RESTAURANT EXAMPLE|Ordering and reservations can be simple or genuinely custom\.|restaurant website|restaurant or local-business/i,
    "Homepage must not promote a restaurant-specific commercial direction",
  );
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((main.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((main.match(/data-canonical-service-card/g) ?? []).length, 4);
  for (const [service, price, href] of [
    ["BUSINESS WEBSITES", "From $850", "/services/web-design-redesign/"],
    ["ONGOING SEO &amp; LOCAL GROWTH", "From $450/month", "/services/ongoing-seo/"],
    ["WEBSITE HELP", "From $200", "/services/#website-help"],
    ["CUSTOM SYSTEMS", "From $1,500", "/services/custom-digital-solutions/"],
  ]) {
    assert.ok(main.includes(service), `Homepage is missing ${service}`);
    assert.ok(main.includes(price), `Homepage is missing ${price}`);
    assert.match(main, new RegExp(`href="${escapeRegExp(href)}"`));
  }
  assert.match(main, /href="\/start\/"[^>]*>[\s\S]*?Get a free website review/i);
  assert.match(main, /href="\/pricing\/#business-websites"[^>]*>[\s\S]*?See website pricing/i);
  assert.match(html, /src="\/analytics-bootstrap\.js"/i);
  assert.match(html, /data-ga-id="G-5CV8L2SE2R"/i);
  assert.match(html, /data-umami-website-id="aecddac8-8ad4-49c4-b791-60b161c95155"/i);
  assert.match(html, /og-boho-commercial-reset-20260730\.webp/i);
  assert.doesNotMatch(html, /definition-term__trigger/i);
  assert.doesNotMatch(main, /The Whole System|Observation Record|Concept Interface|Starting Hypothesis/i);
});

test("enforces the commercial-reset price, hosting, FAQ, and CTA contract", async () => {
  const canonicalRoutes = [
    "/",
    "/services/",
    "/pricing/",
    "/services/web-design-redesign/",
    "/services/ongoing-seo/",
    "/services/provider-rescue/",
    "/services/research-audits-strategy/",
    "/services/custom-digital-solutions/",
    "/industries/",
    "/about/",
    "/resources/",
    "/start/",
  ];
  const rendered = new Map();
  for (const route of canonicalRoutes) {
    const html = await (await render(route)).text();
    rendered.set(route, html);
    assert.match(html, /href="\/start\/"[^>]*>[\s\S]*?Get a free website review/i, `${route} lost the universal CTA`);
    assert.doesNotMatch(
      mainContent(html),
      /\$95|\$350|\$500|\$750|\$1,000|\$2,500|Essential Website|Provider Rescue Assessment|Focused Website Improvement|Custom Discovery|Focused Custom Build/i,
      `${route} exposes a retired product or price`,
    );
    assert.doesNotMatch(
      mainContent(html),
      /eligible website hosting[\s\S]{0,180}(?:requires|while|during)[\s\S]{0,100}(?:active|qualifying) (?:Boho )?(?:relationship|retainer)/i,
      `${route} ties eligible website hosting to an active Boho relationship`,
    );
  }

  const homepage = rendered.get("/");
  assert.ok(homepage);
  const homeMain = mainContent(homepage);
  assert.ok(homeMain.includes("$850"));
  assert.ok(homeMain.includes("$0/month"));
  assert.ok(homeMain.includes("Hosting stays free"));
  assert.equal((homeMain.match(/data-canonical-service-card/g) ?? []).length, 4);

  const servicesMain = mainContent(rendered.get("/services/"));
  assert.equal(
    (servicesMain.match(/<h2 id="(?:business-websites|ongoing-seo|website-help|custom-systems)-title">/g) ?? []).length,
    4,
  );
  for (const value of ["From $450/month", "From $200", "From $1,500"]) {
    assert.ok(servicesMain.includes(value), `Services is missing ${value}`);
  }

  const faqScript = [...homeMain.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((value) => value["@graph"] ?? [value])
    .find((value) => value["@type"] === "FAQPage");
  assert.ok(faqScript, "Homepage FAQ schema is missing");
  const visibleFaqs = [...homeMain.matchAll(/<details\b[^>]*><summary[^>]*>([\s\S]*?)<\/summary><div[^>]*><p>([\s\S]*?)<\/p><\/div><\/details>/g)]
    .map((match) => ({
      question: match[1]
        .replace(/<span class="faq-item__icon"[\s\S]*?<\/span>/g, "")
        .replace(/<[^>]+>/g, "")
        .replaceAll("&amp;", "&"),
      answer: match[2].replace(/<[^>]+>/g, "").replaceAll("&amp;", "&"),
    }));
  assert.deepEqual(
    faqScript.mainEntity.map((entry) => ({
      question: entry.name,
      answer: entry.acceptedAnswer.text,
    })),
    visibleFaqs,
  );
});


test("renders every intentional public route and retires internal placeholder shelves", async () => {
  for (const route of publicRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} did not render`);
    const html = await response.text();
    assert.equal((html.match(/<main\b/gi) ?? []).length, 1, `${route} main count`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} h1 count`);
    assert.equal((html.match(/<footer\b/gi) ?? []).length, 1, `${route} footer count`);
    assert.doesNotMatch(html, /href="\/work(?:\/|#|")/i, `${route} retains a Work link`);
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

test("loads one shared analytics policy bootstrap on every public route", async () => {
  for (const route of publicRoutes) {
    const html = await (await render(route)).text();
    const scriptTags = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) ?? [];
    const bootstrapTags = scriptTags.filter((tag) =>
      /src="\/analytics-bootstrap\.js"/i.test(tag),
    );

    assert.equal(bootstrapTags.length, 1, `${route} shared bootstrap count`);
    assert.match(bootstrapTags[0], /data-analytics-bootstrap="boho-v2"/i, `${route} bootstrap version`);
    assert.match(bootstrapTags[0], /data-umami-domains="bohodigitalservices.com,www.bohodigitalservices.com"/i, `${route} Umami hosts`);
    assert.match(bootstrapTags[0], /data-ga-public-hosts="bohodigitalservices.com,www.bohodigitalservices.com"/i, `${route} GA hosts`);
    assert.doesNotMatch(html, /src="https:\/\/(?:www\.googletagmanager\.com|analytics\.bohodigitalservices\.com)/i, `${route} bypasses the policy gate`);
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
    ["Free Website Review", "Free"],
    ["Business Websites", "From $850"],
    ["Ongoing SEO &amp; Local Growth", "From $450/month"],
    ["Website Help", "From $200"],
    ["Custom Systems", "From $1,500"],
  ]) {
    assert.ok(hubMain.includes(label), `missing governed price label ${label}`);
    assert.ok(hubMain.includes(value), `missing governed price value ${value}`);
  }

  assert.doesNotMatch(hubMain, /\$95|\$350|\$500|\$750|\$1,000|\$2,500/i);
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

  assert.match(html, /href="\/start\/"[^>]*>[\s\S]*?Get a free website review/i);
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
  assert.match(contactMain, /href="\/start\/"[^>]*>Get a free website review/i);
  assert.match(contactMain, /href="mailto:contact@bohemiandigital\.org"[^>]*>Email Boho/i);
  assert.match(contactMain, /href="mailto:webmaster@bohemiandigital\.org"[^>]*>Email the webmaster/i);
  assert.match(contactMain, /href="\/emergency\/"[^>]*>Emergency Website Help/i);

  const formRoutes = [
    {
      route: "/start/",
      fields: [
        "budget",
        "businessName",
        "companyWebsite",
        "consent",
        "email",
        "message",
        "name",
        "provider",
        "service",
        "serviceArea",
        "timing",
        "valuableAction",
        "valuableOffer",
        "website",
      ],
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
  const startMain = mainContent(start);
  const startForm = start.match(/<form\b[\s\S]*?<\/form>/i)?.[0] ?? "";
  for (const text of [
    "FREE WEBSITE REVIEW",
    "Get a clear next step for your website.",
    "Send the current website or briefly describe what the business needs.",
    "Request your free review",
    "Request my free review",
  ]) assert.ok(startMain.includes(text), `/start/ is missing: ${text}`);
  for (const option of [
    "Business Website",
    "Ongoing SEO &amp; Local Growth",
    "Website Help",
    "Custom System",
    "Not sure",
  ]) assert.match(startForm, new RegExp(`<option value="${option}">${option}</option>`));
  assert.match(start, /<title>Get a clear next step for your website\.<\/title>/i);
  assert.doesNotMatch(startForm, /Emergency Website Help/i);
  assert.doesNotMatch(startMain, /Send the Situation/i);

  const clientSource = await readFile(new URL("../app/components/commercial/CommercialInquiryFormClient.tsx", import.meta.url), "utf8");
  assert.match(clientSource, /\[200, 201, 202\]\.includes\(response\.status\) && payload\.ok === true/);
  assert.ok(clientSource.indexOf("payload.ok === true") < clientSource.indexOf("commercial_standard_inquiry_success"));
  assert.match(clientSource, /commercial_emergency_inquiry_success/);
  assert.doesNotMatch(clientSource, /data-umami-event-[a-z-]+=/i);
});

test("keeps the commercial-reset service keys, prices, and routes centralized", async () => {
  const pricing = await (await render("/pricing/")).text();
  for (const anchor of ["business-websites", "ongoing-seo"]) {
    assert.match(pricing, new RegExp(`id="${anchor}"`, "i"));
  }
  for (const value of ["$850", "$450/month", "$200", "$1,500"]) {
    assert.ok(pricing.includes(value), `Pricing is missing ${value}`);
  }

  const servicesSource = await readFile(new URL("../app/components/ServicesPage.tsx", import.meta.url), "utf8");
  const pricingSource = await readFile(new URL("../app/components/PricingPage.tsx", import.meta.url), "utf8");
  const commercialSource = await readFile(new URL("../app/content/commercialReset.ts", import.meta.url), "utf8");
  const policySource = await readFile(new URL("../app/content/pricingPolicy.mjs", import.meta.url), "utf8");
  const generatorSource = await readFile(new URL("../scripts/generate-service-page-data.mjs", import.meta.url), "utf8");
  assert.match(servicesSource, /canonicalServices/);
  assert.match(pricingSource, /canonicalServices/);
  for (const [key, label, price, route] of [
    ["businessWebsites", "Business Websites", "From $850", "/services/web-design-redesign/"],
    ["ongoingSeo", "Ongoing SEO & Local Growth", "From $450/month", "/services/ongoing-seo/"],
    ["websiteHelp", "Website Help", "From $200", "/services/#website-help"],
    ["customSystems", "Custom Systems", "From $1,500", "/services/custom-digital-solutions/"],
  ]) {
    for (const value of [key, label, price, route]) {
      assert.ok(commercialSource.includes(value), `canonical source is missing ${value}`);
      assert.ok(policySource.includes(value), `pricing policy is missing ${value}`);
    }
  }
  assert.match(generatorSource, /legacyGeneratedCurrencyAmounts/);
  assert.match(generatorSource, /rendered currency amounts do not match/);
});

test("renders the simplified four-service Pricing page and matching FAQ schema", async () => {
  const pricing = await (await render("/pricing/")).text();
  const pricingMain = mainContent(pricing);
  assert.equal((pricing.match(/<h1\b/gi) ?? []).length, 1);
  for (const phrase of [
    "Four services. Clear starting prices.",
    "Start with the outcome the business needs.",
    "Pricing summary",
    "Business Website scope examples",
    "What can increase the scope?",
    "Pricing FAQ",
  ]) {
    assert.ok(pricingMain.includes(phrase), `pricing guide is missing: ${phrase}`);
  }
  const summary = pricingMain.match(/<table class="pricing-summary-table">[\s\S]*?<\/table>/i)?.[0] ?? "";
  assert.equal((summary.match(/<tr\b/gi) ?? []).length, 5);
  for (const [service, price] of [
    ["Business Websites", "$850"],
    ["Ongoing SEO &amp; Local Growth", "$450/month"],
    ["Website Help", "$200"],
    ["Custom Systems", "$1,500"],
  ]) {
    assert.ok(summary.includes(service), `summary is missing ${service}`);
    assert.ok(summary.includes(price), `summary is missing ${price}`);
  }
  assert.equal((pricingMain.match(/data-analytics-event="pricing_service_click"/gi) ?? []).length, 4);
  assert.match(pricingMain, /href="\/start\/"[^>]*>[\s\S]*?Get a free website review/i);
  assert.doesNotMatch(pricingMain, /definition-term__trigger|definition-term__popover/i);
  assert.match(pricingMain, /"@type":"BreadcrumbList"/);
  assert.match(pricingMain, /"@type":"ItemList"/);
  assert.match(pricingMain, /"@type":"FAQPage"/);
  assert.equal((pricingMain.match(/"@type":"Offer"/g) ?? []).length, 4);
  assert.match(pricing, /<title>Website, SEO &amp; Technical Services Pricing \| Boho<\/title>/i);
  assert.match(pricing, /content="Business websites from \$850, ongoing SEO from \$450 per month, website help from \$200, and custom systems from \$1,500\. Clear scope and client-owned hosting\."/i);
  assert.match(pricing, /G-5CV8L2SE2R/);
  assert.match(pricing, /analytics\.bohodigitalservices\.com/);
});

test("publishes exactly four canonical Services and aligns indexed detail routes", async () => {
  const services = await (await render("/services/")).text();
  for (const phrase of [
    "FOUR SERVICES · PUBLIC STARTING PRICES",
    "Build it. Grow it. Fix it. Automate it.",
    "Audits, migrations, reporting, and discovery are parts of those jobs, not a maze of separate products.",
    "Public starting prices. Written scope. Client-owned durable accounts. No mystery retainer.",
    "Start with the outcome, not the technical label.",
  ]) {
    assert.match(services, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
  const servicesMain = mainContent(services);
  const canonicalSections = [
    ["business-websites", "Business Websites", "From $850"],
    ["ongoing-seo", "Ongoing SEO &amp; Local Growth", "From $450/month"],
    ["website-help", "Website Help", "From $200"],
    ["custom-systems", "Custom Systems", "From $1,500"],
  ];
  for (const [id, service, price] of canonicalSections) {
    const section = servicesMain.match(new RegExp(`<section[^>]+id="${id}"[\\s\\S]*?<\\/section>`, "i"))?.[0] ?? "";
    assert.ok(section, `Services is missing ${id}`);
    assert.match(section, new RegExp(`<h2[^>]*>${service}<\\/h2>`, "i"));
    assert.ok(section.includes(price), `${id} is missing ${price}`);
  }
  assert.equal((servicesMain.match(/class="reset-service-detail(?: |")/gi) ?? []).length, 4);
  assert.equal((servicesMain.match(/"@type":"Service"/g) ?? []).length, 4);

  const serviceRoutes = [
    ["/services/ongoing-seo/", "From $450/month"],
    ["/services/web-design-redesign/", "From $850"],
    ["/services/provider-rescue/", "From $200"],
    ["/services/custom-digital-solutions/", "From $1,500"],
    ["/services/research-audits-strategy/", "From $200"],
  ];
  for (const [route, price] of serviceRoutes) {
    const html = await (await render(route)).text();
    assert.match(html, /reset-detail-hero/i, `${route} lacks its commercial alignment layer`);
    assert.ok(html.includes(price), `${route} lacks ${price}`);
    assert.match(html, /href="\/start\/"/i, `${route} lacks the primary CTA`);
    assert.doesNotMatch(html, /Free Boho Analytics|publicly available Boho Analytics|open-source Boho Analytics/i);
    assert.doesNotMatch(mainContent(html), /\$95|\$350|\$500|\$750|\$1,000|\$2,500/i);
  }
});

test("restores the canonical Services asset system, proof, and accessible visual models", async () => {
  const routeRequirements = {
    "/services/ongoing-seo/": {
      primary: "/visuals/services/ongoing-seo-v1.webp",
      secondary: ["/visuals/growth-analysis.webp"],
      diagrams: ["local-customer-path"],
      proofIds: [],
      captions: [
        "Licensed editorial metaphor for steady, compounding improvement. Not a performance chart or client result.",
      ],
      moduleCount: 3,
    },
    "/services/web-design-redesign/": {
      primary: "/visuals/services/web-design-redesign-v1.webp",
      secondary: [
        "/visuals/creative-process.webp",
        "/diagrams/boho-hosting-architecture-v2.png",
      ],
      diagrams: ["website-release-flow"],
      proofIds: ["how-biscuit", "rank-builder-seo", "better-grades"],
      captions: [
        "Licensed editorial image representing design planning and visual decision work. Not client work.",
        "Factual architecture figure showing which website systems connect and where ownership and exit documentation matter.",
        "Owned Boho property. Not a client project.",
      ],
      moduleCount: 4,
    },
    "/services/provider-rescue/": {
      primary: "/visuals/services/provider-rescue-v1.webp",
      secondary: ["/visuals/migration-infrastructure.webp"],
      diagrams: ["ownership-map"],
      proofIds: [],
      captions: [
        "Licensed editorial image representing infrastructure maintenance and migration work. Not client work.",
      ],
      moduleCount: 3,
    },
    "/services/research-audits-strategy/": {
      primary: "/visuals/services/research-audits-strategy-v1.webp",
      secondary: [
        "/visuals/research-notebook.webp",
        "/proof/tools/boho-analytics-platform.png",
      ],
      diagrams: ["measurement-search-signal-flow"],
      proofIds: ["analysis-dashboard"],
      captions: [
        "Licensed editorial image representing research and evidence review. Not client work.",
        "Public repository evidence from an owned Boho system.",
        "Example data only",
        "Not a client project",
      ],
      moduleCount: 4,
    },
    "/services/custom-digital-solutions/": {
      primary: "/visuals/services/custom-digital-solutions-v1.webp",
      secondary: [
        "/proof/tools/bsuite-mcp-monitor.png",
        "/proof/tools/boho-secret-broker.png",
      ],
      diagrams: ["controlled-automation-mcp-interface"],
      proofIds: ["bsuite-mcp-monitor", "secret-broker"],
      captions: [
        "Public repository evidence from an owned Boho system.",
        "Owned Boho system",
        "Not a client project",
      ],
      moduleCount: 4,
    },
  };
  const renderedByRoute = new Map();

  for (const [route, requirements] of Object.entries(routeRequirements)) {
    const html = await (await render(route)).text();
    const main = mainContent(html);
    const images = imageTags(main);
    renderedByRoute.set(route, main);

    assert.equal((main.match(/<h1\b/gi) ?? []).length, 1, `${route} h1 count`);
    assert.equal(
      images.filter((tag) => attributeValue(tag, "src") === requirements.primary).length,
      1,
      `${route} primary illustration occurrence`,
    );
    for (const src of requirements.secondary) {
      assert.equal(
        images.filter((tag) => attributeValue(tag, "src") === src).length,
        1,
        `${route} required supporting asset ${src}`,
      );
    }
    for (const id of requirements.diagrams) {
      assert.match(main, new RegExp(`(?:data-service-diagram-id|data-system-visual-id)="${escapeRegExp(id)}"`, "i"), `${route} missing ${id}`);
    }
    for (const id of requirements.proofIds) {
      assert.match(main, new RegExp(`data-(?:service-proof|owned-property)-id="${escapeRegExp(id)}"`, "i"), `${route} missing proof ${id}`);
    }
    for (const caption of requirements.captions) {
      assert.ok(main.includes(caption), `${route} missing disclosure: ${caption}`);
    }

    assert.equal(
      (main.match(/\bdata-service-visual-module="[^"]+"/gi) ?? []).length,
      requirements.moduleCount,
      `${route} major visual module count`,
    );
    assert.ok(requirements.moduleCount <= 4, `${route} exceeds the module budget`);
    assert.ok(images.length <= 6, `${route} has an unreasonable main-content image count`);
    assert.match(main, /href="\/start\/"/i, `${route} lost its start CTA`);
    assert.match(html, /G-5CV8L2SE2R/i, `${route} lost Google Analytics`);
    assert.match(html, /analytics\.bohodigitalservices\.com/i, `${route} lost first-party analytics`);
    assert.doesNotMatch(main, /<img\b[^>]*\bsrc="https?:\/\//i, `${route} uses a remote runtime image`);
    for (const disclosure of main.match(/<details\b[\s\S]*?<\/details>/gi) ?? []) {
      assert.doesNotMatch(disclosure, /<img\b/i, `${route} hides a critical visual in an inactive disclosure`);
    }

    for (const image of images) {
      const src = attributeValue(image, "src");
      assert.ok(src?.startsWith("/"), `${route} has a non-local image source: ${src}`);
      assert.match(image, /\bwidth="\d+"/i, `${route} image lacks intrinsic width: ${src}`);
      assert.match(image, /\bheight="\d+"/i, `${route} image lacks intrinsic height: ${src}`);
      assert.match(image, /\bsizes="[^"]+"/i, `${route} image lacks responsive sizes: ${src}`);
      await access(new URL(`../public${src}`, import.meta.url));
    }
  }

  const serviceDetails = [...renderedByRoute.values()].join("\n");
  assert.doesNotMatch(
    serviceDetails,
    /Original editorial illustration explaining the service concept|This commissioned illustration explains the service concept/i,
    "commissioned illustration disclaimer remains on a service detail route",
  );
  for (const [src, requiredRoute] of [
    ["/visuals/growth-analysis.webp", "/services/ongoing-seo/"],
    ["/visuals/creative-process.webp", "/services/web-design-redesign/"],
    ["/visuals/migration-infrastructure.webp", "/services/provider-rescue/"],
    ["/visuals/research-notebook.webp", "/services/research-audits-strategy/"],
    ["/diagrams/boho-hosting-architecture-v2.png", "/services/web-design-redesign/"],
  ]) {
    assert.equal(
      imageTags(serviceDetails).filter((tag) => attributeValue(tag, "src") === src).length,
      1,
      `${src} detail-route inventory count`,
    );
    assert.match(renderedByRoute.get(requiredRoute), new RegExp(`src="${escapeRegExp(src)}"`), `${src} required route`);
  }

  for (const forbidden of [
    "/visuals/industry-contractors.webp",
    "/visuals/industry-local-service.webp",
    "/visuals/industry-retail.webp",
    "/visuals/industry-ecommerce.webp",
    "/visuals/industry-b2b.webp",
    "/proof/about/better-grades-homepage.png",
    "/proof/about/how-biscuit-homepage.png",
    "/proof/about/rank-builder-seo-homepage.png",
    "/proof/about/science/",
  ]) {
    assert.doesNotMatch(serviceDetails, new RegExp(escapeRegExp(forbidden), "i"), `forbidden Services asset ${forbidden}`);
  }

  for (const id of [
    "local-customer-path",
    "website-release-flow",
    "measurement-search-signal-flow",
    "controlled-automation-mcp-interface",
    "ownership-map",
  ]) {
    const figure = serviceDetails.match(new RegExp(`<figure\\b[^>]*(?:data-service-diagram-id|data-system-visual-id)="${escapeRegExp(id)}"[\\s\\S]*?<\\/figure>`, "i"))?.[0] ?? "";
    assert.ok(figure, `missing complex visual ${id}`);
    assert.match(figure, /\baria-describedby="[^"]+"/i, `${id} lacks an associated full text alternative`);
    assert.match(figure, /systems-visual__text-alternative/i, `${id} lacks visible full text equivalent`);
    assert.match(figure, /<figcaption\b/i, `${id} lacks a visible caption`);
  }

  const webMain = renderedByRoute.get("/services/web-design-redesign/");
  assert.match(webMain, /id="visual-layered-infrastructure"/i);
  assert.equal((webMain.match(/id="visual-layered-infrastructure"/gi) ?? []).length, 1);
  const customMain = renderedByRoute.get("/services/custom-digital-solutions/");
  assert.match(customMain, /id="visual-repair-integrate-build"/i);
  assert.match(customMain, /href="\/tools\/#repair-integrate-build"/i);

  const hubHtml = await (await render("/services/")).text();
  const hubMain = mainContent(hubHtml);
  assert.equal(imageTags(hubMain).length, 0, "Services hub should rely on hierarchy rather than an abstract asset gallery");
  assert.equal((hubMain.match(/\bid="(?:business-websites|ongoing-seo|website-help|custom-systems)"/gi) ?? []).length, 4);
  for (const route of [
    "/services/web-design-redesign/",
    "/services/ongoing-seo/",
    "/services/provider-rescue/",
    "/services/research-audits-strategy/",
    "/services/custom-digital-solutions/",
  ]) assert.match(hubMain, new RegExp(`href="${escapeRegExp(route)}"`, "i"), `hub service link ${route}`);
  assert.match(hubMain, /href="\/pricing\/"/i);
  assert.match(hubMain, /href="\/start\/"/i);
  assert.doesNotMatch(hubMain, /Figure|Observation Record|Concept Interface|Starting Hypothesis/i);

  const tools = await (await render("/tools/")).text();
  assert.equal((tools.match(/class="systems-visual /g) ?? []).length, 2);
  for (const id of [
    "layered-infrastructure",
    "repair-integrate-build",
    "website-release-flow",
    "measurement-search-signal-flow",
    "controlled-automation-mcp-interface",
    "ownership-map",
    "lean-direct-operation",
  ]) {
    assert.equal((tools.match(new RegExp(`id="visual-${escapeRegExp(id)}"`, "gi")) ?? []).length, 1, `Tools visual index ID ${id}`);
  }

  const registrySource = await readFile(new URL("../app/content/serviceAssets.ts", import.meta.url), "utf8");
  assert.match(registrySource, /selectedTools/);
  assert.match(registrySource, /ownedWebsites/);
  assert.doesNotMatch(registrySource, /\/proof\/(?:tools|properties)\//i, "canonical proof paths were duplicated into the service registry");
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
  assert.match(tools, /Get a free website review/i);
  assert.match(tools, /Review Custom Systems/i);
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
  assert.match(resources, /Business Websites/i);
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
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to content/i);
  assert.match(html, /aria-controls="mobile-menu-/i);
  assert.match(html, /aria-expanded="false"/i);
  assert.match(html, /<script[^>]+type="application\/ld\+json"/i);
  assert.match(html, /<link[^>]+rel="icon"[^>]+boho-search-icon-v2\.png/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape|Lorem ipsum/i);

  for (const route of publicRoutes) {
    const routeHtml = await (await render(route)).text();
    assert.match(
      routeHtml,
      /class="site-header__brand-word">\s*Boho\s*<\/span>\s*<span class="site-header__brand-service">\s*Digital Services\s*<\/span>/i,
      `${route} does not use the current two-level brand lockup`,
    );
  }
});
