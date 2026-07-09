# Boho Digital

Astro-based marketing site for `bohodigitalservices.com`, rebuilt on top of AstroWind as a clean reset from the earlier custom implementation.

## Brand

- `Boho Digital`
- `Bohemian Digital Marketing & SEO`
- `Organic growth, engineered beautifully.`

## Current routes

- `/`
- `/services/`
- `/services/provider-transfer/`
- `/ask-the-owl/`
- `/ask-the-owl/dictionary/`
- `/bad-seo-field-guide/`
- `/impact/`
- `/work/`
- `/about/`
- `/contact/`
- `/pricing/`
- `/privacy/`
- `/terms/`
- `/404/`

## Project structure

- `src/pages/` - route source of truth
- `src/data/boho.ts` - approved Boho content blocks, cards, and glossary data
- `src/components/` - AstroWind-based widgets, shared UI, and layout pieces used by the reset
- `src/assets/styles/tailwind.css` - theme tokens and shared utility styling
- `public/assets/` - Boho brand assets, patterns, and background imagery
- `wrangler.toml` - Cloudflare Pages deployment config
- `wrangler.worker.toml` - preserved Workers Static Assets fallback config; not the normal production path
- `vendor/integration/` - AstroWind integration used by the site config
- `_legacy-boho/current/` - archive of the pre-reset implementation kept for reference only

## Commands

Use Node 22 or newer, then run:

```bash
npm ci
npm run build
npm run preview
```

Optional verification:

```bash
npm run check
```

## Deployment

Production is served from Cloudflare Pages project `bohodigitalservices`.

Current state:

- `bohodigitalservices.com` and `www.bohodigitalservices.com` are attached to the Cloudflare Pages project.
- The Cloudflare Pages project is not currently Git-provider connected, so production deploys are direct uploads from this repo.
- GitHub remains the source of truth for code. Push `main` first, then deploy the exact pushed commit.
- GitHub Pages is not used for production, and this repo intentionally does not ship a `public/CNAME` file.

Deploy the current commit:

```powershell
npm run build
$commit = (git rev-parse HEAD).Trim()
$message = (git log -1 --pretty=%s).Trim()
wrangler pages deploy dist --project-name bohodigitalservices --branch main --commit-hash $commit --commit-message $message --commit-dirty=false
```

Use `wrangler pages deploy` for the production Pages project. Do not use plain
`wrangler deploy` for production site updates unless intentionally publishing a
separate Workers Static Assets deployment from `wrangler.worker.toml`.

Verify the live site:

```bash
curl https://bohodigitalservices.com/build-info.json
```

The returned `commit` should match `git rev-parse HEAD`.
