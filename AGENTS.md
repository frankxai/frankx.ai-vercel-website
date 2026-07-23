# frankx.ai-vercel-website — AGENTS.md

**Repo:** `frankxai/frankx.ai-vercel-website` (public)
**This repo IS production.** Vercel's native git integration deploys this repo's `main` branch to https://frankx.ai on every push. There is no separate "production repo" — this is it.
**Stack (verified from `package.json`):** Next.js 16.1 (App Router) · React 18.3 · TypeScript 5.7 (strict) · Tailwind CSS 3.4 · Vercel (Edge Functions, ISR) · pnpm

This file is the canonical brief for any AI agent (Claude Code, Codex, Gemini, Grok, Cursor, OpenCode, etc.) entering this repo. Read it before assuming anything about deploy mechanics, branch protocol, or repo identity.

---

## 1. Repo identity — read this first

Do not treat this repo as a dev/staging checkout that "syncs to production elsewhere." It does not. Confirmed:

- `git remote -v` → `origin` is `frankxai/frankx.ai-vercel-website`, the only remote.
- The GitHub repo is public, default branch `main`.
- `.github/workflows/ci.yml` runs type-check + lint + build on push/PR to `main`/`staging` — it does **not** deploy. Deployment happens through Vercel's git integration outside of GitHub Actions.
- This checkout also contains a large number of root-level planning/strategy documents (business plans, CMS comparisons, roadmap notes, etc.) that read like private-repo working notes rather than production docs. Treat those as historical artifacts, not as authoritative statements about what currently ships to frankx.ai. If a root `.md` file's claims matter for a task, verify against the live site or the actual `app/`/`data/` source first.
- `package.json` `"name"` is `"frankx"`, not this repo's own name — a known inconsistency, out of scope for a docs-only fix. Don't infer repo identity from it.
- `CLAUDE_NEW.md` at repo root is a stale, superseded draft (older "Agent Team" XML persona config) that predates and does not match this file or `CLAUDE.md`. Ignore it; it is not currently corrected or removed as part of this change.

If you are looking for the *private* authoring/content repo referenced in some of this checkout's older docs, that is a separate repo (`frankxai/FrankX`, private). You are not in it.

---

## 2. Working commands (verified against `package.json`)

```bash
# Install (pnpm — pnpm-lock.yaml is the authoritative lockfile; CI uses pnpm)
pnpm install

# Dev server
pnpm dev

# Type check / lint / build (what CI runs)
pnpm run type-check
pnpm run lint
pnpm run build

# Broader pre-push gate (includes contract tests, claims/AI-slop audits, link checks)
pnpm run merge:gate

# Full local CI mirror
pnpm run ci:check

# Process/health snapshot (Windows/PowerShell)
pnpm run health
```

Do not assume every script referenced in older docs in this checkout (e.g. `sync:check`, `sync:fix`) reflects current practice for this repo — they exist in `package.json` but their operational role from this specific checkout has not been re-verified as part of this fix.

---

## 3. Branch and PR protocol (estate standard)

Multiple harnesses (Claude, Codex, Gemini, Grok, Cursor, Cline) may work this repo. Git is the coordination layer.

- **Never push directly to `main`.** All work lands on a branch and goes through a PR, even for a solo agent session.
- **One agent = one branch:** `agent/<harness>/<short-scope>` (e.g. `agent/claude/blog-fix`, `agent/codex/newsletter`). Heavy or risky work gets its own worktree: `git worktree add .worktrees/<name> -b agent/<harness>/<scope>`.
- **Draft-first PRs.** Open every PR as a draft (`gh pr create --draft`). Iterate on the draft; only mark it ready (`gh pr ready`) when the change is complete and gates pass — that is what should trigger any heavier CI.
- **Batch commits.** Don't push per-tiny-edit; each push re-runs CI. Group logical work.
- **`[skip ci]`** in the commit subject for docs-only, chore, or content-only commits that touch no code paths CI cares about.
- **Verify locally first.** Run `pnpm run type-check`, `pnpm run lint`, and `pnpm run build` locally before pushing. Cloud CI is the merge-boundary check, not the iteration loop.
- **Vercel deploys via git integration only.** Never add a GitHub Actions deploy step — Vercel's own git integration already deploys `main` on push; an Actions-based deploy would double-build and fight it.
- **Don't touch another agent's in-flight work.** Check `git branch -a`, `git status`, and any dirty/untracked state before editing — foreign state usually means another harness is mid-task.

---

## 4. Brand + content discipline

- **Voice:** "Elite Creator. AI Architect. Humble Excellence." — direct, technical, results-first. Never spiritual or guru-toned.
- **Title stays "AI Architect"** — never "AI Systems Architect" or "Senior AI Architect."
- **No Arcanea mythology in FrankX copy** (Guardians, Gates, Realms, Seekers, etc.) — that belongs to the separate Arcanea brand.
- **No emoji in user-facing copy** unless explicitly requested.
- **No AI-slop tells:** `delve`, `dive into`, `it's worth noting`, `certainly`, `absolutely`, `unleash`, `unlock the power of`, `revolutionary`, `game-changing`.
- **Never rename a working URL.** `/library/{slug}` stays `/library/{slug}`. Never delete a page with traffic — unlink from nav and noindex it instead.
- **Design contract:** `design.md` (token spec — colors, type, spacing, components) and `taste.md` (restraint test, AI-slop refusal list, polish pass) both exist at repo root and govern any UI/visual work. Read both before touching `app/`, `components/`, or `content/` presentation.

---

## 5. Where things live (verified present in this checkout)

| You need... | Look here |
|---|---|
| Claude Code operating contract | `CLAUDE.md` |
| Design tokens / visual contract | `design.md`, `taste.md` |
| Content system / route ownership | `docs/content-system.md`, `docs/site-map.md` |
| Architecture reference docs | `docs/architecture/` |
| Project-level slash commands | `.claude/commands/` (includes `hub-audit.md`, `seo-check.md`, `publish.md`, `publish-content.md`, `newsletter-week.md`, `traffic-week.md`, `frankx-ai-deploy.md`) |
| Project-level agents | `.claude/agents/` (includes `integrity-guard.md`) |
| CI workflow | `.github/workflows/ci.yml` (type-check/lint/build gate) |
| Branch cleanup automation | `.github/workflows/branch-cleanup.yml` |

No `CONTRIBUTING.md` exists in this repo. No `.agent/active-agents.md` live-board file exists here either — don't assume one and don't invent claims about a coordination board that isn't present.

---

_End of AGENTS.md. This file replaces a prior version that was a verbatim, unadapted copy of the private `frankxai/FrankX` repo's AGENTS.md and stated this repo does not deploy to production — that was backwards. This repo is production._
