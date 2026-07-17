# frankx.ai-vercel-website — Claude Code operating contract

_Elite Creator. AI Architect. Humble Excellence._

Read `AGENTS.md` first for repo identity and the cross-harness branch/PR protocol. This file adds Claude-specific detail.

---

## What this repo is

This is the production repo for frankx.ai. Vercel's git integration deploys `main` on every push — there is no separate deploy step to trigger and no other repo that "actually" ships the site. Do not describe this repo as a dev/staging checkout in any doc or commit message.

---

## Branch and merge discipline

- **Never push directly to `main`.** Work on `agent/claude/<scope>`, open a **draft** PR (`gh pr create --draft`), and only mark it ready when the change is complete and verified.
- **Verify locally before pushing:** `pnpm run type-check`, `pnpm run lint`, `pnpm run build`. These are exactly what `.github/workflows/ci.yml` runs — a clean local pass means a clean CI run.
- **`pnpm run merge:gate`** runs a broader pre-merge check (contract tests, marketing-claims audit, AI-slop audit, internal link checks). Run it before marking a substantial PR ready.
- **Batch commits; use `[skip ci]`** in the subject line for docs-only or content-only commits that don't touch code CI cares about.
- **Do not add a GitHub Actions deploy job.** Vercel's git integration already deploys; an Actions-based deploy would double-build against it.

---

## Behavioral guardrails

1. **Think before coding** — state assumptions, surface tradeoffs, don't hide confusion.
2. **Explain simply** — no buzzwords ("streamline", "optimize") in place of naming the actual mechanism.
3. **Simplicity** — minimum code that solves the stated problem; no speculative abstraction.
4. **Surgical changes** — touch only what the task requires; match existing style; don't "improve" adjacent code in the same change.
5. **Goal-driven** — turn vague asks into a verifiable target before writing code.

## Decision discipline

**Before any structural change, ask:** what specific problem, who has it, what's the evidence, what's the simplest fix, what breaks (SEO, users, irreversibility), is it reversible.

**URL/SEO — never without explicit approval:** never rename a working URL, never delete a page with traffic, never "consolidate" by deleting pages (fix navigation instead). "AI Architect" stays "AI Architect."

---

## Design contract (read before any UI/visual work)

- **`design.md`** — token spec (color, type, spacing, components). Source of truth is `tailwind.config.js` plus the design-system source under `lib/`; `design.md` mirrors them in agent-readable form.
- **`taste.md`** — restraint test, AI-slop refusal list, polish pass. The judgment the token spec doesn't capture.

---

## Brand voice

Frank: AI Architect and Creator, ships products/code/content, translates enterprise-scale AI/cloud experience into practical systems for creators and operators. Independent project — not affiliated with, endorsed by, or sponsored by Oracle.

- **DO:** lead with results, precise technical language, show don't tell, confident but understated.
- **DON'T:** spiritual language, grandiose claims, self-help-guru tone, emoji in user-facing copy (unless explicitly requested).

---

## Commands verified in this repo

| Purpose | Command |
|---|---|
| Dev server | `pnpm dev` |
| Type check | `pnpm run type-check` |
| Lint | `pnpm run lint` |
| Build | `pnpm run build` |
| Pre-push gate | `pnpm run merge:gate` |
| Full local CI mirror | `pnpm run ci:check` |
| Process/health snapshot | `pnpm run health` |

Project-level slash commands live in `.claude/commands/` — confirmed present: `hub-audit.md`, `seo-check.md`, `publish.md`, `publish-content.md`, `newsletter-week.md`, `traffic-week.md`, `frankx-ai-deploy.md`. Project-level agents live in `.claude/agents/`, including `integrity-guard.md`.

---

## Known gaps (flagged, not fixed by this change)

- No `CONTRIBUTING.md`.
- `CLAUDE_NEW.md` at repo root is a stale, superseded draft — do not treat it as authoritative; it was not resolved or deleted as part of this docs fix.
- This checkout carries a large volume of root-level docs (business plans, CMS comparisons, strategic-planning notes) that appear to originate from the private `frankxai/FrankX` repo rather than this one. Their claims about current site behavior are not verified — check against live `app/`/`data/` source before relying on them.

---

_This file replaces a prior version that was a verbatim, unadapted copy of the private `frankxai/FrankX` repo's CLAUDE.md and stated that pushing to this repo's `main` does not deploy to production. That was backwards — this repo's `main` is what deploys to frankx.ai._
