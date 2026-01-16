# Notes: Sync FrankX changes to vercel-website branch

## Branch Context
- Source: `v3` (local)
- Target: `vercel-website/feature/ui-ux-mcp-content`
- Divergence: v3 is 32 commits ahead, 69 behind.

## v3-only commit themes (32 ahead)
- Mix of content, docs, skills migrations, and code fixes; not all are website-safe.
- Website-relevant: blog content, link updates, redirects, RSS regeneration.

## New work in this session
- Added repo sync skill: `.claude-skills/projects/repo-sync-steward/SKILL.md`.
- Cherry-picked slug/link changes into `vercel-website/feature/ui-ux-mcp-content` (commit `1ea7dc4`).
- Added redirects in `next.config.mjs` and regenerated `public/rss.xml` in the website branch.

## Sync Scope (applied)
- `content/blog/**` (slug renames + link updates)
- `public/rss.xml` regenerated
- `next.config.mjs` redirects

## Non-sync scope
- Local tooling state, planning notes, internal docs, skills scaffolding.
