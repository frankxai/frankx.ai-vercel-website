# Shorts Curation — Research & Channel Map

_Version 0.1 — 2026-04-15_
_Purpose: brand-aligned seeding for /watch/shorts. Not all Shorts need to be "AI Architect." Frank's full brand spans 5 pillars._

---

## The 5 brand pillars (not just AI Architect)

Frank's full positioning is broader than enterprise AI. Shorts should reflect the whole creator. Category in `data/video-vault-100.json` maps 1:1 to a pillar so curation stays balanced.

| Pillar | Category field | Why it matters to Frank | Ambient color |
|---|---|---|---|
| **AI Architecture & Build** | `AI Foundations`, `AI Engineering`, `AI Agents` | former enterprise AI architecture experience, ACOS, enterprise + personal frameworks | emerald / blue |
| **Creative AI & Music** | `Creative AI & Music`, `AI Culture` | 12,000+ Suno tracks, art, memes, aesthetic | fuchsia / pink |
| **Creator Economy & Strategy** | `Creator Economy`, `Strategy & Business` | GenCreator, solopreneur playbooks, income | amber / orange |
| **Human Edge** | `Mindset & Growth` | Peak performance, longevity, family, philosophy | rose / pink |
| **Culture & Signal** | `AI Culture` | Memes, satire, zeitgeist moments | pink / rose |

---

## Curation criteria (the bar)

A Short earns its place on frankx.ai only if it clears **all four**:

1. **Signal density.** Non-obvious insight compressed into ≤60s. If it takes a second viewing to "get", it's probably a keeper.
2. **Alignment with a pillar.** Not a random viral clip — must slot into one of the 5 above.
3. **Re-embeddable.** Original creator hasn't blocked embedding (check via oembed 200 response).
4. **Worth a commentary.** If Frank can't write 2-3 sentences of editorial take on why it matters, it doesn't go.

Anti-patterns:
- ❌ Pure entertainment with no framework
- ❌ Clickbait ("You won't believe...")
- ❌ AI-generated slop
- ❌ Duplicates of existing Shorts
- ❌ Content that undermines the brand (low-effort, manipulative, doomerism)

---

## Channel map — verified creators by pillar

These are YouTube channels (not specific Shorts) known to publish pillar-aligned Shorts. Use them as seeding sources — browse recent Shorts, oembed-verify before adding.

### AI Architecture & Build
| Channel | URL | Why |
|---|---|---|
| Andrej Karpathy | youtube.com/@AndrejKarpathy | LLM internals, architectural insights |
| Fireship | youtube.com/@Fireship | 60s tech framing, AI tool reviews |
| Theo - t3.gg | youtube.com/@t3dotgg | Full-stack + AI patterns, clear hot takes |
| sentdex | youtube.com/@sentdex | Python + AI from the ground up |
| Matthew Berman | youtube.com/@matthew_berman | LLM news + eval in short form |
| DeepLearningAI | youtube.com/@Deeplearningai | Andrew Ng's curated framing |
| Lex Fridman clips | youtube.com/@LexClips | Short excerpts from AI interviews |

### Creative AI & Music
| Channel | URL | Why |
|---|---|---|
| Suno AI (official) | youtube.com/@sunoai | AI music product moves |
| Futuretools.io (Matt Wolfe) | youtube.com/@mreflow | AI tool overviews |
| Wren Clair | youtube.com/@wrenclair | AI filmmaking process |
| Corridor Crew | youtube.com/@CorridorCrew | Creative AI experiments |
| Anne Reardon | youtube.com/@HowToCookThat | Craft standard — for comparison |

### Creator Economy & Strategy
| Channel | URL | Why |
|---|---|---|
| Ali Abdaal | youtube.com/@aliabdaal | Productive creator systems |
| Dan Koe | youtube.com/@thedankoe | Solopreneur philosophy |
| Hamza Ahmed | youtube.com/@hamzaahmed | Brand + discipline |
| MKBHD | youtube.com/@mkbhd | Taste + tech-adjacent creator standard |
| My First Million Clips | youtube.com/@MyFirstMillion | Business ideas condensed |

### Human Edge (Mindset & Growth)
| Channel | URL | Why |
|---|---|---|
| Andrew Huberman | youtube.com/@hubermanlab | Peak performance research |
| Chris Williamson | youtube.com/@ChrisWillx | Philosophy + discipline |
| Alex Hormozi | youtube.com/@AlexHormozi | High-agency mental models |
| Naval | youtube.com/@navalr | Wealth + wisdom clips |
| OptimalMind | (matches first Short in vault) | Physiology + energy |
| Tim Ferriss Clips | youtube.com/@tim.ferriss | Longevity + optimization |

