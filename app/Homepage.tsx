import {
  ButtonLink,
  CtaBand,
  EvidenceBadge,
  Footer,
  Header,
  TextLink,
} from "./components/SiteChrome";
import { DefinedText } from "./components/DefinedText";
import { operatingCycle } from "./content/operatingCycle";
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
  LineChart,
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
    category: "Priority lane",
    title: "Local Visibility & Lead Systems",
    body: "Local discovery, website clarity, trust, calls to action, inquiry paths, and measurement engineered as one commercial system.",
    label: "Build the lead system",
    href: "/services/local-seo-search-visibility/",
    tone: "verdigris",
    icon: MapPin,
  },
  {
    category: "Web platform",
    title: "Websites & Managed Hosting",
    body: "Useful, distinctive websites built around ownership, performance, search structure, customer action, and a clearly governed hosting provision.",
    label: "Plan the website system",
    href: "/services/website-design-redesign/",
    tone: "gold",
    icon: PanelsTopLeft,
  },
  {
    category: "Ownership",
    title: "Provider Rescue & Migration",
    body: "Careful help leaving bad providers, recovering control, preserving useful assets and URLs, and verifying a safer move.",
    label: "Plan the rescue",
    href: "/services/website-migration-provider-rescue/",
    tone: "copper",
    icon: Route,
  },
  {
    category: "Operations",
    title: "Custom Tools & Automation",
    body: "Focused internal tools, integrations, and automations for repeated work that costs too much time or fails too easily by hand.",
    label: "Explore practical automation",
    href: "/services/custom-tools-automation/",
    tone: "blue",
    icon: Wrench,
  },
  {
    category: "Evidence",
    title: "Research, Analytics & Improvement",
    body: "Diagnosis, market research, technical inspection, measurement, and an improvement rhythm tied to the next useful decision.",
    label: "Start with evidence",
    href: "/services/research-audits-analytics/",
    tone: "plum",
    icon: SearchCheck,
  },
] as const;

const migrationSteps = [
  "Current mess",
  "inventory",
  "preserve",
  "move",
  "verify",
  "document",
] as const;

const migrationSystems = [
  "Domain",
  "Hosting",
  "Analytics",
  "Search",
  "Content",
  "Forms",
  "Redirects",
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
    body: "Use proof, ownership, useful detail, and honest boundaries instead of decoration pretending to be credibility.",
    termSlug: "trust-signal",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Discovery",
    body: "Build structure and content around the language and decisions people actually use to find a business.",
    termSlug: "customer-discovery",
    icon: Compass,
  },
  {
    number: "04",
    title: "Action",
    body: "Give a qualified buyer a clear, low-friction route to call, book, request, buy, or keep learning.",
    termSlug: "customer-action",
    icon: MousePointerClick,
  },
] as const;

