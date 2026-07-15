import type { MetadataRoute } from "next";

import { audiencePages } from "./content/audiencePages";
import { corePages } from "./content/corePages";
import { isRetiredPublicPage } from "./content/publicPages";

const siteUrl = "https://bohodigitalservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...corePages.filter((page) => !isRetiredPublicPage(page.slug)).map((page) => page.slug),
    ...audiencePages.filter((page) => !isRetiredPublicPage(page.slug)).map((page) => page.slug),
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
