import { ArrowDown, Blocks, PlugZap, Wrench } from "lucide-react";

import {
  infrastructureLayers,
  repairIntegrateBuildSteps,
} from "../content/systems";
import { DefinedText } from "./DefinedText";

export function LayeredInfrastructureVisual({ seenTerms }: { seenTerms: Set<string> }) {
  const define = (text: string) => <DefinedText autoDefine seenTerms={seenTerms} text={text} />;

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
