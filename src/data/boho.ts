import {
  dictionaryByTerm,
  dictionaryEntries,
  getDictionaryEntryHref,
} from "./dictionary";

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface DictionaryTerm {
  term: string;
  category: string;
  definition: string;
  href?: string;
}

export interface ServiceChooserCard {
  title: string;
  description: string;
  href: string;
}

export interface ServicePageCallToAction {
  text: string;
  href: string;
}

export interface ServicePlanningRange {
  label: string;
  description: string;
}

export interface ServicePageDetail {
  slug: string;
  title: string;
  metadataDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCta: ServicePageCallToAction;
  planningRange?: ServicePlanningRange;
  fixes: string[];
  whatBohoDoes: string[];
  whatYouGet: string[];
  honesty: string;
  goodFit: string;
  notFit: string;
  owlTerms: string[];
  relatedServiceSlugs: string[];
  includeFieldGuide?: boolean;
  finalCtaTitle: string;
  finalCtaBody: string;
  finalCtaButton: string;
}

const getServiceHref = (slug: string) => `/services/${slug}/`;

export const getDictionaryTermHref = (term: string) => {
  const entry = dictionaryByTerm[term.toLowerCase()];
  if (!entry) {
    throw new Error(`Missing dictionary term: ${term}`);
  }
  return getDictionaryEntryHref(entry.slug);
};

export const featureStrip = [
  {
    title: "Technical SEO",
    description:
      "Structural cleanup, crawl paths, indexing, metadata, and steadier site health.",
    icon: "tabler:binary-tree-2",
  },
  {
    title: "Content ecosystems",
    description:
      "Service pages, clusters, internal links, and content that compounds instead of sprawling.",
    icon: "tabler:hierarchy-3",
  },
  {
    title: "Provider transfers",
    description:
      "Access inventory, redirects, DNS, hosting moves, and calmer migration planning.",
    icon: "tabler:route-square-2",
  },
  {
    title: "Plain-English reporting",
    description:
      "Measurement and next steps explained clearly, without dashboard theater.",
    icon: "tabler:chart-dots-3",
  },
];

export const serviceCards: ServiceCard[] = [
  {
    title: "SEO Growth Audit",
    description:
      "A clear map of where your search presence stands, what is holding it back, and what to fix first.",
    icon: "tabler:map-search",
    href: getServiceHref("seo-growth-audit"),
  },
  {
    title: "Technical SEO Cleanup",
    description:
      "Fix crawlability, indexing, metadata, redirects, internal links, performance, and site health issues.",
    icon: "tabler:stethoscope",
    href: getServiceHref("technical-seo-cleanup"),
  },
  {
    title: "Content Ecosystem Buildout",
    description:
      "Search-led content plans, service pages, topic clusters, briefs, and internal linking strategy.",
    icon: "tabler:brand-pagekit",
    href: getServiceHref("content-ecosystem-buildout"),
  },
  {
    title: "Local SEO Foundation",
    description:
      "Google Business Profile, local pages, review strategy, citations, and location visibility.",
    icon: "tabler:map-pin",
    href: getServiceHref("local-seo-foundation"),
  },
  {
    title: "Website Optimization",
    description:
      "Improve page structure, messaging, CTAs, trust signals, and conversion paths.",
    icon: "tabler:layout-dashboard",
    href: getServiceHref("website-optimization"),
  },
  {
    title: "Analytics & Reporting",
    description:
      "Measurement setup, Search Console review, dashboards, and plain-English reporting.",
    icon: "tabler:chart-line",
    href: getServiceHref("analytics-reporting"),
  },
  {
    title: "AI-Assisted Workflows",
    description:
      "Research, ideation, drafting, analysis, and optimization with human judgment in charge.",
    icon: "tabler:sparkles",
    href: getServiceHref("ai-assisted-workflows"),
  },
  {
    title: "SEO & Hosting Provider Transfer",
    description:
      "Move away from old providers with access inventory, migration planning, DNS support, redirects, and QA.",
    icon: "tabler:switch-2",
    href: getServiceHref("provider-transfer"),
  },
  {
    title: "Monthly Growth Retainer",
    description:
      "Ongoing SEO, content, reporting, technical monitoring, and continuous improvement.",
    icon: "tabler:calendar-stats",
    href: getServiceHref("monthly-growth-retainer"),
  },
];

