import type { ReactNode } from "react";

import {
  assessmentCreditPolicy,
  industryPriceLedger,
} from "../content/pricingPolicy.mjs";
import {
  hybridReviewHref,
  industriesHubMetadata,
  industryModels,
  industryReviewHref,
  type IndustryModel,
} from "../content/industries";
import { IndustryTrackedLink } from "./IndustryTrackedLink";
import {
  CustomerDecisionFieldFigure,
  CustomerPathFigure,
  HybridMapFigure,
  IndustryConceptFigure,
  IndustryContextFigure,
  PricingLadderFigure,
  ResearchMethodFigure,
} from "./IndustryVisuals";
import { Breadcrumbs, FaqItem, Footer, Header } from "./SiteChrome";

type LedgerEntry = {
  key: string;
  label: string;
  display: string;
  href: string;
};

const ledger = industryPriceLedger as LedgerEntry[];
const ledgerByKey = new Map(ledger.map((entry) => [entry.key, entry]));

function TrackedButton({
  href,
  event,
  model,
  section,
  destination,
  label,
  variant = "primary",
}: {
  href: string;
  event:
    | "industry_selector_click"
    | "industry_page_click"
    | "industry_pricing_click"
    | "industry_evidence_click"
    | "industry_review_start";
  model?: IndustryModel["id"] | "hybrid";
  section: string;
  destination: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <IndustryTrackedLink
      className={`button-link button-link--${variant}`}
      href={href}
      event={event}
      analytics={{
        business_model: model,
        source_section: section,
        destination_type: destination,
        cta_label: label,
      }}
    >
      <span className="button-link__label">{label}</span>
      <span className="button-link__arrow" aria-hidden="true">→</span>
    </IndustryTrackedLink>
  );
}

function TrackedTextLink({
  href,
  event,
  model,
  section,
  destination,
  label,
}: {
  href: string;
  event:
    | "industry_selector_click"
    | "industry_page_click"
    | "industry_pricing_click"
    | "industry_evidence_click"
    | "industry_review_start";
  model?: IndustryModel["id"] | "hybrid";
  section: string;
  destination: string;
  label: string;
}) {
  return (
    <IndustryTrackedLink
      className="text-link"
      href={href}
      event={event}
      analytics={{
        business_model: model,
        source_section: section,
        destination_type: destination,
        cta_label: label,
      }}
    >
      <span>{label}</span>
      <span className="text-link__arrow" aria-hidden="true">→</span>
    </IndustryTrackedLink>
  );
}

function LedgerRows({
  keys,
  model,
  section,
}: {
  keys: string[];
  model?: IndustryModel["id"];
  section: string;
}) {
  return (
    <ul className="industry-ledger-rows">
      {keys.map((key) => {
        const entry = ledgerByKey.get(key);
        if (!entry) return null;
        return (
          <li key={entry.key}>
            <IndustryTrackedLink
              href={entry.href}
              event="industry_pricing_click"
              analytics={{
                business_model: model,
                source_section: section,
                destination_type: entry.href.startsWith("/services/")
                  ? "service_page"
                  : entry.href.startsWith("/start/")
                    ? "review_form"
                    : "evidence_page",
                cta_label: entry.label,
              }}
            >
              <span>{entry.label}</span>
              <strong>{entry.display}</strong>
            </IndustryTrackedLink>
          </li>
        );
      })}
    </ul>
  );
}

