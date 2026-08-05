export type ServiceShowcaseAsset = {
  src: string;
  alt: string;
  label: string;
  caption: string;
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
    { src: "/demos/junk-removal-homepage.webp", alt: "Full homepage of the Boho junk removal demo website.", label: "Brochure website demo", caption: "Junk removal · Full service-business homepage", kind: "tall" },
    { src: "/demos/cafe-homepage.webp", alt: "Full homepage of the Boho local cafe demo website.", label: "Brochure website demo", caption: "Local cafe · Menu, location, and social discovery", kind: "tall" },
    { src: "/demos/landscaping-homepage.webp", alt: "Full homepage of the Boho landscaping demo website.", label: "Expanded website demo", caption: "Landscaping · Services, portfolio, and location depth", kind: "tall" },
    { src: "/demos/dentistry-homepage.webp", alt: "Full homepage of the Boho dental clinic demo website.", label: "Advanced website demo", caption: "Dental clinic · Multi-location navigation and patient paths", kind: "tall" },
    { src: "/demos/salon-homepage.webp", alt: "Full homepage of the Boho salon demo website.", label: "Brochure website demo", caption: "Salon · Visual services and appointment path", kind: "tall" },
    { src: "/demos/pet-grooming-homepage.webp", alt: "Full homepage of the Boho pet grooming demo website.", label: "Brochure website demo", caption: "Pet grooming · Friendly local-service presentation", kind: "tall" },
  ],
  "/services/ongoing-seo/": [
    { src: "/proof/about/rank-builder-seo-homepage.png", alt: "Homepage of Rank Builder SEO, a Boho-owned public property.", label: "Boho-owned property", caption: "Rank Builder SEO · Search-focused information architecture", kind: "wide" },
    { src: "/proof/about/how-biscuit-homepage.png", alt: "Homepage of How Biscuit, a Boho-owned public property.", label: "Boho-owned property", caption: "How Biscuit · Structured editorial publishing", kind: "wide" },
    { src: "/proof/about/better-grades-homepage.png", alt: "Homepage of Better Grades, a Boho-owned public property.", label: "Boho-owned property", caption: "Better Grades · Audience-specific content paths", kind: "wide" },
    { src: "/proof/about/boho-news-homepage.png", alt: "Homepage of Boho News, a Boho-owned public property.", label: "Boho-owned property", caption: "Boho News · Repeatable publishing structure", kind: "wide" },
    { src: "/proof/tools/boho-analytics-dashboard-v2.png", alt: "Boho Analytics Platform dashboard showing sanitized illustrative metrics.", label: "Public repository screenshot", caption: "Source-labeled measurement · Sanitized illustrative data", kind: "wide" },
  ],
  "/services/provider-rescue/": [
    { src: "/visuals/migration-infrastructure.webp", alt: "Technician working with physical network infrastructure.", label: "Continuity planning", caption: "Inventory the working system before changing it", kind: "tall" },
    { src: "/diagrams/boho-hosting-architecture-v2.png", alt: "Diagram of the Boho client-owned hosting and deployment architecture.", label: "Boho architecture diagram", caption: "Client-owned accounts with a documented deployment path", kind: "wide" },
    { src: "/proof/tools/boho-secret-broker.png", alt: "Boho Secret Broker interface showing demo transfer operations.", label: "Public repository screenshot", caption: "Bounded credential transfer without exposing the secret to the operator", kind: "wide" },
    { src: "/proof/tools/bsuite-mcp-monitor.png", alt: "bSuite MCP Monitor interface showing example monitoring records.", label: "Public repository screenshot", caption: "Inspectable service health and operational evidence", kind: "wide" },
  ],
  "/services/research-audits-strategy/": [
    { src: "/proof/tools/boho-analytics-dashboard-v2.png", alt: "Boho Analytics Platform dashboard showing sanitized illustrative metrics.", label: "Public repository screenshot", caption: "Current dashboard · Sanitized illustrative data", kind: "wide" },
    { src: "/proof/tools/boho-analytics-platform.png", alt: "Boho Analytics Platform plot builder showing example Search Console data.", label: "Public repository screenshot", caption: "Plot builder · Source-specific analysis", kind: "wide" },
    { src: "/visuals/research-notebook.webp", alt: "Open research notebook beside a laptop and reference materials.", label: "Research practice", caption: "Sources, assumptions, and limitations stay visible", kind: "tall" },
    { src: "/visuals/growth-analysis.webp", alt: "Team reviewing a detailed growth analysis on a large screen.", label: "Decision support", caption: "A short priority set connected to the evidence", kind: "wide" },
  ],
  "/services/custom-digital-solutions/": [
    { src: "/proof/tools/boho-analytics-dashboard-v2.png", alt: "Boho Analytics Platform dashboard showing sanitized illustrative metrics.", label: "Boho-built public system", caption: "Multi-source analytics and monitoring in one focused workflow", kind: "wide" },
    { src: "/proof/tools/boho-analytics-platform.png", alt: "Boho Analytics Platform plot builder showing example data.", label: "Boho-built public system", caption: "Configurable source-specific plotting", kind: "wide" },
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
