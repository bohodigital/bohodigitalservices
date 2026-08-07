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

const internalToolTours = new Map<string, { action: string; name: string }>([
  ["/resources/#boho-analytics-command-center", { action: "Explore the command center", name: "Boho Analytics command center" }],
  ["/resources/#boho-analytics-plot-builder", { action: "Explore Plot Builder", name: "Boho Analytics Plot Builder" }],
  ["/resources/#boho-site-graph", { action: "Explore Site Graph", name: "Boho Site Graph" }],
]);

function verifiedShowcaseDestination(asset: ServiceShowcaseAsset): ShowcaseDestination | undefined {
  if (asset.href) {
    const internalToolTour = internalToolTours.get(asset.href);
    if (internalToolTour) {
      return {
        action: internalToolTour.action,
        accessibleLabel: `Explore the ${internalToolTour.name} on Boho Digital Services in a new tab`,
        href: asset.href,
      };
    }

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
      action: "Explore the tool",
      accessibleLabel: `Explore the ${tool.displayName} profile on Boho Digital Services in a new tab`,
      href: tool.profileHref,
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

const analyticsRepository = "https://github.com/bohodigital/boho-analytics-platform";
const analyticsQuickStart = `${analyticsRepository}#quick-start-with-a-blank-configuration`;
const analyticsCommandCenterTour = "/resources/#boho-analytics-command-center";
const analyticsPlotBuilderTour = "/resources/#boho-analytics-plot-builder";
const siteGraphTour = "/resources/#boho-site-graph";

type AnalyticsProductAdProps = {
  context?: "overview" | "research" | "seo";
  headingId?: string;
  placement?: "homepage" | "service";
  sourcePage?: string;
};

export function AnalyticsProductAd({
  context = "overview",
  headingId = "analytics-product-ad-title",
  placement = "service",
  sourcePage = "service-page",
}: AnalyticsProductAdProps) {
  const message = context === "seo"
    ? {
        kicker: "Built for this work",
        title: "The in-house measurement system behind this SEO service.",
        prompt: "Month one includes the approved, straightforward connections needed for the written scope.",
        detail: "Boho Analytics keeps search, traffic, form, infrastructure, and website-structure evidence source-labeled in one view. Your copy of the current public release remains free to self-host if you later handle the measurement yourself.",
      }
    : context === "research"
      ? {
          kicker: "Boho-built evidence system",
          title: "The analytics system behind Boho’s website and search research.",
          prompt: "Want to handle the measurement side of organic SEO yourself?",
          detail: "Self-host the public Boho Analytics release, or inspect how it keeps different evidence sources separate before recommendations are made.",
        }
      : {
          kicker: "Built for Boho SEO",
          title: "We built the analytics software we use for SEO. You can use it too—free.",
          prompt: "Want to handle the measurement side of organic SEO yourself?",
          detail: "Self-host the public Boho Analytics release, or inspect how it keeps different evidence sources separate before recommendations are made.",
        };

  return <section
    className={`reset-section analytics-product-ad analytics-product-ad--${placement}`}
    aria-labelledby={headingId}
  >
    <div className="reset-shell analytics-product-ad__shell">
      <header className="analytics-product-ad__intro">
        <p className="analytics-product-ad__kicker"><span>{message.kicker}</span><strong>Free + open source</strong></p>
        <p className="reset-eyebrow">Boho Analytics Platform + Site Graph</p>
        <h2 id={headingId}>{message.title}</h2>
        <p className="analytics-product-ad__lead"><strong>{message.prompt}</strong> {message.detail}</p>
        <ul className="analytics-product-ad__sources" aria-label="Supported evidence sources">
          <li>GA4</li>
          <li>Search Console</li>
          <li>Self-hosted Umami</li>
          <li>Cloudflare</li>
          <li>Durable forms + inbox evidence</li>
        </ul>
        <p className="analytics-product-ad__principle">Search clicks are not sessions. Edge requests are not visitors.</p>
        <div className="analytics-product-ad__actions">
          <a
            data-analytics-destination-type="internal_tool_detail"
            data-analytics-event="tools_project_click"
            data-analytics-project-name="Boho Analytics Platform"
            href="/resources/#analysis-dashboard"
            rel="noopener noreferrer"
            target="_blank"
          >
            Tour the free software <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            data-analytics-event="service_card_click"
            data-analytics-price-display="From $450/month"
            data-analytics-service-name="Ongoing SEO & Local Growth"
            data-analytics-source-page={sourcePage}
            data-analytics-source-section="analytics-product-ad"
            href="/services/ongoing-seo/"
          >
            See how Boho does ongoing SEO <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <div className="analytics-product-ad__mosaic" aria-label="Boho Analytics demo views">
        <a
          aria-label="Explore the Boho Analytics command center on Boho Digital Services (opens in a new tab)"
          className="analytics-product-ad__visual analytics-product-ad__visual--command"
          data-analytics-destination-type="internal_tool_detail"
          data-analytics-event="tools_project_click"
          data-analytics-project-name="Boho Analytics Platform"
          href={analyticsCommandCenterTour}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="analytics-product-ad__demo-label">Synthetic demo · no client data</span>
          <span className="analytics-product-ad__browser" aria-hidden="true"><i /><i /><i /><b>Growth command center</b></span>
          <Image
            alt="Boho Analytics demo command center showing source-labeled Search Console clicks, Umami visits and page views, durable leads, and report coverage."
            height={720}
            src="/proof/tools/boho-analytics-demo-command-center-20260806.webp"
            unoptimized
            width={1280}
          />
          <span className="analytics-product-ad__caption"><small>One operational view</small><strong>Command center</strong><b>Explore the command center ↗</b></span>
        </a>

        <a
          aria-label="Explore Boho Analytics Plot Builder on Boho Digital Services (opens in a new tab)"
          className="analytics-product-ad__visual analytics-product-ad__visual--plot"
          data-analytics-destination-type="internal_tool_detail"
          data-analytics-event="tools_project_click"
          data-analytics-project-name="Boho Analytics Platform"
          href={analyticsPlotBuilderTour}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="analytics-product-ad__demo-label">Synthetic demo · no client data</span>
          <span className="analytics-product-ad__browser" aria-hidden="true"><i /><i /><i /><b>Source-specific plots</b></span>
          <Image
            alt="Boho Analytics demo plot builder showing Search Console source controls, comparison settings, exports, and a source-labeled trend chart."
            height={720}
            src="/proof/tools/boho-analytics-demo-plot-builder-20260806.webp"
            unoptimized
            width={1280}
          />
          <span className="analytics-product-ad__caption"><small>Compare without blending</small><strong>Plot builder</strong><b>Explore Plot Builder ↗</b></span>
        </a>

        <a
          aria-label="Explore Boho Site Graph on Boho Digital Services (opens in a new tab)"
          className="analytics-product-ad__visual analytics-product-ad__visual--graph"
          data-analytics-destination-type="internal_tool_detail"
          data-analytics-event="tools_project_click"
          data-analytics-project-name="Boho Site Graph"
          href={siteGraphTour}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="analytics-product-ad__demo-label">Synthetic demo site · structural evidence</span>
          <span className="analytics-product-ad__browser" aria-hidden="true"><i /><i /><i /><b>Provider Rescue neighborhood</b></span>
          <Image
            alt="Boho Site Graph mapping a synthetic service-site demo's Provider Rescue page and nearby internal-link pathways."
            height={720}
            src="/proof/tools/boho-site-graph-demo-provider-rescue-20260806.webp"
            unoptimized
            width={1280}
          />
          <span className="analytics-product-ad__caption"><small>Structure, not visitor behavior</small><strong>Site Graph</strong><b>Explore Site Graph ↗</b></span>
        </a>
      </div>

      <div className="analytics-product-ad__terms">
        <Link
          className="analytics-product-ad__term analytics-product-ad__term--seo"
          data-analytics-event="service_card_click"
          data-analytics-price-display="From $450/month"
          data-analytics-service-name="Ongoing SEO & Local Growth"
          data-analytics-source-page={sourcePage}
          data-analytics-source-section="analytics-product-ad-terms"
          href="/services/ongoing-seo/"
        >
          <span>Month one · active SEO</span>
          <strong>We configure the approved GA4, Search Console, forms-evidence, and self-hosted Umami connections already needed for the work.</strong>
          <b>Review the SEO scope →</b>
        </Link>
        <a
          className="analytics-product-ad__term analytics-product-ad__term--open"
          data-analytics-destination-type="internal_tool_detail"
          data-analytics-event="tools_project_click"
          data-analytics-project-name="Boho Analytics Platform"
          href="/resources/#analysis-dashboard"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>No Boho software lock-in</span>
          <strong>The current MIT-licensed public release may be self-hosted, configured, copied, and modified whether or not you retain Boho for SEO.</strong>
          <b>Review the self-hosting boundaries ↗</b><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <p className="analytics-product-ad__boundary"><strong>Free means a $0 software license.</strong> It does not mean free hosting, provider accounts, SEO labor, support, maintenance, or custom integrations. <a data-analytics-destination-type="setup_documentation" data-analytics-event="tools_project_click" data-analytics-project-name="Boho Analytics Platform" href={analyticsQuickStart} rel="noopener noreferrer" target="_blank">Open the blank-configuration quick start ↗<span className="sr-only"> (opens in a new tab)</span></a></p>
    </div>
  </section>;
}

export function AnalyticsPlatformSpotlight({ context = "research" }: { context?: "research" | "seo" }) {
  return <AnalyticsProductAd context={context} />;
}
