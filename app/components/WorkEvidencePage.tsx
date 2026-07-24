import {
  commercialCorrections,
  commercialCorrections068,
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

type ArtifactKey = typeof artifactKeys[number];

const evidenceGroups: ReadonlyArray<{
  id: string;
  heading: string;
  aliases: ReadonlyArray<string>;
  artifactKeys: ReadonlyArray<ArtifactKey>;
}> = [
  {
    id: "evidence-group-current-owned-property-work",
    heading: commercialCorrections068.work.groupHeadings.current,
    aliases: ["public-tools"],
    artifactKeys: [
      "artifact-4-boho-analytics-site-graph",
      "artifact-5-rank-builder-publishing-system",
      "artifact-6-better-grades-learning-interfaces",
    ],
  },
  {
    id: "evidence-group-public-technical-records",
    heading: commercialCorrections068.work.groupHeadings.technical,
    aliases: ["sample-report", "provider-rescue"],
    artifactKeys: [
      "artifact-2-vanity-metrics-migration-record",
      "artifact-3-glossary-and-route-validation",
    ],
  },
  {
    id: "evidence-group-samples-and-concept-work",
    heading: commercialCorrections068.work.groupHeadings.samples,
    aliases: ["website-work"],
    artifactKeys: [
      "artifact-1-website-ownership-map",
      "artifact-7-fictional-business-interfaces",
    ],
  },
];

function statusFor(key: ArtifactKey) {
  if (key === "artifact-1-website-ownership-map") return commercialCorrections068.work.statuses.sample;
  if (key === "artifact-7-fictional-business-interfaces") return commercialCorrections068.work.statuses.concept;
  return commercialCorrections068.work.statuses.current;
}

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
  const artifacts = new Map(artifactKeys.map((key) => {
    const section = commercialSection("work-evidence", key);
    const title = section.one("Title");
    const sourceClass = section.optional("Source class") ?? correctionSourceClasses.get(title);
    if (!sourceClass) throw new Error(`Evidence provenance is incomplete: ${title}`);
    return [key, {
      key,
      section,
      title,
      sourceClass,
      status: statusFor(key),
      destination: commercialCorrections068.work.destinations[key],
    }];
  }));

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

        <section className="commercial-section commercial-evidence-introduction" aria-labelledby="evidence-introduction-title">
          <div className="section-shell commercial-section__heading">
            <p className="eyebrow">{commercialCorrections068.work.eyebrow}</p>
            <h2 id="evidence-introduction-title">{commercialCorrections068.work.heading}</h2>
            <p>{commercialCorrections068.work.body}</p>
          </div>
        </section>

        <section className="commercial-section commercial-evidence-summary" aria-labelledby="evidence-summary-title">
          <div className="section-shell">
            <h2 className="sr-only" id="evidence-summary-title">{standard.one("Heading")}</h2>
            <div className="commercial-artifacts__grid">
              {artifactKeys.map((key) => {
                const artifact = artifacts.get(key);
                if (!artifact) throw new Error(`Evidence artifact is missing: ${key}`);
                return (
                  <article className="commercial-evidence-card" key={key}>
                    <strong>{artifact.status}</strong>
                    <h3>{artifact.title}</h3>
                    <p>{artifact.section.one("Summary")}</p>
                    <a data-umami-event="commercial_evidence_open" href={artifact.destination}>{commercialCorrections068.work.openLabel}</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <div className="commercial-evidence-details">
          {evidenceGroups.map((group) => (
            <section className="commercial-section commercial-evidence-group" id={group.id} aria-labelledby={`${group.id}-title`} key={group.id}>
              {group.aliases.map((alias) => <span className="commercial-anchor-alias" id={alias} key={alias} />)}
              <div className="section-shell">
                <h2 id={`${group.id}-title`}>{group.heading}</h2>
                <div className="commercial-evidence-group__grid">
                  {group.artifactKeys.map((key) => {
                    const artifact = artifacts.get(key);
                    if (!artifact) throw new Error(`Evidence artifact is missing: ${key}`);
                    const detailId = artifact.destination.split("#")[1];
                    return (
                      <article id={detailId} key={key}>
                        {artifact.section.optional("Required visible label") ? <strong>{artifact.section.one("Required visible label")}</strong> : null}
                        <h3>{artifact.title}</h3>
                        <p>{artifact.section.one("Summary")}</p>
                        <dl>
                          <div><dt>{labels[0]}</dt><dd>{artifact.sourceClass}</dd></div>
                          <div><dt>{labels[1]}</dt><dd>{artifact.section.one("What this demonstrates")}</dd></div>
                          <div><dt>{labels[2]}</dt><dd>{artifact.section.one("What this does not demonstrate")}</dd></div>
                          <div><dt>{labels[3]}</dt><dd>{artifact.status}</dd></div>
                        </dl>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

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
