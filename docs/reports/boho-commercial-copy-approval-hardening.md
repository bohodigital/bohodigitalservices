# Boho Commercial Copy Approval Hardening Report

## Contents

- [Decision requested](#decision-requested)
- [Resolved audit findings](#resolved-audit-findings)
- [Precedence proof](#precedence-proof)
- [Coverage and parser proof](#coverage-and-parser-proof)
- [Inventory and blocked-copy proof](#inventory-and-blocked-copy-proof)
- [Adapter and import-boundary proof](#adapter-and-import-boundary-proof)
- [Validation results](#validation-results)
- [Unchanged-render proof](#unchanged-render-proof)
- [Security and size](#security-and-size)
- [Changed paths and rollback](#changed-paths-and-rollback)
- [Remaining review boundary](#remaining-review-boundary)

## Decision requested

Review the hardened non-rendering commercial-copy contract for approval eligibility. Worker disposition remains `needs_review`; this report does not accept the contract, authorize renderer adoption, or authorize preview or production deployment.

Work order: `WO-2026-07-24-BOHO-COPY-CONTRACT-APPROVAL-HARDENING-066`

Starting contract commit: `a201d64a1c74cfb31406a1aa571cd8b3768f569f`

Accepted public-render base: `89cb0982b8f2274a289e8126c9472640a5305011`

## Resolved audit findings

| Accepted audit finding | Hardening result |
|---|---|
| Binding precedence was chronological and not provable | Exact owner order is executable data; chronology and packet-number mutations cannot change selection |
| No semantic-slot resolver or selected-record proof | 1,493 slots each carry one selected record; differing collisions require explicit supersession |
| Current inventory omitted sources and reversed generated reachability | 63-source manifest includes route, metadata, generator, Markdown, generated mirror, and text-bearing public sources with import/build reachability |
| Contextual Analytics claims escaped blocking | 32 contextual claim groups span authored, generator, component, content, and generated sources; exact registry membership is enforced |
| Packet parser omitted structured and multiline values | Eleven required parser formats and relational structures are positive- and negative-tested |
| Dedicated contract gate was absent from normal test and CI | `pnpm test` and the Cloudflare Pages workflow both require `commercial-copy:check` |
| Committed inventory was 16.5 MB and duplicated values | Compact manifest is 43,511 bytes; full 12,004-record detail is generated on demand |

## Precedence proof

The executable order is exactly:

`049 > 045 > 040 > 039 > 038 > 037 > 036 > 035 > 034 > 041 > 047 > 043 > prior`

The collision report contains 190 cross-packet collision groups, 190 selected records, 481 displaced records, and zero unresolved collisions. Seven groups contain differing values; all seven carry explicit supersession data. A mutation that removes the selected record fails. A mutation that removes explicit supersession from a differing collision fails. Reversing packet chronology and inverting legacy numeric packet precedence leaves every selected collision source unchanged.

## Coverage and parser proof

The expected-slot artifact enumerates slot keys for Homepage, Services overview, all five service pages, Pricing, Work/evidence, Contact, Start, Emergency, navigation/footer, forms/states, metadata/schema, visuals/accessibility, routes/fragments, and packet-049 corrections. All 18 categories are present and non-empty.

The parser test fixture covers straight quotes, curly quotes, backticks, bullets, numbered lists, Markdown tables, blockquotes, multiline quoted and unquoted paragraphs, structured fields, metadata, schema, form errors, captions, accessible descriptions, routes, fragments, and multi-token mapping relationships. Removing any required parser format produces a named validation failure.

## Inventory and blocked-copy proof

The current inventory discovers all governed `app` TypeScript/TSX sources, service Markdown, routing JSON, service-data generator, and text-bearing public assets. It follows local imports from page, layout, not-found, robots, and sitemap entrypoints, then adds the explicit service generation path and public-asset path.

The generated service-page mirror is reachable and non-authoritative. The source Markdown and generator are reachable inputs. Required omissions identified by the accepted audit—`app/page.tsx`, `app/not-found.tsx`, catch-all route metadata, glossary term metadata, robots output, and the generator—are present.

The Analytics block remains exact, false, and null-valued. Context detection uses nearby semantic context rather than one-record exact order. It detects public/access/dashboard, free/unpaid, and self-hosted/open-source families. The block registry is compared byte-for-byte with the inventory-derived claim groups.

## Adapter and import-boundary proof

Generated typed adapters exist for 12 page families. Build-time shape checks require all adapter page keys and non-empty selected-slot lists. The blocked Analytics key is separately registered and cannot appear in a page adapter. `validateAdapterRequest()` and the generated runtime guard throw if that key is requested.

Repository import search found zero existing renderer imports of `app/content/commercial`, `commercialCopyContract`, or `adapters.generated`. TypeScript validates the adapters, but no public render path executes them.

## Validation results

| Gate | Result |
|---|---|
| `corepack pnpm run commercial-copy:check` | pass; 15 packets, 1,493 slots, 190 collisions, zero unresolved, 63 sources, one block; 12/12 tests |
| `corepack pnpm exec tsc --noEmit` | pass |
| `corepack pnpm run lint` | pass; zero errors; only pre-existing repository warnings after removal of the one new warning |
| `corepack pnpm test` | pass; contract gate, production-style build, 23/23 rendered/static tests, routes, redirects, artifacts, and crawl |
| Glossary route check | pass; 153 records and pages, zero collisions or unresolved terms |
| Redirect check | pass; 80 generated rules, zero chains or loops |
| Route artifact check | pass; 181 current routes |
| Static crawl | pass; 181 canonical routes, 80 redirect variants, two robots/sitemap checks, zero failures |
| `git diff --check` | pass |
| Forbidden/public-source diff | pass; no changes |

## Unchanged-render proof

The candidate and a separately archived exact `89cb098...` source tree were built using the same existing dependency tree, without package installation. Each produced 184 HTML files.

- Identical relative-path set: yes
- Candidate normalized aggregate SHA-256: `83173841edbeddfb99bc968b4cd13bd801efb2918fea80bbdc7edeb935215c0b`
- Accepted-base normalized aggregate SHA-256: `83173841edbeddfb99bc968b4cd13bd801efb2918fea80bbdc7edeb935215c0b`
- Normalized difference count: `0`

Normalization changed only emitted `/_next/static/chunks/*.(js|css)` filenames and the explicit Next build-ID `b` field, including escaped serialization. No public-output source differs from the accepted base.

## Security and size

The committed compact inventory reports counts without reproducing matches:

| Indicator | Count |
|---|---:|
| Private-key markers | 0 |
| Common token prefixes | 0 |
| Email-shaped values | 18 |
| Absolute URLs | 694 |
| Analytics IDs | 2 |
| Secret-shaped words | 89 |

These are signature counts, not findings. No matched values are serialized in the compact security report.

| Inventory artifact | Bytes |
|---|---:|
| Before hardening | 16,465,785 |
| After hardening | 43,511 |
| Reduction | 16,422,274 bytes / 99.736% |

The contract is 2,036,678 bytes, the collision report 474,169 bytes, and coverage manifest 51,619 bytes. Expected new Git history growth is the compressed representation of these changed blobs, not another 16.5 MB detailed ledger. Exact object-storage growth is recorded after commit.

## Changed paths and rollback

All site changes are limited to the work order’s contract, test, CI, package, and report allowlist. No forbidden path changed.

Rollback after review is an ordinary `git revert` of the work-order commit. Do not reset, rebase, amend, force-push, or rewrite history. The change is non-rendering, so no public deployment rollback is required.

## Remaining review boundary

- ChatGPT must review the exact work-order commit and this report.
- `product.bohoAnalytics.publicFreeAvailability` remains intentionally blocked.
- Renderer adoption requires a separate accepted work order.
- No preview or production deployment occurred.
