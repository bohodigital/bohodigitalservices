import Image from "next/image";
import Link from "next/link";

import styles from "../front-door.module.css";
import { providerRescuePage } from "../content/commercialReset";
import { serviceHeroAssets, serviceShowcases } from "../content/serviceShowcases";
import {
  Breadcrumbs,
  ButtonLink,
  FaqItem,
  Footer,
  Header,
} from "./SiteChrome";
import { EvidencePlate } from "./EvidencePlate";

const route = "/services/provider-rescue/" as const;
const heroAsset = serviceHeroAssets[route];
const architectureAsset = serviceShowcases[route][1];

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
          name: "Services",
          item: "https://bohodigitalservices.com/services/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Provider Rescue",
          item: "https://bohodigitalservices.com/services/provider-rescue/",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://bohodigitalservices.com/services/provider-rescue/#service",
      name: "Provider Rescue",
      serviceType: "Provider Rescue & Migration",
      url: "https://bohodigitalservices.com/services/provider-rescue/",
      description:
        "Map ownership and dependencies, preserve useful URLs and assets, leave an unsuitable provider, migrate carefully, and verify the agreed website and customer paths.",
      provider: {
        "@id": "https://bohodigitalservices.com/#organization",
      },
      offers: {
        "@type": "Offer",
        price: 200,
        priceCurrency: "USD",
        description: "One bounded issue or diagnosis.",
        url: "https://bohodigitalservices.com/services/provider-rescue/",
      },
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

