import { commercialCopyContract } from "./contract";
import type {
  CommercialAdapterPageKey,
} from "./adapters.generated";
import type { CommercialCopyRecord } from "./types";

const semanticSlotsByKey = new Map(
  commercialCopyContract.semanticSlots.map((slot) => [slot.key, slot]),
);
const blockedSlotKeys = new Set(
  commercialCopyContract.adapterManifest.blockedSlotKeys,
);

function selectedRecords(pageKey: CommercialAdapterPageKey) {
  const page = commercialCopyContract.adapterManifest.pages.find(
    ({ key }) => key === pageKey,
  );
  if (!page) throw new Error(`Commercial adapter page is missing: ${pageKey}`);
  return page.selectedSlotKeys.flatMap((slotKey) => {
    if (blockedSlotKeys.has(slotKey)) throw new Error(`Blocked commercial slot requested: ${slotKey}`);
    const slot = semanticSlotsByKey.get(slotKey);
    if (!slot) throw new Error(`Commercial slot is missing: ${slotKey}`);
    if (slot.selectionAction === "remove") return [];
    return [{ slotKey, record: slot.selectedRecord }];
  });
}

export type CommercialSection = {
  records: ReadonlyArray<CommercialCopyRecord>;
  one(field: string): string;
  optional(field: string): string | undefined;
  many(field: string): ReadonlyArray<string>;
};

function sectionFromRecords(
  records: ReadonlyArray<CommercialCopyRecord>,
  label: string,
): CommercialSection {
  if (!records.length) throw new Error(`Commercial section is missing: ${label}`);
  const matches = (field: string) => records.filter((record) => record.field === field);
  return {
    records,
    one(field) {
      const found = matches(field);
      if (found.length !== 1) throw new Error(`Expected one commercial field: ${label}/${field}; found ${found.length}`);
      return found[0].exactValue;
    },
    optional(field) {
      const found = matches(field);
      if (found.length > 1) throw new Error(`Expected at most one commercial field: ${label}/${field}; found ${found.length}`);
      return found[0]?.exactValue;
    },
    many(field) {
      return matches(field).map(({ exactValue }) => exactValue);
    },
  };
}

export function commercialSection(
  pageKey: CommercialAdapterPageKey,
  sectionKey: string,
  sourcePacket?: string,
): CommercialSection {
  const prefix = `slot.${pageKey}.${sectionKey}.`;
  const records = selectedRecords(pageKey)
    .filter(({ slotKey, record }) => (
      slotKey.startsWith(prefix)
      && (!sourcePacket || record.sourcePacket.includes(sourcePacket))
    ))
    .map(({ record }) => record);
  return sectionFromRecords(records, `${pageKey}/${sectionKey}`);
}

export function commercialContractSection(
  pageKey: "navigation-footer" | "service-commercial-shared",
  sectionKey: string,
): CommercialSection {
  const prefix = `slot.${pageKey}.${sectionKey}.`;
  const records = commercialCopyContract.semanticSlots
    .filter((slot) => (
      slot.key.startsWith(prefix)
      && slot.selectionAction !== "remove"
      && !blockedSlotKeys.has(slot.key)
    ))
    .map(({ selectedRecord }) => selectedRecord);
  return sectionFromRecords(records, `${pageKey}/${sectionKey}`);
}

export function commercialSharedSection(
  sectionKey: string,
): CommercialSection {
  return commercialContractSection("service-commercial-shared", sectionKey);
}

export function correctionValue(
  value: { value: string },
): string {
  return value.value;
}

export const commercialCorrections = commercialCopyContract.corrections;
export const approvedServiceNames = commercialCopyContract.approvedServiceNames;
export const approvedPriceStrings = commercialCopyContract.approvedPriceStrings;
