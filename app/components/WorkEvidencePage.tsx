import { ArrowRight, ExternalLink, FileCheck2, FlaskConical, GitBranch, Globe2, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { ownedWebsites, selectedTools } from "../content/systems";
import { DefinedText } from "./DefinedText";
import { Breadcrumbs, ButtonLink, EditorialHeadline, Footer, Header } from "./SiteChrome";

export function WorkEvidencePage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className="work-evidence-page" id="main-content" tabIndex={-1}>
        <section className="work-evidence-hero" aria-labelledby="work-evidence-title">
          <div className="section-shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work & Evidence" }]} />
            <div className="work-evidence-hero__layout">
              <div>
                <p className="eyebrow eyebrow--on-dark">Work &amp; Evidence</p>
                <EditorialHeadline as="h1"><span id="work-evidence-title">Inspect the method, the public systems, and the ownership boundary.</span></EditorialHeadline>
              </div>
              <div>
                <p>{define("Boho uses public repositories, working owned properties, reproducible methods, documentation, and limitations as evidence. Owned work is labeled as owned. Public tools are not presented as client results.")}</p>
                <div className="button-row"><ButtonLink href="#public-tools">See public tools</ButtonLink><ButtonLink href="/services/" variant="secondary">Review services</ButtonLink></div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-evidence-section" id="public-tools" aria-labelledby="public-tools-title">
          <div className="section-shell">
            <header className="work-evidence-heading"><p className="eyebrow">Demonstrated public</p><h2 id="public-tools-title">Three public tool identities with inspectable repositories.</h2><p>{define("These entries describe published work only. Their current labels and links were verified through the Boho operating record before this candidate was built.")}</p></header>
            <div className="work-tool-grid">
              {selectedTools.map((tool) => (
                <article key={tool.id}>
                  <img alt={tool.image.alt} loading="lazy" src={tool.image.src} />
                  <div><code>{tool.id}</code><h3>{tool.displayName}</h3><p>{define(tool.shortPublicSummary)}</p><a href={tool.repositoryUrl} rel="noopener noreferrer" target="_blank">View GitHub <ExternalLink aria-hidden="true" size={15} /></a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-evidence-section work-evidence-section--sites" id="website-work" aria-labelledby="website-work-title">
          <div className="section-shell">
            <header className="work-evidence-heading"><p className="eyebrow">Boho-owned properties</p><h2 id="website-work-title">Three public brands used to study three different search and publishing problems.</h2><p>{define("These are owned properties, not client case studies. They demonstrate public delivery, editorial systems, interactive content, and different approaches to search intent.")}</p></header>
            <div className="work-site-grid">
              {ownedWebsites.map((site) => (
                <article key={site.id}>
                  <img alt={site.image.alt} loading="lazy" src={site.image.src} />
                  <div><span><Globe2 aria-hidden="true" size={17} />{site.domain}</span><h3>{site.name}</h3><p>{define(site.role)}</p><nav><a href={site.url} rel="noopener noreferrer" target="_blank">Visit site <ExternalLink aria-hidden="true" size={14} /></a><a href={site.repositoryUrl} rel="noopener noreferrer" target="_blank">GitHub <GitBranch aria-hidden="true" size={14} /></a></nav></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-evidence-section work-evidence-section--method" id="provider-rescue" aria-labelledby="provider-rescue-method-title">
          <div className="section-shell work-method-layout">
            <header><p className="eyebrow eyebrow--on-dark">Provider-rescue method</p><h2 id="provider-rescue-method-title">Map authority and dependencies before moving the system.</h2><p>{define("The public proof here is the operating method—not a fictional rescue story or an unsupported client outcome.")}</p><Link href="/resources/#provider-rescue-checklist">Use the provider-rescue checklist <ArrowRight aria-hidden="true" size={16} /></Link></header>
            <ol>
              {["Stabilize the immediate risk", "Inventory ownership, access, and providers", "Preserve useful content, URLs, forms, and measurement", "Approve the target system and migration sequence", "Verify launch behavior and document the new arrangement"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
            </ol>
          </div>
        </section>

        <section className="work-evidence-section work-evidence-section--report" id="report-method" aria-labelledby="report-method-title">
          <div className="section-shell">
            <header className="work-evidence-heading"><p className="eyebrow">Report method</p><h2 id="report-method-title">A report should expose its evidence and uncertainty.</h2><p>{define("No client report or commercial result is represented here. This is the review structure used to keep sources, interpretation, and recommendations separate.")}</p></header>
            <div className="report-method-grid">
              <article><FileCheck2 aria-hidden="true" size={26} /><h3>Data receipt</h3><p>State the period, properties, sources, last successful collection, missing or stale inputs, filters, assumptions, and analyst review date.</p></article>
              <article><FlaskConical aria-hidden="true" size={26} /><h3>Statement labels</h3><p><strong>Observed</strong> is directly supported. <strong>Inferred</strong> is a reasoned interpretation with uncertainty. <strong>Recommended</strong> is the proposed action.</p></article>
              <article><ShieldCheck aria-hidden="true" size={26} /><h3>Quality gates</h3><p>Disclose source failure, stale data, mismatched periods, changed definitions, material disagreement, insufficient evidence, or a recommendation without a supporting reason.</p></article>
            </div>
            <Link className="work-evidence-inline-link" href="/resources/#report-standard">Read the public report standard <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