export function ProviderRescuePage() {
  return (
    <>
      <Header />
      <main className={`${styles.page} ${styles.rescuePage}`} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={styles.rescueHero} aria-labelledby="provider-rescue-title">
          <div className={styles.shell}>
            <Breadcrumbs
              className={styles.rescueBreadcrumbs}
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services/" },
                { label: "Provider Rescue" },
              ]}
            />
            <div className={styles.rescueHeroGrid}>
              <div className={styles.rescueHeroCopy}>
                <p className={styles.eyebrow}>{providerRescuePage.eyebrow}</p>
                <h1 id="provider-rescue-title">{providerRescuePage.headline}</h1>
                <p>{providerRescuePage.introduction}</p>
                <div className={styles.rescuePrice}>
                  <strong>{providerRescuePage.priceDisplay}</strong>
                  <span>{providerRescuePage.receipt}</span>
                </div>
                <div className={styles.actions}>
                  <ButtonLink
                    data-analytics-event="free_review_click"
                    data-analytics-service-context="website_help"
                    data-analytics-source-page="provider_rescue"
                    data-analytics-source-section="hero"
                    href="/start/?path=build-repair&offer=provider-rescue"
                  >
                    Get a free website review
                  </ButtonLink>
                  <ButtonLink href="/pricing/" variant="secondary">See pricing</ButtonLink>
                </div>
              </div>
              <figure className={styles.rescueHeroVisual}>
                <Image
                  alt={heroAsset.alt}
                  height={800}
                  priority
                  src={heroAsset.src}
                  unoptimized
                  width={1200}
                />
                <figcaption><span>{heroAsset.label}</span>{heroAsset.caption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.rescueSection} aria-labelledby="rescue-fit-title">
          <div className={`${styles.shell} ${styles.rescueIntroGrid}`}>
            <div>
              <p className={styles.eyebrow}>The fit</p>
              <h2 id="rescue-fit-title">{providerRescuePage.fitHeading}</h2>
              <p>{providerRescuePage.fitBody}</p>
              <p>{providerRescuePage.scopeNote}</p>
            </div>
            <ul className={styles.rescueSituationList}>
              {providerRescuePage.situations.map((situation, index) => (
                <li key={situation}><span>{String(index + 1).padStart(2, "0")}</span>{situation}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueInventorySection}`} aria-labelledby="rescue-inventory-title">
          <div className={`${styles.shell} ${styles.rescueInventoryGrid}`}>
            <div>
              <p className={styles.eyebrow}>The initial review</p>
              <h2 id="rescue-inventory-title">A website is more than its page files.</h2>
              <p>The domain, registrar, DNS, hosting, content system, forms, analytics, search accounts, email connections, repositories, and integrations may be controlled in different places.</p>
              <p>Boho maps those dependencies before a migration or rescue so the business can see what it owns, what a provider controls, what remains unknown, and what must be recovered or replaced.</p>
            </div>
            <div>
              <ol className={styles.rescueInventoryList}>
                {providerRescuePage.inventory.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
                ))}
              </ol>
              <p className={styles.rescueAuthority}>{providerRescuePage.authority}</p>
            </div>
          </div>
        </section>

        <EvidencePlate id="provider-rescue-control-map" />

        <section className={`${styles.rescueSection} ${styles.rescueDecisionSection}`} aria-labelledby="rescue-decision-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>A controlled delivery path</p>
              <h2 id="rescue-decision-title">Start with the current situation.</h2>
            </header>
            <ol className={styles.decisionPath}>
              {providerRescuePage.decisions.map(([title, body], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
            <p className={styles.rescueAuthority}>{providerRescuePage.urgency}</p>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueDeliverables}`} aria-labelledby="rescue-deliverables-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>A usable handoff</p>
              <h2 id="rescue-deliverables-title">A rescue should leave the next operator less dependent.</h2>
            </header>
            <div className={styles.rescueDeliverableGrid}>
              {providerRescuePage.deliverables.map(([title, body], index) => (
                <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueEvidence}`} aria-labelledby="rescue-evidence-title">
          <div className={`${styles.shell} ${styles.rescueEvidenceGrid}`}>
            <figure>
              <Image
                alt={architectureAsset.alt}
                height={1050}
                src={architectureAsset.src}
                unoptimized
                width={1440}
              />
              <figcaption>{architectureAsset.label} · {architectureAsset.caption}</figcaption>
            </figure>
            <div>
              <p className={styles.eyebrow}>Continuity evidence</p>
              <h2 id="rescue-evidence-title">Understand the system before touching the system.</h2>
              <p>Architecture, migration practice, and public technical tools illustrate how Boho approaches ownership, access, monitoring, and controlled change. Tool screenshots use demo or example data.</p>
              <div className={styles.rescueEvidenceLinks}>
                <Link href="/learn/provider-rescue/">Read the rescue guide <span aria-hidden="true">→</span></Link>
                <Link href="/services/website-help/">Review Website Help <span aria-hidden="true">→</span></Link>
                <Link href="/services/web-design-redesign/">Review the website service <span aria-hidden="true">→</span></Link>
                <Link href="/work/#demo-library">Open the full demo library <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueGuides}`} aria-labelledby="rescue-guides-title">
          <div className={`${styles.shell} ${styles.rescueGuideGrid}`}>
            <div>
              <p className={styles.eyebrow}>Resources</p>
              <h2 id="rescue-guides-title">Buyer guidance for decisions that change ownership, cost, or risk.</h2>
            </div>
            <nav className={styles.rescueGuideList} aria-label="Resources">
              <Link href="/learn/provider-rescue/">Provider rescue checklist <span aria-hidden="true">→</span></Link>
              <Link href="/learn/website-buying/">Website buying <span aria-hidden="true">→</span></Link>
              <Link href="/learn/glossary/">Plain-language glossary <span aria-hidden="true">→</span></Link>
            </nav>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueFaq}`} aria-labelledby="rescue-faq-title">
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before the proposal</p>
              <h2 id="rescue-faq-title">Frequently asked questions</h2>
            </header>
            <div>
              {providerRescuePage.faqs.map(([question, answer]) => (
                <FaqItem key={question} question={question}><p>{answer}</p></FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="rescue-final-title">
          <div className={`${styles.shell} ${styles.finalCtaGrid}`}>
            <div>
              <p className={styles.eyebrow}>Start with the situation</p>
              <h2 id="rescue-final-title">You do not need to diagnose it first.</h2>
              <p>Describe what is happening, what matters most, and what access or deadlines are already involved. Boho will identify the smallest useful next step.</p>
              <p>A submitted form is not an accepted project, emergency response, quote, or guarantee of availability.</p>
            </div>
            <div>
              <div className={styles.actions}>
                <ButtonLink href="/start/?path=build-repair&offer=provider-rescue">Get a free website review</ButtonLink>
                <ButtonLink href="/emergency/" variant="secondary">Emergency Website Help</ButtonLink>
              </div>
              <p className={styles.privacy}>Do not send passwords, private keys, recovery codes, payment-card information, medical information, or other secrets through the website form.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
