# FrankX â€” AGENTS.md

**Repo:** `frankxai/FrankX` (private dev + content authoring)
**Branch (default):** `main` Â· **Active feature:** `feature/prompt-hub`
**Live site:** https://frankx.ai (deploys from a *different* repo â€” see "Deploy" below)
**Stack:** Next.js 16 App Router Â· React 18.3 Â· TypeScript 5.7 Â· Tailwind 3.4 Â· Vercel Â· pnpm/npm
**Last touched:** 2026-05-20

## Current sprint (W21, 2026-05-18 â†’ 24)

- **Theme:** Deliver NLDigital. Ship Newsletter Issue 1. Lock June 1 launch.
- **Authoritative doc:** `docs/planning/2026-W21-sprint.md`
- **Machine shadow:** `data/sprint-current.json` (backs `/sprint`)
- **Forcing functions:** NLDigital delivered Tue 5/19 Â· Newsletter Issue 1 ships Fri 5/22 Â· Inner Circle launches Mon 6/1 Â· Madrid trip Wed 5/27 â†’ Mon 6/2
- **In-flight foundations:** `/hub-audit` `/traffic-week` `/newsletter-week` commands + `@integrity-guard` agent shipped 2026-05-20

This file is the canonical brief for any AI agent (Codex, Claude Code, Gemini, OpenCode, Cursor, etc.) entering this repo. **Read it first. Read it before AGENTS.md elsewhere.** It overrides general-purpose agent assumptions and points you at the specific files that govern behavior.

---

## 1. Read in this order

1. **This file** â€” orientation
2. **`CLAUDE.md`** â€” project-level Claude Code instructions (covers brand, deploy, design contract, anti-patterns)
3. **`.codex/instructions.md`** â€” Codex-specific delta on top of this file (worktree usage, dangerous-bypass scope)
4. **`OPS-INDEX.md`** â€” single front-door pointer index (read for "where does X live?")
5. **`design.md` + `taste.md`** â€” visual contract (tokens + judgment). Required before any UI work.
6. **`.frankx/identity.md` + `.frankx/brand.md` + `.frankx/stack.md`** â€” who Frank is, brand voice, tech reference
7. **Memory index** at `~/.claude/projects/C--Users-frank-FrankX/memory/MEMORY.md` (Claude Code) â€” 50+ topic files

---

## 2. Two-repo deploy architecture (CRITICAL)

`frankx.ai` does **not** deploy from this repo. Pushing to `main` here ships nothing to production.

| Repo                                | Role                            | Vercel project             |
| ----------------------------------- | ------------------------------- | -------------------------- |
| `frankxai/FrankX` (this)            | Private dev + content authoring | (not deployed)             |
| `frankxai/frankx.ai-vercel-website` | **PRODUCTION**                  | `frankx-ai-vercel-website` |

To ship: sync the relevant files to the production repo and push there. See `CLAUDE.md` Â§ "Production Deployment" for the full sync workflow. There is also a sibling worktree at `C:\Users\frank\frankx-prod-sync\` cloned from production.

**Do not** add an `origin` for `frankx.ai-vercel-website` to this repo and force-push. They are intentionally separate.

---

## 3. Health + diagnostics â€” single command

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

## 4. Branch hygiene + parallel-agent coordination

Multiple agents (Claude, Grok, Gemini, Codex, Cursor, Cline) work this repo in parallel. Git is the coordination layer â€” these rules keep them from colliding. Don't trust a hardcoded "current branch" anywhere; run `git branch --show-current` and `git worktree list` for live state.

- **Default branch:** `main`. Never two agents committing in the same working tree.
- **One agent = one branch.** Name it `agent/<harness>/<short-scope>` (e.g. `agent/grok/seo-pass`, `agent/claude/404-radar`). This makes `git branch -a` the live ownership map.
- **Claim before you touch.** Read + append a row to `.agent/active-agents.md` (the live board) and pick a scope that doesn't overlap an active row. Remove your row when you push/merge.
- **Heavy or risky parallel work â†’ your own worktree:** `git worktree add .worktrees/<name> -b agent/<harness>/<scope>`. Isolates the filesystem too, so a failed build in one agent can't corrupt another's checkout. Don't switch branches in the main checkout while another agent is mid-edit there.
- **Integrate through the gate, one at a time.** `npm run merge:gate` clean â†’ push your branch â†’ PR or fast-forward to `main`. Never two agents merging to `main` in the same moment.
- **Foreign state = another agent's work.** Untracked files, dirty branches, or worktrees you didn't create: investigate (`git log -1 <branch>`, check the board) before deleting or overwriting. Treat a board row as abandoned only if its branch has no commits in >24h.
- **Stale branch policy:** unmerged + untouched > 30 days is archival-candidate. Inspect with `git log --left-right` before deleting.

`.gitattributes` enforces LF on all source files. If `git status` shows mass "modified" on files you didn't touch, run `git checkout -- .` once after pulling â€” that's a one-time CRLF re-normalization.

---

## 5. The merge gate â€” what must pass before `main`

### Public/private content gate

- Public content must follow `C:\Users\frank\.starlight\policies\public-private-content-boundary.md`.
- A client or partner hub is a route-scoped permission boundary. Material approved for that hub must not be reused in blogs, newsletters, social posts, screenshots, diagrams, marketplace copy, or other public routes without a separate consent record for that surface.
- Before publishing, scan copy, frontmatter, code blocks, filenames, alt text, captions, metadata, links, and public assets for names and identifying operational details.
- If named-entity consent is absent, use a generic or fictional example and remove identifying repositories, packages, plugins, skills, versions, commands, workflows, roadmaps, and orphaned assets.
- Named or client-adjacent public releases require an independent privacy verifier and a post-deploy scan of live HTML and direct asset URLs.

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
# PASS â†’ publish. WARN â†’ ship with corrections. FAIL â†’ block.
```

