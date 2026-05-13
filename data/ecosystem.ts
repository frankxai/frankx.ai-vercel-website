/**
 * data/ecosystem.ts
 *
 * The single typed registry of every shipped FrankX system, sibling repo,
 * operational layer, and ops-tooling slice. Powers /ecosystem (public),
 * the frankx-meta skill (agent context), and any future intelligence
 * dashboard.
 *
 * Source of truth: docs/audits/2026-05-03-second-brain-audit.md § 4.
 * Layer model: docs/superpowers/specs/2026-05-03-frankx-layer-model-design.md
 *
 * When you ship a new system, add an entry here. When you deprecate one,
 * mark `status: 'archived'` — never delete (the slug must keep resolving).
 */

export type EcosystemTier =
  | 'tier-1-frankx-surface' // public on frankx.ai
  | 'tier-2-substrate' // open-source sibling repos
  | 'tier-3-operational' // internal-only systems that drive the business
  | 'tier-4-ops-tooling' // PP swarm / cc-tabs / repo management

export type EcosystemLayer =
  | 'L0-intake'
  | 'L1-second-brain'
  | 'L2-command-center'
  | 'L3-operational-data'
  | 'L4-public-face'
  | 'L5-substrate'

export type EcosystemStatus =
  | 'live' // shipped, active, in production
  | 'scaffolded' // built but not yet activated/deployed
  | 'designed' // spec'd, not implemented
  | 'active' // ongoing project (no single ship date)
  | 'frozen' // installed but cold-stored (per /freeze)
  | 'archived' // shipped historically, no longer active

export interface EcosystemEntry {
  /** Stable URL-safe identifier. Never rename. */
  id: string
  /** Display name. */
  name: string
  /** URL slug (used at /ecosystem/{slug}). */
  slug: string
  /** Tier in the FrankX ecosystem hierarchy. */
  tier: EcosystemTier
  /** Which layer of the model this primarily belongs to. */
  layer: EcosystemLayer
  /** Repo name (relative to ~ or just label for non-repo systems). */
  repo: string
  /** Public URL on frankx.ai if applicable, else null. */
  publicUrl: string | null
  /** GitHub URL if open source, else null. */
  repoUrl: string | null
  /** Current status. */
  status: EcosystemStatus
  /** YYYY-MM-DD of original ship, or 'pre-existing' / 'ongoing' / 'designed'. */
  shipped: string
  /** One-sentence summary, < 120 chars. */
  summary: string
  /** Longer prose, 1-3 sentences for /ecosystem/{slug} hero. */
  description: string
  /** IDs of related systems this connects to. */
  relatedSystems: string[]
  /** Slash commands operating on this system. */
  commands: string[]
  /** Tag for visual grouping in the UI. */
  color:
    | 'cyan'
    | 'violet'
    | 'amber'
    | 'emerald'
    | 'rose'
    | 'slate'
    | 'sky'
    | 'fuchsia'
    | 'lime'
    | 'orange'
}

// ─────────────────────────────────────────────────────────────────────────
// THE REGISTRY
// ─────────────────────────────────────────────────────────────────────────

