import Link from "next/link";
import {
  emailBenefitCopy,
  hostingQualification,
} from "../../content/commercialReset";
import { serviceAsset } from "../../content/serviceAssets";
import { LayeredInfrastructureVisual } from "../SystemsVisuals";

const hostingArchitecture = serviceAsset("hosting-architecture");

const routeLayers = {
  "/services/ongoing-seo/": {
    canonicalName: "Ongoing SEO & Local Growth",
    eyebrow: "ONGOING SEO & LOCAL GROWTH · FROM $450/MONTH",
    headline: "Make the business easier to find, understand, and choose.",
    body:
      "Boho combines technical SEO, local visibility, content improvement, customer-path work, analytics, and implementation around the priorities that matter to the business.",
    price: 450,
    priceDisplay: "From $450/month",
    primaryCta: "Improve search visibility",
    secondaryCta: "See pricing",
    secondaryHref: "/pricing/#ongoing-seo",
  },
  "/services/web-design-redesign/": {
    canonicalName: "Business Websites",
    eyebrow: "BUSINESS WEBSITES · FROM $850",
    headline: "A complete business website, built to be clear, fast, and yours.",
    body:
      "Boho builds new websites and responsibly replaces weak ones. Straightforward static websites start at $850 and include eligible $0 hosting in a Cloudflare account controlled by the client.",
    price: 850,
    priceDisplay: "From $850",
    primaryCta: "Plan a business website",
    secondaryCta: "See website pricing",
    secondaryHref: "/pricing/#business-websites",
  },
  "/services/provider-rescue/": {
    canonicalName: "Website Help",
    eyebrow: "WEBSITE HELP · PROVIDER RESCUE",
    headline: "Leave the bad provider without losing control or useful assets.",
    body:
      "Boho helps businesses review ownership, recover authorized control, preserve useful content and URLs, plan a clean exit, migrate systems, verify important customer and search functions, and document the new arrangement.",
    price: 200,
    priceDisplay: "From $200",
    primaryCta: "Get website help",
    secondaryCta: "See all Website Help",
    secondaryHref: "/services/#website-help",
  },
  "/services/custom-digital-solutions/": {
    canonicalName: "Custom Systems",
    eyebrow: "CUSTOM SYSTEMS · FROM $1,500",
    headline: "Automate repeated work when the business case is real.",
    body:
      "Boho builds focused tools, integrations, publishing systems, internal dashboards, data workflows, and automation when ordinary software does not solve the actual job.",
    price: 1500,
    priceDisplay: "From $1,500",
    primaryCta: "Discuss a custom system",
    secondaryCta: "See pricing",
    secondaryHref: "/pricing/",
  },
  "/services/research-audits-strategy/": {
    canonicalName: "Website Help",
    eyebrow: "WEBSITE HELP · RESEARCH, AUDITS, AND STRATEGY",
    headline: "Find the decision before buying the implementation.",
    body:
      "Boho studies websites, search visibility, markets, competitors, providers, customer paths, and measurement systems to identify which digital improvements are most likely to deserve attention.",
    price: 200,
    priceDisplay: "From $200",
    primaryCta: "Get a focused review",
    secondaryCta: "See all Website Help",
    secondaryHref: "/services/#website-help",
  },
} as const;

type CommercialServiceRoute = keyof typeof routeLayers;

export function isCommercialServiceRoute(
  route: string,
): route is CommercialServiceRoute {
  return route in routeLayers;
}

