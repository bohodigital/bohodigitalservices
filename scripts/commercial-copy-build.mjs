import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_RENDER_BASE = "89cb0982b8f2274a289e8126c9472640a5305011";
const CONTRACT_INPUT_BASE = "a201d64a1c74cfb31406a1aa571cd8b3768f569f";
const DATA_ROOT = resolve(ROOT, "content/commercial");
const BUNDLE_PATH = resolve(DATA_ROOT, "source-packets.json");
const CONTRACT_PATH = resolve(DATA_ROOT, "commercial-copy-contract.json");
const INVENTORY_PATH = resolve(DATA_ROOT, "current-target-inventory.json");
const BLOCKED_PATH = resolve(DATA_ROOT, "blocked-copy.json");
const COLLISION_PATH = resolve(DATA_ROOT, "collision-report.json");
const COVERAGE_PATH = resolve(DATA_ROOT, "expected-slot-coverage.json");
const ADAPTER_PATH = resolve(ROOT, "app/content/commercial/adapters.generated.ts");

export const PACKETS = [
  ["WO-2026-07-23-BOHO-CHATGPT-VERBATIM-COPY-LOCK-021", "global-governance"],
  ["WO-2026-07-23-BOHO-CHATGPT-EDITORIAL-SELF-AUDIT-V2-022", "global-governance"],
  ["WO-2026-07-24-BOHO-CHATGPT-TIMELINE-COPY-034", "timelines"],
  ["WO-2026-07-24-BOHO-CHATGPT-SERVICE-COMMERCIAL-LAYERS-035", "service-detail"],
  ["WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036", "homepage"],
  ["WO-2026-07-24-BOHO-CHATGPT-PRICING-COPY-037", "pricing"],
  ["WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038", "work"],
  ["WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039", "contact-start-navigation-footer"],
  ["WO-2026-07-24-BOHO-CHATGPT-COMMERCIAL-METADATA-040", "metadata-schema"],
  ["WO-2026-07-24-BOHO-CHATGPT-SERVICES-OVERVIEW-COPY-041", "services"],
  ["WO-2026-07-24-BOHO-CHATGPT-VISUAL-ACCESSIBLE-COPY-043", "visual-accessibility"],
  ["WO-2026-07-24-BOHO-ROUTE-ANCHOR-COMPATIBILITY-045", "route-fragment-compatibility"],
  ["WO-2026-07-24-BOHO-CHATGPT-EMERGENCY-COPY-047", "emergency"],
  ["WO-2026-07-24-BOHO-CHATGPT-DIRECT-REVIEW-PROTOCOL-048", "review-protocol"],
  ["WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049", "cross-packet-corrections"],
].map(([key, surface], snapshotOrdinal) => ({
  key, surface, snapshotOrdinal: snapshotOrdinal + 1, file: `${key}.md`,
  editorialAuthority: key.endsWith("-048") ? "review-protocol" : "chatgpt",
}));

const EXPECTED_PACKET_HASHES = {
  "WO-2026-07-23-BOHO-CHATGPT-VERBATIM-COPY-LOCK-021": "d740f45347413eb187b54ab871b6aa7bd1d147c79d56d682acfa065bc2b7f8c2",
  "WO-2026-07-23-BOHO-CHATGPT-EDITORIAL-SELF-AUDIT-V2-022": "4647401a4ef8bc252495f3e61505c25f8e9729aca86bad27266cb9b372e6f6c9",
  "WO-2026-07-24-BOHO-CHATGPT-TIMELINE-COPY-034": "50b5841db45ecd0d20bfd01cdfa91317fbcd25d7d18c2a5d8f0164957a5ebd5e",
  "WO-2026-07-24-BOHO-CHATGPT-SERVICE-COMMERCIAL-LAYERS-035": "91a8f6ad3556475af0b8b58571e3f82cb10be0908e3f895843906d7176f57870",
  "WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036": "6ff8281592d820c3634451f2fcf5e6f2937bd6a9b4e43527f29bfe866190a81b",
  "WO-2026-07-24-BOHO-CHATGPT-PRICING-COPY-037": "0655e36e578c20de60e8312927c72c01e0b7c1669af6171575a3236b86370cef",
  "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038": "86f5fbaef1ad07615524cb0e7b371f370cdb21599bf877aa967c2d45ae70f965",
  "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039": "1d0096a30d203c286bea5ff2061e629ad650d364fe19d139d7790acb25459169",
  "WO-2026-07-24-BOHO-CHATGPT-COMMERCIAL-METADATA-040": "748fd1b6e19ec82d35ad7bba8bafda83a37bf52e9e9cdd68d2d51dec2352290e",
  "WO-2026-07-24-BOHO-CHATGPT-SERVICES-OVERVIEW-COPY-041": "c835a97d9e4d295cf95c46765c8be9f692c6b846c4c8353c4271da0bdaea784b",
  "WO-2026-07-24-BOHO-CHATGPT-VISUAL-ACCESSIBLE-COPY-043": "0858e855678571c414d0a31c66f934afca6391ef591bfabc338b8cbcea6a4064",
  "WO-2026-07-24-BOHO-ROUTE-ANCHOR-COMPATIBILITY-045": "47d94f4a6f5e00bba2cf9ade9cc4e3c13d400421117639ec5051752812839d1f",
  "WO-2026-07-24-BOHO-CHATGPT-EMERGENCY-COPY-047": "5a01517f2dc9302cda0dd4642b5bcff848037fe47b145e712311d6e3c5e51c67",
  "WO-2026-07-24-BOHO-CHATGPT-DIRECT-REVIEW-PROTOCOL-048": "12b7575baa750ea11630496aa21b6c78207794d4ad1480e9d28331e8d79dc482",
  "WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049": "abbcbeb66fc5b44847069eeaf00a97d875b5389d1790373cb5f7a7c78ab12862",
};

export const BINDING_PRECEDENCE = [
  ["049", "WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049"],
  ["045", "WO-2026-07-24-BOHO-ROUTE-ANCHOR-COMPATIBILITY-045"],
  ["040", "WO-2026-07-24-BOHO-CHATGPT-COMMERCIAL-METADATA-040"],
  ["039", "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039"],
  ["038", "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038"],
  ["037", "WO-2026-07-24-BOHO-CHATGPT-PRICING-COPY-037"],
  ["036", "WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036"],
  ["035", "WO-2026-07-24-BOHO-CHATGPT-SERVICE-COMMERCIAL-LAYERS-035"],
  ["034", "WO-2026-07-24-BOHO-CHATGPT-TIMELINE-COPY-034"],
  ["041", "WO-2026-07-24-BOHO-CHATGPT-SERVICES-OVERVIEW-COPY-041"],
  ["047", "WO-2026-07-24-BOHO-CHATGPT-EMERGENCY-COPY-047"],
  ["043", "WO-2026-07-24-BOHO-CHATGPT-VISUAL-ACCESSIBLE-COPY-043"],
  ["prior", "prior-governed-sources"],
].map(([packet, authority], bindingRank) => ({ packet, authority, bindingRank }));

