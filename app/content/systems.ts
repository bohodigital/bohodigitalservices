export type SystemFamilyId =
  | "websites-publishing"
  | "hosting-release"
  | "measurement-search-signals"
  | "operations-automation"
  | "secure-integrations-custom-tools";

export type SystemFamily = {
  id: SystemFamilyId;
  title: string;
  summary: string;
  serviceHref: `/${string}`;
  glossaryHref: `/learn/glossary/#cluster-${string}`;
  proofHref: `#${string}`;
  visualHref: `#visual-${string}`;
};

export const systemFamilies = [
  {
    id: "websites-publishing",
    title: "Websites & Publishing",
    summary: "Distinctive websites, structured content, reusable page systems, and publishing workflows designed around search, ownership, and customer action.",
    serviceHref: "/services/website-design-redesign/",
    glossaryHref: "/learn/glossary/#cluster-websites-and-content-systems",
    proofHref: "#websites",
    visualHref: "#visual-layered-infrastructure",
  },
  {
    id: "hosting-release",
    title: "Hosting & Release",
    summary: "Versioned source, private previews, controlled production releases, rollback paths, and documented ownership built on mature delivery infrastructure.",
    serviceHref: "/services/website-design-redesign/",
    glossaryHref: "/learn/glossary/#cluster-source-control-and-deployment",
    proofHref: "#websites",
    visualHref: "#visual-layered-infrastructure",
  },
  {
    id: "measurement-search-signals",
    title: "Measurement & Search Signals",
    summary: "Website behavior, search performance, technical health, and business-specific actions collected from appropriate sources and turned into useful decisions.",
    serviceHref: "/services/research-audits-analytics/",
    glossaryHref: "/learn/glossary/#cluster-analytics-and-measurement",
    proofHref: "#selected-tools",
    visualHref: "#visual-layered-infrastructure",
  },
  {
    id: "operations-automation",
    title: "Operations & Automation",
    summary: "Repeated intake, review, publishing, monitoring, and coordination tasks moved through controlled workflows with human approval where it matters.",
    serviceHref: "/services/custom-tools-automation/",
    glossaryHref: "/learn/glossary/#cluster-automation-and-agent-systems",
    proofHref: "#selected-tools",
    visualHref: "#visual-repair-integrate-build",
  },
  {
    id: "secure-integrations-custom-tools",
    title: "Secure Integrations & Custom Tools",
    summary: "APIs, dashboards, forms, monitoring, calculators, and internal utilities built or connected when ordinary software leaves an important gap.",
    serviceHref: "/services/custom-tools-automation/",
    glossaryHref: "/learn/glossary/#cluster-apis-and-integrations",
    proofHref: "#selected-tools",
    visualHref: "#visual-repair-integrate-build",
  },
] as const satisfies ReadonlyArray<SystemFamily>;

export type SelectedToolId =
  | "bsuite-mcp-monitor"
  | "secret-broker"
  | "analysis-dashboard";

export type SelectedToolProfile = {
  id: SelectedToolId;
  displayName: string;
  shortPublicSummary: string;
  publicMemo: string;
  problemAddressed?: string;
  bohoRole?: "built" | "integrated" | "extended" | "automated" | "operated" | "adapted";
  systemFamily?: SystemFamilyId;
  currentStatus?: string;
  publicAvailability?: string;
  openSourceStatus?: string;
  repositoryUrl: `https://github.com/${string}`;
  demonstrationUrl?: `https://${string}`;
  maturePlatformsUsed?: ReadonlyArray<string>;
  dataHandled?: ReadonlyArray<string>;
  limitations?: ReadonlyArray<string>;
  ownershipAndPortabilityNote?: string;
  relatedService?: `/${string}`;
  relatedGlossaryTerms?: ReadonlyArray<string>;
  image: {
    src: `/proof/tools/${string}.png`;
    alt: string;
    sourceUrl: `https://${string}`;
    evidenceType: "repository-screenshot" | "github-repository-preview";
  };
  lastVerified: `${number}-${number}-${number}`;
  evidenceSource: string;
};

