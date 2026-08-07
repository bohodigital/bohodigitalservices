import Link from "next/link";

import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../../content/commercial/presentation";
import { ButtonLink } from "../SiteChrome";
import styles from "../day-one-commercial.module.css";
import { Footer, Header } from "./CommercialChrome";

const structuredData = {
  "@context": "https://schema.org",
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
      name: "Contact",
      item: "https://bohodigitalservices.com/contact/",
    },
  ],
};

const featuredRoutes = [
  {
    kicker: "Leaving a provider?",
    title: "Provider Rescue",
    action: "Map ownership before the move",
    href: "/services/provider-rescue/",
  },
  {
    kicker: "Normal project",
    title: "Free Website Review",
    action: "Send the situation",
    href: "/start/",
  },
  {
    kicker: "Active incident",
    title: "Emergency Help",
    action: "Use the urgent route",
    href: "/emergency/",
  },
] as const;

export function CommercialContactPage() {
  const hero = commercialSection("contact", "hero");
  const paths = commercialSection("contact", "contact-paths");
  const privacy = commercialSection("contact", "privacy-reminder");
  const startHero = commercialSection("start", "hero");
  const startDestination = commercialSection("start", "path-1").one("Destination");
  const pathSections = [1, 2, 3, 4].map((number) => commercialSection("contact", `path-${number}`));
  const emergencyCorrection = commercialCorrections.contact.standardInquiry.emergencyBlock;

  return (
    <>
      <Header />
      <main className={`${styles.page} commercial-page commercial-contact-page`} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={`${styles.hero} ${styles.contactHero}`} aria-labelledby="contact-commercial-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact</span>
              </nav>
              <p className={styles.eyebrow}>{hero.one("Eyebrow")}</p>
              <h1 id="contact-commercial-title">{hero.one("Headline")}</h1>
              <p className={styles.heroLead}>{startHero.many("Body paragraph 1")[0]}</p>
              <p className={styles.heroSupport}>{startHero.many("Body paragraph 2")[0]}</p>
              <div className={styles.actions}>
                <ButtonLink
                  data-analytics-event="free_review_click"
                  data-analytics-service-context="general"
                  data-analytics-source-page="contact"
                  data-analytics-source-section="hero"
                  href={startDestination as `/${string}`}
                >
                  Get a free website review
                </ButtonLink>
                <ButtonLink href={hero.one("Secondary destination") as `/${string}`} variant="secondary">
                  {hero.one("Secondary CTA")}
                </ButtonLink>
              </div>
              <p className={styles.trustLine}>
                <span>No phone number required</span>
                <span>No passwords or recovery codes</span>
                <span>Owner-operated</span>
              </p>
            </div>

            <aside className={styles.contactConsole} aria-label="Fast contact routing">
              <div className={styles.consoleTopline}>
                <span>Route the situation</span>
                <span className={styles.consoleLight}>Three fast paths</span>
              </div>
              <div className={styles.contactConsoleGrid}>
                {featuredRoutes.map((route) => (
                  <Link
                    aria-label={`${route.title}: ${route.action}`}
                    className={styles.contactConsoleTile}
                    data-analytics-event={route.href === "/start/"
                      ? "free_review_click"
                      : route.href === "/emergency/"
                        ? "emergency_hero_cta_click"
                        : "service_card_click"}
                    data-analytics-service-context={route.href === "/start/" ? "general" : undefined}
                    data-analytics-service-name={route.href === "/services/provider-rescue/" ? route.title : undefined}
                    data-analytics-source-page="contact"
                    data-analytics-source-section="routing_console"
                    href={route.href}
                    key={route.href}
                  >
                    <span>{route.kicker}</span>
                    <strong>{route.title}</strong>
                    <b>{route.action} →</b>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft} ${styles.sectionAccent}`} aria-labelledby="contact-paths-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>{paths.one("Section eyebrow")}</p>
                <h2 id="contact-paths-title">{correctionValue(commercialCorrections.contact.heading)}</h2>
              </div>
              <p>Use the simplest contact path that fits. The full tile is the action, so there is no tiny hidden target to hunt for.</p>
            </header>
            <div className={styles.contactPathGrid}>
              {pathSections.map((path, index) => {
                const href = index === 0
                  ? startDestination
                  : index === 3
                    ? correctionValue(emergencyCorrection.destination)
                    : path.one("Destination");
                const body = index === 3
                  ? correctionValue(emergencyCorrection.body)
                  : index === 1
                    ? commercialSection("start", "path-2").one("Body")
                    : path.one("Body");
                const label = index === 0
                  ? "Get a free website review"
                  : index === 3
                    ? correctionValue(emergencyCorrection.linkLabel)
                    : path.one("Link label");
                const event = index === 0
                  ? "free_review_click"
                  : index === 1 || index === 2
                    ? "email_link_click"
                    : "emergency_hero_cta_click";

                return (
                  <a
                    aria-label={`${path.one("Heading")}: ${label}`}
                    className={styles.contactPathCard}
                    data-analytics-event={event}
                    data-analytics-service-context={index === 3 ? "emergency" : "general"}
                    data-analytics-source-page="contact"
                    data-analytics-source-section="contact_paths"
                    href={href}
                    key={path.one("Heading")}
                  >
                    <span className={styles.pathNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{path.one("Heading")}</h3>
                    <p>{body}</p>
                    <span className={styles.cardAction}>{label} →</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.privacyBand} aria-labelledby="contact-privacy-title">
          <div className={`${styles.shell} ${styles.privacyBandGrid}`}>
            <h2 id="contact-privacy-title">{privacy.one("Heading")}</h2>
            <p>{commercialSection("start", "privacy-reminder").one("Body")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export {
  CommercialEmergencyPage,
  CommercialStartPage,
} from "./CommercialConversionPages";
