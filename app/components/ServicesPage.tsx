import {
  ArrowRight,
  BarChart3,
  Blocks,
  Compass,
  PanelsTopLeft,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { servicePriceSummaries } from "../content/pricingPolicy.mjs";
import { DefinedText } from "./DefinedText";
import {
  Breadcrumbs,
  ButtonLink,
  CtaBand,
  EditorialHeadline,
  Footer,
  Header,
} from "./SiteChrome";

const services = [
  {
    number: "01",
    title: "Ongoing SEO & Search Growth",
    kicker: "Local visibility, qualified inquiries, and continual improvement",
    summary:
      "Connect search, local relevance, service content, technical health, customer paths, and measurement around the work that deserves to continue.",
    href: "/services/ongoing-seo/" as const,
    image: "/visuals/growth-analysis.webp",
    alt: "Layered growth-analysis composition with charts, notes, and connected signals.",
    icon: SearchCheck,
  },
  {
    number: "02",
    title: "Web Design & Website Redesign",
    kicker: "Clarity, trust, search, action, and ownership",
    summary:
      "Repair, redesign, or build the smallest complete website that explains the business, works across devices, and remains understandable to own.",
    href: "/services/web-design-redesign/" as const,
    image: "/visuals/homepage-design-studio-v2.webp",
    alt: "Editorial website-design workspace with page studies, typography, and layout notes.",
    icon: PanelsTopLeft,
  },
  {
    number: "03",
    title: "Website Migration & Provider Rescue",
    kicker: "Authorized control, continuity, and a documented exit",
    summary:
      "Map domains, access, providers, URLs, forms, measurement, and email dependencies before changing a fragile system.",
    href: "/services/provider-rescue/" as const,
    image: "/visuals/migration-infrastructure.webp",
    alt: "Migration planning composition with infrastructure layers and a mapped transfer path.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Digital Research, SEO Audits & Strategy",
    kicker: "Evidence before the expensive implementation",
    summary:
      "Turn websites, markets, search, analytics, and provider information into a short list of decisions with sources, limits, and priorities.",
    href: "/services/research-audits-strategy/" as const,
    image: "/visuals/research-notebook.webp",
    alt: "Research notebook composition with evidence cards, annotations, and analytical marks.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Custom Web & Digital Solutions",
    kicker: "The smallest useful system for a stable problem",
    summary:
      "Build or connect focused tools, forms, dashboards, integrations, data workflows, publishing systems, and automation when custom work is justified.",
    href: "/services/custom-digital-solutions/" as const,
    image: "/visuals/creative-process.webp",
    alt: "Creative engineering process composition with components, connections, and working notes.",
    icon: Blocks,
  },
] as const;

const decisionRoutes = [
  ["We need more useful local visibility and a clearer path to inquiry.", "/services/ongoing-seo/", "Start with ongoing SEO and search growth."],
  ["The website is unclear, dated, inaccessible, or difficult to own.", "/services/web-design-redesign/", "Start with web design or a focused improvement."],
  ["We need to leave a provider without breaking the business.", "/services/provider-rescue/", "Start with a provider rescue assessment."],
  ["We need evidence before deciding what to buy.", "/services/research-audits-strategy/", "Start with research, an audit, or reporting."],
  ["Repeated work is slow, fragile, or trapped between systems.", "/services/custom-digital-solutions/", "Start with discovery and feasibility."],
] as const;

export function ServicesPage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className="services-overhaul" id="main-content" tabIndex={-1}>
        <section className="services-hub-hero" aria-labelledby="services-hub-title">
          <div className="services-hub-hero__backdrop" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="section-shell services-hub-hero__inner">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
            <div className="services-hub-hero__layout">
              <div className="services-hub-hero__copy">
                <p className="eyebrow eyebrow--on-dark">Services</p>
                <EditorialHeadline as="h1" className="services-hub-hero__title">
                  <span id="services-hub-title">Five service lanes for businesses that need the whole system explained.</span>
                </EditorialHeadline>
                <p className="services-hub-hero__intro">
                  {define("Boho connects local visibility, qualified inquiries, websites, provider infrastructure, custom tools, research, and measurement around the business problem—not a generic package.")}
                </p>
                <div className="button-row">
                  <ButtonLink href="/start/">Start the free review</ButtonLink>
                  <ButtonLink href="/pricing/" variant="secondary">See pricing and scope</ButtonLink>
                </div>
                <p className="services-hub-hero__trust">The first public-information review is free. Paid work begins only after a written scope is accepted.</p>
              </div>

              <div className="services-route-map" aria-label="Five service routes">
                <p><Compass aria-hidden="true" size={20} /> Bring the visible problem.</p>
                <ol>
                  {services.map((service) => (
                    <li key={service.href}>
                      <span>{service.number}</span>
                      <Link href={service.href}>{service.title}<ArrowRight aria-hidden="true" size={15} /></Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="services-hub-catalog" aria-labelledby="services-catalog-title">
          <div className="section-shell">
            <header className="services-hub-heading">
              <p className="eyebrow">Five connected services</p>
              <h2 id="services-catalog-title">Choose the lane after naming the problem.</h2>
              <p>{define("Each page explains fit, exclusions, process, deliverables, client responsibilities, starting prices, limitations, and the next useful action.")}</p>
            </header>
            <div className="services-catalog-grid">
              {services.map(({ icon: Icon, ...service }) => (
                <article className="services-catalog-card" key={service.href}>
                  <figure>
                    <img alt={service.alt} loading="lazy" src={service.image} />
                    <figcaption><Icon aria-hidden="true" size={20} /> {service.kicker}</figcaption>
                  </figure>
                  <div className="services-catalog-card__body">
                    <span className="services-catalog-card__number">{service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{define(service.summary)}</p>
                    <p className="services-catalog-card__price">{servicePriceSummaries[service.href]}</p>
                    <Link href={service.href}>Review the service <ArrowRight aria-hidden="true" size={16} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-problem-chooser" aria-labelledby="services-chooser-title">
          <div className="section-shell services-problem-chooser__layout">
            <header>
              <p className="eyebrow eyebrow--on-dark">A practical chooser</p>
              <h2 id="services-chooser-title">Start with the problem you can already see.</h2>
              <p>Boho will help decide what not to buy yet.</p>
            </header>
            <ol>
              {decisionRoutes.map(([problem, href, answer], index) => (
                <li key={href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{problem}</strong><small>{answer}</small></div>
                  <Link href={href} aria-label={`${answer} Review service`}><ArrowRight aria-hidden="true" size={18} /></Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="services-pricing-bridge" aria-labelledby="services-pricing-title">
          <div className="section-shell services-pricing-bridge__layout">
            <div>
              <p className="eyebrow">Public planning minimums</p>
              <h2 id="services-pricing-title">Enough pricing to decide whether the next conversation makes sense.</h2>
            </div>
            <div>
              <p>{define("Starting prices describe the smallest complete scope. The specific written engagement controls final scope, timing, ownership, support, third-party costs, and acceptance.")}</p>
              <Link href="/pricing/">Read the Pricing &amp; Scope Guide <ArrowRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
        </section>

        <div className="section-shell services-hub-cta">
          <CtaBand
            title="Bring the business problem. Boho will help name the service."
            body={<p>{define("Send the website, market, provider situation, repeated workflow, or decision that feels unclear. The useful first move may be a free review, a focused project, or no paid work yet.")}</p>}
            primary={{ label: "Start the free review", href: "/start/" }}
            secondary={{ label: "Talk to someone technical", href: "/contact/" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