export const serviceChooserCards: ServiceChooserCard[] = [
  {
    title: "I do not know what is wrong.",
    description: "Start with an SEO Growth Audit.",
    href: getServiceHref("seo-growth-audit"),
  },
  {
    title: "The site has technical warnings.",
    description: "Start with Technical SEO Cleanup.",
    href: getServiceHref("technical-seo-cleanup"),
  },
  {
    title: "The content is scattered.",
    description: "Start with Content Ecosystem Buildout.",
    href: getServiceHref("content-ecosystem-buildout"),
  },
  {
    title: "The site does not convert.",
    description: "Start with Website Optimization.",
    href: getServiceHref("website-optimization"),
  },
  {
    title: "The reports are useless.",
    description: "Start with Analytics & Reporting.",
    href: getServiceHref("analytics-reporting"),
  },
  {
    title: "The old provider is a mess.",
    description: "Start with Provider Transfer Support.",
    href: getServiceHref("provider-transfer"),
  },
];

export const servicePageDetails: ServicePageDetail[] = [
  {
    slug: "seo-growth-audit",
    title: "SEO Growth Audit",
    metadataDescription:
      "A plain-English SEO audit that maps visibility, technical blockers, content gaps, ownership risks, and the next useful fixes.",
    heroTitle:
      "Find the growth blockers before buying another mystery package.",
    heroSubtitle:
      "Boho's SEO Growth Audit gives you a clear map of what is helping, what is broken, what is missing, and what to fix first. No dashboard theater. No guaranteed-ranking spells. Just a readable field guide for the site in front of us.",
    primaryCtaText: "Get a Growth Audit",
    secondaryCta: {
      text: "See pricing",
      href: "/pricing/",
    },
    planningRange: {
      label: "Planning range",
      description:
        "Most SEO Growth Audits start in the $350 to $750 range depending on site size, access, and how much documentation already exists.",
    },
    fixes: [
      "You are paying for SEO but cannot tell what is actually being done.",
      "Your site gets traffic, but the leads are weak or inconsistent.",
      "Your content exists, but it does not connect into a useful system.",
      "Your reports show numbers without decisions.",
      "Your site has technical issues nobody has translated into plain English.",
      "You need a second opinion before switching providers.",
    ],
    whatBohoDoes: [
      "Reviews site structure, [[indexing]], [[metadata]], [[internal-links|internal links]], [[service-page|service pages]], and content depth.",
      "Checks obvious technical blockers and crawl-path issues.",
      "Looks for ownership risks around analytics, Search Console, hosting, DNS, and reporting.",
      "Identifies quick wins, structural fixes, content gaps, and sequencing priorities.",
      "Turns the findings into a written roadmap instead of a pile of screenshots.",
    ],
    whatYouGet: [
      "Written audit summary",
      "Priority-ordered fix list",
      "Technical observations",
      "Content and internal-link notes",
      "Visibility and reporting notes",
      "Recommended next-step sequence",
      "Optional follow-up implementation scope",
    ],
    honesty:
      "We will not promise rankings, invent certainty, or bury you in metrics that do not change the next decision. Search is competitive, messy, and dependent on the market. The useful work is finding the controllable improvements and making them legible.",
    goodFit:
      "This is a good fit if you need clarity before spending more on SEO, rebuilding a site, switching providers, or committing to ongoing work.",
    notFit:
      "This is not a fit if you want a guaranteed ranking, bulk AI blog spam, cheap backlink schemes, or a report designed mainly to look impressive.",
    owlTerms: [
      "SEO",
      "Technical SEO",
      "Crawlability",
      "Indexing",
      "Google Search Console",
      "Vanity metrics",
    ],
    relatedServiceSlugs: [
      "technical-seo-cleanup",
      "content-ecosystem-buildout",
      "analytics-reporting",
      "provider-transfer",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Start with the map.",
    finalCtaBody:
      "Send the site, the business context, and what feels stuck. Boho will help identify the cleanest first step.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "technical-seo-cleanup",
    title: "Technical SEO Cleanup",
    metadataDescription:
      "Technical SEO cleanup for crawlability, indexing, redirects, metadata, internal links, site health, and launch QA.",
    heroTitle: "Clean up the machinery search engines actually have to crawl.",
    heroSubtitle:
      "Technical SEO is not glamorous, which is rude of it, but it matters. Boho helps fix the structural issues that make a site harder to crawl, understand, trust, measure, or maintain.",
    primaryCtaText: "Ask about cleanup",
    secondaryCta: {
      text: "See pricing",
      href: "/pricing/",
    },
    planningRange: {
      label: "Planning range",
      description:
        "Most Technical SEO Cleanup projects start in the $750 to $1,500 range depending on site complexity, access, and implementation depth.",
    },
    fixes: [
      "Important pages are buried, duplicated, thin, or poorly linked.",
      "Search engines are seeing confusing metadata or URL structure.",
      "Old URLs, redirects, or migrations are leaking value.",
      "The sitemap, robots rules, canonicals, or internal links need review.",
      'Reports mention "technical issues" but nobody has explained the actual risk.',
      "The site was launched without post-launch SEO QA.",
    ],
    whatBohoDoes: [
      "Reviews crawlability and indexability.",
      "Checks [[metadata]], [[heading-structure|heading structure]], [[canonical-url|canonical signals]], [[internal-links|internal links]], and [[sitemap]] behavior.",
      "Prioritizes fixes by likely impact and implementation difficulty.",
      "Coordinates with developers or implements static-site fixes where appropriate.",
      "Leaves clear documentation of what changed and what still needs monitoring.",
    ],
    whatYouGet: [
      "Technical cleanup checklist",
      "Implementation notes",
      "Redirect and URL observations",
      "Metadata and internal-link recommendations",
      "Post-fix QA notes",
      "Follow-up monitoring recommendations",
    ],
    honesty:
      "Technical SEO is not magic. Fixing structure does not guarantee rankings by itself. It makes the site easier to understand and maintain, which gives content and authority a better place to work.",
    goodFit:
      "This is a good fit if the site already exists but has crawl, indexation, metadata, URL, internal-link, redirect, or post-launch QA problems.",
    notFit:
      "This is not a fit if the real issue is brand positioning, offer clarity, or nonexistent content. Technical cleanup can support those things, but it cannot replace them.",
    owlTerms: [
      "Technical SEO",
      "Crawlability",
      "Indexing",
      "Redirect map",
      "Metadata",
      "Internal links",
    ],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "website-optimization",
      "provider-transfer",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Make the site easier to crawl, trust, and maintain.",
    finalCtaBody:
      "Bring the current site and any known technical warnings. Boho will help separate real issues from decorative panic.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "content-ecosystem-buildout",
    title: "Content Ecosystem Buildout",
    metadataDescription:
      "Search-led content strategy, service pages, topic clusters, briefs, internal links, and content systems that compound instead of sprawling.",
    heroTitle:
      "Build content that connects instead of multiplying like wet cardboard.",
    heroSubtitle:
      "Most business content fails because it is treated like isolated blog posts. Boho builds content ecosystems around services, search intent, internal links, and useful next steps.",
    primaryCtaText: "Ask about content strategy",
    secondaryCta: {
      text: "Open Ask the Owl",
      href: "/ask-the-owl/",
    },
    fixes: [
      "Your blog exists but does not support service pages.",
      "Your pages target keywords without satisfying intent.",
      "Your content is scattered across disconnected topics.",
      "Your internal links are accidental or nonexistent.",
      "You have AI-written pages that sound busy but say very little.",
      "You need a publishing plan that supports actual business goals.",
    ],
    whatBohoDoes: [
      "Maps service topics, [[search-intent|search intent]], supporting [[content-cluster|content clusters]], and [[internal-links|internal link]] paths.",
      "Builds page briefs for core services and supporting articles.",
      "Recommends internal-link paths between commercial, educational, and trust-building pages.",
      "Reviews content for usefulness, originality, clarity, and conversion fit.",
      "Creates a practical publishing sequence instead of a bloated content calendar.",
    ],
    whatYouGet: [
      "Content ecosystem map",
      "Page and topic prioritization",
      "Service-page recommendations",
      "Blog or guide brief outlines",
      "Internal-link strategy",
      "Content quality notes",
      "Optional draft support",
    ],
    honesty:
      "More content is not automatically better. Publishing weak pages at scale can make the site noisier, not stronger. The goal is to make each page earn its place in the system.",
    goodFit:
      "This is a good fit if the business has services worth explaining, questions worth answering, and existing or planned pages that need to work together.",
    notFit:
      "This is not a fit if the goal is cheap bulk content, generic AI posts, or keyword stuffing with a nicer hat.",
    owlTerms: [
      "Content cluster",
      "Search intent",
      "Internal links",
      "SEO",
      "AI-assisted workflow",
    ],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "website-optimization",
      "ai-assisted-workflows",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Turn scattered content into a system.",
    finalCtaBody:
      "Send the site, the services you want to sell, and the topics you keep circling. Boho will help organize the forest.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "local-seo-foundation",
    title: "Local SEO Foundation",
    metadataDescription:
      "Local SEO support for Google Business Profile, local pages, citations, reviews, service areas, and location visibility.",
    heroTitle: "Help nearby customers find the business that actually exists.",
    heroSubtitle:
      "Local SEO is where search visibility meets real-world trust. Boho helps clean up the basics: Google Business Profile, local landing pages, citations, reviews, service-area clarity, and practical reporting.",
    primaryCtaText: "Ask about local SEO",
    secondaryCta: {
      text: "See pricing",
      href: "/pricing/",
    },
    fixes: [
      "Your Google Business Profile is incomplete, inconsistent, or ignored.",
      "Your service area is unclear.",
      "Local pages are thin, duplicated, or stuffed with city names.",
      "Reviews exist but are not part of a real trust strategy.",
      "Citations and business details are inconsistent.",
      "You do not know which local visibility signals matter.",
    ],
    whatBohoDoes: [
      "Reviews Google Business Profile completeness and positioning.",
      "Checks [[google-business-profile|Google Business Profile]], [[nap-consistency|business detail consistency]], [[service-area-page|local page quality]], and [[review-strategy|review signals]].",
      "Recommends local content and service-area improvements.",
      "Helps build a simple review-request process.",
      "Connects local visibility work to reporting and next steps.",
    ],
    whatYouGet: [
      "Local SEO foundation review",
      "Google Business Profile improvement checklist",
      "Local page recommendations",
      "Citation and consistency notes",
      "Review strategy suggestions",
      "Priority action plan",
    ],
    honesty:
      "Local SEO is not just stuffing every nearby city into a footer and praying to the map pack. The work needs to match the actual business, service area, and customer behavior.",
    goodFit:
      "This is a good fit for service businesses, local businesses, and regional brands that need better visibility in a real geographic market.",
    notFit:
      "This is not a fit for businesses trying to fake locations, fake service areas, or create thin duplicate city pages at scale.",
    owlTerms: [
      "SEO",
      "Search intent",
      "Google Search Console",
      "Vanity metrics",
    ],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "website-optimization",
      "analytics-reporting",
    ],
    finalCtaTitle: "Build the local foundation first.",
    finalCtaBody:
      "Send the business name, website, service area, and Google Business Profile link if available.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "website-optimization",
    title: "Website Optimization",
    metadataDescription:
      "Website optimization for clearer messaging, page structure, CTAs, trust signals, performance, and static-first build improvements.",
    heroTitle: "Make the site easier to understand, trust, and act on.",
    heroSubtitle:
      "A website does not need to be louder. It needs to be clearer. Boho improves structure, messaging, CTAs, trust signals, page flow, and static-first implementation where it fits.",
    primaryCtaText: "Ask about website optimization",
    secondaryCta: {
      text: "See pricing",
      href: "/pricing/",
    },
    planningRange: {
      label: "Planning range",
      description:
        "Most Website Optimization or Static Build projects start in the $1,200 to $3,500 range depending on page count, rewrite depth, and implementation needs.",
    },
    fixes: [
      "Visitors land on the site but do not know what to do next.",
      "The homepage looks nice but does not explain the offer.",
      "Service pages are vague or interchangeable.",
      "CTAs are weak, scattered, or missing.",
      "Trust signals are buried.",
      "The site is bloated, slow, or awkward to maintain.",
    ],
    whatBohoDoes: [
      "Reviews page hierarchy, [[heading-structure|structure]], [[service-page|service clarity]], [[conversion|conversion paths]], and trust signals.",
      "Rewrites or restructures key pages.",
      "Improves conversion paths without turning the site into a pop-up carnival.",
      "Recommends lean static-first build patterns where appropriate.",
      "Connects design changes to search and reporting needs.",
    ],
    whatYouGet: [
      "Page-structure recommendations",
      "Messaging and CTA rewrite notes",
      "Trust-signal checklist",
      "UX and readability observations",
      "Optional implementation support",
      "Post-update QA notes",
    ],
    honesty:
      "Pretty pages do not automatically sell. The page has to explain the offer, reduce confusion, build trust, and make the next action obvious.",
    goodFit:
      "This is a good fit if the site exists but feels unclear, underpowered, bloated, hard to maintain, or weak at turning visitors into inquiries.",
    notFit:
      "This is not a fit if the only goal is visual decoration with no strategy, copy, search, or conversion thinking.",
    owlTerms: ["SEO", "Search intent", "Technical SEO", "AI-assisted workflow"],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "content-ecosystem-buildout",
      "technical-seo-cleanup",
    ],
    finalCtaTitle: "Make the site do its job.",
    finalCtaBody:
      "Send the current site and the page or funnel that feels weakest.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "analytics-reporting",
    title: "Analytics & Reporting",
    metadataDescription:
      "Analytics and reporting support for Search Console, traffic visibility, dashboards, plain-English summaries, and decision-focused measurement.",
    heroTitle: "Turn reporting into decisions, not dashboard theater.",
    heroSubtitle:
      "Reports should explain what changed, why it matters, and what to do next. Boho helps review analytics setup, Search Console visibility, reporting continuity, and plain-English performance summaries.",
    primaryCtaText: "Ask about reporting",
    secondaryCta: {
      text: "Open the Owl Dictionary",
      href: "/ask-the-owl/dictionary/",
    },
    fixes: [
      "Reports show numbers but no interpretation.",
      "You do not know whether SEO work is helping.",
      "Search Console is missing, ignored, or inaccessible.",
      "Analytics changed during a migration and nobody documented it.",
      "Dashboards are built for screenshots instead of decisions.",
      "You need reporting that a business owner can actually use.",
    ],
    whatBohoDoes: [
      "Reviews [[google-search-console|Search Console]], [[ga4|GA4]], [[conversion|conversions]], [[kpi|KPIs]], and [[vanity-metrics|vanity metrics]].",
      "Checks basic measurement continuity.",
      "Identifies useful SEO and website performance metrics.",
      "Builds plain-English reporting notes.",
      "Connects reporting to next-step recommendations.",
      "Helps avoid vanity metrics and misleading summaries.",
    ],
    whatYouGet: [
      "Reporting audit",
      "Search Console notes",
      "Analytics continuity checklist",
      "Recommended KPI set",
      "Plain-English report structure",
      "Next-action summary template",
    ],
    honesty:
      "A metric is only useful if it changes a decision. Traffic, impressions, rankings, conversions, and engagement all need context. Otherwise it is just a dashboard wearing a little hat.",
    goodFit:
      "This is a good fit if you receive reports but still cannot tell what changed, what matters, or what should happen next.",
    notFit:
      "This is not a fit if the goal is a decorative dashboard full of impressive numbers nobody uses.",
    owlTerms: [
      "Google Search Console",
      "Vanity metrics",
      "SEO",
      "Provider lock-in",
      "Analytics migration",
    ],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "provider-transfer",
      "monthly-growth-retainer",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Make the numbers useful.",
    finalCtaBody:
      "Send what reports you currently receive and what decisions they are failing to support.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "ai-assisted-workflows",
    title: "AI-Assisted Workflows",
    metadataDescription:
      "AI-assisted research, drafting, sorting, analysis, and optimization workflows with human review and practical governance.",
    heroTitle: "Use AI for leverage, not content sludge.",
    heroSubtitle:
      "AI can reduce drag around research, drafting, sorting, analysis, and QA. It can also flood your business with confident nonsense. Boho helps build workflows where AI supports human judgment instead of replacing it.",
    primaryCtaText: "Ask about AI workflows",
    secondaryCta: {
      text: "Open Ask the Owl",
      href: "/ask-the-owl/",
    },
    fixes: [
      "AI content sounds polished but generic.",
      "Your team uses AI inconsistently or without review.",
      "Research, notes, briefs, and reporting take too long.",
      "You want agent-assisted workflows but need guardrails.",
      "You need better prompts, review loops, and documentation.",
      "You want speed without turning the brand into mush.",
    ],
    whatBohoDoes: [
      "Maps repetitive research, drafting, analysis, and reporting tasks.",
      "Builds [[ai-assisted-workflow|AI-assisted workflows]] with a [[prompt-library]], [[human-review-loop|human review loop]], and [[source-discipline|source discipline]].",
      "Creates reusable prompts and review checklists.",
      "Helps separate safe automation from risky automation.",
      "Documents how the workflow should be used and audited.",
    ],
    whatYouGet: [
      "Workflow map",
      "Prompt and review templates",
      "QA checklist",
      "Content-use guardrails",
      "Reporting or research automation plan",
      "Documentation for future users",
    ],
    honesty:
      "AI does not remove the need for expertise. It accelerates useful work and bad work. The difference is review, constraints, source discipline, and taste.",
    goodFit:
      "This is a good fit if you have repeated research, drafting, reporting, sorting, or planning work that could move faster with better structure.",
    notFit:
      "This is not a fit if the goal is fully automated spam, unsupervised publishing, fake expertise, or replacing human review with a machine that sounds confident while stepping on a rake.",
    owlTerms: [
      "AI-assisted workflow",
      "SEO",
      "Content cluster",
      "Vanity metrics",
      "Climate-aware workflow",
    ],
    relatedServiceSlugs: [
      "content-ecosystem-buildout",
      "analytics-reporting",
      "monthly-growth-retainer",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Build workflows that do not embarrass the brand.",
    finalCtaBody:
      "Send the repetitive work you want to speed up and the risks you are worried about.",
    finalCtaButton: "Start the conversation",
  },
  {
    slug: "monthly-growth-retainer",
    title: "Monthly Growth Retainer",
    metadataDescription:
      "Monthly SEO, content, reporting, technical monitoring, and continuous improvement support without long-contract lock-in.",
    heroTitle: "Steady growth work without the long-contract fog machine.",
    heroSubtitle:
      "The Monthly Growth Retainer keeps SEO, content, reporting, technical checks, and next-step planning moving after the first audit or cleanup pass.",
    primaryCtaText: "Ask about monthly support",
    secondaryCta: {
      text: "See pricing",
      href: "/pricing/",
    },
    planningRange: {
      label: "Planning range",
      description:
        "Most Monthly Growth Retainers start in the $300 to $900 per month range depending on reporting depth, implementation support, and how much ongoing stewardship is needed.",
    },
    fixes: [
      "SEO only gets attention when something breaks.",
      "Content planning keeps restarting from scratch.",
      "Reports do not lead to implementation.",
      "Technical issues accumulate quietly.",
      "Your site needs steady stewardship, not one giant chaotic push.",
      "You want ongoing support without agency lock-in.",
    ],
    whatBohoDoes: [
      "Reviews [[google-search-console|Search Console]], [[ga4|GA4]], [[kpi|KPIs]], [[content-cluster|content clusters]], and technical priorities monthly.",
      "Maintains SEO and content action lists.",
      "Monitors technical and reporting issues.",
      "Supports page updates, briefs, internal links, and documentation.",
      "Keeps ownership and implementation notes readable.",
      "Recommends next steps based on evidence, not vibes.",
    ],
    whatYouGet: [
      "Monthly priority plan",
      "Plain-English reporting notes",
      "Technical monitoring",
      "Content and internal-link recommendations",
      "Implementation guidance",
      "Documentation trail",
    ],
    honesty:
      "A retainer should earn its place every month. If the work stops producing useful decisions or improvements, the scope should change.",
    goodFit:
      "This is a good fit after an audit, cleanup pass, website optimization pass, or provider-transfer discovery project.",
    notFit:
      "This is not a fit if you want a long contract with vague deliverables, because that is exactly the problem this brand is trying not to become.",
    owlTerms: [
      "SEO",
      "Technical SEO",
      "Content cluster",
      "Google Search Console",
      "Vanity metrics",
    ],
    relatedServiceSlugs: [
      "seo-growth-audit",
      "technical-seo-cleanup",
      "website-optimization",
    ],
    includeFieldGuide: true,
    finalCtaTitle: "Keep the trail from disappearing.",
    finalCtaBody:
      "Start with an audit or cleanup pass, then use monthly support to keep the system improving.",
    finalCtaButton: "Start the conversation",
  },
];

