# Visual asset provenance

Reviewed 2026-07-12 for the private Boho Digital Services Resources and homepage redesign.

## Service editorial illustrations v1

Generated 2026-07-17 with OpenAI's built-in image generation tool, then
converted locally from lossless PNG to quality-84 WebP. These are editorial
illustrations that explain a service concept. They are not screenshots, proof
of deployed systems, client work, staff photographs, performance evidence, or
endorsements. No reference image or third-party branded interface was used.

| Local output | Dimensions | Use | Output SHA-256 |
| --- | --- | --- | --- |
| `public/visuals/services/ongoing-seo-v1.webp` | 1536x1024 | Local discovery moving from a storefront and map toward a customer contact action | `1bb8daef9bb6a6af6318f82248c1887ff90381886ca26876d64ab74c816cdfff` |
| `public/visuals/services/web-design-redesign-v1.webp` | 1536x1024 | One clear business website planned across desktop and mobile | `e6568ec8fbe136090a85d9d5f4936c1422f1b5bf9a7f543c4a07ca063a8e573c` |
| `public/visuals/services/provider-rescue-v1.webp` | 1536x1024 | Website assets moving through a calm, documented provider handoff | `a893a39c9e8f5ab5dd6fa3dfa24ef45776ed90382f91d210cb2b8be0b6a6dc9c` |
| `public/visuals/services/research-audits-strategy-v1.webp` | 1536x1024 | Many observations narrowed into a small set of practical priorities | `8acf0605477e4ea4777fabf90cc7167d3943be961e0f7b9a874cea06ccea9366` |
| `public/visuals/services/custom-digital-solutions-v1.webp` | 1536x1024 | A form moving through human approval into a shared record and notification | `bec2edae6f7a2a9f8ef2b7a90e2404378c5610b47c0a58c698bc9a1ef894222d` |

The exact prompt set and generation constraints are recorded in
`docs/service-visual-generation-2026-07-17.md`.

## Owner-supplied process graphic

- Original local path: `public/diagrams/how-boho-works-v1.png`
- Homepage derivative: `public/diagrams/how-boho-works-v2-transparent.png`
- Dimensions: 1672x941 RGBA PNG.
- Owner-supplied SHA-256:
  `ae90e5075bbb7b64789cac16e48435ffb7bdb875b5ae536b0ff22e20c2de2761`
- Transparent derivative SHA-256:
  `f32345ee1312ef5fd799956d8e874cc24dda91619d0faf5a2d64bd4283fc9f12`
- Use: replaces the homepage's primary hero image in a responsive process figure.
- Treatment: an edge-connected flood fill changes only the alpha channel of
  near-neutral checkerboard pixels that connect to the outer canvas. Every RGB
  pixel is byte-for-byte identical to the owner-supplied file; interior white
  details remain opaque. Validation recorded 1,086,683 fully transparent pixels,
  a transparent corner, and exact RGB equality between original and derivative.
- Accessibility: the page supplies a full text alternative for Discover,
  Design, Build, and Launch. The redundant visible caption was removed because
  the same words are already part of the supplied graphic.
- Small-screen behavior: the exact hero graphic remains legible in a keyboard-
  focusable horizontal viewport instead of being reduced to unreadable text.
- Visual treatment: the transparent derivative sits on a deliberate warm-light
  reading panel inside the dark homepage hero so its black typography remains
  legible without showing the source checkerboard.

## Homepage editorial imagery v2

The current homepage pass replaces the earlier rendered photography with the
following self-hosted, compressed WebP derivatives. Source photographs remain
subject to the Pexels License described below. They are representative editorial
imagery only and do not depict Boho staff, clients, results, or endorsements.

