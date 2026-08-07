import Link from "next/link";

import {
  canonicalServices,
  emailBenefitCopy,
  hostingQualification,
  pricingFaqs,
  websiteScopeExamples,
} from "../content/commercialReset";
import { ButtonLink, FaqItem, Footer, Header } from "./SiteChrome";
import styles from "./day-one-commercial.module.css";

const pricingSummary = [
  {
    key: "businessWebsites",
    use: "New website, redesign, local-business site, or responsible replacement.",
    anchor: "business-websites",
  },
  {
    key: "ongoingSeo",
    use: "Continued search, local, content, technical, analytics, and conversion improvement.",
    anchor: "ongoing-seo",
  },
  {
    key: "websiteHelp",
    use: "Repair, audit, provider issue, migration question, accessibility, analytics, or ownership problem.",
    anchor: "website-help",
  },
  {
    key: "customSystems",
    use: "Tool, integration, workflow, publishing system, dashboard, or automation.",
    anchor: "custom-solutions",
  },
] as const;

const quoteDrivers = [
  "More pages or unique templates",
  "More substantial copy and content work",
  "Multiple services, locations, markets, or systems",
  "Missing or disorganized business information",
  "Content migration and redirect requirements",
  "Provider or ownership problems",
  "Third-party integrations",
  "Customer accounts, payments, or live data",
  "Accelerated delivery",
  "Additional meetings, approvals, or stakeholders",
  "Unusual security, accessibility, legal, or operational requirements",
] as const;

const ownershipNodes = [
  ["Domain", "Client account"],
  ["DNS", "Documented"],
  ["Hosting", "Eligible $0 plan"],
  ["Repository", "Client access"],
  ["Analytics", "Named owner"],
  ["Handoff", "Recorded"],
] as const;

