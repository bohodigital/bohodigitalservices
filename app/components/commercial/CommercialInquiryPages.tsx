import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../../content/commercial/presentation";
import Link from "next/link";
import { commercialInquiryV2, freeReviewPage } from "../../content/commercialReset";
import { DefinedText } from "../DefinedText";
import { Footer, Header } from "./CommercialChrome";
import { CommercialInquiryForm } from "./CommercialInquiryForm";

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
      <main className="commercial-page commercial-contact-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="contact-commercial-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="contact-commercial-title">{hero.one("Headline")}</h1>
              <p>{startHero.many("Body paragraph 1")[0]}</p>
              <p>{startHero.many("Body paragraph 2")[0]}</p>
              <div className="button-row">
                <a
                  className="button-link button-link--primary"
                  data-analytics-event="free_review_click"
                  data-analytics-service-context="general"
                  data-analytics-source-page="contact"
                  data-analytics-source-section="hero"
                  href={startDestination}
                >
                  Get a free website review
                </a>
                <a className="button-link button-link--secondary" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
            </div>
          </div>
        </section>
        <section className="commercial-section commercial-contact-paths" aria-labelledby="contact-paths-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{paths.one("Section eyebrow")}</p>
              <h2 id="contact-paths-title">{correctionValue(commercialCorrections.contact.heading)}</h2>
            </header>
            <div className="commercial-contact-paths__grid">
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
                return (
                  <article key={path.one("Heading")}>
                    <h3>{path.one("Heading")}</h3>
                    <p>{body}</p>
                    <a
                      {...(index === 0
                        ? {
                            "data-analytics-event": "free_review_click",
                            "data-analytics-service-context": "general",
                            "data-analytics-source-page": "contact",
                            "data-analytics-source-section": "contact_paths",
                          }
                        : {})}
                      href={href}
                    >
                      {label}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="commercial-section commercial-boundary" aria-labelledby="contact-privacy-title">
          <div className="section-shell">
            <h2 id="contact-privacy-title">{privacy.one("Heading")}</h2>
            <p>{commercialSection("start", "privacy-reminder").one("Body")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function CommercialStartPage() {
  const { start } = commercialInquiryV2;
  return (
    <>
      <Header />
      <main className="commercial-page commercial-start-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero commercial-inquiry-hero" aria-labelledby="start-commercial-title">
          <div className="section-shell commercial-inquiry-hero__grid">
            <div className="commercial-inquiry-hero__copy">
              <p className="eyebrow eyebrow--on-dark">{freeReviewPage.eyebrow}</p>
              <h1 id="start-commercial-title">{freeReviewPage.headline}</h1>
              <p>{freeReviewPage.body}</p>
              <div className="button-row">
                <a className="button-link button-link--primary" data-analytics-event="start_hero_cta_click" data-analytics-source-page="start" data-analytics-source-section="hero" href="#free-review-form">Start the free review</a>
                <Link className="commercial-text-link commercial-text-link--on-dark" data-analytics-event="start_emergency_detour_click" data-analytics-source-page="start" data-analytics-source-section="hero" href="/emergency/">My website is actively broken</Link>
              </div>
              <p className="commercial-inquiry-hero__expectation">{start.expectation}</p>
            </div>
            <aside className="commercial-review-slip" aria-labelledby="free-review-gives-title">
              <p className="commercial-review-slip__kicker">INITIAL REVIEW</p>
              <h2 id="free-review-gives-title">{start.reviewCard.heading}</h2>
              <ul>{start.reviewCard.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <dl>{start.reviewCard.fields.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
              <p>{start.reviewCard.closing}</p>
            </aside>
          </div>
        </section>
        <section className="commercial-reassurance" aria-label="Reasons to trust the review">
          <div className="section-shell commercial-reassurance__inner">
            <ul>{start.reassurance.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link data-analytics-event="start_work_link_click" data-analytics-source-page="start" data-analytics-source-section="reassurance" href="/work/">See work built by Boho</Link>
          </div>
        </section>
        <section className="commercial-section commercial-form-section" id="free-review-form">
          <div className="section-shell commercial-form-layout">
            <div>
              <p className="commercial-definition-intro"><DefinedText text="The review looks at [[website-clarity]], [[seo|SEO]], and the most important [[customer-action]] when those are relevant." /></p>
              <CommercialInquiryForm kind="start" />
            </div>
            <aside className="commercial-expectation-card">
              <h2>{start.expectationCard.heading}</h2>
              <ul>{start.expectationCard.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link data-analytics-event="start_pricing_link_click" data-analytics-source-page="start" data-analytics-source-section="before_send" href="/pricing/">See complete pricing</Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function CommercialEmergencyPage() {
  const { emergency } = commercialInquiryV2;
  const seenTerms = new Set<string>();

  return (
    <>
      <Header />
      <main className="commercial-page commercial-emergency-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero commercial-inquiry-hero" aria-labelledby="emergency-commercial-title">
          <div className="section-shell commercial-inquiry-hero__grid">
            <div className="commercial-inquiry-hero__copy">
              <p className="eyebrow eyebrow--on-dark">{emergency.eyebrow}</p>
              <h1 id="emergency-commercial-title">{emergency.headline}</h1>
              <p><DefinedText seenTerms={seenTerms} text={emergency.body.replace("redirect", "[[redirect]]")} /></p>
              <div className="button-row">
                <a className="button-link button-link--primary" data-analytics-event="emergency_hero_cta_click" data-analytics-source-page="emergency" data-analytics-source-section="hero" href="#emergency-request">Describe the emergency</a>
                <Link className="commercial-text-link commercial-text-link--on-dark" data-analytics-event="emergency_standard_detour_click" data-analytics-source-page="emergency" data-analytics-source-section="hero" href="/start/">This can wait</Link>
              </div>
              <p className="commercial-inquiry-hero__expectation">{emergency.trust}</p>
            </div>
            <aside className="commercial-first-response" aria-labelledby="first-response-title">
              <p className="commercial-review-slip__kicker">FIRST RESPONSE</p>
              <h2 id="first-response-title">{emergency.firstResponse.heading}</h2>
              <ol>{emergency.firstResponse.steps.map(([heading, body], index) => <li key={heading}><span>{index + 1}</span><div><h3>{heading}</h3><p><DefinedText seenTerms={seenTerms} text={body.replaceAll("DNS", "[[dns|DNS]]")} /></p></div></li>)}</ol>
              <p>{emergency.firstResponse.closing}</p>
            </aside>
          </div>
        </section>

        <section className="commercial-section commercial-emergency-fit" aria-labelledby="emergency-fit-title">
          <div className="section-shell">
            <header className="commercial-section__heading"><p className="eyebrow">ACTIVE INCIDENTS</p><h2 id="emergency-fit-title">{emergency.fit.heading}</h2></header>
            <div className="commercial-emergency-fit__grid">
              {emergency.fit.cards.map(([heading, body]) => <article key={heading}><h3>{heading}</h3><p><DefinedText seenTerms={seenTerms} text={body.replace("domain", "[[domain-name|domain]]").replaceAll("analytics", "[[analytics]]")} /></p></article>)}
            </div>
            <div className="commercial-standard-route"><div><strong>Not active or urgent?</strong><p>Use the free website review for ordinary repairs, redesigns, audits, migrations, SEO questions, or provider concerns.</p></div><Link data-analytics-event="emergency_standard_detour_click" data-analytics-source-page="emergency" data-analytics-source-section="fit" href="/start/">Start the free website review</Link></div>
          </div>
        </section>

        <section className="commercial-section commercial-timeline commercial-emergency-process" aria-labelledby="emergency-process-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">CONTROLLED RESPONSE</p>
              <h2 id="emergency-process-title">A four-stage response, without a recovery-time promise.</h2>
            </header>
            <ol>{emergency.process.map(([heading, body], index) => <li key={heading}><span className="commercial-process-number">0{index + 1}</span><h3>{heading}</h3><p><DefinedText seenTerms={seenTerms} text={index === 1 ? `${body} Keep a [[rollback]] path when one exists.` : body} /></p></li>)}</ol>
          </div>
        </section>

        <section className="commercial-section commercial-emergency-pricing" aria-labelledby="emergency-pricing-title">
          <div className="section-shell commercial-emergency-pricing__inner">
            <div><p className="eyebrow">SCOPE AND AVAILABILITY</p><h2 id="emergency-pricing-title">{emergency.pricing.heading}</h2></div>
            <div><p>{emergency.pricing.body}</p><strong>{emergency.pricing.clarification}</strong></div>
          </div>
        </section>

        <section className="commercial-section commercial-form-section">
          <div className="section-shell"><CommercialInquiryForm kind="emergency" /></div>
        </section>

        <section className="commercial-section commercial-emergency-boundaries" aria-label="Emergency service boundaries">
          <div className="section-shell commercial-emergency-boundaries__grid">
            {emergency.boundaries.map(([heading, body]) => <article key={heading}><h2>{heading}</h2><p>{body}</p></article>)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
