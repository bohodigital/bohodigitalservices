import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InteriorPage from "../components/InteriorPage";
import { AboutPage } from "../components/AboutPage";
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
