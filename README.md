# Boho Digital Services Website

This repository contains the complete review-draft Boho Digital Services
website produced from the **Boho Digital Services Full Website Design and
Content Work Order v1.0**.

The site is a multi-route Next-compatible React application built with vinext,
Vite, and Cloudflare's Vite plugin. Its normal build emits a Cloudflare
Worker-compatible server entry plus static client assets. The Pages build adds
an advanced-mode adapter so both are deployed together. It does not use Astro
or AstroWind.

## Current status

- Review draft; all routes are `noindex, nofollow`.
- Forms are visually and accessibly complete but intentionally disconnected.
- No analytics account, external form processor, paid service, custom domain,
  or DNS change is introduced by this source snapshot.
- Fictional UI examples are labeled **Concept interface**.
- No invented clients, testimonials, performance metrics, rankings, revenue,
  reviews, offices, staff, awards, or certifications are present.

## Requirements

- Node.js 22.13 or newer
- pnpm 11.7.0 (pinned in `package.json`)

## Work locally

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

The dev server prints the local URL. On the Windows Codex review machine,
`BOHO_LOCAL_REVIEW=1` may be set for a local-only preview that does not start
the Cloudflare runtime plugin.

## Validate

```bash
pnpm exec tsc --noEmit
pnpm run build
node --test tests/rendered-html.test.mjs

# Build the Cloudflare Pages advanced-mode output
pnpm run build:pages
```

The rendered HTML suite verifies the complete homepage, private/noindex
guardrails, design-system requirements, absence of starter artifacts, all
configured routes and fragment targets, glossary propagation, section
navigation, scalable glossary controls, and safe external-link behavior.

GitHub Actions repeats the typecheck, Pages build, and rendered HTML tests for
published branches. Production deployments are made from the exact pushed
commit by the Pi's fixed-reference Cloudflare deploy wrapper, so the API token
does not need to leave the encrypted local broker.

## Important directories

- `app/Homepage.tsx`: homepage narrative and homepage-specific modules.
- `app/components/`: shared chrome, cards, forms, mobile navigation, section
  sidebars, glossary explorer, definition popovers, and reusable interior-page
  renderer.
- `app/content/`: the structured content source for every interior route.
- `scripts/analyze-glossary-usage.mjs`: repeatable current-copy frequency scan.
- `app/globals.css`: design system, responsive behavior, motifs, and styling.
- `public/`: favicon and the bespoke social-preview image.
- `worker/index.ts`: Cloudflare Worker entry point.
- `scripts/prepare-pages.mjs`: writes the Pages advanced-mode adapter after a
  successful vinext build.
- `wrangler.jsonc`: production Pages output and runtime compatibility settings.
- `.github/workflows/validate-cloudflare-pages.yml`: validates deployable output.
- `.openai/hosting.json`: existing private Sites project identity; do not
  replace or invent its ID.

## Source of truth and handoff

Read these before changing the site:

1. `docs/source/boho_digital_full_site_work_order_v1.md`
2. `docs/site-handoff/README.md`
3. `docs/site-handoff/ROUTES.md`
4. `docs/site-handoff/OPERATIONS.md`
5. `docs/site-handoff/TRANSFER-MANIFEST.md`

The work order controls content, information architecture, safety constraints,
and design direction. The handoff documents record the implemented state and
how to continue without losing the current review build.
