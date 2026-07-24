import {
  commercialCorrections,
  commercialSection,
  correctionValue,
} from "../content/commercial/presentation";
import { Footer, Header } from "./commercial/CommercialChrome";

const artifactKeys = [
  "artifact-1-website-ownership-map",
  "artifact-2-vanity-metrics-migration-record",
  "artifact-3-glossary-and-route-validation",
  "artifact-4-boho-analytics-site-graph",
  "artifact-5-rank-builder-publishing-system",
  "artifact-6-better-grades-learning-interfaces",
  "artifact-7-fictional-business-interfaces",
] as const;

export function WorkEvidencePage() {
  const hero = commercialSection("work-evidence", "hero");
  const standard = commercialSection("work-evidence", "evidence-standard");
  const method = commercialSection("work-evidence", "method-section");
  const boundary = commercialSection("work-evidence", "evidence-request-boundary");
  const finalCta = commercialSection("work-evidence", "final-cta");
  const correctionSourceClasses = new Map(
    commercialCorrections.evidence.artifacts.map((artifact) => [
      correctionValue(artifact.title),
      correctionValue(artifact.sourceClass),
    ]),
  );
  const labels = [standard.one("Field labels"), ...standard.many("value")];
  const artifacts = artifactKeys.map((key) => commercialSection("work-evidence", key));

  return (
    <>
      <Header />
      <main className="commercial-page commercial-work-page" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="commercial-work-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="commercial-work-title">{hero.one("Headline")}</h1>
              <p>{correctionValue(commercialCorrections.evidence.workHeroIntroduction)}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className="button-row">
                <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</a>
                <a className="button-link button-link--secondary" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</a>
              </div>
            </div>
            <aside className="commercial-hero__aside">
              <h2>{standard.one("Heading")}</h2>
              <p>{standard.one("Supporting paragraph")}</p>
              <ul>{labels.map((label) => <li key={label}>{label}</li>)}</ul>
            </aside>
          </div>
        </section>

        <section className="commercial-section commercial-artifacts" aria-labelledby="artifact-list-title">
          <div className="section-shell">
            <span id="website-work" />
            <span id="provider-rescue" />
            <span id="public-tools" />
            <h2 className="sr-only" id="artifact-list-title">{standard.one("Heading")}</h2>
            <div className="commercial-artifacts__grid">
              {artifacts.map((artifact, index) => {
                const title = artifact.one("Title");
                const sourceClass = artifact.optional("Source class") ?? correctionSourceClasses.get(title);
                const currentStatus = artifact.optional("Current status")
                  ?? (index === 2 ? correctionValue(commercialCorrections.glossaryEvidence.currentStatus) : undefined);
                if (!sourceClass || !currentStatus) {
                  throw new Error(`Evidence provenance is incomplete: ${title}`);
                }
                return (
                  <article id={artifact.one("Anchor").slice(1)} key={title}>
                    {artifact.optional("Required visible label") ? <strong>{artifact.one("Required visible label")}</strong> : null}
                    <h3>{title}</h3>
                    <p>{artifact.one("Summary")}</p>
                    <dl>
                      <div><dt>{labels[0]}</dt><dd>{sourceClass}</dd></div>
                      <div><dt>{labels[1]}</dt><dd>{artifact.one("What this demonstrates")}</dd></div>
                      <div><dt>{labels[2]}</dt><dd>{artifact.one("What this does not demonstrate")}</dd></div>
                      <div><dt>{labels[3]}</dt><dd>{currentStatus}</dd></div>
                    </dl>
                    <a data-umami-event="commercial_evidence_open" href={artifact.one("Anchor")}>{artifact.one("Open label")}</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-method" aria-labelledby="commercial-method-title">
          <div className="section-shell commercial-method__grid">
            <div>
              <p className="eyebrow">{method.one("Eyebrow")}</p>
              <h2 id="commercial-method-title">{method.one("Heading")}</h2>
            </div>
            <ol>{[method.one("Items"), ...method.many("value")].map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </section>

        <section className="commercial-section commercial-boundary" aria-labelledby="evidence-boundary-title">
          <div className="section-shell">
            <h2 id="evidence-boundary-title">{boundary.one("Heading")}</h2>
            <p>{boundary.one("Body")}</p>
          </div>
        </section>

        <section className="commercial-section commercial-final" aria-labelledby="work-final-title">
          <div className="section-shell">
            <h2 id="work-final-title">{finalCta.one("Heading")}</h2>
            <p>{finalCta.one("Body")}</p>
            <div className="button-row">
              <a className="button-link button-link--primary" data-umami-event="commercial_primary_cta" href={finalCta.one("Primary destination")}>{finalCta.one("Primary CTA")}</a>
              <a className="button-link button-link--secondary" href={finalCta.one("Secondary destination")}>{finalCta.one("Secondary CTA")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
