# FrankX — AGENTS.md

**Repo:** `frankxai/FrankX` (private dev + content authoring)
**Branch (default):** `main` · **Active feature:** `feature/prompt-hub`
**Live site:** https://frankx.ai (deploys from a *different* repo — see "Deploy" below)
**Stack:** Next.js 16 App Router · React 18.3 · TypeScript 5.7 · Tailwind 3.4 · Vercel · pnpm/npm
**Last touched:** 2026-06-02

## Current sprint (W21, 2026-05-18 → 24)

- **Theme:** Deliver NLDigital. Ship Newsletter Issue 1. Lock June 1 launch.
- **Authoritative doc:** `docs/planning/2026-W21-sprint.md`
- **Machine shadow:** `data/sprint-current.json` (backs `/sprint`)
- **Forcing functions:** NLDigital delivered Tue 5/19 · Newsletter Issue 1 ships Fri 5/22 · Inner Circle launches Mon 6/1 · Madrid trip Wed 5/27 → Mon 6/2
- **In-flight foundations:** `/hub-audit` `/traffic-week` `/newsletter-week` commands + `@integrity-guard` agent shipped 2026-05-20

This file is the canonical brief for any AI agent (Codex, Claude Code, Gemini, OpenCode, Cursor, etc.) entering this repo. **Read it first. Read it before AGENTS.md elsewhere.** It overrides general-purpose agent assumptions and points you at the specific files that govern behavior.

---

## 1. Read in this order

1. **This file** — orientation
2. **`CLAUDE.md`** — project-level Claude Code instructions (covers brand, deploy, design contract, anti-patterns)
3. **`.codex/instructions.md`** — Codex-specific delta on top of this file (worktree usage, dangerous-bypass scope)
4. **`OPS-INDEX.md`** — single front-door pointer index (read for "where does X live?")
5. **`design.md` + `taste.md`** — visual contract (tokens + judgment). Required before any UI work.
6. **`.frankx/identity.md` + `.frankx/brand.md` + `.frankx/stack.md`** — who Frank is, brand voice, tech reference
7. **Memory index** at `~/.claude/projects/C--Users-frank-FrankX/memory/MEMORY.md` (Claude Code) — 50+ topic files

---

## 2. Two-repo deploy architecture (CRITICAL)

`frankx.ai` does **not** deploy from this repo. Pushing to `main` here ships nothing to production.

| Repo                                | Role                            | Vercel project             |
| ----------------------------------- | ------------------------------- | -------------------------- |
| `frankxai/FrankX` (this)            | Private dev + content authoring | (not deployed)             |
| `frankxai/frankx.ai-vercel-website` | **PRODUCTION**                  | `frankx-ai-vercel-website` |

To ship: sync the relevant files to the production repo and push there. See `CLAUDE.md` § "Production Deployment" for the full sync workflow. There is also a sibling worktree at `C:\Users\frank\frankx-prod-sync\` cloned from production.

**Do not** add an `origin` for `frankx.ai-vercel-website` to this repo and force-push. They are intentionally separate.

---

## 3. Health + diagnostics — single command

```bash
# Process + port + memory snapshot (PowerShell)
npm run health

# Stop runaway SIS dev stack (dry-run by default)
npm run sis:stop          # show
npm run sis:stop:apply    # actually stop

# Cross-repo agent harness audit
npm run agents:audit      # writes .frankx/machine/agent-harness-audit.json

# Type-check + claims audit + link check (the merge gate)
npm run merge:gate