const buyerPanels = [
  {
    title: "Home Improvement & Contractors",
    body: "For project-based businesses where one strong lead can be worth thousands. Focus areas often include estimate requests, high-value service pages, local visibility, project proof, reviews, and service-area clarity.",
    href: "/industries/home-improvement-contractors/",
    label: "Explore home improvement and contractors",
    image: "/visuals/homepage-industry-contractors-v2.webp",
    imageAlt: "An electrician installing wiring during a residential renovation.",
    imageWidth: 1067,
    imageHeight: 1600,
    position: "center 56%",
  },
  {
    title: "Local Service Businesses",
    body: "For appointment-based, service-area, and trust-heavy businesses that need calls, bookings, visits, or qualified inquiries.",
    href: "/industries/local-service-businesses/",
    label: "Explore local service businesses",
    image: "/visuals/homepage-industry-local-service-v2.webp",
    imageAlt: "A professional pet groomer carefully trimming a small dog.",
    imageWidth: 1067,
    imageHeight: 1600,
    position: "center 54%",
  },
  {
    title: "Brick-and-Mortar Retail & Hospitality",
    body: "For businesses that depend on local discovery, reputation, directions, reservations, events, and in-person attention.",
    href: "/industries/brick-and-mortar-retail-hospitality/",
    label: "Explore retail and hospitality",
    image: "/visuals/homepage-industry-retail-v2.webp",
    imageAlt: "Customers ordering inside a warm, carefully designed neighborhood cafe.",
    imageWidth: 1067,
    imageHeight: 1600,
    position: "center 58%",
  },
  {
    title: "Online Retail & Ecommerce",
    body: "For stores that need stronger product discovery, category structure, technical SEO, trust, and the path from browsing to purchase.",
    href: "/industries/online-retail-ecommerce/",
    label: "Explore online retail and ecommerce",
    image: "/visuals/homepage-industry-ecommerce-v2.webp",
    imageAlt: "A small online retailer packing an order beside a laptop and inventory sheet.",
    imageWidth: 1600,
    imageHeight: 1068,
    position: "center 52%",
  },
  {
    title: "Professional & B2B Services",
    body: "For firms that need clear positioning, credibility, useful education, and qualified conversations before a buyer commits.",
    href: "/industries/professional-b2b-services/",
    label: "Explore professional and B2B services",
    image: "/visuals/homepage-industry-b2b-v2.webp",
    imageAlt: "A professional team reviewing research, documents, and digital work together.",
    imageWidth: 1600,
    imageHeight: 1068,
    position: "center 46%",
  },
] as const;

const capabilityPanels = [
  {
    title: "Public capability proof",
    body: "A capability is not promoted as verified until Bohopi contains current evidence that supports the public claim.",
    status: "Planned",
    badge: "planned" as const,
    href: "/tools/",
    label: "See the governed index",
  },
  {
    title: "Working systems",
    body: "Internal systems may support delivery without becoming a public product claim, case study, or promise to a buyer.",
    status: "Internal working system",
    badge: "internal-working-system" as const,
    href: "/tools/#classifications",
    label: "Read the classifications",
  },
  {
    title: "Experiments and archives",
    body: "Prototypes, planned work, and historical material remain clearly labeled and outside the primary commercial path.",
    status: "Prototype or experiment",
    badge: "prototype-or-experiment" as const,
    href: "/lab/",
    label: "Open the secondary archive",
  },
] as const;

