<#
Ready-to-run PowerShell script to sync premium blog visuals and updated MDX to production clone.

Usage:
  1. Set $ProdRepo to your local clone of frankxai/frankx.ai-vercel-website
     Example: $ProdRepo = "C:\Users\frank\frankx-prod-sync"
  2. Run from this repo root: .\scripts\sync-premium-blog-visuals.ps1 -ProdRepo "C:\path\to\prod"

It copies only the premium blog assets and touched MDX from this sweep.
Review diffs in prod repo, then commit + push.
#>

param(
  [string]$ProdRepo = "C:\Users\frank\frankx-prod-sync"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ProdRepo)) {
  Write-Error "Prod repo not found at $ProdRepo. Clone https://github.com/frankxai/frankx.ai-vercel-website or set correct path."
  exit 1
}

Write-Host "=== FrankX Premium Blog Visuals Sync ===" -ForegroundColor Cyan
Write-Host "Source: $(Get-Location)"
Write-Host "Target: $ProdRepo" -ForegroundColor Yellow

# List of files changed in this visual excellence sweep (headers, infographics, socials, videos + MDX)
$files = @(
  # New premium heroes (v3)
  "public/images/blog/agent-family-architecture-hero-v3.jpg",
  "public/images/blog/multi-agent-orchestration-patterns-2026-hero-v3.jpg",
  "public/images/blog/acos-hooks-system-quality-gates-hero-v3.jpg",
  "public/images/blog/swarm-intelligence-multi-agent-orchestration-hero-v3.jpg",
  "public/images/blog/agentic-creator-os-complete-guide-hero-v3.jpg",
  "public/images/blog/building-research-intelligence-system-hero-v3.jpg",
  "public/images/blog/ai-architecture-patterns-solo-builders-hero-v3.jpg",
  "public/images/blog/building-custom-skills-hero-v3.jpg",
  "public/images/blog/production-agentic-ai-systems-hero-v3.jpg",
  "public/images/blog/production-llm-agents-oci-hero-v3.jpg",
  "public/images/blog/prompt-engineering-mastery-2026-hero-v3.jpg",
  "public/images/blog/claude-code-skills-2026-hero-v3.jpg",
  "public/images/blog/enterprise-agent-roadmap-hero-v3.jpg",
  "public/images/blog/mcp-server-integration-hero-v3.jpg",
  "public/images/blog/acos-enterprise-deployment-guide-hero-v3.jpg",
  "public/images/blog/aeo-playbook-get-cited-by-ai-2026-hero-v3.jpg",
  "public/images/blog/agentic-ai-roadmap-2026-hero-v3.jpg",
  "public/images/blog/best-ai-image-generators-2026-hero-v3.jpg",

  # Batch 4 - 20 urgent SVG + old PNG replacements (v4)
  "public/images/blog/claude-fable-5-analysis-2026-hero-v4.jpg",
  "public/images/blog/claude-opus-4-8-analysis-2026-hero-v4.jpg",
  "public/images/blog/deepseek-v4-analysis-2026-hero-v4.jpg",
  "public/images/blog/phi-analysis-2026-hero-v4.jpg",
  "public/images/blog/gpt-5-5-analysis-2026-hero-v4.jpg",
  "public/images/blog/grok-4-3-analysis-2026-hero-v4.jpg",
  "public/images/blog/claude-fable-5-prompting-guide-hero-v4.jpg",
  "public/images/blog/acos-zero-to-production-quickstart-hero-v4.jpg",
  "public/images/blog/ai-coe-launch-hero-v4.jpg",
  "public/images/blog/best-ai-meeting-assistant-2026-hero-v4.jpg",
  "public/images/blog/acos-use-cases-creator-types-hero-v4.jpg",
  "public/images/blog/build-your-own-jarvis-claude-code-hero-v4.jpg",
  "public/images/blog/best-ai-logo-maker-2026-hero-v4.jpg",
  "public/images/blog/brand-evolution-from-consciousness-to-systems-hero-v4.jpg",
  "public/images/blog/best-no-code-ai-agent-builders-2026-hero-v4.jpg",
  "public/images/blog/best-ai-headshot-generator-2026-hero-v4.jpg",
  "public/images/blog/claude-family-2026-infographic.png",
  "public/images/blog/frontier-model-landscape-2026-infographic.png",
  "public/images/blog/best-ai-note-taking-2026-hero-v4.jpg",

  # Batch 5 - 20 more urgent replacements (v5) - SVGs model analyses + old pngs + infographics
  "public/images/blog/gemma-3-analysis-2026-hero-v5.jpg",
  "public/images/blog/gpt-oss-analysis-2026-hero-v5.jpg",
  "public/images/blog/gemini-3-5-pro-analysis-2026-hero-v5.jpg",
  "public/images/blog/llm-evals-claude-code-guide-hero-v5.jpg",
  "public/images/blog/mistral-large-3-analysis-2026-hero-v5.jpg",
  "public/images/blog/microsoft-mai-frontier-models-2026-hero-v5.jpg",
  "public/images/blog/llama-4-analysis-2026-hero-v5.jpg",
  "public/images/blog/kimi-k2-analysis-2026-hero-v5.jpg",
  "public/images/blog/qwen3-max-analysis-2026-hero-v5.jpg",
  "public/images/blog/agi-2026-opportunities-students-creators-hero-v5.jpg",
  "public/images/blog/agentic-ai-roadmap-2025-hero-v5.jpg",
  "public/images/blog/agentic-creator-os-hero-v5.jpg",
  "public/images/blog/agentic-seo-publishing-masterplan-hero-v5.jpg",
  "public/images/blog/ai-engineering-without-hype-willison-hero-v5.jpg",
  "public/images/blog/ai-image-video-generation-playbook-2026-hero-v5.jpg",
  "public/images/blog/ai-model-routing-guide-hero-v5.jpg",
  "public/images/blog/acos-philosophy-technology-amplifies-hero-v5.jpg",
  "public/images/blog/model-analysis-2026-infographic.png",
  "public/images/blog/agentic-seo-aeo-2026-infographic.png",

  # Batch 6 - 20+ more urgent old png headers (v5) - best-ai series, ACOS, research, model comparisons etc.
  "public/images/blog/acos-v10-autonomous-intelligence-hero-v5.jpg",
  "public/images/blog/agentic-os-family-foundry-launch-hero-v5.jpg",
  "public/images/blog/best-ai-browser-2026-hero-v5.jpg",
  "public/images/blog/agi-2026-opportunities-students-creators-hero-v5.jpg",
  "public/images/blog/best-ai-affiliate-programs-2026-hero-v5.jpg",
  "public/images/blog/best-ai-coding-tools-for-beginners-2026-hero-v5.jpg",
  "public/images/blog/best-ai-note-taking-tools-2026-hero-v5.jpg",
  "public/images/blog/best-ai-presentation-maker-2026-hero-v5.jpg",
  "public/images/blog/best-ai-product-photography-2026-hero-v5.jpg",
  "public/images/blog/best-ai-resume-builder-2026-hero-v5.jpg",
  "public/images/blog/best-ai-shorts-tiktok-tools-2026-hero-v5.jpg",
  "public/images/blog/best-ai-video-editor-2026-hero-v5.jpg",
  "public/images/blog/cheapest-frontier-model-access-2026-hero-v5.jpg",
  "public/images/blog/building-research-intelligence-system-hero-v5.jpg",
  "public/images/blog/best-local-llm-2026-hero-v5.jpg",
  "public/images/blog/chatgpt-vs-claude-vs-gemini-2026-hero-v5.jpg",
  "public/images/blog/claude-code-mastery-top-resources-hero-v5.jpg",
  "public/images/blog/best-ai-headshot-generator-2026-hero-v5.jpg",
  "public/images/blog/production-agentic-ai-systems-hero-v5.jpg",
  "public/images/blog/mcp-ecosystem-2026-hero-v5.jpg",

  # Infographics & Socials batch (post-headers)
  "public/images/blog/acos-v10-infographic-v1.png",
  "public/images/blog/best-ai-tools-social-2026.jpg",
  "public/images/blog/frontier-model-comparison-infographic.png",

  # Infographics
  "public/images/blog/acos-6-layer-operating-loop-infographic.png",
  "public/images/blog/multi-agent-orchestration-infographic-v1.png",
  "public/images/blog/acos-hooks-infographic.png",
  "public/images/blog/acos-enterprise-layers-infographic.png",

  # Social cards
  "public/images/blog/prompt-mastery-social-card.jpg",
  "public/images/blog/prompt-mastery-social-v1.jpg",
  "public/images/blog/acos-enterprise-social-card.jpg",

  # Videos (premium motion)
  "public/videos/blog/multi-agent-orchestration-viz.mp4",
  "public/videos/blog/aeo-playbook-citation-flow.mp4",

  # Updated MDX (image + some video embeds)
  "content/blog/agent-family-architecture.mdx",
  "content/blog/multi-agent-orchestration-patterns-2026.mdx",
  "content/blog/acos-hooks-system-quality-gates.mdx",
  "content/blog/agentic-creator-os-complete-guide.mdx",
  "content/blog/swarm-intelligence-multi-agent-orchestration.mdx",
  "content/blog/ai-model-routing-guide.mdx",
  "content/blog/building-research-intelligence-system.mdx",
  "content/blog/ai-architecture-patterns-solo-builders.mdx",
  "content/blog/building-custom-skills-acos.mdx",
  "content/blog/prompt-engineering-mastery-workshop.mdx",
  "content/blog/claude-code-skills-2026-the-10-you-need.mdx",
  "content/blog/enterprise-agent-roadmap.mdx",
  "content/blog/mcp-server-integration-guide.mdx",
  "content/blog/acos-enterprise-deployment-guide.mdx",
  "content/blog/aeo-playbook-get-cited-by-ai-2026.mdx",
  "content/blog/agentic-ai-roadmap-2026.mdx",
  "content/blog/best-ai-image-generators-2026.mdx"
)

