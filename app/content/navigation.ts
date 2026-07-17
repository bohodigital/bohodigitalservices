export type LocalHref = "/" | `/${string}` | `#${string}`;

export type NavigationLink = {
  label: string;
  href: LocalHref;
  description?: string;
};

export type PrimaryNavigationItem = NavigationLink & {
  children?: ReadonlyArray<NavigationLink>;
};

export type ResourceNavigationGroup = {
  label: string;
  icon: "guides" | "reference";
  items: ReadonlyArray<NavigationLink>;
};

export const resourceNavigationGroups: ReadonlyArray<ResourceNavigationGroup> = [
  {
    label: "Buyer guidance",
    icon: "guides",
    items: [
      { label: "Website buying", href: "/learn/website-buying/" },
      { label: "Provider rescue", href: "/learn/provider-rescue/" },
    ],
  },
  {
    label: "Reference",
    icon: "reference",
    items: [
      { label: "Plain-language glossary", href: "/learn/glossary/" },
    ],
  },
];

export const serviceHeaderLinks: ReadonlyArray<NavigationLink> = [
  {
    label: "Ongoing SEO & Search Growth",
    href: "/services/ongoing-seo/",
    description: "Local discovery, trust, lead paths, and measurement working as one system.",
  },
  {
    label: "Web Design & Website Redesign",
    href: "/services/web-design-redesign/",
    description: "Useful, owned websites with an explicit managed-hosting provision.",
  },
  {
    label: "Website Migration & Provider Rescue",
    href: "/services/provider-rescue/",
    description: "Recover control, preserve value, migrate carefully, and document the result.",
  },
  {
    label: "Custom Web & Digital Solutions",
    href: "/services/custom-digital-solutions/",
    description: "Practical internal tools and automations for repeated operational work.",
  },
  {
    label: "Digital Research, SEO Audits & Strategy",
    href: "/services/research-audits-strategy/",
    description: "Evidence, measurement, and improvement tied to a real decision.",
  },
];

export const resourceHeaderLinks: ReadonlyArray<NavigationLink> = [
  {
    label: "Resources overview",
    href: "/resources/",
    description: "Commercial buyer guidance and plain-language definitions.",
  },
  {
    label: "Website buying",
    href: "/learn/website-buying/",
    description: "Plan scope, ownership, content, hosting, and migration risk.",
  },
  {
    label: "Provider rescue",
    href: "/learn/provider-rescue/",
    description: "Protect ownership, access, useful URLs, data, and continuity.",
  },
  {
    label: "Glossary",
    href: "/learn/glossary/",
    description: "Translate technical language into business decisions.",
  },
];

export const primaryNavigation: ReadonlyArray<PrimaryNavigationItem> = [
  { label: "Services", href: "/services/", children: serviceHeaderLinks },
  { label: "Industries", href: "/industries/" },
  { label: "Tools", href: "/tools/" },
  { label: "Resources", href: "/resources/", children: resourceHeaderLinks },
  { label: "About", href: "/about/" },
];