export const REQUIRED_PARSER_FORMATS = [
  "straight-quoted", "curly-quoted", "backtick", "bullet", "numbered-list",
  "markdown-table", "blockquote", "multiline-quoted", "multiline-paragraph", "structured-field", "relationship",
];

export const REQUIRED_COVERAGE_CATEGORIES = [
  "homepage", "services-overview", "service-local-visibility", "service-websites-hosting",
  "service-provider-rescue", "service-custom-tools", "service-research-analytics", "pricing",
  "work-evidence", "contact", "start", "emergency", "navigation-footer", "forms-states",
  "metadata-schema", "visuals-accessibility", "routes-fragments", "packet-049-corrections",
];

const REQUIRED_SERVICE_NAMES = [
  "Local Visibility & Lead Systems", "Websites & Managed Hosting", "Provider Rescue & Migration",
  "Custom Tools & Automation", "Research, Analytics & Improvement",
];
const REQUIRED_PRICE_STRINGS = [
  "Initial public review — Free", "SEO reporting — Starting at $95 per month",
  "SEO implementation — Starting at $450 per month", "Focused website improvement — Starting at $750",
  "New website — Starting at $1,500", "Substantial redesign — Starting at $1,500",
  "Provider Rescue Assessment — Starting at $350", "Migration assistance — Starting at $1,000",
  "Focused audit or strategy — Starting at $350", "Custom discovery — Starting at $500",
  "Focused custom build — Starting at $2,500",
];
const CORRECTION_PACKET_KEY = "WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049";
const REPORTING_PRODUCT_KEY = "product.seoReporting.monthly";
const ANALYTICS_BLOCK_KEY = "product.bohoAnalytics.publicFreeAvailability";
const REQUIRED_CURRENT_SOURCES = [
  "app/page.tsx", "app/not-found.tsx", "app/[...slug]/page.tsx", "app/learn/glossary/[term]/page.tsx",
  "app/robots.ts", "scripts/generate-service-page-data.mjs", "app/content/servicePages.generated.ts",
  "content/service-pages/04-digital-research-seo-audits-strategy.md",
];
const ADAPTER_PAGE_KEYS = [
  "homepage", "services-overview", "pricing", "work-evidence", "contact", "start", "emergency",
  "service-local-visibility", "service-websites-hosting", "service-provider-rescue",
  "service-custom-tools", "service-research-analytics",
];

const SUPERSESSIONS = [
  { key: "contact.path-count-heading", selected: `${CORRECTION_PACKET_KEY}:18:0`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039:121:0", `${CORRECTION_PACKET_KEY}:14:0`,
  ], action: "replace" },
  { key: "start.service-category.emergency-option", selected: `${CORRECTION_PACKET_KEY}:31:0`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039:295:0",
  ], action: "remove" },
  { key: "work.hero.evidence-introduction", selected: `${CORRECTION_PACKET_KEY}:85:0`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:30:0",
  ], action: "replace" },
  { key: "homepage.evidence.introduction", selected: `${CORRECTION_PACKET_KEY}:89:0`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036:244:0",
  ], action: "replace" },
  { key: "work.artifact.analytics.source-class", selected: `${CORRECTION_PACKET_KEY}:93:1`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:200:0",
  ], action: "replace" },
  { key: "work.artifact.rank-builder.source-class", selected: `${CORRECTION_PACKET_KEY}:94:1`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:226:0",
  ], action: "replace" },
  { key: "work.artifact.glossary.current-status", selected: `${CORRECTION_PACKET_KEY}:107:0`, displaced: [
    "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:186:0",
  ], action: "replace" },
];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const slug = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "value";
const packetNumber = (key) => key.match(/-(\d{3})$/)?.[1] ?? "prior";
const bindingRank = (key) => BINDING_PRECEDENCE.find(({ packet }) => packet === packetNumber(key))?.bindingRank
  ?? BINDING_PRECEDENCE.at(-1).bindingRank;

function sourceRef(record) {
  return `${record.sourcePacket}:${record.sourceStartLine}:${record.tokenIndex}`;
}

function compactRecord(record) {
  return {
    key: record.key, semanticSlotKey: record.semanticSlotKey, exactValue: record.exactValue,
    sourcePacket: record.sourcePacket, sourceLocation: record.sourceLocation,
    sourceStartLine: record.sourceStartLine, sourceEndLine: record.sourceEndLine,
    classification: record.classification, pageKey: record.pageKey, field: record.field,
    format: record.format, relationship: record.relationship ?? null,
  };
}

