import type { MetadataRoute } from "next";

import { audiencePages } from "./content/audiencePages";
import { corePages } from "./content/corePages";
import { glossaryRoutes } from "./content/glossaryRoutes";
import { isRetiredPublicPage } from "./content/publicPages";
import { serviceRoutePages } from "./content/serviceRoutePages";

export const dynamic = "force-static";

const siteUrl = "https://bohodigitalservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...corePages.filter((page) => !isRetiredPublicPage(page.slug)).map((page) => page.slug),
    ...audiencePages.filter((page) => !isRetiredPublicPage(page.slug)).map((page) => page.slug),
    ...serviceRoutePages.filter((page) => !isRetiredPublicPage(page.slug)).map((page) => page.slug),
    ...glossaryRoutes.map((route) => route.path),
  ];

  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
