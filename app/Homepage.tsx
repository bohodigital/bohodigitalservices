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
  ["Understand", "Learn how the business works, what customers need, and what is getting in the way."],
  ["Prioritize", "Choose the work with the clearest practical value."],
  ["Build", "Design, repair, migrate, write, configure, or automate the agreed solution."],
  ["Launch", "Move the work into the real environment with ownership and rollback in place."],
  ["Measure", "Check the signals connected to the intended result."],
  ["Improve", "Keep what works and change what does not."],
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
  ["SEO & local visibility", "Help the right customers find the business and take a useful next step.", "Improve visibility", "/services/ongoing-seo/", "verdigris", MapPin],
  ["Web design & redesign", "Build or repair a clear, distinctive website that the business owns.", "Plan the website", "/services/web-design-redesign/", "gold", PanelsTopLeft],
  ["Provider rescue & migration", "Recover control, move carefully, and keep domains, forms, tracking, and important URLs working.", "Plan the rescue", "/services/provider-rescue/", "copper", Route],
  ["Custom tools & automation", "Build focused software or connect existing tools when repeated work is slow or fragile.", "Simplify the work", "/services/custom-digital-solutions/", "blue", Wrench],
  ["Research & technical audits", "Find out what is wrong, what matters, and what should happen first.", "Get a clear review", "/services/research-audits-strategy/", "plum", SearchCheck],
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
              <p className="eyebrow eyebrow--on-dark">Boho Digital Services</p>
              <h1 id="hero-title">Websites, search, and digital systems built by engineers.</h1>
              <p className="hero__body">Boho helps businesses build better websites, get found, fix broken provider setups, and automate work that should not stay manual.</p>
              <p className="hero__supporting-line">No sales layer. You work directly with the person doing the technical work.</p>
              <div className="button-row hero__actions">
                <ButtonLink href="/contact/">Talk to someone technical</ButtonLink>
                <ButtonLink href="/tools/" variant="secondary">See what we build</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section editorial-problem" aria-labelledby="problem-title">
          <div className="section-shell editorial-problem__grid">
            <div className="editorial-problem__statement"><h2 id="problem-title">A website is part of a larger system.</h2></div>
            <div className="editorial-problem__body reading-width">
              <p className="editorial-problem__lead">Search, hosting, analytics, forms, content, and account ownership all affect whether customers can find you and take the next step. We look at the whole system, then fix the part that matters most.</p>
              <div className="business-first-signals" aria-label="The larger system includes">
                <span><BriefcaseBusiness size={19} aria-hidden="true" /> Search</span>
                <span><Target size={19} aria-hidden="true" /> Hosting</span>
                <span><MousePointerClick size={19} aria-hidden="true" /> Analytics</span>
                <span><BarChart3 size={19} aria-hidden="true" /> Forms</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section method" id="method" aria-labelledby="method-title">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <h2 id="method-title">A straightforward way to work.</h2>
              <p className="reading-width">Understand the problem. Choose the smallest useful fix. Build it carefully. Check that it works. Improve it when the evidence supports more work.</p>
            </div>
            <ol className="method-summary-list" aria-label="Understand, prioritize, build, launch, measure, improve">
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
              <h2 id="services-title">What Boho does.</h2>
              <p className="reading-width">Five practical ways we help.</p>
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
              <div className="section-heading"><h2 id="design-title">Better websites without the agency machinery.</h2></div>
              <div className="reading-width">
                <p>We design for people first: clear offers, visible proof, fast pages, useful content, and an obvious next step. Behind the page, we handle the technical structure, accessibility, analytics, hosting, and search fundamentals.</p>
                <div className="button-row">
                  <ButtonLink href="/contact/">Plan a better website</ButtonLink>
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
              <h2 id="migration-title">Leave a bad provider without breaking the business.</h2>
              <p>We map who controls the domain, website, hosting, analytics, forms, and email connections before anything moves. Then we preserve what works, transfer what is authorized, verify the launch, and leave readable records.</p>
              <div className="button-row">
                <ButtonLink href="/contact/">Plan a provider rescue</ButtonLink>
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
              <p className="eyebrow eyebrow--on-dark">Tools and automation</p>
              <h2 id="tools-title">We build the systems behind the work.</h2>
              <p>Boho builds and operates tools for analytics, monitoring, publishing, automation, secure configuration, and website management. Some are public. Others support client work behind the scenes.</p>
              <p className="lab-proof__principle">The point is not custom software for its own sake. It is having the technical depth to repair, connect, or build what the business actually needs.</p>
              <div className="button-row">
                <ButtonLink href="/tools/">Explore Boho tools</ButtonLink>
                <TextLink href="/services/custom-digital-solutions/">Explore custom solutions</TextLink>
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

        <section className="home-section territory-cta" aria-labelledby="technical-opinion-title">
          <div className="section-shell territory-cta__inner">
            <span className="territory-cta__mark" aria-hidden="true"><Target size={70} strokeWidth={1.2} /></span>
            <div className="territory-cta__copy">
              <p className="eyebrow eyebrow--on-dark">Technical second opinion</p>
              <h2 id="technical-opinion-title">Tired of talking to people who cannot explain the system?</h2>
              <p>Bring the proposal, hosting setup, dashboard, migration plan, or automation idea. We will tell you what it does, what it does not do, and whether it is worth paying for.</p>
            </div>
            <ButtonLink href="/contact/">Get a technical second opinion</ButtonLink>
          </div>
        </section>

        <section className="home-section pricing-philosophy" aria-labelledby="pricing-title">
          <div className="section-shell pricing-philosophy__inner">
            <div className="pricing-philosophy__signals" aria-label="How Boho keeps work practical">
              <span><Wrench size={20} aria-hidden="true" /> Diagnose</span>
              <span><BriefcaseBusiness size={20} aria-hidden="true" /> Define</span>
              <span><BarChart3 size={20} aria-hidden="true" /> Expand</span>
            </div>
            <h2 id="pricing-title">Start with the smallest useful project.</h2>
            <p className="pricing-philosophy__body reading-width">We do not force every business into a package. We diagnose the problem, define a clear first scope, and expand only when the next step has a business case.</p>
            <ButtonLink href="/contact/">Discuss the actual problem</ButtonLink>
          </div>
        </section>

        <section className="home-section final-cta" aria-labelledby="final-cta-title">
          <div className="section-shell">
            <CtaBand
              className="final-cta__band"
              title="Talk to someone who will understand the work."
              body={<p>Send the website, business, and what feels stuck. You do not need to diagnose the solution first.</p>}
              primary={{ label: "Talk to someone technical", href: "/contact/" }}
              secondary={{ label: "See what we build", href: "/tools/" }}
            />
            <span id="final-cta-title" className="sr-only">Talk to someone who will understand the work.</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
