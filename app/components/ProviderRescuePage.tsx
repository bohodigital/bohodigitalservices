import Link from "next/link";

import styles from "../front-door.module.css";
import { providerRescuePage } from "../content/commercialReset";
import {
  Breadcrumbs,
  ButtonLink,
  FaqItem,
  Footer,
  Header,
} from "./SiteChrome";

const receiptItems = providerRescuePage.receipt.split(" · ");

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
      provider: { "@id": "https://bohodigitalservices.com/#organization" },
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
        acceptedAnswer: { "@type": "Answer", text: answer },
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
              <aside className={styles.rescueReceipt} aria-labelledby="rescue-receipt-title">
                <p className={styles.cardEyebrow}>The first review</p>
                <h2 id="rescue-receipt-title">Start with one bounded issue.</h2>
                <strong>{providerRescuePage.priceDisplay}</strong>
                <p>{providerRescuePage.scopeNote}</p>
                <ul>
                  {receiptItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </aside>
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
              {providerRescuePage.situations.map((situation) => (
                <li key={situation}>{situation}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueWork}`} aria-labelledby="rescue-inventory-title">
          <div className={styles.shell}>
            <div className={styles.rescueInventoryGrid}>
              <div>
                <p className={styles.eyebrow}>The initial review</p>
                <h2 id="rescue-inventory-title">A website is more than its page files.</h2>
                <p>The domain, registrar, DNS, hosting, content system, forms, analytics, search accounts, email connections, repositories, and integrations may be controlled in different places.</p>
                <p>Boho maps those dependencies before a migration or rescue so the business can see what it owns, what a provider controls, what remains unknown, and what must be recovered or replaced.</p>
              </div>
              <div>
                <ul className={styles.rescueInventoryList}>
                  {providerRescuePage.inventory.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className={styles.rescueAuthority}>{providerRescuePage.authority}</p>
              </div>
            </div>

            <div className={styles.rescueMethod} aria-labelledby="rescue-decision-title">
              <header className={styles.sectionHeading}>
                <p className={styles.eyebrow}>A controlled delivery path</p>
                <h2 id="rescue-decision-title">Start with the current situation.</h2>
              </header>
              <ol>
                {providerRescuePage.decisions.map(([title, body], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
              <p className={styles.rescueAuthority}>{providerRescuePage.urgency}</p>
            </div>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueDeliverables}`} aria-labelledby="rescue-deliverables-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>A usable handoff</p>
              <h2 id="rescue-deliverables-title">A rescue should leave the next operator less dependent.</h2>
            </header>
            <div className={styles.rescueDeliverableGrid}>
              {providerRescuePage.deliverables.map(([title, body]) => (
                <article key={title}><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.rescueSection} ${styles.rescueGuides}`} aria-labelledby="rescue-guides-title">
          <div className={`${styles.shell} ${styles.rescueGuideGrid}`}>
            <div>
              <p className={styles.eyebrow}>Useful next reads</p>
              <h2 id="rescue-guides-title">Understand the system before changing the system.</h2>
              <p>Use the guides and examples to compare options before a provider move, rebuild, or larger commitment.</p>
            </div>
            <nav className={styles.rescueGuideList} aria-label="Provider rescue resources">
              <Link href="/learn/provider-rescue/">Provider rescue checklist <span aria-hidden="true">→</span></Link>
              <Link href="/services/website-help/">Review Website Help <span aria-hidden="true">→</span></Link>
              <Link href="/services/web-design-redesign/">Review the website service <span aria-hidden="true">→</span></Link>
              <Link href="/work/#demo-library">Open the demo library <span aria-hidden="true">→</span></Link>
              <Link href="/learn/website-buying/">Website buying guide <span aria-hidden="true">→</span></Link>
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
