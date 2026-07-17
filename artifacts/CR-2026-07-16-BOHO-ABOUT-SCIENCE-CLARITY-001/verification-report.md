# About science and clarity review candidate

Date: 2026-07-16

Status: owner-only review candidate; not approved for production

Implementation commit: `1ad214594d2bd0a1af0b15c5921e3be3c5f7d19b`

Branch: `feature/about-science-clarity-20260716`

Base: `310136d7348b03df214d81d7a12a3bd4cf247fe8`

## Outcome

The About page now uses a dark electron-density simulation as the lead scientific image, places “What Boho Believes” directly after the hero, uses the approved closing “That is the company I built,” and presents the professional background with structural MRI, fMRI, ODE phase-field, and Ramón y Cajal neuron references.

Ambiguous prose use of `lead` is excluded from automatic glossary linking on this page. Technical glossary terms remain interactive. The page has one retained decision diagram, a numbered testbed ledger, one consistent list treatment, and rebuilt three-card evidence ledgers.

## Scope and changed-file inventory

- `app/components/AboutPage.tsx`: scene order, scientific imagery, clearer item copy, evidence cards, and diagram reduction.
- `app/components/DefinedText.tsx`: optional per-page glossary-slug exclusions.
- `app/about-page.css`: electron-cloud frame, science gallery, list system, decision panel, testbed ledger, evidence cards, and responsive rules.
- `tests/rendered-html.test.mjs`: ordering, imagery, ambiguous-term, old-diagram, card-copy, and asset regressions.
- `public/proof/about/science/`: five attributed scientific image assets.
- `artifacts/about-page-headless-qa.json`: machine-readable headless browser matrix.
- `artifacts/screenshots/` and `artifacts/scene-captures/`: updated viewport and twelve-scene review captures.

No form, route, analytics, DNS, production-hosting, or production-configuration file changed.

## Scientific image sources

- Electron-density simulation: Geek3, CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Atomic-orbital-clouds_spdf_m0.png
- Structural MNI152 MRI: Vladimir Fonov, CC BY 3.0 — https://commons.wikimedia.org/wiki/File:Mni_icbm152_sym_09c_small.jpg
- Functional MRI rendering: NIMH / NIH, public domain, distributed through MIT OpenCourseWare — https://ocw.mit.edu/courses/res-9-005-fmri-bootcamp-fall-2017/resources/mitres9_005_f17_jpg/
- Lotka–Volterra phase portrait: Wiso, CC BY-SA 3.0, with a CSS tonal treatment — https://commons.wikimedia.org/wiki/File:Lotka-Volterra.svg
- Purkinje neuron drawing: Santiago Ramón y Cajal, public domain, with a CSS tonal treatment — https://commons.wikimedia.org/wiki/File:Cajal_-_a_purkinje_neuron_from_the_human_cerebellum.jpg

Every public use includes adjacent source and license text. No external image is presented as Boho-owned work.

## Validation

Local exact-commit checks:

- TypeScript: pass.
- ESLint: pass with 34 warnings and zero errors. The warnings are existing unused-variable/image-optimization advisories plus the static-site `<img>` advisories for the new local assets.
- Vinext / Cloudflare Pages build and `prepare-pages`: pass.
- Rendered-output suite: 16 of 16 pass.
- `git diff --check`: pass.

Headless visual and interaction QA:

- Microsoft Edge driven by Playwright in headless mode only; no interactive browser or computer control.
- Viewports: 320×900, 768×1000, 1024×1000, and 1440×1000.
- 200% zoom-equivalent layout: pass.
- Horizontal overflow: none.
- Sixteen itemized lists: no item overflow.
- Eight About-page images: all loaded and all have alternative text.
- Ambiguous `lead` glossary trigger: absent.
- Glossary popover: opens, stays above site layers at `z-index: 2147483000`, remains within the viewport, and closes with Escape.
- Keyboard path: reaches all three owned-property links and the Contact action.
- Browser console and page exceptions: none. Analytics and Google Tag Manager were intentionally blocked during isolated QA.

Pi validation:

- Isolated worktree: `/srv/local1/worktrees/bohodigitalservices-about-science-clarity-20260716`
- Exact HEAD: `1ad214594d2bd0a1af0b15c5921e3be3c5f7d19b`
- Locked dependency install: pass.
- TypeScript: pass.
- ESLint: zero errors, 34 warnings.
- Pages build: pass.
- Rendered-output suite: 16 of 16 pass.
- Canonical production checkout remained clean at `ced0118ebd98705a40140e9bd85d0fd8879cac94`.

Private Sites verification:

- Project: `appgprj_6a516a14d75c8191a6fc190567486cb4`
- Version: 33
- Deployment: `appgdep_6a5974637aa48191bcb276937f2012ae`
- Commit: `1ad214594d2bd0a1af0b15c5921e3be3c5f7d19b`
- Access: custom owner-only policy, one allowed user, no allowed groups.
- Deployment status: succeeded.
- Authenticated HTTP verification: `/about/` returned 200; all five new scientific assets returned 200; new copy, order, cards, and ambiguous-term behavior were present; removed diagrams were absent.

The public production About page was checked separately and still shows the prior production page. The private review release did not alter production.

## Known gaps and risk

- Owner visual approval is still required before any production release.
- Sites’ external review host cannot be treated as a substitute for production-domain analytics, caching, or search-engine behavior.
- Static `<img>` elements are deliberate in the current Vinext/Cloudflare build lane; future image-pipeline work may reduce transfer size, but it is outside this bounded About-page pass.

Risk level: low for private review; production risk remains unassessed until an approved production release candidate is built from the reviewed commit.

## Rollback

For the owner-only review site, redeploy Sites version 32 (`310136d7348b03df214d81d7a12a3bd4cf247fe8`). The canonical production checkout and public domain require no rollback because they were not changed.
