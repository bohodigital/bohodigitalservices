// Single maintained structured source for public-candidate prices and credit terms.
// The governed intake Markdown remains immutable evidence; the generator validates
// every rendered currency amount against this policy so copied prose cannot drift.

export const pricingPolicyVersion = "service-pages-package-v1";

export const servicePriceSummaries = {
  "/services/ongoing-seo/":
    "Reporting from $95/month · ongoing SEO work from $450/month",
  "/services/web-design-redesign/":
    "Focused improvements from $750 · new sites and redesigns from $1,500",
  "/services/provider-rescue/":
    "Assessments from $350 · migration and rescue from $1,000",
  "/services/research-audits-strategy/":
    "Monthly reports from $95 · focused audits and research from $350",
  "/services/custom-digital-solutions/":
    "Custom-project review from $500 · focused custom builds from $2,500",
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
        "Free software you or your technical provider can install and run. It can bring supported website, search, form, and system data into one place. Boho does not provide it as a hosted customer dashboard.",
      ],
      [
        "Analyst-Reviewed Monthly Report",
        "Starting at $95 per month",
        "Each month, an analyst checks the available data, explains what it does and does not show, lists the most important findings, and provides written next steps.",
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
        "Monthly work for one website and one main market. Each month includes a review, one agreed priority, the improvements included in your plan, and a written record of what was completed.",
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
        "A one-time project that fixes a small number of important problems while keeping the parts of your current website that still work.",
      ],
      [
        "New Website or Substantial Redesign",
        "Starting at $1,500",
        "A simple, complete website or major redesign with a limited number of pages and layouts, one main customer action, mobile-friendly pages, basic search setup, launch checks, and a handoff. You provide the core business information unless the proposal includes more content help.",
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
        "Quoted separately. Your proposal will name the provider, account owner, service limits, outside costs, support, backups, email setup if included, and what happens if you leave. There is no one-size-fits-all public starting price.",
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
        "A review of who owns and controls the website, what access is available, what other services depend on it, the main risks, and the recommended next step.",
      ],
      [
        "Migration or Rescue Assistance",
        "Starting at $1,000",
        "A basic move for one small website and one domain when authorized access is available. It covers ordinary hosting and domain settings, a limited number of redirects, simple forms or contact actions, launch checks, and handoff.",
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
        "A one-time review of one clear question about a small public website or digital setup, using limited available access, followed by a written recommendation.",
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
        "A review of one repeated business process to decide whether a custom tool is practical. It covers a limited number of systems, available decision-makers, key risks, and a written recommendation.",
      ],
      [
        "Focused Custom Build",
        "Starting at $2,500",
        "One small tool or simple connection between systems for one main task, with a limited number of users and systems. The starting scope includes clear inputs and outputs, a standard launch, testing, and documentation.",
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
