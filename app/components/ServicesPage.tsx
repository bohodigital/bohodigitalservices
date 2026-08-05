import Link from "next/link";
import Image from "next/image";
import {
  canonicalServices,
  emailBenefitCopy,
  sharedScopeNote,
  websiteScopeExamples,
} from "../content/commercialReset";
import { servicesCatalog } from "../content/serviceShowcases";
import { ButtonLink, Footer, Header } from "./SiteChrome";

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
  "Standard business email hosting for one domain with eligible active plans",
] as const;

const websiteHelpExamples = [
  "Broken contact or inquiry form",
  "Bad mobile layout",
  "One unclear high-value page",
  "Search indexing or redirect problem",
  "Incorrect analytics setup",
  "Third-party action or integration failure",
  "Domain, hosting, or provider ownership review",
  "Provider exit planning",
  "Straightforward website move",
  "Focused accessibility repair",
  "Technical audit of one defined issue",
] as const;

const customIncluded = [
  "One defined workflow",
  "Limited users or systems",
  "Bounded inputs and outputs",
  "A clear human approval point",
  "Standard deployment",
  "Testing and failure-state handling",
  "Documentation and handoff",
] as const;

const serviceFit = [
  ["We need a new or replacement website", "Business Websites"],
  ["We need continued search and local improvement", "Ongoing SEO & Local Growth"],
  ["Something specific is broken or unclear", "Website Help"],
  ["We repeat expensive manual work", "Custom Systems"],
  ["We are not sure", "Free Website Review"],
] as const;

const serviceByKey = new Map(canonicalServices.map((service) => [service.key, service]));

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Boho Digital Services",
  itemListElement: canonicalServices.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.label,
      url: `https://bohodigitalservices.com${service.route}`,
      description: service.servicesDescription,
      offers: {
        "@type": "Offer",
        name: `${service.label} — ${service.priceDisplay}`,
        price: service.startingPrice,
        priceCurrency: "USD",
        description: service.priceDisplay,
      },
    },
  })),
};

function ServiceAction({
  serviceKey,
  href,
}: {
  serviceKey: typeof canonicalServices[number]["key"];
  href?: string;
}) {
  const service = serviceByKey.get(serviceKey);
  if (!service) return null;
  return (
    <ButtonLink
      data-analytics-event="service_card_click"
      data-analytics-price-display={service.priceDisplay}
      data-analytics-service-name={service.label}
      data-analytics-source-page="services"
      href={(href ?? service.route) as `/${string}`}
    >
      {service.servicesCta}
    </ButtonLink>
  );
}

