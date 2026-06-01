# Handover — Overnight Polish Campaign W23

**Date:** 2026-06-02
**Branch:** `feat/overnight-polish-2026-06-02-W23`
**PR:** https://github.com/frankxai/frankx.ai-vercel-website/pull/111
**Lead:** Claude Code (Opus 4.7), per `plans/splendid-wishing-sunset.md`
**Duration:** 4 waves of parallel sub-agents

---

## 60-second read (for the phone)

**21 commits landed.** I closed two stale PRs (#61, #93), merged PR #106 (blog excellence), cherry-picked the birthday tribe feature from closed PR #61, ran a site-wide WCAG contrast sweep (68 fixes), drove ai-slop hits from 94 → 0 across 1,597 files, fixed all 10 pre-existing broken internal links, added metadata + JSON-LD to every Tier-1 + Tier-2 page that had gaps, polished CTA copy + schemas on 10 commercial pages, and shipped a new `/unsubscribe` page.

**PR #111 is open and ready to merge** — full `merge:gate` exited green locally. CI runs the same gates plus Vercel deploy.

**Next action:** Watch CI on PR #111. If green: `gh pr merge 111 --repo frankxai/frankx.ai-vercel-website --squash --delete-branch`. The branch deletes after merge; production deploys via Vercel within ~3 min.

---

## What the night delivered

### Numbers

| Metric | Before | After | Δ |
|---|---|---|---|
| AI-slop hits (`audit-ai-slop.mjs`) | 94 across 44 files | **0 across 1,597 files** | -94 |
| Broken internal links | 10 unique paths | **0** | -10 |
| WCAG contrast fixes on body text | — | 68 across 19 files | +68 |
| Open prod PRs (active) | 4 (incl. 2 broken) | 1 (#111) | -3 |
| Stale stashes | 2 (would have reverted email migration) | 0 | -2 |
| Commits ahead of main | 0 | 21 | +21 |
| Pre-existing client-component metadata gaps | 4 workshops | 0 | -4 |
| Tier-2 hubs missing OG image | 3 (`/agents`, `/lab`, `/intelligence-atlas`) | 0 | -3 |

### Wave 0 — Triage (cleaned the deck)

- **Closed PR #61** ("Add private birthday tribe dedication pages") — 22 days stale, Type+Lint failing, Build skipped.
- **Closed PR #93** ("Studio Crew + Ask flywheel") — Vercel deploy failing 9 days. Surface is too valuable to ship broken.
- **Dropped 2 stashes** that would have reverted the `hello@frankx.ai → frank@frankx.ai` migration.
- **Pushed dev FrankX main** — was 1 commit ahead (`f1a9b6bc`).
- **Deleted orphaned local branch** `feat/acos-pillar-9-10-agents`.
- **Merged PR #106** (blog excellence + cinematic heroes).

### Wave 1 — System-wide sweeps (commits `55794476` → `579f0188`)

- **All 10 pre-existing broken internal links resolved:**
  - `/page` (design-lab code snippet) → `/blog`
  - `/orchestration` → `/blog/multi-agent-orchestration-patterns-2026`
  - `/docs/design/{LIQUID_GLASS_SYSTEM,ARCANEA_VISUAL_LANGUAGE}.md` + `/components/liquid-glass/README.md` → GitHub blob URLs
  - `/research/briefs/mcp-ecosystem-2026` → `/research`
  - `/unsubscribe` → **new page at `app/unsubscribe/page.tsx`**
  - `/familie/geschichte/{wolgadeutsche,riemer-linie,trudarmee,karaganda,gorte-linie}` + `/products/agentic-creator-os/docs/{getting-started,skills,agents,workflows,mcp}` → added to route enumeration
- **Tier-1 ai-slop fix** in workshop slides speaker note
- **Verified rounded-radius scale is already consistent** — no codemod needed (6,089 instances, clean 5-tier scale)

### Wave 2 — Cherry-picks + Tier-1 deep polish (commits `06fcde03` → `57883cda`)

- **Cherry-picked PR #61 birthday tribe** — `app/tribe/page.tsx`, `app/tribe/[slug]/page.tsx`, `app/tribe/people.ts` (4 files, +510 LOC, self-contained, noindex on dedications)
- **Smart 404 routing** — verified already integrated on this branch via earlier merge (`7bf992b6`). No-op confirmation.
- **AI infrastructure (PR #93)** — blocked on missing npm deps (`@ai-sdk/google`, `@upstash/vector`, `react-markdown`) + missing env vars. Deferred to dedicated session with operator env setup.
- **`/inner-circle`** — `text-white/40` → `/60` on 2 lines; improved mascot alt text. (Metadata already in layout.tsx + 4 JsonLd blocks: Organization, Service, FAQPage, BreadcrumbList.)
- **`/workshops/ikigai-branding`** — wrapped 生き甲斐 in `<span lang="ja" role="img" aria-label="Ikigai — written in Japanese as 生き甲斐">`; added `lang="ja"` to all kanji glyphs; full EducationEvent JSON-LD with offers, organizer, performer, audience, teaches[], VirtualLocation
- **`/connect`** — `text-white/{40,45}` → `/60` on 5 labels; added `@graph` JSON-LD with BreadcrumbList + WebPage + per-event Event nodes (Madrid: Google AI Live + South Summit); documented ISR cache behavior
- **`/agent-team`** — added "Join the Inner Circle" as leading primary CTA (gradient pill, gravity surface); ItemList JSON-LD now has root name + 155-char description; 10 body-text `text-white/70` → `/80`
- **`/products/agentic-creator-os`** — Product schema enriched with image (`acos-hero-omega.png`), brand (FrankX), category, audience, seller; FAQ body `text-white/70` → `/80`

### Wave 3 — Finishing polish (commits `2becfaf2` → `3d521930`)

- **Workshop metadata layouts created:**
  - `app/workshops/personal-ai-coe/layout.tsx`
  - `app/workshops/sovereign-leadership/layout.tsx`
  - `app/workshops/ikigai-content-studio/layout.tsx`
  - `app/workshops/for-educators/layout.tsx`
  - (All page.tsx files are `'use client'` — Next.js disallows metadata exports there)
- **Homepage CTAs** — "Explore the Work" → "Start learning" (stronger verb on `/start` route); "Read the Blog" → "Get the playbook" (`/inner-circle` gravity surface)
- **`/build` CTAs** — "Book a workshop" → "Ship your first agent in one day" (outcome-specific); "See what is inside" → "Download the template pack"
- **`/partnerships`** — converted 2 `dangerouslySetInnerHTML` JSON-LD blocks to canonical `<JsonLd>` component; added 5-partner logo gallery above fold (Anthropic, Arrow, Google, NVIDIA, Vercel — all real SVG assets)
- **`/os`** — primary above-fold CTA cluster: "Join the Inner Circle" (`/inner-circle`) + "Explore the 7 modules" (`#modules` anchor) + "Explore the research" (`/research`); added scroll-margin to modules section
- **Stub pages noindex** — 7 producer placeholders (`audio/food/music/prose/screen/travel/video`) noindex'd via shared `makeProducerMetadata()` helper; `/search` also noindex'd
- **AI-slop A-M batch** — 30 mechanical replacements + 4 path-allowlist additions across 19 files. Hit count drops from 93 → 8.
- **AI-slop N-Z batch** — 11 files cleaned up. Production blog patterns, workshop-prompts. Hit count drops from 8 → 0 (in scope).
- **AI-slop allow-list markers** — 11 markers across 10 legitimate-use files (Dr. Seuss philosophy narrative, FAQ "Absolutely!", fictional Arcanea chronicles, teaching about the refusal-list itself).

### Wave 4 — Final polish + verification (commits `7c31064f` → `499a4cfd`)

- **`/research` OG image** — `og-template.png` → `hero-intelligence-atlas.png` (research-themed asset that already existed)
- **Site-wide WCAG contrast sweep — 68 fixes across 19 files:**
  - 14 fixes on `components/home/HomePageElite.tsx`
  - 6 + 7 on `app/acos/page.tsx` + `app/acos/presence/page.tsx` (latter had `text-white/30` at ~1.9:1 contrast — worst offender)
  - 8 + 6 + 3 across `/research/*`
  - 5 on `app/products/trinity-ai/TrinityProductClient.tsx`
  - 4 across `app/products/vibe-os/*`
  - Plus smaller fixes across `HomePage2025.tsx`, `HomePage.tsx`, `ICPRouting.tsx`, `EarlyEmailCapture.tsx`, `OptimizedHomePage.tsx`, `app/products/page.tsx`
  - All targeted body-text `text-white/{30,40,50}` → `text-white/60` (AA-compliant for large UI text)
  - Intentional microcopy (uppercase tracking eyebrows, text-xs metadata, breadcrumbs) preserved
- **Tier-2 hub metadata fills:**
  - `/agents` — added OG image (1200×630) + twitter card
  - `/lab` — converted to `createMetadata`, added keywords + CollectionPage JSON-LD
  - `/intelligence-atlas` — strengthened title + description, added CollectionPage JSON-LD with name + description at root
- **SEO substrate verified:** sitemap, robots, tribe noindex contract, vault-manifest, newsletter index all green. No-op commit — substrate already healthy.

---

## Pre-flight gates passed (all locally on the umbrella branch)

```
✅ npx tsc --noEmit                 → 0 errors
✅ npm run lint                     → 0 errors, 6 warnings (acceptable, none new)
✅ node scripts/check-internal-links.mjs --warn → 0 broken refs across 1,582 files
✅ node scripts/audit-ai-slop.mjs   → 0 hits across 1,597 files
✅ npm run merge:gate               → exit 0 (composite: tsc + claims:audit:strict + ai-slop + links:check:static + links:check:ci)
```

CI on PR #111 runs the same gates plus Vercel deploy + CodeRabbit.

---

## Commit log (in chronological order)

```
55794476  chore(routes): rebuild route index post-#106 merge (602 routes)
f7856364  fix(links): resolve all 10 pre-existing broken internal references
579f0188  polish(workshop): replace 'deep dive' ai-slop tell in ikigai slides speaker note
d6ea24ec  docs(handover): overnight polish W23 handover report
06fcde03  feat(tribe): restore birthday tribe dedication pages from closed PR #61
075ad824  polish(inner-circle): fix contrast and improve mascot alt text
57883cda  polish(workshop): a11y + EducationalEvent schema for ikigai-branding
a9f9397d  polish(connect): WCAG contrast + Event schema
12850f4b  polish(agent-team): above-fold CTA + schema depth + contrast
de53ce19  polish(acos-product): Product schema depth + FAQ contrast
83b62185  polish(ai-slop): mechanical rewrites A-M batch
aa337b5b  polish(ai-slop): mechanical rewrites N-Z batch + workshop prompts
6c5f9297  polish(ai-slop): allow-list markers for legitimate uses
683a8f1a  polish(build): replace generic CTAs with outcome-specific copy
2becfaf2  polish(home): explicit primary CTA + hero treatment audit
a9a6b959  polish(os): add primary above-fold CTA to gravity surface
411ca32f  polish(partnerships): unify JSON-LD via JsonLd component
3d521930  polish(seo): noindex stub pages to avoid SEO dilution
7c31064f  polish(research): swap OG image to thematic hero asset
0642e3b7  polish(hubs): metadata + JSON-LD gap fills across Tier-2
499a4cfd  polish(a11y): WCAG contrast sweep across Tier-1 + Tier-2 surfaces
```

---

## What's queued for follow-up

### Priority 1 — Studio Crew + Ask flywheel (was PR #93)
Blocked tonight on missing npm deps (`@ai-sdk/google`, `@upstash/vector`, `react-markdown`) and missing env vars (`UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `AI_GATEWAY_API_KEY`, `STUDIO_MODEL_*`, etc.). Needs dedicated session where you:
1. Set up the Upstash Vector index + Vercel AI Gateway API key
2. Add the deps to package.json (review bundle-size impact)
3. Cherry-pick from `origin/claude/frankx-freemium-experience-hJuk4`
4. Decide whether to ship the UI launcher (Markdown, StudioChatSheet, StudioChatLauncher, BYOKSetup) at the same time or in a follow-up

### Priority 2 — Lighthouse pass on production
After PR #111 merges:
1. Vercel will deploy main automatically
2. Run Lighthouse on the polished pages — `/`, `/inner-circle`, `/workshops/build-first-ai-agent`, `/products/agentic-creator-os`
3. Targets per hub-audit doctrine: Perf ≥90, LCP ≤2.5s, CLS ≤0.1, INP ≤200ms, A11y ≥95
4. If any target misses, the LCP fix is usually the hero image — verify all heroes use `<Image>` with `priority`

### Priority 3 — Birthday tribe content fill
The tribe feature shipped via cherry-pick has 10 dedication category cards but the per-person `[slug]` pages need real content from you (the original PR had placeholder data). Each person needs:
- Name
- Relationship + dedication paragraph
- Optional artifact (photo, song, quote)
The data model is `app/tribe/people.ts` — fill in and the routes will render.

### Priority 4 — Dev FrankX repo sync
Prod is the source of truth post-merge. The dev FrankX repo could be synced for parity (app/, components/, content/, data/, public/, lib/). Not blocking — prod ships independently. Run when convenient via existing sync scripts.

### Priority 5 — Tier-3 blog editorial pass
The ai-slop audit was technically driven to 0 hits, but blog body prose still has voice debt that no codemod can fix. Pick 5 top-traffic posts and rewrite the body with your voice. Use `lib/voice/frankx-voice.ts` as the anchor.

---

## Closed PRs reference

| PR | Status | Reason |
|---|---|---|
| #61 Birthday tribe pages | CLOSED → CHERRY-PICKED tonight | Code shipped via commit `06fcde03`. Original PR was stale; revival via cherry-pick was cleaner. |
| #93 Studio Crew + Ask flywheel | CLOSED 2026-06-02 | Vercel deploy failing 9 days. AI infrastructure cherry-pick blocked on missing deps + env vars. Deferred to dedicated session. |
| #106 Blog excellence | MERGED 2026-06-01 22:53 UTC | All checks green. Squash-merged as part of overnight Phase 1. |
| #111 Overnight polish W23 | OPEN | This umbrella PR. 21 commits, awaiting CI. |

---

## How to merge PR #111

If CI green:

```powershell
gh pr merge 111 --repo frankxai/frankx.ai-vercel-website --squash --delete-branch
```

Then verify production (~3 min after merge):
1. Vercel main deploys
2. Visit https://frankx.ai/unsubscribe — should render the new page
3. Visit https://frankx.ai/familie/geschichte/wolgadeutsche — dynamic route should render
4. Visit https://frankx.ai/tribe — new birthday tribe hub should render
5. Spot-check 3-5 Tier-1 pages for visual regressions

---

## Substrate references (for future sessions)

- **Plan file:** `C:\Users\frank\.claude\plans\splendid-wishing-sunset.md`
- **Voice substrate:** `lib/voice/frankx-voice.ts`
- **MDX component registry:** `components/blog/MDXComponents.tsx` (never import components in MDX directly)
- **Design tokens:** `lib/design-system.ts` + `design.md` + `tailwind.config.js`
- **Voice/judgment:** `taste.md`
- **Pre-publish gate:** `@integrity-guard` agent (5-gate check)
- **Link integrity:** `scripts/check-internal-links.mjs`
- **AI-slop refusal:** `scripts/audit-ai-slop.mjs` + `taste.md` (now allowlist-extended for prompts/* + legitimate concept refs)
- **Route enumeration:** `lib/route-enumeration.mjs` → `data/route-index.json` (regen via `pnpm routes:build`)
- **Hub audit:** `/hub-audit <hub>` command
- **Claims gate:** `scripts/audit-marketing-claims.mjs` (4 Oracle CoE claims are factual per CLAUDE.md positioning, non-blocking)

**Authority pattern:** lead-by-default per CLAUDE.md Doctrine 0. Hard stops: no `/papa/`, no force-push to main, no DB ops, no key rotation, no newsletter sends, no auto-distribute.

🤖 Generated overnight by Claude Code Opus 4.7 — 4 waves of parallel sub-agents per the approved plan. Your sleep was protected by automated guardians.
