# Start and Emergency conversion redesign — release-candidate handoff

Authorization: owner instruction in the active Codex task on 2026-08-04 to finish the previously unapproved redesign and prepare the newest site version for production review.

Base commit: `f6d6be984d1f1fd40cce91d1759e2d53f09c41cf`

Branch: `codex/start-emergency-conversion-release`

## Scope

- Preserve the recovered Start and Emergency visual redesign.
- Rebase it onto the latest Demo Library and homepage-carousel source.
- Keep the existing inquiry transport, validation, Turnstile, field mappings, success states, failure states, and privacy boundaries.
- Restore specific Start and Emergency analytics events.
- Remove dead metadata and the rendered `undefined` CSS class.
- Synchronize generated route and commercial-copy inventory artifacts.
- Strengthen rendered regression tests for conversion actions and class output.

## Copy disposition

Codex authored no new public-facing marketing copy for this repair. The recovered redesign copy was preserved, except for these exact strings restored from the accepted Start and Emergency V2 implementation:

- `Describe the emergency`
- `This can wait`
- `Before changing anything else`
- `Use Emergency Help when the problem is active and consequential.`
- `Urgent work is scoped before paid work begins.`

The route-level title and description continue to come from `app/[...slug]/page.tsx`; unused metadata from the recovered draft was removed. Final production publication remains subject to direct owner approval of the rendered candidate.

## Analytics disposition

- Start hero: `start_hero_cta_click`
- Start emergency route: `start_emergency_detour_click`
- Start Work links: `start_work_link_click`
- Emergency primary actions: `emergency_hero_cta_click`
- Emergency ordinary-inquiry routes: `emergency_standard_detour_click`
- Individual proof-property links retain `work_project_click`
- No form values or free-form content are added to analytics.

## Validation

- `corepack pnpm test` — pass.
- Next production export — 186 pages generated.
- Rendered-page assertions — 13/13 pass.
- Route registry — 182 current routes, 58 historical records, 40 verified redirects, 153 glossary routes.
- Static crawl — 182 canonical routes and 80 redirect variants, zero failures.
- `corepack pnpm run build` — pass; 183 vinext routes prerendered, zero skipped.
- `corepack pnpm run commercial-copy:check` — pass; 15 packets, 1,493 slots, zero unresolved collisions.
- `./node_modules/.bin/tsc --noEmit` — pass.
- `corepack pnpm run lint` — zero errors; 35 existing-style warnings.
- `git diff --check` — pass.

## Release boundary

No GitHub push, Pi mutation, Cloudflare production deployment, DNS change, form submission, or analytics-account change was performed. Generated imagery was not added; the recovered redesign uses existing verified site assets.