export const selectedTools: ReadonlyArray<SelectedToolProfile> = [
  {
    id: "bsuite-mcp-monitor",
    displayName: "bSuite MCP Monitor",
    shortPublicSummary: "A lightweight Linux terminal dashboard for operating MCP servers and the host, network, tunnel, usage, and authentication signals around them.",
    publicMemo: "bSuite brings service health, local listeners, tunnel reachability, command telemetry, usage limits, SSH posture, and configured authentication checks into one operator view. It helps make the automation layer observable before anyone relies on it.",
    systemFamily: "operations-automation",
    publicAvailability: "Public GitHub repository",
    openSourceStatus: "MIT licensed",
    repositoryUrl: "https://github.com/bohodigital/bsuite-mcp-monitor",
    relatedService: "/services/custom-tools-automation/",
    relatedGlossaryTerms: ["mcp", "monitoring", "automation"],
    image: {
      src: "/proof/tools/bsuite-mcp-monitor.png",
      alt: "GitHub repository preview for bohodigital/bsuite-mcp-monitor.",
      sourceUrl: "https://github.com/bohodigital/bsuite-mcp-monitor",
      evidenceType: "github-repository-preview",
    },
    lastVerified: "2026-07-16",
    evidenceSource: "Public repository bohodigital/bsuite-mcp-monitor main branch reviewed 2026-07-16",
  },
  {
    id: "secret-broker",
    displayName: "Boho Secret Broker",
    shortPublicSummary: "A public, self-hosted tool for moving secrets and small configuration files over SSH.",
    publicMemo: "Secret Broker makes the configuration boundary visible: values are entered locally and delivered through a restricted OpenSSH path to host-approved records or file targets. It supports analytics, search, and deployment work without turning ordinary documents or chat into secret transport.",
    systemFamily: "secure-integrations-custom-tools",
    currentStatus: "Alpha · v0.2.0",
    publicAvailability: "Public GitHub repository",
    openSourceStatus: "MIT licensed",
    repositoryUrl: "https://github.com/bohodigital/boho-secret-broker",
    relatedService: "/services/custom-tools-automation/",
    relatedGlossaryTerms: ["mcp", "api-key", "tls"],
    image: {
      src: "/proof/tools/boho-secret-broker.png",
      alt: "Boho Secret Broker desktop overview showing transfer operations and connection details with demo data.",
      sourceUrl: "https://github.com/bohodigital/boho-secret-broker/blob/main/docs/images/boho-secret-broker-overview.png",
      evidenceType: "repository-screenshot",
    },
    lastVerified: "2026-07-16",
    evidenceSource: "Public repository bohodigital/boho-secret-broker main branch reviewed 2026-07-16",
  },
  {
    id: "analysis-dashboard",
    displayName: "Boho Analytics Platform",
    shortPublicSummary: "A lightweight dashboard for source-labeled website analytics, search performance, traffic infrastructure, and form-delivery monitoring.",
    publicMemo: "The dashboard puts Umami, Cloudflare, Google Analytics, Search Console, and form-monitoring records into one source-labeled view. For SEO work, it helps separate discovery signals from on-site behavior and infrastructure traffic instead of silently treating unlike metrics as the same thing.",
    systemFamily: "measurement-search-signals",
    currentStatus: "Stable · v0.1.0",
    publicAvailability: "Public GitHub repository",
    openSourceStatus: "MIT licensed",
    repositoryUrl: "https://github.com/bohodigital/boho-analytics-platform",
    relatedService: "/services/research-audits-analytics/",
    relatedGlossaryTerms: ["analytics", "google-search-console", "measurement-plan"],
    image: {
      src: "/proof/tools/boho-analytics-platform.png",
      alt: "Boho Analytics time-series plot builder using public example Search Console data.",
      sourceUrl: "https://github.com/bohodigital/boho-analytics-platform/blob/main/docs/images/boho-analytics-plot-builder.png",
      evidenceType: "repository-screenshot",
    },
    lastVerified: "2026-07-16",
    evidenceSource: "Public repository bohodigital/boho-analytics-platform main branch reviewed 2026-07-16",
  },
];

export type OwnedWebsiteId =
  | "how-biscuit"
  | "better-grades"
  | "rank-builder-seo";

export type OwnedWebsiteProfile = {
  id: OwnedWebsiteId;
  name: string;
  domain: string;
  url: `https://${string}`;
  role: string;
  publicMemo: string;
  seoLens: ReadonlyArray<string>;
  repositoryUrl: `https://github.com/${string}`;
  image: {
    src: `/proof/properties/${string}.png`;
    alt: string;
    sourceUrl: `https://${string}`;
  };
  proofCategory: "owned-website";
  lastVerified: `${number}-${number}-${number}`;
  evidenceSource: string;
};

