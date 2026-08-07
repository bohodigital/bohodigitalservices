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
import Image from "next/image";

import { Footer, Header } from "./SiteChrome";
import { DefinedText } from "./DefinedText";
import { EvidencePlate } from "./EvidencePlate";
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
    title: "Business Websites",
    description: "Review how a useful website, client-owned hosting, maintenance, ownership, and recovery fit together as one understandable system.",
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

const analyticsRepository = "https://github.com/bohodigital/boho-analytics-platform";
const analyticsQuickStart = `${analyticsRepository}#quick-start-with-a-blank-configuration`;
const analyticsProviderDocs = `${analyticsRepository}/blob/main/docs/providers.md`;
const siteGraphDocs = `${analyticsRepository}/blob/main/docs/site-graph/engine.md`;

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
          secondary={{ label: "Get a free website review", href: "/start/" }}
          seenTerms={seenTerms}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/resources/"
            anchors={[
              { label: "Resource collections", href: "#resource-collections" },
              { label: "Analytics evidence map", href: "#evidence-analytics-workspace" },
              { label: "Open-source analytics", href: "#analysis-dashboard" },
              { label: "Command center", href: "#boho-analytics-command-center" },
              { label: "Plot Builder", href: "#boho-analytics-plot-builder" },
              { label: "Site Graph", href: "#boho-site-graph" },
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
                      <a
                        aria-label={`${resource.title}: ${resource.label}`}
                        className="resource-collection-card__link"
                        href={resource.href}
                      >
                        <span>{resource.label}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <EvidencePlate id="analytics-workspace" />

            <section className="resources-analytics-tour" id="analysis-dashboard" aria-labelledby="analysis-dashboard-title">
              <div className="section-shell">
                <header className="resources-analytics-tour__hero">
                  <p className="eyebrow eyebrow--on-dark">Built by Boho for the SEO work we actually do · Public release v0.2.0</p>
                  <h2 id="analysis-dashboard-title">Use our analytics software yourself—free.</h2>
                  <p>{define("Want to handle the measurement side of organic SEO yourself? Boho Analytics is the in-house command center behind our measurement workflow. Self-host the public release, or inspect how Boho keeps search, traffic, infrastructure, forms, and website structure separate before making recommendations.")}</p>
                  <ul className="resources-analytics-tour__badges" aria-label="Product characteristics">
                    <li>$0 MIT software license</li>
                    <li>Self-hosted</li>
                    <li>Python 3.11+ and SQLite</li>
                    <li>Documented blank-config quick start</li>
                    <li>No Boho software subscription</li>
                  </ul>
                  <p className="resources-analytics-tour__license-boundary"><strong>Free means a $0 software license</strong>—not free hosting, provider accounts, SEO labor, support, or custom integrations.</p>
                  <div className="resources-analytics-tour__actions">
                    <a data-analytics-destination-type="setup_documentation" data-analytics-event="tools_project_click" data-analytics-project-name="Boho Analytics Platform" href={analyticsQuickStart} rel="noopener noreferrer" target="_blank">
                      Get the free software from GitHub <ArrowRight aria-hidden="true" size={17} /><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <Link href="/services/ongoing-seo/">See what comes with SEO <ArrowRight aria-hidden="true" size={17} /></Link>
                    <Link href="/">Back to the Boho homepage</Link>
                  </div>
                </header>

                <div className="resources-analytics-promise" aria-label="Why Boho Analytics is public">
                  <article>
                    <span>Built for real work</span>
                    <strong>We use it.</strong>
                    <p>Boho designed the platform to run its own source-labeled SEO measurement—not as a detached side project.</p>
                  </article>
                  <article>
                    <span>Free on purpose</span>
                    <strong>You can use it.</strong>
                    <p>The current MIT-licensed public core helps people trying DIY measurement or not ready for an SEO retainer—and makes our measurement method inspectable before money changes hands.</p>
                  </article>
                  <article>
                    <span>No Boho software lock-in</span>
                    <strong>Another expert can audit it.</strong>
                    <p>Use it yourself or hand the source and documentation to a technical person, host, or another provider.</p>
                  </article>
                </div>

                <div className="resources-analytics-sources" aria-label="Evidence sources kept distinct by Boho Analytics">
                  <article><strong>Search Console</strong><span>Impressions, clicks, click-through rate, and average position</span></article>
                  <article><strong>GA4</strong><span>Acquisition, engagement, and configured key events</span></article>
                  <article><strong>Self-hosted Umami</strong><span>Visits, sessions, pages, and privacy-focused usage evidence</span></article>
                  <article><strong>Cloudflare + forms</strong><span>Edge traffic plus durable acceptance and delivery status</span></article>
                </div>

                <div className="resources-product-tours">
                  <article className="resources-product-tour resources-product-tour--command" id="boho-analytics-command-center">
                    <div className="resources-product-tour__copy">
                      <p className="eyebrow">Source-labeled overview</p>
                      <h3>Compare the signals without erasing where they came from.</h3>
                      <p>The command center keeps each source’s exact reporting window, previous-period comparison, coverage, freshness, and data health visible. A failed provider sync does not silently erase the other evidence or turn missing data into a zero.</p>
                      <ul>
                        <li>Review search, traffic, infrastructure, and form evidence together.</li>
                        <li>See freshness and coverage before interpreting a number.</li>
                        <li>Keep provider-specific meanings intact instead of inventing one blended score.</li>
                      </ul>
                      <p className="resources-product-tour__boundary"><strong>Important:</strong> search clicks are not sessions, and edge requests are not visitors.</p>
                      <a href={analyticsRepository} rel="noopener noreferrer" target="_blank">Inspect the public source <ArrowRight aria-hidden="true" size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
                    </div>
                    <figure>
                      <div className="resources-analytics-feature__browser">
                        <span aria-hidden="true"><i /><i /><i /><b>Growth command center</b></span>
                        <Image src="/proof/tools/boho-analytics-demo-command-center-20260806.webp" alt="Boho Analytics Platform growth command center showing clearly labeled synthetic demo data, complete report coverage, and source-specific comparison cards for Search Console, Umami, and durable form leads." width={1280} height={720} unoptimized />
                      </div>
                      <figcaption>Synthetic demonstration · No client data · Every metric keeps its source label</figcaption>
                    </figure>
                  </article>

                  <article className="resources-product-tour resources-product-tour--plot" id="boho-analytics-plot-builder">
                    <div className="resources-product-tour__copy">
                      <p className="eyebrow">Answer a specific question</p>
                      <h3>Build the chart the decision actually requires.</h3>
                      <p>Plot Builder lets an operator choose a stored source, metric, website, reporting window, chart form, and previous-period comparison. The same bounded evidence can be exported as JSON or CSV for further review.</p>
                      <ul>
                        <li>Choose line, area, or bar views without changing the underlying source.</li>
                        <li>Compare a period without hiding the dates being compared.</li>
                        <li>Export the normalized evidence instead of trapping it in the interface.</li>
                      </ul>
                      <p className="resources-product-tour__boundary"><strong>Read-only by design:</strong> the browser reads normalized local aggregates; it does not contact providers or trigger a sync.</p>
                      <a href={analyticsProviderDocs} rel="noopener noreferrer" target="_blank">Read the provider setup notes <ArrowRight aria-hidden="true" size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
                    </div>
                    <figure>
                      <div className="resources-analytics-feature__browser">
                        <span aria-hidden="true"><i /><i /><i /><b>Source-specific Plot Builder</b></span>
                        <Image src="/proof/tools/boho-analytics-demo-plot-builder-20260806.webp" alt="Boho Analytics Platform Plot Builder showing synthetic Search Console click data, source controls, and a previous-period comparison." width={1280} height={720} unoptimized />
                      </div>
                      <figcaption>Synthetic Search Console demonstration · No client data · Stored local aggregates</figcaption>
                    </figure>
                  </article>

                  <article className="resources-product-tour resources-product-tour--graph" id="boho-site-graph">
                    <div className="resources-product-tour__copy">
                      <p className="eyebrow">Revision-pinned structural evidence</p>
                      <h3>See where pages lead—and where the site structure runs out of road.</h3>
                      <p>Site Graph maps a specific revision’s pages and internal-link layers: contextual, related, action, menu, breadcrumb, and utility. It can inspect two-hop neighborhoods, goal distance, orphans, dead ends, unresolved targets, and dependence on the shared site shell.</p>
                      <ul>
                        <li>Pin the evidence to a known website revision.</li>
                        <li>Separate navigation layers instead of treating every link as equivalent.</li>
                        <li>Use bounded maps for legibility while retaining complete tables and exports.</li>
                      </ul>
                      <p className="resources-product-tour__boundary"><strong>Structural only:</strong> Site Graph does not establish visitor behavior, conversions, search authority, or rankings.</p>
                      <a href={siteGraphDocs} rel="noopener noreferrer" target="_blank">Read the engine documentation <ArrowRight aria-hidden="true" size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
                    </div>
                    <figure className="resources-product-tour__graph-figure">
                      <div className="resources-analytics-feature__browser">
                        <span aria-hidden="true"><i /><i /><i /><b>Site Graph overview</b></span>
                        <Image src="/proof/tools/boho-site-graph-demo-overview-20260806.webp" alt="Boho Site Graph overview showing a synthetic demo website, internal-link evidence, graph controls, and a structural-evidence disclaimer." width={1280} height={720} unoptimized />
                      </div>
                      <div className="resources-product-tour__graph-detail">
                        <Image src="/proof/tools/boho-site-graph-demo-provider-rescue-20260806.webp" alt="Boho Site Graph showing a synthetic two-hop structural neighborhood around a Provider Rescue page." width={1280} height={720} unoptimized />
                      </div>
                      <figcaption>Synthetic website · Complete stored edges for this snapshot · Not visitor behavior</figcaption>
                    </figure>
                  </article>
                </div>

                <aside className="resources-analytics-terms" aria-label="Boho Analytics operating and service boundaries">
                  <div>
                    <span>Self-host it—or hand it off</span>
                    <strong>Your copy of the current public release remains free to use.</strong>
                    <p>You or another technical operator can configure, self-host, copy, and modify the public analytics and Site Graph core behind Boho&apos;s workflow. Hosting, provider accounts, maintenance, upgrades, support, custom connectors, and recovery work are separate.</p>
                    <p>This release does not include a Boho-hosted analytics instance. It is designed for private loopback operation; remote access requires a secure tunnel or authenticated HTTPS proxy, and the built-in server should not be exposed directly to the public internet. Private mappings, credentials, schedules, client data, deployment configuration, reports, and internal integrations—including Boho&apos;s private MCP server—are not published.</p>
                  </div>
                  <div>
                    <span>Use it with Ongoing SEO</span>
                    <strong>Approved, straightforward connections are part of month one.</strong>
                    <p>For the written SEO scope, Boho configures the approved GA4, Search Console, forms evidence, and one compatible self-hosted Umami instance already needed for the work. Nonstandard repair and unsupported integrations require separate approval.</p>
                    <Link href="/services/ongoing-seo/">Review the SEO scope <ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                </aside>
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
                    <Link className="button-link button-link--primary" href="/start/">
                      <span className="button-link__label">Get a free website review</span>
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