function classifyTarget(value, field, section, surface) {
  const context = `${field} ${section}`.toLowerCase();
  const lower = value.toLowerCase();
  if (/destination|route|anchor|fragment|href|mailto|canonical url/.test(context) || /^(?:\/|#|mailto:)/.test(value)) return "route";
  if (/metadata|meta title|meta description|title tag|open graph|og title|og description/.test(context)) return "metadata";
  if (/schema|json-ld|structured data/.test(context)) return "schema";
  if (/alt text|accessible|aria|screen reader|long description|mobile menu label|decorative/.test(context)) return "accessible-text";
  if (/diagram|figure|caption|visual|legend|axis|stage label|node label|card label/.test(context) || surface === "visual-accessibility") return "figure";
  if (/form|field|placeholder|hint|help|consent|required|optional|success|failure|error|rate limit|offline|network|option|validation/.test(context)) return "form-state";
  if (/navigation|footer|mobile menu|menu|link label/.test(context)) return "navigation";
  if (/price|pricing|starting at/.test(context) || /(?:\$|starting at|— free)/i.test(value)) return "price";
  if (/timeline|timing|week|day|month|response window/.test(context) || /(?:business day|week|month|not guaranteed)/.test(lower)) return "timeline";
  if (/evidence|limitation|source class|demonstrate|client work/.test(context)) return "evidence";
  if (/cta|action|link|button/.test(context)) return "action";
  return "visible-text";
}

function inferPageKey(surface, headings, field, value) {
  const context = `${headings.join(" ")} ${field} ${value}`.toLowerCase();
  if (surface === "homepage") return "homepage";
  if (surface === "services") return "services-overview";
  if (surface === "pricing") return "pricing";
  if (surface === "work") return "work-evidence";
  if (surface === "emergency") return "emergency";
  if (surface === "visual-accessibility") return "visuals-accessibility";
  if (surface === "route-fragment-compatibility") return "routes-fragments";
  if (surface === "cross-packet-corrections") return "packet-049-corrections";
  if (/local visibility|ongoing seo/.test(context)) return "service-local-visibility";
  if (/websites & managed hosting|web design|redesign/.test(context)) return "service-websites-hosting";
  if (/provider rescue|migration/.test(context)) return "service-provider-rescue";
  if (/custom tools|automation|custom digital/.test(context)) return "service-custom-tools";
  if (/research, analytics|research & analytics|audits|strategy/.test(context)) return "service-research-analytics";
  if (surface === "contact-start-navigation-footer") {
    if (/part a|navigation|part d|footer/.test(context)) return "navigation-footer";
    if (/part c|\/start\/|inquiry|form|field|validation|success|failure|network|consent/.test(context)) return "start";
    return "contact";
  }
  if (surface === "metadata-schema") {
    if (/homepage/.test(context)) return "homepage";
    if (/services overview/.test(context)) return "services-overview";
    if (/pricing/.test(context)) return "pricing";
    if (/work/.test(context)) return "work-evidence";
    if (/contact/.test(context)) return "contact";
    if (/start/.test(context)) return "start";
    if (/emergency/.test(context)) return "emergency";
    return "metadata-schema";
  }
  if (surface === "service-detail") return "service-commercial-shared";
  if (surface === "timelines") return "timelines";
  if (surface === "global-governance") return "prior-governed-sources";
  return surface;
}

function tokenMatches(line) {
  const matches = [];
  for (const match of line.matchAll(/`([^`]+)`/g)) matches.push({ value: match[1], quote: "backtick", index: match.index });
  if (!matches.length) for (const match of line.matchAll(/“([^”]+)”/g)) matches.push({ value: match[1], quote: "curly", index: match.index });
  if (!matches.length) for (const match of line.matchAll(/"([^"\n]+)"/g)) matches.push({ value: match[1], quote: "straight", index: match.index });
  return matches;
}

export function parsePacketContent(content, packet) {
  if (packet.editorialAuthority === "review-protocol") return [];
  const lines = content.split("\n");
  const headings = [];
  const records = [];
  let pendingField = "";
  let multiline = null;
  const emit = ({ value, line, endLine = line, tokenIndex = 0, format, field = pendingField || "value", relationship = null }) => {
    const clean = value.replace(/\s+/g, " ").trim();
    if (clean.length < 1) return;
    const section = headings.filter(Boolean).join(" > ");
    const sourceLocation = `${packet.key}.md:${line}${endLine > line ? `-${endLine}` : ""}${tokenIndex ? `:token${tokenIndex}` : ""}`;
    records.push({
      key: `record.${packetNumber(packet.key)}.${String(line).padStart(4, "0")}.${tokenIndex}`,
      exactValue: clean, sourcePacket: packet.key, sourceLocation, sourceStartLine: line,
      sourceEndLine: endLine, sourceLine: line, tokenIndex, format, surface: packet.surface,
      section, field, classification: classifyTarget(clean, field, section, packet.surface),
      pageKey: inferPageKey(packet.surface, headings, field, clean), relationship,
      sourceKind: "chatgpt-packet", editorialAuthority: "ChatGPT", status: "target",
      currentlyRendered: false, disposition: "replace-later-with-exact-approved-text",
      routeDestination: /^(?:\/|#|mailto:)/.test(clean) ? clean : null,
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index];
    const line = index + 1;
    const trimmed = raw.trim();
    if (multiline) {
      multiline.parts.push(trimmed.replace(/"$/, ""));
      if (trimmed.endsWith('"')) {
        emit({ value: multiline.parts.join("\n"), line: multiline.line, endLine: line, format: "multiline-quoted", field: multiline.field });
        multiline = null;
      }
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      headings.length = level - 1;
      headings[level - 1] = heading[2].replace(/^`|`$/g, "");
      pendingField = "";
      continue;
    }
    if (!trimmed || /^```/.test(trimmed) || /^\|?\s*:?-{3}/.test(trimmed)) continue;
    const fieldMatch = trimmed.match(/^(?:[-*]\s+|\d+[.)]\s+|>\s*)?([^`“"|]{1,120}?):\s*(.*)$/);
    const field = fieldMatch?.[1]?.trim() || pendingField || "value";
    if (fieldMatch && !fieldMatch[2]) {
      const paragraphLines = [];
      let paragraphEnd = index + 1;
      while (paragraphEnd < lines.length) {
        const candidate = lines[paragraphEnd].trim();
        if (!candidate || /^(?:#{1,6}\s+|[-*]\s+|\d+[.)]\s+|>|\||```)/.test(candidate) || candidate.startsWith('"') || candidate.endsWith('"') || tokenMatches(candidate).length) break;
        paragraphLines.push(candidate);
        paragraphEnd += 1;
      }
      if (paragraphLines.length >= 2) {
        emit({ value: paragraphLines.join("\n"), line: index + 2, endLine: paragraphEnd, format: "multiline-paragraph", field });
        index = paragraphEnd - 1;
        pendingField = "";
        continue;
      }
      pendingField = field;
      continue;
    }
    if (fieldMatch?.[2]?.startsWith('"') && !fieldMatch[2].slice(1).includes('"')) {
      multiline = { line, field, parts: [fieldMatch[2].slice(1)] };
      continue;
    }
    if (!fieldMatch && trimmed.startsWith('"') && !trimmed.slice(1).includes('"')) {
      multiline = { line, field: pendingField || "value", parts: [trimmed.slice(1)] };
      continue;
    }
    const tokens = tokenMatches(raw);
    if (!tokens.length) continue;
    const isRelationship = /(?:→|->|maps? to|alias)/i.test(raw) && tokens.length > 1;
    let format = tokens[0].quote === "curly" ? "curly-quoted" : tokens[0].quote === "straight" ? "straight-quoted" : "backtick";
    if (/^\s*[-*]\s+/.test(raw)) format = "bullet";
    else if (/^\s*\d+[.)]\s+/.test(raw)) format = "numbered-list";
    else if (/^\s*\|/.test(raw)) format = "markdown-table";
    else if (/^\s*>/.test(raw)) format = "blockquote";
    else if (isRelationship) format = "relationship";
    else if (fieldMatch && !/^(?:Straight|Curly|Backtick)$/i.test(field)) format = "structured-field";
    const relationshipId = isRelationship ? `relationship.${packetNumber(packet.key)}.${line}` : null;
    tokens.forEach((token, tokenIndex) => emit({
      value: token.value, line, tokenIndex, format, field,
      relationship: relationshipId ? { id: relationshipId, kind: "mapping", position: tokenIndex, memberCount: tokens.length } : null,
    }));
    pendingField = "";
  }
  return records;
}

