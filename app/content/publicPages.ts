const retiredPublicSlugs = new Set([
  "/services/ongoing-seo-growth/",
  "/services/local-seo-search-visibility/",
  "/services/lead-generation-conversion/",
  "/services/technical-seo-site-health/",
  "/services/website-design-redesign/",
  "/services/website-migration-provider-rescue/",
  "/services/research-audits-analytics/",
  "/services/custom-tools-automation/",
  "/learn/bad-seo-field-guide/",
  "/learn/small-business-seo/",
  "/learn/local-search/",
  "/learn/ai-search-visibility/",
  "/learn/featured-rank-builder/",
]);

export function isRetiredPublicPage(slug: string) {
  return slug === "/lab/" || slug.startsWith("/lab/") || retiredPublicSlugs.has(slug);
}
