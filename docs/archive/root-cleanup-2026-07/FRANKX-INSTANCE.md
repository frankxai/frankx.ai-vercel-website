# FrankX Instance
**Personal Customization of Agentic Creator OS**

> "Translate Frank's musician-technologist journey into code, systems, and experiences that turn overwhelmed creators into confident, AI-empowered artists."

---

## Instance Identity

| Attribute | Value |
|-----------|-------|
| **Name** | FrankX |
| **Mission** | Creator transformation through AI-empowered workflows |
| **Creator** | Frank (musician-technologist) |
| **Voice** | Studio energy - cinematic, intimate, technically warm |
| **Audience** | Independent creators (musicians, writers, builders) |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FRANKX INSTANCE ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     AGENTIC CREATOR OS LAYER                      │  │
│  │              (Framework - shared with others)                     │  │
│  │   CREATOR-OS.md • Multi-Agent Protocol • Skills System            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     FRANKX PERSONAL LAYER                         │  │
│  │              (This file - your customization)                     │  │
│  │                                                                   │  │
│  │  • CLAUDE.md         → Story & Resonance Lead                     │  │
│  │  • OPENCODE.md       → Autonomous Builder                         │  │
│  │  • GEMINI.md         → Guardian Engineer                          │  │
│  │  • AGENTS.md         → Multi-agent coordination                   │  │
│  │  • SKILLS.md         → 52 skills library                          │  │
│  │  • .opencode/oh-my-opencode.json → OpenCode config               │  │
│  │                                                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      EXECUTION LAYER                              │  │
│  │          Claude CLI • OpenCode • Codex • Gemini CLI               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Team

### Claude (Story & Resonance Lead)

**File**: `CLAUDE.md`

**Role**: Translate Frank's journey into language and experiences that empower creators.

**Core Identity**:
- **Voice**: Cinematic, intimate, studio-rooted
- **Mission**: Every creator-facing output should build confidence
- **Skills**: `frankx-brand`, `frankx-content`, `golden-age-book-writing`

**Specialized Agents**:
- Technical Translator - Makes AI accessible
- Frequency Alchemist - Suno music sessions
- Creation Engine - Content & product development
- Soul Strategist - Transformation journey design

---

### OpenCode (Autonomous Builder)

**File**: `OPENCODE.md`

**Role**: Rapidly prototype, iterate, and ship features for the FrankX ecosystem.

**Core Identity**:
- **Personality**: Fast, pragmatic, solution-oriented
- **Mission**: Working code beats perfect plans
- **Skills**: All technical skills for rapid prototyping

**Magic Words**:
- `ultrawork` / `ulw` → Fire ALL agents in parallel
- `ultracode` / `ulc` → Coding agents (architect + coder + reviewer)

---

### Gemini (Guardian Engineer)

**File**: `GEMINI.md`

**Role**: Keep the FrankX creator experience fast, accessible, and reliable.

**Core Identity**:
- **Focus**: Implementation, quality, performance
- **Mission**: Creator experience is paramount
- **Skills**: `nextjs-react-expert`, `ui-ux-design-expert`, `framer-expert`

---

### Codex (Systems Architect)

**File**: `agents/codex.md`

**Role**: Design and build technical foundations for the FrankX creator ecosystem.

**Core Identity**:
- **Focus**: Architecture, APIs, integrations
- **Mission**: Scalable, elegant systems
- **Skills**: `mcp-architecture`, `claude-sdk`, `oracle-*`

---

## Multi-Agent Coordination

**File**: `AGENTS.md`

### Workflows

| Workflow | Sequence | Purpose |
|----------|----------|---------|
| **Feature Development** | Claude → Codex → OpenCode → Gemini → Claude | New features |
| **Content Launch** | Claude → Gemini → SEO → Claude → Gemini | Blog/courses |
| **Bug Fix** | OpenCode → Gemini → Codex (if needed) | Issue resolution |

