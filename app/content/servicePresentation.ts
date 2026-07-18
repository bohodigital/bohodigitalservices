export const servicePresentationByRoute = {
  "/services/ongoing-seo/": {
    kicker: "Help the right local customers find and contact you",
    summary:
      "Improve how your business appears in search, what customers see, and how easily they can take the next step. Each month has a clear priority and a record of what changed.",
    image: "/visuals/services/ongoing-seo-v1.webp",
    alt: "Mixed-media illustration tracing a path from local search and a map pin to a customer call.",
    caption: "Local discovery · clear next steps",
  },
  "/services/web-design-redesign/": {
    kicker: "A clear website that works well on phones and is easy to own",
    summary:
      "Repair, redesign, or build a website that quickly explains what you do, earns trust, and makes the next step obvious.",
    image: "/visuals/services/web-design-redesign-v1.webp",
    alt: "Mixed-media illustration of one clear business website planned for desktop and mobile.",
    caption: "Clear pages · mobile-friendly · easy to own",
  },
  "/services/provider-rescue/": {
    kicker: "Leave a difficult provider without losing what matters",
    summary:
      "Identify who controls your domain, website, forms, analytics, and email connections. Then move only what has been approved and check that the agreed website, forms, and customer contact paths still work.",
    image: "/visuals/services/provider-rescue-v1.webp",
    alt: "Mixed-media illustration of website pages and account assets crossing a bridge toward an organized handoff.",
    caption: "Ownership · careful move · documented handoff",
  },
  "/services/research-audits-strategy/": {
    kicker: "Know what to fix before paying for a larger project",
    summary:
      "Get a clear written answer about what is working, what is not, and what to do first, based on your website, search presence, market, and available data.",
    image: "/visuals/services/research-audits-strategy-v1.webp",
    alt: "Mixed-media illustration of website evidence being narrowed into three practical priorities.",
    caption: "What we found · what matters · what comes next",
  },
  "/services/custom-digital-solutions/": {
    kicker: "A small tool for repeated work",
    summary:
      "Build a focused tool or connect existing software when a repeated task wastes time or causes mistakes. First, confirm that custom work is the right answer.",
    image: "/visuals/services/custom-digital-solutions-v1.webp",
    alt: "Mixed-media illustration of a form moving through human review into a shared record and notification.",
    caption: "One repeated task · one focused tool",
  },
} as const;

export type ServicePresentationRoute = keyof typeof servicePresentationByRoute;

export function isServicePresentationRoute(
  route: string,
): route is ServicePresentationRoute {
  return route in servicePresentationByRoute;
}
