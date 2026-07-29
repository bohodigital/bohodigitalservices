import {
  ownedWebsites,
  selectedTools,
  type OwnedWebsiteProfile,
  type SelectedToolProfile,
} from "./systems";

export type ServiceAssetRole =
  | "hero"
  | "chapter"
  | "diagram"
  | "proof"
  | "context"
  | "archive";

export type ServiceAssetPublicStatus =
  | "required"
  | "shared"
  | "conditional"
  | "archive"
  | "superseded";

export type ServiceAsset = {
  id: string;
  src: `/${string}`;
  width: number;
  height: number;
  role: ServiceAssetRole;
  routes: ReadonlyArray<`/${string}`>;
  section: string;
  alt: string;
  caption: string;
  provenanceType:
    | "approved"
    | "owner supplied"
    | "licensed editorial"
    | "proof screenshot"
    | "superseded"
    | "archival";
  evidenceType?: string;
  sourceUrl?: `https://${string}`;
  lastVerified?: `${number}-${number}-${number}`;
  reusePolicy: "one route" | "shared diagram" | "archive only";
  publicStatus: ServiceAssetPublicStatus;
};

const assets = [
  {
    id: "ongoing-seo-primary",
    src: "/visuals/services/ongoing-seo-v1.webp",
    width: 1536,
    height: 1024,
    role: "hero",
    routes: ["/services/ongoing-seo/"],
    section: "Primary service illustration",
    alt: "Mixed-media illustration tracing a path from local search and a map pin to a customer call.",
    caption: "Original editorial illustration explaining the service concept. Not client work or performance evidence.",
    provenanceType: "approved",
    evidenceType: "commissioned editorial illustration",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "web-design-primary",
    src: "/visuals/services/web-design-redesign-v1.webp",
    width: 1536,
    height: 1024,
    role: "hero",
    routes: ["/services/web-design-redesign/"],
    section: "Primary service illustration",
    alt: "Mixed-media illustration of one clear business website planned for desktop and mobile.",
    caption: "Original editorial illustration explaining the service concept. Not client work or performance evidence.",
    provenanceType: "approved",
    evidenceType: "commissioned editorial illustration",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "provider-rescue-primary",
    src: "/visuals/services/provider-rescue-v1.webp",
    width: 1536,
    height: 1024,
    role: "hero",
    routes: ["/services/provider-rescue/"],
    section: "Primary service illustration",
    alt: "Mixed-media illustration of website pages and account assets crossing a bridge toward an organized handoff.",
    caption: "Original editorial illustration explaining the service concept. Not client work or performance evidence.",
    provenanceType: "approved",
    evidenceType: "commissioned editorial illustration",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "research-primary",
    src: "/visuals/services/research-audits-strategy-v1.webp",
    width: 1536,
    height: 1024,
    role: "hero",
    routes: ["/services/research-audits-strategy/"],
    section: "Primary service illustration",
    alt: "Mixed-media illustration of website evidence being narrowed into three practical priorities.",
    caption: "Original editorial illustration explaining the service concept. Not client work or performance evidence.",
    provenanceType: "approved",
    evidenceType: "commissioned editorial illustration",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "custom-solutions-primary",
    src: "/visuals/services/custom-digital-solutions-v1.webp",
    width: 1536,
    height: 1024,
    role: "hero",
    routes: ["/services/custom-digital-solutions/"],
    section: "Primary service illustration",
    alt: "Mixed-media illustration of a form moving through human review into a shared record and notification.",
    caption: "Original editorial illustration explaining the service concept. Not client work or performance evidence.",
    provenanceType: "approved",
    evidenceType: "commissioned editorial illustration",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "growth-analysis",
    src: "/visuals/growth-analysis.webp",
    width: 1400,
    height: 933,
    role: "chapter",
    routes: ["/services/ongoing-seo/"],
    section: "Continued improvement and measurement",
    alt: "Fern leaves unfolding in warm light as a restrained metaphor for steady improvement.",
    caption: "Licensed editorial metaphor for steady, compounding improvement. Not a performance chart or client result.",
    provenanceType: "licensed editorial",
    sourceUrl: "https://www.pexels.com/photo/7931203/",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "creative-process",
    src: "/visuals/creative-process.webp",
    width: 1200,
    height: 1800,
    role: "chapter",
    routes: ["/services/web-design-redesign/"],
    section: "Design planning and information architecture",
    alt: "Design collaborators reviewing a laptop, page structure, and visual decisions at a shared worktable.",
    caption: "Licensed editorial image representing design planning and visual decision work. Not client work.",
    provenanceType: "licensed editorial",
    sourceUrl: "https://www.pexels.com/photo/6322370/",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "migration-infrastructure",
    src: "/visuals/migration-infrastructure.webp",
    width: 1200,
    height: 1800,
    role: "chapter",
    routes: ["/services/provider-rescue/"],
    section: "Dependency chain and migration runbook",
    alt: "A technician methodically connecting computer infrastructure cables.",
    caption: "Licensed editorial image representing infrastructure maintenance and migration work. Not client work.",
    provenanceType: "licensed editorial",
    sourceUrl: "https://www.pexels.com/photo/6804586/",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "research-notebook",
    src: "/visuals/research-notebook.webp",
    width: 1600,
    height: 1068,
    role: "chapter",
    routes: ["/services/research-audits-strategy/"],
    section: "Evidence review and research scope",
    alt: "A researcher mapping evidence and relationships in a notebook.",
    caption: "Licensed editorial image representing research and evidence review. Not client work.",
    provenanceType: "licensed editorial",
    sourceUrl: "https://www.pexels.com/photo/6476777/",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "hosting-architecture",
    src: "/diagrams/boho-hosting-architecture-v2.png",
    width: 1672,
    height: 941,
    role: "diagram",
    routes: ["/services/web-design-redesign/"],
    section: "Hosting, ownership, and exit",
    alt: "Hosting architecture connecting a business website with source, hosting, domain, forms, analytics, email, and accountable ownership.",
    caption: "Factual architecture figure showing which website systems connect and where ownership and exit documentation matter.",
    provenanceType: "owner supplied",
    evidenceType: "factual architecture diagram",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "how-boho-works",
    src: "/diagrams/how-boho-works-v2-transparent.png",
    width: 1672,
    height: 941,
    role: "diagram",
    routes: ["/services/"],
    section: "How a project moves",
    alt: "How a Boho project moves through Discover, Design, Build, and Launch.",
    caption: "",
    provenanceType: "owner supplied",
    evidenceType: "owner-supplied process diagram",
    lastVerified: "2026-07-27",
    reusePolicy: "one route",
    publicStatus: "required",
  },
  {
    id: "how-boho-works-source",
    src: "/diagrams/how-boho-works-v1.png",
    width: 1672,
    height: 941,
    role: "archive",
    routes: [],
    section: "Immutable source",
    alt: "",
    caption: "Owner-supplied immutable source. The transparent derivative is the only public rendering.",
    provenanceType: "archival",
    lastVerified: "2026-07-27",
    reusePolicy: "archive only",
    publicStatus: "archive",
  },
  {
    id: "met-water-textile",
    src: "/visuals/met-water-textile.webp",
    width: 1200,
    height: 1004,
    role: "archive",
    routes: [],
    section: "Approved design reference",
    alt: "",
    caption: "Public-domain design reference retained for a future explicit design-reference module.",
    provenanceType: "approved",
    sourceUrl: "https://www.metmuseum.org/art/collection/search/14029",
    lastVerified: "2026-07-27",
    reusePolicy: "archive only",
    publicStatus: "conditional",
  },
] as const satisfies ReadonlyArray<ServiceAsset>;

