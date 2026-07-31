// Canonical structured source for the four public services and their starting
// prices. Public commercial surfaces consume this record or commercialReset.ts.

export const pricingPolicyVersion = "boho-commercial-reset-phase-1";

export const servicePriceSummaries = {
  "/services/web-design-redesign/": "Business Websites — From $850",
  "/services/ongoing-seo/": "Ongoing SEO & Local Growth — From $450/month",
  "/services/#website-help": "Website Help — From $200",
  "/services/custom-digital-solutions/": "Custom Systems — From $1,500",
};

export const pricingGroups = [
  {
    key: "businessWebsites",
    id: "business-websites",
    eyebrow: "Build",
    title: "Business Websites",
    offers: [
      [
        "Business Websites",
        "From $850",
        "New website, redesign, or responsible replacement.",
      ],
    ],
  },
  {
    key: "ongoingSeo",
    id: "ongoing-seo",
    eyebrow: "Grow",
    title: "Ongoing SEO & Local Growth",
    offers: [
      [
        "Ongoing SEO & Local Growth",
        "From $450/month",
        "Continued search, local, content, technical, and analytics implementation.",
      ],
    ],
  },
  {
    key: "websiteHelp",
    id: "website-help",
    eyebrow: "Fix",
    title: "Website Help",
    offers: [
      [
        "Website Help",
        "From $200",
        "Repair, audit, provider issue, migration question, analytics, or ownership problem.",
      ],
    ],
  },
  {
    key: "customSystems",
    id: "custom-systems",
    eyebrow: "Automate",
    title: "Custom Systems",
    offers: [
      [
        "Custom Systems",
        "From $1,500",
        "Tool, integration, workflow, publishing system, or automation.",
      ],
    ],
  },
];

export const assessmentCreditPolicy = {
  summary:
    "When additional paid discovery is necessary, the proposal must define its scope and price before work begins and state whether it will be credited toward the related approved build.",
  required: [
    "The written proposal identifies the related service category.",
    "The proposal states the approval period.",
    "The original work remains materially usable.",
  ],
  restrictions: [
    "The credit is non-transferable.",
    "The credit has no cash value.",
    "The credit cannot exceed the professional-service fee for the related approved work.",
    "Third-party costs and unrelated work are separate.",
  ],
  changedCircumstances:
    "If the relevant system or circumstances materially change, additional work may require a new written scope.",
};

export const industryPriceLedger = [
  {
    key: "free-review",
    label: "Free Website Review",
    display: "Free",
    href: "/start/",
  },
  {
    key: "business-websites",
    label: "Business Websites",
    display: "From $850",
    href: "/services/web-design-redesign/",
  },
  {
    key: "ongoing-seo",
    label: "Ongoing SEO & Local Growth",
    display: "From $450/month",
    href: "/services/ongoing-seo/",
  },
  {
    key: "website-help",
    label: "Website Help",
    display: "From $200",
    href: "/services/#website-help",
  },
  {
    key: "custom-systems",
    label: "Custom Systems",
    display: "From $1,500",
    href: "/services/custom-digital-solutions/",
  },
];

export const approvedCurrencyAmounts = [
  "$0",
  "$200",
  "$450",
  "$850",
  "$1,100",
  "$1,500",
  "$3,000",
];

// The five legacy Markdown service records remain immutable historical intake
// evidence while Phase 1 renders the current service-detail adapter. Their
// generator validates only those historical records and does not drive public
// pricing.
export const legacyGeneratedCurrencyAmounts = [
  "$95",
  "$350",
  "$450",
  "$500",
  "$750",
  "$1,000",
  "$1,500",
  "$2,500",
];
