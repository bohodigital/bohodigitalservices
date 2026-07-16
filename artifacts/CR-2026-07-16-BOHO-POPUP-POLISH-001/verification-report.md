# Boho glossary popup visual polish

Date: 2026-07-16

Branch: `feature/popup-polish-20260716`

Baseline: `dc19717be99f62e2cd5e9ae8dc41aa76b2b1165a`

## Result

- Preserved the verified hover, focus, click or touch, Escape, outside-click, and close-button interaction model.
- Replaced the plain dark tooltip presentation with a layered Boho glossary card.
- Added a parchment gradient, restrained botanical-color wash, four-color brand rail, display-type heading, glossary badge, plum offset shadow, and a stronger full-entry action.
- Restyled the inline question-mark trigger so the glossary affordance is clearer without overpowering the sentence.
- Refined the mobile treatment into a compact bottom sheet with the same visual hierarchy.
- Preserved viewport clamping, top or bottom placement, mobile containment, reduced-motion behavior, forced-colors support, hidden-control tab behavior, and the direct glossary fallback.

## Validation

- Production build passed.
- TypeScript passed.
- Rendered-route regressions passed.
- Glossary usage audit passed.
- ESLint passed with zero errors and only the repository's existing warnings.
- Browser QA passed at 1440 by 1000 and 390 by 844.
- Popup remained inside both viewports with zero horizontal overflow.
- Hover, focus, Escape, outside click, touch click, and close-button behavior passed.
- No local runtime or asset errors occurred. The restricted local browser continued to block existing remote analytics and public-domain icon requests; those are recorded as harness warnings.

## Artifacts

- `popup-polish-desktop.png`
- `popup-polish-mobile-390.png`
- `browser-qa.json`

## Changed files

- `app/components/DefinitionTerm.tsx`
- `app/globals.css`
- `tests/rendered-html.test.mjs`
- `artifacts/CR-2026-07-16-BOHO-POPUP-POLISH-001/`

## Release boundary and rollback

This follow-up updates only the owner-only Sites review candidate. It does not change the public GitHub `main` branch, Cloudflare production deployment, DNS, forms, analytics configuration, credentials, or other infrastructure.

Rollback by redeploying owner-only Sites version 29 or restoring baseline commit `dc19717be99f62e2cd5e9ae8dc41aa76b2b1165a`.
