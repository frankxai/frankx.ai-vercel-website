/**
 * ACOS Agent Catalog — 99-agent architecture
 *
 * Structure: 11 pillars × 9 specialists = 99 agent-slots.
 * Each slot maps to a shipped subagent/command/skill/MCP OR is marked as a gap.
 *
 * Status discipline (enforced 2026-04-23 by docs/acos/agent-audit-2026-04-23.md):
 *   - 'shipped'     = dispatchable today (Agent-tool subagent_type OR .claude/agents/<n>.md
 *                     with Claude-Code frontmatter OR connected MCP)
 *   - 'in-progress' = substrate exists (slash command OR skill) but no dispatchable
 *                     subagent wrapper
 *   - 'gap'         = nothing exists — build queue
 *
 * L99 gates (added 2026-05-14 — contract + rollup in lib/acos/l99-score.ts):
 *   A slot is L99 when all four gates are lit:
 *     1. dispatchable — Task tool / Agent-tool can invoke it today
 *     2. tested       — has a smoke eval (tests/fixtures/<ref>/smoke.mjs or promptfoo fixture)
 *     3. composed     — referenced by a top-level pillar orchestrator
 *     4. brand_gated  — output passes lib/voice/frankx-voice.ts (or pillar is non-emitting)
 *   Status 'shipped' is necessary but NOT sufficient for L99. See lib/acos/l99-score.ts.
 *
 * Tier discipline (Haiku / Sonnet / Opus):
 *   Borrowed from wshobson/agents 4-tier pattern. Lifted from template-v2 model frontmatter.
 *   - haiku   — scanners, classifiers, formatters, deterministic gates (sub-second, $0.0002/run)
 *   - sonnet  — builders, writers, single-domain reasoners (default)
 *   - opus    — orchestrators, composers, multi-agent coordinators (justify per-agent)
 *
 * Pending ADRs:
 *   - ADR-001: category-error slots in Pillars 9 and 10 (renames proposed)
 *   - ADR-002: duplicate coverage (Research Librarian P4+P6, Amplify P5+P10)
 *   - ADR-003: builtin subagent resilience (author repo-native shadows)
 *   - ADR-004: frontmatter schema unification (18 ACOS-style files → dual schema)
 *
 * Source of truth: .claude/commands/, .claude/skills/, .claude/agents/, Agent-tool registry, MCP registry.
 * Status badges update in the same commit that ships the agent file. Truth is enforced at commit.
 */

export type AgentStatus = 'shipped' | 'in-progress' | 'gap'

export type AgentTier = 'haiku' | 'sonnet' | 'opus'

export interface AgentGates {
  /** Dispatchable today — Task tool / Agent-tool subagent_type / connected MCP */
  dispatchable: boolean
  /** Has a runnable smoke eval (tests/fixtures/<ref>/smoke.mjs OR promptfoo fixture) */
  tested: boolean
  /** Referenced by a top-level pillar orchestrator (Music Producer, Research Orchestrator, etc.) */
  composed: boolean
  /** Output passes lib/voice/frankx-voice.ts before return (or pillar is non-emitting) */
  brand_gated: boolean
}

export interface AgentSlot {
  name: string
  kind: 'skill' | 'command' | 'agent' | 'mcp'
  ref?: string
  status: AgentStatus
  /** Model tier — lifted from agent-file frontmatter when present, heuristic otherwise. Optional for backward compat. */
  tier?: AgentTier
  /** L99 gates — see header doc. Optional for backward compat; missing = not yet audited. */
  gates?: AgentGates
  one_liner: string
}

export interface Pillar {
  id: string
  number: number
  title: string
  tagline: string
  accent: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'sky' | 'teal' | 'fuchsia' | 'indigo' | 'lime' | 'orange'
  surface: string
  specialists: AgentSlot[]
}

