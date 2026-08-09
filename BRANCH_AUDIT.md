# Branch Audit — frankx.ai-vercel-website

**Data gathered at:** `main` @ `3cc8d66cb`, 2026-08-09
**Scope:** 67 remote refs at that moment — `main` plus 66 branches. 29 branches back an open pull request; 37 are orphans.

**When this file goes stale.** This audit describes *branch* state, so only a change to branch state invalidates it — not every commit on `main`. Commits that touch workflows, docs or app code move `main` without moving a single ref, and re-pinning a baseline SHA after each one is churn that adds no information. The check that matters is:

```
git fetch origin --prune
git branch -r --list 'origin/*' | grep -v origin/HEAD | wc -l    # expect 66 + refs created since
```

If a ref in the tables below has disappeared, or an orphan has gained commits, regather. If the only difference is new branches and new `main` commits, the tiers still hold.

Verified under that rule twice since gathering: `ebc955073` (#448, `.github/cleanup-queue.txt` only, deleted zero branches — re-checked all 66 refs afterwards) and `cad386237` (#451, CI workflows and scripts only). Neither changed branch state.

Refs that changed after the snapshot and are therefore absent from the tables: `agent/claude/refresh-branch-audit` (this change), `agent/claude/frankx-four-hour-20260809` and its successor work; `agent/claude/clear-completed-cleanup-queue` was auto-deleted when #448 merged.

Deletion is reversible until GitHub garbage-collects the ref (typically weeks). Revive with `git checkout origin/<branch>`.

## Why the previous audit was replaced

The prior version was dated 2026-07-27 against `main` @ `93849c62`. Since then main advanced by 61 commits, 56 of them pull-request merges; the 16-ref Tier A batch was queued and executed as #425; and a further six refs were deleted by hand. Its counts (13 / 9 / 14 / 14 / 31) no longer describe any repo state that exists.

That file opened by arguing that *"an audit that describes a repo state that no longer exists cannot gate deletions."* The same standard applied to itself is why it was regenerated rather than patched.

## Method — what counts as proof

Squash merges are the reason this cannot be done with `git branch --merged`. A squash rewrites the commit and breaks ancestry while preserving the tree, so `--merged` reports 1 of 66 branches here. Three mechanical proofs are used instead, in descending strength:

- **(A) Tree present in main's history** — the branch tip's tree hash appears verbatim somewhere in main's own history, so main once contained exactly this content:
  `git log --format=%T origin/main | grep -x $(git rev-parse origin/<b>^{tree})`
- **(B) Contained in a live branch** — `git merge-base --is-ancestor origin/<b> origin/<survivor>`, with the survivor named.
- **(C) Exact duplicate** — two refs at the identical tip commit.

Anything not carrying one of these three proofs is treated as unlanded, regardless of how old or abandoned it looks.

### One trap worth naming

**A merge conflict is not evidence that work is unlanded.** 36 of the 37 orphans now conflict with main. That is a consequence of main moving, not a statement about their content — a squash-merged branch whose files main later edited will conflict just as loudly as one that never landed. Conflict status is recorded below because it tells you the *cost of recovering* a branch. It is never used here as a landing proof.

## Summary

| Tier | Meaning | Count | Action |
|---|---|---|---|
| A | Content proven present in main's history | 1 | Safe to delete — but see the hold below |
| B | Strictly contained in another live branch | 1 | Safe to delete — but see the hold below |
| C | Exact-duplicate pair, one name should survive | 2 refs | Pick a survivor, delete the other |
| D | Orphan whose pull request was closed | 5 | Frank's call — reviewed once already |
| E | Orphan that never had a pull request | 32 | Highest risk — nobody has ever reviewed this |
| F | Backs an open pull request | 29 | Keep until the pull request resolves |

Tiers A, B, C and D are subsets of the 37 orphans; F is disjoint from all of them.

## Tier A — content proven in main's history

| Branch | Proof |
|---|---|
| `archive/rails-phase-0` | tip tree `114e4a38` appears in main at commit `9cc6748af` |

**Held by Frank.** He reported the proof did not reproduce for him. It does reproduce against the current remote, and the likely explanation is that the earlier `--contains` method cannot see squash merges and was scoped to non-archive refs. The proof is recorded; the hold stands. Do not queue this without asking him.

## Tier B — contained in a live branch

| Branch | Contained in | Survivor carries |
|---|---|---|
| `archive/ikigai-upgrade-2-2026-W20` | `archive/ikigai-upgrade-3-2026-W20` | +1 commit |

**Held by Frank**, same conversation as Tier A. Same standing instruction: do not queue.

Three further containment relations exist but the contained branch has an **open pull request**, so they stay regardless:

- `agent/claude/v0-blueprint` ⊂ `agent/claude/v0-products` (#336 is deliberately stacked under #338)
- `agent/codex/tallinn-tribe-studio-20260714` ⊂ `agent/antigravity/lead-funnels-v1`, `agent/gemini/tallinn-reconciliation-main-prod`, `codex/best-ai-hardware` (#278)
- `codex/best-ai-hardware` ⊂ `agent/antigravity/lead-funnels-v1` (#284)

## Tier C — exact duplicate

`codex/x` and `feat/map-v1-v2-v3-upgrades` point at the identical tip commit `bc21b3f78`, pushed at the same second on 2026-07-15. 18 commits, 132 files.

**Recommendation: keep `feat/map-v1-v2-v3-upgrades`, delete `codex/x`.** The tip commit's own subject is `feat(map): implement dynamic selection hub and specialized v1/v2/v3 visual consoles`, which the surviving name describes and `x` does not. A previous version of this audit said nothing distinguished them; that was an oversight — the commit subject does.

## Tier D — orphan whose pull request was closed

These were opened for review at least once and are no longer open. Whether each was merged-then-superseded or declined outright is **not** recorded here: the GitHub list API returned an unpopulated `merged` field for every closed pull request in this repo, so that distinction was not mechanically verifiable and has not been guessed.

| Branch | Closed PR | Unique commits | Files vs main |
|---|---|---|---|
| `agent/c940/r1-primary-cta-20260803` | #419 | 2 | 3 |
| `agent/book/r1-cta` | #384 | 1 | 3 |
| `agent/claude/lint-config-and-audit-refresh` | #395 | 4 | 3 |
| `agent/codex/mvu-day8-unhooking` | #377 | 3 | 15 |
| `blog-structure-and-content` | #221 | 3 | 12 |

## Tier E — orphan that never had a pull request

32 branches carrying commits main does not have, that no pull request has ever covered. This is where work actually gets lost. Ordered by size.

| Branch | Unique commits | Files vs main | Note |
|---|---|---|---|
| `archive/recovery-nested-2026-04-20` | 169 | 1021 | largest orphan; blog + mascot + scripts |
| `archive/rails-phase-0` | 58 | 58 | also Tier A — content is in main |
| `codex/x` | 18 | 132 | also Tier C — duplicate |
| `feat/map-v1-v2-v3-upgrades` | 18 | 132 | also Tier C — recommended survivor |
| `feat/ikigai-branding-workshop` | 16 | 71 | |
| `archive/staging-madrid-2026-05-25` | 15 | 796 | blog + image-ingest pipeline |
| `agent/antigravity/lead-funnels-v1` | 15 | 717 | carries `.agents/skills/vercel-optimize/` |
| `archive/claude-frankx-freemium-experience-hJuk4` | 8 | 27 | |
| `archive/sync-prompt-hub-from-frankx` | 7 | 35 | partnerships + work components |
| `agent/gemini/tallinn-reconciliation-main-prod` | 7 | 61 | |
| `claude/ecosystem-audit-strategy-7ovdli` | 6 | 202 | mostly `new-landing-page-backup/` |
| `archive/claude-build-llm-research-hub-75ba8` | 5 | 63 | |
| `claude/remove-personal-info-1DgLs` | 4 | 1486 | largest file delta of any orphan |
| `claude/multi-agent-newsletter-system-anKSZ` | 4 | 34 | |
| `agent/codex/vault-refresh-388` | 4 | 4 | |
| `archive/observability-vercel-cost-2026-W21` | 3 | 3 | |
| `agent/claude/remove-test-email-endpoint` | 3 | 3 | **superseded** — see below |
| `claude/newsletter-doi-revival-ruxnO` | 2 | 10 | |
| `claude/gifted-pasteur-9LsID` | 2 | 64 | |
| `claude/frankx-freemium-experience-hJuk4` | 2 | 6 | |
| `archive/ikigai-upgrade-3-2026-W20` | 2 | 11 | survivor of the Tier B pair |
| `agent/codex/frankx-earbuds-2026` | 2 | 486 | |
| `agent/claude/homepage-music-email-fixes` | 2 | 44 | |
| `archive/ikigai-upgrade-2-2026-W20` | 1 | 10 | also Tier B |
| `codex/remove-acos-agentdb` | 1 | 3 | |
| `codex/openai-devday-resource` | 1 | 17 | |
| `claude/fable-cover-v3-spiral` | 1 | 2 | **the only orphan that still merges clean** |
| `archive/normalize-line-endings-2026-W20` | 1 | 5 | |
| `archive/normalize-line-endings-2026-05` | 1 | 52 | |
| `archive/feat-newsletter-launch-v1` | 1 | 12 | |
| `agent/worktree-sync` | 1 | 1 | `.gitignore` only |
| `agent/gemini/auctions-upgrade` | 1 | 6 | |

### `agent/claude/remove-test-email-endpoint` is superseded

Its three commits gate `/api/test-email` behind a shared secret. Main already ships that route as an unconditional 404 on both `GET` and `POST` (`app/api/test-email/route.ts`), which is strictly stronger. Nothing is lost by dropping this branch. It is listed in Tier E rather than Tier A because the *content* is not in main — the outcome is simply better there.

## Tier F — backs an open pull request

29 branches. Keep every one until its pull request merges or closes. The list is not duplicated here because it goes stale the moment a pull request resolves; read it live:

```
gh pr list --state open --json number,headRefName
```

## Recovery cost

Only `claude/fable-cover-v3-spiral` (2 files) still merges clean against main. Every other orphan needs a real rebase, so "open a pull request to rescue it" is no longer a cheap operation for any of them. Verified with `git merge-tree --write-tree origin/main origin/<b>` against `3cc8d66cb`.

## How to act on this

1. Put verified names in `.github/cleanup-queue.txt` in a pull request — **replace** the contents, never append to a previous batch.
2. Merge it. The Branch Cleanup workflow deletes exactly those refs.
3. Clear the queue in a follow-up pull request. Main is PR-protected, so the workflow cannot push that commit itself.

Skipping step 3 is what left a completed 16-ref batch sitting on main reading as pending; that is the failure mode the "replace, do not append" rule exists to prevent.
