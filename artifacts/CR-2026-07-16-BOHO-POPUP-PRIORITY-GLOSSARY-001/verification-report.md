# Popup priority and glossary expansion verification

Date: 2026-07-16

Branch: `feature/popup-priority-glossary-20260716`

Base: `39c704a589984176f5edbb2fb4519aad5b004045`

## Implemented

- Definition popovers now render through a portal attached to `document.body`, use fixed viewport placement, and sit above temporary and persistent site layers.
- Desktop placement is clamped to the viewport and automatically chooses an above- or below-trigger position.
- Mobile uses the existing keyboard-safe bottom-sheet presentation with the same top-layer priority.
- Hover, focus, click/touch, outside-click, close-button, Escape, and focus-return behavior remain supported.
- The shared term propagation pass now includes homepage explanatory copy, Tools visuals and SEO notes, Resources hero copy, brand-property notes, and the 404 page while excluding links and other nested-interactive contexts.
- The glossary contains 113 entries in the existing 12-cluster architecture.
- Exactly ten complete definitions were added: Platform, Website architecture, Dashboard, Baseline, Source code, Codebase, Cutover, HTTP status code, 404 Not Found, and 301 redirect.
- Each added definition includes a short definition, full definition, why it matters, common misunderstanding, ownership implications, business implications, related terms, cluster assignment, review date, and official sources.

## Validation

- `pnpm run build:pages`: passed.
- `node --test tests/rendered-html.test.mjs`: 15 of 15 tests passed.
- `pnpm run lint`: passed with 31 pre-existing warnings and no errors.
- `pnpm run glossary:usage`: 113 entries, 70 referenced by public site copy, 43 reference-only entries, and zero ambiguous aliases.
- `git diff --check`: passed.
- Browser QA at 1440 x 1000 and 390 x 844: passed.
- A popup opened from inside an `overflow: hidden` selected-tool card was confirmed to be a direct child of `body`, fixed-positioned, viewport-contained, topmost at its center point, and free of horizontal overflow.
- Browser QA confirmed hover opening, the hover bridge into the popup, Escape closing, mobile close-button behavior, keyboard tab stops, and no page errors.
- Route coverage confirmed live definition links for Dashboard, Platform, Codebase, HTTP status code, Baseline, Cutover, and 404 Not Found.
- Rendered-route validation rejects glossary triggers nested inside links.

## Evidence

- `browser-qa.json`
- `popup-priority-desktop.png`
- `popup-priority-mobile-390.png`

## Known gaps

- The 43 glossary entries not present in current public copy remain useful reference definitions; they were not forced into marketing copy merely to raise usage counts.
- Lint retains 31 unrelated warnings in legacy files and previously approved image/form-wrapper code. This change introduces no lint errors.

## Rollback

- Git: reset the private review branch to `39c704a589984176f5edbb2fb4519aad5b004045` or revert the follow-up commit.
- Sites: redeploy private review version 30.
- Public production is not changed by this candidate.
