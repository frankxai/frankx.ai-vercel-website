# FrankX Blog Content Schema

## Approved Categories

| Category | Purpose | Editorial Day | Examples |
|----------|---------|---------------|----------|
| **AI Architecture** | System design, multi-agent frameworks, model routing, MCP | Monday | AI Architecture Patterns, MCP Server Guides |
| **Enterprise AI** | Enterprise deployment, OCI GenAI, governance, LLM evaluation | Tuesday | Production LLM Agents on OCI, Bedrock Patterns |
| **Creator Systems** | Workflows, OS design, automation, productivity frameworks | Wednesday | Agentic Creator OS, Creative OS, SEO Masterplan |
| **Music Intelligence** | Music production, Suno AI, state engineering, sonic rituals | Thursday | Suno AI Music Production, State Change Science |
| **Intelligence Dispatches** | AI strategy, frontier models, benchmark analysis, hardware | Friday | Frontier Model Landscape 2026, RTX 5090 Guide |
| **Creativity** | Purpose-driven AI, personal stories, creative systems | Weekend | AI Doesn't Have to Be Soulless, Life Architecture |
| **Flagship** | Major reports, atlases, comprehensive multi-chapter guides | Special | Intelligence Atlas, Golden Age of Intelligence |
| **Consciousness** | Human-AI alignment, mind models, perception, sovereign AI | Special | Predictive Mind Reality Models, Coherence |

## Required Frontmatter Schema

```yaml
---
title: "" # Max 75 chars for SEO & social cards
description: "" # 120-160 chars for SEO meta description
date: "YYYY-MM-DD" # ISO format
lastUpdated: "YYYY-MM-DD" # Freshness signal
author: "FrankX" # Always FrankX unless guest
category: "" # One of approved categories above
tags: [] # 3-5 tags, lowercase-kebab-case preferred
image: "/images/blog/editorial/headers/ai-model-routing-guide-hero.webp" # Hero image path
featured: false # true for pillar content
readingGoal: "You'll learn..." # Benefit-driven outcome statement
tldr: "Executive summary for AI extraction & fast readers" # 50-70 words
keywords: [] # SEO & semantic search keywords
---
```

## Tag Guidelines

- Use lowercase or Title Case consistently (prefer lowercase-kebab-case)
- Maximum 5 tags per article
- Reuse existing tags before creating new ones
- Core tags: `ai-strategy`, `music`, `creativity`, `automation`, `suno-ai`, `vibe-os`, `creator-os`, `golden-age`

## File Naming

- Use descriptive slugs: `science-of-state-change-music.mdx`
- NO numbered prefixes: ~~`01-article-name.mdx`~~
- All lowercase with hyphens

## Quality Checklist

- [ ] Title under 60 characters
- [ ] Description under 160 characters
- [ ] Category is one of 5 approved
- [ ] 3-5 relevant tags
- [ ] Featured image exists at specified path
- [ ] Internal links to 3+ related articles
- [ ] readingGoal explains what reader will gain
