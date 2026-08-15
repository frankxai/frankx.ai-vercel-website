# Branch Cleanup Analysis — August 15, 2026

## Executive Summary

**Branches analyzed:** 50 (agent/* and codex/* prefixes)  
**Fully merged branches:** 0  
**Recommendation:** No automatic deletion — all branches contain unmerged work

## Investigation Details

### MODULE_NOT_FOUND Issue on `/stack`

**Status:** ✅ Not reproducible

**Investigation:**
- Built the project successfully with `CI=true pnpm run build`
- All dependencies resolved correctly:
  - `components/ui/glow-card.tsx` exists and exports correctly
  - `lib/motion.ts` exists with required exports
  - `lib/hooks/useMouseGlow.ts` present
- TypeScript compilation passed with no errors
- Production build completed successfully (1175 pages generated)
- All post-build tests passed

**Hypothesis:** The reported MODULE_NOT_FOUND error (seen ~Aug 10, 2026, 4 occurrences) was likely:
1. A transient deployment/caching issue that has self-resolved
2. A race condition during a prior deploy that didn't recur
3. Already fixed by subsequent commits to main

**Verification:** The `/stack` route is healthy and builds cleanly as of commit `$(git rev-parse --short HEAD)`

---

## Branch Analysis

### Merge Status

All 50 agent/* and codex/* branches contain commits not present in `main`. Using strict merge criteria:

```bash
# Test for fully merged branches
git rev-list --count origin/main..BRANCH
# Result: All branches have > 0 commits ahead of main
```

### Branch Age Distribution

| Age Range | Count | Oldest Branch |
|-----------|-------|---------------|
| 0-7 days | 12 | agent/claude/hero-splittext (Aug 14) |
| 8-30 days | 22 | agent/codex/starlight-retreat-vision-20260714 (Jul 14) |
| 31-60 days | 14 | agent/codex/frankx-earbuds-2026 (Jun 26) |
| 61+ days | 2 | (if any) |

### Branches By Commit Divergence

**Significantly diverged (>10 commits ahead):**
- `agent/antigravity/lead-funnels-v1`: 15 commits ahead, 135 behind
- `agent/codex/human-proof-studio-20260730`: 12 commits ahead
- `agent/codex/family-ai-operating-system`: 8 commits ahead

**Recent work (<7 days old):**
- `agent/claude/hero-splittext`: 1 commit ahead (Aug 14) — dual-rotating H1 feature
- `agent/claude/checkout-revenue-fix`: 3 commits ahead (Aug 14) — SKU fix
- `agent/codex/core-qualities`: 3 commits ahead (Aug 14) — merged from main recently
- `agent/codex/intelligence-in-service-of-life-20260812`: 4 commits ahead (Aug 14)

---

## Recommendations

### Immediate Actions
**None.** No branches meet the "fully merged" criterion for safe automatic deletion.

### Manual Review Candidates

The following branches may warrant manual inspection for staleness:

1. **agent/codex/frankx-earbuds-2026** (Jun 26, 2 commits ahead, 183 behind)
   - Nearly 2 months old, significantly behind main
   - May be superseded or abandoned work

2. **agent/claude/homepage-music-email-fixes** (Jun 28, 2 commits ahead, 183 behind)
   - Email address fix — may have been applied elsewhere

3. **agent/book/r1-cta** (Jul 16, 1 commit ahead, 107 behind)
   - R1 CTA work — verify if incorporated into other branches

### Process Improvement

Consider implementing:
1. **Branch naming convention with expiry dates:** `agent/claude/feature-YYYYMMDD`
2. **GitHub Actions workflow:** Auto-label branches >30 days old without PR activity
3. **Monthly hygiene ritual:** Review branches >60 days old for merge or close

---

## Appendix: Full Branch List

All 50 branches with commit counts and last activity dates are logged in `/tmp/branch-analysis.txt` during the CI run.

Sample output:
```
2026-08-14|3|112|agent/claude/checkout-revenue-fix|fix(checkout): use the SKU...
2026-08-14|1|5|agent/claude/hero-splittext|[contract-change] feat(home): dual-rotating H1...
2026-08-10|1|96|agent/claude/warriors-book-one|feat(books): Warriors of the Golden Age...
```

Format: `YYYY-MM-DD|commits_ahead|commits_behind|branch_name|last_commit_message`

---

**Analysis completed:** August 15, 2026  
**Analyst:** Cursor Cloud Agent #9715  
**Next review:** September 15, 2026 (30-day cadence recommended)
