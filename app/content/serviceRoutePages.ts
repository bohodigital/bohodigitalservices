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
  {
    slug: "/work/",
    title: "Work & Evidence | Boho Digital Services",
    metaDescription:
      "Inspect Boho public tools, owned websites, provider-rescue method, and evidence-aware reporting standard without unsupported client-result claims.",
    eyebrow: "Work & Evidence",
    headline: "Inspect the method, the public systems, and the ownership boundary.",
    intro: [
      "Public repositories, owned properties, reproducible methods, documentation, and limitations provide inspectable evidence without inventing client outcomes.",
    ],
    theme: "research",
    primaryCta: { label: "See public tools", href: "#public-tools" },
    secondaryCta: { label: "Review services", href: "/services/" },
    sections: [],
  },
];

export const servicePagesByRoute = new Map(
  servicePages.map((page) => [page.metadata.canonicalRoute, page]),
);
