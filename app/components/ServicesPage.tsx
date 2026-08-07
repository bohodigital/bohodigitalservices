import Link from "next/link";

import {
  canonicalServices,
  sharedScopeNote,
} from "../content/commercialReset";
import { ButtonLink, Footer, Header } from "./SiteChrome";
import styles from "./day-one-commercial.module.css";

const problemRoutes = [
  {
    title: "We need to leave a provider.",
    body: "Ownership, access, dependencies, useful URLs, forms, measurement, and customer paths should be mapped before anything moves.",
    label: "Provider Rescue · Website Help from $200",
    href: "/services/provider-rescue/",
  },
  {
    title: "The website is unclear or difficult to use.",
    body: "The useful answer may be one repair, a substantial redesign, or a new website. The existing system gets reviewed before the scope gets larger.",
    label: "Business Websites · From $850",
    href: "/services/web-design-redesign/",
  },
  {
    title: "We are hard to find.",
    body: "Search visibility, local discovery, service pages, trust, measurement, and inquiry paths may need to improve together.",
    label: "Ongoing SEO · From $450/month",
    href: "/services/ongoing-seo/",
  },
  {
    title: "Repeated work wastes time.",
    body: "A focused tool, integration, publishing system, or automation may help after the real workflow and approval points are understood.",
    label: "Custom Systems · From $1,500",
    href: "/services/custom-digital-solutions/",
  },
  {
    title: "The reporting does not support a decision.",
    body: "The problem may be missing data, weak attribution, irrelevant metrics, or a report that never turns evidence into a practical next move.",
    label: "Research & Audits · Website Help from $200",
    href: "/services/research-audits-strategy/",
  },
] as const;

const consoleRoutes = [
  {
    kicker: "Featured first move",
    title: "Provider Rescue",
    action: "Recover control before changing the system",
    href: "/services/provider-rescue/",
  },
  {
    kicker: "Fix",
    title: "Website Help",
    action: "From $200",
    href: "/services/website-help/",
  },
  {
    kicker: "Build",
    title: "Business Websites",
    action: "From $850",
    href: "/services/web-design-redesign/",
  },
  {
    kicker: "Grow",
    title: "Ongoing SEO",
    action: "From $450/month",
    href: "/services/ongoing-seo/",
  },
  {
    kicker: "Automate",
    title: "Custom Systems",
    action: "From $1,500",
    href: "/services/custom-digital-solutions/",
  },
] as const;

const serviceUses = {
  businessWebsites: "New website, responsible redesign, local-business site, or replacement of a fragile build.",
  ongoingSeo: "Continued technical, local, content, internal-link, analytics, and conversion improvement.",
  websiteHelp: "One bounded repair, audit, provider problem, migration question, accessibility issue, or ownership cleanup.",
  customSystems: "A focused tool, integration, dashboard, publishing workflow, or automation around repeated work.",
} as const;

const ownershipNodes = [
  ["Domain", "Client controls"],
  ["DNS", "Verified route"],
  ["Hosting", "Known deployment"],
  ["Forms", "Tested action"],
  ["Analytics", "Named owner"],
  ["Source", "Documented handoff"],
] as const;

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
      ],
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
            description: "Map ownership and dependencies, preserve useful systems, and plan a responsible provider exit or migration.",
            offers: {
              "@type": "Offer",
              price: 200,
              priceCurrency: "USD",
              description: "Website Help from $200",
            },
          },
        },
        ...canonicalServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 2,
          item: {
            "@type": "Service",
            name: service.label,
            url: `https://bohodigitalservices.com${service.route}`,
            description: service.servicesDescription,
            offers: {
              "@type": "Offer",
              name: `${service.label} — ${service.priceDisplay}`,
              price: service.startingPrice,
              priceCurrency: "USD",
              description: service.priceDisplay,
            },
          },
        })),
      ],
    },
  ],
};

