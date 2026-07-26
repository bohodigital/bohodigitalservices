import { commercialSection } from "../content/commercial/presentation";
import { Footer, Header } from "./commercial/CommercialChrome";
import styles from "./PricingPage.module.css";

const offerGroups = [
  {
    id: "initial-review",
    keys: ["initial-public-review"],
    aliases: [],
  },
  {
    id: "ongoing-seo",
    keys: ["seo-reporting", "seo-implementation"],
    aliases: [],
    image: "/visuals/services/ongoing-seo-v1.webp",
    imageAlt: "Search growth planning workspace",
  },
  {
    id: "websites",
    keys: ["focused-website-improvement", "new-website", "substantial-redesign"],
    aliases: ["web-design", "website-work", "hosting-email"],
    image: "/visuals/services/web-design-redesign-v1.webp",
    imageAlt: "Website design studio",
  },
  {
    id: "provider-rescue",
    keys: ["provider-rescue-assessment", "migration-assistance"],
    aliases: [],
    image: "/visuals/services/provider-rescue-v1.webp",
    imageAlt: "Website provider rescue workspace",
  },
  {
    id: "research-audits",
    keys: ["focused-audit-or-strategy"],
    aliases: ["audits-strategy"],
    image: "/visuals/services/research-audits-strategy-v1.webp",
    imageAlt: "Research and audit notebook",
  },
  {
    id: "custom-solutions",
    keys: ["custom-discovery", "focused-custom-build"],
    aliases: [],
    image: "/visuals/services/custom-digital-solutions-v1.webp",
    imageAlt: "Custom digital systems workspace",
  },
] as const;

export function PricingPage() {
  const hero = commercialSection("pricing", "hero");
  const notice = commercialSection("pricing", "general-notice");
  const drivers = commercialSection("pricing", "price-drivers");
  const credit = commercialSection("pricing", "paid-assessment-credit");
  const hosting = commercialSection("pricing", "hosting-and-email");
  const payment = commercialSection("pricing", "payment-and-scope");
  const finalCta = commercialSection("pricing", "final-cta");

  return (
    <>
      <Header />
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="commercial-pricing-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{hero.one("Eyebrow")}</p>
              <h1 id="commercial-pricing-title">{commercialSection("pricing", "pricing").one("Open Graph title")}</h1>
              <p>{hero.one("Body paragraph 1")}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className={styles.buttonRow}>
                <a className={styles.primaryButton} data-umami-event="commercial_primary_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                <a className={styles.secondaryButton} href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
            </div>
            <div className={styles.heroAside}>
              <figure className={styles.heroVisual}>
                <img alt="Growth analysis workspace" fetchPriority="high" src="/visuals/growth-analysis.webp" />
              </figure>
              <aside className={styles.notice}>
                <h2>{notice.one("Heading")}</h2>
                <p>{notice.one("Body paragraph 1")}</p>
                <p>{notice.one("Body paragraph 2")}</p>
                <p>{notice.one("Timeline qualification")}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.priceGuide} aria-label={commercialSection("pricing", "price-overview").one("Accessible label")}>
          <div className={styles.shell}>
            {offerGroups.map((group) => {
              const offers = group.keys.map((key) => ({ key, section: commercialSection("pricing", key) }));
              const isInitialReview = group.id === "initial-review";
              const isMultiOffer = offers.length > 1;
              const groupClassName = [
                styles.offerGroup,
                isInitialReview ? styles.initialReviewGroup : "",
                isMultiOffer ? styles.multiOfferGroup : styles.singleOfferGroup,
                group.id === "ongoing-seo" ? styles.wideOfferGroup : "",
              ].filter(Boolean).join(" ");
              return (
                <section
                  className={groupClassName}
                  data-offer-group={isInitialReview ? "initial" : isMultiOffer ? "multiple" : "single"}
                  id={group.id}
                  aria-labelledby={`${group.id}-title`}
                  key={group.id}
                >
                  {group.aliases.map((alias) => <span className={styles.anchorAlias} id={alias} key={alias} />)}
                  {"image" in group ? (
                    <figure className={styles.groupVisual}>
                      <img alt={group.imageAlt} loading="lazy" src={group.image} />
                    </figure>
                  ) : null}
                  <div className={styles.offers}>
                    {offers.map(({ key, section: offer }, index) => (
                      <article className={styles.offer} key={key}>
                        {key === "seo-reporting" ? <span className={styles.anchorAlias} id="analytics-reporting" /> : null}
                        <h2 id={index === 0 ? `${group.id}-title` : undefined}>{offer.one("Price")}</h2>
                        <p>{offer.one("Minimum-scope description")}</p>
                        <p>{offer.one("Planning range")}</p>
                        <p>{offer.one("Exclusion")}</p>
                        <a data-umami-event="commercial_pricing_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className={styles.drivers} aria-labelledby="price-drivers-title">
          <div className={`${styles.shell} ${styles.driversGrid}`}>
            <div>
              <h2 id="price-drivers-title">{drivers.one("Heading")}</h2>
              <p>{drivers.one("Intro")}</p>
            </div>
            <ul>{[drivers.one("Items"), ...drivers.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className={styles.policies} aria-labelledby="credit-title">
          <div className={`${styles.shell} ${styles.policyGrid}`}>
            <article><h2 id="credit-title">{credit.one("Heading")}</h2><p>{credit.one("Body")}</p></article>
            <article><h2>{hosting.one("Heading")}</h2><p>{hosting.one("Body")}</p></article>
            <article><h2>{payment.one("Heading")}</h2><p>{payment.one("Body paragraph 1")}</p><p>{payment.one("Body paragraph 2")}</p></article>
          </div>
        </section>

        <section className={styles.final} aria-labelledby="pricing-final-title">
          <div className={styles.shell}>
            <h2 id="pricing-final-title">{finalCta.one("Heading")}</h2>
            <p>{finalCta.one("Body")}</p>
            <div className={styles.buttonRow}>
              <a className={styles.primaryButton} data-umami-event="commercial_primary_cta" href={finalCta.one("Primary destination")}>{finalCta.one("Primary CTA")}</a>
              <a className={styles.secondaryButton} href={finalCta.one("Secondary destination")}>{finalCta.one("Secondary CTA")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
