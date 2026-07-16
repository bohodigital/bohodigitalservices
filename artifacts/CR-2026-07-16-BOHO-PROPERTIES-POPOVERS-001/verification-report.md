# Tools, properties, and glossary popup verification

Date: 2026-07-16

Branch: `feature/tools-properties-popovers-20260716`

Baseline: `ced0118ebd98705a40140e9bd85d0fd8879cac94`

## Public content result

- The selected custom-tool registry still contains exactly `bsuite-mcp-monitor`, `secret-broker`, and `analysis-dashboard`.
- Each selected tool now has a verified public-repository image or repository preview, a short public memo, and a direct GitHub link.
- The independent brand-property section contains exactly How Biscuit, Rank Builder SEO, and Better Grades.
- `bohodigitalservices.com` is not rendered as one of its own independent brand properties.
- Each independent property now has a repository-sourced brand image, a public-brand memo, an SEO learning lens, a live-site link, and a GitHub link.
- Glossary-linked terms open an inline definition on pointer hover, keyboard focus, and click or touch. Escape, outside click, and the close button dismiss the popup. The trigger retains a direct full-glossary fallback.

## Evidence boundaries

- Secret Broker and Boho Analytics Platform use screenshots checked into their public repositories.
- How Biscuit, Rank Builder SEO, and Better Grades use the public `og.png` files checked into their repositories.
- The public bSuite MCP Monitor repository contains no checked-in product screenshot on its public branches and no release image. Its card therefore uses GitHub's public repository preview rather than fabricating a UI screenshot.
- Public statuses, version labels, licenses, and descriptions are limited to fields verified in the corresponding public repositories on 2026-07-16.

## Validation

Validation passed in both the local isolated worktree and `/srv/local1/worktrees/bohodigitalservices-tools-properties-popovers-20260716` on Bohopi:

- `corepack pnpm run build:pages`
- TypeScript `--noEmit`
- 15 of 15 rendered-route regression tests
- Glossary usage audit: 103 entries, 12 clusters, 62 referenced entries, and zero ambiguous labels
- ESLint: zero errors; 31 pre-existing warnings remain
- `git diff --check`

Production-mode browser checks passed at 1440 by 1000 and 390 by 844:

- Three selected-tool cards and three independent-property cards render.
- All six proof images load with non-zero natural dimensions.
- No horizontal document overflow occurs at either viewport.
- Definition popups remain inside the viewport.
- Hover, focus, Escape, outside click, touch click, and close-button behavior pass.
- No local application request or runtime errors occurred. The restricted QA browser blocked existing remote analytics and brand-icon requests; these were recorded as harness egress warnings, not local application failures.

## Review artifacts

- `tools-desktop-1440.png`
- `tools-mobile-390.png`
- `keyword-popup-desktop.png`
- `keyword-popup-mobile-390.png`
- `browser-qa.json`

## Changed-file inventory

- `app/components/DefinitionTerm.tsx`
- `app/components/KnowledgePages.tsx`
- `app/content/systems.ts`
- `app/globals.css`
- `tests/rendered-html.test.mjs`
- `public/proof/tools/bsuite-mcp-monitor.png`
- `public/proof/tools/boho-secret-broker.png`
- `public/proof/tools/boho-analytics-platform.png`
- `public/proof/properties/howbiscuit.png`
- `public/proof/properties/rankbuilderseo.png`
- `public/proof/properties/bettergrades.png`
- `artifacts/CR-2026-07-16-BOHO-PROPERTIES-POPOVERS-001/`

## Release and rollback

This change is prepared for an owner-only Sites review. It does not merge the public GitHub `main` branch, update the public Cloudflare Pages project, or change DNS, forms, analytics configuration, credentials, or production infrastructure.

Rollback the private review by redeploying the preceding Sites review version. Restore the feature source to baseline commit `ced0118ebd98705a40140e9bd85d0fd8879cac94` if the candidate must be discarded.
