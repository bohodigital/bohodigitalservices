import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { buildArtifacts, validateArtifacts } from "../scripts/commercial-copy-build.mjs";

const root = resolve(import.meta.dirname, "..");
const bundle = JSON.parse(await readFile(resolve(root, "content/commercial/source-packets.json"), "utf8"));
const built = await buildArtifacts(bundle);
const clone = (value) => structuredClone(value);

function findingsFor(mutator) {
  const contract = clone(built.contract);
  const inventory = clone(built.inventory);
  const blocked = clone(built.blocked);
  mutator({ contract, inventory, blocked });
  return validateArtifacts(bundle, contract, inventory, blocked).join("\n");
}

test("the packet-derived contract passes every invariant", () => {
  assert.deepEqual(validateArtifacts(bundle, built.contract, built.inventory, built.blocked), []);
  assert.equal(built.contract.editorialOwner, "ChatGPT");
  assert.equal(built.contract.workerCopyAuthority, "none");
  assert.equal(built.contract.approvedServiceNames.length, 5);
  assert.equal(built.contract.approvedPriceStrings.length, 11);
  assert.equal(built.contract.packetOrder.at(-1).key, "WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049");
  assert.equal(built.contract.packetOrder.at(-1).precedence, 15);
  assert.equal(built.contract.approvedEvidenceSourceClasses.length, 7);
  assert.equal(built.contract.products.length, 1);
  assert.equal(built.blocked.items.length, 1);
});

test("packet content and stored hashes cannot drift", () => {
  const tampered = clone(bundle);
  tampered.packets[0].content += "\n";
  assert.match(validateArtifacts(tampered, built.contract, built.inventory, built.blocked).join("\n"), /packet hash mismatch/);

  const correctionTampered = clone(bundle);
  correctionTampered.packets.at(-1).content += "\n";
  assert.match(validateArtifacts(correctionTampered, built.contract, built.inventory, built.blocked).join("\n"), /packet hash mismatch: WO-2026-07-24-BOHO-CHATGPT-CROSS-PACKET-CORRECTIONS-049/);
});

test("duplicate and missing keys fail", () => {
  assert.match(findingsFor(({ contract }) => { contract.records[1].key = contract.records[0].key; }), /duplicate keys/);
  assert.match(findingsFor(({ contract }) => { contract.records[0].key = ""; }), /missing stable key/);
});

test("case variants, unsourced values, placeholders, and worker claims fail", () => {
  const result = findingsFor(({ contract }) => {
    const source = contract.records.find((record) => /label|heading|title/i.test(record.field));
    contract.records.push({ ...source, key: "target.test.case", exactValue: source.exactValue.toUpperCase(), sourceLine: 1, sourceKind: "generated", editorialAuthority: false });
    contract.records.push({ ...source, key: "target.test.placeholder", exactValue: "TODO placeholder copy", sourceLine: 1 });
    contract.records.push({ ...source, key: "target.test.claim", exactValue: "Guaranteed #1 rankings", sourceLine: 1 });
  });
  assert.match(result, /case-only label variants/);
  assert.match(result, /unsourced target value/);
  assert.match(result, /generated editorial authority/);
  assert.match(result, /placeholder copy/);
  assert.match(result, /prohibited or unsupported claim/);
});

test("unapproved names and prices fail", () => {
  const result = findingsFor(({ contract }) => {
    const serviceSource = contract.records.find((record) => record.exactValue === contract.approvedServiceNames[0]);
    const priceSource = contract.records.find((record) => record.exactValue === contract.approvedPriceStrings[1]);
    contract.records = contract.records.filter((record) => record.exactValue !== contract.approvedServiceNames[0] && record.exactValue !== contract.approvedPriceStrings[1]);
    contract.records.push({ ...serviceSource, key: "target.test.service-name", exactValue: "Local SEO" });
    contract.records.push({ ...priceSource, key: "target.test.price", exactValue: "SEO reporting — $95" });
  });
  assert.match(result, /missing approved service name/);
  assert.match(result, /missing approved price/);
  assert.match(result, /unapproved service name/);
  assert.match(result, /unapproved price/);
});