export const PILLARS: Pillar[] = [
  {
    id: 'content',
    number: 1,
    title: 'Content Engine',
    tagline: 'Raw recording → published short, blog, or social post.',
    accent: 'emerald',
    surface: '/acos',
    specialists: [
      { name: 'ACO Router', kind: 'agent', ref: 'aco-router', status: 'shipped', one_liner: 'Agentic Content Officer — 11-row dispatch table routes every content ask to the right specialist. Pass 2 (2026-04-25).' },
      { name: 'Talking Head Producer', kind: 'agent', ref: 'content-talking-head-producer', status: 'shipped', one_liner: 'Raw .mp4 → transcribe → cut → caption → b-roll → Remotion render. 7-step pipeline with per-step budgets + MCP-graceful smoke. Pass 2 (2026-04-25).' },
      { name: 'Hook Engineer', kind: 'agent', ref: 'content-hook-engineer', status: 'shipped', one_liner: 'Tri-modal hook generation over recalled ReasoningBank patterns. Anchor pattern slot + per-platform char ceilings. Pass 2 (2026-04-25).' },
      { name: 'Social Distributor', kind: 'agent', ref: 'content-social-distributor', status: 'shipped', one_liner: 'One blog → 4 platform variants (X 280, LinkedIn 3000, Threads 500, IG 2200) with thesis-word lock. Pass 2 (2026-04-25).' },
      { name: 'Publishing Orchestrator', kind: 'agent', ref: 'content-publishing-orchestrator', status: 'shipped', one_liner: 'Composes 5 specialists (classifier → polisher → hook → talking-head → distributor) with partial-failure semantics + durable manifest. Pass 2 (2026-04-25).' },
      { name: 'Content Polisher', kind: 'agent', ref: 'content-polisher', status: 'shipped', one_liner: 'AI pattern elimination, voice consistency, SEO ready.' },
      { name: 'Content Classifier', kind: 'agent', ref: 'content-classifier', status: 'shipped', one_liner: '13-rule deterministic cascade routes incoming content to 10 buckets with confidence floor 0.6. Pass 2 (2026-04-25).' },
      { name: 'Vault Clipper', kind: 'agent', ref: 'content-vault-clipper', status: 'shipped', one_liner: '4-criteria scoring (energy/quotable/framework/story) with max-composite + tie-break by sum, 15-180s length gate. Pass 2 (2026-04-25).' },
      { name: 'Hook Learning Loop', kind: 'agent', ref: 'content-hook-learner', status: 'shipped', one_liner: 'Analytics → learned.json → hook-generation brief biasing /hook toward proven winners. Pass 1 exemplar (2026-04-24).' },
    ],
  },
  {
    id: 'music',
    number: 2,
    title: 'Music Production',
    tagline: 'Suno prompts to mastered tracks and commercial release.',
    accent: 'violet',
    surface: '/music-lab',
    specialists: [
      { name: 'Suno Prompt Architect', kind: 'agent', ref: 'music-suno-prompt-architect', status: 'shipped', one_liner: 'Professional Suno v4.5 prompts with recall-anchored style stacking. 3 variants ≤200ch + brand-voice constraint. Pass 2 (2026-04-25).' },
      { name: 'Suno v4.5 Mastery', kind: 'agent', ref: 'music-suno-mastery', status: 'shipped', one_liner: 'Genre-specific production briefs across 12+ styles. Style stack + reference set + tag set with continuity from past patterns. Pass 2 (2026-04-25).' },
      { name: 'Music Producer', kind: 'agent', ref: 'music-producer', status: 'shipped', one_liner: 'Opus composer dispatching all 8 P2 specialists in 8 stages with abort-on-gate-failure + ambiguous-honesty + durable flow record. P2 top-level entry point. Pass 2 (2026-04-26).' },
      { name: 'Music Video Batch', kind: 'agent', ref: 'music-video-batch', status: 'shipped', one_liner: 'Batch lyric video generation across 12k+ catalog. Remotion compositions + MCP-graceful (mode=degraded when MCP unavailable). Pass 2 (2026-04-25).' },
      { name: 'Create Music Wizard', kind: 'agent', ref: 'music-create-wizard', status: 'shipped', one_liner: 'End-user guided flow composing mastery + architect into a durable draft + 3 prompt variants. Resumable via /create-music --resume <run-id>. Pass 2 (2026-04-25).' },
      { name: 'Music Catalog Indexer', kind: 'agent', ref: 'music-catalog-indexer', status: 'shipped', one_liner: 'Source-of-truth indexer for 12k+ song catalog. Genre classification + aggregates + memory-cached precedents. Pass 2 (2026-04-25).' },
      { name: 'Mastering QC', kind: 'agent', ref: 'music-mastering-qc', status: 'shipped', one_liner: 'Quality gate: -14 LUFS / -1 dBFS true peak / 8 LU dynamic range with genre-specific tolerances (jazz 9, ambient 6, EDM 5). Pass 2 (2026-04-25).' },
      { name: 'Licensing & Rights', kind: 'agent', ref: 'music-licensing', status: 'shipped', one_liner: 'Use-case → license-type lookup with platform ToS conflict check + needs-review escape hatch. 9 use-case vocabulary. Pass 2 (2026-04-25).' },
      { name: 'Release Manager', kind: 'agent', ref: 'music-release-manager', status: 'shipped', one_liner: 'Opus composer dispatching mastering-qc + licensing as gates, then 4 platforms (Spotify/Apple/Distrokid/YouTube) with abort-on-gate-failure. Pass 2 (2026-04-25).' },
    ],
  },
  {
    id: 'visuals',
    number: 3,
    title: 'Visual Intelligence',
    tagline: 'Research-grounded visuals, covers, and kinetic typography.',
    accent: 'cyan',
    surface: '/design-lab',
    specialists: [
      { name: 'Infogenius', kind: 'agent', ref: 'visual-infogenius', status: 'shipped', one_liner: 'Research-grounded infographics with 5 art directors (Tufte/Moebius/IBM/Wired/Pentagram). Anchor-from-recall + brand-gate + cold-start defaults. Pass 2 (2026-04-26).' },
      { name: 'Nano Banana 2', kind: 'mcp', ref: 'nano-banana', status: 'shipped', one_liner: 'Gemini 3.1 Flash Image for on-brand b-roll and covers.' },
      { name: 'VIS Registry', kind: 'agent', ref: 'visual-vis-registry', status: 'shipped', one_liner: 'Source-of-truth indexer for every image. 5-bucket classification (blog-header/quote-card/social-og/hero/asset) + aggregates. Foundation: every P3 agent queries it. Pass 2 (2026-04-26).' },
      { name: 'Book Cover Composer', kind: 'agent', ref: 'visual-book-cover', status: 'shipped', one_liner: 'NB2 prompt composer + typography overlay spec for Library OS covers. Recall-anchored genre continuity + brand-gate enforcement. Pass 2 (2026-04-26).' },
      { name: 'Frontend Designer', kind: 'agent', ref: 'visual-frontend-designer', status: 'shipped', one_liner: 'Page-level layout composer: 6-section specs with h1 gate + a11y validation (WCAG 2.2) + brand-gate + recall-anchored cold-start defaults for 8 page types. Pass 2 (2026-04-26).' },
      { name: 'Canvas Design', kind: 'agent', ref: 'visual-canvas-design', status: 'shipped', one_liner: 'Multi-page document composer: 7 doc types (lead-magnet/slide-deck/course-pdf/workshop-handout/ebook-interior/exec-brief/infographic-poster), page-rhythm gate (cover+thesis+cta+back-cover mandatory), NB2 asset specs + typography-only pages, brand-gate enforced. NEVER Canva. Pass 2 (2026-04-26).' },
      { name: 'Brand Guidelines', kind: 'agent', ref: 'visual-brand-guidelines', status: 'shipped', one_liner: '4-check brand gate (palette, typography, voice/AI-slop, Arcanean-leak) — verdict pass|warn|fail with per-violation corrections. Gate for every P3 visual generator. Pass 2 (2026-04-26).' },
      { name: 'V0 Generate', kind: 'agent', ref: 'visual-v0-generate', status: 'shipped', one_liner: 'Typed React/Tailwind/TypeScript component generator for 9 component types with brand-gate + ARIA-first emission + MCP-graceful degradation. Pass 2 (2026-04-26).' },
      { name: 'Design Gods Orchestrator', kind: 'agent', ref: 'visual-design-gods', status: 'shipped', one_liner: '6-flow-type Opus composer (flow-page/infographic/book-cover/multi-page-doc/component/review-existing) dispatching 7 P3 specialists with abort-on-brand-fail gate + durable flow record. P3 top-level composer. Pass 2 (2026-04-26).' },
    ],
  },
  {
    id: 'books',
    number: 4,
    title: 'Book Publishing',
    tagline: 'Golden Age books with research-driven methodology.',
    accent: 'amber',
    surface: '/books',
    specialists: [
      { name: 'Author Team', kind: 'agent', ref: 'book-author-team', status: 'shipped', one_liner: '7-flow-type Opus composer (architecture/research/drafting/editing/publishing/review-existing) dispatching the 7 builtin author-team specialists with abort-on-developmental-editor-gate + durable flow record. P4 top-level composer. Pass 2 (2026-04-26).' },
      { name: 'Master Story Architect', kind: 'agent', ref: 'Master Story Architect', status: 'shipped', one_liner: 'Chief orchestrator for all book projects.' },
      { name: 'Character Psychologist', kind: 'agent', ref: 'Character Psychologist', status: 'shipped', one_liner: 'Authentic psychological profiles, believable arcs, distinct voices.' },
      { name: 'World Architect', kind: 'agent', ref: 'World Architect', status: 'shipped', one_liner: 'Internally consistent universes with rich cultures and magic/tech systems.' },
      { name: 'Developmental Editor', kind: 'agent', ref: 'Developmental Editor', status: 'shipped', one_liner: 'Structure, pacing, and narrative architecture.' },
      { name: 'Line Editor & Voice Alchemist', kind: 'agent', ref: 'Line Editor', status: 'shipped', one_liner: 'AI pattern elimination, voice consistency, compelling prose.' },
      { name: 'Research Librarian', kind: 'agent', ref: 'Research Librarian', status: 'shipped', one_liner: 'Fact-checking, source verification, case-study validation.' },
      { name: 'Publishing Strategist', kind: 'agent', ref: 'Publishing Strategist', status: 'shipped', one_liner: 'Market positioning, cover direction, launch planning.' },
      { name: 'Chapter Draft', kind: 'agent', ref: 'book-chapter-draft', status: 'shipped', one_liner: 'Single-chapter scene-by-scene drafter: bible read + outline parse + recall-anchored voice + word-target ±10% + continuity validation. Cold-start defaults to bible voice anchors; recall-warm anchors to prior chapter. Pass 2 (2026-04-26).' },
    ],
  },
  {
    id: 'workshops',
    number: 5,
    title: 'Workshop OS',
    tagline: 'Plan, deliver, amplify — in-person and virtual.',
    accent: 'rose',
    surface: '/workshops',
    specialists: [
      { name: 'Workshop New', kind: 'agent', ref: 'workshop-new', status: 'shipped', one_liner: 'Scaffolder: format validation + folder/CRM atomic write + duplicate detection + ID generation + recall-anchored next-actions for recurring formats. Wraps /workshop-new command. Pass 2 (2026-04-27).' },
      { name: 'Workshop Prep', kind: 'agent', ref: 'workshop-prep', status: 'shipped', one_liner: 'Prep-cycle entry point: validates workshop + fans out @prep-briefer for each attendee (max 5 parallel) + aggregates briefs/sparse-footprint counts/cohort patterns + partial-success detection at 20% failure threshold. Wraps /workshop-prep. Pass 2 (2026-04-27).' },
      { name: 'Workshop Debrief', kind: 'agent', ref: 'workshop-debrief', status: 'shipped', one_liner: 'Post-workshop capture: reflection schema fill + content kit drafting (5 templated files with [FILL IN] markers) + atomic engagement logging + last_touchpoint propagation + status transition planning→delivered. Anonymization-aware. Wraps /workshop-debrief. Pass 2 (2026-04-27).' },
      { name: 'Amplify Attendee', kind: 'agent', ref: 'workshop-amplify', status: 'shipped', one_liner: 'Per-post repost drafter: 2 variants (quote-forward + context-forward) under platform char budgets (LinkedIn 1300/Twitter 270/YouTube 1000) with protocol compliance (quote + why + mention + hashtag). Haiku-fast for 14-day amplification cycles. Wraps /amplify-attendee. Pass 2 (2026-04-27).' },
      { name: 'CRM Log', kind: 'agent', ref: 'workshop-crm-log', status: 'shipped', one_liner: 'Touchpoint logger: 5-type cascade (workshop-attended/content-posted/intro-made/meeting/email) with referential integrity (person + workshop validation) + flag-required check + atomic engagement append + idempotent tag updates + suggestedNextAction routing. Wraps /crm-log. Pass 2 (2026-04-27).' },
      { name: 'Workshop Producer', kind: 'agent', ref: 'workshop-producer', status: 'shipped', one_liner: '3-workflow planner (intake brief / run-of-show design / commercial framing) with energy-curve sequencing + commercial verdict gate + recall-anchored carry-forward lessons. ADR-004 migrated to v2 template. Pass 2 (2026-04-27).' },
      { name: 'Prep Briefer', kind: 'agent', ref: 'prep-briefer', status: 'shipped', one_liner: '3-workflow per-attendee researcher (single brief / cohort analysis / intro prep) with source-trail discipline (≥3 URLs) + sparse-footprint detection (TODO markers, never fabricate). Up to 5 parallel briefs for rate-limit safety. ADR-004 migrated to v2 template. Pass 2 (2026-04-27).' },
      { name: 'Amplification Liaison', kind: 'agent', ref: 'amplification-liaison', status: 'shipped', one_liner: '3-workflow post-workshop loop runner (intake / draft / health) with 4-question quality gate + character-budget enforcement (LinkedIn 1300/Twitter 270/YouTube 1000) + loop-health aggregates (posting rate, coverage, median time-to-repost). ADR-004 migrated to v2 template. Pass 2 (2026-04-27).' },
      { name: 'Workshop Orchestrator', kind: 'agent', ref: 'workshop-orchestrator', status: 'shipped', one_liner: '6-flow-type Opus composer (intake/prep/deliver/debrief/amplify/review-existing) dispatching 8 P5 specialists with abort-on-commercial-fail gate + per-attendee fan-out + durable flow record at data/workshops/flows/. P5 top-level composer. Pass 2 (2026-04-27).' },
    ],
  },
  {
    id: 'research',
    number: 6,
    title: 'Research Hub',
    tagline: 'Structured deep research with source validation.',
    accent: 'sky',
    surface: '/research',
    specialists: [
      { name: 'Deep Research', kind: 'agent', ref: 'research-deep', status: 'shipped', one_liner: '3-phase deep research (scoping/parallel/synthesis) with cross-reference validation (≥2 sources for high confidence) + AEO-optimized output (TL;DR ≤50 words, validated-claims table, FAQ-style H2s) + quality gates. Wraps /deepresearch. Pass 2 (2026-04-28).' },
      { name: 'Daily Research Ops', kind: 'agent', ref: 'research-daily-ops', status: 'shipped', one_liner: '3-mode router (scan/deep-dive/publish) across 3 domains (Generative AI, Systems & Performance, Personal Development). Cross-domain synthesis + content-opportunity surfacing + GEO-structured publication (pillar 2500-4000w, brief 800-1200w, thread 10-15, linkedin 1300ch, newsletter-section 400-600w). Wraps /research. Pass 2 (2026-04-28).' },
      { name: 'AI Architect Newsletter', kind: 'agent', ref: 'research-newsletter', status: 'shipped', one_liner: 'Weekly 5-section newsletter generator (Headline / Tools & Releases / Research Frontier / Frank\'s Take / The Build) with word-target ±15% per section + ≥3 citations/section + voice consistency check + carry-forward thread detection across past 4 weeks. Slack approval ready. Wraps /ai-architect-newsletter. Pass 2 (2026-04-28).' },
      { name: 'New Model Intelligence', kind: 'agent', ref: 'research-new-model', status: 'shipped', one_liner: 'Frontier model launch tracker: ingest announcement + verify benchmarks (≥2 sources) + map capabilities + compute deltas-vs-prior (% lift, pricing change, capability additions) + Frank\'s recommendation. Updates data/models/registry.json. Wraps /new-model. Pass 2 (2026-04-28).' },
      { name: 'Iterative Retrieval', kind: 'agent', ref: 'research-iterative-retrieval', status: 'shipped', one_liner: 'Progressive context refinement loop: broad retrieval → relevance scoring (1-5 scale) → query refinement (add high-relevance terms, exclude noise) → narrower retrieval → iterate until precision ≥0.8 OR plateau (3 consecutive no-improvement) OR max-iter (default 5). Wraps iterative-retrieval skill. Pass 2 (2026-04-28).' },
      { name: 'Search First', kind: 'agent', ref: 'research-search-first', status: 'shipped', one_liner: 'Build-vs-reuse gate (Haiku): 4-criteria evaluation (maintenance < 12mo / popularity ≥1k stars or ≥10k weekly DLs / license-permissive / fit ≥70%) → 3-recommendation classification (clear-reuse / partial-fit + gap analysis / build-recommended). Wraps search-first skill. Pass 2 (2026-04-28).' },
      { name: 'Opus Extended Thinking', kind: 'agent', ref: 'research-deep-thinking', status: 'shipped', one_liner: 'Multi-perspective reasoner (Opus): framing structure (core question + constraints + success + out-of-scope) + 3-perspective hard cap + trade-off matrix + framing-conflict detection (>50% divergence → no clean recommendation) + needs-scoping for under-specified problems. Wraps opus-extended-thinking skill. Pass 2 (2026-04-28).' },
      { name: 'Research Orchestrator', kind: 'agent', ref: 'research-orchestrator', status: 'shipped', one_liner: '7-flow-type Opus composer (deep-research/daily-scan/topic-dive/new-model/newsletter/source-validation/superintelligence) dispatching 7 P6 specialists + builtin Research Librarian with abort-on-validation-gate-fail + durable flow record at data/research/flows/. P6 top-level composer. Repurposed from /superintelligence slot. Pass 2 (2026-04-28).' },
      { name: 'Research Librarian', kind: 'agent', ref: 'Research Librarian', status: 'shipped', one_liner: 'Fact-check + source verification. DUPLICATE with P4 — ADR-002 proposes consolidation to Citation Auditor.' },
    ],
  },
  {
    id: 'products',
    number: 7,
    title: 'Product Engine',
    tagline: 'Digital products from FrankX components to paid offers.',
    accent: 'orange',
    surface: '/products',
    specialists: [
      { name: 'Product Engine', kind: 'skill', ref: 'product-engine', status: 'in-progress', one_liner: 'Premium digital products from FrankX components.' },
      { name: 'Product Team Launch', kind: 'command', ref: '/product-team-launch', status: 'in-progress', one_liner: 'Orchestrated build with full product team.' },
      { name: 'Product Sprint', kind: 'command', ref: '/product-sprint', status: 'in-progress', one_liner: 'Focused build phase.' },
      { name: 'Product QA', kind: 'command', ref: '/product-qa', status: 'in-progress', one_liner: 'Quality assurance cycle.' },
      { name: 'Product Deploy', kind: 'command', ref: '/product-deploy', status: 'in-progress', one_liner: 'Production release orchestration.' },
      { name: 'Product Retro', kind: 'command', ref: '/product-retro', status: 'in-progress', one_liner: 'Team retrospective with action items.' },
      { name: 'Template Monetization', kind: 'skill', ref: 'template-monetization', status: 'in-progress', one_liner: 'Blueprint-to-template monetization workflows.' },
      { name: 'Product Management Expert', kind: 'skill', ref: 'product-management-expert', status: 'in-progress', one_liner: 'PM craft applied to creator products.' },
      { name: 'Product Engine Orchestrator', kind: 'agent', ref: 'product-engine-orchestrator', status: 'shipped', one_liner: '5-flow-type Opus composer (flow-launch / flow-sprint / flow-qa / flow-deploy / flow-retro) dispatching the 6 product-team specialists (product-architect / frontend-engineer / backend-engineer / content-strategist / quality-assurance / deployment-lead) with abort-on-QA-gate-failure + parallel frontend/backend after PRD + durable flow record at data/products/flows/. P7 top-level composer. Pass 1 exemplar (2026-05-28).' },
    ],
  },
  {
    id: 'business',
    number: 8,
    title: 'Business Ops',
    tagline: 'Dutch BV, wealth, tax, legal — sovereign operator.',
    accent: 'teal',
    surface: '/bv',
    specialists: [
      { name: 'BV Operations', kind: 'command', ref: '/bv-ops', status: 'in-progress', one_liner: 'Arcanea Labs BV — status, milestones, compliance.' },
      { name: 'Business Ops Skill', kind: 'skill', ref: 'business-ops', status: 'in-progress', one_liner: 'Legal, tax, accounting, GDPR, trademarks. Consolidation candidate with BV Operations.' },
      { name: 'Wealth Operations', kind: 'command', ref: '/wealth-ops', status: 'in-progress', one_liner: 'Real estate, mortgages, tax optimization, FIRE planning.' },
      { name: 'Wealth Ops Skill', kind: 'skill', ref: 'wealth-ops', status: 'in-progress', one_liner: 'Multi-property portfolio and net-worth tracking. Consolidation candidate with Wealth Operations.' },
      { name: 'Enterprise AI Patterns', kind: 'skill', ref: 'enterprise-ai-patterns', status: 'in-progress', one_liner: 'Public enterprise AI architecture patterns and reference architectures.' },
      { name: 'Cloud Architecture Patterns', kind: 'skill', ref: 'cloud-architecture-patterns', status: 'in-progress', one_liner: 'Cloud architecture, cost optimization, and deployment tradeoffs.' },
      { name: 'Reference Diagram Generator', kind: 'skill', ref: 'reference-diagram-generator', status: 'in-progress', one_liner: 'Public reference architecture diagrams for workshops and docs.' },
      { name: 'Business Ops Orchestrator', kind: 'agent', ref: 'business-ops-orchestrator', status: 'shipped', one_liner: '3-flow-type Opus composer (flow-bv / flow-wealth / flow-enterprise-patterns) routing across the BV legal/tax substrate, wealth substrate, and public enterprise-architecture substrate with confidentiality envelope, sanitized memory, and private-path persistence. P8 top-level composer. Pass 1 exemplar (2026-05-28).' },
    ],
  },
  {
    id: 'personal',
    number: 9,
    title: 'Personal & Family',
    tagline: 'Heritage, health, philosophy — the human core.',
    accent: 'fuchsia',
    surface: '/familie',
    specialists: [
      { name: 'Family Heritage Curator', kind: 'agent', ref: 'family-heritage-curator', status: 'shipped', one_liner: 'Dynamic curator for the Familie Hub, Hoffnung, and Lebensbaum. Manages nodes under .frankx/family/ and syncs to lib/family-tree-data.ts.' },
      { name: 'German Voice Keeper', kind: 'agent', ref: 'german-voice-keeper', status: 'shipped', one_liner: 'German voice and dialect specialist. Translates and adapts Hoffnung book dialetic story assets preserving Austrian/regional nuances.' },
      { name: 'Trilingual Localizer', kind: 'agent', ref: 'trilingual-localizer', status: 'shipped', one_liner: 'Trilingual translation and localization specialist (DE/EN/HR). Adapts Atlas Globe copy across locales with zero translation tells.' },
      { name: 'Life-Tree Narrator', kind: 'agent', ref: 'life-tree-narrator', status: 'shipped', one_liner: 'Lebensbaum narrative composer. Connects genealogical relationships and node facts into elegant biographical stories.' },
      { name: 'Wellness Log Educator', kind: 'agent', ref: 'wellness-log-educator', status: 'shipped', one_liner: 'Personal wellness logging and education helper. Organizes nutrition notes, recovery signals, and habit reflections without medical diagnosis or treatment advice.' },
      { name: 'Gym Training Instructor', kind: 'agent', ref: 'gym-training-instructor', status: 'shipped', one_liner: 'Elite strength and hypertrophy coach. Tracks volume, fatigue, RIR, lift velocity, and biomechanics split routines.' },
      { name: 'Greek Philosopher Guide', kind: 'agent', ref: 'greek-philosopher-guide', status: 'shipped', one_liner: 'Stoic and Socratic counselor. Guides Socratic questioning, conducts journaling audits, and reframes goals via Marcus Aurelius.' },
      { name: 'Spartan Warrior Catalyst', kind: 'agent', ref: 'spartan-warrior-catalyst', status: 'shipped', one_liner: 'Discipline and execution optimizer. Audits attention-bleeding habits, enforces deep work split barriers, and sets hard targets.' },
      { name: 'Family Timeline Composer', kind: 'agent', ref: 'family-timeline-composer', status: 'shipped', one_liner: 'Dynamic family timeline composer. Integrates chronological milestones from Hoffnung, Lebensbaum, and Atlas Globe.' },
      { name: 'Personal Ops Orchestrator', kind: 'agent', ref: 'personal-ops-orchestrator', status: 'shipped', one_liner: 'Top-level Opus orchestrator for Pillar 9 (Personal & Family). Composes the 9 personal specialists across heritage, health, and philosophy flows.' },
    ],
  },
  {
    id: 'community',
    number: 10,
    title: 'Community Fabric',
    tagline: 'Vibeclubs, Circle, Studio — where creators meet.',
    accent: 'lime',
    surface: '/community',
    specialists: [
      { name: 'Vibeclub Host Coach', kind: 'agent', ref: 'vibeclub-host-coach', status: 'shipped', one_liner: 'Specialized ACOS Vibeclubs coach. Blueprints physical and virtual gatherings, run-of-shows, prompts, and playlists.' },
      { name: 'Lounge Curator', kind: 'agent', ref: 'lounge-curator', status: 'shipped', one_liner: 'GenCreator Lounge moderator and theme designer. Drafts weekly technical briefs and schedules masterminds.' },
      { name: 'Circle Conversion Strategist', kind: 'agent', ref: 'circle-conversion-strategist', status: 'shipped', one_liner: 'Conversion optimization strategist. Designs high-status landing pages, checkout scripts, and signup telemetry.' },
      { name: 'Studio Intake Advisor', kind: 'agent', ref: 'studio-intake-advisor', status: 'shipped', one_liner: 'Studio-tier intake advisor. Audits member profiles, maps stack integrations, and drafts first-30-days onboarding agendas.' },
      { name: 'Social Media Strategy Expert', kind: 'agent', ref: 'social-media-strategy-expert', status: 'shipped', one_liner: 'Platform-native social media strategy architect. Maps multi-channel distribution splits across LinkedIn, X, and Threads.' },
      { name: 'Social Content Generator', kind: 'agent', ref: 'social-content-generator', status: 'shipped', one_liner: 'Transform blog articles into platform-optimized social content.' },
      { name: 'Slack Gif Generator', kind: 'agent', ref: 'slack-gif-generator', status: 'shipped', one_liner: 'Slack workspace GIF composer. Designs prompt specs and WAAPI/GSAP animation parameters for on-brand celebratory loops.' },
      { name: 'Member Journey Choreographer', kind: 'agent', ref: 'member-journey-choreographer', status: 'shipped', one_liner: 'Post-workshop touchpoint and amplification sequencer. Runs the 14-day campaign to drive Circle conversion.' },
      { name: 'Community Dashboard Curator', kind: 'agent', ref: 'community-dashboard-curator', status: 'shipped', one_liner: 'Telemetry and dashboard aggregator. Complies rolling MAU, Skool, Discord, and Circle metrics to private reports.' },
      { name: 'Community Fabric Orchestrator', kind: 'agent', ref: 'community-fabric-orchestrator', status: 'shipped', one_liner: 'Top-level Opus orchestrator for Pillar 10 (Community Fabric). Composes the 9 community specialists across funnel and engagement loops.' },
    ],
  },
  {
    id: 'meta',
    number: 11,
    title: 'Foundation',
    tagline: 'The system that runs the system.',
    accent: 'indigo',
    surface: '/acos',
    specialists: [
      { name: 'ACOS Router v10', kind: 'agent', ref: 'meta-acos-router', status: 'shipped', one_liner: 'Top-level intent router with memory-aware pillar dispatch. Opus tier — routing decisions compound. Reads .claude/commands/acos.md keyword table + past trajectories, returns pillar + agent + confidence. Pass 2 (2026-05-15).' },
      { name: 'Memory Guardian', kind: 'agent', ref: 'meta-memory-guardian', status: 'shipped', one_liner: 'RAM zone classifier (green/yellow/red) gating parallel-agent spawns + heavy builds. Haiku-fast pre-flight check. Wraps memory-guardian skill. Pass 2 (2026-05-15).' },
      { name: 'Safety Guard', kind: 'agent', ref: 'meta-safety-guard', status: 'shipped', one_liner: 'Destructive-op gate: rm -rf / git reset --hard / force-push to main / DROP TABLE → allow|needs-confirm|block verdict. Haiku-fast pattern gate. Born from auto-hook chaos lessons. Pass 2 (2026-05-15).' },
      { name: 'Agentic Jujutsu', kind: 'agent', ref: 'meta-agentic-jujutsu', status: 'shipped', one_liner: 'Surfaces top-N past successful patterns from .claude/trajectories/patterns.json to bias the current task. Max 3 recommendations — no advice spray. Pass 2 (2026-05-15).' },
      { name: 'Verification Loop', kind: 'agent', ref: 'meta-verification-loop', status: 'shipped', one_liner: 'Pre-completion gate: TypeScript clean, expected files modified, tests passed, no silent failures. Rejects vague claims; demands specific assertions. Pass 2 (2026-05-15).' },
      { name: 'Handover', kind: 'agent', ref: 'meta-handover', status: 'shipped', one_liner: 'Cross-session handover doc writer: gathers git state + UNFINISHED-*.md + critical context → docs/ops/HANDOVER-<date>.md. For different agents, not next-day Frank. Pass 2 (2026-05-15).' },
      { name: 'EOD Capture', kind: 'agent', ref: 'meta-eod', status: 'shipped', one_liner: '7-step session wrap-up: git audit + Vercel build + delivered table + unfinished capture + memory update + next-session brief + quality gates. Never auto-commits. Pass 2 (2026-05-15).' },
      { name: 'Sync Repos', kind: 'agent', ref: 'meta-sync-repos', status: 'shipped', one_liner: 'Publishes ~/.claude/{agents,commands,skills} to claude-code-config + claude-skills-library repos. Dry-run support, target-dirty abort, push-failure surfacing. Pass 2 (2026-05-15).' },
      { name: 'ACOS Score', kind: 'agent', ref: 'meta-acos-score', status: 'shipped', one_liner: 'L99-era flagship wrapper: trajectory + SIS 4-component + 99-agent catalog L99 rollup with deterministic JSON + memory recall. Pass 1 exemplar (2026-05-14).' },
    ],
  },
]

