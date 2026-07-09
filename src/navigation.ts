import { getPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Services",
      links: [
        {
          text: "Services overview",
          href: getPermalink("/services"),
        },
        {
          text: "SEO Growth Audit",
          href: getPermalink("/services/seo-growth-audit"),
        },
        {
          text: "Technical SEO Cleanup",
          href: getPermalink("/services/technical-seo-cleanup"),
        },
        {
          text: "Website Optimization",
          href: getPermalink("/services/website-optimization"),
        },
        {
          text: "Provider transfer",
          href: getPermalink("/services/provider-transfer"),
        },
      ],
    },
    {
      text: "Ask the Owl",
      href: getPermalink("/ask-the-owl"),
    },
    {
      text: "Field Guide",
      href: getPermalink("/bad-seo-field-guide"),
    },
    {
      text: "Pricing",
      href: getPermalink("/pricing"),
    },
    {
      text: "Work",
      href: getPermalink("/work"),
    },
    {
      text: "Contact",
      href: getPermalink("/contact"),
    },
  ],
  actions: [{ text: "Get a Growth Audit", href: getPermalink("/contact") }],
};

export const footerData = {
  links: [
    {
      title: "Services",
      links: [
        { text: "Services overview", href: getPermalink("/services") },
        {
          text: "SEO Growth Audit",
          href: getPermalink("/services/seo-growth-audit"),
        },
        {
          text: "Technical SEO Cleanup",
          href: getPermalink("/services/technical-seo-cleanup"),
        },
        {
          text: "Content Ecosystem Buildout",
          href: getPermalink("/services/content-ecosystem-buildout"),
        },
        {
          text: "Local SEO Foundation",
          href: getPermalink("/services/local-seo-foundation"),
        },
        {
          text: "Website Optimization",
          href: getPermalink("/services/website-optimization"),
        },
        {
          text: "Analytics & Reporting",
          href: getPermalink("/services/analytics-reporting"),
        },
        {
          text: "AI-Assisted Workflows",
          href: getPermalink("/services/ai-assisted-workflows"),
        },
        {
          text: "Provider transfer",
          href: getPermalink("/services/provider-transfer"),
        },
        {
          text: "Monthly Growth Retainer",
          href: getPermalink("/services/monthly-growth-retainer"),
        },
        { text: "Pricing", href: getPermalink("/pricing") },
        { text: "Contact", href: getPermalink("/contact") },
      ],
    },
    {
      title: "Learn",
      links: [
        { text: "Ask the Owl", href: getPermalink("/ask-the-owl") },
        { text: "Dictionary", href: getPermalink("/ask-the-owl/dictionary") },
        {
          text: "Bad SEO Field Guide",
          href: getPermalink("/bad-seo-field-guide"),
        },
        { text: "Impact", href: getPermalink("/impact") },
      ],
    },
    {
      title: "Studio",
      links: [
        { text: "Work", href: getPermalink("/work") },
        { text: "About", href: getPermalink("/about") },
        {
          text: "Email hello@bohodigitalservices.com",
          href: "mailto:hello@bohodigitalservices.com",
        },
      ],
    },
  ],
  secondaryLinks: [
    { text: "Terms", href: getPermalink("/terms") },
    { text: "Privacy Policy", href: getPermalink("/privacy") },
  ],
  socialLinks: [],
  footNote: `
    Bohemian creativity. Search-engine precision. Organic growth, engineered beautifully.
  `,
};
