import {
  glossaryEntries,
  knowledgeSources,
  sourcesById,
  toolProfiles,
  toolProfilesBySlug,
  type GlossaryCategory,
} from "../content/knowledge";
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
      <div className="knowledge-hero__mosaic" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="section-shell knowledge-hero__inner">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: eyebrow },
          ]}
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
      <meta name="robots" content="noindex, nofollow" />
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
                            <strong>Read the deeper tool documentation</strong>
                            {entry.relatedToolSlugs.map((slug) => {
                              const tool = toolProfilesBySlug.get(slug);
                              return tool ? <a href={`/tools/#tool-${slug}`} key={slug}>{tool.name}</a> : null;
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

function ToolProfileArticle({ tool, index }: { tool: (typeof toolProfiles)[number]; index: number }) {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText text={text} seenTerms={seenTerms} />;

  return (
    <article className="tool-profile" id={`tool-${tool.slug}`}>
      <header className="tool-profile__header">
        <div>
          <span className="tool-profile__number">{String(index + 1).padStart(2, "0")}</span>
          <p className="eyebrow">{tool.category}</p>
        </div>
        <div>
          <h2>{tool.name}</h2>
          <p className="tool-profile__summary">{define(tool.summary)}</p>
        </div>
      </header>
      <div className="tool-profile__overview">
        <section>
          <h3>What it is</h3>
          {tool.whatItIs.map((paragraph) => <p key={paragraph.slice(0, 30)}>{define(paragraph)}</p>)}
        </section>
        <section>
          <h3>How Boho uses it</h3>
          {tool.howBohoUsesIt.map((paragraph) => <p key={paragraph.slice(0, 30)}>{define(paragraph)}</p>)}
        </section>
      </div>
      <div className="tool-profile__detail-grid">
        <section>
          <h3>Practical use cases</h3>
          <ul>{tool.useCases.map((item) => <li key={item}>{define(item)}</li>)}</ul>
        </section>
        <section>
          <h3>Subtools and building blocks</h3>
          <dl>
            {tool.subtools.map((subtool) => (
              <div key={subtool.name}>
                <dt>{subtool.name}</dt>
                <dd>{define(subtool.description)}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h3>API and automation examples</h3>
          <ol>{tool.automationExamples.map((item) => <li key={item}>{define(item)}</li>)}</ol>
        </section>
        <section>
          <h3>Why it can be cost-efficient</h3>
          <ul>{tool.costNotes.map((item) => <li key={item}>{define(item)}</li>)}</ul>
        </section>
      </div>
      <aside className="tool-profile__boundaries">
        <h3>Operating boundaries</h3>
        <ul>{tool.boundaries.map((item) => <li key={item}>{define(item)}</li>)}</ul>
      </aside>
      <div className="tool-profile__terms">
        <strong>Start with the glossary</strong>
        {tool.relatedTermSlugs.map((slug) => {
          const entry = glossaryEntries.find((candidate) => candidate.slug === slug);
          return entry ? <a href={`/learn/glossary/#term-${slug}`} key={slug}>{entry.term}</a> : null;
        })}
      </div>
      <SourceLinks sourceIds={tool.sourceIds} />
      <p className="knowledge-reviewed">Reviewed against linked official sources · July 11, 2026</p>
    </article>
  );
}

export function ToolsPage() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <Header />
      <main className="knowledge-page tools-page" id="main-content" tabIndex={-1}>
        <KnowledgeHero
          eyebrow="Tools"
          title="Use the smallest reliable system that keeps the owner in control."
          intro={[
            "This is part tool catalog, part operating documentation. It explains what each system does, how Boho uses it, what can be automated through an [[api|API]], what it can save, and where the boundaries belong.",
            "The architecture separates private work on Boho Central Servers from reviewed public-facing source in [[github|GitHub]] and public delivery through [[hosting|hosting]] such as [[static-site|static-site]] platforms. Cost efficiency comes from choosing the right layer—not from pretending every service is free or every task should be automated.",
          ]}
          primary={{ label: "See the operating diagrams", href: "#how-it-works" }}
          secondary={{ label: "Open the plain-language Glossary", href: "/learn/glossary/" }}
        />

        <div className="knowledge-section-layout">
          <SectionSidebar
            currentPath="/tools/"
            title="Tools documentation"
            items={[
              { label: "Tools overview", href: "/tools/" },
              { label: "Plain-language glossary", href: "/learn/glossary/" },
              { label: "Learn overview", href: "/learn/" },
              { label: "Research lab", href: "/lab/" },
            ]}
            anchors={[
              { label: "Selection rules", href: "#tool-principles" },
              { label: "How the systems work", href: "#how-it-works" },
              ...toolProfiles.map((tool) => ({ label: tool.name, href: `#tool-${tool.slug}` as `#${string}` })),
              { label: "Owned entities", href: "#owned-entities" },
              { label: "Official sources", href: "#official-sources" },
            ]}
            note="Jump between architecture, individual tool profiles, and official documentation."
          />
          <div className="knowledge-section-layout__content">
        <section className="tools-principles" id="tool-principles" aria-labelledby="tools-principles-title">
          <div className="section-shell tools-principles__inner">
            <p className="eyebrow">The selection rule</p>
            <EditorialHeadline as="h2">
              <span id="tools-principles-title">The tool earns its place by making ownership, quality, or useful work better.</span>
            </EditorialHeadline>
            <div className="tools-principles__grid">
              <article><strong>Client control</strong><p>Domains, production accounts, source, and recovery paths should remain visible and transferable.</p></article>
              <article><strong>Private by design</strong><p>Credentials, raw research, client data, and internal network detail stay out of public repositories and pages.</p></article>
              <article><strong>Automation with gates</strong><p>Machines handle repeatable collection and checks; humans approve claims, consequential changes, and publication.</p></article>
              <article><strong>Cost in context</strong><p>A $0 platform line can be real within current limits, but domain, email, forms, maintenance, support, and labor remain separate.</p></article>
            </div>
          </div>
        </section>

        <section className="tools-diagrams" id="how-it-works">
          <div className="section-shell tools-diagrams__inner">
            <WebDeliveryDiagram />
            <HostingArchitectureDiagram />
          </div>
        </section>

        <section className="tool-directory" aria-labelledby="tool-directory-title">
          <div className="section-shell">
            <header className="tool-directory__heading">
              <p className="eyebrow">Working catalog · {toolProfiles.length} detailed profiles</p>
              <EditorialHeadline as="h2">
                <span id="tool-directory-title">Tools are documented as systems, not logos.</span>
              </EditorialHeadline>
              <p>
                Each profile includes practical use, subtools, automation
                examples, cost reasoning, operating boundaries, glossary links,
                and official sources. No profile activates a service on this
                private draft.
              </p>
              <nav className="tool-directory__nav" aria-label="Tool profiles">
                {toolProfiles.map((tool) => <a href={`#tool-${tool.slug}`} key={tool.slug}>{tool.name}</a>)}
              </nav>
            </header>
            <div className="tool-directory__profiles">
              {toolProfiles.map((tool, index) => <ToolProfileArticle index={index} key={tool.slug} tool={tool} />)}
            </div>
          </div>
        </section>

        <section className="owned-entities-note" id="owned-entities" aria-labelledby="owned-entities-title">
          <div className="section-shell owned-entities-note__inner">
            <p className="eyebrow">Owned entities · placeholders only</p>
            <EditorialHeadline as="h2">
              <span id="owned-entities-title">Two in-house properties can support future, disclosed learning.</span>
            </EditorialHeadline>
            <div>
              <article><h3>Rank Builder SEO</h3><p>Owned by Boho. Reserved for a future reviewed entity description and selected technical research. No public link is included yet.</p></article>
              <article><h3>How Biscuit</h3><p>Owned by Boho. Reserved for a future reviewed entity description or transparent experiment record. No public link is included yet.</p></article>
            </div>
          </div>
        </section>

        <section className="knowledge-source-register" id="official-sources" aria-labelledby="source-register-title">
          <div className="section-shell knowledge-source-register__inner">
            <p className="eyebrow">Source register</p>
            <EditorialHeadline as="h2">
              <span id="source-register-title">Official documentation behind this first pass.</span>
            </EditorialHeadline>
            <p>
              Product limits, pricing, APIs, and policies change. These links
              were reviewed on July 11, 2026 and should be checked again before
              production publication or a client proposal relies on a volatile
              detail.
            </p>
            <ol>
              {knowledgeSources.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <span>{source.publisher}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
