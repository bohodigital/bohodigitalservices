import Link from "next/link";
import { commercialSection } from "../content/commercial/presentation";
import { Footer, Header } from "./commercial/CommercialChrome";
import {
  PricingOfferTracker,
  PricingSectionNav,
} from "./PricingInteractions";
import styles from "./PricingPage.module.css";

type PricingPath = "clarity" | "build-repair" | "ongoing";
type AnalyticsPath = "clarity" | "build_repair" | "ongoing";
type PricingChapter = "diagnose" | "build_repair" | "ongoing";
type BillingType = "free" | "one_time" | "monthly";

type PricingOfferConfig = {
  id: string;
  sectionKey: string;
  path: PricingPath;
  analyticsPath: AnalyticsPath;
  chapter: PricingChapter;
  name: string;
  bestFit: string;
  serviceHref: string;
  serviceLinkLabel: string;
  startLabel: string;
  billingType: BillingType;
  aliases?: ReadonlyArray<string>;
};

type PricingOffer = PricingOfferConfig & {
  priceRecord: string;
  numericPrice: number;
  startingScope: string;
  planningRange: string;
  exclusion: string;
  startHref: string;
};

const offerConfigs: ReadonlyArray<PricingOfferConfig> = [
  {
    id: "initial-review",
    sectionKey: "initial-public-review",
    path: "clarity",
    analyticsPath: "clarity",
    chapter: "diagnose",
    name: "Initial review",
    bestFit: "The business needs an initial fit and direction check before choosing a project.",
    serviceHref: "/services/",
    serviceLinkLabel: "Explore all five services",
    startLabel: "Start with an initial review",
    billingType: "free",
  },
  {
    id: "audit-research",
    sectionKey: "focused-audit-or-strategy",
    path: "clarity",
    analyticsPath: "clarity",
    chapter: "diagnose",
    name: "Review, audit, or research",
    bestFit: "The business needs a bounded investigation, documented finding, or decision-ready analysis.",
    serviceHref: "/services/research-audits-strategy/",
    serviceLinkLabel: "Explore research and technical audits",
    startLabel: "Discuss the investigation",
    billingType: "one_time",
    aliases: ["research-audits", "audits-strategy"],
  },
  {
    id: "provider-rescue-assessment",
    sectionKey: "provider-rescue-assessment",
    path: "clarity",
    analyticsPath: "clarity",
    chapter: "diagnose",
    name: "Provider rescue assessment",
    bestFit: "The business needs to understand ownership, access, risk, and migration requirements before anything moves.",
    serviceHref: "/services/provider-rescue/",
    serviceLinkLabel: "Explore provider rescue and migration",
    startLabel: "Start the rescue assessment",
    billingType: "one_time",
  },
  {
    id: "custom-discovery",
    sectionKey: "custom-discovery",
    path: "clarity",
    analyticsPath: "clarity",
    chapter: "diagnose",
    name: "Custom discovery and feasibility",
    bestFit: "The business is evaluating a custom tool, automation, integration, or unusual technical project.",
    serviceHref: "/services/custom-digital-solutions/",
    serviceLinkLabel: "Explore custom tools and automation",
    startLabel: "Discuss custom discovery",
    billingType: "one_time",
  },
  {
    id: "focused-website-improvement",
    sectionKey: "focused-website-improvement",
    path: "build-repair",
    analyticsPath: "build_repair",
    chapter: "build_repair",
    name: "Focused website improvement",
    bestFit: "An existing website has a sound foundation but needs one bounded, high-value change.",
    serviceHref: "/services/web-design-redesign/",
    serviceLinkLabel: "Explore website design and redesign",
    startLabel: "Discuss the website improvement",
    billingType: "one_time",
    aliases: ["websites", "web-design", "website-work"],
  },
  {
    id: "provider-rescue",
    sectionKey: "migration-assistance",
    path: "build-repair",
    analyticsPath: "build_repair",
    chapter: "build_repair",
    name: "Provider rescue or migration",
    bestFit: "The business needs to move carefully, preserve what still works, and recover control.",
    serviceHref: "/services/provider-rescue/",
    serviceLinkLabel: "Explore provider rescue and migration",
    startLabel: "Discuss the rescue project",
    billingType: "one_time",
  },
  {
    id: "new-website",
    sectionKey: "new-website",
    path: "build-repair",
    analyticsPath: "build_repair",
    chapter: "build_repair",
    name: "New website",
    bestFit: "The business needs a new, complete website with a bounded page plan and clear customer path.",
    serviceHref: "/services/web-design-redesign/",
    serviceLinkLabel: "Explore website design and redesign",
    startLabel: "Discuss the website project",
    billingType: "one_time",
  },
  {
    id: "substantial-redesign",
    sectionKey: "substantial-redesign",
    path: "build-repair",
    analyticsPath: "build_repair",
    chapter: "build_repair",
    name: "Substantial redesign",
    bestFit: "An existing website needs material structural, visual, mobile, ownership, or search-foundation change.",
    serviceHref: "/services/web-design-redesign/",
    serviceLinkLabel: "Explore website design and redesign",
    startLabel: "Discuss the redesign",
    billingType: "one_time",
  },
  {
    id: "focused-custom-build",
    sectionKey: "focused-custom-build",
    path: "build-repair",
    analyticsPath: "build_repair",
    chapter: "build_repair",
    name: "Focused custom build",
    bestFit: "The business needs one focused internal tool, integration, or automation for a defined task.",
    serviceHref: "/services/custom-digital-solutions/",
    serviceLinkLabel: "Explore custom tools and automation",
    startLabel: "Discuss the custom build",
    billingType: "one_time",
    aliases: ["custom-solutions"],
  },
  {
    id: "monthly-reporting",
    sectionKey: "seo-reporting",
    path: "ongoing",
    analyticsPath: "ongoing",
    chapter: "ongoing",
    name: "Analyst-reviewed monthly report",
    bestFit: "The business needs a human-reviewed view of performance, limitations, priorities, and next decisions.",
    serviceHref: "/services/research-audits-strategy/",
    serviceLinkLabel: "Explore research, reporting, and technical audits",
    startLabel: "Discuss reporting",
    billingType: "monthly",
    aliases: ["analytics-reporting"],
  },
  {
    id: "ongoing-seo",
    sectionKey: "seo-implementation",
    path: "ongoing",
    analyticsPath: "ongoing",
    chapter: "ongoing",
    name: "Ongoing SEO and search growth",
    bestFit: "The business needs recurring search implementation and continued improvement, not reporting alone.",
    serviceHref: "/services/ongoing-seo/",
    serviceLinkLabel: "Explore ongoing SEO and search growth",
    startLabel: "Discuss ongoing support",
    billingType: "monthly",
  },
];

