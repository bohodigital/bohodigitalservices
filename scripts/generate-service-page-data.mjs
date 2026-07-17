import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  approvedCurrencyAmounts,
  pricingPolicyVersion,
} from "../app/content/pricingPolicy.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const sourceDirectory = join(repositoryRoot, "content", "service-pages");
const outputPath = join(
  repositoryRoot,
  "app",
  "content",
  "servicePages.generated.ts",
);

const SOURCES = [
  {
    file: "01-ongoing-seo-search-growth.md",
    sha256: "3b591dbbbbf349d0d64f0cb4616367027eb0f12c8b8dde8e59401412e697811d",
  },
  {
    file: "02-web-design-website-redesign.md",
    sha256: "d58263b2298b8cba01da996a0261556fe67c21571abae07fc29aa1d6927b373e",
  },
  {
    file: "03-website-migration-provider-rescue.md",
    sha256: "40b419034965a038959a8388de71f058ea89371e0f0c7602211415ef74793305",
  },
  {
    file: "04-digital-research-seo-audits-strategy.md",
    sha256: "ba8fed25f9ebda9a608a4ebc51b7582ddf2e1266f2c0518c856b7145bbc54222",
  },
  {
    file: "05-custom-web-digital-solutions.md",
    sha256: "6afd14fb0ab89d99a247177716e58fcc0df868bae43755a94bd8a9c13f4c4f4a",
  },
];

