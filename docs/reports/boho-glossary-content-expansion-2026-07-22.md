# Boho glossary content expansion and SEO review

Date: 2026-07-22

Scope: all 153 canonical glossary detail pages

Production status: **NOT YET PROMOTED**

## Editorial result

- Canonical glossary records reviewed: 153
- Unique reviewed practical examples: 153
- Missing practical examples: 0
- Duplicate practical examples: 0
- Generated detail pages: 153
- Minimum visible article words: 221
- Median visible article words: 264
- Maximum visible article words: 334
- Pages below 200 visible article words: 0
- Pages using a generic generated-example fallback: 0

Each page now contains:

1. A concise preview-derived answer near the H1.
2. The existing detailed definition.
3. The existing explanation of why the term matters.
4. A newly reviewed, term-specific practical example.
5. Existing misconception, ownership, and business context where available.
6. Visible system-cluster context.
7. Descriptive related-term links that include the related term's short definition.
8. Existing official source links and the editorial review date.

The examples are maintained in `app/content/glossaryEditorial.ts` and keyed by
the permanent glossary slug. Automated validation enforces exact parity with
the canonical 153-entry registry, a minimum example depth, unique example text,
and presence in the rendered static HTML.

## Vanity Metrics recovery and expansion

Vanity Metrics retains the recovered historical short definition, definition,
why-it-matters text, and example. The second recovered body paragraph is now
visible as business context. The page also explains the key misconception and
links directly to Metric, Analytics, Conversion Rate, and Google Search Console.

Historical example retained verbatim:

> A dashboard celebrating raw traffic spikes without explaining lead quality,
> page context, or next actions is often leaning on vanity metrics.

## Search-oriented implementation

The implementation follows Google's current people-first guidance rather than
target-word counts or repeated keyword templates:

- Every page has a descriptive term-specific title, preview-derived meta
  description, self-canonical, `index, follow`, and existing site social image.
- Main content is server-rendered semantic HTML and does not require client-side
  execution.
- Each term is linked from the glossary hub and from its existing related-term
  graph.
- `DefinedTerm`, `WebPage`, and `BreadcrumbList` JSON-LD describe visible page
  content. No unsupported FAQ or Q&A rich-result markup was added.
- The full glossary dataset remains absent from detail-page client bundles.
- Every route remains in the XML sitemap exactly once.

Primary guidance reviewed:

- Google Search Central, “Creating helpful, reliable, people-first content”:
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, “SEO Guide for Web Developers”:
  https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google Search Central, “Intro to structured data markup”:
  https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central, “General structured data guidelines”:
  https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Schema.org `DefinedTermSet`:
  https://schema.org/DefinedTermSet

## Guardrails

- No ranking, traffic, lead, revenue, or rich-result outcome is promised.
- No keyword stuffing, location-page generation, automated FAQ markup, or
  repeated filler paragraph was introduced.
- Examples illustrate concepts and do not claim client work or measured results.
- Search performance still depends on crawling, indexing decisions, usefulness,
  competition, external references, and ongoing editorial improvement.
