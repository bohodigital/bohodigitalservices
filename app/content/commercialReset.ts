export type CanonicalServiceKey =
  | "businessWebsites"
  | "ongoingSeo"
  | "websiteHelp"
  | "customSystems";

export type CanonicalService = {
  key: CanonicalServiceKey;
  label: string;
  shortLabel: string;
  eyebrow: string;
  priceDisplay: string;
  startingPrice: number;
  billing: "one-time" | "monthly";
  route: "/" | `/${string}`;
  servicesAnchor: string;
  homepageCopy: string;
  homepageCta: string;
  servicesDescription: string;
  servicesCta: string;
  dropdownDescription: string;
};

export const canonicalServices: ReadonlyArray<CanonicalService> = [
  {
    key: "businessWebsites",
    label: "Business Websites",
    shortLabel: "Business Websites",
    eyebrow: "BUSINESS WEBSITES",
    priceDisplay: "From $850",
    startingPrice: 850,
    billing: "one-time",
    route: "/services/web-design-redesign/",
    servicesAnchor: "business-websites",
    homepageCopy:
      "New websites, redesigns, and straightforward sites for local businesses, professionals, and independent organizations. Eligible projects include $0 hosting in an account the client owns.",
    homepageCta: "Plan a business website",
    servicesDescription:
      "A complete, responsive website for a local business, professional practice, service company, or independent organization. New build, redesign, or responsible replacement is determined by what already exists.",
    servicesCta: "Plan a business website",
    dropdownDescription: "New websites and responsible redesigns.",
  },
  {
    key: "ongoingSeo",
    label: "Ongoing SEO & Local Growth",
    shortLabel: "Ongoing SEO & Local Growth",
    eyebrow: "ONGOING SEO & LOCAL GROWTH",
    priceDisplay: "From $450/month",
    startingPrice: 450,
    billing: "monthly",
    route: "/services/ongoing-seo/",
    servicesAnchor: "ongoing-seo",
    homepageCopy:
      "Ongoing technical SEO, local visibility, content improvement, analytics, and implementation. Standard business email hosting is included with eligible active plans.",
    homepageCta: "Improve search visibility",
    servicesDescription:
      "Ongoing technical SEO, local visibility, content improvement, internal linking, analytics, and implementation for businesses with a useful reason to keep improving.",
    servicesCta: "Improve search visibility",
    dropdownDescription:
      "Search, local visibility, content, analytics, and implementation.",
  },
  {
    key: "websiteHelp",
    label: "Website Help",
    shortLabel: "Website Help",
    eyebrow: "WEBSITE HELP",
    priceDisplay: "From $200",
    startingPrice: 200,
    billing: "one-time",
    route: "/services/website-help/",
    servicesAnchor: "website-help",
    homepageCopy:
      "Repairs, audits, provider trouble, migration problems, analytics issues, accessibility fixes, and ownership cleanup.",
    homepageCta: "Fix a website problem",
    servicesDescription:
      "Fix one useful problem without automatically rebuilding everything. Website Help covers focused repairs, diagnosis, provider trouble, migration questions, analytics problems, accessibility issues, and ownership cleanup.",
    servicesCta: "Fix a website problem",
    dropdownDescription:
      "Repairs, audits, migrations, provider issues, and focused technical help.",
  },
  {
    key: "customSystems",
    label: "Custom Systems",
    shortLabel: "Custom Systems",
    eyebrow: "CUSTOM SYSTEMS",
    priceDisplay: "From $1,500",
    startingPrice: 1500,
    billing: "one-time",
    route: "/services/custom-digital-solutions/",
    servicesAnchor: "custom-systems",
    homepageCopy:
      "Focused tools, integrations, publishing systems, data workflows, and automation when ordinary software does not solve the job.",
    homepageCta: "Discuss a custom system",
    servicesDescription:
      "Focused tools, integrations, publishing systems, internal dashboards, data workflows, and automation for repeated work that ordinary software does not solve economically.",
    servicesCta: "Discuss a custom system",
    dropdownDescription:
      "Focused tools, integrations, publishing systems, and automation.",
  },
] as const;

export const canonicalServicesByKey = new Map(
  canonicalServices.map((service) => [service.key, service]),
);

export const freeReview = {
  label: "Free Website Review",
  priceDisplay: "Free",
  route: "/start/" as const,
};

export const freeReviewPage = {
  eyebrow: "FREE WEBSITE REVIEW",
  headline: "Tell us what you need. We’ll tell you the clearest next move.",
  body:
    "Send your current website or briefly describe the situation. Boho will review the public-facing experience and reply with a practical recommendation: build, improve, repair, automate, or leave it alone for now.",
  formHeading: "Start with the basics.",
  submitLabel: "Start the free review",
} as const;

