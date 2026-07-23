# Boho URL migration audit

Work order: `WO-2026-07-22-BOHO-TECHNICAL-VISIBILITY-GLOSSARY-001`

Base commit: `bcd3faf80c96dcb0416418389e75dc050d74f2b2`

## Evidence checked

- Current core, audience, industry, service, retired-page, sitemap, and static-output registries
- Tracked Ask-the-Owl source files and generated legacy HTML
- Tracked legacy sitemap
- Git history, including the earlier unmerged glossary-routing prototype
- Existing generated Cloudflare Pages redirects
- Rendered current static output and internal links

Search Console URL exports, raw analytics URL exports, Cloudflare request logs, and Internet Archive data were not available in this checkout. No route was inferred from those unavailable sources.

## Current inventory

- Canonical indexable routes: 181
- Glossary hub routes: 1
- Glossary detail routes: 153
- Current routes missing a canonical: 0
- Current routes marked noindex: 0

The complete machine-readable inventory is `content/routing/public-route-registry.json`.

## Historical inventory

- Tracked legacy HTML routes reviewed: 53
- Historical routes that remain canonical: 8
- Governed historical/retired records: 58
- Verified redirect records: 40
- Unverified or unresolved records: 18
- Legacy HTML routes without a registry decision: 0

- `/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/index.html`
- `/about/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/about/index.html`
- `/ask-the-owl/` — **REDIRECT** → `/learn/glossary/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/index.html`
- `/ask-the-owl/dictionary/` — **REDIRECT** → `/learn/glossary/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/index.html`
- `/ask-the-owl/dictionary/ai-assisted-workflow/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/ai-assisted-workflow/index.html`
- `/ask-the-owl/dictionary/analytics-migration/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/analytics-migration/index.html`
- `/ask-the-owl/dictionary/bad-backlink/` — **REDIRECT** → `/learn/glossary/backlink/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/bad-backlink/index.html`
- `/ask-the-owl/dictionary/black-box-seo/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/black-box-seo/index.html`
- `/ask-the-owl/dictionary/climate-aware-workflow/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/climate-aware-workflow/index.html`
- `/ask-the-owl/dictionary/cms/` — **REDIRECT** → `/learn/glossary/cms/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/cms/index.html`
- `/ask-the-owl/dictionary/content-cluster/` — **REDIRECT** → `/learn/glossary/topic-cluster/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/content-cluster/index.html`
- `/ask-the-owl/dictionary/crawlability/` — **REDIRECT** → `/learn/glossary/crawlability/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/crawlability/index.html`
- `/ask-the-owl/dictionary/dns/` — **REDIRECT** → `/learn/glossary/dns/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/dns/index.html`
- `/ask-the-owl/dictionary/domain-registrar/` — **REDIRECT** → `/learn/glossary/domain-registrar/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/domain-registrar/index.html`
- `/ask-the-owl/dictionary/efficient-website/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/efficient-website/index.html`
- `/ask-the-owl/dictionary/google-search-console/` — **REDIRECT** → `/learn/glossary/google-search-console/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/google-search-console/index.html`
- `/ask-the-owl/dictionary/guaranteed-rankings/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/guaranteed-rankings/index.html`
- `/ask-the-owl/dictionary/hosting-provider/` — **REDIRECT** → `/learn/glossary/hosting/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/hosting-provider/index.html`
- `/ask-the-owl/dictionary/indexing/` — **REDIRECT** → `/learn/glossary/indexing/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/indexing/index.html`
- `/ask-the-owl/dictionary/internal-links/` — **REDIRECT** → `/learn/glossary/internal-link/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/internal-links/index.html`
- `/ask-the-owl/dictionary/keyword-stuffing/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/keyword-stuffing/index.html`
- `/ask-the-owl/dictionary/link-farm/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/link-farm/index.html`
- `/ask-the-owl/dictionary/metadata/` — **REDIRECT** → `/learn/glossary/metadata/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/metadata/index.html`
- `/ask-the-owl/dictionary/private-blog-network/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/private-blog-network/index.html`
- `/ask-the-owl/dictionary/provider-lock-in/` — **REDIRECT** → `/learn/provider-rescue/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/provider-lock-in/index.html`
- `/ask-the-owl/dictionary/redirect-map/` — **REDIRECT** → `/learn/glossary/redirect/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/redirect-map/index.html`
- `/ask-the-owl/dictionary/search-intent/` — **REDIRECT** → `/learn/glossary/search-intent/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/search-intent/index.html`
- `/ask-the-owl/dictionary/seo-migration/` — **REDIRECT** → `/learn/provider-rescue/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/seo-migration/index.html`
- `/ask-the-owl/dictionary/seo/` — **REDIRECT** → `/learn/glossary/seo/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/seo/index.html`
- `/ask-the-owl/dictionary/technical-seo/` — **REDIRECT** → `/learn/glossary/technical-seo/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/technical-seo/index.html`
- `/ask-the-owl/dictionary/vanity-metrics/` — **REDIRECT** → `/learn/glossary/vanity-metrics/` — evidence: `_legacy-boho/current/_legacy-static/ask-the-owl/dictionary/vanity-metrics/index.html`
- `/bad-seo-field-guide/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/bad-seo-field-guide/index.html`
- `/case-notes/` — **REDIRECT** → `/work/` — evidence: `_legacy-boho/current/_legacy-static/case-notes/index.html`
- `/contact/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/contact/index.html`
- `/impact/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/impact/index.html`
- `/knowledge-base/` — **REDIRECT** → `/learn/glossary/` — evidence: `_legacy-boho/current/_legacy-static/knowledge-base/index.html`
- `/our-impact/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/our-impact/index.html`
- `/pricing/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/pricing/index.html`
- `/privacy/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/privacy/index.html`
- `/process/` — **UNRESOLVED** — evidence: `_legacy-boho/current/_legacy-static/process/index.html`
- `/services/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/services/index.html`
- `/services/clarity-audit/` — **REDIRECT** → `/services/research-audits-strategy/` — evidence: `_legacy-boho/current/_legacy-static/services/clarity-audit/index.html`
- `/services/monthly-growth-retainer/` — **REDIRECT** → `/services/ongoing-seo/` — evidence: `_legacy-boho/current/_legacy-static/services/monthly-growth-retainer/index.html`
- `/services/monthly-seo-desk/` — **REDIRECT** → `/services/ongoing-seo/` — evidence: `_legacy-boho/current/_legacy-static/services/monthly-seo-desk/index.html`
- `/services/provider-transfer-support/` — **REDIRECT** → `/services/provider-rescue/` — evidence: `_legacy-boho/current/_legacy-static/services/provider-transfer-support/index.html`
- `/services/provider-transfer/` — **REDIRECT** → `/services/provider-rescue/` — evidence: `_legacy-boho/current/_legacy-static/services/provider-transfer/index.html`
- `/services/seo-growth-audit/` — **REDIRECT** → `/services/research-audits-strategy/` — evidence: `_legacy-boho/current/_legacy-static/services/seo-growth-audit/index.html`
- `/services/static-website-builds/` — **REDIRECT** → `/services/web-design-redesign/` — evidence: `_legacy-boho/current/_legacy-static/services/static-website-builds/index.html`
- `/services/technical-seo-cleanup/` — **REDIRECT** → `/services/research-audits-strategy/#technical-seo-and-site-health` — evidence: `_legacy-boho/current/_legacy-static/services/technical-seo-cleanup/index.html`
- `/services/technical-seo-sprint/` — **REDIRECT** → `/services/research-audits-strategy/#technical-seo-and-site-health` — evidence: `_legacy-boho/current/_legacy-static/services/technical-seo-sprint/index.html`
- `/services/website-optimization/` — **REDIRECT** → `/services/web-design-redesign/` — evidence: `_legacy-boho/current/_legacy-static/services/website-optimization/index.html`
- `/terms/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/terms/index.html`
- `/work/` — **PRESERVE** — evidence: `_legacy-boho/current/_legacy-static/work/index.html`

