# FrankX Visual Inventory & Audit — 2026-06

**Canonical tracking.** Complements (does not replace) the Jan 2026 MD catalogs and audits. Primary machine-readable source: [VISUAL_INVENTORY_2026.csv](./VISUAL_INVENTORY_2026.csv).

## Executive Summary (Vis-Audit)

- **Total blog heroes/support in public/images/blog/**: 321 files (mix of descriptive *-hero.png + _thumb.jpeg + many UUID-named .png/.webp from bulk gens).
- **Inline/support (content/images/)**: ~127 files.
- **Frontmatter coverage on live content/blog/*.mdx**: Excellent — nearly 100% of scanned posts declare an `image:` key (points to /images/blog/... or sub-collections like /images/models/, /images/acos/).
- **Prior audits (Jan 2026)**: IMAGE_CATALOG.md, IMAGE_ASSIGNMENTS.md, IMAGE_ORGANIZATION_FINAL.md, QUALITY_AUDIT.md (critical brand review), CXO_IMAGE_AUDIT.md (storage + unnamed gaps). 5 pseudo-science images flagged for deletion; some Arcanea fantasy and Vibe neural series conditional on active products; many renames recommended; thumbnails and curation gaps noted.
- **Inventory reality**: No single CSV/master registry before this. Rich narrative MDs existed. This CSV + MD is the new structured layer.
- **Low-quality / curation risks addressed**:
  - UUID bulk files (hard to track/assign).
  - Several .svg heroes (lighter vector; often model analyses or frameworks — upgraded in this batch).
  - Reused heroes across posts.
  - Brand spectrum drift risk (tech vs soul vs bridge per design.md).
- **Planned content**: 2-ready-to-publish/ mostly social promo MDs for books + a few guides (acos-v10, frankx-intelligence-ecosystem). Drafts limited. New mdx should get premium heroes before publish.

**Verdict**: Strong foundation and volume. Opportunity for consistency + top-notch refresh on 10+ key posts. All new images (below) follow acos-visual-generator pipeline (research-grounded facts visualized + approved styles) + current design system (dark-first void #0a0a0b, dual-spectrum discipline, premium depth without flash, AI Architect technical restraint per BRAND_IDENTITY.md and QUALITY_AUDIT.md).

## Design Thinking (Key Constraints Applied)

From design.md + DESIGN_SYSTEM.md + BRAND_IDENTITY.md + CONTENT_STRATEGY.md + audits:

- **Positioning**: Primary title "AI Architect" (technical, professional). Musician-technologist secondary. No self-help guru language in visuals or copy.
- **Color/Spectrum (strict)**: 
  - Tech (emerald #10b981 + cyan #06b6d4) for agentic AI, coding agents, architecture, production systems, model analysis, MCP, orchestration.
  - Soul (amber #f59e0b + gold) for music, Suno, personal creator essays, Vibe OS.
  - Bridge (purple #AB47C7 / violet etc.) for Arcanea, creative worlds, generative storytelling — use sparingly.
- **Aesthetic**: Dark-first obsidian ladder (void → space → elevated). Glassmorphism with depth, chrome reflections, isometric or clean HUD for tech. Cinematic but restrained for soul/bridge. Legible at hero scale. 16:9 desktop primary.
- **Generation principles** (acos-visual-generator aligned): Research 3-5 verifiable facts → visualize them → pick style (3d-isometric, dark HUD, technical infographic, premium cinematic) → brand validation → high-res + thumb.
- **Do not**: Mix spectra in one hero, use meditation/quantum-woo composites, fantasy gaming (unless isolated product), stock-photo mashups, low-contrast or unlabelled diagrams.

New images (this batch) were prompted accordingly. Future gens should reference this inventory + design.md before prompt craft.

## 10 New Premium Header Images (Generated 2026-06)

All saved to session (move to `public/images/blog/` with names below + create matching `_thumb.jpeg` via standard process). Assigned to high-value posts that either used lighter .svg, had reuse risk, or are core narrative pillars.

1. **visual-intelligence-system-ai-image-management-hero-premium.png** (session images/4.jpg) — Tech. Meta for this exact work. InfoGenius pipeline + catalog + gates dashboard.
2. **agentic-creator-os-complete-guide-hero-premium.png** (session images/2.jpg) — Tech. Layered 3D isometric: World Graph → Orchestration → Genesis Flow.
3. **golden-age-of-intelligence-hero-premium.png** (session images/1.jpg) — Tech + soul accents. Creator silhouette + code/music rising into disciplined golden horizon.
4. **production-agentic-ai-systems-hero-premium.png** (session images/5.jpg) — Tech. 7-pillar production architecture isometric/HUD.
5. **swarm-intelligence-multi-agent-orchestration-hero-premium.png** (session images/3.jpg) — Tech. Starlight Orchestrator hub with labeled specialist agents + handoff loops.
6. **suno-prompt-engineering-complete-guide-hero-premium.png** (session images/6.jpg) — Soul. Studio waveforms + prompt staves → soundscape, amber/gold on void.
7. **claude-code-skills-2026-the-10-you-need-hero-premium.png** (session images/10.jpg) — Tech. Skills workbench grid (10 primitives) with flows.
8. **frankx-intelligence-ecosystem-complete-guide-hero-premium.png** (session images/9.jpg) — Tech. Radial ecosystem map (ACOS, Starlight, Agentic OS, Vibe, Arcanea, MCP, flywheel).
9. **best-open-local-llms-2026-hero-premium.png** (session images/7.jpg) — Tech. Motherboard benchmark chips + metrics (replaces .svg).
10. **grok-4-3-analysis-2026-hero-premium.png** (session images/8.jpg) — Tech. Frontier model constellation/radar with Grok positioned (replaces .svg; meta for current harness).

**Usage**: Update the corresponding `image:` in the .mdx frontmatter. Generate thumbs. Add entries to IMAGE_CATALOG.md / IMAGE_ASSIGNMENTS.md as needed.

## Recommendations (Top-Notch Path)

1. **Curation pass on blog/**: Rename or replace remaining UUID files. Prefer descriptive + spectrum tag.
2. **Thumbs everywhere**: Ensure every new/replaced hero has `_thumb.jpeg` companion (Vercel perf + catalog pattern).
3. **Spectrum enforcement**: Add a lightweight check (or agent prompt) that new visuals declare intended spectrum and stay loyal.
4. **Automation**: Expand public/images/registry.json or this CSV into a small sync script (e.g. on content change). Consider tying to CONTENT_SCHEMA.md.
5. **Quarterly vis-audit**: Re-run similar scan (frontmatter + file existence + quality spot-check via gstack or manual). Gate publishes on "has premium hero + thumb + catalog entry".
6. **Storage**: Review Vercel usage; the prior CXO note (237 MB / ~24% of free) still relevant — prefer optimized webp + thumbs over raw duplicates.
7. **Brand guard**: Any visual with "quantum jumping", meditation figures, pure fantasy character cards, or guru framing should route to _archive or product-specific folders only.
8. **Next 10 candidates**: Remaining model analyses with .svg, any acos-*/agentic- that still feel dated, new content from 2-ready-to-publish when promoted to blog/.

