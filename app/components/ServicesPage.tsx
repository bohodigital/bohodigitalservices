import {
  commercialSection,
} from "../content/commercial/presentation";
import { Footer, Header } from "./commercial/CommercialChrome";

const serviceRows = [
  ["local-visibility-lead-systems", "service-local-visibility", "local-visibility-lead-systems"],
  ["websites-managed-hosting", "service-websites-hosting", "websites-managed-hosting"],
  ["provider-rescue-migration", "service-provider-rescue", "provider-rescue-migration"],
  ["research-analytics-improvement", "service-research-analytics", "research-analytics-improvement"],
  ["custom-tools-automation", "service-custom-tools", "custom-tools-automation"],
] as const;

export function ServicesPage() {
  const hero = commercialSection("services-overview", "hero");
  const chooser = commercialSection("services-overview", "problem-chooser");
  const comparison = commercialSection("services-overview", "service-comparison");
  const workType = commercialSection("services-overview", "one-time-or-recurring");
  const oneTime = commercialSection("services-overview", "one-time-work");
  const recurring = commercialSection("services-overview", "recurring-work");
  const stop = commercialSection("services-overview", "stop-condition");
  const recommendation = commercialSection("services-overview", "how-the-recommendation-is-made");
  const free = commercialSection("services-overview", "free-first-look");
  const finalCta = commercialSection("services-overview", "final-cta");

  const problems = [1, 2, 3, 4, 5].map((number) => {
    const section = commercialSection("services-overview", `problem-${number}`);
    return {
      heading: section.one("Heading"),
      body: section.one("Body"),
      service: section.one("Recommended service"),
      label: section.one("Link label"),
      href: section.one("Destination"),
    };
  });

  return (
    <>
      <Header />
      <main className="commercial-page commercial-services-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="services-commercial-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="services-commercial-title">{hero.one("Headline")}</h1>
              <p>{hero.one("Body paragraph 1")}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className="button-row">
                <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                <a className="button-link button-link--secondary" data-umami-event="commercial_pricing_cta" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
            </div>
            <aside className="commercial-hero__aside"><strong>{hero.one("Trust line")}</strong></aside>
          </div>
        </section>

        <section className="commercial-section commercial-problems" aria-labelledby="services-problem-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{chooser.one("Eyebrow")}</p>
              <h2 id="services-problem-title">{chooser.one("Heading")}</h2>
              <p>{chooser.one("Introduction")}</p>
            </header>
            <div className="commercial-problems__grid">
              {problems.map((problem) => (
                <article key={problem.heading}>
                  <h3>{problem.heading}</h3>
                  <p>{problem.body}</p>
                  <strong>{problem.service}</strong>
                  <a href={problem.href}>{problem.label}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-comparison" aria-labelledby="services-comparison-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{comparison.one("Eyebrow")}</p>
              <h2 id="services-comparison-title">{comparison.one("Heading")}</h2>
              <p>{comparison.one("Intro")}</p>
            </header>
            <div className="commercial-comparison__grid">
              {serviceRows.map(([rowKey, pageKey, layerKey]) => {
                const row = commercialSection("services-overview", rowKey);
                const layer = commercialSection(pageKey, layerKey);
                return (
                  <article key={rowKey}>
                    <h3>{commercialSection(pageKey, layerKey, "035").one("Eyebrow")}</h3>
                    <p>{row.one("Primary problem")}</p>
                    <div className="commercial-comparison__prices">
                      <strong>{row.one("First paid scope")}</strong>
                      {row.optional("Second paid scope") ? <strong>{row.one("Second paid scope")}</strong> : null}
                      {row.optional("Third paid scope") ? <strong>{row.one("Third paid scope")}</strong> : null}
                    </div>
                    <p>{row.one("Engagement type")}</p>
                    <p>{row.one("Planning range")}</p>
                    {row.optional("Shared comparison qualification") ? <p>{row.one("Shared comparison qualification")}</p> : null}
                    <a href={layer.one("Canonical route")}>{row.one("Link label")}</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-work-types" aria-labelledby="work-types-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{workType.one("Eyebrow")}</p>
              <h2 id="work-types-title">{workType.one("Heading")}</h2>
            </header>
            <div className="commercial-work-types__grid">
              <article><h3>{oneTime.one("Heading")}</h3><p>{oneTime.one("Body")}</p></article>
              <article><h3>{recurring.one("Heading")}</h3><p>{recurring.one("Body")}</p></article>
              <article><h3>{stop.one("Heading")}</h3><p>{stop.one("Body")}</p><blockquote>{stop.one("Quote")}</blockquote></article>
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-recommendation" aria-labelledby="recommendation-title">
          <div className="section-shell commercial-recommendation__grid">
            <div>
              <p className="eyebrow">{recommendation.one("Eyebrow")}</p>
              <h2 id="recommendation-title">{recommendation.one("Heading")}</h2>
              <p>{recommendation.one("Closing paragraph")}</p>
            </div>
            <ul>
              {[recommendation.one("Questions"), ...recommendation.many("value")].map((question) => <li key={question}>{question}</li>)}
            </ul>
          </div>
        </section>

        <section className="commercial-section commercial-free-review" aria-labelledby="free-review-title">
          <div className="section-shell commercial-free-review__grid">
            <div>
              <p className="eyebrow">{free.one("Eyebrow")}</p>
              <h2 id="free-review-title">{free.one("Heading")}</h2>
              <strong>{free.one("Price")}</strong>
            </div>
            <div>
              <p>{free.one("Body paragraph 1")}</p>
              <p>{free.one("Body paragraph 2")}</p>
              <p>{free.one("Planning range")}</p>
              <a data-umami-event="commercial_primary_cta" href={free.one("Destination")}>{free.one("CTA")}</a>
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-final" aria-labelledby="services-final-title">
          <div className="section-shell">
            <h2 id="services-final-title">{finalCta.one("Heading")}</h2>
            <p>{finalCta.one("Body")}</p>
            <div className="button-row">
              <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={finalCta.one("Primary destination")}>{finalCta.one("Primary CTA")}</a>
              <a className="button-link button-link--secondary" data-umami-event="commercial_pricing_cta" href={finalCta.one("Secondary destination")}>{finalCta.one("Secondary CTA")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
