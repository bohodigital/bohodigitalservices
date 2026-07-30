# WO-2026-07-30 Boho Commercial Reset Phase 1 — Closeout

Status: owner-review candidate complete; production unchanged.

This record is governed by the Local1 company constitution v0.1.0 and operations and agent constitution v0.1.0, as named by `repos/local1-hub/ops/governance/00-GOVERNANCE-INDEX.md`.

## 1. Repository and revisions

- Repository: `/Users/darksmarskin/Documents/local2/repos/bohodigitalservices-site`
- Owning `repo_key`: `bohodigitalservices-site`
- Starting branch/ref: detached at the reconciled Pi tracker head, `origin/work/WO-2026-07-29-BOHO-TRACKER-HARDENING-014-bound-umami-queue`
- Starting SHA: `a15ef6d33a2f969160898ffb1bb8d8fa28a72a79`
- Canonical Pi base reconciled before work: `origin/main` at `8a3808b`
- Candidate branch: `review/wo-2026-07-30-boho-commercial-reset-phase-1`
- Candidate SHA: the immutable commit containing this closeout; recorded in the owner handoff after the commit is created
- Starting tree: clean
- Package manager: pnpm (`packageManager: pnpm@11.7.0`; Corepack resolved pnpm 11.9.0)
- Framework: Next.js 16.2.6 static export plus vinext 0.0.50 / Vite 8.0.13 for Cloudflare-compatible packaging
- Production mechanism: the established Cloudflare/Sites release path; no production release was invoked

## 2. Commercial hierarchy delivered

- Business Websites — `From $850`
- Ongoing SEO & Local Growth — `From $450/month`
- Website Help — `From $200`
- Custom Systems — `From $1,500`
- Universal entry action — `Get a free website review`
- Flagship proposition — `Business websites from $850. Hosting stays free.`
- Ownership proposition — `The website build is paid. Eligible hosting is free. The account is yours.`

The free review is an entry action, not a fifth product. Website builds, redesigns, and responsible replacements are Business Website scopes. Rescue, migrations, audits, analytics repair, accessibility work, and focused fixes are Website Help examples. Custom discovery is part of Custom Systems scoping.

## 3. Pages changed

- `/`
- `/services/`
- `/pricing/`
- `/services/web-design-redesign/`
- `/services/ongoing-seo/`
- `/services/provider-rescue/`
- `/services/research-audits-strategy/`
- `/services/custom-digital-solutions/`
- `/start/`
- Consistency-only CTA/product/price corrections on Contact, Emergency, About, Industries, Resources, Tools, shared navigation, and the footer

No restaurant landing page, Work page, or new service route was created. Industries, About, Resources, Tools, and intake architecture were not redesigned.

## 4. Files changed

Commercial pages and shell:

- `app/Homepage.tsx`
- `app/components/ServicesPage.tsx`
- `app/components/PricingPage.tsx`
- `app/components/ServiceDetailPage.tsx`
- `app/components/SiteChrome.tsx`
- `app/components/MobileMenu.tsx`
- `app/components/commercial/CommercialChrome.tsx`
- `app/components/commercial/CommercialServiceLayer.tsx`
- `app/components/commercial/CommercialInquiryForm.tsx`
- `app/components/commercial/CommercialInquiryFormClient.tsx`
- `app/components/commercial/CommercialInquiryPages.tsx`
- `app/commercial-reset.css`
- `app/globals.css`

Shared commercial data, navigation, metadata, and consistency:

- `app/content/commercialReset.ts`
- `app/content/pricingPolicy.mjs`
- `app/content/navigation.ts`
- `app/content/audiencePages.ts`
- `app/content/corePages.ts`
- `app/content/industries.ts`
- `app/content/systems.ts`
- `app/[...slug]/page.tsx`
- `app/page.tsx`
- `app/layout.tsx`
- `app/components/AboutPage.tsx`
- `app/components/IndustriesPage.tsx`
- `app/components/KnowledgePages.tsx`
- `app/components/ResourcesPage.tsx`
- `scripts/generate-service-page-data.mjs`

Analytics, governed artifacts, routes, tests, and media:

