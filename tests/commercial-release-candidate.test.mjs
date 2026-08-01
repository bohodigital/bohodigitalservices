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

test("publishes the approved primary navigation and canonical service registry", async () => {
  const [navigation, commercial, homepage] = await Promise.all([
    source("app/content/navigation.ts"),
    source("app/content/commercialReset.ts"),
    render("/"),
  ]);
  for (const label of ["Services", "Work", "Pricing", "About", "Contact"]) {
    assert.match(navigation, new RegExp(`label: "${label}"`));
  }
  assert.doesNotMatch(navigation.match(/export const primaryNavigation[\s\S]*?\];/)?.[0] ?? "", /Industries/);
  for (const [name, price] of [
    ["Business Websites", "From $850"],
    ["Ongoing SEO & Local Growth", "From $450/month"],
    ["Website Help", "From $200"],
    ["Custom Systems", "From $1,500"],
  ]) {
    assert.ok(commercial.includes(name));
    assert.ok(commercial.includes(price));
    assert.ok(homepage.includes(name));
    assert.ok(homepage.includes(price));
  }
  assert.equal((homepage.match(/data-canonical-service-card="true"/g) ?? []).length, 4);
  assert.match(homepage, />Get a free website review</);
});

test("renders Work and Website Help as canonical public pages", async () => {
  const [work, help, redirects, sitemap] = await Promise.all([
    render("/work/"), render("/services/website-help/"), source("out/_redirects"), source("out/sitemap.xml"),
  ]);
  assert.match(work, /Real websites and systems, live on the web/);
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
    "Get a clear next step for your website.",
    "Request my free review",
    "Your name",
    "Business or organization",
    "Existing website or public page",
    "What do you need?",
    "Brief description",
  ]) assert.ok(html.includes(value), `missing Start copy: ${value}`);
  assert.equal((html.match(/id="project-inquiry"/g) ?? []).length, 1);
  assert.equal((html.match(/id="visibility-check-request"/g) ?? []).length, 1);
  assert.match(html, /I agree that Boho may use this information to review and respond to my inquiry/);
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
    assert.doesNotMatch(html, obsolete, `${route} has an obsolete service name`);
    assert.doesNotMatch(html, restaurant, `${route} has restaurant-specific sales copy`);
    assert.doesNotMatch(html, stalePrices, `${route} has a stale canonical starting price`);
  }
});

test("tracks the approved conversion events without form-content properties", async () => {
  const analytics = await source("public/analytics-bootstrap.js");
  for (const event of [
    "free_review_click", "free_review_form_start", "free_review_submit_success", "free_review_submit_failure",
    "service_card_click", "pricing_click", "work_project_click", "tools_project_click", "email_link_click", "phone_link_click",
  ]) assert.ok(analytics.includes(event), `missing analytics event ${event}`);
  const propertyBlock = analytics.match(/const commercialEventProperties = \{[\s\S]*?\n  \};/)?.[0] ?? "";
  assert.doesNotMatch(propertyBlock, /email_address|business_name|description|entered_url|provider_name|budget|form_content/i);
});

test("routes emergency and ordinary inquiries to the correct actions", async () => {
  const html = await render("/emergency/");
  assert.match(html, /href="#emergency-request">Describe the emergency/);
  assert.match(html, /href="\/start\/">Get a free website review/);
  assert.doesNotMatch(html, />Send the Situation</);
});
