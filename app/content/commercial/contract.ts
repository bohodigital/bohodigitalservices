import rawContract from "../../../content/commercial/commercial-copy-contract.json";
import type { CommercialCopyContract } from "./types";

// This module is intentionally not imported by any renderer in this phase.
// Values are mechanically extracted from hash-recorded ChatGPT packet snapshots.
export const commercialCopyContract = rawContract as CommercialCopyContract;
