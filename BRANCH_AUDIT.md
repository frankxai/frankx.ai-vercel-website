# Branch Audit — frankx.ai-vercel-website

**As of:** 2026-06-01 · **Updated:** 2026-06-10 (see Status update below)
**Auditor:** Claude Code session ([claude.ai/code](https://claude.ai/code))
**Purpose:** Inventory every non-`main` branch so deletions are zero-risk — the ideas live here.

## Status update — 2026-06-10

What changed since the original audit:

- **Cleanup executed.** The 3 `SAFE_DELETE` branches were deleted via the
  `branch-cleanup.yml` workflow (run logs confirm). The `KEEP_WIP` and
  `KEEP_BACKUP` branches were renamed by Frank to the `archive/*` prefix —
  same refs, clearer intent. Branch names below refer to their pre-archive
  names; prepend `archive/` (with `/`→`-` in some cases) to find them now.
- **Generative Model Hub (`archive/claude-build-llm-research-hub-75ba8`):
  PARTIALLY SUPERSEDED.** Frank rebuilt `/llm-hub` on `main` from scratch
  (registry, editorial, comparison pages, Model Arena research domain). The
  archive branch's remaining unique idea is the **multimodal `/models` layer**
  (image/video/audio/voice/embedding/world categories — 6 route trees). If a
  multimodal decision layer is wanted, mine the archive for IA and data-shape
  ideas rather than reviving the diff — `main` has moved too far for a clean
  rebase.
- **Newsletter DOI infra (`archive/feat-newsletter-launch-v1`): REVIVED.**
  Being cherry-picked onto current `main` as a draft PR. Urgency upgraded:
  the live `email-signup.tsx` success message now says "Check your inbox to
  confirm" while no confirm route exists on `main` — the site promises a
  double-opt-in flow it doesn't have. DOI + one-click unsubscribe are also
  the legally conservative posture for EU sending.
- **Multi-agent newsletter system (`archive/multi-agent-newsletter-system-anKSZ`):
  still unique, still archived.** 6 newsletter agents + `lib/newsletter/` +
  publish script. Revive when newsletter operations resume; depends on the
  DOI infra landing first.


If a branch is marked `SAFE_DELETE`, every meaningful change it contains is already in `main`. If marked `KEEP`, it has unmerged work worth reviving or finishing. `KEEP_BACKUP` is explicit save-points (recovery, staging). Revival is always `git checkout origin/<branch>` (deletion is reversible until GitHub garbage-collects the ref, typically weeks).

## Summary

| Status | Count |
|---|---|
| `SAFE_DELETE` (work in main or superseded) | 3 |
| `KEEP_UNMERGED` (substantive unmerged ideas — preserve as draft PRs) | 3 |
| `KEEP` (backs an open PR) | 5 |
| `KEEP_WIP` (massive 600-950 commit branches — leave for you to triage) | 6 |
| `KEEP_BACKUP` (recovery / staging / observability snapshots) | 6 |

## Safe to delete (work in main or cleanly superseded)

### `chore/normalize-line-endings-2026-05`

- **1 unique commit**: `chore: normalize line endings to LF (52 files)`
- **Status:** Superseded by `chore/normalize-line-endings-2026-W20` (larger, more recent — though that branch is itself huge WIP — see `KEEP_WIP`).
- **Recommendation:** `SAFE_DELETE`

### `feat/smart-404-routing`

- **2 unique commits**: smart 404 + 11 broken link fix
- **Status:** Smart-404 routing shipped via PR #90 ("feat(routing): smart-404 follow-ups — sitemap auto-discovery + merge:gate + 5 aliases"). This branch was the precursor; main now carries the canonical version.
- **Recommendation:** `SAFE_DELETE`

### `hotfix/mobile-nav-restore`

- **1 unique commit**: `fix(nav): restore mobile menu overlay (regression from 0b0a474b)`
- **Status:** Superseded by PR #100 / PR #102 ("fix(nav): restore mobile menu + owner-only cluster + surface ecosystem map") and ("fix(nav): repair broken menu links + footer ecosystem discoverability") — both merged. The mobile nav is fully restored.
- **Recommendation:** `SAFE_DELETE`

## Substantive unmerged work — open as draft PRs before deleting source branches

### `claude/build-llm-research-hub-75ba8` — **GENERATIVE MODEL HUB** (largest)

- **5 unique commits, 63 files changed, +27,502 / -20,645**
- Adds a full LLM/model decision layer: `/llm-hub` and `/models` route trees, model + comparison pages, OG images, sitemap entries, cron jobs (`model-hub-audit`, `model-hub-refresh`), 18 hero images for Google I/O '26 coverage, Vercel cron config, MODEL_HUB strategy + workflow docs, BenchmarkRadar / BenchmarkBarGroup / AgenticPlatformPill / CapabilityBadge / CapabilityCategoryGrid / ModelArenaCard components.
- **Status verified MISSING from main:** `MODEL_HUB.md`, `app/llm-hub/page.tsx`, `app/models/page.tsx`, `components/llm-hub/BenchmarkRadar.tsx` — none exist on main.
- **Recommendation:** `KEEP_UNMERGED` — open as draft PR so the work is queued for your review. Significant feature; do not delete without landing or explicit triage.
- **Revival:** `git checkout origin/claude/build-llm-research-hub-75ba8`

### `claude/multi-agent-newsletter-system-anKSZ` — **MULTI-AGENT NEWSLETTER**

- **3 unique commits, 30 files changed**
- Adds 6 newsletter agents (`.claude/agents/newsletter-{analyst,copywriter,designer,editor,publisher,researcher}.md`), 3 newsletter commands (`newsletter-design/publish/write.md`), full `lib/newsletter/` (compile-mdx, publish, render-beehiiv, render-email, render-rss, types), 6 sample issues across streams, MDX preview route, experiments log + platforms doc, email-templates-2026/index, `scripts/newsletter-publish.ts`.
- **Status verified MISSING from main:** `.claude/agents/newsletter-analyst.md`, `lib/newsletter/types.ts`, `scripts/newsletter-publish.ts`. (`app/newsletters/preview/[stream]/[slug]/page.tsx` IS in main — partial absorption.)
- **Recommendation:** `KEEP_UNMERGED` — substantive multi-agent system. Open as draft PR.
- **Revival:** `git checkout origin/claude/multi-agent-newsletter-system-anKSZ`

### `feat/newsletter-launch-v1` — **NEWSLETTER LAUNCH INFRA**

- **1 unique commit, 12 files changed**: `feat(newsletter): DOI flow + unsubscribe + archive + RSS infra`
- Adds DOI confirm route, unsubscribe route + page, archive index + detail pages, RSS feed, `lib/email-config.ts`, `lib/newsletter-archive.ts`, expanded `lib/email-templates.ts` (+263 lines).
- **Status verified MISSING from main:** `app/newsletter/unsubscribe/page.tsx`, `app/api/subscribe/confirm/route.ts`, `lib/newsletter-archive.ts`, `app/newsletter/feed.xml/route.ts`. (`app/newsletter/archive/page.tsx` IS in main — partial absorption.)
- **Recommendation:** `KEEP_UNMERGED` — newsletter compliance infra (DOI/unsubscribe) is launch-blocking. Open as draft PR.
- **Revival:** `git checkout origin/feat/newsletter-launch-v1`

## Keep — back open PRs

### `claude/focused-gauss-IdjMf` → PR #107 (draft)

- **Launch hardening:** Oracle legal-risk scrub, honest skill counts, footer cleanup. Pre-launch safety pass.
- **Recommendation:** `KEEP` until PR #107 is merged or closed.

### `claude/frankx-freemium-experience-hJuk4` → PR #93

- **Studio Crew chat + Ask flywheel:** AI Gateway, RAG, public Q&A acquisition engine.
- **Recommendation:** `KEEP` until PR #93 is merged or closed.

### `claude/gifted-pasteur-9LsID` → PR #106 (draft)

- **Blog excellence:** flagship system, cinematic heroes, content fixes.
- **Recommendation:** `KEEP` until PR #106 is merged or closed.

### `feat/birthday-tribe-page` → PR #61 (draft)

- **Private birthday tribe dedication pages.** Personal/private content.
- **Recommendation:** `KEEP` until PR #61 is merged or closed.

### `feat/acos-pillar-9-10-agents` → PR #103

- **18 new specialist agents** (Pillar 9 Personal Ops + Pillar 10 Community Fabric) + Antigravity dynamic swarm registry.
- **Recommendation:** `KEEP` until PR #103 is merged or closed.

## Keep WIP — massive branches you should triage personally

These 6 branches each carry 600–950 unique commits and share an identical "missing" file set (`app/(preview)/{music-lab,products}-v{1,2,3}/page.tsx` and related preview routes). They appear to be a family of dev-workspace snapshots from W18–W20 that branched from a common ancestor with abandoned preview routes. **Do not bulk-delete without your call.** Possible interpretations: (a) parallel exploration that overlaps heavily, (b) Frank's working snapshots, (c) genuinely abandoned WIP. Recommend a triage session — pick one to keep as the canonical, archive the rest.

| Branch | Unique commits | Shared missing pattern |
|---|---|---|
| `chore/normalize-line-endings-2026-W20` | 933 | `app/(preview)/*` |
| `feat/ikigai-branding-workshop` | 671 | `app/(preview)/*` |
| `feat/ikigai-upgrade-2-2026-W20` | 947 | `app/(preview)/*` |
| `feat/ikigai-upgrade-3-2026-W20` | 948 | `app/(preview)/*` |
| `feat/sync-prompt-hub-from-frankx` | 950 | `app/(preview)/*` |
| `rails/phase-0` | 835 | `app/(preview)/*` |

The shared missing files (`music-lab-v1/v2/v3`, `products-v1/v2/v3` under `app/(preview)/`) were likely intentionally removed from `main` — the previews shipped or were retired. If they should come back, cherry-pick from `feat/ikigai-upgrade-3-2026-W20` (newest, most complete).

## Keep — recovery / staging / observability snapshots

- `recovery/nested-2026-04-20` + `-dirty` — explicit backup before April 20 nested restructure
- `recovery/sibling-2026-04-20` + `-dirty` — same date, sibling-restructure recovery
- `staging/madrid-2026-05-25` — Madrid sprint handoff
- `observability/vercel-cost-2026-W21` — weekly Vercel cost snapshots (RED week W21, includes p95 latency delta)

**Recommendation:** `KEEP_BACKUP` — these are time-stamped save-points. Delete only when you're certain the period they cover is closed.

## One-shot delete (run when ready)

```bash
# 3 branches safe to delete from frankx.ai-vercel-website
for b in \
  chore/normalize-line-endings-2026-05 \
  feat/smart-404-routing \
  hotfix/mobile-nav-restore; do
  gh api -X DELETE "repos/frankxai/frankx.ai-vercel-website/git/refs/heads/$b" && echo "deleted $b"
done
```

(GitHub UI: same 3 branches under [Branches](https://github.com/frankxai/frankx.ai-vercel-website/branches) → trash icon each.)

## Updates to this doc

When a new orphan branch appears, add a section above with: unique-commit count · file inventory · `IN MAIN` / `MISSING` verification · `KEEP` or `SAFE_DELETE` recommendation.
