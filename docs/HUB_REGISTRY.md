# FrankX Hub Registry

> The maintained source of truth for every **major hub** on frankx.ai.
> Purpose: track quality, brand-voice, and freshness per hub so we can systematically
> re-audit and upgrade the whole site each time a stronger model ships.
>
> **Cadence:** see `docs/MODEL_UPGRADE_PLAYBOOK.md`. Update the `Reviewed` column
> (model + date) every time a hub is upgraded. Never let a hub silently fall behind.

**Legend**
- **Register** — the intended voice of the hub:
  - `mainstream` — direct, technical, warm (default brand voice)
  - `enterprise` — AI-architect / consulting register (precise, credentialed)
  - `contemplative` — the rails/canon register (`/(rails)`, `/on-*`, `/canon`, soulbook) — *intentionally* reflective; serif font. **Do not flatten.**
  - `product` — named products (Vibe OS, ACOS, Soulbook) — proper nouns stay
  - `personal-de` — German family pages (`/familie`, `/opa-und-oma`, …) — personal register
- **Voice** — `clean` · `review` (slop flagged) · `rewrite` (clear guru-slop) · `n/a`
- **Fresh** — content currency: `current` · `stale` · `unaudited`
- **Reviewed** — last model + date that upgraded the hub. `legacy` = pre-tracking (assume Opus 4.6 era).
- **Pri** — upgrade priority: `P0` launch-critical · `P1` high-traffic · `P2` secondary · `P3` long-tail

See `HUB_REGISTRY.csv` for the machine-maintained version. Update both together.

## Tier 1 — Flagship (email/launch traffic lands here)

| Hub | Route | Register | Voice | Fresh | Reviewed | Pri |
|-----|-------|----------|-------|-------|----------|-----|
| Home | `/` | mainstream | clean | current | Opus 4.8 · 2026-06-02 | P0 |
| ACOS | `/acos` | product | unaudited | unaudited | legacy | P0 |
| AI Architecture Hub | `/ai-architecture` | enterprise | unaudited | unaudited | legacy | P0 |
| Music | `/music` | product | review | unaudited | legacy | P1 |
| Courses | `/courses` | mainstream | unaudited | current | Opus 4.8 · 2026-06-02 | P1 |
| About | `/about` | mainstream | unaudited | unaudited | legacy | P1 |
| Bio / Press | `/bio` | enterprise | clean | current | Opus 4.8 · 2026-06-02 | P1 |
| Build / Agentic Builder Lab | `/build` | enterprise | unaudited | unaudited | legacy | P1 |
| Start Here | `/start` | mainstream | unaudited | unaudited | legacy | P1 |

## Tier 2 — Section hubs, commercial, books (see CSV for full list)

GenCreators, Learn, Resources, Prompt Library, Research, Intelligence Atlas, Library,
Watch, Developers, AI World, Work-With-Me, Consulting, Coaching, Workshops, Studio,
Enterprise, AI CoE, Partnerships, Founders Circle, Content Studio, AI Assessment,
Books, Golden Age, Blog.

## Tier 3 — Contemplative register (DO NOT flatten — intentional voice)

Rails/Canon (`/(rails)`, `/canon`, `/on-*`), Soulbook, Soul Frequency, German family
(`/familie`, `/opa-und-oma`, `/lebensbaum`, `/hoffnung`, `/erde`).

## Tier 3 — Owner-only (private, login-gated)

Command Center, Ops, Admin, Dashboard, Investment.

---

## Known duplicates / cleanup candidates (audit before launch)
- `/ai-architecture` vs `/ai-architectures` — confirm canonical, redirect the other.
- `/links` vs `/linktree` — pick one.
- `/family` vs `/familie` — pick one.
- `/assessment` vs `/ai-assessment` vs `/assess` — consolidate funnel.
- `/products/agentic-creator-os` vs `/acos` — confirm canonical ACOS page.
- Dead code (not routed): `components/home/HomePage.tsx`, `components/home/V3HomePage.tsx`, `components/v0-variants/*`.

> ⚠ Per CLAUDE.md: never delete/rename live URLs without checking traffic + adding redirects. Hide from nav, keep the page. Flag, don't nuke.
