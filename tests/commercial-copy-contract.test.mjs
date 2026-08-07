import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import {
  BINDING_PRECEDENCE, REQUIRED_COVERAGE_CATEGORIES, REQUIRED_PARSER_FORMATS,
  buildArtifacts, detectAnalyticsClaimContexts, parsePacketContent,
  resolveSemanticSlots, validateAdapterRequest, validateArtifacts, validateParserCoverage,
} from "../scripts/commercial-copy-build.mjs";

const root = resolve(import.meta.dirname, "..");
const bundle = JSON.parse(await readFile(resolve(root, "content/commercial/source-packets.json"), "utf8"));
const built = await buildArtifacts(bundle);
const clone = (value) => structuredClone(value);
const findingsFor = (mutator) => {
  const artifacts = clone(built);
  mutator(artifacts);
  return validateArtifacts(bundle, artifacts).join("\n");
};

test("the hardened contract passes every invariant", () => {
  assert.deepEqual(validateArtifacts(bundle, built), []);
  assert.equal(built.contract.schemaVersion, 2);
  assert.deepEqual(built.contract.bindingPrecedence, BINDING_PRECEDENCE);
  assert.equal(built.contract.editorialOwner, "ChatGPT");
  assert.equal(built.contract.workerCopyAuthority, "none");
  assert.equal(built.contract.approvedServiceNames.length, 5);
  assert.equal(built.contract.approvedPriceStrings.length, 11);
  assert.equal(built.contract.approvedEvidenceSourceClasses.length, 7);
  assert.equal(built.contract.products.length, 1);
  assert.equal(built.blocked.items.length, 0);
  assert.equal(built.blocked.supersededItems.length, 1);
  assert.equal(built.collisionReport.unresolvedCount, 0);
  assert.ok(built.contract.semanticSlots.length > 1_000);
  assert.ok(built.contract.semanticSlots.every((slot) => slot.selectedRecord?.sourceLocation));
  assert.ok(built.contract.semanticSlots.every(({ key }) => /^slot\.[a-z0-9]/.test(key)));
});

test("binding precedence is exact and independent of chronology and packet numbers", async () => {
  assert.deepEqual(BINDING_PRECEDENCE.map(({ packet }) => packet), [
    "050", "049", "045", "040", "039", "038", "037", "036", "035", "034", "041", "047", "043", "prior",
  ]);
  const reordered = clone(bundle);
  reordered.packets.reverse();
  for (const packet of reordered.packets) packet.precedence = 10_000 - packet.precedence;
  const rebuilt = await buildArtifacts(reordered);
  const proof = ({ key, selectedRecord }) => [key, selectedRecord.sourcePacket, selectedRecord.sourceLocation];
  assert.deepEqual(rebuilt.collisionReport.collisions.map(proof), built.collisionReport.collisions.map(proof));
  assert.match(findingsFor(({ contract }) => { contract.bindingPrecedence[0].packet = "045"; }), /binding precedence mismatch/);
});

test("semantic collisions select once and differing values require explicit supersession", () => {
  assert.ok(built.collisionReport.collisions.length > 100);
  assert.ok(built.collisionReport.collisions.every(({ selectedRecord, displacedRecords }) => selectedRecord && displacedRecords.length));
  assert.ok(built.collisionReport.collisions.filter(({ valueKind }) => valueKind === "different").every(({ supersession }) => supersession));
  assert.match(findingsFor(({ collisionReport }) => { collisionReport.collisions[0].selectedRecord = null; }), /collision missing selected record/);
  assert.match(findingsFor(({ collisionReport }) => {
    collisionReport.collisions.find(({ valueKind }) => valueKind === "different").supersession = null;
  }), /differing collision missing explicit supersession/);
});

test("packet hashes and generated artifacts cannot drift", () => {
  const tamperedBundle = clone(bundle);
  tamperedBundle.packets[0].content += "\n";
  assert.match(validateArtifacts(tamperedBundle, built).join("\n"), /packet hash mismatch/);
  assert.match(findingsFor(({ contract }) => { contract.semanticSlots[0].selectedRecord.exactValue += " "; }), /selected record source mismatch|artifact digest mismatch/);
});