test("timeline, CTA, evidence, forms, metadata, schema, and accessibility fail closed", () => {
  const result = findingsFor(({ contract }) => {
    contract.records = contract.records.filter((record) => !record.sourcePacket.endsWith("-034") && record.classification !== "form-state" && record.classification !== "metadata" && record.classification !== "schema" && record.classification !== "accessible-text" && record.classification !== "figure" && !record.sourcePacket.endsWith("-038"));
    const action = contract.records.find((record) => record.classification === "action");
    if (action) action.routeDestination = null;
  });
  assert.match(result, /missing packet 034 timelines/);
  assert.match(result, /CTA\/route mismatch/);
  assert.match(result, /evidence-label failure/);
  assert.match(result, /missing form state/);
  assert.match(result, /missing target classification: metadata/);
  assert.match(result, /missing target classification: schema/);
  assert.match(result, /missing target classification: accessible-text/);
});

test("contact count and ordinary versus emergency routing fail closed", () => {
  const countResult = findingsFor(({ contract }) => { contract.corrections.contact.pathCount = 3; });
  assert.match(countResult, /contact path count mismatch/);

  const optionResult = findingsFor(({ contract }) => {
    contract.corrections.contact.standardInquiry.options.push(contract.corrections.contact.standardInquiry.removedOption);
  });
  assert.match(optionResult, /standard inquiry includes Emergency Website Help/);

  const routingResult = findingsFor(({ contract }) => { contract.corrections.contact.standardInquiry.automaticEmergencyRedirect = true; });
  assert.match(routingResult, /ordinary and emergency routing mismatch/);
});

test("evidence artifacts accept only the exact packet-049 source taxonomy", () => {
  const compoundResult = findingsFor(({ contract }) => {
    contract.corrections.evidence.artifacts[0].sourceClass.value = "Boho-owned property and public system";
  });
  assert.match(compoundResult, /undefined or compound evidence source class/);

  const undefinedResult = findingsFor(({ contract }) => {
    contract.corrections.evidence.artifacts[0].sourceClass.value = "Boho-owned tool";
  });
  assert.match(undefinedResult, /undefined or compound evidence source class/);
});

test("glossary evidence cannot freeze the accepted base as permanently current", () => {
  const result = findingsFor(({ contract }) => {
    contract.corrections.glossaryEvidence.currentStatus.value = "Repository foundation accepted at commit 89cb0982b8f2274a289e8126c9472640a5305011; not deployed by the glossary correction work order";
  });
  assert.match(result, /glossary evidence status is not future-safe/);
});

test("the $95 product and compatibility alias remain canonical and singular", () => {
  const duplicateResult = findingsFor(({ contract }) => { contract.products.push(clone(contract.products[0])); });
  assert.match(duplicateResult, /public \$95 monthly reporting product count mismatch/);

  const aliasResult = findingsFor(({ contract }) => { contract.pricingAnchors.compatibilityAlias.productKey = "product.analyticsReporting.monthly"; });
  assert.match(aliasResult, /analytics-reporting alias diverges from ongoing-seo product/);
});

test("Boho Analytics public-free claims stay blocked without invented substitutes", () => {
  const missingResult = findingsFor(({ blocked }) => { blocked.items = []; });
  assert.match(missingResult, /required Boho Analytics blocked-copy record missing/);

  const approvedResult = findingsFor(({ blocked }) => { blocked.items[0].targetApproved = true; });
  assert.match(approvedResult, /Boho Analytics blocked-copy record mismatch/);

  const inventedResult = findingsFor(({ contract }) => {
    contract.records.push({
      ...contract.records[0],
      key: "target.test.invented-analytics-availability",
      exactValue: "Boho Analytics Platform — coming soon",
    });
  });
  assert.match(inventedResult, /invented Boho Analytics availability language/);

  const publicFreeResult = findingsFor(({ contract }) => {
    contract.records.push({
      ...contract.records[0],
      key: "target.test.public-free-analytics",
      exactValue: "Use the Boho Analytics Platform free.",
    });
  });
  assert.match(publicFreeResult, /Boho Analytics public-free claim is target-approved/);
});
