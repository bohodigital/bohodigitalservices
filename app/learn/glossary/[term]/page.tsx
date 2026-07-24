import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GlossaryTermPage } from "../../../components/GlossaryTermPage";
import { glossaryBySlug } from "../../../content/knowledge";
import {
  glossaryMetaDescription,
  glossaryPath,
  glossaryRoutes,
} from "../../../content/glossaryRoutes";

type GlossaryTermRouteProps = {
  params: Promise<{ term: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryRoutes.map(({ entry }) => ({ term: entry.slug }));
}

export async function generateMetadata({
  params,
}: GlossaryTermRouteProps): Promise<Metadata> {
  const { term } = await params;
  const entry = glossaryBySlug.get(term);

  if (!entry) {
    return {
      title: { absolute: "Glossary term not found | Boho Digital Services" },
    };
  }

  const canonical = glossaryPath(entry);
  const title = `${entry.term} Definition | Boho Digital Services`;
  const description = glossaryMetaDescription(entry);
  const socialImage = {
    url: "/og-boho-digital-engineering-20260714.png",
    width: 1536,
    height: 1024,
    alt: "Warm editorial collage representing Boho Digital Services digital engineering systems",
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GlossaryTermRoute({
  params,
}: GlossaryTermRouteProps) {
  const { term } = await params;
  const entry = glossaryBySlug.get(term);
  if (!entry) notFound();
  return <GlossaryTermPage entry={entry} />;
}
