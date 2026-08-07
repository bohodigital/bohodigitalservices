# Resources visual asset pass

Date: 2026-08-07

Status: asset discovery, design, and review only. No asset in this folder is
wired into a public route, and this pass did not publish or deploy the website.

## Result

The site does not primarily have an image shortage. It has an active-placement
regression.

- The canonical export contains 182 routes.
- 154 of those routes are the glossary hub and term pages.
- Of the remaining 28 indexable canonical routes, 10 currently contain a
  meaningful content image and 18 contain only shared chrome imagery.
- Only two genuine editorial photographs currently render anywhere:
  `research-notebook.webp` and `growth-analysis.webp`, both on
  `/services/research-audits-strategy/`.
- `/resources/` has four strong first-party product captures, but no opening
  editorial image and no plain-language Search Console teaching graphic.
- `/learn/`, `/learn/website-buying/`, `/learn/provider-rescue/`, `/about/`,
  `/industries/`, and all five Industry detail routes currently have no content
  photograph.

The repository already contains a governed photography library. Much of it
fell out of the active component tree during the front-door rewrite. The best
next move is to restore those assets where their existing provenance allows,
then add the new data graphics and original editorial composites in this pass.

## New original editorial assets

The lossless PNGs are source files. The stripped quality-84 WebP files are the
delivery candidates.

### Boho Analytics workbench with real interface

- Preferred file:
  `editorial/boho-analytics-workbench-real-ui-composite-v1.webp`
- Source file:
  `editorial/boho-analytics-workbench-real-ui-composite-v1.png`
- Use: opening Resources/Analytics image, Analytics product card, or an SEO
  teaching page
- Classification: original Boho editorial composite with a real first-party
  Boho Analytics interface capture
- Required visible label: `Synthetic development demo · No client data`
- Alt text: `Editorial analytics workbench with a laptop displaying the Boho
  Analytics Growth Command Center labeled Demo data, beside a notebook, color
  swatches, magnifying glass, and hardware security key.`
- Caption: `Original Boho editorial composite. The laptop shows Boho Analytics
  with synthetic development-demo data. Not client data or a forecast.`
- Boundary: the base is an original generated editorial scene, not a
  photograph of a real Boho office or staff member. The screen insert is the
  existing first-party product capture
  `boho-analytics-demo-command-center-20260806.webp` and was not redrawn by the
  image generator.

### Boho Analytics workbench with abstract screen

- Delivery candidate: `editorial/boho-analytics-workbench-editorial-v1.webp`
- Source: `editorial/boho-analytics-workbench-editorial-v1.png`
- Use: fallback editorial image where an interface capture would be too small
- Alt text: `Editorial measurement workbench with an abstract analytics screen,
  notebook, color swatches, magnifying glass, and hardware security key.`
- Caption: `Original editorial illustration of measurement work. Not a product
  screenshot, office photograph, or client result.`

### Provider Rescue workbench

- Delivery candidate:
  `editorial/boho-provider-rescue-workbench-editorial-v1.webp`
- Source: `editorial/boho-provider-rescue-workbench-editorial-v1.png`
- Use: Provider Rescue guide, website ownership guide, or provider-exit
  checklist cover
- Alt text: `Editorial provider-handoff workbench with a laptop, router,
  network cable, backup drive, hardware security key, indexed folder,
  checklist, and key arranged for migration planning.`
- Caption: `Original editorial illustration of website ownership and migration
  planning. Not client work or an actual account handoff.`

Exact prompts, generation mode, and the deterministic interface-composite
method are recorded in `generation-prompts.md`.

## New deterministic teaching graphics

Editable SVG sources and visually checked 1600-pixel-wide WebP delivery
derivatives live together in `graphics/`. Every graphic visibly says that its
data is synthetic and not client data.

1. `gsc-four-signals.svg`
   - Explains impressions, clicks, CTR, and average position as four different
     questions.
   - Uses the exact three-day public fixture totals: 2,645 impressions, 114
     clicks, 4.31% CTR, and 12.65 impression-weighted average position.
   - Best use: `/resources/`, `/services/ongoing-seo/`, or a future GSC guide.
