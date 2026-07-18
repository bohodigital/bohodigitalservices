# Service Pages Overhaul Verification Report

Request: `CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001`
Candidate branch: `feature/service-pages-overhaul-20260717`
Base production source: `6128c2b427172d11dcd0cba80c2dd76af803c284`
Release state: private review candidate only; production unchanged

## Intake and source integrity

- Owner package: `boho-service-pages-complete-package-v1.zip`
- Package SHA-256: `c5df35f5d29fb1b7cd701ca2dd1ed4a23cb55ea6f715f2c3651da27f34fbafab`
- Canonical intake: `/srv/local1/hub/ops/intake/codex-requests/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/source-package`
- Five individual Markdown pages match the package manifest and are preserved in `content/service-pages/` as hash-verified source evidence.
- `scripts/generate-service-page-data.mjs` fails closed on invalid UTF-8, source-hash drift, missing directives, invalid routes, unsupported complex Markdown, or an override that no longer matches exactly once.
- `app/content/pricingPolicy.mjs` is the single maintained structured source for candidate prices and assessment-credit terms. The generator fails if rendered service prose contains a currency amount outside that policy.

## Governing records reviewed

- Company Constitution v0.1.0, active 2026-07-13
- Operations and Agent Constitution v0.1.0, active 2026-07-13
- Boho Project Constitution v0.4.0, active 2026-07-14
- Brand Messaging Register v0.4.0, active 2026-07-14
- Brand Implementation Guide v0.4.0, active 2026-07-14
- Repository `AGENTS.md`
- Sites and Cloudflare Pages runbooks

## Implemented public-candidate surface

- Rebuilt `/services/` as a five-lane decision hub.
- Added five long-form service routes:
  - `/services/ongoing-seo/`
  - `/services/web-design-redesign/`
  - `/services/provider-rescue/`
  - `/services/research-audits-strategy/`
  - `/services/custom-digital-solutions/`
- Restored `/pricing/` as a detailed public-scope candidate with seven stable anchors.
- Completed the owner-supplied credit conditions on `/pricing/`, including transfer, cash-value, fee-cap, excluded-cost, delivered-service, and materially-changed-system treatment.
- Added `/work/` with clearly separated public tools, owned properties, provider-rescue method, and report method.
- Expanded `/resources/` with `#analysis-dashboard`, `#provider-rescue-checklist`, and `#report-standard`.
- Reframed `/start/` as the universal free public-information review while preserving the existing form ID, fields contract, endpoint, and transport.
- Updated service navigation, audience links, homepage links, footer links, system-family links, and route regressions.
- Added one-hop static 301 rules for the eight retired service routes in `out/_redirects`.

## Governed content corrections

The intake Markdown remains unchanged. The generator applies 15 explicit, exact-match public-candidate overrides:

- Describes Boho Analytics Platform as free public open-source software intended for self-hosting, not a hosted customer dashboard.
- Removes the unsupported assertion that a public standalone hosting rate already exists; eligible standalone hosting or email is separately scoped.
- Routes report evidence to the verified `/work/#report-method` section instead of an absent sample-report artifact.

No client results, testimonials, hosted-access claim, public security guarantee, adoption metric, or unverified proof artifact was added.

## Validation

- Deterministic generator: pass, 5 sources and 15 governed overrides.
- TypeScript: pass.
- Focused ESLint: 0 errors; four existing-style `<img>` performance advisories only.
- Static Next export: pass, 32 pages generated.
- Rendered HTML regression suite: 19/19 pass, including centralized candidate pricing and complete credit-policy assertions.
- Public route, sitemap, crawl, local-link, local-fragment, asset, form-contract, glossary, and no-Worker assertions: pass.
- Headless Chromium service matrix: 40/40 route/viewport checks pass.
- Viewports: 1440 desktop, 768 tablet, 390 touch mobile, and 640 CSS pixels as the 200% zoom equivalent.
- Headless interaction checks: FAQ keyboard controls, one glossary popup at a time, topmost fixed popup layer, viewport containment, Escape close, CTA destinations, required anchors, no raw editorial labels, no local 4xx assets, and no horizontal overflow.
- Twelve fresh headless captures were inspected for the service hub and five service pages at desktop and mobile sizes.

## Known gaps and approval boundary

- The numeric prices are owner-supplied candidate copy, but prior canonical records did not yet treat them as an active public pricing decision. They remain private-review content until the owner approves the exact preview for publication.
- The private candidate does not activate or supersede the canonical pricing decision. Exact commercial wording still requires owner approval and canonical-record reconciliation before any production publication.
- The free Analytics Platform is a public repository/self-hosted software offer; no public hosted tenant service is represented.
- No client case study or sample client report is asserted. `/work/` labels method, owned properties, and public repositories accurately.
- Production forms, DNS, Cloudflare account configuration, analytics accounts, email, credentials, and billing were not changed.
- Production deployment is prohibited until the owner approves the exact private preview.

## Rollback

The source rollback point is `6128c2b427172d11dcd0cba80c2dd76af803c284`. The isolated feature branch can be deleted without changing production. If an owner-only Sites review version is created, it can be superseded or removed without changing `bohodigitalservices.com`. If a later production release is approved, rollback is a redeploy of the last known-good production commit and its validated static artifact.
