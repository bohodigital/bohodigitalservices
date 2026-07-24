import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InteriorPage from "../components/InteriorPage";
import { AboutPage } from "../components/AboutPage";
import {
  CommercialContactPage,
  CommercialEmergencyPage,
  CommercialStartPage,
} from "../components/commercial/CommercialInquiryPages";
import { ToolsPage } from "../components/KnowledgePages";
import { GlossaryPage } from "../components/GlossaryPage";
import { ResourcesPage } from "../components/ResourcesPage";
import { InHouseBrandsPage } from "../components/InHouseBrandsPage";
import { InHouseBrandPage } from "../components/InHouseBrandPage";
import { IndustriesPage } from "../components/IndustriesPage";
import { IndustryDetailPage } from "../components/IndustryDetailPage";
import { PricingPage } from "../components/PricingPage";
import { ServiceDetailPage } from "../components/ServiceDetailPage";
import { ServicesPage } from "../components/ServicesPage";
import { WorkEvidencePage } from "../components/WorkEvidencePage";
import { inHouseBrandsByLabPath } from "../content/inHouseBrands";
import { audiencePages } from "../content/audiencePages";
import { industryModelsBySlug } from "../content/industries";
import { commercialSection } from "../content/commercial/presentation";
import { corePages } from "../content/corePages";
import { isRetiredPublicPage } from "../content/publicPages";
import { servicePagesByRoute, serviceRoutePages } from "../content/serviceRoutePages";

const pages = [...corePages, ...audiencePages, ...serviceRoutePages].filter(
  (page) => !isRetiredPublicPage(page.slug),
);
const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));

type InteriorRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

function routeFromSegments(segments: string[]) {
  return `/${segments.join("/")}/`;
}

export function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug.split("/").filter(Boolean),
  }));
}

type CommercialRouteMetadata = {
  section: ReturnType<typeof commercialSection>;
  title?: string;
  description?: string;
  canonical?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
};

function commercialRouteMetadata(route: string): CommercialRouteMetadata | null {
  switch (route) {
    case "/services/":
      return {
        section: commercialSection("service-provider-rescue", "services-overview"),
        description: commercialSection("service-local-visibility", "services-overview").one("Meta description"),
        canonical: commercialSection("services-overview", "services-overview").one("Canonical route"),
        openGraphTitle: commercialSection("services-overview", "services-overview").one("Open Graph title"),
      };
    case "/pricing/":
      return {
        section: commercialSection("pricing", "page-metadata"),
        canonical: commercialSection("pricing", "pricing").one("Canonical route"),
        openGraphTitle: commercialSection("pricing", "pricing").one("Open Graph title"),
        openGraphDescription: commercialSection("pricing", "pricing").one("Open Graph description"),
      };
    case "/work/":
      return {
        section: commercialSection("work-evidence", "page-metadata"),
        canonical: commercialSection("work-evidence", "work-evidence").one("Canonical route"),
        openGraphTitle: commercialSection("work-evidence", "work-evidence").one("Open Graph title"),
        openGraphDescription: commercialSection("work-evidence", "work-evidence").one("Open Graph description"),
      };
    case "/contact/":
      return {
        section: commercialSection("contact", "contact"),
        description: commercialSection("contact", "contact").one("Open Graph description"),
      };
    case "/start/":
      return { section: commercialSection("start", "start") };
    case "/emergency/":
      return { section: commercialSection("emergency", "metadata") };
    case "/services/ongoing-seo/":
      return { section: commercialSection("service-local-visibility", "local-visibility-lead-systems") };
    case "/services/web-design-redesign/":
      return { section: commercialSection("service-websites-hosting", "websites-managed-hosting") };
    case "/services/provider-rescue/":
      return { section: commercialSection("service-provider-rescue", "provider-rescue-migration") };
    case "/services/custom-digital-solutions/":
      return { section: commercialSection("service-custom-tools", "custom-tools-automation") };
    case "/services/research-audits-strategy/":
      return {
        section: commercialSection("service-research-analytics", "research-analytics-improvement"),
        description: commercialSection("service-provider-rescue", "research-analytics-improvement").one("Meta description"),
      };
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: InteriorRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pagesBySlug.get(routeFromSegments(slug));

  if (!page) {
    return {
      title: { absolute: "Page not found | Boho Digital Services" },
    };
  }

  const commercial = commercialRouteMetadata(page.slug);
  if (commercial) {
    const title = commercial.title ?? commercial.section.one("SEO title");
    const description = commercial.description ?? commercial.section.one("Meta description");
    const canonical = commercial.canonical ?? commercial.section.one("Canonical route");
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title: commercial.openGraphTitle ?? commercial.section.optional("Open Graph title") ?? title,
        description: commercial.openGraphDescription ?? commercial.section.optional("Open Graph description") ?? description,
        url: canonical,
      },
      robots: { index: true, follow: true },
    };
  }

  return {
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: { canonical: page.slug },
    openGraph: { url: page.slug },
    robots: { index: true, follow: true },
  };
}

export default async function InteriorRoute({ params }: InteriorRouteProps) {
  const { slug } = await params;
  const page = pagesBySlug.get(routeFromSegments(slug));

  if (!page) notFound();

  if (page.pageKind === "glossary") return <GlossaryPage />;
  if (page.slug === "/about/") return <AboutPage />;
  if (page.slug === "/industries/") return <IndustriesPage />;
  const industryModel = industryModelsBySlug.get(page.slug);
  if (industryModel) return <IndustryDetailPage model={industryModel} />;
  if (page.slug === "/services/") return <ServicesPage />;
  if (page.slug === "/pricing/") return <PricingPage />;
  if (page.slug === "/work/") return <WorkEvidencePage />;
  if (page.slug === "/contact/") return <CommercialContactPage />;
  if (page.slug === "/start/") return <CommercialStartPage />;
  if (page.slug === "/emergency/") return <CommercialEmergencyPage />;
  const servicePage = servicePagesByRoute.get(page.slug);
  if (servicePage) return <ServiceDetailPage page={servicePage} />;
  if (page.pageKind === "tools") return <ToolsPage />;
  if (page.pageKind === "resources") return <ResourcesPage />;
  if (page.pageKind === "brands") return <InHouseBrandsPage />;
  if (page.pageKind === "brand") {
    const brand = inHouseBrandsByLabPath.get(page.slug);
    if (brand) return <InHouseBrandPage brand={brand} />;
  }

  return <InteriorPage page={page} />;
}