export function validateParserCoverage(records) {
  const formats = new Set(records.map(({ format }) => format));
  return REQUIRED_PARSER_FORMATS.filter((format) => !formats.has(format)).map((format) => `parser format missing: ${format}`);
}

function sourcedValue(bundle, line, tokenIndex = 0) {
  const packet = bundle.packets.find(({ key }) => key === CORRECTION_PACKET_KEY);
  const sourceLine = packet?.content.split("\n")[line - 1] ?? "";
  const tokens = [...sourceLine.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  if (tokens[tokenIndex] === undefined) throw new Error(`Missing correction token ${tokenIndex} at ${CORRECTION_PACKET_KEY}:${line}`);
  return { value: tokens[tokenIndex], sourcePacket: CORRECTION_PACKET_KEY, sourceLine: line, sourceLocation: `${CORRECTION_PACKET_KEY}.md:${line}${tokenIndex ? `:token${tokenIndex}` : ""}` };
}

function buildCorrections(bundle) {
  return {
    sourcePacket: CORRECTION_PACKET_KEY,
    contact: {
      pathCount: 4, pathCountSourceLocation: `${CORRECTION_PACKET_KEY}.md:20-25`, heading: sourcedValue(bundle, 18),
      standardInquiry: {
        options: [35, 36, 37, 38, 39, 40].map((line) => sourcedValue(bundle, line)),
        removedOption: sourcedValue(bundle, 31), automaticEmergencyRedirect: false,
        routingSourceLocation: `${CORRECTION_PACKET_KEY}.md:27-59`,
        emergencyBlock: { eyebrow: sourcedValue(bundle, 45), heading: sourcedValue(bundle, 48), body: sourcedValue(bundle, 51), linkLabel: sourcedValue(bundle, 54), destination: sourcedValue(bundle, 57) },
      },
    },
    evidence: {
      sourceClasses: [65, 66, 67, 68, 69, 70, 71].map((line) => sourcedValue(bundle, line)),
      technicalRecordDefinition: { name: sourcedValue(bundle, 66), definition: sourcedValue(bundle, 78), limitation: sourcedValue(bundle, 81) },
      workHeroIntroduction: sourcedValue(bundle, 85), homepageIntroduction: sourcedValue(bundle, 89),
      artifacts: [
        { title: sourcedValue(bundle, 93, 0), sourceClass: sourcedValue(bundle, 93, 1) },
        { title: sourcedValue(bundle, 94, 0), sourceClass: sourcedValue(bundle, 94, 1) },
        { title: sourcedValue(bundle, 98), sourceClass: sourcedValue(bundle, 96) },
        { title: sourcedValue(bundle, 99), sourceClass: sourcedValue(bundle, 96) },
      ],
    },
    glossaryEvidence: {
      currentStatus: sourcedValue(bundle, 107), acceptedFoundationCommitLabel: sourcedValue(bundle, 112),
      acceptedFoundationCommit: sourcedValue(bundle, 115), acceptedRouteCountLabel: sourcedValue(bundle, 118),
      acceptedRouteCount: sourcedValue(bundle, 121), statusBoundarySourceLocation: `${CORRECTION_PACKET_KEY}.md:103-123`,
    },
    reportingProduct: {
      key: REPORTING_PRODUCT_KEY, price: sourcedValue(bundle, 129), priceFamily: sourcedValue(bundle, 131, 0),
      canonicalAnchor: sourcedValue(bundle, 131, 1), compatibilityAlias: sourcedValue(bundle, 155),
      crossReference: { eyebrow: sourcedValue(bundle, 138), heading: sourcedValue(bundle, 141), body: sourcedValue(bundle, 144), price: sourcedValue(bundle, 147), linkLabel: sourcedValue(bundle, 150), destination: sourcedValue(bundle, 153) },
    },
    analyticsAvailability: { key: sourcedValue(bundle, 175), status: sourcedValue(bundle, 178), reason: sourcedValue(bundle, 181), targetApproved: false, replacementText: null },
  };
}

export function resolveSemanticSlots(records, supersessions = SUPERSESSIONS) {
  const byRef = new Map(records.map((record) => [sourceRef(record), record]));
  const explicitMember = new Map();
  for (const supersession of supersessions) {
    const missing = [supersession.selected, ...supersession.displaced].filter((ref) => !byRef.has(ref));
    if (missing.length) throw new Error(`Supersession source record missing: ${missing.join(", ")}`);
    for (const ref of [supersession.selected, ...supersession.displaced]) explicitMember.set(ref, supersession);
  }
  const slots = new Map();
  for (const record of records) {
    const supersession = explicitMember.get(sourceRef(record));
    const section = record.section.split(" > ").at(-1) || "root";
    const defaultKey = [
      "slot", slug(record.pageKey), slug(section), slug(record.field), record.classification,
      packetNumber(record.sourcePacket), String(record.sourceStartLine).padStart(4, "0"), record.tokenIndex,
    ].join(".");
    const slotKey = supersession ? `slot.${supersession.key}` : record.semanticSlotKey || defaultKey;
    record.semanticSlotKey = slotKey;
    const slot = slots.get(slotKey) ?? { key: slotKey, records: [], supersession: supersession ?? null };
    slot.records.push(record);
    slots.set(slotKey, slot);
  }
  const semanticSlots = [];
  const explicitCollisions = [];
  for (const slot of [...slots.values()].sort((a, b) => a.key.localeCompare(b.key))) {
    const distinctValues = new Set(slot.records.map(({ exactValue }) => exactValue));
    if (distinctValues.size > 1 && !slot.supersession) throw new Error(`Unresolved semantic collision: ${slot.key}`);
    let selected = [...slot.records].sort((a, b) => bindingRank(a.sourcePacket) - bindingRank(b.sourcePacket) || a.sourceLocation.localeCompare(b.sourceLocation))[0];
    if (slot.supersession) selected = byRef.get(slot.supersession.selected);
    const displaced = slot.records.filter((record) => record !== selected);
    const supersessionProof = slot.supersession ? {
      key: slot.supersession.key, action: slot.supersession.action,
      selected: slot.supersession.selected, displaced: slot.supersession.displaced,
    } : null;
    semanticSlots.push({
      key: slot.key, selectionAction: slot.supersession?.action ?? "select",
      selectedRecord: compactRecord(selected), displacedRecords: displaced.map(compactRecord),
      supersession: supersessionProof,
    });
    if (slot.records.length > 1) explicitCollisions.push({
      key: `semantic.${slug(slot.key)}`, collisionKind: "semantic-slot",
      valueKind: distinctValues.size > 1 ? "different" : "identical",
      selectedRecord: compactRecord(selected), displacedRecords: displaced.map(compactRecord),
      supersession: supersessionProof,
    });
  }
  return { semanticSlots, explicitCollisions };
}

function buildCollisionReport(records, explicitCollisions) {
  const groups = new Map();
  for (const record of records) {
    const group = groups.get(record.exactValue) ?? [];
    group.push(record); groups.set(record.exactValue, group);
  }
  const duplicateCollisions = [];
  for (const [value, members] of groups) {
    if (new Set(members.map(({ sourcePacket }) => sourcePacket)).size < 2) continue;
    const ordered = [...members].sort((a, b) => bindingRank(a.sourcePacket) - bindingRank(b.sourcePacket) || a.sourceLocation.localeCompare(b.sourceLocation));
    duplicateCollisions.push({
      key: `duplicate.${sha256(value).slice(0, 16)}`, collisionKind: "cross-packet-exact-duplicate", valueKind: "identical",
      exactValueHash: sha256(value), selectedRecord: compactRecord(ordered[0]), displacedRecords: ordered.slice(1).map(compactRecord), supersession: null,
    });
  }
  const collisions = [...duplicateCollisions, ...explicitCollisions].sort((a, b) => a.key.localeCompare(b.key));
  return {
    schemaVersion: 1, bindingPrecedence: BINDING_PRECEDENCE, collisions,
    metrics: { total: collisions.length, exactDuplicate: duplicateCollisions.length, semantic: explicitCollisions.length, selectedRecords: collisions.length, displacedRecords: collisions.reduce((sum, collision) => sum + collision.displacedRecords.length, 0) },
    unresolvedCount: 0,
  };
}

async function walk(path, matcher, result = []) {
  const info = await stat(path);
  if (info.isFile()) { if (matcher(path)) result.push(path); return result; }
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (["node_modules", ".next", "dist", "out", ".git", "commercial"].includes(entry.name)) continue;
    await walk(resolve(path, entry.name), matcher, result);
  }
  return result;
}

