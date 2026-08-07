# Resources visual pass: generation record

Date: 2026-08-07

Status: asset sources only. None of these files is wired into a public route.

## Boho Analytics workbench

### Generated source

- Source file: `editorial/boho-analytics-workbench-editorial-v1.png`
- Delivery candidate: `editorial/boho-analytics-workbench-editorial-v1.webp`
- Generator: OpenAI built-in image generation
- Mode: new image, no reference image
- Intended classification: original editorial illustration rendered in a
  photographic style
- Important boundary: not a photograph of Boho staff, an office, a client, or
  client work; the abstract screen is not product evidence

Prompt:

> Create one wide 3:2 photorealistic editorial still-life image for Boho
> Digital Services, an owner-operated digital engineering studio. Scene: an
> authentic working analytics desk viewed at a slight overhead three-quarter
> angle, with a laptop open but its screen showing only soft abstract unlabeled
> blocks and lines (no readable interface, no text, no logos, no fake company
> data), a squared notebook with hand-drawn geometric marks that are not legible
> words, a mechanical pencil, a brass magnifying glass, one small hardware
> security key, color swatches, and a few tidy printouts with abstract charts.
> Visual identity: warm ivory paper, dark graphite, burnished gold, verdigris
> green, dusty plum, copper, and muted blue; tactile paper, linen, walnut, brass,
> and matte ceramic; a subtly colorful mosaic arrangement but technically
> serious. Natural side light, honest minor wear, realistic lens and depth,
> restrained shadows, sophisticated magazine photography, not glossy corporate
> stock. No people, no hands, no readable writing, no brand marks, no money, no
> futuristic holograms, no neon, no floating UI, no fake client testimonials,
> no over-staging. Composition must leave calm negative space at upper left and
> keep every key object fully inside frame. The image is an editorial
> illustration of measurement work, not evidence of client results.

### Real-interface composite

- Source file: `editorial/boho-analytics-workbench-real-ui-composite-v1.png`
- Delivery candidate:
  `editorial/boho-analytics-workbench-real-ui-composite-v1.webp`
- Base: generated workbench source above
- Screen insert:
  `public/proof/tools/boho-analytics-demo-command-center-20260806.webp`
- Method: deterministic perspective transform and local compositing with
  ImageMagick; no generative edit was applied to the real interface capture
- Intended classification: original editorial composite with first-party
  product evidence
- Required public label: `Synthetic development demo · No client data`
- Important boundary: the visible 30-day interface is an existing synthetic
  development-demo capture. It is not a client result, forecast, or live hosted
  customer dashboard.

## Provider Rescue workbench

- Source file: `editorial/boho-provider-rescue-workbench-editorial-v1.png`
- Delivery candidate:
  `editorial/boho-provider-rescue-workbench-editorial-v1.webp`
- Generator: OpenAI built-in image generation
- Mode: new image, no reference image
- Intended classification: original editorial illustration rendered in a
  photographic style
- Important boundary: not a photograph of Boho staff, an office, a client, or
  a completed migration; no depicted object contains real account information

Prompt:

> Create one wide 3:2 photorealistic editorial still-life image for Boho
> Digital Services about website ownership and provider rescue. Scene: a calm,
> real technical handoff workbench on a dark walnut table, viewed from a
> slightly elevated three-quarter angle. Include a closed slim laptop, a small
> router, a neatly coiled ethernet cable, one hardware security key, a portable
> backup drive with no brand, a plain folder with blank tab dividers, a metal key
> on a labeled-looking but entirely blank paper tag, a checklist sheet
> containing only abstract checkboxes and lines with no readable words, and a
> brass clip. Arrange the objects in an orderly dependency chain, with subtle
> colored paper tabs in burnished gold, verdigris, copper, dusty plum, and muted
> blue. Warm ivory paper, graphite hardware, tactile linen and brass, soft
> natural window light, realistic minor wear, sophisticated documentary
> magazine photography, visually colorful but technically serious. No people,
> no hands, no passwords, no readable text, no logos, no brand names, no private
> URLs, no account numbers, no fake client data, no money, no padlock cliche, no
> glowing cyber effects, no futuristic holograms. Leave clear negative space at
> upper right for future layout use. The image is an editorial illustration of
> ownership and migration planning, not proof of client work.

## Output preparation

The generated PNGs are retained as editable/lossless sources. WebP derivatives
were created locally with metadata stripped at quality 84. No EXIF or location
metadata should be added during later placement.