## Vanity Metrics recovery

Verified historical source:

`https://bohodigitalservices.com/ask-the-owl/dictionary/vanity-metrics/`

Direct canonical destination:

`/learn/glossary/vanity-metrics/`

Evidence consists of the tracked Markdown source entry, tracked generated HTML, tracked legacy sitemap entry, and Git history. Both slash variants are generated directly to the final destination with status 301.

## Unresolved routes

The following candidates are deliberately not emitted because the exact replacement is unverified or an owner decision is required:

- `/ask-the-owl/dictionary/ai-assisted-workflow/` — Candidate destination is broader than the historical term and needs owner review.
- `/ask-the-owl/dictionary/analytics-migration/` — Candidate destination is broader than the historical term and needs owner review.
- `/ask-the-owl/dictionary/black-box-seo/` — Candidate destination is broader than the historical warning term and needs owner review.
- `/ask-the-owl/dictionary/climate-aware-workflow/` — No sufficiently equivalent current page has been verified.
- `/ask-the-owl/dictionary/efficient-website/` — Candidate destination covers only part of the historical term and needs owner review.
- `/ask-the-owl/dictionary/guaranteed-rankings/` — Candidate destination is broader than the historical warning term and needs owner review.
- `/ask-the-owl/dictionary/keyword-stuffing/` — Candidate destination is broader than the historical warning term and needs owner review.
- `/ask-the-owl/dictionary/link-farm/` — Candidate destination is related but not equivalent to the historical warning term.
- `/ask-the-owl/dictionary/private-blog-network/` — Candidate destination is related but not equivalent to the historical warning term.
- `/learn/bad-seo-field-guide/` — Retired route has no owner-approved replacement or 410 decision.
- `/learn/small-business-seo/` — Retired route has no owner-approved replacement or 410 decision.
- `/learn/local-search/` — Retired route has no owner-approved replacement or 410 decision.
- `/learn/ai-search-visibility/` — Retired route has no owner-approved replacement or 410 decision.
- `/learn/featured-rank-builder/` — Retired route has no owner-approved replacement or 410 decision.
- `/bad-seo-field-guide/` — Historical full-page route has no owner-approved current equivalent.
- `/impact/` — Historical impact page has no owner-approved current equivalent.
- `/our-impact/` — Historical alias pointed to /impact/, which no longer has a canonical current page.
- `/process/` — Historical process page has no owner-approved current equivalent.

No unresolved route was redirected to the homepage, and no 410 was introduced without owner approval.