function extractSourceValues(text, path) {
  const records = [];
  const pattern = /`([^`$]{2,})`|"((?:\\.|[^"\\]){2,})"|'((?:\\.|[^'\\]){2,})'|>([^<>{}\n][^<>{}]*)</g;
  for (const match of text.matchAll(pattern)) {
    const value = (match[1] ?? match[2] ?? match[3] ?? match[4] ?? "").replace(/\s+/g, " ").trim();
    if (value.length < 2 || /^(?:\.{1,2}\/|@\/)/.test(value)) continue;
    const line = text.slice(0, match.index).split("\n").length;
    records.push({ sourceFile: path, line, exactValue: value, valueHash: sha256(value) });
  }
  return records;
}

export function detectAnalyticsClaimContexts(text, sourceFile) {
  const lines = text.split("\n");
  const results = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!/boho\s+analytics(?:\s+platform)?/i.test(lines[index])) continue;
    const start = Math.max(0, index - 4);
    const end = Math.min(lines.length, index + 13);
    const context = lines.slice(start, end).join(" ").replace(/\s+/g, " ");
    const signals = [];
    if (/\b(?:free|without paying|no cost|at no cost|unpaid)\b/i.test(context)) signals.push("free-or-unpaid");
    if (/\b(?:public|publicly|available|access|usable|use the|dashboard)\b/i.test(context)) signals.push("public-access");
    if (/\b(?:self[- ]hosted|open[- ]source)\b/i.test(context)) signals.push("self-hosted-or-open-source");
    if (/\b(?:request access|coming soon|free dashboard)\b/i.test(context)) signals.push("substitute-status");
    if (!signals.length) continue;
    results.push({
      key: `analytics-claim.${slug(sourceFile)}.${start + 1}-${end}`, sourceFile,
      sourceStartLine: start + 1, sourceEndLine: end, signals, contextHash: sha256(context),
      disposition: "blocked-pending-current-product-verification", blockedCopyKey: ANALYTICS_BLOCK_KEY,
    });
  }
  return results;
}

function resolveImport(fromPath, specifier, available) {
  if (!(specifier.startsWith(".") || specifier.startsWith("@/"))) return null;
  const base = specifier.startsWith("@/") ? resolve(ROOT, specifier.slice(2)) : resolve(dirname(resolve(ROOT, fromPath)), specifier);
  for (const suffix of ["", ".ts", ".tsx", ".js", ".mjs", ".json", "/index.ts", "/index.tsx"]) {
    const candidate = relative(ROOT, `${base}${suffix}`);
    if (available.has(candidate)) return candidate;
  }
  return null;
}

async function buildCurrentInventory() {
  const candidates = [
    ...await walk(resolve(ROOT, "app"), (path) => /\.(?:ts|tsx|json|md)$/.test(path)),
    ...await walk(resolve(ROOT, "content/service-pages"), (path) => /\.(?:md|json)$/.test(path)),
    ...await walk(resolve(ROOT, "content/routing"), (path) => /\.json$/.test(path)),
    resolve(ROOT, "scripts/generate-service-page-data.mjs"),
    ...await walk(resolve(ROOT, "public"), (path) => /\.(?:txt|json|svg|xml|webmanifest|md)$/.test(path)),
  ];
  const paths = [...new Set(candidates.map((path) => relative(ROOT, path)))].sort();
  const available = new Set(paths);
  const texts = new Map();
  const imports = new Map();
  for (const path of paths) {
    const text = await readFile(resolve(ROOT, path), "utf8");
    texts.set(path, text);
    const edges = [];
    for (const match of text.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g)) {
      const target = resolveImport(path, match[1], available);
      if (target) edges.push(target);
    }
    imports.set(path, edges);
  }
  const entrypoints = paths.filter((path) => /^app\/(?:.*\/)?(?:page|layout|not-found|robots|sitemap)\.tsx?$/.test(path));
  const reachable = new Set(entrypoints);
  const queue = [...entrypoints];
  while (queue.length) for (const target of imports.get(queue.shift()) ?? []) if (!reachable.has(target)) { reachable.add(target); queue.push(target); }
  reachable.add("scripts/generate-service-page-data.mjs");
  for (const path of paths) if (path.startsWith("content/service-pages/") || path.startsWith("public/")) reachable.add(path);

  const allDetail = [];
  const analyticsClaims = [];
  const sources = [];
  for (const path of paths) {
    const text = texts.get(path);
    const detail = extractSourceValues(text, path);
    allDetail.push(...detail);
    analyticsClaims.push(...detectAnalyticsClaimContexts(text, path));
    let classification = "authored-source";
    if (path.includes(".generated.")) classification = "generated-mirror";
    else if (path === "scripts/generate-service-page-data.mjs") classification = "generator";
    else if (path.startsWith("public/")) classification = "public-asset";
    sources.push({
      path, sha256: sha256(text), bytes: Buffer.byteLength(text), classification,
      reachable: reachable.has(path), editorialAuthority: classification !== "generated-mirror",
      publicStringCount: detail.length, importCount: imports.get(path)?.length ?? 0,
      provenance: `repository:${CONTRACT_INPUT_BASE}`,
    });
  }
  const dedupClaims = [...new Map(analyticsClaims.map((claim) => [`${claim.sourceFile}:${claim.contextHash}`, claim])).values()]
    .sort((a, b) => a.sourceFile.localeCompare(b.sourceFile) || a.sourceStartLine - b.sourceStartLine);
  const combined = [...texts.values()].join("\n");
  const indicators = [
    ["email-address", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi],
    ["absolute-url", /https?:\/\/\S+/gi],
    ["analytics-id", /\b(?:G-[A-Z0-9]{6,}|UA-\d+-\d+)\b/gi],
    ["secret-shaped-word", /\b(?:secret|password|token|api[_-]?key|credential)\b/gi],
  ].map(([indicator, regex]) => ({ indicator, count: [...combined.matchAll(regex)].length }));
  const compact = {
    schemaVersion: 2, contractInputBase: CONTRACT_INPUT_BASE, publicRenderBase: PUBLIC_RENDER_BASE,
    sources, analyticsClaimContexts: dedupClaims,
    counts: {
      sources: sources.length, reachable: sources.filter(({ reachable: value }) => value).length,
      authored: sources.filter(({ classification }) => classification === "authored-source").length,
      generatedMirrors: sources.filter(({ classification }) => classification === "generated-mirror").length,
      publicStringsOnDemand: allDetail.length, analyticsClaimContexts: dedupClaims.length,
    },
    fullDetail: { committed: false, generationCommand: "node scripts/commercial-copy-build.mjs --check --inventory-detail <path>", recordCount: allDetail.length, deterministicDigest: sha256(json(allDetail)) },
    securityScan: {
      privateKeyMarkers: [...combined.matchAll(/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g)].length,
      commonTokenPrefixes: [...combined.matchAll(/\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,})\b/g)].length,
      indicators,
    },
  };
  return { compact, detail: { schemaVersion: 1, generatedFrom: CONTRACT_INPUT_BASE, records: allDetail } };
}

function coverageFor(slots) {
  const active = slots.filter(({ selectionAction }) => selectionAction !== "remove");
  const selectedFor = (key) => active.filter(({ selectedRecord }) => {
    if (key === "forms-states") return selectedRecord.classification === "form-state";
    if (key === "metadata-schema") return ["metadata", "schema"].includes(selectedRecord.classification);
    if (key === "visuals-accessibility") return ["figure", "accessible-text"].includes(selectedRecord.classification) || selectedRecord.pageKey === key;
    if (key === "routes-fragments") return selectedRecord.classification === "route" || selectedRecord.pageKey === key;
    if (key === "navigation-footer") return selectedRecord.classification === "navigation" || selectedRecord.pageKey === key;
    if (key === "packet-049-corrections") return selectedRecord.sourcePacket === CORRECTION_PACKET_KEY;
    return selectedRecord.pageKey === key;
  }).map(({ key: slotKey }) => slotKey);
  const categories = REQUIRED_COVERAGE_CATEGORIES.map((key) => ({ key, selectedSlotKeys: selectedFor(key) }));
  return {
    schemaVersion: 1, categories,
    expectedSlotCount: categories.reduce((sum, category) => sum + category.selectedSlotKeys.length, 0),
    missingSlotCount: categories.filter(({ selectedSlotKeys }) => !selectedSlotKeys.length).length,
  };
}

function adaptersFor(slots) {
  const active = slots.filter(({ selectionAction }) => selectionAction !== "remove");
  return {
    schemaVersion: 1,
    pages: ADAPTER_PAGE_KEYS.map((key) => ({ key, selectedSlotKeys: active.filter(({ selectedRecord }) => selectedRecord.pageKey === key).map(({ key: slotKey }) => slotKey) })),
    blockedSlotKeys: [ANALYTICS_BLOCK_KEY],
  };
}

function buildAdapterSource() {
  return `// Generated by scripts/commercial-copy-build.mjs. Do not edit.\nimport { commercialCopyContract } from "./contract";\nimport type { CommercialCopyRecord } from "./types";\n\nexport const commercialAdapterPageKeys = ${JSON.stringify(ADAPTER_PAGE_KEYS)} as const;\nexport type CommercialAdapterPageKey = (typeof commercialAdapterPageKeys)[number];\nconst blockedSlotKeys = new Set<string>([${JSON.stringify(ANALYTICS_BLOCK_KEY)}]);\n\nexport function assertCommercialSlotAvailable(slotKey: string): void {\n  if (blockedSlotKeys.has(slotKey)) throw new Error(\`blocked commercial-copy slot requested: \${slotKey}\`);\n}\n\nexport function getCommercialPageAdapter(pageKey: CommercialAdapterPageKey): ReadonlyArray<CommercialCopyRecord> {\n  return commercialCopyContract.records.filter((record) => record.pageKey === pageKey);\n}\n\n${ADAPTER_PAGE_KEYS.map((key) => `export const ${key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}CommercialAdapter = () => getCommercialPageAdapter(${JSON.stringify(key)});`).join("\n")}\n`;
}

