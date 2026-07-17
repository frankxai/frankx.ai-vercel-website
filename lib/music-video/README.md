# Music Intelligence System

> Drop a song, get a cost-gated, design-thought, premium multi-format music video.

A 3-layer AI music-video pipeline that separates the concerns most pipelines conflate — and gates every run on cost + design thinking before a dollar is spent. Built for [Claude Code](https://claude.com/claude-code) agents but the `lib/` is plain TypeScript with no Claude dependency.

## Why this exists

Most "AI music video" tools fuse generation and assembly into one opaque step, so you re-roll expensive video clips to fix a face, and cuts drift off the beat. This system keeps the three jobs distinct:

```
L1 KEYFRAMES (image)   lock identity, style, framing — cheap, editable
   Nano Banana Pro · Nano Banana · Higgsfield Soul ID
        ↓
L2 MOTION (video)      animate each keyframe — where the money goes
   Kling 3.0 · Veo 3.1 · Seedance 2.0 · Luma · Runway   (via Higgsfield / fal / Gemini)
        ↓
L3 ASSEMBLY (compositor)   time to the beat, caption, transition, 6 formats — $0 local
   HyperFrames · Remotion · FFmpeg
```

Fix identity on a **cent** keyframe, never a **dollar** motion clip. Cut on real **downbeats**, not an approximate BPM. Render the 16:9 master **once**, derive all six platform formats.

## The pipeline

```
song → design brief → beat grid → shot plan → EDL → cost pre-flight (GATE)
     → keyframes → motion → assembly → 6 formats → operator review
```

- **Design brief first.** No brief, no render. Audience, emotional arc, the 2-second hook.
- **Beat grid.** [Beat This!](https://github.com/CPJKU/beat_this) (ISMIR 2024 SOTA) sidecar emits real beat + downbeat timestamps; cuts land on bars. Falls back to BPM-derived bars when no grid.
- **EDL.** An edit-decision-list decouples planning from rendering — swap HyperFrames ↔ Remotion freely.
- **Cost pre-flight gate.** Exact $ + Higgsfield credits + ROI breakeven + resonance score, shown and approved before any spend.
- **Cost ledger.** Reconciles estimate vs actual (`metrics.inference_time` × rate) so future quotes use history.

## Surfaces (in this repo)

| Surface | Path |
|---|---|
| Library (the spine) | `lib/music-video/` |
| Producer skill | `.claude/skills/music-video-producer/` |
| Commands | `.claude/commands/{music-video,mv-render,mv-canvas,mv-artwork,mv-visualizer}.md` |
| Operator cockpit | `app/studio/music` → `/studio/music` |
| Catalog | `data/music/catalog.csv` |
| Suno prompt IP | `docs/music/suno/` |
| Beat-grid sidecar | `scripts/music-video/beatgrid.py` |

## Usage (library)

```ts
import {
  getSong, buildDefaultShotPlan, estimateCost,
  buildPreflightCard, renderPreflightText,
  edlFromPlan, validateEdl, FULL_RELEASE_FORMATS,
} from '@/lib/music-video'

const song = getSong('franks-vibes_20260529_the-awakening')!
const plan = buildDefaultShotPlan({
  songId: song.songId, songTitle: song.title, style: 'cinematic',
  formats: FULL_RELEASE_FORMATS, durationSec: song.durationSeconds!, bpm: song.bpm,
})
const estimate = estimateCost(plan)
const card = buildPreflightCard(plan, estimate, brief)
console.log(renderPreflightText(card))   // ← show + approve before spending

const edl = edlFromPlan(plan, 'bpm-fallback')   // hand to the compositor
validateEdl(edl)                                 // { ok, issues[] }
```

## Usage (Claude Code)

```
/music-video <song> --style=cinematic|character|anime|abstract|lyric --formats=full|social
/mv-canvas <song>      # Spotify Canvas (8s loop, ≤8MB)
/mv-artwork <song>     # Apple Music motion artwork (ProRes 1:1 + 3:4)
/mv-visualizer <song>  # audio-reactive loop
```

## Requirements

- Node 22+, FFmpeg, bundled Chrome (`npx hyperframes browser ensure`) for HyperFrames render.
- `uv` for the Beat This! sidecar (first run downloads the checkpoint).
- A Higgsfield plan (default posture: Plus $49/mo, Kling 3.0 + Soul ID) and/or Gemini API key for Veo hero shots.

## Engine posture (default)

Kling 3.0 via **Higgsfield Plus** as the workhorse (Soul ID locks the artist across every shot), **Veo 3.1 Standard** for the 2-3 hero shots that carry the video (native audio), **Nano Banana Pro** keyframes. Avoid Sora 2 — its API sunsets 2026-09-24. Rate card in `engines.ts`, verified June 2026.

## License

Part of the FrankX Agentic Creator OS. The `lib/` is portable TypeScript.
