# Handover — 2026-09-26

## Read this first

The 2026-09-22 handover (`HANDOVER_2026-09-22_tools-production-status.md`, same directory) said the `/tools` rebuild had shipped and was stable in production. That conclusion was correct but arrived at the wrong way — this session re-verified it from git and GitHub directly rather than trusting the prior summary, and found the prior summary had also drifted on a more consequential point: **the branch this work was done on is now obsolete, and continuing to develop on it is the wrong move.**

Everything below was verified against live git state and the GitHub API on 2026-09-26, not carried over from memory.

---

## Copy-paste prompt for the next session

```
You're picking up work on frankxai/frankx.ai-vercel-website (production repo —
Vercel deploys `main` on every push, no separate deploy step).

READ FIRST: AGENTS.md (repo identity + branch/PR protocol), then CLAUDE.md
(Claude-specific gates). Branch convention is `agent/<harness>/<scope>` — e.g.
`agent/claude/homepage-contract-split`. Never push to main directly.

Required gates before marking any PR ready: `pnpm run type-check`, `pnpm run
lint`, `pnpm run ai-slop:audit:strict`, `pnpm run build`. Run `pnpm run
merge:gate` before readying anything substantial. Any UI/visual change goes
through the `web-release-gate` skill FIRST — it sequences web-design-guidelines,
core-web-vitals, and visual-proof, and defines what evidence "done" requires.
Before any content/brand-facing publish, run the `integrity-guard` check.

Do NOT start from branch `claude/tools-resources-page-structure-4qwaw5` — it
shipped its payload (PR #596, merged 2026-09-01) and has since drifted ~448
files / ~41,000 lines behind main. Cut a fresh `agent/claude/<scope>` branch
from current `main` for each task below.

Verified priority queue, in order:

1. **Triage PR #681** (`observability/vercel-cost-2026-W37`, "unified admin
   analytics dashboard, GSC/GA4 API engine"). It is 16 days stale and, per
   `git ls-tree origin/main`, main ALREADY has `app/admin/analytics/`,
   `AnalyticsDashboardClient.tsx`, and `app/api/admin/observability/*` — the
   dashboard this PR proposes appears to already be live, shipped through a
   different path. Diff PR #681's branch against current main for these exact
   paths. If it's redundant, close it as superseded with a one-line comment
   naming what already shipped. If it has a genuine delta, extract just that
   delta into a small new PR — don't merge the whole 16-day-stale branch as is.

2. **PR #725** (`agent/grok/product-upgrade-20260919`, "one claim, one
   instrument, one action" — a homepage narrowing). It fails two required
   checks for real, specific reasons, already captured in this repo's own
   history:
   - **Contract Guard** (hard failure, not a flake): the PR edits
     `scripts/tests/homepage-mind-palace-contract.test.mjs` in the same PR as
     the surface it guards (`components/home/HomePageElite.tsx`). This repo's
     rule: a contract and its guarded surface can never change in the same
     PR, even with `[contract-change]` / `ALLOW_CONTRACT_CHANGE=1`. Split this
     into two PRs — land the contract change first, reviewed on its own, then
     propose the homepage change against it. See
     `docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md`.
   - **Merge Gate**: `scripts/tests/release-foundation-contract.test.mjs`
     fails 1 of 23 assertions — a structural/JSX match against the homepage's
     section composition. Read the failing assertion before touching the
     homepage code; it's checking for something specific, not a generic
     snapshot.
   - Before doing either fix: read `HOMEPAGE-PRESERVATION-CONTRACT.md` in
     full. On 2026-08-27 a "founder-first funnel" PR narrowed this exact
     homepage and had to be reverted the next day for eroding the site's
     identity — the contract exists because of that specific incident. #725's
     stated goal ("one claim, one instrument, one action") is the same shape
     of change. Fill out the Preservation Matrix (7 value dimensions) in the
     PR description against real evidence before treating this as a CI-fix
     task. If the matrix doesn't hold up, say so — don't force it through by
     satisfying the tests without satisfying the intent they encode.

3. **PR #732** (`dependabot/npm_and_yarn/tailwindcss-4.3.3`) has a failing
   Vercel deployment — a real Tailwind v3→v4 breaking change, not a flake.
   Reproduce locally, fix (likely the `@tailwindcss/postcss` plugin move and
   any dropped utilities), and check whether #731/#733/#734 (marked,
   isomorphic-dompurify, typescript — all opened the same day, all Dependabot)
   need to land in a specific order or together.

4. **PR #751** (`agent/codex/checkout-price-guard-20260924`, "fail closed
   when a checkout SKU has no configured price"). Small (6/-1 lines, 1 file),
   already correct-looking, deliberately left draft by its own author because
   that session had no real checkout to run gates in. Pull it, run the four
   required gates for real, and if clean, ready it and request review — this
   is the cheapest real win in the queue. Payment-path change: treat with the
   care CLAUDE.md's hard-stops list implies even though it's not literally on
   that list.

There are 15 more open PRs (full list: #650, #660, #700, #724, #735, #739,
#742, #750, #752, #759, #761, #763, plus the three named above). Several are
stale drafts from other harnesses (Grok, Codex, Jules, Copilot) or automated
weekly cost-snapshot reports. They were not individually verified this
session — triage them if asked, but they're out of scope for this handover.
Note: #742 and #759 both restructure AGENTS.md; check them against each other
before landing either.
```

---

## What changed since the 2026-09-22 handover

- **`/tools` rebuild status, corrected**: it didn't just "look stable" — `git show origin/main:app/tools/page.tsx` and the branch's copy are now byte-identical (confirmed via `git diff origin/main HEAD -- app/tools/page.tsx`, empty output). PR #596's GitHub record shows `merged: true, merged_by: frankxai, merged_at: 2026-09-01T00:31:51Z`. This is genuinely shipped, not inferred from branch inactivity.
- **The feature branch itself is done, not paused.** `git diff origin/main HEAD --stat` shows 448 files / ~41,700 lines of drift — mostly main having moved on (admin analytics dashboard, father-code book content, witali memorial page, sacred-texts research, model-arena research, dozens more) that this branch never had. Its only remaining unique content was one handover doc. There is nothing left to land from it.
- **Tier 1 ("measurement gap") from the 2026-09-22 handover is substantially resolved, but not via the PR that handover pointed at.** PR #681 (GA4/GSC dashboard) is still open and stale. Main independently already has an admin analytics dashboard (`app/admin/analytics/`, `app/api/admin/observability/*`), and five more commits landed *today* (2026-09-26) hardening the tracking pipeline itself (#758 Redis persistence for PDF views/downloads/leads, #760/#762 error attribution, #764 rate-limit fallback, #765 redacted failure detail — all Claude-authored, already on `main`). The next session should treat #681 as probably-redundant, not as the fix to merge.

## Verification evidence (commands actually run this session)

```
git branch --show-current                       → claude/tools-resources-page-structure-4qwaw5
git fetch origin main && git log -5 origin/main  → tip f4eddbf, 5 analytics fixes merged today
git diff origin/main HEAD --stat                 → 448 files, +10838/-30876
git diff origin/main HEAD -- app/tools/page.tsx  → empty (byte-identical)
git ls-tree -r origin/main --name-only | grep observability
                                                  → admin analytics dashboard confirmed present on main
gh PR #596 get                                   → merged:true, merged_at 2026-09-01
gh PR #725 get_check_runs                        → Merge Gate: failure, Contract Guard: failure
gh PR #725 get_job_logs (both failing jobs)      → exact assertion + contract-guard message captured above
gh PR #732 get_status                            → Vercel: failure (Tailwind v3→v4)
gh PR #751 get                                   → draft by design, 6/-1 lines, author flagged no local checkout
```

## Session wisdom

- **Triple-dot vs double-dot git diff cost real time here.** `git diff A...B` diffs the merge-base against B — it does NOT show what's different on A's current tip. Comparing a long-lived branch against a fast-moving main needs `git diff A B` (direct two-ref diff). Using the wrong one produced a false "regression" signal that took a second pass to correct.
- **A prior session's handover doc is a lead, not a source of truth.** The 2026-09-22 handover's core facts (shipped, stable) held up under verification, but its framing (build toward the next tier) missed that the branch itself was spent and that a Tier-1 blocker it named had since been closed through unrelated work. Re-derive status from git/GitHub on every handover rather than carrying the prior one's conclusions forward unchecked.
- **This repo enforces "no bug is generic" through code, not just review.** Contract Guard's failure on #725 isn't a lint nitpick — it's a scar tissue mechanism from a specific 2026-08-27 incident (a funnel-narrowing PR that had to be reverted for eroding site identity). The next session should read the incident, not just satisfy the check.
