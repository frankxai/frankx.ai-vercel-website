# MASTER PLAN: ACOS v11 - The Ultimate Agentic Creator OS

## Vision

Create ACOS v11 as the **ultimate agent harness** that:
- Works first-class on **both Claude Code AND OpenCode**
- Absorbs the best from **oh-my-opencode** (32.5k stars) + **claude-flow** + current ACOS
- Maintains **upstream sync** capability
- Is **fully branded** for Agentic Creator OS
- Tested safely in a **development branch**

---

## Source Analysis

### oh-my-opencode (32.5k ⭐ - THE GOLD STANDARD)
```
Strengths to absorb:
├── Sisyphus agent (main orchestrator)
├── Hephaestus agent (autonomous deep worker)
├── 25+ hooks (PreToolUse, PostToolUse, etc.)
├── Hash-anchored Edit tool (LINE#ID)
├── Todo continuation enforcer
├── Comment checker
├── Background parallel agents
├── MCPs built-in (Exa, Context7, Grep.app)
├── Magic word: ultrawork / ulw
└── Multi-model orchestration
```

### claude-flow (if exists)
```
Strengths to absorb:
├── Swarm orchestration patterns
├── Hierarchical topologies
├── Experience replay
└── [Need to analyze further]
```

### Current ACOS v10
```
What we keep:
├── 75+ skills (domain knowledge)
├── 35+ commands (/acos, /create-music, etc.)
├── 38 specialized agents
├── v10 safety hooks (circuit breaker, IAM)
└── FrankX branding
```

---

## Architecture: Dual-Platform ACOS

```
ACOS v11
├── .opencode/              ← OpenCode config (plugin format)
│   └── oh-my-opencode.json
├── .claude/                ← Claude Code config
│   ├── commands/
│   ├── skills/
│   ├── agents/
│   └── hooks/
├── src/                    ← Shared core (platform-agnostic)
│   ├── agents/
│   ├── skills/
│   ├── hooks/
│   └── utils/
├── adapters/
│   ├── opencode/          ← OpenCode-specific
│   └── claude-code/       ← Claude Code-specific
└── scripts/
    └── sync-upstream.sh    ← Sync from oh-my-opencode
```

---

## Implementation Phases

### Phase 1: Create Development Branch
```bash
# Create acos-v11-integration branch
git checkout -b acos-v11-integration
```

### Phase 2: Fork oh-my-opencode Core
```
Copy to ACOS structure:
├── .sisyphus/              ← Core from oh-my-opencode
│   ├── rules/              ← Hook rules
│   └── agents/             ← Sisyphus, Hephaestus
├── src/
│   ├── hooks/              ← 25+ hooks
│   ├── tools/              ← Hash-anchored edit
│   └── models/             ← Model configurations
```

### Phase 3: Merge Current ACOS
```
Add existing:
├── skills/                  ← 75+ skills (keep)
├── commands/                ← 35+ commands (keep)
├── agents/                  ← 38 agents (keep)
└── hooks/v10/              ← Circuit breaker, IAM (keep)
```

### Phase 4: Create Dual Platform Adapters
```
.opencode/                  ← For OpenCode users
├── oh-my-opencode.json     ← Plugin config
└── install.sh             ← Auto-install

.claude/                   ← For Claude Code users
├── commands/               ← Slash commands
├── skills/                 ← Auto-activating skills
└── agents/                ← Agent personas
```

### Phase 5: Add Magic Words
```
Both platforms:
├── ultrawork / ulw         ← Fire all agents parallel
├── acos                    ← Smart router
├── frankx                  ← FrankX-specific workflows
└── [custom]
```

### Phase 6: Upstream Sync Script
```
sync-upstream.sh:
├── Fetch oh-my-opencode updates
├── Merge into ACOS structure
├── Resolve conflicts
├── Run tests
└── Create PR
```

---

## Breaking Changes Risk Assessment

| Risk | Mitigation |
|------|-------------|
| **Config conflicts** | Adapters isolate platform configs |
| **Hook duplication** | Prefix with `acos_` to avoid conflicts |
| **Agent name collision** | Rename: `sisyphus` → `acos_sisyphus` |
| **Missing dependencies** | Package.json with all required deps |
| **Tests break** | Full test suite before merge |
| **Upstream breaks** | Branch-based sync with manual merge |

---

## Branch Strategy

```
main                    ← Current stable (DO NOT TOUCH)
├── acos-v10            ← Previous version (tag)
└── acos-v11-integration ← DEVELOPMENT (THIS BRANCH)
    └── PR → main       ← Merge after testing
```

---

## What Gets Branded

| Original | ACOS v11 |
|----------|-----------|
| Sisyphus | ACOS Sisyphus |
| Hephaestus | ACOS Hephaestus |
| ultrawork | ultrawork (keep!) |
| oh-my-opencode | (reference only, NOT copied) |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Skills available | 75+ |
| Commands available | 40+ |
| Agent personas | 45+ |
| Hooks | 30+ |
| Platform support | 2 (CC + OC) |
| Upstream sync | Automated |
| Test pass rate | 100% |

---

## Next Actions

1. **Create branch**: `acos-v11-integration`
2. **Fork oh-my-opencode core** → `.sisyphus/`
3. **Merge current ACOS** →保留 skills/commands/agents
4. **Create adapters** → dual platform support
5. **Test** → verify both platforms work
6. **Sync script** → upstream update mechanism
7. **PR to main** → merge when stable

---

*ACOS v11: The ultimate agent harness - one install, all platforms.*
