import { emailBenefitCopy, homepageFaqs, websiteScopeExamples } from "../content/commercialReset";
import { ButtonLink, FaqItem, Footer, Header } from "./SiteChrome";
import type { ReactNode } from "react";

const process = [
  ["Define the business job", "Identify what customers or operators need to do and what problem is preventing it."],
  ["Inspect the system", "Review the website, search presence, content, accounts, data, providers, and technical dependencies relevant to that job."],
  ["Build the smallest complete solution", "Repair, integrate, redesign, or build only what the evidence and scope justify."],
  ["Verify and document", "Test the agreed result, record what changed, explain known limitations, and preserve an understandable handoff."],
] as const;

const businessIncluded = [
  "A defined page and customer-action plan",
  "Responsive visual design",
  "Light copy shaping using accurate client-supplied facts",
  "Contact, call, scheduling, purchase, registration, or inquiry paths named in scope",
  "Basic accessibility and search foundations",
  "Analytics-ready launch",
  "Client-owned deployment and source handoff",
  "Eligible $0 hosting",
] as const;

const seoIncluded = [
  "One named priority for each cycle",
  "Technical and local search work",
  "Service, location, or commercial content improvement",
  "Internal-link and information-architecture work",
  "Customer-path and conversion clarity",
  "Analytics review",
  "A completed-work record",
] as const;

const customIncluded = [
  "One focused workflow",
  "Bounded inputs and outputs",
  "Human approval points",
  "Deployment, testing, and documentation",
] as const;

function PageShell({ children }: { children: ReactNode }) {
  return <><Header /><main className="reset-primary-service" id="main-content" tabIndex={-1}>{children}</main><Footer /></>;
}