See `.claude/agents/integrity-guard.md`. Shipped 2026-05-20.

---

## 5b. The 6-layer operating loop (added 2026-05-20)

Every operating decision composes into one of six layers. Full doctrine in `CLAUDE.md` Â§ "The 6-layer Operating Loop". Quick reference:

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

## 6. Brand discipline â€” non-negotiable

- **Voice:** "Elite Creator. AI Architect. Humble Excellence." â€” direct, technical, results-first, never spiritual or guru. See `.frankx/brand.md`.
- **Title:** "AI Architect" (never "AI Systems Architect", never "Senior AI Architect").
- **No Arcanean mythology in FrankX copy.** Guardians, Gates, Realms, Seekers belong in `/ultraworld` and the `Arcanea` repo. FrankX is brand-clean.
- **No Canva.** Use your harness's native image generation if it has one (Grok Build does); otherwise Nano Banana 2 (Gemini 3.1 Flash Image) via `scripts/lib/nb-image.mjs` or the `scripts/nb-generate.mjs` CLI. Either way hold the active `lib/gen/lanes.ts` lane â€” never mix lanes on one asset. See the `nb-image` and `gen` skills.
- **No emoji in user-facing copy** unless the user explicitly asked. (System prompts may use them.)
- **No AI-slop tells:** `delve`, `dive into`, `it's worth noting`, `certainly`, `absolutely`, `unleash`, `unlock the power of`, `revolutionary`, `game-changing`. Refusal list in `taste.md`.

---

## 7. The design contract

Two files at repo root govern visual decisions. **Read both before any UI work.**

- **`design.md`** â€” Google Labs DESIGN.md spec (alpha, Apache 2.0). YAML tokens (colors, type, spacing, rounded, components) + canonical Do's/Don'ts. Source of truth: `tailwind.config.js` and `lib/design-system.ts` â€” `design.md` mirrors them in agent-readable form.
- **`taste.md`** â€” companion. Restraint test, AI-slop refusal list, the 8-step polish pass. The judgment Google's spec deliberately doesn't capture.

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
| Creator Ecosystem & Sovereign Wealth Blueprint             | `docs/strategy/creator-ecosystem-blueprint.md`     |

---

## 9. Anti-patterns â€” never

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

## Design Taste Kernel

For any site, app, landing page, dashboard, visual identity, brand, motion, media, social, or frontend task, apply the shared Design Taste Kernel before handoff:

- C:\Users\frank\starlight\repos\DESIGN_TASTE.md
- C:\Users\frank\starlight\repos\WEB_EXPERIENCE_STANDARD.md
- C:\Users\frank\starlight\repos\MOTION_TASTE_RUBRIC.md
- C:\Users\frank\starlight\repos\MULTI_AGENT_DESIGN_COUNCIL.md
- C:\Users\frank\starlight\repos\VISUAL_QA_GATE.md

When motion, scroll, generated media, GIF/video, or premium polish matters, route through the Motion Design Studio plugin/skills and verify the result visually.


<!-- PREMIUM-WEB-OS:START -->
## Premium Intelligence Web OS Adoption

This repo participates in the Starlight Premium Intelligence Web OS.

For any website, app, landing page, dashboard, brand surface, visual asset, motion system, 3D/WebGL scene, generated media, or public-facing UI work:

- Read the estate OS first: `C:\Users\frank\starlight\repos\_intelligence\README.md`.
- Use the activation contract: `C:\Users\frank\starlight\repos\_intelligence\adoption\activation-contract.md`.
- Treat `C:\Users\frank\starlight\repos\_intelligence\` as the source of truth for premium web taste, design, motion, WebGL, copy, assets, and quality gates.
- Use `/pwo` or the `premium-web-os` skill for full builds; use `/mad` for a design council pass.
- Use `/pwo review-pr` before absorbing another agent's PR or branch.
- Use `/pwo absorb-assets` before using external, generated, scientific, audio, video, or 3D assets.
- Use `/pwo motion-score` before shipping cinematic scroll, sound-paired motion, or complex choreography.
- Build static composition first, add Track A local motion second, add Track B GSAP/Lenis scroll only when earned, and add 3D only with fallback and reduced-motion behavior.
- Use VIS through `C:\Users\frank\starlight\repos\visual-intelligence` for asset provenance, curation packets, rights, and publication records.
- Use `C:\Users\frank\starlight\repos\_intelligence\visual-worlds\neural-cosmos.md` for neuroscience, cerebrum, spine, electron, signal, or golden spiral direction.
- Do not copy reference sites or agencies. Deconstruct principles and create original execution.
- Do not ship without responsive, accessibility, performance, reduced-motion, and visual QA checks appropriate to the change.

Repo-local instructions remain authoritative when stricter.
<!-- PREMIUM-WEB-OS:END -->
