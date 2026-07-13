import type { MetadataRoute } from "next";

import { audiencePages } from "./content/audiencePages";
import { corePages } from "./content/corePages";

const siteUrl = "https://bohodigitalservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...corePages.filter((page) => !page.noIndex).map((page) => page.slug),
    ...audiencePages.filter((page) => !page.noIndex).map((page) => page.slug),
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
