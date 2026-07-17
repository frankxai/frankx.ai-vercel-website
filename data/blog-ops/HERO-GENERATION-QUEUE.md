# FrankX Hero Generation Queue (v11) — LIVE RESYNC

**Resynced:** 2026-07-15 13:29 UTC  
**Source of truth:** disk `public/images/blog/*-hero-v11.jpg` + `data/blog-ops/article-registry-master.json`  
**Repo:** `frankx.ai-vercel-website` · branch `codex/blog`

## Snapshot

| Metric | Count |
|---|---:|
| v11 heroes on disk | **28** |
| `generate_hero` actions remaining | **0** |
| `replace_svg` actions remaining | **0** |
| header_class missing | **3** |
| header_class svg_or_visual_system | **0** |

> Earlier subagent snapshot (20 complete / 17 remaining) is **stale**. This file is the live resync after the full nano-banana batch.

## Status: priority published queue CLEARED

All previously flagged published posts needing generate/replace have v11 heroes wired. Remaining missing rows are **drafts** only.

### Still missing (drafts / incomplete)

- `_drafts/higher-self-protocol-part-2-reading-slowly` — draft_complete_or_archive — Reading Slowly With a Machine: AI-Assisted Lectio Divina for Any Tradition
- `_drafts/higher-self-protocol-part-3-attention-gym` — draft_complete_or_archive — The Attention Gym: Training the Mind With AI, the Buddha, and the Stoics
- `_drafts/higher-self-protocol-part-4-help-a-friend` — draft_complete_or_archive — How to Help a Friend Become a Saint (and Maybe a Million People)

## Completed v11 on disk

| # | Slug | Path |
|---:|---|---|
| 1 | `acos-philosophy-technology-amplifies` | `public/images/blog/acos-philosophy-technology-amplifies-hero-v11.jpg` |
| 2 | `acos-zero-to-production-quickstart` | `public/images/blog/acos-zero-to-production-quickstart-hero-v11.jpg` |
| 3 | `agentic-ai-roadmap-2025` | `public/images/blog/agentic-ai-roadmap-2025-hero-v11.jpg` |
| 4 | `ai-engineering-without-hype-willison` | `public/images/blog/ai-engineering-without-hype-willison-hero-v11.jpg` |
| 5 | `ai-health-fitness-athletes-creators-2026` | `public/images/blog/ai-health-fitness-athletes-creators-2026-hero-v11.jpg` |
| 6 | `best-ai-superpowers-stack-2026` | `public/images/blog/best-ai-superpowers-stack-2026-hero-v11.jpg` |
| 7 | `best-elevenlabs-alternatives-2026` | `public/images/blog/best-elevenlabs-alternatives-2026-hero-v11.jpg` |
| 8 | `brand-evolution-from-consciousness-to-systems` | `public/images/blog/brand-evolution-from-consciousness-to-systems-hero-v11.jpg` |
| 9 | `building-custom-skills-acos` | `public/images/blog/building-custom-skills-acos-hero-v11.jpg` |
| 10 | `claude-opus-4-8-analysis-2026` | `public/images/blog/claude-opus-4-8-analysis-2026-hero-v11.jpg` |
| 11 | `conscious-ai-for-entrepreneurs` | `public/images/blog/conscious-ai-for-entrepreneurs-hero-v11.jpg` |
| 12 | `conscious-ai-integration-operating-system` | `public/images/blog/conscious-ai-integration-operating-system-hero-v11.jpg` |
| 13 | `cursor-vs-claude-code-vs-windsurf-2026` | `public/images/blog/cursor-vs-claude-code-vs-windsurf-2026-hero-v11.jpg` |
| 14 | `deepseek-r1-open-weight-reasoning-analysis` | `public/images/blog/deepseek-r1-open-weight-reasoning-analysis-hero-v11.jpg` |
| 15 | `design-sprint-week-10-visual-identity-competition` | `public/images/blog/design-sprint-week-10-visual-identity-competition-hero-v11.jpg` |
| 16 | `faceless-youtube-ai-tools-2026` | `public/images/blog/faceless-youtube-ai-tools-2026-hero-v11.jpg` |
| 17 | `mistral-large-3-analysis-2026` | `public/images/blog/mistral-large-3-analysis-2026-hero-v11.jpg` |
| 18 | `multi-agent-orchestration-patterns-2026` | `public/images/blog/multi-agent-orchestration-patterns-2026-hero-v11.jpg` |
| 19 | `ollama-vs-lm-studio-vs-jan-2026` | `public/images/blog/ollama-vs-lm-studio-vs-jan-2026-hero-v11.jpg` |
| 20 | `personal-ai-coe-under-100-2026` | `public/images/blog/personal-ai-coe-under-100-2026-hero-v11.jpg` |
| 21 | `suno-vs-udio-2026` | `public/images/blog/suno-vs-udio-2026-hero-v11.jpg` |
| 22 | `the-sovereign-curator` | `public/images/blog/the-sovereign-curator-hero-v11.jpg` |
| 23 | `ultimate-canva-ai-workflow-2026` | `public/images/blog/ultimate-canva-ai-workflow-2026-hero-v11.jpg` |
| 24 | `ultimate-descript-workflow-2026` | `public/images/blog/ultimate-descript-workflow-2026-hero-v11.jpg` |
| 25 | `ultimate-elevenlabs-workflow-2026` | `public/images/blog/ultimate-elevenlabs-workflow-2026-hero-v11.jpg` |
| 26 | `ultimate-gamma-workflow-2026` | `public/images/blog/ultimate-gamma-workflow-2026-hero-v11.jpg` |
| 27 | `ultimate-opus-clip-workflow-2026` | `public/images/blog/ultimate-opus-clip-workflow-2026-hero-v11.jpg` |
| 28 | `using-elevenlabs-for-faceless-youtube-channels-and-higgsfield-for-b-roll` | `public/images/blog/using-elevenlabs-for-faceless-youtube-channels-and-higgsfield-for-b-roll-hero-v11.jpg` |

## Command pattern (for any future heroes)

```bash
# load GEMINI_API_KEY from .env.local, then:
npm run image:generate -- --provider nano-banana --prompt "FrankX premium blog hero, 16:9... Subject metaphor: {METAPHOR}" --output public/images/blog/{slug}-hero-v11.jpg
```

Wire frontmatter `image`, log prompt under `data/blog-ops/prompt-log/{slug}.md`, then:

```bash
python data/blog-ops/resync_after_v11.py
```

## Next ops (not hero gen)

1. Visual QA pass all 28 v11 exports (26/30 ship gate)
2. Content accuracy swarm (maker≠checker) on tool posts
3. Social packs for flagships — see SOCIAL-DISTRIBUTION-OS.md
4. Draft PR when ready
