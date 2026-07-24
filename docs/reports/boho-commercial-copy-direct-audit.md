# Boho Commercial Copy Contract Direct Audit

## Contents

- [Verdict](#verdict)
- [Audit identity and scope](#audit-identity-and-scope)
- [Severity-ranked findings](#severity-ranked-findings)
- [Packet authority and precedence](#packet-authority-and-precedence)
- [Exact critical extract](#exact-critical-extract)
- [Blocked Boho Analytics semantics](#blocked-boho-analytics-semantics)
- [Parser and inventory coverage](#parser-and-inventory-coverage)
- [Validator and mutation-test review](#validator-and-mutation-test-review)
- [Import boundary and unchanged-render proof](#import-boundary-and-unchanged-render-proof)
- [Standard test and CI integration](#standard-test-and-ci-integration)
- [Artifact and repository-history cost](#artifact-and-repository-history-cost)
- [Sensitive-value scan](#sensitive-value-scan)
- [Validation evidence](#validation-evidence)
- [Required follow-up](#required-follow-up)
- [Appendix A: inspected artifacts](#appendix-a-inspected-artifacts)
- [Appendix B: parser detail](#appendix-b-parser-detail)
- [Appendix C: precedence collision analysis](#appendix-c-precedence-collision-analysis)

## Verdict

**REWORK**

The exact packet-049 correction structure is substantially sound: its snapshot hash recomputes exactly, its four-path Contact correction is present, ordinary and Emergency inquiry semantics are separated, seven evidence classes and four artifact assignments are structured, glossary evidence is future-safe, one canonical `$95/month` product owns both pricing anchors, and the named Boho Analytics availability record is blocked with no replacement text.

The candidate commit itself is non-rendering. The contract adapter has no application consumer, the pre-existing service-page generator/import path is unchanged from the accepted render base, and the prior normalized 184-file HTML comparison is credible within its stated scope.

It is not acceptance-grade as a governing copy contract. The audit found one Blocker (Critical in the live manager’s terminology) and three High defects:

1. **Blocker / manager-Critical:** the installed chronological `packetOrder` conflicts with the manager’s binding WO042 order, and the builder has no general semantic-slot resolver or selected-record proof;
2. **High:** the current inventory omits public sources and misstates reachability for the generated service-page path, allowing contextual Analytics claims to evade blocking;
3. **High:** target parsing omits exact governed values/provenance, drops relationships, and materially misclassifies records;
4. **High:** the contract gate is not part of the standard test command or GitHub Actions.

Packet 048 says High findings require rework before acceptance. This report records defects only; it does not modify the contract, renderer, public copy, forms, routes, assets, or deployment.

## Audit identity and scope

| Field | Value |
|---|---|
| Work order | `WO-2026-07-24-BOHO-COPY-CONTRACT-AUDIT-R2-065` |
| Requested model | `gpt-5.6-sol` |
| Reasoning | `high` |
| Audited commit | `265f596c099c8ec7bbb454ed9d1c4eedec50f09f` |
| Accepted render base | `89cb0982b8f2274a289e8126c9472640a5305011` |
| Starting branch | `main` |
| Starting local/origin state | clean; both exact audited commit after fetch |
| Public/source repair authorized | no |
| Deployment authorized | no |

The audit read actual Git blobs and source, not only `docs/reports/boho-commercial-copy-contract.md`. It inspected:

- the four installed commercial JSON artifacts;
- the TypeScript adapter and contract types;
- the complete 621-line builder;
- all 11 test blocks (10 mutation blocks plus one positive invariant block);
- package scripts;
- the complete GitHub Actions workflow;
- application import references;
- source-packet snapshots, especially packets 048 and 049;
- current application and content sources relevant to inventory coverage;
- base-to-candidate path differences;
- Git object/history size;
- the prior normalized-render evidence and its command log.

Machine-readable values and measurements are in `boho-commercial-copy-critical-extract.json`.

## Severity-ranked findings

### B1 — Binding packet precedence is not implemented or provable

The manager’s binding WO042 final copy order is:

`049 > 045 > 040 > 039 > 038 > 037 > 036 > 035 > 034 > 041 > 047 > 043 > prior lock/audit/deck/evidence/visual`

Structural authorities are separately identified as packets 044, 046, 048, and 014. The installed bundle instead assigns chronological numeric precedence 1–15:

`021 < 022 < 034 < 035 < 036 < 037 < 038 < 039 < 040 < 041 < 043 < 045 < 047 < 048 < 049`

These orders disagree below packet 049: for example, binding order puts 045 above 040, 041 below 034, and 047 below 041, while the installed numeric order does the reverse. Packet 048 is a structural review protocol, yet it occupies numeric copy precedence 14.

`extractTargetRecords()` appends records packet by packet. It does not define semantic slot identities, group competing values by slot, choose a winning record, or record `resolvedFrom`. The validator proves only the numeric array order, that packet 049 is last, and that 12 hard-coded superseded source locations are absent. `buildCorrections()` separately reconstructs known packet-049 fields by fixed line numbers, so those specific corrections pass without proving the general precedence contract.

The installed target has 151 exact-value collision groups spanning 468 records and more than one packet. Their complete value/packet/location enumeration is in the machine extract under `packetPrecedence.exactValueCollisionGroups`. Because each group contains identical text, binding-order choice would preserve the text but still governs provenance. The builder retains every record and selects none. Different-value semantic collisions cannot be exhaustively enumerated because the schema has no semantic-slot key—the exact reason a winning record cannot be proved.

Impact: downstream migration cannot establish which source governs a semantic slot. Packet 048 calls this severity `Blocker`; the live manager’s added instruction calls its impact Critical. This directly fails the live manager requirement to prove every selected collision follows binding order.

### H1 — Current inventory and blocked-claim reachability are not complete

`CURRENT_SOURCE_ROOTS` covers `app/Homepage.tsx`, `app/components`, `app/content`, `app/layout.tsx`, `app/sitemap.ts`, service Markdown, and routing JSON. It does not cover every public source. The committed inventory has zero records for:

- `app/page.tsx` — public homepage title and description at lines 7 and 10;
- `app/not-found.tsx` — visible and action copy at lines 24, 27, 31–36, and 40–41;
- `app/[...slug]/page.tsx` — fallback route metadata at line 53;
- `app/learn/glossary/[term]/page.tsx` — generated public title at line 35;
- `app/robots.ts` — public route output and canonical host values;
- `scripts/generate-service-page-data.mjs` — governed `CONTENT_OVERRIDES` that rewrite public service-page copy.

The last omission is a live render-boundary defect, not merely internal tooling. `package.json` runs the generator before both builds; `app/content/serviceRoutePages.ts:1` imports `servicePages.generated.ts`; and `app/[...slug]/page.tsx:80-81` renders the imported page data. Yet the inventory marks raw service Markdown `currentlyRendered: true` and the generated values `currentlyRendered: false` solely because the filename contains `.generated.`.

This breaks blocked Analytics semantics. The raw Markdown at lines 55–63 composes an availability offer across a heading, access description, “without paying” sentence, and price line. The generated public data at lines 2740, 2748, and 2756 similarly composes the product name, no-payment claim, and free price across three records. The record-local predicate requires `Boho Analytics Platform` and `free|without paying` in the same exact value, so these contextual claims remain `preserve-exactly-in-this-phase`. Only generated line 2744 is blocked in that region.

The code parser also ignores template literals. Omitted public or accessibility-facing examples include `BrandPreviewCarousel.tsx:25`, `DefinitionTerm.tsx:198,220`, `DesktopNavigation.tsx:74`, the listed `IndustryVisuals.tsx` labels, and `SectionNavigation.tsx:117,180`. It cannot join multi-line JSX or nested JSX text.

Impact: a migration can preserve or introduce unsourced public copy and a contextual blocked availability claim while validation remains green.

### H2 — Target parsing omits values and provenance, loses relationships, and misclassifies records

The generic parser skips packets 021 and 022 entirely because their `editorialAuthority` is `chatgpt` and precedence is below 3. For later packets it accepts only a whole-line backtick value (optionally one list marker), plus whole-line curly quotes for packet 034 alone. It does not parse generic curly-quoted copy, multi-token mappings, inline values, backtick headings, multi-line quoted values, or Markdown tables.

The backtick coverage metric is intentionally narrow:

| Measure | Count |
|---|---:|
| Backtick-bearing lines in packets 034–049 excluding protocol 048 | 1,289 |
| Backtick-bearing source locations represented | 1,206 |
| Unmatched backtick-bearing lines | 83 |
| Backtick tokens on those lines | 141 |
| Unique unmatched-line tokens | 92 |
| Those narrow backtick tokens absent from all target records | 0 |
| Packet-034 curly-quote records | 27 |
| Total target records | 1,233 |

That zero applies only to tokens found by the backtick probe; it is not proof of packet-value completeness. Exact governed values entirely absent from target records include packet 022 lines 70, 110, 116, and 130; packet 035 line 31; and packet 040 line 14. Later packets contain related but materially different variants, not exact matches. Packets 021/022 therefore cannot serve as the claimed global authority within the generic record set.

Relationships are also lost: packet 039 label→route pairs, packet 045 alias mappings, packet 049 artifact→source-class pairs, the price-family/canonical-anchor declaration, and the compatibility alias are not modeled by generic records. Critical packet-049 relationships survive only because `buildCorrections()` hard-codes line numbers into a parallel structure.

Classification is materially wrong:

- packet 040 has 12 route and 60 `schema` records but zero `metadata`; the surface name `metadata-schema` triggers schema before field-specific metadata logic;
- packet 049 line 35 is `form-state` while the remaining five inquiry options are `visible-text`;
- packet 049 line 65 is `route` while the remaining six source classes are `evidence`.

The validator checks global existence, not packet/field/value classification correctness.

Impact: downstream consumers cannot safely rely on completeness, provenance, classification, route linkage, or reported surface counts.

### H3 — The commercial-copy gate is absent from normal CI

`package.json` defines:

`commercial-copy:check = node scripts/commercial-copy-build.mjs --check && node --test tests/commercial-copy-contract.test.mjs`

The standard `test` script does not call it. The GitHub Actions workflow separately runs TypeScript, build, rendered HTML tests, route checks, artifact checks, and the static crawl, but never runs `commercial-copy:check` or `tests/commercial-copy-contract.test.mjs`.

Impact: a main-branch change can break packet hashes, generated-artifact freshness, packet-049 corrections, mutation-tested invariants, or blocked-copy semantics while the repository’s standard test and CI remain green.

### M1 — Intentional-block validation is only partially semantic

The direct validator catches a missing blocked item, mismatched status/reason/approval/replacement, the absence of every record-local matching current claim, a matching current claim whose disposition/key is wrong, target records matching the narrow predicate, and three named invented phrases.

It does **not** compare `blocked.items[0].currentClaims` with the inventory-derived set. Direct in-memory mutations produced zero findings after:

- removing one registry claim;
- removing one matching inventory record (11 remained);
- clearing `sourceLocations`;
- clearing the top-level policy.

The matcher is record-local and order-sensitive: it requires `Boho Analytics Platform` before `free` or `without paying` in one value. It misses the context-composed Markdown and generated public claims described in H1.

CLI `--check` would catch committed derived-artifact drift by serialized regeneration, but that is not a semantic invariant. The existing test file has 11 test blocks: one positive invariant and 10 mutation blocks. None tests binding precedence, skipped packets 021/022, generated render reachability, context-composed claims, or partial inventory deletion.

### M2 — Artifacts duplicate large amounts of repository and operational text

The four current JSON artifacts total 17,609,214 bytes:

| Artifact | Bytes |
|---|---:|
| `blocked-copy.json` | 5,632 |
| `commercial-copy-contract.json` | 954,975 |
| `current-target-inventory.json` | 16,465,785 |
| `source-packets.json` | 182,822 |

Inventory duplication:

| Inventory | Records | Unique exact values | Duplicate records |
|---|---:|---:|---:|
| Current | 22,994 | 7,574 | 15,420 |
| Target | 1,233 | 899 | 334 |

Across the contract-related paths and both contract commits, Git holds 17 unique historical blobs totaling 35,232,665 logical bytes and 2,034,613 on-disk object bytes in the present object store. The logical cost is permanent repository history unless an independently approved history rewrite occurs.

The current inventory is not limited to public copy. It collects code literals, keys, routes, URLs, metadata, generated duplication, and operational identifiers. This broad collection increases review noise and creates an unnecessary duplication/exposure surface.

### L1 — Normalized equality does not compare emitted chunk or asset bytes

The prior proof built the exact accepted base and corrected candidate, compared the complete 184-HTML-file path set, normalized emitted JS/CSS chunk filenames and the Next build-id field, and found zero normalized HTML differences with aggregate SHA-256:

`9270ab65e394f070ae19dc3889f8282b5f513624a91fb9e19169ac2c2496f724`

That proves normalized HTML equality, not byte equality of emitted JS, CSS, images, or other assets. Normalizing chunk names can mask a changed chunk reference unless chunk bytes are compared separately.

The conclusion that this commit did not change rendering is nevertheless credible because independent Git inspection found:

- no application consumer of `commercialCopyContract`;
- no base-to-candidate difference in application renderers or current public-copy sources;
- no dependency or lockfile change;
- only a package-script addition outside the contract/report/test files.

## Packet authority and precedence

The installed bundle contains 15 chronologically ordered packets. Packet 048 is a structural `review-protocol`; packet 049 is installed at numeric precedence 15.

Packet 049 independently hashes to:

`abbcbeb66fc5b44847069eeaf00a97d875b5389d1790373cb5f7a7c78ab12862`

This matches `source-packets.json`, `EXPECTED_PACKET_HASHES`, `commercial-copy-contract.json.packetOrder`, and the generated report. Its explicitly sourced correction structure passes.

The global precedence claim does **not** pass. The installed numeric order differs from WO042’s binding final order, and the builder has no generic collision resolver. See B1 and Appendix C.

## Exact critical extract

### Five approved service names

| Exact value | Primary source |
|---|---|
| `Local Visibility & Lead Systems` | packet 035 line 44 |
| `Websites & Managed Hosting` | packet 035 line 111 |
| `Provider Rescue & Migration` | packet 035 line 191 |
| `Custom Tools & Automation` | packet 035 line 327 |
| `Research, Analytics & Improvement` | packet 035 line 261 |

### Eleven approved price strings

| Exact value | Primary source |
|---|---|
| `Initial public review — Free` | packet 037 line 72 |
| `SEO reporting — Starting at $95 per month` | packet 049 line 129 |
| `SEO implementation — Starting at $450 per month` | packet 037 line 106 |
| `Focused website improvement — Starting at $750` | packet 037 line 123 |
| `New website — Starting at $1,500` | packet 037 line 140 |
| `Substantial redesign — Starting at $1,500` | packet 037 line 157 |
| `Provider Rescue Assessment — Starting at $350` | packet 037 line 174 |
| `Migration assistance — Starting at $1,000` | packet 037 line 191 |
| `Focused audit or strategy — Starting at $350` | packet 037 line 208 |
| `Custom discovery — Starting at $500` | packet 037 line 225 |
| `Focused custom build — Starting at $2,500` | packet 037 line 242 |

### Contact and Emergency correction

Packet 049 line 18 supplies:

`One contact page. Four different reasons to use it.`

Lines 20–25 define four paths: project/review, general question, website issue, and emergency website help.

The ordinary inquiry options are exactly, in order:

1. `Local Visibility & Lead Systems` — line 35
2. `Websites & Managed Hosting` — line 36
3. `Provider Rescue & Migration` — line 37
4. `Custom Tools & Automation` — line 38
5. `Research, Analytics & Improvement` — line 39
6. `Not sure yet` — line 40

`Emergency Website Help` at line 31 is the removed ordinary-form option. `automaticEmergencyRedirect` is exactly `false`.

The separate Emergency block is:

- eyebrow `Active website incident` — line 45;
- heading `Is the website actively failing?` — line 48;
- body beginning `Use the Emergency page for a verified urgent website...` and ending `The standard inquiry does not receive emergency priority.` — line 51;
- link label `Emergency Website Help` — line 54;
- destination `/emergency/` — line 57.

The JSON extract carries the exact full body.

### Evidence vocabulary and assignments

The seven exact source classes from packet 049 lines 65–71 are:

1. `Boho-owned property`
2. `Boho-owned technical record`
3. `Public repository or tool`
4. `Sample document`
5. `Synthetic demonstration`
6. `Fictional concept interface`
7. `Client work published with permission`

The exact technical-record definition and limitation are structured from lines 78 and 81.

The four corrected assignments are:

| Artifact | Source class | Packet 049 |
|---|---|---|
| `Boho Analytics website graph` | `Boho-owned property` | line 93 |
| `Rank Builder publishing and citation system` | `Boho-owned property` | line 94 |
| `Vanity Metrics URL recovery and redirect record` | `Boho-owned technical record` | lines 96, 98 |
| `Glossary route and static-crawl validation` | `Boho-owned technical record` | lines 96, 99 |

### Historical glossary status

| Field | Exact value | Source |
|---|---|---|
| Current status | `Accepted repository foundation; production deployment remains a separate release decision` | packet 049 line 107 |
| Label | `Accepted foundation commit` | line 112 |
| Value | `89cb0982b8f2274a289e8126c9472640a5305011` | line 115 |
| Label | `Glossary route count at acceptance` | line 118 |
| Value | `153` | line 121 |

Line 123 explicitly makes the commit a historical evidence reference rather than a claim that it is the latest site commit.

### Canonical reporting product

The contract has exactly one product:

- key: `product.seoReporting.monthly`;
- exact price: `SEO reporting — Starting at $95 per month`;
- price family: `Local Visibility & Lead Systems`;
- canonical anchor: `/pricing/#ongoing-seo`;
- compatibility alias: `/pricing/#analytics-reporting`.

Both anchors map to the same product key. Seven governed `$95` references map to that product:

- packet 035 line 54;
- packet 036 line 89;
- packet 037 line 89;
- packet 041 line 152;
- packet 045 line 46;
- packet 049 lines 129 and 147.

## Blocked Boho Analytics semantics

The blocked record itself is exact:

| Field | Value |
|---|---|
| Key | `product.bohoAnalytics.publicFreeAvailability` |
| Status | `Blocked pending current product verification` |
| Reason | `The current repository contains the claim, but the commercial V3 program has not yet verified a stable public access contract or current product boundary.` |
| Target approved | `false` |
| Replacement text | `null` |
| Source | packet 049 lines 175, 178, 181 |

The registry maps 12 record-local matches at the documented source locations. Each has disposition `blocked-pending-current-product-verification` and the correct blocked key. No target record matches the same narrow predicate.

That is not exhaustive semantic blocking. Raw Markdown lines 55–63 and generated public-data lines 2740/2748/2756 compose the product identity, no-payment/free availability, and price across separate records. They remain unblocked. Generated line 2744 is blocked, demonstrating inconsistent coverage inside one rendered section.

The source locations, status, reason, `false` approval, null replacement, and non-target approval are exact. The claim that all current availability semantics are blocked is **not verified**.

## Parser and inventory coverage

### Target packet parser

Supported today:

- whole-line backtick values;
- whole-line list items containing one backtick value;
- packet-034 whole-line curly-quoted values;
- label and heading context carried from nearby Markdown;
- heuristic classification and route inference;
- a small hard-coded map for known CTA destinations.

Not supported:

- multi-line exact values;
- multiple backtick values and their relationship on one line;
- Markdown headings whose value is in backticks;
- Markdown tables;
- fenced blocks;
- arbitrary inline copy;
- a typed grammar for forms, metadata, schema, alt/accessibility, or routes.

List coverage is partial: values are captured, but only the first item retains the list label. Tables and fences do not occur in the current editable packet set, so no current lines are missed for those two formats.

### Form coverage

Form values are classified by nearby words such as `form`, `field`, `placeholder`, `consent`, `success`, `failure`, `network`, or `option`. The validator requires some form record whose section/field mentions each of success, failure, rate limit, and network.

It does not prove every form, field, option, hint, error, accessible association, or state was extracted. Packet 049’s six ordinary options demonstrate inconsistent list classification.

### Metadata and schema coverage

Values from packet 040 are present but semantically mislabeled:

- 12 canonical routes: `route`;
- 60 SEO, description, Open Graph, and schema strings: all `schema`;
- packet-040 `metadata`: zero.

The contract’s total 12 metadata records come from packets 037, 038, 039, and 047. Therefore the global “metadata exists” test passes while the dedicated metadata packet is wrongly classified.

### Alt, accessibility, and figure coverage

Packet 043 contributes 164 records:

- 27 `accessible-text`;
- 137 `figure`.

The parser does capture whole-line accessible descriptions, captions, figure titles, stage labels, and other diagram text. It does not parse relational structure beyond section/field heuristics, and current-source template-literal accessible names remain absent from the current inventory.

### Route coverage

Packet 045 contributes 45 records classified as routes. Backtick headings and inline alias declarations are not target records, even when their tokens appear elsewhere. Packet 039’s label→route pairs are similarly not represented as paired records. Known CTA destinations are supplemented by a hard-coded map rather than derived comprehensively.

### Current-source parser

For TypeScript, TSX, and JSON, inventory extraction scans single/double-quoted literals and same-line plain JSX. It misses template literals, multi-line/nested JSX, and the generator script. Markdown becomes one record per nontrivial physical line, so contextual claims are not reconstructed.

`currentlyRendered` is a filename heuristic: every non-generated source is true and every `.generated.` source is false. That inverts the service-page path. Raw Markdown is treated as rendered even though the build applies `CONTENT_OVERRIDES`; generated page data is treated as not rendered even though `serviceRoutePages.ts` imports it and the dynamic route renders it.

## Validator and mutation-test review

The test file has 11 blocks: one positive invariant block and 10 mutation blocks. All 11 passed; direct run result was 11 passed, 0 failed, approximately 123 seconds.

Covered mutations include packet hashes, keys, unsupported claims, service names/prices, coarse classification presence, Contact/Emergency structure, packet-049 evidence taxonomy, glossary status, the `$95` product/alias, and narrow Analytics substitutes.

Not covered: WO042 binding precedence; semantic-slot collision selection; skipped 021/022 values; exact packet-specific classification; generated render reachability; context-composed Analytics claims; or deletion of one among multiple inventory-derived blocked claims.

Direct in-memory validation confirmed partial deletion is invisible: removing one of 12 matching inventory claims left 11 and returned zero findings. Registry-claim deletion, cleared source locations, and cleared policy also returned zero. Approval mutation was caught.

`--check` remains a strong freshness gate because it regenerates and compares serialized JSON. It proves reproducibility of the current parser, not completeness or semantic correctness.

## Import boundary and unchanged-render proof

`app/content/commercial/contract.ts` imports the JSON and exports `commercialCopyContract`. Repository search found no other application, Worker, build, script, or test consumer of that export.

The base-to-candidate diff contains:

- `app/content/commercial/contract.ts`;
- `app/content/commercial/types.ts`;
- four commercial JSON artifacts;
- the generated contract report;
- the builder;
- mutation tests;
- one `package.json` script addition.

No renderer, public-copy source, generator, form implementation, route implementation, asset, Worker, dependency, lockfile, or CI workflow differs from the accepted render base. The service-page generator/import path is real and public, but it predates this contract commit; the defect is inventory modeling, not a new render change.

Independent evaluation:

- No-import boundary: **PASS**.
- Current renderer/public-source unchanged: **PASS**.
- Prior normalized HTML equality: **PASS within HTML-normalization scope**.
- Full static chunk/asset byte equality: **not demonstrated**.
- Overall unchanged-render conclusion for this commit: **credible and sufficient** because no renderer input, generator, or import edge changed.

## Standard test and CI integration

| Gate | Commercial check included? |
|---|---|
| `corepack pnpm run commercial-copy:check` | yes; it is the dedicated gate |
| `corepack pnpm run test` | no |
| `.github/workflows/validate-cloudflare-pages.yml` | no |
| TypeScript | typechecks adapter/types but does not execute contract invariants |

The previous generated report’s wording that existing tests and full integration passed is historical validation evidence, not ongoing CI enforcement.

## Artifact and repository-history cost

The largest artifact is `current-target-inventory.json` at 16,465,785 bytes and 393,839 lines. It contains 22,994 records but only 7,574 unique exact values; 15,420 records repeat a value already present.

The contract is 954,975 bytes. The packet snapshot bundle is 182,822 bytes. Because packet content and current values are copied into generated JSON, future corrections rewrite large blobs even for small logical changes.

Git measurement for all history reachable through the contract-related paths:

- 17 unique historical blobs;
- 35,232,665 logical bytes;
- 2,034,613 object-storage bytes in the current object database.

The repository itself currently has 332.89 MiB in packs and 38.68 MiB loose, but those whole-repository values are not attributed solely to this contract.

## Sensitive-value scan

The scan reports counts without reproducing matches. Scope was the four commercial JSON artifacts. Whole-file signatures were:

- private key: `/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g`;
- common token prefixes: `/\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,})\b/g`.

Both counts were zero.

Record-level inventory regexes and counts:

| Indicator regex | Current | Target |
|---|---:|---:|
| `/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i` | 15 | 13 |
| `/https?:\/\//i` | 682 | 3 |
| `/https?:\/\/\S+\?/i` | 5 | 0 |
| `/\b(?:G-[A-Z0-9]{6,}|UA-\d+-\d+)\b/i` | 2 | 0 |
| `/\b(?:NODE_ENV|PUBLIC_ORIGIN|NEXT_PUBLIC_[A-Z0-9_]+|CLOUDFLARE_[A-Z0-9_]+)\b/i` | 0 | 0 |
| `/\b(?:secret|password|token|api[_-]?key|credential)\b/i` | 79 | 1 |

Each count is `records.filter(record => regex.test(record.exactValue)).length`. These are indicators, not findings that values are secrets, and a signature scan cannot prove absence. The broad inventory duplicates operational identifiers and should not be treated as a public artifact.

## Validation evidence

| Command/evidence | Result |
|---|---|
| Start `git status --short --branch` | clean `main...origin/main` |
| `git fetch origin --prune` | pass |
| Start `git rev-parse HEAD` | exact `265f596c099c8ec7bbb454ed9d1c4eedec50f09f` |
| Start `git rev-parse origin/main` | exact same commit |
| Both ancestry directions | pass |
| Packet-049 extracted content `sha256sum` | exact expected hash |
| `corepack pnpm run commercial-copy:check` | pass; 15 packets, 1,233 target, 22,994 current, 1 blocked |
| Direct `node --test tests/commercial-copy-contract.test.mjs` | 11/11 pass |
| `corepack pnpm exec tsc --noEmit` | pass |
| Direct block-registry adversarial mutations | approval caught; registry claim, partial inventory claim, source-location, and policy deletions returned zero findings |
| Import graph search | zero application consumers |
| Base-to-candidate renderer/public-copy diff | zero; package script is the only non-contract path change |
| `git diff --check` before report | pass |
| Sensitive scan | reproducible regexes reported; zero private-key markers and zero common token prefixes |

No standard test, build, browser test, preview, deployment, Cloudflare, DNS, credential, billing, or production action was run or changed by this audit.

## Required follow-up

Before accepting the contract or using it as the migration source:

1. Implement WO042’s binding order separately from chronological display order; introduce semantic slot keys, a deterministic resolver, and selected-record provenance.
2. Add exhaustive collision tests, including a failing mutation where chronological and binding order disagree.
3. Replace or augment regex extraction with an explicit packet grammar that includes packets 021/022 and preserves multi-value relationships.
4. Model the real generated service-page build/import path and derive render reachability instead of inferring it from filenames.
5. Expand source discovery to every public route and metadata source; parse template literals and multi-line/nested JSX conservatively.
6. Make classification field-driven and test exact packet-specific classifications.
7. Make blocked-claim detection semantic/contextual and validate exact registry membership, source locations, and policy.
8. Wire `commercial-copy:check` into standard `test` and GitHub Actions.
9. Reduce generated duplication and retain a non-disclosing committed-inventory secret scan.

Do not begin renderer migration from this `REWORK` verdict. Do not repair findings inside this audit commit.

## Appendix A: inspected artifacts

Primary contract artifacts:

- `content/commercial/source-packets.json`
- `content/commercial/commercial-copy-contract.json`
- `content/commercial/current-target-inventory.json`
- `content/commercial/blocked-copy.json`
- `app/content/commercial/contract.ts`
- `app/content/commercial/types.ts`
- `scripts/commercial-copy-build.mjs`
- `scripts/generate-service-page-data.mjs`
- `app/content/servicePages.generated.ts`
- `app/content/serviceRoutePages.ts`
- `app/[...slug]/page.tsx`
- `tests/commercial-copy-contract.test.mjs`
- `docs/reports/boho-commercial-copy-contract.md`
- `package.json`
- `.github/workflows/validate-cloudflare-pages.yml`

Coverage and import evidence included the complete tracked `app` tree, service Markdown, routing registries, relevant Git history, and the canonical Local1 correction report/log for work order 063.

Artifact SHA-256 values at the audited commit:

| Artifact | SHA-256 |
|---|---|
| `blocked-copy.json` | `336f9262f7cf318f5685b9ac668e1de8e0b82790b3574ccdf898a693a2ac4853` |
| `commercial-copy-contract.json` | `961688e779f829af95407d449045ecd960748700960729143b71c661e1492d90` |
| `current-target-inventory.json` | `462f8dd1975649749b5779856ea540e70ce123bcfea7c259702e8eedd6479427` |
| `source-packets.json` | `ef6653fb1f9de88c43a1e5c3fb7c2f4a78e9cab7ad460f59af25fb0bfab2d63c` |
| `types.ts` | `443e88b5845e20872b22bcaaa1e217f90fdfbf18e0b2deaf8e6c5c56f3831f18` |
| `commercial-copy-build.mjs` | `a85bd79a476bb6dc767b808d73d982a32ef53c01892a1f806a3e79b35ad78a44` |
| `commercial-copy-contract.test.mjs` | `af708803a679ce2b83ad0f92e15ce2292ee40adcda8410e7f55bf7d2bb364142` |

## Appendix B: parser detail

Representative unmatched likely-copy or relation-bearing packet locations:

- packet 039: `14-20`, `24`, `33-37`, `48-51`, `525-550`, `560-561`;
- packet 045: `32`, `40`, `48`, `56`, `72`, `80`, `94`, `108`, `164`, `180-181`;
- packet 049: `93-96`, `105`, `131`, `155`, `175`, `178`, `181`.

Other unmatched lines are governance, prohibited/superseded wording, or references whose exact tokens recur in captured records. The full machine-readable audit records the grouped locations and counts without pretending every unmatched line is intended public output.

Present construct coverage:

| Construct | Current packet content | Generic parser support | Audit result |
|---|---:|---:|---|
| Whole-line backtick value | yes | yes | values captured |
| Single-value list item | yes | partial | value captured; list label only retained for first item |
| Multi-token mapping line | yes | no | relation lost |
| Curly-quoted packet-034 value | yes | packet 034 only | 27 captured |
| Inline prose backticks | yes | no | token may recur elsewhere; relation/governance not modeled |
| Backtick heading | yes | no | heading/alias relation lost |
| Multi-line exact value | no identified binding instance | no | unsupported |
| Markdown table | no | no | unsupported future input |
| Fenced block | no | no | unsupported future input |
| Form state | yes | heuristic only | existence tested, completeness not proven |
| Metadata/schema | yes | heuristic only | packet 040 materially mislabeled |
| Alt/accessibility | yes | heuristic only | packet values captured; current template literals omitted |
| Route/fragment | yes | heuristic plus hard-coded CTA map | values present; some relationships lost |


## Appendix C: precedence collision analysis

Binding final copy order from WO042:

`049 > 045 > 040 > 039 > 038 > 037 > 036 > 035 > 034 > 041 > 047 > 043 > prior lock/audit/deck/evidence/visual`

Separate structural authorities: `044`, `046`, `048`, `014`.

Installed chronological order:

`021 < 022 < 034 < 035 < 036 < 037 < 038 < 039 < 040 < 041 < 043 < 045 < 047 < 048 < 049`

Exact-value grouping found 151 groups, 468 records, and more than one source packet per group. The complete enumeration—including exact value, every record key/source packet/source location, binding-highest packet, and the explicit `null` selected record—is in `boho-commercial-copy-critical-extract.json.packetPrecedence.exactValueCollisionGroups`.

No group has a resolver-selected record because the builder appends all records. The 12 `SUPERSEDED_TARGET_LOCATIONS` and hard-coded packet-049 correction reconstruction cover named exceptions only. Semantic collisions with different text cannot be exhaustively grouped because records lack semantic-slot identity; that is a Blocker audit failure (Critical under the live manager instruction), not evidence that such collisions are absent.
