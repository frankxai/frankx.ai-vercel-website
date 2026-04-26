# Design System Evolution — Strategic Roadmap

> **How `design.md` + `taste.md` evolve from "we have a contract" to "every FrankX surface compounds on the same foundation."** Layered architecture, phased rollout, tooling pipeline, governance. Last updated 2026-04-25.

---

## Where we stand today (Pass 1–4 shipped)

| Asset | Status | Location |
|---|---|---|
| **Spec contract** | ✅ Lint-clean (0/0) | `/design.md` (Google Labs alpha format) |
| **Taste contract** | ✅ Shipped | `/taste.md` |
| **Public showcase** | ✅ Shipped | `/design` page on frankx.ai |
| **CLI tooling** | ✅ Installed | `@google/design.md@0.1.1` (devDep) |
| **npm scripts** | ✅ Wired | `design:lint`, `design:tokens`, `design:check` |
| **Token exports** | ✅ Generating | `.design-tokens/tailwind.json` + `.design-tokens/dtcg.json` |
| **Claude workflow** | ✅ Wired | `CLAUDE.md` "Design contract" section |

Coverage: **frankx.ai only.** Other surfaces (Arcanea, GenCreator, Library OS template, Starlight Agent Lab, Familie Hub) are inheriting the brand DNA informally — no contract, no lint.

---

## The architecture: three layers

The mistake most design systems make is treating themselves as a single monolithic schema. FrankX runs *six brands* on a shared foundation. The right model is layered:

```
┌─────────────────────────────────────────────────────────┐
│  Layer 3 — COMPONENT                                    │
│  Site-specific patterns (Library card, Music player,    │
│  Workshop hero, Globe overlay, Familie tile…)           │
├─────────────────────────────────────────────────────────┤
│  Layer 2 — BRAND                                        │
│  FrankX (tech+soul+bridge) · Arcanea (bridge-led) ·    │
│  GenCreator (its own) · Library OS (forkable neutral)  │
├─────────────────────────────────────────────────────────┤
│  Layer 1 — FOUNDATION                                   │
│  void/space/elevated ladder · ink alpha tiers ·         │
│  spacing scale · Inter+Poppins+Playfair+Mono ·          │
│  rounded scale · the eyebrow pattern                    │
└─────────────────────────────────────────────────────────┘
```

**Layer 1 (Foundation) is universal.** Every FrankX surface uses the same dark-first base, the same Perfect Fourth type scale, the same 8-token spacing. This is the recognizable shape of the universe.

**Layer 2 (Brand) is per-site.** Each property picks its spectrum. FrankX = tech+soul. Arcanea = bridge-led (purple/violet/magenta). GenCreator = warm tech (its own). Library OS template = brand-neutral so forkers customize.

**Layer 3 (Component) is per-context.** A `Library card` on frankx.ai vs. a `Workshop hero` on a workshop page vs. an `Atlas overlay` on the globe. All built from the same primitives.

A change to Layer 1 ripples to every site. A change to Layer 2 affects one brand. A change to Layer 3 affects one product. **This is the leverage gradient.**

---

## Per-property mapping

| Property | Layer 2 spectrum | Where design.md lives | Status |
|---|---|---|---|
| **frankx.ai** | tech + soul + bridge (full system) | `/design.md` (this repo) | Shipped |
| **Arcanea** | bridge-led (purple-violet-magenta) | `arcanea/design.md` (TBD) | Foundation only |
| **GenCreator** | warm tech (its own emerald variant) | `gencreator/design.md` (TBD) | Foundation only |
| **Library OS template** | neutral (forkable) | `library-os/design.md` (TBD) | None |
| **Starlight Agent Lab** | tech-only (sober/research) | `starlight-agent-lab/design.md` (TBD) | None |
| **Familie Hub** | warm-archive (sepia + soul) | `familie/design.md` (TBD) | Private — separate model |

**Rule of thumb:** every public surface gets its own `design.md` that *extends* the FrankX foundation. Private/family surfaces stay decoupled.

---

## Phased rollout (Pass 4 → Pass 9)

### Pass 4 — CI integration *(this week)*

- Add `npm run design:lint` to the `ci:check` script
- Fail builds on lint errors; warn on warnings
- Surface lint results in PR comments (GitHub Actions)
- Verify token export drift: snapshot `.design-tokens/tailwind.json` in CI, fail if changes weren't intentional

**Why:** turn the contract into a *forcing function*. Right now it's documentation; after Pass 4, it's a build gate.

### Pass 5 — Brand-layer per-site files *(next 2 weeks)*

- Create `arcanea/design.md` extending FrankX foundation, brand layer = bridge spectrum
- Create `gencreator/design.md` extending FrankX foundation, brand layer = warm tech
- Create `library-os/design.md` as the neutral forkable foundation in the OSS repo
- Document the `extends:` convention (waiting on spec v0.2; for now, docstring at top of each child)

**Why:** stop informally inheriting. Each property should declare its identity in the same machine-readable contract.

### Pass 6 — Figma round-trip *(next month)*

- Pipe `.design-tokens/dtcg.json` into Figma via Tokens Studio plugin
- Make Figma libraries render exactly what code renders
- Add `npm run design:figma:push` and `:pull` scripts
- Goal: zero drift between code and design files; Figma becomes a viewer of the truth, not a sibling source

