export type DictionaryCategory =
  | "SEO Basics"
  | "Technical SEO"
  | "Content Strategy"
  | "Local SEO"
  | "Analytics & Reporting"
  | "Provider Transfers"
  | "AI & Digital Tools"
  | "Bad SEO / Fox Traps"
  | "Performance & Sustainability";

export interface DictionaryEntry {
  term: string;
  slug: string;
  category: DictionaryCategory;
  shortDefinition: string;
  plainEnglish: string;
  whyItMatters: string;
  watchFor: string;
  askThis: string;
  relatedServices: string[];
  relatedTerms: string[];
  fieldGuideLinks?: string[];
}

const fieldGuide = ["/bad-seo-field-guide/"];

export const getDictionaryEntryHref = (slug: string) =>
  `/ask-the-owl/dictionary/${slug}/`;

export const dictionaryEntries: DictionaryEntry[] = [
  {
    term: "SEO",
    slug: "seo",
    category: "SEO Basics",
    shortDefinition:
      "SEO stands for search engine optimization: the work of making a website easier for search engines and people to find, understand, and trust.",
    plainEnglish:
      "SEO is the practical work of helping the right pages show up for the right searches. It includes technical setup, useful content, clear page structure, and measurement that connects search visibility to real decisions.",
    whyItMatters:
      "If people cannot find the business when they are searching for the problem it solves, the website has to work much harder everywhere else.",
    watchFor:
      "Be careful with SEO plans that promise fixed rankings, hide the work being done, or focus only on traffic without explaining quality, intent, or conversions.",
    askThis:
      "What specific pages, search intents, and business outcomes is this SEO work meant to improve?",
    relatedServices: [
      "seo-growth-audit",
      "technical-seo-cleanup",
      "content-ecosystem-buildout",
    ],
    relatedTerms: [
      "organic-search",
      "search-intent",
      "technical-seo",
      "google-search-console",
    ],
  },
  {
    term: "Organic search",
    slug: "organic-search",
    category: "SEO Basics",
    shortDefinition:
      "Organic search is unpaid visibility from search engine results, separate from ads.",
    plainEnglish:
      "Organic search is what happens when someone finds a page because a search engine decided it was a useful match, not because the business paid for that click.",
    whyItMatters:
      "Organic visibility can become a durable source of qualified visits when the site answers real questions and keeps its technical foundation healthy.",
    watchFor:
      "Organic search is not free magic. It still takes strategy, maintenance, content quality, and time.",
    askThis:
      "Which organic visits are turning into useful inquiries, and which are just noise?",
    relatedServices: ["seo-growth-audit", "analytics-reporting"],
    relatedTerms: ["seo", "serp", "query", "conversion"],
  },
  {
    term: "SERP",
    slug: "serp",
    category: "SEO Basics",
    shortDefinition:
      "SERP means search engine results page: the page someone sees after running a search.",
    plainEnglish:
      "A SERP is the result screen with links, map packs, ads, featured snippets, videos, images, and other search features competing for attention.",
    whyItMatters:
      "The layout of the results page changes how visible a business really is, even when a page technically ranks.",
    watchFor:
      "Do not treat rank position alone as the whole story. Ads, maps, snippets, and search intent can change what people actually click.",
    askThis:
      "What does the results page actually look like for the searches we care about?",
    relatedServices: ["seo-growth-audit", "local-seo-foundation"],
    relatedTerms: ["keyword", "query", "click-through-rate", "local-seo"],
  },
  {
    term: "Keyword",
    slug: "keyword",
    category: "SEO Basics",
    shortDefinition:
      "A keyword is a word or phrase used to describe the topic a page is trying to match in search.",
    plainEnglish:
      "Keywords are labels for demand. They help organize what people search for, but they are only useful when paired with the intent behind the search.",
    whyItMatters:
      "Keyword research helps choose pages, headings, and content priorities instead of guessing what customers call the problem.",
    watchFor:
      "Keyword stuffing and chasing volume without intent can make pages worse instead of more useful.",
    askThis: "What does someone using this keyword actually want next?",
    relatedServices: ["seo-growth-audit", "content-ecosystem-buildout"],
    relatedTerms: [
      "query",
      "search-intent",
      "keyword-stuffing",
      "content-brief",
    ],
  },
  {
    term: "Query",
    slug: "query",
    category: "SEO Basics",
    shortDefinition:
      "A query is the actual phrase someone types or speaks into a search engine.",
    plainEnglish:
      "The keyword is often the planning label. The query is what the person really searched, including the messy wording, location, comparison, or question.",
    whyItMatters:
      "Real query data shows how people describe their needs, which can sharpen service pages and reporting.",
    watchFor:
      "Do not flatten every query into one broad keyword. Different wording can reveal different levels of urgency or intent.",
    askThis:
      "Which queries are bringing impressions, clicks, and useful leads?",
    relatedServices: ["seo-growth-audit", "analytics-reporting"],
    relatedTerms: [
      "keyword",
      "search-intent",
      "google-search-console",
      "impressions",
    ],
  },
  {
    term: "Search intent",
    slug: "search-intent",
    category: "SEO Basics",
    shortDefinition:
      "Search intent is the reason behind a search: what the person actually wants to learn, compare, buy, or do.",
    plainEnglish:
      "Search intent asks what job the search is trying to complete. A page for someone comparing providers should not read like a glossary entry, and a beginner guide should not behave like a checkout page.",
    whyItMatters:
      "Pages perform better when the format, depth, and call to action match what the searcher is ready for.",
    watchFor:
      "Ranking for the wrong intent can bring traffic that does not trust, inquire, or buy.",
    askThis:
      "Is this page built for the decision the searcher is actually trying to make?",
    relatedServices: [
      "content-ecosystem-buildout",
      "website-optimization",
      "seo-growth-audit",
    ],
    relatedTerms: [
      "keyword",
      "service-page",
      "landing-page",
      "helpful-content",
    ],
  },
  {
    term: "Crawlability",
    slug: "crawlability",
    category: "Technical SEO",
    shortDefinition:
      "Crawlability describes how easily search engines can discover and move through the pages on your website.",
    plainEnglish:
      "If a site has clear paths, internal links, clean URLs, and no accidental blocks, search engines can move through it more reliably.",
    whyItMatters:
      "Important pages cannot earn visibility if search engines cannot find them or understand how they connect.",
    watchFor:
      "Broken links, buried pages, blocked resources, confusing navigation, and endless duplicate URLs can all make crawling harder.",
    askThis:
      "Can search engines reach the pages that matter without relying on luck?",
    relatedServices: ["technical-seo-cleanup", "seo-growth-audit"],
    relatedTerms: ["indexing", "robots-txt", "sitemap", "internal-links"],
  },
  {
    term: "Indexing",
    slug: "indexing",
    category: "Technical SEO",
    shortDefinition:
      "Indexing is the process search engines use to store and organize pages so they can appear in search results.",
    plainEnglish:
      "After a page is discovered, a search engine still has to decide whether it belongs in the index. Indexing is the difference between being found by the crawler and being eligible to show in results.",
    whyItMatters:
      "A page that is not indexed usually cannot bring organic search traffic, even if the copy is strong.",
    watchFor:
      "Noindex tags, duplicate pages, weak content, canonical mistakes, and crawl problems can keep useful pages out of the index.",
    askThis:
      "Which important pages are indexed, and which are being ignored or excluded?",
    relatedServices: ["technical-seo-cleanup", "seo-growth-audit"],
    relatedTerms: [
      "crawlability",
      "canonical-url",
      "google-search-console",
      "thin-content",
    ],
  },
  {
    term: "Technical SEO",
    slug: "technical-seo",
    category: "Technical SEO",
    shortDefinition:
      "Technical SEO is behind-the-scenes website work that helps search engines crawl, understand, and index your pages.",
    plainEnglish:
      "If your website is a forest, technical SEO is the root system, trail map, and soil health. It is not the whole strategy, but weak technical foundations make every other SEO effort harder.",
    whyItMatters:
      "Without a healthy technical foundation, even strong content can be hard for search engines to find, trust, or maintain in results.",
    watchFor:
      "Be wary when every technical warning is treated as an emergency. The useful work is prioritizing what actually affects visibility, maintenance, or measurement.",
    askThis:
      "Which technical issues are most likely to affect crawlability, indexing, or user trust?",
    relatedServices: [
      "technical-seo-cleanup",
      "seo-growth-audit",
      "provider-transfer",
    ],
    relatedTerms: ["crawlability", "indexing", "metadata", "sitemap"],
  },
  {
    term: "On-page SEO",
    slug: "on-page-seo",
    category: "Technical SEO",
    shortDefinition:
      "On-page SEO is the work of making an individual page clearer for search engines and visitors.",
    plainEnglish:
      "On-page SEO includes titles, headings, copy structure, internal links, schema, image context, and the visible usefulness of the page itself.",
    whyItMatters:
      "Search engines and people both need enough page-level clarity to understand what the page is for.",
    watchFor:
      "A page can be technically polished and still fail if the offer is vague, the content is thin, or the call to action is confusing.",
    askThis:
      "Does this page clearly answer the searcher and guide them to the next useful step?",
    relatedServices: [
      "website-optimization",
      "content-ecosystem-buildout",
      "seo-growth-audit",
    ],
    relatedTerms: [
      "metadata",
      "heading-structure",
      "internal-links",
      "service-page",
    ],
  },
  {
    term: "Metadata",
    slug: "metadata",
    category: "Technical SEO",
    shortDefinition:
      "Metadata is page information, such as title tags and meta descriptions, that helps describe a page to search engines and sometimes searchers.",
    plainEnglish:
      "Metadata is not the whole page. It is the label on the drawer. Good labels help search engines and people understand what they are looking at.",
    whyItMatters:
      "Clear metadata can improve understanding, click quality, and maintenance during audits or migrations.",
    watchFor:
      "Duplicate, missing, misleading, or overstuffed metadata can make a site look careless and harder to diagnose.",
    askThis:
      "Does each important page have metadata that matches its real purpose?",
    relatedServices: ["technical-seo-cleanup", "website-optimization"],
    relatedTerms: [
      "title-tag",
      "meta-description",
      "on-page-seo",
      "duplicate-content",
    ],
  },
  {
    term: "Title tag",
    slug: "title-tag",
    category: "Technical SEO",
    shortDefinition:
      "A title tag is the HTML page title search engines often use as the main clickable headline in results.",
    plainEnglish:
      "The title tag tells search engines and searchers what a page is about. It should be specific enough to be useful without pretending to be every page on the site.",
    whyItMatters:
      "A clear title tag can help search engines classify the page and help people decide whether to click.",
    watchFor:
      "Watch for missing titles, duplicated titles, keyword-stuffed titles, and titles that do not match the page content.",
    askThis:
      "Would this title make sense to someone scanning search results quickly?",
    relatedServices: ["technical-seo-cleanup", "website-optimization"],
    relatedTerms: [
      "metadata",
      "meta-description",
      "serp",
      "click-through-rate",
    ],
  },
  {
    term: "Meta description",
    slug: "meta-description",
    category: "Technical SEO",
    shortDefinition:
      "A meta description is a short page summary that search engines may show below the title in search results.",
    plainEnglish:
      "A meta description is a pitch for the page, not a ranking spell. It should help a person understand why the page is worth opening.",
    whyItMatters:
      "Useful descriptions can improve click quality and make pages easier to audit at scale.",
    watchFor:
      "Avoid vague, duplicated, or overpromising descriptions that make every page sound the same.",
    askThis:
      "Does this description tell the right person what they will get from the page?",
    relatedServices: ["technical-seo-cleanup", "website-optimization"],
    relatedTerms: ["metadata", "title-tag", "click-through-rate"],
  },
  {
    term: "Heading structure",
    slug: "heading-structure",
    category: "Technical SEO",
    shortDefinition:
      "Heading structure is the organized use of page headings to show what the content covers and how sections relate.",
    plainEnglish:
      "Headings are the outline of the page. They help visitors scan and help search engines understand the page without reading it like a mystery novel.",
    whyItMatters:
      "A clear heading structure improves readability, accessibility, and content maintenance.",
    watchFor:
      "Watch for multiple confusing H1s, skipped structure, headings used only for visual styling, or generic labels that hide the point of the page.",
    askThis:
      "Can someone scan the headings and understand the page before reading every paragraph?",
    relatedServices: ["technical-seo-cleanup", "website-optimization"],
    relatedTerms: ["on-page-seo", "metadata", "service-page"],
  },
  {
    term: "Canonical URL",
    slug: "canonical-url",
    category: "Technical SEO",
    shortDefinition:
      "A canonical URL tells search engines which version of a similar or duplicate page should be treated as the main one.",
    plainEnglish:
      "Canonical tags are a way to say, 'This is the version that counts.' They are useful when filters, tracking parameters, or duplicate paths create multiple versions of similar content.",
    whyItMatters:
      "Canonical signals help consolidate attention and reduce confusion around duplicate or near-duplicate pages.",
    watchFor:
      "Bad canonical tags can point search engines away from important pages or hide problems during migrations.",
    askThis:
      "Is the canonical pointing to the page we actually want search engines to trust?",
    relatedServices: ["technical-seo-cleanup", "provider-transfer"],
    relatedTerms: [
      "duplicate-content",
      "indexing",
      "url-structure",
      "seo-migration",
    ],
  },
  {
    term: "Sitemap",
    slug: "sitemap",
    category: "Technical SEO",
    shortDefinition:
      "A sitemap is a file that lists important URLs so search engines can discover and understand site structure more easily.",
    plainEnglish:
      "A sitemap is not a substitute for good internal links. It is a helpful map that tells search engines which pages matter.",
    whyItMatters:
      "Sitemaps are especially useful during audits, launches, and migrations because they expose what the site thinks is important.",
    watchFor:
      "Do not let old, redirected, broken, or low-value URLs pile up in the sitemap.",
    askThis: "Does the sitemap list the pages we actually want indexed?",
    relatedServices: ["technical-seo-cleanup", "provider-transfer"],
    relatedTerms: ["crawlability", "indexing", "robots-txt", "seo-migration"],
  },
  {
    term: "Robots.txt",
    slug: "robots-txt",
    category: "Technical SEO",
    shortDefinition:
      "Robots.txt is a file that gives crawlers instructions about which parts of a site they should or should not crawl.",
    plainEnglish:
      "Robots.txt is like a sign at the trailhead. It can guide crawlers away from areas, but it should be handled carefully because one wrong rule can hide important paths.",
    whyItMatters:
      "Robots rules can affect crawl access during launches, migrations, and technical cleanup.",
    watchFor:
      "Watch for accidental sitewide blocks, outdated staging rules, and rules used to hide problems instead of fixing them.",
    askThis: "Are we blocking anything important from being crawled?",
    relatedServices: ["technical-seo-cleanup", "provider-transfer"],
    relatedTerms: ["crawlability", "sitemap", "indexing"],
  },
  {
    term: "Internal links",
    slug: "internal-links",
    category: "Technical SEO",
    shortDefinition:
      "Internal links are links from one page on your website to another. They help users navigate and help search engines understand structure.",
    plainEnglish:
      "Internal links are the paths between pages. They show what belongs together, what matters most, and where a visitor should go next.",
    whyItMatters:
      "A strong internal linking pattern helps important pages get found, understood, and supported by related content.",
    watchFor:
      "Avoid accidental link paths, orphaned service pages, vague anchor text, and buried pages that need to drive inquiries.",
    askThis: "Do our important pages receive useful links from related pages?",
    relatedServices: [
      "content-ecosystem-buildout",
      "technical-seo-cleanup",
      "website-optimization",
    ],
    relatedTerms: [
      "anchor-text",
      "content-cluster",
      "pillar-page",
      "crawlability",
    ],
  },
  {
    term: "Anchor text",
    slug: "anchor-text",
    category: "Technical SEO",
    shortDefinition: "Anchor text is the clickable text used in a link.",
    plainEnglish:
      "Anchor text sets expectations. A link that says 'pricing' should go to pricing, and a link that says 'technical SEO cleanup' should help both visitors and search engines understand the destination.",
    whyItMatters:
      "Clear anchor text improves navigation, accessibility, and topic relationships between pages.",
    watchFor:
      "Avoid vague link text, keyword-stuffed links, and links that promise something the destination page does not deliver.",
    askThis: "Does this link text clearly explain where the click goes?",
    relatedServices: ["content-ecosystem-buildout", "website-optimization"],
    relatedTerms: ["internal-links", "content-cluster", "service-page"],
  },
  {
    term: "URL structure",
    slug: "url-structure",
    category: "Technical SEO",
    shortDefinition:
      "URL structure is the way page addresses are organized and named across a website.",
    plainEnglish:
      "Clean URLs are readable paths. They should make sense to humans, avoid unnecessary clutter, and stay stable enough that links do not constantly break.",
    whyItMatters:
      "URL structure affects maintenance, redirects, reporting, and how easy a site is to audit.",
    watchFor:
      "Messy parameters, duplicate paths, old URLs, and unnecessary renaming can create avoidable redirect work.",
    askThis:
      "Will this URL still make sense to people and reports six months from now?",
    relatedServices: ["technical-seo-cleanup", "provider-transfer"],
    relatedTerms: [
      "redirect-map",
      "301-redirect",
      "canonical-url",
      "seo-migration",
    ],
  },
  {
    term: "Schema markup",
    slug: "schema-markup",
    category: "Technical SEO",
    shortDefinition:
      "Schema markup is structured data that helps search engines understand specific information on a page.",
    plainEnglish:
      "Schema is extra labeling in the code. It can identify things like organizations, services, FAQs, articles, products, or local business details.",
    whyItMatters:
      "Good schema can make page meaning clearer and support eligible search features when the content genuinely matches.",
    watchFor:
      "Schema should describe what is actually on the page. Fake or mismatched markup is not a strategy.",
    askThis: "Does the schema reflect visible, truthful page content?",
    relatedServices: ["technical-seo-cleanup", "local-seo-foundation"],
    relatedTerms: ["on-page-seo", "service-page", "google-business-profile"],
  },
  {
    term: "Content cluster",
    slug: "content-cluster",
    category: "Content Strategy",
    shortDefinition:
      "A content cluster is a group of related pages connected around one larger topic to build depth, usefulness, and authority.",
    plainEnglish:
      "A cluster turns scattered pages into a system. The core page handles the main topic, and supporting pages answer related questions or use cases.",
    whyItMatters:
      "Clusters help visitors and search engines understand that the site covers a topic with depth instead of isolated one-off posts.",
    watchFor:
      "Do not build clusters by publishing thin variations of the same article. Each page needs a reason to exist.",
    askThis:
      "What core page does this content support, and what unique job does it do?",
    relatedServices: ["content-ecosystem-buildout", "seo-growth-audit"],
    relatedTerms: [
      "pillar-page",
      "internal-links",
      "search-intent",
      "topical-authority",
    ],
  },
  {
    term: "Pillar page",
    slug: "pillar-page",
    category: "Content Strategy",
    shortDefinition:
      "A pillar page is a central page that covers a broad topic and links to more specific supporting pages.",
    plainEnglish:
      "The pillar page is the hub. It gives the topic a home and makes the related cluster easier to understand.",
    whyItMatters:
      "Pillar pages can organize content strategy and keep useful pages from drifting into blog sprawl.",
    watchFor:
      "A pillar page should not become a bloated everything-page that answers nothing well.",
    askThis:
      "What supporting pages should this pillar connect to, and what should stay separate?",
    relatedServices: ["content-ecosystem-buildout", "website-optimization"],
    relatedTerms: ["content-cluster", "internal-links", "topical-authority"],
  },
  {
    term: "Service page",
    slug: "service-page",
    category: "Content Strategy",
    shortDefinition:
      "A service page explains a specific service, who it helps, what it fixes, and what the next step should be.",
    plainEnglish:
      "A service page is not just a card with a nicer headline. It should make the offer understandable, useful, and findable.",
    whyItMatters:
      "Service pages are often the pages that connect search demand to real inquiries.",
    watchFor:
      "Watch for vague service pages that could describe any agency, any offer, or no offer at all.",
    askThis:
      "Can a visitor understand the service and decide whether to ask about it?",
    relatedServices: [
      "website-optimization",
      "content-ecosystem-buildout",
      "seo-growth-audit",
    ],
    relatedTerms: [
      "landing-page",
      "search-intent",
      "on-page-seo",
      "conversion",
    ],
  },
  {
    term: "Landing page",
    slug: "landing-page",
    category: "Content Strategy",
    shortDefinition:
      "A landing page is a page designed around a specific audience, offer, campaign, or next action.",
    plainEnglish:
      "A landing page should reduce friction. It keeps the visitor focused on the problem, proof, offer, and next step.",
    whyItMatters:
      "Clear landing pages can improve conversion quality by matching the page to a specific source or intent.",
    watchFor:
      "A landing page can fail when it is visually loud but strategically vague.",
    askThis: "What action is this page built to support, and who is it for?",
    relatedServices: ["website-optimization", "analytics-reporting"],
    relatedTerms: ["service-page", "conversion", "search-intent"],
  },
  {
    term: "Thin content",
    slug: "thin-content",
    category: "Content Strategy",
    shortDefinition:
      "Thin content is content that gives too little useful information to satisfy the visitor or search intent.",
    plainEnglish:
      "Thin content often looks like a page that exists because someone wanted another keyword target, not because the visitor needed that page.",
    whyItMatters:
      "Too many weak pages can make a site less useful and harder to trust.",
    watchFor:
      "Watch for near-empty city pages, generic AI posts, copied service blurbs, and pages with no clear next step.",
    askThis:
      "Would this page still deserve to exist without the keyword target?",
    relatedServices: ["content-ecosystem-buildout", "seo-growth-audit"],
    relatedTerms: [
      "duplicate-content",
      "content-pruning",
      "helpful-content",
      "fake-local-page",
    ],
  },
  {
    term: "Duplicate content",
    slug: "duplicate-content",
    category: "Content Strategy",
    shortDefinition:
      "Duplicate content is content that is identical or very similar across multiple URLs.",
    plainEnglish:
      "Duplicate content can happen accidentally through platform settings, filters, copied pages, or migration leftovers.",
    whyItMatters:
      "Duplicate pages can confuse search engines, split signals, and make reporting messier.",
    watchFor:
      "Do not assume every duplicate is a crisis, but do find the duplicates that affect important pages or migrations.",
    askThis:
      "Which version of this content should people and search engines trust?",
    relatedServices: ["technical-seo-cleanup", "content-ecosystem-buildout"],
    relatedTerms: ["canonical-url", "thin-content", "url-structure"],
  },
  {
    term: "Content pruning",
    slug: "content-pruning",
    category: "Content Strategy",
    shortDefinition:
      "Content pruning is the process of improving, merging, redirecting, or removing weak content.",
    plainEnglish:
      "Pruning is not deleting things for sport. It is deciding which pages should be improved, combined, redirected, or retired so the site becomes clearer.",
    whyItMatters:
      "A leaner, clearer content set is often easier to maintain and understand.",
    watchFor:
      "Never prune based only on low traffic. Some pages matter for trust, support, or conversion even if they are not traffic magnets.",
    askThis: "Should this page be improved, merged, redirected, or left alone?",
    relatedServices: ["content-ecosystem-buildout", "seo-growth-audit"],
    relatedTerms: [
      "thin-content",
      "redirect-map",
      "404-page",
      "helpful-content",
    ],
  },
  {
    term: "Content brief",
    slug: "content-brief",
    category: "Content Strategy",
    shortDefinition:
      "A content brief is a planning document that explains what a page should cover, who it is for, and how it should connect to the site.",
    plainEnglish:
      "A good brief gives writing direction without turning the page into a keyword checklist. It should explain intent, structure, sources, internal links, and the next action.",
    whyItMatters:
      "Briefs help teams create useful pages consistently instead of starting from a blank document every time.",
    watchFor:
      "Weak briefs over-focus on word count and keyword repetition while ignoring usefulness and accuracy.",
    askThis:
      "Does this brief explain the decision the page is supposed to support?",
    relatedServices: ["content-ecosystem-buildout", "ai-assisted-workflows"],
    relatedTerms: [
      "search-intent",
      "helpful-content",
      "source-discipline",
      "internal-links",
    ],
  },
  {
    term: "Helpful content",
    slug: "helpful-content",
    category: "Content Strategy",
    shortDefinition:
      "Helpful content is content created to satisfy a real user need, not just to fill a keyword slot.",
    plainEnglish:
      "Helpful content answers the question, supports the decision, and reflects real knowledge of the service or situation.",
    whyItMatters:
      "Search visibility is easier to defend when pages are genuinely useful to the people they are trying to reach.",
    watchFor:
      "Generic AI summaries, borrowed expertise, and pages with no practical next step usually are not helpful enough.",
    askThis:
      "What can someone do or understand better after reading this page?",
    relatedServices: ["content-ecosystem-buildout", "website-optimization"],
    relatedTerms: [
      "search-intent",
      "thin-content",
      "content-brief",
      "human-review-loop",
    ],
  },
  {
    term: "Topical authority",
    slug: "topical-authority",
    category: "Content Strategy",
    shortDefinition:
      "Topical authority is the trust a site builds by covering a subject with consistent depth, clarity, and useful connections.",
    plainEnglish:
      "Topical authority is not one monster article. It is a pattern of useful pages that show the site understands the topic from several angles.",
    whyItMatters:
      "Depth and consistency can help a site become a more credible result for related searches.",
    watchFor:
      "Do not confuse topical authority with publishing volume. Weak pages at scale create noise, not authority.",
    askThis:
      "What related questions or decisions does this site need to cover to be genuinely useful?",
    relatedServices: ["content-ecosystem-buildout", "seo-growth-audit"],
    relatedTerms: [
      "content-cluster",
      "pillar-page",
      "helpful-content",
      "internal-links",
    ],
  },
  {
    term: "Local SEO",
    slug: "local-seo",
    category: "Local SEO",
    shortDefinition:
      "Local SEO is the work of improving visibility for searches tied to a real location or service area.",
    plainEnglish:
      "Local SEO connects online visibility to geography. It includes Google Business Profile, reviews, local pages, citations, and service-area clarity.",
    whyItMatters:
      "Nearby customers often use search when they are ready to compare or contact a business.",
    watchFor:
      "Fake locations, thin city pages, inconsistent business details, and review shortcuts can create trust problems.",
    askThis:
      "What real market, location, or service area are we trying to make clearer?",
    relatedServices: ["local-seo-foundation", "seo-growth-audit"],
    relatedTerms: [
      "google-business-profile",
      "nap-consistency",
      "citation",
      "service-area-page",
    ],
  },
  {
    term: "Google Business Profile",
    slug: "google-business-profile",
    category: "Local SEO",
    shortDefinition:
      "Google Business Profile is the Google listing that can show business information in Maps and local search results.",
    plainEnglish:
      "It is often the first local trust surface people see: name, category, hours, reviews, services, photos, and contact information.",
    whyItMatters:
      "A complete, accurate profile can support local discovery and reduce friction before someone visits the website.",
    watchFor:
      "Neglected categories, stale hours, inconsistent names, and thin service details can weaken local trust.",
    askThis:
      "Does the profile accurately reflect what the business does and where it serves?",
    relatedServices: ["local-seo-foundation"],
    relatedTerms: [
      "local-seo",
      "review-strategy",
      "nap-consistency",
      "service-area-page",
    ],
  },
  {
    term: "NAP consistency",
    slug: "nap-consistency",
    category: "Local SEO",
    shortDefinition:
      "NAP consistency means keeping a business name, address, and phone number consistent across important local listings.",
    plainEnglish:
      "When business details vary across the web, customers and platforms can lose confidence that they are looking at the right business.",
    whyItMatters:
      "Consistent business details support local trust and reduce avoidable confusion.",
    watchFor:
      "Watch for old phone numbers, old addresses, tracking numbers in the wrong place, and duplicate listings.",
    askThis: "Where do business details appear, and which version is correct?",
    relatedServices: ["local-seo-foundation", "provider-transfer"],
    relatedTerms: ["citation", "local-seo", "google-business-profile"],
  },
  {
    term: "Citation",
    slug: "citation",
    category: "Local SEO",
    shortDefinition:
      "A citation is an online mention of a business's name, address, phone number, or other local details.",
    plainEnglish:
      "Citations show up in directories, maps, industry listings, social profiles, and local platforms.",
    whyItMatters:
      "Good citation hygiene helps customers and platforms see consistent information.",
    watchFor:
      "Bulk citation packages can create messy duplicates if nobody checks quality and relevance.",
    askThis: "Which citations actually matter for this business and market?",
    relatedServices: ["local-seo-foundation"],
    relatedTerms: ["nap-consistency", "local-seo", "google-business-profile"],
  },
  {
    term: "Service area page",
    slug: "service-area-page",
    category: "Local SEO",
    shortDefinition:
      "A service area page explains how a business serves a specific area or region.",
    plainEnglish:
      "A useful service area page should reflect real services, real customer needs, and real geographic relevance.",
    whyItMatters:
      "Clear local pages can help customers understand whether the business serves their area and what to do next.",
    watchFor:
      "Thin duplicate city pages are a common local SEO trap. Changing only the city name is not useful content.",
    askThis:
      "What makes this area page specifically useful for someone in that area?",
    relatedServices: ["local-seo-foundation", "content-ecosystem-buildout"],
    relatedTerms: [
      "local-seo",
      "fake-local-page",
      "thin-content",
      "search-intent",
    ],
  },
  {
    term: "Review strategy",
    slug: "review-strategy",
    category: "Local SEO",
    shortDefinition:
      "Review strategy is the process for earning, requesting, responding to, and learning from customer reviews.",
    plainEnglish:
      "Reviews are not just stars. They are trust signals, feedback, and often part of the local decision path.",
    whyItMatters:
      "A steady, honest review process can help local customers evaluate a business more confidently.",
    watchFor:
      "Do not buy reviews, pressure customers, or ignore patterns in negative feedback.",
    askThis:
      "How are we asking for reviews, responding to them, and using what we learn?",
    relatedServices: ["local-seo-foundation", "analytics-reporting"],
    relatedTerms: ["google-business-profile", "local-seo", "conversion"],
  },
  {
    term: "Google Search Console",
    slug: "google-search-console",
    category: "Analytics & Reporting",
    shortDefinition:
      "Google Search Console is a free Google tool that shows how Google sees your website in search, including indexing, queries, clicks, and technical issues.",
    plainEnglish:
      "Search Console is one of the clearest windows into organic search visibility. It does not show everything, but it shows enough to make better SEO decisions.",
    whyItMatters:
      "It helps diagnose indexing, query performance, click behavior, and migration issues.",
    watchFor:
      "If a provider will not grant Search Console access, that is an ownership and reporting problem.",
    askThis:
      "Who owns Search Console access, and what does it tell us about the pages that matter?",
    relatedServices: [
      "analytics-reporting",
      "seo-growth-audit",
      "provider-transfer",
    ],
    relatedTerms: ["query", "indexing", "impressions", "click-through-rate"],
  },
  {
    term: "GA4",
    slug: "ga4",
    category: "Analytics & Reporting",
    shortDefinition:
      "GA4 is Google Analytics 4, Google's current analytics platform for measuring website and app behavior.",
    plainEnglish:
      "GA4 helps track visits, events, conversions, traffic sources, and behavior patterns. It is useful only when it is configured around decisions the business actually needs to make.",
    whyItMatters:
      "Analytics continuity matters during launches, provider transfers, and reporting reviews.",
    watchFor:
      "A dashboard full of GA4 charts is not automatically a useful report.",
    askThis:
      "Which GA4 events or conversions help us decide what to improve next?",
    relatedServices: ["analytics-reporting", "provider-transfer"],
    relatedTerms: [
      "conversion",
      "kpi",
      "analytics-migration",
      "vanity-metrics",
    ],
  },
  {
    term: "Conversion",
    slug: "conversion",
    category: "Analytics & Reporting",
    shortDefinition:
      "A conversion is a meaningful action a visitor takes, such as submitting a form, calling, booking, buying, or requesting help.",
    plainEnglish:
      "Conversions are the moments when attention becomes action. They should match the business goal, not just whatever is easy to track.",
    whyItMatters:
      "SEO and website work should eventually connect to useful actions, not only visits.",
    watchFor:
      "Do not count every tiny interaction as a conversion unless it truly supports a decision.",
    askThis: "Which actions tell us the website helped the business?",
    relatedServices: ["analytics-reporting", "website-optimization"],
    relatedTerms: ["kpi", "landing-page", "click-through-rate", "ga4"],
  },
  {
    term: "KPI",
    slug: "kpi",
    category: "Analytics & Reporting",
    shortDefinition:
      "A KPI is a key performance indicator: a metric chosen because it helps evaluate progress toward a real goal.",
    plainEnglish:
      "A KPI should help decide what to keep doing, stop doing, or change next.",
    whyItMatters:
      "Good KPIs keep reporting from becoming a pile of attractive but disconnected numbers.",
    watchFor:
      "If a KPI cannot affect a decision, it may just be a vanity metric with a serious hat on.",
    askThis: "What decision will this KPI help us make?",
    relatedServices: ["analytics-reporting", "monthly-growth-retainer"],
    relatedTerms: ["vanity-metrics", "conversion", "ga4", "reporting-theater"],
  },
  {
    term: "Vanity metrics",
    slug: "vanity-metrics",
    category: "Analytics & Reporting",
    shortDefinition:
      "Vanity metrics look impressive in a report but do not clearly connect to business outcomes.",
    plainEnglish:
      "A vanity metric may be real, but it is not useful by itself. It makes the report feel busy while avoiding the harder question: what should change?",
    whyItMatters:
      "Reports should help teams make decisions. Otherwise they are decoration.",
    watchFor:
      "Watch for reports that celebrate big numbers without context, quality, conversion, or next steps.",
    askThis: "What would we do differently because this number changed?",
    relatedServices: ["analytics-reporting", "seo-growth-audit"],
    relatedTerms: ["kpi", "conversion", "reporting-theater", "impressions"],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Impressions",
    slug: "impressions",
    category: "Analytics & Reporting",
    shortDefinition:
      "Impressions count how often a page or result was shown to someone, whether or not they clicked.",
    plainEnglish:
      "Impressions are visibility, not visitors. They can show opportunity, but they do not prove interest or business value by themselves.",
    whyItMatters:
      "Impression trends can reveal whether pages are becoming more visible for relevant queries.",
    watchFor:
      "High impressions with weak clicks may signal poor fit, weak titles, competitive SERPs, or mismatched intent.",
    askThis: "Which impressions are tied to searches we actually care about?",
    relatedServices: ["analytics-reporting", "seo-growth-audit"],
    relatedTerms: [
      "google-search-console",
      "query",
      "click-through-rate",
      "vanity-metrics",
    ],
  },
  {
    term: "Click-through rate",
    slug: "click-through-rate",
    category: "Analytics & Reporting",
    shortDefinition:
      "Click-through rate is the percentage of impressions that turn into clicks.",
    plainEnglish:
      "CTR helps show whether people who see a result are choosing it. It is influenced by the title, description, intent, brand, and the search results layout.",
    whyItMatters:
      "CTR can help diagnose whether visibility is turning into visits.",
    watchFor:
      "Do not compare CTR without context. Branded searches, map results, ads, and SERP features all change the baseline.",
    askThis:
      "Is the result being shown to the right people with a reason to click?",
    relatedServices: ["analytics-reporting", "website-optimization"],
    relatedTerms: ["serp", "title-tag", "meta-description", "impressions"],
  },
  {
    term: "Analytics migration",
    slug: "analytics-migration",
    category: "Analytics & Reporting",
    shortDefinition:
      "Analytics migration is the work of preserving measurement continuity when a site, platform, or provider changes.",
    plainEnglish:
      "When a site moves, tracking can break quietly. Analytics migration checks that access, tags, events, conversions, and reporting still make sense after the move.",
    whyItMatters:
      "A transfer is harder to evaluate if the measurement trail disappears during launch.",
    watchFor:
      "Watch for missing GA4 access, duplicated tags, lost conversion events, and unexplained reporting gaps after migration.",
    askThis:
      "How will we know whether visibility and conversions survived the move?",
    relatedServices: ["provider-transfer", "analytics-reporting"],
    relatedTerms: [
      "ga4",
      "google-search-console",
      "seo-migration",
      "ownership-trail",
    ],
  },
  {
    term: "DNS",
    slug: "dns",
    category: "Provider Transfers",
    shortDefinition:
      "DNS is the system that points your domain name to the right website, email, and other online services.",
    plainEnglish:
      "DNS is the routing layer. It tells the internet where to send website traffic, email, verification checks, and other services connected to the domain.",
    whyItMatters:
      "DNS mistakes can take down websites, break email, interrupt verification, or make a transfer much more stressful.",
    watchFor:
      "Do not change DNS casually. Document records before editing and understand which services rely on them.",
    askThis:
      "Do we know what every important DNS record does before we change anything?",
    relatedServices: ["provider-transfer"],
    relatedTerms: [
      "dns-record",
      "nameserver",
      "domain-registrar",
      "hosting-provider",
    ],
  },
  {
    term: "Domain registrar",
    slug: "domain-registrar",
    category: "Provider Transfers",
    shortDefinition:
      "A domain registrar is the company where your domain name is registered and managed.",
    plainEnglish:
      "The registrar is where the domain is owned, renewed, and sometimes pointed toward nameservers. It should be controlled by the business, not trapped inside a vendor relationship.",
    whyItMatters:
      "Registrar access is one of the most important ownership pieces in a provider transfer.",
    watchFor:
      "A provider owning or withholding domain access is a serious lock-in warning sign.",
    askThis:
      "Who owns the registrar account, and can the business access it directly?",
    relatedServices: ["provider-transfer"],
    relatedTerms: ["dns", "nameserver", "provider-lock-in", "ownership-trail"],
  },
  {
    term: "Hosting provider",
    slug: "hosting-provider",
    category: "Provider Transfers",
    shortDefinition:
      "A hosting provider is the company or platform that stores and serves your website files.",
    plainEnglish:
      "Hosting is where the site lives. During a transfer, it matters how the site is built, who controls the account, and what needs to move.",
    whyItMatters:
      "Hosting access affects uptime, migration planning, backups, redirects, forms, and sometimes email or DNS.",
    watchFor:
      "Watch for hosting bundled into a vendor account with no clean handoff or documentation.",
    askThis:
      "Where does the site live, who controls it, and what depends on that host?",
    relatedServices: ["provider-transfer", "technical-seo-cleanup"],
    relatedTerms: [
      "dns",
      "domain-registrar",
      "seo-migration",
      "ownership-trail",
    ],
  },
  {
    term: "Nameserver",
    slug: "nameserver",
    category: "Provider Transfers",
    shortDefinition:
      "A nameserver tells the internet where a domain's DNS records are managed.",
    plainEnglish:
      "The registrar points to nameservers, and the nameservers point to the records. Changing nameservers can move control of the whole DNS zone.",
    whyItMatters:
      "Nameserver changes can affect websites, email, analytics verification, and other services all at once.",
    watchFor:
      "Do not change nameservers without copying and checking the existing DNS records first.",
    askThis:
      "Where are DNS records managed right now, and what would move if nameservers changed?",
    relatedServices: ["provider-transfer"],
    relatedTerms: ["dns", "dns-record", "domain-registrar"],
  },
  {
    term: "DNS record",
    slug: "dns-record",
    category: "Provider Transfers",
    shortDefinition:
      "A DNS record is one instruction inside DNS that points a domain or subdomain to a service.",
    plainEnglish:
      "DNS records can point websites, email, verification, security, and other tools to the right place.",
    whyItMatters:
      "One missing or mistaken record can break a service even when the website itself looks fine.",
    watchFor:
      "Watch for undocumented records, old vendor records, email records, and verification records before any migration.",
    askThis: "What does this record do, and what breaks if it changes?",
    relatedServices: ["provider-transfer"],
    relatedTerms: ["dns", "nameserver", "hosting-provider"],
  },
  {
    term: "Redirect map",
    slug: "redirect-map",
    category: "Provider Transfers",
    shortDefinition:
      "A redirect map is a plan that shows where old URLs should send visitors and search engines after a website move or page change.",
    plainEnglish:
      "A redirect map is the migration trail guide. It protects valuable paths by deciding where each old URL should go next.",
    whyItMatters:
      "Without a redirect map, useful pages can become dead ends during a redesign, platform move, or provider transfer.",
    watchFor:
      "Avoid sending every old URL to the homepage. That hides the problem and usually creates a worse experience.",
    askThis: "Where should each important old URL go, and why?",
    relatedServices: ["provider-transfer", "technical-seo-cleanup"],
    relatedTerms: [
      "301-redirect",
      "404-page",
      "seo-migration",
      "url-structure",
    ],
  },
  {
    term: "301 redirect",
    slug: "301-redirect",
    category: "Provider Transfers",
    shortDefinition:
      "A 301 redirect permanently sends visitors and search engines from one URL to another.",
    plainEnglish:
      "A 301 is the standard way to say, 'This page moved over here now.' It should point to the closest useful replacement.",
    whyItMatters:
      "Good redirects protect user experience and help preserve search signals during changes.",
    watchFor:
      "Long redirect chains, loops, irrelevant destinations, and missing redirects can all create migration trouble.",
    askThis: "Is this redirect permanent, relevant, and easy to follow?",
    relatedServices: ["provider-transfer", "technical-seo-cleanup"],
    relatedTerms: ["redirect-map", "404-page", "seo-migration"],
  },
  {
    term: "404 page",
    slug: "404-page",
    category: "Provider Transfers",
    shortDefinition:
      "A 404 page is what visitors see when a requested URL cannot be found.",
    plainEnglish:
      "A 404 is not always bad. It becomes a problem when important old pages, linked resources, or conversion paths unexpectedly disappear.",
    whyItMatters:
      "404s can reveal broken links, migration misses, deleted pages, or old URLs that still need a better destination.",
    watchFor:
      "Do not ignore 404s after a launch. Separate harmless noise from lost value.",
    askThis:
      "Is this missing page expected, or should it redirect to a useful replacement?",
    relatedServices: ["provider-transfer", "technical-seo-cleanup"],
    relatedTerms: ["redirect-map", "301-redirect", "content-pruning"],
  },
  {
    term: "SEO migration",
    slug: "seo-migration",
    category: "Provider Transfers",
    shortDefinition:
      "An SEO migration is the search-protection part of a website move, including URL mapping, redirects, metadata preservation, indexing checks, and Search Console monitoring.",
    plainEnglish:
      "A migration changes the site. An SEO migration protects the search trail while that change happens.",
    whyItMatters:
      "Redesigns, platform changes, provider transfers, and domain moves can damage visibility when nobody tracks URLs, metadata, analytics, and indexing.",
    watchFor:
      "Watch for launches that skip redirects, analytics continuity, Search Console checks, or post-launch crawl review.",
    askThis:
      "What search value needs to be preserved before, during, and after the move?",
    relatedServices: [
      "provider-transfer",
      "technical-seo-cleanup",
      "analytics-reporting",
    ],
    relatedTerms: [
      "redirect-map",
      "analytics-migration",
      "google-search-console",
      "ownership-trail",
    ],
  },
  {
    term: "Provider lock-in",
    slug: "provider-lock-in",
    category: "Provider Transfers",
    shortDefinition:
      "Provider lock-in happens when a vendor controls key accounts, files, tools, or access in a way that makes it difficult for the client to leave.",
    plainEnglish:
      "Lock-in is not just inconvenience. It is a loss of ownership clarity. The business should be able to understand and access its domain, hosting, analytics, website, and records.",
    whyItMatters:
      "Provider lock-in turns ordinary maintenance or migration work into emergency recovery work.",
    watchFor:
      "Watch for vendors who own the domain, refuse account access, hide reporting, or make leaving sound impossible without explaining the actual risks.",
    askThis:
      "What does the business own directly, and what only exists inside the provider's account?",
    relatedServices: ["provider-transfer", "seo-growth-audit"],
    relatedTerms: [
      "domain-registrar",
      "hosting-provider",
      "ownership-trail",
      "black-box-seo",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Ownership trail",
    slug: "ownership-trail",
    category: "Provider Transfers",
    shortDefinition:
      "An ownership trail is the documented record of who controls the domain, hosting, analytics, website, DNS, and related tools.",
    plainEnglish:
      "The ownership trail answers the question, 'Who has the keys?' It should be readable enough that the business is not dependent on memory or panic.",
    whyItMatters:
      "A clear ownership trail makes provider transfers, audits, launches, and future support much calmer.",
    watchFor:
      "If nobody can explain who owns what, the project is already carrying risk.",
    askThis:
      "Where is the access inventory, and who can update it when something changes?",
    relatedServices: ["provider-transfer", "analytics-reporting"],
    relatedTerms: [
      "provider-lock-in",
      "domain-registrar",
      "dns",
      "analytics-migration",
    ],
  },
  {
    term: "AI-assisted workflow",
    slug: "ai-assisted-workflow",
    category: "AI & Digital Tools",
    shortDefinition:
      "An AI-assisted workflow uses AI to support research, drafting, organization, analysis, or optimization while human judgment stays in charge.",
    plainEnglish:
      "AI can reduce drag, but it needs constraints, review, and a clear job. The workflow matters more than the shiny tool.",
    whyItMatters:
      "Useful AI workflows can speed up research and planning without turning the brand into generic sludge.",
    watchFor:
      "Watch for unsupervised publishing, fake expertise, weak sourcing, and prompts nobody can audit.",
    askThis:
      "Where does AI help, where does a human review, and what is the source of truth?",
    relatedServices: ["ai-assisted-workflows", "content-ecosystem-buildout"],
    relatedTerms: [
      "prompt-library",
      "human-review-loop",
      "source-discipline",
      "helpful-content",
    ],
  },
  {
    term: "Prompt library",
    slug: "prompt-library",
    category: "AI & Digital Tools",
    shortDefinition:
      "A prompt library is a reusable set of tested instructions for AI-assisted tasks.",
    plainEnglish:
      "A prompt library keeps useful workflows from living only in one person's chat history.",
    whyItMatters:
      "Reusable prompts make AI workflows easier to review, improve, and hand off.",
    watchFor:
      "Prompts should not become secret recipes that hide weak process or missing expertise.",
    askThis:
      "What task does this prompt support, and how do we judge whether the output is usable?",
    relatedServices: ["ai-assisted-workflows"],
    relatedTerms: [
      "ai-assisted-workflow",
      "human-review-loop",
      "source-discipline",
    ],
  },
  {
    term: "Human review loop",
    slug: "human-review-loop",
    category: "AI & Digital Tools",
    shortDefinition:
      "A human review loop is the checkpoint where a person evaluates AI-assisted work before it is used.",
    plainEnglish:
      "The review loop is where expertise, taste, source checks, brand fit, and risk judgment re-enter the workflow.",
    whyItMatters:
      "AI can produce confident mistakes at speed. Review keeps speed from turning into public sloppiness.",
    watchFor:
      "If nobody owns the final decision, the workflow is not ready for serious use.",
    askThis: "Who reviews this output, and what exactly are they checking?",
    relatedServices: ["ai-assisted-workflows", "content-ecosystem-buildout"],
    relatedTerms: [
      "ai-assisted-workflow",
      "prompt-library",
      "source-discipline",
      "helpful-content",
    ],
  },
  {
    term: "Source discipline",
    slug: "source-discipline",
    category: "AI & Digital Tools",
    shortDefinition:
      "Source discipline is the habit of tying claims, decisions, and AI-assisted outputs back to trustworthy evidence.",
    plainEnglish:
      "Source discipline means not letting confident language outrun what is actually known.",
    whyItMatters:
      "It protects trust, especially in SEO, analytics, provider transfers, and AI-assisted content.",
    watchFor:
      "Watch for unsupported claims, invented examples, fake certainty, and content that sounds right but cannot be checked.",
    askThis:
      "What source supports this claim, and is that source good enough for the decision?",
    relatedServices: ["ai-assisted-workflows", "seo-growth-audit"],
    relatedTerms: [
      "human-review-loop",
      "content-brief",
      "helpful-content",
      "reporting-theater",
    ],
  },
  {
    term: "Link farm",
    slug: "link-farm",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "A link farm is a low-quality network of sites built mainly to manipulate search rankings with artificial links.",
    plainEnglish:
      "Link farms try to fake trust instead of earning it. They may look technical, but the underlying signal is manufactured.",
    whyItMatters:
      "Bad link schemes can waste budget, create risk, and make reporting look busier than the work deserves.",
    watchFor:
      "Watch for cheap backlink packages, vague authority claims, and links from sites no real customer would value.",
    askThis: "Would this link make sense if search engines did not exist?",
    relatedServices: ["seo-growth-audit"],
    relatedTerms: [
      "private-blog-network",
      "guaranteed-rankings",
      "black-box-seo",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Guaranteed rankings",
    slug: "guaranteed-rankings",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "Guaranteed rankings are a red flag because no SEO provider controls Google's search results.",
    plainEnglish:
      "An SEO provider can control the work, documentation, priorities, and reporting. They cannot honestly guarantee a search engine outcome.",
    whyItMatters:
      "Guarantees often shift attention away from useful work and toward sales language.",
    watchFor:
      "Watch for first-page promises, secret methods, and guarantees with vague exceptions.",
    askThis:
      "What work is actually being guaranteed, and what proof will show it was done?",
    relatedServices: ["seo-growth-audit"],
    relatedTerms: ["black-box-seo", "link-farm", "vanity-metrics"],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Black-box SEO",
    slug: "black-box-seo",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "Black-box SEO is SEO work described so vaguely that no one can tell what is being done or why.",
    plainEnglish:
      "If the provider cannot explain the work in plain language, the client cannot evaluate the value or risk.",
    whyItMatters:
      "Opaque work makes it harder to protect ownership, diagnose results, or leave cleanly.",
    watchFor:
      "Watch for secret strategies, dashboards with no decisions, and resistance to documentation.",
    askThis: "What changed, why did it change, and where is it documented?",
    relatedServices: ["seo-growth-audit", "provider-transfer"],
    relatedTerms: [
      "provider-lock-in",
      "reporting-theater",
      "guaranteed-rankings",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Private blog network",
    slug: "private-blog-network",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "A private blog network is a network of sites built mainly to pass authority signals rather than publish trustworthy content.",
    plainEnglish:
      "A PBN is often dressed up as outreach or authority building, but the goal is usually manufactured link influence.",
    whyItMatters:
      "It can create risk while making a backlink report look impressive.",
    watchFor:
      "Watch for unexplained link networks, irrelevant sites, and vendors who refuse to show where links come from.",
    askThis:
      "Are these links from real, relevant places a customer or industry peer would trust?",
    relatedServices: ["seo-growth-audit"],
    relatedTerms: ["link-farm", "black-box-seo", "guaranteed-rankings"],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Keyword stuffing",
    slug: "keyword-stuffing",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "Keyword stuffing is the practice of forcing keywords into content so often that the page becomes unnatural or unhelpful.",
    plainEnglish:
      "Keyword stuffing treats search engines like a machine to be tricked and readers like an afterthought.",
    whyItMatters:
      "Stuffed pages are hard to read, hard to trust, and usually bad at satisfying intent.",
    watchFor:
      "Watch for repetitive city lists, awkward phrases, and copy that sounds like it was assembled from a spreadsheet.",
    askThis:
      "Would this sentence still be here if we were writing only for the customer?",
    relatedServices: ["content-ecosystem-buildout", "website-optimization"],
    relatedTerms: [
      "keyword",
      "search-intent",
      "thin-content",
      "fake-local-page",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Fake local page",
    slug: "fake-local-page",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "A fake local page is a thin or misleading location page for a place the business does not genuinely serve or represent.",
    plainEnglish:
      "Fake local pages try to borrow local trust without earning it. They often swap city names into the same weak page.",
    whyItMatters:
      "They can damage trust and make the site less useful for real customers.",
    watchFor:
      "Watch for duplicated city pages, fake addresses, and service areas that do not match reality.",
    askThis:
      "Can the business truthfully and usefully serve someone in this location?",
    relatedServices: ["local-seo-foundation", "content-ecosystem-buildout"],
    relatedTerms: [
      "service-area-page",
      "thin-content",
      "local-seo",
      "keyword-stuffing",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Reporting theater",
    slug: "reporting-theater",
    category: "Bad SEO / Fox Traps",
    shortDefinition:
      "Reporting theater is reporting that looks impressive but does not explain what changed, why it matters, or what to do next.",
    plainEnglish:
      "It is the dashboard version of fog. There may be numbers, but no useful decision.",
    whyItMatters: "Bad reporting lets weak work hide behind charts and jargon.",
    watchFor:
      "Watch for reports that avoid ownership, actions taken, outcomes, risks, and next steps.",
    askThis: "What decision should this report help us make?",
    relatedServices: ["analytics-reporting", "seo-growth-audit"],
    relatedTerms: [
      "vanity-metrics",
      "kpi",
      "black-box-seo",
      "source-discipline",
    ],
    fieldGuideLinks: fieldGuide,
  },
  {
    term: "Page weight",
    slug: "page-weight",
    category: "Performance & Sustainability",
    shortDefinition:
      "Page weight is the total size of the files a page needs to load, including images, scripts, styles, fonts, and media.",
    plainEnglish:
      "A heavier page asks more from browsers, networks, devices, and users. Some weight is necessary, but waste should earn scrutiny.",
    whyItMatters:
      "Page weight affects speed, accessibility, maintenance, and digital waste.",
    watchFor:
      "Watch for oversized images, unused scripts, heavy embeds, and design flourishes that slow the page without helping the visitor.",
    askThis: "What on this page is heavy, and does it earn its place?",
    relatedServices: ["website-optimization", "technical-seo-cleanup"],
    relatedTerms: ["core-web-vitals", "climate-aware-workflow"],
  },
  {
    term: "Core Web Vitals",
    slug: "core-web-vitals",
    category: "Performance & Sustainability",
    shortDefinition:
      "Core Web Vitals are Google metrics that evaluate parts of page experience such as loading, responsiveness, and visual stability.",
    plainEnglish:
      "They are useful performance signals, not the entire user experience. They help identify technical friction that visitors may feel.",
    whyItMatters:
      "Better performance can support usability, conversion, and technical site health.",
    watchFor:
      "Do not chase scores without understanding the actual user problem or implementation tradeoff.",
    askThis:
      "Which performance issue is making the page worse for real visitors?",
    relatedServices: ["website-optimization", "technical-seo-cleanup"],
    relatedTerms: ["page-weight", "technical-seo", "conversion"],
  },
  {
    term: "Climate-aware workflow",
    slug: "climate-aware-workflow",
    category: "Performance & Sustainability",
    shortDefinition:
      "A climate-aware workflow tries to reduce unnecessary digital waste, use tools efficiently, and stay honest about the environmental footprint of digital work.",
    plainEnglish:
      "It does not pretend a website saves the planet. It asks for leaner choices, cleaner processes, and impact language that can survive scrutiny.",
    whyItMatters:
      "Digital work has a footprint, and teams can often reduce waste without making the work worse.",
    watchFor:
      "Watch for vague green claims, bloated tooling, and impact language with no evidence behind it.",
    askThis:
      "What can we make leaner, clearer, or easier to maintain without pretending the impact is bigger than it is?",
    relatedServices: ["website-optimization", "ai-assisted-workflows"],
    relatedTerms: ["page-weight", "core-web-vitals", "source-discipline"],
  },
];

export const dictionaryBySlug = Object.fromEntries(
  dictionaryEntries.map((entry) => [entry.slug, entry]),
) as Record<string, DictionaryEntry>;

export const dictionaryByTerm = Object.fromEntries(
  dictionaryEntries.map((entry) => [entry.term.toLowerCase(), entry]),
) as Record<string, DictionaryEntry>;

export const dictionaryCategories = Array.from(
  new Set(dictionaryEntries.map((entry) => entry.category)),
);
