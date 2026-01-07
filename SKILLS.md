# FrankX Skills Library
**Universal Reference for All AI Agents**

> This file provides a unified skills reference for Claude, Codex, Gemini, and OpenCode.
> All skills are located in `.claude-skills/` and use the SKILL.md format.

---

## Quick Start

### How to Use Skills

**For Claude Code**: Skills auto-activate via hooks, or use `/skill [name]`

**For Codex, Gemini, OpenCode**: Read the skill file directly:
```
.claude-skills/[category]/[skill-name]/SKILL.md
```

### Most Used Skills
```bash
frankx-brand              # Voice & style for ALL content
mcp-architecture          # MCP server design
nextjs-react-expert       # Next.js 15 development
suno-prompt-architect     # AI music creation
frankx-daily-execution    # Daily productivity
```

---

## Complete Skills Inventory (52 Skills)

### Technical Skills (10)

| Skill | Path | Description |
|-------|------|-------------|
| `mcp-architecture` | `technical/mcp-architecture/` | MCP server design & implementation |
| `claude-sdk` | `technical/claude-sdk/` | Claude Agent SDK patterns |
| `langgraph-patterns` | `technical/langgraph-patterns/` | LangGraph workflow orchestration |
| `openai-agentkit` | `technical/openai-agentkit/` | OpenAI Agents SDK |
| `oracle-adk` | `technical/oracle-adk/` | Oracle Agent Development Kit |
| `oracle-agent-spec` | `technical/oracle-agent-spec/` | Oracle Agent Specification |
| `nextjs-react-expert` | `technical/nextjs-react-expert/` | Next.js 15 / React 19 patterns |
| `framer-expert` | `technical/framer-expert/` | Framer & Framer Motion |
| `ui-ux-design-expert` | `technical/ui-ux-design-expert/` | UI/UX best practices |
| `oracle-database-expert` | `technical/oracle-database-expert/` | Oracle DB optimization |

### Business Skills (2)

| Skill | Path | Description |
|-------|------|-------------|
| `oci-services-expert` | `business/oci-services-expert/` | Oracle Cloud Infrastructure |
| `product-management-expert` | `business/product-management-expert/` | Product strategy & roadmaps |

### Creative Skills (7)

| Skill | Path | Description |
|-------|------|-------------|
| `frankx-brand` | `creative/frankx-brand/` | FrankX voice, style, brand standards |
| `frankx-content` | `creative/frankx-content/` | Content creation patterns |
| `golden-age-book-writing` | `creative/golden-age-book-writing/` | Book writing with 9-author council |
| `suno-ai-mastery` | `creative/suno-ai-mastery/` | Suno AI music generation |
| `suno-prompt-architect` | `creative/suno-prompt-architect/` | Suno prompt engineering |
| `social-media-strategy` | `creative/social-media-strategy/` | Social content strategy |
| `video-production-workflow` | `creative/video-production-workflow/` | Video creation workflow |

### Personal Skills (4)

| Skill | Path | Description |
|-------|------|-------------|
| `greek-philosopher` | `personal/greek-philosopher/` | Philosophical inquiry & wisdom |
| `spartan-warrior` | `personal/spartan-warrior/` | Discipline & mental fortitude |
| `gym-training-expert` | `personal/gym-training-expert/` | Fitness optimization |
| `health-nutrition-expert` | `personal/health-nutrition-expert/` | Nutrition science |

### Project Skills (2)

| Skill | Path | Description |
|-------|------|-------------|
| `arcanea-lore` | `projects/arcanea-lore/` | Arcanea fantasy world lore |
| `frankx-daily-execution` | `projects/frankx-daily-execution/` | Daily productivity system |

### Soulbook Skills (25+)

The Creator's Soulbook system for life design.

#### Life Books
| Skill | Path | Description |
|-------|------|-------------|
| `soulbook` | `soulbook/` | Main Soulbook overview |
| `life-symphony` | `soulbook/life-symphony/` | For artists - 7 Movements |
| `golden-path` | `soulbook/golden-path/` | For seekers - 7 Waypoints |
| `7-pillars` | `soulbook/7-pillars/` | For builders - 7 Pillars |

