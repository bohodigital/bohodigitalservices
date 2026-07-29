# Services asset restoration ledger

Work order: `WO-2026-07-27-BOHO-SERVICES-ASSET-RECOVERY-088`

Baseline commit: `ea7e8be9a43287c95911c079cfb6a55124107da8`

Audit date: 2026-07-28

## Audit method and terminology

The baseline was built before implementation and the generated HTML for `/services/`, all five service details, `/tools/`, and `/about/` was inspected. Source references were checked independently with `git grep` at the baseline commit. A path present in data but absent from generated `<img>` markup is recorded as not rendered.

The repository's `corepack pnpm run build:pages` wrapper attempted dependency installation and could not continue in the network-restricted, non-interactive environment. No package or lockfile changed. The audit and final builds therefore used the existing locked dependency tree and its local binaries:

```text
node scripts/generate-service-page-data.mjs
./node_modules/.bin/next build
node scripts/prepare-pages.mjs
```

“Baseline app references” and “baseline rendered routes” below describe the exact starting commit. “Final destination” records the post-restoration route and section. A “preserve” decision means retain an already-correct public placement; it does not mean move that asset into Services.

Caption categories are written out in the table. “Existing credited About caption” means the visible title, creator/source, and license already rendered by `app/components/AboutPage.tsx`; “existing licensed Industries disclosure” means the visible representative-setting/not-client-work disclosure already rendered by the Industries system.

## Complete baseline inventory and final decision

