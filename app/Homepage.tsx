import {
  ButtonLink,
  FaqItem,
  Footer,
  Header,
} from "./components/SiteChrome";
import {
  canonicalServices,
  homepageFaqs,
  hostingQualification,
  proofProjects,
  websiteScopeExamples,
} from "./content/commercialReset";

const ownershipReceipt = [
  ["Website build", "From $850"],
  ["Eligible hosting", "$0/month"],
  ["Cloudflare account", "Yours"],
  ["Source code", "Included"],
  ["Boho access", "Revocable"],
  ["Active Boho contract required", "No"],
] as const;

const hostingSteps = [
  {
    heading: "Create the account",
    copy: "The business uses its own email and recovery information.",
  },
  {
    heading: "Invite Boho",
    copy: "Boho receives authorized access. Password sharing is not required.",
  },
  {
    heading: "Keep control",
    copy:
      "Continue with Boho, manage the site internally, or hire someone else. Leaving does not force a move or create a Boho hosting bill.",
  },
] as const;

const processSteps = [
  {
    heading: "Free review",
    copy: "Send the current website or describe the project.",
  },
  {
    heading: "Written scope",
    copy:
      "Boho defines the pages, work, ownership, boundaries, price, and required inputs before the project begins.",
  },
  {
    heading: "Build and review",
    copy:
      "The person explaining the project remains responsible for the work.",
  },
  {
    heading: "Launch and handoff",
    copy:
      "The approved site launches in the agreed account with source and operating information documented.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Boho Digital Services",
      itemListElement: canonicalServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.label,
          url: `https://bohodigitalservices.com${service.route}`,
          offers: {
            "@type": "Offer",
            name: `${service.label} — ${service.priceDisplay.toLowerCase()}`,
            price: service.startingPrice,
            priceCurrency: "USD",
            description: service.priceDisplay,
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: homepageFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="reset-home" id="main-content">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className="reset-hero" aria-labelledby="reset-hero-title">
          <div className="reset-shell reset-hero__grid">
            <div className="reset-hero__copy">
              <p className="reset-eyebrow">CUSTOM BUSINESS WEBSITES</p>
              <h1 id="reset-hero-title">
                Business websites from $850. Hosting stays free.
              </h1>
              <p className="reset-hero__body">
                Boho builds fast, credible websites for local businesses in a
                Cloudflare account your business owns. Eligible hosting costs $0
                per month. If you stop working with Boho, the website stays
                where it is.
              </p>
              <div className="reset-actions">
                <ButtonLink
                  data-analytics-event="free_review_click"
                  data-analytics-source-page="homepage"
                  data-analytics-source-section="hero"
                  data-analytics-service-context="business_websites"
                  href="/start/"
                >
                  Get a free website review
                </ButtonLink>
                <ButtonLink
                  data-analytics-event="pricing_click"
                  data-analytics-source-page="homepage"
                  data-analytics-source-section="hero"
                  href="/pricing/#business-websites"
                  variant="secondary"
                >
                  See website pricing
                </ButtonLink>
              </div>
              <p className="reset-qualification">{hostingQualification}</p>
            </div>

            <aside
              className="ownership-receipt"
              aria-label="Business website ownership and pricing"
            >
              <div className="ownership-receipt__heading">
                <span>Client ownership receipt</span>
                <strong>From $850</strong>
              </div>
              <dl>
                {ownershipReceipt.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="trust-strip" aria-label="Website ownership benefits">
          <div className="reset-shell">
            <ul>
              <li>Client-owned account</li>
              <li>Source and handoff included</li>
              <li>Direct technical lead</li>
              <li>No hosting penalty for leaving</li>
            </ul>
          </div>
        </section>

        <section
          className="reset-section reset-services"
          aria-labelledby="reset-services-title"
        >
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">FOUR WAYS TO WORK WITH BOHO</p>
              <h2 id="reset-services-title">
                Build it. Grow it. Fix it. Automate it.
              </h2>
              <p>Four services. Everything else is scope.</p>
            </header>
            <div className="reset-services__grid">
              {canonicalServices.map((service) => (
                <article
                  className={`reset-service-card reset-service-card--${service.key}`}
                  data-canonical-service-card
                  key={service.key}
                >
                  <p className="reset-eyebrow">{service.eyebrow}</p>
                  <p className="reset-price">{service.priceDisplay}</p>
                  <p>{service.homepageCopy}</p>
                  <a
                    data-analytics-event="service_card_click"
                    data-analytics-price-display={service.priceDisplay}
                    data-analytics-service-name={service.label}
                    data-analytics-source-page="homepage"
                    href={service.route}
                  >
                    {service.homepageCta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="reset-section reset-hosting"
          aria-labelledby="reset-hosting-title"
        >
          <div className="reset-shell reset-hosting__grid">
            <div className="reset-hosting__intro">
              <p className="reset-eyebrow">CLIENT-OWNED HOSTING</p>
              <h2 id="reset-hosting-title">
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
              <ButtonLink
                data-analytics-event="free_review_click"
                data-analytics-service-context="business_websites"
                data-analytics-source-page="homepage"
                data-analytics-source-section="client_owned_hosting"
                href="/start/"
              >
                Check whether my website qualifies
              </ButtonLink>
            </div>
            <ol className="reset-step-list">
              {hostingSteps.map((step, index) => (
                <li key={step.heading}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.heading}</h3>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="reset-section reset-scopes"
          id="business-websites"
          aria-labelledby="reset-scopes-title"
        >
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">ONE WEBSITE SERVICE</p>
              <h2 id="reset-scopes-title">
                The price changes with the work, not the label.
              </h2>
              <p>
                Every Boho website is a business website. The $850 starting
                price covers a small, complete static site. More pages, content,
                locations, and integrations increase the scope.
              </p>
            </header>
            <div className="reset-scope-grid">
              {websiteScopeExamples.map((scope) => (
                <article key={scope.heading}>
                  <h3>{scope.heading}</h3>
                  <p className="reset-price">{scope.price}</p>
                  <p>{scope.copy}</p>
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
          className="reset-section reset-proof"
          aria-labelledby="reset-proof-title"
        >
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">BUILT BY BOHO</p>
              <h2 id="reset-proof-title">Real systems. Live on the web.</h2>
              <p>
                These are Boho-owned properties, not client case studies. They
                demonstrate work that can be inspected directly; they do not
                establish client outcomes.
              </p>
            </header>
            <div className="reset-proof__grid">
              {proofProjects.map((project) => (
                <article key={project.name}>
                  <a
                    data-analytics-event="work_project_click"
                    data-analytics-destination-type="live_property"
                    data-analytics-project-name={project.name}
                    href={project.href}
                  >
                    <img
                      alt={project.alt}
                      height="800"
                      loading="lazy"
                      src={project.image}
                      width="1280"
                    />
                    <span className="reset-eyebrow">{project.label}</span>
                    <h3>{project.name}</h3>
                    <p>{project.copy}</p>
                  </a>
                </article>
              ))}
            </div>
            <div className="reset-section-action">
              <ButtonLink href="/work/" variant="secondary">
                See Boho’s work
              </ButtonLink>
            </div>
          </div>
        </section>

        <section
          className="reset-section reset-process"
          aria-labelledby="reset-process-title"
        >
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">A CLEAR PROJECT PATH</p>
              <h2 id="reset-process-title">From first review to launch.</h2>
            </header>
            <ol className="reset-process__grid">
              {processSteps.map((step, index) => (
                <li key={step.heading}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.heading}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="reset-section reset-faq"
          aria-labelledby="reset-faq-title"
        >
          <div className="reset-shell reset-faq__grid">
            <header className="reset-heading">
              <h2 id="reset-faq-title">Frequently asked questions</h2>
            </header>
            <div>
              {homepageFaqs.map(({ question, answer }) => (
                <FaqItem key={question} question={question}>
                  <p>{answer}</p>
                </FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section
          className="reset-section reset-final"
          aria-labelledby="reset-final-title"
        >
          <div className="reset-shell reset-final__grid">
            <div>
              <h2 id="reset-final-title">
                Could your next website cost $0 per month to host?
              </h2>
              <p>
                Send the current website or describe the business. Boho will
                tell you whether the $850 starting scope fits, whether eligible
                free hosting appears practical, and what would require a larger
                project.
              </p>
            </div>
            <div className="reset-actions">
              <ButtonLink
                data-analytics-event="free_review_click"
                data-analytics-source-page="homepage"
                data-analytics-source-section="final_cta"
                data-analytics-service-context="business_websites"
                href="/start/"
              >
                Get a free website review
              </ButtonLink>
              <ButtonLink href="/pricing/" variant="secondary">
                View all pricing
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
