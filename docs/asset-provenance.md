# Visual asset provenance

Reviewed 2026-07-12 for the private Boho Digital Services Resources and homepage redesign.

## Owner-supplied process graphic

- Local path: `public/diagrams/how-boho-works-v1.png`
- Dimensions: 1672x941 RGBA PNG; the supplied file is fully opaque and its
  light checkerboard is part of the image pixels.
- Owner-supplied SHA-256:
  `ae90e5075bbb7b64789cac16e48435ffb7bdb875b5ae536b0ff22e20c2de2761`
- Use: replaces the homepage's primary hero image in a responsive process figure.
- Treatment: preserved byte-for-byte; not redrawn, regenerated, recolored,
  cropped, compressed, or passed through image generation.
- Accessibility: the page supplies a full text alternative for Discover,
  Design, Build, and Launch, plus a visible scope/review/launch-gate caption.
- Small-screen behavior: the exact hero graphic remains legible in a keyboard-
  focusable horizontal viewport instead of being reduced to unreadable text.

## Homepage editorial imagery

All photography is self-hosted. It represents the kinds of business settings
Boho serves; it is not client work, does not show Boho staff, and does not imply
endorsement. The homepage states that boundary next to the industry image grid.

Pexels permits free website and commercial use, modification, and use without
required attribution under the [Pexels License](https://www.pexels.com/license/).
The site does not sell unaltered copies or imply that a depicted person or
business endorses Boho.

| Local output | Creator | Official source | Use | Output SHA-256 |
| --- | --- | --- | --- | --- |
| `public/visuals/research-notebook.webp` (1600x1068) | Mikael Blomkvist | [Pexels photo 6476777](https://www.pexels.com/photo/man-drawing-a-graph-on-notebook-6476777/) | Hero research-and-planning image | `6df4fb3d22e5b230d9df4622d9812389895a8b120d7d7ce2f4f7b9c7fbb5505f` |
| `public/visuals/industry-contractors.webp` (1000x666) | Anastasia Shuraeva | [Pexels photo 9607203](https://www.pexels.com/photo/tools-in-a-toolbox-9607203/) | Contractor representative setting | `3bd4fbc0e5c944ab2111cb4121301fda1619fb41e4f3dd21c8d26b4cb5745d3c` |
| `public/visuals/industry-local-service.webp` (1000x1500) | Kawê Rodrigues | [Pexels photo 19664890](https://www.pexels.com/photo/barber-and-customer-in-barbershop-19664890/) | Local-service representative setting | `d00b694354971cdb498e8c32d05202b36084b51d04fa50104656437f57235338` |
| `public/visuals/industry-retail.webp` (1000x666) | Polina Tankilevitch | [Pexels photo 3735183](https://www.pexels.com/photo/shop-interior-3735183/) | Retail representative setting | `9973ba23eb007b2a02a9187c59ae61202245c470592429d9e1f91b960ac419d6` |
| `public/visuals/industry-ecommerce.webp` (1000x666) | Kampus Production | [Pexels photo 7289725](https://www.pexels.com/photo/man-preparing-packages-7289725/) | Ecommerce representative setting | `eaff77dfe1b1c39cb3c50521382eb5b3c8a76e102c834501029af6781fccd4d6` |
| `public/visuals/industry-b2b.webp` (1000x750) | Kindel Media | [Pexels photo 7688432](https://www.pexels.com/photo/strategy-documents-on-desk-7688432/) | Professional-services representative setting | `b55de033c59a2a70f7ee5435cbbe7c13b9b38843d872629b550272f872ad9f62` |

Downloaded source files are retained in
`asset-sources/homepage-2026-07-12/`. The deterministic preparation script is
`scripts/prepare_homepage_assets.py`; it normalizes orientation, constrains
dimensions, and writes quality-82 WebP files. Retrieval date: 2026-07-12.

### Public-domain design reference

- Work: *Water pattern textile* (Associated Artists; probably manufactured by
  Cheney Brothers), The Metropolitan Museum of Art, object 14029.
- Official source: <https://www.metmuseum.org/art/collection/search/14029>
- Rights: Public Domain through [The Met Open Access](https://www.metmuseum.org/hubs/open-access), which makes public-domain works available under CC0.
- Local output: `public/visuals/met-water-textile.webp` (1200x1004)
- Output SHA-256: `1f8d3d8040d9fb443980be8728331ef20e573e7c59102e6599faceb75fad2560`
- Use: explicitly captioned visual reference in the website-design section.

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
