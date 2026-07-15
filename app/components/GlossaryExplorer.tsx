"use client";

import { useEffect, useMemo, useState } from "react";

import {
  commonGlossarySlugs,
  glossaryClusters,
  glossaryEntries,
  sourcesById,
  type GlossaryCluster,
  type GlossaryEntry,
} from "../content/knowledge";

const clusterFilters: Array<"All clusters" | GlossaryCluster> = ["All clusters", ...glossaryClusters];

const relatedSystemFamilyByCluster: Record<GlossaryCluster, { label: string; href: `/tools/#family-${string}` }> = {
  "Domains and ownership": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Hosting and delivery": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Source control and deployment": { label: "Hosting & Release", href: "/tools/#family-hosting-release" },
  "Websites and content systems": { label: "Websites & Publishing", href: "/tools/#family-websites-publishing" },
  "Search and local visibility": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "Analytics and measurement": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "APIs and integrations": { label: "Secure Integrations & Custom Tools", href: "/tools/#family-secure-integrations-custom-tools" },
  "Automation and agent systems": { label: "Operations & Automation", href: "/tools/#family-operations-automation" },
  "Security and access": { label: "Secure Integrations & Custom Tools", href: "/tools/#family-secure-integrations-custom-tools" },
  "Leads and conversion": { label: "Measurement & Search Signals", href: "/tools/#family-measurement-search-signals" },
  "AI and language-model infrastructure": { label: "Operations & Automation", href: "/tools/#family-operations-automation" },
};

function clusterSlug(cluster: GlossaryCluster) {
  return cluster.toLocaleLowerCase().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function reviewedLabel(value: GlossaryEntry["lastReviewed"]) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

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
          <small className="glossary-row__cluster">{entry.cluster}</small>
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
          {entry.ownershipImplications ? <div><dt>Ownership implications</dt><dd>{entry.ownershipImplications}</dd></div> : null}
          {entry.businessImplications ? <div><dt>Business implications</dt><dd>{entry.businessImplications}</dd></div> : null}
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
        <div className="glossary-row__related">
          <strong>Related system family</strong>
          <a href={relatedSystemFamilyByCluster[entry.cluster].href}>{relatedSystemFamilyByCluster[entry.cluster].label}</a>
        </div>
        <ExternalSourceLinks entry={entry} />
        <p className="knowledge-reviewed">{`Last reviewed ${reviewedLabel(entry.lastReviewed)}`}</p>
      </div>
    </details>
  );
}

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<(typeof clusterFilters)[number]>("All clusters");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const sortedEntries = useMemo(
    () => [...glossaryEntries].sort((left, right) => left.term.localeCompare(right.term)),
    [],
  );
  const commonEntries = commonGlossarySlugs
    .map((slug) => glossaryEntries.find((entry) => entry.slug === slug))
    .filter((entry): entry is GlossaryEntry => Boolean(entry));

  useEffect(() => {
    const syncClusterFromHash = () => {
      const hash = window.location.hash.replace(/^#cluster-/, "");
      if (!hash) return;
      const matchingCluster = glossaryClusters.find((item) => clusterSlug(item) === hash);
      if (matchingCluster) setCluster(matchingCluster);
    };
    const initialSync = window.setTimeout(syncClusterFromHash, 0);
    window.addEventListener("hashchange", syncClusterFromHash);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("hashchange", syncClusterFromHash);
    };
  }, []);

  const filteredEntries = sortedEntries.filter((entry) => {
    if (cluster !== "All clusters" && entry.cluster !== cluster) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      entry.term,
      ...(entry.aliases ?? []),
      entry.shortDefinition,
      entry.definition,
      entry.whyItMatters,
      entry.commonMisunderstanding,
      entry.cluster,
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
          <p className="eyebrow">Start here</p>
          <h2 id="common-terms-title">Common terms behind website and ownership decisions.</h2>
          <p>
            Use these definitions to clarify a proposal, a provider conversation,
            or the parts of the system the business needs to control.
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

      <section className="glossary-clusters" id="glossary-clusters" aria-labelledby="glossary-clusters-title">
        <div className="glossary-explorer__section-heading">
          <p className="eyebrow">System clusters</p>
          <h2 id="glossary-clusters-title">Move through the machinery by business context.</h2>
          <p>Eleven clusters keep the current glossary useful while giving future entries a stable place to live.</p>
        </div>
        <div className="glossary-cluster-grid" aria-label="Filter glossary by system cluster">
          {glossaryClusters.map((item, index) => (
            <button
              aria-pressed={cluster === item}
              id={`cluster-${clusterSlug(item)}`}
              key={item}
              onClick={() => setCluster(item)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="glossary-master" id="all-terms" aria-labelledby="all-terms-title">
        <div className="glossary-explorer__section-heading">
          <p className="eyebrow">All glossary terms · {glossaryEntries.length} entries</p>
          <h2 id="all-terms-title">Find the term, then inspect why it matters.</h2>
          <p>
            Search or filter the glossary, then expand an entry for the business
            impact, common misunderstanding, related terms, and official sources.
          </p>
        </div>
        <div className="glossary-controls" role="search">
          <label>
            <span>Search the glossary</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try DNS, hosting, redirects…"
              type="search"
              value={query}
            />
          </label>
          <label>
            <span>Filter by cluster</span>
            <select
              onChange={(event) => setCluster(event.target.value as (typeof clusterFilters)[number])}
              value={cluster}
            >
              {clusterFilters.map((option) => <option key={option}>{option}</option>)}
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
            <button onClick={() => { setQuery(""); setCluster("All clusters"); }} type="button">Reset the glossary</button>
          </div>
        )}
      </section>
    </div>
  );
}
