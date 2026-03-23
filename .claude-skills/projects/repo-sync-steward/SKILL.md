---
name: repo-sync-steward
description: Sync workflow between the FrankX main repo and frankx.ai-vercel-website branches. Use when cherry-picking blog/content/code changes across repos, updating slugs/RSS, and preserving site integrity.
---

# Repo Sync Steward

## Scope
Keep the website repo aligned with the main FrankX content and site code without dragging in local tooling or internal docs.

## Workflow

1) Fetch and inspect targets
- Confirm remotes: `origin` (FrankX) and `vercel-website` (site repo).
- Fetch the target branch before syncing.

2) Prepare clean source commits
- Stage only website-relevant paths:
  - `content/blog/**`
  - `public/rss.xml`
  - `lib/**` and `app/**` links that reference blog slugs
  - `next.config.js` redirects (if slugs changed)
- Avoid: `.claude/`, `.tina/`, `.shared/`, `docs/`, `notes.md`, `task_plan.md`.

3) Apply to target safely
- Use a worktree for `vercel-website/<branch>` to avoid dirty state.
- Cherry-pick the prepared commits; resolve conflicts minimally.

4) Validate
- Run `node scripts/validate-blog-frontmatter.js` if available.
- Regenerate RSS with `node scripts/generate_feed.mjs`.
- Scan for old slugs: `rg -n "/blog/0[0-9]-"` and ensure redirects exist.

5) Push + record
- Push to `vercel-website/<branch>`.
- Log what was synced (commit IDs + key files) in a brief note.
