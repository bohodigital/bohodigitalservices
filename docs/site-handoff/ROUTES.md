# Route Inventory

The site contains the homepage plus 44 configured interior routes. All routes
are private-draft content and currently emit `noindex, nofollow` metadata.

## Homepage

- `/`

## Services

- `/services/`
- `/services/website-design-redesign/`
- `/services/website-migration-provider-rescue/`
- `/services/local-seo-search-visibility/`
- `/services/lead-generation-conversion/`
- `/services/ongoing-seo-growth/`
- `/services/technical-seo-site-health/`
- `/services/research-audits-analytics/`

## Industries and buyer groups

- `/industries/`
- `/industries/home-improvement-contractors/`
- `/industries/local-service-businesses/`
- `/industries/brick-and-mortar-retail-hospitality/`
- `/industries/online-retail-ecommerce/`
- `/industries/professional-b2b-services/`

## Business and conversion pages

- `/pricing/`
- `/about/`
- `/contact/`
- `/start/`
- `/emergency/`

## Legal and accessibility drafts

- `/privacy/`
- `/terms/`
- `/accessibility/`

The privacy and terms pages are restrained working drafts, not legal advice.
They must be reconciled with verified business identity, jurisdiction, hosting,
forms, analytics, cookies, email tools, retention, and real data flows before a
public launch.

## Lab

- `/lab/`
- `/lab/claims-we-refuse-to-make/`
- `/lab/local-market-reports/`
- `/lab/market-map-examples/`
- `/lab/website-quality-surveys/`
- `/lab/success-signal-studies/`
- `/lab/public-experiments/`
- `/lab/work-log/`
- `/lab/in-house-brands/`
- `/lab/example-reports/`
- `/lab/public-teardowns/`
- `/lab/tools-and-templates/`

Planned or empty Lab shelves intentionally contain no synthetic case studies or
filler evidence. Keep them draft/noindexed until real, sanitized, or explicitly
labeled example material is ready.

## Learn

- `/learn/`
- `/learn/glossary/`
- `/learn/bad-seo-field-guide/`
- `/learn/small-business-seo/`
- `/learn/local-search/`
- `/learn/website-buying/`
- `/learn/provider-rescue/`
- `/learn/ai-search-visibility/`
- `/learn/featured-rank-builder/`

## Tools and documentation

- `/tools/`

The Tools route contains the detailed tool catalog, official citations, two
operating diagrams, reciprocal Glossary links, and public-safe Boho Central
Servers terminology. It remains private/noindexed.

## Routing implementation

- Route content: `website/app/content/corePages.ts` and
  `website/app/content/audiencePages.ts`
- Route contract: `website/app/content/types.ts`
- Route resolver: `website/app/[...slug]/page.tsx`
- Shared renderer: `website/app/components/InteriorPage.tsx`
- Unknown slugs: rendered through `website/app/not-found.tsx`

Every fragment link is covered by the rendered HTML test suite. When adding a
route, add a complete `PageConfig`, ensure its slug ends with `/`, verify every
fragment target, and rerun the full route tests.
