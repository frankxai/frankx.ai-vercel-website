# Multi-Agent Architecture
**How OpenCode, oh-my-opencode, Claude, Codex, and Gemini Work Together**

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AGENTIC CREATOR ECOSYSTEM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   USER INPUT                                                                 │
│        │                                                                        │
│        ▼                                                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    UNIFIED LAUNCHER (Optional)                       │   │
│   │              Can use any CLI directly without launcher               │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                        │
│        ├──────────────────────────────────────────────────────────────┐       │
│        │                      │                      │               │       │
│        ▼                      ▼                      ▼               ▼       │
│   ┌─────────┐          ┌─────────┐          ┌─────────┐       ┌─────────┐   │
│   │ CLAUDE  │          │ OPENCODE│          │  GEMINI │       │  CODEX  │   │
│   │   CLI   │          │   CLI   │          │   CLI   │       │   CLI   │   │
│   └────┬────┘          └────┬────┘          └────┬────┘       └────┬────┘   │
│        │                    │                    │                  │         │
│        │                    │                    │                  │         │
│        ▼                    ▼                    ▼                  ▼         │
│   ┌─────────┐          ┌─────────┐          ┌─────────┐       ┌─────────┐   │
│   │ Claude  │          │  oh-my- │          │ Agent   │       │ Agent   │   │
│   │  Code   │          │ opencode│          │ Spec    │       │ Spec    │   │
│   │ Config  │          │ Plugin  │          │ Config  │       │ Config  │   │
│   └─────────┘          └────┬────┘          └─────────┘       └─────────┘   │
│                             │                                            │
│        ┌────────────────────┼────────────────────┐                        │
│        │                    │                    │                        │
│        ▼                    ▼                    ▼                        │
│   ┌─────────┐          ┌─────────┐          ┌─────────┐                   │
│   │Sisyphus │          │ Librarian│          │ Oracle  │                   │
│   │(Primary)│          │(Subagent)│          │(Subagent)│                  │
│   └─────────┘          └─────────┘          └─────────┘                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## CLI Comparison

| Feature | Claude CLI | OpenCode CLI | Gemini CLI | Codex CLI |
|---------|------------|--------------|------------|-----------|
| **Primary Use** | Complex reasoning | Parallel execution | Implementation | Enterprise |
| **Config Location** | `~/.claude/agents/` | `~/.config/opencode/` | `~/.config/gemini/` | `~/.codex/` |
| **Config Format** | Markdown (`*.md`) | JSON (`oh-my-opencode.json`) | JSON | Markdown |
| **Subagents** | Via Task tool | Built-in (7 agents) | Via Task tool | Via Task tool |
| **Parallel Execution** | Sequential | Native (background_task) | Sequential | Sequential |
| **Permission Control** | `--dangerously-skip-permissions` | `--trust` | `--yolo` | `--dangerously-bypass-approvals` |

---

## OpenCode + oh-my-opencode Deep Dive

### How They Connect

