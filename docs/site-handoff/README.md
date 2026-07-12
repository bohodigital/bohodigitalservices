# Boho Digital Services Website Handoff

## Purpose

This handoff preserves the complete current Boho Digital Services website so
work can continue later without relying on a chat transcript, an active local
server, or the current private hosting provider.

The website source is under `website/`. The controlling work order is under
`docs/source/`. This branch is an archival and continuation branch, not a
request to publish or change production infrastructure.

## Source-of-truth order

When sources disagree, use this order:

1. `docs/source/boho_digital_full_site_work_order_v1.md` controls scope,
   content, information architecture, business rules, and design intent.
2. The committed implementation under `website/` records the accepted visual
   and responsive direction as of the handoff.
3. This handoff package records operational state, decisions, limitations, and
   continuation procedures.
4. Later written owner decisions supersede earlier implementation choices.

Do not replace supplied copy with generic agency language. Do not invent
business details to fill gaps.

## Preserved state

- Parent repository branch: `site/private-review-v2-handoff`
- Website source snapshot: source code, configuration, tests, and assets copied
  from website commit `06004dc3a5ad9616718a8a26b2dd60797bd28c19`;
  the generic starter README was then replaced with this project-specific
  handoff documentation
- Website snapshot commit subject: `Brighten Boho mosaic visual system`
- Private Sites review: version 6
- Version 6 includes the structured scalable Glossary, automatic accessible
  inline definitions, section sidebars, detailed Tools documentation,
  operating diagrams, owned-entity placeholders, official source citations,
  clearer search-oriented homepage language, consolidated preview notices,
  and reduced headline, card, hero, and section scale.
- Sites source commit used for version 6:
  `926ce66d5a7cca181aec1c0744a6f5c8af1e936d`
- Review URL:
  <https://boho-digital-services-review-2026.mankopoppi.chatgpt.site/>
- Access at handoff: owner-only; sign-in required
- Custom domain: not connected
- DNS: unchanged
- Analytics: not created or connected
- Forms: disconnected; local confirmation only
- D1 database: none
- R2 bucket: none

The current Sites project identifier remains in
`website/.openai/hosting.json`. It is not a secret, but it must be treated as an
opaque existing identifier and must not be replaced casually.

## What is implemented

### Homepage narrative

The homepage follows the work-order sequence exactly:

1. Hero
2. The package is not the strategy
3. Success signals
4. Website design spotlight
5. Core services mosaic
6. Migration and provider rescue
7. Five buyer buckets
8. Lab and proof
9. Ongoing growth
10. Lean pricing philosophy
11. Final visibility-check CTA

### Shared system

The implementation includes reusable:

- sticky desktop and mobile header
- full-screen mobile navigation
- footer and navigation groups
- primary, secondary, and text buttons
- breadcrumbs
- CTA bands
- mosaic cards
- research cards
- service modules
- buyer-bucket panels
- evidence badges and evidence cards
- pull quotes and margin notes
- article metadata
- FAQ disclosures
- related-page navigation
- sticky/expandable section navigation with current-page and on-page links
- automatic first-use glossary annotation from the canonical term registry
- searchable, filterable, alphabetized, expandable Glossary explorer
- accessible fields, select controls, text areas, checkboxes, and form status
- structured interior-page renderer

### Design language

The visual system uses:

- Newsreader-style editorial serif display typography
- Manrope-style modern sans body/UI typography
- Ink, Warm Ivory, Parchment, Burnished Gold, Verdigris, Copper, Dusty Plum,
  and Blue Glass color families
- brighter accessible pop variants for gold, verdigris, copper, plum, and blue
- controlled eclecticism rather than generic SaaS composition
- abstract paired mosaic wings and a geometric bee axis
- signal paths, research grids, map fragments, editorial layouts, and evidence
  motifs
- mosaic seams, asymmetric cards, figure-eight/waggle-path growth imagery, and
  colored section beats

The bee is an abstract editorial/mosaic signal, not a cartoon mascot. Do not
introduce black/yellow hazard stripes, forest fantasy, honeycomb wallpaper, or
generic startup illustrations.

### Responsive and accessibility state

The current implementation was visually checked at approximately:

- 1600 x 1000 desktop
- 1280 x 800 laptop
- 820 x 1000 tablet
- 390 x 844 phone
- 320 x 700 narrow phone

