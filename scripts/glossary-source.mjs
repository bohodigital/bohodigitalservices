import { readFile } from "node:fs/promises";

export const knowledgeSourceUrl = new URL("../app/content/knowledge.ts", import.meta.url);
export const glossaryEditorialSourceUrl = new URL("../app/content/glossaryEditorial.ts", import.meta.url);

function parseString(objectSource, field) {
  const match = objectSource.match(new RegExp(`^    ${field}: ("(?:[^"\\\\]|\\\\.)*"),$`, "m"));
  return match ? JSON.parse(match[1]) : null;
}

function parseStringArray(objectSource, field) {
  const match = objectSource.match(new RegExp(`^    ${field}: \\[([^\\]]*)\\],$`, "m"));
  if (!match) return [];
  return [...match[1].matchAll(/"(?:[^"\\]|\\.)*"/g)].map((item) => JSON.parse(item[0]));
}

export async function readGlossarySource() {
  const source = await readFile(knowledgeSourceUrl, "utf8");
  const seed = source.slice(
    source.indexOf("const glossaryEntrySeeds"),
    source.indexOf("export const glossaryEntries"),
  );
  const sourceCatalog = source.slice(
    source.indexOf("export const knowledgeSources"),
    source.indexOf("export const sourcesById"),
  );
  const clusterMap = source.slice(
    source.indexOf("const glossaryClusterBySlug"),
    source.indexOf("export const knowledgeSources"),
  );
  const entries = [...seed.matchAll(/^  \{\n([\s\S]*?)^  \},?$/gm)].map((match) => {
    const objectSource = match[1];
    return {
      term: parseString(objectSource, "term"),
      slug: parseString(objectSource, "slug"),
      shortDefinition: parseString(objectSource, "shortDefinition"),
      relatedTermSlugs: parseStringArray(objectSource, "relatedTermSlugs"),
      sourceIds: parseStringArray(objectSource, "sourceIds"),
    };
  });
  const sourceIds = new Set(
    [...sourceCatalog.matchAll(/^    id: "([^"]+)",$/gm)].map((match) => match[1]),
  );
  const clusterSlugs = new Set(
    [...clusterMap.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): "/gm)]
      .map((match) => match[1] ?? match[2]),
  );

  return { clusterSlugs, entries, source, sourceIds };
}

export async function readGlossaryExamples() {
  const source = await readFile(glossaryEditorialSourceUrl, "utf8");
  const examples = new Map(
    [...source.matchAll(/^  (?:"([^"]+)"|([a-z0-9-]+)): ("(?:[^"\\]|\\.)*"),$/gm)]
      .map((match) => [match[1] ?? match[2], JSON.parse(match[3])]),
  );
  return { examples, source };
}
