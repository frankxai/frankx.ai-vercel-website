# AI OPS Strategic Plan: OpenCode + ACOS Integration

## Executive Summary

**Recommendation**: Fork ACOS INTO this repo as `.acos/` directory, creating a unified "Agentic Creator OS" where OpenCode becomes the primary interface.

---

## Current State Analysis

### What's Already Here (frankx.ai-vercel-website)

| Component | Status | Quality |
|-----------|--------|---------|
| **OpenCode Config** | `.opencode/oh-my-opencode.json` | 7 agents, FrankX-branded |
| **Agent Protocol** | `agents/AGENT_PROTOCOL.md` | Production-ready |
| **Brand Guidelines** | `CLAUDE.md` | Comprehensive |
| **Claude Integration** | Working via Sisyphus | ✅ Active |

### What's in ACOS (Separate Repo)

| Component | Count | Status |
|----------|-------|--------|
| **Skills** | 75+ | Domain knowledge |
| **Commands** | 35+ | Workflows |
| **Agents** | 38 | Specialized personas |
| **v10 Safety** | 5 systems | Circuit breaker, audit, IAM |

---

## Architecture Options

### Option A: Combine Into This Repo

```
frankx.ai-vercel-website/
├── .opencode/           ← CURRENT (keep)
├── agents/              ← CURRENT (keep)  
├── .acos/               ← NEW: ACOS fork
│   ├── skills/
│   ├── commands/
│   ├── agents/
│   └── hooks/
└── [existing files]
```

**Pros:**
- Single source of truth
- Everything in one place
- Easy git management

**Cons:**
- Repo becomes massive (75+ skills)
- Harder to sync updates from ACOS upstream
- Blurs website vs agent infrastructure

### Option B: Sync Strategy (Recommended)

```
frankx.ai-vercel-website/          ACOS repo (upstream)
├── .opencode/oh-my-opencode.json ←── syncs from ACOS skills
├── agents/                        ←── enhanced copy
└── [website]                      ←── website only

ACOS repo publishes → npm package or git submodule
```

**Pros:**
- Clear separation of concerns
- Easy ACOS updates
- Website stays focused

**Cons:**
- Two repos to manage
- Sync complexity

### Option C: Fork & Rename (Cleanest)

**Rename this repo's agent infra to ACOS:**
- Keep `.acos/` as the agent hub
- Merge current `agents/` into `.acos/agents/`
- Add ACOS skills as `.acos/skills/`
- Keep OpenCode config pointing to `.acos/`

---

## Why Combine?

### The "Why" - Strategic Rationale

1. **Unified Experience**: One command center for all FrankX work
2. **Brand Control**: No more "which agent system?" questions
3. **Self-Contained**: Works standalone without external dependencies
4. **Git-Trackable**: All agent config versioned with website
5. **Customization**: Full control over skills vs generic ACOS

### The "What" - What's Included

| From Current | From ACOS | New |
|--------------|-----------|-----|
| 7 agent configs | 75+ skills | Custom skills for FrankX |
| AGENT_PROTOCOL.md | 35+ commands | Unified command structure |
| Brand voice rules | 38 agents | Brand-specific agents |
| Deployment workflow | v10 safety hooks | Website-specific hooks |

---

## Implementation Plan

### Phase 1: Fork ACOS Into This Repo

```bash
# Create .acos directory with ACOS structure
mkdir -p .acos/{skills,commands,agents,hooks}

# Copy relevant ACOS components
cp -r /path/to/ACOS/skills/technical .acos/skills/
cp -r /path/to/ACOS/commands .acos/
cp -r /path/to/ACOS/agents .acos/
```

### Phase 2: Merge Current Infrastructure

```bash
# Move and merge current agents
mv agents .acos/agents/legacy

# Enhance OpenCode config
# Update .opencode/oh-my-opencode.json to reference .acos/
```

### Phase 3: Custom FrankX Skills

```bash
# Create FrankX-specific skills
.acos/skills/
├── frankx-brand/          # Brand voice
├── frankx-website/       # Website patterns
├── frankx-content/        # Content workflows
└── frankx-music/         # Music production
```

### Phase 4: Unified Command Structure

```json
{
  "commands": {
    "/frankx": "Route to FrankX-specific workflows",
    "/acos": "Route to general ACOS workflows",
    "/build": "Website build + deploy",
    "/content": "Content creation pipeline"
  }
}
```

---

## File Changes Required

### New Files

```
.acos/
├── CLAUDE.md                    # ACOS context for this repo
├── skills/
│   ├── frankx-brand/           # Brand voice skill
│   ├── frankx-website/         # Website patterns
│   ├── frankx-content/         # Content workflows
│   └── [75+ ACOS skills]
├── commands/
│   ├── frankx.json             # Custom commands
│   └── [35+ ACOS commands]
├── agents/
│   ├── frankx-architect.json
│   ├── frankx-creator.json
│   └── [38 ACOS agents]
└── hooks/
    ├── circuit-breaker.json
    └── audit-trail.json
```

### Modified Files

```
.opencode/oh-my-opencode.json    # Point to .acos/
agents/AGENT_PROTOCOL.md         # Reference .acos/
CLAUDE.md                       # Add ACOS context section
```

---

## Commands Available After Integration

| Command | Purpose | Source |
|--------|---------|--------|
| `/frankx` | Brand-specific workflows | Custom |
| `/acos` | Full ACOS smart router | ACOS |
| `/build` | Website build + deploy | Custom |
| `/content` | Blog post pipeline | Custom |
| `/article-creator` | Full content workflow | ACOS |
| `/create-music` | Suno AI workflow | ACOS |
| `/research` | Multi-agent research | ACOS |
| `/planning-with-files` | Spec-driven development | ACOS |

---

## Skills Auto-Activation

After integration, these patterns auto-load skills:

| Pattern | Skills Loaded |
|---------|--------------|
| `blog` + `write` | content-strategy, seo-content-writer |
| `website` + `deploy` | vercel-deployment, nextjs-best-practices |
| `music` + `suno` | suno-ai-mastery |
| `frankx` + `any` | frankx-brand |
| `agent` + `orchestrate` | swarm-orchestration, agentic-jujutsu |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Repo size bloats | Use git submodule for ACOS core |
| Version drift | Sync script from ACOS upstream |
| Complexity overload | Start with 10 core skills only |
| Break existing workflows | Keep current agents/ as fallback |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Skills available | 75+ |
| Commands available | 35+ |
| Agent personas | 38+ |
| Auto-activation rules | 22+ |
| Build time impact | <5 seconds |

---

## Recommended Approach: Option C (Fork & Rename)

**Why:**
1. Cleanest separation
2. Full customization control
3. Easy to sync ACOS updates
4. Website stays portable

**Action:**
1. Create `.acos/` directory structure
2. Fork relevant ACOS components
3. Merge current `agents/` into `.acos/agents/legacy/`
4. Update `.opencode/oh-my-opencode.json` to reference `.acos/`
5. Test all commands work

---

## Next Steps

1. **Approval**: Confirm this approach
2. **Backup**: Commit current state
3. **Fork**: Clone ACOS relevant parts to `.acos/`
4. **Merge**: Combine current agents into .acos/agents/
5. **Configure**: Update OpenCode to use .acos/
6. **Test**: Verify commands work
7. **Document**: Update README

---

*This plan transforms OpenCode from a basic Claude Code config into a full Agentic Creator OS with 75+ skills, 35+ commands, and 38 agents - all within this repo.*
