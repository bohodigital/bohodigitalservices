/* eslint-disable @next/next/no-img-element */
import { selectedTools } from "../content/systems";
import { demoProjects } from "../content/demoLibrary";
import { DemoLibrary } from "./DemoLibrary";
import { ButtonLink, Footer, Header } from "./SiteChrome";

const publicProperties = [
  {
    name: "Boho News",
    category: "News and evidence publishing",
    href: "https://www.bohonews.com/",
    image: "/proof/about/boho-news-homepage.png",
    alt: "Boho News homepage showing its market desk, news masthead, lead investigation, data report, and continuous latest-news desk.",
    copy: "A multi-section news publication built for fast reporting, investigations, public documents, data presentations, corrections, search, feeds, and disciplined editorial governance.",
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
  name: "Website demos and work built by Boho",
  itemListElement: [...demoProjects, ...publicProperties].map((property, index) => ({
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
              <h1 id="work-title">Real websites, demo builds, and systems—live on the web.</h1>
              <p>
                Browse complete website demonstrations at three project levels, then inspect the public properties and technical systems Boho owns and operates. Every item is linked so you can judge the actual work for yourself.
              </p>
              <div className="reset-actions">
                <ButtonLink href="#demo-library">Browse the demo library</ButtonLink>
                <ButtonLink href="/start/" variant="secondary">Get a free website review</ButtonLink>
              </div>
            </div>
            <div className="reset-work-hero__showcase">
              <div className="reset-work-hero__browser reset-work-hero__browser--primary" aria-hidden="true">
                <span><i /><i /><i /><b>junkremoval.demos.bohodigitalservices.com</b></span>
                <img alt="" height="4255" src="/demos/junk-removal-homepage.webp" width="960" />
              </div>
              <div className="reset-work-hero__browser reset-work-hero__browser--cafe" aria-hidden="true">
                <span><i /><i /><i /><b>cafe.demos.bohodigitalservices.com</b></span>
                <img alt="" height="3057" src="/demos/cafe-homepage.webp" width="960" />
              </div>
              <div className="reset-work-hero__browser reset-work-hero__browser--custom" aria-hidden="true">
                <span><i /><i /><i /><b>pestcontrol.demos.bohodigitalservices.com</b></span>
                <img alt="" height="5777" src="/demos/pest-control-homepage.webp" width="960" />
              </div>
              <aside className="reset-interior-hero__receipt reset-work-hero__receipt">
                <span>LIVE WORK LIBRARY</span>
                <strong>8 complete demos</strong>
                <p>Fictional businesses, Boho-owned work, and public systems you can inspect for yourself.</p>
                <ul aria-label="Demo project levels">
                  <li>5 brochure</li>
                  <li>1 expanded</li>
                  <li>2 high-end</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="reset-section demo-library-section" id="demo-library" aria-labelledby="demo-library-title">
          <div className="reset-shell">
            <header className="reset-heading demo-library-heading">
              <div>
                <p className="reset-eyebrow">THE BOHO DEMO LIBRARY</p>
                <h2 id="demo-library-title">Choose a level. Tour the real site.</h2>
              </div>
              <p>These are fictional businesses built to demonstrate what different website scopes can include. Filter by project level, scroll through the previews, and open any complete demo in a new tab.</p>
            </header>
            <p className="reset-proof-disclosure">Demo names, teams, locations, availability, reviews, credentials, and business details are fictional. They are design and functionality demonstrations—not client case studies or performance claims.</p>
            <DemoLibrary />
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
                  <a
                    aria-label={`Visit ${property.name} live property (opens in a new tab)`}
                    className="reset-work-card__link"
                    data-analytics-destination-type="live_property"
                    data-analytics-event="work_project_click"
                    data-analytics-project-name={property.name}
                    href={property.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {"image" in property ? (
                      <img alt={property.alt} height="800" loading="lazy" src={property.image} width="1280" />
                    ) : null}
                    <div className="reset-work-card__body">
                      <p className="reset-eyebrow">BOHO-OWNED PROPERTY · {property.category}</p>
                      <h3>{property.name}</h3>
                      <p>{property.copy}</p>
                      <h4>Demonstrates</h4>
                      <ul>{property.demonstrates.map((item) => <li key={item}>{item}</li>)}</ul>
                      <span className="reset-card-action">Visit live property <span aria-hidden="true">↗</span></span>
                    </div>
                  </a>
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
                  <a
                    aria-label={`Explore the ${tool.displayName} profile on Boho Digital Services (opens in a new tab)`}
                    className="reset-work-tool-card__link"
                    data-analytics-destination-type="internal_tool_detail"
                    data-analytics-event="tools_project_click"
                    data-analytics-project-name={tool.displayName}
                    href={tool.profileHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt={tool.image.alt} height={tool.image.height} loading="lazy" src={tool.image.src} width={tool.image.width} />
                    <h3>{tool.displayName}</h3>
                    <p>{tool.shortPublicSummary}</p>
                    <span className="reset-card-action">Explore the tool <span aria-hidden="true">↗</span></span>
                  </a>
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
