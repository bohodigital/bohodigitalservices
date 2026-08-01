import type { Metadata } from "next";
import { notFound } from "next/navigation";

import InteriorPage from "../components/InteriorPage";
import {
  BuyerFacingAboutPage,
  BuyerFacingIndustriesPage,
  BuyerFacingIndustryDetailPage,
} from "../components/BuyerFacingPages";
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
import { PricingPage } from "../components/PricingPage";
import { PrimaryServicePage } from "../components/PrimaryServicePage";
import { ServicesPage } from "../components/ServicesPage";
import { WebsiteHelpPage } from "../components/WebsiteHelpPage";
import { WorkPage } from "../components/WorkPage";
import { inHouseBrandsByLabPath } from "../content/inHouseBrands";
import { audiencePages } from "../content/audiencePages";
import { industryModelsBySlug } from "../content/industries";
import { commercialSection } from "../content/commercial/presentation";
import { freeReviewPage } from "../content/commercialReset";
import { corePages } from "../content/corePages";
import { isRetiredPublicPage } from "../content/publicPages";
import { servicePagesByRoute, serviceRoutePages } from "../content/serviceRoutePages";
import type { PageConfig } from "../content/types";

const closeoutPages: PageConfig[] = [
  {
    slug: "/work/",
    title: "Work Built and Operated by Boho | Websites, Publishing & Systems",
    metaDescription: "Inspect websites, publishing systems, educational platforms, analytics tools, and technical infrastructure built and operated by Boho Digital Services.",
    eyebrow: "WORK BUILT BY BOHO",
    headline: "Real websites and systems, live on the web.",
    intro: [],
    theme: "editorial",
    primaryCta: { label: "Get a free website review", href: "/start/" },
    sections: [],
  },
  {
    slug: "/services/website-help/",
    title: "Website Help from $200 | Repairs, Audits & Provider Problems | Boho",
    metaDescription: "Focused website help from $200 for broken forms, mobile problems, analytics issues, migrations, provider trouble, accessibility fixes, and ownership cleanup.",
    eyebrow: "WEBSITE HELP · FROM $200",
    headline: "Fix the useful problem without automatically rebuilding everything.",
    intro: [],
    theme: "editorial",
    primaryCta: { label: "Get a free website review", href: "/start/" },
    sections: [],
  },
];

const pages = [...corePages, ...audiencePages, ...serviceRoutePages, ...closeoutPages].filter(
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
    case "/work/":
      return {
        title: "Work Built and Operated by Boho | Websites, Publishing & Systems",
        description: "Inspect websites, publishing systems, educational platforms, analytics tools, and technical infrastructure built and operated by Boho Digital Services.",
        canonical: "/work/",
      };
    case "/services/website-help/":
      return {
        title: "Website Help from $200 | Repairs, Audits & Provider Problems | Boho",
        description: "Focused website help from $200 for broken forms, mobile problems, analytics issues, migrations, provider trouble, accessibility fixes, and ownership cleanup.",
        canonical: "/services/website-help/",
      };
    case "/about/":
      return {
        title: "About Boho Digital Services | Owner-Operated Digital Engineering",
        description: "Boho Digital Services is an owner-operated digital engineering company combining scientific problem-solving, software, websites, SEO, and client-owned systems.",
        canonical: "/about/",
      };
    case "/industries/":
      return {
        title: "Digital Services for Local, Professional & Online Businesses | Boho",
        description: "See how Boho approaches websites, SEO, customer paths, and technical systems for project businesses, local services, physical locations, ecommerce, and professional firms.",
        canonical: "/industries/",
      };
    case "/industries/home-improvement-contractors/":
      return { title: "Digital Services for Project Businesses | Boho", description: "Contractors, trades, restoration firms, remodelers, and other project businesses need to make service, location, property, project, and proof fit clear before asking for an estimate or inspection.", canonical: route };
    case "/industries/local-service-businesses/":
      return { title: "Digital Services for Local Service Businesses | Boho", description: "Appointment-based, service-area, recurring, and location-based businesses need to communicate service fit, availability, people, policies, location, and the correct next action without forcing every customer through the same generic form.", canonical: route };
    case "/industries/brick-and-mortar-retail-hospitality/":
      return { title: "Digital Services for Physical Locations | Boho", description: "Retailers, venues, studios, offices, hospitality businesses, galleries, and other destinations need current public information that helps people decide whether, when, and how to visit.", canonical: route };
    case "/industries/online-retail-ecommerce/":
      return { title: "Digital Services for Product & Ecommerce Businesses | Boho", description: "Product sellers need clear category structure, complete product information, usable navigation, trustworthy policies, working purchase paths, and measurement that distinguishes discovery from completed business.", canonical: route };
    case "/industries/professional-b2b-services/":
      return { title: "Digital Services for Professional & B2B Services | Boho", description: "Professional firms, consultants, specialists, and B2B providers need to explain the problem they solve, who is responsible, how the work proceeds, what evidence supports it, and what a qualified next conversation requires.", canonical: route };
    case "/contact/":
      return {
        section: commercialSection("contact", "contact"),
        description: commercialSection("contact", "contact").one("Open Graph description"),
      };
    case "/start/":
      return {
        title: "Free Website Review | Boho Digital Services",
        description: "Send your current website or project details for a free public review and a clear recommendation from Boho Digital Services.",
        canonical: "/start/",
        openGraphTitle: freeReviewPage.headline,
        openGraphDescription: freeReviewPage.body,
      };
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
  if (page.slug === "/about/") return <BuyerFacingAboutPage />;
  if (page.slug === "/industries/") return <BuyerFacingIndustriesPage />;
  const industryModel = industryModelsBySlug.get(page.slug);
  if (industryModel) return <BuyerFacingIndustryDetailPage model={industryModel} />;
  if (page.slug === "/services/") return <ServicesPage />;
  if (page.slug === "/pricing/") return <PricingPage />;
  if (page.slug === "/work/") return <WorkPage />;
  if (page.slug === "/services/website-help/") return <WebsiteHelpPage />;
  if (page.slug === "/contact/") return <CommercialContactPage />;
  if (page.slug === "/start/") return <CommercialStartPage />;
  if (page.slug === "/emergency/") return <CommercialEmergencyPage />;
  const servicePage = servicePagesByRoute.get(page.slug);
  if (servicePage) return <PrimaryServicePage route={page.slug} />;
  if (page.pageKind === "tools") return <ToolsPage />;
  if (page.pageKind === "resources") return <ResourcesPage />;
  if (page.pageKind === "brands") return <InHouseBrandsPage />;
  if (page.pageKind === "brand") {
    const brand = inHouseBrandsByLabPath.get(page.slug);
    if (brand) return <InHouseBrandPage brand={brand} />;
  }

  return <InteriorPage page={page} />;
}
