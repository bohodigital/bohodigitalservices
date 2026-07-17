// Single maintained structured source for public-candidate prices and credit terms.
// The governed intake Markdown remains immutable evidence; the generator validates
// every rendered currency amount against this policy so copied prose cannot drift.

export const pricingPolicyVersion = "service-pages-package-v1";

export const servicePriceSummaries = {
  "/services/ongoing-seo/":
    "Reporting from $95/month · implementation from $450/month",
  "/services/web-design-redesign/":
    "Focused improvements from $750 · new sites and redesigns from $1,500",
  "/services/provider-rescue/":
    "Assessments from $350 · migration and rescue from $1,000",
  "/services/research-audits-strategy/":
    "Monthly reports from $95 · focused audits and research from $350",
  "/services/custom-digital-solutions/":
    "Discovery from $500 · focused custom builds from $2,500",
};

export const pricingGroups = [
  {
    id: "analytics-reporting",
    eyebrow: "Measurement and decisions",
    title: "Analytics platform and analyst-reviewed reporting",
    offers: [
      [
        "Boho Analytics Platform",
        "Free",
        "Public open-source software for self-hosted, source-labeled analytics and monitoring workflows. This is not a hosted customer dashboard offer.",
      ],
      [
        "Analyst-Reviewed Monthly Report",
        "Starting at $95 per month",
        "A small reporting scope with source and data-quality review, prioritized findings, limitations, and a written decision record.",
      ],
    ],
  },
  {
    id: "ongoing-seo",
    eyebrow: "Local visibility and leads",
    title: "Ongoing SEO & Search Growth",
    offers: [
      [
        "Ongoing SEO & Search Growth",
        "Starting at $450 per month",
        "A narrow recurring implementation scope for one website, one primary market, monthly review, a defined priority, and a completed-work record.",
      ],
    ],
  },
  {
    id: "web-design",
    eyebrow: "Website work",
    title: "Web design, improvement, and redesign",
    offers: [
      [
        "Focused Website Improvement",
        "Starting at $750",
        "A bounded project addressing a small number of priority problems while the useful existing website remains in place.",
      ],
      [
        "New Website or Substantial Redesign",
        "Starting at $1,500",
        "The smallest complete public website or redesign: limited pages and templates, one primary action, prepared information, responsive implementation, search foundations, launch checks, and handoff.",
      ],
    ],
  },
  {
    id: "hosting-email",
    eyebrow: "Defined infrastructure",
    title: "Hosting and email scope",
    offers: [
      [
        "Eligible managed hosting",
        "Included only when stated",
        "Standard managed hosting may be included at no separate hosting charge for eligible websites while an active qualifying retainer remains in good standing.",
      ],
      [
        "Standalone hosting or defined email service",
        "Separately scoped",
        "The written proposal must identify the provider, ownership, limits, third-party costs, support, backups, mailbox or routing scope, and exit treatment. No standalone public minimum is asserted here.",
      ],
    ],
  },
  {
    id: "provider-rescue",
    eyebrow: "Ownership and continuity",
    title: "Website Migration & Provider Rescue",
    offers: [
      [
        "Provider Rescue Assessment",
        "Starting at $350",
        "A bounded ownership, access, dependency, and risk review with a written recommendation.",
      ],
      [
        "Migration or Rescue Assistance",
        "Starting at $1,000",
        "A straightforward minimum migration with clear authorized access, one small website and domain, ordinary hosting and DNS, limited redirects, simple customer actions, verification, and handoff.",
      ],
    ],
  },
  {
    id: "audits-strategy",
    eyebrow: "Research before recommendations",
    title: "Standalone review, audit, or research",
    offers: [
      [
        "Standalone Review, Audit, or Research",
        "Starting at $350",
        "One narrow question, a small public system, limited access, and a defined written recommendation.",
      ],
    ],
  },
  {
    id: "custom-solutions",
    eyebrow: "Focused custom engineering",
    title: "Custom Web & Digital Solutions",
    offers: [
      [
        "Custom Discovery and Feasibility",
        "Starting at $500",
        "A bounded workflow and feasibility review with limited systems, available stakeholders, risks, and a written recommendation.",
      ],
      [
        "Focused Custom Build",
        "Starting at $2,500",
        "One focused tool or simple integration with a primary workflow, limited users or systems, bounded inputs and outputs, standard deployment, testing, and documentation.",
      ],
    ],
  },
];

export const assessmentCreditPolicy = {
  summary:
    "When an eligible one-time assessment, audit, or discovery project leads to a qualifying larger engagement in the same category, Boho credits 100% of the eligible fee toward that engagement.",
  required: [
    "The assessment invoice is paid in full.",
    "The later work concerns substantially the same business and system.",
    "The larger engagement is in the same service category.",
    "The proposal is accepted within 90 days.",
    "The original research remains materially usable.",
  ],
  restrictions: [
    "The credit is non-transferable.",
    "The credit has no cash value.",
    "The credit cannot exceed the professional-service fee for the qualifying larger engagement.",
    "The credit does not apply to taxes, third-party software, domains, provider fees, advertising spend, travel, emergency or priority premiums, or other outside costs.",
    "The credit does not normally apply to recurring monthly reports, hosting, or maintenance already delivered unless a specific written proposal says otherwise.",
  ],
  changedCircumstances:
    "If the relevant system or circumstances materially change after the assessment, additional research may be required. The eligible original assessment fee remains creditable, while newly required work may be added to the later scope.",
};

export const approvedCurrencyAmounts = [
  "$95",
  "$350",
  "$450",
  "$500",
  "$750",
  "$1,000",
  "$1,500",
  "$2,500",
];
