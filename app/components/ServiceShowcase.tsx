import Image from "next/image";
import Link from "next/link";
import { demoProjects } from "../content/demoLibrary";
import type { PrimaryServiceRoute, ServiceShowcaseAsset } from "../content/serviceShowcases";
import { serviceHeroAssets, serviceShowcases } from "../content/serviceShowcases";
import { ownedWebsites, selectedTools } from "../content/systems";

type ShowcaseDestination = {
  action: string;
  accessibleLabel: string;
  href: string;
};

function verifiedShowcaseDestination(asset: ServiceShowcaseAsset): ShowcaseDestination | undefined {
  if (asset.href) {
    return {
      action: "Tour the demo",
      accessibleLabel: `Open the ${asset.caption} demo in a new tab`,
      href: asset.href,
    };
  }

  const demo = demoProjects.find((project) => project.image === asset.src);
  if (demo) {
    return {
      action: "Tour the demo",
      accessibleLabel: `Open the ${demo.name} demo in a new tab`,
      href: demo.href,
    };
  }

  const property = ownedWebsites.find((website) => asset.caption.startsWith(`${website.name} ·`));
  if (property) {
    return {
      action: "Visit the property",
      accessibleLabel: `Open ${property.name} in a new tab`,
      href: property.url,
    };
  }

  const tool = selectedTools.find((candidate) => (
    candidate.image.src === asset.src
    || (candidate.id === "analysis-dashboard" && asset.src === "/proof/tools/boho-analytics-platform.png")
  ));
  if (tool) {
    return {
      action: "Inspect the repository",
      accessibleLabel: `Open the ${tool.displayName} public repository in a new tab`,
      href: tool.repositoryUrl,
    };
  }

  return undefined;
}

export function ServiceHeroVisual({ route }: { route: PrimaryServiceRoute }) {
  const asset = serviceHeroAssets[route];
  return <figure className="service-visual-hero">
    <Image src={asset.src} alt={asset.alt} width={1200} height={800} priority unoptimized />
    <figcaption><span>{asset.label}</span><strong>{asset.caption}</strong></figcaption>
  </figure>;
}

export function ServiceShowcaseGallery({
  route,
  eyebrow = "Inspectable examples",
  title = "See the kind of work being discussed.",
  intro = "These are Boho demos, owned properties, public tools, and technical evidence—not unlabeled client claims.",
  libraryHref,
}: {
  route: PrimaryServiceRoute;
  eyebrow?: string;
  title?: string;
  intro?: string;
  libraryHref?: `/${string}`;
}) {
  return <section className="reset-section service-showcase" aria-labelledby={`${route.replaceAll("/", "-")}-showcase-title`}>
    <div className="reset-shell">
      <header className="reset-heading service-showcase__heading">
        <p className="reset-eyebrow">{eyebrow}</p>
        <h2 id={`${route.replaceAll("/", "-")}-showcase-title`}>{title}</h2>
        <div className="service-showcase__heading-side"><p>{intro}</p>{libraryHref ? <Link href={libraryHref}>Browse all eight demos →</Link> : null}</div>
      </header>
      <div className="service-showcase__grid">
        {serviceShowcases[route].map((asset, index) => <ShowcaseFigure asset={asset} featured={index === 0} key={`${asset.src}-${asset.caption}`} />)}
      </div>
    </div>
  </section>;
}

function ShowcaseFigure({ asset, featured = false }: { asset: ServiceShowcaseAsset; featured?: boolean }) {
  const destination = verifiedShowcaseDestination(asset);
  return <figure className={`service-showcase__item${featured ? " service-showcase__item--featured" : ""}${asset.kind === "tall" ? " service-showcase__item--tall" : ""}${destination ? " service-showcase__item--linked" : ""}`}>
    {destination ? <a aria-label={destination.accessibleLabel} className="service-showcase__card-link" href={destination.href} rel="noopener noreferrer" target="_blank" /> : null}
    <div className="service-showcase__media">
      <Image src={asset.src} alt={asset.alt} width={1440} height={1050} unoptimized />
    </div>
    <figcaption><span>{asset.label}</span><strong>{asset.caption}</strong>{destination ? <b>{destination.action} ↗</b> : null}</figcaption>
  </figure>;
}

export function AnalyticsPlatformSpotlight() {
  return <section className="reset-section analytics-spotlight" aria-labelledby="analytics-spotlight-title">
    <div className="reset-shell analytics-spotlight__grid">
      <div className="analytics-spotlight__copy">
        <p className="reset-eyebrow">Current public platform</p>
        <h2 id="analytics-spotlight-title">Measurements stay source-labeled.</h2>
        <p>The Boho Analytics Platform brings website analytics, search performance, traffic infrastructure, and form-delivery monitoring into one inspectable view without pretending unlike measurements are interchangeable.</p>
        <ul>
          <li>Source-specific reporting and plot controls</li>
          <li>Visible collection windows and limitations</li>
          <li>Self-hosted, MIT-licensed public software</li>
          <li>Designed to support a decision—not manufacture a result</li>
        </ul>
        <Link href="https://github.com/bohodigital/boho-analytics-platform" rel="noopener noreferrer" target="_blank">Inspect the public repository <span className="sr-only">(opens in a new tab)</span></Link>
      </div>
      <figure className="analytics-spotlight__figure">
        <div className="analytics-spotlight__browser"><span aria-hidden="true"><i /><i /><i /><b>Boho Analytics Platform</b></span><Image src="/proof/tools/boho-analytics-dashboard-v2.png" alt="Boho Analytics Platform dashboard with report controls, source-labeled summary cards, and sanitized illustrative metrics." width={1440} height={1050} unoptimized /></div>
        <figcaption>Sanitized illustrative data · Public repository screenshot · Not client data</figcaption>
      </figure>
    </div>
  </section>;
}