const pathDefinitions = [
  {
    id: "clarity",
    analyticsPath: "clarity",
    number: "01",
    heading: "I need clarity first.",
    description: "Something is wrong, unclear, expensive, or incomplete, but the right project is not obvious yet.",
    offerIds: ["initial-review", "audit-research", "provider-rescue-assessment", "custom-discovery"],
    cta: "See diagnostic options",
    href: "#diagnose",
  },
  {
    id: "build-repair",
    analyticsPath: "build_repair",
    number: "02",
    heading: "I need something built or fixed.",
    description: "The business already knows which website, provider relationship, migration, or operating problem needs to change.",
    offerIds: ["focused-website-improvement", "provider-rescue", "website-project", "focused-custom-build"],
    cta: "See project pricing",
    href: "#build-repair",
  },
  {
    id: "ongoing",
    analyticsPath: "ongoing",
    number: "03",
    heading: "I need ongoing support.",
    description: "The business needs recurring measurement, search work, and continued improvement rather than a single finished project.",
    offerIds: ["monthly-reporting", "ongoing-seo"],
    cta: "Compare ongoing options",
    href: "#ongoing",
  },
] as const;

function startHref(path: PricingPath, offerId: string) {
  return `/start/?path=${path}&offer=${offerId}`;
}

function numericPrice(priceRecord: string) {
  if (priceRecord.endsWith("Free")) return 0;
  const match = priceRecord.match(/\$([\d,]+)/);
  if (!match) throw new Error(`Pricing record is missing a numeric amount: ${priceRecord}`);
  return Number(match[1].replaceAll(",", ""));
}

function createOffers(): ReadonlyArray<PricingOffer> {
  return offerConfigs.map((config) => {
    const section = commercialSection("pricing", config.sectionKey);
    const priceRecord = section.one("Price");
    return {
      ...config,
      priceRecord,
      numericPrice: numericPrice(priceRecord),
      startingScope: section.one("Minimum-scope description"),
      planningRange: section.one("Planning range"),
      exclusion: section.one("Exclusion"),
      startHref: startHref(config.path, config.id),
    };
  });
}

