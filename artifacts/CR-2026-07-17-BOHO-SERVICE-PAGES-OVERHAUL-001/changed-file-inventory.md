# Changed-file inventory

## Governed intake and deterministic generation

- `.gitattributes` (preserves byte-exact owner Markdown while keeping ordinary whitespace checks active)
- `content/service-pages/01-ongoing-seo-search-growth.md`
- `content/service-pages/02-web-design-website-redesign.md`
- `content/service-pages/03-website-migration-provider-rescue.md`
- `content/service-pages/04-digital-research-seo-audits-strategy.md`
- `content/service-pages/05-custom-web-digital-solutions.md`
- `scripts/generate-service-page-data.mjs`
- `app/content/servicePages.generated.ts`
- `app/content/serviceRoutePages.ts`
- `app/content/pricingPolicy.mjs`

## New service, pricing, and evidence presentation

- `app/components/ServicesPage.tsx`
- `app/components/ServiceDetailPage.tsx`
- `app/components/PricingPage.tsx`
- `app/components/WorkEvidencePage.tsx`
- `app/service-pages.css`
- `app/globals.css`
- `app/[...slug]/page.tsx`
- `app/sitemap.ts`

## Taxonomy, navigation, resource, pricing, and intake reconciliation

- `app/Homepage.tsx`
- `app/components/KnowledgePages.tsx`
- `app/components/ResourcesPage.tsx`
- `app/components/SectionNavigation.tsx`
- `app/components/SiteChrome.tsx`
- `app/content/audiencePages.ts`
- `app/content/corePages.ts`
- `app/content/navigation.ts`
- `app/content/operatingCycle.ts`
- `app/content/publicPages.ts`
- `app/content/systems.ts`
- `scripts/prepare-pages.mjs`
- `package.json`

## Regression and headless QA

- `tests/rendered-html.test.mjs`
- `scripts/qa-popup-priority.mjs`
- `scripts/qa-sitewide-headless.mjs`
- `scripts/qa-service-pages-headless.mjs`
- `artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/headless/service-pages-headless-qa.json`
- Twelve desktop/mobile PNGs under `artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/headless/`

## Review and release records

- `artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/verification-report.md`
- `artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/release-guard.json`
- `artifacts/CR-2026-07-17-BOHO-SERVICE-PAGES-OVERHAUL-001/changed-file-inventory.md`