function ProcessSection() {
  return <section className="reset-section reset-process" aria-labelledby="service-process-title"><div className="reset-shell"><header className="reset-heading"><h2 id="service-process-title">How the work proceeds</h2></header><ol className="reset-process__grid">{process.map(([title, copy], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>;
}

function FinalCta() {
  return <section className="reset-section reset-final" aria-label="Free website review"><div className="reset-shell"><ButtonLink href="/start/">Get a free website review</ButtonLink></div></section>;
}

function BusinessWebsitesPage() {
  return <PageShell>
    <section className="reset-interior-hero" aria-labelledby="service-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">BUSINESS WEBSITES · FROM $850</p><h1 id="service-title">Business Websites</h1><p>A complete, responsive website for a local business, professional practice, service company, or independent organization. New build, redesign, or responsible replacement is determined by what already exists.</p><ButtonLink href="/start/">Get a free website review</ButtonLink></div><aside className="reset-interior-hero__receipt"><strong className="reset-price">From $850</strong><p>Eligible client-owned website hosting — $0/month</p></aside></div></section>
    <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><h2>Who it is for</h2><p>New websites, redesigns, and straightforward sites for local businesses, professionals, and independent organizations. Eligible projects include $0 hosting in an account the client owns.</p></article><article><h2>What is included</h2><ul>{businessIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <section className="reset-section reset-scopes"><div className="reset-shell"><header className="reset-heading"><h2>What changes scope</h2></header><div className="reset-scope-grid">{websiteScopeExamples.map((scope) => <article key={scope.servicesLabel}><h3>{scope.servicesLabel}</h3><p className="reset-price">{scope.servicesPrice}</p><p>{scope.servicesCopy}</p></article>)}</div><p className="reset-scope-note">The written proposal defines the exact pages, functionality, content responsibilities, integrations, ownership, price, and third-party costs before work begins.</p></div></section>
    <ProcessSection />
    <section className="reset-section"><div className="reset-shell reset-reading-layout"><div><h2>Proof</h2></div><div><p>Boho-owned websites and systems demonstrate work that can be inspected directly; they do not establish client outcomes.</p><div className="reset-actions"><ButtonLink href="/work/">See Boho’s work</ButtonLink><ButtonLink href="/learn/website-buying/" variant="secondary">Website Buying Guide</ButtonLink></div></div></div></section>
    <section className="reset-section reset-faq"><div className="reset-shell reset-faq__grid"><header className="reset-heading"><h2>FAQ</h2></header><div>{homepageFaqs.map((item) => <FaqItem key={item.question} question={item.question}><p>{item.answer}</p></FaqItem>)}</div></div></section>
    <FinalCta />
  </PageShell>;
}

function OngoingSeoPage() {
  const faqs = [
    ["Does Boho guarantee rankings?", "No. Search engines, competitors, demand, platforms, and third parties remain outside Boho’s control."],
    ["Is this dashboard-only reporting?", "No. The service combines measurement with implementation around one named priority per cycle."],
    ["What happens to business email when the retainer ends?", "When the SEO retainer ends, the client may assume the provider cost or migrate to another provider. The domain and business email addresses remain under the client’s control."],
  ] as const;
  return <PageShell>
    <section className="reset-interior-hero" aria-labelledby="service-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">ONGOING SEO &amp; LOCAL GROWTH · FROM $450/MONTH</p><h1 id="service-title">Ongoing SEO &amp; Local Growth</h1><p>Search, local visibility, content, analytics, and implementation.</p><ButtonLink href="/start/">Get a free website review</ButtonLink></div><aside className="reset-interior-hero__receipt"><strong className="reset-price">From $450/month</strong><p>One named priority per cycle.</p></aside></div></section>
    <section className="reset-section" id="local-seo"><div className="reset-shell reset-service-detail__split"><article><h2>Who it is for</h2><p>Businesses with a useful reason to keep improving technical SEO, local visibility, content, internal linking, analytics, and customer paths.</p></article><article id="customer-paths-and-conversion-clarity"><h2>What is included</h2><ul>{seoIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <section className="reset-section"><div className="reset-shell reset-reading-layout"><div><h2>What changes scope</h2></div><div><p>The $450 starting retainer is for one straightforward website and market with a narrow but complete recurring scope. Additional websites, locations, content production, integrations, meetings, or larger implementation capacity increase the price.</p><h3>Free business email with active SEO</h3>{emailBenefitCopy.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
    <ProcessSection />
    <section className="reset-section"><div className="reset-shell"><header className="reset-heading"><h2>Proof</h2><p>Work follows named priorities, completed implementation, and source-labeled measurement rather than dashboard-only reporting.</p></header><ButtonLink href="/work/" variant="secondary">See Boho’s work</ButtonLink></div></section>
    <section className="reset-section reset-faq"><div className="reset-shell reset-faq__grid"><header className="reset-heading"><h2>FAQ</h2></header><div>{faqs.map(([question, answer]) => <FaqItem key={question} question={question}><p>{answer}</p></FaqItem>)}</div></div></section>
    <FinalCta />
  </PageShell>;
}

function CustomSystemsPage() {
  return <PageShell>
    <section className="reset-interior-hero" aria-labelledby="service-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">CUSTOM SYSTEMS · FROM $1,500</p><h1 id="service-title">Custom Systems</h1><p>Focused tools, integrations, publishing systems, and automation.</p><ButtonLink href="/start/">Get a free website review</ButtonLink></div><aside className="reset-interior-hero__receipt"><strong className="reset-price">From $1,500</strong><p>One focused workflow.</p></aside></div></section>
    <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><h2>Who it is for</h2><p>Repeated work that ordinary software does not solve economically.</p></article><article><h2>What is included</h2><ul>{customIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <section className="reset-section"><div className="reset-shell reset-reading-layout"><div><h2>What changes scope</h2></div><div><p>Authentication, payments, sensitive data, many integrations, high availability, large migrations, or ongoing production support require a larger technical scope.</p><p>When responsible scoping requires paid discovery, that work will be defined and priced in writing before it begins. The proposal will state whether the discovery fee is credited toward the related build.</p></div></div></section>
    <ProcessSection />
    <section className="reset-section"><div className="reset-shell"><header className="reset-heading"><h2>Proof</h2><p>Public tools and technical systems demonstrate focused workflows, bounded inputs and outputs, human approval points, deployment, testing, and documentation.</p></header><div className="reset-actions"><ButtonLink href="/work/">See Boho’s work</ButtonLink><ButtonLink href="/tools/" variant="secondary">Explore Boho’s technical systems</ButtonLink></div></div></section>
    <section className="reset-section reset-faq"><div className="reset-shell reset-faq__grid"><header className="reset-heading"><h2>FAQ</h2></header><div><FaqItem question="What can a $1,500 Custom System include?"><p>One focused tool, integration, or automation with a defined workflow, limited users or systems, bounded inputs and outputs, standard deployment, testing, and documentation.</p></FaqItem></div></div></section>
    <FinalCta />
  </PageShell>;
}

function WebsiteHelpSubordinatePage({ kind }: { kind: "provider" | "review" }) {
  const provider = kind === "provider";
  return <PageShell>
    <section className="reset-interior-hero" aria-labelledby="service-title"><div className="reset-shell reset-interior-hero__grid"><div><p className="reset-eyebrow">WEBSITE HELP · FROM $200</p><h1 id="service-title">{provider ? "Provider Rescue and Migration" : "Research, Audits, and Strategy"}</h1><p>{provider ? "Provider Rescue is a form of Website Help for ownership, access, continuity, migration, and provider-exit problems." : "Focused technical review is a form of Website Help when one defined website, search, analytics, provider, migration, or systems question needs to be understood."}</p><ButtonLink href="/start/">Get a free website review</ButtonLink></div><aside className="reset-interior-hero__receipt"><strong className="reset-price">Website Help from $200</strong></aside></div></section>
    <section className="reset-section" id={provider ? undefined : "technical-seo-and-site-health"}><div className="reset-shell reset-reading-layout"><div><h2>{provider ? "Ownership, access, continuity, migration, and provider exit" : "One defined technical question"}</h2></div><div><p>{provider ? "Map ownership, access, dependencies, and a responsible exit or recovery path before changing a working system." : "Determine why one specific website, analytics, search, accessibility, provider, migration, or integration issue is occurring."}</p><p>The starting price applies to one bounded issue or diagnosis. Larger recovery, migration, investigation, or implementation work receives a written quote after review.</p><ButtonLink href="/services/website-help/" variant="secondary">Website Help</ButtonLink></div></div></section>
    <ProcessSection /><FinalCta />
  </PageShell>;
}

export function PrimaryServicePage({ route }: { route: string }) {
  if (route === "/services/web-design-redesign/") return <BusinessWebsitesPage />;
  if (route === "/services/ongoing-seo/") return <OngoingSeoPage />;
  if (route === "/services/custom-digital-solutions/") return <CustomSystemsPage />;
  if (route === "/services/provider-rescue/") return <WebsiteHelpSubordinatePage kind="provider" />;
  return <WebsiteHelpSubordinatePage kind="review" />;
}