### Handoff Protocol

All agent handoffs use this template:

```markdown
## Handoff: [Feature/Task Name]
**From**: [Agent Name]
**To**: [Agent Name]
**Status**: [Ready / Needs Review / Blocked]

### What's Done
- [Completed work]

### What's Needed
- [Next steps]

### Files Changed
- [List]

### Notes
- [Context]
```

### Priority Levels

| Level | Description | Response |
|-------|-------------|----------|
| P0 | Production down | Immediate |
| P1 | Major blocked | Same session |
| P2 | Normal | Next session |
| P3 | Nice to have | Backlog |

---

## Skills Library (52 Skills)

**File**: `SKILLS.md`

### Technical Skills (10)

| Skill | Path | Purpose |
|-------|------|---------|
| `mcp-architecture` | `technical/mcp-architecture/` | MCP server design |
| `claude-sdk` | `technical/claude-sdk/` | Claude Agent SDK |
| `langgraph-patterns` | `technical/langgraph-patterns/` | LangGraph workflows |
| `openai-agentkit` | `technical/openai-agentkit/` | OpenAI Agents SDK |
| `oracle-adk` | `technical/oracle-adk/` | Oracle ADK |
| `oracle-agent-spec` | `technical/oracle-agent-spec/` | Agent spec |
| `nextjs-react-expert` | `technical/nextjs-react-expert/` | Next.js 15 |
| `framer-expert` | `technical/framer-expert/` | Framer Motion |
| `ui-ux-design-expert` | `technical/ui-ux-design-expert/` | UI/UX |
| `oracle-database-expert` | `technical/oracle-database-expert/` | Oracle DB |

### Creative Skills (7)

| Skill | Path | Purpose |
|-------|------|---------|
| `frankx-brand` | `creative/frankx-brand/` | Brand voice |
| `frankx-content` | `creative/frankx-content/` | Content creation |
| `golden-age-book-writing` | `creative/golden-age-book-writing/` | Books |
| `suno-ai-mastery` | `creative/suno-ai-mastery/` | Music AI |
| `suno-prompt-architect` | `creative/suno-prompt-architect/` | Music prompts |
| `social-media-strategy` | `creative/social-media-strategy/` | Social content |
| `video-production-workflow` | `creative/video-production-workflow/` | Video |

### Soulbook Skills (25+)

Life design system with 7 pillars:
- Energy, Mind, Soul, Craft, Capital, Circle, Legacy

### Personal Skills (4)

| Skill | Purpose |
|-------|---------|
| `greek-philosopher` | Wisdom & inquiry |
| `spartan-warrior` | Discipline & courage |
| `gym-training-expert` | Fitness |
| `health-nutrition-expert` | Nutrition |

---

## Brand Voice Guide

**File**: `.claude-skills/creative/frankx-brand/SKILL.md`

### Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Cinematic** | Paint vivid pictures | "Studio lights snap on at 2 AM" |
| **Intimate** | Direct to creator | "You know that moment..." |
| **Studio-Rooted** | Creative practice | "Like arranging a track..." |
| **Technically Warm** | Complex but accessible | "Like a producer balancing stems" |

### Words to Use

```
Create, craft, build, compose, architect, orchestrate
Flow, rhythm, resonance, frequency, vibe
Transform, empower, amplify, elevate
Session, ritual, practice, journey
Authentic, soul-aligned, conscious
```

### Words to Avoid

```
Disrupt, revolutionary, game-changing
Synergy, leverage, utilize
Cheap, easy, simple
Automate everything
Just, merely, simply
```

### Colors

| Category | Colors |
|----------|--------|
| Conscious/Spiritual | #8B5CF6 (purple) |
| AI/Tech | #06B6D4 (cyan) |
| Music/Creativity | #F97316 (orange) |
| Growth/Personal | #10B981 (green) |
| Backgrounds | #0F172A, #1E293B (navy) |
| Accents | #AB47C7, #43BFE3, #F59E0B |

