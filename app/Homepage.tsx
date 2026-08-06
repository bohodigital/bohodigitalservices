import Image from "next/image";
import Link from "next/link";

import styles from "./front-door.module.css";
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
const finalIntake = commercialSection("homepage", "10-final-intake-section");
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
  },
  {
    eyebrow: websiteHelp.label,
    title: "Fix the useful problem without automatically rebuilding everything.",
    body: websiteHelp.homepageCopy,
    label: websiteHelp.priceDisplay,
    link: websiteHelp.homepageCta,
    href: websiteHelp.route,
  },
  {
    eyebrow: businessWebsites.label,
    title: problemChooser.one("Problem 2 heading"),
    body: problemChooser.one("Problem 2 body"),
    label: businessWebsites.priceDisplay,
    link: businessWebsites.homepageCta,
    href: businessWebsites.route,
  },
] as const;

const offerLadder = [
  {
    label: freeReview.label,
    price: freeReview.priceDisplay,
    body: freeReviewPage.body,
    href: freeReview.route,
    cta: "Get a free website review",
  },
  {
    label: websiteHelp.label,
    price: websiteHelp.priceDisplay,
    body: websiteHelp.homepageCopy,
    href: websiteHelp.route,
    cta: websiteHelp.homepageCta,
  },
  {
    label: businessWebsites.label,
    price: businessWebsites.priceDisplay,
    body: businessWebsites.homepageCopy,
    href: businessWebsites.route,
    cta: businessWebsites.homepageCta,
  },
  {
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
      publisher: { "@id": "https://bohodigitalservices.com/#organization" },
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
        acceptedAnswer: { "@type": "Answer", text: answer },
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
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{hero.one("Eyebrow")}</p>
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
              <p className={styles.heroTrust}>
                {hero.one("Trust line")} <span aria-hidden="true">·</span>{" "}
                {hero.one("Location line")}
              </p>
            </div>

            <aside className={styles.rescueSummary} aria-labelledby="rescue-summary-title">
              <p className={styles.cardEyebrow}>{providerRescuePage.eyebrow}</p>
              <h2 id="rescue-summary-title">{providerRescuePage.fitHeading}</h2>
              <p>{providerRescuePage.fitBody}</p>
              <div className={styles.summaryReceipt}>
                <strong>{providerRescuePage.priceDisplay}</strong>
                <span>{providerRescuePage.receipt}</span>
              </div>
              <Link href="/services/provider-rescue/">
                {problemChooser.one("Problem 3 link")} <span aria-hidden="true">→</span>
              </Link>
            </aside>
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
              {situations.map((situation) => (
                <article className={styles.situationCard} key={situation.href}>
                  <p className={styles.cardEyebrow}>{situation.eyebrow}</p>
                  <h3>{situation.title}</h3>
                  <p>{situation.body}</p>
                  <strong>{situation.label}</strong>
                  <Link href={situation.href}>
                    {situation.link} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="ownership-title">
          <div className={`${styles.shell} ${styles.processGrid}`}>
            <div className={styles.processCopy}>
              <p className={styles.eyebrow}>{ownership.one("Eyebrow")}</p>
              <h2 id="ownership-title">{ownership.one("Heading")}</h2>
              <p>{ownership.one("Body paragraph 1")}</p>
              <p>{ownership.one("Body paragraph 2")}</p>
              <Link className={styles.textLink} href="/services/provider-rescue/">
                {ownership.one("Link")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ol className={styles.processList}>
              {providerRescuePage.decisions.map(([title, body], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.demos} aria-labelledby="demos-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Explore the demo library</p>
              <h2 id="demos-title">See what different website scopes can become.</h2>
              <p>These fictional businesses demonstrate design and functionality. They are not client case studies or performance claims.</p>
            </header>
            <div className={styles.demoGrid}>
              {featuredDemos.map((demo) => (
                <article key={demo.id}>
                  <a href={demo.href} rel="noopener noreferrer" target="_blank">
                    <div className={styles.demoImage}>
                      <Image
                        alt={`${demo.name} website demo preview.`}
                        fill
                        sizes="(max-width: 48rem) 100vw, 33vw"
                        src={demo.image.replace("-homepage", "")}
                        unoptimized
                      />
                    </div>
                    <p className={styles.cardEyebrow}>{demo.tierLabel} · Fictional demo</p>
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

        <section className={styles.offers} aria-labelledby="offers-title">
          <div className={`${styles.shell} ${styles.offersGrid}`}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{pricingHero.one("Eyebrow")}</p>
              <h2 id="offers-title">{pricingHero.one("Headline")}</h2>
              <p>{pricingHero.one("Body paragraph 1")}</p>
              <ButtonLink href="/pricing/" variant="secondary">View all pricing</ButtonLink>
            </header>
            <div>
              <div className={styles.priceList}>
                {offerLadder.map((offer) => (
                  <article key={offer.label}>
                    <div>
                      <p className={styles.cardEyebrow}>{offer.label}</p>
                      <h3>{offer.price}</h3>
                      <p>{offer.body}</p>
                    </div>
                    <Link href={offer.href}>{offer.cta} <span aria-hidden="true">→</span></Link>
                  </article>
                ))}
              </div>
              <p className={styles.scopeNote}>{sharedScopeNote}</p>
            </div>
          </div>
        </section>

        <section className={styles.resources} aria-labelledby="guides-title">
          <div className={`${styles.shell} ${styles.resourcesGrid}`}>
            <div>
              <p className={styles.eyebrow}>Resources · Buyer guides</p>
              <h2 id="guides-title">Make the expensive digital decision with fewer unknowns.</h2>
              <p>Focused guidance for buying a website, protecting ownership, changing providers, and translating technical language before it becomes leverage.</p>
              <div className={styles.guideList}>
                {featuredGuides.map((guide) => (
                  <Link href={guide.slug} key={guide.slug}>
                    <span><small>{guide.eyebrow}</small>{guide.headline}</span>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </div>
            <aside className={styles.standard} aria-labelledby="standard-title">
              <p className={styles.cardEyebrow}>{principles.one("Eyebrow")}</p>
              <h2 id="standard-title">{principles.one("Heading")}</h2>
              <p>{principles.one("Supporting sentence")}</p>
              <ul>
                {principleLabels.map((label) => <li key={label}>{label}</li>)}
              </ul>
              <p className={styles.operator}>Operated by Boho Digital Services LLC.</p>
            </aside>
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
