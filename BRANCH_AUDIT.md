# Branch Audit — frankx.ai-vercel-website

**Data gathered at:** `main` @ `cad386237`, 2026-08-09 (regathered from live remote)
**Scope:** 66 remote refs — `main` plus 65 branches. 30 branches back an open pull request; 35 are orphans.

**When this file goes stale.** This audit describes *branch* state, so only a change to branch state invalidates it — not every commit on `main`. Commits that touch workflows, docs or app code move `main` without moving a single ref, and re-pinning a baseline SHA after each one is churn that adds no information. The check that matters is:

```
git fetch origin --prune
git branch -r --list 'origin/*' | grep -v origin/HEAD | wc -l    # expect 66 + refs created since
```

If a ref named in the tables below has disappeared, or an orphan has gained commits, regather. If the only difference is new branches and new `main` commits, the tiers still hold.

That condition has fired once and this file is the result: `codex/x` and `agent/claude/remove-test-email-endpoint` were pruned from the remote, both named in the previous tables, so every count here was recollected from scratch rather than adjusted.

Deletion is reversible until GitHub garbage-collects the ref (typically weeks). Revive with `git checkout origin/<branch>`.

## Method — what counts as proof

Squash merges are the reason this cannot be done with `git branch --merged`. A squash rewrites the commit and breaks ancestry while preserving the tree, so `--merged` reports 1 of 65 branches here. Three mechanical proofs are used instead, in descending strength:

- **(A) Tree present in main's history** — the branch tip's tree hash appears verbatim somewhere in main's own history, so main once contained exactly this content:
  `git log --format=%T origin/main | grep -x $(git rev-parse origin/<b>^{tree})`
- **(B) Contained in a live branch** — `git merge-base --is-ancestor origin/<b> origin/<survivor>`, with the survivor named.
- **(C) Exact duplicate** — two refs at the identical tip commit.

Anything not carrying one of these three proofs is treated as unlanded, regardless of how old or abandoned it looks.

### One trap worth naming

**A merge conflict is not evidence that work is unlanded.** 34 of the 35 orphans conflict with main. That is a consequence of main moving, not a statement about their content — a squash-merged branch whose files main later edited conflicts just as loudly as one that never landed. Conflict status is recorded below because it tells you the *cost of recovering* a branch. It is never used here as a landing proof.

## Summary

| Tier | Meaning | Count | Action |
|---|---|---|---|
| A | Content proven present in main's history | 1 | Safe to delete — but see the hold below |
| B | Strictly contained in another live branch | 1 | Safe to delete — but see the hold below |
| C | Exact-duplicate pair | 0 | Resolved since the last audit |
| D | Orphan whose pull request was closed | 5 | Frank's call — reviewed once already |
| E | Orphan that never had a pull request | 30 | Highest risk — nobody has ever reviewed this |
| F | Backs an open pull request | 30 | Keep until the pull request resolves |

Tiers A, B and D are subsets of the 35 orphans; F is disjoint from all of them. No branch is an ancestor of `main`.

## What changed since the previous gather

Two refs named in the old tables no longer exist, and both had been flagged here for exactly the reason they were removed:

| Ref | Was | Now |
|---|---|---|
| `codex/x` | Tier C, recommended for deletion in favour of `feat/map-v1-v2-v3-upgrades` | deleted; the descriptive name survives |
| `agent/claude/remove-test-email-endpoint` | Tier E, flagged superseded — main already returns an unconditional 404 for `/api/test-email` | deleted; main still 404s that route |

Tier C is consequently empty: no two refs in this repo now share a tip commit.

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

Empty. The previous pair (`codex/x` ≡ `feat/map-v1-v2-v3-upgrades`, identical tip `bc21b3f78`) was resolved by deleting `codex/x`; `feat/map-v1-v2-v3-upgrades` still carries the 18 commits and appears in Tier E below.

## Tier D — orphan whose pull request was closed

These were opened for review at least once and are no longer open. Whether each was merged-then-superseded or declined outright is **not** recorded here: the GitHub list API returns an unpopulated `merged` field for every closed pull request in this repo — it reports `false` for #445, #425 and #383, all demonstrably in main's history — so that distinction was not mechanically verifiable and has not been guessed.

