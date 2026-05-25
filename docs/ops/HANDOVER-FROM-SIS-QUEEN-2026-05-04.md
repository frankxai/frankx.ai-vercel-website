---
name: SIS Queen → frankx.ai-vercel-website handover
description: Tier 4 + 5b of SIS Sprint 2026-W19 — ship "No Bad Parts" research drop (501 dirty files) + worktree consolidation across 6 FrankX-site clones
type: handover-from-queen
date: 2026-05-04
sprint: 2026-W19
queen: SIS-tab
target-tab: site-tab
priority: P2 (501 dirty files, active feature branch)
---

# Handover — SIS Queen → frankx.ai-vercel-website

You are the site-tab. SIS-tab is queen.

---

## TL;DR

Branch `feat/ikigai-branding-workshop` has **501 dirty files** as of 2026-05-04. HEAD `d8fbdf40` is "feat(research): 'No Bad Parts: Sovereign AI' flagship + 5 domains" (today). Need to (a) categorize 501 dirty files and ship the research drop, (b) reconcile across 6 FrankX-site worktrees that all clone the same remote.

---

## Specific actions

### Action 1 — Inspect the 501 dirty files
```bash
cd C:/Users/frank/frankx.ai-vercel-website
git status --short | head -100
git status --short | wc -l   # confirm 501
```

Bucketize:
- Generated artifacts (`.next/`, `dist/`, `node_modules/` — gitignore)
- Research content (markdown, MDX — likely the "No Bad Parts" drop)
- Code changes
- Config drift

Likely most are research-content from the flagship drop. Confirm.

### Action 2 — Ship "No Bad Parts: Sovereign AI" flagship + 5 domains
After bucketization, commit research content with descriptive messages. Frank shipped the commit `d8fbdf40` on `feat/ikigai-branding-workshop`; the 501 dirty are likely the asset payload not yet staged.

Suggested commit groups:
1. Research markdown (the 5 domains)
2. Cover assets / OG images
3. Routing additions
4. Anything stale that should be discarded

Then push the branch and open PR to main:
```bash
gh pr create --title "feat(research): No Bad Parts — Sovereign AI flagship + 5 domains" \
  --body "Flagship long-form research drop. Ikigai branding workshop arc. Closes the feat/ikigai-branding-workshop thread."
```

### Action 3 — Worktree consolidation (Tier 5b)

Six FrankX-site clones exist at:
- `C:\Users\frank\frankx.ai-vercel-website` (this one — main repo)
- `C:\Users\frank\frankx-prod-sync` (branch: main — sync clone)
- `C:\Users\frank\frankx-prod-deploy` (branch: feat/library-depth-wave3)
- `C:\Users\frank\frankx-prod-libos3` (branch: library/os-v3 — **-144 behind**)
- `C:\Users\frank\frankx-fix-ci` (branch: ci/fix-type-errors-2026-04-25)
- `C:\Users\frank\frankx-ship-gai` (branch: main — **21,797 dirty files** — looks abandoned/broken)
- `C:\Users\frank\ship-hoffnung` (branch: ship/hoffnung-2026-04-21)

For each: decide keep / archive / delete. Specifically:
- `frankx-ship-gai` — the 21k dirty files almost certainly mean it's broken; recommend archive after recovering anything unique
- `frankx-prod-libos3` — 144 behind main on a feature branch; recommend rebase or archive

Document the consolidation decision at `docs/ops/WORKTREE-CONSOLIDATION-2026-05-04.md`.

### Action 4 — Vercel deploy verification

Per `feedback_vercel_manual.md` memory: site auto-deploy from GitHub broken since 2026-04-10; ship via `vercel --prod` from `site/` directory. After research drop merges to main, run:
```bash
cd site
vercel --prod
```
Verify production reflects HEAD.

---

## Cross-repo dependencies

### What site-tab is blocked on:
- Nothing critical (independent workstream)

### What site-tab blocks:
- FrankX-tab (Tier 4) might integrate pricing changes that affect this site's pricing pages — coordinate via cross-repo distribution packet at SIS (`docs/cross-repo-distributions/2026-05-03-frankx-pricing-and-sprint-landings.md`)

---

## Return-handover protocol

Write `docs/ops/HANDOVER-TO-SIS-QUEEN-<date>.md` with: commit summary, PR URL, worktree consolidation outcome, deploy verification status.

---

## Suggested kickoff prompt

> Read `docs/ops/HANDOVER-FROM-SIS-QUEEN-2026-05-04.md` and execute Tier 4 + 5b of SIS Sprint 2026-W19 — ship the "No Bad Parts: Sovereign AI" research drop (501 dirty files on feat/ikigai-branding-workshop) and reconcile the 6 FrankX-site worktrees. Use `vercel --prod` for deploy (auto-deploy is broken per memory). Return status to `docs/ops/HANDOVER-TO-SIS-QUEEN-<date>.md`. You are the site-tab; SIS-tab is queen.

---

*Built on SIP — handover packet · 2026-05-04*
