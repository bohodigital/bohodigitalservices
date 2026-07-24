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

type CommercialNavigationLink = {
  label: string;
  href: "/" | `/${string}`;
};

function pairedNavigationLinks(
  records: ReadonlyArray<CommercialCopyRecord>,
): ReadonlyArray<CommercialNavigationLink> {
  const relationships = new Map<string, CommercialCopyRecord[]>();
  for (const record of records) {
    const relationshipId = record.relationship?.id;
    if (!relationshipId) continue;
    const group = relationships.get(relationshipId) ?? [];
    group.push(record);
    relationships.set(relationshipId, group);
  }
  return [...relationships.values()]
    .sort((left, right) => left[0].sourceStartLine - right[0].sourceStartLine)
    .map((recordsForLink) => {
      const label = recordsForLink.find(({ classification }) => classification === "navigation")?.exactValue;
      const href = recordsForLink.find(({ classification }) => classification === "route")?.exactValue;
      if (!label || !href?.startsWith("/")) throw new Error("Commercial navigation mapping is incomplete.");
      return { label, href: href as CommercialNavigationLink["href"] };
    });
}

export function commercialNavigationLinks() {
  const primary = pairedNavigationLinks(
    commercialContractSection("navigation-footer", "part-a-primary-navigation").records,
  ).filter(({ href }) => href !== "/start/");
  const serviceRecords = [
    ...commercialContractSection("navigation-footer", "services-navigation").records,
    ...([
      ["service-local-visibility", "services-navigation"],
      ["service-websites-hosting", "services-navigation"],
      ["service-provider-rescue", "services-navigation"],
      ["service-custom-tools", "services-navigation"],
      ["service-research-analytics", "services-navigation"],
    ] as const).flatMap(([pageKey, sectionKey]) => (
      commercialSection(pageKey, sectionKey).records
    )),
  ];
  const services = pairedNavigationLinks(serviceRecords);
  const resourceSections = [
    commercialContractSection("navigation-footer", "resources-navigation"),
    commercialSection("service-provider-rescue", "resources-navigation"),
  ];
  const resourcesByHref = new Map(
    pairedNavigationLinks(resourceSections.flatMap(({ records }) => records))
      .map((link) => [link.href, link]),
  );
  const resources = [
    "/resources/",
    "/learn/website-buying/",
    "/learn/provider-rescue/",
    "/learn/glossary/",
  ].map((href) => {
    const link = resourcesByHref.get(href as CommercialNavigationLink["href"]);
    if (!link) throw new Error(`Commercial resource navigation is missing: ${href}`);
    return link;
  });
  return { primary, services, resources };
}

export const commercialCorrections068 = {
  start: {
    incident: {
      eyebrow: "Active incident?",
      heading: "Use Emergency Help for an active website or provider incident.",
      body: "The ordinary project form is not monitored as an emergency channel. Use Emergency Help when a website is down, a launch is failing, access has been lost, or a provider action is actively threatening a working system. Emergency review depends on authority, access, capacity, and risk.",
      linkLabel: "Open Emergency Help",
      destination: "/emergency/",
    },
  },
  work: {
    eyebrow: "Evidence, labeled honestly",
    heading: "Inspect the work by source and status.",
    body: "Every item states where it came from, what it demonstrates, what it does not demonstrate, and whether it is current, historical, sample, synthetic, or conceptual.",
    groupHeadings: {
      current: "Current owned-property work",
      technical: "Public technical records",
      samples: "Samples and concept work",
    },
    statuses: {
      current: "Current",
      historical: "Historical",
      sample: "Sample",
      synthetic: "Synthetic demonstration",
      concept: "Fictional concept interface",
    },
    openLabel: "Open the evidence",
    destinations: {
      "artifact-1-website-ownership-map": "/work/#evidence-website-ownership-map",
      "artifact-2-vanity-metrics-migration-record": "/work/#evidence-vanity-metrics-redirect-plan",
      "artifact-3-glossary-and-route-validation": "/work/#evidence-route-validation-report",
      "artifact-4-boho-analytics-site-graph": "/work/#evidence-boho-analytics-site-graph",
      "artifact-5-rank-builder-publishing-system": "/work/#evidence-rank-builder-publishing-system",
      "artifact-6-better-grades-learning-interfaces": "/work/#evidence-better-grades-interface",
      "artifact-7-fictional-business-interfaces": "/work/#evidence-fictional-business-interfaces",
    },
  },
  emergency: {
    problemMaximum: 8_000,
    descriptionMaximum: 7_500,
    descriptionError: "Keep the incident description under 7,500 characters so the complete emergency message can be delivered.",
  },
  serviceDecisionLabels: {
    clientInputs: "What Boho needs from you",
    priceDrivers: "What changes the price",
    exampleDeliverable: "Example deliverable",
  },
  navigation: {
    servicesOverview: {
      label: "Services overview",
      href: "/services/",
    },
  },
} as const;

export const serviceDecisionValues = {
  "service-local-visibility": {
    clientInputs: "Authorized account access through the relevant provider",
    priceDrivers: "Pricing increases with the number of websites, pages, templates, services, products, locations, markets, data sources, conversion paths, content requirements, integrations, meetings, technical conditions, and amount of implementation included.",
    exampleDeliverable: "A current priority and work plan",
  },
  "service-websites-hosting": {
    clientInputs: "Accurate business, service, product, location, and pricing information",
    priceDrivers: "Not every website qualifies for the starting price. Pricing increases with page count, unique templates, content work, service or location complexity, forms, integrations, ecommerce, customer accounts, migration, redirects, technical damage, accessibility requirements, approvals, and accelerated delivery.",
    exampleDeliverable: "Approved sitemap and page plan",
  },
  "service-provider-rescue": {
    clientInputs: "Proof of authority to act for the business or affected accounts",
    priceDrivers: "Pricing increases with the number of domains, providers, accounts, pages, URLs, forms, data sources, integrations, email dependencies, locations, brands, ecommerce functions, access problems, provider obstruction, technical damage, and verification requirements.",
    exampleDeliverable: "Ownership and access inventory",
  },
  "service-custom-tools": {
    clientInputs: "A responsible process owner",
    priceDrivers: "Pricing increases with users, workflows, interfaces, systems, APIs, data volume, authentication, permissions, sensitive information, infrastructure, monitoring, failure handling, support, documentation, migration, testing, and maintenance requirements.",
    exampleDeliverable: "Discovery and feasibility record",
  },
  "service-research-analytics": {
    clientInputs: "The business question or decision the work should support",
    priceDrivers: "Pricing increases with page and template volume, websites, properties, brands, locations, markets, data sources, customer actions, ecommerce or revenue events, custom grouping, attribution complexity, data damage, provider complexity, research depth, meetings, and manual analyst time.",
    exampleDeliverable: "Executive summary",
  },
} as const;

export const commercialCorrections = commercialCopyContract.corrections;
export const approvedServiceNames = commercialCopyContract.approvedServiceNames;
export const approvedPriceStrings = commercialCopyContract.approvedPriceStrings;