function priceOnly(priceRecord: string) {
  return priceRecord.split("—").at(-1)?.trim() ?? priceRecord;
}

function pathSummaryRows(
  pathId: string,
  offersById: ReadonlyMap<string, PricingOffer>,
) {
  if (pathId === "build-repair") {
    return [
      {
        id: "focused-website-improvement",
        label: "Focused website improvement",
        price: priceOnly(offersById.get("focused-website-improvement")?.priceRecord ?? ""),
      },
      {
        id: "provider-rescue",
        label: "Provider rescue or migration",
        price: priceOnly(offersById.get("provider-rescue")?.priceRecord ?? ""),
      },
      {
        id: "website-project",
        label: "New website or major redesign",
        price: priceOnly(offersById.get("new-website")?.priceRecord ?? ""),
      },
      {
        id: "focused-custom-build",
        label: "Focused custom build",
        price: priceOnly(offersById.get("focused-custom-build")?.priceRecord ?? ""),
      },
    ];
  }
  return pathDefinitions
    .find(({ id }) => id === pathId)
    ?.offerIds.map((id) => {
      const offer = offersById.get(id);
      return {
        id,
        label: offer?.name ?? id,
        price: priceOnly(offer?.priceRecord ?? ""),
      };
    }) ?? [];
}

function PricingOfferArticle({
  offer,
  estimateDriver,
  variant = "ledger",
}: {
  offer: PricingOffer;
  estimateDriver: string;
  variant?: "ledger" | "comparison";
}) {
  return (
    <PricingOfferTracker
      billingType={offer.billingType}
      chapter={offer.chapter}
      className={variant === "comparison" ? styles.comparisonOffer : styles.offerRow}
      offerId={offer.id}
      price={String(offer.numericPrice)}
    >
      {offer.aliases?.map((alias) => (
        <span className={styles.anchorAlias} id={alias} key={alias} />
      ))}
      <div className={styles.offerIdentity}>
        <h3>{offer.name}</h3>
        <p className={styles.priceRecord}>{offer.priceRecord}</p>
      </div>
      <div className={styles.offerDetails}>
        <div>
          <h4>Use this when</h4>
          <p>{offer.bestFit}</p>
        </div>
        <div>
          <h4>What the starting scope covers</h4>
          <p>{offer.startingScope}</p>
        </div>
        <div>
          <h4>What changes the estimate</h4>
          <p>{estimateDriver}</p>
        </div>
        <div>
          <h4>Planning range</h4>
          <p>{offer.planningRange}</p>
        </div>
        <div>
          <h4>Scope boundary</h4>
          <p>{offer.exclusion}</p>
        </div>
      </div>
      <div className={styles.offerActions}>
        <a
          data-umami-event="pricing_service_click"
          data-umami-event-chapter={offer.chapter}
          data-umami-event-offer_id={offer.id}
          data-umami-event-service_path={offer.serviceHref}
          href={offer.serviceHref}
        >
          {offer.serviceLinkLabel}
        </a>
        <a
          className={styles.offerStart}
          data-umami-event="pricing_start_click"
          data-umami-event-offer_id={offer.id}
          data-umami-event-path={offer.analyticsPath}
          data-umami-event-source_section={offer.chapter}
          href={offer.startHref}
        >
          {offer.startLabel}
        </a>
      </div>
    </PricingOfferTracker>
  );
}

