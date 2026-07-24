import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../../content/commercial/presentation";
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
                <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={startDestination}>{hero.one("Primary CTA")}</a>
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
                const label = index === 3
                  ? correctionValue(emergencyCorrection.linkLabel)
                  : path.one("Link label");
                return (
                  <article key={path.one("Heading")}>
                    <h3>{path.one("Heading")}</h3>
                    <p>{body}</p>
                    <a href={href}>{label}</a>
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
  const hero = commercialSection("start", "hero");
  const bodyOne = hero.many("Body paragraph 1").at(-1);
  const bodyTwo = hero.many("Body paragraph 2").at(-1);
  if (!bodyOne || !bodyTwo) throw new Error("Start hero body is incomplete.");
  return (
    <>
      <Header />
      <main className="commercial-page commercial-start-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="start-commercial-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="start-commercial-title">{hero.one("Headline")}</h1>
              <p>{bodyOne}</p>
              <p>{bodyTwo}</p>
              <a className="button-link button-link--secondary" href={hero.one("Secondary destination")}>{hero.one("Secondary link")}</a>
            </div>
          </div>
        </section>
        <section className="commercial-section commercial-form-section">
          <div className="section-shell"><CommercialInquiryForm kind="start" /></div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function CommercialEmergencyPage() {
  const hero = commercialSection("emergency", "hero");
  const appropriate = commercialSection("emergency", "appropriate-emergency-situations");
  const ordinary = commercialSection("emergency", "not-an-emergency-route");
  const process = commercialSection("emergency", "first-response-process");
  const pricing = commercialSection("emergency", "availability-and-pricing");
  const access = commercialSection("emergency", "authorized-access-boundary");
  const responder = commercialSection("emergency", "when-boho-is-not-the-right-responder");
  const finalBoundary = commercialSection("emergency", "final-boundary");
  const processStages = [1, 2, 3, 4].map((number) => ({
    heading: process.one(`Stage ${number} heading`),
    body: process.one(`Stage ${number} body`),
  }));

  return (
    <>
      <Header />
      <main className="commercial-page commercial-emergency-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="emergency-commercial-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="emergency-commercial-title">{hero.one("Headline")}</h1>
              <p>{hero.one("Body paragraph 1")}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className="button-row">
                <a className="button-link button-link--primary" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                <a className="button-link button-link--secondary" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
              <strong>{hero.one("Trust line")}</strong>
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-emergency-split">
          <div className="section-shell commercial-emergency-split__grid">
            <article>
              <p className="eyebrow">{appropriate.one("Eyebrow")}</p>
              <h2>{appropriate.one("Heading")}</h2>
              <ul>{[appropriate.one("Items"), ...appropriate.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <p className="eyebrow">{ordinary.one("Eyebrow")}</p>
              <h2>{ordinary.one("Heading")}</h2>
              <ul>{[ordinary.one("Items"), ...ordinary.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={ordinary.one("Standard destination")}>{ordinary.one("Standard link label")}</a>
            </article>
          </div>
        </section>

        <section className="commercial-section commercial-timeline" aria-labelledby="emergency-process-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{process.one("Eyebrow")}</p>
              <h2 id="emergency-process-title">{process.one("Heading")}</h2>
            </header>
            <ol>{processStages.map((stage) => <li key={stage.heading}><h3>{stage.heading}</h3><p>{stage.body}</p></li>)}</ol>
          </div>
        </section>

        <section className="commercial-section commercial-emergency-boundaries">
          <div className="section-shell commercial-emergency-boundaries__grid">
            <article><h2>{pricing.one("Heading")}</h2><p>{pricing.one("Body paragraph 1")}</p><p>{pricing.one("Body paragraph 2")}</p><p>{pricing.one("Body paragraph 3")}</p></article>
            <article><h2>{access.one("Heading")}</h2><ul>{[access.one("Items"), ...access.many("value")].map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        <section className="commercial-section commercial-form-section">
          <div className="section-shell"><CommercialInquiryForm kind="emergency" /></div>
        </section>

        <section className="commercial-section commercial-boundary" aria-labelledby="responder-title">
          <div className="section-shell">
            <h2 id="responder-title">{responder.one("Heading")}</h2>
            <ul>{[responder.one("Items"), ...responder.many("value")].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="commercial-section commercial-final" aria-labelledby="emergency-final-title">
          <div className="section-shell">
            <h2 id="emergency-final-title">{finalBoundary.one("Heading")}</h2>
            <p>{finalBoundary.one("Body")}</p>
            <div className="button-row">
              <a className="button-link button-link--primary" href={finalBoundary.one("Primary destination")}>{finalBoundary.one("Primary CTA")}</a>
              <a className="button-link button-link--secondary" href={finalBoundary.one("Secondary destination")}>{finalBoundary.one("Secondary CTA")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
