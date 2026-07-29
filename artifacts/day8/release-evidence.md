# 27 July — Unhooking the Mind release evidence

## Decision

Selected direction: **Quiet Field Manual**.

The design keeps the teaching primary: an amber-on-obsidian editorial page, a single pattern-tracing interaction, no hero image dependency, and no competitive scoring.

## Route and artifacts

- Canonical route: `/mvu/unhooking-the-mind`
- Collection entry: `/mvu`
- Practice kit: `/downloads/mvu-unhooking-practice-kit-v0.1.0.zip`
- Social image: `/mvu/unhooking-the-mind/opengraph-image`

## Visual inspection

- Desktop: inspected at 1440 × 1000.
- Mobile: inspected at 390 × 844.
- Full-page captures were generated and reviewed locally; they are omitted from
  version control to keep the release branch lean.
- Mobile document width: `390px` client width and `390px` scroll width.
- The tracker persisted a test entry to `localStorage`.
- Both practice-kit download links resolved to the versioned ZIP.
- Source links rendered as external links.

Local-only console noise came from missing Auth.js development configuration and Vercel analytics endpoints. The article route, content, tracker, and assets rendered correctly.

## Verification

- `pnpm run type-check` — pass
- Scoped ESLint — pass
- `pnpm run build` — pass, including build-artifact integrity
- `pnpm run test:learning-routes` — 9/9 pass
- `pnpm run test:build-integrity` — 4/4 pass
- `pnpm run test:collaboration-release` — 12/12 pass
- `pnpm run content:check` — pass
- `pnpm run claims:audit:strict` — pass
- `pnpm run ai-slop:audit:strict` — pass
- `pnpm run design:lint` — pass with one pre-existing `design.md` frontmatter warning
- `pnpm run links:check:static` — repository-wide failure on pre-existing `/starlight/gravity` references outside this change

## Provenance boundary

The page labels the material as Frank Riemer’s personal reflection, expanded with listed primary sources, and an independent synthesis. It does not claim a speaker source. Advaita self-inquiry and early Buddhist not-self analysis are presented as related practices with different doctrinal claims.