function buildBlocked(inventory, corrections) {
  return {
    schemaVersion: 2,
    policy: "No placeholder, guessed value, synonym, summary, caption, alt text, metadata, field state, mobile variant, coming-soon status, request-access status, free-dashboard wording, or other replacement may stand in for a blocked semantic slot.",
    items: [{
      key: ANALYTICS_BLOCK_KEY, status: corrections.analyticsAvailability.status.value,
      reason: corrections.analyticsAvailability.reason.value, targetApproved: false, replacementText: null,
      sourcePacket: CORRECTION_PACKET_KEY,
      sourceLocations: [corrections.analyticsAvailability.key.sourceLocation, corrections.analyticsAvailability.status.sourceLocation, corrections.analyticsAvailability.reason.sourceLocation],
      currentClaims: inventory.analyticsClaimContexts.map((claim) => ({ ...claim })),
    }],
  };
}

export function validateAdapterRequest(slotKey, blocked) {
  if (blocked.items.some(({ key }) => key === slotKey)) throw new Error(`blocked commercial-copy slot requested: ${slotKey}`);
  return slotKey;
}

function artifactDigestsFor(artifacts) {
  return {
    contract: sha256(json(artifacts.contract)), inventory: sha256(json(artifacts.inventory)),
    blocked: sha256(json(artifacts.blocked)), collisionReport: sha256(json(artifacts.collisionReport)),
    coverage: sha256(json(artifacts.coverage)), adapterSource: sha256(artifacts.adapterSource),
  };
}

