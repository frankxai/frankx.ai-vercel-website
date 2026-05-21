---
title: Content System — May 2026 Runway
status: active
owner: Frank
window: 2026-05-01 → 2026-06-30
last_updated: 2026-04-30
---

# Architecture decision

**Local md inventory + Blotato broadcast.** Source of truth = this repo. Distribution = Blotato API (Chrome MCP fallback). MCP-based content studios are not yet reliable for cross-platform; revisit Q3.

```
FrankX/
├── content/
│   ├── strategy/                       ← this file
│   ├── social/
│   │   ├── linkedin/                   ← .md per post, frontmatter-driven
│   │   ├── x/
│   │   ├── threads/
│   │   ├── instagram/
│   │   ├── youtube-shorts/
│   │   ├── voice/                      ← raw voice memo .m4a + transcript .md
│   │   └── _drafts/
│   ├── newsletter/
│   ├── blog/                           ← long-form for frankx.ai
│   └── visuals/
│       ├── prompts/                    ← image_prompt library
│       ├── generated/                  ← nano-banana-2 / gpt-image-2 outputs
│       └── b-roll/
└── public/video/raw/                   ← phone footage
```

## Post frontmatter contract

```yaml
---
platform: linkedin            # linkedin | x | threads | ig | yt-shorts
status: draft                 # draft | scheduled | posted
scheduled_at: 2026-05-01T08:30:00+02:00
pillar: departure             # departure | coe | build | ritual
arc: 1                        # position in narrative arc (1–7 for May)
hook: "..."
body: |
  ...
cta: "→ frankx.ai"
visual: visuals/generated/2026-05-01-architect-window.png
image_prompt: "..."
tags: []
comment_pin: "..."            # optional 1-hour follow-up
---
```

# Content pillars (May 2026)

| Pillar | Weight | Through-line |
|---|---|---|
| Architect's Departure | 35% | Time-boxed to May. 7-beat arc: receipts → reflection → leap → invitation. |
| Personal AI CoE | 30% | Six pillars (Strategy, Governance, Talent, Tech, Data, Ethics) at 1/5000× cost. |
| Build in Public | 25% | Arcanea, GenCreator, Vibeclubs, Sovereign Scripture. Ship cycles, not roadmaps. |
| Ritual / Process | 10% | Lumina streak, Dispenza, gym/plunge, lo-fi/anime. Proof-of-process only. |

# 7-beat departure arc (May)

| # | Date | Beat | Format |
|---|---|---|---|
| 1 | May 1 (Fri) | Oracle gave me the architecture. | LI long + hero image |
| 2 | May 6 (Wed) | The six pillars I'm taking with me. | LI carousel infographic |
| 3 | May 11 (Mon) | What I learned from the UAE / Spain / smart-city RFPs. | LI long, no flex |
| 4 | May 15 (Fri) | The seven AI Architects I onboarded — what they taught me. | LI short + photo |
| 5 | May 20 (Wed) | Why a houseboat, not a headquarters. | LI long, vulnerable |
| 6 | May 26 (Tue) | What an AI CoE looks like for one person. | YT long + LI excerpt |
| 7 | May 31 (Sun) | Last day. Photo of the badge / desk / sunset. One sentence. | LI + IG, multi-platform |

June 1: **orchestrated launch** — `frankx.ai/coe`, newsletter blast, all 5 platforms simultaneously.

# Cadence

| Channel | Volume / week | Generation cost |
|---|---|---|
| LinkedIn long | 2 | 30 min review |
| LinkedIn short | 3 | 5 min review each |
| X / Threads atomic | 4 | bulk-batch Friday |
| X thread | 2 | 20 min review |
| Short video (LI/IG/YT Shorts/TT) | 3 | 90s shoot, I edit |
| Infographic carousel | 2 | nano-banana-2 + Canva polish |
| Long-form blog | 1 | 60 min review |
| Newsletter | 1 (Sunday) | 20 min review |

# Generation pipeline

```
Sunday  → schedule skill triggers `fill-the-runway` agent
        → reads voice memos + this week's beat → generates 7d of drafts to _drafts/
        → I review Sunday evening, approve → status: scheduled
Monday  → Blotato pulls scheduled posts via API, queues them
Friday  → `weekly-digest` agent compiles top-performing into newsletter draft
```

Skills used: `brand-voice:enforce-voice`, `marketing:draft-content`, `marketing:campaign-plan`, `canvas-design`, `schedule`.

# Visual generation rules

- nano-banana-2 = atmosphere, hero shots, cinematic narrative frames
- gpt-image-2 = infographics, diagrams, text-bearing visuals (better text rendering)
- One hero image per long post. No carousels for narrative posts; carousels reserved for frameworks/teaching.
- Visual style guardrails (from `taste.md`): restraint, no AI-slop tells, no chrome gradients, no glowing eyes, no "futuristic" clichés.

# What Frank produces (weekly)

1. 3× 90-second walking-selfie monologues (vertical, scripts delivered Friday)
2. 1× whiteboard breakdown 5–7 min (horizontal, one CoE pillar)
3. B-roll batch: notebook, gym, plunge, production shot, location footage, anime stills
4. 3+ voice memos to `content/social/voice/`
5. Receipts vault: drop-and-forget into `content/visuals/receipts-raw/`

Total: ~2 hours/week.

# Metrics that matter

- LI: profile views, follower delta, **comment-to-impression ratio** (depth signal, not vanity)
- frankx.ai: organic search impressions for "personal AI CoE" cluster
- Newsletter: replies > opens. Replies are the only honest engagement metric.
- Anti-metric: vanity follower count, post frequency, "engagement rate" without depth signal

# Anti-patterns (never)

- Humble-bragging about Oracle achievements without converting to a lesson the reader can use
- Spiritual / guru language ("manifesting," "abundance," "sovereignty" outside Sovereign Scripture context)
- Threads of more than 9 atomic posts (compression > volume)
- Carousels longer than 7 slides
- Hashtags on long-form LI posts (cap reach as of 2024+)
- Posting before 7am or after 9pm local time (deflates algorithm)