export const ecosystemEntries: EcosystemEntry[] = [
  // ─── Tier 1 — FrankX surface (live on frankx.ai) ────────────────────────
  {
    id: 'watch-os',
    name: 'Watch OS',
    slug: 'watch-os',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/watch/shorts',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-15',
    summary: 'Video capture to published short with AEO schema and per-ID pages.',
    description:
      'End-to-end short-form video pipeline. Raw capture becomes a published Short with transcript, chapter markers, per-ID pages, RSS, OG, and answer-engine schema. Watch entries feed blog posts, newsletter snippets, and workshop artifacts.',
    relatedSystems: ['workshop-os', 'aco', 'ecosystem-page'],
    commands: ['/video-clip', '/video-publish', '/video-to-blog', '/talking-head-ship'],
    color: 'cyan',
  },
  {
    id: 'workshop-os',
    name: 'Workshop OS',
    slug: 'workshop-os',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/workshops',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-22',
    summary: 'Plan, deliver, and amplify live workshops end-to-end.',
    description:
      'Private authoring (briefs, run-of-show, per-attendee research) → public funnel (3 delivered formats + intake form) → 14-day amplification loop. Built on a local CRM that unifies with the rest of the OS.',
    relatedSystems: ['coe-hub', 'aco', 'watch-os', 'unified-crm'],
    commands: ['/workshop-new', '/workshop-prep', '/workshop-debrief', '/crm-log', '/amplify-attendee'],
    color: 'violet',
  },
  {
    id: 'aco',
    name: 'Agentic Content Officer',
    slug: 'aco',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/aco',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-21',
    summary: 'Talking-head capture to publish-ready video in one shot.',
    description:
      'Routes any content brief to the right sub-workflow — scripting, filming, editing, thumbnail generation, platform-specific publishing. Three MCPs (remotion-docs, remotion-video, smartcut) power the render path.',
    relatedSystems: ['watch-os', 'workshop-os'],
    commands: ['/aco', '/talking-head-ship', '/video-produce'],
    color: 'amber',
  },
  {
    id: 'acos',
    name: 'ACOS',
    slug: 'acos',
    tier: 'tier-1-frankx-surface',
    layer: 'L2-command-center',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/acos',
    repoUrl: null,
    status: 'active',
    shipped: 'ongoing',
    summary: 'Agent orchestration with learning across sessions.',
    description:
      'The Agentic Creator Operating System — a persistent agent runtime that learns from past trajectories, scores intelligence, and routes complex tasks across 150+ skills and dozens of agents. The engine under the hood.',
    relatedSystems: ['watch-os', 'workshop-os', 'aco', 'coe-hub', 'frankx-meta'],
    commands: ['/acos', '/acos-flow', '/acos-monitor', '/acos-score', '/agentic-jujutsu'],
    color: 'emerald',
  },
  {
    id: 'acos-agents',
    name: 'ACOS Agent Catalog',
    slug: 'acos-agents',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/acos/agents',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-23',
    summary: 'Public catalog of 99 agents across 11 pillars.',
    description:
      'The discoverable index of every specialist agent in ACOS — 11 pillars × 9 specialists each. Pairs with the hook-learning loop (CSV → learned.json → /hook bias) for measurable improvement over time.',
    relatedSystems: ['acos'],
    commands: ['/acos-agents', '/hook', '/hook-learn'],
    color: 'emerald',
  },
  {
    id: 'coe-hub',
    name: 'AI CoE Hub',
    slug: 'coe-hub',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/ai-architect/ai-coe-hub',
    repoUrl: null,
    status: 'live',
    shipped: 'pre-existing',
    summary: 'The 6-pillar enterprise framework, made personal.',
    description:
      "Frank's Oracle EMEA AI Center of Excellence methodology, documented and adapted for personal use. Strategy, Governance, Talent, Technology, Data, Ethics — the six pillars every operator needs. The theoretical backbone under Workshop OS's personal-ai-coe format.",
    relatedSystems: ['workshop-os', 'sis'],
    commands: ['/starlight-architect', '/ai-architecture'],
    color: 'slate',
  },
  {
    id: 'library-frankx-surface',
    name: 'Library OS (frankx surface)',
    slug: 'library',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/library',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-26',
    summary: 'Book intelligence hub — index, deep-dives, and methodology.',
    description:
      'The frankx.ai surface for the open-source Library OS framework. Anchor-navigable hubs per book with TL;DR, key insights, quotes, chapters, FAQ, continue-reading, and Go-Deeper videos. Powered by data/book-reviews.ts.',
    relatedSystems: ['library-os'],
    commands: ['/library-add', '/library-deepen', '/library-research'],
    color: 'rose',
  },
  {
    id: 'sis-frankx-surface',
    name: 'Starlight Intelligence System (page)',
    slug: 'starlight-intelligence-system',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/starlight-intelligence-system',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-24',
    summary: 'The frankx.ai entry point to the SIS substrate framework.',
    description:
      'Documents the 9-layer Intelligence System Protocol (SIP v1.1.0) on the FrankX surface. Clear attribution to the standalone repo and MIT license. A bridge between Frank-the-creator and the framework anyone can fork.',
    relatedSystems: ['sis'],
    commands: [],
    color: 'sky',
  },
  {
    id: 'build-first-ai-agent-funnel',
    name: 'Build First AI Agent Funnel',
    slug: 'build-first-ai-agent',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/start-here',
    repoUrl: null,
    status: 'scaffolded',
    shipped: '2026-04-25',
    summary: '5-tier premium funnel — €0 Primer to €2,997 Founder Circle.',
    description:
      "Test-branch funnel: Primer → Pack → Toolkit → Mastery → Architect → Founder's Circle. Lemon Squeezy + Claude Managed Agents customer service. Routes /start-here, /build, /build/[slug], /founders-circle. Lives on funnel/build-first-ai-agent-v1 branch.",
    relatedSystems: ['workshop-os', 'unified-crm'],
    commands: [],
    color: 'fuchsia',
  },
  {
    id: 'atlas-globe',
    name: 'Atlas Globe',
    slug: 'atlas-globe',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/globe',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-22',
    summary: 'Trilingual interactive globe — EN /globe, DE /erde, HR /svijet.',
    description:
      'D3 + canvas globe with annotated locations. Three language surfaces share the same data layer. Shipped via PR #28 using gh API when local disk was full.',
    relatedSystems: [],
    commands: [],
    color: 'sky',
  },
  {
    id: 'network-hub',
    name: 'Network Hub',
    slug: 'network',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/network',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-26',
    summary: 'Public network and connections hub.',
    description: 'The relationship layer surfaced — who Frank works with, partners with, and learns from. Curated rather than algorithmic.',
    relatedSystems: ['unified-crm'],
    commands: [],
    color: 'lime',
  },
  {
    id: 'design-page',
    name: 'Design System (public)',
    slug: 'design',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/design',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-26',
    summary: 'Public design system page — the contract for every visual decision.',
    description:
      'Pairs with /design.md and /taste.md at repo root. Tokens come from design.md, judgment from taste.md. The answer is usually less.',
    relatedSystems: [],
    commands: ['/design-gods', '/v0-generate'],
    color: 'slate',
  },
  {
    id: 'familie-hub',
    name: 'Familie Hub',
    slug: 'familie',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/familie',
    repoUrl: null,
    status: 'live',
    shipped: 'pre-existing',
    summary: 'German-first private family hub — Wolgadeutsche history.',
    description: 'German-first private family hub at /familie/ with Wolgadeutsche history and Notion sync. Private surface, not in main navigation.',
    relatedSystems: [],
    commands: [],
    color: 'orange',
  },
  {
    id: 'ikigai-workshop',
    name: 'Ikigai Workshop',
    slug: 'ikigai-branding',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/workshops/ikigai-branding',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-16',
    summary: 'Ikigai-branding workshop wizard with Coach GPT and infographics.',
    description: 'A Workshop OS-shipped format. Live wizard takes a participant through the Ikigai branding exercise with infographic outputs.',
    relatedSystems: ['workshop-os'],
    commands: ['/workshop-new'],
    color: 'violet',
  },
  {
    id: 'frankx-os-meta',
    name: 'FrankX OS (meta-spine)',
    slug: 'os',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/os',
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-23',
    summary: 'Operational systems Frank uses to run the business — 5+ modules.',
    description:
      'The FrankXOSHeader-unified meta-spine of operational systems. Originally 5 (Watch / Workshop / ACO / ACOS / CoE Hub) — Library OS and the Build First funnel join in the 2026-05-03 reconciliation. Cross-links to /ecosystem for the full picture.',
    relatedSystems: ['watch-os', 'workshop-os', 'aco', 'acos', 'coe-hub', 'library-frankx-surface', 'ecosystem-page'],
    commands: [],
    color: 'cyan',
  },
  {
    id: 'ecosystem-page',
    name: 'FrankX Ecosystem Map',
    slug: 'ecosystem',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/ecosystem',
    repoUrl: null,
    status: 'live',
    shipped: '2026-05-03',
    summary: 'The complete map of every FrankX system — 25+ entries across 4 tiers.',
    description:
      "The Arcanea-equivalent for FrankX — every system, repo, and operational tool indexed in one place. Mirrors the arcanea-meta pattern. Powered by data/ecosystem.ts (this file). Built in F1 night session 2026-05-03.",
    relatedSystems: ['frankx-os-meta', 'frankx-meta-skill'],
    commands: [],
    color: 'fuchsia',
  },
  {
    id: 'visual-intelligence-system',
    name: 'Visual Intelligence System',
    slug: 'visual-intelligence-system',
    tier: 'tier-1-frankx-surface',
    layer: 'L4-public-face',
    repo: 'frankx',
    publicUrl: 'https://frankx.ai/studio/visual',
    repoUrl: null,
    status: 'live',
    shipped: '2026-05-13',
    summary: 'Drop-images-get-strategy substrate. 9-platform persona matrix, 3-layer asset/composition/gate stack.',
    description:
      'The connective tissue between asset generation (NB2, Higgsfield × 4 skills, music-video-batch), composition (HyperFrames, Remotion), and ship gate (vis, visual-creation, brand-voice). Substrate at lib/visual-intelligence/ (typed personas, stack, recipes). Runtime: /visual-strategy command + visual-intelligence skill + visual-intelligence-orchestrator agent. Built autonomously overnight 2026-05-13.',
    relatedSystems: ['watch-os', 'aco', 'workshop-os', 'library-frankx-surface', 'iis'],
    commands: ['/visual-strategy', '/vis-search', '/vis-audit', '/infogenius'],
    color: 'lime',
  },

  // ─── Tier 2 — Open-source sibling repos ─────────────────────────────────
  {
    id: 'sis',
    name: 'Starlight Intelligence System',
    slug: 'starlight-intelligence-system-repo',
    tier: 'tier-2-substrate',
    layer: 'L5-substrate',
    repo: 'Starlight-Intelligence-System',
    publicUrl: 'https://github.com/frankxai/Starlight-Intelligence-System',
    repoUrl: 'https://github.com/frankxai/Starlight-Intelligence-System',
    status: 'live',
    shipped: '2026-04-24',
    summary: 'Foundational substrate — 9 IS layers, SIP v1.1.0, MIT.',
    description:
      'A markdown-first specification for an Intelligence System: nine composable layers covering substrate, sovereignty, provenance, modality attestation, and workspace exports. Everything downstream composes on top.',
    relatedSystems: ['sis-frankx-surface', 'frankx-meta-skill'],
    commands: [],
    color: 'sky',
  },
  {
    id: 'library-os',
    name: 'Library OS (standalone)',
    slug: 'library-os-repo',
    tier: 'tier-2-substrate',
    layer: 'L5-substrate',
    repo: 'library-os',
    publicUrl: 'https://github.com/frankxai/library-os',
    repoUrl: 'https://github.com/frankxai/library-os',
    status: 'live',
    shipped: '2026-04-26',
    summary: 'Open-source book intelligence framework. Bootable Next.js, MIT.',
    description:
      'The framework behind the frankx.ai /library surface. Three slash commands (/library-add, /library-deepen, /library-research), a skill (library-os), and a subagent (book-distiller). Cross-AI portable — works in ChatGPT, Claude, Cursor, Codex, Gemini.',
    relatedSystems: ['library-frankx-surface'],
    commands: ['/library-add', '/library-deepen', '/library-research'],
    color: 'rose',
  },
  {
    id: 'arcanea',
    name: 'Arcanea',
    slug: 'arcanea',
    tier: 'tier-2-substrate',
    layer: 'L5-substrate',
    repo: 'Arcanea',
    publicUrl: null,
    repoUrl: 'https://github.com/frankxai/Arcanea',
    status: 'live',
    shipped: 'ongoing',
    summary: 'Mythology + orchestrator monorepo, separate brand from FrankX.',
    description:
      'Web app + packages + worldbuilding + book. Brand-walled from FrankX — the mythological lexicon stays inside this repo and never bleeds into frankx.ai. The @arcanea/orchestrator package powers cross-CLI orchestration.',
    relatedSystems: [],
    commands: ['/arcanea-status', '/ultraworld', '/ao'],
    color: 'fuchsia',
  },
  {
    id: 'starlight-agent-lab',
    name: 'Starlight Agent Lab',
    slug: 'starlight-agent-lab',
    tier: 'tier-2-substrate',
    layer: 'L5-substrate',
    repo: 'starlight-agent-lab',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-24',
    summary: '3-framework agent portfolio — Vercel AI SDK / Claude Agent SDK / Google ADK.',
    description:
      'Research lane for comparing agent frameworks. Public brief surfaces at frankx.ai/research/agent-frameworks. Google Agents CLI is NOT a framework — it is a Python CLI/skills bundle for ADK.',
    relatedSystems: [],
    commands: [],
    color: 'sky',
  },
  {
    id: 'gencreator',
    name: 'GenCreator',
    slug: 'gencreator',
    tier: 'tier-2-substrate',
    layer: 'L5-substrate',
    repo: 'gencreator.ai',
    publicUrl: null,
    repoUrl: null,
    status: 'scaffolded',
    shipped: '2026-04 (code-complete)',
    summary: '87-file creator-brand site, awaiting Vercel import.',
    description:
      'Creator-economy specific site at C:\\Users\\frank\\gencreator.ai. Code-complete; needs `pnpm go-live` + Vercel import to ship.',
    relatedSystems: [],
    commands: [],
    color: 'orange',
  },

  // ─── Tier 3 — Operational systems (internal-only) ───────────────────────
  {
    id: 'unified-crm',
    name: 'Unified CRM',
    slug: 'unified-crm',
    tier: 'tier-3-operational',
    layer: 'L3-operational-data',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: 'ongoing',
    summary: 'Single source-of-truth for every person who engages, across modules.',
    description:
      'Files in data/crm/ — people, orgs, workshops, engagements, linkedin-profiles. Every engagement (workshop attendance, content read, intro made) resolves to one person_id with module-distinguishing tags.',
    relatedSystems: ['workshop-os', 'watch-os', 'network-hub', 'build-first-ai-agent-funnel'],
    commands: ['/crm-log'],
    color: 'slate',
  },
  {
    id: 'hook-learning',
    name: 'Hook Learning Loop',
    slug: 'hook-learning',
    tier: 'tier-3-operational',
    layer: 'L3-operational-data',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: '2026-04-23',
    summary: 'CSV inbox → learned.json → /hook command bias.',
    description:
      'Closes the analytics → learning loop. Drop CSVs from YouTube Studio / TikTok / LinkedIn into data/hooks/inbox/, run /hook-learn, /hook generation pulls proven patterns from data/hooks/learned.json.',
    relatedSystems: ['acos', 'acos-agents'],
    commands: ['/hook', '/hook-learn'],
    color: 'emerald',
  },
  {
    id: 'personal-data-mesh',
    name: 'Personal Data Mesh',
    slug: 'personal-data-mesh',
    tier: 'tier-3-operational',
    layer: 'L3-operational-data',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'designed',
    shipped: '2026-05-02 (designed)',
    summary: '3-layer mesh — storage tiers / sync / multi-modal intelligence.',
    description:
      'Designed but not provisioned. Verdicts: LanceDB > Qdrant, R2 > Vercel Blob, ProtoCloud=SKIP, Storj private + Arweave public permanent. 7-phase install plan in docs/PERSONAL_DATA_MESH.md.',
    relatedSystems: [],
    commands: [],
    color: 'amber',
  },
  {
    id: 'affine-workspace',
    name: 'Affine Workspace',
    slug: 'affine-workspace',
    tier: 'tier-3-operational',
    layer: 'L3-operational-data',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'scaffolded',
    shipped: 'designed',
    summary: 'Notion-alternative stack — Docker + Postgres + 3 MCP servers.',
    description:
      'Self-hosted AFFiNE workspace at affine-workspace/ with Obsidian-MCP / Excalidraw-MCP / Plane-MCP wired to Claude Code. Not yet deployed (Docker not installed). Plane is the closest open-source equivalent to Linear.',
    relatedSystems: ['intake-flow'],
    commands: [],
    color: 'amber',
  },
  {
    id: 'intake-flow',
    name: 'Intake Flow',
    slug: 'intake',
    tier: 'tier-3-operational',
    layer: 'L0-intake',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: 'ongoing',
    summary: 'Inbound chat exports → process → shipped artifacts.',
    description:
      'The .intake/ workflow: drop in inbound, classify via /aco, move to .intake/processed/ with date prefix, log row in INDEX.md mapping source → outputs. Today\'s session-3 entry shows it working.',
    relatedSystems: ['frankx-vault'],
    commands: ['/aco'],
    color: 'lime',
  },
  {
    id: 'frankx-vault',
    name: 'FrankX Vault (second brain)',
    slug: 'second-brain',
    tier: 'tier-3-operational',
    layer: 'L1-second-brain',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: '2026-05-03',
    summary: 'docs/ folder + 7 MOCs as the navigable second brain.',
    description:
      'Existing docs/.obsidian config + new docs/_moc/ MOCs make docs/ a real Obsidian vault. Sidecar daily-notes vault at C:\\Users\\frank\\Obsidian\\FrankX-Vault\\ for private journaling. Built in F1 night Phase 3.',
    relatedSystems: ['intake-flow', 'frankx-meta-skill'],
    commands: [],
    color: 'rose',
  },
  {
    id: 'frankx-meta-skill',
    name: 'frankx-meta skill',
    slug: 'frankx-meta',
    tier: 'tier-3-operational',
    layer: 'L2-command-center',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: '2026-05-03',
    summary: 'Project-scope skill mapping the FrankX layer model + system inventory.',
    description:
      'Mirrors arcanea-meta. Triggers on "where does X go?", "frankx system map", "add a skill". Loads layer model + canonical-locations + ecosystem-inventory + decision-tree + brand-discipline references on demand. Built in F1 Phase 5.',
    relatedSystems: ['acos', 'frankx-vault', 'ecosystem-page'],
    commands: [],
    color: 'emerald',
  },

  // ─── Tier 4 — Ops tooling (PP swarm) ────────────────────────────────────
  {
    id: 'pp-swarm',
    name: 'PP Swarm Tooling',
    slug: 'pp-swarm',
    tier: 'tier-4-ops-tooling',
    layer: 'L2-command-center',
    repo: 'frankx',
    publicUrl: null,
    repoUrl: null,
    status: 'live',
    shipped: '2026-05-02',
    summary: 'Abundance-mode repo + machine + session management.',
    description:
      "/cc-tabs lists all CC tabs, /repo-tour tours all git repos with hot/warm/cold/frozen tiers, /freeze + /thaw manage cold-storage, /ops-health is the one-screen dashboard. Plus /pp (peak performance), /eod, /handover, /intelligence, /arco. Built 2026-05-02.",
    relatedSystems: ['acos'],
    commands: ['/cc-tabs', '/repo-tour', '/freeze', '/thaw', '/ops-health', '/pp', '/eod', '/handover', '/intelligence', '/arco'],
    color: 'lime',
  },
]

