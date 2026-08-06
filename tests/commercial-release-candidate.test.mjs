import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

async function render(pathname) {
  const relative = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}index.html`;
  return source(`out/${relative}`);
}

function textContent(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

test("publishes the provider-first primary navigation and focused homepage offer ladder", async () => {
  const [navigation, commercial, homepage] = await Promise.all([
    source("app/content/navigation.ts"),
    source("app/content/commercialReset.ts"),
    render("/"),
  ]);
  const renderedHomepage = homepage.replace(/<script[\s\S]*?<\/script>/gi, "");
  for (const label of ["Provider Rescue", "Services", "Pricing", "Demo Library", "Practical guides"]) {
    assert.match(navigation, new RegExp(`label: "${label}"`));
  }
  assert.doesNotMatch(navigation.match(/export const primaryNavigation[\s\S]*?\];/)?.[0] ?? "", /Industries/);
  assert.match(navigation, /label: "All Services"/);
  for (const [name, price] of [
    ["Business Websites", "From $850"],
    ["Ongoing SEO & Local Growth", "From $450/month"],
    ["Website Help", "From $200"],
    ["Custom Systems", "From $1,500"],
  ]) {
    assert.ok(commercial.includes(name));
    assert.ok(commercial.includes(price));
  }
  for (const value of [
    "Provider Rescue",
    "Website Help from $200",
    "Business Websites",
    "From $850",
    "Ongoing SEO &amp; Local Growth",
    "From $450/month",
    "Demo Library",
    "Practical guides",
  ]) assert.ok(homepage.includes(value), `homepage is missing ${value}`);
  assert.equal((homepage.match(/data-canonical-service-card="true"/g) ?? []).length, 0);
  assert.equal((renderedHomepage.match(/landscaping\.demos\.bohodigitalservices\.com/g) ?? []).length, 1);
  assert.equal((renderedHomepage.match(/dentistry\.demos\.bohodigitalservices\.com/g) ?? []).length, 1);
  assert.equal((renderedHomepage.match(/junkremoval\.demos\.bohodigitalservices\.com/g) ?? []).length, 1);
  assert.match(homepage, />Get a free website review</);
});

test("renders Work and Website Help as canonical public pages", async () => {
  const [work, help, redirects, sitemap] = await Promise.all([
    render("/work/"), render("/services/website-help/"), source("out/_redirects"), source("out/sitemap.xml"),
  ]);
  assert.match(work, /Real websites, demo builds, and systems—live on the web/);
  assert.match(work, /THE BOHO DEMO LIBRARY/);
  assert.match(work, /\$850 brochure sites/);
  assert.match(work, /Expanded sites/);
  assert.match(work, /High-end sites/);
  assert.equal((work.match(/data-demo-card="true"/g) ?? []).length, 8);
  assert.match(work, /rel="canonical" href="https:\/\/bohodigitalservices\.com\/work\/"/);
  assert.match(work, /BOHO-OWNED PROPERTY/);
  assert.match(help, /Fix the useful problem without automatically rebuilding everything/);
  assert.match(help, /WEBSITE HELP · FROM \$200/i);
  assert.doesNotMatch(redirects, /^\/work\s/m);
  assert.match(sitemap, /<loc>https:\/\/bohodigitalservices\.com\/work\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/bohodigitalservices\.com\/services\/website-help\/<\/loc>/);
});

test("aligns the free-review intake promise and preserves its compatibility anchors", async () => {
  const html = await render("/start/");
  for (const value of [
    "Find out what your website actually needs.",
    "Request my free review",
    "A useful answer, not a mystery score.",
    "Enough clarity to choose the next move.",
    "Your name",
    "Business or organization",
    "Existing website or public page",
    "What do you need?",
    "Brief description",
  ]) assert.ok(html.includes(value), `missing Start copy: ${value}`);
  assert.equal((html.match(/id="project-inquiry"/g) ?? []).length, 1);
  assert.equal((html.match(/id="visibility-check-request"/g) ?? []).length, 1);
  assert.equal((html.match(/name="service"/g) ?? []).length, 5);
  assert.match(html, /type="radio"/);
  assert.match(html, /Add optional project details|Add optional details/);
  assert.match(html, /I agree that Boho may use this information to review and respond to my inquiry/);
  assert.match(html, /data-analytics-event="start_hero_cta_click"/);
  assert.match(html, /data-analytics-event="start_emergency_detour_click"/);
  assert.match(html, /data-analytics-event="start_work_link_click"/);
  assert.doesNotMatch(textContent(html), /Rank Builder SEO/);
  assert.doesNotMatch(html, /class="[^"]*\bundefined\b/);
});

test("publishes corrected client-owned hosting guidance", async () => {
  const [guide, guideSource] = await Promise.all([render("/learn/website-buying/"), source("app/content/audiencePages.ts")]);
  const visible = textContent(guide);
  assert.match(guide, /Business Website Buying Guide \| Ownership, Hosting &amp; Scope \| Boho/);
  assert.match(guideSource, /Eligible websites may use Cloudflare’s Free plan in an account controlled by the client/);
  assert.match(guideSource, /Leaving Boho does not by itself create a hosting charge or require the website to move/);
  assert.doesNotMatch(visible, /active retainer.{0,100}hosting|hosting.{0,100}active retainer/i);
});

test("keeps core commercial output free of obsolete names and restaurant positioning", async () => {
  const routes = ["/", "/services/", "/pricing/", "/services/web-design-redesign/", "/services/ongoing-seo/", "/services/website-help/", "/services/custom-digital-solutions/"];
  const obsolete = /Web Design &amp; Website Redesign|Custom Web &amp; Digital Solutions|Websites &amp; Managed Hosting|Research, Analytics &amp; Improvement|Custom Tools &amp; Automation/;
  const restaurant = /restaurant-specific|catering|loyalty program|point-of-sale|\bPOS\b/i;
  const stalePrices = /Starting at \$(?:95|350|500|750|1,000|2,500)(?![0-9])/;
  for (const route of routes) {
    const html = await render(route);
    const visible = textContent(html);
    assert.doesNotMatch(visible, obsolete, `${route} has an obsolete service name`);
    assert.doesNotMatch(visible, restaurant, `${route} has restaurant-specific sales copy`);
    assert.doesNotMatch(visible, stalePrices, `${route} has a stale canonical starting price`);
  }
});

test("tracks the approved conversion events without form-content properties", async () => {
  const analytics = await source("public/analytics-bootstrap.js");
  for (const event of [
    "free_review_click", "free_review_form_start", "free_review_submit_success", "free_review_submit_failure",
    "emergency_form_start", "emergency_submit_success", "emergency_submit_failure",
    "start_hero_cta_click", "start_emergency_detour_click", "start_service_category_select",
    "start_optional_details_open", "free_review_submit_attempt", "definition_popover_open",
    "emergency_hero_cta_click", "emergency_standard_detour_click", "emergency_incident_type_select", "emergency_submit_attempt",
    "commercial_standard_inquiry_success", "pricing_lead_complete",
    "service_card_click", "service_nav_open", "service_nav_click", "pricing_click", "work_project_click", "tools_project_click", "email_link_click", "phone_link_click",
  ]) assert.ok(analytics.includes(event), `missing analytics event ${event}`);
  const propertyBlock = analytics.match(/const commercialEventProperties = \{[\s\S]*?\n  \};/)?.[0] ?? "";
  assert.doesNotMatch(propertyBlock, /email_address|business_name|description|entered_url|provider_name|budget|form_content/i);
});

test("routes emergency and ordinary inquiries to the correct actions", async () => {
  const html = await render("/emergency/");
  assert.match(html, /href="#emergency-request">Describe the emergency/);
  assert.match(html, /href="\/start\/">This can wait/);
  assert.match(html, /Before changing anything else/);
  assert.match(html, /Use Emergency Help when the problem is active and consequential/);
  assert.match(html, /Urgent work is scoped before paid work begins/);
  assert.match(html, /Contact and affected system/);
  assert.match(html, /Incident facts/);
  assert.match(html, /Impact and description/);
  assert.match(html, /data-analytics-event="emergency_hero_cta_click"/);
  assert.match(html, /data-analytics-event="emergency_standard_detour_click"/);
  assert.doesNotMatch(html, /class="[^"]*\bundefined\b/);
  assert.doesNotMatch(html, />Send the Situation</);
});

test("publishes exact Start and Emergency metadata", async () => {
  const [start, emergency] = await Promise.all([render("/start/"), render("/emergency/")]);
  assert.match(start, /<title>Free Website Review \| Boho Digital Services<\/title>/);
  assert.match(start, /Send your current website or project details for a free public review and a clear recommendation from Boho Digital Services/);
  assert.match(emergency, /<title>Emergency Website Help \| Outages, Launches, Access and Redirect Problems<\/title>/);
  assert.match(emergency, /Request urgent help for broken forms, failed launches, provider lockout, redirects, domain problems, tracking failures, migrations, and other active website incidents/);
});

test("publishes only the owner-approved public legal identity", async () => {
  for (const route of ["/", "/privacy/", "/terms/"]) {
    const html = await render(route);
    assert.match(html, /Boho Digital Services LLC/);
    assert.doesNotMatch(html, /Republic of Bohemia/);
  }
});

test("preserves inquiry delivery mappings and explicit success and failure states", async () => {
  const [client, form, start, emergency] = await Promise.all([
    source("app/components/commercial/CommercialInquiryFormClient.tsx"),
    source("app/components/commercial/CommercialInquiryForm.tsx"),
    render("/start/"),
    render("/emergency/"),
  ]);
  assert.match(client, /boho-forms-intake\.local1agent0\.workers\.dev\/v1\/submissions/);
  assert.match(client, /form_id: isStart \? "contact" : "emergency"/);
  assert.match(client, /turnstile_action: isStart \? "boho_contact" : "boho_emergency"/);
  assert.match(client, /\[200, 201, 202\]\.includes\(response\.status\) && payload\.ok === true/);
  assert.match(client, /status === 429/);
  assert.match(client, /failure_stage: "validation"/);
  assert.match(client, /failure_stage: "spam_protection"/);
  assert.match(client, /failure_stage: "delivery"/);
  assert.match(client, /failure_stage: "network"/);
  assert.match(client, /kind: "success"/);
  for (const mapping of [
    'backendName: "name"', 'backendName: "email"', 'backendName: "businessName"',
    'backendName: "website"', 'backendName: "service"', 'backendName: "message"',
    'backendName: "problem"', 'backendName: "began"', 'backendName: "priorChange"',
    'backendName: "impact"',
  ]) assert.ok(form.includes(mapping), `missing backend mapping: ${mapping}`);
  assert.doesNotMatch(`${start}${emergency}`, /type="(?:file|tel)"/);
});