```
┌─────────────────────────────────────────────────────────────────┐
│                     OPENCODE CLI                                │
│                                                                  │
│   1. User runs: `opencode` or `opencode --trust`               │
│                                                                  │
│   2. OpenCode loads plugins from `opencode.json`:               │
│      ┌─────────────────────────────────────────────────┐        │
│      │ {                                                 │        │
│      │   "plugin": ["oh-my-opencode"]  ← LOADS THIS    │        │
│      │ }                                                 │        │
│      └─────────────────────────────────────────────────┘        │
│                                                                  │
│   3. oh-my-opencode reads config files:                         │
│      ┌─────────────────────────────────────────────────┐        │
│      │ ~/.config/opencode/oh-my-opencode.json   (GLOBAL)│        │
│      │ .opencode/oh-my-opencode.json   (PROJECT-SPECIFIC)│       │
│      └─────────────────────────────────────────────────┘        │
│                                                                  │
│   4. Creates agent instances:                                    │
│      ┌─────────────────────────────────────────────────┐        │
│      │ Sisyphus (primary orchestrator)                 │        │
│      │ ├─ oracle (advisor)                             │        │
│      │ ├─ librarian (researcher)                       │        │
│      │ ├─ explore (code scanner)                       │        │
│      │ ├─ frontend-ui-ux-engineer (designer)           │        │
│      │ ├─ document-writer (writer)                     │        │
│      │ └─ multimodal-looker (visual analyzer)          │        │
│      └─────────────────────────────────────────────────┘        │
│                                                                  │
│   5. User interacts with Sisyphus (or custom orchestrator)      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Config Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONFIG HIERARCHY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  1. BUILT-IN DEFAULTS                                   │   │
│   │     (hardcoded in oh-my-opencode)                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  2. USER-LEVEL CONFIG (if project-level missing)        │   │
│   │     ~/.config/opencode/oh-my-opencode.json              │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                              ▼                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  3. PROJECT-LEVEL CONFIG (OVERRIDES USER-LEVEL)         │   │
│   │     .opencode/oh-my-opencode.json                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Result: Project config > User config > Built-in defaults       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Configuration Options

```json
{
  "agents": {
    "Sisyphus": {
      "model": "anthropic/claude-opus-4-5",
      "category": "most-capable",
      "prompt": "COMPLETE REPLACEMENT of system prompt",
      "prompt_append": "APPEND to existing system prompt",
      "temperature": 0.7,
      "tools": {
        "bash": true,
        "read": true,
        "edit": false
      },
      "permission": {
        "edit": "ask",
        "bash": "allow"
      },
      "mode": "primary",
      "color": "#AB47C7"
    },
    "oracle": {
      "model": "anthropic/claude-opus-4-5",
      "mode": "subagent"
    }
  }
}
```

---

## Claude Code Deep Dive

### How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE CLI                                  │
│                                                                  │
│   1. User runs: `claude` or `claude --dangerously-skip-permissions`│
│                                                                  │
│   2. Claude loads agent specs from:                             │
│      ┌─────────────────────────────────────────────────┐        │
│      │ ~/.claude/agents/*.md    (user agents)          │        │
│      │ .claude/agents/*.md      (project agents)       │        │
│      └─────────────────────────────────────────────────┘        │
│                                                                  │
│   3. Agent spec contains:                                       │
│      ┌─────────────────────────────────────────────────┐        │
│      │ ---                                                  │        │
│      │ name: AgentName                                     │        │
│      │ model: anthropic/claude-opus-4-5                   │        │
│      │ ---                                                  │        │
│      │                                                      │        │
│      │ # Agent Name                                        │        │
│      │ [Full system prompt with role, skills, guidelines] │        │
│      └─────────────────────────────────────────────────┘        │
│                                                                  │
│   4. Skills auto-activate via hooks                             │
│   5. Subagents spawned via Task tool                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Spec Format

```markdown
---
name: Agent Name
model: anthropic/claude-opus-4-5
description: Brief description
---

# Agent Name

## Mission
What this agent does.

## Core Identity
- **Role**: Primary function
- **Personality**: Key traits
- **Thinking Style**: How they approach problems

## Primary Responsibilities
- Responsibility 1
- Responsibility 2
- Responsibility 3

## Skills Access
```bash
/skill skill-name-1
/skill skill-name-2
/skill skill-name-3
```

## Coordination
| Agent | Role | Handoff When |
|-------|------|--------------|
| Other Agent | Their role | Condition |

---

*Guidelines for how this agent should behave.*
```

---

## Coordination Patterns

### Pattern 1: Claude to OpenCode (Recommended)

```
┌─────────────────────────────────────────────────────────────────┐
│               COORDINATION: CLAUDE → OPENCODE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. User talks to Claude                                       │
│   2. Claude decides: "Need to prototype this"                   │
│   3. Claude writes plan/notes                                   │
│   4. Claude hands off to OpenCode:                              │
│      "Use OpenCode to build this: [description]"                │
│   5. User runs: `ofx` in project folder                         │
│   6. OpenCode reads .opencode/oh-my-opencode.json               │
│   7. OpenCode (as FrankX) executes with full context            │
│   8. Results shared back                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Pattern 2: Parallel Execution (OpenCode native)

