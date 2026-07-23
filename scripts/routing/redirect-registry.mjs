import { readFile } from "node:fs/promises";

export const legacyUrlMapUrl = new URL(
  "../../content/routing/legacy-url-map.json",
  import.meta.url,
);

function withoutFragment(value) {
  return value.split("#", 1)[0];
}

export function normalizedPath(value) {
  const path = withoutFragment(value);
  if (path === "/") return "/";
  return `${path.replace(/^\/+|\/+$/g, "") ? "/" : ""}${path.replace(/^\/+|\/+$/g, "")}/`;
}

export async function loadLegacyUrlMap() {
  return JSON.parse(await readFile(legacyUrlMapUrl, "utf8"));
}

export function verifiedRedirectRecords(registry) {
  return registry.records.filter(
    (record) => record.disposition === "REDIRECT" && record.verified === true,
  );
}

export function validateRedirectRegistry(registry) {
  if (registry.version !== 1 || !Array.isArray(registry.records)) {
    throw new Error("Legacy URL registry must use version 1 and contain records.");
  }

  const errors = [];
  const allSources = new Map();
  const verifiedSources = new Map();

  for (const [index, record] of registry.records.entries()) {
    const label = `record ${index + 1} (${record.source ?? "missing source"})`;
    if (typeof record.source !== "string" || !record.source.startsWith("/")) {
      errors.push(`${label}: source must be root-relative`);
      continue;
    }
    if (record.source.includes("?") || record.source.includes("#")) {
      errors.push(`${label}: source must not contain a query string or fragment`);
    }

    const source = normalizedPath(record.source);
    if (allSources.has(source)) {
      errors.push(`${label}: duplicate source also used by ${allSources.get(source)}`);
    } else {
      allSources.set(source, label);
    }

    if (typeof record.reason !== "string" || !record.reason.trim()) {
      errors.push(`${label}: reason is required`);
    }
    if (typeof record.evidence !== "string" || !record.evidence.trim()) {
      errors.push(`${label}: evidence is required`);
    }

    if (!record.verified) continue;
    if (record.disposition !== "REDIRECT") {
      errors.push(`${label}: only REDIRECT records may be verified`);
      continue;
    }
    if (record.status !== 301) {
      errors.push(`${label}: verified redirects must use 301`);
    }
    if (typeof record.destination !== "string" || !record.destination.startsWith("/")) {
      errors.push(`${label}: verified destination must be root-relative`);
      continue;
    }
    if (record.destination.startsWith("//") || record.destination.includes("?")) {
      errors.push(`${label}: destination must be an internal path without a query string`);
    }

    const destination = normalizedPath(record.destination);
    if (source === destination) {
      errors.push(`${label}: source equals destination`);
    }
    verifiedSources.set(source, destination);
  }

  for (const [source, destination] of verifiedSources) {
    if (verifiedSources.has(destination)) {
      errors.push(`redirect chain: ${source} -> ${destination}`);
    }
  }

  for (const source of verifiedSources.keys()) {
    const seen = new Set([source]);
    let current = verifiedSources.get(source);
    while (current && verifiedSources.has(current)) {
      if (seen.has(current)) {
        errors.push(`redirect loop involving ${source}`);
        break;
      }
      seen.add(current);
      current = verifiedSources.get(current);
    }
  }

  if (errors.length) {
    throw new Error(`Invalid legacy URL registry:\n- ${errors.join("\n- ")}`);
  }

  return {
    allSourceCount: allSources.size,
    verifiedSourceCount: verifiedSources.size,
  };
}

export function pagesRedirectRules(records) {
  const rules = new Map();

  for (const record of records) {
    const slashSource = normalizedPath(record.source);
    const noSlashSource = slashSource === "/" ? "/" : slashSource.slice(0, -1);
    for (const source of [noSlashSource, slashSource]) {
      const existing = rules.get(source);
      if (existing && existing !== record.destination) {
        throw new Error(`Conflicting redirect for ${source}: ${existing} vs ${record.destination}`);
      }
      rules.set(source, record.destination);
    }
  }

  return [...rules.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([source, destination]) => `${source} ${destination} 301`);
}
