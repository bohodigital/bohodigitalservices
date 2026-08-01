/* eslint-disable @next/next/no-img-element */
import { selectedTools } from "../content/systems";
import { ButtonLink, Footer, Header } from "./SiteChrome";

const publicProperties = [
  {
    name: "Boho News",
    category: "News and evidence publishing",
    href: "https://www.bohonews.com/",
    copy: "Boho News is a multi-section publication built for rapid reporting, structured article formats, investigations, public documents, data presentations, corrections, search, feeds, and editorial governance.",
    demonstrates: [
      "Complex information architecture",
      "High-volume publishing",
      "Article and desk taxonomies",
      "Evidence and document handling",
      "Responsive news layouts",
      "Editorial and release workflows",
    ],
  },
  {
    name: "How Biscuit",
    category: "Consumer how-to publishing",
    href: "https://howbiscuit.com/",
    image: "/proof/about/how-biscuit-homepage.png",
    alt: "How Biscuit homepage showing category navigation, a practical guide hero, and supporting article sections.",
    copy: "How Biscuit is a practical guide publication built around answer-first articles, subject categories, supporting evidence, media, reusable templates, and clear routes into related material.",
    demonstrates: [
      "Editorial page systems",
      "Mixed-intent content architecture",
      "Search-oriented internal paths",
      "Reusable media handling",
      "Mobile reading experience",
      "Publishing operations",
    ],
  },
  {
    name: "Rank Builder SEO",
    category: "SEO research and education",
    href: "https://rankbuilderseo.com/",
    image: "/proof/about/rank-builder-seo-homepage.png",
    alt: "Rank Builder SEO homepage showing its independent SEO research desk masthead and editorial hero.",
    copy: "Rank Builder SEO treats search claims as questions to investigate. The property combines technical explanations, definitions, guides, evidence-aware articles, experiments, and controlled topic relationships.",
    demonstrates: [
      "Technical SEO content",
      "Topic architecture",
      "Structured data",
      "Internal linking systems",
      "Research-oriented publishing",
      "Analytics and search measurement",
    ],
  },
  {
    name: "Better Grades",
    category: "Educational publishing and tools",
    href: "https://bettergrades.net/",
    image: "/proof/about/better-grades-homepage.png",
    alt: "Better Grades homepage showing its math-help search interface and interactive learning content.",
    copy: "Better Grades combines structured courses, worked explanations, practice material, calculators, and diagnostic tools in a large interconnected learning system.",
    demonstrates: [
      "Course and lesson architecture",
      "Interactive learning tools",
      "Mathematical content rendering",
      "Sequential and nonlinear navigation",
      "Search-to-tool paths",
      "Large-scale content relationships",
    ],
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Work built and operated by Boho",
  itemListElement: publicProperties.map((property, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: property.href,
    name: property.name,
  })),
};

export function WorkPage() {
  return (
    <>
      <Header />
      <main className="reset-work-page" id="main-content" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        <section className="reset-interior-hero reset-work-hero" aria-labelledby="work-title">
          <div className="reset-shell reset-interior-hero__grid">
            <div>
              <p className="reset-eyebrow">WORK BUILT BY BOHO</p>
              <h1 id="work-title">Real websites and systems, live on the web.</h1>
              <p>
                Boho is a new service company, so it does not borrow client logos or invent case studies. The work below is owned and operated by Boho. It shows the design, publishing, search, data, and operational systems we can inspect directly.
              </p>
              <div className="reset-actions">
                <ButtonLink href="/start/">Get a free website review</ButtonLink>
                <ButtonLink href="/tools/" variant="secondary">Explore Boho’s technical systems</ButtonLink>
              </div>
            </div>
            <aside className="reset-interior-hero__receipt">
              <p>Boho-owned work. Not client case studies. No fabricated performance claims.</p>
            </aside>
          </div>
        </section>

        <section className="reset-section reset-work-properties" aria-labelledby="work-properties-title">
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">PUBLIC PROPERTIES</p>
              <h2 id="work-properties-title">Websites and publishing systems</h2>
              <p>Each property serves a different audience and operating purpose. Together they demonstrate responsive design, information architecture, structured publishing, search foundations, interactive tools, measurement, deployment, and ongoing operation.</p>
            </header>
            <p className="reset-proof-disclosure">These are Boho-owned properties, not client case studies. They demonstrate work that can be inspected directly; they do not establish client outcomes.</p>
            <div className="reset-work-grid">
              {publicProperties.map((property) => (
                <article className="reset-work-card" key={property.name}>
                  {"image" in property ? (
                    <a
                      data-analytics-destination-type="live_property"
                      data-analytics-event="work_project_click"
                      data-analytics-project-name={property.name}
                      href={property.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img alt={property.alt} height="1000" loading="lazy" src={property.image} width="1440" />
                    </a>
                  ) : null}
                  <div className="reset-work-card__body">
                    <p className="reset-eyebrow">BOHO-OWNED PROPERTY · {property.category}</p>
                    <h3>{property.name}</h3>
                    <p>{property.copy}</p>
                    <h4>Demonstrates</h4>
                    <ul>{property.demonstrates.map((item) => <li key={item}>{item}</li>)}</ul>
                    <a
                      data-analytics-destination-type="live_property"
                      data-analytics-event="work_project_click"
                      data-analytics-project-name={property.name}
                      href={property.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >Visit live property</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reset-section reset-work-tools" aria-labelledby="work-tools-title">
          <div className="reset-shell">
            <header className="reset-heading">
              <p className="reset-eyebrow">PUBLIC TECHNICAL SYSTEMS</p>
              <h2 id="work-tools-title">Tools that support the work</h2>
              <p>Boho also develops public tools and internal operating systems when repeated work deserves a reliable technical solution.</p>
            </header>
            <div className="reset-services__grid">
              {selectedTools.map((tool) => (
                <article className="reset-service-card" key={tool.id}>
                  <img alt={tool.image.alt} height={tool.image.height} loading="lazy" src={tool.image.src} width={tool.image.width} />
                  <h3>{tool.displayName}</h3>
                  <p>{tool.shortPublicSummary}</p>
                  <a
                    data-analytics-destination-type="public_repository"
                    data-analytics-event="tools_project_click"
                    data-analytics-project-name={tool.displayName}
                    href={tool.repositoryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >View public repository</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reset-section reset-final" aria-labelledby="work-final-title">
          <div className="reset-shell reset-final__grid">
            <div>
              <h2 id="work-final-title">Need a website or system built around a real business job?</h2>
              <p>Send the current website or describe the problem. Boho will explain whether the useful starting point is a business website, ongoing SEO, focused website help, or custom work.</p>
            </div>
            <ButtonLink href="/start/">Get a free website review</ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
