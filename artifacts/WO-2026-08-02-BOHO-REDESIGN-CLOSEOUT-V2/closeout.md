# WO-2026-08-02-BOHO-REDESIGN-CLOSEOUT-V2 closeout

Status: private owner-review candidate prepared; production unchanged. The safe-delivery limitation in item 20 remains an owner-acceptance check.

1. **Repository path:** `/Users/darksmarskin/Documents/local2/repos/bohodigitalservices-site`
2. **Starting branch:** `main`, tracking the canonical Pi `origin/main`.
3. **Starting SHA:** `6754d20c692fae59786d98d541f13b79e1af4e4d`.
4. **Candidate branch:** `review/wo-2026-08-02-boho-redesign-closeout-v2`.
5. **Final candidate SHA:** supplied in the final handoff and Sites version metadata. A Git commit cannot contain its own hash.
6. **Baseline test results:** clean install; TypeScript pass; lint 0 errors and 35 pre-existing warnings; commercial contract 12/12; rendered/static checks 11/11; 186 static pages; 153 glossary records; 58 redirect records, 40 verified redirects, 80 generated rules, 0 chains/loops; route artifacts current; crawl 182 canonical routes plus 80 redirect variants and robots/sitemap with 0 failures; Sites build 183 prerendered routes.
7. **Final test results:** TypeScript pass; focused analytics/commercial tests 17/17; lint 0 errors and the same 35 warnings; commercial contract 12/12; rendered/static checks 11/11; 186 static pages; route, redirect, artifact, and 182-route crawl checks all pass; Sites build 183/183 prerendered routes. `git diff --check` passes.
8. **Files changed:** `app/components/DesktopNavigation.tsx`, `app/components/MobileMenu.tsx`, `app/components/commercial/CommercialInquiryFormClient.tsx`, `app/content/navigation.ts`, `app/globals.css`, `content/commercial/current-target-inventory.json`, `public/analytics-bootstrap.js`, `tests/analytics-bootstrap.test.mjs`, `tests/commercial-release-candidate.test.mjs`, and this work-order artifact directory.
9. **Components added:** none. The existing shared desktop and mobile navigation components were extended.
10. **Components retired:** none; no route-specific shell was found to retire.
11. **Shared commercial-data implementation:** `canonicalServices` remains the sole service-name/route/price source. `serviceHeaderLinks` derives its four canonical service records from it; `serviceMenuLinks` adds only the required “All Services” overview entry.
12. **Routes checked:** `/`, `/services/`, `/pricing/`, `/work/`, `/about/`, `/contact/`, `/start/`, `/industries/`, `/resources/`, `/tools/`, `/emergency/`, `/learn/website-buying/`, and all four canonical service routes at 320, 375, 390, 768, 1024, 1280, and 1440 pixels. The static crawler checked all 182 canonical routes.
13. **Routes changed:** shared navigation behavior changes on every route using the canonical shell; form-state and analytics behavior changes on `/start/` and `/emergency/`. No route path, canonical destination, or approved About-page content changed.
14. **Redirect inventory:** 58 registry records; 40 verified redirect records; 80 generated rules; 0 redirect chains; 0 loops; canonical Work remains a direct route.
15. **Stale-name occurrence inventory:** current visible commercial output has 0 obsolete service/offer names. Raw generated output has 953 case-insensitive `New Website` matches, all false positives from the approved plural phrase “New websites” replicated in HTML/RSC. Repository-only occurrences are retained and classified as governed/historical content (436), internal or non-current source (80), documentation (42), prior QA artifacts (28), and generator/internal script material (16). Historical records were not rewritten.
16. **Stale-price occurrence inventory:** current generated output has 0 matches for `$95`, `$350`, `$500`, `$750`, `$1,000`, or `$2,500` as standalone stale offers. Retained repository occurrences are non-current source (47), governed/historical content (192), documentation (26), prior artifacts (14), scripts (16), and legacy archive material (6).
17. **Restaurant-language occurrence inventory:** visible primary commercial output has 10 `menu` matches, each the generic mobile “Menu” control, and one `reservation` substring inside “preservation.” These are false positives. No restaurant, ordering, catering, POS, loyalty, or gift-card sales positioning was found.
18. **Copy deviations:** added only `All Services` and the synopsis `Compare all four services and starting prices.` as required by the work order. Approved page marketing copy, canonical service names/prices, and the restored About page were not rewritten.
19. **Work-media audit:** Boho News, How Biscuit, Rank Builder SEO, and Better Grades each use a real repository screenshot at 1280×800, meaningful alt text, explicit dimensions, responsive rendering, a live-property link, and the Boho-owned disclosure. No media replacement was necessary.
20. **Form test results:** standard inquiry required-field, invalid-email, missing-consent, optional-disclosure/value-preservation, spam-protection, failure-state, label, keyboard-focus, mobile-overflow, and duplicate-submit guards pass. Emergency CTA routing, required fields, authority, consent, failure state, label, keyboard-focus, privacy/no-guarantee copy, and standard/emergency separation pass. A stale-error defect after corrected fields followed by Turnstile failure was fixed and retested. No request reached the intake endpoint. Successful notification delivery and reply-to behavior were not executed because the repository documents no non-production delivery mode or safe test inbox; sending would create an external side effect. This is the bounded owner-acceptance check required by the work order’s stop condition.
21. **Analytics event results:** GA4/Umami privacy-bounded tests pass for existing events plus `service_nav_open` (`device_context`), `service_nav_click` (`source_page`, `service_name`, `price_display`), `emergency_form_start` (`source_page`), `emergency_submit_success` (no form content), and `emergency_submit_failure` (`failure_stage`). Unknown, malformed, and extra properties are rejected; no name, email, URL, business name, provider, budget, market, deadline, or free-form content is sent.
22. **Accessibility results:** one H1 per checked page; Services has a separate link and disclosure button; exact pages use `aria-current="page"` and child service routes mark Services with `aria-current="location"`; desktop Escape closes and returns focus; mobile dialog traps focus, locks background scroll, closes on Escape, restores focus, and exposes a native Services disclosure. Current state is not color-only. No horizontal overflow occurred in 112 route/viewport checks.
23. **Crawl results:** 182 canonical routes, 80 redirect variants, and robots/sitemap checked with 0 failures; all rendered local links and assets resolve.
24. **Canonical-host result:** 185 generated HTML pages with canonicals were inspected; all point to `https://bohodigitalservices.com/`. The private candidate intentionally preserves production canonicals.
25. **Robots result:** `User-Agent: *`, `Allow: /`, canonical Host, and canonical sitemap declaration are present.
26. **Sitemap result:** 182 canonical `<loc>` entries; all 153 glossary routes are present; no noindex glossary pages or slug collisions.
27. **Structured-data result:** 495 JSON-LD blocks parsed with 0 JSON errors; the rendered FAQ structured data matches the visible homepage FAQ.
28. **Console-error result:** 0 browser console errors in the final static-export navigation and visual pass. Local Turnstile delivery was deliberately not attempted.
29. **Performance and page-weight comparison:** no dependency, framework, media, or font was added. Baseline homepage: 86,215 B HTML / 15,249 B gzip and 956,253 B referenced JS/CSS / 250,937 B gzip. Candidate: 86,573 B / 15,324 B and 959,330 B / 251,172 B. Total gzip delta is +310 B (about 0.12%), with no material regression.
30. **Known advisories:** lint retains 35 pre-existing warnings. Real delivery notification/reply-to confirmation requires an explicitly approved test inbox and side effect. Analytics are host-gated and therefore intentionally suppressed on localhost/private preview. The private preview must be owner-reviewed before any production authorization.
31. **Rollback instructions:** production needs no rollback because it was not changed. For the candidate, revert the final handoff SHA on this branch or redeploy the previous private Sites version 62, which represents starting SHA `6754d20c692fae59786d98d541f13b79e1af4e4d`.
32. **Private owner-review URL:** `https://boho-digital-services-review-2026.mankopoppi.chatgpt.site/`.
33. **Production status:** production was not changed. No Cloudflare Pages production deployment, DNS change, canonical Pi push, or GitHub push occurred.

## Screenshot manifest

The `screenshots/` directory contains:

- Desktop and mobile full-page captures for Homepage, Pricing, Work, About, Start, and Website Help. These cover the closed header, homepage hero/service grid, pricing summary, Work public properties, About hero, Start form, Website Help hero, and footer.
- `desktop-services-dropdown-1440.png`.
- `mobile-menu-390.png`.
- `mobile-services-disclosure-390.png`.
- Desktop and mobile contact sheets for rapid review.

All final captures were taken from the deployable static export, not from a mocked page.