| Asset path | Dimensions | Baseline app references | Baseline rendered routes | Provenance | Intended role | Required destination | Reuse limit | Caption requirement | Final decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/diagrams/boho-hosting-architecture-v2.png` | 1672x941 | none | none | owner supplied | diagram | `/services/web-design-redesign/` — Hosting, ownership, and exit | one route | Factual architecture figure; ownership/exit context; full text equivalent | restore |
| `/diagrams/how-boho-works-v1.png` | 1672x941 | none | none | archival | archive | none — immutable source | archive only | No public caption; source remains unrendered | archive |
| `/diagrams/how-boho-works-v2-transparent.png` | 1672x941 | none | none | owner supplied | diagram | `/services/` — How a project moves | one route | No redundant caption repeating Discover, Design, Build, and Launch; full text equivalent required | restore |
| `/proof/about/better-grades-homepage.png` | 1440x1000 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | superseded | archive | none — redundant older property screenshot | archive only | No Services caption | archive-superseded |
| `/proof/about/how-biscuit-homepage.png` | 1440x1000 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | superseded | archive | none — redundant older property screenshot | archive only | No Services caption | archive-superseded |
| `/proof/about/rank-builder-seo-homepage.png` | 1440x1000 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | superseded | archive | none — redundant older property screenshot | archive only | No Services caption | archive-superseded |
| `/proof/about/science/brain-fmri.jpg` | 340x257 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | approved | contextual image | `/about/` only — founder scientific background | one route | Existing credited About caption: NIMH/NIH, public domain | preserve about-only |
| `/proof/about/science/brain-mri.jpg` | 700x276 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | approved | contextual image | `/about/` only — founder scientific background | one route | Existing credited About caption: Vladimir Fonov, CC BY 3.0 | preserve about-only |
| `/proof/about/science/cajal-purkinje-neuron.jpg` | 720x1024 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | approved | contextual image | `/about/` only — founder scientific background | one route | Existing credited About caption: Santiago Ramón y Cajal, public domain, tonal treatment | preserve about-only |
| `/proof/about/science/electron-cloud.png` | 1600x1600 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | approved | contextual image | `/about/` only — founder scientific background | one route | Existing credited About caption: Geek3, CC BY-SA 4.0 | preserve about-only |
| `/proof/about/science/ode-phase-field.png` | 1280x1072 | `app/components/AboutPage.tsx`; `tests/rendered-html.test.mjs` | `/about/` | approved | contextual image | `/about/` only — founder scientific background | one route | Existing credited About caption: Wiso, CC BY-SA 3.0, tonal treatment | preserve about-only |
| `/proof/properties/bettergrades.png` | 1731x909 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/web-design-redesign/` — Owned systems with different jobs | shared diagram | `Owned Boho property. Not a client project.` | preserve and selectively reuse |
| `/proof/properties/howbiscuit.png` | 1734x907 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/web-design-redesign/` — Owned systems with different jobs | shared diagram | `Owned Boho property. Not a client project.` | preserve and selectively reuse |
| `/proof/properties/rankbuilderseo.png` | 1536x1024 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/web-design-redesign/` — Owned systems with different jobs | shared diagram | `Owned Boho property. Not a client project.` | preserve and selectively reuse |
| `/proof/tools/boho-analytics-platform.png` | 1440x1050 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/research-audits-strategy/` — Measurement systems behind the work | shared diagram | `Public repository evidence from an owned Boho system.` plus `Example data only` and `Not a client result` | preserve and selectively reuse |
| `/proof/tools/boho-secret-broker.png` | 1180x720 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/custom-digital-solutions/` — Selected systems we actually operate | shared diagram | `Public repository evidence from an owned Boho system.` plus `Owned Boho system` and `Not a client project` | preserve and selectively reuse |
| `/proof/tools/bsuite-mcp-monitor.png` | 1200x600 | `app/content/systems.ts` | `/tools/` | proof screenshot | proof | `/tools/` canonical; `/services/custom-digital-solutions/` — Selected systems we actually operate | shared diagram | `Public repository evidence from an owned Boho system.` plus `Owned Boho system` and `Not a client project` | preserve and selectively reuse |
| `/visuals/creative-process.webp` | 1200x1800 | none | none | licensed editorial | chapter image | `/services/web-design-redesign/` — Design planning and information architecture | one route | `Licensed editorial image representing design planning and visual decision work. Not client work.` | restore |
| `/visuals/growth-analysis.webp` | 1400x933 | `app/components/PricingPage.tsx`; `tests/rendered-html.test.mjs` | `/pricing/` | licensed editorial | chapter image | `/services/ongoing-seo/` — Continued improvement and measurement | one route | `Licensed editorial metaphor for steady, compounding improvement. Not a performance chart or client result.` | restore to Services; preserve immutable Pricing baseline |
| `/visuals/homepage-design-studio-v2.webp` | 1067x1600 | none | none | licensed editorial | archive | none — retained homepage design source | archive only | No current public caption | archive |
| `/visuals/homepage-industry-b2b-v2.webp` | 1600x1068 | `app/content/industries.ts` | `/industries/`; `/industries/professional-b2b-services/` | licensed editorial | contextual image | Existing Industries system only | shared diagram | Existing licensed Industries disclosure | preserve |
| `/visuals/homepage-industry-contractors-v2.webp` | 1067x1600 | `app/content/industries.ts` | `/industries/`; `/industries/home-improvement-contractors/` | licensed editorial | contextual image | Existing Industries system only | shared diagram | Existing licensed Industries disclosure | preserve |
| `/visuals/homepage-industry-ecommerce-v2.webp` | 1600x1068 | `app/content/industries.ts` | `/industries/`; `/industries/online-retail-ecommerce/` | licensed editorial | contextual image | Existing Industries system only | shared diagram | Existing licensed Industries disclosure | preserve |
| `/visuals/homepage-industry-local-service-v2.webp` | 1067x1600 | `app/content/industries.ts` | `/industries/`; `/industries/local-service-businesses/` | licensed editorial | contextual image | Existing Industries system only | shared diagram | Existing licensed Industries disclosure | preserve |
| `/visuals/homepage-industry-retail-v2.webp` | 1067x1600 | `app/content/industries.ts` | `/industries/`; `/industries/brick-and-mortar-retail-hospitality/` | licensed editorial | contextual image | Existing Industries system only | shared diagram | Existing licensed Industries disclosure | preserve |
| `/visuals/industry-b2b.webp` | 1000x667 | none | none | superseded | archive | none — superseded by `homepage-industry-b2b-v2.webp` | archive only | No public caption | archive-superseded |
| `/visuals/industry-contractors.webp` | 1000x667 | none | none | superseded | archive | none — superseded by `homepage-industry-contractors-v2.webp` | archive only | No public caption | archive-superseded |
| `/visuals/industry-ecommerce.webp` | 1000x668 | none | none | superseded | archive | none — superseded by `homepage-industry-ecommerce-v2.webp` | archive only | No public caption | archive-superseded |
| `/visuals/industry-local-service.webp` | 1000x1333 | none | none | superseded | archive | none — superseded by `homepage-industry-local-service-v2.webp` | archive only | No public caption | archive-superseded |
| `/visuals/industry-retail.webp` | 1000x800 | none | none | superseded | archive | none — superseded by `homepage-industry-retail-v2.webp` | archive only | No public caption | archive-superseded |
| `/visuals/met-water-textile.webp` | 1200x1004 | none | none | approved | archive | none; only eligible for a future explicit website design-reference module | archive only | If used later: public-domain Met source disclosure and design-reference/not-client-work boundary | conditionally use: archive-approved because this page has no explicit historic-reference translation module |
| `/visuals/migration-infrastructure.webp` | 1200x1800 | none | none | licensed editorial | chapter image | `/services/provider-rescue/` — Dependency chain and migration runbook | one route | `Licensed editorial image representing infrastructure maintenance and migration work. Not client work.` | restore |
| `/visuals/research-notebook.webp` | 1600x1068 | none | none | licensed editorial | chapter image | `/services/research-audits-strategy/` — Evidence review and research scope | one route | `Licensed editorial image representing research and evidence review. Not client work.` | restore |
| `/visuals/services/custom-digital-solutions-v1.webp` | 1536x1024 | `app/content/servicePresentation.ts` | none | approved | hero | `/services/custom-digital-solutions/` — primary service illustration; small `/services/` navigation marker permitted | one route | `Original editorial illustration explaining the service concept. Not client work or performance evidence.` | restore |
| `/visuals/services/ongoing-seo-v1.webp` | 1536x1024 | `app/content/servicePresentation.ts`; `app/components/PricingPage.tsx`; `tests/rendered-html.test.mjs` | `/pricing/` | approved | hero | `/services/ongoing-seo/` — primary service illustration; small `/services/` navigation marker permitted | one route | `Original editorial illustration explaining the service concept. Not client work or performance evidence.` | restore to detail and hub marker; preserve immutable Pricing baseline |
| `/visuals/services/provider-rescue-v1.webp` | 1536x1024 | `app/content/servicePresentation.ts` | none | approved | hero | `/services/provider-rescue/` — primary service illustration; small `/services/` navigation marker permitted | one route | `Original editorial illustration explaining the service concept. Not client work or performance evidence.` | restore |
| `/visuals/services/research-audits-strategy-v1.webp` | 1536x1024 | `app/content/servicePresentation.ts`; `app/components/PricingPage.tsx`; `tests/rendered-html.test.mjs` | `/pricing/` | approved | hero | `/services/research-audits-strategy/` — primary service illustration; small `/services/` navigation marker permitted | one route | `Original editorial illustration explaining the service concept. Not client work or performance evidence.` | restore to detail and hub marker; preserve immutable Pricing baseline |
| `/visuals/services/web-design-redesign-v1.webp` | 1536x1024 | `app/content/servicePresentation.ts`; `app/components/PricingPage.tsx`; `tests/rendered-html.test.mjs` | `/pricing/` | approved | hero | `/services/web-design-redesign/` — primary service illustration; small `/services/` navigation marker permitted | one route | `Original editorial illustration explaining the service concept. Not client work or performance evidence.` | restore to detail and hub marker; preserve immutable Pricing baseline |

