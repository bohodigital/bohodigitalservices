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
                <EditorialHeadline as="h1" className="pricing-hero__title"><span id="pricing-title">Starting prices, with a clear explanation of what you get.</span></EditorialHeadline>
              </div>
              <div>
                <p>{define("These are starting points, not one-size-fits-all packages. The final price depends on the size and condition of your website, the number of locations or systems involved, the access available, the deadline, and the work required.")}</p>
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
            <p>{define("The free review uses public information to identify the likely problem and best next conversation. It does not include a full audit, access to private accounts, provider recovery, or changes to your website.")}</p>
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
              <h2 id="pricing-policy-title">A paid assessment may count toward the larger project.</h2>
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
            <h2 id="pricing-notes-title">Your written proposal defines the project.</h2>
            <div>
              <article><h3>What a starting price means</h3><p>Each starting price covers the smallest complete version described on this page. Before paid work starts, your proposal will list the exact work, price, timing, what you receive, what is not included, ownership, support, and outside costs.</p></article>
              <article><h3>Smaller budgets</h3><p>If a smaller complete solution is possible, Boho may suggest a reduced or phased project. Work needed for the site to function safely, use authorized access, measure honestly, or launch responsibly will not be removed simply to reach a lower price.</p></article>
              <article><h3>Rush and emergency work</h3><p>Rush, emergency, and after-hours work is quoted separately and depends on availability. Timing is not promised until a written scope is accepted.</p></article>
            </div>
          </div>
        </section>

        <div className="section-shell pricing-cta">
          <CtaBand title="Start with the free review. Approve a larger project only when the need and scope are clear." primary={{ label: "Start the free review", href: "/start/" }} secondary={{ label: "Review all five services", href: "/services/" }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
