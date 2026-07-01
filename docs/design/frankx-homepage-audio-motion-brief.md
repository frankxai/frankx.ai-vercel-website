# FrankX Homepage Audio + Motion Brief

Date: 2026-06-30
Owner: Codex with Motion Design Studio and Premium Web OS standards
Production direction: Command Room

## Problem

The FrankX homepage lost the Vibe O S Suno player after `Humanize FrankX brand experience (#205)`.
The old `FeaturedTrack` component still existed, but `app/page.tsx` stopped passing the track data, so the
hero fell back to the Oracle portrait. The portrait is useful proof, but it made the first viewport feel
static and biographical instead of like an AI-native command system.

The current generic AI imagery also weakens the homepage. `public/hero-homepage.png` reads as a broad
AI stock surface, while `public/hero-vibe-os.png` is more relevant but too neon and music-interface-specific
for the whole FrankX brand.

## Chosen Direction

Command Room ships to production.

- First viewport: FrankX as the headline, a code-native 3D command core, proof rails, and a Vibe O S callout.
- Sound: Suno embed plus direct MP3 fallback. No audible autoplay. The visitor chooses when sound enters.
- Motion: Framer for local entrances, GSAP ScrollTrigger for one earned scroll sequence.
- Visual asset approach: use R3F geometry and existing human proof, not a new generated image.
- Mobile: stack copy, scene, and player with fixed heights and no horizontal overflow.

## Design Lab Options

1. Command Room
   - Score: 96
   - Best for production. Balances authority, systems, music, and commerce.
   - Live route: `/design-lab/frankx-homepage-command-room`

2. Signal Cortex
   - Score: 93
   - Best for future research/advisory pages. More diagnostic, neural, and evidence-map focused.
   - Live route: `/design-lab/frankx-homepage-signal-cortex`

3. Sonic OS
   - Score: 92
   - Best for a music-first FrankX studio route. Strongest emotional memory, but less balanced for the main homepage.
   - Live route: `/design-lab/frankx-homepage-sonic-os`

## Motion Score

- Hierarchy before motion: pass. Copy, proof, soundtrack, and system layers are understandable without animation.
- Motion purpose: pass. Animation explains routing and production flow, not decoration.
- GSAP scope: one scroll set-piece in the Signal Stack section.
- Reduced motion: pass target. Framer reveals disable and GSAP setup exits when reduced motion is requested.
- Performance budget: pass target. R3F uses simple geometry, low DPR, no postprocessing, no remote 3D assets.

## Sound Direction

Sound is part of the homepage identity, but it must be consent-based.

- The Suno embed is the primary player for the Vibe O S track.
- The MP3 link is the fallback.
- The page does not attempt autoplay.
- Future upgrade path: add a small persistent audio dock after the visitor starts playback, then sync visual
  waveform states to user-controlled audio only.

## QA Gates

Required before shipping:

- TypeScript check.
- Next build or equivalent production compile.
- Desktop visual check at 1440px width.
- Mobile visual check around 390px width.
- Canvas nonblank check for the 3D command core.
- Reduced-motion check.
- Suno embed containment check.
- Vercel preview verification before production promotion.

