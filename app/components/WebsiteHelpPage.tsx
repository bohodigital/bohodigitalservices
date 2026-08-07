import Link from "next/link";

import styles from "./WebsiteHelpPage.module.css";
import { ButtonLink, Footer, Header } from "./SiteChrome";

const coverage = [
  "Broken inquiry or contact forms",
  "Bad mobile layout",
  "One unclear high-value page",
  "Search-indexing or redirect problems",
  "Incorrect analytics configuration",
  "Third-party action or integration failures",
  "Domain, hosting, or provider ownership review",
  "Provider-exit planning",
  "Straightforward website moves",
  "Focused accessibility repairs",
  "Technical review of one defined issue",
] as const;

const routes = [
  {
    title: "Provider rescue",
    copy: "Map ownership, access, dependencies, and a responsible exit or recovery path.",
    href: "/services/provider-rescue/",
    action: "Explore Provider Rescue",
    tone: "rescue",
    number: "01",
  },
  {
    title: "Focused repair",
    copy: "Correct one defined defect or customer-path problem.",
    href: "/start/",
    action: "Request a focused review",
    tone: "repair",
    number: "02",
  },
  {
    title: "Technical review",
    copy: "Determine why one specific website, analytics, search, accessibility, or integration issue is occurring.",
    href: "/services/research-audits-strategy/",
    action: "See research and audits",
    tone: "review",
    number: "03",
  },
  {
    title: "Migration help",
    copy: "Move a website or supporting system while preserving the URLs, content, customer paths, and account control that should survive.",
    href: "/services/provider-rescue/",
    action: "Plan a responsible move",
    tone: "migration",
    number: "04",
  },
] as const;

const process = [
  ["Free public review", "Send the site and explain the visible problem."],
  ["Bound the issue", "Boho identifies what can be inspected publicly and what access may be needed."],
  ["Approve the work", "Paid work begins only through a written scope and price."],
  ["Repair and verify", "Boho completes the agreed work, checks the target behavior, and documents remaining limitations."],
] as const;

const diagnosticSteps = [
  "Visible problem",
  "Accounts and access",
  "Dependencies",
  "Repair and verification",
] as const;

export function WebsiteHelpPage() {
  return (
    <>
      <Header />
      <main className={styles.page} id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="website-help-title">
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Website Help · From $200</p>
              <h1 id="website-help-title">
                Fix the useful problem without automatically rebuilding everything.
              </h1>
              <p className={styles.heroLead}>
                Website Help covers focused repairs, diagnosis, provider trouble,
                migrations, analytics problems, accessibility issues, and ownership
                cleanup. One bounded issue may fit the $200 starting scope. Larger
                recovery or implementation work receives a written quote after review.
              </p>
              <div className={styles.actions}>
                <ButtonLink href="/start/">Get a free website review</ButtonLink>
                <ButtonLink href="/pricing/" variant="secondary">
                  See pricing
                </ButtonLink>
              </div>
              <p className={styles.heroNote}>
                One bounded issue or diagnosis · Written scope before paid work
              </p>
            </div>

            <aside className={styles.diagnosticBoard} aria-labelledby="diagnostic-board-title">
              <div className={styles.boardTopline}>
                <span>Website help / triage file</span>
                <span>Route the situation</span>
              </div>
              <div className={styles.boardHeader}>
                <div>
                  <p>Smallest responsible scope</p>
                  <h2 id="diagnostic-board-title">Find the break before buying the rebuild.</h2>
                </div>
                <strong>From $200</strong>
              </div>
              <ol className={styles.diagnosticList}>
                {diagnosticSteps.map((step, index) => (
                  <li key={step}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
              <p className={styles.boardFooter}>
                Diagnose <span aria-hidden="true">→</span> bound <span aria-hidden="true">→</span> repair <span aria-hidden="true">→</span> verify
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.coverage} aria-labelledby="help-cover-title">
          <div className={`${styles.shell} ${styles.coverageGrid}`}>
            <article className={styles.coveragePanel}>
              <p className={styles.sectionLabel}>Coverage map</p>
              <h2 id="help-cover-title">What Website Help can cover</h2>
              <ul className={styles.coverageList}>
                {coverage.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.scopePanel}>
              <p className={styles.sectionLabel}>Starting-scope rule</p>
              <h2>What the $200 starting scope means</h2>
              <p>
                The starting price applies to one bounded issue or diagnosis that can be
                responsibly reviewed and completed without opening a larger migration,
                redesign, recovery, or application project.
              </p>
              <p>
                If the visible problem depends on several providers, disputed ownership,
                missing access, extensive content, many affected pages, or custom
                functionality, Boho will define the next responsible scope before paid
                work continues.
              </p>
              <div className={styles.scopeStamp} aria-label="Scope rule: inspect, define, approve">
                <span>Inspect</span>
                <span>Define</span>
                <span>Approve</span>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.routeSection} aria-labelledby="help-routes-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Choose the useful route</p>
              <h2 id="help-routes-title">One messy website problem. Four responsible ways in.</h2>
              <p>
                Start with the situation that sounds closest. The whole tile opens the
                relevant next page.
              </p>
            </header>
            <div className={styles.routeMosaic}>
              {routes.map((route) => (
                <article className={styles[`routeWrap${route.number}`]} key={route.title}>
                  <Link
                    className={`${styles.routeCard} ${styles[route.tone]}`}
                    href={route.href}
                  >
                    <span className={styles.routeNumber} aria-hidden="true">{route.number}</span>
                    <div>
                      <p className={styles.routeType}>Website Help route</p>
                      <h3>{route.title}</h3>
                      <p>{route.copy}</p>
                    </div>
                    <span className={styles.routeAction}>
                      {route.action} <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.processSection} aria-labelledby="help-process-title">
          <div className={styles.shell}>
            <header className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Bounded work, visible decisions</p>
              <h2 id="help-process-title">Process</h2>
            </header>
            <ol className={styles.processGrid}>
              {process.map(([title, copy], index) => (
                <li key={title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
            <nav className={styles.supportingLinks} aria-label="Supporting Website Help links">
              <Link href="/services/provider-rescue/">Provider Rescue and Migration</Link>
              <Link href="/services/research-audits-strategy/">Research, Audits, and Strategy</Link>
              <Link href="/services/web-design-redesign/">Business Websites</Link>
              <Link href="/emergency/">Emergency Help</Link>
            </nav>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="help-final-title">
          <div className={`${styles.shell} ${styles.finalGrid}`}>
            <div>
              <p className={styles.sectionLabel}>Send the visible situation</p>
              <h2 id="help-final-title">
                What is broken, unclear, or controlled by the wrong provider?
              </h2>
              <p>
                Send the visible situation. Boho will identify whether it fits focused
                Website Help or requires a larger written scope.
              </p>
            </div>
            <ButtonLink href="/start/">Get a free website review</ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