// The intake Markdown remains byte-for-byte source evidence. These narrowly
// governed substitutions are applied only to generated public data. Each
// substitution must match exactly once, so source drift fails the generator.
const CONTENT_OVERRIDES = [
  {
    id: "analytics-ongoing-seo-source-language",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Describe the Analytics Platform as public open-source software used through self-hosting, not a Boho-hosted service.",
    from: "Ongoing work may use supported data from the Boho Analytics Platform and approved external sources. Reporting should identify sources, missing or stale information, relevant filters, observed signals, reasonable inferences, recommendations, limitations, and the next decision.",
    to: "Ongoing work may use supported data from a self-hosted deployment of the free, public, open-source Boho Analytics Platform repository and approved external sources. Reporting should identify sources, missing or stale information, relevant filters, observed signals, reasonable inferences, recommendations, limitations, and the next decision.",
  },
  {
    id: "hosting-standalone-rate",
    file: "02-web-design-website-redesign.md",
    reason:
      "Remove the undefined standalone hosting-rate claim; hosting is priced only through a specific scope.",
    from: "It may be included with a qualifying implementation retainer when the proposal expressly says so. Otherwise eligible hosting starts at the public standalone rate shown on the Pricing page.",
    to: "It may be included with a qualifying implementation retainer when the proposal expressly says so. Otherwise, eligible hosting is separately scoped.",
  },
  {
    id: "analytics-meta-description",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Replace hosted-access language with verified public open-source repository language.",
    from: "**Meta description:** Free analytics access, analyst-reviewed reports, technical SEO audits, market research, provider reviews, and written digital strategy with public starting prices.",
    to: "**Meta description:** Free public open-source analytics software, analyst-reviewed reports, technical SEO audits, market research, provider reviews, and written digital strategy with public starting prices.",
  },
  {
    id: "analytics-hero-repository-language",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Clarify that the free Analytics Platform is a public repository intended for self-hosting.",
    from: "Start with a free public-information review. Use the supported Boho Analytics Platform free. Add an analyst-reviewed monthly report or a defined audit when the decision requires deeper evidence.",
    to: "Start with a free public-information review. The Boho Analytics Platform is a free, public, open-source repository intended for self-hosting. Add an analyst-reviewed monthly report or a defined audit when the decision requires deeper evidence.",
  },
  {
    id: "analytics-trust-line",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Qualify the free Analytics Platform claim with its public repository and self-hosting model.",
    from: "**Trust line:** Initial review: Free. Boho Analytics Platform: Free. Analyst-reviewed reports start at $95 per month. One-time reviews and audits start at $350.",
    to: "**Trust line:** Initial review: Free. Boho Analytics Platform public repository: Free to use and self-host. Analyst-reviewed reports start at $95 per month. One-time reviews and audits start at $350.",
  },
  {
    id: "analytics-self-service-description",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Replace an implied hosted-access offer with the actual self-hosted repository model.",
    from: "Supported self-service access to source-labeled website, search, infrastructure, form-monitoring, and other approved data views.",
    to: "The free, public, open-source Boho Analytics Platform repository can be self-hosted to provide source-labeled website, search, infrastructure, form-monitoring, and other approved data views.",
  },
  {
    id: "analytics-software-value-language",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Avoid implying that Boho operates a free hosted dashboard.",
    from: "The platform helps a business inspect supported information without paying merely to unlock the dashboard.",
    to: "The repository lets a business inspect supported information without paying merely to obtain the software.",
  },
  {
    id: "analytics-repository-link-label",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Label the local resource link as repository information rather than hosted platform access.",
    from: "**Explore the platform:** `/resources#analysis-dashboard`",
    to: "**Explore the public repository:** `/resources#analysis-dashboard`",
  },
  {
    id: "analytics-comparison-heading",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Frame the comparison around self-hosted software versus paid analysis.",
    from: "## Free platform or paid report?",
    to: "## Free public repository or paid report?",
  },
  {
    id: "analytics-use-heading",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Frame free use as use of the public repository.",
    from: "### Use the free platform when",
    to: "### Use the free public repository when",
  },
  {
    id: "analytics-self-host-list-item",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "State the self-hosting requirement where buyers choose between software and analysis.",
    from: "- You want supported self-service data views.",
    to: "- You want to self-host supported data views.",
  },
  {
    id: "analytics-pricing-label",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Qualify the free price as applying to the public self-hosted repository.",
    from: "**Boho Analytics Platform:** Free",
    to: "**Boho Analytics Platform public repository:** Free to use and self-host",
  },
  {
    id: "analytics-faq-answer",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Answer the pricing question without implying a hosted free tier.",
    from: "Yes, for supported uses and data sources. Custom setup, tracking repair, historic reconstruction, private integrations, complex ecommerce configuration, or unsupported data work may require a paid scope.",
    to: "Yes. The public repository is open source and available to self-host for supported uses and data sources. Custom setup, tracking repair, historic reconstruction, private integrations, complex ecommerce configuration, or unsupported data work may require a paid scope.",
  },
  {
    id: "analytics-report-value-language",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Distinguish paid analyst work from free software without promising hosted dashboard access.",
    from: "You are paying for human data-quality review, source reconciliation, interpretation, prioritization, limitations, and a written decision record. You are not paying merely for access to the dashboard.",
    to: "You are paying for human data-quality review, source reconciliation, interpretation, prioritization, limitations, and a written decision record. You are not paying merely for access to software.",
  },
  {
    id: "report-method-link",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Point evidence readers to the maintained report-method section instead of the absent sample-report anchor.",
    from: "**View Work & Evidence:** `/work#sample-report`",
    to: "**View Work & Evidence:** `/work/#report-method`",
  },
];

const utf8Decoder = new TextDecoder("utf-8", { fatal: true });

