# FrankX Site Wiring Audit

Generated: 2026-08-18T03:27:56.008Z
Base URL: http://localhost:3000

## Summary

- Routes discovered: 861
- Public routes checked live: 852
- Source files scanned: 2649
- Total findings: 852
- Blocking findings: 582

## Blocking Findings

| Route | Source | Href | Status | Suggested fix |
| --- | --- | --- | --- | --- |
|  | app/ops/calendar/page.tsx:462 | /go/book-workshop | missing-go-slug | Resolve /go/book-workshop against route enumeration or redirect aliases. |
|  | app/ops/calendar/page.tsx:634 | /go/book-workshop | missing-go-slug | Resolve /go/book-workshop against route enumeration or redirect aliases. |
|  | app/opus-pro/page.tsx:52 | /brand | missing | Resolve /brand against route enumeration or redirect aliases. |
|  | components/research/AgenticLifeObservatory.tsx:240 | /research/agentic-life-observatory/registry.json | missing | Resolve /research/agentic-life-observatory/registry.json against route enumeration or redirect aliases. |
|  | components/workshops/ikigai/ContentOperatingPlan.tsx:336 | /go/ikigai-notion-template | missing-go-slug | Resolve /go/ikigai-notion-template against route enumeration or redirect aliases. |
|  | components/workshops/ikigai/ContentOperatingPlan.tsx:345 | /go/ikigai-sheet-template | missing-go-slug | Resolve /go/ikigai-sheet-template against route enumeration or redirect aliases. |
|  | components/workshops/ikigai/LiveArtifact.tsx:90 | /go/claude-cowork | missing-go-slug | Resolve /go/claude-cowork against route enumeration or redirect aliases. |
|  | components/workshops/ikigai/LiveArtifact.tsx:100 | /go/ikigai-prompt-scaffold | missing-go-slug | Resolve /go/ikigai-prompt-scaffold against route enumeration or redirect aliases. |
|  | data/site-links.json:139 | /go/book-workshop | missing-go-slug | Resolve /go/book-workshop against route enumeration or redirect aliases. |
|  | data/site-links.json:161 | /go/ikigai-notion-template | missing-go-slug | Resolve /go/ikigai-notion-template against route enumeration or redirect aliases. |
|  | data/site-links.json:169 | /go/ikigai-sheet-template | missing-go-slug | Resolve /go/ikigai-sheet-template against route enumeration or redirect aliases. |
|  | data/site-links.json:177 | /go/claude-cowork | missing-go-slug | Resolve /go/claude-cowork against route enumeration or redirect aliases. |
|  | data/site-links.json:185 | /go/ikigai-prompt-scaffold | missing-go-slug | Resolve /go/ikigai-prompt-scaffold against route enumeration or redirect aliases. |
| /acos/agents | rendered-html | /bv | missing | /acos/agents renders missing href /bv. |
| /ai-architecture/claude-code-multi-agent-team-railway | live-crawl | /ai-architecture/claude-code-multi-agent-team-railway | 500 | Fix route response for /ai-architecture/claude-code-multi-agent-team-railway. |
| /alea/musik | rendered-html | /alea/musik/piano | missing | /alea/musik renders missing href /alea/musik/piano. |
| /alea/musik | rendered-html | /alea/musik/violin | missing | /alea/musik renders missing href /alea/musik/violin. |
| /blog/conscious-ai-integration-operating-system | live-crawl | /blog/conscious-ai-integration-operating-system | 500 | Fix route response for /blog/conscious-ai-integration-operating-system. |
| /blog/creators-life-architecture-guide | live-crawl | /blog/creators-life-architecture-guide | 500 | Fix route response for /blog/creators-life-architecture-guide. |
| /blog/creators-ai-toolkit-workshop | live-crawl | /blog/creators-ai-toolkit-workshop | 500 | Fix route response for /blog/creators-ai-toolkit-workshop. |
| /blog/creator-intelligence-systems-2026 | live-crawl | /blog/creator-intelligence-systems-2026 | 500 | Fix route response for /blog/creator-intelligence-systems-2026. |
| /blog/cursor-vs-claude-code-vs-windsurf-2026 | live-crawl | /blog/cursor-vs-claude-code-vs-windsurf-2026 | 500 | Fix route response for /blog/cursor-vs-claude-code-vs-windsurf-2026. |
| /blog/deepseek-r1-open-weight-reasoning-analysis | live-crawl | /blog/deepseek-r1-open-weight-reasoning-analysis | 500 | Fix route response for /blog/deepseek-r1-open-weight-reasoning-analysis. |
| /blog/deepseek-v4-analysis-2026 | live-crawl | /blog/deepseek-v4-analysis-2026 | 500 | Fix route response for /blog/deepseek-v4-analysis-2026. |
| /blog/design-sprint-week-10-visual-identity-competition | live-crawl | /blog/design-sprint-week-10-visual-identity-competition | 500 | Fix route response for /blog/design-sprint-week-10-visual-identity-competition. |
| /blog/do-you-need-rtx-5090-for-ai-2026 | live-crawl | /blog/do-you-need-rtx-5090-for-ai-2026 | 500 | Fix route response for /blog/do-you-need-rtx-5090-for-ai-2026. |
| /blog/enterprise-agent-roadmap | live-crawl | /blog/enterprise-agent-roadmap | 500 | Fix route response for /blog/enterprise-agent-roadmap. |
| /blog/faceless-youtube-ai-tools-2026 | live-crawl | /blog/faceless-youtube-ai-tools-2026 | 500 | Fix route response for /blog/faceless-youtube-ai-tools-2026. |
| /blog/embodied-creator-os | live-crawl | /blog/embodied-creator-os | 500 | Fix route response for /blog/embodied-creator-os. |
| /blog/eu-inc-28th-regime-european-startups | live-crawl | /blog/eu-inc-28th-regime-european-startups | 500 | Fix route response for /blog/eu-inc-28th-regime-european-startups. |
| /blog/frankx-vision-mission-values | live-crawl | /blog/frankx-vision-mission-values | 500 | Fix route response for /blog/frankx-vision-mission-values. |
| /blog/frankx-intelligence-ecosystem-complete-guide | live-crawl | /blog/frankx-intelligence-ecosystem-complete-guide | 500 | Fix route response for /blog/frankx-intelligence-ecosystem-complete-guide. |
| /blog/frankx-intelligence-atlas-volume-1 | live-crawl | /blog/frankx-intelligence-atlas-volume-1 | 500 | Fix route response for /blog/frankx-intelligence-atlas-volume-1. |
| /blog/frankx-business-plan-canvas | live-crawl | /blog/frankx-business-plan-canvas | 500 | Fix route response for /blog/frankx-business-plan-canvas. |
| /blog/from-x-tweets-to-blog-gold-2026 | live-crawl | /blog/from-x-tweets-to-blog-gold-2026 | 500 | Fix route response for /blog/from-x-tweets-to-blog-gold-2026. |
| /blog/gemini-3-5-pro-analysis-2026 | live-crawl | /blog/gemini-3-5-pro-analysis-2026 | 500 | Fix route response for /blog/gemini-3-5-pro-analysis-2026. |
| /blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek | live-crawl | /blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek | 500 | Fix route response for /blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek. |
| /blog/frontier-model-routing-without-fable-5 | live-crawl | /blog/frontier-model-routing-without-fable-5 | 500 | Fix route response for /blog/frontier-model-routing-without-fable-5. |
| /blog/gencreator-3-tier-shipping-system | live-crawl | /blog/gencreator-3-tier-shipping-system | 500 | Fix route response for /blog/gencreator-3-tier-shipping-system. |
| /blog/gemma-3-analysis-2026 | live-crawl | /blog/gemma-3-analysis-2026 | 500 | Fix route response for /blog/gemma-3-analysis-2026. |
| /blog/getting-started-agentic-creator-os | live-crawl | /blog/getting-started-agentic-creator-os | 500 | Fix route response for /blog/getting-started-agentic-creator-os. |
| /blog/gencreator-7-dimensions-complete-guide | live-crawl | /blog/gencreator-7-dimensions-complete-guide | 500 | Fix route response for /blog/gencreator-7-dimensions-complete-guide. |
| /blog/google-ai-pro-compute-limits-ai-credits-may-2026 | live-crawl | /blog/google-ai-pro-compute-limits-ai-credits-may-2026 | 500 | Fix route response for /blog/google-ai-pro-compute-limits-ai-credits-may-2026. |
| /blog/golden-age-field-guide | live-crawl | /blog/golden-age-field-guide | 500 | Fix route response for /blog/golden-age-field-guide. |
| /blog/golden-age-of-intelligence | live-crawl | /blog/golden-age-of-intelligence | 500 | Fix route response for /blog/golden-age-of-intelligence. |
| /blog/golden-age-of-creators-why-now-is-different | live-crawl | /blog/golden-age-of-creators-why-now-is-different | 500 | Fix route response for /blog/golden-age-of-creators-why-now-is-different. |
| /blog/gpt-oss-analysis-2026 | live-crawl | /blog/gpt-oss-analysis-2026 | 500 | Fix route response for /blog/gpt-oss-analysis-2026. |
| /blog/grok-4-3-analysis-2026 | live-crawl | /blog/grok-4-3-analysis-2026 | 500 | Fix route response for /blog/grok-4-3-analysis-2026. |
| /blog/gpt-5-5-analysis-2026 | live-crawl | /blog/gpt-5-5-analysis-2026 | 500 | Fix route response for /blog/gpt-5-5-analysis-2026. |
| /blog/heygen-vs-synthesia-vs-argil-2026 | live-crawl | /blog/heygen-vs-synthesia-vs-argil-2026 | 500 | Fix route response for /blog/heygen-vs-synthesia-vs-argil-2026. |
| /blog/how-to-build-your-soul-md | live-crawl | /blog/how-to-build-your-soul-md | 500 | Fix route response for /blog/how-to-build-your-soul-md. |
| /blog/inner-hr-ai-agent | live-crawl | /blog/inner-hr-ai-agent | 500 | Fix route response for /blog/inner-hr-ai-agent. |
| /blog/how-to-write-claude-md-that-works | live-crawl | /blog/how-to-write-claude-md-that-works | 500 | Fix route response for /blog/how-to-write-claude-md-that-works. |
| /blog/iacos-investment-research-os | live-crawl | /blog/iacos-investment-research-os | 500 | Fix route response for /blog/iacos-investment-research-os. |
| /blog/karpathys-ai-vision-deep-dive | live-crawl | /blog/karpathys-ai-vision-deep-dive | 500 | Fix route response for /blog/karpathys-ai-vision-deep-dive. |
| /blog/llama-4-analysis-2026 | live-crawl | /blog/llama-4-analysis-2026 | 500 | Fix route response for /blog/llama-4-analysis-2026. |
| /blog/kimi-k2-analysis-2026 | live-crawl | /blog/kimi-k2-analysis-2026 | 500 | Fix route response for /blog/kimi-k2-analysis-2026. |
| /blog/intent-architecture-agentic-delegation | live-crawl | /blog/intent-architecture-agentic-delegation | 500 | Fix route response for /blog/intent-architecture-agentic-delegation. |
| /blog/manifestation-reality-architect-ai-vibe | live-crawl | /blog/manifestation-reality-architect-ai-vibe | 500 | Fix route response for /blog/manifestation-reality-architect-ai-vibe. |
| /blog/magnifica-humanitas-benevolent-future-arcanea | live-crawl | /blog/magnifica-humanitas-benevolent-future-arcanea | 500 | Fix route response for /blog/magnifica-humanitas-benevolent-future-arcanea. |
| /blog/llm-evals-claude-code-guide | live-crawl | /blog/llm-evals-claude-code-guide | 500 | Fix route response for /blog/llm-evals-claude-code-guide. |
| /blog/mcp-doctor-claude-code-server-optimization | live-crawl | /blog/mcp-doctor-claude-code-server-optimization | 500 | Fix route response for /blog/mcp-doctor-claude-code-server-optimization. |
| /blog/meaning-as-operating-system | live-crawl | /blog/meaning-as-operating-system | 500 | Fix route response for /blog/meaning-as-operating-system. |
| /blog/mcp-server-integration-guide | live-crawl | /blog/mcp-server-integration-guide | 500 | Fix route response for /blog/mcp-server-integration-guide. |
| /blog/mcp-ecosystem-2026-clawhub-smithery-guide | live-crawl | /blog/mcp-ecosystem-2026-clawhub-smithery-guide | 500 | Fix route response for /blog/mcp-ecosystem-2026-clawhub-smithery-guide. |
| /blog/mcp-server-architecture-workshop | live-crawl | /blog/mcp-server-architecture-workshop | 500 | Fix route response for /blog/mcp-server-architecture-workshop. |
| /blog/misinformation-guardian-hackathon-build-log-2026 | live-crawl | /blog/misinformation-guardian-hackathon-build-log-2026 | 500 | Fix route response for /blog/misinformation-guardian-hackathon-build-log-2026. |
| /blog/mistral-large-3-analysis-2026 | live-crawl | /blog/mistral-large-3-analysis-2026 | 500 | Fix route response for /blog/mistral-large-3-analysis-2026. |
| /blog/microsoft-mai-frontier-models-2026 | live-crawl | /blog/microsoft-mai-frontier-models-2026 | 500 | Fix route response for /blog/microsoft-mai-frontier-models-2026. |
| /blog/memory-as-exile-ai | live-crawl | /blog/memory-as-exile-ai | 500 | Fix route response for /blog/memory-as-exile-ai. |
| /blog/multi-agent-orchestration-patterns-2026 | live-crawl | /blog/multi-agent-orchestration-patterns-2026 | 500 | Fix route response for /blog/multi-agent-orchestration-patterns-2026. |
| /blog/monday-operator-playbook-august-2026-models | live-crawl | /blog/monday-operator-playbook-august-2026-models | 500 | Fix route response for /blog/monday-operator-playbook-august-2026-models. |
| /blog/music-as-consciousness-technology | live-crawl | /blog/music-as-consciousness-technology | 500 | Fix route response for /blog/music-as-consciousness-technology. |
| /blog/multi-agent-model-fabric-2026-wave | live-crawl | /blog/multi-agent-model-fabric-2026-wave | 500 | Fix route response for /blog/multi-agent-model-fabric-2026-wave. |
| /blog/no-bad-parts-ai-debugging | live-crawl | /blog/no-bad-parts-ai-debugging | 500 | Fix route response for /blog/no-bad-parts-ai-debugging. |
| /blog/music-intelligence-vibe-os-launch | live-crawl | /blog/music-intelligence-vibe-os-launch | 500 | Fix route response for /blog/music-intelligence-vibe-os-launch. |
| /blog/n8n-automation-ai-creators-9-workflows | live-crawl | /blog/n8n-automation-ai-creators-9-workflows | 500 | Fix route response for /blog/n8n-automation-ai-creators-9-workflows. |
| /blog/my-100-month-ai-stack-every-tool-i-actually-use | live-crawl | /blog/my-100-month-ai-stack-every-tool-i-actually-use | 500 | Fix route response for /blog/my-100-month-ai-stack-every-tool-i-actually-use. |
| /blog/nvidia-ces-2026-physical-ai-revolution | live-crawl | /blog/nvidia-ces-2026-physical-ai-revolution | 500 | Fix route response for /blog/nvidia-ces-2026-physical-ai-revolution. |
| /blog/no-bad-parts-sovereign-ai | live-crawl | /blog/no-bad-parts-sovereign-ai | 500 | Fix route response for /blog/no-bad-parts-sovereign-ai. |

