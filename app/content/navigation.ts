import { canonicalServices } from "./commercialReset";

export type LocalHref = "/" | `/${string}` | `#${string}`;

export type NavigationLink = {
  label: string;
  href: LocalHref;
  description?: string;
  serviceName?: string;
  priceDisplay?: string;
  overview?: boolean;
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
  {
    label: "Provider Rescue",
    href: "/services/provider-rescue/",
    description:
      "Website Help from $200\nProvider Rescue is focused Website Help for ownership, access, continuity, migration, and provider-exit problems.",
    serviceName: "Provider Rescue",
    priceDisplay: "Website Help from $200",
  },
  ...canonicalServices.map((service) => ({
    label: service.label,
    href: service.route,
    description: `${service.priceDisplay}\n${service.dropdownDescription}`,
    serviceName: service.label,
    priceDisplay: service.priceDisplay,
  })),
];

export const serviceMenuLinks: ReadonlyArray<NavigationLink> = [
  {
    label: "All Services",
    href: "/services/",
    description: "Compare all four services and starting prices.",
    overview: true,
  },
  ...serviceHeaderLinks,
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
  { label: "Provider Rescue", href: "/services/provider-rescue/" },
  {
    label: "Services",
    href: "/services/",
    children: serviceMenuLinks,
  },
  { label: "Pricing", href: "/pricing/" },
  { label: "Demo Library", href: "/work/" },
  { label: "Practical guides", href: "/learn/" },
];