The card grids change from asymmetric twelve-column desktop compositions to
organized tablet pairs and single-column phone stacks. Service-card actions
align through flex layout. Buyer and evidence cards are height-safe. The hero
bee scales without creating horizontal page scrolling. Mobile navigation locks
page scrolling while open.

Accessibility provisions include semantic headings, visible focus states,
keyboard-operable navigation and forms, adequate touch targets, reduced-motion
handling, forced-colors handling, text alternatives where content-bearing, and
`aria-hidden` on decorative motifs.

## Content model

The homepage is authored directly in `website/app/Homepage.tsx`.

Interior content is data-driven:

- `website/app/content/corePages.ts` contains service, pricing, about, contact,
  start, emergency, privacy, terms, and accessibility pages.
- `website/app/content/audiencePages.ts` contains industries, Lab, Learn,
  glossary, Tools route metadata, field-guide, and placeholder shelf pages.
- `website/app/content/knowledge.ts` contains the structured glossary, official
  source register, and detailed tool profiles.
- `website/app/content/types.ts` defines the page, section, item, and draft-form
  contracts.
- `website/app/[...slug]/page.tsx` maps every configured slug into the shared
  interior or knowledge renderer and exposes `generateStaticParams()`.

The knowledge layer includes reusable automatic first-use definitions plus
explicit `[[term-slug|visible label]]` overrides, a 57-entry searchable,
filterable, alphabetized, and expandable Glossary, a 10-profile Tools catalog,
two code-native operating diagrams, and official citations. The common-term
shelf is generated from `website/scripts/analyze-glossary-usage.mjs`; it is a
current-copy frequency scan, not traffic or keyword-demand data. See the single
master work order for the exact executed/outstanding reconciliation.

See `ROUTES.md` for the complete route inventory.

## Safety and publication constraints

Until the owner explicitly approves a production launch:

- keep every page `noindex, nofollow`
- do not connect `bohodigitalservices.com`
- do not change DNS
- do not enable external form submission or notification
- do not create or connect analytics
- do not activate paid services
- do not publish synthetic Lab evidence
- do not remove **Concept interface** labels from fictional interface imagery
- do not invent clients, testimonials, metrics, rankings, traffic, revenue,
  reviews, offices, team members, awards, certifications, or case-study results

Empty or planned Lab shelves must remain draft/noindexed until real or clearly
labeled example material exists.

## Known missing decisions before public launch

The following require human decisions or verified business information:

- final legal business identity and public contact details
- operating jurisdiction and legally reviewed privacy/terms language
- final privacy contact and deletion/request process
- approved form processor, spam protection, notification destination, data
  retention period, and consent language
- approved analytics/cookie approach, if any
- final production hosting choice
- final custom-domain and DNS plan
- verified social profiles
- real clients, proof, case studies, reports, or sanitized evidence suitable for
  Lab publication
- final production indexation decision and sitemap/robots behavior

The safest fallback for any missing item is to preserve the current draft copy,
keep it noindexed, and leave the related integration disconnected.

## Files intentionally not preserved

The branch excludes reproducible or machine-local material:

- `node_modules/`
- `.next/`
- `dist/`
- local Wrangler/Miniflare state
- temporary deployment archives under `work/`
- `.env*` files
- credentials and short-lived Sites repository tokens
- browser profiles, caches, logs, and screenshots

These are intentionally excluded because they are generated, local, secret, or
non-source artifacts. The lockfile and source needed to recreate them are
preserved.

## Continue work safely

1. Check out `site/private-review-v2-handoff`.
2. Read the work order and this handoff package.
3. Work only inside `website/` for site changes.
4. Preserve the package manager, lockfile, vinext/Vite architecture, and
   `.openai/hosting.json` unless a deliberate migration is approved.
5. Make one coherent change at a time.
6. Run the validation sequence in `OPERATIONS.md`.
7. Review at desktop, tablet, and phone sizes when visual behavior changes.
8. Commit source and documentation together when a decision changes.
9. Do not deploy or change external infrastructure without explicit approval.

## Related handoff files

- `ROUTES.md`: every current URL and its grouping
- `OPERATIONS.md`: development, validation, Cloudflare, forms, and continuation
  procedures
- `TRANSFER-MANIFEST.md`: exact source/branch/host transfer record and integrity
  checks
- `../work-orders/WO-2026-07-11-BOHO-PRODUCTION-READINESS-RESEARCH.md`:
  single canonical inventory and executable research plan for closing every
  production-readiness gap
