import Link from "next/link";

import {
  glossaryBySlug,
  sourcesById,
  type GlossaryEntry,
} from "../content/knowledge";
import {
  relatedSystemFamilyByCluster,
  reviewedLabel,
} from "../content/glossaryPresentation";
import { glossaryHubPath, glossaryPath } from "../content/glossaryRoutes";
import { Breadcrumbs, Footer, Header } from "./SiteChrome";

const siteUrl = "https://bohodigitalservices.com";

export function GlossaryTermPage({ entry }: { entry: GlossaryEntry }) {
  const sources = entry.sourceIds
    .map((sourceId) => sourcesById.get(sourceId))
    .filter((source) => Boolean(source));
  const relatedEntries = (entry.relatedTermSlugs ?? [])
    .map((slug) => glossaryBySlug.get(slug))
    .filter((related): related is GlossaryEntry => Boolean(related));
  const canonicalUrl = new URL(glossaryPath(entry), siteUrl).toString();
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${canonicalUrl}#defined-term`,
      name: entry.term,
      description: entry.shortDefinition,
      url: canonicalUrl,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        "@id": `${siteUrl}${glossaryHubPath}#defined-term-set`,
        name: "Boho Digital Services glossary",
        url: `${siteUrl}${glossaryHubPath}`,
      },
      termCode: entry.slug,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Glossary", item: `${siteUrl}${glossaryHubPath}` },
        { "@type": "ListItem", position: 3, name: entry.term, item: canonicalUrl },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="knowledge-page glossary-term-page" id="main-content" tabIndex={-1}>
        <article className="section-shell glossary-term-page__article">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Glossary", href: glossaryHubPath },
            { label: entry.term },
          ]} />
          <header className="glossary-term-page__header">
            <p className="eyebrow">Glossary · {entry.cluster}</p>
            <h1>{entry.term}</h1>
            <p className="glossary-term-page__lede">{entry.shortDefinition}</p>
            {entry.aliases?.length ? <p><strong>Also called:</strong> {entry.aliases.join(", ")}</p> : null}
          </header>
          <div className="glossary-term-page__content">
            <section aria-labelledby="definition-title">
              <h2 id="definition-title">Definition</h2>
              <p>{entry.definition}</p>
            </section>
            <section aria-labelledby="why-title">
              <h2 id="why-title">Why it matters</h2>
              <p>{entry.whyItMatters}</p>
            </section>
            {entry.commonMisunderstanding ? (
              <section aria-labelledby="misunderstanding-title">
                <h2 id="misunderstanding-title">Common misunderstanding</h2>
                <p>{entry.commonMisunderstanding}</p>
              </section>
            ) : null}
            {entry.ownershipImplications ? (
              <section aria-labelledby="ownership-title">
                <h2 id="ownership-title">Ownership implications</h2>
                <p>{entry.ownershipImplications}</p>
              </section>
            ) : null}
            {entry.businessImplications ? (
              <section aria-labelledby="business-title">
                <h2 id="business-title">Business implications</h2>
                <p>{entry.businessImplications}</p>
              </section>
            ) : null}
            <section aria-labelledby="related-title">
              <h2 id="related-title">Related terms</h2>
              {relatedEntries.length ? (
                <ul>
                  {relatedEntries.map((related) => (
                    <li key={related.slug}>
                      <Link href={glossaryPath(related)}>{related.term}</Link>
                    </li>
                  ))}
                </ul>
              ) : <p>Browse the complete glossary to explore adjacent terms.</p>}
              <p>
                Related system family:{" "}
                <Link href={relatedSystemFamilyByCluster[entry.cluster].href}>
                  {relatedSystemFamilyByCluster[entry.cluster].label}
                </Link>
              </p>
            </section>
            {sources.length ? (
              <section aria-labelledby="sources-title">
                <h2 id="sources-title">Sources</h2>
                <ul>
                  {sources.map((source) => (
                    <li key={source!.id}>
                      <a href={source!.url} rel="noopener noreferrer" target="_blank">
                        {source!.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {" · "}{source!.publisher}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <p className="knowledge-reviewed">Last reviewed {reviewedLabel(entry.lastReviewed)}</p>
            <p className="glossary-term-page__return">
              <Link href={glossaryHubPath}>Return to the complete glossary</Link>
            </p>
          </div>
        </article>
        {schema.map((value) => (
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }}
            key={value["@type"]}
            type="application/ld+json"
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
