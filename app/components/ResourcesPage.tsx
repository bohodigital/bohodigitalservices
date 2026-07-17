import {
  ArrowRight,
  BarChart3,
  MousePointerClick,
  PanelsTopLeft,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Footer, Header } from "./SiteChrome";
import { DefinedText } from "./DefinedText";
import { KnowledgeHero } from "./KnowledgePages";
import { SectionSidebar } from "./SectionNavigation";

type ResourceCard = {
  id?: string;
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
    description: "Evaluate scope, ownership, content responsibility, web accessibility, hosting, and migration risk before signing a proposal.",
    href: "/learn/website-buying/",
    label: "Read the buyer guide",
    icon: PanelsTopLeft,
    meta: "Planning",
  },
  {
    id: "provider-rescue-checklist",
    title: "Provider rescue checklist",
    description: "Map ownership, access, URLs, data, forms, analytics, redirects, and rollback before changing providers.",
    href: "/learn/provider-rescue/",
    label: "Read the rescue guide",
    icon: ShieldCheck,
    meta: "Continuity",
  },
  {
    title: "Plain-language glossary",
    description: "Translate technical language into the business decision hiding underneath it.",
    href: "/learn/glossary/",
    label: "Search the glossary",
    icon: SearchCheck,
    meta: "Definitions",
  },
  {
    title: "Web Design & Website Redesign",
    description: "Review how a useful website, explicit ownership, managed hosting, maintenance, and recovery fit together as one operating system.",
    href: "/services/web-design-redesign/",
    label: "Review the website service",
    icon: PanelsTopLeft,
    meta: "Ownership",
  },
];

const decisionRoutes = [
  {
    title: "Plan a website",
    description: "Review scope, content, web accessibility, hosting, ownership, and migration before comparing proposals.",
    href: "/learn/website-buying/" as const,
    icon: PanelsTopLeft,
  },
  {
    title: "Review ownership and access",
    description: "Identify who controls the domain, source, hosting, analytics, profiles, content, and recovery paths.",
    href: "/learn/provider-rescue/" as const,
    icon: ShieldCheck,
  },
  {
    title: "Understand the machinery",
    description: "Translate domains, DNS, hosting, search, analytics, automation, and ownership into practical decisions.",
    href: "/learn/glossary/" as const,
    icon: SearchCheck,
  },
  {
    title: "Review visibility and lead flow",
    description: "Connect local discovery, trust, page clarity, qualified action, and measurement as one business system.",
    href: "/services/ongoing-seo/#local-seo" as const,
    icon: MousePointerClick,
  },
];

