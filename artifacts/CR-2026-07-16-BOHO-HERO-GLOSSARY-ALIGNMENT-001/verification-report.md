# Homepage hero and glossary alignment verification

Request: `CR-2026-07-16-BOHO-HERO-GLOSSARY-ALIGNMENT-001`

Date: 2026-07-16

Branch: `feature/homepage-hero-glossary-20260716`

Base commit: `1c308ea86cd222806f20170fb0b312813cbd1e08`

Canonical worktree: `/srv/local1/worktrees/bohodigitalservices-hero-glossary-20260716`

## Scope

Only the two requested public-surface changes were implemented:

1. The existing owner-supplied homepage collage is now the top section background. It is mirrored horizontally with `scaleX(-1)`, kept proportional with `object-fit: contain`, and rendered as decorative content so the unchanged commercial copy stays on the left.
2. The glossary architecture, missing terms, cluster accuracy, search coverage, and first-use links from public page prose were expanded.

No production deployment, DNS, forms, analytics, account, email, credential, or unrelated repository change was performed.

## Governance alignment

The implementation was checked against the active Company Constitution v0.1.0, Operations and Agent Constitution v0.1.0, Boho Project Constitution v0.4.0, Brand Messaging Register v0.4.0, and Brand Implementation Guide v0.4.0.

The homepage copy, service structure, production form contracts, crawl controls, and existing stable glossary anchors were preserved. New terms explain real website and operating-system vocabulary already used by the public site; they do not add capability, client, performance, adoption, or security claims.

## Glossary result

- 103 total terms, up from 61.
- 12 explained business-context clusters, up from 11.
- Added `Privacy and data governance` as a separate cluster.
- Moved MCP tools and resources into `AI and language-model infrastructure` rather than treating protocol concepts as general automation products.
- Added 42 terms covering domain control, backups, delivery, web quality, content architecture, environments, rollback, integrations, access control, workflows, leads, measurement, privacy, local visibility, and AI systems.
- Added automatic first-use glossary links to safe public prose containers while preventing nested links inside linked cards.
- Expanded search to include ownership and business implications.
- Added per-cluster descriptions and live term counts.
- Repaired the glossary-usage audit so it reads the actual entry seeds and fails on ambiguous labels.

Cluster counts:

| Cluster | Terms |
| --- | ---: |
| Domains and ownership | 5 |
| Hosting and delivery | 12 |
| Source control and deployment | 12 |
| Websites and content systems | 13 |
| Search and local visibility | 19 |
| Analytics and measurement | 4 |
| APIs and integrations | 6 |
| Automation and agent systems | 3 |
| Security and access | 8 |
| Privacy and data governance | 5 |
| Leads and conversion | 8 |
| AI and language-model infrastructure | 8 |

## Validation

Local and canonical Pi validation passed:

- TypeScript: `tsc --noEmit` passed.
- Lint: passed with 0 errors and 29 existing warnings.
- Glossary audit: 103 entries, 60 terms used in public source, 43 glossary-only terms, 0 ambiguous labels.
- `git diff --check`: passed.
- Production build and Cloudflare Pages preparation: passed.
- Node regression suite: 15 of 15 tests passed.
- All intentional public routes render with one `main`, one `h1`, and a footer.
- Every rendered local link, fragment, and asset resolves.
- Crawl controls and sitemap tests passed.
- Production form contracts were unchanged and passed.

Browser verification used headless Microsoft Edge against the isolated review candidate after the production build passed:

- 29 public routes at 1440 x 900 and 390 x 844: 58 route/viewport checks, 0 runtime errors, 0 nested links, and 0 horizontal overflow.
- Desktop hero at 1440 x 1000: 1440 x 871 section; proportional 1306.5 x 871 background image; `contain`; horizontally mirrored; 0 overflow.
- Mobile hero at 390 x 844: full-width 390 x 260 background image at its native 3:2 ratio; horizontally mirrored; 0 overflow.
- Glossary: 12 cluster controls, 103 term rows, 0 overflow.
- Keyboard activation of `Privacy and data governance` set `aria-pressed="true"` and filtered to its 5 terms.

Screenshots:

- `homepage-hero-desktop.png`
- `homepage-hero-mobile.png`
- `glossary-clusters-desktop.png`

## Changed-file inventory

- `app/Homepage.tsx`
- `app/components/GlossaryExplorer.tsx`
- `app/components/InteriorPage.tsx`
- `app/components/KnowledgePages.tsx`
- `app/components/ResourcesPage.tsx`
- `app/content/knowledge.ts`
- `app/globals.css`
- `scripts/analyze-glossary-usage.mjs`
- `tests/rendered-html.test.mjs`
- `artifacts/CR-2026-07-16-BOHO-HERO-GLOSSARY-ALIGNMENT-001/*`

## Known gaps

- This is an isolated private review candidate. It has not been pushed, merged, or deployed.
- External source availability was not treated as a production dependency; all definitions retain their public source links for human review.
- The repository's 29 lint warnings remain warnings, not errors; they are outside this bounded change except for the pre-existing raw-image pattern used by the same supplied hero asset.

## Rollback

Production is unchanged. To discard the review candidate, remove the isolated worktree and branch. To reverse it after a future merge, revert the candidate commit. The known pre-change source state is `1c308ea86cd222806f20170fb0b312813cbd1e08`.
