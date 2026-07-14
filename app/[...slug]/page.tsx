import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InteriorPage from "../components/InteriorPage";
import { ToolsPage } from "../components/KnowledgePages";
import { GlossaryPage } from "../components/GlossaryPage";
import { ResourcesPage } from "../components/ResourcesPage";
import { InHouseBrandsPage } from "../components/InHouseBrandsPage";
import { InHouseBrandPage } from "../components/InHouseBrandPage";
import { inHouseBrandsByLabPath } from "../content/inHouseBrands";
import { audiencePages } from "../content/audiencePages";
import { corePages } from "../content/corePages";

const pages = [...corePages, ...audiencePages];
const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));

type InteriorRouteProps = {
  params: Promise<{ slug: string[] }>;
};

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
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: { canonical: page.slug },
    openGraph: { url: page.slug },
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function InteriorRoute({ params }: InteriorRouteProps) {
  const { slug } = await params;
  const page = pagesBySlug.get(routeFromSegments(slug));

  if (!page) notFound();

  if (page.pageKind === "glossary") return <GlossaryPage />;
  if (page.pageKind === "tools") return <ToolsPage />;
  if (page.pageKind === "resources") return <ResourcesPage />;
  if (page.pageKind === "brands") return <InHouseBrandsPage />;
  if (page.pageKind === "brand") {
    const brand = inHouseBrandsByLabPath.get(page.slug);
    if (brand) return <InHouseBrandPage brand={brand} />;
  }

  return <InteriorPage page={page} />;
}
