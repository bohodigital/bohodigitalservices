import { primaryServiceAssetByRoute } from "./serviceAssets";

export const servicePresentationByRoute = {
  "/services/ongoing-seo/": {
    title: "Ongoing SEO & Search Growth",
    kicker: "Help the right local customers find and contact you",
    summary:
      "Improve how your business appears in search, what customers see, and how easily they can take the next step. Each month has a clear priority and a record of what changed.",
    image: primaryServiceAssetByRoute["/services/ongoing-seo/"].src,
    alt: primaryServiceAssetByRoute["/services/ongoing-seo/"].alt,
    caption: "Local discovery · clear next steps",
  },
  "/services/web-design-redesign/": {
    title: "Web Design & Website Redesign",
    kicker: "A clear website that works well on phones and is easy to own",
    summary:
      "Repair, redesign, or build a website that quickly explains what you do, earns trust, and makes the next step obvious.",
    image: primaryServiceAssetByRoute["/services/web-design-redesign/"].src,
    alt: primaryServiceAssetByRoute["/services/web-design-redesign/"].alt,
    caption: "Clear pages · mobile-friendly · easy to own",
  },
  "/services/provider-rescue/": {
    title: "Website Migration & Provider Rescue",
    kicker: "Leave a difficult provider without losing what matters",
    summary:
      "Identify who controls your domain, website, forms, analytics, and email connections. Then move only what has been approved and check that the agreed website, forms, and customer contact paths still work.",
    image: primaryServiceAssetByRoute["/services/provider-rescue/"].src,
    alt: primaryServiceAssetByRoute["/services/provider-rescue/"].alt,
    caption: "Ownership · careful move · documented handoff",
  },
  "/services/research-audits-strategy/": {
    title: "Digital Research, SEO Audits & Strategy",
    kicker: "Know what to fix before paying for a larger project",
    summary:
      "Get a clear written answer about what is working, what is not, and what to do first, based on your website, search presence, market, and available data.",
    image: primaryServiceAssetByRoute["/services/research-audits-strategy/"].src,
    alt: primaryServiceAssetByRoute["/services/research-audits-strategy/"].alt,
    caption: "What we found · what matters · what comes next",
  },
  "/services/custom-digital-solutions/": {
    title: "Custom Web & Digital Solutions",
    kicker: "A small tool for repeated work",
    summary:
      "Build a focused tool or connect existing software when a repeated task wastes time or causes mistakes. First, confirm that custom work is the right answer.",
    image: primaryServiceAssetByRoute["/services/custom-digital-solutions/"].src,
    alt: primaryServiceAssetByRoute["/services/custom-digital-solutions/"].alt,
    caption: "One repeated task · one focused tool",
  },
} as const;

export type ServicePresentationRoute = keyof typeof servicePresentationByRoute;

export function isServicePresentationRoute(
  route: string,
): route is ServicePresentationRoute {
  return route in servicePresentationByRoute;
}
