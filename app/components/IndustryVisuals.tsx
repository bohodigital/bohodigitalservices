import type { IndustryModel } from "../content/industries";
import { IndustryTrackedLink } from "./IndustryTrackedLink";

export function FigureCaption({
  number,
  type,
  purpose,
  source,
  limitation,
}: {
  number: string;
  type: string;
  purpose: string;
  source: string;
  limitation?: string;
}) {
  return (
    <figcaption className="industry-figure__caption">
      <span className="industry-figure__label">
        Figure {number} · {type}
      </span>
      <span>{purpose}</span>
      <span className="industry-figure__source">{source}</span>
      {limitation ? (
        <span className="industry-figure__limit">{limitation}</span>
      ) : null}
    </figcaption>
  );
}

export function CustomerDecisionFieldFigure() {
  return (
    <figure className="industry-figure industry-decision-field">
      <div className="industry-decision-field__canvas">
        <svg
          viewBox="0 0 760 540"
          role="img"
          aria-labelledby="decision-field-title decision-field-description"
        >
          <title id="decision-field-title">Customer Decision Field</title>
          <desc id="decision-field-description">
            A route moves from discover to understand to trust, then branches to
            estimate, book, visit, buy, or discuss.
          </desc>
          <g className="industry-decision-field__grid" aria-hidden="true">
            <path d="M30 80H730M30 180H730M30 280H730M30 380H730M30 480H730" />
            <path d="M110 32V510M250 32V510M390 32V510M530 32V510M670 32V510" />
          </g>
          <g className="industry-decision-field__route" aria-hidden="true">
            <path d="M82 94H284H482" />
            <path d="M482 94C540 94 518 168 590 168H690" />
            <path d="M482 94C540 94 518 246 590 246H690" />
            <path d="M482 94C540 94 518 324 590 324H690" />
            <path d="M482 94C540 94 518 402 590 402H690" />
            <path d="M482 94C540 94 518 480 590 480H690" />
          </g>
          <g className="industry-decision-field__nodes">
            <circle cx="82" cy="94" r="16" />
            <circle cx="284" cy="94" r="16" />
            <circle cx="482" cy="94" r="16" />
            <circle cx="590" cy="168" r="9" />
            <circle cx="590" cy="246" r="9" />
            <circle cx="590" cy="324" r="9" />
            <circle cx="590" cy="402" r="9" />
            <circle cx="590" cy="480" r="9" />
          </g>
          <g className="industry-decision-field__numbers" aria-hidden="true">
            <text x="82" y="99">01</text>
            <text x="284" y="99">02</text>
            <text x="482" y="99">03</text>
          </g>
          <g className="industry-decision-field__labels">
            <text x="54" y="136">DISCOVER</text>
            <text x="238" y="136">UNDERSTAND</text>
            <text x="456" y="136">TRUST</text>
            <text x="610" y="173">ESTIMATE</text>
            <text x="610" y="251">BOOK</text>
            <text x="610" y="329">VISIT</text>
            <text x="610" y="407">BUY</text>
            <text x="610" y="485">DISCUSS</text>
          </g>
          <g className="industry-decision-field__notes" aria-hidden="true">
            <text x="54" y="66">BE FOUND</text>
            <text x="238" y="66">RECOGNISE FIT</text>
            <text x="456" y="66">REDUCE DOUBT</text>
            <text x="534" y="520">THE VALUABLE ACTION DEPENDS ON THE BUSINESS</text>
          </g>
        </svg>
      </div>
      <p className="industry-figure__explanation">
        Most customer paths share three early tasks: find the business, understand
        whether it fits, and gather enough trust to continue. The useful outcome
        then changes with the way the business earns value.
      </p>
      <FigureCaption
        number="01"
        type="Original decision map"
        purpose="Shared stages and five distinct customer actions."
        source="Boho-owned explanatory SVG."
        limitation="Concept model, not a measured customer journey or client result."
      />
    </figure>
  );
}

