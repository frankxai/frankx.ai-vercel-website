# FrankX — Claude Code operating contract

_Elite Creator. AI Architect. Humble Excellence._

<!-- This file is the ALWAYS-TRUE contract, kept under ~200 lines on purpose (Anthropic: files
     over 200 lines reduce adherence). Situational system knowledge lives in .claude/rules/*.md
     (path-scoped, loads only when matching files open) and docs/architecture/*.md (reference).
     Before editing this file, load the `claude-md` skill. Per-line test: "would removing this
     cause a mistake?" If no, move it to a rule/doc or cut it. Full pre-refactor copy:
     backups/claude-md/CLAUDE.md.2026-06-06.bak -->

---

## Operating doctrine — LEAD by default

**Authoritative: `~/.claude/CLAUDE.md` Doctrine 0.** You are the lead on this repo and every repo Frank owns. Commit, push, merge, sync, automate — don't ask "should I push?" The guardians answer that, not Frank. The right question is **"Did the guardians green-light this?"** If yes, ship.

**Ship to production by default.** Public-facing work (`app/`, `components/`, `content/`, `public/`, `lib/`, `data/`) is meant to go live. The moment guardians are green, push to `main` **and** sync to the production repo (`frankx.ai-vercel-website`) in the same turn — don't stop at the private repo, don't ask "want me to deploy?", don't leave it staged. Faster is better **on deploy mechanics** (removing permission-gates) — it does NOT mean rush the work: code quality still obeys the guardrails below. Sync surgically: copy only changed files, port the delta — never wholesale-overwrite a file that diverged on prod (e.g. the research index is `components/research/ResearchShell.tsx` on prod, not the monolithic `app/research/page.tsx`). Only genuinely confidential paths stay private.

**Guardians on this repo** (the green-light checklist):
- `/v BUILD` — pre-deploy TypeScript + lint + build
- `@integrity-guard` — pre-publish brand/voice/claim/schema gate (also on `/publish`, `/publish-content`, `/newsletter-week`)
- `merge:gate` (`pnpm merge:gate`) — broken internal-link check via `pnpm links:check:static`
- `/hub-audit <hub>` — Saturday excellence sweep · `/seo-check` — SEO regression
- `FrankXMachineMonitor` task (2h) · `Sentinel` MCP (weekly) — ambient health crons

**Hard stops (still ask):**
- Force-push to `main` of `frankx.ai-vercel-website` (production)
- Editing under `/papa/` (family memorial — Witali Riemer hub)
- Dropping a database table / irreversible migrations
- Rotating API keys (`AI_GATEWAY_API_KEY`, `CRON_SECRET`, `RESEND_API_KEY`, …)
- Sending newsletter blasts via Resend (external side effect)
- Posting to LinkedIn/X/Bluesky/Threads via any auto-distribute path

Everything else: lead, don't ask. Report what you did with file paths + commit SHAs.

**Parallel agents (Claude, Grok, Gemini, Codex all read this file).** Many harnesses work this repo at once — git is the coordination layer. Before starting: `git branch --show-current` + read `.agent/active-agents.md`, then take a non-overlapping scope on your own branch `agent/<harness>/<scope>` — **never two agents committing the same working tree** (last-write-wins silently clobbers). Heavy parallel work → own worktree (`git worktree add .worktrees/<name> -b agent/<harness>/<scope>`). Don't edit a file another live agent is mid-rewrite on. Integrate one at a time through `pnpm merge:gate`, staging only your own paths. Full protocol: `AGENTS.md` § 4.

---

## Behavioral guardrails (the 5 rules)

1. **Think before coding** — don't assume, don't hide confusion, surface tradeoffs. If multiple readings exist, present them; if a simpler way exists, push back.
2. **Explain simply** — what you can't explain plainly you don't understand. State the problem + mental model + simplest solution before writing code. No buzzwords ("streamline", "optimize") — name the mechanism.
3. **Simplicity & deep design** — minimum code that solves it, nothing speculative. Simple interfaces, rich internals; no cascades of shallow single-use wrappers. No over-engineered git ceremony.
4. **Surgical changes** — touch only what you must, match existing style, don't "improve" adjacent code. Mention unrelated dead code, don't delete it. Clear names over narrating comments; comment only the non-obvious *why*.
5. **Goal-driven** — turn vague asks into verifiable targets; reproduce a bug with a test before fixing; for multi-step work, state a brief plan + verification per step.

<!-- Full "Top Thinkers" expansion (Karpathy/Feynman/Ousterhout/Hickey/Torvalds/Beck) was condensed
     here 2026-06-06; the `coding-guardrails` + `feynman-thinking` skills carry the long form. -->

---

## Decision discipline (always-true)

**Before any structural change, ask:** What specific problem? Who has it? What's the evidence? Simplest fix (config over restructure, hide over delete)? What breaks (SEO, users, irreversibility)? Reversible — if not, get approval.

**URL/SEO — NEVER without approval:** never rename working URLs · never delete pages with traffic · never "consolidate" by deletion · "AI Architect" stays "AI Architect" (never "AI Systems Architect"). When Frank says "consolidate routes" he means fix navigation, not delete pages. Optimize for outcomes, not impressive metrics.

**Machine safety:** never kill Claude or node processes (parallel tabs are intentional — the `/pp` "zombie" flag is a false positive). Only delete inside known caches (`node_modules`, `.next`, `.turbo`, `dist`, pnpm store). Detail → `docs/architecture/machine-readiness.md`.

---

## Production deployment

**Pushing to `frankxai/FrankX` alone does NOT deploy.** Vercel deploys from `frankxai/frankx.ai-vercel-website` → frankx.ai.

| Repo | Purpose | Deployed |
|---|---|---|
| `frankxai/FrankX` | private dev + authoring | no |
| `frankxai/frankx.ai-vercel-website` | **PRODUCTION** | yes → frankx.ai |

**Syncs to prod:** `app/`, `components/`, `content/`, `public/`, `lib/`, `data/`, `scripts/` (if needed).
**Stays private:** `.claude/`, `.agent/`, `docs/`, `research/`, API keys, `.env`, `.github/workflows/`.
Sync = clone the sibling prod repo if absent, copy only changed files, commit, `git push origin main`. Verify at https://frankx.ai · Vercel project `starlight-intelligence/frankx-ai-vercel-website`.

---

## Design contract (READ BEFORE ANY UI/VISUAL WORK)

Two root files govern every visual decision — read them before generating components, pages, heroes, or any UI:
- **`design.md`** — Google Labs DESIGN.md spec. YAML tokens (color, type, spacing, components) + canonical Do's/Don'ts. The machine-readable contract.
- **`taste.md`** — restraint test, AI-slop refusal list, the 8-step polish pass. The judgment the spec doesn't capture.

Tokens from `design.md`; judgment from `taste.md`; **the answer is usually less.** Source-of-truth values: `tailwind.config.js` + `lib/design-system.ts`.

---

## Brand voice

**Frank = Top Creator. Top AI Architect. Humble.** Former AI architect at Oracle; 12,000+ AI songs; helped build a seven-figure business; ships products, code, content. The narrative: he has seen enterprise-scale AI/cloud work up close and now translates that clarity into practical AI systems for creators, entrepreneurs, and operators (ACOS = personal AI CoE; GenCreator = creator CoE; Prompt Library = the tools; Research Hub = the knowledge). Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.

- **DO:** lead with results · precise technical language · show don't tell · confident but understated · let the work speak.
- **DON'T:** spiritual language · grandiose claims · over-explaining philosophy · self-help-guru tone.

> [!IMPORTANT]
> **Safe Branch Deployment Policy (Added 2026-05-30):**
> For significant code syncs, system refactors, or new component suites (such as ACOS dynamic swarm orchestration, large asset libraries, or complex type changes):
> - **DO NOT** push directly to `main` on the production repository.
> - **DO** push to a dedicated feature branch first (e.g., `feat/acos-pillar-9-10-agents`) and open a Pull Request.
> - This allows peer agents (Claude Code / Codex) on the remote side to review, run CI validations (build, type check, static link audit), and perform a secure merge, preventing unreviewed production regressions.

Full positioning + attributes → `frankx-brand` skill.

---

## LLM + API key policy (machine-global)

**Authoritative: `~/.claude/CLAUDE.md`.** Default LLM route = OpenRouter (`OPENROUTER_API_KEY` + `OPENROUTER_BASE_URL`). **Reason first** — don't auto-call external LLMs when you can think. Daily `StarlightAPIKeyMonitor` + `StarlightSecretScan` tasks.

**Image gen — use your harness's own subscription-included engine first; paid APIs are the exception.** Grok → Grok Imagine (SuperGrok). Antigravity/Gemini → Nano Banana Pro / NB2 (free preview, built-in; **Search-grounded → use for text-heavy/technical heroes so labels are legible & accurate**). Codex → gpt-image-2 (`$imagegen`, counts toward ChatGPT plan). Claude (no native gen) → `scripts/nb-generate.mjs` (needs `GEMINI_API_KEY`) or Higgsfield MCP. Reserve Higgsfield/fal/NB-API (paid) for video or when a native quota is exhausted. Hold one `lib/gen/lanes.ts` lane per asset.

---

## Quick reference

| Action | Command |
|---|---|
| Deploy to production | `/frankx-ai-deploy` |
| Create blog post | `/frankx-ai-blog` |
| Full build session | `/frankx-ai-build` |
| Content pipeline | `/frankx-ai-content-pipeline` |
| UI components | `/frankx-ai-components` |
| SEO optimization | `/frankx-ai-seo` |

---

## Architecture — where the depth lives

Situational system knowledge was moved out of this contract (2026-06-06) so the rules above stay load-bearing. Each loads on demand.

**Path-scoped rules** (`.claude/rules/`, auto-load when matching files open):
- `content-ops.md` — single-capture-many-ships intake (L0–L7) · `lib/intake/**`, `app/studio/**`
- `visual-intelligence.md` — VIS per-platform strategy · `lib/visual-intelligence/**`
- `gen-layer.md` — engine registry + lanes + patterns + router · `lib/gen/**`
- `library-os.md` — book intelligence system · `app/library/**`, `data/book-reviews.ts`
- `newsletter.md` — weekly cadence + CTA discipline · `content/newsletters/**`
- `smart-404.md` — self-healing URL recovery · `app/not-found.tsx`, `data/redirect-aliases.json`
- `content-standards.md` — quality bar + SEO checklist · `content/**`

**Reference docs** (`docs/architecture/`): `machine-readiness.md` · `skills-library.md` · `agent-profiles.md` · `operating-loop.md` (the 6-layer weekly cadence) · `file-structure.md` · `session-logging-and-sources.md`. Plus existing `ARCHITECTURE.md`, `TWO_REPO_ARCHITECTURE.md`.

**System map:** load the `frankx-meta` skill for "where does X live."

---

_Excellence in execution. Let the work speak._
