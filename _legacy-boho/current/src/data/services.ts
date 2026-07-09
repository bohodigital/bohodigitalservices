export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  cardEyebrow: string;
  title: string;
  heroTitle: string;
  description: string;
  heroDescription: string;
  metaDescription: string;
  outcomes: string[];
  deliverables: string[];
  rightFor: string[];
  faqs: ServiceFaq[];
  glossary: string[];
}

export const services: ServiceDetail[] = [
  {
    slug: "seo-growth-audit",
    cardEyebrow: "Start here",
    title: "SEO Growth Audit",
    heroTitle: "See the trail before you spend more energy walking it.",
    description: "A written roadmap for visibility, structure, content gaps, and the order of operations.",
    heroDescription:
      "The Growth Audit is the cleanest first move when the site feels messy, the reporting feels vague, or the team needs a sharper order of operations before doing more work.",
    metaDescription:
      "A Boho Digital growth audit maps technical issues, content gaps, and next steps into a written SEO plan.",
    outcomes: [
      "Priority-ordered technical and content findings.",
      "A realistic sequence of next steps instead of a grab bag of fixes.",
      "A clearer decision about what to do in-house and what to delegate."
    ],
    deliverables: [
      "Search visibility review",
      "Technical SEO and crawl review",
      "Content and internal-link observations",
      "Competitor and SERP context",
      "Action roadmap with sequencing notes"
    ],
    rightFor: [
      "Brands that need clarity before committing to a bigger rebuild.",
      "Teams with mixed signals from previous SEO work.",
      "Founders who want the map, not a mystery package."
    ],
    faqs: [
      {
        question: "Is this implementation or strategy?",
        answer: "It is a strategy-first deliverable with concrete implementation notes, priorities, and next-step guidance."
      },
      {
        question: "Can we use the audit without a retainer?",
        answer: "Yes. The audit is built to be usable whether Boho implements the work or your team carries it forward."
      }
    ],
    glossary: ["seo", "technical-seo", "crawlability", "google-search-console"]
  },
  {
    slug: "technical-seo-cleanup",
    cardEyebrow: "Cleanup",
    title: "Technical SEO Cleanup",
    heroTitle: "Clear the structural friction before it keeps costing visibility.",
    description: "Fix crawl issues, indexing drift, metadata, internal links, and site health basics.",
    heroDescription:
      "This is the under-the-hood cleanup for sites that already have decent substance but need steadier structure, better crawl paths, and fewer invisible points of failure.",
    metaDescription:
      "Technical SEO cleanup for crawl issues, indexing problems, metadata, internal links, and structural search health.",
    outcomes: [
      "Reduced technical drag around crawling and indexing.",
      "Cleaner internal linking and page-level search signals.",
      "Stronger documentation around what changed and why."
    ],
    deliverables: [
      "Metadata and template review",
      "Indexing and crawl checks",
      "Internal-link and hierarchy cleanup",
      "Redirect and canonical spot checks",
      "Post-fix QA notes"
    ],
    rightFor: [
      "Sites with known structural issues.",
      "Rebuilt sites that lost clarity after launch.",
      "Teams who need implementation receipts, not just recommendations."
    ],
    faqs: [
      {
        question: "Does this include content writing?",
        answer: "Only where small copy or metadata changes are part of the cleanup. Bigger content work belongs in content ecosystem buildout."
      },
      {
        question: "Do you document the changes?",
        answer: "Yes. Boho leaves a plain-English record of what changed so the next person can follow the trail."
      }
    ],
    glossary: ["technical-seo", "crawlability", "indexing", "redirect-map"]
  },
  {
    slug: "content-strategy",
    cardEyebrow: "Content",
    title: "Content Ecosystem Buildout",
    heroTitle: "Build content that supports the whole forest instead of adding more clutter.",
    description: "Build service pages, clusters, guides, and conversion paths that support long-term discovery.",
    heroDescription:
      "This service maps the relationship between service pages, supporting guides, glossary content, and conversion paths so the content system compounds instead of cannibalizing itself.",
    metaDescription:
      "Content ecosystem planning and buildout for service pages, clusters, guides, and stronger discovery paths.",
    outcomes: [
      "Clearer content hierarchy and role definition.",
      "Better internal linking between service and support content.",
      "A usable roadmap for future publishing without sprawl."
    ],
    deliverables: [
      "Content architecture and cluster planning",
      "Service-page and guide recommendations",
      "Internal-linking logic",
      "Editorial sequencing notes",
      "Conversion path observations"
    ],
    rightFor: [
      "Businesses with scattered blog content and weak service pages.",
      "Studios that want authority-building content without random volume.",
      "Teams building around expertise rather than trend chasing."
    ],
    faqs: [
      {
        question: "Do you write the content too?",
        answer: "Boho can scope writing support, but the buildout itself focuses on structure, priorities, and content relationships."
      },
      {
        question: "Is this only for blogging?",
        answer: "No. It covers service pages, educational assets, FAQ layers, glossary systems, and supporting cluster content."
      }
    ],
    glossary: ["search-intent", "content-cluster", "metadata", "internal-links"]
  },
  {
    slug: "local-seo",
    cardEyebrow: "Local",
    title: "Local SEO Foundation",
    heroTitle: "Help the right local audience find the right page without extra fog.",
    description: "Give map-pack and service-area businesses cleaner structure, trust signals, and local page logic.",
    heroDescription:
      "Local SEO foundation work focuses on place signals, service-area clarity, page structure, and the consistency needed for local discovery to feel credible.",
    metaDescription:
      "Local SEO setup for service-area businesses that need cleaner place signals, page structure, and local trust cues.",
    outcomes: [
      "Clearer local service structure and location targeting.",
      "Better alignment between business reality and what search engines see.",
      "Stronger foundations before more aggressive local campaigns."
    ],
    deliverables: [
      "Location and service-page review",
      "Map-pack signal observations",
      "On-site local content recommendations",
      "Trust and conversion cue review",
      "Local reporting notes"
    ],
    rightFor: [
      "Service-area businesses with confusing local page setup.",
      "Brands expanding into new regions carefully.",
      "Teams who need local structure before running more acquisition campaigns."
    ],
    faqs: [
      {
        question: "Is this for one location or several?",
        answer: "Either. The work scales from a single location foundation to a multi-area structure plan."
      },
      {
        question: "Does this replace reviews and reputation work?",
        answer: "No. It supports those efforts by making the website and local signals easier to trust."
      }
    ],
    glossary: ["seo", "search-intent", "metadata", "google-search-console"]
  },
  {
    slug: "website-optimization",
    cardEyebrow: "Site",
    title: "Website Optimization",
    heroTitle: "Tighten the site experience so the message and the machine agree.",
    description: "Speed, UX, copy clarity, and calmer front-end systems for websites that need sharper fundamentals.",
    heroDescription:
      "Website optimization blends page speed, content clarity, layout cleanup, and conversion support so the site earns more trust before traffic is even the problem.",
    metaDescription:
      "Website optimization for speed, UX clarity, front-end cleanup, and calmer conversion-focused page structure.",
    outcomes: [
      "Less visual friction and cleaner user journeys.",
      "Sharper message hierarchy on high-value pages.",
      "A lighter, more intentional front-end system."
    ],
    deliverables: [
      "Page experience and clarity review",
      "Front-end optimization notes",
      "Conversion path recommendations",
      "Content hierarchy cleanup",
      "Implementation checklist"
    ],
    rightFor: [
      "Sites that feel visually noisy or hard to trust.",
      "Rebrands that need the website to catch up.",
      "Teams who know the site is slowing down good leads."
    ],
    faqs: [
      {
        question: "Is this a full website rebuild?",
        answer: "Not automatically. It can start as a focused optimization pass and expand if the structure truly needs a rebuild."
      },
      {
        question: "Does this cover SEO too?",
        answer: "Yes, where page structure and content clarity affect search performance and conversions."
      }
    ],
    glossary: ["technical-seo", "metadata", "search-intent", "ai-assisted-workflow"]
  },
  {
    slug: "analytics-reporting",
    cardEyebrow: "Signals",
    title: "Analytics & Reporting",
    heroTitle: "Turn scattered numbers into reporting a human can actually use.",
    description: "Measurement that explains what moved, what did not, and what the team should decide next.",
    heroDescription:
      "This work focuses on measurement sanity: deciding what matters, reducing vanity metrics, and giving teams reporting they can act on without interpretation theater.",
    metaDescription:
      "Analytics and reporting support for cleaner measurement, less vanity-metric fog, and clearer next-step decisions.",
    outcomes: [
      "Reporting tied to decisions instead of performance cosplay.",
      "Cleaner continuity across analytics and Search Console.",
      "Better confidence in what changed after a launch or campaign."
    ],
    deliverables: [
      "Analytics continuity review",
      "Reporting framework recommendations",
      "KPI and vanity-metric cleanup",
      "Dashboard or summary structure guidance",
      "Decision-oriented notes"
    ],
    rightFor: [
      "Teams who have data but not clarity.",
      "Brands recovering from a migration or reporting handoff.",
      "Operators tired of pretty dashboards with no next move."
    ],
    faqs: [
      {
        question: "Will this replace our analyst?",
        answer: "No. It helps the reporting system become clearer and more useful, whether an analyst, marketer, or founder is reading it."
      },
      {
        question: "Can this be part of a migration?",
        answer: "Yes. Analytics continuity is often a major part of provider transfer and relaunch work."
      }
    ],
    glossary: ["google-search-console", "vanity-metrics", "seo", "redirect-map"]
  },
  {
    slug: "ai-assisted-workflows",
    cardEyebrow: "Workflow",
    title: "AI-Assisted Workflows",
    heroTitle: "Use AI where it reduces drag, not where it muddies judgment.",
    description: "Human-led systems for research, drafting, categorization, and leaner digital operations.",
    heroDescription:
      "Boho designs AI-assisted workflows around repeatable operational pain: drafting support, classification, analysis passes, documentation flow, and cleaner handoffs.",
    metaDescription:
      "AI-assisted workflow design for research, drafting, categorization, and leaner digital operations with human oversight.",
    outcomes: [
      "Lower drag around repetitive digital tasks.",
      "Cleaner documentation and handoff behavior.",
      "A more honest relationship between automation and human review."
    ],
    deliverables: [
      "Workflow audit and pain-point mapping",
      "Automation and tooling recommendations",
      "Prompt and process structure notes",
      "Governance and review guidance",
      "Climate-aware efficiency considerations"
    ],
    rightFor: [
      "Teams exploring AI without wanting chaos.",
      "Studios that need faster workflows with guardrails.",
      "Operators who care about clarity, auditability, and footprint."
    ],
    faqs: [
      {
        question: "Is this AI content spam?",
        answer: "No. The goal is operational leverage with human oversight, not low-trust automation theater."
      },
      {
        question: "Do you account for footprint and governance?",
        answer: "Yes. Boho treats workflow design and climate-aware tradeoffs as part of the same conversation."
      }
    ],
    glossary: ["ai-assisted-workflow", "climate-aware-workflow", "provider-lock-in", "vanity-metrics"]
  },
  {
    slug: "provider-transfer",
    cardEyebrow: "Transfer",
    title: "SEO & Hosting Provider Transfer",
    heroTitle: "Switch providers without losing the trail.",
    description: "Untangle access, redirect planning, hosting changes, DNS, analytics, and search preservation.",
    heroDescription:
      "Moving away from an old SEO agency, hosting provider, website platform, or messy vendor setup can be stressful. Boho Digital helps map the transfer, preserve search value, and clean up the handoff step by step.",
    metaDescription:
      "Provider-transfer support for DNS, hosting, redirects, analytics continuity, access inventory, and search preservation.",
    outcomes: [
      "Cleaner exits from undocumented or high-friction provider setups.",
      "Reduced risk around redirects, analytics, and search continuity.",
      "Owner-facing documentation after the move is complete."
    ],
    deliverables: [
      "Access and platform inventory",
      "Redirect and migration planning",
      "DNS and hosting coordination notes",
      "Analytics and Search Console continuity review",
      "Post-transfer QA and documentation"
    ],
    rightFor: [
      "Businesses leaving an old SEO or hosting provider.",
      "Replatforming projects with real visibility risk.",
      "Founders who do not have every credential or detail organized yet."
    ],
    faqs: [
      {
        question: "Can you help if we do not have all the logins?",
        answer: "Yes. Part of the work is identifying what is missing, what matters first, and how to recover the trail."
      },
      {
        question: "Does this include post-launch verification?",
        answer: "Yes. Transfer work is not finished until the search, tracking, and ownership layers are checked after the move."
      }
    ],
    glossary: ["dns", "hosting-provider", "redirect-map", "seo-migration", "provider-lock-in"]
  },
  {
    slug: "monthly-growth-retainer",
    cardEyebrow: "Ongoing",
    title: "Monthly Growth Retainer",
    heroTitle: "Keep the system moving with steady, documented support.",
    description: "Steady support for optimization, implementation notes, reporting, and practical next steps.",
    heroDescription:
      "The retainer is for teams who already know the direction and want a thoughtful partner to keep the site, reporting, content, and optimization work moving without agency fog.",
    metaDescription:
      "A monthly growth retainer for ongoing optimization, reporting, implementation support, and documented next steps.",
    outcomes: [
      "Consistent momentum without over-buying scope.",
      "Documented monthly progress and decisions.",
      "A calmer operating rhythm for growth work."
    ],
    deliverables: [
      "Monthly optimization priorities",
      "Reporting and interpretation notes",
      "Implementation or coordination support",
      "Content and technical recommendations",
      "Decision-ready next steps"
    ],
    rightFor: [
      "Teams with a clear direction but limited execution bandwidth.",
      "Brands who prefer steady compounding work to big sporadic sprints.",
      "Leaders who want a partner that documents the trail."
    ],
    faqs: [
      {
        question: "Do you lock clients into long contracts?",
        answer: "No fox traps here. Retainers should stay because they are useful, not because leaving is painful."
      },
      {
        question: "Can the retainer include transfer or analytics work?",
        answer: "Yes, if that is part of the active priority mix for the month."
      }
    ],
    glossary: ["provider-lock-in", "vanity-metrics", "ai-assisted-workflow", "seo"]
  }
];

export const servicesBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
) as Record<string, ServiceDetail>;
