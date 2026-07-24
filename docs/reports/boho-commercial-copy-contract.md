# Boho Commercial Copy Contract Report

## Contents

- [Summary](#summary)
- [Authority and precedence](#authority-and-precedence)
- [Artifacts and counts](#artifacts-and-counts)
- [Inventory coverage](#inventory-coverage)
- [Validation](#validation)
- [Unchanged-render evidence](#unchanged-render-evidence)
- [Blocked copy](#blocked-copy)
- [Review boundary](#review-boundary)

## Summary

This isolated review branch adds a non-rendering, typed commercial-copy contract derived mechanically from exact ChatGPT-authored packet snapshots. The contract is not imported by any renderer. No current public-copy source, route, form, metadata implementation, stylesheet, public asset, Worker, or deployment configuration changed.

Exact base: `89cb0982b8f2274a289e8126c9472640a5305011`

Review branch: `work/wo-2026-07-24-boho-commercial-copy-contract-042`

Candidate: the single commit for `WO-2026-07-24-BOHO-COMMERCIAL-COPY-CONTRACT-042`; its exact hash is recorded in the canonical Local1 exit report because a commit cannot contain its own hash.

Editorial owner: ChatGPT

Codex public-copy authority: none

Zero-worker-copy attestation: Codex authored zero public-facing strings. Target values are mechanically extracted only from whole-line backtick or curly-quoted values in the binding packet snapshots. Technical keys, classifications, validation messages, and this internal report are not public copy and are not imported by the application.

## Authority and precedence

The original ten packets were applied in the work-order order. Four later ChatGPT queue amendments were then applied for visual/accessibility, route compatibility, Emergency, and direct review. Later numbered packets resolve their specific surfaces more completely; packets 021 and 022 govern all surfaces. Packet 048 is a review protocol and supplies no target public values.

| Precedence | Packet | Surface | SHA-256 |
|---:|---|---|---|
| 1 | `WO-2026-07-23-BOHO-CHATGPT-VERBATIM-COPY-LOCK-021` | global governance | `d740f45347413eb187b54ab871b6aa7bd1d147c79d56d682acfa065bc2b7f8c2` |
| 2 | `WO-2026-07-23-BOHO-CHATGPT-EDITORIAL-SELF-AUDIT-V2-022` | global governance | `4647401a4ef8bc252495f3e61505c25f8e9729aca86bad27266cb9b372e6f6c9` |
| 3 | `WO-2026-07-24-BOHO-CHATGPT-TIMELINE-COPY-034` | timelines | `50b5841db45ecd0d20bfd01cdfa91317fbcd25d7d18c2a5d8f0164957a5ebd5e` |
| 4 | `WO-2026-07-24-BOHO-CHATGPT-SERVICE-COMMERCIAL-LAYERS-035` | five service pages | `91a8f6ad3556475af0b8b58571e3f82cb10be0908e3f895843906d7176f57870` |
| 5 | `WO-2026-07-24-BOHO-CHATGPT-HOMEPAGE-COPY-036` | homepage | `6ff8281592d820c3634451f2fcf5e6f2937bd6a9b4e43527f29bfe866190a81b` |
| 6 | `WO-2026-07-24-BOHO-CHATGPT-PRICING-COPY-037` | Pricing | `0655e36e578c20de60e8312927c72c01e0b7c1669af6171575a3236b86370cef` |
| 7 | `WO-2026-07-24-BOHO-CHATGPT-WORK-EVIDENCE-COPY-038` | Work/evidence | `86f5fbaef1ad07615524cb0e7b371f370cdb21599bf877aa967c2d45ae70f965` |
| 8 | `WO-2026-07-24-BOHO-CHATGPT-CONTACT-NAV-FOOTER-COPY-039` | Contact, Start, navigation, footer, forms | `1d0096a30d203c286bea5ff2061e629ad650d364fe19d139d7790acb25459169` |
| 9 | `WO-2026-07-24-BOHO-CHATGPT-COMMERCIAL-METADATA-040` | metadata/schema | `748fd1b6e19ec82d35ad7bba8bafda83a37bf52e9e9cdd68d2d51dec2352290e` |
| 10 | `WO-2026-07-24-BOHO-CHATGPT-SERVICES-OVERVIEW-COPY-041` | Services | `c835a97d9e4d295cf95c46765c8be9f692c6b846c4c8353c4271da0bdaea784b` |
| 11 | `WO-2026-07-24-BOHO-CHATGPT-VISUAL-ACCESSIBLE-COPY-043` | diagrams, figures, captions, alt/accessibility text | `0858e855678571c414d0a31c66f934afca6391ef591bfabc338b8cbcea6a4064` |
| 12 | `WO-2026-07-24-BOHO-ROUTE-ANCHOR-COMPATIBILITY-045` | routes/fragments | `47d94f4a6f5e00bba2cf9ade9cc4e3c13d400421117639ec5051752812839d1f` |
| 13 | `WO-2026-07-24-BOHO-CHATGPT-EMERGENCY-COPY-047` | Emergency and Emergency form | `5a01517f2dc9302cda0dd4642b5bcff848037fe47b145e712311d6e3c5e51c67` |
| 14 | `WO-2026-07-24-BOHO-CHATGPT-DIRECT-REVIEW-PROTOCOL-048` | direct-review protocol | `12b7575baa750ea11630496aa21b6c78207794d4ad1480e9d28331e8d79dc482` |

## Artifacts and counts

- Packet snapshots: 14, with content, order, source file, line count, and SHA-256.
- Target contract records: 1,203.
- Current inventory records: 22,994 across 54 source files.
- Target inventory records: 1,203 across 11 value-bearing packets.
- Blocked-copy records: 0.
- Approved service-name values: exactly 5.
- Approved price strings: exactly 11.

Target records by surface:

| Surface | Records |
|---|---:|
| Timelines | 27 |
| Five service pages | 178 |
| Homepage | 144 |
| Pricing | 99 |
| Work/evidence | 103 |
| Contact/Start/navigation/footer/forms | 138 |
| Metadata/schema | 72 |
| Services | 104 |
| Visual/accessibility | 164 |
| Route/fragment compatibility | 45 |
| Emergency | 129 |

Target records by classification: visible text 336; actions 22; navigation 76; prices 143; timelines 76; evidence 60; form states 94; metadata 12; schema 61; figures/diagrams/captions 138; accessible text 30; routes/fragments 155.

## Inventory coverage

The current inventory scans `app/Homepage.tsx`; all shared components, including Homepage, Services, ServiceDetail, Pricing, WorkEvidence, DraftForm, SiteChrome, desktop/mobile navigation, and component defaults; all top-level `app/content` sources, including navigation, service presentation, core pages, audience pages, form contract, generated service data, and route data; `app/layout.tsx`; `app/sitemap.ts`; all five service markdown sources; and all three route registries.

Every record carries a stable key, exact value, inferred route and surface, source file and field/line, current or target state, rendering state, disposition, classification, provenance, generated-source status, and action destination where applicable. Generated current sources are explicitly marked `generatedSource: true` and `editorialAuthority: false`.

The target inventory covers homepage, Services, all five service pages, Pricing, Work, Contact, Start, Emergency, navigation, footer, forms and form states, metadata, schema, evidence, diagrams, captions, alt/accessibility text, mobile/accessibility labels, canonical routes, legacy fragments, and action destinations.

## Validation

The deterministic validator rebuilds the target contract and current/target inventory from the packet snapshots and exact base sources, rejects stale artifacts, and fails on:

- duplicate or missing keys;
- case-only unsourced label variants;
- unsourced values or generated editorial authority;
- unapproved service names and prices;
- missing `Starting at` price records;
- missing packet-034 timelines or material qualifications;
- CTA/destination mismatches and case-colliding fragments;
- prohibited outcome claims and placeholder copy;
- missing evidence source classes, limitations, or not-client-work labels;
- missing form states, metadata, schema, figures, accessible text, navigation, or required surfaces;
- any blocked-copy record.

Focused mutation tests prove the negative gates. Required TypeScript, lint, contract validation/tests, existing tests, static route checks, crawl, and build validations pass. Lint reports 38 pre-existing warnings and zero errors.
Local1 manifest check: `python3 tools/repo_manifest.py check` ran and reported pre-existing unrelated dirty trees in `local1-hub`, `local1-mcp-server`, and `rankbuilderseo-site`. No task-owned file belongs to those dirty sets.

## Unchanged-render evidence

The candidate and an independent detached worktree at the exact accepted base each built 184 static HTML files. Raw hashes differed only because Next generated a different CSS chunk filename and build ID. After normalizing only `/_next/static/chunks/*.(js|css)` filenames and the explicit Next `b` build-ID field, both complete HTML sets produced the same SHA-256:

`e9fef004a39124625e558924e80c4eb3124c96a660e08d00005af94eb181ed16`

The candidate full suite also passed 23 rendered/static tests, crawled 181 canonical routes and 80 redirect variants with zero failures, and produced the same 184-route static HTML set as the base. No existing renderer or current-copy source differs from the base. The new contract adapter has no application imports.

## Blocked copy

None. The machine-readable blocked-copy registry is empty. The registry policy forbids substituting a placeholder, guess, synonym, summary, caption, alt text, metadata value, field state, or mobile variant if a future required value is absent.

## Review boundary

This phase does not import or render the contract. It performs no push, merge, preview, deployment, Cloudflare, DNS, billing, credential, or production mutation. Worker completion is `needs_review`, not acceptance. ChatGPT must conduct Review Pass 1 and fresh adversarial Review Pass 2 against the exact local commit before permitting any downstream migration work.

Rollback is the exact accepted base `89cb0982b8f2274a289e8126c9472640a5305011`; the review branch can be abandoned without affecting `main` or production.