## Commerce Verification

| ID | Kind | URL | Status | Owner action |
| --- | --- | --- | --- | --- |
| vibe-os | free-download | /products/vibe-os | verified |  |
| creators-soulbook | free-download | /soulbook | needs-verification | Confirm gated download and email delivery behavior. |
| creative-ai-toolkit | paid-product | https://frankx.gumroad.com/l/creative-ai-toolkit | needs-verification | Confirm canonical checkout platform and delivery file before changing CTAs. |
| creation-chronicles | paid-product | https://frankx.gumroad.com/l/creation-chronicles-creator | needs-verification | Confirm canonical checkout platform, tier links, and delivery pipeline. |
| bv-kit | paid-product | https://frankxai.gumroad.com/l/bv-kit | needs-verification | Confirm Gumroad account/domain and whether Stripe or LemonSqueezy should replace it. |
| prompt-vault | paid-product | https://frankxai.gumroad.com/l/prompt-vault | needs-verification | Confirm Gumroad account/domain and whether Stripe or LemonSqueezy should replace it. |
| ai-architecture-templates | paid-product | /ai-architecture/templates | needs-verification | Fill verified checkout variant IDs before exposing buy buttons. |

## Canonical Aliases

| From | To | Status | Reason |
| --- | --- | --- | --- |
| /music-school | /music/learn | verified | Music School is a public label; /music/learn is the existing route. |
| /agentic-creator-os | /products/agentic-creator-os | verified | Legacy product shorthand now resolves to the canonical Agentic Creator OS product page. |
| /ai-music-academy | /music/learn | verified | AI Music Academy CTAs now land on the public music learning hub. |
| /ai-architectures | /ai-architecture | verified | Permanent redirect already exists in next.config.mjs. |
| /ai-architect | /ai-architecture | verified | Permanent redirect already exists in next.config.mjs. |
| /links | /linktree | verified | Proxy redirects /links to /linktree. |
| /learning-paths | /learn | verified | Learning-path label now resolves to the consolidated Learn hub. |
| /for/founders | /for/creators | verified | Founder workshop CTAs now land on the existing creator audience page. |
| /toolkit | /products/creative-ai-toolkit | verified | Creator Toolkit ladder CTA now resolves to the existing Creative AI Toolkit product page. |
| /soul-frequency-assessment | /soul-frequency-quiz | verified | Redirect alias exists and quiz page is live. |
| /products/soulbook | /soulbook | verified | Permanent redirect already exists in next.config.mjs. |
| /vibe-os | /products/vibe-os | verified | Legacy shorthand now resolves to the canonical Vibe OS product page. |

