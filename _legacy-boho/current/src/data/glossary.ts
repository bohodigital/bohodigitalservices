export interface GlossaryItem {
  slug: string;
  term: string;
  category: string;
  shortDefinition: string;
  plainEnglish: string;
  href: string;
}

export const glossaryItems: GlossaryItem[] = [
  {
    slug: "seo",
    term: "SEO",
    category: "search basics",
    shortDefinition: "SEO is the practice of improving how easily the right people can find your site in search.",
    plainEnglish: "It helps your website show up when someone is actively looking for what you do.",
    href: "/ask-the-owl/dictionary/seo/"
  },
  {
    slug: "technical-seo",
    term: "Technical SEO",
    category: "search basics",
    shortDefinition: "Technical SEO covers the structural setup that helps search engines crawl, understand, and trust a website.",
    plainEnglish: "It is the under-the-hood work that keeps search visibility from getting quietly blocked.",
    href: "/ask-the-owl/dictionary/technical-seo/"
  },
  {
    slug: "crawlability",
    term: "Crawlability",
    category: "site structure",
    shortDefinition: "Crawlability describes how easily search engines can discover and move through your pages.",
    plainEnglish: "If search engines cannot move through the site cleanly, important pages may never get attention.",
    href: "/ask-the-owl/dictionary/crawlability/"
  },
  {
    slug: "indexing",
    term: "Indexing",
    category: "site structure",
    shortDefinition: "Indexing is the step where a search engine decides a page is worth storing and showing in results.",
    plainEnglish: "A crawled page is not useful if it never gets indexed.",
    href: "/ask-the-owl/dictionary/indexing/"
  },
  {
    slug: "dns",
    term: "DNS",
    category: "provider transfers",
    shortDefinition: "DNS connects your domain name to the services that actually run your website and email.",
    plainEnglish: "It is the routing layer that decides where traffic should go.",
    href: "/ask-the-owl/dictionary/dns/"
  },
  {
    slug: "hosting-provider",
    term: "Hosting provider",
    category: "provider transfers",
    shortDefinition: "A hosting provider is the company that serves your website files or application to visitors.",
    plainEnglish: "They provide the home your website lives in.",
    href: "/ask-the-owl/dictionary/hosting-provider/"
  },
  {
    slug: "google-search-console",
    term: "Google Search Console",
    category: "reporting",
    shortDefinition: "Google Search Console is Google’s own visibility and indexing dashboard for site owners.",
    plainEnglish: "It shows how Google sees the site and where visibility problems may be hiding.",
    href: "/ask-the-owl/dictionary/google-search-console/"
  },
  {
    slug: "search-intent",
    term: "Search intent",
    category: "search basics",
    shortDefinition: "Search intent is the reason someone is typing a query in the first place.",
    plainEnglish: "It helps you understand what the searcher actually wants, not just what words they used.",
    href: "/ask-the-owl/dictionary/search-intent/"
  },
  {
    slug: "content-cluster",
    term: "Content cluster",
    category: "content strategy",
    shortDefinition: "A content cluster is a group of related pages that support a core topic or service from different angles.",
    plainEnglish: "It turns scattered articles into a more coherent ecosystem.",
    href: "/ask-the-owl/dictionary/content-cluster/"
  },
  {
    slug: "metadata",
    term: "Metadata",
    category: "site structure",
    shortDefinition: "Metadata includes page-level signals like title tags and descriptions that help describe a page to search engines and people.",
    plainEnglish: "It is the short labeling layer that helps pages make sense before someone even clicks.",
    href: "/ask-the-owl/dictionary/metadata/"
  },
  {
    slug: "internal-links",
    term: "Internal links",
    category: "site structure",
    shortDefinition: "Internal links connect pages within your own site so people and search engines can move through the structure logically.",
    plainEnglish: "They are the built-in trail markers that help the whole site work as a system.",
    href: "/ask-the-owl/dictionary/internal-links/"
  },
  {
    slug: "redirect-map",
    term: "Redirect map",
    category: "provider transfers",
    shortDefinition: "A redirect map lists which old URLs should point to which new URLs during a migration.",
    plainEnglish: "It keeps links, bookmarks, and search value from falling into a ditch during a move.",
    href: "/ask-the-owl/dictionary/redirect-map/"
  },
  {
    slug: "seo-migration",
    term: "SEO migration",
    category: "provider transfers",
    shortDefinition: "SEO migration planning protects visibility while a site changes platforms, structure, or providers.",
    plainEnglish: "It is the disciplined version of moving a site instead of just hoping nothing breaks.",
    href: "/ask-the-owl/dictionary/seo-migration/"
  },
  {
    slug: "provider-lock-in",
    term: "Provider lock-in",
    category: "provider transfers",
    shortDefinition: "Provider lock-in happens when a vendor makes it unnecessarily hard to leave, transfer, or access your own setup.",
    plainEnglish: "If leaving feels strangely difficult, lock-in is often part of the problem.",
    href: "/ask-the-owl/dictionary/provider-lock-in/"
  },
  {
    slug: "link-farm",
    term: "Link farm",
    category: "bad seo",
    shortDefinition: "A link farm is a low-quality network created mainly to manufacture backlinks.",
    plainEnglish: "It creates fake-looking authority signals that can damage trust instead of building it.",
    href: "/ask-the-owl/dictionary/link-farm/"
  },
  {
    slug: "guaranteed-rankings",
    term: "Guaranteed rankings",
    category: "bad seo",
    shortDefinition: "Guaranteed ranking claims promise search outcomes nobody can honestly control.",
    plainEnglish: "It is a classic fox-trap phrase because search engines do not sell fixed outcomes to agencies.",
    href: "/ask-the-owl/dictionary/guaranteed-rankings/"
  },
  {
    slug: "vanity-metrics",
    term: "Vanity metrics",
    category: "reporting",
    shortDefinition: "Vanity metrics are numbers that look impressive without helping a team make better decisions.",
    plainEnglish: "They add sparkle, not clarity.",
    href: "/ask-the-owl/dictionary/vanity-metrics/"
  },
  {
    slug: "ai-assisted-workflow",
    term: "AI-assisted workflow",
    category: "operations",
    shortDefinition: "AI-assisted workflows use automation and language tools to speed up research, drafting, sorting, and analysis.",
    plainEnglish: "The point is not replacing judgment. It is using tools to reduce drag around repeatable work.",
    href: "/ask-the-owl/dictionary/ai-assisted-workflow/"
  },
  {
    slug: "climate-aware-workflow",
    term: "Climate-aware workflow",
    category: "impact",
    shortDefinition: "Climate-aware workflow design tries to reduce digital waste while being honest about the footprint of modern tools.",
    plainEnglish: "It means choosing leaner patterns and reporting impact carefully instead of pretending there is none.",
    href: "/ask-the-owl/dictionary/climate-aware-workflow/"
  }
];

export const glossaryBySlug = Object.fromEntries(
  glossaryItems.map((item) => [item.slug, item])
) as Record<string, GlossaryItem>;

export const glossaryCategories = Array.from(
  new Set(glossaryItems.map((item) => item.category))
);