export function ServicesPage() {
  return (
    <>
      <Header />
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />

        <section className={styles.hero} aria-labelledby="services-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Services</span>
              </nav>
              <p className={styles.eyebrow}>Provider rescue first · four clear service lines</p>
              <h1 id="services-title">Start with the problem. Keep the useful parts.</h1>
              <p className={styles.heroLead}>
                Boho rescues provider-controlled websites, fixes bounded problems,
                builds durable replacements, improves search visibility, and creates
                focused systems without turning every problem into a larger project.
              </p>
              <p className={styles.heroSupport}>
                When ownership or continuity is unclear, Provider Rescue is the first
                route. Otherwise, choose the closest outcome. The recommendation may
                still be a smaller repair—or no paid project yet.
              </p>
              <div className={styles.actions}>
                <ButtonLink
                  data-analytics-event="service_card_click"
                  data-analytics-service-name="Provider Rescue"
                  data-analytics-source-page="services"
                  data-analytics-source-section="hero"
                  href="/services/provider-rescue/"
                >
                  Review Provider Rescue
                </ButtonLink>
                <ButtonLink href="/start/?path=build-repair&offer=provider-rescue" variant="secondary">
                  Send the situation
                </ButtonLink>
              </div>
              <p className={styles.trustLine}>
                <span>Public starting prices</span>
                <span>Written scope</span>
                <span>Client-owned durable accounts</span>
              </p>
            </div>

            <aside className={styles.routeConsole} aria-label="Service route console">
              <div className={styles.consoleTopline}>
                <span>Boho route console</span>
                <span className={styles.consoleLight}>Ready to route</span>
              </div>
              <div className={styles.routeConsoleGrid}>
                {consoleRoutes.map((route) => (
                  <Link
                    aria-label={`${route.title}: ${route.action}`}
                    className={styles.consoleTile}
                    data-analytics-event="service_card_click"
                    data-analytics-service-name={route.title}
                    data-analytics-source-page="services"
                    data-analytics-source-section="hero_console"
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

        <section className={`${styles.section} ${styles.sectionSoft} ${styles.sectionAccent}`} aria-labelledby="services-problems-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Start with what is going wrong</p>
                <h2 id="services-problems-title">You do not need to diagnose the machinery first.</h2>
              </div>
              <p>
                Choose the closest visible problem. Every tile is the route—not a
                decorative card hiding one tiny link in the corner.
              </p>
            </header>
            <div className={styles.problemGrid}>
              {problemRoutes.map((problem, index) => (
                <Link
                  aria-label={`${problem.title}: ${problem.label}`}
                  className={styles.problemCard}
                  data-analytics-event="service_card_click"
                  data-analytics-service-name={problem.label}
                  data-analytics-source-page="services"
                  data-analytics-source-section="problem_chooser"
                  href={problem.href}
                  key={problem.href}
                >
                  <span className={styles.problemNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                  <span className={styles.cardAction}>{problem.label} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="service-lines-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>The commercial structure</p>
                <h2 id="service-lines-title">Four services. Provider Rescue stays visible.</h2>
              </div>
              <p>
                Provider Rescue is delivered through Website Help, but it receives a
                clear front door because an ownership problem should not be buried
                under a generic repair menu.
              </p>
            </header>

            <article className={styles.serviceBand}>
              <div className={styles.serviceBandGrid}>
                <div>
                  <p className={styles.cardEyebrow}>Featured route · rescue before rebuild</p>
                  <h3>Provider Rescue</h3>
                  <p>Inventory ownership, access, dependencies, useful URLs, forms, analytics, and working customer paths before leaving an unsuitable provider.</p>
                </div>
                <div className={styles.serviceBandPrice}>
                  <strong>Help from $200</strong>
                  <Link href="/services/provider-rescue/">Open Provider Rescue →</Link>
                </div>
              </div>
            </article>

            <div className={styles.offerGrid}>
              {canonicalServices.map((service, index) => (
                <Link
                  aria-label={`${service.label}: ${service.priceDisplay}. ${service.servicesCta}`}
                  className={styles.offerCard}
                  data-analytics-event="service_card_click"
                  data-analytics-price-display={service.priceDisplay}
                  data-analytics-service-name={service.label}
                  data-analytics-source-page="services"
                  data-analytics-source-section="service_lines"
                  href={service.route}
                  key={service.key}
                >
                  <span className={styles.offerStep}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.offerPrice}>{service.priceDisplay}</span>
                  <h3>{service.label}</h3>
                  <p className={styles.offerUse}>{serviceUses[service.key]}</p>
                  <span className={styles.cardAction}>{service.servicesCta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="services-ownership-title">
          <div className={`${styles.shell} ${styles.ownershipGrid}`}>
            <div className={styles.ownershipCopy}>
              <p className={styles.eyebrow}>Ownership should be visible</p>
              <h2 id="services-ownership-title">A website is more than its page files.</h2>
              <p>
                The domain, DNS, hosting, forms, analytics, source, email connections,
                and integrations may all be controlled in different places. Boho maps
                the important dependencies before a migration and documents the durable
                accounts during ordinary work.
              </p>
              <div className={styles.actions}>
                <ButtonLink href="/services/provider-rescue/">See the rescue method</ButtonLink>
                <ButtonLink href="/pricing/" variant="secondary">See pricing</ButtonLink>
              </div>
            </div>
            <div className={styles.ownershipMap} aria-label="Example ownership map">
              {ownershipNodes.map(([label, state]) => (
                <div key={label}><span>{state}</span><strong>{label}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="services-final-title">
          <div className={`${styles.shell} ${styles.finalGrid}`}>
            <div>
              <p className={styles.eyebrow}>Smallest useful next step</p>
              <h2 id="services-final-title">Send the situation. Boho will route it.</h2>
              <p>{sharedScopeNote}</p>
            </div>
            <div className={styles.actions}>
              <ButtonLink
                data-analytics-event="free_review_click"
                data-analytics-service-context="general"
                data-analytics-source-page="services"
                data-analytics-source-section="final_cta"
                href="/start/"
              >
                Get a free website review
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
