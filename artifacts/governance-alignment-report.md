# Boho Digital Services Governance Alignment Review Candidate

Date: July 14, 2026

Work order: `WO-2026-07-14-BOHO-GOVERNANCE-SITE-ALIGNMENT-HANDOFF-001`

Candidate branch: `feature/governance-alignment-review-20260714`

Base commit: `3c64fc7e3bab60e8a6db1c20972601fa297d49d8`

Publication state: private review candidate; not deployed

## 1. Executive summary

The existing Boho site has been retrofitted, not replaced. Its vinext/React/Cloudflare architecture, route engine, shared components, editorial typography, bee and mosaic identity, diagrams, photography treatment, glossary, accessibility conventions, and established URLs remain in place.

The commercial hierarchy now presents Boho as a digital-engineering firm. Local Visibility & Lead Systems is first; Websites & Managed Hosting, Provider Rescue & Migration, Custom Tools & Automation, and Research, Analytics & Improvement complete the five durable service lanes. Global calls to action now lead to an honest technical-contact path or the governed Tools evidence gate.

No production deployment, DNS change, redirect-alias change, credential creation, external-account action, form delivery, or email send occurred.

## 2. Verified current state

- The Pi canonical repository was `/srv/local1/repos/sites/bohodigitalservices` at clean commit `3c64fc7e3bab60e8a6db1c20972601fa297d49d8` when work began.
- Bohopi governance documents were read in the requested precedence order.
- Bohopi had no accepted `proofEligible=true` capability record suitable for public promotion.
- No approved, verified same-origin forms endpoint or accepted live-delivery contract was found.
- Bohopi search results reference some now-unreadable or stale project-mirror records. In particular, the detailed eight-stage customer-process source could not be fetched from its returned path. No wording was invented to fill that gap.
- The tracked `.openai/hosting.json` and Cloudflare configuration were not changed.

## 3. Before and after primary messaging

| Area | Before | Candidate |
| --- | --- | --- |
| Homepage identity | Research-led website design, local SEO, and digital growth | Local visibility, lead systems, and websites built by people who understand the machinery. |
| Firm category | Research-led agency/growth presentation | Digital-engineering firm working across commercial and technical systems |
| Primary action | Visibility Check dominated global conversion | Talk to Someone Technical |
| Secondary action | General service/resource browsing | See What We Build |
| Method | Earlier process language | Diagnose, Prioritize, Engineer, Deploy, Measure, Improve |
| Provider frustration | Supporting rescue language | High-visibility technical-second-opinion section |
| Pricing | Public package/range emphasis | Scope follows diagnosis; no current public rates published |

## 4. Exact files changed

- `app/Homepage.tsx`
- `app/[...slug]/page.tsx`
- `app/components/DesktopNavigation.tsx`
- `app/components/DraftForm.tsx`
- `app/components/GlossaryExplorer.tsx`
- `app/components/InteriorPage.tsx`
- `app/components/KnowledgePages.tsx`
- `app/components/MobileMenu.tsx`
- `app/components/ResourcesPage.tsx`
- `app/components/SectionNavigation.tsx`
- `app/components/SiteChrome.tsx`
- `app/content/audiencePages.ts`
- `app/content/corePages.ts`
- `app/content/knowledge.ts`
- `app/content/navigation.ts`
- `app/content/operatingCycle.ts`
- `app/content/types.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/robots.ts`
- `public/robots.txt`
- `tests/rendered-html.test.mjs`
- `worker/index.ts`
- `artifacts/governance-alignment-report.md`
- `artifacts/screenshots/after-desktop-top.png`
- `artifacts/screenshots/after-desktop-services-menu.png`
- `artifacts/screenshots/after-mobile-top.png`

## 5. Route-by-route change report

No existing route was deleted and no redirect was added.

