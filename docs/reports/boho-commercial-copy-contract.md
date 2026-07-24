# Boho Commercial Copy Contract

## Contents

- [Status](#status)
- [Authority and precedence](#authority-and-precedence)
- [Semantic slots and collisions](#semantic-slots-and-collisions)
- [Parser and coverage](#parser-and-coverage)
- [Current-source inventory](#current-source-inventory)
- [Blocked semantics](#blocked-semantics)
- [Typed adapters](#typed-adapters)
- [Enforcement and rendering boundary](#enforcement-and-rendering-boundary)

## Status

The schema-v2 commercial-copy contract is a non-rendering, exact-source contract for ChatGPT review. It is generated from 15 hash-pinned packet snapshots. Codex has no authority to invent, paraphrase, approve, or replace public wording.

- Accepted public-render base: `89cb0982b8f2274a289e8126c9472640a5305011`
- Contract hardening input base: `a201d64a1c74cfb31406a1aa571cd8b3768f569f`
- Editorial owner: ChatGPT
- Worker public-copy authority: none
- Renderer adoption: not authorized
- Preview or deployment: not authorized

## Authority and precedence

Binding copy precedence is executable data and is independent of packet numbering, chronology, source-array order, and snapshot ordinal:

`049 > 045 > 040 > 039 > 038 > 037 > 036 > 035 > 034 > 041 > 047 > 043 > prior governed sources`

Packets `044`, `046`, `048`, and `014` remain structural authorities and are not inserted into copy precedence. Packet `048` contributes review protocol, not target public records.

Every packet snapshot is checked against its expected SHA-256 before generation or validation. Reordering snapshots or changing their legacy numeric `precedence` property does not change semantic selection.

## Semantic slots and collisions

The contract contains 1,493 semantic slots. Every slot has exactly one selected record carrying packet, exact source location, field, parser format, classification, page key, and any mapping relationship. One removal slot suppresses the ordinary-form Emergency option, leaving 1,492 active selected records.

The machine-readable collision report contains:

| Metric | Count |
|---|---:|
| Total collision groups | 190 |
| Cross-packet exact-duplicate groups | 183 |
| Explicit differing-value semantic collisions | 7 |
| Selected records | 190 |
| Displaced records | 481 |
| Unresolved collisions | 0 |

Differing values cannot resolve from chronology. Each of the seven differing-value collisions has an explicit supersession entry naming the selected source, displaced source locations, stable semantic slot, and selection action.

## Parser and coverage

The parser supports and mutation-tests these formats:

- straight-quoted and curly-quoted values;
- backtick values;
- bullets and numbered lists;
- Markdown tables and blockquotes;
- multiline quoted and unquoted paragraphs;
- structured fields;
- multi-value mapping relationships.

Field-driven classification covers form labels, help and all result states, metadata, schema, captions, accessible descriptions, routes, fragments, CTA destination pairs, and packet-049 correction structures. Negative tests remove each required format and prove the omission fails.

The committed expected-slot manifest enumerates selected slot keys for all required categories. Counts are:

| Category | Selected slots |
|---|---:|
| Homepage | 148 |
| Services overview | 106 |
| Local Visibility service | 56 |
| Websites and Hosting service | 63 |
| Provider Rescue service | 78 |
| Custom Tools service | 50 |
| Research and Analytics service | 49 |
| Pricing | 107 |
| Work and evidence | 104 |
| Contact | 27 |
| Start | 98 |
| Emergency | 132 |
| Navigation and footer | 98 |
| Forms and states | 199 |
| Metadata and schema | 81 |
| Visuals and accessibility | 183 |
| Routes and fragments | 205 |
| Packet-049 corrections | 64 |

No required category is empty or missing.

## Current-source inventory

The committed inventory is a compact deterministic manifest rather than a copy of every current value. It includes hashes, sizes, classifications, import/reachability evidence, public-string counts, contextual blocked-claim hashes, and source provenance for 63 governed inputs.

- Reachable sources: 59
- Authored sources: 59
- Generated mirrors: 1
- On-demand full-detail records: 12,004
- Contextual Analytics claim groups: 32

`app/content/servicePages.generated.ts` is correctly classified as a reachable generated mirror with `editorialAuthority: false`. Its five Markdown inputs and `scripts/generate-service-page-data.mjs` are represented as authored/generator inputs in the real build path.

The full value ledger remains reproducible without being committed:

```sh
node scripts/commercial-copy-build.mjs --check --inventory-detail /tmp/boho-commercial-inventory-detail.json
```

The detailed output has a committed record count and deterministic digest. It is generated only at an explicit local path.

## Blocked semantics

`product.bohoAnalytics.publicFreeAvailability` remains:

- `targetApproved: false`;
- `replacementText: null`;
- blocked pending current product verification.

Contextual detection groups nearby product identity and availability language, including public access, free or unpaid use, dashboard access, self-hosted, and open-source variants. It covers both authored Markdown and the reachable generated mirror. The registry is validated for exact membership; deleting only one claim fails.

No adapter may request the blocked semantic key. The generator and runtime adapter guard both fail closed. No placeholder, synonym, fallback, `coming soon`, `request access`, `free dashboard`, or other substitute status is approved.

## Typed adapters

Small typed adapters are generated for Homepage, Services overview, Pricing, Work/evidence, Contact, Start, Emergency, and each of the five service pages. They select schema-validated records by page key and contain an explicit blocked-slot guard.

No existing renderer imports the contract or generated adapter. The adapters are future integration boundaries only.

## Enforcement and rendering boundary

`commercial-copy:check` performs deterministic regeneration, shape validation, freshness checks, and mutation tests. It is mandatory in both the ordinary `pnpm test` command and the Cloudflare Pages validation workflow before deployable-output acceptance.

The candidate and accepted public-render base each produce 184 HTML files with an identical path set. After the previously accepted normalization of emitted chunk filenames and the explicit Next build-ID field, both sets have aggregate SHA-256:

`83173841edbeddfb99bc968b4cd13bd801efb2918fea80bbdc7edeb935215c0b`

Normalized differences: `0`.

No renderer, current public-copy source, route, form, metadata implementation, public asset, Worker, Cloudflare setting, or deployment changed.
