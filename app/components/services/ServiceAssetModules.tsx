import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  primaryServiceAssetByRoute,
  serviceAsset,
  serviceToolProofByRoute,
  websiteProof,
  type ServiceAssetRoute,
} from "../../content/serviceAssets";
import { servicePresentationByRoute } from "../../content/servicePresentation";
import {
  ControlledAutomationVisual,
  LayeredInfrastructureVisual,
  LeanDirectOperationVisual,
  MeasurementSearchSignalFlowVisual,
  OwnershipMapVisual,
  RepairIntegrateBuildVisual,
  WebsiteReleaseFlowVisual,
} from "../SystemsVisuals";
import { ResponsiveDiagramViewport } from "./ResponsiveDiagramViewport";
import {
  ServiceToolProofModule,
  WebsiteProofModule,
} from "./ServiceProofModule";
import { ServiceVisualFigure } from "./ServiceVisualFigure";

export function PrimaryServiceIllustration({
  route,
}: {
  route: ServiceAssetRoute;
}) {
  return (
    <section
      aria-label="Service concept illustration"
      className="service-primary-visual"
      data-service-visual-module="primary-illustration"
    >
      <div className="section-shell service-primary-visual__layout">
        <div>
          <p className="eyebrow">Service field guide</p>
          <h2>A visual orientation to the work</h2>
          <p>
            This commissioned illustration explains the service concept. The detailed sections below define scope, decisions, evidence, and boundaries.
          </p>
        </div>
        <ServiceVisualFigure
          asset={primaryServiceAssetByRoute[route]}
          className="service-asset-figure--primary"
          priority
        />
      </div>
    </section>
  );
}

function VisualModule({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <div className="service-visual-module" data-service-visual-module={id}>
      {children}
    </div>
  );
}

