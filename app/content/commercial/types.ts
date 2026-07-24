export type CommercialCopyClassification =
  | "visible-text" | "action" | "navigation" | "price" | "timeline" | "evidence"
  | "form-state" | "metadata" | "schema" | "figure" | "accessible-text" | "route";

export type CommercialParserFormat =
  | "straight-quoted" | "curly-quoted" | "backtick" | "bullet" | "numbered-list"
  | "markdown-table" | "blockquote" | "multiline-quoted" | "multiline-paragraph" | "structured-field" | "relationship";

export type SourcedCommercialValue = {
  value: string;
  sourcePacket: string;
  sourceLine: number;
  sourceLocation: string;
};

export type CommercialCopyCorrections = {
  sourcePacket: string;
  contact: {
    pathCount: 4;
    pathCountSourceLocation: string;
    heading: SourcedCommercialValue;
    standardInquiry: {
      options: ReadonlyArray<SourcedCommercialValue>;
      removedOption: SourcedCommercialValue;
      automaticEmergencyRedirect: false;
      routingSourceLocation: string;
      emergencyBlock: {
        eyebrow: SourcedCommercialValue;
        heading: SourcedCommercialValue;
        body: SourcedCommercialValue;
        linkLabel: SourcedCommercialValue;
        destination: SourcedCommercialValue;
      };
    };
  };
  evidence: {
    sourceClasses: ReadonlyArray<SourcedCommercialValue>;
    technicalRecordDefinition: { name: SourcedCommercialValue; definition: SourcedCommercialValue; limitation: SourcedCommercialValue };
    workHeroIntroduction: SourcedCommercialValue;
    homepageIntroduction: SourcedCommercialValue;
    artifacts: ReadonlyArray<{ title: SourcedCommercialValue; sourceClass: SourcedCommercialValue }>;
  };
  glossaryEvidence: {
    currentStatus: SourcedCommercialValue;
    acceptedFoundationCommitLabel: SourcedCommercialValue;
    acceptedFoundationCommit: SourcedCommercialValue;
    acceptedRouteCountLabel: SourcedCommercialValue;
    acceptedRouteCount: SourcedCommercialValue;
    statusBoundarySourceLocation: string;
  };
  reportingProduct: {
    key: string;
    price: SourcedCommercialValue;
    priceFamily: SourcedCommercialValue;
    canonicalAnchor: SourcedCommercialValue;
    compatibilityAlias: SourcedCommercialValue;
    crossReference: {
      eyebrow: SourcedCommercialValue; heading: SourcedCommercialValue; body: SourcedCommercialValue;
      price: SourcedCommercialValue; linkLabel: SourcedCommercialValue; destination: SourcedCommercialValue;
    };
  };
  analyticsAvailability: {
    key: SourcedCommercialValue;
    status: SourcedCommercialValue;
    reason: SourcedCommercialValue;
    targetApproved: false;
    replacementText: null;
  };
};

export type CommercialCopyRecord = {
  key: string;
  semanticSlotKey: string;
  exactValue: string;
  sourcePacket: string;
  sourceLocation: string;
  sourceStartLine: number;
  sourceEndLine: number;
  classification: CommercialCopyClassification;
  pageKey: string;
  field: string;
  format: CommercialParserFormat;
  relationship: { id: string; kind: "mapping"; position: number; memberCount: number } | null;
  canonicalProductKey?: string;
};

export type CommercialSemanticSlot = {
  key: string;
  selectionAction: "select" | "replace" | "remove";
  selectedRecord: CommercialCopyRecord;
  displacedRecords: ReadonlyArray<CommercialCopyRecord>;
  supersession: null | {
    key: string;
    action: "replace" | "remove";
    selected: string;
    displaced: ReadonlyArray<string>;
  };
};

export type CommercialCopyContract = {
  schemaVersion: 2;
  publicRenderBase: string;
  contractInputBase: string;
  editorialOwner: "ChatGPT";
  workerCopyAuthority: "none";
  bindingPrecedence: ReadonlyArray<{ packet: string; authority: string; bindingRank: number }>;
  structuralAuthorities: ReadonlyArray<string>;
  parserCapabilities: ReadonlyArray<CommercialParserFormat>;
  packetSnapshots: ReadonlyArray<{ key: string; surface: string; sha256: string; lineCount: number }>;
  approvedServiceNames: ReadonlyArray<string>;
  approvedPriceStrings: ReadonlyArray<string>;
  approvedEvidenceSourceClasses: ReadonlyArray<string>;
  products: ReadonlyArray<{
    key: string; price: string; priceFamily: string; canonicalAnchor: string; sourceLocations: ReadonlyArray<string>;
  }>;
  pricingAnchors: {
    canonical: { value: string; productKey: string };
    compatibilityAlias: { value: string; productKey: string };
  };
  corrections: CommercialCopyCorrections;
  semanticSlots: ReadonlyArray<CommercialSemanticSlot>;
  records: ReadonlyArray<CommercialCopyRecord>;
  adapterManifest: {
    schemaVersion: 1;
    pages: ReadonlyArray<{ key: string; selectedSlotKeys: ReadonlyArray<string> }>;
    blockedSlotKeys: ReadonlyArray<string>;
  };
  collisionReportDigest: string;
  coverageDigest: string;
};
