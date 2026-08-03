# Start and Emergency conversion V2 — QA report

Branch: `work/WO-2026-08-03-BOHO-START-EMERGENCY-CONVERSION-V1`

## Automated verification

- `corepack pnpm test` — pass. Includes the commercial-copy contract, a 186-page Next production export, rendered HTML assertions, glossary and redirect validation, generated-route drift checks, and a 182-route static crawl with zero failures.
- `corepack pnpm run build` — pass. Vinext production build prerendered 183 routes with zero skips.
- `corepack pnpm run lint` — pass with 34 pre-existing warnings outside the task-owned files and zero errors.
- `node --test tests/commercial-release-candidate.test.mjs tests/analytics-bootstrap.test.mjs` — 19/19 pass.
- `./node_modules/.bin/tsc --noEmit` — pass.
- `git diff --check` — pass.

## Browser verification

Tested the static production export at 1440 × 1000 and 390 × 844.

- Both pages have one H1, correct desktop/mobile ordering, and no horizontal overflow.
- Start shows five native radio-card service choices and preserves the backend service values.
- Start optional details opens with the correct `aria-expanded` state.
- Emergency has three semantic field groups: Contact and affected system, Incident facts, and Impact and description.
- Invalid submission moves focus to the validation summary and exposes linked field errors.
- Contextual definitions are limited to three on Start and five on Emergency; repeat occurrences remain plain text.
- Definition popovers open from keyboard, close with Escape, restore trigger focus, and remain within desktop/mobile viewport bounds, including edge checks.
- Mobile definition close and destination-link targets measure 44 × 44 CSS pixels.
- No live inquiry was submitted. Worker endpoints, Turnstile actions, form IDs, field mappings, status-code handling, and success/failure logic remain intact and are covered by source/render/build checks.

The in-app browser did not forward Tab focus traversal into the page, so an uninterrupted Tab-only form-completion run was not repeatable in that harness. Keyboard entry, native control behavior, validation-summary focus, error links, and the complete popover keyboard flow were verified separately.

The browser console had no application errors. Cloudflare Turnstile emitted warning `110200` on `127.0.0.1`, which is expected because the production widget hostname does not authorize localhost.

## Screenshot inventory

- `screenshots/start-viewport-1440.jpg`
- `screenshots/start-viewport-390.jpg`
- `screenshots/emergency-viewport-1440.jpg`
- `screenshots/emergency-viewport-390.jpg`
- `screenshots/start-service-choice.png`
- `screenshots/start-optional-details-open.png`
- `screenshots/emergency-first-response-card.png`
- `screenshots/definition-popover-desktop.png`
- `screenshots/definition-popover-mobile.png`
- `screenshots/definition-popover-edge-left.png`
- `screenshots/definition-popover-edge-right.png`
- `screenshots/definition-popover-edge-top.png`
- `screenshots/definition-popover-edge-bottom.png`

## Release boundary

No deployment, push, merge, DNS change, account change, or production mutation was performed.