## Final source and rendered-reference map

| Asset family | Final canonical source references | Actual rendered routes |
| --- | --- | --- |
| Service illustrations, four restored editorial images, hosting diagram, process source/derivative, Met conditional record | `app/content/serviceAssets.ts`; rendered by `app/components/services/ServiceVisualFigure.tsx`, `app/components/services/ServiceAssetModules.tsx`, `app/components/ServiceDetailPage.tsx`, and `app/components/ServicesPage.tsx` | Assigned detail route exactly once in main; five small markers on `/services/`; process derivative once on `/services/`; growth and three service illustrations also retain their pre-existing `/pricing/` occurrences; source process and Met asset remain unrendered |
| Selected tool proof | Canonical metadata only in `app/content/systems.ts`; selected by object reference in `app/content/serviceAssets.ts`; rendered by `app/components/KnowledgePages.tsx` and `app/components/services/ServiceProofModule.tsx` | All three on `/tools/`; bSuite and Secret Broker on `/services/custom-digital-solutions/`; Analytics Platform on `/services/research-audits-strategy/` |
| Owned property proof | Canonical metadata only in `app/content/systems.ts`; selected by object reference in `app/content/serviceAssets.ts`; rendered by `app/components/KnowledgePages.tsx` and `app/components/services/ServiceProofModule.tsx` | All three on `/tools/` and `/services/web-design-redesign/` |
| About property screenshots | `app/components/AboutPage.tsx`; covered by `tests/rendered-html.test.mjs` | `/about/` only; never Services |
| About science assets | `app/components/AboutPage.tsx`; covered by `tests/rendered-html.test.mjs` | `/about/` only; never Services |
| Current Industries v2 images | `app/content/industries.ts`; rendered by `app/components/IndustryVisuals.tsx` | `/industries/` and each matching Industry detail route; never Services |
| Superseded Industry images and unused homepage-design source | none in `app/` | none |