export default function Homepage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText text={text} seenTerms={seenTerms} />;

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="home-section hero" aria-labelledby="hero-title">
          <div className="section-shell hero__layout">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--on-dark">Boho Digital Services</p>
              <h1 id="hero-title">
                Local visibility, lead systems, and websites built by people who understand the machinery.
              </h1>
              <p className="hero__body">{define("Boho Digital Services is a digital-engineering firm for businesses that need local visibility, lead systems, websites, provider rescue, custom operational tools, and measurable improvement to work together.")}</p>
              <p className="hero__supporting-line">{define("We diagnose the system, explain the tradeoffs, engineer the smallest useful change, and verify what actually happened.")}</p>
              <div className="button-row hero__actions">
                <ButtonLink href="/contact/">Talk to Someone Technical</ButtonLink>
                <ButtonLink href="/tools/" variant="secondary">
                  See What We Build
                </ButtonLink>
              </div>
            </div>
            <div className="hero-editorial hero-editorial--process" aria-label="Boho digital engineering scope">
              <div className="migration-ledger">
                <div className="migration-ledger__heading">
                  <Wrench size={28} strokeWidth={1.6} aria-hidden="true" />
                  <div><span>Digital engineering</span><strong>Understand the machinery before changing it.</strong></div>
                </div>
                <ul>
                  <li><MapPin size={20} aria-hidden="true" /><span><strong>Visibility</strong> local discovery and trust</span></li>
                  <li><MousePointerClick size={20} aria-hidden="true" /><span><strong>Lead systems</strong> clear routes to qualified action</span></li>
                  <li><PanelsTopLeft size={20} aria-hidden="true" /><span><strong>Web platforms</strong> useful, owned, and maintainable</span></li>
                  <li><Route size={20} aria-hidden="true" /><span><strong>Operations</strong> migrations, tools, automation, and records</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <nav className="journey-rail" aria-label="Homepage journey">
          <div className="section-shell journey-rail__inner">
            <span className="journey-rail__label">Follow the work</span>
            <ol>
              {operatingCycle.map((stage) => (
                <li key={stage.id}>
                  <a href={stage.href}>
                    <span>{stage.number}</span>
                    {stage.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <section
          className="home-section editorial-problem"
          aria-labelledby="problem-title"
        >
          <div className="section-shell editorial-problem__grid">
            <div className="editorial-problem__statement">
              <h2 id="problem-title">
                Marketing systems are still systems.
              </h2>
            </div>
            <div className="editorial-problem__body reading-width">
              <p className="editorial-problem__lead">
                The website, local presence, lead path, hosting, analytics, accounts, and operational tools affect one another.
              </p>
              <p>
                Boho brings technical competence into the commercial conversation. We learn what the business needs, inspect the machinery underneath it, and explain whether the useful next move is stronger visibility, a better website, a safer migration, an operational tool, or clearer measurement.
              </p>
              <div className="business-first-signals" aria-label="Business-first decision inputs">
                <span><BriefcaseBusiness size={19} aria-hidden="true" /> Offer</span>
                <span><Target size={19} aria-hidden="true" /> Market</span>
                <span><MousePointerClick size={19} aria-hidden="true" /> Action</span>
                <span><BarChart3 size={19} aria-hidden="true" /> Signal</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="home-section method"
          id="method"
          aria-labelledby="method-title"
        >
          <div className="section-shell">
            <div className="section-heading section-heading--research">
              <h2 id="method-title">A six-stage engineering method.</h2>
              <div className="section-heading__intro reading-width">
                <p>{define("Boho looks for the relationship between visible digital signals and real business outcomes.")}</p>
                <p>{define("For one business, the useful signal may be quote requests. For another, it may be calls, bookings, product-page visits, local profile actions, consultations, or visibility for a high-value service.")}</p>
                <p>{define("We do not optimize everything just because it can be measured. We prioritize the work with the strongest business case.")}</p>
              </div>
            </div>

            <ol className="method-summary-list" aria-label="Diagnose, prioritize, engineer, deploy, measure, improve">
              {operatingCycle.map((stage) => {
                const Icon = operatingCycleIcons[stage.id];
                return (
                <li key={stage.number}>
                  <a className="method-summary-list__link" href={stage.href}>
                    <div className="method-summary-list__marker" aria-hidden="true">
                      <span className="method-summary-list__icon">
                        <Icon size={24} strokeWidth={1.8} />
                      </span>
                      <span className="method-summary-list__number">{stage.number}</span>
                    </div>
                    <div>
                      <h3>{stage.title}</h3>
                      <p>{define(stage.body)}</p>
                      <span className="method-summary-list__cta">{stage.linkLabel} →</span>
                    </div>
                  </a>
                </li>
                );
              })}
            </ol>
            <TextLink href="/services/research-audits-analytics/" className="section-link">
              See how diagnosis and measurement work
            </TextLink>
          </div>
        </section>

        <section
          className="home-section design-spotlight"
          id="design"
          aria-labelledby="design-title"
        >
          <div className="section-shell">
            <div className="design-spotlight__intro">
              <div className="section-heading">
                <h2 id="design-title">
                  Website design built around clarity, trust, search, and action.
                </h2>
              </div>
              <div className="reading-width">
                <p>{define("A strong website does more than sit there attractively. It explains the offer, earns trust, supports search visibility, and gives the right customer a clear next step.")}</p>
                <p>{define("Boho designs from the business outward. The structure, visual system, service pages, conversion paths, and technical foundation should fit the market instead of forcing every company into the same template.")}</p>
                <div className="button-row">
                  <ButtonLink href="/contact/">Plan a Website</ButtonLink>
                  <TextLink href="/services/website-design-redesign/">
                    Explore Website Design
                  </TextLink>
                </div>
              </div>
            </div>

            <div className="design-reference-grid">
              <figure className="design-reference">
                <img
                  src="/visuals/homepage-design-studio-v2.webp"
                  width="1067"
                  height="1600"
                  alt="A carefully arranged design workspace with color studies, typography, and material samples."
                  loading="lazy"
                />
                <figcaption>
                  <span>Design with a reason</span>
                  <strong>Every visual choice should help someone understand, trust, or act.</strong>
                  <small>Representative editorial photography, not Boho staff or client work.</small>
                </figcaption>
              </figure>

              <ol className="design-principles" aria-label="Four website design principles">
                {designPrinciples.map((principle) => {
                  const Icon = principle.icon;
                  return (
                  <li key={principle.number}>
                    <div className="design-principle__marker" aria-hidden="true">
                      <span className="design-principle__icon">
                        <Icon size={26} strokeWidth={1.7} />
                      </span>
                      <span>{principle.number}</span>
                    </div>
                    <div>
                      <h3>{define(`[[${principle.termSlug}|${principle.title}]]`)}</h3>
                      <p>{define(principle.body)}</p>
                    </div>
                  </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        <section
          className="home-section services-mosaic"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <h2 id="services-title">
                  Five service lanes, one accountable system.
                </h2>
              </div>
              <p className="reading-width">{define("Local visibility, lead paths, websites, hosting, migrations, operational tools, analytics, and improvement frequently share the same dependencies. The lane names make the work understandable without pretending the systems are isolated.")}</p>
            </div>

            <div className="service-grid">
              {serviceCards.map((service, index) => {
                const Icon = service.icon;
                return (
                <article
                  className={`service-card service-card--${service.tone} service-card--${index + 1}`}
                  key={service.title}
                >
                  <h3>{service.title}</h3>
                  <p>{define(service.body)}</p>
                  <TextLink href={service.href}>{service.label}</TextLink>
                  <span className="service-card__pattern" aria-hidden="true">
                    <Icon size={38} strokeWidth={1.65} />
                  </span>
                </article>
                );
              })}
            </div>
            <div className="section-action">
              <ButtonLink href="/services/">View All Services</ButtonLink>
            </div>
          </div>
        </section>

        <section
          className="home-section migration-rescue"
          aria-labelledby="migration-title"
        >
          <div className="section-shell migration-rescue__layout">
            <div className="migration-rescue__copy">
              <h2 id="migration-title">
                Website migration and provider rescue without losing what works.
              </h2>
              <p>{define("Businesses often discover how fragile their website is only when they try to leave. The domain may sit in the wrong account. Analytics may belong to the provider. Search value may depend on undocumented URLs, redirects, forms, or plugins.")}</p>
              <p>{define("Boho maps the system before changing it. We help recover ownership, preserve what still works, plan the migration, and leave cleaner records behind.")}</p>
              <div className="button-row">
                <ButtonLink href="/contact/">Plan the Rescue</ButtonLink>
                <TextLink
                  href="/services/website-migration-provider-rescue/"
                  className="text-link--on-dark"
                >
                  See Migration Services
                </TextLink>
              </div>
              <p className="migration-rescue__trust-line">{define("Careful inventory. Clear redirect planning. Post-launch verification. Client-owned access wherever possible.")}</p>
            </div>

            <div className="migration-rescue__visual">
              <div className="migration-ledger" aria-label="Migration ownership dossier">
                <div className="migration-ledger__heading">
                  <KeyRound size={28} strokeWidth={1.6} aria-hidden="true" />
                  <div><span>Transfer file</span><strong>Ownership dossier</strong></div>
                </div>
                <ul>
                  <li><Globe2 size={20} aria-hidden="true" /><span><strong>Domain</strong> registrar and DNS control</span></li>
                  <li><Database size={20} aria-hidden="true" /><span><strong>Content</strong> pages, media, forms, and data</span></li>
                  <li><FileCheck2 size={20} aria-hidden="true" /><span><strong>Continuity</strong> redirects, tracking, and verification</span></li>
                </ul>
              </div>
              <div className="migration-map" aria-label="Provider migration route">
                <ol className="migration-map__route">
                  {migrationSteps.map((step, index) => (
                    <li key={step}>
                      <span className="migration-map__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="migration-map__step">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="migration-map__systems" aria-label="Systems inventoried">
                  {migrationSystems.map((system) => (
                    <span key={system}>{system}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="home-section buyer-buckets"
          aria-labelledby="buyers-title"
        >
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <h2 id="buyers-title">
                  Website and local SEO strategy shaped by how customers
                  choose.
                </h2>
              </div>
              <p className="reading-width">{define("A contractor selling large projects does not need the same website strategy as a restaurant. An ecommerce store does not need the same search plan as a clinic. Boho groups businesses by how customers discover them, how trust is earned, and which actions are most valuable.")}</p>
            </div>

            <div className="buyer-panels">
              {buyerPanels.map((buyer, index) => (
                <article
                  className={`buyer-panel buyer-panel--${index + 1}`}
                  key={buyer.title}
                >
                  <div className="buyer-panel__image">
                    <img
                      src={buyer.image}
                      width={buyer.imageWidth}
                      height={buyer.imageHeight}
                      alt={buyer.imageAlt}
                      loading="lazy"
                      style={{ objectPosition: buyer.position }}
                    />
                  </div>
                  <div className="buyer-panel__content">
                    <p className="buyer-panel__number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3>{buyer.title}</h3>
                    <p>{define(buyer.body)}</p>
                    <TextLink href={buyer.href}>{buyer.label}</TextLink>
                  </div>
                </article>
              ))}
            </div>
            <div className="section-action">
              <ButtonLink href="/industries/">Find Your Business Type</ButtonLink>
            </div>
            <p className="buyer-panels__disclosure">
              Photography shows representative business settings. It is not
              client work and does not imply endorsement.
            </p>
          </div>
        </section>

        <section
          className="home-section lab-proof"
          aria-labelledby="lab-title"
        >
          <div className="section-shell lab-proof__layout">
            <div className="lab-proof__copy">
              <h2 id="lab-title">
                Tools and proof governed by evidence.
              </h2>
              <p>{define("The Tools area is a governed capability index, not a catalog of third-party software or an empty shelf of future claims. Every profile must say what exists, how it was verified, and what remains internal, experimental, planned, historical, or prohibited.")}</p>
              <p>{define("No public capability candidate is promoted as verified in this review because the current Bohopi proof program has not accepted one as proof-eligible. Broad SEO education and experiments remain secondary while their eventual Rank Builder destination is handled in a separate approved project.")}</p>
              <div className="button-row">
                <ButtonLink href="/tools/">See What We Build</ButtonLink>
                <TextLink href="/resources/">Browse Buyer Resources</TextLink>
              </div>
            </div>

            <div className="evidence-board" aria-label="Boho Lab evidence board">
              {capabilityPanels.map((panel, index) => (
                <article
                  className={`evidence-card evidence-card--${index + 1}`}
                  key={panel.title}
                >
                  <div className="evidence-card__meta">
                    <span>Governance file {String(index + 1).padStart(2, "0")}</span>
                    <EvidenceBadge status={panel.badge}>
                      {panel.status}
                    </EvidenceBadge>
                  </div>
                  <h3>{panel.title}</h3>
                  <p>{define(panel.body)}</p>
                  <TextLink href={panel.href}>{panel.label}</TextLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-section ongoing-growth"
          id="growth"
          aria-labelledby="growth-title"
        >
          <div className="section-shell ongoing-growth__layout">
            <div className="ongoing-growth__copy">
              <h2 id="growth-title">
                Ongoing SEO and website growth tied to visible priorities and
                decisions.
              </h2>
              <p>{define("Ongoing work makes sense when the market is active, the site needs steady improvement, content supports real services, technical health needs monitoring, or lead paths need continued testing.")}</p>
              <p>{define("It should not become a subscription to vague activity.")}</p>
              <p>{define("Boho gives ongoing work a visible rhythm: priorities, implementation, measurement, documentation, and the next decision.")}</p>
              <div className="button-row">
                <ButtonLink href="/contact/">Ask About Ongoing Support</ButtonLink>
                <TextLink href="/services/ongoing-seo-growth/">
                  See how monthly work operates
                </TextLink>
              </div>
            </div>

            <div className="ongoing-growth__visual">
              <div className="growth-monitor" aria-label="Ongoing improvement signal monitor">
                <div className="growth-monitor__heading">
                  <LineChart size={28} strokeWidth={1.6} aria-hidden="true" />
                  <div><span>Decision rhythm</span><strong>Watch what changes the next move.</strong></div>
                </div>
                <div className="growth-monitor__signals">
                  <span><SearchCheck size={19} aria-hidden="true" /> Visibility</span>
                  <span><PanelsTopLeft size={19} aria-hidden="true" /> Experience</span>
                  <span><MousePointerClick size={19} aria-hidden="true" /> Qualified action</span>
                </div>
                <div className="growth-monitor__chart" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </div>
              </div>
              <ol className="growth-cycle" aria-label="Diagnose, prioritize, engineer, deploy, measure, improve">
                {operatingCycle.map((stage, index) => (
                  <li className={`growth-cycle__phase growth-cycle__phase--${index + 1}`} key={stage.id}>
                    <a href={stage.href}>
                      <span className="growth-cycle__index" aria-hidden="true">{stage.number}</span>
                      <strong>{stage.title}</strong>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          className="home-section territory-cta"
          aria-labelledby="technical-opinion-title"
        >
          <div className="section-shell territory-cta__inner">
            <span className="territory-cta__mark" aria-hidden="true"><Target size={70} strokeWidth={1.2} /></span>
            <div className="territory-cta__copy">
              <p className="eyebrow eyebrow--on-dark">Provider frustration</p>
              <h2 id="technical-opinion-title">
                Tired of talking to people who cannot explain the system?
              </h2>
              <p>{define("Bring the proposal, migration plan, dashboard, hosting setup, automation idea, or provider explanation that does not add up. Boho will separate what is verified from what is assumed and identify the smallest useful next check.")}</p>
            </div>
            <ButtonLink href="/contact/">Get a Technical Second Opinion</ButtonLink>
          </div>
        </section>

        <section
          className="home-section pricing-philosophy"
          aria-labelledby="pricing-title"
        >
          <div className="section-shell pricing-philosophy__inner">
            <div className="pricing-philosophy__signals" aria-label="How Boho keeps work practical">
              <span><Wrench size={20} aria-hidden="true" /> Direct technical work</span>
              <span><BriefcaseBusiness size={20} aria-hidden="true" /> More useful work</span>
              <span><BarChart3 size={20} aria-hidden="true" /> Visible priorities</span>
            </div>
            <h2 id="pricing-title">
              Scope follows diagnosis, not a package menu.
            </h2>
            <p className="pricing-philosophy__body reading-width">{define("Boho stays lean so more of the budget can go toward diagnosis, engineering, deployment, documentation, and improvement. A scope should name the actual system, the evidence available, the expected business effect, the risks, and how the result will be checked.")}</p>
            <p className="pricing-philosophy__comparison">{define("Start with the smallest useful intervention. Expand only when the next investment has a defensible case.")}</p>
            <ButtonLink href="/contact/">Discuss the Actual Problem</ButtonLink>
          </div>
        </section>

        <section
          className="home-section final-cta"
          aria-labelledby="final-cta-title"
        >
          <div className="section-shell">
            <CtaBand
              className="final-cta__band"
              title="Talk to someone who can explain the machinery."
              body={
                <div className="final-cta__body">
                  <p>{define("Send the business, website, service area, system, and what feels stuck. Do not send passwords or sensitive records. Until an approved form endpoint exists, use the public email path on the contact page.")}</p>
                  <p>{define("You do not need to diagnose the solution before the conversation. Naming what is verified, what is inferred, and what needs inspection is the first part of the work.")}</p>
                </div>
              }
              primary={{ label: "Talk to Someone Technical", href: "/contact/" }}
              secondary={{ label: "See What We Build", href: "/tools/" }}
            />
            <span id="final-cta-title" className="sr-only">
              Talk to someone technical.
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
