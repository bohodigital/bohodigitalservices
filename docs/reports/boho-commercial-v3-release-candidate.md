# Boho Commercial V3 Release Candidate

## Contents

- [Status](#status)
- [Candidate summary](#candidate-summary)
- [Changed files](#changed-files)
- [Correction evidence](#correction-evidence)
- [Generated artifacts](#generated-artifacts)
- [Validation](#validation)
- [Browser and accessibility audit](#browser-and-accessibility-audit)
- [Review findings](#review-findings)
- [Hard stops](#hard-stops)
- [Preview and deployment](#preview-and-deployment)
- [Rollback](#rollback)

## Status

**Blocked before push and private-preview deployment.** The authorized repairs
resolve every blocker from the first candidate report, including two additional
high-severity form-lifecycle findings from the fresh-context review. Two
repository ownership conflicts remain and cannot be repaired within this work
order:

1. Homepage metadata is owned by `app/page.tsx` and `app/layout.tsx`, neither of
   which is allowed. The active static title remains the older literal value.
2. `routes:artifacts:check` requires regeneration of
   `content/routing/public-route-registry.json`, which is outside the allowlist
   and conflicts with the instruction that commercial-copy generation update
   only the two authorized commercial artifacts.

The applicable stop conditions therefore prohibit push and deployment.

## Candidate summary

The local candidate repairs active-incident routing, compatibility fragments,
Work evidence organization and destinations, emergency payload bounds, all five
service decision layers, mobile navigation, progressive-disclosure state,
privacy-safe form analytics, Turnstile lifecycle handling, adapter-backed
navigation labels, desktop-menu focus restoration, and the stale commercial
inventory and blocked-copy artifacts.

The branch began clean at exact commit
`9e99af0a9c99f9bcdd1f81bd872ff6d6104550af` on
`agent/boho-commercial-v3-client-acquisition`.

## Changed files

- `app/Homepage.tsx`
- `app/components/DesktopNavigation.tsx`
- `app/components/PricingPage.tsx`
- `app/components/SiteChrome.tsx`
- `app/components/WorkEvidencePage.tsx`
- `app/components/commercial/CommercialInquiryForm.tsx`
- `app/components/commercial/CommercialInquiryFormClient.tsx`
- `app/components/commercial/CommercialInquiryPages.tsx`
- `app/components/commercial/CommercialServiceLayer.tsx`
- `app/components/commercial/commercial.css`
- `app/content/commercial/presentation.ts`
- `app/content/navigation.ts`
- `content/commercial/blocked-copy.json`
- `content/commercial/current-target-inventory.json`
- `tests/rendered-html.test.mjs`
- `tests/commercial-release-candidate.test.mjs`
- `docs/reports/boho-commercial-v3-release-candidate.md`

All are within the work-order allowlist. No glossary, Industries, audience,
dependency, Worker, routing-registry, public asset, production, DNS, billing,
credential, or secret file changed.

## Correction evidence

- Start visibly renders the exact correction-packet incident block and unique
  `project-inquiry` and `visibility-check-request` targets.
- Pricing and Work compatibility aliases occur once and sit inside their
  meaningful current groups.
- Every Work summary reaches a distinct expanded section; details visibly expose
  source, demonstration, limitation, and status fields, and no evidence action
  self-links.
- Emergency input is limited to 7,500 characters and the complete constructed
  backend `problem` is rejected above 8,000 characters without truncation.
- Each of the five service decision layers renders the three required labels
  with accepted contract-backed values.
- Mobile navigation includes the adapter-backed Services overview route.
- Optional form values remain mounted while disclosure is closed.
- Confirmed success is handled outside the request-failure catch. Analytics and
  third-party cleanup are best-effort and contain no submitted values.
- Turnstile maintains one timer and one widget, stops polling after render and
  on script/render/widget errors, and clears timer/listeners/widget on unmount.
- Navigation labels resolve through accepted adapter records.

## Generated artifacts

The approved commercial generator was run twice in an isolated temporary copy.
Only these authorized outputs were transferred:

- `content/commercial/current-target-inventory.json`
- `content/commercial/blocked-copy.json`

The other four generator outputs were byte-identical to the repository. A
subsequent in-repository `commercial-copy:check` passed. Boho Analytics public
or free availability remains the sole blocked record with
`targetApproved: false` and `replacementText: null`.

## Validation

- Commercial-copy check: pass.
- TypeScript: pass.
- Lint: pass with zero errors and 34 existing warnings.
- Production-style build: pass; 185 static pages.
- Commercial contract suite: pass, 12/12.
- Rendered HTML suite: pass, 37/37 before the final metadata assertion was
  strengthened.
- Candidate correction suite: **blocked, 13/14**. The single failure correctly
  proves the active Homepage title does not use the accepted commercial slot.
- Route checks: pass; 153 glossary routes, 58 redirect records, 80 redirect
  rules, and no loops or chains.
- Redirect checks: pass as part of route checks.
- Route-artifact check: **blocked** by the unauthorized stale public route
  registry described below.
- Static crawl: pass; 181 canonical pages, 80 redirect variants, two
  robots/sitemap files, and zero failures.
- `git diff --check`: pass.

Because required validation fails, the candidate is not eligible for preview.

## Browser and accessibility audit

An isolated real Chromium audit covered Homepage, Services, Provider Rescue,
Pricing, Work, Contact, Start, and Emergency at:

- 1440×1000
- 900×1100
- 390×844

All 24 route/viewport combinations passed checks for one H1, heading order,
accessible names and labels, focus visibility, horizontal overflow, reduced
motion, menu keyboard behavior and focus restoration, console/page errors, and
automated contrast. Twenty-four screenshots and a machine-readable result matrix
were captured under `/tmp/wo068-browser-audit/`.

The Chrome DevTools connector was unavailable in this session, so the same
installed Chromium runtime was driven through Playwright Core. The image-view
helper failed because of the host sandbox fault, so screenshot inspection was
limited to real-browser automated assertions and hashes.

## Review findings

The required fresh-context review returned two additional high findings:

1. a Turnstile reset exception after backend success could overwrite success
   with a network error; and
2. script-load or synchronous render errors could leave polling active.

Both were repaired within the allowlist, candidate checks were strengthened, and
TypeScript passed afterward. The reviewer found no other blocker/high issue in
payload bounds, navigation/focus, aliases/evidence, accessibility, copy
authority, generated-artifact boundaries, or security/privacy.

## Hard stops

### Homepage metadata ownership

The accepted metadata records are available in the commercial presentation
adapter, but Next.js metadata is emitted by literal metadata exports in
`app/page.tsx` and `app/layout.tsx`. An attempted component-level head repair
produced duplicate tags without replacing the active title and was removed.
Resolving this requires manager authorization for the true metadata owner files.

### Public route registry ownership

`corepack pnpm run routes:artifacts:check` reports
`content/routing/public-route-registry.json` stale. A diagnostic generation
showed that it would update commercial-route metadata and incoming-link records.
The diagnostic change was immediately reversed byte-for-byte because the file is
outside the allowlist and only the two named commercial artifacts may change.
Resolving this requires exact authorization for that generated registry or a
manager-approved validation alternative.

## Preview and deployment

No branch push occurred. No private-preview version was saved or deployed. No
preview URL or deployment identifier exists.

Production `main` and the public production deployment remain unchanged.

**NOT DEPLOYED TO PRODUCTION**

## Rollback

The final action for this blocked run is a local ordinary checkpoint commit only.
To discard that unpushed checkpoint after review, create a safety branch at the
checkpoint and move the local preview branch back to
`9e99af0a9c99f9bcdd1f81bd872ff6d6104550af` using the repository's approved Git
workflow. No production or preview rollback is required because nothing was
pushed or deployed.
