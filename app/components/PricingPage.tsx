import { commercialSection } from "../content/commercial/presentation";
import { Footer, Header } from "./commercial/CommercialChrome";

const offerKeys = [
  "initial-public-review",
  "seo-reporting",
  "seo-implementation",
  "focused-website-improvement",
  "new-website",
  "substantial-redesign",
  "provider-rescue-assessment",
  "migration-assistance",
  "focused-audit-or-strategy",
  "custom-discovery",
  "focused-custom-build",
] as const;

export function PricingPage() {
  const hero = commercialSection("pricing", "hero");
  const notice = commercialSection("pricing", "general-notice");
  const overview = commercialSection("pricing", "price-overview");
  const drivers = commercialSection("pricing", "price-drivers");
  const credit = commercialSection("pricing", "paid-assessment-credit");
  const hosting = commercialSection("pricing", "hosting-and-email");
  const payment = commercialSection("pricing", "payment-and-scope");
  const finalCta = commercialSection("pricing", "final-cta");
  const offers = offerKeys.map((key) => commercialSection("pricing", key));
  const renderedAnchors = new Set<string>();

  return (
    <>
      <Header />
      <main className="commercial-page commercial-pricing-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="commercial-pricing-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="commercial-pricing-title">{commercialSection("pricing", "pricing").one("Open Graph title")}</h1>
              <p>{hero.one("Body paragraph 1")}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className="button-row">
                <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                <a className="button-link button-link--secondary" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
            </div>
            <aside className="commercial-hero__aside">
              <h2>{notice.one("Heading")}</h2>
              <p>{notice.one("Body paragraph 1")}</p>
              <p>{notice.one("Body paragraph 2")}</p>
              <p>{notice.one("Timeline qualification")}</p>
            </aside>
          </div>
        </section>

        <section className="commercial-section commercial-price-list" aria-label={overview.one("Accessible label")}>
          <span id="web-design" />
          <span id="analytics-reporting" />
          <span id="audits-strategy" />
          <span id="hosting-email" />
          <div className="section-shell commercial-price-list__grid">
            {offers.map((offer) => {
              const anchor = offer.one("Anchor").slice(1);
              const id = renderedAnchors.has(anchor) ? undefined : anchor;
              renderedAnchors.add(anchor);
              return (
              <article id={id} key={offer.one("Price")}>
                <h2>{offer.one("Price")}</h2>
                <p>{offer.one("Minimum-scope description")}</p>
                <p>{offer.one("Planning range")}</p>
                <p>{offer.one("Exclusion")}</p>
                <a data-umami-event="commercial_pricing_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
              </article>
              );
            })}
          </div>
        </section>

        <section className="commercial-section commercial-price-drivers" aria-labelledby="price-drivers-title">
          <div className="section-shell commercial-price-drivers__grid">
            <div>
              <h2 id="price-drivers-title">{drivers.one("Heading")}</h2>
              <p>{drivers.one("Intro")}</p>
            </div>
            <ul>{[drivers.one("Items"), ...drivers.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="commercial-section commercial-pricing-policies" aria-labelledby="credit-title">
          <div className="section-shell commercial-pricing-policies__grid">
            <article><h2 id="credit-title">{credit.one("Heading")}</h2><p>{credit.one("Body")}</p></article>
            <article><h2>{hosting.one("Heading")}</h2><p>{hosting.one("Body")}</p></article>
            <article><h2>{payment.one("Heading")}</h2><p>{payment.one("Body paragraph 1")}</p><p>{payment.one("Body paragraph 2")}</p></article>
          </div>
        </section>

        <section className="commercial-section commercial-final" aria-labelledby="pricing-final-title">
          <div className="section-shell">
            <h2 id="pricing-final-title">{finalCta.one("Heading")}</h2>
            <p>{finalCta.one("Body")}</p>
            <div className="button-row">
              <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={finalCta.one("Primary destination")}>{finalCta.one("Primary CTA")}</a>
              <a className="button-link button-link--secondary" href={finalCta.one("Secondary destination")}>{finalCta.one("Secondary CTA")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
