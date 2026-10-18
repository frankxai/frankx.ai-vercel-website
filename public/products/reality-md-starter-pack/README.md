# reality.md Starter Pack (v1.0.0)

Give every AI coding agent your exact operating context in a single versioned file.

When you switch between Claude Code, OpenAI Codex, Cursor, Grok CLI, and Google Antigravity, context drift is the silent tax that breaks builds, invents directories, and violates repo boundaries. `reality.md` is your single source of truth (SSOT) for identity, active repositories, non-waivable invariants, harness routing, and FinOps budget guards.

---

## Included in This Bundle

| File | Purpose |
|---|---|
| `reality.template.md` | Production-grade annotated `reality.md` template with Truth Spine, Non-Waivable Invariants, Active Repos/Worktrees, Harness Routing Table, and FinOps Budget Guard. |
| `AGENTS.starter.md` | Drop-in `AGENTS.md` contract enforcing `Maker != Checker` verification, surgical diffs, and branch discipline (`agent/<harness>/<scope>`). |
| `5-invariants-checklist.md` | Pre-flight and post-slice verification checklist for any autonomous or interactive coding session. |
| `manifest.json` | Cryptographic SHA-256 and byte-size integrity manifest for deterministic verification. |

---

## 5-Minute Quickstart Across All 5 Harnesses

### Step 1: Initialize Your Canonical `reality.md`

Copy `reality.template.md` to the root of your control plane or primary repository as `reality.md`:

```bash
cp reality.template.md ./reality.md
cp AGENTS.starter.md ./AGENTS.md
```

Edit the bracketed placeholders (`<YOUR_HANDLE>`, `<PRIMARY_REPO_PATH>`, `<MONTHLY_TOKEN_CAP_USD>`) so every section reflects live ground truth. Never leave aspirational or unverified claims in `reality.md`.

---

### Step 2: Wire Your Harnesses to `reality.md`

#### 1. Claude Code (`~/.claude/CLAUDE.md` or Repo `CLAUDE.md`)
Add a pointer block at the top of `CLAUDE.md` so Claude Code loads your operating reality before any tool call:

```markdown
<!-- REALITY-SPINE:START -->
Before planning or editing any file, read `./reality.md` and `./AGENTS.md`.
Enforce all 5 Non-Waivable Invariants and the FinOps Budget Guard.
Branch convention: `agent/claude/<scope>`.
<!-- REALITY-SPINE:END -->
```

#### 2. Cursor (`.cursor/rules/reality.mdc` or `.cursorrules`)
Create `.cursor/rules/reality.mdc` with `alwaysApply: true`:

```markdown
---
description: Canonical workspace reality and invariant contract
globs: ["**/*"]
alwaysApply: true
---

Read `reality.md` and `AGENTS.md` at the workspace root before proposing multi-file edits.
- Never push directly to `main`.
- Never execute spend, billing, or external sends without human sign-off.
- Keep Maker and Checker roles in separate contexts for consequential changes.
```

#### 3. OpenAI Codex (`~/.codex/AGENTS.md` or Repo `AGENTS.md`)
Codex natively reads `AGENTS.md` in your repository root. Ensure `AGENTS.md` includes the `reality.md` reference (already wired in `AGENTS.starter.md`). Use branch prefix `codex/<scope>` or `agent/codex/<scope>`.

#### 4. Grok CLI (`~/.grok/AGENTS.md` & `~/.grok/config.toml`)
Point Grok CLI to your repo `AGENTS.md` and `reality.md` in `~/.grok/AGENTS.md`:

```markdown
Always inspect `./reality.md` for canonical paths, active worktrees, and verification gates before running shell commands.
Branch convention: `agent/grok/<scope>`.
```

#### 5. Google Antigravity / Gemini CLI (`~/.gemini/GEMINI.md` or Repo `GEMINI.md`)
Add the pointer block to `GEMINI.md`:

```markdown
## Workspace Bootstrap
1. Read `reality.md` and `AGENTS.md` before any write operation.
2. Run the 4-fact git check (`pwd`, `git rev-parse --show-toplevel`, `git remote get-url origin`, `git branch --show-current`) before committing.
3. Branch convention: `agent/antigravity/<scope>`.
```

---

## Operating Cadence

1. **Before Starting a Slice**: Walk through `5-invariants-checklist.md` (takes 60 seconds).
2. **During Execution**: One agent = one branch = one worktree. Keep edits surgical.
3. **Before Merging**: Run an independent verification pass (`Maker != Checker`) and record the exact commit SHA and test receipt.
4. **Weekly Hygiene**: Prune merged worktrees (`git worktree prune`) and update `reality.md` when canonical paths or priorities shift.

---

## License

MIT License — Copyright (c) FrankX (`https://frankx.ai`). Built on the Starlight Intelligence Protocol (SIP).
