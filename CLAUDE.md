# frankx.ai-vercel-website — Claude Code operating contract

_Elite Creator. AI Architect. Humble Excellence._

Read `AGENTS.md` first for repo identity and the cross-harness branch/PR protocol. This file adds Claude-specific detail.

---

## What this repo is

This is the production repo for frankx.ai. Vercel's git integration deploys `main` on every push — there is no separate deploy step to trigger and no other repo that "actually" ships the site. Do not describe this repo as a dev/staging checkout in any doc or commit message.

---

## Branch and merge discipline

- **Never push directly to `main`.** Work on `agent/claude/<scope>`, open a **draft** PR (`gh pr create --draft`), and only mark it ready when the change is complete and verified.
- **Verify locally before pushing:** `pnpm run type-check`, `pnpm run lint`, `pnpm run ai-slop:audit:strict`, and `pnpm run build`. These are the required checks in `.github/workflows/ci.yml`.
- **`pnpm run merge:gate`** runs the broader pre-merge contract, claims, strict-language, and internal-link checks. Run it before marking a substantial PR ready.
- **Batch commits.** Do not use `[skip ci]` for changes under `app/`, `components/`, `content/`, `lib/`, or `taste.md`; those paths carry required gates. Use it only for truly non-executable documentation after checking the workflow path rules.
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

**Homepage — preserve before changing:** `app/page.tsx` and `components/home/**` are protected identity surfaces. “Founder” is a messaging and routing lens, not authorization to replace the living-studio homepage or erase music, portfolio breadth, proof, and discovery. Read `docs/strategy/HOMEPAGE-PRESERVATION-CONTRACT.md`; keep homepage work isolated; require baseline captures, a preservation matrix, three directions for structural work, and Frank's approval of the exact direction. Never change the homepage contract test beside the homepage—the general `[contract-change]` override does not apply.

---

## Design and release contract (read before any UI/visual work)

- **`design.md`** — local token spec (color, type, spacing, components). Source of truth is `tailwind.config.js` plus the design-system source under `lib/`; `design.md` mirrors them in agent-readable form.
- **`taste.md`** — local restraint test, language-refusal list, and polish pass. The judgment the token spec doesn't capture.
- **Canonical kernel:** [`frankxai/starlight-design-intelligence`](https://github.com/frankxai/starlight-design-intelligence), specifically `skills/world-class-web-release/SKILL.md`, `brand-packs/frankx/`, and `evals/web-release-gate.md`.
- **In-repo enforcement:** the `web-excellence` pack in `.claude/skills/` (installed from [`frankxai/claude-skills-library`](https://github.com/frankxai/claude-skills-library) `packs/web-excellence`). **Website / web-design work goes through the `web-release-gate` skill first** — it sequences the specialist skills (`web-design-guidelines`, `ui-ux-pro-max`, `emil-design-eng`, `apple-design`, `review-animations`, `core-web-vitals`, `visual-proof`) and defines the finish line. Three committed hooks make it the default rather than a suggestion: a `SessionStart` note, a `PreToolUse` reminder on the first UI-file edit, and a `Stop` check that blocks once if UI changed without an audit. Those hooks and `.claude/ci/web-guidelines-lint.mjs` are vendored copies whose tests live with the pack upstream — change them in [`claude-skills-library`](https://github.com/frankxai/claude-skills-library) `packs/web-excellence/` and re-run `install.sh`, rather than hand-editing them here where nothing tests them. `design.md` and `taste.md` outrank every skill in the pack.

For a high-value new page or redesign, apply the canonical kernel with the two local contracts. Capture the current desktop and mobile source before visual ideation; if capture is blocked, stop. Compare exactly three directions. A release needs reviewed copy, typography, motion and reduced-motion, mobile, URL, analytics, independent-review, and post-deploy evidence. Do not self-certify scores or describe the result as production-complete without the receipt.

---

## Brand voice

Frank: founder and AI Architect who translates enterprise-scale AI/cloud experience into practical operating systems for founders. Entrepreneur, solopreneur, coach, and creator-led operator are founder contexts. Independent project — not affiliated with, endorsed by, or sponsored by Oracle.

- **DO:** lead with results, precise technical language, show don't tell, confident but understated.
- **DO:** use the governed Human Layer on its dedicated surfaces: `established`, `emerging`, `experiential`, and `symbolic` lenses, with explicit uncertainty and safety boundaries.
- **DON'T:** guru authority, grandiose or medical-certainty claims, unlabeled metaphysics presented as science, or emoji in user-facing copy (unless explicitly requested). Plant medicine is research and harm reduction only; never provide sourcing, dosing, protocols, or treatment promises.

---

## Commands verified in this repo

| Purpose | Command |
|---|---|
| New journal entry | `pnpm journal:new "Title"` (`--kind note\|log`, `--private`, `--date`) |
| Dev server | `pnpm dev` |
| Type check | `pnpm run type-check` |
| Lint | `pnpm run lint` |
| Strict language refusal | `pnpm run ai-slop:audit:strict` |
| Build | `pnpm run build` |
| Pre-push gate | `pnpm run merge:gate` |
| Repository integrity suite (does not run the production build) | `pnpm run ci:check` |
| Process/health snapshot | `pnpm run health` |

Project-level slash commands live in `.claude/commands/` — confirmed present: `hub-audit.md`, `seo-check.md`, `publish.md`, `publish-content.md`, `newsletter-week.md`, `traffic-week.md`, `frankx-ai-deploy.md`. Project-level agents live in `.claude/agents/`, including `integrity-guard.md`.

---

## Known gaps (flagged, not fixed by this change)

- No `CONTRIBUTING.md`.
- `CLAUDE_NEW.md` at repo root is a stale, superseded draft — do not treat it as authoritative; it was not resolved or deleted as part of this docs fix.
- This checkout carries a large volume of root-level docs (business plans, CMS comparisons, strategic-planning notes) that appear to originate from the private `frankxai/FrankX` repo rather than this one. Their claims about current site behavior are not verified — check against live `app/`/`data/` source before relying on them.

---

## This repo is the trunk, not a mirror

The private `frankxai/FrankX` repo is where authoring and agent tooling live. It is **behind this one**, and it is not a source to copy from wholesale.

Two rules follow, for any agent working either side:

- **No bulk copy from `FrankX` into this repo.** No directory sync onto `app/`, `components/`, `content/`, `lib/`, or `data/`.
- **For a file that exists in both repos, this repo's version is the authority.** Genuinely new work from the private repo arrives as a port of named files on a branch with a PR — read this repo's version of every file the change touches first.

---

_This file replaces a prior version that was a verbatim, unadapted copy of the private `frankxai/FrankX` repo's CLAUDE.md and stated that pushing to this repo's `main` does not deploy to production. That was backwards — this repo's `main` is what deploys to frankx.ai. The sync-direction note above is the same defect measured from the other end: the private repo's contract described this repo as a downstream copy, and it has not been one for some time._
