# AGENTS.md — Workspace Agent Contract

> Drop this file into the root of your repository alongside `reality.md`. Compatible with Claude Code, OpenAI Codex, Cursor, Grok CLI, OpenCode, and Google Antigravity.

---

## 0. Precedence & Grounding

1. Read `./reality.md` before planning or executing any multi-file change.
2. Local repository gates in this file outrank generic global defaults.
3. Verify current state from live files and git history — never guess file paths, exports, or schema shapes from memory.

---

## 1. The Five Engineering Guardrails

1. **Think Before Coding**: State assumptions explicitly. When an instruction has two plausible interpretations, surface the trade-off before writing code.
2. **Explain Simply**: Name the concrete function, state transition, or data flow. Avoid vague verbs like "streamline", "optimize", or "enhance".
3. **Minimum Viable Architecture**: Write the smallest coherent change that satisfies the acceptance criteria. Do not introduce speculative abstractions or unused configuration flags.
4. **Surgical Diffs**: Touch only the files required for the assigned slice. Note unrelated dead code or tech debt in your handover summary instead of sweeping it into the same PR.
5. **Goal-Driven Verification**: Every bug fix starts with a reproducing test or deterministic reproduction command; every feature ends with an automated check.

---

## 2. Maker != Checker Protocol

No agent grades its own homework on consequential changes:

| Role | Responsibility | Forbidden Actions |
|---|---|---|
| **Maker** | Implements the slice on an isolated branch (`agent/<harness>/<scope>`), runs local typecheck and unit tests, and records evidence. | May not self-approve production promotion or bypass failing lint/test gates. |
| **Checker (Verifier)** | Runs in an independent context (or separate model family). Audits the exact `git diff`, checks invariant compliance, and runs verification commands. | May not silently rewrite the Maker's implementation without recording a review finding. |
| **Human Operator** | Approves production deploys, billing/pricing updates, credentials, DNS changes, and external communications. | — |

---

## 3. Branch, Worktree & PR Discipline

- **Branch Naming**:
  - Claude Code: `agent/claude/<scope>`
  - OpenAI Codex: `codex/<scope>` or `agent/codex/<scope>`
  - Grok CLI: `agent/grok/<scope>`
  - Antigravity / Gemini: `agent/antigravity/<scope>`
- **Worktree Isolation**: When multiple agents operate concurrently, each agent works in a dedicated `git worktree` so working trees never collide.
- **Draft-First PRs**: Open pull requests as Draft until typecheck, tests, and independent verification pass.
- **Commit Hygiene**: Write clear conventional commits (`feat(scope): ...`, `fix(scope): ...`, `docs(scope): ...`). Use `[skip ci]` on pure documentation commits when appropriate.

---

## 4. Non-Waivable Safety Rules

- **Money Fails Closed**: Never trigger live payment captures, price mutations, paid API provisioning, or external webhooks.
- **Secret Hygiene**: Never commit `.env*` files, tokens, or private keys. If a secret is accidentally exposed, halt immediately and notify the operator to rotate it.
- **URL & Public Contract Stability**: Never rename a live public route or breaking API endpoint without an explicit redirect and operator sign-off.
