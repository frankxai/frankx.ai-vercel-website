# Video Intelligence Pipeline

## Overview
This document defines the workflow for identifying, staging, and publishing high-value video content to the FrankX.ai **Video Intelligence** network (the `/watch` hub).

## The Pipeline

### 1. Discovery (The Radar)
We monitor high-signal channels for content that fits our key personas:
- **Architects:** Karpathy, Willison, GeoHot, LeCun.
- **Builders:** David Ondrej, Fireship, Theo (t3.gg), Lee Robinson.
- **Creators:** Rick Rubin, MKBHD, Corridor Digital.
- **Investors:** All-In, Lex Fridman, Y Combinator.

### 2. Staging (The Filter)
New videos are added to `data/video-staging.json` with the following schema:
```json
{
  "id": "YouTubeID",
  "title": "Video Title",
  "channel": "Channel Name",
  "category": "AI Engineering | Strategy | Mindset | Creativity | Learning",
  "status": "staged", 
  "tags": ["tag1", "tag2"],
  "persona": "architect | developer | creator | investor | student"
}
```
**Status Lifecycle:**
- `staged`: Identified but not yet reviewed/embedded.
- `reviewed`: Watched and verified for quality/brand fit.
- `published`: Live on `/watch` or embedded in a blog post.

### 3. Integration (The Node)
Once a video is marked `published`:
1. It is moved to `data/video-library.json` (if it belongs in the Vault).
2. OR it is embedded in a specific Blog Post (using `<YouTubeEmbed>`).
3. The `scripts/generate-youtube-index.mjs` script runs during build to update the global index.

### 4. Multiplier (The Nexus)
High-resonance videos from the `published` list are selected for the **Short-Form Nexus** strategy (Opus Pro).
- We extract timestamps for clips.
- We generate social copy.
- We link back to the `/watch` or `/blog` URL, not YouTube.

## Future Automation
- **GitHub Action:** Daily fetch of RSS feeds from top channels -> PR to update `video-staging.json`.
- **Claude Agent:** Auto-summarize staged videos and suggest tags/personas.

## Current Staging List (Feb 2026)
See `data/video-staging.json` for the current queue of 25+ videos pending review.