export async function buildArtifacts(bundle) {
  const records = bundle.packets.flatMap((packet) => parsePacketContent(packet.content, packet));
  const { semanticSlots, explicitCollisions } = resolveSemanticSlots(records);
  const collisionReport = buildCollisionReport(records, explicitCollisions);
  const corrections = buildCorrections(bundle);
  const { compact: inventory, detail: inventoryDetail } = await buildCurrentInventory();
  const blocked = buildBlocked(inventory, corrections);
  const coverage = coverageFor(semanticSlots);
  const adapters = adaptersFor(semanticSlots);
  const activeRecords = semanticSlots.filter(({ selectionAction }) => selectionAction !== "remove").map(({ selectedRecord }) => selectedRecord);
  for (const record of activeRecords) if (record.exactValue.includes("$95")) record.canonicalProductKey = REPORTING_PRODUCT_KEY;
  const contract = {
    schemaVersion: 2, publicRenderBase: PUBLIC_RENDER_BASE, contractInputBase: CONTRACT_INPUT_BASE,
    editorialOwner: "ChatGPT", workerCopyAuthority: "none", bindingPrecedence: BINDING_PRECEDENCE,
    structuralAuthorities: ["044", "046", "048", "014"], parserCapabilities: REQUIRED_PARSER_FORMATS,
    packetSnapshots: bundle.packets.map(({ key, surface, sha256: digest, lineCount }) => ({ key, surface, sha256: digest, lineCount })).sort((a, b) => a.key.localeCompare(b.key)),
    approvedServiceNames: REQUIRED_SERVICE_NAMES, approvedPriceStrings: REQUIRED_PRICE_STRINGS,
    approvedEvidenceSourceClasses: corrections.evidence.sourceClasses.map(({ value }) => value),
    products: [{ key: REPORTING_PRODUCT_KEY, price: corrections.reportingProduct.price.value, priceFamily: corrections.reportingProduct.priceFamily.value, canonicalAnchor: corrections.reportingProduct.canonicalAnchor.value, sourceLocations: [corrections.reportingProduct.price.sourceLocation, corrections.reportingProduct.priceFamily.sourceLocation, corrections.reportingProduct.canonicalAnchor.sourceLocation] }],
    pricingAnchors: { canonical: { value: corrections.reportingProduct.canonicalAnchor.value, productKey: REPORTING_PRODUCT_KEY }, compatibilityAlias: { value: corrections.reportingProduct.compatibilityAlias.value, productKey: REPORTING_PRODUCT_KEY } },
    corrections, semanticSlots, records: activeRecords, adapterManifest: adapters,
    collisionReportDigest: sha256(json(collisionReport)), coverageDigest: sha256(json(coverage)),
  };
  const adapterSource = buildAdapterSource();
  const artifacts = { contract, inventory, blocked, collisionReport, coverage, adapters, adapterSource, inventoryDetail };
  artifacts.artifactDigests = artifactDigestsFor(artifacts);
  return artifacts;
}

export function validateArtifacts(bundle, artifactsOrContract, legacyInventory, legacyBlocked) {
  const artifacts = legacyInventory ? { contract: artifactsOrContract, inventory: legacyInventory, blocked: legacyBlocked } : artifactsOrContract;
  const findings = [];
  const { contract, inventory, blocked, collisionReport, coverage, adapters, adapterSource, artifactDigests } = artifacts;
  for (const spec of PACKETS) {
    const packet = bundle.packets.find(({ key }) => key === spec.key);
    const digest = packet ? sha256(packet.content) : null;
    if (!packet || digest !== EXPECTED_PACKET_HASHES[spec.key] || packet.sha256 !== digest) findings.push(`packet hash mismatch: ${spec.key}`);
  }
  const sourceRecordKeys = new Set(bundle.packets.flatMap((packet) => parsePacketContent(packet.content, packet))
    .map((record) => `${record.sourceLocation}\0${record.exactValue}`));
  if (json(contract?.bindingPrecedence) !== json(BINDING_PRECEDENCE)) findings.push("binding precedence mismatch");
  if (json(contract?.parserCapabilities) !== json(REQUIRED_PARSER_FORMATS)) findings.push("parser capability manifest mismatch");
  for (const slot of contract?.semanticSlots ?? []) {
    if (!slot.selectedRecord) findings.push(`semantic slot missing selected record: ${slot.key}`);
    else if (!sourceRecordKeys.has(`${slot.selectedRecord.sourceLocation}\0${slot.selectedRecord.exactValue}`)) findings.push(`selected record source mismatch: ${slot.key}`);
    if (slot.displacedRecords?.some((record) => record.key === slot.selectedRecord?.key)) findings.push(`selected record also displaced: ${slot.key}`);
  }
  for (const collision of collisionReport?.collisions ?? []) {
    if (!collision.selectedRecord) findings.push(`collision missing selected record: ${collision.key}`);
    if (!collision.displacedRecords?.length) findings.push(`collision missing displaced records: ${collision.key}`);
    if (collision.valueKind === "different" && !collision.supersession) findings.push(`differing collision missing explicit supersession: ${collision.key}`);
  }
  if (collisionReport?.unresolvedCount !== 0) findings.push(`unresolved collisions: ${collisionReport?.unresolvedCount}`);
  const categoryMap = new Map((coverage?.categories ?? []).map((category) => [category.key, category]));
  for (const key of REQUIRED_COVERAGE_CATEGORIES) {
    if (!categoryMap.has(key)) findings.push(`coverage category missing: ${key}`);
    else if (!categoryMap.get(key).selectedSlotKeys.length) findings.push(`coverage category empty: ${key}`);
  }
  if (coverage?.missingSlotCount !== 0) findings.push(`coverage missing slots: ${coverage?.missingSlotCount}`);
  const sourceMap = new Map((inventory?.sources ?? []).map((source) => [source.path, source]));
  for (const path of REQUIRED_CURRENT_SOURCES) if (!sourceMap.has(path)) findings.push(`required current source missing: ${path}`);
  for (const source of inventory?.sources ?? []) {
    if (source.classification === "generated-mirror" && source.editorialAuthority !== false) findings.push(`generated source has editorial authority: ${source.path}`);
    if (source.path === "app/content/servicePages.generated.ts" && source.reachable !== true) findings.push("generated service-page mirror marked unreachable");
  }
  const expectedCorrections = buildCorrections(bundle);
  const block = blocked?.items?.find(({ key }) => key === ANALYTICS_BLOCK_KEY);
  if (!block || blocked.items.length !== 1 || block.status !== expectedCorrections.analyticsAvailability.status.value || block.reason !== expectedCorrections.analyticsAvailability.reason.value || block.targetApproved !== false || block.replacementText !== null) findings.push("blocked record mismatch");
  if (block && json(block.currentClaims) !== json(inventory.analyticsClaimContexts)) findings.push("blocked current-claim registry mismatch");
  if (!block?.currentClaims?.some(({ sourceFile }) => sourceFile === "content/service-pages/04-digital-research-seo-audits-strategy.md") || !block?.currentClaims?.some(({ sourceFile }) => sourceFile === "app/content/servicePages.generated.ts")) findings.push("contextual Analytics claim coverage missing");
  if (contract?.records?.some(({ exactValue }) => /Boho Analytics Platform.*(?:coming soon|request access|free dashboard|without paying)/i.test(exactValue))) findings.push("blocked Analytics availability is target-approved");
  for (const name of REQUIRED_SERVICE_NAMES) if (!contract?.records?.some(({ exactValue }) => exactValue === name)) findings.push(`missing approved service name: ${name}`);
  for (const price of REQUIRED_PRICE_STRINGS) if (!contract?.records?.some(({ exactValue }) => exactValue === price)) findings.push(`missing approved price: ${price}`);
  if (contract?.products?.length !== 1 || contract.products[0].key !== REPORTING_PRODUCT_KEY) findings.push("reporting product count mismatch");
  if (contract?.pricingAnchors?.canonical?.productKey !== contract?.pricingAnchors?.compatibilityAlias?.productKey) findings.push("pricing alias product mismatch");
  if (json(contract?.corrections) !== json(expectedCorrections)) findings.push("packet 049 correction mismatch");
  if (json(adapters?.pages?.map(({ key }) => key)) !== json(ADAPTER_PAGE_KEYS)) findings.push("adapter page schema mismatch");
  for (const page of adapters?.pages ?? []) {
    if (!page.selectedSlotKeys.length) findings.push(`adapter page empty: ${page.key}`);
    if (page.selectedSlotKeys.includes(ANALYTICS_BLOCK_KEY)) findings.push(`adapter exposes blocked slot: ${page.key}`);
  }
  if (!adapters?.blockedSlotKeys?.includes(ANALYTICS_BLOCK_KEY)) findings.push("adapter blocked-slot registry missing");
  if (inventory?.securityScan && Object.values(inventory.securityScan).some((value) => Array.isArray(value) && value.some((item) => item.matches || item.values))) findings.push("security scan reproduces matched values");
  if (artifactDigests) {
    const computed = artifactDigestsFor({ contract, inventory, blocked, collisionReport, coverage, adapterSource });
    for (const [name, digest] of Object.entries(computed)) if (artifactDigests[name] !== digest) findings.push(`artifact digest mismatch: ${name}`);
  }
  return [...new Set(findings)].sort();
}

