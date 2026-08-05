import Image from "next/image";
import Link from "next/link";
import type { PrimaryServiceRoute, ServiceShowcaseAsset } from "../content/serviceShowcases";
import { serviceHeroAssets, serviceShowcases } from "../content/serviceShowcases";

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
}: {
  route: PrimaryServiceRoute;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return <section className="reset-section service-showcase" aria-labelledby={`${route.replaceAll("/", "-")}-showcase-title`}>
    <div className="reset-shell">
      <header className="reset-heading service-showcase__heading">
        <p className="reset-eyebrow">{eyebrow}</p>
        <h2 id={`${route.replaceAll("/", "-")}-showcase-title`}>{title}</h2>
        <p>{intro}</p>
      </header>
      <div className="service-showcase__grid">
        {serviceShowcases[route].map((asset, index) => <ShowcaseFigure asset={asset} featured={index === 0} key={`${asset.src}-${asset.caption}`} />)}
      </div>
    </div>
  </section>;
}

function ShowcaseFigure({ asset, featured = false }: { asset: ServiceShowcaseAsset; featured?: boolean }) {
  return <figure className={`service-showcase__item${featured ? " service-showcase__item--featured" : ""}${asset.kind === "tall" ? " service-showcase__item--tall" : ""}`}>
    <div className="service-showcase__media">
      <Image src={asset.src} alt={asset.alt} width={1440} height={1050} unoptimized />
    </div>
    <figcaption><span>{asset.label}</span><strong>{asset.caption}</strong></figcaption>
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
