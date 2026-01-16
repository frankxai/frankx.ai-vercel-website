# FrankX AI Agent System
**Multi-Agent Collaboration for Creator Transformation**

> This file serves as the central reference for all AI agents working in the FrankX ecosystem.
> Works with: Claude, Codex, Gemini, OpenCode

---

## Quick Reference

### Launch Commands (WSL)

| Project | Claude | Codex | Gemini | OpenCode |
|---------|--------|-------|--------|----------|
| **FrankX** | `cfx` | `cxfx` | `gfx` | `ofx` |
| **Arcanea** | `carc` | `cxarc` | `garc` | `oarc` |
| **AI Music** | `cmusic` | `cxmusic` | `gmusic` | `omusic` |

All aliases use max-autonomy flags. See `~/.bashrc` for full list.

### Agent Configuration Files

| Agent | Config File | Role |
|-------|-------------|------|
| Claude | `CLAUDE.md` | Story & Resonance Lead |
| Codex | `CODEX.md` | Systems Architect |
| Gemini | `GEMINI.md` | Guardian Engineer |
| OpenCode | `OPENCODE.md` | Autonomous Builder |

### Shared Resources

| Resource | File | Purpose |
|----------|------|---------|
| Skills Library | `SKILLS.md` | All 52 skills reference |
| Agent Protocol | `agents/AGENT_PROTOCOL.md` | Handoff procedures |
| Business Agents | `agents/business-agents.md` | Marketing specialists |

---

## Core Agent Team

### Claude - Story & Resonance Lead
**File**: `CLAUDE.md`

**Mission**: Translate Frank's musician-technologist journey into language, prompts, and experiences that turn overwhelmed creators into confident, AI-empowered artists.

**Primary Skills**:
- `frankx-brand` - Voice & style standards
- `frankx-content` - Content creation
- `golden-age-book-writing` - Book writing
- `soulbook/*` - Life design coaching

**Best For**:
- All creator-facing copy and content
- Brand voice and messaging
- Narrative design and storytelling
- Book and course content

---

### Codex - Systems Architect
**File**: `CODEX.md`

**Mission**: Design and build the technical foundations that power the FrankX creator ecosystem.

**Primary Skills**:
- `mcp-architecture` - MCP server design
- `claude-sdk` - Agent SDK patterns
- `oracle-*` - Oracle Cloud & database
- `nextjs-react-expert` - Web architecture

**Best For**:
- System architecture decisions
- API and data model design
- Complex technical planning
- Integration architecture

---

### Gemini - Guardian Engineer
**File**: `GEMINI.md`

**Mission**: Keep the FrankX.ai creator experience fast, accessible, and reliable.

**Primary Skills**:
- `nextjs-react-expert` - Implementation
- `ui-ux-design-expert` - Design systems
- `framer-expert` - Animations
- Quality & testing expertise

**Best For**:
- Feature implementation
- Quality assurance
- Performance optimization
- Accessibility audits

---

### OpenCode - Autonomous Builder
**File**: `OPENCODE.md`

**Mission**: Rapidly prototype, iterate, and ship features for the FrankX creator ecosystem.

**Primary Skills**:
- All technical skills
- Rapid prototyping focus
- Cross-stack capability

**Best For**:
- Quick prototypes and MVPs
- Exploratory development
- Bug fixing and debugging
- Utility scripts and tools

---

## Specialized Agents

Activate these for specific workflows:

| Agent | Activation | Use Case |
|-------|------------|----------|
| **Technical Translator** | "Activate Technical Translator" | Making AI accessible for creators |
| **Frequency Alchemist** | "Channel Frequency Alchemist" | Suno music sessions, Vibe OS |
| **Creation Engine** | "Engage Creation Engine" | Content & product development |
| **Soul Strategist** | "Consult Soul Strategist" | Transformation journey design |

---

## Business Agents

For website, marketing, and growth work. See `agents/business-agents.md`.

| Agent | Focus |
|-------|-------|
| Brand Architect | Visual identity & design |
| Conversion Engineer | Funnels & landing pages |
| SEO Dominator | Search visibility |
| Product Alchemist | Product strategy |
| Performance Guardian | Site speed |
| Content Strategist | Editorial planning |
| Market Intelligence | Competitive analysis |

---

## Multi-Agent Workflows

### Feature Development
```
1. Claude    -> Define user story and copy needs
2. Codex     -> Design architecture and specs
3. OpenCode  -> Build prototype
4. Gemini    -> QA, polish, ship
5. Claude    -> Documentation and announcement
```

### Content Launch
```
1. Claude    -> Write content (blog, course, etc.)
2. Gemini    -> Build UI components
3. SEO Agent -> Optimize for search
4. Claude    -> Social content
5. Gemini    -> Deploy and monitor
```

### Bug Fix
```
1. OpenCode  -> Investigate and fix
2. Gemini    -> Review and test
3. Codex     -> Architecture review (if needed)
```

---

## Handoff Protocol

### Standard Handoff Template
```markdown
## Handoff: [Feature/Task Name]
**From**: [Agent Name]
**To**: [Agent Name]
**Status**: [Ready / Needs Review / Blocked]

### What's Done
- [Completed work]

### What's Needed
- [Next steps for receiving agent]

### Files Changed
- [List of files]

### Notes
- [Context, decisions, blockers]
```

### Priority Levels
| Level | Description | Response Time |
|-------|-------------|---------------|
| P0 | Production down | Immediate |
| P1 | Major feature blocked | Same session |
| P2 | Normal development | Next session |
| P3 | Nice to have | Backlog |

---

## Skills Access

All agents share the same skills library at `.claude-skills/`.

See `SKILLS.md` for the complete 52-skill inventory.

### Quick Skill Lookup
```bash
# Read any skill
cat .claude-skills/[category]/[skill-name]/SKILL.md

# Examples
cat .claude-skills/creative/frankx-brand/SKILL.md
cat .claude-skills/technical/mcp-architecture/SKILL.md
cat .claude-skills/soulbook/7-pillars/energy/SKILL.md
```

---

## Agent Selection Guide

**Use Claude when**:
- Writing any creator-facing content
- Need brand voice consistency
- Creating courses, books, marketing copy
- Designing user journeys

**Use Codex when**:
- Planning system architecture
- Designing APIs and data models
- Making technical decisions
- Building MCP servers or agents

**Use Gemini when**:
- Implementing features from specs
- Running QA and testing
- Optimizing performance
- Ensuring accessibility

**Use OpenCode when**:
- Need a quick prototype
- Exploring implementation options
- Fixing bugs fast
- Building internal tools

---

## Emergency Protocol

### Production Issue
1. Acknowledge and assess severity
2. OpenCode or Gemini investigates
3. Rollback if needed
4. Fix and deploy
5. Post-mortem with all agents

### Security Issue
1. Assess exposure (Codex)
2. Patch immediately (Gemini)
3. Deploy without disclosure
4. Document and notify if needed

---

*The FrankX Agent System: Four minds, one mission - empower creators.*
