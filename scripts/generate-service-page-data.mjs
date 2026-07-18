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
    to: "**Meta description:** Clear website, search, market, provider, and analytics reviews that show what is working, what is not, and what to do next. Free open-source software is also available for self-hosting.",
  },
  {
    id: "analytics-hero-repository-language",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Clarify that the free Analytics Platform is a public repository intended for self-hosting.",
    from: "Start with a free public-information review. Use the supported Boho Analytics Platform free. Add an analyst-reviewed monthly report or a defined audit when the decision requires deeper evidence.",
    to: "Start with a free review of public information. The Boho Analytics Platform is free open-source software for you or your technical provider to run. Choose a monthly report or one-time audit when you want an analyst to explain the evidence and recommend next steps.",
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
    to: "An analyst checks the available data, explains what it shows, lists the most important findings, notes its limits, and provides written next steps. You are paying for the analysis, not for access to software.",
  },
  {
    id: "report-method-link",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Point evidence readers to the maintained report-method section instead of the absent sample-report anchor.",
    from: "**View Work & Evidence:** `/work#sample-report`",
    to: "**View Work & Evidence:** `/work/#report-method`",
  },
  {
    id: "owner-plain-language-seo-meta",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Apply the owner's plain-language cleanup to the decision-facing service description.",
    from: "**Meta description:** Ongoing SEO, local visibility, technical improvement, content support, analytics, and website optimization with public starting prices and documented monthly priorities.",
    to: "**Meta description:** Ongoing help to improve how local customers find, understand, and contact your business, with a clear monthly priority and a written record of completed work.",
  },
  {
    id: "owner-plain-language-seo-hero-one",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Explain the service in customer language before retaining the detailed governed scope below.",
    from: "Ongoing SEO is for businesses with a useful website foundation and a real reason to keep improving it. Boho provides prioritized search, content, technical, local, conversion, and measurement work without hiding the plan inside a mystery retainer.",
    to: "Use ongoing SEO when you already have a useful website and want to improve how the right customers find and use it. Each month, Boho reviews the evidence, agrees on a priority, completes the work included in your plan, and records what changed.",
  },
  {
    id: "owner-plain-language-seo-hero-two",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Replace specialist phrasing in the short hero description without changing the service boundary.",
    from: "Each cycle should make four things clear: what mattered most, what changed, what the evidence can and cannot show, and what should happen next.",
    to: "Every month explains what mattered, what was done, what the results can and cannot show, and what should happen next.",
  },
  {
    id: "owner-plain-language-seo-reporting-description",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Clarify the reporting product without changing its exclusions or price.",
    from: "Reporting-only plans are for businesses that want regular interpretation without ongoing website changes.",
    to: "Reporting-only plans are for businesses that want a clear explanation of their website and search data but do not need Boho making changes each month.",
  },
  {
    id: "owner-plain-language-seo-implementation-description",
    file: "01-ongoing-seo-search-growth.md",
    reason:
      "Clarify what the recurring implementation product adds to reporting.",
    from: "Implementation retainers combine reporting with an agreed amount of recurring SEO, content, website, technical, local, conversion, or measurement work.",
    to: "An ongoing plan combines that report with an agreed amount of search, content, website, local visibility, or measurement work.",
  },
  {
    id: "owner-plain-language-website-meta",
    file: "02-web-design-website-redesign.md",
    reason:
      "Apply the owner's plain-language cleanup to the decision-facing service description.",
    from: "**Meta description:** Focused website improvements, new websites, and redesigns built around clarity, search foundations, accessibility, performance, ownership, and customer action.",
    to: "**Meta description:** Website repairs, redesigns, and new sites that explain the business clearly, work well on phones, support search, and remain easy to own.",
  },
  {
    id: "owner-plain-language-website-hero-one",
    file: "02-web-design-website-redesign.md",
    reason:
      "Lead with what customers understand and do, while leaving the detailed implementation scope intact.",
    from: "Boho repairs, redesigns, and builds websites around what customers need to understand and do. The work combines business clarity, information architecture, responsive design, accessibility, performance, search foundations, customer paths, measurement readiness, and documented ownership.",
    to: "Boho repairs, redesigns, and builds websites so customers can quickly understand what you offer, trust the business, and take the next step. The site is made to work on phones, support search, and remain easy for you to own and update.",
  },
  {
    id: "owner-plain-language-website-hero-two",
    file: "02-web-design-website-redesign.md",
    reason:
      "Simplify the short route-choice description without changing the available service paths.",
    from: "Not every website needs to be replaced. The first useful decision may be a focused repair, a substantial redesign, a new build, or a provider rescue before design work begins.",
    to: "Not every website needs to be replaced. A few focused fixes may be enough, or the business may need a redesign, a new site, or a provider move before design begins.",
  },
  {
    id: "owner-plain-language-rescue-meta",
    file: "03-website-migration-provider-rescue.md",
    reason:
      "Apply the owner's plain-language cleanup to the decision-facing service description.",
    from: "**Meta description:** Recover authorized control, leave a bad website or SEO provider, preserve useful content and URLs, migrate safely, verify the launch, and document ownership.",
    to: "**Meta description:** Help leaving a difficult website or SEO provider while protecting your domain, useful pages, forms, email connections, and search visibility.",
  },
  {
    id: "owner-plain-language-rescue-headline",
    file: "03-website-migration-provider-rescue.md",
    reason:
      "Describe the customer situation without making an unsupported public judgment about the provider.",
    from: "# Leave the bad provider without losing control or useful assets.",
    to: "# Leave a difficult provider without losing control or useful assets.",
  },
  {
    id: "owner-plain-language-rescue-hero-one",
    file: "03-website-migration-provider-rescue.md",
    reason:
      "Name the concrete accounts and assets a business owner recognizes.",
    from: "Boho helps businesses review ownership, recover authorized control, preserve useful content and URLs, plan a clean exit, migrate systems, verify important customer and search functions, and document the new arrangement.",
    to: "Boho helps you understand who controls the domain, website, hosting, forms, analytics, and related accounts; regain access you are authorized to have; protect useful pages and URLs; and move to a setup you can explain and own.",
  },
  {
    id: "owner-plain-language-rescue-hero-two",
    file: "03-website-migration-provider-rescue.md",
    reason:
      "Explain the migration sequence without abstract dependency language or continuity promises.",
    from: "The objective is not merely to move files. It is to understand the dependencies before changing them, reduce avoidable loss, and leave the business with a system it can explain and own.",
    to: "The goal is not simply to copy files. We identify what could break before the move, protect what matters, and check the new setup before handoff.",
  },
  {
    id: "owner-plain-language-rescue-assessment-description",
    file: "03-website-migration-provider-rescue.md",
    reason:
      "Replace an abstract product description with the concrete review and outcome.",
    from: "A bounded assessment of ownership, access, dependencies, risks, and the likely path forward.",
    to: "A focused review of ownership, access, connected services, risks, and the best next step.",
  },
  {
    id: "owner-plain-language-research-headline",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Lead with the customer decision in plain language.",
    from: "# Find the decision before buying the implementation.",
    to: "# Find out what to fix before paying to fix it.",
  },
  {
    id: "owner-plain-language-research-hero-one",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Explain the research service through its practical questions and output.",
    from: "Boho studies websites, search visibility, markets, competitors, providers, customer paths, and measurement systems to identify which digital improvements are most likely to deserve attention.",
    to: "Boho reviews your website, search presence, market, competitors, providers, customer journey, and available data to show what is working, what is not, and what deserves attention first.",
  },
  {
    id: "owner-plain-language-research-report-description",
    file: "04-digital-research-seo-audits-strategy.md",
    reason:
      "Describe the monthly report through what the analyst checks and delivers.",
    from: "A paid monthly report adds human data-quality review, source reconciliation, interpretation, business context, limitations, prioritization, and a written decision record.",
    to: "A paid monthly report adds an analyst who checks the available data, explains what it shows, identifies unreliable information, lists the most important findings, and provides written next steps.",
  },
  {
    id: "owner-plain-language-custom-meta",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Apply the owner's plain-language cleanup to the decision-facing service description.",
    from: "**Meta description:** Focused custom tools, forms, calculators, dashboards, integrations, data workflows, APIs, publishing systems, and automation with documented ownership and support.",
    to: "**Meta description:** Small custom tools and software connections that reduce repeated work, with testing, documentation, and clear ownership.",
  },
  {
    id: "owner-plain-language-custom-primary-action",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Make the free initial review the consistent first public action before paid discovery.",
    from: "**Primary button:** Start with discovery",
    to: "**Primary button:** Start the free review",
  },
  {
    id: "owner-plain-language-custom-trust-line-grammar",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Correct subject-verb agreement in the public pricing trust line.",
    from: "**Trust line:** Discovery and feasibility starts at $500. Focused custom builds start at $2,500. Eligible discovery fees are credited toward an approved related build.",
    to: "**Trust line:** Discovery and feasibility start at $500. Focused custom builds start at $2,500. Eligible discovery fees are credited toward an approved related build.",
  },
  {
    id: "owner-plain-language-custom-headline",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Replace abstract system language with the concrete customer product.",
    from: "# Build the smallest useful system for the actual problem.",
    to: "# Build the smallest useful tool for the real problem.",
  },
  {
    id: "owner-plain-language-custom-hero-one",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Explain custom work through the repeated business problem it addresses.",
    from: "Boho builds or connects focused tools, forms, calculators, dashboards, integrations, data workflows, APIs, publishing systems, and automation when the repeated work is stable enough to justify custom development.",
    to: "Boho builds small tools or connects software when a repeated task wastes time, causes mistakes, or keeps important information in separate places.",
  },
  {
    id: "owner-plain-language-custom-hero-two",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "State the simpler-alternative boundary without specialist product language.",
    from: "Custom software is not the opening assumption. The right answer may be a small tool, an integration, a process repair, a supported existing product, or no build at all.",
    to: "We do not assume custom software is the answer. A simpler process, an existing product, or a small connection may solve the problem better.",
  },
  {
    id: "owner-plain-language-custom-discovery-description",
    file: "05-custom-web-digital-solutions.md",
    reason:
      "Explain the paid discovery product as the step needed for a responsible quote.",
    from: "Discovery is the first paid step when the custom system cannot be responsibly quoted from public information and a short discussion.",
    to: "Discovery is the first paid step when Boho needs to understand the work before it can quote a responsible build.",
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
