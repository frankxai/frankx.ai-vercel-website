# FrankX Blog Content Schema

## Approved Categories (5 Only)

| Category | Purpose | Editorial Day | Examples |
|----------|---------|---------------|----------|
| **Creator Systems** | Workflows, OS design, automation, productivity frameworks | Monday | Agentic Creator OS, Creative OS, SEO Masterplan |
| **Vibe Sessions** | Music production, Suno AI, state engineering, sonic rituals | Wednesday | Music as Consciousness, State Change Science |
| **Intelligence Dispatches** | AI strategy, Golden Age vision, enterprise insights | Friday | Intelligence Revolution, AI Guides, Roadmaps |
| **Creativity** | Purpose-driven AI, personal stories, creative systems | Special | Creative Frequency, AI Doesn't Have to Be Soulless |
| **Flagship** | Major reports, atlases, comprehensive multi-chapter guides | Flagship | Intelligence Atlas, Golden Age Atlas |

## Required Frontmatter Schema

```yaml
---
title: "" # Max 60 chars for SEO
description: "" # Max 160 chars for SEO meta description
date: "YYYY-MM-DD" # ISO format
author: "FrankX" # Always FrankX unless guest
category: "" # One of 5 approved categories above
tags: [] # 3-5 tags, lowercase-kebab-case preferred
image: "/images/blog/..." # Hero image path
featured: false # true for pillar content
keywords: [] # SEO keywords (optional)
readingGoal: "" # "You'll learn..." statement (optional)
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
