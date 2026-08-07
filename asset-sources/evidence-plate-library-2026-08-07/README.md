# Boho Evidence Plate Library

This package contains the non-generative visual library approved after the
Resources imagery review. Nothing in `outputs/` is a live site placement.

## Production rule

Every plate must do one primary job: prove, compare, explain, or orient. Source
material must be one of:

- an actual Boho interface capture;
- a Boho-owned demonstration-site capture;
- an explicit, versioned synthetic dataset;
- a rights-cleared physical or archival source with recorded provenance.

The library does not use generated photography, invented dashboards, decorative
stock imagery, or hand-authored illustrative SVGs.

## Rendering workflow

1. Serve this directory locally.
2. Open `index.html?plate=<plate-id>` at a 1600 by 1000 viewport.
3. Wait for `document.documentElement.dataset.renderReady` to equal `true`.
4. Capture the viewport as PNG.
5. Convert the reviewed PNG to WebP at quality 84 with metadata removed.
6. Record output hashes in `manifest.sha256`.
7. Review the final output at native size and at a representative website width.

The entrypoint renders one plate at a time. The supported IDs are recorded in
`manifest.json`.

## Honest-data boundary

The Search Console workbench uses `data/gsc-opportunity.json`, which is
synthetic educational data for a fictional service business. The values are
not Boho or client performance and are not a forecast. The product captures
also display synthetic demonstration data.

## Intended next stage

After owner review, selected plates can be placed as responsive HTML/CSS
components or derived static assets. Approval of this library is not approval
to publish or deploy any placement.
