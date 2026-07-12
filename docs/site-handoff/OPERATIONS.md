# Website Operations and Continuation

## Current runtime shape

The preserved site is a Next-compatible React application built with:

- Next.js 16.2.6 APIs
- React 19.2.6
- vinext 0.0.50
- Vite 8.0.13
- Cloudflare Vite plugin 1.37.1
- Wrangler 4.92.0
- TypeScript 5.9.3
- pnpm 11.7.0

The normal build is Cloudflare Worker-native. It emits:

- `dist/server/index.js`: Worker entry
- `dist/server/ssr/`: server-rendering/RSC modules
- `dist/client/`: browser JavaScript, CSS, images, favicon, and headers
- `dist/.openai/hosting.json`: staged Sites project metadata

Generated `dist/` output is not committed. Rebuild it from source.

## Local setup

From the parent repository:

```bash
cd website
pnpm install --frozen-lockfile
pnpm run dev
```

The required Node version is 22.13 or newer.

On the original Windows Codex review machine, a simple local-only development
session used `BOHO_LOCAL_REVIEW=1`. That variable disables the Cloudflare
runtime plugin for the local preview only. Do not set it for the production
build.

PowerShell example:

```powershell
$env:BOHO_LOCAL_REVIEW = "1"
pnpm run dev
```

## Required validation

Run these after any source change:

```bash
pnpm exec tsc --noEmit
pnpm run build
node --test tests/rendered-html.test.mjs
git diff --check
```

The test suite verifies:

- complete server-rendered homepage
- all 44 interior route configurations
- valid fragment targets
- private/noindex metadata
- required design-system tokens
- disconnected form language
- absence of starter/demo artifacts
- glossary popover propagation across primary page families
- section navigation on interior page families
- scalable Glossary controls and canonical term anchors
- official external links opening in isolated new tabs

For a visual change, also review at a wide desktop, laptop, tablet, ordinary
phone, and narrow phone width. The previous accepted pass used 1600, 1280, 820,
390, and 320 pixel widths.

## Current private Sites deployment

- URL: <https://boho-digital-services-review-2026.mankopoppi.chatgpt.site/>
- Access: owner-only at handoff
- Saved version: 5
- Source commit used for version 6:
  `926ce66d5a7cca181aec1c0744a6f5c8af1e936d`
- Sites project ID:
  `appgprj_6a516a14d75c8191a6fc190567486cb4`
- D1: none
- R2: none

The deployment is an owner-only review surface, not permission to publish
publicly. Do not rotate or recreate the Sites project, change access, or deploy
a new version without an explicit owner request.

### Local preview limitation observed July 11, 2026

In the Windows review environment, `vinext start` returned the application HTML
but 404ed its `/assets/` client files. The packaged Sites deployment served the
same compiled assets correctly. Use `pnpm run dev` with `BOHO_LOCAL_REVIEW=1`
for ordinary local work, and validate the final packaged artifact on the
owner-only Sites URL. Do not accept an unstyled `vinext start` page as visual QA.

## Cloudflare portability

### Lowest-change path: Cloudflare Workers

The current architecture already targets Cloudflare Workers plus static assets.
The Vite configuration wires the Cloudflare plugin to `worker/index.ts`, and the
build produces a Worker entry and static asset directory. A future migration to
a direct Cloudflare Worker/Workers Builds project should preserve this model.

Before a direct Cloudflare launch:

1. Create or select the intended Cloudflare account/project.
2. Add a deliberate Wrangler configuration or use Cloudflare's supported
   framework setup.
3. Test with the workerd runtime, not only the Node development server.
4. Preserve `nodejs_compat` and a supported compatibility date.
5. Connect the domain only after content, legal, form, privacy, and indexation
   approvals are complete.

### Optional pure Cloudflare Pages path

The visual/content implementation is an excellent static-export candidate, but
the current `dist/` directory is not a drop-in Pages static artifact. It contains
a Worker/SSR bundle and no route HTML files.

A future Pages conversion can remain in the same codebase. The minimum planned
changes are:

1. Add a separate static Next build using `output: "export"` and normally
   `trailingSlash: true`.
2. Add a dedicated command such as `build:pages` that runs `next build`.
3. Replace the request-time `headers()` call in `app/layout.tsx` with a
   build-time canonical site URL for social metadata, or omit absolute social
   URLs until the domain is known.
4. Add `export const dynamicParams = false` to the catch-all route. All routes
   are already enumerated by `generateStaticParams()`.
5. Configure Cloudflare Pages to publish `out/`.
6. Verify `out/index.html`, `out/404.html`, and one route HTML file for every
   configured slug.
7. Add static-output tests rather than relying only on the Worker rendering
   tests.

No design, content, navigation, or form-component rewrite should be required.
The client-side mobile menu and disconnected local forms are compatible with a
static host.

If a future Pages preview must remain private, protect its hostname with
Cloudflare Access. The current Sites owner-only sign-in does not transfer to a
new Cloudflare project automatically.

## Forms

`website/app/components/DraftForm.tsx` prevents submission and only increments
local React state to show a confirmation. It does not call `fetch`, an action,
an API route, email, analytics, storage, or a third party.

Connecting forms later requires a separate approved change covering:

- processor selection
- destination/notification address
- spam and abuse protection
- server-side validation
- secrets management
- privacy notice and consent
- retention and deletion policy
- success/error states
- accessibility testing
- logging rules
- sensitive-data warnings

Never put processor credentials in Git. Do not silently turn the current form
button into a real submission.

## Analytics and search

No analytics integration is active. All pages are noindexed. A production
search launch must deliberately address:

- final canonical domain
- robots/indexation policy
- sitemap generation
- canonical URLs
- final Open Graph URLs
- Search Console ownership
- analytics/cookie consent, if used
- structured data based only on verified facts

Do not add guaranteed rankings, fake traffic claims, or fabricated local
business information.

## Content changes

- Homepage changes: edit `website/app/Homepage.tsx`.
- Interior route changes: edit the appropriate `PageConfig` in
  `website/app/content/`.
- Shared layout/component changes: edit `website/app/components/`.
- Global styling and responsive behavior: edit `website/app/globals.css`.
- Metadata: edit `website/app/layout.tsx`, the homepage metadata, or route
  metadata generation.

Prefer extending the shared components and structured content model over
copying whole pages.

## Branch and release discipline

- Keep `main` stable until the website handoff branch is reviewed.
- Continue website work from `site/private-review-v2-handoff` or from a clearly
  named child branch.
- Do not rewrite or force-push the archival branch.
- Commit source, tests, and relevant documentation together.
- Tag a reviewed milestone before any production migration.
- Never commit `.env` files, API keys, Sites tokens, Cloudflare tokens, browser
  profiles, or form secrets.

## Recovery

The Pi Git branch is the durable handoff. Git history records the exact tree and
work-order copy. If a working checkout is damaged:

```bash
git fetch origin
git switch site/private-review-v2-handoff
cd website
pnpm install --frozen-lockfile
pnpm run build
node --test tests/rendered-html.test.mjs
```

Do not use destructive reset commands when a working tree contains unreviewed
changes. Create a recovery branch or a second clone first.