test("parser covers structured, inline, multiline, relational, route, metadata, and accessibility formats", () => {
  const fixture = [
    "# Fixture", "Straight: \"Straight quoted value\"", "Curly: “Curly quoted value”", "Backtick: `Backtick value`",
    "- `Bullet value`", "1. `Numbered value`", "| Field | Value |", "| --- | --- |", "| Caption | `Table value` |",
    "> `Blockquote value`", "Multiline:", "\"First line", "second line\"", "Metadata title: `Metadata value`",
    "Schema name: `Schema value`", "Form error: `Form error value`", "Caption: `Caption value`",
    "Accessible description: `Accessible value`", "Destination: `/start/`", "Fragment: `#pricing`",
    "Pair: `Label value` → `/paired/`", "Paragraph:", "First paragraph line", "second paragraph line", "",
  ].join("\n");
  const records = parsePacketContent(fixture, { key: "WO-TEST-049", surface: "metadata-schema", editorialAuthority: "chatgpt" });
  assert.deepEqual(validateParserCoverage(records), []);
  assert.deepEqual(new Set(records.map(({ format }) => format)), new Set(REQUIRED_PARSER_FORMATS));
  assert.ok(records.some(({ relationship }) => relationship?.kind === "mapping"));
  assert.ok(records.some(({ sourceStartLine, sourceEndLine }) => sourceEndLine > sourceStartLine));
  assert.throws(() => resolveSemanticSlots([
    { ...records[0], semanticSlotKey: "slot.fixture.conflict", exactValue: "First" },
    { ...records[1], semanticSlotKey: "slot.fixture.conflict", exactValue: "Second" },
  ], []), /Unresolved semantic collision/);
  for (const format of REQUIRED_PARSER_FORMATS) {
    assert.match(validateParserCoverage(records.filter((record) => record.format !== format)).join("\n"), new RegExp(`parser format missing: ${format}`));
  }
});

test("expected-slot coverage is exhaustive and fails on omission", () => {
  assert.deepEqual(built.coverage.categories.map(({ key }) => key), REQUIRED_COVERAGE_CATEGORIES);
  assert.ok(built.coverage.categories.every(({ selectedSlotKeys }) => selectedSlotKeys.length));
  assert.equal(built.coverage.missingSlotCount, 0);
  assert.match(findingsFor(({ coverage }) => { coverage.categories.find(({ key }) => key === "forms-states").selectedSlotKeys = []; }), /coverage category empty: forms-states/);
  assert.match(findingsFor(({ coverage }) => { coverage.categories = coverage.categories.filter(({ key }) => key !== "packet-049-corrections"); }), /coverage category missing: packet-049-corrections/);
  assert.match(findingsFor(({ coverage }) => { coverage.categories = coverage.categories.filter(({ key }) => key !== "packet-050-analytics-availability"); }), /coverage category missing: packet-050-analytics-availability/);
});

test("compact inventory models governed inputs, provenance, generation, and reachability", () => {
  const byPath = new Map(built.inventory.sources.map((source) => [source.path, source]));
  for (const path of [
    "app/page.tsx", "app/not-found.tsx", "app/[...slug]/page.tsx", "app/learn/glossary/[term]/page.tsx", "app/robots.ts",
    "scripts/generate-service-page-data.mjs", "app/content/servicePages.generated.ts", "content/service-pages/04-digital-research-seo-audits-strategy.md",
  ]) assert.ok(byPath.has(path), `missing inventory source: ${path}`);
  assert.deepEqual(
    [byPath.get("app/content/servicePages.generated.ts").classification, byPath.get("app/content/servicePages.generated.ts").reachable, byPath.get("app/content/servicePages.generated.ts").editorialAuthority],
    ["generated-mirror", true, false],
  );
  assert.deepEqual(
    [byPath.get("content/service-pages/04-digital-research-seo-audits-strategy.md").classification, byPath.get("content/service-pages/04-digital-research-seo-audits-strategy.md").reachable, byPath.get("content/service-pages/04-digital-research-seo-audits-strategy.md").editorialAuthority],
    ["authored-source", true, true],
  );
  assert.ok(Buffer.byteLength(JSON.stringify(built.inventory)) < 1_000_000);
  assert.equal("records" in built.inventory, false);
});

