import Link from "next/link";

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
  ["Focused repair", "Correct one defined defect or customer-path problem."],
  ["Technical review", "Determine why one specific website, analytics, search, accessibility, or integration issue is occurring."],
  ["Provider rescue", "Map ownership, access, dependencies, and a responsible exit or recovery path."],
  ["Migration help", "Move a website or supporting system while preserving the URLs, content, customer paths, and account control that should survive."],
] as const;

const process = [
  ["Free public review", "Send the site and explain the visible problem."],
  ["Bound the issue", "Boho identifies what can be inspected publicly and what access may be needed."],
  ["Approve the work", "Paid work begins only through a written scope and price."],
  ["Repair and verify", "Boho completes the agreed work, checks the target behavior, and documents remaining limitations."],
] as const;

export function WebsiteHelpPage() {
  return (
    <>
      <Header />
      <main className="reset-service-page" id="main-content" tabIndex={-1}>
        <section className="reset-interior-hero" aria-labelledby="website-help-title">
          <div className="reset-shell reset-interior-hero__grid">
            <div>
              <p className="reset-eyebrow">WEBSITE HELP · FROM $200</p>
              <h1 id="website-help-title">Fix the useful problem without automatically rebuilding everything.</h1>
              <p>Website Help covers focused repairs, diagnosis, provider trouble, migrations, analytics problems, accessibility issues, and ownership cleanup. One bounded issue may fit the $200 starting scope. Larger recovery or implementation work receives a written quote after review.</p>
              <div className="reset-actions">
                <ButtonLink href="/start/">Get a free website review</ButtonLink>
                <ButtonLink href="/pricing/" variant="secondary">See pricing</ButtonLink>
              </div>
            </div>
            <aside className="reset-interior-hero__receipt"><strong className="reset-price">From $200</strong><p>One bounded issue or diagnosis.</p></aside>
          </div>
        </section>

        <section className="reset-section" aria-labelledby="help-cover-title">
          <div className="reset-shell reset-service-detail__split">
            <article>
              <h2 id="help-cover-title">What Website Help can cover</h2>
              <ul>{coverage.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h2>What the $200 starting scope means</h2>
              <p>The starting price applies to one bounded issue or diagnosis that can be responsibly reviewed and completed without opening a larger migration, redesign, recovery, or application project.</p>
              <p>If the visible problem depends on several providers, disputed ownership, missing access, extensive content, many affected pages, or custom functionality, Boho will define the next responsible scope before paid work continues.</p>
            </article>
          </div>
        </section>

        <section className="reset-section" aria-labelledby="help-routes-title">
          <div className="reset-shell">
            <header className="reset-heading"><h2 id="help-routes-title">Common routes</h2></header>
            <div className="reset-services__grid">{routes.map(([title, copy]) => <article className="reset-service-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="reset-section reset-process" aria-labelledby="help-process-title">
          <div className="reset-shell">
            <header className="reset-heading"><h2 id="help-process-title">Process</h2></header>
            <ol className="reset-process__grid">{process.map(([title, copy], index) => <li key={title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
            <nav className="reset-supporting-links" aria-label="Supporting Website Help links">
              <Link href="/services/provider-rescue/">Provider Rescue and Migration</Link>
              <Link href="/services/research-audits-strategy/">Research, Audits, and Strategy</Link>
              <Link href="/services/web-design-redesign/">Business Websites</Link>
              <Link href="/emergency/">Emergency Help</Link>
            </nav>
          </div>
        </section>

        <section className="reset-section reset-final" aria-labelledby="help-final-title">
          <div className="reset-shell reset-final__grid">
            <div><h2 id="help-final-title">What is broken, unclear, or controlled by the wrong provider?</h2><p>Send the visible situation. Boho will identify whether it fits focused Website Help or requires a larger written scope.</p></div>
            <ButtonLink href="/start/">Get a free website review</ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