```
┌─────────────────────────────────────────────────────────────────┐
│               PARALLEL: MULTIPLE SUBAGENTS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   User: "ulw" (ultrawork - fire all agents)                     │
│         │                                                        │
│         ▼                                                        │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Sisyphus orchestrates:                                   │   │
│   │                                                         │   │
│   │   call_omo_agent(explore, run_in_background=true) ──┐   │   │
│   │   call_omo_agent(librarian, run_in_background=true) ─┤   │   │
│   │   call_omo_agent(frontend, run_in_background=true) ──┤   │   │
│   │   call_omo_agent(oracle, run_in_background=true) ────┘   │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│         │                                                        │
│         ▼                                                        │
│   All agents work in parallel                                    │
│         │                                                        │
│         ▼                                                        │
│   Results collected, synthesized, presented to user              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Pattern 3: Handoff Between Agents

```
┌─────────────────────────────────────────────────────────────────┐
│                    HANDOFF TEMPLATE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ## Handoff: [Feature Name]                                    │
│   **From**: [Agent A]                                           │
│   **To**: [Agent B]                                             │
│   **Status**: Ready                                             │
│                                                                 │
│   ### What's Done                                               │
│   - [Completed item 1]                                          │
│   - [Completed item 2]                                          │
│                                                                 │
│   ### What's Needed                                             │
│   - [What Agent B should do]                                    │
│                                                                 │
│   ### Files Changed                                             │
│   - [File 1]                                                    │
│   - [File 2]                                                    │
│                                                                 │
│   ### Notes                                                     │
│   - [Context or decisions]                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Permission Flags

| CLI | Flag | Effect |
|-----|------|--------|
| Claude | `--dangerously-skip-permissions` | No permission prompts |
| OpenCode | `--trust` | Trust all operations |
| Gemini | `--yolo` | No confirmations |
| Codex | `--dangerously-bypass-approvals-and-sandbox` | Full access |

---

## Directory Structure by CLI

```
~/.config/
├── opencode/
│   ├── opencode.json              # Plugin config
│   └── oh-my-opencode.json        # Agent/prompt config (GLOBAL)
│
├── claude/
│   └── agents/
│       └── *.md                   # Agent specs (GLOBAL)
│
├── gemini/
│   └── config.json                # Gemini config
│
└── codex/
    └── agents/
        └── *.md                   # Codex specs

PROJECT/
├── .opencode/
│   └── oh-my-opencode.json        # Project-level overrides
│
├── .claude/
│   └── agents/
│       └── *.md                   # Project-specific agents
│
├── CLAUDE.md                      # Project agent (Claude)
├── OPENCODE.md                    # Project agent (OpenCode)
└── GEMINI.md                      # Project agent (Gemini)
```

---

## Recommendation for FrankX

| Component | Use For | Why |
|-----------|---------|-----|
| **Claude** | Writing, brand voice, complex reasoning | Best for narrative and creativity |
| **OpenCode** | Prototyping, parallel execution, building | Native subagent support, parallel work |
| **Gemini** | Implementation, QA, accessibility | Strong web dev focus |
| **Codex** | Enterprise architecture, OCI integration | Oracle Cloud expertise |

### Recommended Workflow

```
1. Start with Claude for strategy and copy
2. Use Claude to plan architecture
3. Hand off to OpenCode for prototyping
4. Use Gemini for implementation and QA
5. Use Codex for enterprise integrations
```

---

## Troubleshooting

### OpenCode Shows "Sisyphus" in Bottom Right

**Cause**: Hardcoded in oh-my-opencode UI
**Solution**: Use `prompt_append` to override identity:
```json
{
  "agents": {
    "Sisyphus": {
      "prompt_append": "\n\nYou are FrankX, NOT Sisyphus."
    }
  }
}
```

### Claude Doesn't See Project Config

**Cause**: Claude reads from `~/.claude/`, not `.claude/`
**Solution**: Symlink or copy project agents to `~/.claude/agents/`

### Subagents Not Available

**Cause**: oh-my-opencode not loaded
**Solution**: Verify `opencode.json`:
```json
{
  "plugin": ["oh-my-opencode"]
}
```

---

## Future: Unified Launcher (Optional)

For true cross-CLI coordination, consider a unified launcher:

```bash
#!/bin/bash
# creator-os launch agent project --task "build feature"

case "$1" in
  claude)
    cd "$PROJECT_PATH" && claude "${@:2}"
    ;;
  opencode)
    cd "$PROJECT_PATH" && opencode "${@:2}"
    ;;
  gemini)
    cd "$PROJECT_PATH" && gemini "${@:2}"
    ;;
  codex)
    cd "$PROJECT_PATH" && codex "${@:2}"
    ;;
esac
```

---

*Architecture documentation for Agentic Creator OS.*
