import {
  BookOpenCheck,
  ArrowRight,
  FlaskConical,
  Gauge,
  MousePointerClick,
  PanelsTopLeft,
  ScanSearch,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Footer, Header } from "./SiteChrome";
import { KnowledgeHero } from "./KnowledgePages";
import { SectionSidebar } from "./SectionNavigation";

type ResourceCard = {
  title: string;
  description: string;
  href: `/${string}`;
  label: string;
  icon: LucideIcon;
  meta: string;
};

const resourceCollections: ResourceCard[] = [
  {
    title: "Practical guides",
    description: "Make a website, search, provider, or ownership decision with less jargon and a clearer list of tradeoffs.",
    href: "/learn/",
    label: "Browse the guides",
    icon: BookOpenCheck,
    meta: "Decisions & explanations",
  },
  {
    title: "Plain-language glossary",
    description: "Translate technical terms before a vendor, platform, or proposal uses them to make an ordinary decision feel mysterious.",
    href: "/learn/glossary/",
    label: "Search the glossary",
    icon: SearchCheck,
    meta: "Definitions & cross-links",
  },
  {
    title: "Tools & systems",
    description: "See what the working systems do, where ownership belongs, how delivery works, and which boundaries should stay visible.",
    href: "/tools/",
    label: "Inspect the tool catalog",
    icon: Wrench,
    meta: "Technology & ownership",
  },
  {
    title: "The Boho Lab",
    description: "Open the evidence room for research routes, experiments, work logs, example formats, and the claims Boho refuses to make.",
    href: "/lab/",
    label: "Open the Lab",
    icon: FlaskConical,
    meta: "Research & evidence",
  },
];

const decisionRoutes = [
  {
    title: "Diagnose a weak website",
    description: "Start with technical health, page clarity, ownership, and the path from a visit to a useful action.",
    href: "/services/technical-seo-site-health/" as const,
    icon: ScanSearch,
  },
  {
    title: "Plan a redesign",
    description: "Separate visual preference from information architecture, accessibility, search continuity, and business value.",
    href: "/learn/website-buying/" as const,
    icon: PanelsTopLeft,
  },
  {
    title: "Improve findability",
    description: "Understand the local and organic signals that make a useful page easier to discover and trust.",
    href: "/learn/local-search/" as const,
    icon: SearchCheck,
  },
  {
    title: "Improve conversion",
    description: "Connect page intent, proof, friction, and calls to action instead of treating button color as the whole problem.",
    href: "/services/lead-generation-conversion/" as const,
    icon: MousePointerClick,
  },
];

const toolShortcuts = [
  { label: "Website delivery", href: "/tools/#how-it-works" as const, icon: ServerCog },
  { label: "Performance", href: "/learn/glossary/#term-technical-seo" as const, icon: Gauge },
  { label: "Security boundaries", href: "/tools/#tool-api-keys" as const, icon: ShieldCheck },
  { label: "Evidence standards", href: "/lab/claims-we-refuse-to-make/" as const, icon: FlaskConical },
];

export function ResourcesPage() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      <main className="knowledge-page resources-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Resources"
          title="Useful answers, working systems, and evidence you can inspect."
          intro={[
            "This is the shared home for Boho guides, plain-language definitions, tool documentation, and the Lab. Start with the decision you need to make; go deeper only when the detail earns its place.",
            "Guides, definitions, systems documentation, and evidence now share one clear route through the site.",
          ]}
          primary={{ label: "Choose a resource", href: "#resource-collections" }}
          secondary={{ label: "Open the Lab", href: "/lab/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/resources/"
            anchors={[
              { label: "Resource collections", href: "#resource-collections" },
              { label: "Choose by decision", href: "#choose-by-decision" },
              { label: "Open the Lab", href: "#open-the-lab" },
              { label: "Tool shortcuts", href: "#tool-shortcuts" },
            ]}
            note="Use the collections to move between practical guidance, technical detail, and evidence without losing your place."
          />

          <div className="knowledge-section-layout__content">
            <section className="resources-collections" id="resource-collections" aria-labelledby="resource-collections-title">
              <div className="section-shell">
                <header className="resources-heading">
                  <p className="eyebrow">Four connected collections</p>
                  <h2 id="resource-collections-title">Start with the kind of answer you need.</h2>
                  <p>Each collection has a distinct job. The links underneath remain real pages—not decorative cards or dead-end tabs.</p>
                </header>
                <div className="resources-collection-grid">
                  {resourceCollections.map(({ icon: Icon, ...resource }) => (
                    <article className="resource-collection-card" key={resource.href}>
                      <div className="resource-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.9} /></div>
                      <p className="resource-collection-card__meta">{resource.meta}</p>
                      <h3>{resource.title}</h3>
                      <p>{resource.description}</p>
                      <a href={resource.href}>
                        <span>{resource.label}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="resources-decisions" id="choose-by-decision" aria-labelledby="resource-decisions-title">
              <div className="section-shell resources-decisions__layout">
                <header className="resources-heading">
                  <p className="eyebrow">Choose by decision</p>
                  <h2 id="resource-decisions-title">Skip the taxonomy. Name the problem.</h2>
                  <p>The fastest route through a large resource library is usually the question that brought you here.</p>
                </header>
                <div className="resources-decision-list">
                  {decisionRoutes.map(({ icon: Icon, ...route }) => (
                    <a href={route.href} key={route.href}>
                      <span className="resource-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <span>
                        <strong>{route.title}</strong>
                        <small>{route.description}</small>
                      </span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className="resources-lab" id="open-the-lab" aria-labelledby="resources-lab-title">
              <div className="section-shell resources-lab__layout">
                <div className="resources-lab__copy">
                  <p className="eyebrow eyebrow--on-dark">Research & evidence</p>
                  <h2 id="resources-lab-title">Open the Lab when the method matters as much as the answer.</h2>
                  <p>The Lab holds research routes, public experiments, example formats, work logs, and evidence standards. Draft shelves stay visibly labeled; an empty shelf is not padded with invented findings.</p>
                  <div className="button-row">
                    <Link className="button-link button-link--primary" href="/lab/">
                      <span className="button-link__label">Open the Lab</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                    <Link className="resources-lab__text-link" href="/lab/claims-we-refuse-to-make/">Read the evidence boundaries</Link>
                  </div>
                </div>
                <div className="resources-lab__index" aria-label="Featured Lab routes">
                  <Link href="/lab/claims-we-refuse-to-make/"><strong>Claims we refuse to make</strong><span>Documented operating boundaries</span></Link>
                  <Link href="/lab/website-quality-surveys/"><strong>Website quality surveys</strong><span>Draft research route</span></Link>
                  <Link href="/lab/work-log/"><strong>Work log</strong><span>Draft documentation route</span></Link>
                </div>
              </div>
            </section>

            <section className="resources-tools" id="tool-shortcuts" aria-labelledby="resource-tools-title">
              <div className="section-shell">
                <header className="resources-heading resources-heading--split">
                  <div>
                    <p className="eyebrow">Direct shortcuts</p>
                    <h2 id="resource-tools-title">Use the index without reading the whole catalog.</h2>
                  </div>
                  <p>Jump straight to a working diagram, definition, boundary, or evidence standard. Every shortcut has a durable URL.</p>
                </header>
                <div className="resources-tool-grid">
                  {toolShortcuts.map(({ icon: Icon, ...shortcut }) => (
                    <a href={shortcut.href} key={shortcut.href}>
                      <span className="resource-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.9} /></span>
                      <strong>{shortcut.label}</strong>
                      <ArrowRight aria-hidden="true" size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