| Local output | Official source | Use | Output SHA-256 |
| --- | --- | --- | --- |
| `public/visuals/homepage-design-studio-v2.webp` (1067x1600) | [Pexels photo 37663437](https://www.pexels.com/photo/creative-design-workspace-with-color-swatches-37663437/) | Color, material, and layout workspace for the design section | `191eeaa0712089d204c3fb28959dda3910ba27e5499f354ed85c91e1e51bf551` |
| `public/visuals/homepage-industry-contractors-v2.webp` (1067x1600) | [Pexels photo 29871587](https://www.pexels.com/photo/electrician-working-on-renovation-project-in-turkiye-29871587/) | Skilled contractor at work | `4ba6c2164a98da316e19a0e5217eb990d1c8eb8fda2775328d215d4d526066bb` |
| `public/visuals/homepage-industry-local-service-v2.webp` (1067x1600) | [Pexels photo 6130989](https://www.pexels.com/photo/terrier-dog-being-groomed-by-a-professional-groomer-6130989/) | Recognizable appointment-based local service | `ac7deac63540a39d30018e8a5404e4fadd79c61776b8c2626675b187c0e87806` |
| `public/visuals/homepage-industry-retail-v2.webp` (1067x1600) | [Pexels photo 29036509](https://www.pexels.com/photo/modern-cafe-interior-with-customers-at-counter-29036509/) | Active hospitality and retail environment | `0e23f4e58b238195006b13b4f623122dec55c7c2c14cbdc8a63140ddb4686ede` |
| `public/visuals/homepage-industry-ecommerce-v2.webp` (1600x1068) | [Pexels photo 7857532](https://www.pexels.com/photo/woman-sitting-at-the-table-and-packing-orders-7857532/) | Small-business ecommerce fulfillment | `f4be83fba1467cd56e91c5c80ec11de12e46365d26710c8256d3eb75459e90c0` |
| `public/visuals/homepage-industry-b2b-v2.webp` (1600x1068) | [Pexels photo 7988692](https://www.pexels.com/photo/people-working-on-laptops-7988692/) | Collaborative professional-services team | `f7f757324b7907ea308b60687ad4373b7e1a55def697c59e6ed7b8f9e1ba7b87` |

The five `homepage-industry-*-v2.webp` derivatives are also reused on the
Industries hub and matching child routes. Those placements carry an explicit
licensed-editorial, representative-setting, and not-client-work caption. They
provide context only; they are not evidence, testimonials, or measured results.

## Homepage editorial imagery

All photography is self-hosted. It represents the kinds of business settings,
creative work, infrastructure, or visual metaphors used in the page; it is not
client work, does not show Boho staff, and does not imply endorsement. The
homepage states that boundary in captions and next to the industry image grid.

Pexels permits free website and commercial use, modification, and use without
required attribution under the [Pexels License](https://www.pexels.com/license/).
The site does not sell unaltered copies or imply that a depicted person or
business endorses Boho.

| Local output | Creator | Official source | Use | Output SHA-256 |
| --- | --- | --- | --- | --- |
| `public/visuals/research-notebook.webp` (1600x1068) | Mikael Blomkvist | [Pexels photo 6476777](https://www.pexels.com/photo/man-drawing-a-graph-on-notebook-6476777/) | Retained prior asset; no longer rendered on the homepage | `6df4fb3d22e5b230d9df4622d9812389895a8b120d7d7ce2f4f7b9c7fbb5505f` |
| `public/visuals/industry-contractors.webp` (1000x667) | Ron Lach | [Pexels photo 8830265](https://www.pexels.com/photo/a-man-working-at-a-construction-site-8830265/) | Carpenter working inside a residential timber frame | `54397c59ab6abc4a9269863e22c4e2f5d02a86d934ae8e74d069c0a0b6bd30af` |
| `public/visuals/industry-local-service.webp` (1000x1333) | Bulat843 | [Pexels photo 38190070](https://www.pexels.com/photo/repair-technician-working-on-appliance-38190070/) | Skilled local repair-service setting | `76a5b8fcd86e4414c4c48299987efcab55697e27d99ff4a94b3f0e759a34eef2` |
| `public/visuals/industry-retail.webp` (1000x800) | Raphael Loquellano | [Pexels photo 19367174](https://www.pexels.com/photo/people-sitting-in-a-coffee-shop-19367174/) | Bright hospitality setting with customers | `d94e6579051a61e2ebd0572a69482106b99b6b72db8b78b876c20c0188e5f7fa` |
| `public/visuals/industry-ecommerce.webp` (1000x668) | Kampus Production | [Pexels photo 7857532](https://www.pexels.com/photo/woman-sitting-at-the-table-and-packing-orders-7857532/) | Small ecommerce team packing customer orders | `117469cd8928e3b44e4ce50fe802c692a281640be9eab6d943cd417481800ad7` |
| `public/visuals/industry-b2b.webp` (1000x667) | Alena Darmel | [Pexels photo 7710178](https://www.pexels.com/photo/colleagues-having-a-business-meeting-7710178/) | Professional team reviewing strategy | `58ac78233316b332c8b087ecdd0bc189480d6741da6b69eebfd419af80ebfe10` |
| `public/visuals/creative-process.webp` (1200x1800) | AI25.Studio | [Pexels photo 6322370](https://www.pexels.com/photo/people-sitting-at-desk-working-on-laptop-in-team-6322370/) | Editorial design-planning image in the website-design section | `dfad16c75306425e52c6722633c8283f0f8b2c1d16cf9a7a2200e6cf34f67d08` |
| `public/visuals/migration-infrastructure.webp` (1200x1800) | cottonbro studio | [Pexels photo 6804586](https://www.pexels.com/photo/man-connecting-computer-cables-6804586/) | Infrastructure-maintenance image supporting the ownership and migration section | `0424427b99fcef2f93d3b200d97f8b219d0e836b18bc98d52545d30caaeff1f7` |
| `public/visuals/growth-analysis.webp` (1400x933) | ROMAN ODINTSOV | [Pexels photo 7931203](https://www.pexels.com/photo/fern-leaves-basked-in-sunlight-7931203/) | Botanical metaphor for steady, compounding improvement | `e9bbbf38f7049c379ccc3c630ec337a09773937854c9d9d0a0ee3cf7fdc4bfde` |

Downloaded source files are retained in
`asset-sources/homepage-2026-07-12/`. The deterministic preparation script is
`scripts/prepare_homepage_assets.py`; it normalizes orientation, constrains
dimensions, and writes quality-82 WebP files. Homepage-image retrieval date:
2026-07-13.

### Public-domain design reference

- Work: *Water pattern textile* (Associated Artists; probably manufactured by
  Cheney Brothers), The Metropolitan Museum of Art, object 14029.
- Official source: <https://www.metmuseum.org/art/collection/search/14029>
- Rights: Public Domain through [The Met Open Access](https://www.metmuseum.org/hubs/open-access), which makes public-domain works available under CC0.
- Local output: `public/visuals/met-water-textile.webp` (1200x1004)
- Output SHA-256: `1f8d3d8040d9fb443980be8728331ef20e573e7c59102e6599faceb75fad2560`
- Use: retained approved asset; no longer rendered on the homepage after the
  design section moved to human, process-oriented editorial photography.

## Supplied bee on dark chrome

- The owner-supplied `public/brand/boho-bee-logo-v2-256.png` remains unchanged.
- `public/brand/boho-bee-logo-v2-transparent.png` removes only the
  edge-connected warm-white background so the supplied mark can sit directly
  on the requested dark header and footer backing. The enclosed white details,
  full-color bee artwork, dimensions, and aspect ratio remain intact.
- The site applies no tile, backing color, border, shadow, or padding around the
  transparent derivative.
- Derivative SHA-256: `1e81e960e5482bac8d90d79b0f3f30bf80e8cfcaba474e199c001a396060052b`

## Embedded asset system

### Lucide

- Source: <https://lucide.dev/>
- Package: `lucide-react` 1.24.0
- License: ISC, with inherited Feather icons under MIT
- Local delivery: bundled from the pinned npm dependency; no runtime CDN or hotlink
- Use: navigation controls, resource categories, service cards, knowledge heroes, and status-neutral interface accents
- Accessibility: decorative instances are hidden from assistive technology; visible text supplies each link or control name
- Full required license text: `THIRD_PARTY_NOTICES.md`

## Evaluated but not embedded

### Open Doodles

- Source and license: <https://www.opendoodles.com/about>
- License: CC0
- Decision: legally suitable, but not embedded in this pass. The character-illustration style competed with the existing editorial palette and added decoration without improving wayfinding.

### Simple Icons

- Source: <https://simpleicons.org/>
- Project license: CC0
- Disclaimer: <https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md>
- Decision: not used as a general icon library. Individual brand and trademark rights require separate review. Existing owner-approved official GitHub artwork remains the only secondary vendor mark in the site chrome.

## Asset rules

- Keep the supplied Boho bee artwork as the site logo and favicon. Dark-chrome
  use may rely on the documented background-removal derivative above.
- Do not hotlink third-party favicons or icon CDNs.
- Do not use vendor marks as generic decoration or imply endorsement.
- Prefer one coherent icon family and one purposeful icon per card.
- Keep factual diagrams deterministic and preserve owner-supplied files unchanged.
