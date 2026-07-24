import {
  commercialCorrections068,
  commercialNavigationLinks,
} from "./commercial/presentation";

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

const commercialLinks = commercialNavigationLinks();
const servicesOverview = commercialCorrections068.navigation.servicesOverview;

export const serviceHeaderLinks: ReadonlyArray<NavigationLink> = [
  servicesOverview,
  ...commercialLinks.services,
];

export const resourceHeaderLinks: ReadonlyArray<NavigationLink> = commercialLinks.resources;

const resourcesLabel = commercialLinks.primary.find(({ href }) => href === "/resources/")?.label;
if (!resourcesLabel) throw new Error("Commercial Resources navigation label is missing.");

export const resourceNavigationGroups: ReadonlyArray<ResourceNavigationGroup> = [
  { label: resourcesLabel, icon: "guides", items: resourceHeaderLinks },
];

export const primaryNavigation: ReadonlyArray<PrimaryNavigationItem> = commercialLinks.primary.map((link) => ({
  ...link,
  children: link.href === "/services/"
    ? serviceHeaderLinks
    : link.href === "/resources/"
      ? resourceHeaderLinks
      : undefined,
}));
