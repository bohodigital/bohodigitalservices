import { readFile } from "node:fs/promises";

const sourceFiles = [
  new URL("../app/Homepage.tsx", import.meta.url),
  new URL("../app/content/corePages.ts", import.meta.url),
  new URL("../app/content/audiencePages.ts", import.meta.url),
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
  knowledgeSource.indexOf("export const glossaryEntries"),
  knowledgeSource.indexOf("export const glossaryBySlug"),
);
const content = contentSources.join("\n");
const entryPattern = /\{\s*term:\s*"([^"]+)",\s*slug:\s*"([^"]+)"([\s\S]*?)sourceIds:/g;
const results = [];
let match;

while ((match = entryPattern.exec(glossarySource)) !== null) {
  const [, term, slug, body] = match;
  const aliasMatch = body.match(/aliases:\s*\[([^\]]+)\]/);
  const aliases = aliasMatch
    ? [...aliasMatch[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])
    : [];
  const labels = [...new Set([term, ...aliases])];
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
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
