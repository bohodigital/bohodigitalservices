import { servicePages } from "./servicePages.generated";
import type { PageConfig } from "./types";

export const serviceRoutePages: PageConfig[] = [
  ...servicePages.map((page) => ({
    slug: page.metadata.canonicalRoute,
    title: page.metadata.seoTitle,
    metaDescription: page.metadata.metaDescription,
    eyebrow: page.hero.eyebrow,
    headline: page.hero.headline,
    intro: [...page.hero.intro],
    theme: "editorial" as const,
    primaryCta: {
      label: page.hero.primaryCta.label,
      href: page.hero.primaryCta.href,
    },
    secondaryCta: {
      label: page.hero.secondaryCta.label,
      href: page.hero.secondaryCta.href,
    },
    sections: [],
  })),
];

export const servicePagesByRoute = new Map(
  servicePages.map((page) => [page.metadata.canonicalRoute, page]),
);
