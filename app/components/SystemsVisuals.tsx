import { ArrowDown, Blocks, PlugZap, Wrench } from "lucide-react";

import {
  controlledAutomationSteps,
  infrastructureLayers,
  leanOperationModels,
  measurementSearchSignalSteps,
  ownershipMapLayers,
  ownershipMapStates,
  repairIntegrateBuildSteps,
  systemVisuals,
  websiteReleaseSteps,
} from "../content/systems";
import { DefinedText } from "./DefinedText";

export function LayeredInfrastructureVisual({
  seenTerms,
  includeServiceVisualIndex = true,
}: {
  seenTerms: Set<string>;
  includeServiceVisualIndex?: boolean;
}) {
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;
  const serviceVisuals = systemVisuals.filter(
    (visual) => visual.publicInThisRelease && visual.route !== "/tools/",
  );

  return (
    <figure
      className="systems-visual systems-visual--layers"
      id="visual-layered-infrastructure"
      aria-labelledby="layered-infrastructure-title"
      aria-describedby="layered-infrastructure-caption"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Layered infrastructure</p>
        <h2 id="layered-infrastructure-title">The business stays at the center of the machinery.</h2>
        <p>{define("Mature platforms handle the commodity infrastructure. Boho engineers the operating system around the business.")}</p>
      </div>

      <ol className="infrastructure-layers" aria-label="Four infrastructure layers">
        {infrastructureLayers.map((layer) => (
          <li className={`infrastructure-layer infrastructure-layer--${layer.number}`} key={layer.number}>
            <div className="infrastructure-layer__title">
              <span>{layer.number}</span>
              <h3>{layer.title}</h3>
            </div>
            <ul>
              {layer.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <div className="systems-visual__explanation" aria-label="Layer explanations">
        {infrastructureLayers.map((layer) => (
          <article key={layer.number}>
            <h3><span>{layer.number}</span>{layer.title}</h3>
            <p>{define(layer.explanation)}</p>
          </article>
        ))}
      </div>

      <figcaption id="layered-infrastructure-caption">
        {define("Customer benefit and accountable operation come first; platform labels remain secondary to the work they support.")}
      </figcaption>
      {includeServiceVisualIndex ? (
        <nav className="systems-visual__service-index" aria-label="Service visual explanations">
          <p>Related service visuals</p>
          {serviceVisuals.map((visual) => (
            <a
              href={`${visual.route}#visual-${visual.id}`}
              id={`visual-${visual.id}`}
              key={visual.id}
            >
              <strong>{visual.title}</strong>
              <span>{visual.section}</span>
            </a>
          ))}
        </nav>
      ) : null}
    </figure>
  );
}

const decisionIcons = [Wrench, Wrench, PlugZap, Blocks, ArrowDown] as const;

export function RepairIntegrateBuildVisual({ seenTerms }: { seenTerms: Set<string> }) {
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

  return (
    <figure
      className="systems-visual systems-visual--decision"
      id="visual-repair-integrate-build"
      aria-labelledby="repair-integrate-build-title"
      aria-describedby="repair-integrate-build-principle"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Repair, integrate, or build</p>
        <h2 id="repair-integrate-build-title">Custom software is one option, not the opening assumption.</h2>
        <p id="repair-integrate-build-principle">{define("We repair before replacing, integrate before rebuilding, and write custom software only when the missing capability is worth owning.")}</p>
      </div>

      <ol className="decision-path" aria-label="Repair, integrate, or build decision path">
        {repairIntegrateBuildSteps.map((step, index) => {
          const Icon = decisionIcons[index];
          return (
            <li key={step.number}>
              <div className="decision-path__marker" aria-hidden="true">
                <Icon size={24} strokeWidth={1.7} />
                <span>{step.number}</span>
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{define(step.body)}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption>
        {define("Every route ends with the same operating questions: who owns it, how it fails, how it is maintained, and how the business exits cleanly.")}
      </figcaption>
    </figure>
  );
}

export function WebsiteReleaseFlowVisual() {
  return (
    <figure
      className="systems-visual systems-visual--flow"
      data-system-visual-id="website-release-flow"
      id="visual-website-release-flow"
      aria-labelledby="website-release-flow-title"
      aria-describedby="website-release-flow-caption website-release-flow-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">What Boho delivers</p>
        <h3 id="website-release-flow-title">A website release is a verified sequence, not a launch-day handoff.</h3>
      </div>
      <ol className="systems-flow" aria-label="Website release sequence">
        {websiteReleaseSteps.map((step, index) => (
          <li key={step.label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h4>{step.label}</h4>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="systems-visual__text-alternative" id="website-release-flow-alternative">
        The sequence moves from plan to content and structure, design system, build, and verification before launch and handoff. Verification covers forms, routes, analytics, and responsive behavior. Launch publishes the verified release; handoff separately records ownership, operation, rollback, and maintenance.
      </p>
      <figcaption id="website-release-flow-caption">
        Launch makes the verified site public. Handoff makes the released system understandable and operable by its owner.
      </figcaption>
    </figure>
  );
}

export function MeasurementSearchSignalFlowVisual() {
  return (
    <figure
      className="systems-visual systems-visual--flow systems-visual--measurement"
      data-system-visual-id="measurement-search-signal-flow"
      id="visual-measurement-search-signal-flow"
      aria-labelledby="measurement-search-signal-flow-title"
      aria-describedby="measurement-search-signal-flow-caption measurement-search-signal-flow-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Measurement that changes a decision</p>
        <h3 id="measurement-search-signal-flow-title">Source-labeled signals stay separate until the evidence supports a relationship.</h3>
      </div>
      <ol className="systems-flow" aria-label="Measurement and search-signal sequence">
        {measurementSearchSignalSteps.map((step, index) => (
          <li key={step.label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h4>{step.label}</h4>
            <strong>{step.source}</strong>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="systems-visual__text-alternative" id="measurement-search-signal-flow-alternative">
        Discovery signal, relevant visit, understanding, trust, action, and business outcome form a useful decision path. Each stage names its own evidence source. Unlike measures are not silently merged, missing data remains missing, and an observed sequence does not establish guaranteed causation.
      </p>
      <figcaption id="measurement-search-signal-flow-caption">
        Attribution is limited by consent, source coverage, identity boundaries, missing records, and outside influences. No value or causal guarantee is implied.
      </figcaption>
    </figure>
  );
}

export function ControlledAutomationVisual() {
  return (
    <figure
      className="systems-visual systems-visual--flow systems-visual--automation"
      data-system-visual-id="controlled-automation-mcp-interface"
      id="visual-controlled-automation-mcp-interface"
      aria-labelledby="controlled-automation-title"
      aria-describedby="controlled-automation-caption controlled-automation-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Operating requirements</p>
        <h3 id="controlled-automation-title">Automation stays inside visible ownership and approval boundaries.</h3>
      </div>
      <ol className="systems-flow" aria-label="Controlled automation sequence">
        {controlledAutomationSteps.map((step, index) => (
          <li key={step.label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h4>{step.label}</h4>
            <strong>{step.owner}</strong>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="systems-visual__text-alternative" id="controlled-automation-alternative">
        An approved input passes validation and then a human or policy gate before a bounded action. The workflow records its result and remains monitored by a responsible operator. Invalid, unauthorized, incomplete, or unavailable conditions fail closed and become visible records; they do not trigger an improvised action.
      </p>
      <figcaption id="controlled-automation-caption">
        This operating model supports people with controlled tools. It does not imply autonomous replacement of judgment, ownership, or accountability.
      </figcaption>
    </figure>
  );
}

export function OwnershipMapVisual() {
  return (
    <figure
      className="systems-visual systems-visual--ownership"
      data-system-visual-id="ownership-map"
      id="visual-ownership-map"
      aria-labelledby="ownership-map-title"
      aria-describedby="ownership-map-caption ownership-map-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Map the dependency chain</p>
        <h3 id="ownership-map-title">A rescue starts by separating known control from unresolved risk.</h3>
      </div>
      <div className="ownership-state-key" aria-label="Ownership assessment states">
        {ownershipMapStates.map((state) => <span key={state}>{state}</span>)}
      </div>
      <ol className="ownership-map" aria-label="Website ownership and dependency layers">
        {ownershipMapLayers.map((layer, index) => (
          <li key={layer}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <strong>{layer}</strong>
            <small>State verified during the authorized assessment</small>
          </li>
        ))}
      </ol>
      <p className="systems-visual__text-alternative" id="ownership-map-alternative">
        The assessment traces domain and registrar, DNS, hosting, CMS, content and URLs, forms and customer contact, analytics and search properties, email connections, and documentation and authorized owners. Each layer is marked known, unknown, controlled, at risk, or owner action required only after evidence is reviewed.
      </p>
      <figcaption id="ownership-map-caption">
        The map records facts and owner actions. It does not use fake client data or promise access recovery, provider cooperation, or zero downtime.
      </figcaption>
    </figure>
  );
}

export function LeanDirectOperationVisual() {
  return (
    <figure
      className="systems-visual systems-visual--comparison"
      data-system-visual-id="lean-direct-operation"
      id="visual-lean-direct-operation"
      aria-labelledby="lean-direct-operation-title"
      aria-describedby="lean-direct-operation-caption lean-direct-operation-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">The work should leave the business with more control</p>
        <h2 id="lean-direct-operation-title">Compare the operating structure, ownership path, and handoff visibility.</h2>
      </div>
      <div className="operation-models">
        {leanOperationModels.map((model) => (
          <article key={model.label}>
            <p>{model.qualifier}</p>
            <h3>{model.label}</h3>
            <ol aria-label={`${model.label} operating path`}>
              {model.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p>{model.visibility}</p>
          </article>
        ))}
      </div>
      <p className="systems-visual__text-alternative" id="lean-direct-operation-alternative">
        A layered provider model can move work from sales through an account layer, subcontractor, and hidden platform before it reaches the business. The direct Boho model connects the business with the responsible technical operator and documented systems. The comparison concerns operating structures; it does not claim every agency uses the layered model.
      </p>
      <figcaption id="lean-direct-operation-caption">
        The direct model keeps decisions, responsible ownership, and handoff records visible without claiming that every other provider operates the same way.
      </figcaption>
    </figure>
  );
}
