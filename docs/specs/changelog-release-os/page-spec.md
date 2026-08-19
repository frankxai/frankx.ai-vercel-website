# FrankX Changelog — Page Spec

## Outcome

Replace the stale raw-commit feed and duplicate updates page with one canonical, public release ledger at `/changelog`.

## Audience and first read

- Builders should understand what materially changed and where to inspect it.
- Customers and partners should see dated, credible evidence of continued stewardship.
- Search engines and answer engines should receive stable article URLs, accurate dates, and structured data.
- First read: **FrankX ships meaningful work in public, and every claim has a receipt.**

## Information architecture

1. Editorial hero: purpose, freshness, and links to RSS/GitHub.
2. Latest release: dominant headline, short outcome summary, and visible publication date.
3. Release ledger: asymmetric chronological list, category, highlights, and proof count.
4. Durable detail pages at `/changelog/[slug]` with full highlights and merged-PR evidence.
5. `/updates` permanently redirects to the canonical archive.

## Content rules

- Publish user, operator, creator, research, or trust outcomes—not commit volume.
- Never invent semantic versions. GitHub tags and releases remain a separate technical surface.
- Every public update needs at least one public proof URL.
- Show `publishedAt` and `modifiedAt` in visible HTML and Article JSON-LD.
- Group routine maintenance into a meaningful weekly or monthly release rather than creating noise.

## Visual system

- Brand: FrankX tech mode—void black, restrained emerald/cyan, Poppins headings, Inter body, JetBrains Mono evidence labels.
- Composition: editorial release ledger, not a dashboard or equal-card grid.
- Signature: an evidence rail connects each release headline to its public receipts.
- Asset tier: Tier C exact UI, with Tier A GitHub evidence as the primary proof material.
- Motion: CSS hover/focus transitions only; no entrance animation and no decorative WebGL.

## Release and automation contract

- Curated site changelog: human-readable outcomes and evidence.
- GitHub releases: generated technical notes from labels and tags.
- Tag automation creates drafts only; a human remains responsible for immutable publication.
- Validation rejects duplicate slugs, invalid dates, unsorted entries, missing highlights, or non-HTTPS proof URLs.

## Acceptance gates

- Canonical metadata, RSS discovery, Article JSON-LD, and sitemap detail URLs.
- Keyboard-visible focus, semantic headings, `time` elements, and external-link disclosure.
- Desktop and mobile export inspection.
- Type check, changelog contract, anti-slop verification, and production build.
- Design evidence score of at least 26/30 before ship.
