# Branch Audit — frankx.ai-vercel-website

**As of:** 2026-07-27
**Baseline:** `main` @ 93849c62 (all CI gates verified green locally: build-integrity, type-check, lint, ai-slop)
**Method:** every branch diffed against `main` with `public/reading/` excluded, then cross-referenced against its pull-request outcome. "Unlanded" = files the branch touched that still differ from `main` today.

**Protection pass:** 2026-08-30 — 24 branches verified present on the remote and confirmed to hold work that is not in `main`. They are listed under DO-NOT-DELETE below, which is authoritative over every tier table in this file.

Deletion is reversible until GitHub garbage-collects the ref (typically weeks). Revive with `git checkout origin/<branch>`.

## DO-NOT-DELETE — protected branches

**Added 2026-08-30. This section outranks every other list in this file, including Tier A.**

If you are an automated prune, a cleanup agent, or a human running a batch: read these four rules before you close or delete anything. They are not advisory.

1. **Never close a pull request or delete a branch on age alone.** A date filter cannot tell the difference between work that landed and work that was forgotten. Both look stale. Only one is safe to remove.
2. **Check whether the idea is in `main` first.** The test is per-file, not per-date: for every file the branch touched, is the branch's version already byte-identical to `main`'s? If any file still differs, the branch holds the only copy of that work and you may not delete it. `git cherry main <branch>` marking every commit `+` means nothing landed.
3. **A human KEEP comment is an absolute veto.** If Frank has commented KEEP, or anything meaning KEEP, on a pull request or a branch, that decision stands until Frank himself reverses it. No staleness rule, no batch job, and no agent overrides it. This rule exists because it was broken twice — PRs #243 and #473 both carried an explicit "KEEP. Unique work stays on this branch." and both were closed anyway.
4. **Every branch in the table below is off-limits.** Do not delete it, do not close its pull request, do not add it to `.github/cleanup-queue.txt`. If you believe one should go, say so and stop — the decision is Frank's.

A closed pull request is not permission to delete its branch. Closing is a review outcome; deleting destroys the work. The 40 PRs closed across this repo and `arcanea-ai-app` were closed on staleness, not on merit, and their branches still hold the only copy of what they proposed.

All 24 branches below were verified present on the remote on 2026-08-30. Unlanded counts exclude `public/reading/` and were measured per-file against `main`, not by date.

