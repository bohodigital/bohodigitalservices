import { canonicalServices } from "./commercialReset";

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

export const serviceHeaderLinks: ReadonlyArray<NavigationLink> =
  canonicalServices.map((service) => ({
    label: service.label,
    href: service.route,
    description: `${service.priceDisplay}\n${service.dropdownDescription}`,
  }));

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
  {
    label: "Services",
    href: "/services/",
    children: serviceHeaderLinks,
  },
  { label: "Work", href: "/work/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];
