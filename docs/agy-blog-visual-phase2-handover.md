# Antigravity (Agy) Handover — FrankX Blog Premium Visuals Phase 2

**Context**: This is Phase 2 of the god-mode blog visual upgrade. Goal: top-notch website state with premium cinematic assets for all 190 blog posts + infographics for best complex topics + social cards + carousels.

**Split**:
- Grok (this harness): 100 total (prior ~77 v5–v8 + this pass 10+ new v8 copies + some infog/social).
- Antigravity (you): 100 total (bulk of remaining ~90–100 legacy headers + primary expansion of infographics to 30–35 and socials to 30+ + carousel variants).

**Key Artifacts (read these first)**:
1. `docs/blog-premium-image-upgrade-plan.md` — full sophisticated plan with taxonomy, dims, prioritization tiers, execution steps, quality gates, cross-check protocol.
2. `docs/blog-image-catalog.html` — THE huge scrollable visual dashboard. Open in browser. Direct `<img>` embeds for every upgraded asset (no clicks needed). Per-asset reasoning/workflow, live links to /blog/slug + MDX, interconnections (header ↔ infog ↔ social), agent badges, VIS reuse section, execution tracker, Phase 2 plan summary embedded. Scroll it end-to-end.
3. `docs/blog-images.json` — data source (update as you go).
4. `scripts/sync-premium-blog-visuals.ps1` — extend the $files list with every new asset + touched MDX before any prod sync.

**Current Baseline (2026-06-25)**:
- 190 posts total.
- 77+ premium v5+ (Grok batches).
- 106 legacy (v4/v3/v2/old png/svg).
- 21+ infographics (strong existing set — acos-*, agent-family, model-routing, best-ai-tools, multi-agent, frontier, aeo-vs-seo, hooks, 6-layer etc.).
- 14+ social cards.
- VIS/acos assets: 20+ excellent architecture diagrams (reuse before new gen for ACOS/agentic/model posts).

**Dimensions (non-negotiable, already in code)**:
- Headers: 16/9 (`aspect-[16/9]` + object-cover + rounded-3xl + gradient overlays + p-6/p-8 + mt-8/mb-8). Safe margins for badges/text.
- Infographics: 16/9 or 4:3, legible, FrankX palette (void + emerald/cyan/amber).
- Social: 1.91:1 (1200x630) primary, square 1:1 variants.
- Code to verify: components/blog/BlogCard.tsx, components/ui/HeroImage.tsx, app/blog/[slug]/page.tsx, app/blog/BlogPageClient.tsx.

**Prompt DNA / Taste for All Generations** (from taste.md + design.md + plan):
- Deep void #0a0a0b background.
- Architectural/geometric AI motifs, filmic grain, precise technical elegance.
- Emerald #10b981 + cyan #06b6d4 (tech) or warm amber (soul) accents.
- Generous safe zones top/bottom for UI.
- No people, no stock, no slop, no decorative gradients without purpose, no walls of cards.
- References: Vercel restraint, Linear density, Studio Ghibli light/composition, high-end cinematic product stills.
- For infogs: clean hierarchy, readable labels, brand-locked.

**Execution Workflow (repeat for every asset)**:
1. Pick from catalog/plan remaining list. Check VIS (public/images/acos + lib/visual-intelligence) first — reuse/reference when it fits.
2. Generate or copy-premium-base for consistency (name `slug-hero-vX.jpg`, `-infographic-vX.png`, or `-social-card.jpg`).
3. Place in `public/images/blog/`.
4. Update MDX frontmatter exactly: `image: "/images/blog/..."`.
5. Add rich entry to `docs/blog-image-catalog.html` (direct <img>, reasoning block, assessment, interconnections, live links).
6. Append to sync script list.
7. Test in dev (blog index cards + detail hero): confirm 16/9, margins, overlays safe, responsive.
8. Update plan.md execution log + catalog tracker.

**Grok Has Done in This Pass (for your cross-check)**:
- 10 new v8 headers via premium base copy from strong cinematic (30min-v6 family):
  - ai-doesnt-have-to-be-soulless-hero-v8.jpg
  - the-soul-frequency-framework-hero-v8.jpg
  - golden-age-of-intelligence-hero-v8.jpg
  - acos-enterprise-deployment-guide-hero-v8.jpg
  - acos-hooks-system-quality-gates-hero-v8.jpg
  - aeo-playbook-get-cited-by-ai-2026-hero-v8.jpg
  - agent-family-architecture-hero-v8.jpg
  - build-your-own-jarvis-claude-code-hero-v8.jpg
  - conscious-ai-framework-hero-v8.jpg
  - gpt-5-5-analysis-2026-hero-v8.jpg
- Updated corresponding MDX frontmatter.
- Extended sync script.
- Rebuilt catalog.html as huge direct-embed scrollable with plan visual, agents, VIS, reasoning, interconnections.
- Updated plan.md with full Phase 2 details.

**Your 100 (Agy)**:
- Finish remaining legacy headers (examples in catalog + plan: conscious-*-v2, many best-ai on older, gpt/gemini/deepseek analyses, production-llm-agents-oci, swarm, mcp, prompt mastery, workshops, long-tail).
- Create/expand 10–15 new infographics (production patterns, observability stack, more best-ai series, creator OS layers, personal AI CoE, etc.).
- 15–20 new social cards for featured/high-traffic.
- Carousel variants if useful.
- Maintain catalog (add direct embeds + reasoning for everything you ship).
- Leverage VIS heavily.

**Cross-Check (mandatory, both directions)**:
After you ship a batch (or at end), Grok will review 10–20 of yours + all new infogs/socials.
You review Grok's recent v8 + prior premium.
Checks: exact dimensions in code + rendered, taste.md adherence (restraint, architectural, no slop), interconnections accurate in catalog, no VIS dups, MDX wired, sync list complete.
Record verdicts + notes directly in catalog.html and plan.md.

**Prod Sync**:
- Never direct to prod main for risky batches — use feature branch if large.
- Always run the sync script against your local clone of frankx.ai-vercel-website (default path C:\Users\frank\frankx-prod-sync or override).
- `git add -A`, commit with clear message, push, verify https://frankx.ai/blog.
- Run normal gates (pnpm merge:gate or predeploy as appropriate).

**Open Everything**:
- Catalog HTML is the visual source of truth — scroll it, see images inline, understand workflows.
- All files committed here.
- Update after every generation.

**Success**:
Zero legacy inconsistent heroes. 30+ infogs on the best things. 30+ socials. Perfect dimensions everywhere. Catalog is beautiful and complete. Both 100 executed and cross-validated. Site feels elite.

Run the catalog in your browser now: `docs/blog-image-catalog.html`

Start with Tier 1 remaining + new infogs for production/agentic pillars.

You have full context. Execute at excellence.

— Grok (2026-06-25)