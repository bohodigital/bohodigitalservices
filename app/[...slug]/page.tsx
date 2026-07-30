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
  section?: ReturnType<typeof commercialSection>;
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
        title: "Business Websites, SEO & Website Help | Boho",
        description:
          "Four clear services from Boho: business websites from $850, ongoing SEO from $450 per month, website help from $200, and custom systems from $1,500.",
        canonical: "/services/",
        openGraphTitle: "Business Websites, SEO & Website Help | Boho",
        openGraphDescription:
          "Four clear services from Boho: business websites from $850, ongoing SEO from $450 per month, website help from $200, and custom systems from $1,500.",
      };
    case "/pricing/":
      return {
        title: "Website, SEO & Technical Services Pricing | Boho",
        description:
          "Business websites from $850, ongoing SEO from $450 per month, website help from $200, and custom systems from $1,500. Clear scope and client-owned hosting.",
        canonical: "/pricing/",
        openGraphTitle: "Website, SEO & Technical Services Pricing | Boho",
        openGraphDescription:
          "Business websites from $850, ongoing SEO from $450 per month, website help from $200, and custom systems from $1,500. Clear scope and client-owned hosting.",
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
      return {
        title: "Ongoing SEO & Local Growth | Boho",
        description:
          "Boho combines technical SEO, local visibility, content improvement, customer-path work, analytics, and implementation around the priorities that matter to the business.",
        canonical: "/services/ongoing-seo/",
      };
    case "/services/web-design-redesign/":
      return {
        title: "Business Websites from $850 | Boho",
        description:
          "Boho builds new websites and responsibly replaces weak ones. Straightforward static websites start at $850 and include eligible $0 hosting in a Cloudflare account controlled by the client.",
        canonical: "/services/web-design-redesign/",
      };
    case "/services/provider-rescue/":
      return {
        title: "Website Help for Provider Rescue & Migration | Boho",
        description:
          "Provider rescue and migration are forms of Website Help. One bounded issue or diagnosis starts at $200; larger recovery and migration work receives a written quote.",
        canonical: "/services/provider-rescue/",
      };
    case "/services/custom-digital-solutions/":
      return {
        title: "Custom Systems from $1,500 | Boho",
        description:
          "Boho builds focused tools, integrations, publishing systems, internal dashboards, data workflows, and automation when ordinary software does not solve the actual job.",
        canonical: "/services/custom-digital-solutions/",
      };
    case "/services/research-audits-strategy/":
      return {
        title: "Website Help, Audits & Technical Reviews | Boho",
        description:
          "A focused audit or investigation is Website Help when one defined website, search, analytics, provider, migration, or technical question needs to be understood.",
        canonical: "/services/research-audits-strategy/",
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
    const title = commercial.title ?? commercial.section?.one("SEO title");
    const description = commercial.description ?? commercial.section?.one("Meta description");
    const canonical = commercial.canonical ?? commercial.section?.one("Canonical route");
    if (!title || !description || !canonical) {
      throw new Error(`Commercial metadata is incomplete for ${page.slug}`);
    }
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: {
        title: commercial.openGraphTitle ?? commercial.section?.optional("Open Graph title") ?? title,
        description: commercial.openGraphDescription ?? commercial.section?.optional("Open Graph description") ?? description,
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
