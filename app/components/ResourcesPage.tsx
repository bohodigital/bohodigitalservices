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
    title: "Website buying",
    description: "Evaluate scope, ownership, content responsibility, accessibility, hosting, migration risk, and the claims inside a website proposal.",
    href: "/learn/website-buying/",
    label: "Read the buyer guide",
    icon: PanelsTopLeft,
    meta: "Commercial decision",
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
    title: "Provider rescue",
    description: "Prepare for an exit by mapping ownership, access, URLs, data, forms, analytics, dependencies, redirects, and rollback.",
    href: "/learn/provider-rescue/",
    label: "Read the rescue guide",
    icon: ShieldCheck,
    meta: "Ownership & continuity",
  },
  {
    title: "Practical guide index",
    description: "Browse selected commercial guidance. Broad SEO education and experiments remain secondary while a separate Rank Builder migration is deferred.",
    href: "/learn/",
    label: "Browse selected guides",
    icon: BookOpenCheck,
    meta: "Selected explanations",
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
    title: "Leave a provider",
    description: "Map ownership, dependencies, useful URLs, access, and launch risk before the current relationship or platform changes.",
    href: "/learn/provider-rescue/" as const,
    icon: SearchCheck,
  },
  {
    title: "Improve the local lead system",
    description: "Connect local discovery, trust, page clarity, qualified action, and measurement instead of buying isolated activity.",
    href: "/services/local-seo-search-visibility/" as const,
    icon: MousePointerClick,
  },
];

const toolShortcuts = [
  { label: "Website delivery", href: "/tools/#how-it-works" as const, icon: ServerCog },
  { label: "Performance", href: "/learn/glossary/#term-technical-seo" as const, icon: Gauge },
  { label: "Capability classifications", href: "/tools/#classifications" as const, icon: ShieldCheck },
  { label: "Evidence standards", href: "/lab/claims-we-refuse-to-make/" as const, icon: FlaskConical },
];

export function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page resources-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Resources"
          title="Buyer guidance for decisions that change ownership, cost, or risk."
          intro={[
            "Resources stays focused on commercial decisions a buyer may need to make before a website, provider exit, local lead-system project, or technical engagement.",
            "Broad SEO education and experiments are not primary Boho navigation. They remain secondary and noindexed while a later Rank Builder migration is handled in a separate approved project.",
          ]}
          primary={{ label: "Choose a resource", href: "#resource-collections" }}
          secondary={{ label: "Talk to Someone Technical", href: "/contact/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/resources/"
            anchors={[
              { label: "Resource collections", href: "#resource-collections" },
              { label: "Choose by decision", href: "#choose-by-decision" },
              { label: "Evidence boundaries", href: "#open-the-lab" },
              { label: "Tool shortcuts", href: "#tool-shortcuts" },
            ]}
            note="Use the collections to move between practical guidance, technical detail, and evidence without losing your place."
          />

          <div className="knowledge-section-layout__content">
            <section className="resources-collections" id="resource-collections" aria-labelledby="resource-collections-title">
              <div className="section-shell">
                <header className="resources-heading">
                  <p className="eyebrow">Four selected buyer resources</p>
                  <h2 id="resource-collections-title">Start with the kind of answer you need.</h2>
                  <p>Each collection supports a real commercial or ownership decision. Secondary research shelves remain accessible without dominating this route.</p>
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
                  <p className="eyebrow eyebrow--on-dark">Secondary evidence archive</p>
                  <h2 id="resources-lab-title">Evidence rules stay available without becoming the primary sales path.</h2>
                  <p>The active claim standard is useful to a buyer. Draft experiments, work logs, broad SEO research, and empty proof shelves remain noindexed and secondary. No Rank Builder redirect or migration is part of this review.</p>
                  <div className="button-row">
                    <Link className="button-link button-link--primary" href="/lab/">
                      <span className="button-link__label">View the Secondary Archive</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                    <Link className="resources-lab__text-link" href="/lab/claims-we-refuse-to-make/">Read the evidence boundaries</Link>
                  </div>
                </div>
                <div className="resources-lab__index" aria-label="Featured Lab routes">
                  <Link href="/lab/claims-we-refuse-to-make/"><strong>Claims we refuse to make</strong><span>Documented operating boundaries</span></Link>
                  <Link href="/tools/"><strong>Capability classifications</strong><span>Governed evidence states</span></Link>
                  <Link href="/learn/glossary/"><strong>Plain-language glossary</strong><span>Reviewed definitions</span></Link>
                </div>
              </div>
            </section>

            <section className="resources-tools" id="tool-shortcuts" aria-labelledby="resource-tools-title">
              <div className="section-shell">
                <header className="resources-heading resources-heading--split">
                  <div>
                    <p className="eyebrow">Direct shortcuts</p>
                    <h2 id="resource-tools-title">Use a direct route without reading the whole library.</h2>
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
