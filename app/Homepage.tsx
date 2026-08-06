import Image from "next/image";
import Link from "next/link";

import styles from "./front-door-home.module.css";
import { ButtonLink, FaqItem, Footer, Header } from "./components/SiteChrome";
import { audiencePages } from "./content/audiencePages";
import { commercialSection } from "./content/commercial/presentation";
import {
  canonicalServicesByKey,
  freeReview,
  freeReviewPage,
  providerRescuePage,
  sharedScopeNote,
} from "./content/commercialReset";
import { demoProjects } from "./content/demoLibrary";

const hero = commercialSection("homepage", "1-hero");
const problemChooser = commercialSection("homepage", "3-problem-chooser");
const ownership = commercialSection(
  "homepage",
  "6-ownership-and-provider-rescue-map",
);
const principles = commercialSection("homepage", "9-operating-principles");
const finalIntake = commercialSection(
  "homepage",
  "10-final-intake-section",
);
const pricingHero = commercialSection("pricing", "hero");

const websiteHelp = canonicalServicesByKey.get("websiteHelp");
const businessWebsites = canonicalServicesByKey.get("businessWebsites");
const ongoingSeo = canonicalServicesByKey.get("ongoingSeo");

if (!websiteHelp || !businessWebsites || !ongoingSeo) {
  throw new Error("The current front-door service ledger is incomplete.");
}

const situations = [
  {
    eyebrow: "Provider rescue",
    title: problemChooser.one("Problem 3 heading"),
    body: problemChooser.one("Problem 3 body"),
    label: problemChooser.one("Problem 3 label"),
    link: problemChooser.one("Problem 3 link"),
    href: "/services/provider-rescue/" as const,
    tone: "rescue",
  },
  {
    eyebrow: websiteHelp.label,
    title: "Fix the useful problem without automatically rebuilding everything.",
    body: websiteHelp.homepageCopy,
    label: websiteHelp.priceDisplay,
    link: websiteHelp.homepageCta,
    href: websiteHelp.route,
    tone: "repair",
  },
  {
    eyebrow: businessWebsites.label,
    title: problemChooser.one("Problem 2 heading"),
    body: problemChooser.one("Problem 2 body"),
    label: businessWebsites.priceDisplay,
    link: businessWebsites.homepageCta,
    href: businessWebsites.route,
    tone: "replace",
  },
] as const;

const controlSystems = [
  "Domain",
  "DNS",
  "Hosting",
  "Content system",
  "Forms",
  "Analytics",
  "Search accounts",
  "Email connections",
  "Repositories",
  "Integrations",
] as const;

const controlStatuses = [
  ownership.one("Status labels"),
  ...ownership.many("value"),
];

const offerLadder = [
  {
    step: "01",
    label: freeReview.label,
    price: freeReview.priceDisplay,
    body: freeReviewPage.body,
    href: freeReview.route,
    cta: "Get a free website review",
  },
  {
    step: "02",
    label: websiteHelp.label,
    price: websiteHelp.priceDisplay,
    body: websiteHelp.homepageCopy,
    href: websiteHelp.route,
    cta: websiteHelp.homepageCta,
  },
  {
    step: "03",
    label: businessWebsites.label,
    price: businessWebsites.priceDisplay,
    body: businessWebsites.homepageCopy,
    href: businessWebsites.route,
    cta: businessWebsites.homepageCta,
  },
  {
    step: "04",
    label: ongoingSeo.label,
    price: ongoingSeo.priceDisplay,
    body: ongoingSeo.homepageCopy,
    href: ongoingSeo.route,
    cta: ongoingSeo.homepageCta,
  },
] as const;

const featuredDemos = [demoProjects[0], demoProjects[5], demoProjects[7]];

const featuredGuideRoutes = [
  "/learn/provider-rescue/",
  "/learn/website-buying/",
  "/learn/glossary/",
] as const;

const featuredGuides = featuredGuideRoutes.map((route) => {
  const guide = audiencePages.find((page) => page.slug === route);
  if (!guide) throw new Error(`Featured guide is missing: ${route}`);
  return guide;
});