// ─────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────

export function getEntry(id: string): EcosystemEntry | undefined {
  return ecosystemEntries.find((e) => e.id === id)
}

export function getEntryBySlug(slug: string): EcosystemEntry | undefined {
  return ecosystemEntries.find((e) => e.slug === slug)
}

export function entriesByTier(tier: EcosystemTier): EcosystemEntry[] {
  return ecosystemEntries.filter((e) => e.tier === tier)
}

export function entriesByLayer(layer: EcosystemLayer): EcosystemEntry[] {
  return ecosystemEntries.filter((e) => e.layer === layer)
}

export function entriesByStatus(status: EcosystemStatus): EcosystemEntry[] {
  return ecosystemEntries.filter((e) => e.status === status)
}

export function getRelated(id: string): EcosystemEntry[] {
  const entry = getEntry(id)
  if (!entry) return []
  return entry.relatedSystems.map((rid) => getEntry(rid)).filter((e): e is EcosystemEntry => !!e)
}

export const ECOSYSTEM_TIERS: { id: EcosystemTier; label: string; description: string }[] = [
  {
    id: 'tier-1-frankx-surface',
    label: 'FrankX Surface',
    description: 'Live on frankx.ai — what the world sees.',
  },
  {
    id: 'tier-2-substrate',
    label: 'Open-Source Substrate',
    description: 'Sibling repos others can fork — MIT, framework-agnostic.',
  },
  {
    id: 'tier-3-operational',
    label: 'Operational Systems',
    description: 'Internal — drives the business but not public-facing.',
  },
  {
    id: 'tier-4-ops-tooling',
    label: 'Ops Tooling',
    description: 'Daily-workflow tools — repos, sessions, machine health.',
  },
]

export const ECOSYSTEM_LAYERS: { id: EcosystemLayer; label: string; description: string }[] = [
  { id: 'L0-intake', label: 'L0 — Raw Intake', description: 'Inbound, unprocessed.' },
  { id: 'L1-second-brain', label: 'L1 — Second Brain', description: 'Long-form prose that informs decisions.' },
  { id: 'L2-command-center', label: 'L2 — Command Center', description: 'Skills, commands, agents, hooks — the runtime.' },
  { id: 'L3-operational-data', label: 'L3 — Operational Data', description: 'Typed records, MDX content, library code.' },
  { id: 'L4-public-face', label: 'L4 — Public Face', description: 'Pages, components, static assets — frankx.ai.' },
  { id: 'L5-substrate', label: 'L5 — Substrate', description: 'Open-source frameworks others can fork.' },
]
