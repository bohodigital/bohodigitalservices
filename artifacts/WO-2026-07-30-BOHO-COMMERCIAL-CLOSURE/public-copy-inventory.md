# Public-copy change inventory

Authority: owner-provided commercial-reset audit dated 2026-07-30. The supplied audit supersedes the earlier request to remove the restaurant example only for the exact Link / Embed / Connect explanation. It does not authorize a restaurant service, landing page, or dedicated restaurant offer.

## `/`

- Restored the supplied `RESTAURANT EXAMPLE` eyebrow, heading, Link / Embed / Connect explanations, and third-party-fee qualification.
- Source: `app/content/commercialReset.ts` and `app/Homepage.tsx`.
- No other homepage section or visual direction changed.

## `/pricing/`

- Preserved the four canonical services and prices from `canonicalServices`.
- Changed the content CTA to `Get a free website review`.
- Added the client-owned eligible-hosting explanation using already approved homepage hosting language and `hostingQualification`.
- Source: `app/components/PricingPage.tsx`.
- Metadata, ItemList offers, and FAQ schema continue to derive from the same canonical price data.

## `/start/`

- Eyebrow: `FREE WEBSITE REVIEW`
- H1 and metadata title: `Get a clear next step for your website.`
- Body and metadata description: the exact owner-supplied free-review paragraph.
- Form heading: `Request your free review`
- Submit: `Request my free review`
- Selector labels: `Business Website`, `Ongoing SEO & Local Growth`, `Website Help`, `Custom System`, `Not sure`
- Source: `app/content/commercialReset.ts`, `app/[...slug]/page.tsx`, and the commercial inquiry components.
- Backend values remain mapped to the existing API vocabulary; validation, consent, privacy, success, failure, rate-limit, and network-state copy is unchanged.

## Shared shell and supporting routes

- Resources: `Business Websites` and client-owned eligible-hosting wording.
- Emergency ordinary-inquiry CTA: `Get a free website review`.
- Tools: current free-review CTA and `Custom Systems` labels.
- Services content CTA: `Get a free website review`.
- Industry service labels and service side navigation: canonical four-service vocabulary.
- Website-buying guide: `Business Websites` and client-owned eligible-hosting language.
- Source: the corresponding route components and content records.

## Mechanical transformations

- HTML escaping may render `&` as `&amp;`; visible text is unchanged.
- Start selector labels map to the existing plural backend values so submission compatibility is preserved.
- The service-detail renderer replaces superseded service-family labels with the approved canonical labels at render time while preserving historical source records.

## Editorial statement

Codex authored zero new public-facing marketing claims. New visible wording is either supplied in the 2026-07-30 audit, an approved canonical service label, or existing approved hosting copy reused unchanged.

Unresolved public-copy conflicts: none.
