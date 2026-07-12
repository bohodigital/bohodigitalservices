# Pi Transfer Manifest

## Transfer intent

Preserve a complete, maintainable copy of the accepted Boho Digital Services
private website in the existing Pi-hosted `boho-digital-services` repository,
on a new branch, with enough documentation to continue later without the
original conversation.

No production publication or infrastructure change is authorized by this
transfer.

## Post-transfer continuation

The preserved branch has continued beyond the original 37-file website import.
The July 11, 2026 knowledge/navigation pass added a structured 57-entry Glossary,
accessible inline definition popovers, a 10-profile Tools page, two operating
diagrams, official citations, and unlinked placeholders for the confirmed owned
entities Rank Builder SEO and How Biscuit.

The same pass added automatic first-use annotation throughout shared prose,
the frequency-scan script that maintains the common-term shelf, compact
search/filter/A–Z/expand Glossary controls, reusable section sidebars across all
interior route families, and isolated new-tab behavior for official external
links. These systems are source-driven so later additions do not require
hand-editing every page or turning the Glossary back into a wall of cards.

The existing owner-only Sites project was updated to saved version 6 using
Sites source commit `926ce66d5a7cca181aec1c0744a6f5c8af1e936d`. Access remained
owner-only; forms, analytics, custom domain, DNS, D1, and R2 remained unchanged.
Version 6 also replaces slogan-heavy homepage headings with clearer service
language, removes routine indexing banners, consolidates disconnected-form
notices, and reduces headline, hero, card, and section scale across breakpoints.
The original import identity below remains the provenance record for the initial
accepted visual-site copy.

## Repository locations

- Local parent repository:
  `C:\Users\a1009\Documents\Codex\local1\boho-digital-services`
- Pi working repository: `/srv/local1/repos/boho-digital-services`
- Pi bare origin: `/srv/local1/git/boho-digital-services.git`
- Branch: `site/private-review-v2-handoff`
- Parent branch used as the branch base: local `main`
- Parent base commit before website handoff:
  `8cce05c970699cc0ade0a0a1412cd237d0c31d41`

The Pi's manifest identifies this repository as the Boho business-operations
lane, with durable data and runtime state outside the Git source tree.

## Website source identity

- Original nested website repository commit:
  `06004dc3a5ad9616718a8a26b2dd60797bd28c19`
- Commit subject: `Brighten Boho mosaic visual system`
- Copy method: Git archive of the exact tracked commit, extracted into
  `website/`
- Tracked website files copied: 37
- Generated dependencies/build output copied: no
- Source image copied:
  `website/public/boho-digital-services-social.png`

Because the copy was created with `git archive`, it excludes the nested `.git`
directory, untracked files, dependencies, build output, temporary archives, and
short-lived credentials while preserving every tracked source file byte-for-byte.

## Controlling work order identity

- Preserved path:
  `docs/source/boho_digital_full_site_work_order_v1.md`
- Original file size: 168,746 bytes
- SHA-256:
  `A5F7DE7AA1EF34EA9410DCDB3A407D1817EFF64D942BBDD10666E82329478348`

The destination hash was verified against the original attached file before
commit.

## Website file inventory

```text
.gitignore
.openai/hosting.json
app/[...slug]/page.tsx
app/chatgpt-auth.ts
app/components/DraftForm.tsx
app/components/InteriorPage.tsx
app/components/MobileMenu.tsx
app/components/SiteChrome.tsx
app/content/audiencePages.ts
app/content/corePages.ts
app/content/types.ts
app/globals.css
app/Homepage.tsx
app/layout.tsx
app/not-found.tsx
app/page.tsx
build/sites-vite-plugin.ts
cloudflare-env.d.ts
db/index.ts
db/schema.ts
drizzle.config.ts
drizzle/meta/_journal.json
eslint.config.mjs
examples/d1/app/api/notes/route.ts
examples/d1/db/schema.ts
next.config.ts
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
public/boho-digital-services-social.png
public/favicon.svg
README.md
tests/rendered-html.test.mjs
tsconfig.json
vite.config.ts
worker/index.ts
```

The website README in the handoff branch intentionally replaces the generic
starter README with project-specific instructions. All other website files
begin as the exact source snapshot above.

## Expected validation result

From `website/`:

```text
TypeScript: pass
vinext production build: pass
Rendered HTML tests: 3 passed, 0 failed
Configured routes: homepage + 44 interior routes
```

The production build classifies `/` and the catch-all route conservatively
because request-aware metadata uses `headers()`. That is expected for the
current Worker-backed target and is documented in `OPERATIONS.md`.

## Post-push verification

The transfer is complete only after all of the following are true on the Pi:

1. The bare repository advertises `refs/heads/site/private-review-v2-handoff`.
2. The Pi working repository can fetch that branch.
3. The remote branch commit equals the locally pushed commit.
4. `website/package.json`, `website/pnpm-lock.yaml`,
   `website/public/boho-digital-services-social.png`, and
   `website/.openai/hosting.json` exist in the remote tree.
5. The work-order file exists in the remote tree.
6. The remote work-order blob has the documented SHA-256 after checkout or
   extraction.
7. The remote branch contains this handoff package and route inventory.
8. The Pi's existing `main` branch remains unchanged.

## Secrets and external state

This transfer contains no private key, Cloudflare API token, Sites source token,
form credential, analytics credential, browser profile, password, or `.env`
file.

The current private review deployment continues to exist independently. This
branch does not change its access policy or deployment state.
