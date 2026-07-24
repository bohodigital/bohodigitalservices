export type CommercialCopyClassification =
  | "visible-text"
  | "action"
  | "navigation"
  | "price"
  | "timeline"
  | "evidence"
  | "form-state"
  | "metadata"
  | "schema"
  | "figure"
  | "accessible-text"
  | "route";

export type CommercialCopyRecord = {
  key: string;
  exactValue: string;
  route: string;
  surface: string;
  section: string;
  field: string;
  status: "target";
  currentlyRendered: false;
  disposition: "replace-later-with-exact-approved-text";
  classification: CommercialCopyClassification;
  routeDestination: string | null;
  sourcePacket: string;
  sourceLine: number;
  sourceLocation: string;
  sourceKind: "chatgpt-packet";
  editorialAuthority: "ChatGPT";
};

export type CommercialCopyContract = {
  schemaVersion: 1;
  baseCommit: string;
  editorialOwner: "ChatGPT";
  workerCopyAuthority: "none";
  packetOrder: ReadonlyArray<{
    key: string;
    precedence: number;
    surface: string;
    sha256: string;
    lineCount: number;
  }>;
  approvedServiceNames: ReadonlyArray<string>;
  approvedPriceStrings: ReadonlyArray<string>;
  records: ReadonlyArray<CommercialCopyRecord>;
};