export function pillarCounts() {
  let total = 0
  let shipped = 0
  let inProgress = 0
  let gap = 0
  for (const p of PILLARS) {
    for (const s of p.specialists) {
      total++
      if (s.status === 'shipped') shipped++
      else if (s.status === 'in-progress') inProgress++
      else gap++
    }
  }
  return { total, shipped, inProgress, gap }
}

// ────────────────────────────────────────────────────────────────────────────
// L99 LAYER — tier + gates as side-tables (keep slot definitions diff-stable)
// ────────────────────────────────────────────────────────────────────────────

/**
 * TIER_BY_REF — per-slot model assignment, keyed by `ref`.
 * Lifted from agent-file frontmatter for all shipped agents; heuristic-assigned
 * for in-progress/gap slots based on slot role.
 *
 * Defaults: orchestrators+composers → opus; classifiers+gates+indexers → haiku;
 * everything else → sonnet.
 */
export const TIER_BY_REF: Record<string, AgentTier> = {
  // Pillar 1 — Content Engine
  'aco-router': 'opus',
  'content-talking-head-producer': 'sonnet',
  'content-hook-engineer': 'sonnet',
  'content-social-distributor': 'sonnet',
  'content-publishing-orchestrator': 'opus',
  'content-polisher': 'sonnet',
  'content-classifier': 'haiku',
  'content-vault-clipper': 'sonnet',
  'content-hook-learner': 'haiku',
  // Pillar 2 — Music Production
  'music-suno-prompt-architect': 'sonnet',
  'music-suno-mastery': 'sonnet',
  'music-producer': 'opus',
  'music-video-batch': 'haiku',
  'music-create-wizard': 'sonnet',
  'music-catalog-indexer': 'haiku',
  'music-mastering-qc': 'haiku',
  'music-licensing': 'haiku',
  'music-release-manager': 'opus',
  // Pillar 3 — Visual Intelligence
  'visual-infogenius': 'sonnet',
  'nano-banana': 'haiku',
  'visual-vis-registry': 'haiku',
  'visual-book-cover': 'sonnet',
  'visual-frontend-designer': 'sonnet',
  'visual-canvas-design': 'sonnet',
  'visual-brand-guidelines': 'haiku',
  'visual-v0-generate': 'sonnet',
  'visual-design-gods': 'opus',
  // Pillar 4 — Book Publishing
  'book-author-team': 'opus',
  'Master Story Architect': 'opus',
  'Character Psychologist': 'sonnet',
  'World Architect': 'sonnet',
  'Developmental Editor': 'sonnet',
  'Line Editor': 'sonnet',
  'Research Librarian': 'sonnet',
  'Publishing Strategist': 'sonnet',
  'book-chapter-draft': 'sonnet',
  // Pillar 5 — Workshop OS
  'workshop-new': 'haiku',
  'workshop-prep': 'opus',
  'workshop-debrief': 'sonnet',
  'workshop-amplify': 'haiku',
  'workshop-crm-log': 'haiku',
  'workshop-producer': 'sonnet',
  'prep-briefer': 'sonnet',
  'amplification-liaison': 'sonnet',
  'workshop-orchestrator': 'opus',
  // Pillar 6 — Research Hub
  'research-deep': 'opus',
  'research-daily-ops': 'sonnet',
  'research-newsletter': 'sonnet',
  'research-new-model': 'sonnet',
  'research-iterative-retrieval': 'sonnet',
  'research-search-first': 'haiku',
  'research-deep-thinking': 'opus',
  'research-orchestrator': 'opus',
  // Pillar 7 — Product Engine
  'product-engine': 'sonnet',
  'product-engine-orchestrator': 'opus',
  '/product-team-launch': 'opus',
  '/product-sprint': 'sonnet',
  '/product-qa': 'sonnet',
  '/product-deploy': 'sonnet',
  '/product-retro': 'sonnet',
  'template-monetization': 'sonnet',
  'product-management-expert': 'sonnet',
  'template-catalog': 'haiku',
  // Pillar 8 — Business Ops
  'business-ops-orchestrator': 'opus',
  '/bv-ops': 'sonnet',
  'business-ops': 'sonnet',
  '/wealth-ops': 'sonnet',
  'wealth-ops': 'sonnet',
  'oracle-work': 'sonnet',
  'oracle-ai-architect': 'opus',
  'oci-services-expert': 'sonnet',
  'oracle-diagram-generator': 'sonnet',
  'compliance-guardian': 'haiku',
  // Pillar 9 — Personal & Family
  'family-heritage-curator': 'sonnet',
  'german-voice-keeper': 'sonnet',
  'trilingual-localizer': 'sonnet',
  'life-tree-narrator': 'sonnet',
  'health-nutrition-coach': 'sonnet',
  'gym-training-instructor': 'sonnet',
  'greek-philosopher-guide': 'sonnet',
  'spartan-warrior-catalyst': 'sonnet',
  'family-timeline-composer': 'sonnet',
  'personal-ops-orchestrator': 'opus',
  // Pillar 10 — Community Fabric
  'vibeclub-host-coach': 'sonnet',
  'lounge-curator': 'sonnet',
  'circle-conversion-strategist': 'sonnet',
  'studio-intake-advisor': 'sonnet',
  'social-media-strategy-expert': 'sonnet',
  'social-content-generator': 'sonnet',
  'slack-gif-generator': 'haiku',
  'member-journey-choreographer': 'sonnet',
  'community-dashboard-curator': 'haiku',
  'community-fabric-orchestrator': 'opus',
  // Pillar 11 — Meta-Infrastructure (all 9 shipped 2026-05-15 — second pillar to L99)
  'meta-acos-router': 'opus',
  'meta-memory-guardian': 'haiku',
  'meta-safety-guard': 'haiku',
  'meta-agentic-jujutsu': 'sonnet',
  'meta-verification-loop': 'haiku',
  'meta-handover': 'sonnet',
  'meta-eod': 'sonnet',
  'meta-sync-repos': 'sonnet',
  'meta-acos-score': 'sonnet',
}