async function createBundle(snapshotRoot) {
  const packets = [];
  for (const spec of PACKETS) {
    const content = await readFile(resolve(snapshotRoot, spec.file), "utf8");
    const digest = sha256(content);
    if (digest !== EXPECTED_PACKET_HASHES[spec.key]) throw new Error(`Binding packet hash mismatch: ${spec.key}`);
    packets.push({ ...spec, sha256: digest, lineCount: content.split("\n").length, content });
  }
  return { schemaVersion: 2, authority: "ChatGPT-authored packet snapshots; exact content copied mechanically.", publicRenderBase: PUBLIC_RENDER_BASE, contractInputBase: CONTRACT_INPUT_BASE, packets };
}

async function readCommittedArtifacts() {
  const [contract, inventory, blocked, collisionReport, coverage, adapterSource] = await Promise.all([
    readFile(CONTRACT_PATH, "utf8").then(JSON.parse), readFile(INVENTORY_PATH, "utf8").then(JSON.parse),
    readFile(BLOCKED_PATH, "utf8").then(JSON.parse), readFile(COLLISION_PATH, "utf8").then(JSON.parse),
    readFile(COVERAGE_PATH, "utf8").then(JSON.parse), readFile(ADAPTER_PATH, "utf8"),
  ]);
  const adapters = contract.adapterManifest;
  const artifacts = { contract, inventory, blocked, collisionReport, coverage, adapters, adapterSource };
  artifacts.artifactDigests = artifactDigestsFor(artifacts);
  return artifacts;
}

async function main() {
  const args = process.argv.slice(2);
  const snapshotIndex = args.indexOf("--snapshot-root");
  const detailIndex = args.indexOf("--inventory-detail");
  const snapshotRoot = snapshotIndex >= 0 ? resolve(args[snapshotIndex + 1]) : null;
  const detailPath = detailIndex >= 0 ? resolve(args[detailIndex + 1]) : null;
  const check = args.includes("--check");
  const write = args.includes("--write");
  if (check === write) throw new Error("Choose exactly one of --check or --write.");
  const bundle = snapshotRoot ? await createBundle(snapshotRoot) : JSON.parse(await readFile(BUNDLE_PATH, "utf8"));
  const expected = await buildArtifacts(bundle);
  const findings = validateArtifacts(bundle, expected);
  if (findings.length) {
    for (const finding of findings) console.error(`commercial-copy: ${finding}`);
    process.exitCode = 1; return;
  }
  if (detailPath) await writeFile(detailPath, json(expected.inventoryDetail));
  if (write) {
    if (snapshotRoot) await writeFile(BUNDLE_PATH, json(bundle));
    await Promise.all([
      writeFile(CONTRACT_PATH, json(expected.contract)), writeFile(INVENTORY_PATH, json(expected.inventory)),
      writeFile(BLOCKED_PATH, json(expected.blocked)), writeFile(COLLISION_PATH, json(expected.collisionReport)),
      writeFile(COVERAGE_PATH, json(expected.coverage)), writeFile(ADAPTER_PATH, expected.adapterSource),
    ]);
  } else {
    const actual = await readCommittedArtifacts();
    const actualFindings = validateArtifacts(bundle, actual);
    const pairs = [
      ["contract", expected.contract, actual.contract], ["inventory", expected.inventory, actual.inventory],
      ["blocked", expected.blocked, actual.blocked], ["collision-report", expected.collisionReport, actual.collisionReport],
      ["coverage", expected.coverage, actual.coverage], ["adapter", expected.adapterSource, actual.adapterSource],
    ];
    for (const [name, wanted, found] of pairs) if ((typeof wanted === "string" ? wanted : json(wanted)) !== (typeof found === "string" ? found : json(found))) actualFindings.push(`stale generated artifact: ${name}`);
    if (actualFindings.length) {
      for (const finding of [...new Set(actualFindings)].sort()) console.error(`commercial-copy: ${finding}`);
      process.exitCode = 1; return;
    }
  }
  console.log(`commercial-copy: ok; packets=${bundle.packets.length}; slots=${expected.contract.semanticSlots.length}; collisions=${expected.collisionReport.metrics.total}; unresolved=0; sources=${expected.inventory.sources.length}; blocked=${expected.blocked.items.length}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
