# Boho technical visibility validation

Work order: `WO-2026-07-22-BOHO-TECHNICAL-VISIBILITY-GLOSSARY-001`

Validation date: 2026-07-22

Production status: **NOT DEPLOYED**

## Repository and release provenance

- Canonical repository: `/srv/local1/repos/sites/bohodigitalservices` on the Pi, resolved through the governed repository manifest
- Local implementation mirror: `repos/bohodigitalservices-site`
- Base branch: `main`
- Base commit: `bcd3faf80c96dcb0416418389e75dc050d74f2b2`
- Implementation branch: `codex/boho-technical-visibility-glossary-routes`
- The Pi `origin` was fetched before implementation and the clean local base matched its `main`.
- The attached owner work order was not present in Bohopi's work-order store. The attached text was treated as the binding authorization; that source discrepancy is preserved here.
- The configured Sites project was inspected read-only. Its current live private-review version is 47, sourced from commit `9f188d7053f8c3e60963c675cd482575a605a9e8`. No version was saved and no deployment was changed.
- A final direct Pi manifest check was attempted but the managed SSH identity was correctly unavailable to the shell. No credential workaround was attempted.

## Route and redirect results

- Current canonical routes: 181
- Glossary records, stable slugs, generated pages, and sitemap URLs: 153 each
- Glossary pages marked `noindex`: 0
- Slug collisions: 0
- Unresolved related-term references: 0
- Historical registry records: 58
- Verified redirect records: 40
- Generated direct redirect rules, including slash variants: 80
- Redirect chains: 0
- Redirect loops: 0
- Unverified or unresolved historical records: 18; none is emitted
- Verified historical Vanity Metrics URL: `https://bohodigitalservices.com/ask-the-owl/dictionary/vanity-metrics/`
- Canonical destination: `https://bohodigitalservices.com/learn/glossary/vanity-metrics/`

The inventory's `actualStatus` values describe the generated local static output and redirect simulation. They are not represented as observations from the production hostname.

## Exact validation commands and results

| Command | Exit | Meaningful result |
| --- | ---: | --- |
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile-resolved dependencies installed without changes. |
| `corepack pnpm run generate:service-pages` | 0 | Generated five hash-verified service pages. |
| `corepack pnpm run service-pages:check` | 0 | Verified five pages and 38 governed overrides. |
| `corepack pnpm run glossary:usage` | 0 | 153 entries; 104 referenced and 49 currently unreferenced in automatic prose matching; no ambiguous labels. Every entry nevertheless has a hub inlink and detail route. |
| `corepack pnpm run lint` | 0 | Zero errors; 38 pre-existing warnings outside the new route implementation. |
| `corepack pnpm exec tsc --noEmit` | 0 | TypeScript passed. |
| `corepack pnpm run build:pages` | 0 | Generated 185 static Next pages and prepared Cloudflare Pages output with no Worker runtime. |
| `corepack pnpm run routes:artifacts` | 0 | Wrote the governed inventory, glossary manifest, and audit from the final output. |
| `corepack pnpm run routes:artifacts:check` | 0 | Checked-in route artifacts exactly match source and generated output. |
| `corepack pnpm run routes:check` | 0 | 153/153 glossary pages and sitemap entries; zero collisions, unresolved links, chains, or loops. |
| `corepack pnpm run test` | 0 | Final integrated gate passed: build, 23/23 rendered tests, route checks, artifact parity, and static crawl. |
| `corepack pnpm run crawl:static` | 0 | Crawled 181 canonical routes, 80 redirect variants, `robots.txt`, and `sitemap.xml`; zero failures. |
| `git diff --check` | 0 | No whitespace errors. |

The final test command now contains the route, redirect, artifact-parity, and crawl validators. The Cloudflare Pages validation workflow runs the same checks after its build, preventing a dead redirect destination or stale checked-in manifest from passing the normal release gate.

## Accessibility and browser review

The Vanity Metrics page was inspected at 1440×1000 and 390×844. Both views had one `h1`, one main landmark, labeled breadcrumbs, no duplicate IDs, and no horizontal overflow. At mobile width the content resolved to a single column.

The homepage definition popover was operated with the in-app browser. Its ordinary “Read full definition” link pointed to the canonical Lead Generation glossary route, was keyboard-focusable, closed on Escape, and returned focus to the trigger. No focus trap was observed.

## Performance and cost

| Measure | Baseline | Final |
| --- | ---: | ---: |
| Next static pages | 32 | 185 |
| Generated `index.html` files | 30 | 183 |
| Build duration | 8.83 s | 9.48 s |
| Static output size | 35,580 KiB | 60,928 KiB |
| `_next/static` size | 1,244 KiB | 1,240 KiB |

The Vanity Metrics HTML is 45,890 bytes. Its ten linked static client chunks total 657,010 raw bytes before transfer compression; this is the shared site shell rather than a term-specific glossary payload. Deterministic bundle inspection confirms that the full glossary dataset is not included in the term-page client bundle.

No Worker, D1, KV, R2, runtime API, database, secret, paid service, new analytics vendor, or client-side glossary fetch was introduced.

## Independent review

The independent read-only review reported no critical or high-severity findings. Its four medium findings were resolved before the final gate:

1. Route, redirect, and crawl validators were added to the integrated test and CI gates.
2. Glossary metadata now retains the governed site social image and uses term-specific Open Graph and Twitter text.
3. Unsupported newly invented Vanity Metrics fields were removed; only recovered content is rendered, with the correct 2026-07-22 review date.
4. Generated route artifacts gained deterministic check mode and CI parity validation.

The lower-risk audit-hostname and validation-report omissions were also corrected.

## Remaining risks and next pass

- Initial glossary pages intentionally contain the existing short preview content.
- Every glossary page is intentionally indexable.
- Substantive glossary expansion remains required in the next content pass.
- Search performance cannot be guaranteed.
- Historical URLs unsupported by evidence were not guessed.
- Search Console exports, raw analytics URL exports, Cloudflare request logs, and Internet Archive data were unavailable in this checkout. The 18 unverified records remain owner-review items and are not public redirects.

## Rollback

Before any later production deployment, retain Sites version 47 and its commit as the rollback point. If preview review fails, abandon or revert this feature-branch commit; production is unchanged. If a later authorized deployment fails, restore the previously verified version, then rerun canonical, sitemap, and redirect checks. Valid historical redirects should not be removed unless a redirect rule is itself the diagnosed fault.