**Why:** today designers paint in Figma, devs build in code, and the gap is bridged by inspection. With DTCG round-trip, both surfaces are reading the same JSON. No more "the Figma says X but the code says Y."

### Pass 7 — `/design-md` slash command *(next 6 weeks)*

- New Claude Code skill: `design-md`
- Reads `design.md` + `taste.md` + the touched files
- Answers: "is this design choice on-brand?" before code lands
- Auto-runs on any commit touching `app/`, `components/`, or `*.tsx`/`*.css`
- Surfaces violations with file:line and a citation to the offending rule

**Why:** today CLAUDE.md tells agents to *read* the contract. Pass 7 makes them *enforce* it. Closes the loop from "we wrote it" to "the system upholds it."

### Pass 8 — Public design system page generators *(next 2 months)*

- The `/design` page on frankx.ai today is hand-coded. Replace with code generated FROM `design.md` + `.design-tokens/`
- Same generator works for any brand-layer file → so `arcanea/design`, `gencreator/design`, etc. all get equivalent showcase pages for free
- Each generated page becomes a marketing asset + a lint-runnable artifact

**Why:** a hand-coded showcase drifts from the spec. A generated showcase IS the spec made visible. And it scales to every property without re-implementation.

### Pass 9 — Submit FrankX as a reference DESIGN.md *(next quarter)*

- Add `frankx.md` to `github.com/VoltAgent/awesome-design-md` community collection
- Write a public post: "How we ship a multi-brand design system on Google Labs DESIGN.md"
- Submit Anthropic skills issue #1008 PR: contribute a real-world adopter
- Speak at Cloud Next '27 or equivalent: "Multi-brand design systems on DESIGN.md"

**Why:** the brand becomes a participant in the standard's evolution, not just a consumer. That's the AI Architect signal at the design-system level.

---

## Tooling evolution

```
Today:                              Pass 9:
                                    ┌─ figma (DTCG sync)
design.md ─→ CLI (lint+export) ─→  ├─ tailwind preset (auto)
                                    ├─ public /design pages (gen)
                                    ├─ CI lint gate (mandatory)
                                    ├─ /design-md slash (enforce)
                                    └─ awesome-design-md (contribute)
```

Three principles for choosing what to build next:
1. **Closer to the spec, not further.** Anything Google adds to v0.2+, we adopt within a week — alpha versioning means signaling adoption is the right move.
2. **More automation, less configuration.** If a step is manual today, automate it before adding new steps.
3. **Generated > hand-coded.** Anywhere we duplicate a token in code or markup, the duplicate becomes a generation target.

---

## Governance

### When to add a token
A token earns its place when *the same value is used in 3+ different files for 3+ different purposes*. Below that threshold, use Tailwind utilities directly. **Token bloat is worse than utility sprawl** — utilities are local, tokens are global.

### When to deprecate a token
A token is deprecated when:
- It hasn't been referenced in code for 2+ months *and*
- Its replacement is a clearer token
- Run `grep -r "token-name" app components lib` to verify before removing

### Who decides
- **Foundation layer:** Frank only. These ripple to every site.
- **Brand layer:** the property owner (Frank for FrankX/Arcanea/GenCreator/Starlight; family for Familie Hub).
- **Component layer:** whoever ships the component. Document in the component file or design.md `components:` map.

### Versioning
- Foundation layer changes = `design.md` minor bump (alpha→beta→1.0)
- Breaking foundation changes = bump major + write migration guide
- Brand layer changes = per-site versioning, independent
- Component layer = no versioning required (components are code; code has git history)

---

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Google sunsets DESIGN.md | Low (active dev) | DTCG export is W3C-standard; we're not locked in |
| Spec v0.2 breaks our file | Medium | Pin alpha; upgrade in dedicated PR with full re-lint |
| Per-site files drift from foundation | High | Pass 7 slash command + CI lint enforce inheritance |
| Designers ignore the contract | Medium | Pass 6 Figma round-trip removes "Figma is separate" excuse |
| Token bloat over time | High | Governance rule above + quarterly audit |

---

## Why this matters (the strategic frame)

Most personal brands have a Tailwind config and a Figma file that disagree. FrankX is going to have a single contract — `design.md` + `taste.md` — that:

1. **Lints in CI.** Drift fails the build.
2. **Exports to Tailwind.** Code consumes the contract.
3. **Exports to Figma.** Design consumes the contract.
4. **Renders publicly.** The contract is itself a marketing surface.
5. **Travels to every property.** Foundation universal, Brand layered, Component local.
6. **Is open source.** Forkable, citable, contributable.

That's not a design system. That's an *operating system for visual identity* — and operating systems compound. Every site that runs on it raises the floor for the next one.

The Google Labs spec opened this door 4 days ago. FrankX is the first creator brand walking through it.

---

## Provenance

- Foundation: `/design.md` + `/taste.md` (this repo, MIT-spirit / Apache-2.0 spec)
- Source-of-truth tokens: `tailwind.config.js` (until Pass 6, when generated tokens become the source)
- Generated artifacts: `.design-tokens/tailwind.json`, `.design-tokens/dtcg.json` (regenerable)
- Public surface: `/design` on frankx.ai
- Spec: [google-labs-code/design.md](https://github.com/google-labs-code/design.md) v0.1.1 (alpha)
- Skill issue: [anthropics/skills #1008](https://github.com/anthropics/skills/issues/1008)
- Community examples: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- Companion: `/taste.md` for the judgment layer

Last reviewed: 2026-04-25
