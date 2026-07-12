# Boho Digital Services Agent Instructions

This repository is the source of truth for the Boho Digital Services website
deployed to Cloudflare Pages project `bohodigitalservices`.

- Preserve the pinned pnpm version and lockfile.
- Validate changes with `pnpm exec tsc --noEmit`, `pnpm run build:pages`,
  and `node --test tests/rendered-html.test.mjs`.
- Keep `.openai/hosting.json` intact; it records the earlier private review
  project identity but does not contain a credential.
- Treat `_legacy-boho/` as a read-only archive unless an explicit migration
  task requires changes there.
- Keep the review site's `noindex, nofollow` behavior and disconnected forms
  until the owner explicitly approves indexing or form processing.
- Never commit API tokens, account credentials, `.env` files, raw customer
  data, browser profiles, caches, build output, or generated logs.
