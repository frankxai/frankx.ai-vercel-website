# FrankX Music Empire — Operational Playbook

> 65 tracks indexed (61 with self-hosted MP3). 483 followers. 17K plays. 5 albums in draft.
> This document is the single operational reference for scaling FrankX music from a Suno hobby into a distributed, monetized music empire.
>
> Last updated: 2026-03-02 (inventory fully cleaned: 0 unnamed, 0 empty genre, 61 Blob-hosted MP3s)

---

## Table of Contents

1. [Storage Architecture](#1-storage-architecture)
2. [Catalog Management Pipeline](#2-catalog-management-pipeline)
3. [Publishing Pipeline](#3-publishing-pipeline)
4. [Album Strategy](#4-album-strategy)
5. [Amplification Strategy](#5-amplification-strategy)
6. [Video Assets Pipeline](#6-video-assets-pipeline)
7. [Content Calendar](#7-content-calendar)
8. [Technical Infrastructure Summary](#8-technical-infrastructure-summary)
9. [Next Actions](#9-next-actions)

---

## 1. Storage Architecture

### Source of Truth

**`data/inventories/frankx/music.json`** is the canonical catalog file. Every system reads from it and writes back to it.

| Field | Purpose |
|-------|---------|
| `_count` | Current indexed track count (65 tracks, 61 with sunoId) |
| `_estimatedTotal` | Estimated full Suno library size |
| `_profileStats` | Followers, plays, likes, bio — scraped from Suno profile |
| `_playlists` | 9 Suno playlists with URLs and song counts |
| `_personas` | 9 named Suno personas (Dadada Weihnachtszeit, All In, etc.) |
| `tracks[]` | Array of track objects with sunoId, genre, plays, likes, coverUrl, audioUrl, duration |

### Vercel Blob (Self-Hosted MP3 Playback)

MP3s are stored in Vercel Blob for the frankx.ai custom player. The blob path convention is:

```
music/{sunoId}/{sunoId}.mp3
```

Example: `music/3faa6621-9edb-441f-9ba9-279be2716bba/3faa6621-9edb-441f-9ba9-279be2716bba.mp3`

- **Access**: Public read, write requires `BLOB_READ_WRITE_TOKEN`
- **Upload script**: `scripts/scrape-suno-catalog.mjs --download --upload`
- **Inventory field**: `audioUrl` on each track object stores the Blob URL after upload
- **Player reads from**: `lib/player-context.tsx` + `lib/music.ts` — the custom player uses `audioUrl` for playback

### Local Backup

```
./tmp/suno-mp3/
  {sunoId}.mp3
  {sunoId}.mp3
  ...
```

- Created by `scrape-suno-catalog.mjs --download`
- Flat directory, one MP3 per Suno ID
- `.gitignore`'d — never committed
- Re-downloadable from Suno CDN: `https://cdn1.suno.ai/{sunoId}.mp3`

### Google Drive — Master Archive

Recommended folder structure:

```
Google Drive/
  FrankX/
    Music/
      Masters/
        {album-slug}/
          {track-title}.mp3        # Highest quality MP3 from Suno
          {track-title}_stems/     # If stems ever become available
      Album Art/
        {album-slug}/
          cover-1500x1500.png      # DistroKid requirement: 1500x1500 min, 3000x3000 preferred
          cover-social.png         # 1200x630 for Open Graph
          cover-thumb.jpg          # 300x300 for website grid
      Videos/
        {album-slug}/
          visualizer-{track}.mp4
          behind-the-scenes-{track}.mp4
      Prompts/
        suno-prompts-archive.md    # Every Suno prompt that produced a keeper
        genre-templates/           # Reusable prompt templates by genre
      Licensing/
        suno-pro-terms.pdf         # Suno Pro subscription commercial rights documentation
        distrokid-agreement.pdf
```

### Cover Art Strategy

**Current state**: Most tracks lack `coverUrl`. Only 8 of 52 indexed tracks have cover art. The Suno-generated covers that exist are stored on `cdn2.suno.ai`.

**Plan**:

1. **Album covers** (priority): Generate 5 album covers (1500x1500 PNG) using the visual DNA style documented in MEMORY.md. Each album has a `color` field in `albums.json` — use that as the dominant palette.
2. **Per-track covers**: Not required for DistroKid (album art covers all tracks). For website display, fall back to album cover if track has no `coverUrl`.
3. **Generation tool**: Use Nano Banana MCP (`mcp__nanobanana__generate_image`) or Midjourney for production-quality covers.
4. **Storage**: Generated covers go to `public/images/music/{album-slug}/cover.png` and Google Drive backup.

| Album | Color | Cover Art Direction |
|-------|-------|-------------------|
| Golden Frequencies | Amber | Sound bowls, golden light rays, 528Hz waveform visualization |
| Arcanea: The Soundtrack | Rose | Eldrian silhouette, cosmic starfield, merkaba wireframe |
| Electric Soul | Violet | Electric guitar + neural network fusion, neon violet glow |
| Vibe State | Cyan | Abstract bass waveform, female silhouette, city lights |
| Tech House Sessions | Emerald | Club laser grid, geometric patterns, emerald pulse |

---

## 2. Catalog Management Pipeline

### Scraper: `scripts/scrape-suno-catalog.mjs`

The primary indexing tool. Puppeteer-based, scrapes from 4 sources:

1. Suno profile overview page
2. `/songs` tab with aggressive scroll pagination
3. Each of 9 playlist pages
4. DOM song ID extraction as fallback

**Commands**:

```bash
# Index only (metadata, no downloads)
node scripts/scrape-suno-catalog.mjs --index-only

# Full pipeline: scrape + download MP3s + upload to Vercel Blob
node scripts/scrape-suno-catalog.mjs --download --upload

# With Slack notification via n8n
node scripts/scrape-suno-catalog.mjs --download --upload --notify

# Limited test run
node scripts/scrape-suno-catalog.mjs --index-only --limit 10
```

**Dependencies**: `puppeteer` (dev), `@vercel/blob` (for upload)

**Output**: Updates `data/inventories/frankx/music.json` in place. Deduplicates by `sunoId`. Updates play counts and cover URLs on existing tracks.

### n8n Workflow: Music Catalog Sync

- **Workflow ID**: `AEalmmG7xGSmq6Wh`
- **Name**: "Music Catalog Sync"
- **Trigger**: Daily schedule + webhook from scraper (`--notify` flag)
- **Actions**:
  1. Run health check on music.json (track count, missing fields)
  2. Compare current count vs `_estimatedTotal`
  3. Post summary to Slack `#frankx-project`
- **Webhook URL**: `https://primary-production-ff336.up.railway.app/webhook/music-sync`

### `/music-import` Claude Code Command

For manual catalog management when the scraper misses tracks or data needs correction:

- Add individual tracks by Suno URL
- Fix genre tags (clean up Suno's raw prompt dumps in the `genre` field)
- Set album assignments
- Mark tracks as featured/signature
- Update play counts manually

### Data Quality Rules

**Genre cleanup** is the highest-priority data quality issue. Many tracks have raw Suno prompts dumped into the `genre` array instead of clean genre tags.

Example of dirty data (from `jump-like-this`):
```json
"genre": [
  "rap",
  "High-octane K-pop girl crush banger at 139 BPM with female vocals. Verse 1 driven by tight trap hats",
  "distorted gliding bass",
  ...
]
```

Should become:
```json
"genre": ["k-pop", "rap", "pop", "punk"]
```

**Cleanup process**:

1. **Automated pass**: Script that truncates any genre string longer than 30 characters, splits on commas, normalizes to lowercase
2. **Manual review**: Flag tracks with `genre.length > 5` or any genre string > 30 chars for human review
3. **Canonical genre list**: Maintain a set of ~40 approved genre tags. Map Suno's freeform text to these.

Approved genre tags (starter set):
```
ambient, arena-rock, bassline, choir, country, dance, deep-house,
drum-and-bass, edm, electronic, fantasy, gospel, healing, hip-hop,
k-pop, latin, metal, metalcore, neoclassical, orchestral, pop,
pop-punk, pop-rock, punk, r&b, rap, rock, soul, symphonic,
tech-house, techno, trap, vocal, world
```

**Naming cleanup**: 9 tracks have auto-generated names like `Track 90062ca7`. These need manual identification — listen to each, assign a proper title, and tag appropriately.

**Deduplication**: The scraper deduplicates by `sunoId`. However, some tracks may be re-uploads or remasters. Convention: keep both, add `(Remastered)` or `v2` suffix to the newer version.

### Version Control for music.json

- **Git history**: `music.json` is committed to the production repo. Every scraper run that adds tracks produces a diff.
- **Commit convention**: `data(music): +N tracks, updated play counts` or `data(music): genre cleanup batch`
- **Snapshot cadence**: Run scraper weekly (Sunday). Commit the updated file with a descriptive message.
- **Rollback**: `git log --oneline data/inventories/frankx/music.json` shows full history. Revert any bad scrape.

---

## 3. Publishing Pipeline

### Flow: Suno --> frankx.ai --> DistroKid --> Streaming Platforms

```
Suno (creation)
  |
  +--> scrape-suno-catalog.mjs --download --upload
  |       |
  |       +--> music.json (metadata)
  |       +--> Vercel Blob (MP3)
  |       +--> ./tmp/suno-mp3/ (local backup)
  |
  +--> frankx.ai/music (custom player, lib/player-context.tsx)
  |
  +--> DistroKid (distribution)
          |
          +--> Spotify
          +--> Apple Music
          +--> YouTube Music
          +--> Amazon Music
          +--> Deezer
          +--> Tidal
          +--> 150+ other stores
```

### DistroKid Qualification Criteria

Not every track should go to streaming platforms. Criteria for distribution:

| Criterion | Threshold | Why |
|-----------|-----------|-----|
| Plays | > 20 | Proven listener interest on Suno |
| Engagement rate | > 25% (likes/plays) | Quality signal |
| Has duration | Required | DistroKid needs track length |
| Clean title | No auto-generated names | Professional presentation |
| Clean genre | 1-3 recognized genres | Platform categorization |
| Has cover art | Album art at 1500x1500+ | DistroKid requirement |

**Currently qualifying tracks** (plays > 20, has duration):

| Track | Plays | Likes | Engagement | Duration | Album |
|-------|-------|-------|------------|----------|-------|
| The Awakening | 134 | 20 | 14.9% | 1:57 | Vibe State |
| Vibe O S | 128 | 24 | 18.8% | 4:00 | Vibe State |
| Golden Age of Intelligence | 119 | 20 | 16.8% | 2:34 | Electric Soul |
| Lumina | 108 | 16 | 14.8% | 4:12 | Electric Soul |
| Starlight Delight (Remastered) | 86 | 20 | 23.3% | 2:59 | Electric Soul |
| Still Right Here | 76 | 5 | 6.6% | -- | Unassigned |
| Arcanea (light me up) | 71 | 10 | 14.1% | 3:07 | Arcanea Soundtrack |
| Trust in Yourself | 70 | 34 | **48.6%** | 2:18 | Electric Soul |
| I Feel the Vibe | 56 | 19 | **33.9%** | 2:34 | Vibe State |
| Vibe Gods of Arcanea | 45 | 2 | 4.4% | -- | Unassigned |
| Ven Aqui | 36 | 1 | 2.8% | -- | Unassigned |
| Magical Times | 29 | 3 | 10.3% | 3:20 | Vibe State |
| Growth | 29 | 2 | 6.9% | -- | Unassigned |
| Arcanean Vibe Gods | 29 | 3 | 10.3% | -- | Unassigned |
| I Want To Build A Free World | 26 | 2 | 7.7% | -- | Tech House Sessions |

**Top distribution priority** (highest engagement): Trust in Yourself (48.6%), I Feel the Vibe (33.9%), Starlight Delight (23.3%), Vibe O S (18.8%).

### Suno Commercial Licensing

Suno Pro subscription grants:
- Commercial use rights for all generated music
- No revenue sharing with Suno
- Right to distribute on streaming platforms
- Right to use in videos, podcasts, products

**Important**: Keep Suno Pro subscription active. If it lapses, new tracks lose commercial rights. Existing tracks created under Pro retain their rights.

### Release Strategy

**Singles**: Release the top 4 highest-engagement tracks first as singles on DistroKid. Singles get algorithmic priority on Spotify.

**EPs/Albums**: After singles establish presence, release full albums. DistroKid charges per release, not per track — albums are more cost-effective.

**Recommended release order**:

| Phase | Release | Tracks | Timeline |
|-------|---------|--------|----------|
| 1 | Single: Trust in Yourself | 1 | Month 1 |
| 2 | Single: Vibe O S | 1 | Month 1 (stagger by 1 week) |
| 3 | Single: Starlight Delight (Remastered) | 1 | Month 2 |
| 4 | Single: Golden Age of Intelligence | 1 | Month 2 |
| 5 | Album: Electric Soul | 6 tracks | Month 3 |
| 6 | Album: Vibe State | 5 tracks | Month 4 |
| 7 | Album: Golden Frequencies | 9 tracks | Month 5 |
| 8 | Album: Arcanea: The Soundtrack | 4 tracks | Month 6 |
| 9 | Album: Tech House Sessions | 7 tracks | Month 7 |

**Pre-saves**: For album releases, create a Spotify pre-save link 2 weeks before drop. Share on X, newsletter, and frankx.ai.

### DistroKid Setup Checklist

- [ ] Create DistroKid account (annual plan ~$22/year)
- [ ] Set artist name: FrankX
- [ ] Upload artist profile photo
- [ ] Link bank account for royalties
- [ ] First upload: "Trust in Yourself" as single
- [ ] Set release date 2 weeks out (allows pre-save)
- [ ] Select all stores (Spotify, Apple, YouTube Music, Amazon, Deezer, Tidal, etc.)
- [ ] Enable Spotify for Artists claim
- [ ] Enable Apple Music for Artists claim

---

## 4. Album Strategy

### Album 1: Golden Frequencies

| Field | Value |
|-------|-------|
| **ID** | `golden-frequencies` |
| **Title** | Golden Frequencies |
| **Subtitle** | Healing Frequencies & World Choirs |
| **Genre** | Neoclassical / Ambient / World |
| **Tracks** | 9 |
| **Color** | Amber |
| **Price** | $9.99 |
| **Suno Playlist** | [Golden Frequencies](https://suno.com/playlist/77e7f75f-24b4-4c8f-b02c-10eff76a7052) |
| **Status** | Draft |
| **Cover Art** | Needed — amber glow, sound bowls, golden waveforms |

**Track Order** (sequenced for listening flow):
1. Golden Frequencies v4 (2:39) — opener, establishes 528Hz theme
2. Golden Frequencies v5 (3:07) — deeper exploration
3. Golden Frequency v3 (3:24) — choir introduction, sound bowls
4. Golden Frequency Choir (3:26) — full choral arrangement
5. Golden Frequency Choir (Native American) (3:31) — world music expansion
6. Golden Frequency Choir (Male Native) (3:05) — male vocal contrast
7. Golden Frequency Choir (Extended) (4:46) — longest track, deep immersion
8. Golden Frequency Choir (Mongolian Lead) (3:38) — Mongolian throat singing
9. Golden Frequency Choir (Mongolian Harmonies) (3:33) — closer, harmonics fade

**Total runtime**: ~30:49
**Target audience**: Meditation practitioners, healing frequency listeners, world music enthusiasts
**Pricing**: $9.99 on frankx.ai (Lemon Squeezy digital download), free streaming on Spotify/Apple
**Release timeline**: Month 5 — after singles and rock/hip-hop albums establish the brand

### Album 2: Arcanea: The Soundtrack

| Field | Value |
|-------|-------|
| **ID** | `arcanea-soundtrack` |
| **Title** | Arcanea: The Soundtrack |
| **Subtitle** | Epic Fantasy Orchestra & Elvish Choirs |
| **Genre** | Orchestral / Fantasy / Arena Rock |
| **Tracks** | 4 |
| **Color** | Rose |
| **Price** | $7.99 |
| **Suno Playlist** | [Arcanean Choir](https://suno.com/playlist/898c6c67-1b25-495f-82ce-53d9139d9a25) |
| **Status** | Draft |
| **Cover Art** | Needed — Eldrian silhouette, cosmic amber-gold, merkaba wireframe |

**Track Order**:
1. Arcanea (light me up) (Remastered) (3:07) — opening anthem, pop-rock soul
2. Arcanean Legends (3:24) — orchestral fantasy, invented elvish language
3. Arcanean Starlight (2:23) — arena rock crescendo
4. Arcanea Awaken (hook) — closing hook, leaves listener wanting more

**Total runtime**: ~9:00 (EP length)
**Target audience**: Fantasy/gaming soundtrack listeners, Arcanea universe followers
**Pricing**: $7.99 on frankx.ai, free streaming
**Release timeline**: Month 6 — pair with Arcanea lore drops on X
**Growth play**: Expand to 8-10 tracks by producing more Arcanean orchestral pieces. Each Eldrian (Aethelin, Solrex, Velmara, Korghast, Zyranthis) deserves a character theme.

### Album 3: Electric Soul

| Field | Value |
|-------|-------|
| **ID** | `electric-soul` |
| **Title** | Electric Soul |
| **Subtitle** | Rock, EDM & Orchestral Anthems |
| **Genre** | Rock / EDM / Orchestral |
| **Tracks** | 6 |
| **Color** | Violet |
| **Price** | $9.99 |
| **Suno Playlist** | None (create) |
| **Status** | Draft |
| **Cover Art** | Needed — electric guitar + neural network, neon violet |

**Track Order**:
1. Golden Age of Intelligence (2:34) — signature anthem, 119 plays
2. Lumina (4:12) — rock/soul/orchestral, 108 plays
3. Trust in Yourself (2:18) — pop punk, highest engagement (48.6%)
4. Art Of Soulful Living (3:44) — rock/edm/DnB
5. Starlight Delight (Remastered) (2:59) — pop/bassline, 86 plays
6. Create Millions of Starlights — rock/DnB/punk closer

**Total runtime**: ~16:00 (short album / long EP)
**Target audience**: Rock/EDM crossover listeners, workout/motivation playlists
**Pricing**: $9.99 on frankx.ai, free streaming
**Release timeline**: Month 3 — first full album, strongest tracks

### Album 4: Vibe State

| Field | Value |
|-------|-------|
| **ID** | `vibe-state` |
| **Title** | Vibe State |
| **Subtitle** | Hip Hop, R&B & Vocal Tracks |
| **Genre** | Hip Hop / R&B / Vocal |
| **Tracks** | 5 |
| **Color** | Cyan |
| **Price** | $9.99 |
| **Suno Playlist** | None (create) |
| **Status** | Draft |
| **Cover Art** | Needed — bass waveform, female silhouette, cyan glow |

**Track Order**:
1. Vibe O S (4:00) — theme song, 128 plays, female vocals
2. I Feel the Vibe (2:34) — 33.9% engagement, female hip hop
3. The Awakening (1:57) — African world vocals, 134 plays
4. Magical Times (3:20) — symphonic, female vocals
5. Beast Mode Switch — rap/trap closer, energy contrast

**Total runtime**: ~14:00
**Target audience**: Hip hop/R&B listeners, female vocal fans, vibe/mood playlists
**Release timeline**: Month 4

### Album 5: Tech House Sessions

| Field | Value |
|-------|-------|
| **ID** | `tech-house-sessions` |
| **Title** | Tech House Sessions |
| **Subtitle** | Driving Grooves & Dance Floor Energy |
| **Genre** | Tech House / Dance / Electronic |
| **Tracks** | 7 |
| **Color** | Emerald |
| **Price** | $9.99 |
| **Suno Playlist** | None (create) |
| **Status** | Draft |
| **Cover Art** | Needed — club laser grid, geometric emerald |

**Track Order** (DJ-mix style, energy progression):
1. I Want To Build A Free World (26 plays) — opener, builds energy
2. I Want To Be Free — continues theme
3. Feel Your Magic — driving groove
4. Need To Feel Your Magic v2 — deeper cut
5. Magical World v3 — tech house peak
6. Golden Frequency Floor — DnB/techno crossover
7. We Are Millions of Starlights — anthemic closer

**Total runtime**: ~20:00 (estimated, some tracks lack duration data)
**Target audience**: Tech house/dance music fans, DJ sets, workout playlists
**Release timeline**: Month 7

### Path from Draft to Published

For ALL 5 albums, the publication checklist is:

- [ ] Generate album cover art (1500x1500 PNG minimum, 3000x3000 preferred)
- [ ] Create social-sized cover (1200x630 for OG/Twitter)
- [ ] Create thumbnail (300x300 for website grid)
- [ ] Upload all covers to `public/images/music/{album-slug}/`
- [ ] Set `coverImage` in `albums.json`
- [ ] Verify all tracks have `duration` field (fill in missing)
- [ ] Verify all tracks have clean `genre` arrays (no prompt dumps)
- [ ] Ensure all tracks have `audioUrl` (uploaded to Vercel Blob)
- [ ] Create Suno playlist for albums that lack one (Electric Soul, Vibe State, Tech House)
- [ ] Set `playlistUrl` in `albums.json`
- [ ] Create Lemon Squeezy product for paid download
- [ ] Set `lemonSqueezyProductId` in `albums.json`
- [ ] Set `releaseDate` in `albums.json`
- [ ] Change `status` from `"draft"` to `"published"`
- [ ] Upload to DistroKid
- [ ] Submit for Spotify playlist consideration (via Spotify for Artists, 7+ days before release)

---

## 5. Amplification Strategy

### Website: frankx.ai/music

**Already built**: Custom music player with full playback controls (`lib/player-context.tsx`), queue management, shuffle, repeat. Reads from `lib/music.ts`.

**Enhancements needed**:
- Album grid view showing 5 albums with cover art, track count, play button
- "Top Tracks" section highlighting the 5 highest-play tracks
- Integration with Spotify/Apple links once distributed
- Download purchase flow via Lemon Squeezy for album purchases
- Embed capability: shareable player widget for individual tracks

### Social: X (Twitter)

**Format**: Track drop threads

```
Thread structure:
1. Hook: "Just shipped a new track. [genre]. Listen:" + Suno link
2. Behind the scenes: The Suno prompt that created it (screenshot or text)
3. Production notes: What I was going for, what surprised me
4. CTA: "Follow @frankxai for more AI music drops"
```

**Cadence**: 2-3 track drops per week. 1 album announcement thread per month during release phase.

**Best performers for X** (high engagement):
- Trust in Yourself (48.6% engagement) — "Made a pop-punk anthem with AI"
- I Feel the Vibe (33.9%) — "Female hip hop with AI vocals"
- Starlight Delight (23.3%) — "Pop/DnB crossover"

### Newsletter: Creation Chronicles

**"Track of the Week"** section in each newsletter issue:

- Embedded Suno player or link
- 2-3 sentence production note
- Prompt used (exclusive content for subscribers)
- Link to full album/playlist

**Sequencing**: Align featured tracks with upcoming releases. If Electric Soul drops in Month 3, feature its tracks in Weeks 9-12 newsletters.

### Arcanea Integration

The Arcanea universe is a unique music amplification vehicle. No other AI music creator has a full fantasy world backing their soundtrack.

**Lore-driven music drops**:
- Each of 5 Eldrians gets a character theme track
- Produce 1 Eldrian theme per month, drop with lore thread on X
- Track names follow Arcanean naming: "Theme of Aethelin", "Korghast's Forge", "Velmara's Foam"
- Cross-reference in `data/arcanea-content-queue.json` for scheduling

**Arcanea soundtrack expansion** (target: 10 tracks for full album):
1. Arcanea (light me up) (Remastered) -- exists
2. Arcanean Legends -- exists
3. Arcanean Starlight -- exists
4. Arcanea Awaken -- exists
5. Theme of Aethelin -- produce
6. Korghast's Forge -- produce
7. Velmara's Foam -- produce
8. Solrex Rising -- produce
9. Zyranthis Void -- produce
10. The Conclave -- produce (ensemble piece)

### YouTube

**Channel strategy**: Music-first content under FrankX brand.

| Content Type | Frequency | Length | Tools |
|-------------|-----------|--------|-------|
| Music visualizers | 2/week | Full track length (2-4 min) | AI visualizer tools |
| "How I Made This" | 1/week | 5-10 min | Screen recording of Suno |
| Lofi/ambient streams | 1/month | 1-4 hours | Compilation of healing tracks |
| Album premiere | Per release | Full album length | Visualizer + track list |

### TikTok / Reels

**Format**: 15-30 second clips with the hook/chorus of best tracks.

**Templates**:
1. "AI made this song" + track plays + reaction
2. Split screen: Suno prompt on left, music playing on right
3. "Rate my AI track 1-10" engagement bait
4. Before/after: first generation vs remastered version

**Best tracks for short-form** (strong hooks, immediate energy):
- Trust in Yourself — pop-punk hook hits immediately
- Beast Mode Switch — trap energy, instant impact
- Jump Like This — K-pop banger, danceable
- Golden Age of Intelligence — EDM/metalcore drop

---

## 6. Video Assets Pipeline

### Google Drive Storage

```
Google Drive/
  FrankX/
    Music/
      Videos/
        Visualizers/
          {track-slug}-visualizer.mp4      # Full-length AI visualizer
        Behind-The-Scenes/
          {track-slug}-making-of.mp4       # Screen recording of Suno creation
        Shorts/
          {track-slug}-hook-15s.mp4        # TikTok/Reels clip
          {track-slug}-hook-30s.mp4        # Extended clip
        YouTube/
          {album-slug}-premiere.mp4        # Full album video
          lofi-healing-stream-01.mp4       # Long-form ambient stream
```

### AI Music Visualizer Tools

| Tool | Cost | Quality | Best For |
|------|------|---------|----------|
| **Kaiber** | $5-15/mo | High | Abstract visualizers, style-consistent |
| **Deforum (Stable Diffusion)** | Free (local) | Medium-High | Custom control, open source |
| **Runway Gen-3** | Credits-based | Very High | Cinematic quality, short clips |
| **CapCut** | Free | Medium | Quick edits, social clips |
| **Google Veo / Sora** | Varies | Very High | Emerging options, evaluate as available |

**Recommended workflow**:
1. Generate full-length visualizer with Kaiber or Deforum (matches album art style)
2. Export 15s and 30s clips from the best visual moments
3. Add track title/artist overlay in CapCut
4. Upload: YouTube (full), TikTok/Reels (clips), frankx.ai (embed)

### Publishing Flow

```
AI Visualizer Tool
  |
  +--> Full video (YouTube upload)
  |       |
  |       +--> YouTube description: Suno link + frankx.ai/music + streaming links
  |
  +--> 15s clip (TikTok, Instagram Reels)
  |       |
  |       +--> Caption: "AI made this [genre] track" + #aimusic #suno
  |
  +--> Embed URL (frankx.ai track page)
```

---

## 7. Content Calendar (Monthly)

### Week 1: Production Sprint

| Day | Action |
|-----|--------|
| Mon | Produce 2-3 new tracks on Suno (focused genre session) |
| Tue | Review generations, select keepers, run through remaster |
| Wed | Run `scrape-suno-catalog.mjs --index-only` to capture new tracks |
| Thu | Genre cleanup and tagging for new tracks |
| Fri | Share 1 new track on X with production thread |

### Week 2: Album Packaging & Release Prep

| Day | Action |
|-----|--------|
| Mon | Generate/finalize album cover art for next release |
| Tue | Upload MP3s to Vercel Blob (`--download --upload`), verify player |
| Wed | Create DistroKid release (set date 2 weeks out) |
| Thu | Write album description, track-by-track notes |
| Fri | Create pre-save link, share on X and newsletter |

### Week 3: Social Amplification

| Day | Action |
|-----|--------|
| Mon | Create 2 TikTok/Reels clips from latest tracks |
| Tue | X thread: "How I made [track]" with Suno prompt reveal |
| Wed | Newsletter: Track of the Week feature |
| Thu | YouTube: Upload visualizer for featured track |
| Fri | Community engagement: Share in Suno Discord, r/SunoAI |

### Week 4: Analytics & Planning

| Day | Action |
|-----|--------|
| Mon | Pull Suno stats (plays, likes, followers delta) |
| Tue | Check DistroKid dashboard: streaming numbers, revenue |
| Wed | Review social analytics: which tracks/posts performed |
| Thu | Plan next month: which tracks to produce, which album to target |
| Fri | Update music.json with latest play counts, commit snapshot |

---

## 8. Technical Infrastructure Summary

| Layer | What Exists | What's Built | What's Planned |
|-------|-------------|-------------|----------------|
| **Source of Truth** | `data/inventories/frankx/music.json` | 52 tracks indexed, profile stats, playlists | Scale to 500+ tracks |
| **Scraper** | `scripts/scrape-suno-catalog.mjs` | Puppeteer multi-source scraper, MP3 download, Blob upload, n8n notify | Genre auto-cleanup script |
| **Storage: Blob** | Vercel Blob (`music/{sunoId}/`) | Upload pipeline, `audioUrl` field on tracks | Verify all 52 tracks uploaded |
| **Storage: Local** | `./tmp/suno-mp3/` | Download pipeline | Backup to Google Drive |
| **Storage: Google Drive** | Not configured | -- | Folder structure for masters, art, video |
| **Album Data** | `data/albums.json` | 5 albums defined, track assignments, pricing | Cover art, release dates, Lemon Squeezy IDs |
| **Web Player** | `lib/player-context.tsx` + `lib/music.ts` | Full player with queue, shuffle, repeat | Album grid view, streaming links |
| **Website: /music** | `app/music/` | Music page with player | Album cards, top tracks, buy buttons |
| **n8n Automation** | Workflow `AEalmmG7xGSmq6Wh` | Music Catalog Sync — daily health check | Weekly scrape automation trigger |
| **Distribution** | Not started | -- | DistroKid account, first 4 singles |
| **Cover Art** | 0 of 5 albums have covers | -- | Generate 5 album covers |
| **Video Pipeline** | Not started | -- | Kaiber/Deforum visualizers |
| **Social Templates** | Not started | -- | X thread templates, TikTok clip format |
| **Newsletter Integration** | Creation Chronicles exists | -- | Track of the Week section |
| **Arcanea Soundtrack** | 4 tracks + world-state lore | Track cross-references in music.json | 6 more Eldrian themes |
| **Analytics** | Suno plays/likes in music.json | Scraper updates counts | DistroKid dashboard, Spotify for Artists |

---

## 9. Next Actions

### Immediate (This Week)

- [ ] **Run full scraper**: `node scripts/scrape-suno-catalog.mjs --download --upload --notify` to get all 500+ tracks indexed and MP3s in Blob
- [ ] **Clean genre data**: Fix the 8+ tracks with Suno prompt dumps in genre arrays
- [ ] **Name unnamed tracks**: Listen to and title the 9 `Track XXXXXXXX` entries
- [ ] **Create DistroKid account**: Sign up, configure artist profile

### Short Term (Month 1)

- [ ] **Generate 5 album covers**: 1500x1500 PNG for each album using Nano Banana or Midjourney
- [ ] **Upload first single**: "Trust in Yourself" to DistroKid with 2-week pre-save
- [ ] **Upload second single**: "Vibe O S" to DistroKid, staggered by 1 week
- [ ] **Create Suno playlists**: For Electric Soul, Vibe State, and Tech House Sessions (currently missing)
- [ ] **First X track-drop thread**: "Trust in Yourself" with Suno prompt and production notes
- [ ] **Add Track of the Week to newsletter**: Feature in next Creation Chronicles issue

### Medium Term (Months 2-3)

- [ ] **Release singles 3-4**: Starlight Delight (Remastered) and Golden Age of Intelligence
- [ ] **Release Electric Soul album**: First full album on all streaming platforms
- [ ] **Claim Spotify for Artists**: Verify artist profile, access analytics
- [ ] **First YouTube visualizer**: Full-length video for Golden Age of Intelligence
- [ ] **Produce 5 new tracks**: Focused sessions to expand catalog quality
- [ ] **Build genre cleanup script**: Automated pass for all 500+ tracks

### Long Term (Months 4-7)

- [ ] **Release remaining 4 albums**: Vibe State, Golden Frequencies, Arcanea Soundtrack, Tech House Sessions
- [ ] **Produce 6 Eldrian themes**: Expand Arcanea Soundtrack to 10 tracks
- [ ] **YouTube channel build**: 20+ visualizers, 2+ lofi streams
- [ ] **Hit 1,000 Suno followers**: From 483 currently
- [ ] **First streaming revenue**: Target $100/month across platforms
- [ ] **Pitch AI music story**: "500+ songs with AI" angle to music tech press

---

_Excellence in execution. Let the work speak._
