import {
  canonicalServices,
  hostingQualification,
  pricingFaqs,
  websiteScopeExamples,
} from "../content/commercialReset";
import { ButtonLink, FaqItem, Footer, Header } from "./SiteChrome";

const pricingSummary = [
  {
    key: "businessWebsites",
    service: "Business Websites",
    use: "New website, redesign, or responsible replacement",
  },
  {
    key: "ongoingSeo",
    service: "Ongoing SEO & Local Growth",
    use: "Continued search, local, content, technical, and analytics implementation",
  },
  {
    key: "websiteHelp",
    service: "Website Help",
    use: "Repair, audit, provider issue, migration question, analytics, or ownership problem",
  },
  {
    key: "customSystems",
    service: "Custom Systems",
    use: "Tool, integration, workflow, publishing system, or automation",
  },
] as const;

const quoteDrivers = [
  "More pages or unique templates",
  "More substantial copy and content work",
  "Multiple services, locations, or markets",
  "Missing, inaccurate, or disorganized business information",
  "Content migration and redirect requirements",
  "Provider or ownership problems",
  "Third-party integrations",
  "Customer accounts, payments, or live data",
  "Accelerated delivery",
  "Additional meetings, approvals, or stakeholders",
  "Unusual security, accessibility, legal, or operational requirements",
] as const;

const serviceByKey = new Map(canonicalServices.map((service) => [service.key, service]));
const pricingMotions = [
  ["Build", "businessWebsites"],
  ["Grow", "ongoingSeo"],
  ["Fix", "websiteHelp"],
  ["Automate", "customSystems"],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://bohodigitalservices.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: "https://bohodigitalservices.com/pricing/",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Boho Digital Services starting prices",
      itemListElement: canonicalServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Offer",
          name: `${service.label} — ${service.priceDisplay}`,
          price: service.startingPrice,
          priceCurrency: "USD",
          description: service.priceDisplay,
          url: `https://bohodigitalservices.com${service.route}`,
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: pricingFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export function PricingPage() {
  return (
    <>
      <Header />
      <main className="reset-pricing-page" id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className="reset-interior-hero" aria-labelledby="pricing-title">
          <div className="reset-shell reset-interior-hero__grid">
            <div>
              <p className="reset-eyebrow">PRICING</p>
              <h1 id="pricing-title">Four services. Clear starting prices.</h1>
              <p>
                Start with the outcome the business needs. The written proposal
                defines the exact scope, price, dependencies, ownership, and
                third-party costs before work begins.
              </p>
              <ButtonLink
                data-analytics-event="free_review_click"
                data-analytics-service-context="general"
                data-analytics-source-page="pricing"
                data-analytics-source-section="hero"
                href="/start/"
              >
                Get a free website review
              </ButtonLink>
            </div>
            <aside className="pricing-summary-card">
              {pricingMotions.map(([motion, key]) => (
                <div key={key}>
                  <span>{motion}</span>
                  <strong>{serviceByKey.get(key)?.priceDisplay}</strong>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="reset-section" aria-labelledby="pricing-summary-title">
          <div className="reset-shell">
            <header className="reset-heading">
              <h2 id="pricing-summary-title">Pricing summary</h2>
            </header>
            <div className="reset-table-wrap">
              <table className="pricing-summary-table">
                <thead>
                  <tr><th>Service</th><th>Starting price</th><th>Common use</th></tr>
                </thead>
                <tbody>
                  {pricingSummary.map((row) => {
                    const service = serviceByKey.get(row.key);
                    if (!service) return null;
                    return (
                      <tr
                        id={service.key === "ongoingSeo" ? service.servicesAnchor : undefined}
                        key={row.service}
                      >
                        <th scope="row">
                          <a
                            data-analytics-event="pricing_service_click"
                            data-analytics-price-display={service.priceDisplay}
                            data-analytics-service-name={service.label}
                            href={service.route}
                          >
                            {row.service}
                          </a>
                        </th>
                        <td>{service.priceDisplay.replace(/^From /, "")}</td>
                        <td>{row.use}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          className="reset-section reset-scopes"
          id="business-websites"
          aria-labelledby="pricing-scopes-title"
        >
          <div className="reset-shell">
            <header className="reset-heading">
              <h2 id="pricing-scopes-title">Business Website scope examples</h2>
            </header>
            <div className="reset-scope-grid">
              {websiteScopeExamples.map((scope) => (
                <article key={scope.servicesLabel}>
                  <h3>{scope.servicesLabel}</h3>
                  <p className="reset-price">{scope.servicesPrice}</p>
                  <p>{scope.servicesCopy}</p>
                </article>
              ))}
            </div>
            <p className="reset-scope-note">
              These are planning examples, not fixed packages. The written
              proposal defines the exact pages, functionality, content
              responsibilities, integrations, ownership, price, and third-party
              costs before work begins.
            </p>
          </div>
        </section>

        <section
          className="reset-section reset-hosting"
          aria-labelledby="pricing-hosting-title"
        >
          <div className="reset-shell reset-hosting__grid">
            <div className="reset-hosting__intro">
              <p className="reset-eyebrow">CLIENT-OWNED ELIGIBLE HOSTING</p>
              <h2 id="pricing-hosting-title">
                Hosting should not become a leash.
              </h2>
              <p>
                Many ordinary business websites do not need a traditional
                server or an agency-owned hosting subscription. When a website
                qualifies, Boho builds it for Cloudflare’s Free plan in an
                account controlled by the client.
              </p>
              <p className="reset-hosting__closing">
                The website build is paid. Eligible hosting is free. The account
                is yours.
              </p>
              <p className="reset-qualification">{hostingQualification}</p>
            </div>
          </div>
        </section>

        <section className="reset-section reset-quote-drivers" aria-labelledby="quote-drivers-title">
          <div className="reset-shell reset-quote-drivers__grid">
            <header className="reset-heading">
              <h2 id="quote-drivers-title">What can increase the scope?</h2>
            </header>
            <div>
              <ul>{quoteDrivers.map((driver) => <li key={driver}>{driver}</li>)}</ul>
              <p className="reset-scope-note">
                Public prices are planning guidance in U.S. dollars, not
                automatic quotes. The written proposal defines the exact work
                and price.
              </p>
            </div>
          </div>
        </section>

        <section className="reset-section reset-faq" aria-labelledby="pricing-faq-title">
          <div className="reset-shell reset-faq__grid">
            <header className="reset-heading">
              <h2 id="pricing-faq-title">Pricing FAQ</h2>
            </header>
            <div>
              {pricingFaqs.map(({ question, answer }) => (
                <FaqItem key={question} question={question}>
                  <p>{answer}</p>
                </FaqItem>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