export const commercialInquiryV2 = {
  start: {
    expectation:
      "No phone number required. Do not send passwords or recovery codes. Boho normally replies to standard inquiries within two business days.",
    reviewCard: {
      heading: "What the free review gives you",
      items: [
        "One clearly prioritized observation.",
        "The service path that appears most sensible.",
        "A practical next action.",
        "An honest answer when paid work is not yet justified.",
      ],
      closing:
        "This is a focused review of public information, not a complete technical audit or private-account investigation.",
      fields: [
        ["Situation", "Public website or project"],
        ["Review type", "Initial public review"],
        ["Result", "Recommended next step"],
        ["Cost", "Free"],
      ],
    },
    reassurance: [
      "Owner-operated",
      "Direct technical lead",
      "Client-controlled accounts",
      "Real systems available to inspect",
    ],
    formBody:
      "Your name, email, business, general need, and a brief description are enough to begin. Optional details can help Boho respond more precisely, but they are not required to submit the request.",
    requiredNote: "Required fields are marked. Existing websites are helpful but not required.",
    expectationCard: {
      heading: "Before you send",
      items: [
        "Boho reviews public information first.",
        "Do not submit passwords, private customer records, payment information, or recovery codes.",
        "Submitting the form does not create a client relationship or reserve availability.",
        "Urgent live incidents belong on the Emergency Help page.",
      ],
    },
    success: {
      heading: "Your review request was sent.",
      body:
        "Boho will review the public information and reply through the email address you provided. Submission does not create a client relationship or guarantee project acceptance or timing.",
    },
  },
  emergency: {
    eyebrow: "EMERGENCY WEBSITE HELP",
    headline: "Something broke. Start with the safest next move.",
    body:
      "If a live website, form, domain, launch, redirect, tracking system, or provider problem is actively hurting customers or operations, send the facts. Boho will assess the impact, the likely failure point, and the safest available path.",
    trust:
      "Do not send passwords or recovery codes. Authorized access is arranged only after the problem, scope, and fit are understood.",
    firstResponse: {
      heading: "Before changing anything else",
      steps: [
        ["Record what happened", "Save the exact URL, visible error, approximate start time, affected device or browser, and screenshots when possible."],
        ["Record what changed", "Note any launch, update, plugin, DNS, domain, provider, tracking, or account change made shortly before the problem appeared."],
        ["Preserve access", "Do not repeatedly reset accounts, replace DNS records, delete deployments, or remove the last working version unless there is a documented reason."],
      ],
      closing:
        "The goal is not to freeze forever. It is to stop untracked changes from destroying the evidence needed to diagnose the failure.",
    },
    fit: {
      heading: "Use Emergency Help when the problem is active and consequential.",
      cards: [
        ["Customers cannot act", "Contact forms, booking, checkout, phone links, or other important customer paths are failing."],
        ["The public site is unavailable", "The website or domain does not load, resolves incorrectly, or shows the wrong deployment."],
        ["A launch or migration failed", "Pages disappeared, redirects broke, mobile layouts failed, or the replacement damaged important public paths."],
        ["Access or provider control failed", "The business lost authorized access to a domain, host, website, analytics property, or another critical system."],
        ["Search damage is actively spreading", "Important URLs were removed, redirected incorrectly, blocked, or replaced during a recent change."],
        ["Measurement disappeared after a change", "Forms, analytics, or conversion events stopped working when the business urgently needs reliable operational information."],
      ],
    },
    process: [
      ["Triage the impact", "Determine what is failing, who is affected, when it started, and what business action is being lost."],
      ["Stabilize the system", "Stop harmful changes, preserve working access and evidence, and identify the safest temporary state."],
      ["Diagnose the cause", "Review the relevant website, domain, provider, deployment, redirect, form, analytics, or access path."],
      ["Repair or route", "Complete the authorized repair when it fits Boho’s scope, or identify the provider or specialist that must take over."],
    ],
    pricing: {
      heading: "Urgent work is scoped before paid work begins.",
      body:
        "Focused Website Help starts at $200. Urgency, uncertain access, multiple affected systems, recovery work, migration damage, or provider coordination can increase the scope. Boho confirms availability, boundaries, and price before implementation begins.",
      clarification:
        "Submitting an emergency request is not a paid engagement and does not guarantee immediate availability.",
    },
    boundaries: [
      ["Authorized access only", "Boho works through owner-authorized accounts, provider invitations, and documented recovery processes. Boho does not bypass credentials, impersonate account owners, defeat platform security, or claim control it does not have."],
      ["When another responder is required", "A registrar, hosting provider, email provider, payment processor, cybersecurity specialist, insurer, attorney, law-enforcement agency, or emergency service may control part of the response. When the incident belongs elsewhere, Boho should say so plainly rather than pretending every catastrophe is an upsell opportunity."],
    ],
  },
  serviceCards: [
    ["Business Website", "Business website", "Build a new website or responsibly replace an existing one.", "From $850"],
    ["Ongoing SEO & Local Growth", "SEO and local growth", "Improve search visibility, content, measurement, and customer paths over time.", "From $450/month"],
    ["Website Help", "Website help", "Fix, investigate, migrate, recover, or improve one defined website problem.", "From $200"],
    ["Custom System", "Custom system", "Build a focused tool, integration, workflow, publishing system, or automation.", "From $1,500"],
    ["Not sure", "Not sure yet", "Describe the situation and Boho will route it.", "No category required"],
  ],
} as const;

