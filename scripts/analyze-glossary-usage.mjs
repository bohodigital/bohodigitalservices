import { readFile } from "node:fs/promises";

const sourceFiles = [
  new URL("../app/Homepage.tsx", import.meta.url),
  new URL("../app/not-found.tsx", import.meta.url),
  new URL("../app/content/corePages.ts", import.meta.url),
  new URL("../app/content/audiencePages.ts", import.meta.url),
  new URL("../app/content/publicPages.ts", import.meta.url),
  new URL("../app/content/inHouseBrands.ts", import.meta.url),
  new URL("../app/content/systems.ts", import.meta.url),
  new URL("../app/content/operatingCycle.ts", import.meta.url),
  new URL("../app/components/InHouseBrandPage.tsx", import.meta.url),
  new URL("../app/components/InHouseBrandsPage.tsx", import.meta.url),
  new URL("../app/components/KnowledgePages.tsx", import.meta.url),
  new URL("../app/components/ResourcesPage.tsx", import.meta.url),
  new URL("../app/components/SiteChrome.tsx", import.meta.url),
  new URL("../app/components/SystemsVisuals.tsx", import.meta.url),
];
const knowledgeFile = new URL("../app/content/knowledge.ts", import.meta.url);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const [knowledgeSource, ...contentSources] = await Promise.all([
  readFile(knowledgeFile, "utf8"),
  ...sourceFiles.map((file) => readFile(file, "utf8")),
]);

const glossarySource = knowledgeSource.slice(
  knowledgeSource.indexOf("const glossaryEntrySeeds"),
  knowledgeSource.indexOf("export const glossaryBySlug"),
);
const content = contentSources.join("\n");
const entryPattern = /\{\s*term:\s*"([^"]+)",\s*slug:\s*"([^"]+)"([\s\S]*?)sourceIds:/g;
const results = [];
const labelOwners = new Map();
let match;

while ((match = entryPattern.exec(glossarySource)) !== null) {
  const [, term, slug, body] = match;
  const aliasMatch = body.match(/aliases:\s*\[([^\]]+)\]/);
  const aliases = aliasMatch
    ? [...aliasMatch[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])
    : [];
  const labels = [...new Set([term, ...aliases])];
  for (const label of labels) {
    const normalizedLabel = label.toLocaleLowerCase();
    const owners = labelOwners.get(normalizedLabel) ?? [];
    owners.push(slug);
    labelOwners.set(normalizedLabel, owners);
  }
  const count = labels.reduce((total, label) => {
    const pattern = new RegExp(
      `(?<![\\p{L}\\p{N}])${escapeRegExp(label)}(?![\\p{L}\\p{N}])`,
      "giu",
    );
    return total + (content.match(pattern)?.length ?? 0);
  }, 0);

  results.push({ slug, term, count, labels });
}

results.sort((left, right) => right.count - left.count || left.term.localeCompare(right.term));
const ambiguousLabels = [...labelOwners.entries()]
  .filter(([, owners]) => new Set(owners).size > 1)
  .map(([label, owners]) => ({ label, slugs: [...new Set(owners)] }));
process.stdout.write(`${JSON.stringify({
  entryCount: results.length,
  referencedEntryCount: results.filter((entry) => entry.count > 0).length,
  unreferencedEntryCount: results.filter((entry) => entry.count === 0).length,
  ambiguousLabels,
  results,
}, null, 2)}\n`);
if (ambiguousLabels.length) process.exitCode = 1;