$copied = 0
$missing = 0

foreach ($f in $files) {
  $src = Join-Path (Get-Location) $f
  $dst = Join-Path $ProdRepo $f
  $dstDir = Split-Path $dst -Parent

  if (Test-Path $src) {
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    Copy-Item -Path $src -Destination $dst -Force
    Write-Host "  ✓ $f" -ForegroundColor Green
    $copied++
  } else {
    Write-Host "  ✗ MISSING $f" -ForegroundColor Red
    $missing++
  }
}

Write-Host ""
Write-Host "=== Sync complete ===" -ForegroundColor Cyan
Write-Host "Copied: $copied"
Write-Host "Missing in source: $missing"
Write-Host ""
Write-Host "Next steps in prod repo ($ProdRepo):" -ForegroundColor Yellow
Write-Host "  cd $ProdRepo"
Write-Host "  git status"
Write-Host "  git add -A"
Write-Host "  git commit -m 'feat(blog): premium visual overhaul batch — new heroes, infographics, motion viz, carousel'"
Write-Host "  git push origin main"
Write-Host ""
Write-Host "Then run pnpm predeploy or the usual deploy gate if required."
Write-Host "Verify at https://frankx.ai/blog" -ForegroundColor Green

  # Batch god mode 20+ more v6 headers + info + social
  "public/images/blog/best-ai-browser-2026-hero-v6.jpg",
  "public/images/blog/best-ai-affiliate-programs-2026-hero-v6.jpg",
  "public/images/blog/best-ai-coding-tools-for-beginners-2026-hero-v6.jpg",
  "public/images/blog/best-ai-note-taking-tools-2026-hero-v6.jpg",
  "public/images/blog/best-ai-presentation-maker-2026-hero-v6.jpg",
  "public/images/blog/best-ai-product-photography-2026-hero-v6.jpg",
  "public/images/blog/best-ai-resume-builder-2026-hero-v6.jpg",
  "public/images/blog/best-ai-shorts-tiktok-tools-2026-hero-v6.jpg",
  "public/images/blog/best-ai-video-editor-2026-hero-v6.jpg",
  "public/images/blog/cheapest-frontier-model-access-2026-hero-v6.jpg",
  "public/images/blog/ai-video-generation-2026-sora-runway-kling-veo-hero-v6.jpg",
  "public/images/blog/chatgpt-vs-claude-vs-gemini-2026-hero-v6.jpg",
  "public/images/blog/claude-code-mastery-top-resources-hero-v6.jpg",
  "public/images/blog/ai-health-fitness-athletes-creators-2026-hero-v6.jpg",
  "public/images/blog/best-local-llm-2026-hero-v6.jpg",
  "public/images/blog/best-ai-meeting-assistant-2026-hero-v6.jpg",
  "public/images/blog/best-ai-logo-maker-2026-hero-v6.jpg",
  "public/images/blog/best-ai-headshot-generator-2026-hero-v6.jpg",
  "public/images/blog/ai-workshops-for-students-what-worked-hero-v6.jpg",
  "public/images/blog/best-ai-tools-infographic-v1.png",
  "public/images/blog/agent-family-infographic-v1.png",
  "public/images/blog/model-routing-infographic-v1.png",
  "public/images/blog/acos-v10-infographic-v1.png",
  "public/images/blog/frontier-models-infographic-v1.png",
  "public/images/blog/best-ai-browser-social-card.jpg",
  "public/images/blog/agentic-workflows-social-card.jpg",
  "public/images/blog/ai-agents-inner-family-social-card.jpg",
  "public/images/blog/claude-code-mastery-social-card.jpg",
  "public/images/blog/30-minute-creator-os-social-card.jpg",

  # Final god-mode batch v7 + info/social (20+ more, total 100+)
  "public/images/blog/the-soul-frequency-framework-hero-v7.jpg",
  "public/images/blog/golden-age-of-intelligence-hero-v7.jpg",
  "public/images/blog/agentic-ai-roadmap-2026-hero-v7.jpg",
  "public/images/blog/agentic-creator-os-complete-guide-hero-v7.jpg",
  "public/images/blog/aeo-knowledge-graph-2026-hero-v7.jpg",
  "public/images/blog/agent-feed-privacy-first-ai-transparency-hero-v7.jpg",
  "public/images/blog/ai-guide-for-families-and-professionals-hero-v7.jpg",
  "public/images/blog/ai-video-generation-2026-sora-runway-kling-veo-hero-v7.jpg",
  "public/images/blog/ai-architecture-patterns-solo-builders-hero-v7.jpg",
  "public/images/blog/ai-coe-launch-hero-v7.jpg",
  "public/images/blog/best-ai-tools-for-creators-2026-hero-v7.jpg",
  "public/images/blog/best-ai-video-generators-2026-hero-v7.jpg",
  "public/images/blog/best-ai-writing-tools-vs-claude-2026-hero-v7.jpg",
  "public/images/blog/best-cheap-ai-music-generator-2026-hero-v7.jpg",
  "public/images/blog/best-elevenlabs-alternatives-2026-hero-v7.jpg",
  "public/images/blog/best-no-code-ai-agent-builders-2026-hero-v7.jpg",
  "public/images/blog/brand-evolution-from-consciousness-to-systems-hero-v7.jpg",
  "public/images/blog/building-custom-skills-hero-v7.jpg",
  "public/images/blog/claude-code-mcp-hero-v7.jpg",
  "public/images/blog/claude-code-pricing-explained-2026-hero-v7.jpg",
  "public/images/blog/best-ai-tools-infographic-v1.png",
  "public/images/blog/agent-family-infographic-v1.png",
  "public/images/blog/model-routing-infographic-v1.png",
  "public/images/blog/acos-v10-infographic-v1.png",
  "public/images/blog/frontier-models-infographic-v1.png",
  "public/images/blog/best-ai-browser-social-card.jpg",
  "public/images/blog/agentic-workflows-social-card.jpg",
  "public/images/blog/ai-agents-inner-family-social-card.jpg",
  "public/images/blog/claude-code-mastery-social-card.jpg",
  "public/images/blog/30-minute-creator-os-social-card.jpg",

  # Additional v7 batch for remaining high-priority
  "public/images/blog/best-ai-image-generators-2026-hero-v7.jpg",
  "public/images/blog/best-ai-superpowers-stack-2026-hero-v7.jpg",
  "public/images/blog/best-ai-video-generators-2026-hero-v7.jpg",
  "public/images/blog/claude-code-skills-2026-the-10-you-need-hero-v7.jpg",
  "public/images/blog/claude-fable-5-analysis-2026-hero-v7.jpg",
  "public/images/blog/claude-fable-5-prompting-guide-hero-v7.jpg",
  "public/images/blog/claude-opus-4-8-analysis-2026-hero-v7.jpg",
  "public/images/blog/creator-intelligence-systems-2026-hero-v7.jpg",
  "public/images/blog/creators-ai-toolkit-workshop-hero-v7.jpg",
  "public/images/blog/creators-life-architecture-guide-hero-v7.jpg",
  "public/images/blog/cursor-vs-claude-code-vs-windsurf-2026-hero-v7.jpg",
  "public/images/blog/deepseek-v4-analysis-2026-hero-v7.jpg",
  "public/images/blog/design-sprint-identity-hero-v7.jpg",
  "public/images/blog/embodied-creator-os-hero-v7.jpg",
  "public/images/blog/enterprise-agent-roadmap-hero-v7.jpg",
  "public/images/blog/eu-inc-28th-regime-european-startups-hero-v7.jpg",
  "public/images/blog/faceless-youtube-ai-tools-2026-hero-v7.jpg",
  "public/images/blog/frankx-business-plan-canvas-hero-v7.jpg",

  # Phase 2 Grok v8 batch (premium base copies for remaining legacy + consistency)
  "public/images/blog/ai-doesnt-have-to-be-soulless-hero-v8.jpg",
  "public/images/blog/the-soul-frequency-framework-hero-v8.jpg",
  "public/images/blog/golden-age-of-intelligence-hero-v8.jpg",
  "public/images/blog/acos-enterprise-deployment-guide-hero-v8.jpg",
  "public/images/blog/acos-hooks-system-quality-gates-hero-v8.jpg",
  "public/images/blog/aeo-playbook-get-cited-by-ai-2026-hero-v8.jpg",
  "public/images/blog/agent-family-architecture-hero-v8.jpg",
  "public/images/blog/build-your-own-jarvis-claude-code-hero-v8.jpg",
  "public/images/blog/conscious-ai-framework-hero-v8.jpg",
  "public/images/blog/gpt-5-5-analysis-2026-hero-v8.jpg",

  # Phase 2 MDX updates (Grok batch)
  "content/blog/01-ai-doesnt-have-to-be-soulless.mdx",
  "content/blog/02-the-soul-frequency-framework.mdx",
  "content/blog/08-golden-age-of-intelligence.mdx",
  "content/blog/acos-enterprise-deployment-guide.mdx",
  "content/blog/acos-hooks-system-quality-gates.mdx",
  "content/blog/aeo-playbook-get-cited-by-ai-2026.mdx",
  "content/blog/agent-family-architecture.mdx",
  "content/blog/build-your-own-jarvis-claude-code.mdx",

  # Additional Phase 2 Grok v8 (more execution)
  "public/images/blog/production-agentic-ai-systems-hero-v8.jpg",
  "public/images/blog/mcp-server-integration-guide-hero-v8.jpg",
  "public/images/blog/swarm-intelligence-multi-agent-orchestration-hero-v8.jpg",
  "public/images/blog/observability-stack-multi-agent-systems-2026-hero-v8.jpg",
  "public/images/blog/prompt-engineering-mastery-workshop-hero-v8.jpg",
  "public/images/blog/frankx-intelligence-atlas-volume-1-hero-v7.jpg",
  "public/images/blog/gemma-3-analysis-2026-hero-v7.jpg",

  # Additional 25 v7 for near-full coverage
  "public/images/blog/best-ai-image-generators-2026-hero-v7.jpg",
  "public/images/blog/best-ai-superpowers-stack-2026-hero-v7.jpg",
  "public/images/blog/best-ai-video-generators-2026-hero-v7.jpg",
  "public/images/blog/claude-code-skills-2026-the-10-you-need-hero-v7.jpg",
  "public/images/blog/claude-fable-5-analysis-2026-hero-v7.jpg",
  "public/images/blog/claude-fable-5-prompting-guide-hero-v7.jpg",
  "public/images/blog/claude-opus-4-8-analysis-2026-hero-v7.jpg",
  "public/images/blog/creator-intelligence-systems-2026-hero-v7.jpg",
  "public/images/blog/creators-ai-toolkit-workshop-hero-v7.jpg",
  "public/images/blog/creators-life-architecture-guide-hero-v7.jpg",
  "public/images/blog/cursor-vs-claude-code-vs-windsurf-2026-hero-v7.jpg",
  "public/images/blog/deepseek-v4-analysis-2026-hero-v7.jpg",
  "public/images/blog/design-sprint-identity-hero-v7.jpg",
  "public/images/blog/embodied-creator-os-hero-v7.jpg",
  "public/images/blog/enterprise-agent-roadmap-hero-v7.jpg",
  "public/images/blog/eu-inc-28th-regime-european-startups-hero-v7.jpg",
  "public/images/blog/faceless-youtube-ai-tools-2026-hero-v7.jpg",
  "public/images/blog/frankx-business-plan-canvas-hero-v7.jpg",

  # Phase 2 Grok v8 batch (premium base copies for remaining legacy + consistency)
  "public/images/blog/ai-doesnt-have-to-be-soulless-hero-v8.jpg",
  "public/images/blog/the-soul-frequency-framework-hero-v8.jpg",
  "public/images/blog/golden-age-of-intelligence-hero-v8.jpg",
  "public/images/blog/acos-enterprise-deployment-guide-hero-v8.jpg",
  "public/images/blog/acos-hooks-system-quality-gates-hero-v8.jpg",
  "public/images/blog/aeo-playbook-get-cited-by-ai-2026-hero-v8.jpg",
  "public/images/blog/agent-family-architecture-hero-v8.jpg",
  "public/images/blog/build-your-own-jarvis-claude-code-hero-v8.jpg",
  "public/images/blog/conscious-ai-framework-hero-v8.jpg",
  "public/images/blog/gpt-5-5-analysis-2026-hero-v8.jpg",

  # Phase 2 MDX updates (Grok batch)
  "content/blog/01-ai-doesnt-have-to-be-soulless.mdx",
  "content/blog/02-the-soul-frequency-framework.mdx",
  "content/blog/08-golden-age-of-intelligence.mdx",
  "content/blog/acos-enterprise-deployment-guide.mdx",
  "content/blog/acos-hooks-system-quality-gates.mdx",
  "content/blog/aeo-playbook-get-cited-by-ai-2026.mdx",
  "content/blog/agent-family-architecture.mdx",
  "content/blog/build-your-own-jarvis-claude-code.mdx",

  # Additional Phase 2 Grok v8 (more execution)
  "public/images/blog/production-agentic-ai-systems-hero-v8.jpg",
  "public/images/blog/mcp-server-integration-guide-hero-v8.jpg",
  "public/images/blog/swarm-intelligence-multi-agent-orchestration-hero-v8.jpg",
  "public/images/blog/observability-stack-multi-agent-systems-2026-hero-v8.jpg",
  "public/images/blog/prompt-engineering-mastery-workshop-hero-v8.jpg",
  "public/images/blog/frankx-intelligence-atlas-volume-1-hero-v7.jpg",
  "public/images/blog/gemma-3-analysis-2026-hero-v7.jpg",
  "public/images/blog/best-ai-resume-builder-2026-hero-v7.jpg",
  "public/images/blog/best-ai-logo-maker-2026-hero-v7.jpg",
  "public/images/blog/best-ai-presentation-maker-2026-hero-v7.jpg",
  "public/images/blog/best-ai-product-photography-2026-hero-v7.jpg",
  "public/images/blog/best-ai-shorts-tiktok-tools-2026-hero-v7.jpg",