#### The 7 Pillars
| Pillar | Path | Focus |
|--------|------|-------|
| `energy` | `soulbook/7-pillars/energy/` | Physical foundation |
| `mind` | `soulbook/7-pillars/mind/` | Mental clarity |
| `soul` | `soulbook/7-pillars/soul/` | Values & purpose |
| `craft` | `soulbook/7-pillars/craft/` | Skills & mastery |
| `capital` | `soulbook/7-pillars/capital/` | Resources & freedom |
| `circle` | `soulbook/7-pillars/circle/` | Relationships |
| `legacy` | `soulbook/7-pillars/legacy/` | Integration & impact |

#### AI Coaching Agents
| Agent | Path | Role |
|-------|------|------|
| `lifesmith` | `soulbook/agents/lifesmith/` | Forges foundations |
| `soul-composer` | `soulbook/agents/soul-composer/` | Composes life symphony |

#### Personal Coaching (12 areas)
Located in `soulbook-personal/`:
- health-fitness, intellectual-life, emotional-life, character
- spiritual-life, love-relationship, parenting, social-life
- financial-life, career, quality-of-life, life-vision

---

## Agent-Skill Matrix

Which skills each agent primarily uses:

| Agent | Primary Skills | Secondary Skills |
|-------|----------------|------------------|
| **Claude** | frankx-brand, frankx-content, golden-age-book-writing | soulbook/* |
| **Codex** | mcp-architecture, claude-sdk, oracle-* | nextjs-react-expert |
| **Gemini** | nextjs-react-expert, ui-ux-design-expert, framer-expert | oracle-database-expert |
| **OpenCode** | All technical skills | Rapid prototyping |

---

## Directory Structure

```
.claude-skills/
├── README.md                    # Full documentation
├── technical/                   # 10 technical skills
│   ├── mcp-architecture/
│   ├── claude-sdk/
│   ├── langgraph-patterns/
│   ├── openai-agentkit/
│   ├── oracle-adk/
│   ├── oracle-agent-spec/
│   ├── nextjs-react-expert/
│   ├── framer-expert/
│   ├── ui-ux-design-expert/
│   └── oracle-database-expert/
├── business/                    # 2 business skills
│   ├── oci-services-expert/
│   └── product-management-expert/
├── creative/                    # 7 creative skills
│   ├── frankx-brand/
│   ├── frankx-content/
│   ├── golden-age-book-writing/
│   ├── suno-ai-mastery/
│   ├── suno-prompt-architect/
│   ├── social-media-strategy/
│   └── video-production-workflow/
├── personal/                    # 4 personal skills
│   ├── greek-philosopher/
│   ├── spartan-warrior/
│   ├── gym-training-expert/
│   └── health-nutrition-expert/
├── projects/                    # 2 project skills
│   ├── arcanea-lore/
│   └── frankx-daily-execution/
├── soulbook/                    # Life design system
│   ├── life-symphony/
│   ├── golden-path/
│   ├── 7-pillars/
│   │   ├── energy/
│   │   ├── mind/
│   │   ├── soul/
│   │   ├── craft/
│   │   ├── capital/
│   │   ├── circle/
│   │   └── legacy/
│   └── agents/
│       ├── lifesmith/
│       └── soul-composer/
├── soulbook-personal/          # Personal coaching
└── soulbook-community/         # Community frameworks
```

---

## Skill File Format

Each skill uses this structure:

```markdown
---
name: Skill Name
description: Brief description
version: 1.0.0
---

# Skill Name

## Purpose
What this skill helps you accomplish.

## Core Knowledge
Key concepts and patterns.

## Examples
Practical examples and templates.

## Best Practices
Guidelines for using this skill effectively.
```

---

## Creating New Skills

1. Create folder: `.claude-skills/[category]/[skill-name]/`
2. Add `SKILL.md` with the standard format
3. Update the registry: `.claude-skills/registry/SKILL_REGISTRY.md`
4. Update this file (SKILLS.md)

---

*All AI agents in the FrankX ecosystem share this skills library.*