export const getServiceCardBySlug = (slug: string) =>
  serviceCards.find((card) => card.href === getServiceHref(slug));

export const providerTransferSteps = [
  {
    title: "Inventory",
    description:
      "Find the actual accounts, platforms, logins, files, and vendors in the current stack.",
    icon: "tabler:number-1",
  },
  {
    title: "Preserve",
    description:
      "Identify the URLs, analytics views, forms, and search signals that cannot be lost.",
    icon: "tabler:number-2",
  },
  {
    title: "Plan",
    description:
      "Document redirects, DNS changes, hosting moves, timing, and ownership handoff responsibilities.",
    icon: "tabler:number-3",
  },
  {
    title: "Move",
    description:
      "Execute the transfer carefully instead of improvising at the registrar or launch screen.",
    icon: "tabler:number-4",
  },
  {
    title: "Verify",
    description:
      "Check traffic paths, redirects, Search Console, analytics, and page behavior after launch.",
    icon: "tabler:number-5",
  },
  {
    title: "Document",
    description:
      "Leave the owner with clearer records after the move than before it.",
    icon: "tabler:number-6",
  },
];

export const dictionaryTerms: DictionaryTerm[] = dictionaryEntries.map(
  (entry) => ({
    term: entry.term,
    category: entry.category,
    definition: entry.shortDefinition,
    href: getDictionaryEntryHref(entry.slug),
  }),
);

export const warningCards = [
  {
    title: "Guaranteed rankings",
    description:
      "Search engines do not sell fixed outcomes to agencies, so this promise should trigger questions immediately.",
  },
  {
    title: "Link farms",
    description:
      "Artificial backlink schemes create fake-looking authority signals that can damage trust instead of building it.",
  },
  {
    title: "Vanity metrics",
    description:
      "If a report is full of sparkle and short on decisions, it is performance theater, not stewardship.",
  },
  {
    title: "Provider lock-in",
    description:
      "If leaving feels strangely difficult, the vendor relationship is already carrying unnecessary risk.",
  },
  {
    title: "Black-box SEO",
    description:
      "Vague language about strategy often hides the absence of a real plan or useful documentation.",
  },
  {
    title: "Private blog networks",
    description:
      "Manufactured authority shortcuts are still shortcuts, even when they arrive wearing technical vocabulary.",
  },
];
