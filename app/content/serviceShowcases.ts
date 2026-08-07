export type ServiceShowcaseAsset = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  href?: string;
  kind?: "tall" | "wide";
};

export type PrimaryServiceRoute =
  | "/services/web-design-redesign/"
  | "/services/ongoing-seo/"
  | "/services/provider-rescue/"
  | "/services/research-audits-strategy/"
  | "/services/custom-digital-solutions/";

export const serviceHeroAssets: Record<PrimaryServiceRoute, ServiceShowcaseAsset> = {
  "/services/web-design-redesign/": {
    src: "/visuals/services/web-design-redesign-v1.webp",
    alt: "A designer working at a large desktop screen in a bright studio.",
    label: "Business websites",
    caption: "Responsive design, clear customer paths, durable ownership, and a complete launch.",
    kind: "wide",
  },
  "/services/ongoing-seo/": {
    src: "/visuals/services/ongoing-seo-v1.webp",
    alt: "A team reviewing a website performance report together.",
    label: "Ongoing improvement",
    caption: "One named priority per cycle, with implementation and source-labeled measurement.",
    kind: "wide",
  },
  "/services/provider-rescue/": {
    src: "/visuals/services/provider-rescue-v1.webp",
    alt: "Technical professionals reviewing infrastructure and access details.",
    label: "Provider rescue",
    caption: "Recover control, map dependencies, and plan a responsible move before changing a working system.",
    kind: "wide",
  },
  "/services/research-audits-strategy/": {
    src: "/visuals/services/research-audits-strategy-v1.webp",
    alt: "A technical analyst reviewing research notes and measurements.",
    label: "Research and audits",
    caption: "A defined question, inspectable evidence, disclosed limits, and a practical decision set.",
    kind: "wide",
  },
  "/services/custom-digital-solutions/": {
    src: "/visuals/services/custom-digital-solutions-v1.webp",
    alt: "A software engineer working across multiple screens.",
    label: "Custom systems",
    caption: "Focused tools and integrations built around a real operating workflow.",
    kind: "wide",
  },
};

