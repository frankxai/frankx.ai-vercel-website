# ACOS - Agentic Creator OS v11.0

**Visual Intelligence. Site Integrity. Quality at Scale.**

## System Status

Run diagnostic and display:

1. Count `.claude/trajectories/*.json` (exclude \_active, \_operations, patterns)
2. Read `.claude/trajectories/patterns.json` for pattern count
3. Read `.claude-flow/metrics/learning-status.json` for learning state
4. Read `data/audit/sitemap-health.json` for site health
5. Count `data/image-generation-log.json` entries for visual tracking

```
+================================================================+
|                    AGENTIC CREATOR OS v11.0                      |
|     "Visual Intelligence. Site Integrity. Quality at Scale."     |
+================================================================+
|  Skills: 22+ curated | Agents: 8 specialist | Profiles: 6 IAM  |
|  Hooks: 9 events | Intelligence: 93/100 | MCP: 6+ servers      |
|  Trajectories: [N] | Avg Success: [N%] | Patterns: [N]         |
|  Site Health: [N] pages | Blog Quality: [N]/100 avg             |
|  Visual Pipeline: [N] images | [N] pending review               |
|  Learning: Active | Audit: Immutable | Circuit Breaker: Armed   |
+================================================================+
```

## What's New in v11

### 1. Visual Quality System (5-Layer Enforcement)

Image generation now has 5 layers of quality enforcement — no more batch-generating without review:

| Layer | Mechanism | Enforcement |
| --- | --- | --- |
| CLAUDE.md | Rules section | Always loaded, sets expectations |
| Skill auto-trigger | `skill-rules.json` | Loads visual-creation on keywords |
| PreToolUse hook | `image-gen-precheck.js` | Warns about model tier, grounding, risks, batch limits, VIS dupes |
| PostToolUse hook | `image-gen-track.js` | Logs everything, warns about pending reviews, opens in Photos |
| Council agent | `visual-creation-council` | 3-lens scoring for premium content |

Three image types with different approaches:
- **Atmospheric**: Suppress text, describe mood/texture (blog heroes)
- **Informational**: Research every word via `/infogenius` (diagrams, infographics)
- **Branded**: Design-thinking 80/20, council review (covers, product shots)

### 2. Site Integrity Audit System

First comprehensive site health infrastructure:

| Asset | What's Tracked |
| --- | --- |
| `data/audit/broken-links.json` | Internal link health (816 links) |
| `data/audit/link-graph.json` | Page interconnection map (302 nodes, 742 edges) |
| `data/audit/blog-quality.json` | Per-article quality scores (118 articles) |
| `data/audit/product-delivery.json` | Product pipeline status (16 products) |
| `data/audit/orphan-triage.json` | Categorized orphan pages (5 tiers) |
| `data/audit/sitemap-health.json` | Page-level health by category |
| `data/audit/cta-funnel-audit.json` | CTA and funnel integrity (52 CTAs) |

Run `node scripts/pre-deploy-audit.mjs` before any deploy.
View dashboard at `/admin/site-health`.

### 3. Prompt Optimizer (Two-Model Pattern)

Step 3.5 in visual-creation pipeline: use a text model to enhance image prompts with missing visual details (lighting, texture, camera, composition) before sending to the image model. Research shows this improves prompt scores from ~49/100 to 95/100.

### 4. VIS Registry Dedup Check

PreToolUse hook now checks `data/visual-registry.json` (408 images) before generating — prevents duplicating existing assets.

### 5. Design Thinking Integration

The `design-thinking` skill enforces 80/20 (80% research/concepting, 20% generating) for all premium visual content. Auto-activates on cover, book cover, design, visual design, brand visual, album cover.

## v10 Intelligence Systems (Preserved)

| System | Purpose |
| --- | --- |
| Experience Replay | Injects top-2 similar successful trajectories as context |
| Agent IAM | Per-profile tool/directory scoping with least-privilege |
| Immutable Audit Trail | Append-only JSONL logging all tool use and decisions |
| Confidence Circuit Breaker | WARN at 3, RESTRICT at 5, BREAK at 8 failures per file |
| Conservative Self-Modify Gate | Snapshots config, auto-reverts if score drops >5 points |

## How It Works

You just talk. ACOS handles routing automatically.

