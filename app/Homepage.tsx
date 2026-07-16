import {
  AlignLeft,
  BarChart3,
  BriefcaseBusiness,
  Compass,
  Crosshair,
  Database,
  FileCheck2,
  Globe2,
  KeyRound,
  MapPin,
  MousePointerClick,
  PanelsTopLeft,
  RefreshCw,
  Route,
  SearchCheck,
  ShieldCheck,
  Target,
  Wrench,
} from "lucide-react";

import {
  ButtonLink,
  CtaBand,
  Footer,
  Header,
  TextLink,
} from "./components/SiteChrome";
import { DefinedText } from "./components/DefinedText";
import { operatingCycle } from "./content/operatingCycle";

const operatingCycleIcons = {
  diagnose: SearchCheck,
  prioritize: Crosshair,
  engineer: Wrench,
  deploy: Route,
  measure: BarChart3,
  improve: RefreshCw,
} as const;

const serviceCards = [
  {
    title: "Local Visibility & Lead Systems",
    body: "Local discovery, website clarity, trust, calls to action, inquiry paths, and measurement engineered as one commercial system.",
    label: "Build the lead system",
    href: "/services/local-seo-search-visibility/",
    tone: "verdigris",
    icon: MapPin,
  },
  {
    title: "Websites & Managed Hosting",
    body: "Useful, distinctive websites built around ownership, performance, search structure, customer action, and a clearly governed hosting provision.",
    label: "Plan the website system",
    href: "/services/website-design-redesign/",
    tone: "gold",
    icon: PanelsTopLeft,
  },
  {
    title: "Provider Rescue & Migration",
    body: "Careful help leaving bad providers, recovering control, preserving useful assets and URLs, and verifying a safer move.",
    label: "Plan the rescue",
    href: "/services/website-migration-provider-rescue/",
    tone: "copper",
    icon: Route,
  },
  {
    title: "Custom Tools & Automation",
    body: "Focused internal tools, integrations, and automations for repeated work that costs too much time or fails too easily by hand.",
    label: "Build the missing tool",
    href: "/services/custom-tools-automation/",
    tone: "blue",
    icon: Wrench,
  },
  {
    title: "Research, Analytics & Improvement",
    body: "Diagnosis, market research, technical inspection, measurement, and an improvement rhythm tied to the next useful decision.",
    label: "Start with evidence",
    href: "/services/research-audits-analytics/",
    tone: "plum",
    icon: SearchCheck,
  },
] as const;

const designPrinciples = [
  {
    number: "01",
    title: "Clarity",
    body: "Make the offer, audience, and next step understandable without making a buyer decode the page.",
    termSlug: "website-clarity",
    icon: AlignLeft,
  },
  {
    number: "02",
    title: "Trust",
    body: "Use proof, ownership, and useful detail instead of decoration pretending to be credibility.",
    termSlug: "trust-signal",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Discovery",
    body: "Build structure and content around the language and decisions people use to find a business.",
    termSlug: "customer-discovery",
    icon: Compass,
  },
  {
    number: "04",
    title: "Action",
    body: "Give a qualified buyer a clear route to call, book, request, buy, or keep learning.",
    termSlug: "customer-action",
    icon: MousePointerClick,
  },
] as const;

const migrationSteps = ["inventory", "preserve", "move", "verify", "document"] as const;
const migrationSystems = ["Domain", "Hosting", "Analytics", "Search", "Content", "Forms", "Redirects"] as const;

const toolCapabilities = [
  {
    title: "Workflow automation",
    body: "Move repeated intake, routing, approval, publishing, and follow-up work through a visible process.",
  },
  {
    title: "Analytics and reporting",
    body: "Turn scattered data into a decision-ready view with clear sources and useful business signals.",
  },
  {
    title: "Validation and monitoring",
    body: "Check important pages, records, feeds, or integrations and make failures easier to find.",
  },
] as const;