2. `source-separated-measurement-chain.svg`
   - Shows GSC impression, GSC click, GA4/Umami visit, form acceptance,
     notification delivery, and qualified-inquiry review as different units.
   - Explicitly states that the sequence is not a guaranteed funnel.
   - Best use: the plain-language explanation of why Boho Analytics exists.
3. `zero-missing-stale-data.svg`
   - Distinguishes a confirmed zero from missing evidence and stale evidence.
   - Best use: the Resources report-standard or data-quality explanation.
4. `gsc-query-page-opportunity-board-demo-v1.svg`
   - Uses six synthetic query/page examples to demonstrate prioritization.
   - Must remain an educational Boho workflow graphic, not a public v0.2
     dashboard screenshot. Public v0.2 does not expose raw query rows in the
     browser table, and provider query results are limited and privacy-bounded.

Graphic-specific captions, alt text, and claims boundaries are in
`graphics/graphics-notes.md`.

## Existing photography that is already cleared

All items below are self-hosted Pexels derivatives governed by
`docs/asset-provenance.md`. They are representative editorial imagery, not
Boho staff, client work, results, or endorsements. Retain the source link and
the approved not-client-work boundary whenever a placement changes.

### Restore to the route already named by the asset ledger

| Asset | Existing intended route | Subject | Decision |
| --- | --- | --- | --- |
| `public/visuals/creative-process.webp` | `/services/web-design-redesign/` | Design collaborators reviewing page structure and visual decisions | Restore; use the accurate caption from `app/content/serviceAssets.ts` |
| `public/visuals/migration-infrastructure.webp` | `/services/provider-rescue/` | Technician connecting infrastructure cables | Restore; do not imply the subject is Boho staff |
| `public/visuals/research-notebook.webp` | `/services/research-audits-strategy/` | Researcher mapping evidence in a notebook | Keep; currently rendered |
| `public/visuals/growth-analysis.webp` | `/services/ongoing-seo/` | Fern leaves as a restrained growth metaphor | Move back to its intended route or retire; it is currently misplaced on Research |

These four assets have a one-route reuse policy. If a guide needs one of them,
choose whether the guide or service route owns the placement and update the
asset register instead of silently duplicating it.

### Restore inside the governed Industry system

| Asset | Intended context |
| --- | --- |
| `public/visuals/homepage-industry-contractors-v2.webp` | Project businesses and contractors |
| `public/visuals/homepage-industry-local-service-v2.webp` | Appointment-based local services |
| `public/visuals/homepage-industry-retail-v2.webp` | Physical retail and hospitality |
| `public/visuals/homepage-industry-ecommerce-v2.webp` | Small-business ecommerce fulfillment |
| `public/visuals/homepage-industry-b2b-v2.webp` | Professional and B2B services |

The content model still assigns these photographs, but the current
`BuyerFacingPages.tsx` path does not render them. Restore the five current v2
files on the Industry hub and matching detail routes. Do not revive the older
`industry-*.webp` derivatives; they are archive-superseded.

### Keep conditionally archived

- `public/visuals/homepage-design-studio-v2.webp` is visually useful for a
  website-buying or design guide, but the current ledger marks it archive-only.
  Reclassify it explicitly before use.
- The five older `public/visuals/industry-*.webp` files are superseded.
- About science assets belong to their sourced scientific explanation; they
  should not become generic technical decoration.
- `public/visuals/met-water-textile.webp` is public-domain art, not a photograph,
  and requires the existing Met design-reference context.

The visual review sheet is
`review/existing-approved-photography-pool-contact-sheet.webp`.

The new editorial and data-graphic review sheet is
`review/new-resource-candidates-contact-sheet.webp`.

## External photograph search

No outside image was downloaded in this pass. The search produced legally
usable options, but none is better than the governed assets already in the
repository or the original composites above.

