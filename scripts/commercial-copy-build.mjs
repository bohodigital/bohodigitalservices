import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_COMMIT = "89cb0982b8f2274a289e8126c9472640a5305011";
const DATA_ROOT = resolve(ROOT, "content/commercial");
const BUNDLE_PATH = resolve(DATA_ROOT, "source-packets.json");
const CONTRACT_PATH = resolve(DATA_ROOT, "commercial-copy-contract.json");
const INVENTORY_PATH = resolve(DATA_ROOT, "current-target-inventory.json");
const BLOCKED_PATH = resolve(DATA_ROOT, "blocked-copy.json");

export const PACKETS = [
  ["WO-2026-07-23-BOHO-CHATGPT-VERBATIM-COPY-LOCK-021", 1, "global-governance"],
  ["WO-2026-07-23-BOHO-CHATGPT-EDITORIAL-SELF-AUDIT-V2-022", 2, "global-governance"],
  ["WO-2026-07-24-BOHO-CHATGPT-TIMELINE-COPY-034", 3, "timelines"],
  ["WO-2026-07-24-BOHO-CHATGPT-SERVICE-COMMERCIAL-LAYERS-035", 4, "service-detail"],
  ["WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036", 5, "homepage"],
  ["WO-2026-07-24-BOHO-CHATGPT-PRICING-COPY-037", 6, "pricing"],
  ["WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038", 7, "work"],
  ["WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039", 8, "contact-start-navigation-footer"],
  ["WO-2026-07-24-BOHO-CHATGPT-COMMERCIAL-METADATA-040", 9, "metadata-schema"],
  ["WO-2026-07-24-BOHO-CHATGPT-SERVICES-OVERVIEW-COPY-041", 10, "services"],
  ["WO-2026-07-24-BOHO-CHATGPT-VISUAL-ACCESSIBLE-COPY-043", 11, "visual-accessibility"],
  ["WO-2026-07-24-BOHO-ROUTE-ANCHOR-COMPATIBILITY-045", 12, "route-fragment-compatibility"],
  ["WO-2026-07-24-BOHO-CHATGPT-EMERGENCY-COPY-047", 13, "emergency"],
  ["WO-2026-07-24-BOHO-CHATGPT-DIRECT-REVIEW-PROTOCOL-048", 14, "review-protocol"],
  ["WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049", 15, "cross-packet-corrections"],
].map(([key, precedence, surface]) => ({
  key, precedence, surface, file: `${key}.md`,
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
const CORRECTION_PACKET_KEY = "WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049";
const REPORTING_PRODUCT_KEY = "product.seoReporting.monthly";
const ANALYTICS_BLOCK_KEY = "product.bohoAnalytics.publicFreeAvailability";
const SUPERSEDED_TARGET_LOCATIONS = new Set([
  "WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036:244",
  "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:30",
  "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:186",
  "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:200",
  "WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038:226",
  "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039:121",
  "WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039:295",
  `${CORRECTION_PACKET_KEY}:14`, `${CORRECTION_PACKET_KEY}:31`,
  `${CORRECTION_PACKET_KEY}:175`, `${CORRECTION_PACKET_KEY}:178`, `${CORRECTION_PACKET_KEY}:181`,
]);

const REQUIRED_SERVICE_NAMES = [
  "Local Visibility & Lead Systems",
  "Websites & Managed Hosting",
  "Provider Rescue & Migration",
  "Custom Tools & Automation",
  "Research, Analytics & Improvement",
];

const REQUIRED_PRICE_STRINGS = [
  "Initial public review — Free",
  "SEO reporting — Starting at $95 per month",
  "SEO implementation — Starting at $450 per month",
  "Focused website improvement — Starting at $750",
  "New website — Starting at $1,500",
  "Substantial redesign — Starting at $1,500",
  "Provider Rescue Assessment — Starting at $350",
  "Migration assistance — Starting at $1,000",
  "Focused audit or strategy — Starting at $350",
  "Custom discovery — Starting at $500",
  "Focused custom build — Starting at $2,500",
];

const CURRENT_SOURCE_ROOTS = [
  "app/Homepage.tsx", "app/components", "app/content", "app/layout.tsx", "app/sitemap.ts",
  "content/service-pages", "content/routing",
];
const REQUIRED_TARGET_SURFACES = [
  "timelines", "service-detail", "homepage", "pricing", "work",
  "contact-start-navigation-footer", "metadata-schema", "services", "visual-accessibility",
  "route-fragment-compatibility", "emergency", "cross-packet-corrections",
];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const lineNumber = (text, offset) => text.slice(0, offset).split("\n").length;

function classifyTarget(value, label, heading, surface) {
  const context = `${label} ${heading} ${surface}`.toLowerCase();
  if (/destination|canonical|route|anchor|fragment|href|mailto/.test(context) || /^(\/|#|mailto:)/.test(value)) return "route";
  if (/schema/.test(context)) return "schema";
  if (/metadata|meta description|open graph|og |title tag|canonical/.test(context)) return "metadata";
  if (/alt text|accessible|aria|long description|screen reader|decorative/.test(context)) return "accessible-text";
  if (/diagram|figure|caption|visual|svg|legend|axis|status label/.test(context)) return "figure";
  if (/form|field|placeholder|hint|consent|privacy|required|optional|success|failure|rate limit|offline|network|option/.test(context)) return "form-state";
  if (/price|pricing|starting at|\$|free/.test(`${context} ${value.toLowerCase()}`)) return "price";
  if (/timeline|timing|week|day|month|business day/.test(`${context} ${value.toLowerCase()}`)) return "timeline";
  if (/evidence|limitation|source class|owned property|fictional concept/.test(`${context} ${value.toLowerCase()}`)) return "evidence";
  if (/navigation|footer|mobile menu|menu|link label/.test(context)) return "navigation";
  if (/cta|action|link/.test(context)) return "action";
  return "visible-text";
}

function inferRoute(surface, heading, value) {
  if (/^(\/|#)/.test(value)) return value;
  const context = `${surface} ${heading}`.toLowerCase();
  if (surface === "homepage") return "/";
  if (surface === "services") return "/services/";
  if (surface === "pricing") return "/pricing/";
  if (surface === "work") return "/work/";
  if (surface === "emergency") return "/emergency/";
  if (surface === "contact-start-navigation-footer") {
    if (context.includes("contact")) return "/contact/";
    if (context.includes("start") || context.includes("form")) return "/start/";
    return "site-wide";
  }
  if (surface === "service-detail") return "/services/[service]/";
  return "site-wide";
}

function isWholeBacktickValue(line) {
  return /^(?:[-*]\s+|\d+\.\s+)?`[^`]+`[.,;:]?$/.test(line.trim());
}

function sourcedValue(bundle, line, tokenIndex = 0) {
  const packet = bundle.packets.find(({ key }) => key === CORRECTION_PACKET_KEY);
  if (!packet) throw new Error(`Missing correction packet: ${CORRECTION_PACKET_KEY}`);
  const sourceLine = packet.content.split("\n")[line - 1] ?? "";
  const tokens = [...sourceLine.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  const value = tokens[tokenIndex];
  if (value === undefined) throw new Error(`Missing correction token ${tokenIndex} at ${CORRECTION_PACKET_KEY}:${line}`);
  return {
    value,
    sourcePacket: CORRECTION_PACKET_KEY,
    sourceLine: line,
    sourceLocation: `${CORRECTION_PACKET_KEY}.md:${line}`,
  };
}

function buildCorrections(bundle) {
  return {
    sourcePacket: CORRECTION_PACKET_KEY,
    contact: {
      pathCount: 4,
      pathCountSourceLocation: `${CORRECTION_PACKET_KEY}.md:20-25`,
      heading: sourcedValue(bundle, 18),
      standardInquiry: {
        options: [35, 36, 37, 38, 39, 40].map((line) => sourcedValue(bundle, line)),
        removedOption: sourcedValue(bundle, 31),
        automaticEmergencyRedirect: false,
        routingSourceLocation: `${CORRECTION_PACKET_KEY}.md:27-59`,
        emergencyBlock: {
          eyebrow: sourcedValue(bundle, 45),
          heading: sourcedValue(bundle, 48),
          body: sourcedValue(bundle, 51),
          linkLabel: sourcedValue(bundle, 54),
          destination: sourcedValue(bundle, 57),
        },
      },
    },
    evidence: {
      sourceClasses: [65, 66, 67, 68, 69, 70, 71].map((line) => sourcedValue(bundle, line)),
      technicalRecordDefinition: {
        name: sourcedValue(bundle, 66),
        definition: sourcedValue(bundle, 78),
        limitation: sourcedValue(bundle, 81),
      },
      workHeroIntroduction: sourcedValue(bundle, 85),
      homepageIntroduction: sourcedValue(bundle, 89),
      artifacts: [
        { title: sourcedValue(bundle, 93, 0), sourceClass: sourcedValue(bundle, 93, 1) },
        { title: sourcedValue(bundle, 94, 0), sourceClass: sourcedValue(bundle, 94, 1) },
        { title: sourcedValue(bundle, 98), sourceClass: sourcedValue(bundle, 96) },
        { title: sourcedValue(bundle, 99), sourceClass: sourcedValue(bundle, 96) },
      ],
    },
    glossaryEvidence: {
      currentStatus: sourcedValue(bundle, 107),
      acceptedFoundationCommitLabel: sourcedValue(bundle, 112),
      acceptedFoundationCommit: sourcedValue(bundle, 115),
      acceptedRouteCountLabel: sourcedValue(bundle, 118),
      acceptedRouteCount: sourcedValue(bundle, 121),
      statusBoundarySourceLocation: `${CORRECTION_PACKET_KEY}.md:103-123`,
    },
    reportingProduct: {
      key: REPORTING_PRODUCT_KEY,
      price: sourcedValue(bundle, 129),
      priceFamily: sourcedValue(bundle, 131, 0),
      canonicalAnchor: sourcedValue(bundle, 131, 1),
      compatibilityAlias: sourcedValue(bundle, 155),
      crossReference: {
        eyebrow: sourcedValue(bundle, 138),
        heading: sourcedValue(bundle, 141),
        body: sourcedValue(bundle, 144),
        price: sourcedValue(bundle, 147),
        linkLabel: sourcedValue(bundle, 150),
        destination: sourcedValue(bundle, 153),
      },
    },
    analyticsAvailability: {
      key: sourcedValue(bundle, 175),
      status: sourcedValue(bundle, 178),
      reason: sourcedValue(bundle, 181),
      targetApproved: false,
      replacementText: null,
    },
  };
}

function extractTargetRecords(bundle) {
  const records = [];
  for (const packet of bundle.packets) {
    if (packet.editorialAuthority !== "chatgpt" || packet.precedence < 3) continue;
    const lines = packet.content.split("\n");
    let heading = "";
    let label = "";
    let lastAction = null;
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const trimmed = line.trim();
      if (/^#{1,6}\s+/.test(trimmed)) {
        heading = trimmed.replace(/^#{1,6}\s+/, ""); label = ""; lastAction = null; continue;
      }
      if (/^[A-Za-z0-9][^`]{0,100}:$/.test(trimmed)) { label = trimmed.slice(0, -1); continue; }
      const match = isWholeBacktickValue(line)
        ? line.match(/`([^`]+)`/)
        : packet.precedence === 3
          ? trimmed.match(/^(?:[-*]\s+|\d+\.\s+)?“([^”]+)”[.,;:]?$/)
          : null;
      if (!match) continue;
      const exactValue = match[1];
      const sourceLine = index + 1;
      const classification = classifyTarget(exactValue, label, heading, packet.surface);
      const record = {
        key: `target.${packet.surface}.p${String(packet.precedence).padStart(2, "0")}.l${String(sourceLine).padStart(4, "0")}`,
        exactValue, route: inferRoute(packet.surface, heading, exactValue), surface: packet.surface,
        section: heading, field: label || "list-item", status: "target", currentlyRendered: false,
        disposition: "replace-later-with-exact-approved-text", classification,
        routeDestination: classification === "route" ? exactValue : null,
        sourcePacket: packet.key, sourceLine, sourceLocation: `${packet.key}.md:${sourceLine}`,
        sourceKind: "chatgpt-packet", editorialAuthority: "ChatGPT",
      };
      if (classification === "route" && lastAction && lastAction.section === heading) lastAction.routeDestination = exactValue;
      if (classification === "action" || /cta|link|button|action/i.test(label)) lastAction = record;
      records.push(record); label = "";
    }
  }
  const knownActionRoutes = new Map([
    ["Send the Situation", "/start/"],
    ["Email Boho", "mailto:contact@bohemiandigital.org"],
    ["Email Boho instead", "mailto:contact@bohemiandigital.org"],
    ["Emergency Website Help", "/emergency/"],
    ["Describe the Emergency", "#emergency-request"],
    ["Use the Standard Project Inquiry", "/start/"],
    ["Return to Emergency Help", "/emergency/"],
    ["See Local Visibility & Lead Systems", "/services/ongoing-seo/"],
    ["See Websites & Managed Hosting", "/services/web-design-redesign/"],
    ["See Provider Rescue & Migration", "/services/provider-rescue/"],
    ["See Research, Analytics & Improvement", "/services/research-audits-strategy/"],
    ["See Custom Tools & Automation", "/services/custom-digital-solutions/"],
  ]);
  for (const record of records) {
    if (!record.routeDestination && knownActionRoutes.has(record.exactValue)) record.routeDestination = knownActionRoutes.get(record.exactValue);
    if (record.exactValue.includes("$95")) record.canonicalProductKey = REPORTING_PRODUCT_KEY;
  }
  return records.filter((record) => !SUPERSEDED_TARGET_LOCATIONS.has(`${record.sourcePacket}:${record.sourceLine}`));
}

function routeForCurrentPath(path) {
  if (path.includes("Homepage")) return "/";
  if (path.includes("Pricing")) return "/pricing/";
  if (path.includes("WorkEvidence")) return "/work/";
  if (path.includes("ServicesPage")) return "/services/";
  if (path.includes("ServiceDetail") || path.includes("servicePages")) return "/services/[service]/";
  if (path.includes("DraftForm") || path.includes("formContract")) return "/start/";
  if (/navigation|SiteChrome|MobileMenu|DesktopNavigation/.test(path)) return "site-wide";
  return "multiple";
}

function classifyCurrent(path, value) {
  if (/^(\/|#|mailto:)/.test(value)) return "route";
  if (/form|DraftForm/i.test(path)) return "form-state";
  if (/navigation|Chrome|Menu/i.test(path)) return "navigation";
  if (/servicePresentation/i.test(path) && /illustration|mixed-media/i.test(value)) return "accessible-text";
  if (/layout/i.test(path)) return "metadata-or-visible";
  return "candidate-public-string";
}

async function filesUnder(path) {
  const absolute = resolve(ROOT, path);
  const info = await stat(absolute);
  if (info.isFile()) return [absolute];
  const result = [];
  for (const entry of await readdir(absolute, { withFileTypes: true })) {
    const child = resolve(absolute, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "commercial") continue;
      result.push(...await filesUnder(relative(ROOT, child)));
    } else if (/\.(?:ts|tsx|md|json)$/.test(entry.name)) result.push(child);
  }
  return result;
}

function decodeLiteral(raw) {
  if (raw.startsWith('"')) {
    try { return JSON.parse(raw); } catch { return raw.slice(1, -1); }
  }
  return raw.slice(1, -1).replaceAll("\\'", "'").replaceAll("\\n", "\n").replaceAll("\\t", "\t").replaceAll("\\\\", "\\");
}

function extractCodeStrings(text) {
  const values = [];
  const literalPattern = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;
  for (const match of text.matchAll(literalPattern)) {
    const value = decodeLiteral(match[0]);
    if (value.length < 2 || /^(?:\.{1,2}\/|@\/)/.test(value)) continue;
    values.push({ value, line: lineNumber(text, match.index ?? 0) });
  }
  const jsxTextPattern = />([^<>{}\n][^<>{}]*)</g;
  for (const match of text.matchAll(jsxTextPattern)) {
    const value = match[1].replace(/\s+/g, " ").trim();
    if (value.length >= 2) values.push({ value, line: lineNumber(text, match.index ?? 0) });
  }
  return values;
}

function extractMarkdownStrings(text) {
  const values = [];
  for (const [index, raw] of text.split("\n").entries()) {
    const value = raw.replace(/^#{1,6}\s+/, "").replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").trim();
    if (value.length < 2 || value === "---" || /^[a-zA-Z][\w-]*:\s*$/.test(value)) continue;
    values.push({ value, line: index + 1 });
  }
  return values;
}

async function buildCurrentInventory() {
  const paths = [...new Set((await Promise.all(CURRENT_SOURCE_ROOTS.map(filesUnder))).flat())].sort();
  const records = [];
  for (const absolute of paths) {
    const path = relative(ROOT, absolute);
    const text = await readFile(absolute, "utf8");
    const extracted = path.endsWith(".md") ? extractMarkdownStrings(text) : extractCodeStrings(text);
    for (const [ordinal, item] of extracted.entries()) {
      records.push({
        key: `current.${path.replace(/[^a-zA-Z0-9]+/g, ".").replace(/^\.+|\.+$/g, "")}.l${String(item.line).padStart(4, "0")}.${ordinal}`,
        exactValue: item.value, route: routeForCurrentPath(path),
        surface: path.includes("components/") ? path.split("/").at(-1).replace(/\.[^.]+$/, "") : path,
        sourceFile: path, sourceField: `literal@L${item.line}`, status: "current",
        currentlyRendered: !path.includes(".generated."), disposition: "preserve-exactly-in-this-phase",
        classification: classifyCurrent(path, item.value),
        routeDestination: /^(\/|#|mailto:)/.test(item.value) ? item.value : null,
        provenance: `repository-base:${BASE_COMMIT}`, editorialAuthority: false,
        generatedSource: path.includes(".generated."),
      });
    }
  }
  return records;
}

function sourceLineMatches(bundle, record) {
  const packet = bundle.packets.find((candidate) => candidate.key === record.sourcePacket);
  if (!packet) return false;
  const sourceLine = packet.content.split("\n")[record.sourceLine - 1] ?? "";
  return sourceLine.includes(`\`${record.exactValue}\``) || sourceLine.includes(`“${record.exactValue}”`);
}

function getValidationFindings(bundle, contract, inventory, blocked) {
  const findings = [];
  const target = contract.records;
  const expectedCorrections = buildCorrections(bundle);
  if (bundle.packets.length !== PACKETS.length) findings.push(`packet count mismatch: ${bundle.packets.length}`);
  for (const [index, spec] of PACKETS.entries()) {
    const packet = bundle.packets[index];
    if (!packet || packet.key !== spec.key || packet.precedence !== spec.precedence) {
      findings.push(`packet order mismatch at precedence ${spec.precedence}`);
      continue;
    }
    const computedHash = sha256(packet.content);
    if (computedHash !== EXPECTED_PACKET_HASHES[spec.key] || packet.sha256 !== computedHash) findings.push(`packet hash mismatch: ${spec.key}`);
  }
  const highestPacket = contract.packetOrder.at(-1);
  if (highestPacket?.key !== CORRECTION_PACKET_KEY || highestPacket.precedence !== 15) findings.push("packet 049 is not highest precedence");
  if (json(contract.corrections) !== json(expectedCorrections)) findings.push("packet 049 correction value or provenance mismatch");
  const contact = contract.corrections.contact;
  const expectedOptions = expectedCorrections.contact.standardInquiry.options.map(({ value }) => value);
  if (contact.pathCount !== 4 || contact.heading.value !== expectedCorrections.contact.heading.value) findings.push("contact path count mismatch");
  if (json(contact.standardInquiry.options.map(({ value }) => value)) !== json(expectedOptions)) findings.push("standard inquiry option order mismatch");
  if (contact.standardInquiry.options.some(({ value }) => value === contact.standardInquiry.removedOption.value)) findings.push("standard inquiry includes Emergency Website Help");
  if (contact.standardInquiry.automaticEmergencyRedirect !== false || contact.standardInquiry.emergencyBlock.destination.value !== "/emergency/") findings.push("ordinary and emergency routing mismatch");
  for (const location of SUPERSEDED_TARGET_LOCATIONS) {
    if (target.some((record) => `${record.sourcePacket}:${record.sourceLine}` === location)) findings.push(`superseded packet value remains: ${location}`);
  }
  if (target.some((record) => record.exactValue === "One contact page. Three different reasons to use it.")) findings.push("contact claims three paths while four are defined");
  const approvedSourceClasses = expectedCorrections.evidence.sourceClasses.map(({ value }) => value);
  if (json(contract.approvedEvidenceSourceClasses) !== json(approvedSourceClasses)) findings.push("evidence source-class taxonomy mismatch");
  for (const artifact of contract.corrections.evidence.artifacts) {
    if (!approvedSourceClasses.includes(artifact.sourceClass.value)) findings.push(`undefined or compound evidence source class: ${artifact.sourceClass.value}`);
  }
  for (const record of target.filter(({ field }) => field === "Source class")) {
    if (!approvedSourceClasses.includes(record.exactValue)) findings.push(`undefined or compound evidence source class: ${record.exactValue}`);
  }
  if (contract.corrections.glossaryEvidence.currentStatus.value !== expectedCorrections.glossaryEvidence.currentStatus.value) findings.push("glossary evidence status is not future-safe");
  if (target.some((record) => /Repository foundation accepted at commit 89cb098.*not deployed/i.test(record.exactValue))) findings.push("glossary commit is presented as permanently current");
  const reportingProducts = contract.products.filter(({ price }) => price === expectedCorrections.reportingProduct.price.value);
  if (reportingProducts.length !== 1) findings.push(`public $95 monthly reporting product count mismatch: ${reportingProducts.length}`);
  const expectedReportingReferences = target.filter(({ exactValue }) => exactValue.includes("$95")).map(({ key, sourceLocation, surface }) => ({
    recordKey: key, sourceLocation, surface, productKey: REPORTING_PRODUCT_KEY,
  }));
  if (json(contract.reportingProductReferences) !== json(expectedReportingReferences)) findings.push("$95 reporting-product reference mapping mismatch");
  if (target.some((record) => record.exactValue.includes("$95") && record.canonicalProductKey !== REPORTING_PRODUCT_KEY)) findings.push("$95 copy points to a noncanonical reporting product");
  if (contract.pricingAnchors.canonical.productKey !== contract.pricingAnchors.compatibilityAlias.productKey
      || contract.pricingAnchors.canonical.value !== expectedCorrections.reportingProduct.canonicalAnchor.value
      || contract.pricingAnchors.compatibilityAlias.value !== expectedCorrections.reportingProduct.compatibilityAlias.value) findings.push("analytics-reporting alias diverges from ongoing-seo product");
  const analyticsBlock = blocked.items.find(({ key }) => key === ANALYTICS_BLOCK_KEY);
  if (blocked.items.length !== 1 || !analyticsBlock) findings.push("required Boho Analytics blocked-copy record missing");
  if (analyticsBlock && (analyticsBlock.status !== expectedCorrections.analyticsAvailability.status.value
      || analyticsBlock.reason !== expectedCorrections.analyticsAvailability.reason.value
      || analyticsBlock.targetApproved !== false || analyticsBlock.replacementText !== null)) findings.push("Boho Analytics blocked-copy record mismatch");
  const currentAnalyticsClaims = inventory.current.filter(isBlockedAnalyticsClaim);
  if (!currentAnalyticsClaims.length) findings.push("current Boho Analytics public-free claim inventory missing");
  if (currentAnalyticsClaims.some((record) => record.disposition !== "blocked-pending-current-product-verification" || record.blockedCopyKey !== ANALYTICS_BLOCK_KEY)) findings.push("current Boho Analytics public-free claim is not blocked");
  if (target.some(isBlockedAnalyticsClaim)) findings.push("Boho Analytics public-free claim is target-approved");
  if (target.some((record) => /Boho Analytics Platform.*(?:coming soon|request access|free dashboard)/i.test(record.exactValue))) findings.push("invented Boho Analytics availability language");
  const groups = [target, inventory.current, inventory.target];
  const all = groups.flat();
  for (const group of groups) {
    const keys = group.map((record) => record.key);
    const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
    if (duplicates.length) findings.push(`duplicate keys: ${[...new Set(duplicates)].join(", ")}`);
  }
  if (all.some((record) => !record.key)) findings.push("missing stable key");
  for (const record of target) {
    if (record.sourceKind !== "chatgpt-packet" || record.editorialAuthority !== "ChatGPT" || !record.sourcePacket || !sourceLineMatches(bundle, record)) findings.push(`unsourced target value: ${record.key}`);
    if (record.sourceKind === "generated" || record.editorialAuthority === false) findings.push(`generated editorial authority: ${record.key}`);
    if (/\b(?:TODO|TBD|lorem ipsum|placeholder copy)\b/i.test(record.exactValue)) findings.push(`placeholder copy: ${record.key}`);
    if (!sourceLineMatches(bundle, record) && /(?:guaranteed? (?:rankings?|traffic|leads?|sales?)|#1|best-in-class|industry-leading)/i.test(record.exactValue)) findings.push(`prohibited or unsupported claim: ${record.key}`);
  }
  const labels = target.filter((record) => /label|cta|heading|eyebrow|title/i.test(record.field));
  const byLower = new Map();
  for (const record of labels) {
    const lower = record.exactValue.toLocaleLowerCase("en-US");
    const previous = byLower.get(lower);
    if (previous && previous.exactValue !== record.exactValue && (!sourceLineMatches(bundle, previous) || !sourceLineMatches(bundle, record))) findings.push(`case-only label variants: ${previous.key}, ${record.key}`);
    else byLower.set(lower, record);
  }
  for (const name of REQUIRED_SERVICE_NAMES) if (!target.some((record) => record.exactValue === name)) findings.push(`missing approved service name: ${name}`);
  const named = target.filter((record) => record.sourcePacket.endsWith("-035") && ((record.field === "Eyebrow" && REQUIRED_SERVICE_NAMES.includes(record.section)) || /service name/i.test(`${record.field} ${record.section}`)));
  for (const record of named) if (!REQUIRED_SERVICE_NAMES.includes(record.exactValue)) findings.push(`unapproved service name: ${record.exactValue}`);
  for (const price of REQUIRED_PRICE_STRINGS) if (!target.some((record) => record.exactValue === price)) findings.push(`missing approved price: ${price}`);
  for (const record of target.filter((item) => item.classification === "price" && /\$/.test(item.exactValue) && /price|paid scope/i.test(item.field))) {
    if (!REQUIRED_PRICE_STRINGS.includes(record.exactValue)) findings.push(`unapproved price: ${record.exactValue}`);
    if (!record.exactValue.endsWith("— Free") && !record.exactValue.includes("Starting at")) findings.push(`missing Starting at: ${record.key}`);
  }
  const timeline = target.filter((record) => record.sourcePacket.endsWith("-034"));
  if (!timeline.length) findings.push("missing packet 034 timelines");
  if (!timeline.some((record) => /estimate|planning|depends|not a guarantee|not guaranteed/i.test(record.exactValue))) findings.push("missing timeline qualification");
  for (const action of target.filter((record) => /primary cta|secondary cta|emergency cta|link label|primary link|secondary link|fallback label/i.test(record.field))) {
    if (/^(?:Send|See|Describe|Use|Return|Email|Try)/.test(action.exactValue) && !action.routeDestination) findings.push(`CTA/route mismatch: ${action.key}`);
  }
  const fragmentRecords = target.filter((record) => record.sourcePacket.endsWith("-045") && record.exactValue.startsWith("#"));
  const fragmentVariants = new Map();
  for (const record of fragmentRecords) {
    const lower = record.exactValue.toLowerCase();
    const values = fragmentVariants.get(lower) ?? new Set();
    values.add(record.exactValue);
    fragmentVariants.set(lower, values);
  }
  const collisions = [...fragmentVariants.entries()].filter(([, values]) => values.size > 1).map(([key]) => key);
  if (collisions.length) findings.push(`fragment collisions: ${collisions.join(", ")}`);
  const evidence = target.filter((record) => record.sourcePacket.endsWith("-038"));
  if (!evidence.some((record) => /source|owned property|sample|synthetic|fictional concept/i.test(record.exactValue))) findings.push("evidence-label failure: missing visible source class");
  if (!evidence.some((record) => /limitation|not client work|does not|cannot|no client/i.test(record.exactValue))) findings.push("evidence-label failure: missing limitation");
  if (target.some((record) => /fictional concept/i.test(record.exactValue)) && !target.some((record) => /not client work/i.test(record.exactValue))) findings.push("fictional concepts missing exact not-client-work label");
  const form = target.filter((record) => record.classification === "form-state");
  for (const state of ["success", "failure", "rate limit", "network"]) if (!form.some((record) => `${record.section} ${record.field}`.toLowerCase().includes(state))) findings.push(`missing form state: ${state}`);
  for (const classification of ["metadata", "schema", "accessible-text", "figure", "form-state", "navigation"]) if (!target.some((record) => record.classification === classification)) findings.push(`missing target classification: ${classification}`);
  for (const surface of REQUIRED_TARGET_SURFACES) if (!target.some((record) => record.surface === surface)) findings.push(`missing target surface: ${surface}`);
  return [...new Set(findings)].sort();
}

function isBlockedAnalyticsClaim(record) {
  return /Boho Analytics Platform/i.test(record.exactValue) && /\b(?:free|without paying)\b/i.test(record.exactValue);
}

function buildBlocked(current, corrections) {
  const currentClaims = current.filter(isBlockedAnalyticsClaim).map((record) => ({
    sourceFile: record.sourceFile,
    sourceField: record.sourceField,
    exactValue: record.exactValue,
    inventoryKey: record.key,
  }));
  return {
    schemaVersion: 1,
    policy: "No placeholder, guessed value, synonym, summary, caption, alt text, metadata, field state, or mobile variant may replace a blocked item.",
    items: [{
      key: corrections.analyticsAvailability.key.value,
      status: corrections.analyticsAvailability.status.value,
      reason: corrections.analyticsAvailability.reason.value,
      targetApproved: false,
      replacementText: null,
      sourcePacket: CORRECTION_PACKET_KEY,
      sourceLocations: [corrections.analyticsAvailability.key.sourceLocation, corrections.analyticsAvailability.status.sourceLocation, corrections.analyticsAvailability.reason.sourceLocation],
      currentClaims,
    }],
  };
}

async function createBundle(snapshotRoot) {
  const packets = [];
  for (const spec of PACKETS) {
    const content = await readFile(resolve(snapshotRoot, spec.file), "utf8");
    const digest = sha256(content);
    if (digest !== EXPECTED_PACKET_HASHES[spec.key]) throw new Error(`Binding packet hash mismatch: ${spec.key}`);
    packets.push({ ...spec, sha256: digest, lineCount: content.split("\n").length, content });
  }
  return {
    schemaVersion: 1, authority: "ChatGPT-authored packets; exact snapshots copied mechanically with no editorial changes.",
    baseCommit: BASE_COMMIT,
    precedenceRule: "Packet 049 has highest precedence for every affected value; otherwise later numbered packets resolve their specific surface more completely, while 021 and 022 govern all surfaces.",
    packets,
  };
}

export async function buildArtifacts(bundle) {
  const target = extractTargetRecords(bundle);
  const current = await buildCurrentInventory();
  const corrections = buildCorrections(bundle);
  for (const record of current.filter(isBlockedAnalyticsClaim)) {
    record.disposition = "blocked-pending-current-product-verification";
    record.blockedCopyKey = ANALYTICS_BLOCK_KEY;
  }
  const reportingProductReferences = target.filter((record) => record.canonicalProductKey === REPORTING_PRODUCT_KEY).map((record) => ({
    recordKey: record.key,
    sourceLocation: record.sourceLocation,
    surface: record.surface,
    productKey: REPORTING_PRODUCT_KEY,
  }));
  const contract = {
    schemaVersion: 1, baseCommit: BASE_COMMIT, editorialOwner: "ChatGPT", workerCopyAuthority: "none",
    packetOrder: bundle.packets.map(({ key, precedence, surface, sha256, lineCount }) => ({ key, precedence, surface, sha256, lineCount })),
    approvedServiceNames: REQUIRED_SERVICE_NAMES,
    approvedPriceStrings: REQUIRED_PRICE_STRINGS,
    approvedEvidenceSourceClasses: corrections.evidence.sourceClasses.map(({ value }) => value),
    products: [{
      key: REPORTING_PRODUCT_KEY,
      price: corrections.reportingProduct.price.value,
      priceFamily: corrections.reportingProduct.priceFamily.value,
      canonicalAnchor: corrections.reportingProduct.canonicalAnchor.value,
      sourceLocations: [corrections.reportingProduct.price.sourceLocation, corrections.reportingProduct.priceFamily.sourceLocation, corrections.reportingProduct.canonicalAnchor.sourceLocation],
    }],
    reportingProductReferences,
    pricingAnchors: {
      canonical: { value: corrections.reportingProduct.canonicalAnchor.value, productKey: REPORTING_PRODUCT_KEY },
      compatibilityAlias: { value: corrections.reportingProduct.compatibilityAlias.value, productKey: REPORTING_PRODUCT_KEY },
    },
    corrections,
    records: target,
  };
  const inventory = {
    schemaVersion: 1, baseCommit: BASE_COMMIT, sourceFamilies: CURRENT_SOURCE_ROOTS,
    current,
    target: target.map((record) => ({ ...record, sourceFile: null, sourceField: record.field, provenance: record.sourceLocation })),
    counts: { current: current.length, target: target.length, currentSourceFiles: new Set(current.map((record) => record.sourceFile)).size, targetPackets: new Set(target.map((record) => record.sourcePacket)).size },
  };
  return { contract, inventory, blocked: buildBlocked(current, corrections) };
}

export function validateArtifacts(bundle, contract, inventory, blocked) {
  return getValidationFindings(bundle, contract, inventory, blocked);
}

async function readCommittedArtifacts() {
  return {
    bundle: JSON.parse(await readFile(BUNDLE_PATH, "utf8")),
    contract: JSON.parse(await readFile(CONTRACT_PATH, "utf8")),
    inventory: JSON.parse(await readFile(INVENTORY_PATH, "utf8")),
    blocked: JSON.parse(await readFile(BLOCKED_PATH, "utf8")),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const snapshotIndex = args.indexOf("--snapshot-root");
  const snapshotRoot = snapshotIndex >= 0 ? resolve(args[snapshotIndex + 1]) : null;
  const check = args.includes("--check");
  const write = args.includes("--write");
  if (check === write) throw new Error("Choose exactly one of --check or --write.");
  const bundle = snapshotRoot ? await createBundle(snapshotRoot) : JSON.parse(await readFile(BUNDLE_PATH, "utf8"));
  const expected = await buildArtifacts(bundle);
  if (write) {
    await writeFile(BUNDLE_PATH, json(bundle));
    await writeFile(CONTRACT_PATH, json(expected.contract));
    await writeFile(INVENTORY_PATH, json(expected.inventory));
    await writeFile(BLOCKED_PATH, json(expected.blocked));
  }
  const actual = check ? await readCommittedArtifacts() : { bundle, ...expected };
  const findings = validateArtifacts(actual.bundle, actual.contract, actual.inventory, actual.blocked);
  if (check) for (const [name, value] of Object.entries(expected)) if (json(value) !== json(actual[name])) findings.push(`stale generated artifact: ${name}`);
  if (findings.length) {
    for (const finding of [...new Set(findings)].sort()) console.error(`commercial-copy: ${finding}`);
    process.exitCode = 1; return;
  }
  console.log(`commercial-copy: ok; packets=${bundle.packets.length}; target=${actual.contract.records.length}; current=${actual.inventory.current.length}; blocked=${actual.blocked.items.length}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