/**
 * GATES_BY_REF — L99 audit truth per slot, keyed by `ref`.
 *
 * Audit rules:
 *   - dispatchable: true iff status === 'shipped'
 *   - composed: true iff slot is referenced by a top-level pillar orchestrator
 *     (Music Producer / Research Orchestrator / Workshop Orchestrator / Design Gods /
 *     Author Team / Publishing Orchestrator / ACO Router / Release Manager)
 *   - brand_gated: true for slots emitting user-visible copy where a brand gate runs
 *     (P1 voice gate, P3 visual-brand-guidelines gate); conservative false elsewhere
 *   - tested: true iff tests/fixtures/<ref>/smoke.mjs exists AND passes in CI.
 *     Verified via `node scripts/run-smoke-evals.mjs` (2026-05-15: 46/46 passing)
 *
 * Refs at tested=false are either Anthropic-builtin subagents (P4 author team,
 * social-content-generator — ADR-003 will author repo-native shadows),
 * MCPs (nano-banana — covered at connector layer), or agent-wrappers awaiting
 * the execution harness (meta-acos-router, meta-agentic-jujutsu,
 * meta-verification-loop, meta-handover, meta-eod, meta-sync-repos,
 * content-polisher, content-hook-learner — all need runtime to functional-test).
 *
 * Missing entry = not yet audited (treated as all-false in rollup).
 */
