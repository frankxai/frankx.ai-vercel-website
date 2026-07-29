# Branch Audit — frankx.ai-vercel-website

**As of:** 2026-07-29
**Baseline:** `main` @ 12850052e
**Before this change:** 70 branches · **After it merges:** 59, in three legible classes

## Method — and the two ways this measurement goes wrong

Two naive metrics both give the wrong answer on this repo, so neither is used here.

**`git diff main...branch` is wrong after a squash merge.** Three-dot diff measures from the merge base, and a squash merge creates a commit on `main` that is not in the branch's ancestry. `agent/codex/vault-refresh-388` reports "4 unlanded files" by that metric even though PR #388 merged its content verbatim — the merge base simply never moved. Both vault-refresh branches are fully landed.

**Raw file counts are inflated by `public/reading/`.** `main` untracked that directory on 2026-07-26 (#349) — 17,880 files, ~508MB of recursive generator output. Every branch created before that date still carries them, so a plain diff reports a ~6.6M-line delta on almost every branch. That is an artifact, not unlanded work. A three-way merge preserves `main`'s deletion, verified by test-merging every branch: **zero** stage a `public/reading/` file.

**What is used instead:** `git merge-tree --write-tree main <branch>`, comparing the resulting tree to `main`'s tree. If they match, the branch contributes nothing new. If the merge exits non-zero, the branch conflicts. This is a real merge, not a diff.

## What this change does

Every branch now falls into exactly one of three classes, so nobody has to guess again whether a branch is alive:

| Class | Count after | Meaning |
|---|---|---|
| Backs an open PR | 30 | In flight — leave alone until the PR resolves |
| `archive/*` | 26 | Inert by construction. Nothing outside this namespace is a save-point |
| Active development | 3 | Branches with commits from the last 48 hours |

24 branches are queued for deletion in `.github/cleanup-queue.txt`. Nothing is deleted without a recovery path, and every path is named below.

## Why `archive/*` branches and not tags

Tags are the textbook answer, and the repo already has two (`archive/pr-273-…`, `archive/pr-274-…`). They were not used here for a mechanical reason worth recording: **pushing a tag ref returns HTTP 403 through the agent proxy** on an agent session, while branch refs push normally. Deleting a branch ref is likewise 403-blocked, which is why the queue-driven `Branch Cleanup` workflow exists — it runs inside Actions with `contents: write`.

So the archive namespace is a branch namespace. If you want to collapse it to tags with your own credentials, this does it in one pass:

```sh
git fetch origin --prune
for b in $(git branch -r --format='%(refname:short)' | grep '^origin/archive/'); do
  n=${b#origin/}
  git tag -a "${n/archive\//archive-}" "$b" -m "Archived branch $n"
done
git push origin --tags
# then queue the archive/* branch names for deletion in a follow-up PR
```

## Queued for deletion (24)

### Fully landed — content is already on `main` (2)

| Branch | PR | Proof |
|---|---|---|
| `agent/codex/vault-refresh-388` | 388 | merge-tree result == `main` tree |
| `agent/codex/vault-refresh-388-v2` | 388 | merge-tree result == `main` tree; superseded duplicate |

### PR closed unmerged (9)

Someone opened a PR and closed it. That is a decision already made. GitHub retains the head commit on the PR page indefinitely — **"Restore branch" on the PR recovers each of these**, so no separate archive ref is needed.

| Branch | PR | Last commit | Unlanded files |
|---|---|---|---|
| `agent/claude/homepage-music-email-fixes` | 209 | 2026-06-28 | 44 |
| `agent/claude/remove-test-email-endpoint` | 218 | 2026-07-14 | 3 |
| `claude/ecosystem-audit-strategy-7ovdli` | 196 | 2026-07-01 | 202 |
| `claude/frankx-freemium-experience-hJuk4` | 204 | 2026-06-24 | 6 |
| `claude/newsletter-doi-revival-ruxnO` | 169 | 2026-06-10 | 10 |
| `claude/remove-personal-info-1DgLs` | 190 | 2026-06-22 | 48 |
| `codex/frankx-v-template-studio` | 233 | 2026-07-14 | 111 |
| `codex/remove-acos-agentdb` | 186 | 2026-06-18 | 3 |
| `observability/vercel-cost-2026-W31` | 375 | 2026-07-27 | 1 |

### Orphans with no PR — copied to `archive/*` first (12)

These are the branches that actually lose work: committed changes never proposed for review and not on `main`. Each was pushed to an `archive/*` ref at a **byte-identical tip** before being queued, and each pair was verified equal by SHA.

| Deleted branch | Recovery ref | Last commit | Unlanded files |
|---|---|---|---|
| `agent/codex/frankx-earbuds-2026` | `archive/agent-codex-frankx-earbuds-2026-2026-06-26` | 2026-06-26 | 64 |
| `agent/gemini/auctions-upgrade` | `archive/agent-gemini-auctions-upgrade-2026-07-14` | 2026-07-14 | 6 |
| `agent/gemini/tallinn-reconciliation-main-prod` | `archive/agent-gemini-tallinn-reconciliation-main-prod-2026-07-15` | 2026-07-15 | 61 |
| `agent/worktree-sync` | `archive/agent-worktree-sync-2026-06-18` | 2026-06-18 | 1 |
| `claude/fable-cover-v3-spiral` | `archive/claude-fable-cover-v3-spiral-2026-07-04` | 2026-07-04 | 2 |
| `claude/gifted-pasteur-9LsID` | `archive/claude-gifted-pasteur-9LsID-2026-06-10` | 2026-06-10 | 64 |
| `claude/multi-agent-newsletter-system-anKSZ` | `archive/claude-multi-agent-newsletter-system-anKSZ-2026-06-10` | 2026-06-10 | 34 |
| `codex/blog` | `archive/codex-blog-2026-07-15` | 2026-07-15 | 87 |
| `codex/openai-devday-resource` | `archive/codex-openai-devday-resource-2026-07-03` | 2026-07-03 | 17 |
| `codex/x` | `archive/codex-x-2026-07-15` | 2026-07-15 | 120 |
| `feat/ikigai-branding-workshop` | `archive/feat-ikigai-branding-workshop-2026-06-14` | 2026-06-14 | 71 |
| `feat/map-v1-v2-v3-upgrades` | `archive/feat-map-v1-v2-v3-upgrades-2026-07-15` | 2026-07-15 | 120 |

Recover any of them with `git checkout -b <original-name> origin/<recovery-ref>`.

Two are worth a look before they age further: `agent/worktree-sync`'s only change strips 25 lines from `.gitignore` (inspect before reviving), and `feat/map-v1-v2-v3-upgrades` / `codex/x` carry 120 files each.

### Housekeeping (1)

`probe-archive-test` — a throwaway ref created to determine which ref types this session may push. Branch deletion is 403-blocked outside the cleanup workflow, so it has to leave through the queue like everything else.

## Not deleted, and why

**`agent/witali-father-code` is excluded from every sweep.** It carries the family memorial hub (`/witali`, `/father-code`) and now backs PR #382. Do not queue it.

**The 14 pre-existing `archive/*` save-points stay.** They are deliberate April–June recovery snapshots and they are already in the archive namespace doing their job. Deleting a backup to tidy a list is the wrong trade, and without tag-push permission there is nowhere safer to put them.

**Two branches from 2026-07-29 stay** — `codex/mvu-source-recovery-20260729` and `codex/openai-mastery-hub-20260729` are active work, not backlog.

## The open-PR backlog

30 PRs are open. **13 of them conflict with `main`** and cannot land without a rebase; 17 merge clean. Counting which files actually conflict across the backlog:

| File | Conflicts in | Nature |
|---|---|---|
| `data/route-index.json` | 13 | **Generated** — rebuilt by `scripts/build-route-index.mjs` in `prebuild`, on every build including Vercel's |
| `data/vault-manifest.json` | 11 | **Generated** by `pnpm vault:scan` (hand-triggered) |
| `package.json` | 11 | Genuine |
| `next.config.mjs` | 8 | Genuine |
| `components/NavigationMega.tsx` | 8 | Genuine |
| `.gitignore` | 8 | Genuine |
| `package-lock.json` | 7 | Resolved — deleted from `main` in #378 |

The single largest conflict source is a file no human edits.

**It cannot simply be untracked.** Four TypeScript modules import it statically — `lib/fuzzy-route-match.ts`, `lib/site-search.ts`, `lib/blog.ts`, and both `app/api/404/*` routes — and CI runs `type-check` *before* `build`, so `prebuild` has not run yet at that point. Removing it from version control would break CI on a fresh checkout. Committing it is correct given that import shape.

What that leaves is a resolution recipe. **When `data/route-index.json` or `data/blog-hero-manifest.json` conflicts, do not hand-merge it:**

```sh
git checkout --ours data/route-index.json data/blog-hero-manifest.json
pnpm routes:build
git add data/route-index.json data/blog-hero-manifest.json
```

The generator is deterministic and enumerates from `app/`, so the regenerated file is correct for the merged tree by construction — which a hand-resolved union of two stale copies is not. Making this cheaper (generating into a gitignored path and importing through a committed shim) is a separate structural change with real risk to `type-check`.

`data/blog-hero-manifest.json`'s committed copy is currently stale by two entries relative to what `prebuild` produces. Harmless in production — every deploy regenerates it — but it is drift, and it is what the recipe above prevents.

`app/sitemap.ts` auto-merges in 15 branches. It is the most-touched shared file but not, in fact, a conflict source.

## Keeping this file true

Branch auto-delete on merge is **on** — verified against the seven most recently merged PRs, all of whose branches are gone. This backlog was legacy, not ongoing accumulation.

The rule that keeps it from coming back: **a branch either backs an open PR, lives under `archive/`, or has a commit from the last few days.** Anything else is backlog, and it should be queued.

Regenerate after any batch of merges. The measurement that matters is `git merge-tree --write-tree main <branch>`: tree equal to `main` means safe to delete, non-zero exit means it needs a rebase before it can land. Do not substitute a `git diff` for it.
