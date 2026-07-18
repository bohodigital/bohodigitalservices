import {
  industryPriceLedger,
} from "../content/pricingPolicy.mjs";
import {
  industryReviewHref,
  type IndustryModel,
} from "../content/industries";
import { IndustryTrackedLink } from "./IndustryTrackedLink";
import {
  CustomerPathFigure,
  IndustryConceptFigure,
  IndustryContextFigure,
  IndustryQuestionMapFigure,
  IndustryServiceRouteFigure,
  IndustryTrustRecordFigure,
} from "./IndustryVisuals";
import { Breadcrumbs, FaqItem, Footer, Header } from "./SiteChrome";

type LedgerEntry = {
  key: string;
  label: string;
  display: string;
  href: string;
};

const ledgerByKey = new Map(
  (industryPriceLedger as LedgerEntry[]).map((entry) => [entry.key, entry]),
);

function DetailButton({
  model,
  href,
  label,
  event,
  destination,
  section,
  secondary = false,
}: {
  model: IndustryModel;
  href: string;
  label: string;
  event:
    | "industry_page_click"
    | "industry_pricing_click"
    | "industry_evidence_click"
    | "industry_review_start";
  destination: string;
  section: string;
  secondary?: boolean;
}) {
  return (
    <IndustryTrackedLink
      className={`button-link button-link--${secondary ? "secondary" : "primary"}`}
      href={href}
      event={event}
      analytics={{
        business_model: model.id,
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

function ModelPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="industry-detail-panel">
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  );
}

export function IndustryDetailPage({ model }: { model: IndustryModel }) {
  const prices = model.priceKeys
    .map((key) => ledgerByKey.get(key))
    .filter((entry): entry is LedgerEntry => Boolean(entry));

  return (
    <>
      <Header />
      <main id="main-content" className={`industry-detail industry-detail--${model.id}`}>
        <section className="industry-detail-hero" aria-labelledby="industry-detail-title">
          <div className="industry-shell">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Industries", href: "/industries/" },
                { label: model.selectorAction },
              ]}
            />
            <div className="industry-detail-hero__grid">
              <div>
                <p className="eyebrow">{model.eyebrow}</p>
                <h1 id="industry-detail-title">{model.heading}</h1>
                <div className="industry-detail-hero__recognition">
                  {model.recognition.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="industries-actions">
                  <DetailButton
                    model={model}
                    href={industryReviewHref(model)}
                    label={model.reviewActionLabel}
                    event="industry_review_start"
                    destination="review_form"
                    section="detail-hero"
                  />
                  <DetailButton
                    model={model}
                    href="/industries/"
                    label="Compare all customer paths"
                    event="industry_page_click"
                    destination="industries_hub"
                    section="detail-hero"
                    secondary
                  />
                </div>
              </div>
              <IndustryContextFigure model={model} number="01" eager />
            </div>
          </div>
        </section>

        <section className="industry-detail-path" aria-labelledby="industry-detail-path-title">
          <div className="industry-shell industry-detail-path__grid">
            <div>
              <p className="eyebrow">CUSTOMER DECISION</p>
              <h2 id="industry-detail-path-title">The useful path ends in a real business action.</h2>
              <p>
                This sequence is a starting hypothesis. Boho inspects how the business actually attracts attention, establishes fit and trust, and routes a customer toward the next useful action.
              </p>
              {model.operatingModels ? (
                <div className="industry-detail-operating-models">
                  {model.operatingModels.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
            <CustomerPathFigure model={model} number="02" />
          </div>
        </section>

        <section className="industry-detail-guide" aria-labelledby="industry-detail-guide-title">
          <div className="industry-shell">
            <div className="industry-section-heading industry-detail-guide__heading">
              <p className="eyebrow">MODEL FIELD GUIDE</p>
              <h2 id="industry-detail-guide-title">Keep the useful outcome-led detail.</h2>
              <p>
                The shared diagnostic method stays consistent, but the questions,
                information, operating limits, and customer actions must change with
                this business model.
              </p>
            </div>
            <div className="industry-detail-guide__sections">
              {model.detailSections.map((section, index) => (
                <article className="industry-detail-guide__section" key={section.title}>
                  <div>
                    <p className="eyebrow">{String(index + 1).padStart(2, "0")} · {section.eyebrow}</p>
                    <h3>{section.title}</h3>
                  </div>
                  <div className="industry-detail-guide__body">
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets?.length ? (
                      <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="industry-detail-decisions" aria-labelledby="industry-detail-decisions-title">
          <div className="industry-shell">
            <div className="industry-section-heading">
              <p className="eyebrow">MODEL-SPECIFIC QUESTIONS</p>
              <h2 id="industry-detail-decisions-title">The industry name is not the diagnosis.</h2>
              <p>These questions, trust requirements, actions, and constraints make this customer path different from the other four.</p>
            </div>
            <div className="industry-detail-panels">
              <ModelPanel title="Customer questions" items={model.customerQuestions} />
              <ModelPanel title="Trust requirements" items={model.trustRequirements} />
              <ModelPanel title="Valuable actions" items={model.valuableActions} />
              <ModelPanel title="Operational constraints" items={model.operationalConstraints} />
            </div>
            <div className="industry-detail-decisions__figures">
              <IndustryQuestionMapFigure model={model} number="03" />
              <IndustryTrustRecordFigure model={model} number="04" />
            </div>
          </div>
        </section>

        <section className="industry-detail-inspection" aria-labelledby="industry-detail-inspection-title">
          <div className="industry-shell industry-detail-inspection__grid">
            <div>
              <p className="eyebrow">WHAT BOHO WOULD INSPECT</p>
              <h2 id="industry-detail-inspection-title">Find the leaks before choosing the work.</h2>
              <div className="industry-detail-inspection__lists">
                <div>
                  <h3>Common leaks</h3>
                  <ul>{model.commonLeaks.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3>Inspection record</h3>
                  <ol>{model.inspect.map((item, index) => (
                    <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
                  ))}</ol>
                </div>
              </div>
            </div>
            <IndustryConceptFigure model={model} number="05" />
          </div>
        </section>

        <section className="industry-detail-services" aria-labelledby="industry-detail-services-title">
          <div className="industry-shell industry-detail-services__grid">
            <div>
              <p className="eyebrow">SERVICE PATHS</p>
              <h2 id="industry-detail-services-title">Match the work to the diagnosed failure.</h2>
              <p>
                The business model helps Boho ask better questions. It does not
                select a package automatically. The first review uses public
                information to identify the next useful discussion; it is not a
                complete audit, written strategy, private-account review, or
                implementation engagement.
              </p>
              <p>
                If the request appears to fit Boho&apos;s current scope and capacity,
                the next step may be a focused review, a specific repair, ongoing
                work, or a written quote. Paid work begins only through a specific
                written engagement.
              </p>
            </div>
            <IndustryServiceRouteFigure model={model} number="06" />
          </div>
        </section>

        <section className="industry-detail-pricing" aria-labelledby="industry-detail-pricing-title">
          <div className="industry-shell industry-detail-pricing__grid">
            <div>
              <p className="eyebrow">BEST STARTING ROUTES</p>
              <h2 id="industry-detail-pricing-title">Start with the smallest complete scope that fits the evidence.</h2>
              <p>
                Pricing follows the actual work, not the industry label. Public minimums are planning guidance; a specific written engagement defines scope, price, timing, ownership, exclusions, and outside costs.
              </p>
              {model.ownershipNote ? <p className="industry-boundary-note">{model.ownershipNote}</p> : null}
              {model.id === "local-service" ? (
                <p className="industry-boundary-note">
                  Do not send health, patient, or other sensitive personal data through the intake form. Regulated public claims require appropriate client-supplied review.
                </p>
              ) : null}
            </div>
            <ul className="industry-detail-price-list">
              {prices.map((entry) => (
                <li key={entry.key}>
                  <IndustryTrackedLink
                    href={entry.href}
                    event="industry_pricing_click"
                    analytics={{
                      business_model: model.id,
                      source_section: "detail-pricing",
                      destination_type: entry.href.startsWith("/services/") ? "service_page" : "review_form",
                      cta_label: entry.label,
                    }}
                  >
                    <span>{entry.label}</span>
                    <strong>{entry.display}</strong>
                  </IndustryTrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="industry-detail-evidence" aria-labelledby="industry-detail-evidence-title">
          <div className="industry-shell industry-detail-evidence__grid">
            <div>
              <p className="eyebrow">EVIDENCE BOUNDARY</p>
              <h2 id="industry-detail-evidence-title">Concepts explain the method. They do not prove a client result.</h2>
              <p>
                The figures on this page are representative photographs and Boho-owned explanatory concepts. They are not client work, testimonials, measurements, or outcome claims. Industry-specific evidence stays unpublished until a complete destination is verified.
              </p>
              <dl className="industry-detail-evidence__record">
                <div>
                  <dt>Candidate artifact type</dt>
                  <dd>{model.evidencePlan.artifactType}</dd>
                </div>
                <div>
                  <dt>What it could demonstrate</dt>
                  <dd>{model.evidencePlan.demonstrates}</dd>
                </div>
                <div>
                  <dt>What it would not demonstrate</dt>
                  <dd>{model.evidencePlan.doesNotDemonstrate}</dd>
                </div>
              </dl>
            </div>
            <div className="industries-actions">
              <DetailButton model={model} href="/work/" label="Inspect verified work and systems" event="industry_evidence_click" destination="work_page" section="detail-evidence" />
              <DetailButton model={model} href="/resources/" label="Browse practical resources" event="industry_evidence_click" destination="resources_page" section="detail-evidence" secondary />
            </div>
          </div>
        </section>

        <section className="industry-detail-faq" aria-labelledby="industry-detail-faq-title">
          <div className="industry-shell industry-detail-faq__grid">
            <div>
              <p className="eyebrow">QUESTIONS FOR THIS MODEL</p>
              <h2 id="industry-detail-faq-title">What changes for {model.selectorAction.toLowerCase()}?</h2>
            </div>
            <div>
              {model.faq.map((item, index) => (
                <FaqItem key={item.question} question={item.question} open={index === 0}>
                  <p>{item.answer}</p>
                </FaqItem>
              ))}
            </div>
          </div>
        </section>

        <section className="industry-detail-final" aria-labelledby="industry-detail-final-title">
          <div className="industry-shell industry-detail-final__grid">
            <div>
              <p className="eyebrow">FREE INITIAL REVIEW</p>
              <h2 id="industry-detail-final-title">Begin with public information and the customer action that matters.</h2>
              <p>
                The first review is a focused orientation using public information. It is not a complete audit, private-account review, provider recovery, written strategy, implementation engagement, or outcome guarantee.
              </p>
              <p>
                If the request appears to fit current scope and capacity, Boho may discuss a useful next step. Paid work begins only through a specific written engagement.
              </p>
            </div>
            <div className="industries-actions">
              <DetailButton model={model} href={industryReviewHref(model)} label={model.reviewActionLabel} event="industry_review_start" destination="review_form" section="detail-final" />
              <DetailButton model={model} href="/pricing/" label="See public pricing" event="industry_pricing_click" destination="pricing_page" section="detail-final" secondary />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default IndustryDetailPage;