| Route or family | Index policy | Candidate change |
| --- | --- | --- |
| `/` | index, follow | New governed hero, digital-engineering thesis, five lanes, six-stage method, evidence boundary, provider-frustration acquisition section, and non-pricing scope section. |
| `/services/` | index, follow | Reorganized around the five durable commercial lanes. |
| `/services/local-seo-search-visibility/` | index, follow | Expanded into Local Visibility & Lead Systems and strengthened its route, CTA, measurement, and qualified-inquiry connections. |
| `/services/website-design-redesign/` | index, follow | Retitled Websites & Managed Hosting; preserved design/ownership material and added the exact approved qualified-hosting statement plus exclusions. |
| `/services/website-migration-provider-rescue/` | index, follow | Retained route and content; elevated through homepage, navigation, footer, and technical-second-opinion links. |
| `/services/custom-tools-automation/` | index, follow | New substantive commercial route covering focused tools, integrations, automation, validation, ownership, security, approval, and failure behavior. |
| `/services/research-audits-analytics/` | index, follow | Elevated as Research, Analytics & Improvement and framed around decisions rather than report volume. |
| Existing technical SEO, lead conversion, and ongoing SEO routes | existing per-route policy | Preserved as deeper supporting capabilities instead of top-level commercial lanes. |
| `/about/` | index, follow | Recast the firm as small-by-design, engineering-first, business-first, and ownership/documentation oriented; added the regulated-profession disclaimer. |
| `/contact/` | index, follow | Honest email fallback, disconnected-form disclosure, governed five-lane service selection, no false success, and no response-time promise. |
| `/pricing/` | noindex, nofollow | Converted to a historical/status page with no public numeric rates. |
| `/tools/` | noindex, nofollow | Replaced third-party software promotion with the proof gate, exact seven-state classification model, and zero invented capability profiles. |
| `/resources/` | index, follow | Narrowed toward website buying, provider rescue, glossary, and selected buyer education; Lab made secondary. |
| `/learn/glossary/` | index, follow | Restored indexability; preserved definitions/popovers and removed broken links to retired tool-profile fragments. |
| `/learn/website-buying/` | index, follow | Expanded from a thin draft shelf into substantive buyer guidance. |
| `/learn/provider-rescue/` | index, follow | Expanded from a thin draft shelf into substantive migration and provider-exit guidance. |
| `/learn/bad-seo-field-guide/` and broad Rank Builder-type research | noindex, nofollow | Kept secondary/deferred pending verified Rank Builder destinations; not redirected. |
| `/lab/`, `/lab/claims-we-refuse-to-make/`, and unverified proof shelves | noindex, nofollow | Kept out of search until narrower, verified proof assets exist. |
| Preview and noncanonical hosts | noindex, nofollow | Worker adds `X-Robots-Tag`; preview `robots.txt` disallows all. |

## 6. Capability claims added, removed, and reclassified

### Added or clarified

- Digital engineering is defined as software, data, web infrastructure, automation, hosting, analytics, search, and related digital systems.
- The regulated-profession disclaimer says this wording does not imply licensed civil, electrical, structural, mechanical, or other regulated professional-engineering services.
- Custom tools and automation are presented as scoped engineering around a real operating decision, not a blanket capability or proprietary-product claim.
- The exact approved hosting statement is used: “Standard managed hosting is included at no separate hosting charge for eligible websites while an active qualifying retainer remains in good standing.”

### Removed or reduced

- Territory/exclusivity and manufactured-scarcity language.
- Public numeric pricing ranges and package-led positioning.
- Broad third-party software catalogs presented as Boho proof.
- Unverified public tool profiles, unsupported performance/result claims, and generic agency filler.

### Reclassified

The content schema and UI now use the exact constitutional states:

1. Verified current
2. Demonstrated public
3. Internal working system
4. Prototype or experiment
5. Planned
6. Historical or archived
7. Prohibited claim

Bohopi evidence did not support a public `proofEligible=true` capability profile. The Tools route therefore explains the gate and publishes no persuasive profile as verified proof.

## 7. Navigation and CTA changes

- Desktop primary order: Services, Industries, Tools, Resources, About.
- The Services dropdown exposes all five durable service lanes in one interaction.
- Mobile navigation exposes the same lanes in its Services disclosure.
- Global primary CTA: Talk to Someone Technical.
- Global secondary/build CTA: See What We Build.
- Provider-rescue acquisition CTA: Get a Technical Second Opinion.
- Glossary remains reachable from Resources and the footer.
- Emergency Help remains reachable without response-time or active-monitoring claims.
- Broad SEO research, pricing, and Lab shelves were removed from primary commercial navigation.

## 8. Indexation, sitemap, and canonical behavior

- Fixed the defect that forced all interior routes to `noindex, nofollow`.
- `page.noIndex` now controls route metadata.
- Sitemap generation includes only routes whose current content configuration is indexable.
- `https://bohodigitalservices.com` remains the metadata base, canonical origin, Open Graph origin, sitemap origin, robots host, and analytics-domain origin.
- No `.org` or redirect alias was introduced as a canonical content origin.
- Preview and noncanonical hosts are blocked at the worker-response layer in addition to route metadata.
- Production DNS, redirects, aliases, and Cloudflare settings were not touched.

