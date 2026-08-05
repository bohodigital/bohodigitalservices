import Link from "next/link";

import { DefinedText } from "../DefinedText";
import {
  emergencyConversionPage,
  startConversionPage,
} from "../../content/commercial/conversionPages";
import { proofProjects } from "../../content/commercialReset";
import { Footer, Header } from "./CommercialChrome";
import { CommercialInquiryForm } from "./CommercialInquiryForm";
import styles from "./conversion-pages.module.css";

type DefinitionMark = {
  label: string;
  slug: string;
};

function DefinedCopy({
  text,
  terms,
}: {
  text: string;
  terms: ReadonlyArray<DefinitionMark>;
}) {
  let markedText = text;
  for (const term of terms) {
    if (!markedText.includes(term.label)) {
      throw new Error(`Commercial definition label is missing: ${term.label}`);
    }
    markedText = markedText.replace(term.label, `[[${term.slug}|${term.label}]]`);
  }
  return <DefinedText text={markedText} />;
}

function SectionHeading({
  eyebrow,
  heading,
  id,
  intro,
}: {
  eyebrow: string;
  heading: string;
  id: string;
  intro?: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id}>{heading}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

export function CommercialStartPage() {
  const page = startConversionPage;

  return (
    <>
      <Header />
      <main className={`commercial-page commercial-start-page ${styles.page}`} id="main-content" tabIndex={-1}>
        <section className={`${styles.hero} ${styles.startHero}`} aria-labelledby="start-commercial-title">
          <div className={`section-shell ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>{page.hero.eyebrow}</p>
              <h1 id="start-commercial-title">{page.hero.heading}</h1>
              <p className={styles.heroLead}>{page.hero.lead}</p>
              <p className={styles.heroSupport}>{page.hero.support}</p>
              <div className={styles.heroActions}>
                <a
                  className="button-link button-link--primary"
                  data-analytics-event="start_hero_cta_click"
                  data-analytics-source-page="start"
                  data-analytics-source-section="hero"
                  href="#project-inquiry"
                >
                  {page.hero.primaryCta}
                </a>
                <Link
                  className="button-link button-link--secondary"
                  data-analytics-event="start_work_link_click"
                  data-analytics-source-page="start"
                  data-analytics-source-section="hero"
                  href="/work/"
                >
                  {page.hero.secondaryCta}
                </Link>
              </div>
              <ul className={styles.trustList}>
                {page.hero.trust.map((label) => <li key={label}>{label}</li>)}
              </ul>
            </div>

            <aside className={styles.reviewStack} aria-label={page.hero.example.label}>
              <div className={styles.reviewCard}>
                <header>
                  <p className={styles.cardLabel}>{page.hero.example.label}</p>
                  <h2>{page.hero.example.heading}</h2>
                </header>
                <dl>
                  {page.hero.example.rows.map((row, index) => (
                    <div key={row.heading}>
                      <dt><span>{String(index + 1).padStart(2, "0")}</span>{row.heading}</dt>
                      <dd>
                        {row.heading === "What we found" ? (
                          <DefinedCopy text={row.body} terms={[{ label: "customer action", slug: "conversion" }]} />
                        ) : row.heading === "Best next move" ? (
                          <DefinedCopy text={row.body} terms={[{ label: "SEO", slug: "seo" }]} />
                        ) : row.body}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className={styles.cardNote}>{page.hero.example.note}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.detour} aria-labelledby="start-active-incident-title">
          <div className={`section-shell ${styles.detourGrid}`}>
            <h2 id="start-active-incident-title">{page.emergencyDetour.heading}</h2>
            <p>{page.emergencyDetour.body}</p>
            <Link
              className="button-link button-link--secondary"
              data-analytics-event="start_emergency_detour_click"
              data-analytics-source-page="start"
              data-analytics-source-section="active_incident"
              href="/emergency/"
            >
              {page.emergencyDetour.cta}
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.valueSection}`} aria-labelledby="start-value-title">
          <div className="section-shell">
            <SectionHeading
              eyebrow={page.value.eyebrow}
              heading={page.value.heading}
              id="start-value-title"
              intro={page.value.intro}
            />
            <div className={styles.valueGrid}>
              {page.value.cards.map((card, index) => (
                <article key={card.heading}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{card.heading}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.proofSection}`} aria-labelledby="start-proof-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.proof.eyebrow} heading={page.proof.heading} id="start-proof-title" />
            <p className={styles.proofIntro}>
              <DefinedCopy text={page.proof.body} terms={[{ label: "analytics", slug: "analytics" }]} />
            </p>
            <div className={styles.proofGrid}>
              {proofProjects.map((project) => (
                <article key={project.name}>
                  <a
                    data-analytics-destination-type="live_property"
                    data-analytics-event="work_project_click"
                    data-analytics-project-name={project.name}
                    href={project.href}
                  >
                    <div className={styles.proofImage}>
                      <img alt={project.alt} height="800" loading="lazy" src={project.image} width="1280" />
                    </div>
                    <span className={styles.cardLabel}>{project.label}</span>
                    <h3>{project.name}</h3>
                    <p>{project.copy}</p>
                  </a>
                </article>
              ))}
            </div>
            <div className={styles.sectionAction}>
              <Link
                className="button-link button-link--secondary"
                data-analytics-event="start_work_link_click"
                data-analytics-source-page="start"
                data-analytics-source-section="proof"
                href="/work/"
              >
                {page.proof.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="start-process-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.process.eyebrow} heading={page.process.heading} id="start-process-title" />
            <ol className={styles.processGrid}>
              {page.process.steps.map((step) => (
                <li key={step.heading}>
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.boundarySection}`} aria-labelledby="start-boundary-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.boundary.eyebrow} heading={page.boundary.heading} id="start-boundary-title" />
            <div className={styles.boundaryGrid}>
              <article>
                <h3>{page.boundary.goodHeading}</h3>
                <ul>{page.boundary.goodItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article>
                <h3>{page.boundary.paidHeading}</h3>
                <ul>{page.boundary.paidItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
            <p className={styles.boundaryNote}>{page.boundary.note}</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.formSection}`} aria-label={page.form.eyebrow}>
          <div className="section-shell">
            <p className={styles.eyebrow}>{page.form.eyebrow}</p>
            <p className={styles.pricingContext}>{page.form.pricing}</p>
            <CommercialInquiryForm kind="start" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function CommercialEmergencyPage() {
  const page = emergencyConversionPage;

  return (
    <>
      <Header />
      <main className={`commercial-page commercial-emergency-page ${styles.page}`} id="main-content" tabIndex={-1}>
        <section className={`${styles.hero} ${styles.emergencyHero}`} aria-labelledby="emergency-commercial-title">
          <div className={`section-shell ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.heroEyebrow}>{page.hero.eyebrow}</p>
              <h1 id="emergency-commercial-title">{page.hero.heading}</h1>
              <p className={styles.heroLead}>{page.hero.body[0]}</p>
              <p className={styles.heroSupport}>
                <DefinedCopy text={page.hero.body[1]} terms={[{ label: "Authorized access", slug: "authorization" }]} />
              </p>
              <div className={styles.heroActions}>
                <a
                  className="button-link button-link--primary"
                  data-analytics-event="emergency_hero_cta_click"
                  data-analytics-source-page="emergency"
                  data-analytics-source-section="hero"
                  href="#emergency-request"
                >
                  {page.hero.primaryCta}
                </a>
                <Link
                  className="button-link button-link--secondary"
                  data-analytics-event="emergency_standard_detour_click"
                  data-analytics-source-page="emergency"
                  data-analytics-source-section="hero"
                  href="/start/"
                >
                  {page.hero.secondaryCta}
                </Link>
              </div>
              <p className={styles.emergencyTrust}>{page.hero.trust}</p>
            </div>

            <aside className={styles.responseCard} aria-label={page.hero.response.label}>
              <header>
                <p className={styles.cardLabel}>{page.hero.response.label}</p>
                <h2>{page.hero.response.heading}</h2>
              </header>
              <ol>
                {page.hero.response.steps.map((step, index) => (
                  <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
                ))}
              </ol>
              <p className={styles.statusLabel}><span aria-hidden="true" />{page.hero.response.status}</p>
            </aside>
          </div>
        </section>

        <section className={`${styles.section} ${styles.guidanceSection}`} aria-labelledby="emergency-guidance-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.guidance.eyebrow} heading={page.guidance.heading} id="emergency-guidance-title" />
            <div className={styles.guidanceGrid}>
              {page.guidance.cards.map((card) => (
                <article key={card.heading}>
                  <h3>{card.heading}</h3>
                  <p>
                    {card.heading === "3. Preserve owner access" ? (
                      <DefinedCopy text={card.body} terms={[{ label: "domain", slug: "domain-name" }]} />
                    ) : card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.fitSection}`} aria-labelledby="emergency-fit-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.fit.eyebrow} heading={page.fit.heading} id="emergency-fit-title" />
            <div className={styles.fitGrid}>
              {page.fit.cards.map((card) => (
                <article key={card.heading}>
                  <h3>
                    {card.heading === "The domain or DNS changed" ? (
                      <DefinedCopy text={card.heading} terms={[{ label: "DNS", slug: "dns" }]} />
                    ) : card.heading}
                  </h3>
                  <p>
                    {card.heading === "A launch or migration failed" ? (
                      <DefinedCopy
                        text={card.body}
                        terms={[
                          { label: "redirects", slug: "redirect" },
                          { label: "production change", slug: "production-environment" },
                        ]}
                      />
                    ) : card.body}
                  </p>
                </article>
              ))}
            </div>
            <div className={styles.routeNote}>
              <p>{page.fit.standardNote}</p>
              <Link
                className="button-link button-link--secondary"
                data-analytics-event="emergency_standard_detour_click"
                data-analytics-source-page="emergency"
                data-analytics-source-section="emergency_fit"
                href="/start/"
              >
                {page.fit.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.emergencyProcess}`} aria-labelledby="emergency-process-title">
          <div className="section-shell">
            <SectionHeading eyebrow={page.process.eyebrow} heading={page.process.heading} id="emergency-process-title" />
            <ol className={styles.stageGrid}>
              {page.process.stages.map((stage) => (
                <li key={stage.heading}>
                  <h3>{stage.heading}</h3>
                  <p>
                    {stage.heading === "2. Stabilize the highest-value path" ? (
                      <DefinedCopy text={stage.body} terms={[{ label: "rollback", slug: "rollback" }]} />
                    ) : stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.prioritySection}`} aria-labelledby="emergency-pricing-title">
          <div className={`section-shell ${styles.priorityGrid}`}>
            <div>
              <p className={styles.eyebrow}>{page.pricing.eyebrow}</p>
              <h2 id="emergency-pricing-title">{page.pricing.heading}</h2>
            </div>
            <div>
              <p>{page.pricing.body}</p>
              <p className={styles.prioritySupport}>{page.pricing.support}</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.formSection} ${styles.emergencyForm}`} aria-label={page.form.eyebrow}>
          <div className="section-shell">
            <p className={styles.eyebrow}>{page.form.eyebrow}</p>
            <CommercialInquiryForm kind="emergency" />
          </div>
        </section>

        <section className={`${styles.section} ${styles.specialistSection}`} aria-labelledby="responder-title">
          <div className="section-shell">
            <div className={styles.specialistGrid}>
              <div>
                <h2 id="responder-title">{page.boundaries.heading}</h2>
                <ul>{page.boundaries.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.authorizationPanel}>
                <h3>{page.boundaries.authorizationHeading}</h3>
                <p>{page.boundaries.authorizationBody}</p>
              </div>
            </div>
            <div className={styles.finalBoundary}>
              <h2>{page.boundaries.finalHeading}</h2>
              <p>{page.boundaries.finalBody}</p>
              <div className={styles.heroActions}>
                <a
                  className="button-link button-link--primary"
                  data-analytics-event="emergency_hero_cta_click"
                  data-analytics-source-page="emergency"
                  data-analytics-source-section="final"
                  href="#emergency-request"
                >
                  {page.boundaries.primaryCta}
                </a>
                <Link
                  className="button-link button-link--secondary"
                  data-analytics-event="emergency_standard_detour_click"
                  data-analytics-source-page="emergency"
                  data-analytics-source-section="final"
                  href="/start/"
                >
                  {page.boundaries.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
