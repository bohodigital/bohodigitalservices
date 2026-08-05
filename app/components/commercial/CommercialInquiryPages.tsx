import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../../content/commercial/presentation";
import { Footer, Header } from "./CommercialChrome";

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

export {
  CommercialEmergencyPage,
  CommercialStartPage,
} from "./CommercialConversionPages";