export function ServicesPage() {
  const business = serviceByKey.get("businessWebsites");
  const seo = serviceByKey.get("ongoingSeo");
  const help = serviceByKey.get("websiteHelp");
  const custom = serviceByKey.get("customSystems");
  if (!business || !seo || !help || !custom) {
    throw new Error("Canonical service data is incomplete.");
  }

  return (
    <>
      <Header />
      <main className="reset-services-page" id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className="reset-interior-hero" aria-labelledby="services-title">
          <div className="reset-shell reset-interior-hero__grid">
            <div>
              <p className="reset-eyebrow">FOUR SERVICES · PUBLIC STARTING PRICES</p>
              <h1 id="services-title">Build it. Grow it. Fix it. Automate it.</h1>
              <p>
                Boho organizes the work around four clear outcomes. Audits,
                migrations, reporting, and discovery are included only when the
                job actually requires them.
              </p>
              <div className="reset-actions">
                <ButtonLink
                  data-analytics-event="free_review_click"
                  data-analytics-service-context="general"
                  data-analytics-source-page="services"
                  data-analytics-source-section="hero"
                  href="/start/"
                >
                  Get a free website review
                </ButtonLink>
                <ButtonLink href="/pricing/" variant="secondary">
                  See pricing
                </ButtonLink>
              </div>
            </div>
            <aside className="reset-interior-hero__receipt">
              <p>Public starting prices. Written scope. Client-owned durable accounts. No mystery retainer.</p>
              <dl>
                {canonicalServices.map((service) => (
                  <div key={service.key}>
                    <dt>{service.label}</dt>
                    <dd>{service.priceDisplay}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="reset-section services-visual-catalog" aria-labelledby="services-visual-catalog-title">
          <div className="reset-shell">
            <header className="reset-heading services-visual-catalog__heading">
              <p className="reset-eyebrow">Explore the work visually</p>
              <h2 id="services-visual-catalog-title">Five routes into one connected business system.</h2>
              <p>Start with the outcome that is missing. Each service page now shows the evidence, examples, boundaries, process, and handoff behind the public starting price.</p>
            </header>
            <div className="services-visual-catalog__grid">
              {servicesCatalog.map((service) => (
                <Link href={service.route} className="services-visual-catalog__card" key={service.route}>
                  <Image src={service.image} alt="" width={1200} height={800} unoptimized />
                  <span><small>{service.price}</small><strong>{service.title}</strong><b>Explore service →</b></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="reset-service-detail reset-service-detail--flagship"
          id="business-websites"
          aria-labelledby="business-websites-title"
        >
          <div className="reset-shell">
            <header className="reset-service-detail__heading">
              <div>
                <p className="reset-eyebrow">BUILD</p>
                <h2 id="business-websites-title">Business Websites</h2>
              </div>
              <p className="reset-price">From $850</p>
            </header>
            <p className="reset-service-detail__intro">{business.servicesDescription}</p>
            <div className="reset-service-detail__split">
              <article>
                <h3>Usually included</h3>
                <ul>{businessIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <h3>Scope examples</h3>
                <div className="reset-table-wrap">
                  <table>
                    <thead>
                      <tr><th>Scope</th><th>Planning price</th><th>Example</th></tr>
                    </thead>
                    <tbody>
                      {websiteScopeExamples.map((scope) => (
                        <tr key={scope.servicesLabel}>
                          <th scope="row">{scope.servicesLabel}</th>
                          <td>{scope.servicesPrice}</td>
                          <td>{scope.servicesCopy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
            <ServiceAction serviceKey="businessWebsites" />
          </div>
        </section>

        <section
          className="reset-service-detail"
          id="ongoing-seo"
          aria-labelledby="ongoing-seo-title"
        >
          <div className="reset-shell">
            <header className="reset-service-detail__heading">
              <div>
                <p className="reset-eyebrow">GROW</p>
                <h2 id="ongoing-seo-title">Ongoing SEO &amp; Local Growth</h2>
              </div>
              <p className="reset-price">From $450/month</p>
            </header>
            <p className="reset-service-detail__intro">{seo.servicesDescription}</p>
            <div className="reset-service-detail__split">
              <article>
                <h3>The starting retainer may include</h3>
                <ul>{seoIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <h3>Scope boundary</h3>
                <p>
                  The $450 starting retainer is for one straightforward website
                  and market with a narrow but complete recurring scope.
                  Additional websites, locations, content production,
                  integrations, meetings, or larger implementation capacity
                  increase the price.
                </p>
                <h3>Free business email with active SEO.</h3>
                {emailBenefitCopy.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            </div>
            <ServiceAction serviceKey="ongoingSeo" />
          </div>
        </section>

        <section
          className="reset-service-detail"
          id="website-help"
          aria-labelledby="website-help-title"
        >
          <div className="reset-shell">
            <header className="reset-service-detail__heading">
              <div>
                <p className="reset-eyebrow">FIX</p>
                <h2 id="website-help-title">Website Help</h2>
              </div>
              <p className="reset-price">From $200</p>
            </header>
            <p className="reset-service-detail__intro">{help.servicesDescription}</p>
            <div className="reset-service-detail__split">
              <article>
                <h3>Examples</h3>
                <ul>{websiteHelpExamples.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <h3>Scope boundary</h3>
                <p>
                  One bounded issue or diagnosis may fit the starting price.
                  Larger repair, recovery, migration, or investigation work
                  receives a written quote after review.
                </p>
                <h3>Secondary detail</h3>
                <ul>
                  <li><Link href="/services/provider-rescue/">Provider rescue and migration</Link></li>
                  <li><Link href="/services/research-audits-strategy/">Research, audits, and strategy</Link></li>
                </ul>
              </article>
            </div>
            <ServiceAction href="/start/" serviceKey="websiteHelp" />
          </div>
        </section>

        <section
          className="reset-service-detail"
          id="custom-systems"
          aria-labelledby="custom-systems-title"
        >
          <div className="reset-shell">
            <header className="reset-service-detail__heading">
              <div>
                <p className="reset-eyebrow">AUTOMATE</p>
                <h2 id="custom-systems-title">Custom Systems</h2>
              </div>
              <p className="reset-price">From $1,500</p>
            </header>
            <p className="reset-service-detail__intro">{custom.servicesDescription}</p>
            <div className="reset-service-detail__split">
              <article>
                <h3>The starting scope may include</h3>
                <ul>{customIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <h3>Scope boundary</h3>
                <p>
                  Customer accounts, payment handling, sensitive data, many
                  integrations, high availability, large migrations, or ongoing
                  production support require a larger technical scope.
                </p>
                <h3>Discovery</h3>
                <p>
                  When responsible scoping requires paid discovery, that work
                  will be defined and priced in writing before it begins. The
                  proposal will state whether the discovery fee is credited
                  toward the related build.
                </p>
              </article>
            </div>
            <ServiceAction serviceKey="customSystems" />
          </div>
        </section>

        <section className="reset-section reset-service-fit" aria-labelledby="service-fit-title">
          <div className="reset-shell">
            <header className="reset-heading">
              <h2 id="service-fit-title">Start with the outcome, not the technical label.</h2>
            </header>
            <div className="reset-table-wrap">
              <table>
                <thead><tr><th>Situation</th><th>Starting point</th></tr></thead>
                <tbody>
                  {serviceFit.map(([situation, startingPoint]) => (
                    <tr key={situation}><th scope="row">{situation}</th><td>{startingPoint}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              You do not need to choose perfectly. Send the current situation
              and Boho will recommend the smallest useful starting point.
            </p>
          </div>
        </section>

        <section className="reset-scope-band">
          <div className="reset-shell"><p>{sharedScopeNote}</p></div>
        </section>

        <section className="reset-section reset-final" aria-labelledby="services-final-title">
          <div className="reset-shell reset-final__grid">
            <div>
              <h2 id="services-final-title">What does the business need next?</h2>
              <p>
                Send the current website or describe the project. Boho will
                identify whether the right starting point is a website, ongoing
                growth, a focused fix, or custom work.
              </p>
            </div>
            <ButtonLink
              data-analytics-event="free_review_click"
              data-analytics-service-context="general"
              data-analytics-source-page="services"
              data-analytics-source-section="final_cta"
              href="/start/"
            >
              Get a free website review
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
