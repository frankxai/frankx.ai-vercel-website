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
- `.github/workflows/ci.yml` runs type-check, lint, the strict language-refusal audit, and build on relevant pushes and PRs to `main`/`staging` — it does **not** deploy. Deployment happens through Vercel's git integration outside GitHub Actions.
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

# Required CI gates
pnpm run type-check
pnpm run lint
pnpm run ai-slop:audit:strict
pnpm run build

# Broader pre-push gate (includes contract tests, claims/language audits, link checks)
pnpm run merge:gate

# Broader repository integrity suite (does not run the production build)
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
- **Do not use `[skip ci]`** for changes under `app/`, `components/`, `content/`, `lib/`, or `taste.md`; those paths carry required release gates. Use it only for truly non-executable documentation after checking the workflow path rules.
- **Verify locally first.** Run `pnpm run type-check`, `pnpm run lint`, `pnpm run ai-slop:audit:strict`, and `pnpm run build` before pushing. Cloud CI is the merge-boundary check, not the iteration loop.
- **Vercel deploys via git integration only.** Never add a GitHub Actions deploy step — Vercel's own git integration already deploys `main` on push; an Actions-based deploy would double-build and fight it.
- **Don't touch another agent's in-flight work.** Check `git branch -a`, `git status`, and any dirty/untracked state before editing — foreign state usually means another harness is mid-task.

---

## 4. Brand + content discipline

- **Voice:** "Founder. AI Architect. Humble Excellence." — direct, technical, results-first. Speak to one avatar: the founder; entrepreneur, solopreneur, coach, and creator-led operator are founder contexts.
- **Human Layer:** Post-rational spirituality is allowed only on governed Human Layer surfaces. Label each claim `established`, `emerging`, `experiential`, or `symbolic`; never use guru authority, medical certainty, promised healing, or cosmological claims presented as science. Plant-medicine coverage is research and harm reduction only—no sourcing, dosing, protocols, or treatment claims.
- **Title stays "AI Architect"** — never "AI Systems Architect" or "Senior AI Architect."
- **No Arcanea mythology in FrankX copy** (Guardians, Gates, Realms, Seekers, etc.) — that belongs to the separate Arcanea brand.
- **No emoji in user-facing copy** unless explicitly requested.
- **No AI-slop tells:** `delve`, `dive into`, `it's worth noting`, `certainly`, `absolutely`, `unleash`, `unlock the power of`, `revolutionary`, `game-changing`.
- **Never rename a working URL.** `/library/{slug}` stays `/library/{slug}`. Never delete a page with traffic — unlink from nav and noindex it instead.
- **Local design contract:** `design.md` (tokens — colors, type, spacing, components) and `taste.md` (restraint test, language-refusal list, polish pass) govern UI and presentation in this repo. Read both before touching `app/`, `components/`, or `content/` presentation.

### Research authority boundaries

- `research/sacred-texts/` is the current canonical home for historical sacred-source witnesses, original-language texts, provenance, and rights records used by the contemplative rails.
- `research/sacred-texts/collections/sacred-visions/` is a FrankX editorial collection, not a repository and not Arcanea canon.
- `content/rails/` owns FrankX essays and public contemplative surfaces; `docs/rails/` owns their roadmap and editorial policy.
- `research-intelligence-os` and `research-intelligence-systems` provide reusable research methods; they do not own this corpus.
- The planned `reality-intelligence-system` does not exist yet. Its roadmap is for portable framework extraction, not silent reassignment of FrankX prose or source ownership.
- `arcanean-library` is fiction-only. Never place historical religious texts, real-world theology, documentary evidence, or modern scholarship there.
- Before moving this material, update the portfolio placement record and preserve source, translation, interpretation, and new composition as separate layers.

### World-class release kernel

The canonical cross-repo standard lives in [`frankxai/starlight-design-intelligence`](https://github.com/frankxai/starlight-design-intelligence):

- `skills/world-class-web-release/SKILL.md` — release workflow
- `brand-packs/frankx/` — FrankX editorial, visual, typography, and motion rules
- `evals/web-release-gate.md` — evidence contract and scoring thresholds

For a high-value new page or redesign, use that kernel together with this repo's `design.md` and `taste.md`. Capture the current desktop and mobile source first; if it cannot be captured, stop before visual ideation. Compare exactly three directions, then require reviewed copy, typography, motion/reduced-motion, mobile, URL, analytics, independent-review, and post-deploy evidence. Do not call a surface "world-class," "legendary," or production-complete without the receipt.

---

## 5. Where things live (verified present in this checkout)

| You need... | Look here |
|---|---|
| Claude Code operating contract | `CLAUDE.md` |
| Local design tokens / visual contract | `design.md`, `taste.md` |
| Cross-repo web release standard | `frankxai/starlight-design-intelligence` → `skills/world-class-web-release/`, `brand-packs/frankx/`, `evals/web-release-gate.md` |
| Content system / route ownership | `docs/content-system.md`, `docs/site-map.md` |
| Architecture reference docs | `docs/architecture/` |
| Project-level slash commands | `.claude/commands/` (includes `hub-audit.md`, `seo-check.md`, `publish.md`, `publish-content.md`, `newsletter-week.md`, `traffic-week.md`, `frankx-ai-deploy.md`) |
| Project-level agents | `.claude/agents/` (includes `integrity-guard.md`) |
| CI workflow | `.github/workflows/ci.yml` (type-check/lint/strict-language/build gate) |
| Branch cleanup automation | `.github/workflows/branch-cleanup.yml` |

No `CONTRIBUTING.md` exists in this repo. No `.agent/active-agents.md` live-board file exists here either — don't assume one and don't invent claims about a coordination board that isn't present.

---

_End of AGENTS.md. This file replaces a prior version that was a verbatim, unadapted copy of the private `frankxai/FrankX` repo's AGENTS.md and stated this repo does not deploy to production — that was backwards. This repo is production._

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
