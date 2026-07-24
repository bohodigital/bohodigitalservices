import type { ReactNode } from "react";

import {
  commercialCorrections,
  commercialCorrections068,
  commercialSection,
  correctionValue,
} from "./content/commercial/presentation";
import { Footer, Header } from "./components/commercial/CommercialChrome";

const serviceLayers = [
  ["service-local-visibility", "local-visibility-lead-systems"],
  ["service-websites-hosting", "websites-managed-hosting"],
  ["service-provider-rescue", "provider-rescue-migration"],
  ["service-custom-tools", "custom-tools-automation"],
  ["service-research-analytics", "research-analytics-improvement"],
] as const;

function TrackedLink({
  href,
  children,
  event,
  className,
}: {
  href: string;
  children: ReactNode;
  event: string;
  className?: string;
}) {
  return <a className={className} data-umami-event={event} href={href}>{children}</a>;
}

export default function Homepage() {
  const hero = commercialSection("homepage", "1-hero");
  const ribbon = commercialSection("homepage", "2-commercial-ribbon");
  const problems = commercialSection("homepage", "3-problem-chooser");
  const services = commercialSection("homepage", "4-service-composition");
  const evidence = commercialSection("homepage", "5-evidence-section");
  const ownership = commercialSection("homepage", "6-ownership-and-provider-rescue-map");
  const timeline = commercialSection("homepage", "7-engagement-timeline");
  const intake = commercialSection("homepage", "10-final-intake-section");
  const workIntro = correctionValue(commercialCorrections.evidence.homepageIntroduction);
  const contactEmail = commercialSection("contact", "path-2").one("Destination");
  const evidenceLabels = [
    evidence.one("Evidence field labels"),
    ...evidence.many("value").slice(0, 3),
  ];

  const ribbonItems = [1, 2, 3, 4, 5].map((number) => ({
    label: ribbon.one(`Item ${number} label`),
    price: ribbon.one(`Item ${number} price`),
    supportingPrice: ribbon.optional(`Item ${number} supporting price`),
    timeline: ribbon.one(`Item ${number} timeline`),
    link: ribbon.one(`Item ${number} link`),
    href: ribbon.one(`Item ${number} destination`),
  }));
  const problemItems = [1, 2, 3, 4, 5].map((number) => ({
    heading: problems.one(`Problem ${number} heading`),
    body: problems.one(`Problem ${number} body`),
    label: problems.one(`Problem ${number} label`),
    link: problems.one(`Problem ${number} link`),
    href: problems.one(`Problem ${number} destination`),
  }));
  const stages = [1, 2, 3, 4, 5, 6, 7].map((number) => ({
    heading: timeline.one(`Stage ${number} heading`),
    body: timeline.one(`Stage ${number} body`),
  }));
  const evidenceArtifacts = ([
    "artifact-1-website-ownership-map",
    "artifact-2-vanity-metrics-migration-record",
    "artifact-3-glossary-and-route-validation",
  ] as const).map((key) => ({
    key,
    artifact: commercialSection("work-evidence", key),
  }));

  return (
    <>
      <Header />
      <main className="commercial-page commercial-home" id="main-content" tabIndex={-1}>
        <section className="commercial-hero" aria-labelledby="commercial-home-title">
          <div className="section-shell commercial-hero__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{hero.one("Eyebrow")}</p>
              <h1 id="commercial-home-title">{hero.one("Headline")}</h1>
              <p>{hero.one("Body paragraph 1")}</p>
              <p>{hero.one("Body paragraph 2")}</p>
              <div className="button-row">
                <TrackedLink className="button-link button-link--primary" event="commercial_primary_cta" href={hero.one("Primary destination")}>{hero.one("Primary CTA")}</TrackedLink>
                <TrackedLink className="button-link button-link--secondary" event="commercial_services_cta" href={hero.one("Secondary destination")}>{hero.one("Secondary CTA")}</TrackedLink>
              </div>
            </div>
            <aside className="commercial-hero__aside">
              <strong>{hero.one("Trust line")}</strong>
              <span>{hero.one("Location line")}</span>
            </aside>
          </div>
        </section>

        <section className="commercial-ribbon" aria-label={ribbon.one("Section accessible label")}>
          <div className="section-shell">
            <p className="commercial-ribbon__intro">{ribbon.one("Introductory sentence")}</p>
            <div className="commercial-ribbon__grid">
              {ribbonItems.map((item) => (
                <article key={item.label}>
                  <h2>{item.label}</h2>
                  <strong>{item.price}</strong>
                  {item.supportingPrice ? <strong>{item.supportingPrice}</strong> : null}
                  <p>{item.timeline}</p>
                  <TrackedLink event="commercial_pricing_cta" href={item.href}>{item.link}</TrackedLink>
                </article>
              ))}
            </div>
            <p>{ribbon.one("Qualification beneath the ribbon")}</p>
          </div>
        </section>

        <section className="commercial-section commercial-problems" aria-labelledby="commercial-problems-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{problems.one("Eyebrow")}</p>
              <h2 id="commercial-problems-title">{problems.one("Heading")}</h2>
              <p>{problems.one("Introduction")}</p>
            </header>
            <div className="commercial-problems__grid">
              {problemItems.map((item) => (
                <article key={item.heading}>
                  <h3>{item.heading}</h3>
                  <p>{item.body}</p>
                  <strong>{item.label}</strong>
                  <a href={item.href}>{item.link}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-services" aria-labelledby="commercial-services-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{services.one("Eyebrow")}</p>
              <h2 id="commercial-services-title">{services.one("Heading")}</h2>
              <p>{services.one("Introduction")}</p>
            </header>
            <div className="commercial-services__mosaic">
              {serviceLayers.map(([pageKey, sectionKey]) => {
                const layer = commercialSection(pageKey, sectionKey, "035");
                const all = commercialSection(pageKey, sectionKey);
                return (
                  <article key={pageKey}>
                    <p className="eyebrow">{layer.one("Eyebrow")}</p>
                    <h3>{layer.one("Headline")}</h3>
                    <p>{layer.one("Introduction")}</p>
                    <strong>{layer.one("Starting-price copy")}</strong>
                    <a href={all.one("Canonical route")}>{layer.one("Eyebrow")}</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="commercial-section commercial-evidence" aria-labelledby="commercial-evidence-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{evidence.one("Eyebrow")}</p>
              <h2 id="commercial-evidence-title">{evidence.one("Heading")}</h2>
              <p>{workIntro}</p>
            </header>
            <div className="commercial-evidence__grid">
              {evidenceArtifacts.map(({ artifact, key }) => (
                <article id={artifact.one("Anchor").slice(1)} key={artifact.one("Title")}>
                  <h3>{artifact.one("Title")}</h3>
                  <p>{artifact.one("Summary")}</p>
                  <dl>
                    <div><dt>{evidenceLabels[0]}</dt><dd>{artifact.one("Source class")}</dd></div>
                    <div><dt>{evidenceLabels[1]}</dt><dd>{artifact.one("What this demonstrates")}</dd></div>
                    <div><dt>{evidenceLabels[2]}</dt><dd>{artifact.one("What this does not demonstrate")}</dd></div>
                    {artifact.optional("Current status") ? <div><dt>{evidenceLabels[3]}</dt><dd>{artifact.one("Current status")}</dd></div> : null}
                  </dl>
                  <TrackedLink event="commercial_evidence_open" href={commercialCorrections068.work.destinations[key]}>
                    {commercialCorrections068.work.openLabel}
                  </TrackedLink>
                </article>
              ))}
            </div>
            <a href={evidence.one("Closing destination")}>{evidence.one("Closing link")}</a>
          </div>
        </section>

        <section className="commercial-section commercial-ownership" aria-labelledby="commercial-ownership-title">
          <div className="section-shell commercial-ownership__grid">
            <div>
              <p className="eyebrow">{ownership.one("Eyebrow")}</p>
              <h2 id="commercial-ownership-title">{ownership.one("Heading")}</h2>
              <p>{ownership.one("Body paragraph 1")}</p>
              <p>{ownership.one("Body paragraph 2")}</p>
              <a href={ownership.one("Destination")}>{ownership.one("Link")}</a>
            </div>
            <ul>
              {[ownership.one("Status labels"), ...ownership.many("value")].map((status) => <li key={status}>{status}</li>)}
            </ul>
          </div>
        </section>

        <section className="commercial-section commercial-timeline" aria-labelledby="commercial-timeline-title">
          <div className="section-shell">
            <header className="commercial-section__heading">
              <p className="eyebrow">{timeline.one("Eyebrow")}</p>
              <h2 id="commercial-timeline-title">{timeline.one("Heading")}</h2>
              <p>{timeline.one("Introduction")}</p>
            </header>
            <ol>{stages.map((stage) => <li key={stage.heading}><h3>{stage.heading}</h3><p>{stage.body}</p></li>)}</ol>
          </div>
        </section>

        <section className="commercial-section commercial-intake" aria-labelledby="commercial-intake-title">
          <div className="section-shell commercial-intake__grid">
            <div>
              <p className="eyebrow eyebrow--on-dark">{intake.one("Eyebrow")}</p>
              <h2 id="commercial-intake-title">{intake.one("Heading")}</h2>
              <p>{intake.one("Body paragraph 1")}</p>
              <p>{intake.one("Body paragraph 2")}</p>
              <p>{intake.one("Privacy line")}</p>
              <div className="button-row">
                <TrackedLink className="button-link button-link--primary" event="commercial_primary_cta" href={intake.one("Primary destination")}>{intake.one("Primary CTA")}</TrackedLink>
                <a className="button-link button-link--secondary" href={contactEmail}>{intake.one("Secondary CTA")}</a>
                <a href={intake.one("Emergency destination")}>{intake.one("Emergency CTA")}</a>
              </div>
            </div>
            <ul>
              {[intake.one("Field-preview labels"), ...intake.many("value")].map((label) => <li key={label}>{label}</li>)}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