### Culture & Signal
| Channel | URL | Why |
|---|---|---|
| a16z clips | youtube.com/@a16z | VC perspective, zeitgeist |
| Ben Thompson (Stratechery) | no YT Shorts | (source for written commentary, not Shorts) |
| Lenny's Podcast Clips | youtube.com/@LennysPodcast | Product/company culture |

---

## The research workflow (repeatable)

### Option A — Human-in-the-loop (recommended for quality)

1. **Browse a channel's Shorts tab** (desktop): e.g. `youtube.com/@hubermanlab/shorts`
2. **Shortlist 3-5 candidates** that clear the bar
3. **For each**, copy the Short URL
4. **Verify embed** via oembed:
   ```bash
   curl "https://www.youtube.com/oembed?url=<SHORT_URL>&format=json"
   ```
   - 200 + JSON = embeddable ✅
   - 401 / 404 / "Unauthorized" = skip ❌
5. **Write commentary** (2-3 sentences) — what framework does this teach, and why does a builder/creator need it?
6. **Append to `data/video-vault-100.json`**:
   ```json
   {
     "id": "<YT_ID>",
     "title": "<from oembed title>",
     "channel": "<from oembed author_name>",
     "author": "<from oembed author_name>",
     "url": "<original short URL>",
     "duration": "0:45",
     "category": "<one of the 5 pillar categories>",
     "format": "short",
     "uploadDate": "YYYY-MM-DD",
     "embeddable": true,
     "tags": ["tag1", "tag2", "short"],
     "commentary": "<2-3 sentences of Frank's take>"
   }
   ```
7. **Commit + sync to production**.

### Option B — Semi-automated via Notion inbox

1. On mobile: tap Share in YouTube → Notion → Video Inbox DB
2. Add Category + Note in Notion
3. Hourly GitHub Action pulls to `data/video-staging.json`
4. Frank reviews staging → promotes to vault with commentary
5. Auto-deploys on next push

(Requires `NOTION_TOKEN` + `NOTION_VIDEO_DB_ID` secrets — deferred until volume justifies.)

---

## Commentary writing guide

The commentary is the moat. It's what separates a curated library from a YouTube subscription feed.

**Formula**: `<Compress the insight into 1 sentence> + <Frame why it matters to a builder/creator> + <Optional: link to Frank's own pillar>.`

**Good examples**:
- _"Peak performance starts upstream of the prompt. Before you build the AI Architect's mind, fix the operator's body — energy is the substrate every great creator compounds from."_ (Mindset → links to Personal AI CoE narrative)
- _"The best agents aren't smarter — they're better-constrained. This Short captures what enterprise teams learn after 6 months of production LLM work in 45 seconds."_ (AI Agents → enterprise AI authority)

**Bad examples**:
- _"Great video about AI!"_ — zero signal
- _"I really liked this one."_ — personal not editorial
- _"Huberman explains sleep."_ — just describes, doesn't interpret

---

## Pillar balance target

As the library grows, aim for rough balance (not rigid):

| Pillar | Share | Why |
|---|---|---|
| AI Architecture & Build | 25-35% | Core authority pillar |
| Creative AI & Music | 15-25% | Creator identity, differentiator |
| Creator Economy & Strategy | 15-25% | Monetization + productization signal |
| Human Edge | 15-25% | Humanizes the brand, prevents "pure tech bro" |
| Culture & Signal | 10-15% | Keeps it current, relatable |

A 50-Short library following this split would be 12-18 AI, 8-12 Creative, 8-12 Creator, 8-12 Mindset, 5-8 Culture.

**First 10 Shorts should hit all 5 pillars** — signal to visitors that this isn't a single-topic channel.

---

## Current state (2026-04-15)

| Pillar | Shorts live | Target for v1 (10 Shorts) |
|---|---|---|
| AI Architecture & Build | 0 | 3 |
| Creative AI & Music | 0 | 2 |
| Creator Economy & Strategy | 0 | 2 |
| Human Edge | 1 | 2 |
| Culture & Signal | 0 | 1 |

**Next up (when Frank provides URLs)**: 9 more Shorts to hit the v1 bar.

---

## Submission form (proposed)

A lightweight form at `/watch/shorts/submit` would write to the Notion inbox via API. Fields:
- YouTube Short URL (required)
- Proposed category (dropdown of 5 pillars)
- Why it matters (text, 2-3 sentences — becomes draft commentary)
- Submitter email (optional — for reply if featured)

Deferred until Notion pipeline is active.

---

## For future Claude sessions

**Never**:
- Hallucinate a YouTube Short ID to save time. 404 = SEO damage.
- Add a Short without commentary. Thin content.
- Default everything to AI Architecture. The brand is broader.
- Skip oembed verification.

**Always**:
- Verify every Short via oembed before adding.
- Slot into one of the 5 pillars (or propose a 6th if the gap is real).
- Write commentary that would read well on its own.
- Balance the pillars over time.