export const freeReviewServiceLabels = {
  businessWebsite: "Business Website",
  ongoingSeo: "Ongoing SEO & Local Growth",
  websiteHelp: "Website Help",
  customSystem: "Custom System",
  unsure: "Not sure",
} as const;

export const freeReviewServiceOptions = [
  {
    label: freeReviewServiceLabels.businessWebsite,
    backendValue: "Business Websites",
  },
  {
    label: freeReviewServiceLabels.ongoingSeo,
    backendValue: "Ongoing SEO & Local Growth",
  },
  {
    label: freeReviewServiceLabels.websiteHelp,
    backendValue: "Website Help",
  },
  {
    label: freeReviewServiceLabels.customSystem,
    backendValue: "Custom Systems",
  },
  {
    label: freeReviewServiceLabels.unsure,
    backendValue: "Not sure yet",
  },
] as const;

export const hostingQualification =
  "For eligible static websites using Cloudflare’s Free plan. Domain registration, paid third-party services, ongoing maintenance, and infrastructure beyond the Free plan are separate. Cloudflare controls its plan, terms, limits, and availability.";

export const emailBenefitCopy =
  "Eligible active Ongoing SEO & Local Growth retainers include standard custom-domain email hosting for one business domain at no additional charge, subject to the mailbox, storage, sending, administration, and support limits stated in the written agreement.\n\nBulk marketing, office-suite licenses, regulated archiving, complex migrations, unusually high usage, and unlimited support are separate.\n\nWhen the SEO retainer ends, the client may assume the provider cost or migrate to another provider. The domain and business email addresses remain under the client’s control.";

export const websiteScopeExamples = [
  {
    heading: "Straightforward scope",
    price: "From $850",
    servicesLabel: "Straightforward",
    servicesPrice: "From $850",
    copy:
      "Up to five straightforward pages, one primary customer action, standard forms, and established third-party links.",
    servicesCopy:
      "One organization, up to five straightforward pages, one primary customer action, standard forms, and established third-party links.",
  },
  {
    heading: "Expanded scope",
    price: "Usually $1,100–$1,500",
    servicesLabel: "Expanded",
    servicesPrice: "Usually $1,100–$1,500",
    copy:
      "More pages, deeper copy development, richer visual presentation, additional services, forms, resources, locations, or content types.",
    servicesCopy:
      "More pages, richer copy and design, additional services, resources, locations, forms, or content types.",
  },
  {
    heading: "Integrated or multi-location scope",
    price: "Usually $1,500–$3,000+",
    servicesLabel: "Integrated or multi-location",
    servicesPrice: "Usually $1,500–$3,000+",
    copy:
      "Multiple locations, third-party integrations, larger migrations, content-management needs, or several customer paths.",
    servicesCopy:
      "Multiple locations, third-party integrations, content-management needs, provider migration, larger redirects, or several customer paths.",
  },
  {
    heading: "Custom application",
    price: "Quoted separately",
    servicesLabel: "Custom application",
    servicesPrice: "Quoted separately",
    copy:
      "Customer accounts, live databases, custom payment flows, real-time data, complex scheduling, or bespoke operational systems.",
    servicesCopy:
      "Customer accounts, real-time data, payment logic, complex scheduling, operational databases, or bespoke application behavior.",
  },
] as const;

export const sharedScopeNote =
  "Starting prices apply to the smallest complete scope. Pages, content, locations, integrations, migration condition, third-party systems, urgency, access, and custom functionality can change the quote. The written proposal states the exact work, price, ownership, dependencies, and outside costs before the project begins.";

