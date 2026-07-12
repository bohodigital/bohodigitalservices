# Boho Digital Services Agent Instructions

This repository is the GitHub production handoff for Boho Digital Services.
It is not the authority for choosing an unapproved design.

Before Sites work, source replacement, merge, or deployment, read:

```text
SITES-CLOUDFLARE-HANDOFF.md
/srv/local1/hub/ops/runbooks/sites-cloudflare-pages.md
```

- Never assume `main`, the live site, or the newest Pi commit is the approved
  design.
- Sites must first publish a private preview and obtain explicit owner approval
  for that exact URL.
- Use the authenticated GitHub owner `bohodigital`; never use
  `thepresidentofai`.
- Do not create another Cloudflare Pages project or change DNS/custom domains.
- Never commit API tokens, account credentials, `.env` files, raw customer
  data, browser profiles, caches, build output, or generated logs.
- Normal Pages deployment uses the fixed Pi Secret Broker reference
  `boho-digital-services.cloudflare.pages-deploy` through an approved wrapper.
- The repository workflow validates source. A successful build does not prove
  that the visual design is owner-approved.
