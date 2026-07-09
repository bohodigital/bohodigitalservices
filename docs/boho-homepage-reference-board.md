# Boho Homepage Reference Board

Purpose: translate research into a concrete design direction for the experimental homepage rebuild. This board is inspiration only. No third-party screenshots, code, art, logos, or template assets should be copied into the site.

## Sources Reviewed

| Source                        | URL                                                                                                                                                      | Use                                                                                 | Risk                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| Awwwards Yellow collection    | https://www.awwwards.com/websites/yellow/                                                                                                                | Color confidence, yellow as action color, bold contrast                             | Green, reference only                    |
| Awwwards Brutalism collection | https://www.awwwards.com/websites/brutalism/                                                                                                             | Oversized type, asymmetric layouts, blunt section rhythm                            | Green, reference only                    |
| Awwwards Dark collection      | https://www.awwwards.com/websites/dark/                                                                                                                  | Dark hero density, glowing UI layers, technical atmosphere                          | Green, reference only                    |
| GSAP installation docs        | https://gsap.com/docs/v3/Installation/                                                                                                                   | Framework-agnostic animation approach, npm install path, ScrollTrigger availability | Green/Yellow, non-MIT license note       |
| Tabler Icons license          | https://github.com/tabler/tabler-icons/blob/main/LICENSE                                                                                                 | MIT icon baseline already in repo                                                   | Green                                    |
| Tabler `hexagons` icon page   | https://tabler.io/icons/icon/hexagons                                                                                                                    | Confirmation of hive-adjacent Tabler visual vocabulary                              | Green                                    |
| Phosphor Icons license        | https://github.com/phosphor-icons/core/blob/main/LICENSE                                                                                                 | Optional icon-set license check                                                     | Green, rejected dependency               |
| Anime.js docs                 | https://animejs.com/documentation/                                                                                                                       | Alternative animation library check                                                 | Green, rejected dependency               |
| NPM registry checks           | `npm view gsap`, `npm view @fontsource-variable/space-grotesk`, `npm view @iconify-json/ph`, `npm view animejs`, `npm view @fontsource-variable/archivo` | Package version/license verification                                                | Green for package data, see ledger notes |

## Design Translation

### HomeStage and SwarmHero

Reference takeaways:

- Huge type over a dark field.
- Honey/yellow lines behave as system signals, not decoration.
- The first viewport should look like an instrument panel, not a service intro card.

Build direction:

- Full-width black stage.
- Large H1 with Space Grotesk.
- Left side copy and CTA stack.
- Right side custom SVG command console: center node "Research Engine" connected to Market, Search, Site, Audit, Fix, Monthly, Rush, Receipts.
- GSAP draws paths and staggers nodes when motion is allowed.

### SignalDeck

Reference takeaways:

- Few large panels beat many small cards.
- Active states can carry commercial hierarchy.
- Yellow should mark action and urgency.

Build direction:

- Three oversized horizontal panels: Audit, Monthly, Rush.
- Desktop panels highlight on hover/focus.
- Mobile stacks as bold slabs, not bullet-card tiles.
- Signals appear as compact inline labels, not long bullet walls.

### ResearchRadar

Reference takeaways:

- Dark dashboard heroes often sell confidence through data-like visuals.
- A scanner/radar can explain "research first" faster than another paragraph.

Build direction:

- Custom circular radar in inline SVG/CSS.
- Sweep line, rings, signal dots, and readable labels.
- Copy stays short and direct.
- No downloaded radar animation.

### MonthlyOpsLoop

Reference takeaways:

- A recurring service should look like an operating loop, not a list of deliverables.
- Motion can imply continuity without inventing fake metrics.

Build direction:

- Hex/circular loop with stages: Watch, Research, Prioritize, Fix, Report, Document.
- One moving progress dot under GSAP/CSS when motion is allowed.
- Monthly support should feel like the flagship path.

### RushIncidentBoard

Reference takeaways:

- Incident-room UI can feel premium and urgent without claiming 24/7 service.
- Rows and columns should look like triage, not a process-card grid.

Build direction:

- Dark incident board with rows for launch traffic drop, 404s, missing analytics access, stuck provider transfer, broken DNS/forms, scary report translation.
- Columns: Signal, Risk, Action, Receipt.
- Controlled orange accents for risk.
- Disclaimer remains visible.

### OwlFoxSplit

Reference takeaways:

- Trust content should be sharp and binary: clarity versus traps.
- Two panels are stronger than category sprawl.

Build direction:

- Two large panels only.
- Owl side has honey glow.
- Fox side has orange warning pulse.
- Chips stagger on section enter when motion is allowed.

### ConversionDock

Reference takeaways:

- End with direct paths, not a generic contact block.

Build direction:

- Big final statement.
- Three CTA buttons: Growth Audit, Monthly Support, Rush Help.
- Footer note includes the anti-fog stance and no fake guarantees.

## Approved Visual System

- Background: near-black, charcoal, deep brown-black.
- Action: honey yellow.
- Warning: controlled amber/orange.
- Text: cream and muted warm gray.
- Shape language: hexes, scanner arcs, signal lines, incident rows.
- Type: Space Grotesk for display, Inter for body, system monospace for labels.
- Motion: path draw, scanner sweep, node pulse, panel stagger, reduced-motion fallback.

## Rejected Directions

- Stock bee photography or forest imagery.
- Bee cartoons or mascot-heavy treatment.
- Generic feature grid.
- Numbered step-card wall.
- Long bullet grids.
- Downloaded SVG patterns with unclear license.
- Paid template code or Webflow marketplace assets.
- Fake awards, testimonials, logos, rankings, performance claims, or case studies.

## Build Orders Confirmed

1. Install only `gsap` and `@fontsource-variable/space-grotesk`.
2. Replace the old home component set with:
   - `HomeStage.astro`
   - `SwarmHero.astro`
   - `SignalDeck.astro`
   - `ResearchRadar.astro`
   - `MonthlyOpsLoop.astro`
   - `RushIncidentBoard.astro`
   - `OwlFoxSplit.astro`
   - `ConversionDock.astro`
   - `src/scripts/home-experience.ts`
3. Update `src/pages/index.astro` to use only the new experimental modules.
4. Keep deployment configuration untouched.
