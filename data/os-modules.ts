export type ModulePhase = 'authoring' | 'funnel' | 'amplify' | 'cross-cutting'
export type ModuleStatus = 'live' | 'active' | 'scaffolded' | 'deferred'
export type ModuleColor = 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'slate' | 'fuchsia' | 'teal' | 'lime'

export interface OSModuleDeepDive {
  route: string // child route deep-diving one slot of this module
  label: string // CTA label, max ~6 words
  description: string // why someone would click — 1 sentence
}

export interface OSModule {
  id: string
  name: string
  slug: string // for /os/{slug} deep-dive
  route: string // actual module route on the site
  status: ModuleStatus
  color: ModuleColor
  iconName: string // lucide icon name
  shipped: string // YYYY-MM-DD
  oneLine: string // tagline, 12 words max
  description: string // 1-2 sentences
  phases: ModulePhase[] // which phases of the spine this module owns
  connectsTo: string[] // ids of other modules this one feeds into
  artifacts: string[] // what it produces
  commands: string[] // slash commands that operate on this module
  deepDive?: OSModuleDeepDive // optional child surface (e.g. ACOS → /acos/agents)
}

export const osModules: OSModule[] = [
  {
    id: 'watch-os',
    name: 'Watch OS',
    slug: 'watch',
    route: '/watch/shorts',
    status: 'live',
    color: 'cyan',
    iconName: 'Video',
    shipped: '2026-04-15',
    oneLine: 'Video capture to published short with AEO schema.',
    description:
      'End-to-end short-form video pipeline. Raw capture becomes a published Short with transcript, chapter markers, per-ID pages, RSS, OG, and answer-engine schema. Watch entries feed blog posts, newsletter snippets, and workshop artifacts.',
    phases: ['authoring', 'funnel', 'amplify'],
    connectsTo: ['workshop-os', 'aco'],
    artifacts: ['Shorts', 'Per-ID pages', 'RSS feed', 'Transcripts'],
    commands: ['/video-clip', '/video-publish', '/video-to-blog'],
  },
  {
    id: 'workshop-os',
    name: 'Workshop OS',
    slug: 'workshops',
    route: '/workshops',
    status: 'live',
    color: 'violet',
    iconName: 'Users',
    shipped: '2026-04-22',
    oneLine: 'Plan, deliver, and amplify live workshops end-to-end.',
    description:
      'Private authoring (briefs, run-of-show, per-attendee research) → public funnel (3 delivered formats + intake form) → 14-day amplification loop. Built on a local CRM that unifies with the rest of the OS.',
    phases: ['authoring', 'funnel', 'amplify'],
    connectsTo: ['coe-hub', 'aco', 'watch-os'],
    artifacts: ['Workshop briefs', 'Attendee packets', 'Content kits', 'CRM records'],
    commands: ['/workshop-new', '/workshop-prep', '/workshop-debrief', '/crm-log', '/amplify-attendee'],
  },
  {
    id: 'aco',
    name: 'Agentic Content Officer',
    slug: 'aco',
    route: '/aco',
    status: 'live',
    color: 'amber',
    iconName: 'Film',
    shipped: '2026-04-21',
    oneLine: 'Talking-head capture to publish-ready video in one shot.',
    description:
      'Routes any content brief to the right sub-workflow — scripting, filming, editing, thumbnail generation, platform-specific publishing. Three MCPs (remotion-docs, remotion-video, smartcut) power the render path.',
    phases: ['authoring', 'funnel'],
    connectsTo: ['watch-os', 'workshop-os'],
    artifacts: ['Talking-head videos', 'Long-form YouTube', 'Thumbnails', 'YouTube metadata'],
    commands: ['/aco', '/talking-head-ship', '/video-produce'],
  },
  {
    id: 'acos',
    name: 'ACOS',
    slug: 'acos',
    route: '/acos',
    status: 'active',
    color: 'emerald',
    iconName: 'Cpu',
    shipped: 'ongoing',
    oneLine: 'Agent orchestration with learning across sessions.',
    description:
      'The Agentic Creator Operating System — a persistent agent runtime that learns from past trajectories, scores intelligence, and routes complex tasks across 150+ skills and dozens of agents. The engine under the hood.',
    phases: ['cross-cutting'],
    connectsTo: ['watch-os', 'workshop-os', 'aco', 'coe-hub'],
    artifacts: ['Skills', 'Agents', 'Trajectory logs', 'Intelligence scores'],
    commands: ['/acos', '/acos-flow', '/acos-monitor', '/agentic-jujutsu'],
    deepDive: {
      route: '/acos/agents',
      label: 'Browse the 99-agent catalog',
      description:
        '11 pillars × 9 specialists. The full ACOS agent + skill + command catalog with shipped / in-progress / gap status per slot.',
    },
  },
  {
    id: 'coe-hub',
    name: 'AI CoE Hub',
    slug: 'coe-hub',
    route: '/ai-architect/ai-coe-hub',
    status: 'live',
    color: 'slate',
    iconName: 'Building2',
    shipped: 'pre-existing',
    oneLine: 'The 6-pillar enterprise framework, made personal.',
    description:
      'The Oracle EMEA AI Center of Excellence methodology Frank refined for Fortune 500 clients, documented and adapted for personal use. Strategy, Governance, Talent, Technology, Data, Ethics — the six pillars every operator needs. The theoretical backbone under Workshop OS\'s `personal-ai-coe` format.',
    phases: ['cross-cutting'],
    connectsTo: ['workshop-os'],
    artifacts: ['6-pillar framework', 'Assessment tools', 'Blueprint library'],
    commands: ['/starlight-architect', '/ai-architecture'],
  },
  {
    id: 'library-os',
    name: 'Library OS',
    slug: 'library-os',
    route: '/library',
    status: 'live',
    color: 'rose',
    iconName: 'BookOpen',
    shipped: '2026-04-26',
    oneLine: 'Book intelligence — quotes, chapters, continue-reading, videos.',
    description:
      'Each book becomes an anchor-navigable hub with TL;DR, key insights, quotes, chapter-by-chapter, FAQ, and curated continue-reading. The frankx surface for the open-source library-os framework. Three slash commands handle everything from baseline entry to deep-dive enrichment.',
    phases: ['authoring', 'amplify'],
    connectsTo: ['acos'],
    artifacts: ['Book hubs', 'Quotes', 'Chapter summaries', 'Reading paths'],
    commands: ['/library-add', '/library-deepen', '/library-research'],
  },
  {
    id: 'build-first-funnel',
    name: 'Build First AI Agent Funnel',
    slug: 'build-first-funnel',
    route: '/start-here',
    status: 'scaffolded',
    color: 'fuchsia',
    iconName: 'Zap',
    shipped: '2026-04-25',
    oneLine: '5-tier premium funnel — €0 Primer to €2,997 Founder Circle.',
    description:
      'Test-branch funnel: Primer → Pack → Toolkit → Mastery → Architect → Founder\'s Circle. Lemon Squeezy + Claude Managed Agents customer service. Routes /start-here, /build, /build/[slug], /founders-circle. Ramps the operational systems above into a clear commercial offering.',
    phases: ['funnel'],
    connectsTo: ['workshop-os', 'aco'],
    artifacts: ['Primer', 'Pack', 'Toolkit', 'Mastery', 'Architect', 'Founder Circle'],
    commands: [],
  },
  {
    id: 'iis',
    name: 'Investment Intelligence System',
    slug: 'iis',
    route: '/intelligence-system',
    status: 'scaffolded',
    color: 'teal',
    iconName: 'LineChart',
    shipped: '2026-05-07',
    oneLine: 'The kata for personal capital stewardship.',
    description:
      'A markdown-first, framework-agnostic substrate that turns any code agent into a sophisticated decision-support engine for personal wealth management. Multi-agent debate team, Strategy Session as atomic unit, retrospective learning loop, mandatory human-gate on execution. Sibling to Library OS and SIS Layer 6 (Wealth / Freedom IS). MIT.',
    phases: ['authoring', 'cross-cutting'],
    connectsTo: ['acos', 'library-os', 'coe-hub'],
    artifacts: ['Strategy Sessions', 'Thesis log', 'Trajectories', 'Tax overlays', 'Agent calibration'],
    commands: ['/weekly-strategy', '/thesis-debate', '/portfolio-snapshot', '/iis-retrospective'],
    deepDive: {
      route: '/intelligence-system#agents',
      label: 'Browse the 11-agent strategy team',
      description:
        'Macro-Risk, Crypto-DCA, DeFi-Yield, Fundamentals, Technical, Risk-Manager, Tax-Optimizer, Regulatory-Risk, Portfolio-Manager, Chief-of-Staff, Researcher. Personas + tool budgets + calibration approach.',
    },
  },
  {
    id: 'vis',
    name: 'Visual Intelligence System',
    slug: 'vis',
    route: '/studio/visual',
    status: 'live',
    color: 'lime',
    iconName: 'Layers',
    shipped: '2026-05-13',
    oneLine: 'Drop images, get a per-platform strategy.',
    description:
      'The connective tissue between asset generation, composition, and ship. Three asset tiers (NB2, Higgsfield, HyperFrames), nine platform personas, one drop-images workflow. Substrate at lib/visual-intelligence/, runtime at /visual-strategy + visual-intelligence skill + visual-intelligence-orchestrator agent.',
    phases: ['authoring', 'amplify', 'cross-cutting'],
    connectsTo: ['watch-os', 'aco', 'workshop-os', 'library-os', 'iis'],
    artifacts: ['Per-batch strategy', 'Per-image analysis', 'Gap-fill briefs', 'Persona matrix'],
    commands: ['/visual-strategy', '/vis-search', '/vis-audit', '/infogenius'],
    deepDive: {
      route: '/studio/visual#platforms',
      label: 'Browse the 9-platform persona matrix',
      description:
        'LinkedIn (AI Architect), YouTube long-form (the Builder), Shorts + TikTok (the Creator), Instagram (the Aesthete), X (the Thinker), Threads (Conversation-starter), Bluesky (Live-thinker), Spotify (the Producer). One persona per profile.',
    },
  },
  {
    id: 'foundry',
    name: 'FrankX Foundry',
    slug: 'foundry',
    route: '/foundry',
    status: 'live',
    color: 'emerald',
    iconName: 'Hammer',
    shipped: '2026-06-11',
    oneLine: 'Operating-system installs for businesses we believe in.',
    description:
      'The service layer of the Agentic OS family. Evaluated installs of agentic-business-os — site, agent harness, claims gate, business memory — derived per brand, owned by the founder, connected via harness-sync PRs. Application-only; priority for sustainable, healthcare, and meaningful businesses.',
    phases: ['funnel', 'cross-cutting'],
    connectsTo: ['acos', 'coe-hub'],
    artifacts: ['OS installs', 'Brand derivations', 'Harness-sync PRs', 'Skill packs'],
    commands: ['/os-spawn'],
    deepDive: {
      route: '/foundry/guide',
      label: 'Read the operating guide',
      description:
        'How a founder runs an installed OS: day-1 onboarding, the 30-minute weekly rhythm, the gates, and how harness updates arrive.',
    },
  },
]

export const osCRM = {
  id: 'unified-crm',
  name: 'Unified CRM',
  description:
    'Single source-of-truth data layer. Every person who reads the blog, attends a workshop, subscribes to the newsletter, or watches a Short resolves to one `person_id` with `tags` distinguishing how they engaged.',
  files: [
    { path: 'data/crm/people.json', purpose: 'Humans engaged across any module' },
    { path: 'data/crm/orgs.json', purpose: 'Companies and organizations' },
    { path: 'data/crm/workshops.json', purpose: 'Workshop instances' },
    { path: 'data/crm/engagements.json', purpose: 'Touchpoints across all modules' },
    { path: 'data/crm/linkedin-profiles.json', purpose: 'Pre-engagement staging' },
  ],
}

export function getModule(id: string): OSModule | undefined {
  return osModules.find((m) => m.id === id)
}

export function getConnections(moduleId: string): OSModule[] {
  const mod = getModule(moduleId)
  if (!mod) return []
  return mod.connectsTo.map((id) => getModule(id)).filter((m): m is OSModule => !!m)
}