## 9. Form behavior and unresolved dependencies

- The candidate form has no `action` and no delivery endpoint.
- The form visibly says it cannot send and links to `mailto:contact@bohemiandigital.org`.
- Browser submission after completing required fields produces “Nothing was sent.”
- Form copy says entries are not transmitted or retained and warns against sensitive data.
- No email was sent and no personal data was stored.
- A live form remains blocked on an accepted same-origin interface, inbox/processor ownership, authentication/abuse controls, retention/deletion rules, privacy review, error behavior, and explicit production approval.

## 10. Validation results

| Check | Result |
| --- | --- |
| `pnpm test` | Passed: build plus 13/13 rendered-HTML suites. |
| Production candidate build | Passed with vinext; Cloudflare Pages advanced-mode output prepared locally only. |
| Configured routes | 49 rendered successfully in the test sweep. |
| Local links and fragments | Passed across all rendered routes. |
| Local assets | Every referenced local asset resolved. |
| Canonical/indexation tests | Passed for `.com`, selective sitemap, route robots, preview robots, and executed canonical/noncanonical worker responses with `X-Robots-Tag`. |
| Governance contract tests | Passed for hero, five lanes, exact hosting language, seven classifications, honest form, no numeric pricing, and no unauthorized scarcity. |
| `pnpm run lint` | Passed with 0 errors and 31 warnings. Warnings are existing legacy unused variables, direct image-element recommendations, FormField destructuring, and the existing analytics-script recommendation. |
| Dedicated typecheck | Not available: the package has no `typecheck` script and does not install a standalone TypeScript compiler. The vinext production build compiled the TypeScript source successfully. |
| Desktop browser | Homepage, five-lane service menu, Tools gate, custom-tools route, and contact path inspected at 1440×1000. |
| Mobile browser | Homepage inspected at 390×844; menu and five-lane disclosure operated; Escape closed the dialog. |
| Contact browser behavior | Required fields completed; submit produced the honest “Nothing was sent” state. |
| Accessibility | Landmarks, heading structure, labels, status text, keyboard menu close, mobile dialog semantics, and reduced-motion CSS were checked. No automated WCAG contrast engine was available; visual spot checks found no new contrast defect. |
| Performance | No Lighthouse benchmark was run. The production build succeeded and no new dependency was added. |
| `git diff --check` | Passed. |

The in-app browser's full-page screenshot command duplicated the fixed/sticky first viewport instead of scrolling the document. Clean desktop/mobile viewport captures and the service-menu interaction capture are retained; the malformed full-page composites are not part of the candidate commit.

## 11. Deferred Rank Builder migrations and backlog

1. Verify real Rank Builder destinations before redirecting any broad SEO, AI-search, survey, experiment, field-guide, or market-report route.
2. Keep broad educational/research routes noindexed or secondary until that map is approved; do not duplicate articles across brands.
3. Narrow the Lab further once Bohopi has accepted proof records; `/tools/` stays noindexed until at least one profile satisfies the evidence contract.
4. Retrieve and accept the detailed eight-stage customer-process record before adding or rewriting a compact “What happens when you reach out” presentation. The source path returned by Bohopi was not readable during this work.
5. Implement and security-review the separate Cloudflare form system only under an accepted interface/data contract and separate production authorization.
6. Run an automated WCAG contrast audit and Lighthouse pass at release stage against the exact promoted build.
7. Obtain qualified human review of legal, privacy, commercial, regulated-profession, and accessibility-conformance language before release.

## 12. Saved candidate and rollback

The candidate is saved on `feature/governance-alignment-review-20260714`. The durable Pi worktree path and final commit are recorded in the MCP completion packet after Pi synchronization.

Rollback is ordinary Git history: do not merge or publish the feature branch. If it is later merged, revert the candidate commit(s) or redeploy the prior production commit. No database, DNS, credential, account, or irreversible migration rollback is required.

## 13. External-effect statement

No production site, DNS record, redirect alias, Cloudflare account setting, analytics account, credential, email account, GitHub setting, billing record, or other external account was changed. No public deployment occurred. Production publication remains subject to separate owner approval.