const serviceByKey = new Map(canonicalServices.map((service) => [service.key, service]));

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
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Offer",
            name: "Provider Rescue — Website Help from $200",
            price: 200,
            priceCurrency: "USD",
            url: "https://bohodigitalservices.com/services/provider-rescue/",
          },
        },
        ...canonicalServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 2,
          item: {
            "@type": "Offer",
            name: `${service.label} — ${service.priceDisplay}`,
            price: service.startingPrice,
            priceCurrency: "USD",
            description: service.priceDisplay,
            url: `https://bohodigitalservices.com${service.route}`,
          },
        })),
      ],
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
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={styles.hero} aria-labelledby="pricing-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Pricing</span>
              </nav>
              <p className={styles.eyebrow}>Public starting prices · written scope</p>
              <h1 id="pricing-title">Four services. Clear starting prices. No ownership surprises.</h1>
              <p className={styles.heroLead}>
                Start with the outcome the business needs. The written proposal
                defines the exact deliverables, price, dependencies, ownership,
                exclusions, and third-party costs before work begins.
              </p>
              <p className={styles.heroSupport}>
                Provider Rescue remains visible because leaving a bad provider is
                not the same decision as ordering a generic repair—even when the
                smallest paid scope begins through Website Help.
              </p>
              <div className={styles.actions}>
                <ButtonLink
                  data-analytics-event="free_review_click"
                  data-analytics-service-context="general"
                  data-analytics-source-page="pricing"
                  data-analytics-source-section="hero"
                  href="/start/"
                >
                  Get a free website review
                </ButtonLink>
                <ButtonLink href="/services/provider-rescue/" variant="secondary">
                  Review Provider Rescue
                </ButtonLink>
              </div>
              <p className={styles.trustLine}>
                <span>U.S. dollars</span>
                <span>Planning guidance</span>
                <span>No automatic quote</span>
              </p>
            </div>

            <aside className={styles.priceConsole} aria-label="Starting price ledger">
              <div className={styles.consoleTopline}>
                <span>Planning ledger</span>
                <span className={styles.consoleLight}>Public</span>
              </div>
              <div className={styles.priceConsoleRows}>
                {pricingSummary.map(({ key }) => {
                  const service = serviceByKey.get(key);
                  if (!service) return null;
                  return (
                    <div className={styles.priceConsoleRow} key={key}>
                      <span>{service.label}</span>
                      <strong>{service.priceDisplay}</strong>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft} ${styles.sectionAccent}`} aria-labelledby="pricing-summary-title">
          <div className={styles.shell}>
            <article className={styles.providerStrip} id="provider-rescue">
              <div>
                <p className={styles.cardEyebrow}>Featured route · protect continuity first</p>
                <h2 id="pricing-summary-title">Provider Rescue</h2>
                <p>Map ownership, access, dependencies, working URLs, forms, and measurement before leaving an unsuitable provider.</p>
              </div>
              <strong>Help from $200</strong>
              <Link
                data-analytics-event="pricing_click"
                data-analytics-source-page="pricing"
                data-analytics-source-section="provider_rescue"
                href="/services/provider-rescue/"
              >
                See rescue scope →
              </Link>
            </article>

            <div className={styles.offerGrid}>
              {pricingSummary.map((row, index) => {
                const service = serviceByKey.get(row.key);
                if (!service) return null;
                return (
                  <Link
                    aria-label={`${service.label}: ${service.priceDisplay}. ${service.servicesCta}`}
                    className={styles.offerCard}
                    data-analytics-event="pricing_click"
                    data-analytics-price-display={service.priceDisplay}
                    data-analytics-service-name={service.label}
                    data-analytics-source-page="pricing"
                    data-analytics-source-section="offer_mosaic"
                    href={service.route}
                    id={row.anchor}
                    key={service.key}
                  >
                    <span className={styles.offerStep}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.offerPrice}>{service.priceDisplay}</span>
                    <h3>{service.label}</h3>
                    <p className={styles.offerUse}>{row.use}</p>
                    {service.key === "websiteHelp" ? <span className={styles.offerNote} id="research-audits">Focused audits and strategy are scoped here.</span> : null}
                    <span className={styles.cardAction}>{service.servicesCta} →</span>
                  </Link>
                );
              })}
            </div>

            <aside className={styles.emailBenefit}>
              <div>
                <p className={styles.cardEyebrow}>Eligible active SEO plans</p>
                <h3>Business email is a benefit, not a table footnote.</h3>
              </div>
              <div>
                {emailBenefitCopy.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="pricing-scopes-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Planning examples</p>
                <h2 id="pricing-scopes-title">Business Website scope examples</h2>
              </div>
              <p>These examples make the starting point concrete without pretending every business needs the same page count or system.</p>
            </header>
            <div className={styles.scopeGrid}>
              {websiteScopeExamples.map((scope) => (
                <article className={styles.scopeCard} key={scope.servicesLabel}>
                  <h3>{scope.servicesLabel}</h3>
                  <strong className={styles.scopePrice}>{scope.servicesPrice}</strong>
                  <p>{scope.servicesCopy}</p>
                </article>
              ))}
            </div>
            <p className={styles.scopeNote}>
              These are planning examples, not fixed packages. The written proposal
              defines the exact pages, functionality, content responsibilities,
              integrations, ownership, price, and third-party costs before work begins.
            </p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="pricing-hosting-title">
          <div className={`${styles.shell} ${styles.ownershipGrid}`}>
            <div className={styles.ownershipCopy}>
              <p className={styles.eyebrow}>Client-owned eligible hosting</p>
              <h2 id="pricing-hosting-title">Hosting should not become a leash.</h2>
              <p>
                Many ordinary business websites do not need a traditional server or
                agency-owned hosting subscription. When a website qualifies, Boho
                builds it for Cloudflare’s Free plan in an account controlled by the client.
              </p>
              <p><strong>The website build is paid. Eligible hosting is free. The account is yours.</strong></p>
              <p className={styles.priceQualification}>{hostingQualification}</p>
            </div>
            <div className={styles.ownershipMap} aria-label="Client ownership example">
              {ownershipNodes.map(([label, state]) => (
                <div key={label}><span>{state}</span><strong>{label}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="quote-drivers-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Scope is the price mechanism</p>
                <h2 id="quote-drivers-title">What can increase the scope?</h2>
              </div>
              <p>Public prices are planning guidance, not automatic quotes. Complexity becomes visible before paid work begins.</p>
            </header>
            <ul className={styles.quoteGrid}>
              {quoteDrivers.map((driver) => <li key={driver}>{driver}</li>)}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="pricing-faq-title">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <div>
              <p className={styles.eyebrow}>Before a proposal</p>
              <h2 id="pricing-faq-title">Pricing FAQ</h2>
            </div>
            <div>
              {pricingFaqs.map(({ question, answer }) => (
                <FaqItem key={question} question={question}><p>{answer}</p></FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="pricing-final-title">
          <div className={`${styles.shell} ${styles.finalGrid}`}>
            <div>
              <p className={styles.eyebrow}>Start with the actual system</p>
              <h2 id="pricing-final-title">Get the smallest useful recommendation first.</h2>
              <p>Send the current website or describe the situation. Boho will identify the likely service, scope boundary, and next decision.</p>
            </div>
            <div className={styles.actions}>
              <ButtonLink
                data-analytics-event="free_review_click"
                data-analytics-service-context="general"
                data-analytics-source-page="pricing"
                data-analytics-source-section="final_cta"
                href="/start/"
              >
                Get a free website review
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