function fail(message) {
  throw new Error(`[service-page-generator] ${message}`);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function countOccurrences(text, needle) {
  if (!needle) return 0;
  return text.split(needle).length - 1;
}

function applyOverrides(file, sourceText) {
  let text = sourceText;
  const appliedOverrideIds = [];

  for (const override of CONTENT_OVERRIDES.filter((entry) => entry.file === file)) {
    const matchCount = countOccurrences(text, override.from);
    if (matchCount !== 1) {
      fail(
        `${file}: override ${override.id} expected one exact source match; found ${matchCount}`,
      );
    }
    text = text.replace(override.from, override.to);
    appliedOverrideIds.push(override.id);
  }

  return { text, appliedOverrideIds };
}

function normalizeLocalRoute(route, context) {
  const trimmed = route.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    fail(`${context}: expected a root-relative local route, received ${route}`);
  }
  if (/\s/.test(trimmed)) {
    fail(`${context}: local route contains whitespace: ${route}`);
  }

  const hashIndex = trimmed.indexOf("#");
  const beforeFragment = hashIndex === -1 ? trimmed : trimmed.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : trimmed.slice(hashIndex + 1);
  if (hashIndex !== -1 && !fragment) {
    fail(`${context}: local route has an empty fragment: ${route}`);
  }

  const queryIndex = beforeFragment.indexOf("?");
  const pathname =
    queryIndex === -1 ? beforeFragment : beforeFragment.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : beforeFragment.slice(queryIndex);
  if (!pathname) {
    fail(`${context}: local route has no pathname: ${route}`);
  }

  const normalizedPath =
    pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${normalizedPath}${query}${fragment ? `#${fragment}` : ""}`;
}

function normalizeRoutesInText(text, context) {
  return text.replace(/`(\/[^`\s]+)`/g, (_match, route) => {
    return `\`${normalizeLocalRoute(route, context)}\``;
  });
}

function localRoutesInText(text) {
  const routes = [];
  for (const match of text.matchAll(/`(\/[^`\s]+)`/g)) {
    if (!routes.includes(match[1])) routes.push(match[1]);
  }
  return routes;
}

function directiveValue(line, label, context) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = line.match(new RegExp(`^\\*\\*${escapedLabel}:\\*\\*\\s*(.+?)\\s*$`));
  if (!match) fail(`${context}: expected **${label}:** directive`);
  return match[1].replace(/\s{2,}$/u, "").trim();
}

function unwrapCodeRoute(value, context) {
  const match = value.match(/^`(\/[^`\s]+)`$/);
  if (!match) fail(`${context}: expected a code-formatted local route, received ${value}`);
  return normalizeLocalRoute(match[1], context);
}

function findLine(lines, exact, context) {
  const indexes = [];
  lines.forEach((line, index) => {
    if (line === exact) indexes.push(index);
  });
  if (indexes.length !== 1) {
    fail(`${context}: expected one ${JSON.stringify(exact)} line; found ${indexes.length}`);
  }
  return indexes[0];
}

function nonBlankParagraphs(lines, context) {
  const paragraphs = [];
  let current = [];

  const flush = () => {
    if (!current.length) return;
    const text = normalizeRoutesInText(
      current.map((line) => line.trim()).join(" "),
      context,
    );
    paragraphs.push(text);
    current = [];
  };

  for (const line of lines) {
    if (!line.trim() || line.trim() === "---") {
      flush();
    } else {
      current.push(line);
    }
  }
  flush();
  return paragraphs;
}

function blockWithRoutes(block) {
  const routeSource =
    block.type === "list" ? block.items.join("\n") : block.text ?? "";
  const localRoutes = localRoutesInText(routeSource);
  return localRoutes.length ? { ...block, localRoutes } : block;
}

function parseBodyBlocks(lines, context) {
  const blocks = [];
  let index = 0;

  const unsupportedLine = lines.find(
    (line) =>
      /^(```|~~~)/.test(line) ||
      /^\|.*\|\s*$/.test(line) ||
      /^(?: {2,}|\t)(?:[-*+]|\d+[.)])\s+/.test(line),
  );
  if (unsupportedLine) {
    fail(
      `${context}: unsupported fenced code, table, or nested-list syntax in ${unsupportedLine}`,
    );
  }

  const isBoundary = (line) =>
    !line.trim() ||
    line.trim() === "---" ||
    /^#{1,6}\s/.test(line) ||
    /^[-*+]\s+/.test(line) ||
    /^\d+[.)]\s+/.test(line) ||
    /^>\s?/.test(line);

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || line.trim() === "---") {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      fail(`${context}: unsupported body heading level in ${line}`);
    }

    const unordered = line.match(/^[-*+]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const items = [];
      const itemPattern = isOrdered ? /^\d+[.)]\s+(.+)$/ : /^[-*+]\s+(.+)$/;
      while (index < lines.length) {
        const itemMatch = lines[index].match(itemPattern);
        if (!itemMatch) break;
        items.push(normalizeRoutesInText(itemMatch[1].trim(), context));
        index += 1;
      }
      blocks.push(
        blockWithRoutes({ type: "list", ordered: isOrdered, items }),
      );
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, "").trim());
        index += 1;
      }
      const text = normalizeRoutesInText(quoteLines.join("\n"), context);
      blocks.push(blockWithRoutes({ type: "blockquote", text }));
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && !isBoundary(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    if (!paragraphLines.length) {
      fail(`${context}: parser made no progress at line ${index + 1}`);
    }
    const text = normalizeRoutesInText(paragraphLines.join(" "), context);
    blocks.push(blockWithRoutes({ type: "paragraph", text }));
  }

  return blocks;
}

function parseAction(lines, label, kind, context) {
  const index = lines.findIndex((line) => line.startsWith(`**${label}:**`));
  if (index === -1) return null;
  const actionLabel = directiveValue(lines[index], label, context);
  const destinationLine = lines.slice(index + 1).find((line) => line.trim());
  if (!destinationLine) fail(`${context}: ${label} has no Destination directive`);
  const destination = directiveValue(destinationLine, "Destination", context);
  return {
    kind,
    label: actionLabel,
    href: unwrapCodeRoute(destination, context),
  };
}

function parseRelated(lines, context) {
  const content = lines.filter(
    (line) => line.trim() && line.trim() !== "---",
  );
  const related = [];

  for (let index = 0; index < content.length; index += 3) {
    const promptLine = content[index];
    const label = content[index + 1];
    const routeLine = content[index + 2];
    if (!promptLine || !label || !routeLine) {
      fail(`${context}: incomplete related-service directive`);
    }
    const promptMatch = promptLine.match(/^\*\*(.+?)\*\*\s*$/);
    if (!promptMatch) {
      fail(`${context}: invalid related-service prompt ${promptLine}`);
    }
    related.push({
      prompt: promptMatch[1],
      label: label.trim(),
      href: unwrapCodeRoute(routeLine.trim(), context),
    });
  }

  return related;
}

function parseServicePage(source) {
  const sourcePath = join(sourceDirectory, source.file);
  const raw = readFileSync(sourcePath);
  const actualHash = sha256(raw);
  if (actualHash !== source.sha256) {
    fail(
      `${source.file}: SHA-256 mismatch; expected ${source.sha256}, received ${actualHash}`,
    );
  }

  let decoded;
  try {
    decoded = utf8Decoder.decode(raw);
  } catch (error) {
    fail(`${source.file}: source is not valid UTF-8 (${error.message})`);
  }
  const normalizedSource = decoded.replace(/\r\n?/g, "\n");
  const { text, appliedOverrideIds } = applyOverrides(
    source.file,
    normalizedSource,
  );
  const lines = text.split("\n");
  const context = source.file;

  const pageMetadataIndex = findLine(lines, "## Page metadata", context);
  const heroIndex = findLine(lines, "## Hero", context);
  const relatedIndex = findLine(lines, "## Related services", context);
  const finalCtaIndex = findLine(lines, "## Final call to action", context);
  if (!(pageMetadataIndex < heroIndex && heroIndex < relatedIndex && relatedIndex < finalCtaIndex)) {
    fail(`${context}: editorial sections are out of order`);
  }

  const deckTitleMatch = lines[0]?.match(/^#\s+\d+\.\s+(.+?)\s*$/);
  if (!deckTitleMatch) fail(`${context}: invalid numbered page boundary heading`);

  const metadataLines = lines.slice(pageMetadataIndex + 1, heroIndex);
  const fieldLine = (field) => {
    const matches = metadataLines.filter((line) => line.startsWith(`**${field}:**`));
    if (matches.length !== 1) {
      fail(`${context}: expected one ${field} metadata directive; found ${matches.length}`);
    }
    return directiveValue(matches[0], field, context);
  };

  const metadata = {
    seoTitle: fieldLine("SEO title"),
    metaDescription: fieldLine("Meta description"),
    canonicalRoute: unwrapCodeRoute(fieldLine("Canonical route"), context),
  };

  const heroEnd = lines.findIndex(
    (line, index) => index > heroIndex && line.trim() === "---",
  );
  if (heroEnd === -1 || heroEnd >= relatedIndex) {
    fail(`${context}: hero has no closing divider`);
  }
  const heroLines = lines.slice(heroIndex + 1, heroEnd);
  const heroEyebrowLine = heroLines.find((line) => line.startsWith("**Eyebrow:**"));
  if (!heroEyebrowLine) fail(`${context}: hero has no Eyebrow directive`);
  const heroHeadlineIndex = heroLines.findIndex((line) => /^#\s+/.test(line));
  if (heroHeadlineIndex === -1) fail(`${context}: hero has no H1 headline`);
  const primaryButtonIndex = heroLines.findIndex((line) =>
    line.startsWith("**Primary button:**"),
  );
  if (primaryButtonIndex === -1) fail(`${context}: hero has no primary button`);
  const trustLine = heroLines.find((line) => line.startsWith("**Trust line:**"));
  if (!trustLine) fail(`${context}: hero has no trust line`);

  const hero = {
    eyebrow: directiveValue(heroEyebrowLine, "Eyebrow", context),
    headline: heroLines[heroHeadlineIndex].replace(/^#\s+/, "").trim(),
    intro: nonBlankParagraphs(
      heroLines.slice(heroHeadlineIndex + 1, primaryButtonIndex),
      context,
    ),
    primaryCta: parseAction(
      heroLines,
      "Primary button",
      "primary",
      context,
    ),
    secondaryCta: parseAction(
      heroLines,
      "Secondary button",
      "secondary",
      context,
    ),
    trustLine: directiveValue(trustLine, "Trust line", context),
  };
  if (!hero.primaryCta || !hero.secondaryCta) {
    fail(`${context}: hero requires primary and secondary CTA directives`);
  }

  const body = parseBodyBlocks(
    lines.slice(heroEnd + 1, relatedIndex),
    context,
  );
  const related = parseRelated(
    lines.slice(relatedIndex + 1, finalCtaIndex),
    context,
  );

  const finalLines = lines.slice(finalCtaIndex + 1).filter((line) => line.trim() !== "---");
  const finalHeadlineIndex = finalLines.findIndex((line) => /^#\s+/.test(line));
  if (finalHeadlineIndex === -1) fail(`${context}: final CTA has no headline`);
  const finalActionIndex = finalLines.findIndex((line) =>
    /^\*\*(Primary button|Secondary button|Pricing link):\*\*/.test(line),
  );
  if (finalActionIndex === -1) fail(`${context}: final CTA has no action directives`);
  const finalCta = {
    headline: finalLines[finalHeadlineIndex].replace(/^#\s+/, "").trim(),
    body: nonBlankParagraphs(
      finalLines.slice(finalHeadlineIndex + 1, finalActionIndex),
      context,
    ),
    actions: [
      parseAction(finalLines, "Primary button", "primary", context),
      parseAction(finalLines, "Secondary button", "secondary", context),
      parseAction(finalLines, "Pricing link", "pricing", context),
    ].filter(Boolean),
  };

  const routeValues = [
    metadata.canonicalRoute,
    hero.primaryCta.href,
    hero.secondaryCta.href,
    ...body.flatMap((block) => block.localRoutes ?? []),
    ...related.map((entry) => entry.href),
    ...finalCta.actions.map((action) => action.href),
  ];

  return {
    source: {
      file: `content/service-pages/${source.file}`,
      sha256: source.sha256,
      appliedOverrideIds,
    },
    name: deckTitleMatch[1],
    metadata,
    hero,
    body,
    related,
    finalCta,
    localRoutes: [...new Set(routeValues)],
  };
}

function typescriptSource(pages) {
  const hashes = Object.fromEntries(
    SOURCES.map((source) => [`content/service-pages/${source.file}`, source.sha256]),
  );
  const overrideSummary = CONTENT_OVERRIDES.map(({ id, file, reason }) => ({
    id,
    source: `content/service-pages/${file}`,
    reason,
  }));
  const json = (value) => JSON.stringify(value, null, 2);

  return `// This file is generated by scripts/generate-service-page-data.mjs.\n// Do not edit it directly; edit the governed generator or intake sources.\n\nexport type ServicePageHref = "/" | \`/${"${string}"}\`;\n\nexport type ServicePageAction = {\n  readonly kind: "primary" | "secondary" | "pricing";\n  readonly label: string;\n  readonly href: ServicePageHref;\n};\n\nexport type ServicePageBlock =\n  | {\n      readonly type: "heading";\n      readonly level: 2 | 3;\n      readonly text: string;\n    }\n  | {\n      readonly type: "paragraph";\n      readonly text: string;\n      readonly localRoutes?: readonly ServicePageHref[];\n    }\n  | {\n      readonly type: "blockquote";\n      readonly text: string;\n      readonly localRoutes?: readonly ServicePageHref[];\n    }\n  | {\n      readonly type: "list";\n      readonly ordered: boolean;\n      readonly items: readonly string[];\n      readonly localRoutes?: readonly ServicePageHref[];\n    };\n\nexport type ServicePage = {\n  readonly source: {\n    readonly file: string;\n    readonly sha256: string;\n    readonly appliedOverrideIds: readonly string[];\n  };\n  readonly name: string;\n  readonly metadata: {\n    readonly seoTitle: string;\n    readonly metaDescription: string;\n    readonly canonicalRoute: ServicePageHref;\n  };\n  readonly hero: {\n    readonly eyebrow: string;\n    readonly headline: string;\n    readonly intro: readonly string[];\n    readonly primaryCta: ServicePageAction;\n    readonly secondaryCta: ServicePageAction;\n    readonly trustLine: string;\n  };\n  readonly body: readonly ServicePageBlock[];\n  readonly related: readonly {\n    readonly prompt: string;\n    readonly label: string;\n    readonly href: ServicePageHref;\n  }[];\n  readonly finalCta: {\n    readonly headline: string;\n    readonly body: readonly string[];\n    readonly actions: readonly ServicePageAction[];\n  };\n  readonly localRoutes: readonly ServicePageHref[];\n};\n\nexport const servicePageSourceHashes = ${json(hashes)} as const;\n\nexport const servicePageContentOverrides = ${json(overrideSummary)} as const;\n\nexport const servicePages: readonly ServicePage[] = ${json(pages)};\n`;
}

function main() {
  const unknownArguments = process.argv.slice(2).filter((argument) => argument !== "--check");
  if (unknownArguments.length) {
    fail(`unknown arguments: ${unknownArguments.join(", ")}`);
  }

  const pages = SOURCES.map(parseServicePage);
  const renderedCurrencyAmounts = [
    ...new Set(JSON.stringify(pages).match(/\$\d[\d,]*/g) ?? []),
  ].sort();
  const approvedAmounts = [...approvedCurrencyAmounts].sort();
  if (JSON.stringify(renderedCurrencyAmounts) !== JSON.stringify(approvedAmounts)) {
    fail(
      `rendered currency amounts do not match ${pricingPolicyVersion}: ` +
        `expected ${approvedAmounts.join(", ")}; found ${renderedCurrencyAmounts.join(", ")}`,
    );
  }
  // Canonical routes are runtime lookup keys, so expose them as strings. CTA
  // and related hrefs stay root-relative template-literal types for link safety.
  const typedOutput = typescriptSource(pages);
  if (countOccurrences(typedOutput, "readonly canonicalRoute: ServicePageHref;") !== 1) {
    fail("generated canonical-route type marker is missing or duplicated");
  }
  const output = typedOutput.replace(
    "readonly canonicalRoute: ServicePageHref;",
    "readonly canonicalRoute: string;",
  );
  const checkOnly = process.argv.includes("--check");

  if (checkOnly) {
    let current;
    try {
      current = readFileSync(outputPath, "utf8");
    } catch {
      fail(`${relative(repositoryRoot, outputPath)} does not exist; run the generator`);
    }
    if (current !== output) {
      fail(`${relative(repositoryRoot, outputPath)} is stale; run the generator`);
    }
    process.stdout.write(
      `Verified ${pages.length} service pages and ${CONTENT_OVERRIDES.length} governed overrides.\n`,
    );
    return;
  }

  let current = null;
  try {
    current = readFileSync(outputPath, "utf8");
  } catch {
    // The first run creates the generated module.
  }
  if (current !== output) writeFileSync(outputPath, output, "utf8");
  process.stdout.write(
    `Generated ${relative(repositoryRoot, outputPath)} from ${pages.length} hash-verified service pages.\n`,
  );
}

main();