---

## OpenCode Configuration

**File**: `.opencode/oh-my-opencode.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",
  "agents": {
    "Sisyphus": {
      "prompt_append": "\n\n## IDENTITY OVERRIDE\nYou are FrankX, NOT Sisyphus. [Full brand voice...]"
    },
    "librarian": { "prompt_append": "[FrankX enhancements]" },
    "explore": { "prompt_append": "[FrankX enhancements]" },
    "oracle": { "prompt_append": "[FrankX enhancements]" },
    "frontend-ui-ux-engineer": { "prompt_append": "[FrankX design system]" },
    "document-writer": { "prompt_append": "[FrankX documentation voice]" }
  }
}
```

---

## CLI Aliases

### WSL (`.bashrc`)

```bash
alias opencode-frankx='cd "/mnt/c/Users/Frank/FrankX" && opencode --trust'
alias claude-frankx='cd "/mnt/c/Users/Frank/FrankX" && claude --dangerously-skip-permissions'
alias codex-frankx='cd "/mnt/c/Users/Frank/FrankX" && codex --dangerously-bypass-approvals-and-sandbox'
alias gemini-frankx='cd "/mnt/c/Users/Frank/FrankX" && gemini --yolo'
alias cfx='claude-frankx'
alias cxfx='codex-frankx'
alias gfx='gemini-frankx'
alias ofx='opencode-frankx'
```

### PowerShell (`cli-aliases.ps1`)

```powershell
$ProjectPaths = @{
    FrankX = "C:\Users\Frank\FrankX"
}

$YOLO = "--dangerously-skip-permissions"
$YOLO_OPENCODE = "--trust"

function ofx { Set-Location $ProjectPaths.FrankX; opencode $YOLO_OPENCODE }
function cfx { Set-Location $ProjectPaths.FrankX; claude $YOLO }
```

---

## Quick Reference

### Starting a Session

```bash
# In WSL or PowerShell
ofx    # OpenCode in FrankX
cfx    # Claude in FrankX
gfx    # Gemini in FrankX
cxfx   # Codex in FrankX
```

### Magic Words

| Word | Effect |
|------|--------|
| `ultrawork` / `ulw` | All agents parallel |
| `ultracode` / `ulc` | Coding agents parallel |
| `council` | Invoke all agents for strategy |

### Agent Selection Guide

| Need | Agent |
|------|-------|
| Copy, brand voice | Claude |
| Architecture, MCP | Codex |
| Implementation, QA | Gemini |
| Prototyping, building | OpenCode |

---

## File Structure

```
FrankX/
├── CREATOR-OS.md           # Framework (shareable)
├── FRANKX-INSTANCE.md      # This file (personal)
├── CLAUDE.md               # Claude agent spec
├── OPENCODE.md             # OpenCode agent spec
├── GEMINI.md               # Gemini agent spec
├── AGENTS.md               # Multi-agent coordination
├── SKILLS.md               # Skills inventory
│
├── .opencode/
│   └── oh-my-opencode.json # OpenCode config
│
├── .claude-skills/         # 52 skills
│   ├── technical/
│   ├── creative/
│   │   └── frankx-brand/
│   ├── personal/
│   └── soulbook/
│
└── agents/
    ├── claude.md           # Claude detailed spec
    ├── codex.md            # Codex detailed spec
    ├── business-agents.md  # Marketing agents
    └── AGENT_PROTOCOL.md   # Handoff procedures
```

---

## Contributing to FrankX

This is a personal instance. Changes should:

1. **Empower creators** - Not overwhelm them
2. **Maintain brand voice** - Studio energy, cinematic language
3. **Improve coordination** - Better handoffs between agents
4. **Add valuable skills** - That serve the creator mission

---

*FrankX - The creator's AI ally.*

**"Every output should empower creators, not overwhelm them."**