| Candidate | Rights note | Verdict |
| --- | --- | --- |
| <https://www.pexels.com/photo/notebook-and-charts-669613/> | Pexels free-use page; creator Lukas Blazek | Redundant with the original Analytics workbench and existing research image |
| <https://www.pexels.com/photo/person-using-laptop-computer-on-table-7357/> | Page marks the photo CC0; creator Startup Stock Photos | Generic startup stock; no stronger business or product truth |
| <https://unsplash.com/photos/a-close-up-of-a-bunch-of-wires-in-a-rack-tebFqdANuxs> | Free under the Unsplash License | Redundant with the governed migration-infrastructure photograph |
| <https://www.loc.gov/pictures/item/2017843781/> | 1943 Chicago workshop photograph; Library of Congress record says no known restrictions | Beautiful local/history option for a future editorial essay, but too indirect for a service or product page |
| <https://commons.wikimedia.org/wiki/File:Classic_storefront.jpg> | CC BY-SA 4.0, Nemammal; identifiable Chicago bookstore | Do not use in sales context: it could imply a client or endorsement and adds share-alike obligations |

## Privacy-safe real photography still worth capturing

Authentic Boho process photographs would be stronger than adding more stock.
They can avoid a face and government name entirely.

1. A real laptop displaying Boho Analytics with the synthetic-demo label
   clearly visible.
2. A printed synthetic GSC report with handwritten priority annotations.
3. A redacted/example website proposal being marked up against the buyer guide.
4. The same Boho-owned demo website on a phone, tablet, and laptop during
   responsive testing.
5. A provider-exit checklist beside the actual non-sensitive hardware used for
   backups or access transfer.
6. Hands writing a research note, if a human presence is desired without a
   portrait.

Before publication, strip EXIF and verify that screens and paper contain no
email addresses, property IDs, IP addresses, private URLs, browser sessions,
client details, credentials, or location metadata.

## Route-level placement priorities for the next pass

No placement below was implemented in this asset-only pass.

1. `/resources/`
   - Use the real-interface Analytics workbench near the first plain-language
     free-software invitation.
   - Add the four-signal GSC graphic and source-separated measurement chain.
   - Keep the four existing command-center, Plot Builder, and Site Graph
     captures.
   - Add the zero/missing/stale plate beside the report standard.
2. `/learn/`, `/learn/website-buying/`, `/learn/provider-rescue/`
   - Give the three guide choices purposeful covers, not generic people at
     laptops.
   - Use the Provider Rescue workbench and later create deterministic proposal
     anatomy and ownership-map figures.
3. Industry routes
   - Restore the five current governed v2 photographs.
4. Service routes
   - Restore creative-process and migration-infrastructure, and return the fern
     metaphor to Ongoing SEO if retained.
5. About
   - Restore the already sourced science material only within its explanatory
     context.
6. Glossary
   - Do not create 154 decorative term images. Build a small set of reusable
     teaching plates only where a graphic genuinely explains the term.
7. Homepage, Work, and Tools
   - They are already image-rich with first-party demos and product evidence.
     Do not dilute that proof with more generic stock.

## Findability and cleanup findings for the implementation pass

- `/resources/` is not a primary-navigation destination. The current header
  routes `Practical guides` directly to `/learn/`, making the product-rich
  Resources hub much harder to discover than its importance warrants.
- A future visible Resources parent should expose: Resources overview, free
  analytics, website buyer guidance, Provider Rescue guidance, and the
  glossary.
- The active five service-hero alt strings in
  `app/content/serviceShowcases.ts` describe people who do not appear in the
  generated still-life illustrations. Accurate descriptions already exist in
  `app/content/serviceAssets.ts`.
- The live `growth-analysis.webp` is fern leaves, but its current alt text says
  a team is reviewing a growth analysis. Correct this before the next image
  placement pass.
- The asset placement ledger is stale where it says the Industry photographs
  and several service chapter photographs currently render. The active route
  components displaced those placements.

## Non-goals of this pass

- No client work was invented.
- No generated person was presented as Boho staff or a customer.
- No performance graphic uses live Boho or client data.
- No outside photo was hotlinked or downloaded.
- No public page, navigation, metadata, sitemap, or deployment changed.
