"use client";

import { useMemo, useState } from "react";

import {
  commonGlossarySlugs,
  glossaryEntries,
  sourcesById,
  type GlossaryCategory,
  type GlossaryEntry,
} from "../content/knowledge";

const categories: Array<"All categories" | GlossaryCategory> = [
  "All categories",
  "Web foundations",
  "Source and delivery",
  "APIs and automation",
  "Search and measurement",
];

function ExternalSourceLinks({ entry }: { entry: GlossaryEntry }) {
  const sources = entry.sourceIds
    .map((sourceId) => sourcesById.get(sourceId))
    .filter((source) => Boolean(source));

  return (
    <div className="glossary-row__sources">
      <strong>Official sources</strong>
      <ul>
        {sources.map((source) => (
          <li key={source!.id}>
            <a
              href={source!.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {source!.label}
              <span className="external-link-mark" aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span> · {source!.publisher}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GlossaryRow({ entry, expand }: { entry: GlossaryEntry; expand: boolean }) {
  return (
    <details className="glossary-row" id={`term-${entry.slug}`} open={expand || undefined}>
      <summary>
        <span className="glossary-row__identity">
          <strong>{entry.term}</strong>
          {entry.aliases?.length ? <small>Also: {entry.aliases.join(", ")}</small> : null}
        </span>
        <span className="glossary-row__short">{entry.shortDefinition}</span>
        <span className="glossary-row__read-more" aria-hidden="true">
          <span className="glossary-row__closed-label">Read more</span>
          <span className="glossary-row__open-label">Close</span>
        </span>
      </summary>
      <div className="glossary-row__body">
        <p>{entry.definition}</p>
        <dl>
          <div>
            <dt>Why it matters</dt>
            <dd>{entry.whyItMatters}</dd>
          </div>
          <div>
            <dt>Common misunderstanding</dt>
            <dd>{entry.commonMisunderstanding}</dd>
          </div>
        </dl>
        {entry.relatedTermSlugs?.length ? (
          <div className="glossary-row__related">
            <strong>Related terms</strong>
            {entry.relatedTermSlugs.map((slug) => {
              const related = glossaryEntries.find((candidate) => candidate.slug === slug);
              return related ? <a href={`#term-${slug}`} key={slug}>{related.term}</a> : null;
            })}
          </div>
        ) : null}
        {entry.relatedToolSlugs?.length ? (
          <div className="glossary-row__related">
            <strong>Deeper tool documentation</strong>
            {entry.relatedToolSlugs.map((slug) => (
              <a href={`/tools/#tool-${slug}`} key={slug}>
                {slug.split("-").map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ")}
              </a>
            ))}
          </div>
        ) : null}
        <ExternalSourceLinks entry={entry} />
        <p className="knowledge-reviewed">Reviewed against linked sources · July 11, 2026</p>
      </div>
    </details>
  );
}

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All categories");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const sortedEntries = useMemo(
    () => [...glossaryEntries].sort((left, right) => left.term.localeCompare(right.term)),
    [],
  );
  const commonEntries = commonGlossarySlugs
    .map((slug) => glossaryEntries.find((entry) => entry.slug === slug))
    .filter((entry): entry is GlossaryEntry => Boolean(entry));
  const filteredEntries = sortedEntries.filter((entry) => {
    if (category !== "All categories" && entry.category !== category) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      entry.term,
      ...(entry.aliases ?? []),
      entry.shortDefinition,
      entry.definition,
      entry.whyItMatters,
      entry.commonMisunderstanding,
    ].join(" ").toLocaleLowerCase();
    return searchable.includes(normalizedQuery);
  });
  const letterGroups = filteredEntries.reduce<Map<string, GlossaryEntry[]>>((groups, entry) => {
    const letter = entry.term.charAt(0).toLocaleUpperCase();
    const group = groups.get(letter) ?? [];
    group.push(entry);
    groups.set(letter, group);
    return groups;
  }, new Map());
  const activeLetters = [...letterGroups.keys()];

  return (
    <div className="glossary-explorer">
      <section className="glossary-common" id="common-terms" aria-labelledby="common-terms-title">
        <div className="glossary-explorer__section-heading">
          <p className="eyebrow">Most used in the current site copy</p>
          <h2 id="common-terms-title">The terms a reader is most likely to meet first.</h2>
          <p>
            This starter ranking comes from a repeatable scan of the homepage,
            services, industries, Learn, Lab, and business-page source—not from
            traffic data. Search-demand data can replace it later.
          </p>
        </div>
        <div className="glossary-common__grid">
          {commonEntries.map((entry, index) => (
            <a href={`#term-${entry.slug}`} key={entry.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{entry.term}</strong>
              <small>{entry.shortDefinition}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="glossary-master" id="all-terms" aria-labelledby="all-terms-title">
        <div className="glossary-explorer__section-heading">
          <p className="eyebrow">Master glossary · {glossaryEntries.length} current entries</p>
          <h2 id="all-terms-title">Compact until the reader asks for the deeper layer.</h2>
          <p>
            Search definitions and explanations, filter by system, then expand
            only the entries you need. This layout can grow without turning the
            page into hundreds of full-size cards.
          </p>
        </div>
        <div className="glossary-controls" role="search">
          <label>
            <span>Search the glossary</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try DNS, hosting, conversion, MCP…"
              type="search"
              value={query}
            />
          </label>
          <label>
            <span>Filter by system</span>
            <select
              onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}
              value={category}
            >
              {categories.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <p aria-live="polite">
            Showing <strong>{filteredEntries.length}</strong> of {glossaryEntries.length} terms
          </p>
        </div>

        <nav className="glossary-alpha-nav" aria-label="Glossary table of contents">
          <strong>Table of contents</strong>
          <div>
            {activeLetters.map((letter) => (
              <a href={`#letter-${letter.toLocaleLowerCase()}`} key={letter}>{letter}</a>
            ))}
          </div>
        </nav>

        {filteredEntries.length ? (
          <div className="glossary-letter-groups">
            {[...letterGroups.entries()].map(([letter, entries]) => (
              <section className="glossary-letter-group" id={`letter-${letter.toLocaleLowerCase()}`} key={letter} aria-labelledby={`letter-${letter.toLocaleLowerCase()}-title`}>
                <h3 id={`letter-${letter.toLocaleLowerCase()}-title`}>{letter}</h3>
                <div className="glossary-rows">
                  {entries.map((entry) => (
                    <GlossaryRow entry={entry} expand={normalizedQuery.length > 1} key={entry.slug} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="glossary-empty" role="status">
            <h3>No reviewed term matches that search yet.</h3>
            <p>Try a shorter phrase or reset the category. Missing useful terms belong in the research backlog.</p>
            <button onClick={() => { setQuery(""); setCategory("All categories"); }} type="button">Reset the glossary</button>
          </div>
        )}
      </section>
    </div>
  );
}