| Branch | PR | Last commit | Unlanded | Why it is protected |
|---|---|---|---|---|
| `agent/claude/checkout-revenue-fix` | 243 | 2026-08-14 | 4 | **Overridden KEEP.** Wires the $47 kit CTA to real Stripe checkout and removes fabricated claims. Revenue path; closed unmerged despite an explicit KEEP comment. |
| `agent/hermes/frankx-decision-instrument-20260812` | 473 | 2026-08-15 | 22 | **Overridden KEEP.** Decision-instrument hero for the production agentic article; closed unmerged despite an explicit KEEP comment. |
| `agent/antigravity/lead-funnels-v1` | — | 2026-08-05 | 671 | Lead-funnel system v1. The largest body of unlanded work in the repo and never opened as a pull request. |
| `agent/codex/ai-architect-guide-2026-preview` | — | 2026-08-27 | 4 | AI Architect Guide 2026 preview. Newest unlanded branch here; nothing of it is in `main`. |
| `agent/gemini/agency-swarm-brand-factory` | — | 2026-08-18 | 29 | Agency-swarm brand factory. Never proposed for review; 29 of 30 touched files still differ from `main`. |
| `agent/codex/frankx-earbuds-2026` | — | 2026-06-26 | 62 | FrankX earbuds 2026 product surface. Orphaned work, never opened as a pull request. |
| `codex/openai-devday-resource` | — | 2026-07-03 | 17 | OpenAI DevDay resource. Every touched file still differs from `main`. |
| `feat/map-v1-v2-v3-upgrades` | — | 2026-07-15 | 97 | Map v1/v2/v3 upgrades. Orphaned work; 97 files exist only here. |
| `claude/multi-agent-newsletter-system-anKSZ` | — | 2026-06-10 | see note | Multi-agent newsletter system. **Shares no merge base with `main`** — an unrelated history, so a merge-base diff reports 0 and looks empty. It is not empty. The work is real and entirely absent from `main`. Any tool that measures this branch by merge-base will misread it as safe. |
| `agent/hermes/salvage-media-guard-20260823` | 522 | 2026-08-24 | 9 | Media-guard hardening — content validation with base-controlled enforcement. Closed unmerged. |
| `agent/codex/human-mastery-patternos` | 484 | 2026-08-24 | 13 | Human Mastery PatternOS v0. Closed unmerged; flagged as a contract change, which is a reason to review it, not to discard it. |
| `agent/codex/frankx-agent-intelligence-20260804` | 420 | 2026-08-04 | 56 | Canonical agent registry and Frank Intelligence. Closed unmerged; the registry exists nowhere else. |
| `codex/best-ai-hardware` | 284 | 2026-07-15 | 42 | AI hardware intelligence hub. Closed unmerged. |
| `codex/frankx-constellation-elevation-20260722` | 352 | 2026-07-22 | 57 | FrankX constellation elevation. Closed unmerged. |
| `claude/ai-architecture-templates-65188c` | 210 | 2026-07-19 | 41 | `/ai-architecture` to 2026 SOTA — blueprints, BYOK suite, free templates. Closed unmerged. |
| `agent/codex/starlight-retreat-vision-20260714` | 276 | 2026-07-14 | 54 | Starlight Retreats founding vision. Closed unmerged. |
| `claude/premium-ops-ruxnO` | 202 | 2026-07-02 | 20 | Five doors framework, Strategic Advisor door, premium copy. Closed unmerged. |
| `codex/openai-mastery-hub-20260729` | 399 | 2026-07-29 | 19 | Role-based OpenAI mastery hub. Closed unmerged. |
| `claude/build-llm-research-hub-75ba8` | 166 | 2026-07-30 | 35 | Model Hub expansion — multimodal `/models`, LLM Arena, provenance. Closed unmerged. |
| `agent/hermes/accelerator-surface` | 321 | 2026-07-16 | 15 | Venture Fabric + Portfolio OS public constellation. Closed unmerged. |
| `agent/c940/research-hub-recommend-preserve-20260818` | — | 2026-08-17 | 6 | Was proposed for deletion. Re-verified: 6 of 22 touched files still differ from `main` and all 8 commits are `+` under `git cherry`. Not absorbed. |
| `agent/codex/vault-refresh-388` | — | 2026-07-28 | 4 | Was proposed for deletion. Re-verified: all 4 touched files still differ from `main`. Route-owned Vault identity plus three test gates. Not absorbed. |
| `agent/gemini/tallinn-reconciliation-main-prod` | — | 2026-07-15 | 17 | Was proposed for deletion. Re-verified: 17 of 61 touched files still differ from `main`. Not absorbed. |
| `agent/gemini/auctions-upgrade` | — | 2026-07-14 | 5 | Was proposed for deletion. Re-verified: 5 of 6 touched files still differ from `main`, including the whole `/auctions` route and its bid API. Not absorbed. |

Also still protected from earlier tiers, unchanged by this pass: `agent/witali-father-code` (family memorial, `/witali` + `/father-code`) and every `archive/*` snapshot in Tier C.

### Safe-to-delete re-verification, 2026-08-30

Four branches were put forward as safe to delete. **None of them are.** All four are in the protected table above.

| Candidate | Verdict | Evidence |
|---|---|---|
| `agent/c940/research-hub-recommend-preserve-20260818` | **Not safe** | 6/22 touched files differ from `main`; 8/8 commits `+` under `git cherry main` |
| `agent/codex/vault-refresh-388` | **Not safe** | 4/4 touched files differ from `main`; 4/4 commits `+` |
| `agent/gemini/tallinn-reconciliation-main-prod` | **Not safe** | 17/61 touched files differ from `main`; 5/5 commits `+` |
| `agent/gemini/auctions-upgrade` | **Not safe** | 5/6 touched files differ from `main`; 1/1 commit `+` |

`.github/cleanup-queue.txt` was left empty by this pass, and it should stay empty. Populating it is a deletion, and deletion is Frank's call.