export const homepageFaqs = [
  {
    question: "Is the website itself free?",
    answer:
      "No. Business Website projects start at $850. Eligible hosting costs $0 per month.",
  },
  {
    question: "Why can hosting be free?",
    answer:
      "Many static business websites can operate within Cloudflare’s Free plan. Boho builds the website for that infrastructure instead of reselling a conventional hosting subscription.",
  },
  {
    question: "Does hosting remain free if I leave Boho?",
    answer:
      "Leaving Boho does not create a hosting charge from us. The website remains in the client’s Cloudflare account. Cloudflare controls its own plans, terms, limits, and future availability.",
  },
  {
    question: "What websites may not qualify?",
    answer:
      "Ecommerce, customer accounts, complex scheduling, large databases, high-volume applications, bespoke operational systems, and websites requiring contractual service levels may need paid infrastructure.",
  },
  {
    question: "Who owns the domain and hosting account?",
    answer:
      "The client should own the domain, Cloudflare account, recovery methods, and agreed website source. Boho works through authorized access.",
  },
  {
    question: "Are maintenance and updates also free?",
    answer:
      "No. Hosting infrastructure and ongoing labor are different things. Content changes, monitoring, maintenance, support, and new development are separate unless included in an active written plan.",
  },
] as const;

export const pricingFaqs = [
  {
    question: "Is the website itself free?",
    answer:
      "No. Business Website projects start at $850. Eligible hosting costs $0 per month.",
  },
  {
    question: "What fits the $850 starting scope?",
    answer:
      "A small, complete static website with up to five straightforward pages, one primary customer action, responsive design, light copy shaping, a contact path, search foundations, launch checks, and client-owned deployment.",
  },
  {
    question: "Can a redesign also start at $850?",
    answer:
      "Yes, when the smallest complete replacement fits the same straightforward scope. Migration, redirects, content preservation, technical damage, provider problems, and additional functionality can increase the quote.",
  },
  {
    question: "What does the $450 SEO retainer include?",
    answer:
      "The starting retainer covers one straightforward website and market with a named monthly priority, an agreed amount of implementation, basic monitoring, analytics review, and a completed-work record. Broader markets, locations, content programs, or implementation capacity increase the price.",
  },
  {
    question: "What can Website Help cover for $200?",
    answer:
      "One bounded issue or diagnosis, such as a broken form, mobile problem, analytics defect, redirect issue, ownership review, or focused page problem. Larger repair and migration work receives a written quote.",
  },
  {
    question: "What can a $1,500 Custom System include?",
    answer:
      "One focused tool, integration, or automation with a defined workflow, limited users or systems, bounded inputs and outputs, standard deployment, testing, and documentation.",
  },
  {
    question: "Are outside provider costs included?",
    answer:
      "Only when the written proposal says so. Domains, scheduling systems, ecommerce platforms, paid software, payment processing, licensing, email providers, and other third-party charges are otherwise separate.",
  },
] as const;

export const proofProjects = [
  {
    name: "Boho News",
    label: "BOHO-OWNED PROPERTY",
    copy:
      "A multi-section news publication built for fast reporting, investigations, public documents, data presentations, corrections, search, feeds, and disciplined editorial governance.",
    href: "https://www.bohonews.com/",
    image: "/proof/about/boho-news-homepage.png",
    alt: "Boho News homepage showing its market desk, news masthead, lead investigation, data report, and continuous latest-news desk.",
  },
  {
    name: "How Biscuit",
    label: "BOHO-OWNED PROPERTY",
    copy:
      "A consumer how-to publication with structured guides, media handling, topic architecture, search paths, and reusable publishing workflows.",
    href: "https://howbiscuit.com/",
    image: "/proof/about/how-biscuit-homepage.png",
    alt: "How Biscuit homepage showing category navigation, a practical guide hero, and supporting article sections.",
  },
  {
    name: "Rank Builder SEO",
    label: "BOHO-OWNED PROPERTY",
    copy:
      "An SEO research and education property with controlled topic architecture, technical resources, internal linking, structured data, and measurement systems.",
    href: "https://rankbuilderseo.com/",
    image: "/proof/about/rank-builder-seo-homepage.png",
    alt: "Rank Builder SEO homepage showing its independent SEO research desk masthead and editorial hero.",
  },
  {
    name: "Better Grades",
    label: "BOHO-OWNED PROPERTY",
    copy:
      "An educational platform with courses, worked explanations, practice material, calculators, diagnostics, and large interconnected content systems.",
    href: "https://bettergrades.net/",
    image: "/proof/about/better-grades-homepage.png",
    alt: "Better Grades homepage showing its math-help search interface and interactive learning content.",
  },
] as const;