```
Your request
    |
    v
ACOS Auto-Router (this command)
    |
    +-- "build a component"     --> Frontend Designer agent
    +-- "write a blog post"     --> Content Engine + SEO
    +-- "deploy to production"  --> DevOps pipeline
    +-- "create music"          --> Music Producer
    +-- "research AI trends"    --> Deep Research swarm
    +-- "build Arcanea world"   --> /ultraworld swarm
    +-- "write chapter 5"       --> /ultraworld Story Weaver
    +-- "review this PR"        --> Code Reviewer agent
    +-- "generate image"        --> Visual Quality Pipeline (NEW v11)
    +-- "audit the site"        --> Site Integrity System (NEW v11)
    +-- "optimize performance"  --> Performance analysis swarm
    +-- "complex multi-file"    --> Auto-spawns swarm (3+ files)
    +-- anything else           --> Smart routing via hooks
```

## Auto-Routing Rules

| Keywords Detected | Route | Agents |
| --- | --- | --- |
| build, component, ui, design | Frontend Designer | 1 agent |
| blog, article, content, write, seo | Content Engine | 1-2 agents |
| deploy, push, production, vercel | DevOps Engineer | 1 agent |
| music, suno, song, track | Music Producer | 1 agent |
| research, investigate, analyze | Deep Research | 2-3 agents |
| architecture, system, oracle | Technical Architect | 1 agent |
| image, visual, infographic, thumbnail | Visual Quality Pipeline | 1-2 agents |
| audit, health, integrity, broken links | Site Integrity | 1-3 agents |
| arcanea, gate, realm, guardian, seeker | Ultraworld | 3-7 agents |
| book, chapter, story, character | Ultraworld Story | 2-4 agents |
| complex, refactor, overhaul, redesign | Full Swarm | 5-8 agents |

## What Runs Automatically

9 hook events fire every session:

| Hook | What It Does |
| --- | --- |
| SessionStart | Trajectory created, learning restored, Starlight context |
| UserPromptSubmit | Skills activated, routing hints, domain classification |
| PreToolUse (Bash) | Agent IAM enforcement, git push TypeScript validation |
| PreToolUse (Image) | Model tier check, grounding check, risk patterns, VIS dedup, batch limit |
| PostToolUse (General) | Operations tracked, audit trail, success scoring |
| PostToolUse (Image) | Generation logged, pending reviews counted, image opened for review |
| Stop | Trajectory scored, patterns extracted, Starlight sync |
| PreCompact | Context preserved when window compresses |

## Self-Learning (Agentic Jujutsu)

Every session makes ACOS smarter:
- Operations recorded as trajectories (60+ stored)
- Success auto-scored on session end (67% avg)
- Patterns extracted from successful workflows (50+ n-grams)
- Experience Replay injects top-2 similar past successes
- Starlight Intelligence System syncs patterns across sessions
- Intelligence score: 93/100

## Quick Reference

### Primary Commands

| Command | Purpose |
| --- | --- |
| /acos | THIS. The auto-router. Start here. |
| /create-visual | Premium image generation with full pipeline |
| /infogenius | Research-grounded diagram/infographic generation |
| /ultraworld | Arcanea creative swarm world-building |
| /frankx-ai-build | Full FrankX build session |
| /frankx-ai-deploy | Deploy to frankx.ai |
| /superintelligence | Maximum reasoning depth |

### Quality & Monitoring

| Command | Purpose |
| --- | --- |
| /acos-score | Intelligence score report |
| /acos-monitor | Real-time activity dashboard |
| /vis-audit | Visual health audit |
| /vis-report | Visual intelligence report |

### Image Generation

| Command | When to Use |
| --- | --- |
| Just describe it | Quick atmospheric images (auto-routed) |
| /create-visual | Premium branded content (full 6-step pipeline) |
| /infogenius | Diagrams with accurate text (research-first) |
| /design-gods | Design excellence council (multi-agent) |
| /frankx-infogenius | FrankX brand premium visuals |

## Architecture

```
                           /acos v11
                              |
                 +------------+------------+
                 |            |            |
            FrankX AI    Ultraworld    Intelligence
            (Build)      (Create)      (Think)
                 |            |            |
            +---+---+   +---+---+   +---+---+
            |   |   |   |   |   |   |   |   |
           Blog UI SEO World Book Game Star Super
           Eng Des Int  Arch Weav Des light intel

  +-------------- Visual Quality Layer (NEW) --------+
  |  PreCheck | Council | VIS Dedup | Prompt Optimize |
  +----------------------------------------------+
  +------------- Site Integrity Layer (NEW) ---------+
  |  Link Audit | Blog QA | Product QA | CTA Audit  |
  +----------------------------------------------+
  +---------------- Safety Layer -----------------+
  |  Agent IAM | Circuit Breaker | Audit Trail    |
  +-----------------------------------------------+
  +------------- Intelligence Layer ---------------+
  |  Experience Replay | Starlight Sync | Score 93 |
  +-----------------------------------------------+
```

Just describe what you want. ACOS handles the rest.
