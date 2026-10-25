---
name: infogenius-v5
description: InfoGenius v5.2 Visual Knowledge OS — Research-grounded 2K/4K infographic generator, markdown-to-5-slide carousel decomposer, Veo 3.1 motion loop, and Kore TTS narrator powered by Vercel AI Gateway, Google Gemini, or OpenRouter.
---

# InfoGenius v5.2 Visual Knowledge OS (`/infogenius`)

Generate research-grounded 2K/4K architectural infographics, decompose markdown articles into 5-slide visual packs, and emit Zero-Orphan `.vis.provenance.json` sidecars.

## Multi-Provider Credential Chain (Automatic)

1. **Vercel AI Gateway (`VERCEL_OIDC_TOKEN` / `AI_GATEWAY_API_KEY`)**: Zero-markup unified billing via `https://ai-gateway.vercel.sh/v1` (`perplexity/sonar` for grounded web citations + `google/gemini-3-pro-image` for 2K/4K visual generation). Auto-refreshes local OIDC tokens via `vercel env pull`.
2. **Google Gemini Direct (`GEMINI_API_KEY`)**: Live Google Search grounding (`gemini-3-pro-image-preview`), 4K Nano Banana Pro rendering, `veo-3.1-fast-generate-preview` motion, and `gemini-2.5-flash-preview-tts` Kore narration.
3. **OpenRouter (`OPENROUTER_API_KEY`)**: Web-grounded research via `google/gemini-2.5-flash:online` + image generation via `google/gemini-3-pro-image-preview`.

## CLI Usage

```bash
# 1. Single Topic -> 2K Glassmorphic Infographic
node scripts/infogenius.mjs "Sovereign Multi-Tenant AI Gateway Architecture" --style glassmorphic

# 2. Luxury Brand Visual + 4K Resolution + Veo 3.1 Motion + Kore TTS Narration
node scripts/infogenius.mjs "Zero-Knowledge Proofs & Verifiable AI Compute" --style premium --size 4K --animate --narrate

# 3. Decompose an Article or Markdown File into a 5-Slide Visual Pack
node scripts/infogenius.mjs --from-file content/blog/my-article.mdx --style glassmorphic --aspect 1:1
```

## Available v5.2 Styles (10 Built-In + 18 Brand Presets)

- `glassmorphic` — 3D Frosted Crystal Cards, Deep Space Void (`#0b0e14`), Teal (`#7fffd4`) & Gold (`#ffd700`)
- `premium` — Luxury Brand Visual (Apple × Dior × DeepMind, obsidian `#090c10` + warm champagne gold)
- `da-vinci-technical` — FrankX Signature Renaissance Engineering Blueprint
- `3d-isometric` — Modular Isometric Architecture Studio
- `coe-blueprint` — 6-Pillar Enterprise AI CoE Topology
- `standard` · `minimalist` · `photorealistic` · `futuristic` · `vintage`
