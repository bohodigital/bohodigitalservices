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
  const sharedStages = [
    ["01", "Discover", "Be found"],
    ["02", "Understand", "Recognise fit"],
    ["03", "Trust", "Reduce doubt"],
  ];
  const outcomes = [
    ["Estimate", "Project work"],
    ["Book", "Local services"],
    ["Visit", "Physical locations"],
    ["Buy", "Online stores"],
    ["Discuss", "Professional firms"],
  ];

  return (
    <figure className="industry-figure industry-decision-summary">
      <div className="industry-decision-summary__body">
        <p className="industry-decision-summary__eyebrow">One shared decision path</p>
        <ol
          className="industry-decision-summary__stages"
          aria-label="Shared customer decision stages"
        >
          {sharedStages.map(([number, title, description]) => (
            <li key={number}>
              <span aria-hidden="true">{number}</span>
              <strong>{title}</strong>
              <small>{description}</small>
            </li>
          ))}
        </ol>
        <p className="industry-decision-summary__pivot" id="industry-outcomes-title">
          The useful action changes with the business.
        </p>
        <ul
          className="industry-decision-summary__outcomes"
          aria-labelledby="industry-outcomes-title"
        >
          {outcomes.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <small>{description}</small>
            </li>
          ))}
        </ul>
      </div>
      <p className="industry-figure__explanation">
        Customers usually need to find the business, recognise fit, and build
        trust. What happens next depends on how the business creates value.
      </p>
      <FigureCaption
        number="01"
        type="Decision summary"
        purpose="Three shared decision stages and five distinct customer actions."
        source="Boho-owned semantic decision summary."
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
  const orientationClass = model.image.height > model.image.width
    ? " industry-context-figure--portrait"
    : " industry-context-figure--landscape";

  return (
    <figure className={`industry-figure industry-context-figure${orientationClass}`}>
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
      <div className="industry-hybrid-map__field" aria-label="Five customer-action models that may coexist in a hybrid business">
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
        type="Coexistence map"
        purpose="Five customer-action models that may coexist in one business."
        source="Boho-owned explanatory diagram."
        limitation="A selector aid, not a diagnosis or service promise."
      />
    </figure>
  );
}
