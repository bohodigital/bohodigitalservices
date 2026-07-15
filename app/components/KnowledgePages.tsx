import {
  glossaryEntries,
  sourcesById,
  toolProfilesBySlug,
  type GlossaryCategory,
} from "../content/knowledge";
import {
  BookOpenCheck,
  FlaskConical,
  SearchCheck,
  ServerCog,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import {
  Breadcrumbs,
  ButtonLink,
  EditorialHeadline,
  Footer,
  Header,
} from "./SiteChrome";
import { DefinedText } from "./DefinedText";
import { GlossaryExplorer } from "./GlossaryExplorer";
import { SectionSidebar } from "./SectionNavigation";

const glossaryCategories: GlossaryCategory[] = [
  "Web foundations",
  "Source and delivery",
  "APIs and automation",
  "Search and measurement",
];

function SourceLinks({ sourceIds }: { sourceIds: string[] }) {
  const sources = sourceIds
    .map((sourceId) => sourcesById.get(sourceId))
    .filter((source) => Boolean(source));

  if (!sources.length) return null;

  return (
    <div className="knowledge-sources">
      <strong>Official sources</strong>
      <ul>
        {sources.map((source) => (
          <li key={source!.id}>
            <a href={source!.url} target="_blank" rel="noopener noreferrer">
              {source!.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span> · {source!.publisher}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KnowledgeHero({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  intro: string[];
  primary: { label: string; href: `/${string}` | `#${string}` };
  secondary: { label: string; href: `/${string}` | `#${string}` };
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
            eyebrow === "Resources"
              ? [{ label: "Home", href: "/" }, { label: "Resources" }]
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

function WebDeliveryDiagram() {
  return (
    <figure className="system-diagram" aria-labelledby="web-diagram-title">
      <figcaption>
        <p className="eyebrow">Diagram 01 · A public website request</p>
        <h2 id="web-diagram-title">How the name becomes a page.</h2>
        <p>
          This is the useful simplified model. Real networks contain more
          caching, routing, security, and provider detail, but the ownership
          boundaries remain recognizable.
        </p>
      </figcaption>
      <div className="delivery-route">
        <ol className="delivery-route__stages" aria-label="Four stages of a public website request">
          <li className="delivery-route__stage delivery-route__stage--request">
            <span className="delivery-route__number">01</span>
            <span className="delivery-route__verb">Request</span>
            <strong>Visitor browser</strong>
            <p>Asks for a named page over HTTPS.</p>
          </li>
          <li className="delivery-route__stage delivery-route__stage--resolve">
            <span className="delivery-route__number">02</span>
            <span className="delivery-route__verb">Resolve</span>
            <strong>DNS</strong>
            <p>Points the hostname toward the approved web service.</p>
          </li>
          <li className="delivery-route__stage delivery-route__stage--route">
            <span className="delivery-route__number">03</span>
            <span className="delivery-route__verb">Route</span>
            <strong>Cloudflare edge</strong>
            <p>Receives the request and applies the configured route.</p>
          </li>
          <li className="delivery-route__stage delivery-route__stage--return">
            <span className="delivery-route__number">04</span>
            <span className="delivery-route__verb">Return</span>
            <strong>Page or approved function</strong>
            <p>Returns the requested asset or invokes bounded server logic.</p>
          </li>
        </ol>
        <div className="delivery-route__key">
          <span>Delivery boundary</span>
          <p>Static assets stay on the asset path. Only configured application requests enter server logic.</p>
        </div>
      </div>
      <div className="diagram-source-note">
        <DefinedText text="Background concepts: [[client|client]], [[server|server]], [[dns|DNS]], [[http|HTTP]], [[hosting|hosting]], and [[static-site|static delivery]]." />
        <SourceLinks sourceIds={["mdn-web", "mdn-server", "cloudflare-dns", "cloudflare-pages-pricing"]} />
      </div>
    </figure>
  );
}

function HostingArchitectureDiagram() {
  return (
    <figure className="system-diagram system-diagram--dark approved-hosting-diagram" aria-labelledby="boho-diagram-title">
      <figcaption>
        <p className="eyebrow">Diagram 02 · Hosting and ownership route</p>
        <h2 id="boho-diagram-title">A reviewable path from owner access to the live website.</h2>
        <p>
          This owner-supplied conceptual diagram shows the working relationship
          between the client, Boho systems, GitHub, Cloudflare Workers, and the
          live website. It does not expose secret values or prove the current
          state of any account or deployment.
        </p>
      </figcaption>
      <div className="approved-hosting-diagram__image-wrap">
        <img
          src="/diagrams/boho-hosting-architecture-v2.png"
          width="1672"
          height="941"
          alt="Client or owner exchanges work with Boho servers. Reviewed source moves through GitHub and Cloudflare Workers to the live website. Client-owned API keys and secrets grant bounded access to approved systems."
        />
      </div>
      <details className="approved-hosting-diagram__transcript">
        <summary>Read the diagram as text</summary>
        <ol>
          <li>Client or owner and Boho servers exchange approved project information.</li>
          <li>Boho servers support development, preview, and tools and are owned by Boho and operated in the United States.</li>
          <li>Reviewed public source moves from Boho servers to GitHub.</li>
          <li>Approved builds move from GitHub to Cloudflare Workers and then to the live website.</li>
          <li>API keys and secrets remain client-owned; access is granted to Boho only for approved work.</li>
        </ol>
      </details>
      <div className="diagram-source-note">
        <DefinedText text="The route uses [[git|Git]], [[repository|repositories]], [[deployment|deployments]], [[api|APIs]], and [[automation|automation]] as separate, documented layers." />
        <SourceLinks sourceIds={["github-repositories", "github-pages", "cloudflare-pages-limits", "mcp-architecture"]} />
      </div>
    </figure>
  );
}

export function GlossaryPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page glossary-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Glossary"
          title="Technical language, translated before it becomes leverage."
          intro={[
            "This glossary gives the short version first, then explains why the term changes an ownership, website, search, measurement, or automation decision.",
            "Throughout the site, a dotted keyword with a small question mark can be hovered, focused with a keyboard, or tapped to reveal the short definition. Every popup links back to the same canonical entry here.",
          ]}
          primary={{ label: "Browse definitions", href: "#common-terms" }}
          secondary={{ label: "Read how Boho uses the tools", href: "/tools/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/learn/glossary/"
            title="Glossary"
            items={[
              { label: "Glossary home", href: "/learn/glossary/" },
              { label: "Tools documentation", href: "/tools/" },
              { label: "Learn overview", href: "/learn/" },
              { label: "Bad SEO Field Guide", href: "/learn/bad-seo-field-guide/" },
            ]}
            anchors={[
              { label: "Common terms", href: "#common-terms" },
              { label: `All ${glossaryEntries.length} terms`, href: "#all-terms" },
            ]}
            note="Search first, scan by letter, then expand only the definition you need."
          />
          <div className="knowledge-section-layout__content">
            <GlossaryExplorer />
            <div className="legacy-glossary" hidden>
              <div>
                <div>
              <p className="eyebrow">Definition index · {glossaryEntries.length} reviewed starters</p>
              <EditorialHeadline as="h2">
                <span id="glossary-index-title">Start with the word. End with the decision it affects.</span>
              </EditorialHeadline>
              <p>
                Definitions are educational context, not vendor endorsements or
                universal prescriptions. Platform behavior, limits, and policy
                can change; official sources are linked with each entry.
              </p>
              <nav className="glossary-category-nav" aria-label="Glossary categories">
                {glossaryCategories.map((category) => (
                  <a href={`#category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={category}>
                    {category}
                  </a>
                ))}
              </nav>
                </div>

            {glossaryCategories.map((category) => {
              const entries = glossaryEntries.filter((entry) => entry.category === category);
              const categoryId = `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

              return (
                <section className="glossary-category" id={categoryId} key={category} aria-labelledby={`${categoryId}-title`}>
                  <div className="glossary-category__title-row">
                    <h3 id={`${categoryId}-title`}>{category}</h3>
                    <span>{entries.length} entries</span>
                  </div>
                  <div className="glossary-entry-grid">
                    {entries.map((entry) => (
                      <article className="glossary-entry" id={`term-${entry.slug}`} key={entry.slug}>
                        <div className="glossary-entry__heading">
                          <h4>{entry.term}</h4>
                          {entry.aliases?.length ? <p>Also: {entry.aliases.join(", ")}</p> : null}
                        </div>
                        <p className="glossary-entry__short">{entry.shortDefinition}</p>
                        <div className="glossary-entry__detail">
                          <p>{entry.definition}</p>
                          <dl>
                            <div>
                              <dt>Why it matters</dt>
                              <dd>{entry.whyItMatters}</dd>
                            </div>
                            <div>
                              <dt>Common misunderstanding</dt>
                              <dd>{entry.commonMisunderstanding}</dd>
                            </div>
                          </dl>
                        </div>
                        {entry.relatedToolSlugs?.length ? (
                          <div className="glossary-entry__relations">
                            <strong>Related system terms</strong>
                            {entry.relatedToolSlugs.map((slug) => {
                              const tool = toolProfilesBySlug.get(slug);
                              return tool ? <span key={slug}>{tool.name}</span> : null;
                            })}
                          </div>
                        ) : null}
                        {entry.relatedTermSlugs?.length ? (
                          <div className="glossary-entry__relations">
                            <strong>Related definitions</strong>
                            {entry.relatedTermSlugs.map((slug) => {
                              const related = glossaryEntries.find((candidate) => candidate.slug === slug);
                              return related ? <a href={`#term-${slug}`} key={slug}>{related.term}</a> : null;
                            })}
                          </div>
                        ) : null}
                        <SourceLinks sourceIds={entry.sourceIds} />
                        <p className="knowledge-reviewed">Reviewed against linked sources · July 11, 2026</p>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function ToolsPage() {
  return (
    <>
      <Header />
      <main className="knowledge-page tools-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Tools"
          title="When the right tool does not exist, we build it."
          intro={[
            "Boho builds focused digital systems for repeated work that is too important for a spreadsheet, too specific for off-the-shelf software, or too fragmented across existing tools.",
            "The goal is useful operational leverage: clearer inputs, fewer manual handoffs, visible failure states, and ownership the business can understand.",
          ]}
          primary={{ label: "See what Boho builds", href: "#capabilities" }}
          secondary={{ label: "Build the missing tool", href: "/contact/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/tools/"
            anchors={[
              { label: "Capabilities", href: "#capabilities" },
              { label: "How the systems work", href: "#how-it-works" },
              { label: "A useful first scope", href: "#first-scope" },
              { label: "Start a conversation", href: "#custom-engineering" },
            ]}
            note="A useful tool starts with one repeated operational problem, a clear owner, and a measurable definition of working."
          />
          <div className="knowledge-section-layout__content">
        <section className="tools-principles" id="capabilities" aria-labelledby="tools-principles-title">
          <div className="section-shell tools-principles__inner">
            <p className="eyebrow">Practical capability lanes</p>
            <EditorialHeadline as="h2">
              <span id="tools-principles-title">Build the smallest system that removes the repeated friction.</span>
            </EditorialHeadline>
            <div className="tools-principles__grid">
              <article><strong>Workflow automation</strong><p>Move repeated intake, routing, approval, publishing, and follow-up work through a visible process.</p></article>
              <article><strong>Analytics and reporting</strong><p>Turn scattered data into a decision-ready view with clear sources and useful business signals.</p></article>
              <article><strong>Validation and monitoring</strong><p>Check important pages, feeds, records, or integrations and make failures easier to find and act on.</p></article>
              <article><strong>Integrations and APIs</strong><p>Connect the systems the business already uses without making the handoff harder to operate.</p></article>
            </div>
          </div>
        </section>

        <section className="tools-principles" id="first-scope" aria-labelledby="classifications-title">
          <div className="section-shell tools-principles__inner">
            <p className="eyebrow">A useful first scope</p>
            <EditorialHeadline as="h2">
              <span id="classifications-title">Start with one workflow and a definition of done.</span>
            </EditorialHeadline>
            <div className="tools-principles__grid">
              <article><strong>Users and owner</strong><p>Name who uses the tool, who owns the process, and who decides when the workflow changes.</p></article>
              <article><strong>Inputs and outputs</strong><p>Define what enters the system, what useful result comes out, and which data must stay protected.</p></article>
              <article><strong>Failure handling</strong><p>Make errors visible, preserve recovery paths, and decide which actions require human approval.</p></article>
              <article><strong>Operating fit</strong><p>Use infrastructure, maintenance, and documentation appropriate to the business that will run it.</p></article>
            </div>
          </div>
        </section>

        <section className="tools-diagrams" id="how-it-works">
          <div className="section-shell tools-diagrams__inner">
            <WebDeliveryDiagram />
            <HostingArchitectureDiagram />
          </div>
        </section>

        <section className="tool-directory" id="tool-fit" aria-labelledby="tool-directory-title">
          <div className="section-shell">
            <header className="tool-directory__heading">
              <p className="eyebrow">Good tool fit</p>
              <EditorialHeadline as="h2">
                <span id="tool-directory-title">Custom software should earn its place in the workflow.</span>
              </EditorialHeadline>
              <p>
                The best candidates are repeated, costly, error-prone tasks with
                a clear owner and a result that can be checked. If a reliable
                existing tool solves the problem cleanly, Boho will recommend
                using it instead of inventing another system.
              </p>
            </header>
          </div>
        </section>

        <section className="owned-entities-note" id="custom-engineering" aria-labelledby="owned-entities-title">
          <div className="section-shell owned-entities-note__inner">
            <p className="eyebrow">Custom tools and automation</p>
            <EditorialHeadline as="h2">
              <span id="owned-entities-title">Custom Tools & Automation is scoped from the operational problem.</span>
            </EditorialHeadline>
            <div>
              <article><h3>Bring the repeated work</h3><p>Describe the handoffs, spreadsheets, copy-and-paste steps, missed checks, or reporting gaps that consume time or create avoidable risk.</p></article>
              <article><h3>Choose the smallest useful build</h3><p>Boho will help decide whether the answer is an integration, a focused internal tool, a reporting layer, automation, or a simpler process change.</p><p><Link href="/services/custom-tools-automation/">Explore custom tools and automation →</Link></p></article>
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
