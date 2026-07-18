# Industries reboot verification

Request: `CR-2026-07-18-BOHO-INDUSTRIES-REBOOT-001`

Owner-brief SHA-256: `09D62E4B0BAA732499C63640D5DF2055B0B05AA0BEE602FA1A251FC5314B4DE1`

## Release boundary

This is an owner-restricted private review candidate. Production, public GitHub,
DNS, forms infrastructure, analytics accounts, credentials, email, and billing
remain unchanged. A public promotion requires explicit approval of the exact
private preview and candidate commit recorded in Bohopi.

## Verified source state

- Canonical repository: `/srv/local1/repos/sites/bohodigitalservices`
- Isolated feature branch: `feature/industries-reboot-20260718`
- Base commit: `9e2e1bd0c20341b1b3516ba4f133bccca47ad88b`
- Base tree: `f6c64b5e20fcfb54db34632184a3029e1358d44f`
- Candidate commit and tree: recorded in Bohopi after the exact Pi candidate is committed
- Production source and deployment: unchanged during this request

The older Boho-specific source path in `ops/runbooks/sites-cloudflare-pages.md`
is stale. The Pi repo manifest, current Git remote, current production wrapper,
and recent release records identify the canonical repository above.

## Work completed

- Replaced `/industries/` with the owner-supplied customer-decision storyboard.
- Removed the duplicate commercial section-navigation layer and all automatic
  glossary popovers from the Industries hub and its five child routes.
- Added one typed business-model source for paths, labels, inspection records,
  form values, visual metadata, distinct child-page content, service routes, and
  publication-safe evidence limits.
- Reused the maintained pricing policy rather than creating a second price
  registry. The Industries ledger renders the eleven verified public offers.
- Preserved and expanded distinct outcome-led child content. Each child route
  renders four model-specific FAQs and six meaningful, text-equivalent visuals.
- Added an editable, allowlisted `business_model` prefill to the existing free
  review form. Unknown and repeated values are ignored. Form transport and the
  backend payload contract are unchanged.
- Added only the six approved analytics events and four non-personal event
  attributes. No name, email, telephone, company, message, or sensitive URL is
  sent through the Industries analytics markup.
- Reused five licensed editorial photographs already present in the repository.
  Every placement identifies the source and states that it is representative,
  not client work, and not a measured result.
- Corrected small-label contrast on every dark or clay Industries section and
  compressed the desktop hero so both decision actions remain in the first
  1440 by 1000 viewport.

## Child-page content and visual counts

| Route | Main-content words | Meaningful figures |
| --- | ---: | ---: |
| `/industries/home-improvement-contractors/` | 2,325 | 6 |
| `/industries/local-service-businesses/` | 2,249 | 6 |
| `/industries/brick-and-mortar-retail-hospitality/` | 2,237 | 6 |
| `/industries/online-retail-ecommerce/` | 2,212 | 6 |
| `/industries/professional-b2b-services/` | 2,244 | 6 |

The automated headless check enforces the 2,200 to 3,500 word target and the
six to eight visual target for every child route.

## Claim, pricing, and evidence checks

- The brief's `Client-controlled assets` trust phrase was not rendered because
  the active governance record supports the narrower public wording
  `Ownership defined in writing`.
- The smaller-budget FAQ uses the governed conditional wording: a reduced or
  phased project may be suggested only when a smaller complete solution is
  possible.
- The local-service route tells visitors not to send health, patient, or other
  sensitive personal data and preserves the client-supplied regulated-claim
  review boundary.
- The ecommerce route states that the informational-site minimum does not cover
  ecommerce and that payment, account, checkout, and migration work receives a
  specific written scope and quote.
- Concept figures are labelled as concepts, not client work or results.
- Industry-specific evidence links remain hidden because no complete verified
  industry artifact currently exists. Only the verified `/work/` and
  `/resources/` destinations are linked.
- No rankings, inquiries, visits, sales, revenue, availability, adoption,
  security outcome, or client result is guaranteed.

## Validation

Local candidate validation completed headlessly on Windows before Pi transfer:

- TypeScript: pass
- ESLint: pass with zero errors; 38 pre-existing warnings remain
- Next static Pages build: pass; 32 pages; no Worker runtime
- Vinext/Sites build: pass
- Rendered HTML regression: 21 of 21 pass
- Focused Industries QA: 6 routes x 4 scenarios = 24 page checks, 8 form
  prefill cases, 11 screenshots, zero failures
- Site-wide QA: 29 routes x 4 scenarios = 116 page checks, popup and glossary
  interactions, zero failures
- Mobile, tablet, desktop, 200-percent-equivalent width, reduced motion,
  keyboard FAQ use, local links, local assets, fragments, metadata, robots,
  noindex absence, and horizontal overflow: pass
- `git diff --check`: pass

Final Pi and owner-restricted hosted checks are recorded in Bohopi with the
exact candidate commit, tree, Sites version, and private URL.

## Changed-file inventory

- `.github/workflows/validate-cloudflare-pages.yml`
- `app/[...slug]/page.tsx`
- `app/components/DraftForm.tsx`
- `app/components/IndustriesPage.tsx`
- `app/components/IndustryDetailPage.tsx`
- `app/components/IndustryTrackedLink.tsx`
- `app/components/IndustryVisuals.tsx`
- `app/content/audiencePages.ts`
- `app/content/industries.ts`
- `app/content/pricingPolicy.mjs`
- `app/globals.css`
- `app/industries-page.css`
- `docs/asset-provenance.md`
- `docs/industries/CR-2026-07-18-BOHO-INDUSTRIES-REBOOT-001-verification.md`
- `package.json`
- `scripts/qa-industries-headless.mjs`
- `tests/rendered-html.test.mjs`

## Known gaps

- No industry-specific public evidence artifact is complete; no placeholder
  artifact link is rendered.
- The older source-path paragraph in the shared Cloudflare Pages runbook remains
  stale and was not changed in this bounded site request.
- Owner approval is still required before any public GitHub push, merge,
  production deployment, or public-domain promotion.

## Rollback

Before approval, rollback is simply to leave production unchanged and retire the
private Sites candidate. The isolated feature worktree can be removed after its
commit and evidence have been retained.

If this exact candidate is later approved and released, preserve the prior
production commit, revert the release through Git rather than rewriting history,
repin the fixed production wrapper to the resulting approved commit and tree,
redeploy through that wrapper, and repeat immutable plus public-domain headless
verification.
