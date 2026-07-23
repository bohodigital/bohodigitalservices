import type { GlossaryCluster, GlossaryEntry } from "./knowledge";

export const relatedSystemFamilyByCluster: Record<
  GlossaryCluster,
  { label: string; href: `/tools/#family-${string}` }
> = {
  "Domains and ownership": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Hosting and delivery": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Source control and deployment": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Websites and content systems": { label: "Websites & Publishing", href: "/tools/#family-websites-publishing" },
  "Search and local visibility": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "Analytics and measurement": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "APIs and integrations": { label: "Secure Integrations & Custom Tools", href: "/tools/#family-secure-integrations-custom-tools" },
  "Automation and agent systems": { label: "Operations & Automation", href: "/tools/#family-operations-automation" },
  "Security and access": { label: "Secure Integrations & Custom Tools", href: "/tools/#family-secure-integrations-custom-tools" },
  "Privacy and data governance": { label: "Secure Integrations & Custom Tools", href: "/tools/#family-secure-integrations-custom-tools" },
  "Leads and conversion": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "AI and language-model infrastructure": { label: "Operations & Automation", href: "/tools/#family-operations-automation" },
  "Research and quantitative methods": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
};

export function reviewedLabel(value: GlossaryEntry["lastReviewed"]) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