export function ResourcesPage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className="knowledge-page resources-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Resources"
          breadcrumbMode="resources-root"
          title="Buyer guidance for decisions that change ownership, cost, or risk."
          intro={[
            "Use these guides to understand scope, ownership, continuity, and the machinery behind a website or lead system before committing money or access.",
            "Built by digital engineers. Explained in plain English.",
          ]}
          primary={{ label: "Choose a resource", href: "#resource-collections" }}
          secondary={{ label: "Talk to someone technical", href: "/contact/" }}
          seenTerms={seenTerms}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/resources/"
            anchors={[
              { label: "Resource collections", href: "#resource-collections" },
              { label: "Free analytics platform", href: "#analysis-dashboard" },
              { label: "Provider rescue checklist", href: "#provider-rescue-checklist" },
              { label: "Choose by decision", href: "#choose-by-decision" },
              { label: "Boho report standard", href: "#report-standard" },
              { label: "Get a technical second opinion", href: "#technical-second-opinion" },
            ]}
            note="Start with the decision you need to make. The useful route is usually shorter than the jargon suggests."
          />

          <div className="knowledge-section-layout__content">
            <section className="resources-collections" id="resource-collections" aria-labelledby="resource-collections-title">
              <div className="section-shell">
                <header className="resources-heading">
                  <p className="eyebrow">Selected resources</p>
                  <h2 id="resource-collections-title">Start with the decision in front of you.</h2>
                  <p>{define("Each collection supports a real buying, ownership, visibility, or continuity decision.")}</p>
                </header>
                <div className="resources-collection-grid">
                  {resourceCollections.map(({ icon: Icon, ...resource }) => (
                    <article className="resource-collection-card" id={resource.id} key={resource.id ?? resource.href}>
                      <div className="resource-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.9} /></div>
                      <p className="resource-collection-card__meta">{resource.meta}</p>
                      <h3>{resource.title}</h3>
                      <p>{define(resource.description)}</p>
                      <a href={resource.href}>
                        <span>{resource.label}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="resources-decisions" id="analysis-dashboard" aria-labelledby="analysis-dashboard-title">
              <div className="section-shell resources-decisions__layout">
                <header className="resources-heading">
                  <p className="eyebrow">Free public software</p>
                  <h2 id="analysis-dashboard-title">Use the Boho Analytics Platform without paying to unlock the dashboard.</h2>
                  <p>{define("A source-labeled view is useful only when it keeps unlike measurements distinct and makes collection limits visible.")}</p>
                </header>
                <div className="resources-decision-list">
                  <a href="https://github.com/bohodigital/boho-analytics-platform" rel="noopener noreferrer" target="_blank">
                    <span className="resource-icon" aria-hidden="true"><BarChart3 size={22} strokeWidth={1.9} /></span>
                    <span>
                      <strong>Boho Analytics Platform · Free</strong>
                      <small>Public, MIT-licensed software for self-hosted, source-labeled website analytics, search performance, traffic infrastructure, and form-delivery monitoring. This is not a hosted customer dashboard offer.</small>
                    </span>
                    <ArrowRight aria-hidden="true" size={17} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </section>

            <section className="resources-decisions" id="choose-by-decision" aria-labelledby="resource-decisions-title">
              <div className="section-shell resources-decisions__layout">
                <header className="resources-heading">
                  <p className="eyebrow">Choose by decision</p>
                  <h2 id="resource-decisions-title">Skip the taxonomy. Name the problem.</h2>
                  <p>Most agencies start with a package. Boho starts with the business.</p>
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

            <section className="resources-collections" id="report-standard" aria-labelledby="report-standard-title">
              <div className="section-shell">
                <header className="resources-heading">
                  <p className="eyebrow">Boho report standard</p>
                  <h2 id="report-standard-title">Make the evidence, limits, and next decision inspectable.</h2>
                  <p>{define("A substantial report should show where its information came from, what failed or remained uncertain, and which small set of actions deserves attention next.")}</p>
                </header>
                <div className="resources-collection-grid">
                  <article className="resource-collection-card">
                    <div className="resource-icon" aria-hidden="true"><SearchCheck size={25} strokeWidth={1.9} /></div>
                    <p className="resource-collection-card__meta">01 · Data receipt</p>
                    <h3>Name what was reviewed.</h3>
                    <p>Identify the review period, websites, properties, markets or systems, sources used, and the last successful collection or review date.</p>
                  </article>
                  <article className="resource-collection-card">
                    <div className="resource-icon" aria-hidden="true"><ShieldCheck size={25} strokeWidth={1.9} /></div>
                    <p className="resource-collection-card__meta">02 · Quality gates</p>
                    <h3>Disclose weak evidence.</h3>
                    <p>Call out required-source failures, stale information, incomplete access, conflicting platforms, and any limitation that changes what can be concluded.</p>
                  </article>
                  <article className="resource-collection-card">
                    <div className="resource-icon" aria-hidden="true"><BarChart3 size={25} strokeWidth={1.9} /></div>
                    <p className="resource-collection-card__meta">03 · Interpretation</p>
                    <h3>Separate observation from inference.</h3>
                    <p>Keep directly observed facts, calculated or derived values, and analyst interpretations visibly distinct instead of presenting every number as equal evidence.</p>
                  </article>
                  <article className="resource-collection-card">
                    <div className="resource-icon" aria-hidden="true"><MousePointerClick size={25} strokeWidth={1.9} /></div>
                    <p className="resource-collection-card__meta">04 · Decision set</p>
                    <h3>Limit the main priorities.</h3>
                    <p>Lead with three to five priority actions, identify what should not be purchased yet, and define how the next change will be validated.</p>
                  </article>
                </div>
              </div>
            </section>

            <section className="resources-lab" id="technical-second-opinion" aria-labelledby="technical-second-opinion-title">
              <div className="section-shell resources-lab__layout">
                <div className="resources-lab__copy">
                  <p className="eyebrow eyebrow--on-dark">A practical next step</p>
                  <h2 id="technical-second-opinion-title">Get a technical second opinion before the expensive decision.</h2>
                  <p>{define("Send the website, proposal, provider situation, or system that feels unclear. Boho will help identify the useful question and the smallest credible next step.")}</p>
                  <div className="button-row">
                    <Link className="button-link button-link--primary" href="/contact/">
                      <span className="button-link__label">Talk to someone technical</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                    <Link className="resources-lab__text-link" href="/learn/provider-rescue/">Planning a provider exit?</Link>
                  </div>
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
