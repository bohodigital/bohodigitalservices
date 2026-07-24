import rawContract from "../../../content/commercial/commercial-copy-contract.json";
import type { CommercialCopyContract } from "./types";

function assertCommercialCopyContractShape(value: unknown): asserts value is CommercialCopyContract {
  if (!value || typeof value !== "object") throw new Error("Commercial copy contract must be an object.");
  const candidate = value as Partial<CommercialCopyContract>;
  if (candidate.schemaVersion !== 2) throw new Error("Commercial copy contract schemaVersion must be 2.");
  if (candidate.editorialOwner !== "ChatGPT" || candidate.workerCopyAuthority !== "none") {
    throw new Error("Commercial copy contract editorial-authority boundary is invalid.");
  }
  if (!Array.isArray(candidate.bindingPrecedence) || !Array.isArray(candidate.semanticSlots) || !Array.isArray(candidate.records)) {
    throw new Error("Commercial copy contract arrays are missing.");
  }
  if (candidate.semanticSlots.some((slot) => !slot?.key || !slot.selectedRecord?.sourceLocation)) {
    throw new Error("Commercial copy contract contains an unselected semantic slot.");
  }
}

// This module and the generated adapters remain intentionally unimported by renderers.
// Values are mechanically extracted from hash-recorded ChatGPT packet snapshots.
assertCommercialCopyContractShape(rawContract);
export const commercialCopyContract: CommercialCopyContract = rawContract;