## Sources & Prior Work

- Audits & catalogs: public/images/IMAGE_CATALOG.md, IMAGE_ASSIGNMENTS.md, IMAGE_ORGANIZATION_FINAL.md, QUALITY_AUDIT.md, CXO_IMAGE_AUDIT.md (Jan 2026).
- Design truth: design.md, DESIGN_SYSTEM.md, BRAND_IDENTITY.md.
- Content: CONTENT_STRATEGY.md, content/blog/CONTENT_SCHEMA.md + EDITORIAL_STANDARD.md, content/2-ready-to-publish/, content/drafts/.
- Current asset counts from filesystem scan (2026-06).
- Generation: Native image tooling following acos-visual-generator process (research + facts + style + brand) + design system tokens.

This brings the visual layer to top-notch consistency with the rest of the FrankX craft bar. Ship the 10, prune the UUIDs, lock the CSV as source-of-truth going forward.

*Maintained by FrankX Content + Design intelligence.*
## Next 10 Premium Headers Generated (Autonomous Batch 2, 2026-06)

Continuing from the first 10. All targets were current .svg lightweight frontier model analysis posts (prime low-quality per vis-audit).

- **qwen3-max-analysis-2026-hero-premium.png** (session images/13.jpg) — Tech. Qwen3-Max-Thinking 1T+ MoE, test-time scaling, native tools, competitive on HLE/AIME/coding.
- **gemini-3-5-pro-analysis-2026-hero-premium.png** (session images/12.jpg) — Tech. Gemini 3.5 Flash Pareto leader (agentic Terminal-Bench/GDPval gains, 280+ tok/s, multimodal).
- **llama-4-analysis-2026-hero-premium.png** (session images/14.jpg) — Tech. Llama 4 Scout/Maverick open-weight context/multimodal efficiency leaders.
- **deepseek-v4-analysis-2026-hero-premium.png** (session images/11.jpg) — Tech. DeepSeek V4-Pro (cheap 1.6T MoE near-frontier on SWE/Terminal, open economics).
- **mistral-large-3-analysis-2026-hero-premium.png** (session images/15.jpg) — Tech. Mistral Large 3 675B MoE Western open frontier (GB200 opt, coding/math).
- **kimi-k2-analysis-2026-hero-premium.png** (session images/18.jpg) — Tech. Kimi K2 Agent Swarm (100 parallel agents + tools, multimodal long-horizon).
- **claude-opus-4-8-analysis-2026-hero-premium.png** (session images/17.jpg) — Tech. Claude Opus 4.8 coding/agent leader (SWE-Bench, OSWorld, extended workflows).
- **gpt-5-5-analysis-2026-hero-premium.png** (session images/16.jpg) — Tech. GPT-5.5 terminal/agentic/coding index leader (Terminal-Bench, tool-heavy).
- **microsoft-mai-frontier-models-2026-hero-premium.png** (session images/20.jpg) — Tech. Microsoft MAI frontier ecosystem-competitive reasoning/agentic.
- **gpt-oss-analysis-2026-hero-premium.png** (session images/19.jpg) — Tech. GPT-OSS open-weights cost/performance and ecosystem positions.

**Adoption steps (same for both batches):** 
1. Copy the 20 session images (1.jpg–20.jpg from the grok session images dir) into public/images/blog/.
2. Rename per the -premium.png suggestions above (and first batch equivalents).
3. Generate companion _thumb.jpeg for each (standard optimization).
4. Update the 20 corresponding .mdx frontmatter image: paths.
5. Add entries to IMAGE_CATALOG.md and IMAGE_ASSIGNMENTS.md.
6. Prune remaining .svg and UUIDs.
7. Commit the updated VISUAL_INVENTORY_2026.* + new assets.

All prompts followed acos-visual-generator (research facts from 2026 landscape searches + visualized benchmarks/agentic/context/MoE/tool-use) + design.md (tech spectrum, void #0a0a0b, glass/isometric/HUD, legible, professional AI Architect restraint, no guru elements).