export const serviceAssets = assets;

export type ServiceAssetId = (typeof serviceAssets)[number]["id"];

export function serviceAsset(id: ServiceAssetId): ServiceAsset {
  const asset = serviceAssets.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown service asset: ${id}`);
  return asset;
}

export const primaryServiceAssetByRoute = {
  "/services/ongoing-seo/": serviceAsset("ongoing-seo-primary"),
  "/services/web-design-redesign/": serviceAsset("web-design-primary"),
  "/services/provider-rescue/": serviceAsset("provider-rescue-primary"),
  "/services/research-audits-strategy/": serviceAsset("research-primary"),
  "/services/custom-digital-solutions/": serviceAsset("custom-solutions-primary"),
} as const;

export type ServiceAssetRoute = keyof typeof primaryServiceAssetByRoute;

function toolsById(
  ids: ReadonlyArray<SelectedToolProfile["id"]>,
): ReadonlyArray<SelectedToolProfile> {
  return ids.map((id) => {
    const tool = selectedTools.find((candidate) => candidate.id === id);
    if (!tool) throw new Error(`Missing canonical selected tool: ${id}`);
    return tool;
  });
}

export const serviceToolProofByRoute = {
  "/services/custom-digital-solutions/": toolsById([
    "bsuite-mcp-monitor",
    "secret-broker",
  ]),
  "/services/research-audits-strategy/": toolsById(["analysis-dashboard"]),
} as const;

export const websiteProof: ReadonlyArray<OwnedWebsiteProfile> = ownedWebsites;
