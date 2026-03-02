# Music Empire — Complete Catalog & Strategy Plan

**Created**: 2026-03-02 01:00 UTC
**Goal**: Index ALL ~500 tracks, download MP3s, clean data, build full music production strategy
**Timebox**: 4 hours (until ~05:00 UTC)

## Current State Audit

| Metric | Value | Target |
|--------|-------|--------|
| Tracks indexed | 52 | 500+ |
| Self-hosted MP3s | 0 | All public tracks |
| With cover art | 9 | All |
| Unnamed tracks | 9 | 0 |
| Empty genre | 13 | 0 |
| Raw prompt in genre | 7 | 0 |
| Albums defined | 5 (draft) | 5+ (published) |
| Playlists indexed | 9 URLs | All tracks from playlists scraped |

## Phase 1: Complete Catalog Scraping `[in_progress]`
- [ ] Fix scraper to navigate to Songs sub-tab (not just profile overview)
- [ ] Scrape each playlist URL individually (9 playlists = more unique tracks)
- [ ] Add pagination/infinite scroll handling for Songs tab
- [ ] Run full scrape with --index-only
- **Target**: 200+ tracks minimum, ideally all 500

## Phase 2: Data Quality Cleanup `[pending]`
- [ ] Clean genre data: extract keywords from raw Suno prompts
- [ ] Name unnamed tracks: fetch metadata via API for "Track xxxxx" entries
- [ ] Fetch cover art for all tracks with sunoId
- [ ] Validate all sunoUrls are correct
- [ ] Deduplicate any tracks with same sunoId

## Phase 3: MP3 Download + Self-Hosting `[pending]`
- [ ] Download all MP3s via CDN: `node scripts/scrape-suno-catalog.mjs --download`
- [ ] Upload to Vercel Blob: `--upload` flag
- [ ] Update audioUrl fields in inventory
- [ ] Verify playback from self-hosted URLs

## Phase 4: Music Strategy Document `[pending]`
- [ ] Create `docs/plans/music-empire.md` with full strategy
- [ ] Map storage: Google Drive (masters), Vercel Blob (web), local backups
- [ ] Map publishing: Suno → DistroKid → Spotify/Apple/YouTube Music
- [ ] Map amplification: Social content, website, newsletter, Arcanea integration
- [ ] Album packaging: cover art, metadata, pricing, release dates
- [ ] Video assets: where to store, how to produce, pipeline

## Phase 5: Update Memory + CLAUDE.md `[pending]`
- [ ] Update MEMORY.md with music system architecture
- [ ] Create memory/music-production.md detail file
- [ ] Ensure future sessions have full context

## Phase 6: Commit + Deploy `[pending]`
- [ ] Commit all changes
- [ ] Push to production
- [ ] Verify Vercel deployment

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| (none yet) | | |
