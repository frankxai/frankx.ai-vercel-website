# Branch Audit — frankx.ai-vercel-website

**As of:** 2026-07-28
**Baseline:** `main` @ 12850052e
**Branches:** 67 (excluding `main`) · **Open PRs:** 30

## Method — and the two ways this measurement goes wrong

Two naive metrics both give the wrong answer on this repo, so neither is used here.

**`git diff main...branch` is wrong after a squash merge.** Three-dot diff measures from the merge base, and a squash merge creates a commit on `main` that is not in the branch's ancestry. `agent/codex/vault-refresh-388` reports "4 unlanded files" by that metric even though PR #388 merged its content verbatim — the merge base simply never moved. Both vault-refresh branches are fully landed.

**Raw file counts are inflated by `public/reading/`.** `main` untracked that directory on 2026-07-26 (#349) — 17,880 files, ~508MB of recursive generator output. Every branch created before that date still carries them, so a plain diff reports a ~6.6M-line delta on almost every branch. That is an artifact, not unlanded work. A three-way merge preserves `main`'s deletion, verified by test-merging every branch: **zero** stage a `public/reading/` file.

**What is used instead:** `git merge-tree --write-tree main <branch>`, comparing the resulting tree to `main`'s tree. If they match, the branch contributes nothing new and is safe to delete. If the merge exits non-zero, the branch conflicts. This is a real merge, not a diff.

Deletion stays reversible until GitHub garbage-collects the ref (typically weeks). Revive with `git checkout origin/<branch>`.

## Summary

| Class | Count | Action |
|---|---|---|
| Fully landed in `main` | 2 | Delete now — queued in `.github/cleanup-queue.txt` |
| Backs an open PR, merges clean | 17 | Review and land |
| Backs an open PR, conflicts | 13 | Needs a rebase before it can land |
| No open PR, merges clean | 2 | Triage |
| No open PR, conflicts | 33 | Triage — see the systemic cause below |

**47 of 67 branches conflict with `main` today.** That is the number that matters: the backlog is not free to land, and it gets more expensive every week `main` moves.

## The systemic cause of the conflicts

Counting which files actually conflict across all 47 branches:

| File | Branches it conflicts in | Nature |
|---|---|---|
| `data/route-index.json` | 13 | **Generated** — rebuilt by `scripts/build-route-index.mjs` in `prebuild`, on every build including Vercel's |
| `data/vault-manifest.json` | 11 | **Generated** by `pnpm vault:scan` (hand-triggered) |
| `package.json` | 11 | Genuine — dependency and script edits |
| `next.config.mjs` | 8 | Genuine — redirects and config |
| `components/NavigationMega.tsx` | 8 | Genuine — the shared nav index |
| `.gitignore` | 8 | Genuine |
| `package-lock.json` | 7 | Resolved — deleted from `main` in #378, so this cause is gone going forward |
| `data/blog-hero-manifest.json` | — | **Generated** by the same prebuild script; the committed copy is currently stale by two entries |

The single largest conflict source is a file no human edits. `data/route-index.json` and `data/blog-hero-manifest.json` are both rewritten by `scripts/build-route-index.mjs` in `prebuild`, before `next build`.

**They cannot simply be untracked.** Four TypeScript modules import them statically — `lib/fuzzy-route-match.ts`, `lib/site-search.ts`, `lib/blog.ts`, and both `app/api/404/*` routes — and CI runs `type-check` *before* `build`, so `prebuild` has not run yet at that point. Removing them from version control would break CI on a fresh checkout. Committing them is correct given that import shape.

What that leaves is a resolution recipe rather than a restructure. **When either file conflicts, do not hand-merge it:**

```
git checkout --ours data/route-index.json data/blog-hero-manifest.json
pnpm routes:build
git add data/route-index.json data/blog-hero-manifest.json
```

The generator is deterministic and enumerates from `app/`, so the regenerated file is correct for the merged tree by construction — which a hand-resolved union of two stale copies is not. Making this cheaper than a recipe (generating into a gitignored path and importing through a committed shim, so the artifact leaves version control entirely) is a separate structural change with real risk to `type-check`; it is not made here.

Related: `data/blog-hero-manifest.json`'s committed copy is currently stale by two entries relative to what `prebuild` produces. Harmless in production — every deploy regenerates it — but it is drift, and it is what the recipe above prevents.

`app/sitemap.ts` auto-merges in 15 branches. It is the most-touched shared file but not, in fact, a conflict source.

## Fully landed — safe to delete (queued)

| Branch | PR | Proof |
|---|---|---|
| `agent/codex/vault-refresh-388` | 388 | merge-tree result == `main` tree; PR merged as 12850052e |
| `agent/codex/vault-refresh-388-v2` | 388 | merge-tree result == `main` tree; same content, superseded duplicate |

## Open pull requests (30)

Merge status test-merged against `main` @ 12850052e.

| PR | State | Merge | Branch | Title |
|---|---|---|---|---|
| #394 | ready | clean | `agent/claude/soft-404-fix` | Fix soft-404s: five route families returned 200 |
| #389 | draft | clean | `agent/hermes/template-catalog-conversion-foundation` | Outcome-led catalog foundation |
| #384 | draft | clean | `agent/book/r1-cta` | Rescue: primary nav + homepage CTA → gencreator.ai |
| #383 | draft | clean | `agent/codex/mind-page` | Rescue: premium Mind operating-system page |
| #382 | draft | clean | `agent/witali-father-code` | Rescue: /witali and /father-code memorial pages |
| #377 | ready | clean | `agent/codex/mvu-day8-unhooking` | MVU Day 8 unhooking field guide |
| #368 | ready | **conflicts** | `agent/codex/metadata-integrity-20260725` | Preserve essential metadata identity |
| #355 | draft | clean | `agent/codex/mvu-field-intelligence` | Rolling Tallinn field intelligence |
| #352 | ready | **conflicts** | `codex/frankx-constellation-elevation-20260722` | Elevate the FrankX constellation |
| #351 | draft | **conflicts** | `codex/frankx-v0-template-os-production` | Productionize v0 template OS and Visual Foundry |
| #346 | draft | **conflicts** | `codex/studio-ledger-release-gate` | Fail-closed Studio Ledger release gate |
| #340 | draft | clean | `agent/claude/agentic-company-offer` | Campaign C1: /agentic-company |
| #338 | draft | clean | `agent/claude/v0-products` | The Products + wave-2 intelligence (stacked on #336) |
| #336 | ready | clean | `agent/claude/v0-blueprint` | /v0 Blueprint |
| #335 | draft | clean | `claude/magnifica-flagship-upgrade` | Magnifica Humanitas flagship upgrade |
| #334 | draft | clean | `agent/book/first-100-hardening` | Harden First €100 Weekend |
| #326 | draft | clean | `codex/first-100-weekend-challenge` | Launch the First €100 Weekend |
| #321 | draft | clean | `agent/hermes/accelerator-surface` | Venture Fabric + Portfolio OS constellation |
| #284 | ready | **conflicts** | `codex/best-ai-hardware` | AI hardware intelligence hub |
| #278 | ready | **conflicts** | `agent/codex/tallinn-tribe-studio-20260714` | Public Tallinn session studio |
| #276 | draft | **conflicts** | `agent/codex/starlight-retreat-vision-20260714` | Starlight Retreats: founding vision |
| #271 | draft | **conflicts** | `agent/codex/frankx-ai-architecture-20260712` | Verified AI architecture deployment atlas |
| #266 | draft | **conflicts** | `agent/codex/family-ai-operating-system` | Governed Family Intelligence foundation |
| #243 | draft | clean | `agent/claude/checkout-revenue-fix` | Wire $47 kit CTA to real Stripe checkout |
| #231 | draft | clean | `claude/wealth-os-agent-architecture-efj4hb` | Hosted investment-intelligence council |
| #221 | ready | **conflicts** | `blog-structure-and-content` | Website metadata and job title |
| #210 | ready | **conflicts** | `claude/ai-architecture-templates-65188c` | Elevate /ai-architecture to 2026 SOTA |
| #202 | ready | **conflicts** | `claude/premium-ops-ruxnO` | Five doors framework + Strategic Advisor door |
| #168 | ready | **conflicts** | `claude/exec-hardening-ruxnO` | #107 standard on lab/build pages + voice router |
| #166 | ready | **conflicts** | `claude/build-llm-research-hub-75ba8` | Model Hub expansion |

## No open PR (35)

Committed work that was never proposed for review, plus deliberate `archive/*` save-points. Nothing here is queued for deletion. Unlanded counts exclude `public/reading/`.

| Branch | Last commit | Unlanded | Merge | Note |
|---|---|---|---|---|
| `observability/vercel-cost-2026-W31` | 2026-07-27 | 1 | clean | Weekly cost snapshot |
| `claude/fable-cover-v3-spiral` | 2026-07-04 | 2 | clean | PR #225 was closed |
| `agent/worktree-sync` | 2026-06-18 | 1 | conflicts | Sole change strips 25 lines from `.gitignore` — inspect before reviving |
| `codex/remove-acos-agentdb` | 2026-06-18 | 3 | conflicts | PR #186 was closed |
| `agent/claude/remove-test-email-endpoint` | 2026-07-14 | 3 | conflicts | PR #218 was closed |
| `agent/gemini/auctions-upgrade` | 2026-07-14 | 6 | conflicts | |
| `claude/frankx-freemium-experience-hJuk4` | 2026-06-24 | 6 | conflicts | PR #204 was closed |
| `claude/newsletter-doi-revival-ruxnO` | 2026-06-10 | 10 | conflicts | PR #169 was closed |
| `codex/openai-devday-resource` | 2026-07-03 | 17 | conflicts | |
| `claude/multi-agent-newsletter-system-anKSZ` | 2026-06-10 | 34 | conflicts | |
| `agent/claude/homepage-music-email-fixes` | 2026-06-28 | 44 | conflicts | PR #209 was closed |
| `claude/remove-personal-info-1DgLs` | 2026-06-22 | 48 | conflicts | PR #190 was closed |
| `agent/gemini/tallinn-reconciliation-main-prod` | 2026-07-15 | 61 | conflicts | |
| `agent/codex/frankx-earbuds-2026` | 2026-06-26 | 64 | conflicts | |
| `claude/gifted-pasteur-9LsID` | 2026-06-10 | 64 | conflicts | |
| `feat/ikigai-branding-workshop` | 2026-06-14 | 71 | conflicts | |
| `codex/blog` | 2026-07-15 | 87 | conflicts | |
| `codex/frankx-v-template-studio` | 2026-07-14 | 111 | conflicts | PR #233 was closed |
| `codex/x` | 2026-07-15 | 120 | conflicts | |
| `feat/map-v1-v2-v3-upgrades` | 2026-07-15 | 120 | conflicts | |
| `claude/ecosystem-audit-strategy-7ovdli` | 2026-07-01 | 202 | conflicts | PR #196 was closed |
| `archive/observability-vercel-cost-2026-W21` | 2026-05-29 | 3 | conflicts | save-point |
| `archive/normalize-line-endings-2026-W20` | 2026-05-11 | 5 | conflicts | save-point |
| `archive/ikigai-upgrade-2-2026-W20` | 2026-05-14 | 10 | conflicts | save-point |
| `archive/ikigai-upgrade-3-2026-W20` | 2026-05-14 | 11 | conflicts | save-point |
| `archive/feat-newsletter-launch-v1` | 2026-05-19 | 12 | conflicts | save-point |
| `archive/claude-frankx-freemium-experience-hJuk4` | 2026-05-29 | 27 | conflicts | save-point |
| `archive/multi-agent-newsletter-system-anKSZ` | 2026-05-19 | 30 | conflicts | save-point |
| `archive/sync-prompt-hub-from-frankx` | 2026-05-16 | 35 | conflicts | save-point |
| `archive/normalize-line-endings-2026-05` | 2026-05-29 | 52 | conflicts | save-point |
| `archive/rails-phase-0` | 2026-05-03 | 58 | conflicts | save-point |
| `archive/recovery-sibling-2026-04-20` | 2026-04-16 | 62 | conflicts | save-point |
| `archive/claude-build-llm-research-hub-75ba8` | 2026-06-01 | 63 | conflicts | save-point |
| `archive/staging-madrid-2026-05-25` | 2026-05-25 | 796 | conflicts | large recovery snapshot |
| `archive/recovery-nested-2026-04-20` | 2026-04-14 | 1021 | conflicts | large recovery snapshot |

`agent/witali-father-code` is no longer in this list — it now backs PR #382. It touches the family memorial hub; do not delete it under any cleanup pass.

## Keeping this file true

Branch auto-delete on merge is **on** — verified against the seven most recently merged PRs, all of whose branches are gone. So this backlog is legacy plus in-flight work, not ongoing accumulation.

Regenerate after any batch of merges. The measurement that matters is `git merge-tree --write-tree main <branch>`: tree equal to `main` means safe to delete, non-zero exit means it needs a rebase before it can land. Do not substitute a `git diff` for it.
