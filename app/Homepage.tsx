import {
  AlignLeft,
  BarChart3,
  BriefcaseBusiness,
  Compass,
  Crosshair,
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
import { operatingCycle } from "./content/operatingCycle";

const methodStages = [
  ["Understand the business", "What do you sell, who needs it, and what action matters?"],
  ["Find the failure", "Inspect the website, search visibility, providers, tracking, and handoffs."],
  ["Fix the foundation", "Resolve ownership, hosting, forms, analytics, speed, and technical problems."],
  ["Improve the experience", "Make the pages clearer, more useful, and easier to act on."],
  ["Measure what happens", "Track real inquiries and decisions instead of decorative traffic numbers."],
  ["Keep improving", "Build on evidence instead of selling a new package every month."],
] as const;

const operatingCycleIcons = [
  SearchCheck,
  Crosshair,
  Wrench,
  Route,
  BarChart3,
  RefreshCw,
] as const;

const serviceCards = [
  ["SEO & local visibility", "Improve technical health, search visibility, content, and measurement over time.", "Improve visibility", "/services/ongoing-seo/", "verdigris", MapPin],
  ["Web design & redesign", "Build a clear, fast website that looks credible and makes the next step obvious.", "Plan the website", "/services/web-design-redesign/", "gold", PanelsTopLeft],
  ["Provider rescue & migration", "Recover control of domains, hosting, email, forms, analytics, and broken migrations.", "Plan the rescue", "/services/provider-rescue/", "copper", Route],
  ["Custom tools & automation", "Build internal tools, automations, data workflows, and systems ordinary software does not cover.", "Simplify the work", "/services/custom-digital-solutions/", "blue", Wrench],
  ["Research & technical audits", "Get a technical diagnosis before spending money on the wrong fix.", "Get a clear review", "/services/research-audits-strategy/", "plum", SearchCheck],
] as const;

const designLabels = [
  ["Clear offer", AlignLeft],
  ["Distinctive design", ShieldCheck],
  ["Owned infrastructure", Compass],
  ["Measurable actions", MousePointerClick],
] as const;

const migrationSteps = ["map", "preserve", "transfer", "verify", "records"] as const;
const migrationSystems = ["Domain", "Website", "Hosting", "Analytics", "Forms", "Email connections"] as const;

const toolCapabilities = [
  "Workflow automation",
  "Analytics and reporting",
  "Validation and monitoring",
] as const;

export default function Homepage() {
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
              <p className="eyebrow eyebrow--on-dark">BOHO DIGITAL SERVICES</p>
              <h1 id="hero-title">Websites, search, and digital systems built by engineers.</h1>
              <p className="hero__body">Boho builds and repairs websites, improves search visibility, fixes provider messes, and creates practical tools for work that should not stay manual.</p>
              <p className="hero__supporting-line">No sales layer. The person explaining the work is responsible for doing it.</p>
              <div className="button-row hero__actions">
                <ButtonLink href="/contact/">Start a project</ButtonLink>
                <ButtonLink href="/tools/" variant="secondary">See what we build</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section editorial-problem" aria-labelledby="problem-title">
          <div className="section-shell editorial-problem__grid">
            <div className="editorial-problem__statement">
              <p className="eyebrow">THE WHOLE SYSTEM</p>
              <h2 id="problem-title">A website only works when the rest works with it.</h2>
            </div>
            <div className="editorial-problem__body reading-width">
              <p className="editorial-problem__lead">Search, hosting, analytics, forms, content, and ownership all affect whether a website brings in business. We find the weak parts, fix them, and connect the pieces into something you can understand and control.</p>
              <div className="business-first-signals" aria-label="The larger system includes">
                <span><BriefcaseBusiness size={19} aria-hidden="true" /> Search</span>
                <span><Target size={19} aria-hidden="true" /> Hosting</span>
                <span><MousePointerClick size={19} aria-hidden="true" /> Analytics</span>
                <span><BarChart3 size={19} aria-hidden="true" /> Forms</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section method" id="method" aria-label="Working method">
          <div className="section-shell">
            <ol className="method-summary-list" aria-label="Understand the business, find the failure, fix the foundation, improve the experience, measure what happens, keep improving">
              {methodStages.map(([title, body], index) => {
                const Icon = operatingCycleIcons[index];
                return (
                  <li key={title}>
                    <a className="method-summary-list__link" href={operatingCycle[index].href}>
                      <div className="method-summary-list__marker" aria-hidden="true">
                        <span className="method-summary-list__icon"><Icon size={24} strokeWidth={1.8} /></span>
                        <span className="method-summary-list__number">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div><h3>{title}</h3><p>{body}</p></div>
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
              <div>
                <p className="eyebrow">SERVICES</p>
                <h2 id="services-title">What Boho does.</h2>
              </div>
              <p className="reading-width">Start with the problem. We will match it to the smallest useful project.</p>
            </div>
            <div className="service-grid">
              {serviceCards.map(([title, body, label, href, tone, Icon], index) => (
                <article className={`service-card service-card--${tone} service-card--${index + 1}`} key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <TextLink href={href}>{label}</TextLink>
                  <span className="service-card__pattern" aria-hidden="true"><Icon size={38} strokeWidth={1.65} /></span>
                </article>
              ))}
            </div>
            <div className="section-action">
              <ButtonLink href="/services/">View all services</ButtonLink>
            </div>
          </div>
        </section>

        <section className="home-section design-spotlight" id="design" aria-labelledby="design-title">
          <div className="section-shell">
            <div className="design-spotlight__intro">
              <div className="section-heading">
                <p className="eyebrow">WEB DESIGN</p>
                <h2 id="design-title">Better websites without the agency machinery.</h2>
              </div>
              <div className="reading-width">
                <p>Boho designs and rebuilds websites around what customers need to understand and what the business needs to control. You get direct technical communication, clear ownership, and a site that can keep growing.</p>
                <div className="button-row">
                  <ButtonLink href="/contact/">Explore website design</ButtonLink>
                </div>
              </div>
            </div>
            <ol className="design-principles design-principles--full" aria-label="Website design priorities">
              {designLabels.map(([label, Icon], index) => (
                <li key={label}>
                  <div className="design-principle__marker" aria-hidden="true">
                    <span className="design-principle__icon"><Icon size={26} strokeWidth={1.7} /></span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{label}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="home-section migration-rescue" aria-labelledby="migration-title">
          <div className="section-shell migration-rescue__layout">
            <div className="migration-rescue__copy">
              <p className="eyebrow eyebrow--on-dark">PROVIDER RESCUE</p>
              <h2 id="migration-title">Leave a bad provider without breaking the business.</h2>
              <p>We map what you own, recover access, move the site safely, preserve important URLs and tracking, and document the setup so the next provider cannot hold it hostage.</p>
              <div className="button-row">
                <ButtonLink href="/contact/">See provider rescue</ButtonLink>
              </div>
            </div>
            <div className="migration-rescue__visual">
              <div className="migration-ledger" aria-label="Provider rescue systems">
                <div className="migration-ledger__heading"><KeyRound size={28} strokeWidth={1.6} aria-hidden="true" /></div>
                <ul>
                  {migrationSystems.slice(0, 3).map((system) => <li key={system}><Globe2 size={20} aria-hidden="true" /><span><strong>{system}</strong></span></li>)}
                </ul>
              </div>
              <div className="migration-map" aria-label="Provider rescue steps">
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
              <p className="eyebrow eyebrow--on-dark">TOOLS &amp; AUTOMATION</p>
              <h2 id="tools-title">We build the systems behind the work.</h2>
              <p>Boho builds analytics, publishing, monitoring, security, and automation tools when ordinary software leaves a real gap. The working tools and owned websites are public proof of the technical depth.</p>
              <div className="button-row">
                <ButtonLink href="/tools/">Explore Boho tools</ButtonLink>
                <TextLink href="/about/">About Boho</TextLink>
              </div>
            </div>
            <div className="evidence-board" aria-label="Tools and automation capabilities">
              {toolCapabilities.map((capability, index) => (
                <article className={`evidence-card evidence-card--${index + 1}`} key={capability}>
                  <h3>{capability}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section pricing-philosophy" aria-label="How Boho keeps work practical">
          <div className="section-shell pricing-philosophy__inner">
            <div className="pricing-philosophy__signals" aria-label="How Boho keeps work practical">
              <span><Wrench size={20} aria-hidden="true" /> Diagnose</span>
              <span><BriefcaseBusiness size={20} aria-hidden="true" /> Define</span>
              <span><BarChart3 size={20} aria-hidden="true" /> Expand</span>
            </div>
            <TextLink href="/pricing/">See starting prices</TextLink>
          </div>
        </section>

        <section className="home-section final-cta" aria-labelledby="final-cta-title">
          <div className="section-shell">
            <CtaBand
              className="final-cta__band"
              eyebrow="START A CONVERSATION"
              title="Talk to someone who will understand the work."
              body={(
                <>
                  <p>Tell us what is broken, unclear, slow, expensive, or stuck. We will identify the smallest useful next step and explain it plainly.</p>
                  <p>No sales handoff. No mystery package. No obligation to keep buying.</p>
                </>
              )}
              primary={{ label: "Start a project", href: "/start/" }}
              secondary={{ label: "Contact Boho", href: "/contact/" }}
            />
            <span id="final-cta-title" className="sr-only">Talk to someone who will understand the work.</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
