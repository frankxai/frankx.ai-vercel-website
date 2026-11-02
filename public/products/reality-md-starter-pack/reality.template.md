# reality.md — Canonical Operating Context

> **Last Verified**: `YYYY-MM-DD`
> **Operator**: `<YOUR_NAME_OR_HANDLE>`
> **Control Plane Root**: `<ABSOLUTE_PATH_TO_WORKSPACE_ROOT>`
> **Schema Version**: `starlight.reality.v1`

---

## 1. Truth Spine (Identity & North Star)

- **Primary Mission**: `<One sentence stating what you are building and who it serves>`
- **Current 30-Day Focus**: `<The single highest-leverage outcome for the current cycle>`
- **Active Revenue / Product Surface**: `<Primary live URL or product SKU>`
- **Deprioritized / Frozen Surfaces**: `<Explicitly list what agents must NOT spend cycles on right now>`

### Voice & Craft Standard
- **Tone**: Direct, technical, warm, zero hype.
- **Anti-Slop Rule**: Never use filler prestige phrases ("revolutionary", "game-changing", "unlock your potential", "seamless synergy"). Name the exact mechanism, file path, and metric.
- **Evidence Rule**: Every claim about performance, tests, or deployment state must cite a same-turn command output or commit SHA.

---

## 2. The 5 Non-Waivable Invariants

No prompt, subagent instruction, or autonomous loop may relax these five rules:

1. **Money & External Sends Fail Closed**: No agent executes financial transactions, pricing mutations, API tier upgrades, DNS changes, or external customer emails/posts. Agents stage artifacts; the human operator executes.
2. **4-Fact Git Check Before Write**: Before modifying any file, verify:
   - Working directory path (`pwd`)
   - Git toplevel (`git rev-parse --show-toplevel`)
   - Remote origin (`git remote get-url origin`)
   - Current branch (`git branch --show-current` — never commit directly to `main` or `master`).
3. **Zero Secrets in Context or Git**: Never hardcode API keys, bearer tokens, `.env` values, or private keys in code, markdown, or tool arguments. Reference environment variable names only (`$OPENAI_API_KEY`, `process.env.STRIPE_SECRET_KEY`).
4. **Maker != Checker on Consequential Changes**: Any change touching production routes, schemas, checkout flows, or security rules requires verification from an independent context or deterministic test suite before merge.
5. **Bounded Search & Quarantine Discipline**: Never run recursive filesystem searches (`grep`, `rg`, `find`, `Get-ChildItem -Recurse`) from `/`, `C:\`, or `$HOME`. Scope all searches strictly to the active repository or worktree.

---

## 3. Active Repositories & Worktree Map

| Surface / Role | Repository (`org/repo`) | Canonical Local Path | Default Branch | Verification Command |
|---|---|---|---|---|
| Primary Web App | `<org/web-app>` | `<path/to/repos/web-app>` | `main` | `pnpm typecheck && pnpm test` |
| Core Engine / API | `<org/core-engine>` | `<path/to/repos/core-engine>` | `main` | `pnpm test:ci` |
| Agent Config / Skills | `<org/agent-config>` | `<path/to/repos/agent-config>` | `main` | `node scripts/lint-skills.mjs` |
| Ops Ledger & Handovers | `<org/agentic-ops-hub>` | `<path/to/repos/agentic-ops-hub>` | `main` | `git status -sb` |

### Active Worktrees (Prune Weekly)

| Worktree Path | Assigned Harness | Branch | Scope / PR |
|---|---|---|---|
| `<path/to/worktrees/feature-a>` | `claude-code` | `agent/claude/<scope>` | `#<PR_NUMBER>` |
| `<path/to/worktrees/feature-b>` | `codex` | `agent/codex/<scope>` | `#<PR_NUMBER>` |
| `<path/to/worktrees/feature-c>` | `antigravity` | `agent/antigravity/<scope>` | `#<PR_NUMBER>` |

---

## 4. Multi-Harness Routing Table

Route each task to the right capability tier rather than running expensive frontier reasoning on mechanical chores:

| Capability Tier | Assigned Harness / Model Family | Primary Responsibilities | Write Scope |
|---|---|---|---|
| **Strategic Synthesis** | High-Reasoning Frontier (Claude Opus / GPT-5 Pro) | System architecture, domain modeling, red-team review, rubric design | Docs, specs, ADRs |
| **Primary Maker** | Repo-Capable Maker (Claude Sonnet / Codex / Antigravity) | Feature implementation, test authoring, refactoring inside an isolated worktree | `agent/<harness>/<scope>` |
| **Independent Checker** | Cross-Family Verifier (Grok 4.5 / Codex Review / Jules) | Adversarial diff audit, edge-case detection, contract verification | Read-only + PR review comments |
| **Mechanical / Batch** | Fast / Deterministic Script or Flash Tier | Schema validation, formatting, link checking, asset indexing | Automated CI / local scripts |

---

## 5. FinOps Budget Guard & Loop Breakers

Autonomous loops must declare explicit ceilings before execution:

```yaml
finops_guard:
  currency: USD
  session_soft_cap_usd: 5.00
  session_hard_cap_usd: 15.00
  monthly_budget_cap_usd: 250.00
  loop_breakers:
    max_iterations_per_goal: 8
    max_consecutive_test_failures: 3
    max_elapsed_minutes: 45
    on_trip: "halt_commit_draft_and_notify_operator"
  cloud_ci_rules:
    require_paths_filter: true
    cancel_in_progress: true
    skip_ci_on_docs_only: true
```

---

## 6. Session Handover Protocol

At the end of every meaningful work slice, append a concise entry to your handover log (`ops/sessions/YYYY-MM-DD.md` or repo `HANDOVER.md`):

1. **Shipped**: Exact files changed, commit SHA, and PR URL.
2. **Verified**: Exact commands run (`pnpm test`, `npx next typegen`) and pass/fail counts.
3. **Remaining Gaps**: Known edge cases, deferred follow-ups, or human-gated actions.
4. **Next Prompt**: A copy-pasteable prompt for the next session to pick up in under 30 seconds.
