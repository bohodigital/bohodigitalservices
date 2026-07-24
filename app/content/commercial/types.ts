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
    technicalRecordDefinition: {
      name: SourcedCommercialValue;
      definition: SourcedCommercialValue;
      limitation: SourcedCommercialValue;
    };
    workHeroIntroduction: SourcedCommercialValue;
    homepageIntroduction: SourcedCommercialValue;
    artifacts: ReadonlyArray<{
      title: SourcedCommercialValue;
      sourceClass: SourcedCommercialValue;
    }>;
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
      eyebrow: SourcedCommercialValue;
      heading: SourcedCommercialValue;
      body: SourcedCommercialValue;
      price: SourcedCommercialValue;
      linkLabel: SourcedCommercialValue;
      destination: SourcedCommercialValue;
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
  canonicalProductKey?: string;
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
  approvedEvidenceSourceClasses: ReadonlyArray<string>;
  products: ReadonlyArray<{
    key: string;
    price: string;
    priceFamily: string;
    canonicalAnchor: string;
    sourceLocations: ReadonlyArray<string>;
  }>;
  reportingProductReferences: ReadonlyArray<{
    recordKey: string;
    sourceLocation: string;
    surface: string;
    productKey: string;
  }>;
  pricingAnchors: {
    canonical: {
      value: string;
      productKey: string;
    };
    compatibilityAlias: {
      value: string;
      productKey: string;
    };
  };
  corrections: CommercialCopyCorrections;
  records: ReadonlyArray<CommercialCopyRecord>;
};