# Full pre-deploy gate (merge:gate + sync:check)
npm run predeploy
```

If `npm run health` reports orphan Codex sessions, see `docs/ops/SESSION-CAPTURE-2026-05-06.md` for context.

---

## 4. Branch hygiene

- **Default branch:** `main`
- **Working branch right now:** `feature/papa-hub` (Witali Riemer hub work, shipped to production via Trees-API on 2026-05-05)
- **Worktrees** at `.worktrees/` — `draft`, `memory-abstraction`, `preview`. Use these for parallel work; do not switch branches in the main checkout.
- **Stale branch policy:** any branch unmerged + untouched > 30 days is candidate for archival. Always inspect with `git log --left-right` before deleting.

`.gitattributes` enforces LF on all source files. If `git status` shows mass "modified" on files you didn't touch, run `git checkout -- .` once after pulling — that's a one-time CRLF re-normalization.

---

## 5. The merge gate — what must pass before `main`

```bash
npm run merge:gate
# = npm run type-check
#   && npm run claims:audit:strict   (no unverified marketing claims)
#   && npm run links:check:ci         (no broken internal links)
```

Plus, before any production sync:

```bash
npm run predeploy
# = merge:gate + sync:check (parity with frankx.ai-vercel-website)
```

If any agent skips these gates, that's a regression. CI runs `npm run ci:check` which adds `lint + content:validate + diagrams:guard`.

Plus, before any content publish (newsletter, blog post, social):

```
@integrity-guard <file-or-surface>
# 5-gate quality check: brand voice + AI-slop + claim audit + schema + conversion
# PASS → publish. WARN → ship with corrections. FAIL → block.
```

See `.claude/agents/integrity-guard.md`. Shipped 2026-05-20.

---

## 5b. The 6-layer operating loop (added 2026-05-20)

Every operating decision composes into one of six layers. Full doctrine in `CLAUDE.md` § "The 6-layer Operating Loop". Quick reference:

| Layer | Question | Tier-1 commands |
|---|---|---|
| L1 Intelligence | What's worth saying? | `/research` `/deepresearch` `/new-model` |
| L2 Strategy + Plan | What gets made + when? | `/content-strategy` `/plan-week` `/traffic-week` `/sunday` |
| L3 Production | Make the thing | `/factory` `/talking-head-ship` `/visual-strategy` |
| L4 Excellence Gates | Don't ship slop | `/v` `/hub-audit` `/seo-check` `@integrity-guard` |
| L5 Distribution | Reach the reader | `/content-ops` `/newsletter-week` `/publish` `/amplify-attendee` |
| L6 Learning | What worked? | `/palace` `/chronicle` `/hook-learn` `/sentinel` |

The weekly cadence walks all six. Skipping L4 produces the LLM-slop output the site refuses to ship. Skipping L6 produces a one-way street.

---

## 5c. Antigravity-Native Swarm Orchestration (added 2026-05-29)

Antigravity natively federalizes and runs ACOS's 99+ specialized agents as dynamic subagents using native tool definitions. 

**Operating Protocol:**
1. **Discovery:** Load agent parameters dynamically from the registry cache `.antigravity/agents-registry.json` or by running `node scripts/lib/acos-agy-registry.mjs <agent-name>`.
2. **Registration:** Define the subagent dynamically using the `define_subagent` tool. The system pre-compiles the FrankX Voice & Brand Guard directly into the system instructions.
3. **Execution:** Invoke the subagent using `invoke_subagent` to execute specialized tasks or coordinate multi-agent cascades.

For full guidelines and trigger mappings, read `.antigravity/instructions.md`.

---

## 6. Brand discipline — non-negotiable

- **Voice:** "Elite Creator. AI Architect. Humble Excellence." — direct, technical, results-first, never spiritual or guru. See `.frankx/brand.md`.
- **Title:** "AI Architect" (never "AI Systems Architect", never "Senior AI Architect").
- **No Arcanean mythology in FrankX copy.** Guardians, Gates, Realms, Seekers belong in `/ultraworld` and the `Arcanea` repo. FrankX is brand-clean.
- **No Canva.** All visuals use Nano Banana 2 (Gemini 3.1 Flash Image) via `scripts/lib/nb-image.mjs` or the `scripts/nb-generate.mjs` CLI. See the `nb-image` skill.
- **No emoji in user-facing copy** unless the user explicitly asked. (System prompts may use them.)
- **No AI-slop tells:** `delve`, `dive into`, `it's worth noting`, `certainly`, `absolutely`, `unleash`, `unlock the power of`, `revolutionary`, `game-changing`. Refusal list in `taste.md`.

---

## 7. The design contract

Two files at repo root govern visual decisions. **Read both before any UI work.**