export const GATES_BY_REF: Record<string, AgentGates> = {
  // P1 Content — full brand_gated; all but Publishing Orchestrator composed under it
  'aco-router': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'content-talking-head-producer': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'content-hook-engineer': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'content-social-distributor': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'content-publishing-orchestrator': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  'content-polisher': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'content-classifier': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'content-vault-clipper': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'content-hook-learner': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  // P2 Music — composed under Music Producer / Release Manager
  'music-suno-prompt-architect': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'music-suno-mastery': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'music-producer': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  'music-video-batch': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'music-create-wizard': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'music-catalog-indexer': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'music-mastering-qc': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'music-licensing': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'music-release-manager': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  // P3 Visual — composed under Design Gods; all brand_gated by visual-brand-guidelines
  'visual-infogenius': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'nano-banana': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'visual-vis-registry': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'visual-book-cover': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'visual-frontend-designer': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'visual-canvas-design': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'visual-brand-guidelines': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'visual-v0-generate': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'visual-design-gods': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  // P4 Books — composed under Author Team; all brand_gated by Line Editor
  'book-author-team': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  'Master Story Architect': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'Character Psychologist': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'World Architect': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'Developmental Editor': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'Line Editor': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'Research Librarian': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'Publishing Strategist': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'book-chapter-draft': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  // P5 Workshops — composed under Workshop Orchestrator
  'workshop-new': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'workshop-prep': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'workshop-debrief': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'workshop-amplify': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'workshop-crm-log': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'workshop-producer': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'prep-briefer': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'amplification-liaison': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'workshop-orchestrator': { dispatchable: true, tested: true, composed: false, brand_gated: false },
  // P6 Research — composed under Research Orchestrator
  'research-deep': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'research-daily-ops': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'research-newsletter': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'research-new-model': { dispatchable: true, tested: true, composed: true, brand_gated: true },
  'research-iterative-retrieval': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'research-search-first': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'research-deep-thinking': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'research-orchestrator': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  // P7 Product Engine — orchestrator first shipped 2026-05-28 (top-level composer for product builds)
  // composed=false because it IS the top-level composer (nothing composes it); brand_gated=true via @integrity-guard on content-strategist output
  // tested=true via tests/fixtures/product-engine-orchestrator/smoke.mjs (3 scenarios + memory contract)
  'product-engine-orchestrator': { dispatchable: true, tested: true, composed: false, brand_gated: true },
  // P8 Business Ops — orchestrator first shipped 2026-05-28 (3-domain composer: BV/wealth/oracle)
  // tested=true via tests/fixtures/business-ops-orchestrator/smoke.mjs (3 scenarios + memory + confidentiality gate)
  // brand_gated=false because outputs land in operator-private paths only (Tier 1/2 data, not public-facing)
  'business-ops-orchestrator': { dispatchable: true, tested: true, composed: false, brand_gated: false },
  // P9 Personal — composed under personal-ops-orchestrator
  'personal-ops-orchestrator': { dispatchable: true, tested: false, composed: false, brand_gated: false },
  'family-heritage-curator': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'german-voice-keeper': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'trilingual-localizer': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'life-tree-narrator': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'health-nutrition-coach': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'gym-training-instructor': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'greek-philosopher-guide': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'spartan-warrior-catalyst': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'family-timeline-composer': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  // P10 Community — composed under community-fabric-orchestrator
  'community-fabric-orchestrator': { dispatchable: true, tested: false, composed: false, brand_gated: false },
  'vibeclub-host-coach': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'lounge-curator': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'circle-conversion-strategist': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'studio-intake-advisor': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'social-media-strategy-expert': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'social-content-generator': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'slack-gif-generator': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'member-journey-choreographer': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'community-dashboard-curator': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  // P11 — Meta-Infrastructure (all 9 shipped 2026-05-15, second pillar to L99)
  // meta-acos-router is the P11 orchestrator → composed=false on itself, true on the 8 others
  // brand_gated=true only where output emits user-visible copy (handover/eod/score)
  'meta-acos-router': { dispatchable: true, tested: false, composed: false, brand_gated: false },
  'meta-memory-guardian': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'meta-safety-guard': { dispatchable: true, tested: true, composed: true, brand_gated: false },
  'meta-agentic-jujutsu': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'meta-verification-loop': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'meta-handover': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'meta-eod': { dispatchable: true, tested: false, composed: true, brand_gated: true },
  'meta-sync-repos': { dispatchable: true, tested: false, composed: true, brand_gated: false },
  'meta-acos-score': { dispatchable: true, tested: true, composed: true, brand_gated: true },
}

/** Merge a slot with its tier + gates side-tables for downstream consumers. */
export function enrichedSlot(slot: AgentSlot): AgentSlot {
  if (!slot.ref) return slot
  const tier = slot.tier ?? TIER_BY_REF[slot.ref]
  const gates = slot.gates ?? GATES_BY_REF[slot.ref]
  if (!tier && !gates) return slot
  return { ...slot, ...(tier && { tier }), ...(gates && { gates }) }
}

/** All slots from all pillars, enriched. Convenient for catalog tooling. */
export function allEnrichedSlots(): AgentSlot[] {
  return PILLARS.flatMap((p) => p.specialists.map(enrichedSlot))
}
