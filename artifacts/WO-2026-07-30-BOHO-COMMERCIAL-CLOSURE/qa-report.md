# Commercial closure QA report

Date: 2026-07-30

Repository owner: `bohodigitalservices-site`

Governing constitutions:

- `boho.company` version `0.1.0`
- `boho.operations-agents` version `0.1.0`

Authorization: latest owner direction dated 2026-07-30 removes the restaurant-specific direction and explicitly authorizes production deployment. Search Console recrawl remains separately gated.

## Automated release checks

- `pnpm test`: passed
- Commercial copy contract: 15 packets, 1,493 slots, 190 resolved collisions, 0 unresolved
- Static pages generated: 184
- Rendered tests: 40 passed
- Canonical routes crawled: 180
- Redirect variants crawled: 82
- Redirect chains: 0
- Redirect loops: 0
- Crawl failures: 0
- Glossary routes: 153; accidental noindex routes: 0
- `git diff --check`: passed
- Rendered visible-content sweep: 183 HTML files, 0 retired commercial-language or retired-price hits
- Rendered `/`, `/services/`, and `/pricing/`: 0 restaurant-specific commercial-direction hits

GA4 `G-5CV8L2SE2R`, Umami website ID `aecddac8-8ad4-49c4-b791-60b161c95155`, and the shared analytics bootstrap remain present in rendered output.

## Browser checks

### Desktop, 1440 × 900

- Homepage: correct H1, Services navigation visible, free-review CTA visible, no restaurant-specific commercial section, zero horizontal overflow.
- Pricing: four rows only; `$850`, `$450/month`, `$200`, and `$1,500`; one content CTA; client-owned hosting explanation; zero horizontal overflow.
- Tools: current free-review CTA and Custom Systems references; no retired shell copy; zero horizontal overflow.

### Mobile, 390 × 844

- Homepage first viewport shows the `$850` and free-hosting promise, the free-review CTA, and the beginning of the client ownership receipt.
- Desktop navigation is hidden and the mobile Menu control is visible.
- Rendered homepage order moves directly from website scope into proof with no restaurant-specific section.
- `/start/` shows the exact free-review promise and has zero horizontal overflow.
- Start form renders the five supplied selector labels and `Request my free review`.

### Keyboard and semantic controls

- Mobile navigation uses a labeled button and a native `details` / `summary` Services disclosure.
- The disclosure exposes all four canonical service links and starting prices.
- Automated source coverage confirms desktop Escape handling restores focus to the dropdown that handled it.
- The in-app browser’s synthetic key dispatcher did not produce a reliable state transition during this run, so final human keyboard activation remains an approval-preview check rather than a claimed automated pass.

The localhost Turnstile widget emitted its expected non-production warning. No page-specific JavaScript errors were found.

## Screenshot evidence

- `screenshots/home-desktop-1440x900.jpg`
- `screenshots/home-mobile-390x844.jpg`
- `screenshots/pricing-top-desktop-1440x900.jpg`
- `screenshots/start-mobile-390x844.jpg`

## Deferred release actions

- Search Console recrawl is deferred because it is a separate external account action.
- P2 service-page shortening, Industries redesign, About redesign, and a real Work page remain outside this corrective patch.
