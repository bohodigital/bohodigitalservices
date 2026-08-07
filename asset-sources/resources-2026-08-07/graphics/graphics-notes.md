# Resource graphic notes

These four assets are deterministic, editable SVGs. They use only vector primitives, embedded system-font stacks, and the Boho palette from `app/globals.css`. They contain no client data, external images, or external font dependencies.

## 1. Four signals. Four different questions.

- **File:** `gsc-four-signals.svg`
- **Suggested route/use:** A Google Search Console explainer in Resources or Learn; a supporting graphic beside the organic SEO offer; a social crop can be made from each metric card later.
- **Claim boundary:** The values come from the public three-day demo fixture: 2,645 impressions, 114 clicks, 4.31% CTR, and 12.65 impression-weighted average position. They demonstrate metric interpretation only. They are not client results, forecasts, benchmarks, or evidence that one metric caused another.
- **Alt text:** “Four colorful cards explain synthetic Google Search Console data: 2,645 impressions answer whether Google showed a result; 114 clicks answer whether a searcher chose it; 4.31% CTR is clicks divided by impressions; and 12.65 average position is an impression-weighted location, not a fixed rank.”

## 2. One journey. Six kinds of evidence.

- **File:** `source-separated-measurement-chain.svg`
- **Suggested route/use:** The Boho Analytics resource page, an analytics methodology explainer, or a technical proof section that shows how evidence is kept source-separated.
- **Claim boundary:** This is a conceptual measurement chain, not a user-level joined funnel. Each stage uses a different unit and may be produced by a different system. Counts may diverge because of consent, filtering, time zones, attribution, validation, delivery rules, or human qualification. The visual does not claim Boho Analytics automatically proves a single person moved through all six stages.
- **Alt text:** “A six-stage measurement chain moves from Google Search Console impression and click to a GA4 or Umami visit, accepted form, delivered notification, and human-qualified inquiry. A warning says the units differ and this is not a guaranteed funnel.”

## 3. Zero is a value. Missing is an absence. Stale is old evidence.

- **File:** `zero-missing-stale-data.svg`
- **Suggested route/use:** A Resources data-quality article, the analytics technical-details section, or onboarding documentation about dashboard health states.
- **Claim boundary:** The field names and values are synthetic examples. “Confirmed zero” is valid only when the source answered and the field is present for the stated scope. “Missing” must not be silently coerced to zero. “Stale” requires a use-specific freshness threshold; the three-day label is illustrative rather than a universal rule.
- **Alt text:** “Three cards distinguish a confirmed zero from missing and stale data: zero means the source answered with zero, missing means the value is unknown, and stale means a prior value is too old for the current decision.”

## 4. Query + page opportunity board

- **File:** `gsc-query-page-opportunity-board-demo-v1.svg`
- **Suggested route/use:** A Search Console workflow article, the Resources analytics collection, or a technical SEO explainer showing how Boho turns query/page evidence into a work queue.
- **Claim boundary:** All six query/page rows are synthetic educational examples created for this explainer; they are not in the public demo fixture and are not a capture of the v0.2 dashboard. The three position zones are workflow shorthand, not Google-defined buckets, ranking promises, or universal prioritization rules. Search Console detail can be provider-limited and privacy-protected, so absent query rows must not be interpreted as zero demand.
- **Alt text:** “A synthetic Search Console opportunity board lists six query and landing-page examples with impressions, clicks, CTR, average position, and next actions. Rows are grouped into already visible, page-two opportunity, and longer-term work, with a warning that it is not a dashboard screenshot or client data.”

## Shared disclosure

Every graphic visibly identifies the example as synthetic and not client data. Keep that disclosure in any derivative crop or raster export.