Proof metadata is not copied into a service-only structure. Repository/source URL, evidence type, last-verified date, alt text, dimensions, and evidence source remain in `selectedTools` and `ownedWebsites` in `app/content/systems.ts`.

## Git-history recovery findings

The required `git log --all`, `git log -S ... --all -- app`, and `git show` checks were run before implementation. Commit `fda832d` introduced the five visual IDs as registry metadata. Its `app/components/SystemsVisuals.tsx` contains only the two already-public components, `layered-infrastructure` and `repair-integrate-build`; the parent commit has no `SystemsVisuals.tsx`. No earlier component implementation exists for any of the five IDs.

| Visual ID | Prior implementation | Recovery decision |
| --- | --- | --- |
| `website-release-flow` | not found; metadata only | Rebuilt because only metadata existed; semantic React/HTML/CSS with visible sequence, caption, and complete text equivalent |
| `measurement-search-signal-flow` | not found; metadata only | Rebuilt because only metadata existed; semantic React/HTML/CSS with source labels, attribution limits, caption, and complete text equivalent |
| `controlled-automation-mcp-interface` | not found; metadata only | Rebuilt because only metadata existed; semantic React/HTML/CSS with approval/failure boundaries, caption, and complete text equivalent |
| `ownership-map` | not found; metadata only | Rebuilt because only metadata existed; semantic React/HTML/CSS with all required layers/states, caption, and complete text equivalent |
| `lean-direct-operation` | not found; metadata only | Rebuilt because only metadata existed; semantic React/HTML/CSS with neutral qualifier, caption, and complete text equivalent |

The two already-public Tools visuals remain canonical component/data implementations. `layered-infrastructure` is reused on the website service route; `repair-integrate-build` is reused on the custom-solutions route. Neither was forked or duplicated.

## Baseline constraint: Pricing

The work order simultaneously requires `growth-analysis.webp` not to repeat on Pricing and forbids any Pricing source or pricing-page change. The exact baseline already rendered `growth-analysis.webp` and the ongoing SEO, website design, and research service illustrations on `/pricing/`. Because Pricing is immutable and a stop condition prohibits affecting another page, those baseline occurrences were preserved byte-for-byte. Service inventory assertions therefore enforce “exactly one required service route” across the Services detail routes while separately proving that Pricing source and rendered output remain unchanged.

## Placement rationale

Every public Services asset has one explicit job:

- ORIENT: the connected Services map and each primary commissioned illustration.
- EXPLAIN: local customer path, release flow, hosting architecture, layered infrastructure, ownership map, measurement flow, repair/integrate/build, controlled automation, process figure, and lean operating comparison.
- PROVE: canonical owned-tool and owned-property screenshots with visible evidence boundaries.
- DIFFERENTIATE: the four licensed editorial chapter images with specific not-client-work captions.

The Met textile remains `archive-approved`: without a genuine historic-reference-to-modern-system chapter, rendering it would be decorative rather than explanatory. Superseded and About-only families remain outside Services.