- `public/analytics-bootstrap.js`
- `public/og-boho-commercial-reset-20260730.webp`
- `content/commercial/blocked-copy.json`
- `content/commercial/current-target-inventory.json`
- `content/routing/public-route-registry.json`
- `tests/analytics-bootstrap.test.mjs`
- `tests/commercial-release-candidate.test.mjs`
- `tests/rendered-html.test.mjs`
- `artifacts/WO-2026-07-30-BOHO-COMMERCIAL-RESET-PHASE-1/`

## 5. Shared data and component decisions

- `app/content/commercialReset.ts` is the single current public source for the four service labels, price displays, routes, hosting qualification, email qualification, scopes, FAQs, and proof records.
- `app/content/pricingPolicy.mjs` exposes the canonical current price ledger separately from immutable historical generator amounts.
- Shared Header, Footer, CTA, FAQ, mobile-menu, and detailed-service rendering were aligned to the same ledger.
- Historical generated service-page material remains hash verified. `ServiceDetailPage` filters retired price/product/hosting blocks before current public rendering.
- Existing verified Boho proof visuals were retained. The Business Website detail includes the approved hosting architecture asset and layered infrastructure explanation.

## 6. Old-price and retired-product inventory

Rendered-output scan:

```text
rg -l '\$(95|350|500|750|1,000|2,500)(\b|/)' out --glob '*.html'
result: zero matches across the generated public site
```

Repository occurrences retained by classification:

- `_legacy-boho/**`: archived legacy site evidence; not a current public source.
- `content/service-pages/*.md`, `content/commercial/source-packets.json`, `commercial-copy-contract.json`, `collision-report.json`, and `app/content/servicePages.generated.ts`: immutable/hash-verified historical governed inputs.
- `app/content/pricingPolicy.mjs`: historical generator currency set, explicitly separated from the canonical current ledger.
- `app/components/ServiceDetailPage.tsx`: retired-language exclusion rules.

No current rendered public route exposes `$95`, `$350`, `$500`, `$750`, `$1,000`, or `$2,500` as a current commercial offer. `Essential Website` is not public. Retired standalone product names are absent from current buyer-facing commercial surfaces.

## 7. Copy deviations

None. The compact mobile header now also uses the exact full action `Get a free website review`; the separate menu control uses the visible label `Menu` with the full accessible name `Open the site menu`.

## 8. Automated checks

- `node scripts/commercial-copy-build.mjs --write`
  - Pass: 15 packets, 1,493 slots, 190 governed collisions, 0 unresolved, 1 correctly blocked claim.
- `pnpm lint`
  - Pass: 0 errors, 34 warnings. Baseline was 0 errors and 38 warnings. Remaining warnings are established legacy unused variables and existing/intentional raw-image usage.
- `pnpm exec tsc --noEmit`
  - Pass.
- `node --test tests/analytics-bootstrap.test.mjs`
  - Pass: 9/9.
- `pnpm test`
  - Pass.
  - Commercial-copy contract: 12/12.
  - Rendered HTML: 40/40.
  - Next static pages: 184/184.
  - Current route registry: 180 routes.
  - Redirect variants: 82.
  - Static crawl: 180 canonical routes plus redirect variants, robots, and sitemap; 0 failures.
- `pnpm build`
  - Pass.
  - vinext transformed all client/server/RSC/SSR environments and prerendered 181 routes with 0 skipped.
  - Distribution size: approximately 45 MiB; static `out/`: approximately 54 MiB.
- `git diff --check`
  - Pass.

## 9. Accessibility and manual QA

- Browser matrix covered 390×844 and 1440×900 on all required routes, plus 320×568 homepage first-viewport verification.
- Every reviewed route has exactly one H1 and zero horizontal overflow.
- Header/menu controls expose names, expanded state, controlled panels, and focus restoration after Escape.
- FAQ values remain available in the HTML while native disclosure controls preserve progressive enhancement.
- Start controls are explicitly labeled; canonical service choices are Business Websites, Ongoing SEO & Local Growth, Website Help, Custom Systems, and Not sure yet.
- Reduced-motion CSS remains in place.
- Primary `/`, `/services/`, and `/pricing/` console passes are clean: no errors or warnings.
- The established `pnpm qa:industries` runner completed all 24 page/viewport scenarios and 11 captures. Its only failures were eight pre-existing stale form-prefill assertions for a visible `businessType` input that does not exist at the starting SHA; page rendering, viewport, and console scenarios were not implicated.
- Local Start-page Turnstile can emit Cloudflare error 110200 on the unapproved `127.0.0.1` hostname. The form lifecycle tests pass and the warning is environment-specific.