- **`design.md`** — Google Labs DESIGN.md spec (alpha, Apache 2.0). YAML tokens (colors, type, spacing, rounded, components) + canonical Do's/Don'ts. Source of truth: `tailwind.config.js` and `lib/design-system.ts` — `design.md` mirrors them in agent-readable form.
- **`taste.md`** — companion. Restraint test, AI-slop refusal list, the 8-step polish pass. The judgment Google's spec deliberately doesn't capture.

The answer is usually less.

---

## 8. Where things live (pointer-only)

| You need...                                                | Look here                                         |
| ---------------------------------------------------------- | ------------------------------------------------- |
| Project-level Claude rules                                 | `CLAUDE.md`                                        |
| Codex-specific rules                                       | `.codex/instructions.md`                           |
| Front-door pointer index                                   | `OPS-INDEX.md`                                     |
| Frank's identity / brand / stack / family                  | `.frankx/`                                         |
| Machine state (inventory, accounts, programs log)          | `.frankx/machine/`                                 |
| Memory across sessions (Claude Code)                       | `~/.claude/projects/C--Users-frank-FrankX/memory/` |
| Sibling-repo registry (which repo for what?)               | `C:\Users\frank\REPO-REGISTRY.md`                  |
| Slash commands                                             | `.claude/commands/`                                |
| Project agents                                             | `.claude/agents/`                                  |
| Skills (project-level)                                     | `.claude/skills/`                                  |
| Recent decisions / handovers                               | `docs/ops/HANDOVER-*.md` (newest first)            |
| Architecture + strategy (Personal Data Mesh, SIS-MCP plan) | `docs/PERSONAL_DATA_MESH.md`, `docs/ops/SIS-MCP-PROPAGATION-PLAN.md` |
| Audit log (overnight excellence audit, 2026-05-06)         | `docs/ops/2026-05-06-MASTER-EXCELLENCE-AUDIT.md`   |

---

## 9. Anti-patterns — never

- **Never rename working URLs.** `/library/{slug}` is `/library/{slug}` forever. SEO history matters more than aesthetics.
- **Never delete pages with traffic.** Unlink from nav, keep page noindex'd at most.
- **Never push to `main` without `npm run merge:gate` clean.** No exceptions for "trivial" fixes.
- **Never `git stash pop` without a clean working tree.** The `~/.claude/` substrate had to be hand-rescued from this exact mistake on 2026-05-06.
- **Never auto-resolve a merge conflict in `~/.claude/`.** That's the agent operating system. Always read, plan, then human-gate.
- **Never delete nested `.git` directories without a read-only audit first.** Memory: 2026-04-20 nested `.git` had 48 unique commits + 628 dirty files that would have been destroyed by naive cleanup.
- **Never invent a function/file/flag from memory without verifying it exists.** Memory entries become stale; the code is authoritative.

---

## 10. Default work pattern

1. Read this file + `CLAUDE.md` + relevant skill files.
2. State in one sentence what you're about to do.
3. Make the change in the smallest reversible unit.
4. Run the relevant gate (`type-check` for TS edits, `links:check` for content edits).
5. Commit with a Conventional Commit message (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`).
6. Auto-push completed work on feature branches you own. Do not push `main` or the production repo without explicit ship/deploy approval.

If you discover unexpected state (untracked files, dirty branches, foreign worktrees), **investigate before deleting or overwriting**. It may be in-progress work from another agent.

---

## 11. Forcing-function deadlines (as of 2026-05-07)

These shape priority. Confirm in `docs/planning/2026-W19-sprint.md` for the latest.

| When             | What                                            |
| ---------------- | ----------------------------------------------- |
| 2026-05-19       | NLDigital workshop (Build First AI Agent)       |
| 2026-05-27       | Madrid workshop (Build First AI Agent)          |
| 2026-W23         | SIS MCP propagation across 6 repos (post-Madrid)|

---

_End of AGENTS.md. If something here is wrong or missing, the rule is: edit the source-of-truth file (CLAUDE.md, .frankx/*, OPS-INDEX.md) and update the pointer here. Don't duplicate content._