function RouteSpecificDetails({ route }: { route: CommercialServiceRoute }) {
  if (route === "/services/web-design-redesign/") {
    return (
      <>
        <article>
          <h2>Business Websites — starting at $850</h2>
          <p>
            The $850 starting scope is generally a small, complete static
            website with up to five straightforward pages, one primary customer
            action, limited templates, client-supplied or lightly edited
            content, responsive implementation, basic accessibility treatment,
            search foundations, a simple contact path, launch checks, and
            handoff documentation.
          </p>
          <p>
            More pages, content, locations, integrations, migration, redirects,
            ecommerce, customer accounts, custom applications, technical
            damage, or accelerated delivery increase the quote.
          </p>
        </article>
        <article>
          <h2>Eligible client-owned hosting</h2>
          <p>
            Eligible sites are deployed to Cloudflare’s Free plan in an account
            controlled by the client. Boho receives authorized access rather
            than ownership. Leaving Boho does not by itself create a hosting
            charge or require the website to move.
          </p>
          <p>
            Domain registration, paid providers, ongoing maintenance, support,
            and infrastructure beyond the Free plan are separate. Cloudflare
            controls its plan, terms, limits, and availability.
          </p>
        </article>
        <figure
          className="reset-detail-architecture"
          data-service-visual-module="hosting-architecture"
        >
          <img
            alt={hostingArchitecture.alt}
            decoding="async"
            height={hostingArchitecture.height}
            loading="lazy"
            sizes="(max-width: 54rem) 100vw, 72rem"
            src={hostingArchitecture.src}
            width={hostingArchitecture.width}
          />
          <figcaption>{hostingArchitecture.caption}</figcaption>
        </figure>
        <LayeredInfrastructureVisual
          includeServiceVisualIndex={false}
          seenTerms={new Set<string>()}
        />
        <article>
          <h2>Frequently asked questions</h2>
          <details open>
            <summary>Can you really build a website starting at $850?</summary>
            <p>
              The $850 starting scope is generally a small, complete static
              website with up to five straightforward pages, one primary
              customer action, limited templates, client-supplied or lightly
              edited content, responsive implementation, basic accessibility
              treatment, search foundations, a simple contact path, launch
              checks, and handoff documentation.
            </p>
          </details>
          <details>
            <summary>Does ecommerce qualify for the $850 starting scope?</summary>
            <p>
              No. Ecommerce, customer accounts, custom payment flows, live
              databases, and complex booking logic receive a separate written
              scope and quote.
            </p>
          </details>
          <details>
            <summary>Does hosting remain free if I leave Boho?</summary>
            <p>
              Leaving Boho does not create a hosting charge from us. The website
              remains in the client’s Cloudflare account. Cloudflare controls
              its own plans, terms, limits, and future availability.
            </p>
          </details>
        </article>
      </>
    );
  }

  if (route === "/services/ongoing-seo/") {
    return (
      <>
        <article>
          <h2>Ongoing SEO &amp; Local Growth — starting at $450 per month</h2>
          <p>
            The $450 starting retainer is for one straightforward website and
            market with a narrow but complete recurring scope. Additional
            websites, locations, content production, integrations, meetings, or
            larger implementation capacity increase the price.
          </p>
        </article>
        <article>
          <h2>Reporting supports the work. It is not the work.</h2>
          <p>
            Every eligible SEO &amp; Local Growth cycle includes a concise
            record of what was reviewed, what changed, what remains uncertain,
            and what should happen next. The public service begins at $450 per
            month and includes implementation; Boho does not position a
            dashboard-only report as its main SEO offer.
          </p>
        </article>
        <article>
          <h2>Free business email with active SEO.</h2>
          <p>{emailBenefitCopy}</p>
        </article>
        <article>
          <h2>Frequently asked questions</h2>
          <details open>
            <summary>Is website hosting tied to the SEO retainer?</summary>
            <p>
              Client-owned eligible static hosting may remain free without an
              active Boho retainer. The included business-email benefit exists
              only while the eligible SEO retainer remains active and current.
            </p>
          </details>
          <details>
            <summary>Is business email included?</summary>
            <p>{emailBenefitCopy}</p>
          </details>
        </article>
      </>
    );
  }

  if (route === "/services/provider-rescue/") {
    return (
      <article>
        <h2>Website Help — starting at $200</h2>
        <p>
          Provider rescue and migration are forms of Website Help. The $200
          starting price applies to one bounded issue or diagnosis. Larger
          ownership recovery, provider exit, migration, redirect, email,
          analytics, or launch work receives a written quote after review.
        </p>
      </article>
    );
  }

  if (route === "/services/research-audits-strategy/") {
    return (
      <article>
        <h2>Website Help — starting at $200</h2>
        <p>
          A focused audit or investigation is a form of Website Help when one
          defined website, search, analytics, provider, migration, or technical
          question needs to be understood. Larger research projects receive a
          written quote after the initial review.
        </p>
      </article>
    );
  }

  return (
    <>
      <article>
        <h2>Custom Systems — starting at $1,500</h2>
        <p>
          The $1,500 starting scope applies to one focused tool, integration, or
          automation with a defined workflow, limited users or systems, bounded
          inputs and outputs, standard deployment, testing, and documentation.
        </p>
        <p>
          More users, integrations, sensitive data, authentication, payments,
          high availability, large migrations, or ongoing support increase the
          scope.
        </p>
      </article>
      <article>
        <h2>Discovery</h2>
        <p>
          Discovery is not a separate public product. When additional paid
          discovery is necessary, the proposal must define its scope and price
          before work begins and state whether it will be credited toward the
          related approved build.
        </p>
      </article>
    </>
  );
}

export function CommercialServiceLayer({
  route,
}: {
  route: CommercialServiceRoute;
}) {
  const layer = routeLayers[route];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: layer.canonicalName,
    url: `https://bohodigitalservices.com${route}`,
    description: layer.body,
    offers: {
      "@type": "Offer",
      name: `${layer.canonicalName} — ${layer.priceDisplay}`,
      price: layer.price,
      priceCurrency: "USD",
      description: layer.priceDisplay,
    },
  };

  return (
    <section
      className="reset-detail-hero"
      aria-labelledby="commercial-service-title"
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <div className="reset-shell">
        <header className="reset-detail-hero__heading">
          <div>
            <p className="reset-eyebrow">{layer.eyebrow}</p>
            <h1 id="commercial-service-title">{layer.headline}</h1>
            <p>{layer.body}</p>
            {route === "/services/web-design-redesign/" ? (
              <p className="reset-qualification">{hostingQualification}</p>
            ) : null}
          </div>
          <p className="reset-price">{layer.priceDisplay}</p>
        </header>
        <div className="reset-detail-hero__actions">
          <Link
            className="button-link button-link--primary"
            data-analytics-event={
              route === "/services/web-design-redesign/"
                ? "free_review_click"
                : "service_card_click"
            }
            data-analytics-price-display={layer.priceDisplay}
            data-analytics-service-context={layer.canonicalName}
            data-analytics-service-name={layer.canonicalName}
            data-analytics-source-page={route}
            data-analytics-source-section="hero"
            href="/start/"
          >
            {layer.primaryCta}
          </Link>
          <Link
            className="button-link button-link--secondary"
            href={layer.secondaryHref}
          >
            {layer.secondaryCta}
          </Link>
        </div>
        <div className="reset-detail-hero__details">
          <RouteSpecificDetails route={route} />
        </div>
      </div>
    </section>
  );
}
