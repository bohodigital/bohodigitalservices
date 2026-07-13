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
      { label: "Bad SEO Field Guide", href: "/learn/bad-seo-field-guide/" },
      { label: "Small-business SEO", href: "/learn/small-business-seo/" },
      { label: "Local search", href: "/learn/local-search/" },
      { label: "Website buying", href: "/learn/website-buying/" },
      { label: "Provider rescue", href: "/learn/provider-rescue/" },
      { label: "AI search visibility", href: "/learn/ai-search-visibility/" },
      { label: "Rank Builder research", href: "/learn/featured-rank-builder/" },
    ],
  },
  {
    label: "Tools & systems",
    icon: "tools",
    items: [
      { label: "Tool catalog", href: "/tools/" },
      { label: "How website delivery works", href: "/tools/#how-it-works" },
      { label: "Official source register", href: "/tools/#official-sources" },
    ],
  },
  {
    label: "Lab & evidence",
    icon: "lab",
    items: [
      { label: "Open the Lab", href: "/lab/" },
      { label: "Claims we refuse to make", href: "/lab/claims-we-refuse-to-make/" },
      { label: "Local market reports", href: "/lab/local-market-reports/" },
      { label: "Market map examples", href: "/lab/market-map-examples/" },
      { label: "Website quality surveys", href: "/lab/website-quality-surveys/" },
      { label: "Success-signal studies", href: "/lab/success-signal-studies/" },
      { label: "Public experiments", href: "/lab/public-experiments/" },
      { label: "Work log", href: "/lab/work-log/" },
      { label: "In-house brands", href: "/lab/in-house-brands/" },
      { label: "Example reports", href: "/lab/example-reports/" },
      { label: "Public teardowns", href: "/lab/public-teardowns/" },
      { label: "Tools & templates", href: "/lab/tools-and-templates/" },
    ],
  },
];

export const resourceHeaderLinks: ReadonlyArray<NavigationLink> = [
  {
    label: "Resources overview",
    href: "/resources/",
    description: "Start with a question, guide, tool, or evidence trail.",
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
    label: "Tools & systems",
    href: "/tools/",
    description: "Inspect the technology, ownership, and delivery model.",
  },
  {
    label: "Open the Lab",
    href: "/lab/",
    description: "Review research, experiments, work logs, and evidence rules.",
  },
  {
    label: "Claims & evidence standards",
    href: "/lab/claims-we-refuse-to-make/",
    description: "See the promises and proof shortcuts Boho will not sell.",
  },
];

export const primaryNavigation: ReadonlyArray<PrimaryNavigationItem> = [
  { label: "Services", href: "/services/" },
  { label: "Industries", href: "/industries/" },
  { label: "Resources", href: "/resources/", children: resourceHeaderLinks },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
];
