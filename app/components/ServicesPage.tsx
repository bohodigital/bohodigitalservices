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
import { servicePresentationByRoute } from "../content/servicePresentation";
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
    href: "/services/ongoing-seo/" as const,
    ...servicePresentationByRoute["/services/ongoing-seo/"],
    icon: SearchCheck,
  },
  {
    number: "02",
    title: "Web Design & Website Redesign",
    href: "/services/web-design-redesign/" as const,
    ...servicePresentationByRoute["/services/web-design-redesign/"],
    icon: PanelsTopLeft,
  },
  {
    number: "03",
    title: "Website Migration & Provider Rescue",
    href: "/services/provider-rescue/" as const,
    ...servicePresentationByRoute["/services/provider-rescue/"],
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Digital Research, SEO Audits & Strategy",
    href: "/services/research-audits-strategy/" as const,
    ...servicePresentationByRoute["/services/research-audits-strategy/"],
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Custom Web & Digital Solutions",
    href: "/services/custom-digital-solutions/" as const,
    ...servicePresentationByRoute["/services/custom-digital-solutions/"],
    icon: Blocks,
  },
] as const;

const decisionRoutes = [
  ["We want more of the right local customers to find and contact us.", "/services/ongoing-seo/", "Start with ongoing SEO."],
  ["Our website is unclear, outdated, hard to use, or hard to update.", "/services/web-design-redesign/", "Start with a focused repair, redesign, or new website."],
  ["We need to leave a provider without losing our website, domain, or search visibility.", "/services/provider-rescue/", "Start with a provider rescue review."],
  ["We need to know what is working and what to fix first.", "/services/research-audits-strategy/", "Start with a review, report, or audit."],
  ["A repeated task wastes time or causes mistakes.", "/services/custom-digital-solutions/", "Start with a custom-project review."],
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
                  <span id="services-hub-title">Five services for the problems businesses face online.</span>
                </EditorialHeadline>
                <p className="services-hub-hero__intro">
                  {define("Boho helps businesses get found, improve or replace a website, leave a difficult provider, understand what the evidence says, or simplify repeated digital work. We start with the problem and recommend only the work that fits.")}
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
              <h2 id="services-catalog-title">Choose the service that matches the problem.</h2>
              <p>{define("Each page explains who the service is for, what is included, what is not included, what it costs to start, and what happens next.")}</p>
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
              <p className="eyebrow">Starting prices</p>
              <h2 id="services-pricing-title">See what the smallest complete project costs.</h2>
            </div>
            <div>
              <p>{define("Starting prices show what a basic project includes. Your written proposal will list the exact work, price, timing, ownership, ongoing support, and any outside costs.")}</p>
              <Link href="/pricing/">Read the Pricing &amp; Scope Guide <ArrowRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
        </section>

        <div className="section-shell services-hub-cta">
          <CtaBand
            title="Tell us what is not working. We will help choose the next step."
            body={<p>{define("Send the website, provider problem, repeated task, or decision that feels unclear. The right first move may be a free review, a focused project, or no paid work yet.")}</p>}
            primary={{ label: "Start the free review", href: "/start/" }}
            secondary={{ label: "Talk through your situation", href: "/contact/" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
