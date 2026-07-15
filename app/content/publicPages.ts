const retiredPublicSlugs = new Set([
  "/pricing/",
  "/learn/bad-seo-field-guide/",
  "/learn/small-business-seo/",
  "/learn/local-search/",
  "/learn/ai-search-visibility/",
  "/learn/featured-rank-builder/",
]);

export function isRetiredPublicPage(slug: string) {
  return slug === "/lab/" || slug.startsWith("/lab/") || retiredPublicSlugs.has(slug);
}