## Why the old audit was replaced

The previous version of this file was dated 2026-06-01 and listed seven branches that no longer exist (`chore/normalize-line-endings-2026-05`, `feat/smart-404-routing`, `hotfix/mobile-nav-restore`, `feat/newsletter-launch-v1`, `claude/focused-gauss-IdjMf`, `feat/birthday-tribe-page`, `feat/acos-pillar-9-10-agents`). An audit that describes a repo state that no longer exists cannot gate deletions, so it was regenerated from scratch.

## One thing to know before merging anything old

`main` untracked `public/reading/` on 2026-07-26 (#349) — 17,880 files, ~508MB of recursive generator output. Every branch created before that date still carries those files at its tip.

**This does not block merging.** A three-way merge preserves `main`'s deletion, because the branches never modified those paths after the merge base. Verified by test-merging all 31 open PRs: **zero** of them stage a single `public/reading/` file. What it does mean is that `git diff main <branch>` reports a ~6.6M-line delta on almost every branch — that number is an artifact, not unlanded work, and should be ignored.

## Summary

| Tier | Meaning | Count | Action |
|---|---|---|---|
| A | Verified fully landed in `main` | 13 | Delete now — queued in `.github/cleanup-queue.txt` |
| B | PR was closed unmerged | 9 | Frank's call — work was deliberately declined |
| C | `archive/*` save-point snapshots | 14 | Frank's call — retention policy decision |
| D | Orphaned work, never opened as a PR | 14 | Needs triage — real work, at risk of being lost |
| E | Backs an open PR | 31 | Keep until the PR resolves |

## Tier A — safe to delete (queued)

Each row was proved individually: for every file the branch touched, the branch's version is byte-identical to `main`'s, or the branch's PR was merged and the only remaining difference is `main` moving forward afterwards.

| Branch | PR | Last commit | Unlanded | Proof |
|---|---|---|---|---|
| `codex/production-excellence-sweep-20260619` | — | 2026-06-19 | 0 | every touched file byte-identical to `main` |
| `codex/ana-ai-business-kit` | — | 2026-06-24 | 0 | every touched file byte-identical to `main` |
| `codex/jojo-hospitality-intelligence` | — | 2026-06-25 | 0 | every touched file byte-identical to `main` |
| `agent/claude/content-integrity-gate` | — | 2026-06-27 | 0 | every touched file byte-identical to `main` |
| `codex/property-work-showcase` | — | 2026-06-30 | 0 | every touched file byte-identical to `main` |
| `agent/claude/sonnet5-content-swarm` | — | 2026-07-01 | 0 | every touched file byte-identical to `main` |
| `codex/mvu-service-layer-clean-20260722` | — | 2026-07-22 | 0 | 2 touched files, both byte-identical to `main` |
| `observability/vercel-cost-2026-W25` | 181 | 2026-06-15 | 0 | PR #181 closed; its 1 file is byte-identical to `main` |
| `codex/frankx-home-overlay-hotfix-20260711` | 259 | 2026-07-11 | 0 | PR #259 **merged**; 0 residual delta |
| `codex/frankx-music-learning-canonical-v3-20260710` | 258 | 2026-07-11 | 0 | PR #258 **merged**; 0 residual delta |
| `codex/frankx-dnt-privacy-hotfix-20260711` | 260 | 2026-07-11 | 2 | PR #260 **merged**; residual delta is `main` moving on (main 2026-07-24 > branch 2026-07-11) |
| `codex/frankx-production-proof-2026-07-10` | 257 | 2026-07-11 | 12 | PR #257 **merged**; residual delta is `main` moving on (main 2026-07-22 > branch 2026-07-11) |
| `fix/footer` | — | 2026-06-27 | 1 | sole change is a `package-lock.json` resync; this PR deletes that file, so the branch is moot |

## Tier B — PR closed without merging (9)

Someone opened a PR for this work and then closed it. That is a decision, not an accident — but the branches still hold unlanded files, so they are listed rather than queued.

| Branch | PR | Last commit | Unlanded files |
|---|---|---|---|
| `claude/newsletter-doi-revival-ruxnO` | 169 | 2026-06-10 | 10 |
| `codex/remove-acos-agentdb` | 186 | 2026-06-18 | 2 |
| `claude/remove-personal-info-1DgLs` | 190 | 2026-06-22 | 44 |
| `claude/frankx-freemium-experience-hJuk4` | 204 | 2026-06-24 | 5 |
| `agent/claude/homepage-music-email-fixes` | 209 | 2026-06-28 | 23 |
| `claude/ecosystem-audit-strategy-7ovdli` | 196 | 2026-07-01 | 83 |
| `claude/fable-cover-v3-spiral` | 225 | 2026-07-04 | 2 |
| `agent/claude/remove-test-email-endpoint` | 218 | 2026-07-14 | 1 |
| `codex/frankx-v-template-studio` | 233 | 2026-07-14 | 92 |

## Tier C — `archive/*` snapshots (14)

Explicit save-points from April–June. `archive/recovery-*` and `archive/staging-madrid-*` are the large recovery snapshots the 2026-06-01 audit marked `KEEP_BACKUP`.

| Branch | PR | Last commit | Unlanded files |
|---|---|---|---|
| `archive/recovery-nested-2026-04-20` | — | 2026-04-14 | 664 |
| `archive/recovery-sibling-2026-04-20` | — | 2026-04-16 | 42 |
| `archive/rails-phase-0` | — | 2026-05-03 | 58 |
| `archive/normalize-line-endings-2026-W20` | — | 2026-05-11 | 1 |
| `archive/ikigai-upgrade-2-2026-W20` | — | 2026-05-14 | 5 |
| `archive/ikigai-upgrade-3-2026-W20` | — | 2026-05-14 | 5 |
| `archive/sync-prompt-hub-from-frankx` | — | 2026-05-16 | 14 |
| `archive/feat-newsletter-launch-v1` | — | 2026-05-19 | 12 |
| `archive/multi-agent-newsletter-system-anKSZ` | — | 2026-05-19 | 30 |
| `archive/staging-madrid-2026-05-25` | — | 2026-05-25 | 331 |
| `archive/claude-frankx-freemium-experience-hJuk4` | — | 2026-05-29 | 27 |
| `archive/normalize-line-endings-2026-05` | — | 2026-05-29 | 3 |
| `archive/observability-vercel-cost-2026-W21` | — | 2026-05-29 | 1 |
| `archive/claude-build-llm-research-hub-75ba8` | — | 2026-06-01 | 51 |

## Tier D — orphaned work, never opened as a PR (14)

This is the tier that actually loses work. Each branch holds committed changes that were never proposed for review and are not in `main`. Nothing here is queued for deletion.

| Branch | PR | Last commit | Unlanded files | Note |
|---|---|---|---|---|
| `claude/gifted-pasteur-9LsID` | — | 2026-06-10 | 64 |  |
| `claude/multi-agent-newsletter-system-anKSZ` | — | 2026-06-10 | 34 |  |
| `feat/ikigai-branding-workshop` | — | 2026-06-14 | 48 |  |
| `agent/worktree-sync` | — | 2026-06-18 | 1 | Only change strips 25 lines from `.gitignore` — inspect before reviving. |
| `agent/codex/frankx-earbuds-2026` | — | 2026-06-26 | 61 |  |
| `agent/codex/mind-page` | — | 2026-07-01 | 26 |  |
| `codex/openai-devday-resource` | — | 2026-07-03 | 17 |  |
| `agent/witali-father-code` | — | 2026-07-09 | 2 | **Family memorial** — adds `/witali` + `/father-code` (759 lines). Do not delete. |
| `agent/gemini/auctions-upgrade` | — | 2026-07-14 | 2 |  |
| `agent/gemini/tallinn-reconciliation-main-prod` | — | 2026-07-15 | 10 |  |
| `codex/blog` | — | 2026-07-15 | 35 |  |
| `codex/x` | — | 2026-07-15 | 94 |  |
| `feat/map-v1-v2-v3-upgrades` | — | 2026-07-15 | 94 |  |
| `agent/book/r1-cta` | — | 2026-07-16 | 3 | Primary nav + homepage CTA → gencreator.ai. |

## Tier E — open pull requests (31)

Merge-cleanliness was measured by actually test-merging each PR head into `main` @ 93849c62.

| PR | State | Head last commit | Merge | Title |
|---|---|---|---|---|
| #375 | draft | 2026-07-27 | clean | obs(vercel-cost): 2026-W31 snapshot — YELLOW |
| #374 | ready | 2026-07-27 | clean | Separate the journal from the blog |
| #373 | draft | 2026-07-27 | clean | feat(claude): install web-excellence pack — enforced gate  |
| #368 | ready | 2026-07-25 | clean | fix: preserve essential metadata identity |
| #356 | draft | 2026-07-23 | clean | feat(starlight): /starlight/gravity page + gravity-engine  |
| #355 | draft | 2026-07-26 | clean | docs(mvu): continue rolling Tallinn field intelligence |
| #352 | ready | 2026-07-22 | **conflicts** | Elevate the FrankX constellation without reducing its brea |
| #351 | draft | 2026-07-22 | **conflicts** | feat: productionize v0 template OS and Visual Foundry |
| #346 | draft | 2026-07-22 | **conflicts** | feat(music): add fail-closed Studio Ledger release gate |
| #344 | draft | 2026-07-21 | clean | feat(business): align portfolio around recurring value |
| #341 | draft | 2026-07-20 | clean | obs(vercel-cost): 2026-W30 snapshot — RED |
| #340 | draft | 2026-07-19 | clean | Campaign C1: /agentic-company — Starlight Intelligence Blu |
| #338 | draft | 2026-07-18 | clean | feat(v0): The Products + wave-2 intelligence (stacked on # |
| #337 | draft | 2026-07-17 | clean | feat(blog): Coherence Is an Engineering Property — Benevol |
| #336 | ready | 2026-07-18 | clean | feat(v0): /v0 Blueprint — best-of-v0 + FrankX blueprints + |
| #335 | draft | 2026-07-17 | clean | feat(blog): Magnifica Humanitas flagship upgrade — first p |
| #334 | draft | 2026-07-17 | clean | feat(challenge): harden First €100 Weekend |
| #326 | draft | 2026-07-16 | clean | feat(challenge): launch the First €100 Weekend |
| #321 | draft | 2026-07-16 | clean | feat(accelerator): Venture Fabric + Portfolio OS public co |
| #284 | ready | 2026-07-15 | **conflicts** | feat: launch AI hardware intelligence hub |
| #278 | ready | 2026-07-15 | **conflicts** | feat: launch public Tallinn session studio |
| #276 | draft | 2026-07-14 | **conflicts** | Starlight Retreats: founding vision experience |
| #271 | draft | 2026-07-12 | **conflicts** | feat: verified AI architecture deployment atlas |
| #266 | draft | 2026-07-13 | **conflicts** | feat(family): launch the governed Family Intelligence foun |
| #243 | draft | 2026-07-15 | clean | fix(revenue): wire $47 kit CTA to real Stripe checkout, re |
| #231 | draft | 2026-07-17 | clean | Hosted investment-intelligence council — Sonnet+Opus swarm |
| #221 | ready | 2026-07-03 | **conflicts** | Update website metadata and job title for Agentic Founder  |
| #210 | ready | 2026-07-19 | **conflicts** | Elevate /ai-architecture to 2026 SOTA: SOTA blueprints, li |
| #202 | ready | 2026-07-02 | **conflicts** | feat(premium): five doors framework + Strategic Advisor do |
| #168 | ready | 2026-06-10 | **conflicts** | fix(claims+voice): #107 standard on lab/build pages + voic |
| #166 | ready | 2026-07-17 | **conflicts** | Model Hub expansion: multimodal /models, LLM Arena, proven |

**18 merge clean. 13 conflict.** The conflicts cluster on a handful of shared files — `app/sitemap.ts`, `package.json`, `.gitignore`, `components/Navigation*.tsx`, `app/friends/ana/page.tsx` — which is the signature of several agents editing the same index files in parallel over the same weeks.

## Keeping this file true

Regenerate whenever branches are deleted or a batch of PRs lands. The three measurements that matter, in order: PR outcome per branch, unlanded-file count with `public/reading/` excluded, and a real test-merge for anything still open.
