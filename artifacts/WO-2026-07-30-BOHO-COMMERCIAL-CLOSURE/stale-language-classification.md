# Stale commercial-language classification

Authority: owner-provided commercial-reset audit dated 2026-07-30.

## Current public copy

The rendered public `<main>` content is required to contain zero occurrences of the retired product names, price points, CTA labels, or relationship-dependent hosting claims named in the audit. The release test and final rendered-output sweep enforce that condition.

The remaining public service vocabulary is:

- Business Websites
- Ongoing SEO & Local Growth
- Website Help
- Custom Systems
- Get a free website review
- Client-owned eligible hosting

## Historical or internal records

The following paths intentionally retain prior wording because they are governed source packets, generated records of those packets, historical route configurations, or renderer safety rules:

- `content/commercial/source-packets.json`
- `content/commercial/commercial-copy-contract.json`
- `content/commercial/collision-report.json`
- `content/commercial/current-target-inventory.json`
- `content/service-pages/`
- `app/content/servicePages.generated.ts`
- `app/content/servicePresentation.ts`
- legacy page configurations in `app/content/corePages.ts`
- exclusion and canonicalization rules in `app/components/ServiceDetailPage.tsx`

These records do not determine the visible commercial layer for the current four-service release. They remain inspectable so the prior copy contract, route compatibility, and content history are not silently rewritten.

## Article or educational reference

Generic, lower-case uses of terms such as hosting, managed infrastructure, migration, audit, reporting, redesign, or discovery remain when they describe a technical concept or a possible part of scoped work rather than a public product. They are not service-family or price claims.

## False positives

- `ServiceDetailPage.tsx` contains retired labels and prices only in filters or canonicalization rules that prevent them from reaching visible output.
- Commercial contract fixtures and collision records include superseded values as test evidence.
- Generated React flight payloads can serialize internal source data. Acceptance is based on rendered visible content after scripts and markup are removed, plus metadata and structured-data checks.

## Repository occurrence classification

The requested exact strings remain only within the historical/internal path classes above. No occurrence is classified as current public copy.