export const serviceShowcases: Record<PrimaryServiceRoute, ServiceShowcaseAsset[]> = {
  "/services/web-design-redesign/": [
    { src: "/demos/junk-removal-homepage.webp", alt: "Full homepage of the Boho junk removal demo website.", label: "$850 demo", caption: "Junk Removal Service", href: "https://junkremoval.demos.bohodigitalservices.com/", kind: "tall" },
    { src: "/demos/cafe-homepage.webp", alt: "Full homepage of the Boho local cafe demo website.", label: "$850 demo", caption: "Juniper & Finch Café", href: "https://cafe.demos.bohodigitalservices.com/", kind: "tall" },
    { src: "/demos/landscaping-homepage.webp", alt: "Full homepage of the Boho landscaping demo website.", label: "Expanded demo", caption: "Field & Stone Landscaping", href: "https://landscaping.demos.bohodigitalservices.com/", kind: "tall" },
    { src: "/demos/dentistry-homepage.webp", alt: "Full homepage of the Boho dental clinic demo website.", label: "High-end demo", caption: "Aurelia Dental & Orthodontics", href: "https://dentistry.demos.bohodigitalservices.com/", kind: "tall" },
    { src: "/demos/salon-homepage.webp", alt: "Full homepage of the Boho salon demo website.", label: "$850 demo", caption: "Honey & Ash Salon", href: "https://salon.demos.bohodigitalservices.com/", kind: "tall" },
    { src: "/demos/pet-grooming-homepage.webp", alt: "Full homepage of the Boho pet grooming demo website.", label: "$850 demo", caption: "Fuzz & Fern Pet Grooming", href: "https://grooming.demos.bohodigitalservices.com/", kind: "tall" },
  ],
  "/services/ongoing-seo/": [
    { src: "/proof/about/rank-builder-seo-homepage.png", alt: "Homepage of Rank Builder SEO, a Boho-owned public property.", label: "Boho-owned property", caption: "Rank Builder SEO · Search-focused information architecture", kind: "wide" },
    { src: "/proof/about/how-biscuit-homepage.png", alt: "Homepage of How Biscuit, a Boho-owned public property.", label: "Boho-owned property", caption: "How Biscuit · Structured editorial publishing", kind: "wide" },
    { src: "/proof/about/better-grades-homepage.png", alt: "Homepage of Better Grades, a Boho-owned public property.", label: "Boho-owned property", caption: "Better Grades · Audience-specific content paths", kind: "wide" },
    { src: "/proof/about/boho-news-homepage.png", alt: "Homepage of Boho News, a Boho-owned public property.", label: "Boho-owned property", caption: "Boho News · Repeatable publishing structure", kind: "wide" },
  ],
  "/services/provider-rescue/": [
    { src: "/visuals/migration-infrastructure.webp", alt: "Technician working with physical network infrastructure.", label: "Continuity planning", caption: "Inventory the working system before changing it", kind: "tall" },
    { src: "/diagrams/boho-hosting-architecture-v2.png", alt: "Diagram of the Boho client-owned hosting and deployment architecture.", label: "Boho architecture diagram", caption: "Client-owned accounts with a documented deployment path", kind: "wide" },
    { src: "/proof/tools/boho-secret-broker.png", alt: "Boho Secret Broker interface showing demo transfer operations.", label: "Public repository screenshot", caption: "Bounded credential transfer without exposing the secret to the operator", kind: "wide" },
    { src: "/proof/tools/bsuite-mcp-monitor.png", alt: "bSuite MCP Monitor interface showing example monitoring records.", label: "Public repository screenshot", caption: "Inspectable service health and operational evidence", kind: "wide" },
  ],
  "/services/research-audits-strategy/": [
    { src: "/proof/tools/boho-analytics-demo-command-center-20260806.webp", alt: "Boho Analytics Platform growth command center showing clearly labeled synthetic demo data and source-specific comparison cards.", label: "Free open-source system", caption: "Command center · Synthetic demo data", href: "https://github.com/bohodigital/boho-analytics-platform", kind: "wide" },
    { src: "/proof/tools/boho-analytics-demo-plot-builder-20260806.webp", alt: "Boho Analytics Platform Plot Builder showing synthetic Search Console click data with a previous-period comparison.", label: "Free open-source system", caption: "Plot Builder · Source-specific comparison · Demo data", href: "https://github.com/bohodigital/boho-analytics-platform", kind: "wide" },
    { src: "/proof/tools/boho-site-graph-demo-overview-20260806.webp", alt: "Boho Site Graph overview showing 17 synthetic demo pages, 35 unique internal-link edges, read-only graph controls, and a structural-evidence disclaimer.", label: "Free open-source graph engine", caption: "Site Graph · Complete structural accounting, not visitor behavior", href: "https://github.com/bohodigital/boho-analytics-platform/blob/main/docs/site-graph/engine.md", kind: "wide" },
    { src: "/visuals/research-notebook.webp", alt: "Open research notebook beside a laptop and reference materials.", label: "Research practice", caption: "Sources, assumptions, and limitations stay visible", kind: "tall" },
    { src: "/visuals/growth-analysis.webp", alt: "Team reviewing a detailed growth analysis on a large screen.", label: "Decision support", caption: "A short priority set connected to the evidence", kind: "wide" },
  ],
  "/services/custom-digital-solutions/": [
    { src: "/proof/tools/boho-analytics-demo-command-center-20260806.webp", alt: "Boho Analytics Platform growth command center showing clearly labeled synthetic demo data and source-specific comparison cards.", label: "Boho-built open-source system", caption: "Multi-source analytics and form monitoring · Demo data", href: "https://github.com/bohodigital/boho-analytics-platform", kind: "wide" },
    { src: "/proof/tools/boho-analytics-demo-plot-builder-20260806.webp", alt: "Boho Analytics Platform Plot Builder showing synthetic Search Console click data with a previous-period comparison.", label: "Boho-built open-source system", caption: "Configurable, source-specific plotting · Demo data", href: "https://github.com/bohodigital/boho-analytics-platform", kind: "wide" },
    { src: "/proof/tools/boho-site-graph-demo-provider-rescue-20260806.webp", alt: "Boho Site Graph showing a synthetic two-hop structural neighborhood around the Provider Rescue page with the selected page pinned.", label: "Boho-built open-source system", caption: "Revision-pinned internal-link evidence · Not user behavior", href: "https://github.com/bohodigital/boho-analytics-platform/blob/main/docs/site-graph/engine.md", kind: "wide" },
    { src: "/proof/tools/boho-secret-broker.png", alt: "Boho Secret Broker interface showing demo transfer operations.", label: "Boho-built public system", caption: "Secure, operator-approved credential transfer", kind: "wide" },
    { src: "/proof/tools/bsuite-mcp-monitor.png", alt: "bSuite MCP Monitor interface showing example service records.", label: "Boho-built public system", caption: "Monitoring for a bounded technical workflow", kind: "wide" },
    { src: "/demos/pest-control-homepage.webp", alt: "Full homepage of the Boho pest control demo website.", label: "Advanced demo website", caption: "Interactive service-area, scheduling, and assistant concepts", kind: "tall" },
    { src: "/demos/dentistry-homepage.webp", alt: "Full homepage of the Boho dental clinic demo website.", label: "Advanced demo website", caption: "Multi-location, referral, and team-directory concepts", kind: "tall" },
  ],
};

export const servicesCatalog = [
  { route: "/services/web-design-redesign/", title: "Business Websites", price: "From $850", image: "/visuals/services/web-design-redesign-v1.webp" },
  { route: "/services/ongoing-seo/", title: "Ongoing SEO & Local Growth", price: "From $450/month", image: "/visuals/services/ongoing-seo-v1.webp" },
  { route: "/services/provider-rescue/", title: "Provider Rescue", price: "Website Help from $200", image: "/visuals/services/provider-rescue-v1.webp" },
  { route: "/services/research-audits-strategy/", title: "Research & Audits", price: "Website Help from $200", image: "/visuals/services/research-audits-strategy-v1.webp" },
  { route: "/services/custom-digital-solutions/", title: "Custom Systems", price: "From $1,500", image: "/visuals/services/custom-digital-solutions-v1.webp" },
] as const;