Five-second comprehension at 320×568 passes without scrolling:

1. First offer: Business websites.
2. Starting price: $850.
3. Eligible hosting: $0/month.
4. Account owner: the client.
5. If the client leaves: the website remains in the client account.
6. Next action: Get a free website review.

## 10. Link, schema, metadata, and asset results

- Internal-link and fragment crawl: pass.
- Redirect chains: 0.
- Redirect loops: 0.
- Missing local assets: 0.
- Metadata reviewed on every required matrix route.
- Homepage, Services, Pricing, and all five indexed service routes render JSON-LD.
- Pricing FAQ HTML and FAQ schema share the same canonical data.
- Sitemap: 153 stable glossary URLs, 0 collisions, 0 unresolved related terms, 0 glossary noindex pages.

## 11. Analytics events added

Privacy-bounded delegated click events are sent to both configured providers with a strict allowlist and no URL, form text, contact data, or other PII:

- `free_review_click`
- `website_pricing_click`
- `service_card_click`
- `hosting_eligibility_click`
- `pricing_service_click`
- `proof_project_click`

Event properties are limited to the approved service, price-display, page, and section context. Malformed and unknown events are ignored. Umami events queue safely until its API becomes available.

## 12. Social card

- File: `public/og-boho-commercial-reset-20260730.webp`
- Size: 1200×630, approximately 152 KiB.
- Method: built-in ImageGen, then lossless project-side sizing/format optimization.
- Approved text in the generated asset:
  - `Boho Digital Services`
  - `Business websites from $850. Hosting stays free.`

No testimonial, client, result, metric, or unverified screenshot was invented.

## 13. Screenshots

Desktop:

- `screenshots/homepage-hero-desktop-1440x900.png`
- `screenshots/homepage-service-grid-desktop-1440x900.png`
- `screenshots/services-hero-desktop-1440x900.png`
- `screenshots/pricing-summary-desktop-1440x900.png`

Mobile:

- `screenshots/homepage-hero-mobile-390x844.png`
- `screenshots/homepage-service-grid-mobile-390x844.png`
- `screenshots/services-hero-mobile-390x844.png`
- `screenshots/pricing-summary-mobile-390x844.png`

## 14. Owner-review preview

- Sites project: existing project `appgprj_6a516a14d75c8191a6fc190567486cb4`
- Access requirement: verified owner-only; no groups or additional users
- URL: recorded in the final owner handoff because Sites creates the access-restricted deployment only after this exact source commit exists
- This owner-only Sites deployment is a review environment. No public custom domain or Cloudflare production route is changed.

## 15. Known advisories

- The 34 lint warnings are non-blocking and below baseline.
- The separate Industries QA runner has stale `businessType` prefill expectations, as described above; this is not a commercial-reset regression.
- Turnstile rejects the local static-preview hostname, so local form UI review cannot prove production widget authorization.
- The Mac mirror is not the operational source of truth. Any future production acceptance must reconcile this candidate with Bohopi and follow the normal release authority.

## 16. Rollback

This candidate does not rewrite history and does not remove existing service routes.

To revert the candidate after integration:

```bash
git revert <candidate-commit-sha>
```

To restore the exact pre-work candidate source:

```bash
git switch review/wo-2026-07-30-boho-commercial-reset-phase-1
git branch review/wo-2026-07-30-boho-commercial-reset-phase-1-rollback a15ef6d33a2f969160898ffb1bb8d8fa28a72a79
```

Production rollback, if a separately authorized future release ever occurs, is to rebuild the prior known-good SHA and redeploy its immutable artifact through the established release process. No rollback is currently necessary because production was not changed.

## 17. Production status

Production was not deployed, modified, or reconfigured. No DNS, billing, Cloudflare account, access-control, outreach, or external messaging action was performed. Work stops at the owner-only preview and this closeout.