export function IndustryContextFigure({
  model,
  number,
  eager = false,
}: {
  model: IndustryModel;
  number: string;
  eager?: boolean;
}) {
  return (
    <figure className="industry-figure industry-context-figure">
      <div className="industry-context-figure__image">
        {/* Static Pages output intentionally uses the self-hosted asset directly. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={model.image.src}
          alt={model.image.alt}
          width={model.image.width}
          height={model.image.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
        />
      </div>
      <FigureCaption
        number={number}
        type="Context photograph"
        purpose={`Representative setting for ${model.selectorAction.toLowerCase()} decisions.`}
        source="Licensed Pexels editorial photograph; source recorded in the asset register."
        limitation="Representative setting · Not client work · No measured result."
      />
    </figure>
  );
}

export function IndustryQuestionMapFigure({
  model,
  number,
}: {
  model: IndustryModel;
  number: string;
}) {
  return (
    <figure className="industry-figure industry-question-map">
      <div className="industry-question-map__body">
        <section
          className="industry-question-map__questions"
          aria-label={`${model.title} customer questions`}
        >
          <h3>Questions customers need answered</h3>
          <ol>
            {model.customerQuestions.map((question, index) => (
              <li key={question}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{question}</p>
              </li>
            ))}
          </ol>
        </section>
        <span className="industry-question-map__connector" aria-hidden="true">
          &rarr;
        </span>
        <section
          className="industry-question-map__actions"
          aria-label={`${model.title} valuable actions`}
        >
          <h3>Useful next actions</h3>
          <ul>
            {model.valuableActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="industry-figure__explanation">
        A useful route answers the questions that shape a decision before it
        asks a customer to take the next step.
      </p>
      <FigureCaption
        number={number}
        type="Question-to-action map"
        purpose={`Connects common customer questions with the useful actions defined for ${model.title.toLowerCase()}.`}
        source="Boho-owned explanatory model using the published industry chapter."
        limitation="Planning aid; not measured customer behaviour or a client result."
      />
    </figure>
  );
}

export function IndustryTrustRecordFigure({
  model,
  number,
}: {
  model: IndustryModel;
  number: string;
}) {
  return (
    <figure className="industry-figure industry-trust-record">
      <div className="industry-trust-record__header" aria-hidden="true">
        <span>TRUST RECORD</span>
        <span>{model.id.toUpperCase()}</span>
      </div>
      <div className="industry-trust-record__body">
        <section aria-label={`${model.title} trust requirements`}>
          <h3>Trust requirements</h3>
          <ul>
            {model.trustRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>
        <section aria-label={`${model.title} operational constraints`}>
          <h3>Operational constraints</h3>
          <ul>
            {model.operationalConstraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="industry-figure__explanation">
        Trust information is only useful when it remains accurate within the
        business&apos;s real operating limits.
      </p>
      <FigureCaption
        number={number}
        type="Trust and constraints record"
        purpose={`Keeps ${model.title.toLowerCase()} trust needs beside the operational limits that shape delivery.`}
        source="Boho-owned explanatory record using the published industry chapter."
        limitation="Requirements to verify during discovery; not a certification or performance guarantee."
      />
    </figure>
  );
}

export function IndustryServiceRouteFigure({
  model,
  number,
}: {
  model: IndustryModel;
  number: string;
}) {
  return (
    <figure className="industry-figure industry-service-route">
      <ol
        className="industry-service-route__list"
        aria-label={`${model.title} service routes`}
      >
        {model.serviceRoutes.map((route, index) => (
          <li key={`${route.href}-${route.title}`}>
            <article>
              <span className="industry-service-route__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{route.title}</h3>
                <p>{route.body}</p>
                <IndustryTrackedLink
                  href={route.href}
                  event="industry_page_click"
                  analytics={{
                    business_model: model.id,
                    source_section: "detail-service-routes",
                    destination_type: "service_page",
                    cta_label: route.linkLabel,
                  }}
                >
                  {route.linkLabel}
                </IndustryTrackedLink>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <p className="industry-figure__explanation">
        The appropriate route depends on what the evidence shows, the smallest
        complete scope, and whether Boho is a responsible fit.
      </p>
      <FigureCaption
        number={number}
        type="Service-route map"
        purpose={`Shows the published service routes associated with the ${model.title.toLowerCase()} model.`}
        source="Boho-owned route map using the published service-page copy."
        limitation="Orientation only; scope, fit, availability, and price require a specific written engagement."
      />
    </figure>
  );
}

export function CustomerPathFigure({
  model,
  number,
}: {
  model: IndustryModel;
  number: string;
}) {
  return (
    <figure className="industry-figure industry-path-figure">
      <ol className="industry-path-figure__steps" aria-label={`${model.selectorAction} customer path`}>
        {model.pathSteps.map((step, index) => (
          <li key={step}>
            <span className="industry-path-figure__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <FigureCaption
        number={number}
        type="Customer-decision path"
        purpose={`A readable sequence leading toward ${model.selectorAction.toLowerCase()}.`}
        source="Boho-owned explanatory diagram."
        limitation="Starting hypothesis; actual paths must be inspected."
      />
    </figure>
  );
}

export function IndustryConceptFigure({
  model,
  number,
}: {
  model: IndustryModel;
  number: string;
}) {
  return (
    <figure className="industry-figure industry-concept-figure">
      <div className="industry-concept-figure__header">
        <span>OBSERVATION RECORD</span>
        <span>{model.id.toUpperCase()}</span>
      </div>
      <div className="industry-concept-figure__body">
        <div>
          <span>Question</span>
          <strong>{model.comparison.needs}</strong>
        </div>
        <ol aria-label={model.concept.title}>
          {model.concept.labels.map((label, index) => (
            <li key={label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
        <div>
          <span>Useful action</span>
          <strong>{model.comparison.action}</strong>
        </div>
      </div>
      <FigureCaption
        number={number}
        type="Concept interface"
        purpose={`${model.concept.title}. ${model.concept.purpose}`}
        source="Boho-owned explanatory concept."
        limitation="Concept · Not client work · No measured result."
      />
    </figure>
  );
}

export function ResearchMethodFigure() {
  const steps = [
    ["01", "Observe", "How customers discover, compare, trust, and act"],
    ["02", "Define", "The customer action that creates business value"],
    ["03", "Inspect", "The website, search, data, ownership, and provider system"],
    ["04", "Prioritise", "The smallest complete scope capable of useful improvement"],
    ["05", "Verify", "What changed, what remains uncertain, and what happens next"],
  ];

  return (
    <figure className="industry-figure industry-method-figure">
      <ol>
        {steps.map(([number, title, body]) => (
          <li key={number}>
            <span>{number}</span>
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <FigureCaption
        number="12"
        type="Method diagram"
        purpose="The shared research loop used to move from observation to a useful next step."
        source="Boho-owned operating model."
        limitation="The sequence is reusable; the recommendation must change with the evidence."
      />
    </figure>
  );
}

export function PricingLadderFigure() {
  return (
    <figure className="industry-figure industry-pricing-ladder">
      <ol>
        <li><span>01</span><strong>Free review</strong><small>Public information only</small></li>
        <li><span>02</span><strong>Paid assessment</strong><small>Credited when every published condition is met</small></li>
        <li><span>03</span><strong>Focused implementation</strong><small>Smallest complete responsible scope</small></li>
        <li><span>04</span><strong>Ongoing work</strong><small>Only when useful</small></li>
      </ol>
      <FigureCaption
        number="13"
        type="Pricing progression"
        purpose="A route from orientation to paid work without paying twice for an eligible diagnosis."
        source="Boho-owned explanation of the published pricing policy."
        limitation="Eligibility, exclusions, scope, and final price are governed by the specific written engagement."
      />
    </figure>
  );
}

export function HybridMapFigure() {
  const paths = ["Projects", "Local service", "Physical visits", "Product sales", "Complex expertise"];

  return (
    <figure className="industry-figure industry-hybrid-map">
      <div className="industry-hybrid-map__field" aria-label="Five overlapping customer-action models">
        {paths.map((path, index) => (
          <span key={path} style={{ "--hybrid-index": index } as React.CSSProperties}>{path}</span>
        ))}
        <strong>HYBRID</strong>
      </div>
      <p className="industry-figure__explanation">
        Projects, local service, physical visits, product sales, and complex
        expertise can coexist. Choose the action closest to the main source of
        value, then explain the other paths in the review.
      </p>
      <FigureCaption
        number="14"
        type="Overlap map"
        purpose="Five customer-action models that may coexist in one business."
        source="Boho-owned explanatory diagram."
        limitation="A selector aid, not a diagnosis or service promise."
      />
    </figure>
  );
}