const principleLabels = [
  principles.one("Principle labels"),
  ...principles.many("value"),
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://bohodigitalservices.com/#website",
      url: "https://bohodigitalservices.com/",
      name: "Boho Digital Services",
      alternateName: "Boho",
      publisher: {
        "@id": "https://bohodigitalservices.com/#organization",
      },
    },
    {
      "@type": "ItemList",
      name: "Boho Digital Services",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "Provider Rescue",
            url: "https://bohodigitalservices.com/services/provider-rescue/",
            offers: {
              "@type": "Offer",
              price: 200,
              priceCurrency: "USD",
              description: "One bounded issue or diagnosis.",
            },
          },
        },
        ...[websiteHelp, businessWebsites, ongoingSeo].map((service, index) => ({
          "@type": "ListItem",
          position: index + 2,
          item: {
            "@type": "Service",
            name: service.label,
            url: `https://bohodigitalservices.com${service.route}`,
            offers: {
              "@type": "Offer",
              price: service.startingPrice,
              priceCurrency: "USD",
              description: service.priceDisplay,
            },
          },
        })),
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: providerRescuePage.faqs.map(([question, answer]) => ({
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
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={styles.hero} aria-labelledby="front-door-title">
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{hero.one("Eyebrow")}</p>
                <p className={styles.heroRescueSignal}>
                  <span>Provider Rescue</span>
                  <strong>{providerRescuePage.priceDisplay}</strong>
                </p>
                <h1 id="front-door-title">{hero.one("Headline")}</h1>
                <p className={styles.heroLead}>{hero.one("Body paragraph 1")}</p>
                <p className={styles.heroSupport}>{hero.one("Body paragraph 2")}</p>
                <div className={styles.actions}>
                  <ButtonLink
                    data-analytics-event="free_review_click"
                    data-analytics-service-context="website_help"
                    data-analytics-source-page="homepage"
                    data-analytics-source-section="hero"
                    href="/start/"
                  >
                    {hero.one("Primary CTA")}
                  </ButtonLink>
                  <ButtonLink href="/services/" variant="secondary">
                    {hero.one("Secondary CTA")}
                  </ButtonLink>
                </div>
                <div className={styles.heroTrust}>
                  <span>{hero.one("Trust line")}</span>
                  <span>{hero.one("Location line")}</span>
                </div>
              </div>

              <aside className={styles.controlFile} aria-labelledby="control-file-title">
                <div className={styles.controlFileTopline} aria-hidden="true">
                  <span>Provider exit map</span>
                  <span>Control / transfer</span>
                </div>
                <header className={styles.controlFileHeader}>
                  <div>
                    <p>{providerRescuePage.eyebrow}</p>
                    <h2 id="control-file-title">Recover control before making the move.</h2>
                  </div>
                  <strong>{providerRescuePage.priceDisplay}</strong>
                </header>
                <ul className={styles.controlFileList}>
                  {providerRescuePage.inventory.map((item, index) => (
                    <li
                      className={styles[`controlItem${index + 1}`]}
                      key={item}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item}</strong>
                    </li>
                  ))}
                </ul>
                <Link className={styles.controlFileLink} href="/services/provider-rescue/">
                  {problemChooser.one("Problem 3 link")} <span aria-hidden="true">→</span>
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.situations} aria-labelledby="situations-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{problemChooser.one("Eyebrow")}</p>
              <h2 id="situations-title">{problemChooser.one("Heading")}</h2>
              <p>{problemChooser.one("Introduction")}</p>
            </header>
            <div className={styles.situationGrid}>
              {situations.map((situation, index) => (
                <article
                  className={`${styles.situationCard} ${styles[situation.tone]} ${styles[`situationCard${index + 1}`]}`}
                  key={situation.href}
                >
                  <p className={styles.cardEyebrow}>{situation.eyebrow}</p>
                  <h3>{situation.title}</h3>
                  <p>{situation.body}</p>
                  <strong>{situation.label}</strong>
                  <a href={situation.href}>{situation.link} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ownership} aria-labelledby="ownership-title">
          <div className={`${styles.shell} ${styles.ownershipGrid}`}>
            <div className={styles.ownershipCopy}>
              <p className={styles.eyebrow}>{ownership.one("Eyebrow")}</p>
              <h2 id="ownership-title">{ownership.one("Heading")}</h2>
              <p>{ownership.one("Body paragraph 1")}</p>
              <p>{ownership.one("Body paragraph 2")}</p>
              <ButtonLink href="/services/provider-rescue/" variant="secondary">
                {ownership.one("Link")}
              </ButtonLink>
            </div>
            <div className={styles.systemMap} aria-label={ownership.one("Heading")}>
              <div className={styles.systemMapGrid}>
                {controlSystems.map((system, index) => (
                  <div
                    className={styles[`systemCell${index + 1}`]}
                    key={system}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{system}</strong>
                  </div>
                ))}
              </div>
              <ul className={styles.statusLegend}>
                {controlStatuses.map((status) => <li key={status}>{status}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.decision} aria-labelledby="decision-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>A controlled delivery path</p>
              <h2 id="decision-title">Start with the current situation.</h2>
            </header>
            <ol className={styles.decisionPath}>
              {providerRescuePage.decisions.map(([title, body], index) => (
                <li className={styles[`decisionStep${index + 1}`]} key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.offers} aria-labelledby="offers-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{pricingHero.one("Eyebrow")}</p>
              <h2 id="offers-title">{pricingHero.one("Headline")}</h2>
              <p>{pricingHero.one("Body paragraph 1")}</p>
            </header>
            <div className={styles.offerLadder}>
              {offerLadder.map((offer, index) => (
                <article className={styles[`offerCard${index + 1}`]} key={offer.label}>
                  <span>{offer.step}</span>
                  <div>
                    <p className={styles.cardEyebrow}>{offer.label}</p>
                    <h3>{offer.price}</h3>
                    <p>{offer.body}</p>
                  </div>
                  <a href={offer.href}>{offer.cta} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
            <p className={styles.scopeNote}>{sharedScopeNote}</p>
            <div className={styles.sectionAction}>
              <ButtonLink href="/pricing/" variant="secondary">View all pricing</ButtonLink>
            </div>
          </div>
        </section>

        <section className={styles.demos} aria-labelledby="demos-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>EXPLORE THE DEMO LIBRARY</p>
              <h2 id="demos-title">See what different website scopes can become.</h2>
              <p>These fictional businesses demonstrate design and functionality. They are not client case studies or performance claims.</p>
            </header>
            <div className={styles.demoGrid}>
              {featuredDemos.map((demo, index) => (
                <article className={styles[`demoCard${index + 1}`]} key={demo.id}>
                  <a href={demo.href} rel="noopener noreferrer" target="_blank">
                    <div className={styles.demoFrame}>
                      <span aria-hidden="true"><i /><i /><i /></span>
                      <Image
                        alt={demo.alt}
                        height={demo.imageHeight}
                        src={demo.image}
                        unoptimized
                        width={960}
                      />
                    </div>
                    <p className={styles.cardEyebrow}>{demo.tierLabel}</p>
                    <h3>{demo.name}</h3>
                    <p>{demo.summary}</p>
                  </a>
                </article>
              ))}
            </div>
            <div className={styles.sectionAction}>
              <ButtonLink href="/work/#demo-library" variant="secondary">
                Open the full demo library
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className={styles.guides} aria-labelledby="guides-title">
          <div className={`${styles.shell} ${styles.guidesLayout}`}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Resources · Buyer guides</p>
              <h2 id="guides-title">Make the expensive digital decision with fewer unknowns.</h2>
              <p>Focused guidance for buying a website, protecting ownership, changing providers, and translating technical language before it becomes leverage.</p>
              <ButtonLink href="/learn/" variant="secondary">Choose a Guide</ButtonLink>
            </header>
            <div className={styles.guideList}>
              {featuredGuides.map((guide, index) => (
                <a
                  className={styles[`guideCard${index + 1}`]}
                  href={guide.slug}
                  key={guide.slug}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><p>{guide.eyebrow}</p><h3>{guide.headline}</h3></div>
                  <b aria-hidden="true">→</b>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.trust} aria-labelledby="trust-title">
          <div className={`${styles.shell} ${styles.trustGrid}`}>
            <header>
              <p className={styles.eyebrow}>{principles.one("Eyebrow")}</p>
              <h2 id="trust-title">{principles.one("Heading")}</h2>
              <p>{principles.one("Supporting sentence")}</p>
              <p>Operated by Boho Digital Services LLC.</p>
            </header>
            <ul>
              {principleLabels.map((label, index) => (
                <li className={styles[`principle${index + 1}`]} key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before the proposal</p>
              <h2 id="faq-title">Frequently asked questions</h2>
            </header>
            <div>
              {providerRescuePage.faqs.map(([question, answer]) => (
                <FaqItem key={question} question={question}><p>{answer}</p></FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-cta-title">
          <div className={styles.finalMosaic} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={`${styles.shell} ${styles.finalCtaGrid}`}>
            <div>
              <p className={styles.eyebrow}>{finalIntake.one("Eyebrow")}</p>
              <h2 id="final-cta-title">{finalIntake.one("Heading")}</h2>
              <p>{finalIntake.one("Body paragraph 1")}</p>
              <p>{finalIntake.one("Body paragraph 2")}</p>
            </div>
            <div>
              <div className={styles.actions}>
                <ButtonLink href="/start/">{finalIntake.one("Primary CTA")}</ButtonLink>
                <ButtonLink href="/emergency/" variant="secondary">{finalIntake.one("Emergency CTA")}</ButtonLink>
              </div>
              <p className={styles.privacy}>{finalIntake.one("Privacy line")}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
