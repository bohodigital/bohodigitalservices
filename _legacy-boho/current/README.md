# thepresidentofai.github.io

## Purpose

Astro-generated GitHub Pages site for `Boho Digital`, published from the `thepresidentofai` account.

## Brand Source of Truth

- `Boho Digital`
- `Bohemian Digital Marketing & SEO`
- `Organic growth, engineered beautifully.`
- forest / honeycomb visual system
- Ask the Owl educational layer
- Shortcut Fox warning modules
- climate-aware impact messaging
- provider-transfer support

## Project Structure

- `src/pages/` - route source of truth
- `src/data/` - site, navigation, service, and glossary data
- `src/content/dictionary/` - Owl Dictionary markdown entries
- `src/components/` - reusable Astro layout, section, UI, mascot, and glossary components
- `src/styles/` - split tokens, base, typography, layout, buttons, forms, honeycomb, sections, glossary, utilities, and animation styling
- `public/assets/` - local brand SVGs, patterns, textures, and supporting front-end assets
- `_legacy-static/` - archived pre-Astro static export kept only for reference during the migration
- `.github/workflows/deploy.yml` - GitHub Pages deployment pipeline for `dist/`

## Commands

Use a modern Node runtime, then run:

```bash
npm install
npm run build
npm run check
npm run preview
```

## Deployment

GitHub Actions builds the Astro project and deploys `dist/` to GitHub Pages.

Remote: `git@github.com:thepresidentofai/thepresidentofai.github.io.git`

## Verification

- Repository: `https://github.com/thepresidentofai/thepresidentofai.github.io`
- Published site: `https://bohodigitalservices.com/`
- GitHub Pages hostname: `https://thepresidentofai.github.io/`
