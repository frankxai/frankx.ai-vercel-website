# Multi-Agent Orchestration Stack (2026)

## Objective

Pick a practical system that keeps Claude, Codex, Gemini, and extension-based agents in sync without merge chaos.

## Reality Check: What Exists Now

### VS Code Agent Mode (native control plane)

- Native support for agent mode is in VS Code Copilot Chat.
- Supports isolated changes and parallel work via git worktrees.
- Supports third-party/custom agents via MCP.

### GitHub Copilot Coding Agent (GitHub-side execution)

- Runs coding tasks in GitHub Actions environments.
- Supports MCP servers and custom agents in repositories.
- Useful for issue-to-PR automation.

### Cline and Kilo Code (extension worker agents)

- Cline has documented worktree-based task/project flow and MCP tooling.
- Kilo Code exposes orchestrator/parallel patterns and multi-model support.
- Both are useful as worker agents under a shared git/worktree protocol.

### OpenHands (autonomous OSS coding agent)

- Open-source software-development agent with broad model support.
- Good for delegated issue-level implementation in parallel.

## Recommended FrankX Pattern

Use a **hybrid architecture**:

1. **Control Plane**: VS Code agent mode + your Starlight Orchestrator command flow.
2. **Execution Plane**: one git worktree per core agent (`claude`, `codex`, `gemini`), plus optional Cline/Kilo/OpenHands worker branches.
3. **Coordination Plane**: shared `docs/handoffs/STATUS.md` + per-task file locks.
4. **Quality Plane**: strict merge gate (`type-check`, `claims:audit:strict`, `links:check`) before deploy.

This keeps tool choice flexible while forcing deterministic collaboration.

## Repo Implementation (now in place)

- `scripts/agents/setup-worktrees.sh`
- `scripts/agents/locks.mjs`
- `agents/coordination/file-locks.json`
- `docs/handoffs/STATUS.md`
- `docs/handoffs/README.md`
- `package.json` scripts:
  - `agents:worktrees`
  - `agents:locks`
  - `merge:gate`
  - `links:check:ci`
- `.github/workflows/ci.yml` merge gate enforcement

## Starlight Integration Hook Points

- Use `docs/handoffs/STATUS.md` as handoff source-of-truth for Starlight sync.
- Mirror `agents/coordination/file-locks.json` into Starlight memory snapshots.
- Trigger Starlight scoring only after `merge:gate` passes.

## Shared Image Ops Layer (ACOS / Starlight / Arcanea)

- Routing policy: `data/ai-ops/image-model-router.json`
- Planner: `npm run image:plan -- --intent <intent>`
- Generator: `npm run image:generate -- --intent <intent> --prompt \"...\" --auto`
- A/B test across providers: `npm run image:matrix -- --prompt \"...\" --intent <intent>`

Recommended usage:
1. Keep `nano-banana` as default in Claude MCP flows.
2. Use `openai` for text-heavy visuals.
3. Use `xai` for fast style exploration.
4. Use `replicate` for model sweeps and batch variants.
