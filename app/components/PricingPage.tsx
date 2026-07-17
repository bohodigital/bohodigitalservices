import { ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";

import { assessmentCreditPolicy, pricingGroups } from "../content/pricingPolicy.mjs";
import { DefinedText } from "./DefinedText";
import { Breadcrumbs, ButtonLink, CtaBand, EditorialHeadline, Footer, Header } from "./SiteChrome";

export function PricingPage() {
  const seenTerms = new Set<string>();
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <>
      <Header />
      <main className="pricing-overhaul" id="main-content" tabIndex={-1}>
        <section className="pricing-hero" aria-labelledby="pricing-title">
          <div className="section-shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
            <div className="pricing-hero__layout">
              <div>
                <p className="eyebrow eyebrow--on-dark">Pricing &amp; Scope Guide</p>
                <EditorialHeadline as="h1" className="pricing-hero__title"><span id="pricing-title">Public minimums, with the minimum scope explained.</span></EditorialHeadline>
              </div>
              <div>
                <p>{define("A starting price is useful only when it says what starts there. Page count, markets, data, integrations, access, technical condition, timing, and risk determine the actual scope.")}</p>
                <div className="button-row">
                  <ButtonLink href="/start/">Start the free review</ButtonLink>
                  <ButtonLink href="/services/" variant="secondary">Compare services</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-free-review" aria-labelledby="free-review-title">
          <div className="section-shell pricing-free-review__layout">
            <div><span>Free</span><h2 id="free-review-title">Initial public-information review</h2></div>
            <p>{define("The free review identifies the likely problem, service category, and useful next discussion. It is not a complete audit, private-account review, provider recovery engagement, or implementation project.")}</p>
            <Link href="/start/">Start the review <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </section>

        <nav className="pricing-index" aria-label="Pricing categories">
          <div className="section-shell">
            {pricingGroups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.title}</a>)}
          </div>
        </nav>

        <div className="pricing-groups">
          {pricingGroups.map((group, groupIndex) => (
            <section className="pricing-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
              <div className="section-shell pricing-group__layout">
                <header>
                  <p className="eyebrow">{group.eyebrow}</p>
                  <h2 id={`${group.id}-title`}>{group.title}</h2>
                  <span aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</span>
                </header>
                <div className="pricing-offer-list">
                  {group.offers.map(([name, price, description]) => (
                    <article key={name}>
                      <div><h3>{name}</h3><strong>{price}</strong></div>
                      <p>{define(description)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="pricing-policy" aria-labelledby="pricing-policy-title">
          <div className="section-shell pricing-policy__layout">
            <div>
              <p className="eyebrow eyebrow--on-dark">Assessment credit</p>
              <h2 id="pricing-policy-title">Eligible one-time research can carry into the larger work.</h2>
              <p>{define(assessmentCreditPolicy.summary)}</p>
            </div>
            <div className="pricing-policy__conditions">
              <h3>Normally required</h3>
              <ul>
                {assessmentCreditPolicy.required.map((item) => <li key={item}><Check aria-hidden="true" size={16} />{item}</li>)}
              </ul>
              <h3>Not included in the credit</h3>
              <ul>
                {assessmentCreditPolicy.restrictions.map((item) => <li key={item}><Minus aria-hidden="true" size={16} />{item}</li>)}
              </ul>
              <p>{define(assessmentCreditPolicy.changedCircumstances)}</p>
            </div>
          </div>
        </section>

        <section className="pricing-notes" aria-labelledby="pricing-notes-title">
          <div className="section-shell">
            <h2 id="pricing-notes-title">The written engagement controls the real project.</h2>
            <div>
              <article><h3>Starting-price qualification</h3><p>Public prices are general planning guidance in U.S. dollars. Starting prices apply only to the smallest complete scope described. Final scope, price, timing, deliverables, exclusions, dependencies, ownership, licensing, infrastructure, support, service levels, and third-party costs are determined through a specific written engagement.</p></article>
              <article><h3>Smaller budgets</h3><p>Boho may find a leaner, phased, or reduced scope when a useful and complete result remains possible. Work required for basic function, authorized access, security, honest measurement, legal operation, or responsible deployment will not be removed merely to force an unsuitable budget.</p></article>
              <article><h3>Priority work</h3><p>Emergency, accelerated, after-hours, and capacity-displacing work is reviewed separately. Availability, acceptance, response, resolution, and priority pricing are not guaranteed before a written scope is approved.</p></article>
            </div>
          </div>
        </section>

        <div className="section-shell pricing-cta">
          <CtaBand title="Start with the free review. Buy the larger scope only when it has a reason to exist." primary={{ label: "Start the free review", href: "/start/" }} secondary={{ label: "Review all five services", href: "/services/" }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
