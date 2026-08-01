# WO-2026-08-01 Boho redesign closeout

Status: private owner-review candidate. Production was not changed.

## 1. Repository and revisions

- Repository: `/Users/darksmarskin/Documents/local2/repos/bohodigitalservices-site`
- Canonical Pi baseline: `main` at `a9e1d15df03422b10a4d46e12b057acd6d4b003d`, clean and reconciled on 2026-08-01.
- Starting local continuation: `codex/boho-commercial-closure-20260730` at `0b7e1f567f1eeeaac920335dcf56bd3f50e81728`, clean.
- Candidate branch: `review/wo-2026-08-01-boho-redesign-closeout`.
- Final candidate SHA: recorded in the owner handoff. This file is part of that commit and therefore cannot contain its own commit hash.
- Framework/package manager: Next.js 16 static export; pnpm 11.
- Release mechanism: Cloudflare Pages/Sites. Only a private Sites deployment is authorized here.

## 2. Baseline and final verification

Baseline:

- Commercial copy contract: 12/12 tests; 15 packets, 1,493 slots, 190 resolved collisions, 0 unresolved.
- Lint: 0 errors, 34 warnings.
- TypeScript: pass.
- Integrated tests: 40/40; 180 canonical routes; 82 redirect variants; crawl failures 0.
- Build: pass; 181 generated routes.
- Static output: 59,244 KiB; static JavaScript: 1,185,398 bytes.
- Existing industry QA produced 11 stale expectation failures: three obsolete 2,200-word minimum checks and eight checks for a removed `businessType` field. Rendering itself passed.

Final:

- Commercial copy contract: 12/12 pass; 0 unresolved collisions.
- Closeout assertions: 11/11 pass.
- TypeScript: pass.
- Lint: 0 errors, 35 warnings (one net advisory over baseline; all are non-blocking pre-existing-style image or unused-variable advisories).
- Production build: pass; 186 generated pages.
- Route validation: 182 current routes; 40 verified redirect records; 80 redirect variants; 0 chains; 0 loops.
- Static crawl: 182 canonical routes, 80 redirect variants, robots and sitemap; 0 failures.
- Browser matrix: 15 required routes × 7 viewports = 105 checks; 0 overflow, H1, hidden-main, or viewport failures.
- Representative browser console sweep: 0 warnings or errors.

## 3. Change inventory

Changed surfaces:

- Shared commercial service data, primary navigation, dropdowns, mobile menu, footer, and CTA labels.
- Homepage, Services, Pricing, Start, Emergency, Website Buying Guide, Resources, Tools, About, Industries, and industry-detail pages.
- Primary service pages and subordinate Provider Rescue / Research-and-Audits pages.
- Analytics bootstrap and form-state instrumentation.
- Metadata, schema, sitemap, route registry, redirects, Cloudflare validation, and automated tests.

Routes added:

- `/work/`
- `/services/website-help/`

Routes materially modified:

- `/`, `/services/`, `/pricing/`, `/start/`, `/about/`, `/industries/`, `/tools/`, `/resources/`, `/learn/website-buying/`, `/emergency/`
- All five industry detail routes
- `/services/web-design-redesign/`, `/services/ongoing-seo/`, `/services/custom-digital-solutions/`, `/services/provider-rescue/`, `/services/research-audits-strategy/`

Redirect changes:

- Removed the `/work/` → `/services/` redirect.
- Preserved legacy redirects as one-hop mappings and restored required service-page fragment targets.
- Added no redirect chain or loop.

Shared data:

- `app/content/commercialReset.ts` remains the canonical four-service registry and now supplies the approved public names, prices, routes, dropdown descriptions, scope examples, hosting language, and free-review model used throughout the commercial shell.

## 4. Copy and analytics control

- Obsolete public-service-name occurrences in generated HTML: 0.
- Restaurant-specific core-sales occurrences in generated HTML: 0.
- Historical governed packets and generated compatibility data retain old strings where required for provenance; they are not rendered as current offers.
- Copy deviations: none from the exact locked passages used in this work order. Existing useful buyer education was retained around those passages.
- Analytics events: `free_review_click`, `free_review_form_start`, `free_review_submit_success`, `free_review_submit_failure`, `service_card_click`, `pricing_click`, `work_project_click`, `tools_project_click`, `email_link_click`, and `phone_link_click`.
- Analytics allowlists contain no free-form form content or PII fields.

## 5. Form QA

Verified without transmitting a submission:

- Required-field errors and aggregate failure announcement.
- Invalid-email error.
- Missing-consent error.
- Optional disclosure expansion and visible labels.
- Persistent accessible labels, correct autocomplete-oriented field structure, keyboard-operable native controls, and a single submit action.
- Success/failure copy and analytics stages by source inspection and automated assertions.
- No field contents are included in analytics properties.

Not executed: an actual delivery notification and reply-to test. The private candidate is a static preview, no test inbox was supplied, and sending a real form message would create an external side effect. This remains an owner-acceptance check before production release.

## 6. Accessibility, metadata, schema, security, and performance

- Every required reviewed route renders one H1, a title, description, self-consistent canonical, and indexable robots state.
- Desktop and mobile navigation are keyboard-operated with `aria-expanded`; the Start disclosure and form are keyboard accessible.
- New media has meaningful alt text, explicit dimensions, lazy loading below the fold, and safe external-link attributes.
- Homepage FAQ schema matches visible question-and-answer text.
- `/work/` and `/services/website-help/` have self-referencing canonicals and sitemap entries.
- All rendered local links and assets resolve in the automated suite.
- No credentials, secrets, form values, or internal submission payloads were added to public analytics.
- Candidate static output: 57,040 KiB, down 2,204 KiB (3.72%) from baseline.
- Candidate static JavaScript: 1,187,588 bytes, up 2,190 bytes (0.18%) from baseline; no new framework, carousel, autoplay media, or animation library was added.

## 7. Known advisories

- Lint retains 35 non-blocking warnings, mostly existing `<img>` optimization advisories and unused compatibility-layer variables; there are 0 lint errors.
- End-to-end delivery notification and reply-to behavior require a deliberately approved test submission with a supplied test inbox.
- Production acceptance remains separate from implementation completion and requires owner approval.

## 8. Screenshots

Desktop and mobile captures are in [`screenshots/`](screenshots/):

- Header and Services dropdown
- Homepage hero and proof section
- Services hero
- Pricing summary
- Work hero and public projects
- Start hero and form
- About hero
- Industries hero
- Website Help hero

## 9. Rollback

Preferred review rollback:

```bash
git switch review/wo-2026-08-01-boho-redesign-closeout
git revert 0b7e1f567f1eeeaac920335dcf56bd3f50e81728..HEAD
```

Alternatively, rebuild the known-good local starting SHA `0b7e1f567f1eeeaac920335dcf56bd3f50e81728` through the established release process. The canonical Pi production baseline remains `a9e1d15df03422b10a4d46e12b057acd6d4b003d` until separately approved.

## 10. Release boundary

Production was not deployed, changed, or otherwise mutated by this work order. The only deployment produced is the private owner-review preview identified in the handoff.
