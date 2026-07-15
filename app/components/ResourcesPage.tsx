import {
  ArrowRight,
  BookOpenCheck,
  MousePointerClick,
  PanelsTopLeft,
  SearchCheck,
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
    title: "Website buying",
    description: "Evaluate scope, ownership, content responsibility, accessibility, hosting, and migration risk before signing a proposal.",
    href: "/learn/website-buying/",
    label: "Read the buyer guide",
    icon: PanelsTopLeft,
    meta: "Planning",
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
    title: "Provider rescue",
    description: "Map ownership, access, URLs, data, forms, analytics, redirects, and rollback before changing providers.",
    href: "/learn/provider-rescue/",
    label: "Read the rescue guide",
    icon: ShieldCheck,
    meta: "Continuity",
  },
  {
    title: "Custom tools and systems",
    description: "See how Boho approaches useful automation, reporting, monitoring, integrations, and internal software.",
    href: "/tools/",
    label: "See what we build",
    icon: Wrench,
    meta: "Engineering",
  },
];

const decisionRoutes = [
  {
    title: "Diagnose a weak website",
    description: "Start with technical health, page clarity, ownership, and the path from a visit to a useful action.",
    href: "/services/technical-seo-site-health/" as const,
    icon: BookOpenCheck,
  },
  {
    title: "Plan a redesign",
    description: "Separate visual preference from structure, accessibility, search continuity, and business value.",
    href: "/learn/website-buying/" as const,
    icon: PanelsTopLeft,
  },
  {
    title: "Leave a provider",
    description: "Protect accounts, useful URLs, data, integrations, and launch continuity before the relationship changes.",
    href: "/learn/provider-rescue/" as const,
    icon: ShieldCheck,
  },
  {
    title: "Improve local lead flow",
    description: "Connect local discovery, trust, page clarity, qualified action, and measurement as one system.",
    href: "/services/local-seo-search-visibility/" as const,
    icon: MousePointerClick,
  },
];

export function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page resources-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Resources"
          title="Plain-language guidance for expensive digital decisions."
          intro={[
            "Use these guides to understand ownership, scope, risk, and the machinery behind a website or lead system before committing money or access.",
            "Built by digital engineers. Explained in plain English.",
          ]}
          primary={{ label: "Choose a resource", href: "#resource-collections" }}
          secondary={{ label: "Talk to someone technical", href: "/contact/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/resources/"
            anchors={[
              { label: "Resource collections", href: "#resource-collections" },
              { label: "Choose by decision", href: "#choose-by-decision" },
              { label: "Get a technical second opinion", href: "#technical-second-opinion" },
            ]}
            note="Start with the decision you need to make. The useful route is usually shorter than the jargon suggests."
          />

          <div className="knowledge-section-layout__content">
            <section className="resources-collections" id="resource-collections" aria-labelledby="resource-collections-title">
              <div className="section-shell">
                <header className="resources-heading">
                  <p className="eyebrow">Selected resources</p>
                  <h2 id="resource-collections-title">Start with the kind of answer you need.</h2>
                  <p>Every collection supports a real commercial, ownership, or continuity decision.</p>
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

            <section className="resources-lab" id="technical-second-opinion" aria-labelledby="technical-second-opinion-title">
              <div className="section-shell resources-lab__layout">
                <div className="resources-lab__copy">
                  <p className="eyebrow eyebrow--on-dark">A practical next step</p>
                  <h2 id="technical-second-opinion-title">Get a technical second opinion before the expensive decision.</h2>
                  <p>Send the website, proposal, provider situation, or system that feels unclear. Boho will help identify the useful question and the smallest credible next step.</p>
                  <div className="button-row">
                    <a className="button-link button-link--primary" href="mailto:contact@bohemiandigital.org">
                      <span className="button-link__label">Email Boho</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </a>
                    <Link className="resources-lab__text-link" href="/contact/">What to include</Link>
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
