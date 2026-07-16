import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ExternalLink,
  FlaskConical,
  Globe2,
  Layers3,
  Network,
  SearchCheck,
  ServerCog,
  Workflow,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import {
  Breadcrumbs,
  ButtonLink,
  CtaBand,
  EditorialHeadline,
  Footer,
  Header,
} from "./SiteChrome";
import { DefinedText } from "./DefinedText";
import { SectionSidebar } from "./SectionNavigation";
import { LayeredInfrastructureVisual, RepairIntegrateBuildVisual } from "./SystemsVisuals";
import {
  ownedWebsites,
  selectedTools,
  systemFamilies,
  systemVisuals,
  type SystemFamilyId,
} from "../content/systems";

export function KnowledgeHero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  breadcrumbMode = "resource-child",
  seenTerms,
}: {
  eyebrow: string;
  title: string;
  intro: string[];
  primary: { label: string; href: `/${string}` | `#${string}` };
  secondary: { label: string; href: `/${string}` | `#${string}` };
  breadcrumbMode?: "resources-root" | "tools-root" | "resource-child";
  seenTerms?: Set<string>;
}) {
  const pageTerms = seenTerms ?? new Set<string>();

  return (
    <section className="knowledge-hero" aria-labelledby="knowledge-hero-title">
      <div className="knowledge-hero__constellation" aria-hidden="true">
        <span><BookOpenCheck size={42} strokeWidth={1.6} /></span>
        <span><SearchCheck size={34} strokeWidth={1.7} /></span>
        <span><Wrench size={38} strokeWidth={1.6} /></span>
        <span><FlaskConical size={44} strokeWidth={1.6} /></span>
        <span><ServerCog size={32} strokeWidth={1.7} /></span>
      </div>
      <div className="section-shell knowledge-hero__inner">
        <Breadcrumbs
          items={
            breadcrumbMode === "resources-root"
              ? [{ label: "Home", href: "/" }, { label: "Resources" }]
              : breadcrumbMode === "tools-root"
                ? [{ label: "Home", href: "/" }, { label: "Tools" }]
              : [
                  { label: "Home", href: "/" },
                  { label: "Resources", href: "/resources/" },
                  { label: eyebrow },
                ]
          }
        />
        <div className="knowledge-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <EditorialHeadline as="h1" className="knowledge-hero__title">
            <span id="knowledge-hero-title">{title}</span>
          </EditorialHeadline>
          <div className="knowledge-hero__intro reading-width">
            {intro.map((paragraph) => (
              <p key={paragraph.slice(0, 30)}>
                <DefinedText autoDefine text={paragraph} seenTerms={pageTerms} />
              </p>
            ))}
          </div>
          <div className="button-row">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const familyIcons: Record<SystemFamilyId, typeof Globe2> = {
  "websites-publishing": Globe2,
  "hosting-release": ServerCog,
  "measurement-search-signals": BarChart3,
  "operations-automation": Workflow,
  "secure-integrations-custom-tools": Network,
};

export function ToolsPage() {
  const publicVisuals = systemVisuals.filter((visual) => visual.publicInThisRelease);
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className="knowledge-page tools-page tools-systems-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Tools, systems, and proof"
          breadcrumbMode="tools-root"
          title="Systems built to make digital work cheaper, clearer, and easier to operate."
          intro={[
            "Boho combines mature infrastructure with focused engineering. We use established platforms for source control, hosting, delivery, search, analytics, and communication, then build the workflows, controls, integrations, monitoring, publishing systems, and business-specific tools that connect them.",
            "Technical depth is useful when it produces a system the business can understand, verify, operate, and continue to own.",
          ]}
          primary={{ label: "Explore Boho Systems", href: "#system-families" }}
          secondary={{ label: "Build the Missing Tool", href: "/contact/" }}
          seenTerms={seenTerms}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/tools/"
            title="Tools & systems"
            items={[
              { label: "Systems and proof", href: "/tools/" },
              { label: "Custom tools service", href: "/services/custom-tools-automation/" },
              { label: "Buyer resources", href: "/resources/" },
              { label: "Technical glossary", href: "/learn/glossary/" },
            ]}
            anchors={[
              { label: "Layered infrastructure", href: "#visual-layered-infrastructure" },
              { label: "Five system families", href: "#system-families" },
              { label: "Repair, integrate, or build", href: "#repair-integrate-build" },
              { label: "Selected custom tools", href: "#selected-tools" },
              { label: "Websites", href: "#websites" },
              { label: "Visual library", href: "#visual-systems-library" },
              { label: "Glossary bridge", href: "#glossary-bridge" },
            ]}
            note="Mature platforms handle the foundation. Boho connects the operating layer to a result the business can use."
          />

          <div className="knowledge-section-layout__content tools-systems-page__content">
            <section className="tools-systems-section tools-systems-section--layers" aria-label="Layered infrastructure explanation">
              <div className="section-shell"><LayeredInfrastructureVisual seenTerms={seenTerms} /></div>
            </section>

            <section className="tools-systems-section tools-systems-section--families" id="system-families" aria-labelledby="system-families-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow">Five system families</p>
                  <EditorialHeadline as="h2"><span id="system-families-title">One operating story, organized around the work.</span></EditorialHeadline>
                  <p>{define("Each family connects a commercial service, plain-language reference material, relevant proof, and a visual explanation without turning the underlying platforms into products.")}</p>
                </header>
                <div className="system-family-grid">
                  {systemFamilies.map((family, index) => {
                    const Icon = familyIcons[family.id];
                    return (
                      <article className="system-family-card" data-system-family={family.id} id={`family-${family.id}`} key={family.id}>
                        <div className="system-family-card__marker" aria-hidden="true">
                          <Icon size={27} strokeWidth={1.75} />
                          <span>{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <h3>{family.title}</h3>
                        <p>{define(family.summary)}</p>
                        <nav aria-label={`${family.title} related pages`}>
                          <Link href={family.serviceHref}>Service <ArrowRight size={15} aria-hidden="true" /></Link>
                          <Link href={family.glossaryHref}>Glossary <ArrowRight size={15} aria-hidden="true" /></Link>
                          <a href={family.proofHref}>Proof <ArrowRight size={15} aria-hidden="true" /></a>
                          <a href={family.visualHref}>Visual <ArrowRight size={15} aria-hidden="true" /></a>
                        </nav>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--decision" id="repair-integrate-build" aria-label="Repair, integrate, or build doctrine">
              <div className="section-shell"><RepairIntegrateBuildVisual seenTerms={seenTerms} /></div>
            </section>

            <section className="tools-systems-section tools-systems-section--selected" id="selected-tools" aria-labelledby="selected-tools-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow eyebrow--on-dark">Selected custom tools</p>
                  <EditorialHeadline as="h2"><span id="selected-tools-title">A deliberately narrow custom-tool registry.</span></EditorialHeadline>
                  <p>{define("These three identities remain separate from the mature infrastructure that supports Boho work.")}</p>
                </header>
                <div className="selected-tool-grid">
                  {selectedTools.map((tool, index) => (
                    <article className="selected-tool-card" data-selected-tool-id={tool.id} key={tool.id}>
                      <figure
                        className="selected-tool-card__media"
                        data-evidence-type={tool.image.evidenceType}
                      >
                        <img alt={tool.image.alt} loading="lazy" src={tool.image.src} />
                        <figcaption>{tool.image.evidenceType === "repository-screenshot" ? "Public repository screenshot" : "Public GitHub repository preview"}</figcaption>
                      </figure>
                      <div className="selected-tool-card__body">
                        <div className="selected-tool-card__identity">
                          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                          <code>{tool.id}</code>
                        </div>
                        <h3>{tool.displayName}</h3>
                        <p className="selected-tool-card__summary">{define(tool.shortPublicSummary)}</p>
                        <div className="selected-tool-card__memo">
                          <strong>Short memo</strong>
                          <p>{define(tool.publicMemo)}</p>
                        </div>
                        {tool.currentStatus || tool.publicAvailability || tool.openSourceStatus ? (
                          <dl>
                            {tool.currentStatus ? <div><dt>Status</dt><dd>{tool.currentStatus}</dd></div> : null}
                            {tool.publicAvailability ? <div><dt>Availability</dt><dd>{tool.publicAvailability}</dd></div> : null}
                            {tool.openSourceStatus ? <div><dt>License</dt><dd>{tool.openSourceStatus}</dd></div> : null}
                          </dl>
                        ) : null}
                        <a className="selected-tool-card__link" href={tool.repositoryUrl} rel="noopener noreferrer" target="_blank">
                          View public repository <ExternalLink size={15} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--websites" id="websites" aria-labelledby="websites-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow">Independent brand properties</p>
                  <EditorialHeadline as="h2"><span id="websites-title">Three public brands, three different search questions.</span></EditorialHeadline>
                  <p>{define("These independent Boho brands each serve a distinct audience and editorial job. Together they help us study how answer-first content, topic depth, interactive tools, definitions, and evidence-aware publishing support different kinds of search behavior.")}</p>
                </header>
                <div className="website-proof-grid">
                  {ownedWebsites.map((website) => (
                    <article className="website-proof-card" data-proof-category={website.proofCategory} key={website.id}>
                      <figure className="website-proof-card__preview">
                        <img alt={website.image.alt} loading="lazy" src={website.image.src} />
                        <figcaption>Public brand preview from the project repository</figcaption>
                      </figure>
                      <div className="website-proof-card__copy">
                        <p className="website-proof-card__domain">{website.domain}</p>
                        <h3>{website.name}</h3>
                        <p className="website-proof-card__role">{define(website.role)}</p>
                        <div className="website-proof-card__memo">
                          <strong>SEO learning lens</strong>
                          <p>{define(website.publicMemo)}</p>
                          <ul aria-label={`${website.name} SEO learning themes`}>
                            {website.seoLens.map((item) => <li key={item}>{define(item)}</li>)}
                          </ul>
                        </div>
                        <div className="website-proof-card__actions">
                          <a href={website.url} rel="noopener noreferrer" target="_blank">
                            Visit brand <ExternalLink size={15} aria-hidden="true" />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                          <a href={website.repositoryUrl} rel="noopener noreferrer" target="_blank">
                            View GitHub <ExternalLink size={15} aria-hidden="true" />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--library" id="visual-systems-library" aria-labelledby="visual-systems-library-title">
              <div className="section-shell visual-library-layout">
                <header className="tools-systems-heading">
                  <p className="eyebrow">Visual systems library</p>
                  <EditorialHeadline as="h2"><span id="visual-systems-library-title">See the relationship before the implementation detail.</span></EditorialHeadline>
                  <p>{define("The visual library explains how the parts work together without turning internal architecture into a wall of software names.")}</p>
                </header>
                <div className="visual-library-index">
                  {publicVisuals.map((visual, index) => (
                    <a href={`#visual-${visual.id}`} key={visual.id}>
                      <span aria-hidden="true"><Layers3 size={25} strokeWidth={1.7} />{String(index + 1).padStart(2, "0")}</span>
                      <strong>{visual.title}</strong>
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--glossary" id="glossary-bridge" aria-labelledby="glossary-bridge-title">
              <div className="section-shell glossary-bridge-layout">
                <div>
                  <p className="eyebrow eyebrow--on-dark">Glossary bridge</p>
                  <EditorialHeadline as="h2"><span id="glossary-bridge-title">Tools explains what Boho builds and operates. The glossary explains the technical language underneath it.</span></EditorialHeadline>
                </div>
                <div>
                  <p>{define("Move from the systems view into a focused cluster without repeating full technical definitions here.")}</p>
                  <nav aria-label="Related glossary clusters">
                    {systemFamilies.map((family) => <Link href={family.glossaryHref} key={family.id}>{family.title}<ArrowRight size={15} aria-hidden="true" /></Link>)}
                  </nav>
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--cta" aria-labelledby="tools-commercial-cta-title">
              <div className="section-shell">
                <CtaBand
                  title="Bring the repeated work, the current system, and the part that keeps breaking."
                  body={<p>{define("Boho will help decide whether the useful move is repair, integration, focused custom engineering, or no new software at all.")}</p>}
                  primary={{ label: "Build the Missing Tool", href: "/contact/" }}
                  secondary={{ label: "Review the Service", href: "/services/custom-tools-automation/" }}
                />
                <span className="sr-only" id="tools-commercial-cta-title">Start a custom tools conversation.</span>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
