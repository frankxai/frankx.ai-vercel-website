# Agentic Creator OS
**The Framework for AI-Empowered Creative Transformation**

> "Transform from overwhelmed creator to confident AI-empowered artist"

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AGENTIC CREATOR OS                              │
│                                                                          │
│   An open framework for building personal AI creative systems that      │
│   work WITH existing agent tools (Claude, OpenCode, etc.), not          │
│   instead of them.                                                      │
│                                                                          │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│   │  FRAMEWORK  │  │    SKILLS   │  │   PROTOCOL  │  │   TEMPLATES │   │
│   │  (This Doc) │  │   Library   │  │  & Handoffs │  │  & Configs  │   │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                          │
│   Integrates with: Claude CLI • OpenCode • Codex • Gemini               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Architecture](#architecture)
3. [Core Components](#core-components)
4. [Agent Team Design](#agent-team-design)
5. [Skills System](#skills-system)
6. [Multi-Agent Protocol](#multi-agent-protocol)
7. [Brand Voice Framework](#brand-voice-framework)
8. [Configuration Guide](#configuration-guide)
9. [Creating Your Instance](#creating-your-instance)
10. [Examples](#examples)

---

## Philosophy

### Creator-First AI

```
┌──────────────────────────────────────────────────────────────────────┐
│  TRADITIONAL APPROACH              │  CREATOR-FIRST APPROACH         │
├────────────────────────────────────┼──────────────────────────────────┤
│  AI does the work                  │  AI amplifies human creativity  │
│  Features over feelings            │  Soul + Systems                 │
│  Corporate jargon                  │  Studio energy                  │
│  One-size-fits-all                │  Personalized workflows         │
│  "Leverage the platform"           │  "What do you want to create?"  │
└────────────────────────────────────┴──────────────────────────────────┘
```

### Core Principles

1. **Empower, Don't Replace** - Every AI interaction should leave the creator more capable, not dependent
2. **Soul + Systems** - Bridge spirituality and technology; technical excellence with human warmth
3. **Action-Oriented** - Every deliverable ends with a clear next step
4. **Studio Energy** - Communicate with warmth and intimacy, not boardroom presentations

### The Transformation Promise

> "From overwhelmed creator to confident AI-empowered artist"

This isn't about faster coding or more content. It's about the fundamental shift from:
- Consumer → Creator
- Dependent → Capable  
- Overwhelmed → Empowered
- Alone → Supported

---

## Architecture

### Layered Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         LAYER 1: FRAMEWORK                              │
│              The open, shareable part (Agentic Creator OS)              │
├─────────────────────────────────────────────────────────────────────────┤
│  • Core philosophy & principles                                         │
│  • Agent team templates                                                 │
│  • Skills architecture                                                  │
│  • Protocol definitions                                                 │
│  • Configuration schemas                                                │
└─────────────────────────────────────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        LAYER 2: INSTANCE                                │
│              Your personal customization (e.g., FrankX)                 │
├─────────────────────────────────────────────────────────────────────────┤
│  • Your brand voice & style                                             │
│  • Your specific skills                                                 │
│  • Your agent team configuration                                        │
│  • Your workflows & projects                                            │
│  • Your magic words & patterns                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        LAYER 3: EXECUTION                               │
│              The agent tools that run your instance                     │
├─────────────────────────────────────────────────────────────────────────┤
│  • Claude CLI (Claude Code)                                             │
│  • OpenCode CLI (with oh-my-opencode)                                   │
│  • Google Gemini CLI                                                    │
│  • OpenAI Codex CLI                                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Agent System Compatibility

| System | Best For | Integration Method |
|--------|----------|-------------------|
| **Claude CLI** | Complex reasoning, writing, brand voice | Agent specs (`*.md` in `~/.claude/agents/`) |
| **OpenCode** | Rapid prototyping, parallel execution | oh-my-opencode config (`.opencode/oh-my-opencode.json`) |
| **Codex** | Enterprise architecture, OCI integration | Agent specs |
| **Gemini** | Web implementation, QA, accessibility | Agent specs |

---

## Core Components

### 1. The Orchestrator Agent

Every instance needs a primary orchestrator. This agent:
- Receives initial requests
- Coordinates subagents
- Ensures brand consistency
- Manages handoffs

**Default Name**: Sisyphus (oh-my-opencode default)
**Customizable**: Yes, via `prompt_append`

### 2. Subagent Team

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        STANDARD SUBAGENT TEAM                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  LIBRARIAN  │  │   EXPLORE   │  │   ORACLE    │  │  FRONTEND   │   │
│  │  Researcher │  │   Scanner   │  │   Advisor   │  │   Designer  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │  DOCUMENT   │  │  MULTIMODAL │  │   BUILDER   │                     │
│  │   Writer    │  │   Analyzer  │  │   Coder     │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3. Skills Library

Modular knowledge units that agents can invoke. See [Skills System](#skills-system).

### 4. Brand Voice Layer

Consistent tone, vocabulary, and messaging across all outputs. See [Brand Voice Framework](#brand-voice-framework).

---

## Agent Team Design

### Template: Core Agent Roles

```markdown
## ORCHESTRATOR (Primary Agent)

**Role**: System coordinator and primary interface
**Personality**: 
- Welcoming and clarifying
- Ensures all subagents align with system goals
- Maintains coherence across complex tasks

**When to Activate**: Every request starts here

---

## LIBRARIAN (Subagent)

**Role**: Research and information retrieval
**Personality**: 
- Thorough and precise
- Finds the elegant solution, not just any solution
- Brings wisdom, not just information

**When to Activate**: Need to research, find docs, look up APIs

---

## EXPLORE (Subagent)

**Role**: Codebase navigation and pattern discovery  
**Personality**:
- Pattern-focused
- Identifies opportunities and anti-patterns
- Maps the territory

**When to Activate**: Need to understand codebase, find patterns, locate files

---

## ORACLE (Subagent)

**Role**: Strategic advice and architecture decisions
**Personality**:
- Deep thinking
- Long-term perspective
- Bold recommendations with clear reasoning

**When to Activate**: Complex decisions, architecture reviews, strategic planning

---

## FRONTEND-UI-UX-ENGINEER (Subagent)

**Role**: Interface design and implementation
**Personality**:
- Design-conscious
- Accessibility-focused
- User empathy

**When to Activate**: UI components, design systems, user interfaces

---

## DOCUMENT-WRITER (Subagent)

**Role**: Documentation and content creation
**Personality**:
- Clear and organized
- Reader-empathetic
- Long-term thinking

**When to Activate**: Documentation, guides, content writing

---

## MULTIMODAL-LOOKER (Subagent)

**Role**: Visual media analysis
**Personality**:
- Interpretive
- Context-aware
- Insightful

**When to Activate**: Analyzing images, diagrams, screenshots
```

### Customizing Your Team

You can customize any agent by adding:

1. **Custom Persona** (via `prompt_append` in oh-my-opencode.json)
2. **Custom Skills** (add to skills library)
3. **Custom Tools** (via MCP servers)
4. **Custom Models** (per-agent model selection)

---

## Skills System

### Skills Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           SKILLS DIRECTORY                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  .claude-skills/                                                        │
│  ├── technical/           # Technical/domain skills                      │
│  │   ├── mcp-architecture/                                             │
│  │   ├── nextjs-react-expert/                                           │
│  │   └── ...                                                            │
│  ├── creative/            # Creative/content skills                      │
│  │   ├── brand-voice/                                                │
│  │   ├── content-creation/                                             │
│  │   └── ...                                                            │
│  ├── personal/            # Personal development skills                  │
│  │   ├── philosophy/                                                   │
│  │   ├── discipline/                                                    │
│  │   └── ...                                                            │
│  ├── business/            # Business/product skills                      │
│  ├── projects/            # Project-specific skills                      │
│  └── soulbook/            # Life design system (25+ skills)              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Skill File Format

```markdown
---
name: Skill Name
description: Brief description of what this skill does
version: 1.0.0
category: technical|creative|personal|business|projects
---

# Skill Name

## Purpose
What this skill helps you accomplish.

## Core Knowledge
Key concepts, patterns, and best practices.

## When to Use
Situations where this skill applies.

## Examples
Practical examples and templates.

## Integration
How to invoke this skill in your workflow.
```

### Using Skills

| System | How to Invoke |
|--------|--------------|
| Claude Code | Auto-activates via hooks, or use `/skill [name]` |
| OpenCode | Read the SKILL.md file directly |
| Codex | Read the SKILL.md file directly |
| Gemini | Read the SKILL.md file directly |

---

## Multi-Agent Protocol

### Handoff Template

```markdown
## Handoff: [Feature/Task Name]
**From**: [Agent Name]
**To**: [Agent Name]
**Status**: [Ready / Needs Review / Blocked]

### What's Done
- [Completed work items]

### What's Needed
- [What the next agent should do]

### Files Changed
- [List of modified files]

### Context
- [Important decisions, constraints, notes]

### Quality Notes
- [Any quality concerns or areas needing attention]
```

### Priority Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| P0 | Production down | Immediate |
| P1 | Major feature blocked | Same session |
| P2 | Normal development | Next session |
| P3 | Nice to have | Backlog |

### Coordination Patterns

#### Pattern 1: Sequential Handoff
```
User → Orchestrator → Specialist 1 → Orchestrator → Specialist 2 → User
```

#### Pattern 2: Parallel Execution
```
User → Orchestrator → [Specialist 1, Specialist 2, Specialist 3] → Synthesize → User
```

#### Pattern 3: Consultation
```
User → Orchestrator → Specialist (for expertise) → Back to Orchestrator → User
```

---

## Brand Voice Framework

### Voice Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Cinematic** | Paint vivid pictures | "The studio lights snap on at 2 AM" |
| **Intimate** | Direct to individual | "You know that moment when..." |
| **Studio-Rooted** | Creative practice grounding | "Like arranging a track..." |
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
Disrupt, revolutionary, game-changing (startup jargon)
Synergy, leverage, utilize (corporate speak)
Cheap, easy, simple (undermines craft)
Automate everything (we augment, not replace)
Just, merely, simply (condescending)
```

### Tone by Context

| Context | Tone | Example Lead |
|---------|------|--------------|
| Blog/Content | Story first, system second | "Picture this: 2 AM in the studio..." |
| Technical | Warm precision | "Think of it like mixing stems..." |
| Social | Punchy, inspiring | "Most creators overthink." |
| Email | Conversational, actionable | "Quick note from the studio..." |

---

## Configuration Guide

### OpenCode (oh-my-opencode) Configuration

**Location**: `.opencode/oh-my-opencode.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",
  "agents": {
    "Sisyphus": {
      "model": "anthropic/claude-opus-4-5",
      "prompt_append": "\n\n## IDENTITY OVERRIDE\nYou are [YOUR NAME] - [Your mission].\n\n[Your brand voice guidelines...]\n",
      "permission": {
        "edit": "allow",
        "bash": "ask"
      }
    },
    "librarian": {
      "model": "opencode/glm-4.7-free",
      "prompt_append": "\n\n[Your customization...]"
    },
    "explore": {
      "model": "opencode/glm-4.7-free",
      "prompt_append": "\n\n[Your customization...]"
    },
    "oracle": {
      "model": "anthropic/claude-opus-4-5",
      "prompt_append": "\n\n[Your customization...]"
    }
  }
}
```

### Claude Code Agent Specifications

**Location**: `~/.claude/agents/[agent-name].md`

```markdown
# [Agent Name]
*[Role/Tagline]*

## Mission
[Brief mission statement]

## Core Identity
- **Role**: [Primary function]
- **Personality**: [Key traits]
- **Thinking Style**: [How they approach problems]

## Primary Responsibilities
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

## Skills Access
```bash
/skill [skill-1]
/skill [skill-2]
/skill [skill-3]
```

## Coordination
| Agent | Role | Handoff When |
|-------|------|--------------|
| [Other Agent] | [Their Role] | [Condition] |

---

*Work with [your brand] voice and principles.*
```

---

## Creating Your Instance

### Step 1: Define Your Identity

**Answer these questions:**

1. What's your name? (e.g., FrankX, YourName)
2. What's your mission?
3. What's your core audience?
4. What's your unique voice?

**Template:**
```markdown
## MY INSTANCE IDENTITY

**Name**: [Your Name]
**Mission**: [What you help creators achieve]
**Audience**: [Who you serve]
**Voice**: [3-5 words describing your tone]
```

### Step 2: Configure Your Agent Team

1. Choose your orchestrator agent (Sisyphus via OpenCode)
2. Customize each subagent with `prompt_append`
3. Set model preferences per agent
4. Define permissions

### Step 3: Build Your Skills Library

1. Copy the `.claude-skills/` structure
2. Add your domain-specific skills
3. Customize existing skills for your context
4. Document in SKILLS.md

### Step 4: Document Your Workflows

```markdown
## MY WORKFLOWS

### Content Creation
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Book Writing
1. [Phase 1]
2. [Phase 2]
3. [Phase 3]

### Website Development
1. [Phase 1]
2. [Phase 2]
3. [Phase 3]
```

### Step 5: Test and Iterate

1. Run your first complex task
2. Note where coordination breaks
3. Adjust configurations
4. Repeat

---

## Examples

### Example 1: FrankX (Personal Instance)

**Location**: `/mnt/c/Users/Frank/FrankX/`

FrankX is a personal instance for a musician-technologist helping creators.

**Key Customizations**:
- Studio energy voice (musician background)
- 52 skills including Soulbook life design
- Multi-agent team: Claude (Story), Codex (Architecture), Gemini (QA), OpenCode (Build)
- Magic words: `ultrawork`, `ultracode`

**Files**:
- `CLAUDE.md` - Claude agent spec
- `OPENCODE.md` - OpenCode agent spec  
- `GEMINI.md` - Gemini agent spec
- `AGENTS.md` - Multi-agent coordination
- `.opencode/oh-my-opencode.json` - OpenCode config
- `.claude-skills/` - 52 skills

### Example 2: Arcanea (Fantasy World Instance)

**Location**: `/mnt/c/Users/Frank/Arcanea/`

Arcanea is an instance for a fantasy world-building system.

**Key Customizations**:
- Luminor character system (7 aspects)
- Future-era perspective (100 years ahead)
- Magic words for world-building

### Example 3: Your Instance (Template)

```
your-project/
├── YOUR-NAME.md              # Your agent spec
├── SKILLS.md                 # Your skills
├── WORKFLOWS.md              # Your workflows
├── .opencode/
│   └── oh-my-opencode.json   # OpenCode config
└── .claude-skills/
    ├── technical/
    ├── creative/
    ├── personal/
    └── [your-categories]/
```

---

## Magic Words

Magic words trigger parallel agent execution or special behaviors:

| Word | Effect |
|------|--------|
| `ultrawork` / `ulw` | Fire ALL available agents in parallel |
| `ultracode` / `ulc` | Fire coding agents (architect + coder + reviewer) |
| `ultrawrite` / `ulwr` | Fire writing agents in parallel |
| `ultrabook` / `ulb` | Complete book pipeline |

---

## Directory Structure

```
agentic-creator-os/
├── README.md                  # This file
├── CREATOR-OS.md              # Framework documentation
├── TEMPLATES/
│   ├── agent-spec.md          # Agent specification template
│   ├── skill-template.md      # Skill file template
│   ├── handoff-template.md    # Handoff template
│   └── workflow-template.md   # Workflow documentation template
├── CONFIGS/
│   ├── oh-my-opencode/
│   │   └── basic.json         # Basic oh-my-opencode config
│   └── claude-agents/
│       └── orchestrator.md    # Orchestrator agent spec
├── SKILLS/
│   ├── technical/
│   ├── creative/
│   ├── personal/
│   └── README.md              # Skills documentation
└── EXAMPLES/
    ├── frankx/                # FrankX as reference implementation
    └── [your-instance]/       # Your custom instance
```

---

## Contributing

Agentic Creator OS is designed to be extended:

1. **Add templates** in `TEMPLATES/`
2. **Share skills** in `SKILLS/`
3. **Document examples** in `EXAMPLES/`
4. **Improve the framework** via pull requests

---

## License

Open source under MIT License.

---

## Acknowledgments

- **Oh-My-OpenCode** - The configuration system this framework builds upon
- **Claude Code** - Primary agent execution environment
- **All AI Agent Frameworks** - For inspiring the multi-agent future

---

*The framework for AI-empowered creative transformation.*

**Agentic Creator OS** - *Create with soul. Build with systems.*
