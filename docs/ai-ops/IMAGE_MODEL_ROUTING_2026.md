# Multi-Provider Image Ops (ACOS / Starlight / Arcanea)

Last updated: February 19, 2026

## Goal
Use one routing policy for image generation across:
- Nano Banana (Gemini via Claude MCP)
- OpenAI image API (`gpt-image-1`)
- xAI image API (`grok-imagine-image`)
- Replicate model marketplace (`black-forest-labs/flux-1.1-pro` default)

## Keep Existing Nano Banana Behavior
Your current `claude-frankx` flow remains valid:
- Start in project folder via your alias
- Claude picks project-local `nanobanana` MCP
- User-level `/home/frankx/.mcp.json` still resolves `${GEMINI_API_KEY}` for `nano-banana`

No change is required for that path.

## New Router Config
Policy source:
- `data/ai-ops/image-model-router.json`

It defines:
- providers + required env vars
- intent-based route plans
- quality/speed/cost priority overrides
- matrix test defaults

## Commands
```bash
# See intent route + provider readiness
npm run image:plan -- --intent hero-brand --priority quality

# Quick env readiness
npm run image:status

# Generate with explicit provider
npm run image:generate -- --provider openai --prompt "cinematic AI command center" --size 1536x1024
npm run image:generate -- --provider xai --prompt "surreal neon creator realm" --aspect 16:9
npm run image:generate -- --provider replicate --prompt "editorial product hero with glassmorphism" --aspect 16:9

# Auto-pick from intent (tries primary; --auto picks first ready non-manual provider)
npm run image:generate -- --intent grounded-infographic --prompt "how retrieval augmented generation works" --auto

# A/B test same prompt across providers
npm run image:matrix -- --prompt "AI architecture hero" --intent creative-exploration
```

## When To Use Which Model
- `nano-banana`:
  - Best when you need grounded educational visuals and existing FrankX style continuity.
  - Use inside Claude via `mcp__nanobanana__generate_image`.
- `openai/gpt-image-1`:
  - Best for text-heavy diagrams, tight prompt adherence, and clean social/export assets.
- `xai/grok-imagine-image`:
  - Best for fast creative exploration and style ideation.
- `replicate/black-forest-labs/flux-1.1-pro`:
  - Best for broad experimentation and batch model comparisons.

## Can You Use All At Once?
Yes. Use `npm run image:matrix` to generate the same prompt across all API providers configured in env.

Recommendation:
1. Generate variants across providers.
2. Select winner manually (visual + brand check).
3. Save chosen asset under `public/images/...` and record model/provider in your content metadata.

## ACOS / Starlight / Arcanea AI Ops Usage
- ACOS entrypoint can route image tasks to this policy (`/acos` + intent).
- Starlight Architect should run route planning before visual execution.
- Arcanea AI Ops can reuse the exact same scripts and config by copying:
  - `scripts/image-ops/`
  - `data/ai-ops/image-model-router.json`
  - env variable contract

## Sources (official docs)
- OpenAI image generation API docs: https://platform.openai.com/docs/guides/image-generation
- xAI model and image migration docs: https://docs.x.ai/docs/models and https://docs.x.ai/docs/migration-guides/image-generation
- Replicate API docs: https://replicate.com/docs/topics/predictions/create-a-prediction
- Replicate image model catalog (example model pages): https://replicate.com/black-forest-labs/flux-1.1-pro
