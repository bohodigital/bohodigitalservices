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
});

test("packet content and stored hashes cannot drift", () => {
  const tampered = clone(bundle);
  tampered.packets[0].content += "\n";
  assert.match(validateArtifacts(tampered, built.contract, built.inventory, built.blocked).join("\n"), /packet hash mismatch/);
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