export default function Homepage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine text={text} seenTerms={seenTerms} />;

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="home-section hero" aria-labelledby="hero-title">
          <div className="hero__background" aria-hidden="true">
            <img
              src="/og-boho-digital-engineering-20260714.png"
              width="1536"
              height="1024"
              alt=""
              fetchPriority="high"
            />
          </div>
          <div className="section-shell hero__layout">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--on-dark">Boho Digital Services</p>
              <h1 id="hero-title">Local visibility, lead systems, and websites built by people who understand the machinery.</h1>
              <p className="hero__body">{define("Boho is a digital-engineering firm for businesses that need visibility, lead paths, websites, provider rescue, operational tools, and measurable improvement to work together.")}</p>
              <p className="hero__supporting-line">Built by digital engineers. Explained in plain English.</p>
              <div className="button-row hero__actions">
                <ButtonLink href="/contact/">Talk to Someone Technical</ButtonLink>
                <ButtonLink href="/tools/" variant="secondary">Explore Boho Systems</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section editorial-problem" aria-labelledby="problem-title">
          <div className="section-shell editorial-problem__grid">
            <div className="editorial-problem__statement"><h2 id="problem-title">Marketing systems are still systems.</h2></div>
            <div className="editorial-problem__body reading-width">
              <p className="editorial-problem__lead">{define("The website, local presence, lead path, hosting, analytics, accounts, and operational tools affect one another.")}</p>
              <p>Most agencies start with a package. Boho starts with the business. We inspect the machinery underneath it and identify the smallest useful next move.</p>
              <div className="business-first-signals" aria-label="Business-first decision inputs">
                <span><BriefcaseBusiness size={19} aria-hidden="true" /> Offer</span>
                <span><Target size={19} aria-hidden="true" /> Market</span>
                <span><MousePointerClick size={19} aria-hidden="true" /> Action</span>
                <span><BarChart3 size={19} aria-hidden="true" /> Signal</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section method" id="method" aria-labelledby="method-title">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <h2 id="method-title">A six-stage engineering method.</h2>
              <p className="reading-width">Diagnose the system, prioritize the business case, engineer the change, deploy carefully, measure the right signal, and improve what the evidence supports.</p>
            </div>
            <ol className="method-summary-list" aria-label="Diagnose, prioritize, engineer, deploy, measure, improve">
              {operatingCycle.map((stage) => {
                const Icon = operatingCycleIcons[stage.id];
                return (
                  <li key={stage.number}>
                    <a className="method-summary-list__link" href={stage.href}>
                      <div className="method-summary-list__marker" aria-hidden="true">
                        <span className="method-summary-list__icon"><Icon size={24} strokeWidth={1.8} /></span>
                        <span className="method-summary-list__number">{stage.number}</span>
                      </div>
                      <div><h3>{stage.title}</h3><p>{stage.body}</p></div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="home-section services-mosaic" id="services" aria-labelledby="services-title">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <h2 id="services-title">Five service lanes, one accountable system.</h2>
              <p className="reading-width">The lane names make the work understandable without pretending the systems are isolated.</p>
            </div>
            <div className="service-grid">
              {serviceCards.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card service-card--${service.tone} service-card--${index + 1}`} key={service.title}>
                    <h3>{service.title}</h3>
                    <p>{define(service.body)}</p>
                    <TextLink href={service.href}>{service.label}</TextLink>
                    <span className="service-card__pattern" aria-hidden="true"><Icon size={38} strokeWidth={1.65} /></span>
                  </article>
                );
              })}
            </div>
            <div className="section-action">
              <ButtonLink href="/services/">View All Services</ButtonLink>
              <TextLink href="/industries/">Find your business type</TextLink>
            </div>
          </div>
        </section>

        <section className="home-section design-spotlight" id="design" aria-labelledby="design-title">
          <div className="section-shell">
            <div className="design-spotlight__intro">
              <div className="section-heading"><h2 id="design-title">Website design built around clarity, trust, discovery, and action.</h2></div>
              <div className="reading-width">
                <p>A strong website explains the offer, earns trust, supports discovery, and gives the right customer a clear next step.</p>
                <div className="button-row">
                  <ButtonLink href="/contact/">Plan a Better Website</ButtonLink>
                  <TextLink href="/learn/website-buying/">Read the Buyer Guide</TextLink>
                </div>
              </div>
            </div>
            <ol className="design-principles design-principles--full" aria-label="Four website design principles">
              {designPrinciples.map((principle) => {
                const Icon = principle.icon;
                return (
                  <li key={principle.number}>
                    <div className="design-principle__marker" aria-hidden="true">
                      <span className="design-principle__icon"><Icon size={26} strokeWidth={1.7} /></span>
                      <span>{principle.number}</span>
                    </div>
                    <div><h3>{define(`[[${principle.termSlug}|${principle.title}]]`)}</h3><p>{define(principle.body)}</p></div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="home-section migration-rescue" aria-labelledby="migration-title">
          <div className="section-shell migration-rescue__layout">
            <div className="migration-rescue__copy">
              <h2 id="migration-title">Provider rescue without losing what still works.</h2>
              <p>{define("Boho maps the domain, hosting, content, analytics, forms, redirects, and account ownership before changing the system.")}</p>
              <p>The goal is a controlled move, preserved value, verified behavior, and cleaner records.</p>
              <div className="button-row">
                <ButtonLink href="/contact/">Plan the Rescue</ButtonLink>
                <TextLink href="/learn/provider-rescue/" className="text-link--on-dark">Read the Rescue Guide</TextLink>
              </div>
            </div>
            <div className="migration-rescue__visual">
              <div className="migration-ledger" aria-label="Migration ownership dossier">
                <div className="migration-ledger__heading"><KeyRound size={28} strokeWidth={1.6} aria-hidden="true" /><div><span>Transfer file</span><strong>Ownership dossier</strong></div></div>
                <ul>
                  <li><Globe2 size={20} aria-hidden="true" /><span><strong>Domain</strong> registrar and DNS control</span></li>
                  <li><Database size={20} aria-hidden="true" /><span><strong>Content</strong> pages, media, forms, and data</span></li>
                  <li><FileCheck2 size={20} aria-hidden="true" /><span><strong>Continuity</strong> redirects, tracking, and verification</span></li>
                </ul>
              </div>
              <div className="migration-map" aria-label="Provider migration route">
                <ol className="migration-map__route">
                  {migrationSteps.map((step, index) => <li key={step}><span className="migration-map__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="migration-map__step">{step}</span></li>)}
                </ol>
                <div className="migration-map__systems" aria-label="Systems inventoried">{migrationSystems.map((system) => <span key={system}>{system}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section lab-proof" aria-labelledby="tools-title">
          <div className="section-shell lab-proof__layout">
            <div className="lab-proof__copy">
              <p className="eyebrow eyebrow--on-dark">Custom tools and automation</p>
              <h2 id="tools-title">When the right tool does not exist, we build it.</h2>
              <p>{define("Boho builds focused systems for repeated operational work that is too important, too specific, or too fragmented for the tools already in place.")}</p>
              <p className="lab-proof__principle">We use mature platforms for mature problems and custom engineering for the gaps that matter.</p>
              <div className="button-row">
                <ButtonLink href="/tools/">Explore Boho Systems</ButtonLink>
                <TextLink href="/services/custom-tools-automation/">Explore the Service</TextLink>
              </div>
            </div>
            <div className="evidence-board" aria-label="Custom tool capabilities">
              {toolCapabilities.map((capability, index) => (
                <article className={`evidence-card evidence-card--${index + 1}`} key={capability.title}>
                  <div className="evidence-card__meta"><span>Capability {String(index + 1).padStart(2, "0")}</span></div>
                  <h3>{capability.title}</h3>
                  <p>{define(capability.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section territory-cta" aria-labelledby="technical-opinion-title">
          <div className="section-shell territory-cta__inner">
            <span className="territory-cta__mark" aria-hidden="true"><Target size={70} strokeWidth={1.2} /></span>
            <div className="territory-cta__copy">
              <p className="eyebrow eyebrow--on-dark">Provider frustration</p>
              <h2 id="technical-opinion-title">Tired of talking to people who cannot explain the system?</h2>
              <p>Bring the proposal, migration plan, dashboard, hosting setup, automation idea, or provider explanation that does not add up.</p>
            </div>
            <ButtonLink href="/contact/">Get a Technical Second Opinion</ButtonLink>
          </div>
        </section>

        <section className="home-section pricing-philosophy" aria-labelledby="pricing-title">
          <div className="section-shell pricing-philosophy__inner">
            <div className="pricing-philosophy__signals" aria-label="How Boho keeps work practical">
              <span><Wrench size={20} aria-hidden="true" /> Direct technical work</span>
              <span><BriefcaseBusiness size={20} aria-hidden="true" /> More useful work</span>
              <span><BarChart3 size={20} aria-hidden="true" /> Visible priorities</span>
            </div>
            <h2 id="pricing-title">Scope follows diagnosis, not a package menu.</h2>
            <p className="pricing-philosophy__body reading-width">Start with the smallest useful intervention. Expand when the next investment has a defensible business case.</p>
            <ButtonLink href="/contact/">Discuss the Actual Problem</ButtonLink>
          </div>
        </section>

        <section className="home-section final-cta" aria-labelledby="final-cta-title">
          <div className="section-shell">
            <CtaBand
              className="final-cta__band"
              title="Talk to someone who can explain the machinery."
              body={<p>Send the business, website, service area, system, and what feels stuck. You do not need to diagnose the solution before the conversation.</p>}
              primary={{ label: "Talk to Someone Technical", href: "/contact/" }}
              secondary={{ label: "Explore Boho Systems", href: "/tools/" }}
            />
            <span id="final-cta-title" className="sr-only">Talk to someone technical.</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
