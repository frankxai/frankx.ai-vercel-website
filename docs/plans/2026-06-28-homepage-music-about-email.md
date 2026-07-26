# Plan — Homepage music player, Vibe OS song, About images, email fix

**Date:** 2026-06-28
**Branch:** `agent/claude/homepage-music-email-fixes`
**Triggered by:** Frank — "why this weird image is used from me and not the music player we had before? get back the vibe os song as well! and my about page and images choose better… and frank@frankx.ai is only working mail, replace and improve"

## Findings

### 1 + 2. Music player / Vibe OS song (SAME root cause) — `CONFIRMED`
- Commit `39bd425a` ("Humanize FrankX brand experience" #205) **replaced** the hero's Suno player
  (`suno.com/embed/9cbad174-9276-427f-9aed-1ba00c7db3db` = the **Vibe O S** track) with the
  `frank-presenting-oracle-2025.jpg` portrait = the "weird image."
- `app/page.tsx` no longer passes `featuredTrack` → `HomePageElite` Hero always renders the image fallback.
- The `FeaturedTrack` player component + `featuredTrack` prop still exist in `HomePageElite.tsx` — nothing to rebuild.
- **Fix:** pass a `featuredTrack` object (Vibe O S, sunoId `9cbad174-…`) from `app/page.tsx`.
  Track data source-of-truth: `data/music-asset-registry.json` (line ~1786) + `data/music/catalog.csv`.

### 4. Email — `CONFIRMED`
- `hello@frankx.ai` appears in **42 files**. Only `frank@frankx.ai` is a working inbox.
- **Fix:** replace `hello@frankx.ai` → `frank@frankx.ai` repo-wide (app/components/lib/content/data/emails).
- "Improve": ensure CONTACT_INFO in `lib/social-links.ts` is the single source; verify no other dead inboxes.

### 3. About page images — `RESOLVED: no change`
- Frank chose **Keep mascot/illustrated** + **Keep mascots as brand** → the Frank-Omega / magical-forest
  style is intentional FrankX identity. About page left untouched. (Homepage complaint was the music slot, not the style.)

<!-- original analysis kept below for reference -->
### 3b. About page images — original analysis
- `app/about/page.tsx` currently uses stylized/mascot art:
  - hero: `/images/mascot/frank-omega-hero-v1.png` (Pixar-style avatar)
  - `/images/portraits/frankx-magical-forest.png` (AI-art "magical forest")
  - chibi avatars `frank-omega-chibi…`, `frank-omega-chill…`
- Only real portrait in repo: `frank-presenting-oracle-2025.jpg` (+ `frank-aurora-portrait.svg`).
- Brand voice = humble, professional, "let the work speak" → mascot/magical-forest art may read off-brand.
- **Decision required from Frank:** real photos vs. keep mascot style vs. generate new. (Asked separately.)

## Execution order
1. [x] Branch from `origin/main`
2. [ ] Restore `featuredTrack` (music player + Vibe OS) in `app/page.tsx`
3. [ ] Replace `hello@frankx.ai` → `frank@frankx.ai` repo-wide
4. [ ] About-page images — apply per Frank's direction
5. [ ] Guardian: `/v BUILD` (tsc + lint + build) + `pnpm merge:gate`
6. [ ] PR (significant change → branch+PR per Safe Branch Deployment Policy, not direct-to-main)