test("contextual Analytics availability is approved only with the verified software and service boundaries", () => {
  const claims = detectAnalyticsClaimContexts("# Boho Analytics Platform\nUse the dashboard publicly without paying.\nSelf-hosted and open-source access is free.", "fixture.md");
  assert.ok(claims.some(({ signals }) => signals.includes("public-access")));
  assert.ok(claims.some(({ signals }) => signals.includes("free-or-unpaid")));
  assert.ok(claims.some(({ signals }) => signals.includes("self-hosted-or-open-source")));
  assert.ok(claims.every(({ disposition }) => disposition === "approved-with-verified-software-and-service-boundaries"));
  assert.ok(claims.every(({ commercialCopyKey }) => commercialCopyKey === "product.bohoAnalytics.publicFreeAvailability"));
  assert.deepEqual(built.blocked.items, []);
  const superseded = built.blocked.supersededItems[0];
  assert.deepEqual(
    [superseded.key, superseded.targetApproved, superseded.supersededBy, superseded.currentStatus],
    [
      "product.bohoAnalytics.publicFreeAvailability",
      true,
      "WO-2026-08-06-BOHO-CHATGPT-ANALYTICS-AVAILABILITY-050",
      "Approved with verified software and service boundaries",
    ],
  );
  assert.ok(superseded.currentClaims.some(({ sourceFile }) => sourceFile === "content/service-pages/04-digital-research-seo-audits-strategy.md"));
  assert.ok(superseded.currentClaims.some(({ sourceFile }) => sourceFile === "app/content/servicePages.generated.ts"));
  const availability = built.contract.corrections.analyticsAvailability;
  assert.equal(availability.softwareLicensePrice.value, "$0 MIT software license");
  assert.match(availability.independentUse.value, /independently whether or not the business has an active Boho SEO engagement/);
  assert.match(availability.publicAccessBoundary.value, /not a Boho-hosted customer dashboard, hosted SaaS account/);
  assert.match(availability.installationBoundary.value, /PyPI package availability is not promised/);
  assert.match(availability.costBoundary.value, /hosting, infrastructure, provider accounts, third-party charges/);
  assert.match(availability.includedConfiguration.value, /first month of an active ongoing SEO engagement/);
  assert.match(availability.afterFirstMonthBoundary.value, /software remains available under the MIT License/);
  assert.match(findingsFor(({ blocked: mutated }) => { mutated.supersededItems[0].currentClaims.pop(); }), /analytics availability current-claim registry mismatch/);
  assert.equal(validateAdapterRequest("product.bohoAnalytics.publicFreeAvailability", built.blocked), "product.bohoAnalytics.publicFreeAvailability");
});

test("page-specific adapters are schema-valid and retain no superseded blocked slots", () => {
  const required = [
    "homepage", "services-overview", "pricing", "work-evidence", "contact", "start", "emergency",
    "service-local-visibility", "service-websites-hosting", "service-provider-rescue", "service-custom-tools", "service-research-analytics",
  ];
  assert.deepEqual(built.adapters.pages.map(({ key }) => key), required);
  assert.ok(built.adapters.pages.every(({ selectedSlotKeys }) => selectedSlotKeys.length));
  assert.deepEqual(built.adapters.blockedSlotKeys, []);
  assert.ok(built.contract.records.some(({ sourcePacket }) => sourcePacket === "WO-2026-08-06-BOHO-CHATGPT-ANALYTICS-AVAILABILITY-050"));
});

test("mutation gates cover authority, source omission, blocking, and stale artifacts", () => {
  assert.match(findingsFor(({ inventory }) => { inventory.sources.find(({ classification }) => classification === "generated-mirror").editorialAuthority = true; }), /generated source has editorial authority/);
  assert.match(findingsFor(({ inventory }) => { inventory.sources = inventory.sources.filter(({ path }) => path !== "app/page.tsx"); }), /required current source missing: app\/page.tsx/);
  assert.match(findingsFor(({ blocked }) => { blocked.supersededItems[0].targetApproved = false; }), /analytics availability supersession mismatch/);
  assert.match(findingsFor(({ artifactDigests }) => { artifactDigests.inventory = "0".repeat(64); }), /artifact digest mismatch: inventory/);
});

test("standard test and Cloudflare validation both enforce the commercial gate", async () => {
  const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
  const workflow = await readFile(resolve(root, ".github/workflows/validate-cloudflare-pages.yml"), "utf8");
  assert.match(pkg.scripts.test, /commercial-copy:check/);
  assert.match(workflow, /pnpm run commercial-copy:check/);
});

test("security reporting contains counts without matched values", () => {
  assert.equal(typeof built.inventory.securityScan.privateKeyMarkers, "number");
  assert.equal(typeof built.inventory.securityScan.commonTokenPrefixes, "number");
  assert.ok(built.inventory.securityScan.indicators.every(({ count }) => Number.isInteger(count)));
  assert.ok(built.inventory.securityScan.indicators.every((indicator) => !("matches" in indicator) && !("values" in indicator)));
});