export function PricingPage() {
  const offers = createOffers();
  const offersById = new Map(offers.map((offer) => [offer.id, offer]));
  const notice = commercialSection("pricing", "general-notice");
  const drivers = commercialSection("pricing", "price-drivers");
  const credit = commercialSection("pricing", "paid-assessment-credit");
  const hosting = commercialSection("pricing", "hosting-and-email");
  const payment = commercialSection("pricing", "payment-and-scope");
  const diagnoseOffers = offers.filter(({ chapter }) => chapter === "diagnose");
  const buildOffers = offers.filter(({ chapter }) => chapter === "build_repair");
  const ongoingOffers = offers.filter(({ chapter }) => chapter === "ongoing");
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
        itemListElement: offers.map((offer, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Offer",
            name: offer.name,
            price: offer.numericPrice,
            priceCurrency: "USD",
            url: `https://bohodigitalservices.com/pricing/#${offer.id}`,
            category: offer.chapter,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={styles.hero} aria-labelledby="commercial-pricing-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Pricing</p>
              <h1 id="commercial-pricing-title">Clear starting prices for websites, SEO, rescue, and custom digital work.</h1>
              <p>Choose the situation that best matches the business. Each path shows a credible starting price, what the first scope is meant to accomplish, and what can change the estimate.</p>
              <div className={styles.buttonRow}>
                <Link
                  className={styles.primaryButton}
                  data-umami-event="pricing_start_click"
                  data-umami-event-offer_id="initial-review"
                  data-umami-event-path="clarity"
                  data-umami-event-source_section="hero"
                  href="/start/?path=clarity&offer=initial-review"
                >
                  Start with an initial review
                </Link>
                <a
                  className={styles.secondaryButton}
                  data-umami-event="pricing_path_select"
                  data-umami-event-path="clarity"
                  data-umami-event-source="hero"
                  href="#pricing-paths"
                >
                  Find your pricing path
                </a>
              </div>
              <p className={styles.reassurance}>You do not need to diagnose the solution before starting.</p>
            </div>
            <div className={styles.heroAside}>
              <figure className={styles.heroVisual}>
                <img alt="Growth analysis workspace" fetchPriority="high" src="/visuals/growth-analysis.webp" />
              </figure>
              <aside className={styles.notice} aria-label={notice.one("Heading")}>
                <strong>{notice.one("Heading")}</strong>
                <p>{notice.one("Body paragraph 1")}</p>
              </aside>
            </div>
          </div>
        </section>

        <div className={styles.sectionNav}>
          <div className={styles.shell}>
            <PricingSectionNav
              links={[
                { id: "pricing-paths", label: "Overview" },
                { id: "diagnose", label: "Diagnose", path: "clarity" },
                { id: "build-repair", label: "Build or repair", path: "build_repair" },
                { id: "ongoing", label: "Ongoing", path: "ongoing" },
                { id: "how-pricing-works", label: "How pricing works" },
              ]}
            />
          </div>
        </div>

        <section className={styles.pathSection} id="pricing-paths" aria-labelledby="pricing-paths-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Choose by situation</p>
              <h2 id="pricing-paths-title">Start with the situation.</h2>
              <p>Boho services overlap because business systems overlap. Start with the situation rather than trying to choose the technical label first.</p>
            </header>
            <div className={styles.pathGrid}>
              {pathDefinitions.map((path) => (
                <article className={styles.pathLane} key={path.id}>
                  <p className={styles.pathNumber}>{path.number}</p>
                  <h3>{path.heading}</h3>
                  <p>{path.description}</p>
                  <ul>
                    {pathSummaryRows(path.id, offersById).map((row) => (
                      <li key={row.id}>
                        <span>{row.label}</span>
                        <strong>{row.price}</strong>
                      </li>
                    ))}
                  </ul>
                  <a
                    data-umami-event="pricing_path_select"
                    data-umami-event-path={path.analyticsPath}
                    data-umami-event-source="decision_map"
                    href={path.href}
                  >
                    {path.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.diagnose}`} id="diagnose" aria-labelledby="diagnose-title">
          <div className={styles.shell}>
            <div className={styles.chapterIntro}>
              <div>
                <p className={styles.chapterNumber}>01 / Clarity first</p>
                <h2 id="diagnose-title">Diagnose before you commit.</h2>
                <p>Use these options when the next useful project is not yet clear, when an outside proposal needs scrutiny, or when the business needs evidence before spending more.</p>
              </div>
              <figure className={styles.chapterVisual}>
                <img alt="Research and technical audit notebook" loading="lazy" src="/visuals/services/research-audits-strategy-v1.webp" />
              </figure>
            </div>
            <div className={styles.offerLedger}>
              {diagnoseOffers.map((offer) => (
                <PricingOfferArticle
                  estimateDriver={drivers.one("Intro")}
                  key={offer.id}
                  offer={offer}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.build}`} id="build-repair" aria-labelledby="build-repair-title">
          <div className={styles.shell}>
            <div className={styles.chapterIntro}>
              <div>
                <p className={styles.chapterNumber}>02 / Defined project</p>
                <h2 id="build-repair-title">Build or repair.</h2>
                <p>Use these options when the business can identify the asset, system, or provider relationship that needs to change.</p>
              </div>
              <figure className={styles.chapterVisual}>
                <img alt="Website design and controlled technical work" loading="lazy" src="/visuals/services/web-design-redesign-v1.webp" />
              </figure>
            </div>
            <div className={styles.ledgerLabels} aria-hidden="true">
              <span>Offer and starting price</span>
              <span>Best fit, scope, and boundaries</span>
              <span>Next action</span>
            </div>
            <div className={styles.offerLedger}>
              {buildOffers.map((offer) => (
                <PricingOfferArticle
                  estimateDriver={drivers.one("Intro")}
                  key={offer.id}
                  offer={offer}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.chapter} ${styles.ongoing}`} id="ongoing" aria-labelledby="ongoing-title">
          <div className={styles.shell}>
            <div className={styles.chapterIntro}>
              <div>
                <p className={styles.chapterNumber}>03 / Recurring relationship</p>
                <h2 id="ongoing-title">Operate and improve.</h2>
                <p>These are recurring relationships. Choose reporting when the business needs interpretation and direction. Choose ongoing SEO when it needs continued implementation and improvement.</p>
              </div>
              <figure className={styles.chapterVisual}>
                <img alt="Search growth planning workspace" loading="lazy" src="/visuals/services/ongoing-seo-v1.webp" />
              </figure>
            </div>
            <div className={styles.comparisonIntro} aria-label="Monthly reporting and ongoing SEO comparison">
              <div><span>Monthly reporting</span><strong>{priceOnly(offersById.get("monthly-reporting")?.priceRecord ?? "")}</strong><p>Measurement and interpretation</p></div>
              <div><span>Ongoing SEO</span><strong>{priceOnly(offersById.get("ongoing-seo")?.priceRecord ?? "")}</strong><p>Continued search improvement</p></div>
            </div>
            <div className={styles.comparisonGrid}>
              {ongoingOffers.map((offer) => (
                <PricingOfferArticle
                  estimateDriver={drivers.one("Intro")}
                  key={offer.id}
                  offer={offer}
                  variant="comparison"
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.mechanics} id="how-pricing-works" aria-labelledby="how-pricing-works-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Commercial mechanics</p>
              <h2 id="how-pricing-works-title">How Boho pricing works.</h2>
              <p>Published prices make comparison possible. The written scope still controls the actual work, responsibilities, timing, and outside costs.</p>
            </header>
            <div className={styles.policyGrid}>
              <article>
                <p className={styles.policyNumber}>01</p>
                <h3>{notice.one("Heading")}</h3>
                <p>{notice.one("Body paragraph 1")}</p>
                <p>{notice.one("Body paragraph 2")}</p>
                <p>{notice.one("Timeline qualification")}</p>
                <p>{notice.one("Results limitation")}</p>
              </article>
              <article>
                <p className={styles.policyNumber}>02</p>
                <h3>{drivers.one("Heading")}</h3>
                <p>{drivers.one("Intro")}</p>
                <ul>{[drivers.one("Items"), ...drivers.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article className={styles.creditPolicy}>
                <p className={styles.policyNumber}>03</p>
                <h3>{credit.one("Heading")}</h3>
                <p>{credit.one("Body")}</p>
                <p>{credit.one("Clarification")}</p>
              </article>
              <article>
                <span className={styles.anchorAlias} id="hosting-email" />
                <p className={styles.policyNumber}>04</p>
                <h3>Operating terms</h3>
                <h4>{hosting.one("Heading")}</h4>
                <p>{hosting.one("Body")}</p>
                <p>{hosting.one("Clarification")}</p>
                <h4>{payment.one("Heading")}</h4>
                <p>{payment.one("Body paragraph 1")}</p>
                <p>{payment.one("Body paragraph 2")}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.final} aria-labelledby="pricing-final-title">
          <div className={`${styles.shell} ${styles.finalGrid}`}>
            <div>
              <p className={styles.eyebrow}>Smallest credible next step</p>
              <h2 id="pricing-final-title">Not sure where to begin?</h2>
              <p>Describe what is broken, unclear, slow, expensive, or stuck. Boho will identify the smallest credible starting point and explain why it makes sense.</p>
            </div>
            <div className={styles.buttonRow}>
              <Link
                className={styles.primaryButton}
                data-umami-event="pricing_start_click"
                data-umami-event-offer_id="initial-review"
                data-umami-event-path="clarity"
                data-umami-event-source_section="final_cta"
                href="/start/?path=clarity&offer=initial-review"
              >
                Start with an initial review
              </Link>
              <Link className={styles.secondaryButton} href="/contact/">Talk to someone technical</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