export const ownedWebsites = [
  {
    id: "how-biscuit",
    name: "How Biscuit",
    domain: "howbiscuit.com",
    url: "https://howbiscuit.com/",
    role: "An answer-first field guide for school, cooking, home technology, everyday science, and practical problem solving.",
    publicMemo: "How Biscuit gives broad, mixed-intent questions a plain-language home. It helps us study how concise answers, useful context, content-type organization, and internal paths can serve people who arrive with very different levels of knowledge.",
    seoLens: ["Mixed-intent queries", "Answer-first structure", "Editorial information architecture"],
    repositoryUrl: "https://github.com/bohodigital/howbiscuit",
    image: {
      src: "/proof/properties/howbiscuit.png",
      alt: "How Biscuit brand card reading ‘How Biscuit? Plain answers, no sludge’ with colorful subject tiles.",
      sourceUrl: "https://github.com/bohodigital/howbiscuit/blob/main/public/og.png",
    },
    proofCategory: "owned-website",
    lastVerified: "2026-07-16",
    evidenceSource: "Bohopi ownership records and public repository bohodigital/howbiscuit reviewed 2026-07-16",
  },
  {
    id: "rank-builder-seo",
    name: "Rank Builder SEO",
    domain: "rankbuilderseo.com",
    url: "https://rankbuilderseo.com/",
    role: "An independent SEO research desk publishing evidence-aware articles, guides, definitions, and experiments.",
    publicMemo: "Rank Builder SEO is the brand where search claims are treated as research questions. It helps us examine source quality, replicable tests, buyer-defense content, technical definitions, and the difference between useful evidence and industry ritual.",
    seoLens: ["Evidence quality", "Search experiments", "Buyer-defense content"],
    repositoryUrl: "https://github.com/bohodigital/rankbuilderseo",
    image: {
      src: "/proof/properties/rankbuilderseo.png",
      alt: "Rank Builder SEO evidence-file brand card focused on primary records and replicable tests.",
      sourceUrl: "https://github.com/bohodigital/rankbuilderseo/blob/main/public/og.png",
    },
    proofCategory: "owned-website",
    lastVerified: "2026-07-16",
    evidenceSource: "Bohopi ownership records and public repository bohodigital/rankbuilderseo reviewed 2026-07-16",
  },
  {
    id: "better-grades",
    name: "Better Grades",
    domain: "bettergrades.net",
    url: "https://bettergrades.net/",
    role: "A free academic answer, explanation, calculator, practice, and diagnostic platform spanning Algebra and Calculus.",
    publicMemo: "Better Grades connects direct answers to methods, topic maps, calculators, practice, and diagnostics. It helps us study topic depth, search-to-tool journeys, structured content relationships, and the point where an explanation should lead to active practice.",
    seoLens: ["Topic clusters", "Search-to-tool journeys", "Structured learning paths"],
    repositoryUrl: "https://github.com/bohodigital/bettergrades",
    image: {
      src: "/proof/properties/bettergrades.png",
      alt: "Better Grades brand card reading ‘Find the answer. Understand the method. The answer is free.’",
      sourceUrl: "https://github.com/bohodigital/bettergrades/blob/main/public/og.png",
    },
    proofCategory: "owned-website",
    lastVerified: "2026-07-16",
    evidenceSource: "Bohopi ownership records and public repository bohodigital/bettergrades reviewed 2026-07-16",
  },
] as const satisfies ReadonlyArray<OwnedWebsiteProfile>;

export type SystemVisualId =
  | "layered-infrastructure"
  | "repair-integrate-build"
  | "website-release-flow"
  | "measurement-search-signal-flow"
  | "controlled-automation-mcp-interface"
  | "ownership-map"
  | "lean-direct-operation";

export type SystemVisualDefinition = {
  id: SystemVisualId;
  title: string;
  publicInThisRelease: boolean;
};

export const systemVisuals = [
  { id: "layered-infrastructure", title: "Mature foundation and Boho operating layer", publicInThisRelease: true },
  { id: "repair-integrate-build", title: "Repair, integrate, or build", publicInThisRelease: true },
  { id: "website-release-flow", title: "Website release flow", publicInThisRelease: false },
  { id: "measurement-search-signal-flow", title: "Measurement and search-signal flow", publicInThisRelease: false },
  { id: "controlled-automation-mcp-interface", title: "Controlled automation and MCP interface", publicInThisRelease: false },
  { id: "ownership-map", title: "Ownership map", publicInThisRelease: false },
  { id: "lean-direct-operation", title: "Lean direct operation versus layered provider overhead", publicInThisRelease: false },
] as const satisfies ReadonlyArray<SystemVisualDefinition>;

export const infrastructureLayers = [
  {
    number: "01",
    title: "Business goals and owned assets",
    items: ["Domain", "Content", "Customer actions", "Data", "Accounts"],
    explanation: "Start with what the business owns, what customers need to do, and which records must remain under accountable control.",
  },
  {
    number: "02",
    title: "Boho operating layer",
    items: ["Review", "Deploy", "Measure", "Monitor", "Automate", "Document"],
    explanation: "Boho connects the work through review, controlled release, measurement, monitoring, automation, and durable documentation.",
  },
  {
    number: "03",
    title: "Mature infrastructure",
    items: ["Source control", "Global delivery", "Search data", "Analytics", "Email", "Approved platforms"],
    explanation: "Established platforms handle commodity capabilities. They remain supporting infrastructure rather than Boho products.",
  },
  {
    number: "04",
    title: "Public and operational results",
    items: ["Websites", "Leads", "Reports", "Alerts", "Publishing", "Dependable handoff"],
    explanation: "The useful output is a working public or operational result that the business can understand, verify, and continue to own.",
  },
] as const;

export const repairIntegrateBuildSteps = [
  { number: "01", title: "Name the problem", body: "Define the business problem, the owner, the failure, and the result that would be worth changing." },
  { number: "02", title: "Repair", body: "Ask whether the current process or system can be repaired before adding another platform or codebase." },
  { number: "03", title: "Integrate", body: "If repair is not enough, use a mature product when it solves the problem cleanly and can be operated responsibly." },
  { number: "04", title: "Build the gap", body: "When a narrow capability is still missing, build only that component when its value exceeds build and maintenance cost." },
  { number: "05", title: "Confirm the exit", body: "Verify ownership, security, maintainability, failure behavior, portability, and the recovery path before release." },
] as const;