function DiagnosticList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="industry-diagnostic-list">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function IndustryChapter({ model, index }: { model: IndustryModel; index: number }) {
  const figureBase = 2 + index * 2;

  return (
    <section
      className={`industry-chapter industry-chapter--${index % 2 === 0 ? "paper" : "tinted"}`}
      id={model.anchor}
      aria-labelledby={`${model.anchor}-title`}
    >
      <div className="industry-shell">
        <div className="industry-chapter__intro">
          <div>
            <p className="eyebrow">{model.eyebrow}</p>
            <h2 id={`${model.anchor}-title`}>{model.heading}</h2>
          </div>
          <div className="industry-chapter__recognition">
            {model.recognition.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        {model.operatingModels ? (
          <div className="industry-operating-models" aria-label="Operating models">
            {model.operatingModels.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        ) : null}

        <div className="industry-chapter__visual-pair">
          {model.id === "project-business" ? (
            <>
              <IndustryContextFigure model={model} number={String(figureBase).padStart(2, "0")} />
              <CustomerPathFigure model={model} number={String(figureBase + 1).padStart(2, "0")} />
            </>
          ) : (
            <>
              <CustomerPathFigure model={model} number={String(figureBase).padStart(2, "0")} />
              <IndustryConceptFigure model={model} number={String(figureBase + 1).padStart(2, "0")} />
            </>
          )}
        </div>

        <div className="industry-diagnostic-grid">
          <DiagnosticList title="Common leaks">
            <ul>{model.commonLeaks.map((item) => <li key={item}>{item}</li>)}</ul>
          </DiagnosticList>
          <DiagnosticList title="What Boho would inspect">
            <ol>{model.inspect.map((item, itemIndex) => (
              <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>
            ))}</ol>
          </DiagnosticList>
        </div>

        <div className="industry-chapter__decision industry-chapter__decision--single">
          <div className="industry-chapter__decision-heading">
            <p className="eyebrow">BEST STARTING ROUTES</p>
            <h3>Begin with the smallest useful next step.</h3>
          </div>
          <div className="industry-chapter__starting-routes">
            <LedgerRows keys={model.priceKeys} model={model.id} section={model.anchor} />
            {model.ownershipNote ? <p className="industry-boundary-note">{model.ownershipNote}</p> : null}
            {model.id === "local-service" ? (
              <p className="industry-boundary-note">
                Do not send health, patient, or other sensitive personal data through the intake form. Regulated public claims require appropriate client-supplied review.
              </p>
            ) : null}
          </div>
        </div>

        <p className="industry-boundary-note">
          The initial review is free and uses public information to identify the next useful discussion. It is not a complete audit, written strategy, private-account review, or implementation engagement.
        </p>

        <div className="industry-chapter__actions">
          <TrackedButton
            href={model.slug}
            event="industry_page_click"
            model={model.id}
            section={model.anchor}
            destination="industry_page"
            label={model.childActionLabel}
          />
          <TrackedButton
            href={industryReviewHref(model)}
            event="industry_review_start"
            model={model.id}
            section={model.anchor}
            destination="review_form"
            label={model.reviewActionLabel}
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}

const hubFaq = [
  {
    question: "Does Boho only work with the business types listed here?",
    answer:
      "No. These categories describe common customer-decision models, not a closed list of industries.",
  },
  {
    question: "Does the industry determine the price?",
    answer:
      "No. The actual scope, systems, complexity, access, risk, and required work determine the specific quote.",
  },
  {
    question: "Is the first review free?",
    answer:
      "Yes. It is a focused public-information review used to identify the next useful discussion. It is not a complete audit, written strategy, private-account review, provider recovery, or implementation engagement.",
  },
  {
    question: "Can Boho work with a smaller budget?",
    answer:
      "If a smaller complete solution is possible, Boho may suggest a reduced or phased project.",
  },
  {
    question: "Are rankings, leads, sales, or revenue guaranteed?",
    answer:
      "No. Boho can commit to defined work, documented reasoning, agreed deliverables, and honest measurement. External systems and business outcomes remain outside any provider’s complete control.",
  },
];

export function IndustriesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="industries-page">
        <section className="industries-hero" aria-labelledby="industries-title">
          <div className="industry-shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
            <div className="industries-hero__grid">
              <div className="industries-hero__copy">
                <p className="eyebrow">{industriesHubMetadata.eyebrow}</p>
                <h1 id="industries-title">{industriesHubMetadata.headline}</h1>
                <div className="industries-hero__body">
                  <p>
                    Contractors need qualified estimate requests. Local service businesses need calls and bookings. Physical locations need visits and reservations. Online stores need product discovery and completed purchases. Professional firms need serious, well-qualified conversations.
                  </p>
                  <p>
                    Boho studies the path to that action, identifies where the current digital system loses people, and recommends the smallest complete scope that can improve it.
                  </p>
                </div>
                <div className="industries-actions">
                  <TrackedButton
                    href="#customer-paths"
                    event="industry_selector_click"
                    section="hero"
                    destination="page_section"
                    label="Find your customer path"
                  />
                  <TrackedButton
                    href="/start/"
                    event="industry_review_start"
                    section="hero"
                    destination="review_form"
                    label="Start the free review"
                    variant="secondary"
                  />
                </div>
                <p className="industries-hero__trust">
                  Owner-operated · Research-led · Public starting prices · Documented decisions · Ownership defined in writing
                </p>
              </div>
              <CustomerDecisionFieldFigure />
            </div>
          </div>
        </section>

        <section className="customer-path-selector" id="customer-paths" aria-labelledby="customer-path-title">
          <div className="industry-shell">
            <p className="eyebrow">CUSTOMER-PATH SELECTOR</p>
            <h2 id="customer-path-title">Which action creates value?</h2>
            <p className="customer-path-selector__intro">
              Choose the path closest to the way the business earns customer action. Hybrid businesses can choose the nearest fit and explain the rest in the free review.
            </p>
            <nav aria-label="Choose a customer path">
              <ol className="customer-path-selector__routes">
                {industryModels.map((model, index) => (
                  <li key={model.id}>
                    <IndustryTrackedLink
                      href={`#${model.anchor}`}
                      event="industry_selector_click"
                      analytics={{
                        business_model: model.id,
                        source_section: "customer-paths",
                        destination_type: "industry_chapter",
                        cta_label: model.selectorAction,
                      }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{model.selectorAction}</strong>
                      <small>{model.selectorDescription}</small>
                    </IndustryTrackedLink>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        <section className="industry-comparison" aria-labelledby="industry-comparison-title">
          <div className="industry-shell">
            <div className="industry-section-heading">
              <p className="eyebrow">BUSINESS-MODEL COMPARISON</p>
              <h2 id="industry-comparison-title">The technology may overlap. The decision does not.</h2>
            </div>
            <p className="industry-comparison__cue">Scroll horizontally to compare every column.</p>
            <div className="industry-comparison__scroll" role="region" aria-label="Customer path comparison" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Customer path</th>
                    <th scope="col">Customer needs to know</th>
                    <th scope="col">Trust usually comes from</th>
                    <th scope="col">Valuable action</th>
                  </tr>
                </thead>
                <tbody>
                  {industryModels.map((model) => (
                    <tr key={model.id}>
                      <th scope="row">{model.selectorAction.replace(" a project", "").replace(" or request service", "").replace(" or reserve", "").replace(" a product", "").replace("Start a qualified conversation", "Discuss")}</th>
                      <td>{model.comparison.needs}</td>
                      <td>{model.comparison.trust}</td>
                      <td>{model.comparison.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {industryModels.map((model, index) => <IndustryChapter model={model} index={index} key={model.id} />)}

        <section className="industries-method" aria-labelledby="industries-method-title">
          <div className="industry-shell industries-method__grid">
            <div>
              <p className="eyebrow">RESEARCH-LED ADAPTATION</p>
              <h2 id="industries-method-title">Research should change the recommendation.</h2>
              <p>The industry label is a starting hypothesis, not a diagnosis.</p>
              <p>
                Two businesses in the same category may need different work because their markets, offers, customer behaviour, providers, content, capacity, ownership, systems, and valuable actions differ.
              </p>
              <p>
                Boho uses reusable methods for the parts that genuinely repeat, then adapts the recommendation to the actual business.
              </p>
              <blockquote>The person developing the recommendation remains close to the technical work.</blockquote>
              <div className="industries-actions">
                <TrackedTextLink href="/about/" event="industry_page_click" section="research-method" destination="about_page" label="Read About Boho" />
                <TrackedTextLink href="/services/research-audits-strategy/" event="industry_page_click" section="research-method" destination="service_page" label="Explore Research, Audits & Strategy" />
              </div>
            </div>
            <ResearchMethodFigure />
          </div>
        </section>

        <section className="industries-pricing" aria-labelledby="industries-pricing-title">
          <div className="industry-shell">
            <div className="industry-section-heading industries-pricing__heading">
              <p className="eyebrow">PRICING AND SCOPE</p>
              <h2 id="industries-pricing-title">Public starting prices. Specific written quotes.</h2>
              <p>
                Pricing follows the actual work, not the industry label. Pages, templates, locations, markets, data sources, customer actions, integrations, access, content, technical condition, risk, and required analyst or implementation time determine the final quote.
              </p>
            </div>
            <div className="industries-pricing__grid">
              <div>
                <LedgerRows keys={ledger.map((entry) => entry.key)} section="pricing-ledger" />
              </div>
              <PricingLadderFigure />
            </div>
            <div className="industries-pricing__notes">
              <article>
                <p className="eyebrow">ASSESSMENT CREDIT</p>
                <h3>Do not pay twice for the same diagnosis.</h3>
                <p>{assessmentCreditPolicy.summary}</p>
                <details>
                  <summary>Read every eligibility condition and exclusion</summary>
                  <div>
                    <h4>Required</h4>
                    <ul>{assessmentCreditPolicy.required.map((item: string) => <li key={item}>{item}</li>)}</ul>
                    <h4>Restrictions</h4>
                    <ul>{assessmentCreditPolicy.restrictions.map((item: string) => <li key={item}>{item}</li>)}</ul>
                    <p>{assessmentCreditPolicy.changedCircumstances}</p>
                  </div>
                </details>
              </article>
              <article>
                <p className="eyebrow">LEAN SCOPE</p>
                <h3>A smaller budget does not automatically require a bad solution.</h3>
                <p>
                  Boho may recommend fewer initial pages, a phased launch, one service or market first, reuse of sound existing assets, client-supplied information, a focused repair, or a documented do-it-yourself path for lower-priority work.
                </p>
              </article>
            </div>
            <p className="industries-pricing__notice">
              Starting prices are general planning guidance in U.S. dollars for the smallest complete qualifying scope. They are not quotes, binding offers, warranties, or commitments. Final scope, price, timing, deliverables, exclusions, dependencies, availability, and third-party costs are determined only through a specific written engagement after review.
            </p>
            <div className="industries-actions">
              <TrackedButton href="/pricing/" event="industry_pricing_click" section="pricing-ledger" destination="pricing_page" label="See the Pricing & Scope Guide" />
              <TrackedButton href="/start/" event="industry_review_start" section="pricing-ledger" destination="review_form" label="Start the free review" variant="secondary" />
            </div>
          </div>
        </section>

        <section className="industries-evidence" aria-labelledby="industries-evidence-title">
          <div className="industry-shell industries-evidence__grid">
            <div>
              <p className="eyebrow">INSPECTABLE EVIDENCE</p>
              <h2 id="industries-evidence-title">Inspect the method, not a collection of invented success stories.</h2>
              <p>Boho does not publish fictional clients, fabricated testimonials, unsupported outcomes, or concept work presented as delivered client work.</p>
              <p>Public evidence should show how a problem is studied, how the recommendation is developed, what the work produces, and where the limits remain.</p>
              <div className="industries-actions">
                <TrackedButton href="/work/" event="industry_evidence_click" section="evidence" destination="work_page" label="Inspect Work & Evidence" />
                <TrackedButton href="/resources/" event="industry_evidence_click" section="evidence" destination="resources_page" label="Browse Resources" variant="secondary" />
              </div>
            </div>
            <div className="industries-evidence__record" aria-label="Evidence publication checklist">
              <span>PUBLICATION RECORD</span>
              <ol>
                {[
                  "Artifact type",
                  "What it demonstrates",
                  "What it does not demonstrate",
                  "Relevant model and service",
                  "Ownership disclosure",
                  "Last-reviewed date",
                  "Known limitations",
                ].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
              </ol>
              <p>Evidence cards stay hidden until their destinations are complete and verified.</p>
            </div>
          </div>
        </section>

        <section className="industries-hybrid" aria-labelledby="industries-hybrid-title">
          <div className="industry-shell industries-hybrid__grid">
            <div>
              <p className="eyebrow">HYBRID BUSINESSES</p>
              <h2 id="industries-hybrid-title">Real businesses refuse to fit cleanly into five boxes.</h2>
              <p>
                A contractor may also sell products. A retailer may depend on ecommerce and appointments. A professional firm may operate several physical locations. A venue may rely on events, memberships, reservations, merchandise, and donations.
              </p>
              <p>
                Choose the customer action closest to the business’s main source of value, then explain the remaining paths in the free review.
              </p>
              <TrackedButton href={hybridReviewHref} event="industry_review_start" model="hybrid" section="hybrid" destination="review_form" label="Start a review for a hybrid business" />
            </div>
            <HybridMapFigure />
          </div>
        </section>

        <section className="industries-final" aria-labelledby="industries-final-title">
          <div className="industry-shell">
            <div className="industries-final__faq">
              <p className="eyebrow">COMMON QUESTIONS</p>
              <h2>Short answers before the first step.</h2>
              {hubFaq.map((item, index) => (
                <FaqItem key={item.question} question={item.question} open={index === 0}>
                  <p>{item.answer}</p>
                </FaqItem>
              ))}
            </div>
            <div className="industries-final__cta">
              <p className="eyebrow">START WITH THE MESSY VERSION</p>
              <h2 id="industries-final-title">Send the messy version. The point of the first step is clarity.</h2>
              <p>Tell Boho how customers find, judge, and choose the business. You do not need to arrive with the correct technical diagnosis.</p>
              <p>
                The initial review uses public information only. If the request appears to fit current scope and capacity, Boho may discuss what appears useful and the leanest responsible next step. Paid work begins only through a specific written engagement.
              </p>
              <div className="industries-actions">
                <TrackedButton href="/start/" event="industry_review_start" section="final-action" destination="review_form" label="Start the free review" />
                <TrackedButton href="/pricing/" event="industry_pricing_click" section="final-action" destination="pricing_page" label="See public pricing" variant="secondary" />
                <TrackedButton href="/services/" event="industry_page_click" section="final-action" destination="services_page" label="Compare services" variant="secondary" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default IndustriesPage;
