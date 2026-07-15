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
}: {
  eyebrow: string;
  title: string;
  intro: string[];
  primary: { label: string; href: `/${string}` | `#${string}` };
  secondary: { label: string; href: `/${string}` | `#${string}` };
  breadcrumbMode?: "resources-root" | "tools-root" | "resource-child";
}) {
  const seenTerms = new Set<string>();

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
                <DefinedText text={paragraph} seenTerms={seenTerms} />
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
              <div className="section-shell"><LayeredInfrastructureVisual /></div>
            </section>

            <section className="tools-systems-section tools-systems-section--families" id="system-families" aria-labelledby="system-families-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow">Five system families</p>
                  <EditorialHeadline as="h2"><span id="system-families-title">One operating story, organized around the work.</span></EditorialHeadline>
                  <p>Each family connects a commercial service, plain-language reference material, relevant proof, and a visual explanation without turning the underlying platforms into products.</p>
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
                        <p>{family.summary}</p>
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
              <div className="section-shell"><RepairIntegrateBuildVisual /></div>
            </section>

            <section className="tools-systems-section tools-systems-section--selected" id="selected-tools" aria-labelledby="selected-tools-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow eyebrow--on-dark">Selected custom tools</p>
                  <EditorialHeadline as="h2"><span id="selected-tools-title">A deliberately narrow custom-tool registry.</span></EditorialHeadline>
                  <p>These three identities remain separate from the mature infrastructure that supports Boho work.</p>
                </header>
                <div className="selected-tool-grid">
                  {selectedTools.map((tool, index) => (
                    <article className="selected-tool-card" data-selected-tool-id={tool.id} key={tool.id}>
                      <div className="selected-tool-card__identity">
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <code>{tool.id}</code>
                      </div>
                      <h3>{tool.displayName}</h3>
                      {tool.shortPublicSummary ? <p>{tool.shortPublicSummary}</p> : null}
                      {tool.currentStatus || tool.publicAvailability || tool.openSourceStatus ? (
                        <dl>
                          {tool.currentStatus ? <div><dt>Status</dt><dd>{tool.currentStatus}</dd></div> : null}
                          {tool.publicAvailability ? <div><dt>Availability</dt><dd>{tool.publicAvailability}</dd></div> : null}
                          {tool.openSourceStatus ? <div><dt>License</dt><dd>{tool.openSourceStatus}</dd></div> : null}
                        </dl>
                      ) : null}
                      {tool.repositoryUrl ? (
                        <a className="selected-tool-card__link" href={tool.repositoryUrl} rel="noopener noreferrer" target="_blank">
                          View public repository <ExternalLink size={15} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="tools-systems-section tools-systems-section--websites" id="websites" aria-labelledby="websites-title">
              <div className="section-shell">
                <header className="tools-systems-heading">
                  <p className="eyebrow">Websites we build and operate</p>
                  <EditorialHeadline as="h2"><span id="websites-title">Websites are part of the proof.</span></EditorialHeadline>
                  <p>Boho’s owned properties demonstrate website design, publishing systems, educational architecture, editorial operations, search strategy, deployment, and ongoing technical stewardship in public.</p>
                </header>
                <div className="website-proof-grid">
                  {ownedWebsites.map((website, index) => (
                    <article className="website-proof-card" data-proof-category={website.proofCategory} key={website.id}>
                      <div className={`website-proof-card__preview website-proof-card__preview--${index + 1}`} aria-hidden="true">
                        <div className="website-proof-card__browser-bar"><span /><span /><span /><strong>{website.domain}</strong></div>
                        <div className="website-proof-card__canvas">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <Globe2 size={44} strokeWidth={1.25} />
                        </div>
                      </div>
                      <div className="website-proof-card__copy">
                        <p className="website-proof-card__domain">{website.domain}</p>
                        <h3>{website.name}</h3>
                        <p>{website.role}</p>
                        <a href={website.url} rel="noopener noreferrer" target="_blank">
                          Visit property <ExternalLink size={15} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
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
                  <p>The visual library explains how the parts work together without turning internal architecture into a wall of software names.</p>
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
                  <p>Move from the systems view into a focused cluster without repeating full technical definitions here.</p>
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
                  body={<p>Boho will help decide whether the useful move is repair, integration, focused custom engineering, or no new software at all.</p>}
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
