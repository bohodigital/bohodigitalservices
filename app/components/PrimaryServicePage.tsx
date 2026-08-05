import type { ReactNode } from "react";
import { emailBenefitCopy, homepageFaqs, websiteScopeExamples } from "../content/commercialReset";
import type { PrimaryServiceRoute } from "../content/serviceShowcases";
import { AnalyticsPlatformSpotlight, ServiceHeroVisual, ServiceShowcaseGallery } from "./ServiceShowcase";
import { ButtonLink, FaqItem, Footer, Header } from "./SiteChrome";

const process = [
  ["Define the business job", "Identify what customers or operators need to do and what problem is preventing it."],
  ["Inspect the system", "Review the website, search presence, content, accounts, data, providers, and technical dependencies relevant to that job."],
  ["Build the smallest complete solution", "Repair, integrate, redesign, or build only what the evidence and scope justify."],
  ["Verify and document", "Test the agreed result, record what changed, explain known limitations, and preserve an understandable handoff."],
] as const;

const businessIncluded = [
  "A defined page and customer-action plan", "Responsive visual design", "Light copy shaping using accurate client-supplied facts",
  "Contact, call, scheduling, purchase, registration, or inquiry paths named in scope", "Basic accessibility and search foundations",
  "Analytics-ready launch", "Client-owned deployment and source handoff", "Eligible $0 hosting",
] as const;

const seoIncluded = [
  "One named priority for each cycle", "Technical and local search work", "Service, location, or commercial content improvement",
  "Internal-link and information-architecture work", "Customer-path and conversion clarity", "Analytics review", "A completed-work record",
] as const;

const customIncluded = ["One focused workflow", "Bounded inputs and outputs", "Human approval points", "Deployment, testing, and documentation"] as const;

function PageShell({ children }: { children: ReactNode }) {
  return <><Header /><main className="reset-primary-service" id="main-content" tabIndex={-1}>{children}</main><Footer /></>;
}

function ServiceHero({ route, eyebrow, title, copy, price, receipt }: { route: PrimaryServiceRoute; eyebrow: string; title: string; copy: string; price: string; receipt: string }) {
  return <section className="reset-interior-hero service-detail-hero" aria-labelledby="service-title"><div className="reset-shell service-detail-hero__grid">
    <div className="service-detail-hero__copy"><p className="reset-eyebrow">{eyebrow}</p><h1 id="service-title">{title}</h1><p>{copy}</p><ButtonLink href="/start/">Get a free website review</ButtonLink><div className="service-detail-hero__price"><strong>{price}</strong><span>{receipt}</span></div></div>
    <ServiceHeroVisual route={route} />
  </div></section>;
}

