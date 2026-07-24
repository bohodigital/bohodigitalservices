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

export const serviceHeaderLinks: ReadonlyArray<NavigationLink> = [
  { label: "Local Visibility & Lead Systems", href: "/services/ongoing-seo/" },
  { label: "Websites & Managed Hosting", href: "/services/web-design-redesign/" },
  { label: "Provider Rescue & Migration", href: "/services/provider-rescue/" },
  { label: "Custom Tools & Automation", href: "/services/custom-digital-solutions/" },
  { label: "Research, Analytics & Improvement", href: "/services/research-audits-strategy/" },
];

export const resourceHeaderLinks: ReadonlyArray<NavigationLink> = [
  { label: "Resources overview", href: "/resources/" },
  { label: "Website buying", href: "/learn/website-buying/" },
  { label: "Provider rescue", href: "/learn/provider-rescue/" },
  { label: "Plain-language glossary", href: "/learn/glossary/" },
];

export const resourceNavigationGroups: ReadonlyArray<ResourceNavigationGroup> = [
  { label: "Resources", icon: "guides", items: resourceHeaderLinks },
];

export const primaryNavigation: ReadonlyArray<PrimaryNavigationItem> = [
  { label: "Services", href: "/services/", children: serviceHeaderLinks },
  { label: "Industries", href: "/industries/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Work", href: "/work/" },
  { label: "Resources", href: "/resources/", children: resourceHeaderLinks },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
