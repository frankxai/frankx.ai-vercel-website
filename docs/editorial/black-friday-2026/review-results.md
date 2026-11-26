# Black Friday 2026 flagship: independent review results

Article: `content/blog/black-friday-2026-higgsfield-elevenlabs-ai-stack.mdx`. Contract: `.claude/skills/cinematic-editorial-production/SKILL.md`. No reviewer wrote or approved its own work.

| Review | Reviewer scope | Verdict | Outcome |
|---|---|---|---|
| Commercial verification | 64 claims against primary vendor pages (`claim-ledger.json`) | 46 verified, 12 corrected, 4 unverifiable, 2 false | All corrections applied |
| Factual and affiliate re-check | Ledger corrections, live spot checks at ~23:02 UTC, runtime affiliate behaviour, all arithmetic | FAIL → fixed | Starter removed from calculator (no Seedance 2.5), sale windows printed in calculator, eligibility exclusion added, renewal wording narrowed, Pro audio claim corrected, disclosure dependency noted in `programs.json` |
| Editorial and brand | CREATOR.md, taste.md, COPY.md, Humanizer ban lists, invented experience | FAIL → fixed | Undocumented origin line replaced, timing corrected, implied testing removed, every offer row linked, both referral relationships disclosed, contrast formula and link run removed |
| Interface and responsive | Live Web Interface Guidelines, keyboard, focus, overflow, CLS, image weights | PASS with polish | Contrast raised to 11px/55% white, debounced live region, inputs normalise on blur, `name`/`autoComplete`, Intl percent, typographic apostrophe, unit wrapping, status height; `coverAlt` now reaches the hero alt for every post |

## Kept against a finding

- First-person purchase statements ("I'm buying both"). Source: Frank's brief, "why I buy big on Higgsfield and ElevenLabs". Reword as recommendations if Frank prefers.

## Measured (dev server, 2026-11-26)

- Horizontal overflow: none at 375, 768, 1440 (`scrollWidth == innerWidth`, default and overage states).
- CLS: 0.0005 (375) and 0.0014 (1440) on load; 0 for shifts without recent input during interaction.
- Focus: visible on all 8 calculator controls; tab order follows the visual order; radios and slider respond to arrow, Home and End keys.
- Images: hero webp 163 KB, screenshots 77–100 KB, charts 4–5 KB; explicit dimensions and descriptive alt on every figure.
- Visual proof: full-page captures at 375 / 768 / 1440 in light and dark after the last UI edit (local `.visual-proof/after/`, not committed). The site forces a dark colour scheme, so light and dark match. Compact crops in `evidence/`.

## Checks

`pnpm run type-check`, ESLint on changed files, `.claude/ci/web-guidelines-lint.mjs`, `scripts/audit-ai-slop.mjs --strict`, `scripts/voice-audit.sh`, `test:blog-schema`, `test:affiliate-links`, `test:higgsfield-reader`, `test:internal-links`, `test:seo-title`, `test:blog-discoverability`, `images:check`: all pass. `pnpm run build` and the full `merge:gate` were not run in this session.

## Open before merge

1. Higgsfield's plan discount ends 2026-11-27 00:00 UTC. Re-read `higgsfield.ai/pricing` and update the title, description, TL;DR, plan table, cost table, chart and calculator constants to whatever replaces it.
2. Higgsfield affiliate record is past its 45-day verification window, so the site renders it unsponsored. Frank must confirm the referral link before re-verifying; change the disclosure sentence in the same commit.
3. Frank's approval of the hero direction (candidate C of four; board in `hero-candidates-board.webp`).
4. `black-friday-2026-studio-mobile.webp` and the earlier 1200x675 OG are registered but unused by the page.
5. GSC data was unavailable (analytics connector failed); search positioning rests on Semrush only.
6. Matter Forge was not found in this environment.
