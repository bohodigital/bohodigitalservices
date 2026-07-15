import { Fragment } from "react";

import {
  glossaryAliasIndex,
  glossaryAliasPattern,
  glossaryBySlug,
} from "../content/knowledge";
import { DefinitionTerm } from "./DefinitionTerm";

const markerPatternSource = "\\[\\[([a-z0-9-]+)(?:\\|([^\\]]+))?\\]\\]";

function renderAutomaticTerms(
  text: string,
  seenTerms: Set<string>,
  keyPrefix: string,
) {
  if (!text || !glossaryAliasPattern) return [text];

  const matcher = new RegExp(
    `(?<![\\p{L}\\p{N}])(${glossaryAliasPattern})(?![\\p{L}\\p{N}])`,
    "giu",
  );
  const output = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(text)) !== null) {
    const label = match[1];
    const entry = glossaryAliasIndex.get(label.toLocaleLowerCase());

    if (match.index > cursor) output.push(text.slice(cursor, match.index));

    if (entry && !seenTerms.has(entry.slug)) {
      seenTerms.add(entry.slug);
      output.push(
        <DefinitionTerm
          key={`${keyPrefix}-${entry.slug}-${match.index}`}
          label={label}
          shortDefinition={entry.shortDefinition}
          slug={entry.slug}
          term={entry.term}
        />,
      );
    } else {
      output.push(label);
    }

    cursor = match.index + label.length;
  }

  if (cursor < text.length) output.push(text.slice(cursor));
  return output;
}

export function DefinedText({
  text,
  seenTerms,
  autoDefine = false,
}: {
  text: string;
  seenTerms?: Set<string>;
  autoDefine?: boolean;
}) {
  const output = [];
  const pageTerms = seenTerms ?? new Set<string>();
  let cursor = 0;
  let match: RegExpExecArray | null;
  const markerPattern = new RegExp(markerPatternSource, "gi");

  while ((match = markerPattern.exec(text)) !== null) {
    const [marker, rawSlug, customLabel] = match;
    const slug = rawSlug.toLowerCase();
    const entry = glossaryBySlug.get(slug);

    if (match.index > cursor) {
      const preceding = text.slice(cursor, match.index);
      output.push(
        ...(autoDefine
          ? renderAutomaticTerms(preceding, pageTerms, `auto-${cursor}`)
          : [preceding]),
      );
    }

    if (entry) {
      pageTerms.add(entry.slug);
      output.push(
        <DefinitionTerm
          key={`${slug}-${match.index}`}
          label={customLabel ?? entry.term}
          shortDefinition={entry.shortDefinition}
          slug={entry.slug}
          term={entry.term}
        />,
      );
    } else {
      output.push(customLabel ?? marker);
    }

    cursor = match.index + marker.length;
  }

  if (cursor < text.length) {
    const remainder = text.slice(cursor);
    output.push(
      ...(autoDefine
        ? renderAutomaticTerms(remainder, pageTerms, `auto-${cursor}`)
        : [remainder]),
    );
  }

  return output.map((part, index) => (
    <Fragment key={typeof part === "string" ? `${part.slice(0, 20)}-${index}` : index}>
      {part}
    </Fragment>
  ));
}
