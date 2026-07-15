# FrankX Site Wiring Audit

Generated: 2026-06-19T11:47:05.747Z
Base URL: http://localhost:3000

## Summary

- Routes discovered: 685
- Public routes checked live: 0
- Source files scanned: 2224
- Total findings: 13
- Blocking findings: 0

## Blocking Findings

No blocking public wiring findings.

## Commerce Verification

| ID | Kind | URL | Status | Owner action |
| --- | --- | --- | --- | --- |
| vibe-os | free-download | /products/vibe-os | verified |  |
| creators-soulbook | free-download | /soulbook | needs-verification | Confirm gated download and email delivery behavior. |
| creative-ai-toolkit | paid-product | https://frankx.gumroad.com/l/creative-ai-toolkit | needs-verification | Confirm canonical checkout platform and delivery file before changing CTAs. |
| creation-chronicles | paid-product | https://frankx.gumroad.com/l/creation-chronicles-creator | needs-verification | Confirm canonical checkout platform, tier links, and delivery pipeline. |
| bv-kit | paid-product | https://frankxai.gumroad.com/l/bv-kit | needs-verification | Confirm Gumroad account/domain and whether Stripe or LemonSqueezy should replace it. |
| prompt-vault | paid-product | https://frankxai.gumroad.com/l/prompt-vault | needs-verification | Confirm Gumroad account/domain and whether Stripe or LemonSqueezy should replace it. |
| ai-architecture-templates | paid-product | /ai-architecture/templates | needs-verification | Fill verified checkout variant IDs before exposing buy buttons. |

## Canonical Aliases

| From | To | Status | Reason |
| --- | --- | --- | --- |
| /music-school | /music/learn | verified | Music School is a public label; /music/learn is the existing route. |
| /agentic-creator-os | /products/agentic-creator-os | verified | Legacy product shorthand now resolves to the canonical Agentic Creator OS product page. |
| /ai-music-academy | /music/learn | verified | AI Music Academy CTAs now land on the public music learning hub. |
| /ai-architectures | /ai-architecture | verified | Permanent redirect already exists in next.config.mjs. |
| /ai-architect | /ai-architecture | verified | Permanent redirect already exists in next.config.mjs. |
| /links | /linktree | verified | Proxy redirects /links to /linktree. |
| /learning-paths | /learn | verified | Learning-path label now resolves to the consolidated Learn hub. |
| /for/founders | /for/creators | verified | Founder workshop CTAs now land on the existing creator audience page. |
| /toolkit | /products/creative-ai-toolkit | verified | Creator Toolkit ladder CTA now resolves to the existing Creative AI Toolkit product page. |
| /soul-frequency-assessment | /soul-frequency-quiz | verified | Redirect alias exists and quiz page is live. |
| /products/soulbook | /soulbook | verified | Permanent redirect already exists in next.config.mjs. |
| /vibe-os | /products/vibe-os | verified | Legacy shorthand now resolves to the canonical Vibe OS product page. |

