import { glossaryEntries, type GlossaryEntry } from "./knowledge";

export const glossaryHubPath = "/learn/glossary/" as const;

export function glossaryPath(entryOrSlug: GlossaryEntry | string) {
  const slug = typeof entryOrSlug === "string" ? entryOrSlug : entryOrSlug.slug;
  return `${glossaryHubPath}${slug}/` as const;
}

export function glossaryMetaDescription(entry: GlossaryEntry, maximumLength = 160) {
  const normalized = entry.shortDefinition.replace(/\s+/g, " ").trim();
  if (normalized.length <= maximumLength) return normalized;

  const candidate = normalized.slice(0, maximumLength - 1);
  const lastSpace = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, Math.max(lastSpace, maximumLength - 24)).trimEnd()}…`;
}

export const glossaryRoutes = glossaryEntries.map((entry) => ({
  entry,
  path: glossaryPath(entry),
}));

export const glossaryRoutesBySlug = new Map(
  glossaryRoutes.map((route) => [route.entry.slug, route]),
);