function LocalCustomerPathVisual() {
  const steps = [
    ["Local question", "A customer has a real need, location, and time context."],
    ["Relevant visibility", "The business appears where its offer and service area are genuinely relevant."],
    ["Useful landing page", "The page answers the question and makes the next step understandable."],
    ["Trust and clarity", "Accurate facts, proof, ownership, and usability reduce avoidable doubt."],
    ["Customer action", "The visitor calls, requests directions, books, or submits an appropriate form."],
    ["Qualified follow-up", "The business responds through its own process and records what matters."],
  ] as const;

  return (
    <figure
      className="systems-visual systems-visual--flow service-local-path"
      data-service-diagram-id="local-customer-path"
      data-service-visual-job="EXPLAIN"
      id="visual-local-customer-path"
      aria-labelledby="local-customer-path-title"
      aria-describedby="local-customer-path-caption local-customer-path-alternative"
    >
      <div className="systems-visual__heading">
        <p className="eyebrow">Local customer path</p>
        <h3 id="local-customer-path-title">Search work connects discovery to a useful customer step.</h3>
      </div>
      <ol className="systems-flow" aria-label="Local customer path">
        {steps.map(([label, detail], index) => (
          <li key={label}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h4>{label}</h4>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
      <p className="systems-visual__text-alternative" id="local-customer-path-alternative">
        A local customer moves from a real question through relevant visibility to a useful landing page, trust and clarity, a customer action, and qualified business follow-up. The path describes work and measurement points; it does not promise rankings, leads, or revenue.
      </p>
      <figcaption id="local-customer-path-caption">
        Each stage can be reviewed and improved, but no stage guarantees the next.
      </figcaption>
    </figure>
  );
}

function OngoingSeoCycleModule() {
  return (
    <VisualModule id="local-customer-path">
      <LocalCustomerPathVisual />
    </VisualModule>
  );
}

function OngoingSeoGrowthModule() {
  return (
    <VisualModule id="growth-analysis">
      <header className="service-visual-module__heading">
        <p className="eyebrow">Continued improvement</p>
        <h3>Measure the current priority, record the change, and decide what comes next.</h3>
      </header>
      <ServiceVisualFigure asset={serviceAsset("growth-analysis")} />
    </VisualModule>
  );
}

function WebsiteDeliveryModule() {
  return (
    <VisualModule id="website-design-delivery">
      <div className="service-visual-split service-visual-split--editorial">
        <div>
          <header className="service-visual-module__heading">
            <p className="eyebrow">Design planning and information architecture</p>
            <h3>Page structure and visual decisions are part of the release plan.</h3>
          </header>
          <ServiceVisualFigure asset={serviceAsset("creative-process")} />
        </div>
        <WebsiteReleaseFlowVisual />
      </div>
    </VisualModule>
  );
}

function WebsiteInfrastructureModule() {
  const architecture = serviceAsset("hosting-architecture");
  return (
    <VisualModule id="hosting-and-ownership">
      <header className="service-visual-module__heading">
        <p className="eyebrow">Hosting, ownership, and exit</p>
        <h3>Website ownership includes the connected systems, not only the visible pages.</h3>
      </header>
      <figure
        className="service-architecture-figure"
        data-service-asset-id={architecture.id}
        data-service-visual-job="EXPLAIN"
        aria-labelledby="hosting-architecture-caption"
        aria-describedby="hosting-architecture-alternative"
      >
        <ResponsiveDiagramViewport label="Scrollable hosting architecture diagram">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={architecture.alt}
            decoding="async"
            height={architecture.height}
            loading="lazy"
            sizes="(max-width: 54rem) 54rem, 100vw"
            src={architecture.src}
            width={architecture.width}
          />
        </ResponsiveDiagramViewport>
        <figcaption id="hosting-architecture-caption">{architecture.caption}</figcaption>
        <p className="systems-visual__text-alternative" id="hosting-architecture-alternative">
          The business website connects to versioned source and publishing, hosting and delivery, forms and customer contact, analytics and search records, the domain and DNS, and supporting email connections. Each connection needs a named owner, an authorized account, operating documentation, and an exit path so the website can be moved or handed off without treating one provider as the owner of the business.
        </p>
      </figure>
      <LayeredInfrastructureVisual
        includeServiceVisualIndex={false}
        seenTerms={new Set<string>()}
      />
    </VisualModule>
  );
}

function WebsiteEvidenceModule() {
  return <WebsiteProofModule websites={websiteProof} />;
}

function ProviderOwnershipModule() {
  return (
    <VisualModule id="ownership-map">
      <OwnershipMapVisual />
    </VisualModule>
  );
}

function ProviderMigrationModule() {
  return (
    <VisualModule id="migration-infrastructure">
      <header className="service-visual-module__heading">
        <p className="eyebrow">Dependency chain and migration runbook</p>
        <h3>Careful infrastructure work follows an authorized plan and a verification record.</h3>
      </header>
      <ServiceVisualFigure asset={serviceAsset("migration-infrastructure")} />
    </VisualModule>
  );
}

function ResearchScopeModule() {
  return (
    <VisualModule id="research-notebook">
      <header className="service-visual-module__heading">
        <p className="eyebrow">Evidence review and research scope</p>
        <h3>Start with the decision, then identify which sources can responsibly inform it.</h3>
      </header>
      <ServiceVisualFigure asset={serviceAsset("research-notebook")} />
    </VisualModule>
  );
}

function ResearchMeasurementModule() {
  return (
    <VisualModule id="measurement-search-signal-flow">
      <MeasurementSearchSignalFlowVisual />
    </VisualModule>
  );
}

function ResearchProofModule() {
  return (
    <ServiceToolProofModule
      exampleData
      intro="This screenshot supports source-labeled measurement and analysis claims. It shows example data in an owned system, not a client report or result."
      title="Measurement systems behind the work"
      tools={serviceToolProofByRoute["/services/research-audits-strategy/"]}
    />
  );
}

function CustomDecisionModule() {
  return (
    <VisualModule id="repair-integrate-build">
      <RepairIntegrateBuildVisual seenTerms={new Set<string>()} />
      <p className="service-visual-module__link">
        <Link href="/tools/#repair-integrate-build">
          Read the deeper Tools explanation <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </p>
    </VisualModule>
  );
}

function CustomAutomationModule() {
  return (
    <VisualModule id="controlled-automation">
      <ControlledAutomationVisual />
    </VisualModule>
  );
}

function CustomProofModule() {
  return (
    <ServiceToolProofModule
      intro="These screenshots are public repository evidence from owned Boho systems. They show systems Boho operates; they are not client projects and do not claim customer outcomes."
      title="Selected systems we actually operate"
      tools={serviceToolProofByRoute["/services/custom-digital-solutions/"]}
    />
  );
}

const visualPlacements: Record<
  ServiceAssetRoute,
  Readonly<Record<string, () => ReactNode>>
> = {
  "/services/ongoing-seo/": {
    "The monthly operating cycle": OngoingSeoCycleModule,
    "Evidence you can inspect": OngoingSeoGrowthModule,
  },
  "/services/web-design-redesign/": {
    "The website process": WebsiteDeliveryModule,
    "Hosting, email, ownership, and exit": WebsiteInfrastructureModule,
    "Evidence you can inspect": WebsiteEvidenceModule,
  },
  "/services/provider-rescue/": {
    "What Boho reviews": ProviderOwnershipModule,
    "The rescue and migration process": ProviderMigrationModule,
  },
  "/services/research-audits-strategy/": {
    "What Boho may study": ResearchScopeModule,
    "The Boho report standard": ResearchMeasurementModule,
    "What you receive": ResearchProofModule,
  },
  "/services/custom-digital-solutions/": {
    "What Boho may build or connect": CustomDecisionModule,
    "Security, privacy, and human review": CustomAutomationModule,
    "Evidence you can inspect": CustomProofModule,
  },
};

export function visualPlacementForSection(
  route: ServiceAssetRoute,
  sectionHeading: string,
) {
  const Placement = visualPlacements[route][sectionHeading];
  return Placement ? <Placement /> : null;
}

export function ServicesSystemMap() {
  return (
    <div
      className="services-system-map"
      data-services-system-map="true"
      data-service-visual-job="ORIENT"
    >
      <p className="eyebrow eyebrow--on-dark">Connected services system</p>
      <ol>
        {Object.entries(servicePresentationByRoute).map(([route, service], index) => (
          <li key={route}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{service.title}</strong>
              <small>{service.kicker}</small>
            </div>
            <a href={route}>
              Field guide <ArrowRight aria-hidden="true" size={15} />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HowBohoWorksFigure() {
  const process = serviceAsset("how-boho-works");
  return (
    <section
      aria-labelledby="how-project-moves-title"
      className="commercial-section services-process-figure"
      data-service-visual-module="owner-process"
    >
      <div className="section-shell">
        <header className="commercial-section__heading">
          <p className="eyebrow">Engagement sequence</p>
          <h2 id="how-project-moves-title">How a project moves</h2>
          <p>
            Discover the business and constraints, design the approved system, build the agreed scope, then launch the verified result with a documented handoff.
          </p>
        </header>
        <figure
          data-service-asset-id={process.id}
          data-service-visual-job="EXPLAIN"
          aria-describedby="how-boho-works-alternative"
        >
          <ResponsiveDiagramViewport
            label="Scrollable owner-supplied Discover, Design, Build, and Launch process"
            minimumWidth="52rem"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={process.alt}
              decoding="async"
              height={process.height}
              loading="lazy"
              sizes="(max-width: 54rem) 52rem, 100vw"
              src={process.src}
              width={process.width}
            />
          </ResponsiveDiagramViewport>
          <p className="systems-visual__text-alternative" id="how-boho-works-alternative">
            Discover: understand the business, customer, current system, constraints, and decision. Design: define the structure, responsibilities, visual system, ownership, and approved plan. Build: implement the agreed work with review, testing, and visible change control. Launch: release the verified result and complete documentation, ownership, and handoff.
          </p>
        </figure>
      </div>
    </section>
  );
}

export function ServicesLeanComparison() {
  return (
    <section
      aria-label="Direct operation comparison"
      className="commercial-section services-lean-comparison"
    >
      <div className="section-shell">
        <LeanDirectOperationVisual />
      </div>
    </section>
  );
}