| Branch | Closed PR | Unique commits | Files vs main |
|---|---|---|---|
| `agent/claude/lint-config-and-audit-refresh` | #395 | 4 | 3 |
| `agent/codex/mvu-day8-unhooking` | #377 | 3 | 15 |
| `blog-structure-and-content` | #221 | 3 | 12 |
| `agent/c940/r1-primary-cta-20260803` | #419 | 2 | 3 |
| `agent/book/r1-cta` | #384 | 1 | 3 |

## Tier E — orphan that never had a pull request

30 branches carrying commits main does not have, that no pull request has ever covered. This is where work actually gets lost. Ordered by unique-commit count.

| Branch | Unique commits | Files vs main | Note |
|---|---|---|---|
| `archive/recovery-nested-2026-04-20` | 169 | 1021 | largest orphan; blog + mascot + scripts |
| `archive/rails-phase-0` | 58 | 58 | also Tier A — content is in main |
| `feat/map-v1-v2-v3-upgrades` | 18 | 132 | survivor of the former duplicate pair; `codex/x` deleted |
| `feat/ikigai-branding-workshop` | 16 | 71 | |
| `archive/staging-madrid-2026-05-25` | 15 | 796 | blog + image-ingest pipeline |
| `agent/antigravity/lead-funnels-v1` | 15 | 717 | carries `.agents/skills/vercel-optimize/` |
| `archive/claude-frankx-freemium-experience-hJuk4` | 8 | 27 | |
| `agent/gemini/tallinn-reconciliation-main-prod` | 7 | 61 | |
| `archive/sync-prompt-hub-from-frankx` | 7 | 35 | partnerships + work components |
| `claude/ecosystem-audit-strategy-7ovdli` | 6 | 202 | mostly `new-landing-page-backup/` |
| `archive/claude-build-llm-research-hub-75ba8` | 5 | 63 | |
| `claude/remove-personal-info-1DgLs` | 4 | 1486 | largest file delta of any orphan |
| `claude/multi-agent-newsletter-system-anKSZ` | 4 | 34 | |
| `agent/codex/vault-refresh-388` | 4 | 4 | |
| `archive/observability-vercel-cost-2026-W21` | 3 | 3 | |
| `agent/codex/frankx-earbuds-2026` | 2 | 486 | |
| `claude/gifted-pasteur-9LsID` | 2 | 64 | |
| `agent/claude/homepage-music-email-fixes` | 2 | 44 | |
| `archive/ikigai-upgrade-3-2026-W20` | 2 | 11 | survivor of the Tier B pair |
| `claude/newsletter-doi-revival-ruxnO` | 2 | 10 | |
| `claude/frankx-freemium-experience-hJuk4` | 2 | 6 | |
| `archive/normalize-line-endings-2026-05` | 1 | 52 | |
| `codex/openai-devday-resource` | 1 | 17 | |
| `archive/feat-newsletter-launch-v1` | 1 | 12 | |
| `archive/ikigai-upgrade-2-2026-W20` | 1 | 10 | also Tier B |
| `agent/gemini/auctions-upgrade` | 1 | 6 | |
| `archive/normalize-line-endings-2026-W20` | 1 | 5 | |
| `codex/remove-acos-agentdb` | 1 | 3 | |
| `claude/fable-cover-v3-spiral` | 1 | 2 | **the only orphan that still merges clean** |
| `agent/worktree-sync` | 1 | 1 | `.gitignore` only |

## Tier F — backs an open pull request

30 branches. Keep every one until its pull request merges or closes. The list is not duplicated here because it goes stale the moment a pull request resolves; read it live:

```
gh pr list --state open --json number,headRefName
```

## Recovery cost

Only `claude/fable-cover-v3-spiral` (2 files) still merges clean against main. Every other orphan needs a real rebase, so "open a pull request to rescue it" is no longer a cheap operation for any of them. Verified with `git merge-tree --write-tree origin/main origin/<b>` against `cad386237`.

## How to act on this

1. Put verified names in `.github/cleanup-queue.txt` in a pull request — **replace** the contents, never append to a previous batch.
2. Merge it. The Branch Cleanup workflow deletes exactly those refs.
3. Clear the queue in a follow-up pull request. Main is PR-protected, so the workflow cannot push that commit itself.

Skipping step 3 is what left a completed 16-ref batch sitting on main reading as pending; that is the failure mode the "replace, do not append" rule exists to prevent.
