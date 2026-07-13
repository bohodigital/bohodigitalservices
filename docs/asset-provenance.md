# Visual asset provenance

Reviewed 2026-07-12 for the private Boho Digital Services Resources redesign.

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

- Keep the supplied Boho bee as the site logo and favicon.
- Do not hotlink third-party favicons or icon CDNs.
- Do not use vendor marks as generic decoration or imply endorsement.
- Prefer one coherent icon family and one purposeful icon per card.
- Keep factual diagrams deterministic and preserve owner-supplied files unchanged.
