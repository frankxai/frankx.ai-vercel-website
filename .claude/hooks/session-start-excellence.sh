#!/usr/bin/env bash
# .claude/hooks/session-start-excellence.sh — SessionStart bootstrap
#
# Prints the FrankX excellence ruleset on every Claude Code session boot,
# so the rules are visible to the agent before it touches anything.
# Especially load-bearing on mobile, where mid-stream course-correction is hard.

cat <<'MSG'
═══════════════════════════════════════════════════════════════════════════
  FRANKX EXCELLENCE MODE — REPO: frankx.ai-vercel-website
  Read this before writing anything user-facing.
═══════════════════════════════════════════════════════════════════════════

VOICE — banned vocabulary (auto-checked by scripts/voice-audit.sh on commit):
  soul-aligned, awakening, consciousness, transformation ritual, journey,
  unleash, supercharge, elevate your, harness the power, seamless, cutting-edge,
  game-changing, revolutionary, next level, delve, dive deep, embark on,
  tapestry, testament to, look no further, in the realm of, skyrocket,
  effortless, paradigm shift, world-class, level up, dive into

VOICE — use instead:
  ship, compound, sovereignty, architecture, practice, governance,
  infrastructure, criteria. Show don't tell.

ANY content/blog/**.mdx commit MUST pass the blog-commit-gate:
  • title ≤ 60 chars  • description ≤ 155 chars  • ≥ 3 question-format H2s
  • ## FAQ section with ≥ 5 "### Question?" Q&As
  • voice-audit clean (no banned vocabulary)
  • flagship-only: tldr + lastModified frontmatter; counter-argument section

PIPELINE — for blog posts, prefer these over raw write+commit:
  /flagship             — strictest pipeline (Flagship category, ≥2500 words)
  /publish-content      — standard publish with integrity-guard gate
  /frankx-ai-blog       — full draft → polish → publish workflow
  /seo-check            — weekly SEO audit

DECISION HYGIENE (from CLAUDE.md):
  Before any structural change, ask: what problem? simplest fix? reversible?
  Never rename working URLs. Never delete pages with traffic.

PRODUCTION URL: https://frankx.ai (deploys from main).

═══════════════════════════════════════════════════════════════════════════
MSG