function ProcessSection() {
  return <section className="reset-section reset-process" aria-labelledby="service-process-title"><div className="reset-shell"><header className="reset-heading"><p className="reset-eyebrow">A controlled delivery path</p><h2 id="service-process-title">How the work proceeds</h2></header><ol className="reset-process__grid">{process.map(([title, copy], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></div></section>;
}

function Deliverables({ title, items }: { title: string; items: readonly (readonly [string, string])[] }) {
  return <section className="reset-section service-deliverables" aria-labelledby="service-deliverables-title"><div className="reset-shell"><header className="reset-heading"><p className="reset-eyebrow">A usable handoff</p><h2 id="service-deliverables-title">{title}</h2></header><div className="service-deliverables__grid">{items.map(([name, copy], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function FaqSection({ items }: { items: readonly (readonly [string, string])[] }) {
  return <section className="reset-section reset-faq"><div className="reset-shell reset-faq__grid"><header className="reset-heading"><p className="reset-eyebrow">Before the proposal</p><h2>FAQ</h2></header><div>{items.map(([question, answer]) => <FaqItem key={question} question={question}><p>{answer}</p></FaqItem>)}</div></div></section>;
}

function FinalCta() {
  return <section className="reset-section reset-final" aria-label="Free website review"><div className="reset-shell reset-final__grid"><div><h2>Start with the current situation.</h2><p>Send the website, system, or problem. Boho will recommend the smallest credible next step.</p></div><ButtonLink href="/start/">Get a free website review</ButtonLink></div></section>;
}

function BusinessWebsitesPage() {
  const route = "/services/web-design-redesign/" as const;
  return <PageShell>
    <ServiceHero route={route} eyebrow="BUSINESS WEBSITES · FROM $850" title="A complete website—not a loose stack of pages." copy="Responsive business websites designed around what a customer needs to understand, trust, and do next. New build, redesign, or responsible replacement is determined by what already exists." price="From $850" receipt="Eligible client-owned website hosting · $0/month" />
    <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><p className="reset-eyebrow">The fit</p><h2>Who it is for</h2><p>Local businesses, professional practices, service companies, and independent organizations that need a clear public home with durable ownership.</p><p>The result may be a compact brochure site or a deeper multi-page build. The proposal names the pages, customer actions, content responsibilities, integrations, and handoff.</p></article><article><p className="reset-eyebrow">The foundation</p><h2>What is included</h2><ul>{businessIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <ServiceShowcaseGallery route={route} eyebrow="Eight public demos" title="Different businesses need different customer paths." intro="These Boho-built demo sites show how the same core service can adapt to different industries, voices, page depth, and calls to action. They are demos—not client outcome claims." />
    <section className="reset-section reset-scopes"><div className="reset-shell"><header className="reset-heading"><p className="reset-eyebrow">Public planning ranges</p><h2>What changes scope</h2></header><div className="reset-scope-grid">{websiteScopeExamples.map((scope) => <article key={scope.servicesLabel}><h3>{scope.servicesLabel}</h3><p className="reset-price">{scope.servicesPrice}</p><p>{scope.servicesCopy}</p></article>)}</div><p className="reset-scope-note">The written proposal defines the exact pages, functionality, content responsibilities, integrations, ownership, price, and third-party costs before work begins.</p></div></section>
    <ProcessSection />
    <Deliverables title="The launch should still make sense after the handoff." items={[["A complete public site", "The agreed pages, responsive layouts, and customer-action paths are built and verified together."], ["Ownership and access", "Durable accounts, source, domain responsibilities, and recovery paths are made understandable."], ["Launch verification", "Forms, links, major responsive states, basic accessibility, and search foundations are checked."], ["Plain-language handoff", "The client receives an understandable record of what exists, what it costs, and what may need attention later."]]} />
    <FaqSection items={homepageFaqs.map((item) => [item.question, item.answer] as const)} /><FinalCta />
  </PageShell>;
}

function OngoingSeoPage() {
  const route = "/services/ongoing-seo/" as const;
  const faqs = [["Does Boho guarantee rankings?", "No. Search engines, competitors, demand, platforms, and third parties remain outside Boho’s control."], ["Is this dashboard-only reporting?", "No. The service combines measurement with implementation around one named priority per cycle."], ["What happens to business email when the retainer ends?", "The client may assume the provider cost or migrate to another provider. The domain and business email addresses remain under the client’s control."]] as const;
  return <PageShell>
    <ServiceHero route={route} eyebrow="ONGOING SEO & LOCAL GROWTH · FROM $450/MONTH" title="Measure what matters. Then improve the thing." copy="Ongoing technical SEO, local visibility, content, internal linking, analytics, and customer-path work organized around one named priority per cycle." price="From $450/month" receipt="One named priority · Implementation · Completed-work record" />
    <section className="reset-section" id="local-seo"><div className="reset-shell reset-service-detail__split"><article><p className="reset-eyebrow">The fit</p><h2>Who it is for</h2><p>Businesses with a useful reason to keep improving how customers discover, understand, and act on the website.</p><p>This is implementation work supported by measurement—not a monthly PDF that substitutes activity for progress.</p></article><article id="customer-paths-and-conversion-clarity"><p className="reset-eyebrow">The recurring scope</p><h2>What is included</h2><ul>{seoIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <ServiceShowcaseGallery route={route} eyebrow="Owned and inspectable" title="Publishing, structure, and measurement work together." intro="Boho-owned properties and public software provide inspectable examples of information architecture, editorial systems, search-focused pages, and source-labeled measurement. They do not establish client outcomes." />
    <AnalyticsPlatformSpotlight />
    <section className="reset-section"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">Boundaries</p><h2>What changes scope</h2></div><div><p>The $450 starting retainer is for one straightforward website and market with a narrow but complete recurring scope. Additional websites, locations, content production, integrations, meetings, or larger implementation capacity increase the price.</p><h3>Free business email with active SEO</h3>{emailBenefitCopy.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
    <ProcessSection /><Deliverables title="Each cycle ends with work you can inspect." items={[["Named priority", "The cycle begins with one stated business or customer-path priority."], ["Implemented work", "The agreed technical, content, local, or structural changes are completed—not merely recommended."], ["Source-labeled evidence", "Measurements retain their sources, windows, and limitations so unlike numbers are not blended into a convenient story."], ["Completed-work record", "The client can see what changed, what remains uncertain, and what deserves attention next."]]} />
    <FaqSection items={faqs} /><FinalCta />
  </PageShell>;
}

function CustomSystemsPage() {
  const route = "/services/custom-digital-solutions/" as const;
  return <PageShell>
    <ServiceHero route={route} eyebrow="CUSTOM SYSTEMS · FROM $1,500" title="Make the repeated work smaller." copy="Focused internal tools, integrations, publishing systems, reporting workflows, and automation built around one real operating job." price="From $1,500" receipt="One focused workflow · Human approval points · Documented handoff" />
    <section className="reset-section"><div className="reset-shell reset-service-detail__split"><article><p className="reset-eyebrow">The fit</p><h2>Who it is for</h2><p>Teams repeating expensive manual work that ordinary software does not solve economically—or moving information between systems that were never designed to cooperate.</p><p>The useful first version is intentionally bounded. It should solve one complete job before becoming a platform.</p></article><article><p className="reset-eyebrow">The foundation</p><h2>What is included</h2><ul>{customIncluded.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <ServiceShowcaseGallery route={route} eyebrow="Public technical evidence" title="Focused systems should make their job obvious." intro="These public Boho tools and advanced website demos show bounded workflows, source-labeled data, human approval points, monitoring, and interactive concepts. Screenshots use demo or illustrative data." />
    <section className="reset-section service-decision"><div className="reset-shell"><header className="reset-heading"><p className="reset-eyebrow">Choose the smallest credible intervention</p><h2>Repair, integrate, or build.</h2></header><div className="service-deliverables__grid"><article><span>01</span><h3>Repair</h3><p>Keep the useful system and fix the bounded failure when replacement would add cost without solving a new problem.</p></article><article><span>02</span><h3>Integrate</h3><p>Connect existing systems when each already performs its own job well enough.</p></article><article><span>03</span><h3>Build</h3><p>Create a focused tool when the workflow is valuable, repeated, and not economically served by ordinary software.</p></article></div></div></section>
    <section className="reset-section"><div className="reset-shell reset-reading-layout"><div><p className="reset-eyebrow">Boundaries</p><h2>What changes scope</h2></div><div><p>Authentication, payments, sensitive data, many integrations, high availability, large migrations, or ongoing production support require a larger technical scope.</p><p>When responsible scoping requires paid discovery, that work will be defined and priced in writing before it begins. The proposal will state whether the discovery fee is credited toward the related build.</p></div></div></section>
    <ProcessSection /><Deliverables title="A custom system needs more than working code." items={[["Workflow specification", "Inputs, outputs, users, systems, approvals, and failure states are made explicit."], ["Working deployment", "The defined workflow is built, tested, and deployed in the agreed environment."], ["Operational visibility", "Important failures and states are made inspectable in proportion to the system’s risk."], ["Documentation and handoff", "Ownership, dependencies, routine operation, and recovery expectations are documented."]]} />
    <FaqSection items={[["What can a $1,500 Custom System include?", "One focused tool, integration, or automation with a defined workflow, limited users or systems, bounded inputs and outputs, standard deployment, testing, and documentation."], ["Does every custom project require paid discovery?", "No. Paid discovery is used only when the system cannot be scoped responsibly from the available information. Any discovery fee and possible build credit are stated in writing first."], ["Can Boho work with existing software?", "Yes. Repairing or integrating a useful existing system may be more responsible than replacing it."]]} /><FinalCta />
  </PageShell>;
}

function WebsiteHelpSubordinatePage({ kind }: { kind: "provider" | "review" }) {
  const provider = kind === "provider";
  const route: PrimaryServiceRoute = provider ? "/services/provider-rescue/" : "/services/research-audits-strategy/";
  const providerDeliverables = [["Ownership and access inventory", "Identify who controls the domain, hosting, source, accounts, analytics, forms, content, profiles, and recovery paths."], ["Dependency map", "Document the systems and third parties that must keep working during a repair, recovery, or move."], ["Exit or recovery plan", "Sequence the smallest responsible changes, including backups, redirects, verification, and rollback where applicable."], ["Verification record", "Record what was recovered or moved, what was tested, and which limitations or follow-up risks remain."]] as const;
  const reviewDeliverables = [["Executive summary", "State the defined question, the short answer supported by the review, and the decision it affects."], ["Evidence and source notes", "Identify what was reviewed, which sources were available, and when collection or inspection succeeded."], ["Priority action set", "Limit the main recommendations to the few actions justified by the evidence."], ["Limitations and restraint", "Disclose missing access, weak evidence, uncertainty, and what should not be purchased or changed yet."]] as const;
  const faqs = provider ? [["Can Boho move a website when the current provider is uncooperative?", "Sometimes, but the available domain access, source, content, backups, credentials, and third-party accounts determine the responsible options. The first step is an ownership and access inventory."], ["Will the existing website go offline during a move?", "The migration plan is designed to reduce avoidable interruption, but risk depends on the current system and access. Verification and rollback expectations are defined before material changes."], ["Does the $200 starting price include a full migration?", "Not necessarily. It can cover one bounded ownership, access, or diagnosis issue. Larger recovery or migration work receives a written quote after review."]] as const : [["What makes a question bounded?", "The system, review period, available sources, decision, and expected output can be named before the work begins."], ["Will an audit guarantee a result?", "No. A responsible audit identifies evidence, limitations, priorities, and verification steps. It cannot control search engines, customers, competitors, providers, or other third parties."], ["Does the $200 starting price include implementation?", "It applies to one bounded issue or diagnosis. If the review supports additional repair, migration, or implementation, that work is scoped separately in writing."]] as const;
  return <PageShell>
    <ServiceHero route={route} eyebrow="WEBSITE HELP · FROM $200" title={provider ? "Recover control before making the move." : "Answer one expensive question before buying the solution."} copy={provider ? "Provider Rescue is focused Website Help for ownership, access, continuity, migration, and provider-exit problems." : "Focused technical review for one defined website, search, analytics, accessibility, provider, migration, or systems question."} price="Website Help from $200" receipt={provider ? "One bounded issue · Ownership first · Written next step" : "One defined question · Source notes · Priority actions"} />
    <section className="reset-section" id={provider ? undefined : "technical-seo-and-site-health"}><div className="reset-shell reset-service-detail__split"><article><p className="reset-eyebrow">The fit</p><h2>{provider ? "When ownership or continuity is unclear" : "When the right next step is unclear"}</h2><p>{provider ? "Use Provider Rescue when access is fragmented, a provider relationship is ending, a domain or website must be recovered, or a move could break a working customer path." : "Use a focused review when a proposal, persistent failure, measurement conflict, migration, accessibility concern, or technical claim needs an evidence-backed second opinion."}</p><p>The starting price applies to one bounded issue or diagnosis. Larger recovery, migration, investigation, or implementation work receives a written quote after review.</p></article><article><p className="reset-eyebrow">The initial review</p><h2>What may be included</h2><ul>{(provider ? ["Domain, DNS, hosting, source, and account ownership", "Current access and recovery paths", "Forms, analytics, email, redirects, and third-party dependencies", "Backup, migration, verification, and rollback needs", "A sequenced provider-exit or recovery plan"] : ["One named business or technical question", "Available website, analytics, search, provider, or system evidence", "Source dates, collection status, and quality limits", "Observed facts separated from inference", "Three to five priority actions and what not to change yet"]).map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    {!provider && <AnalyticsPlatformSpotlight />}
    <ServiceShowcaseGallery route={route} eyebrow={provider ? "Continuity evidence" : "Research evidence"} title={provider ? "Understand the system before touching the system." : "Make the evidence and its limits inspectable."} intro={provider ? "Architecture, migration practice, and public technical tools illustrate how Boho approaches ownership, access, monitoring, and controlled change. Tool screenshots use demo or example data." : "The current Boho Analytics Platform, its plot builder, research practice, and analysis work show how sources and decisions can remain connected. Screenshots use sanitized illustrative data."} />
    <ProcessSection /><Deliverables title={provider ? "A rescue should leave the next operator less dependent." : "A review should make the decision easier."} items={provider ? providerDeliverables : reviewDeliverables} />
    <FaqSection items={faqs} /><FinalCta />
  </PageShell>;
}

export function PrimaryServicePage({ route }: { route: string }) {
  if (route === "/services/web-design-redesign/") return <BusinessWebsitesPage />;
  if (route === "/services/ongoing-seo/") return <OngoingSeoPage />;
  if (route === "/services/custom-digital-solutions/") return <CustomSystemsPage />;
  if (route === "/services/provider-rescue/") return <WebsiteHelpSubordinatePage kind="provider" />;
  return <WebsiteHelpSubordinatePage kind="review" />;
}
