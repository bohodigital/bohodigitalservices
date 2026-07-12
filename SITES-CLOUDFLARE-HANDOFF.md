# Sites handoff: Boho Digital Services

Stop before production work and read:

```text
/srv/local1/hub/ops/runbooks/sites-cloudflare-pages.md
```

Candidate Sites source on the Pi:

```text
repo: /srv/local1/repos/boho-digital-services
project: /srv/local1/repos/boho-digital-services/website
candidate branch: site/private-review-v2-handoff
site commit: 0206cef
handoff head: 03ac6b1
```

This candidate is not automatically approved. Produce a private Sites preview,
show the owner the exact URL, and stop for explicit approval.

Production mapping after approval:

```text
GitHub: bohodigital/bohodigitalservices
Cloudflare account: 41791497823353577cba1af7179342dd
Pages project: bohodigitalservices
Credential reference: boho-digital-services.cloudflare.pages-deploy
```

Never read the raw token. Never use `thepresidentofai`. Never deploy merely
because a build or CLI command succeeds. The live visuals must match the exact
owner-approved private preview.
