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
  icon: "guides" | "tools" | "lab";
  items: ReadonlyArray<NavigationLink>;
};

export const resourceNavigationGroups: ReadonlyArray<ResourceNavigationGroup> = [
  {
    label: "Guides & definitions",
    icon: "guides",
    items: [
      { label: "Practical guides", href: "/learn/" },
      { label: "Plain-language glossary", href: "/learn/glossary/" },
      { label: "Website buying", href: "/learn/website-buying/" },
      { label: "Provider rescue", href: "/learn/provider-rescue/" },
    ],
  },
  {
    label: "Tools & systems",
    icon: "tools",
    items: [
      { label: "Governed capability index", href: "/tools/" },
      { label: "How website delivery works", href: "/tools/#how-it-works" },
      { label: "Capability classifications", href: "/tools/#classifications" },
    ],
  },
  {
    label: "Lab & evidence",
    icon: "lab",
    items: [
      { label: "Claims we refuse to make", href: "/lab/claims-we-refuse-to-make/" },
      { label: "Archive and experiments", href: "/lab/" },
    ],
  },
];

export const serviceHeaderLinks: ReadonlyArray<NavigationLink> = [
  {
    label: "Local Visibility & Lead Systems",
    href: "/services/local-seo-search-visibility/",
    description: "Local discovery, trust, lead paths, and measurement working as one system.",
  },
  {
    label: "Websites & Managed Hosting",
    href: "/services/website-design-redesign/",
    description: "Useful, owned websites with an explicit managed-hosting provision.",
  },
  {
    label: "Provider Rescue & Migration",
    href: "/services/website-migration-provider-rescue/",
    description: "Recover control, preserve value, migrate carefully, and document the result.",
  },
  {
    label: "Custom Tools & Automation",
    href: "/services/custom-tools-automation/",
    description: "Practical internal tools and automations for repeated operational work.",
  },
  {
    label: "Research, Analytics & Improvement",
    href: "/services/research-audits-analytics/",
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
    label: "Practical guides",
    href: "/learn/",
    description: "Understand website, search, and provider decisions.",
  },
  {
    label: "Glossary",
    href: "/learn/glossary/",
    description: "Translate technical language into business decisions.",
  },
  {
    label: "Claims & evidence standards",
    href: "/lab/claims-we-refuse-to-make/",
    description: "See the promises and proof shortcuts Boho will not sell.",
  },
];

export const primaryNavigation: ReadonlyArray<PrimaryNavigationItem> = [
  { label: "Services", href: "/services/", children: serviceHeaderLinks },
  { label: "Industries", href: "/industries/" },
  { label: "Tools", href: "/tools/" },
  { label: "Resources", href: "/resources/", children: resourceHeaderLinks },
  { label: "About", href: "/about/" },
];
