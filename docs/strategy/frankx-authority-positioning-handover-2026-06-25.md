# FrankX Authority Positioning Handover

Date: 2026-06-25

## Outcome

Created and applied a cleaner authority layer for FrankX and related repos. The new positioning keeps Frank's credibility strong while avoiding current-employment language, Oracle endorsement implications, confidential/customer material implications, exact unsafe deal-size framing, and unverified Oracle/OCI pricing claims.

Canonical language now centers on:

- AI Architect & Creator.
- Enterprise-scale AI and cloud transformation experience.
- Practical AI systems for entrepreneurs, creators, operators, and high-agency humans.
- Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.

## Canonical Positioning System

Created:

- `FrankX/docs/strategy/frankx-authority-positioning.md`

This file contains:

- Short bio.
- Long bio.
- Site hero positioning block.
- Standard disclaimer block.
- "From enterprise AI to entrepreneur AI systems" narrative.
- Approved language and avoid/verify language.
- XORAC warning: treat as internal only until vetted because it is Oracle-adjacent.

## Main Files Changed

### FrankX

- `BRAND_IDENTITY.md`
- `CLAUDE.md`
- `.frankx/identity.md`
- `.frankx/family/frank-riemer.md`
- `.claude/context/frank-identity.md`
- `app/page.tsx`
- `app/bio/page.tsx`
- `app/bio/layout.tsx`
- `app/youtube/page.tsx`
- `app/coaching/page.tsx`
- `app/ai-evolution/page.tsx`
- `app/ai-evolution/layout.tsx`
- `app/courses/build-your-ai-creator-os/page.tsx`
- `app/products/prompt-vault/page.tsx`
- `app/os/page.tsx`
- `app/watch/shorts/page.tsx`
- `app/linktree/layout.tsx`
- `app/llms.txt/route.ts`
- `app/llms-full.txt/route.ts`
- `app/product-development/acos-v11/page.tsx`
- `app/workshops/for-educators/page.tsx`
- `app/design-lab/nature/variants/homepage/page.tsx`
- `components/home/HomePage.tsx`
- `components/home/HomePageElite.tsx`
- `components/home/V3HomePage.tsx`
- `components/design-lab/GlassCathedralHero.tsx`
- `components/v0-variants/ACOSProductV0.tsx`
- `content/blog/ai-model-routing-guide.mdx`
- `content/blog/claude-fable-5-analysis-2026.mdx`
- `content/blog/claude-fable-5-prompting-guide.mdx`
- `content/blog/golden-age-of-creators-why-now-is-different.mdx`
- `content/blog/llm-evals-claude-code-guide.mdx`
- `content/blog/oracle-genai-agents-vs-langgraph-crewai-2026.mdx`
- `content/blog/production-llm-agents-oci-part-1-architecture.mdx`
- `content/blog/production-llm-agents-oci-part-2-agent-patterns.mdx`
- `content/blog/production-llm-agents-oci-part-3-operating-model.mdx`
- `content/blog/vibe-os-platform-introduction.mdx`
- `content/lead-magnets/5-suno-prompts.md`
- `content/newsletters/daily/2026-02-17.html`
- `content/partnerships/_placeholders/anthropic.ts`
- `data/acos/agents.ts`
- `data/progress-tracker.json`
- `lib/voice/frankx-voice.ts`

### frankx.ai-vercel-website

Mirrored the safer positioning across public pages, home/coaching/youtube components, llms routes, Oracle/OCI blog posts, model-eval bylines, books/manuscript excerpts, lead magnet, Anthropic placeholder, tribe data, and voice files.

Key changed areas:

- `CLAUDE.md`
- `BRAND_IDENTITY.md`
- `.claude/context/frank-identity.md`
- `app/**`
- `components/**`
- `content/blog/**`
- `content/books/**`
- `content/golden-age-book/**`
- `content/lead-magnets/5-suno-prompts.md`
- `content/partnerships/_placeholders/anthropic.ts`
- `data/acos/agents.ts`
- `lib/voice/frankx-voice.ts`
- `lib/research/domains.ts`

### frankx-blog-vos-worktree

Mirrored the same safer layer across public pages, blog content, book content, source data, and voice files.

Key changed areas:

- `CLAUDE.md`
- `app/**`
- `components/**`
- `content/blog/**`
- `content/books/**`
- `content/golden-age-book/**`
- `content/lead-magnets/5-suno-prompts.md`
- `content/partnerships/_placeholders/anthropic.ts`
- `data/acos/agents.ts`
- `lib/voice/frankx-voice.ts`

### ai-architect-academy

- `README.md`
- `STATUS_AND_STRATEGY.md`
- `BUSINESS_MODEL_KNOWLEDGE_BASE.md`
- `01-design-patterns/oracle-adk-blueprint.md`
- `04-templates/design/design-system.css`
- `04-templates/design/ui-guidelines.html`
- `11-hyperscalers/oci/README.md`

## Risky Claims Found

- Current-employment phrasing: "AI Architect & Creator", "Oracle AI Architect", "AI Architect & Creator EMEA".
- Formal institution implication: "Oracle AI Center of Excellence" and "Oracle EMEA AI CoE practice" used as public positioning.
- Partnership/endorsement risk: Anthropic placeholder implied Oracle org publication and Oracle-side status too directly.
- Confidential/customer implication: language such as "Every enterprise I work with" and "designed systems for enterprise clients."
- Pricing/licensing risk: "zero-cost", "no additional cost", and "included with Oracle Fusion" around Oracle/OCI content.
- Structured data risk: `worksFor` Oracle schema on bio pages.
- Brand proximity risk: XORAC appears too Oracle-adjacent and should remain internal only until legal/brand review.

## Recommended Claims To Verify

- "12,000+ songs" / "12,000+ AI-generated songs."
- "500+ AI songs" in older lead magnets.
- "40+ agents", "38 agents", "75+ skills", "31-tool MCP server."
- "ACOS 1,000+ builders."
- "7,000+ EMEA audience/followers."
- "17 books published" and platform serving students, professors, researchers, and doctors.
- "Helped build a seven-figure business with his brother."
- Any Oracle/OCI pricing, inclusion, availability, or "only hyperscaler" style claims.
- Any quantified model benchmark or vendor launch facts before republishing.

## Remaining Sweep Areas

Targeted active sweep is clean except historical records. Remaining hits are mostly:

- Historical observability snapshots under `data/observability/**`.
- Audit outputs under `data/audit/**`.
- Generated/public reading exports under `public/reading/**`.
- Download bundles/zips that may contain older text.
- AI Architect Academy generated template folders such as `AI CoE Templates/**`.
- Estate-wide repos with Oracle/OCI/AI Architect references, including `agentic-creator-os`, `agentic-influencer-os`, `agentic-ops-hub`, `agenticincome`, `frankx-visual-expansion-worktree`, `gencreator.ai`, `realityarchitect`, `Starlight-Intelligence-System`, `starlight-command-center`, and other tool/config repos found by the estate scan.

## Verification

Passed:

- Targeted `rg` scan for unsafe phrases across the primary active source/content surfaces.
- `npm run type-check` in `FrankX`.
- `npm run type-check` in `frankx.ai-vercel-website`.
- `npm run type-check` in `frankx-blog-vos-worktree`.

Not run:

- No deploys.
- No commits.
- No local dev servers.
- No visual QA, because this was a language/legal-positioning sweep and no layout-critical design system changes were introduced.
