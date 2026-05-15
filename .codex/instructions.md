# frankx.ai-vercel-website — Codex Instructions

Read `AGENTS.md`, `CLAUDE.md`, and `.agent-harness.json` first.

This is the production Vercel repo for frankx.ai. Pushing to `main` can deploy the live site.

## Guardrails

1. Do not push `main` or trigger production deploys without Frank's explicit ship/deploy instruction.
2. Sync source changes from `C:\Users\frank\FrankX` intentionally; do not add the production remote to the private dev repo.
3. Run the repo's configured health/build command before any production handoff.
4. Keep production fixes narrow and reversible.
5. Do not change canonical URLs, SEO-sensitive routes, or analytics behavior casually.

