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
  headline: "Get a clear next step for your website.",
  body:
    "Send the current website or briefly describe what the business needs. Boho will review the visible situation and explain whether the best starting point is a business website, ongoing SEO, focused website help, or custom work.",
  formHeading: "Request your free review",
  submitLabel: "Request my free review",
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
