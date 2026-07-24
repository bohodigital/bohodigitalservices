# Boho Commercial V3 Release Candidate

## Contents

- [Status](#status)
- [Candidate summary](#candidate-summary)
- [Changed files](#changed-files)
- [Validation](#validation)
- [Screenshots and accessibility](#screenshots-and-accessibility)
- [Performance](#performance)
- [Copy authority](#copy-authority)
- [Known limitation and required decision](#known-limitation-and-required-decision)
- [Preview and deployment](#preview-and-deployment)
- [Rollback](#rollback)

## Status

Blocked before push and preview. The required commercial-copy gate reports its
generated `inventory` and `blocked` artifacts as stale. Regenerating them would
change `content/commercial/current-target-inventory.json` and
`content/commercial/blocked-copy.json`, but `content/commercial/**` is not an
allowed path in this work order.

## Candidate summary

The local review branch implements the contract-backed commercial decision layer
for Homepage, Services, five service pages, Pricing, Work and Evidence, Contact,
Start, Emergency, navigation, footer, form states, and privacy-safe events.
Accepted long-form service content remains below each new decision layer.

## Changed files

Implementation is limited to the work-order allowlist:

- `app/Homepage.tsx`
- `app/[...slug]/page.tsx`
- `app/components/DesktopNavigation.tsx`
- `app/components/MobileMenu.tsx`
- `app/components/PricingPage.tsx`
- `app/components/ServiceDetailPage.tsx`
- `app/components/ServicesPage.tsx`
- `app/components/SiteChrome.tsx`
- `app/components/WorkEvidencePage.tsx`
- `app/components/commercial/CommercialChrome.tsx`
- `app/components/commercial/CommercialInquiryForm.tsx`
- `app/components/commercial/CommercialInquiryFormClient.tsx`
- `app/components/commercial/CommercialInquiryPages.tsx`
- `app/components/commercial/CommercialServiceLayer.tsx`
- `app/components/commercial/commercial.css`
- `app/content/commercial/presentation.ts`
- `app/content/navigation.ts`
- `app/service-pages.css`
- `tests/rendered-html.test.mjs`
- `docs/reports/boho-commercial-v3-release-candidate.md`

No glossary, Industries, audience, routing-registry, public asset, Worker,
production, secret, DNS, billing, or credential file was changed.

## Validation

- TypeScript: pass.
- Lint: pass with 34 pre-existing/non-blocking warnings and zero errors.
- Static build: pass; 185 pages generated.
- Rendered HTML: pass, 23/23 tests.
- Browser audit: pass after repairing one heading-order defect and two contrast
  defects.
- Commercial-copy check: **blocked** because generated `inventory` and `blocked`
  artifacts are stale and their required output paths are outside this work
  order's allowlist.
- Full normal suite and downstream route/artifact/crawl gates were not claimed
  after the explicit stop condition triggered.

## Screenshots and accessibility

Twenty-one screenshots were generated in
`/tmp/WO-2026-07-24-BOHO-COMMERCIAL-CLIENT-ACQUISITION-RC-067/screenshots/`:
Homepage, Services, Provider Rescue, Pricing, Work, Contact, and Start at
1440×1000, 900×1100, and 390×844.

The final Chromium audit reports zero failures for one H1 per route, heading
order, duplicate IDs, form labels, horizontal overflow, reduced-motion
preference, initial keyboard focus, mobile-menu open/Escape/focus restoration,
and Start-form error announcements/focus. A solid-background WCAG contrast scan
checked 1,256 text elements with zero failures. Gradient-backed regions were
reserved for screenshot review. No content is hover-only.

## Performance

- Static output: 53,098,160 bytes.
- Build wall time: 24.77 seconds.
- Representative JavaScript: Homepage 656,160 bytes; Services, Provider Rescue,
  Pricing, Work, Contact, and Start 847,755 bytes each.
- The accepted commercial-copy contract is absent from browser chunks.
- No dependency or heavy client library was added.

## Copy authority

All new or changed visible copy is resolved from accepted commercial contract
slots or exact accepted correction values. Navigation literals are exact
accepted values. The resolver rejects blocked slots, `remove` actions, ambiguous
matches, and values outside adapter allowlists.

Blocked Boho Analytics availability phrases are filtered from target service
rendering. No replacement availability claim was created.

## Known limitation and required decision

The manager must either:

1. add `projects/bohodigitalservices-site/content/commercial/**` (or the two
   exact generated files) to the allowed paths for this work order, then resume
   the runner so it can run the approved generator; or
2. provide a different approved way for the commercial-copy gate to validate
   source changes without modifying those generated artifacts.

No manual edit of generated copy artifacts was attempted.

## Preview and deployment

No branch push and no private preview were created after the required gate
failed. No production action occurred.

**NOT DEPLOYED TO PRODUCTION**

## Rollback

The branch started at exact base
`8816c53ad9e6d6f0ae6901237c4992291ba054c8`. Until the allowlist decision is
resolved, rollback is to delete the unpushed local review branch after preserving
any desired local checkpoint commit. No production rollback is required.
