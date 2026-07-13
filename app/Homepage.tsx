import {
  ButtonLink,
  ConceptCaption,
  CtaBand,
  EvidenceBadge,
  Footer,
  Header,
  TextLink,
} from "./components/SiteChrome";
import { DefinedText } from "./components/DefinedText";

const methodStages = [
  {
    number: "01",
    title: "Study the market",
    body: "We review the business, competitors, search results, website quality, local visibility, customer expectations, and trust signals around the actual market.",
  },
  {
    number: "02",
    title: "Find the signals",
    body: "We identify which signals are weak, controllable, measurable, and plausibly connected to revenue or qualified customer action.",
  },
  {
    number: "03",
    title: "Fix what matters",
    body: "We design, migrate, repair, write, track, and optimize around the highest-leverage work first.",
  },
] as const;

const serviceCards = [
  {
    category: "Design",
    title: "Website Design & Redesign",
    body: "Clear, distinctive, search-aware websites built around services, trust, and customer action.",
    label: "Design a better website",
    href: "/services/website-design-redesign/",
    tone: "gold",
  },
  {
    category: "Ownership",
    title: "Migration & Provider Rescue",
    body: "Careful help leaving bad SEO companies, messy hosting setups, unclear ownership, and fragile platforms.",
    label: "Plan the rescue",
    href: "/services/website-migration-provider-rescue/",
    tone: "copper",
  },
  {
    category: "Visibility",
    title: "Local SEO & Search Visibility",
    body: "Local pages, business-profile alignment, reviews, market relevance, and competitor-aware search work.",
    label: "Improve local visibility",
    href: "/services/local-seo-search-visibility/",
    tone: "verdigris",
  },
  {
    category: "Action",
    title: "Lead Generation & Conversion",
    body: "Service pages, forms, calls to action, booking paths, and trust signals built to turn attention into inquiries.",
    label: "Improve lead paths",
    href: "/services/lead-generation-conversion/",
    tone: "blue",
  },
  {
    category: "Momentum",
    title: "Ongoing SEO & Growth",
    body: "Steady search, content, technical monitoring, reporting, and optimization without the mystery-retainer fog.",
    label: "Build ongoing momentum",
    href: "/services/ongoing-seo-growth/",
    tone: "plum",
  },
  {
    category: "Evidence",
    title: "Research, Audits & Site Health",
    body: "Market maps, success-signal analysis, technical inspection, measurement planning, and prioritized recommendations.",
    label: "Start with evidence",
    href: "/services/research-audits-analytics/",
    tone: "graphite",
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

const buyerPanels = [
  {
    title: "Home Improvement & Contractors",
    body: "For project-based businesses where one strong lead can be worth thousands. Focus areas often include estimate requests, high-value service pages, local visibility, project proof, reviews, and service-area clarity.",
    href: "/industries/home-improvement-contractors/",
    label: "Explore home improvement and contractors",
    pattern: "blueprint",
  },
  {
    title: "Local Service Businesses",
    body: "For appointment-based, service-area, and trust-heavy businesses that need calls, bookings, visits, or qualified inquiries.",
    href: "/industries/local-service-businesses/",
    label: "Explore local service businesses",
    pattern: "neighborhood",
  },
  {
    title: "Brick-and-Mortar Retail & Hospitality",
    body: "For businesses that depend on local discovery, reputation, directions, reservations, events, and in-person attention.",
    href: "/industries/brick-and-mortar-retail-hospitality/",
    label: "Explore retail and hospitality",
    pattern: "storefront",
  },
  {
    title: "Online Retail & Ecommerce",
    body: "For stores that need stronger product discovery, category structure, technical SEO, trust, and the path from browsing to purchase.",
    href: "/industries/online-retail-ecommerce/",
    label: "Explore online retail and ecommerce",
    pattern: "product-grid",
  },
  {
    title: "Professional & B2B Services",
    body: "For firms that need clear positioning, credibility, useful education, and qualified conversations before a buyer commits.",
    href: "/industries/professional-b2b-services/",
    label: "Explore professional and B2B services",
    pattern: "documents",
  },
] as const;

const labPanels = [
  {
    title: "In-house brands",
    body: "Properties we control and use to test content systems, publishing workflows, technical structure, and search visibility.",
    status: "In progress",
    badge: "in-progress" as const,
  },
  {
    title: "Example reports",
    body: "Clear demonstrations of what a market review, signal audit, or technical roadmap can contain.",
    status: "Example format",
    badge: "example-format" as const,
  },
  {
    title: "Market maps",
    body: "Visual studies of competitors, service areas, website quality, local visibility, and opportunity.",
    status: "In progress",
    badge: "in-progress" as const,
  },
  {
    title: "Work log",
    body: "A running record of what Boho is building, testing, fixing, and learning.",
    status: "In progress",
    badge: "in-progress" as const,
  },
] as const;

const growthCycle = ["Prioritize", "Improve", "Measure", "Adjust"] as const;

const researchRouteStages = [
  { number: "01", label: "Context", detail: "Business + market" },
  { number: "02", label: "Evidence", detail: "Signals + constraints" },
  { number: "03", label: "Structure", detail: "Priority + plan" },
  { number: "04", label: "Delivery", detail: "Build + verify" },
] as const;

function ResearchRouteVisual() {
  return (
    <div className="research-route" aria-hidden="true">
      <div className="research-route__frame">
        <div className="research-route__header">
          <span>Research route</span>
          <span>Boho / 01—04</span>
        </div>
        <div className="research-route__stages">
          {researchRouteStages.map((stage) => (
            <div className="research-route__stage" key={stage.number}>
              <span className="research-route__number">{stage.number}</span>
              <span className="research-route__label">{stage.label}</span>
              <span className="research-route__detail">{stage.detail}</span>
            </div>
          ))}
        </div>
        <div className="research-route__signal-line">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="research-route__note">
          <span>Observe</span>
          <span>Decide</span>
          <span>Document</span>
        </div>
      </div>
    </div>
  );
}

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
                Research-led website design, local SEO, and digital growth.
              </h1>
              <p className="hero__body">{define("Boho Digital Services designs distinctive websites, improves local search visibility, rescues difficult provider situations, and builds practical lead-generation systems around how customers find, trust, and contact a business.")}</p>
              <p className="hero__supporting-line">{define("Every business has a different market. We study yours before deciding what to fix.")}</p>
              <div className="button-row hero__actions">
                <ButtonLink href="/start/">Get a Visibility Check</ButtonLink>
                <ButtonLink href="#method" variant="secondary">
                  See How We Work
                </ButtonLink>
              </div>
            </div>
            <div className="hero__art">
              <ResearchRouteVisual />
            </div>
          </div>
        </section>

        <section
          className="home-section editorial-problem"
          aria-labelledby="problem-title"
        >
          <div className="section-shell editorial-problem__grid">
            <div className="editorial-problem__statement">
              <h2 id="problem-title">
                A digital marketing package is not a business strategy.
              </h2>
            </div>
            <div className="editorial-problem__body reading-width">
              <p>{define("A lot of agencies start with the package before they understand the business. They sell traffic before defining what a good lead looks like. They sell redesigns before studying what the current site is supposed to do.")}</p>
              <p>{define("They sell reports before deciding which numbers should change the next decision. Boho starts with the business model, the market, the website, and the customer actions worth improving.")}</p>
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
              <h2 id="method-title">Research before recommendations.</h2>
              <div className="section-heading__intro reading-width">
                <p>{define("Boho looks for the relationship between visible digital signals and real business outcomes.")}</p>
                <p>{define("For one business, the useful signal may be quote requests. For another, it may be calls, bookings, product-page visits, local profile actions, consultations, or visibility for a high-value service.")}</p>
                <p>{define("We do not optimize everything just because it can be measured. We prioritize the work with the strongest business case.")}</p>
              </div>
            </div>

            <ol className="signal-path" aria-label="The three-stage Boho method">
              {methodStages.map((stage, index) => (
                <li className="signal-path__stage" key={stage.title}>
                  <div className="signal-path__marker" aria-hidden="true">
                    <span>{stage.number}</span>
                  </div>
                  <div className="signal-path__content">
                    <h3>{stage.title}</h3>
                    <p>{define(stage.body)}</p>
                  </div>
                  {index < methodStages.length - 1 ? (
                    <span className="signal-path__connector" aria-hidden="true" />
                  ) : (
                    <span className="signal-path__destination" aria-hidden="true">
                      business value
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <TextLink href="/lab/" className="section-link">
              See the research approach
            </TextLink>
          </div>
        </section>

        <section
          className="home-section design-spotlight"
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

            <div className="concept-studio" aria-label="Fictional website concepts">
              <figure className="concept-studio__concept concept-studio__concept--contractor">
                <div className="concept-ui concept-ui--contractor" aria-hidden="true">
                  <div className="concept-ui__chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="concept-ui__kicker">Project services</p>
                  <p className="concept-ui__headline">Build confidence before the estimate.</p>
                  <div className="concept-ui__lines">
                    <span />
                    <span />
                  </div>
                  <div className="concept-ui__action">Request an estimate</div>
                </div>
                <ConceptCaption />
              </figure>

              <figure className="concept-studio__concept concept-studio__concept--hospitality">
                <div className="concept-ui concept-ui--hospitality" aria-hidden="true">
                  <div className="concept-ui__photo-field">
                    <span />
                    <span />
                  </div>
                  <p className="concept-ui__kicker">Local hospitality</p>
                  <p className="concept-ui__headline">A clear reason to visit.</p>
                  <div className="concept-ui__nav-row">
                    <span>Menu</span>
                    <span>Hours</span>
                    <span>Visit</span>
                  </div>
                </div>
                <ConceptCaption />
              </figure>

              <figure className="concept-studio__concept concept-studio__concept--ecommerce">
                <div className="concept-ui concept-ui--ecommerce" aria-hidden="true">
                  <div className="concept-ui__commerce-head">
                    <p>Browse the collection</p>
                    <span>Filter</span>
                  </div>
                  <div className="concept-ui__product-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="concept-ui__lines">
                    <span />
                    <span />
                  </div>
                </div>
                <ConceptCaption />
              </figure>
            </div>
            <p className="concept-studio__caption">
              Concept interfaces showing how one design system can adapt to
              different business models. Not client work.
            </p>
          </div>
        </section>

        <section
          className="home-section services-mosaic"
          aria-labelledby="services-title"
        >
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <h2 id="services-title">
                  Website, SEO, migration, and lead-generation services.
                </h2>
              </div>
              <p className="reading-width">{define("Websites, search visibility, technical health, content, tracking, and conversion usually work as one system. Pulling one lever while ignoring the rest is how businesses end up paying for motion instead of progress.")}</p>
            </div>

            <div className="service-grid">
              {serviceCards.map((service, index) => (
                <article
                  className={`service-card service-card--${service.tone} service-card--${index + 1}`}
                  key={service.title}
                >
                  <h3>{service.title}</h3>
                  <p>{define(service.body)}</p>
                  <TextLink href={service.href}>{service.label}</TextLink>
                  <span className="service-card__pattern" aria-hidden="true" />
                </article>
              ))}
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

            <div className="migration-map" aria-label="Provider migration route">
              <ol className="migration-map__route">
                {migrationSteps.map((step, index) => (
                  <li key={step}>
                    <span className="migration-map__node" aria-hidden="true" />
                    <span className="migration-map__step">{step}</span>
                    {index < migrationSteps.length - 1 ? (
                      <span className="migration-map__line" aria-hidden="true" />
                    ) : null}
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
        </section>

        <section
          className="home-section buyer-buckets"
          aria-labelledby="buyers-title"
        >
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div>
                <h2 id="buyers-title">
                  Website and SEO strategy shaped by how customers choose.
                </h2>
              </div>
              <p className="reading-width">{define("A contractor selling large projects does not need the same website strategy as a restaurant. An ecommerce store does not need the same search plan as a clinic. Boho groups businesses by how customers discover them, how trust is earned, and which actions are most valuable.")}</p>
            </div>

            <div className="buyer-panels">
              {buyerPanels.map((buyer, index) => (
                <article
                  className={`buyer-panel buyer-panel--${buyer.pattern} buyer-panel--${index + 1}`}
                  key={buyer.title}
                >
                  <div className="buyer-panel__pattern" aria-hidden="true">
                    <span />
                    <span />
                    <span />
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
          </div>
        </section>

        <section
          className="home-section lab-proof"
          aria-labelledby="lab-title"
        >
          <div className="section-shell lab-proof__layout">
            <div className="lab-proof__copy">
              <h2 id="lab-title">
                Research, experiments, and proof you can inspect.
              </h2>
              <p>{define("Boho is building proof in public. We use in-house brands, market research, website teardowns, technical breakdowns, example reports, tools, and work logs to make the method visible.")}</p>
              <p>{define("When a result is real, we show it. When an experiment is early, we label it early. When something fails, we learn from it instead of hiding it behind a stock photo of a handshake.")}</p>
              <div className="button-row">
                <ButtonLink href="/lab/">Enter the Lab</ButtonLink>
                <TextLink href="/learn/">Read practical guides</TextLink>
              </div>
            </div>

            <div className="evidence-board" aria-label="Boho Lab evidence board">
              <div className="evidence-board__grid" aria-hidden="true" />
              {labPanels.map((panel, index) => (
                <article
                  className={`evidence-card evidence-card--${index + 1}`}
                  key={panel.title}
                >
                  <div className="evidence-card__meta">
                    <span>Lab file {String(index + 1).padStart(2, "0")}</span>
                    <EvidenceBadge status={panel.badge}>
                      {panel.status}
                    </EvidenceBadge>
                  </div>
                  <h3>{panel.title}</h3>
                  <p>{define(panel.body)}</p>
                  <div className="evidence-card__marks" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="home-section ongoing-growth"
          aria-labelledby="growth-title"
        >
          <div className="section-shell ongoing-growth__layout">
            <div className="ongoing-growth__copy">
              <h2 id="growth-title">
                Ongoing SEO tied to visible priorities and decisions.
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

            <ol className="growth-cycle" aria-label="Ongoing work cycle">
              {growthCycle.map((phase, index) => (
                <li className={`growth-cycle__phase growth-cycle__phase--${index + 1}`} key={phase}>
                  <span className="growth-cycle__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{phase}</strong>
                  <span className="growth-cycle__connector" aria-hidden="true" />
                </li>
              ))}
              <li className="growth-cycle__center" aria-hidden="true">
                next
                <br />
                decision
              </li>
            </ol>
          </div>
        </section>

        <section
          className="home-section pricing-philosophy"
          aria-labelledby="pricing-title"
        >
          <div className="section-shell pricing-philosophy__inner">
            <h2 id="pricing-title">
              Lean overhead, practical pricing, and more useful work.
            </h2>
            <p className="pricing-philosophy__body reading-width">{define("Boho stays lean so more of the budget can go toward research, design, implementation, documentation, and ongoing improvement. You are not paying for a giant sales team, an account-management maze, or elaborate reporting rituals designed to make ordinary work look mysterious.")}</p>
            <p className="pricing-philosophy__comparison">{define("Start small. Prove the need. Scale only when the work has a clear business case.")}</p>
            <ButtonLink href="/pricing/">See Pricing</ButtonLink>
          </div>
        </section>

        <section
          className="home-section final-cta"
          aria-labelledby="final-cta-title"
        >
          <div className="final-cta__mosaic" aria-hidden="true">
            <span className="final-cta__cell final-cta__cell--one" />
            <span className="final-cta__cell final-cta__cell--two" />
            <span className="final-cta__cell final-cta__cell--three" />
            <span className="final-cta__path" />
            <span className="final-cta__destination" />
          </div>
          <div className="section-shell">
            <CtaBand
              className="final-cta__band"
              title="Start with a Local Visibility Check."
              body={
                <div className="final-cta__body">
                  <p>{define("Send the business, website, service area, and what feels stuck. Boho will look for obvious leaks, weak signals, provider risks, and the most useful next step.")}</p>
                  <p>{define("You do not need to know whether the answer is a redesign, migration, SEO work, better lead paths, or ongoing support. Figuring that out is the first part of the work.")}</p>
                </div>
              }
              primary={{ label: "Start the Check", href: "/start/" }}
              secondary={{ label: "Contact Boho", href: "/contact/" }}
            />
            <span id="final-cta-title" className="sr-only">
              Start with a Local Visibility Check.
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
