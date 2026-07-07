import { agenticLifeOsPublicGithub, type AgenticLifeOsPublicGithubRepo } from './agentic-life-os-public-github'

export type AtlasColor = 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose' | 'sky' | 'zinc'

export type RepoLane =
  | 'life-os'
  | 'starlight'
  | 'agent-ops'
  | 'creator'
  | 'business'
  | 'learning'
  | 'platform'
  | 'design'
  | 'automation'
  | 'archive'

export type PublicRepoCard = AgenticLifeOsPublicGithubRepo & {
  lane: RepoLane
  laneLabel: string
  accent: AtlasColor
  evidence: string
}

export type SystemMapNode = {
  id: string
  kind: 'core' | 'substrate' | 'module' | 'loop' | 'surface' | 'proof'
  label: string
  kicker: string
  description: string
  accent: AtlasColor
  position: { x: number; y: number }
  repo?: string
  href?: string
  metric?: string
  associatedCommands?: string[]
  inputsOutputs?: { inputs: string[]; outputs: string[] }
  relatedRepos?: string[]
}

export type SystemMapEdge = {
  id: string
  source: string
  target: string
  label?: string
  animated?: boolean
}

const laneTokens: Record<RepoLane, { label: string; accent: AtlasColor }> = {
  'life-os': { label: 'Life OS', accent: 'emerald' },
  starlight: { label: 'Starlight', accent: 'sky' },
  'agent-ops': { label: 'Agent Ops', accent: 'cyan' },
  creator: { label: 'Creator', accent: 'violet' },
  business: { label: 'Business', accent: 'amber' },
  learning: { label: 'Learning', accent: 'emerald' },
  platform: { label: 'Platform', accent: 'cyan' },
  design: { label: 'Design', accent: 'rose' },
  automation: { label: 'Automation', accent: 'sky' },
  archive: { label: 'Archive', accent: 'zinc' },
}

function classifyRepo(repo: AgenticLifeOsPublicGithubRepo): RepoLane {
  const text = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase()

  if (repo.archived) return 'archive'
  if (text.includes('starlight') || text.includes('intelligence-system') || text.includes('sis')) return 'starlight'
  if (text.includes('agent') || text.includes('swarm') || text.includes('orchestration') || text.includes('mcp')) return 'agent-ops'
  if (text.includes('creator') || text.includes('music') || text.includes('suno') || text.includes('content')) return 'creator'
  if (text.includes('business') || text.includes('coe') || text.includes('revenue') || text.includes('sales')) return 'business'
  if (text.includes('academy') || text.includes('learning') || text.includes('course') || text.includes('workshop')) return 'learning'
  if (text.includes('design') || text.includes('visual') || text.includes('motion') || text.includes('brand')) return 'design'
  if (text.includes('n8n') || text.includes('workflow') || text.includes('automation')) return 'automation'
  if (text.includes('frankx') || text.includes('website') || text.includes('app') || text.includes('site')) return 'platform'
  if (text.includes('os') || text.includes('operating')) return 'life-os'

  return 'platform'
}

function publicRepoUrl(repoName: string): string | undefined {
  return agenticLifeOsPublicGithub.repos.find((repo) => repo.name.toLowerCase() === repoName.toLowerCase())?.url
}

export const publicGithubRepos: PublicRepoCard[] = agenticLifeOsPublicGithub.repos.map((repo) => {
  const lane = classifyRepo(repo)
  const token = laneTokens[lane]

  return {
    ...repo,
    lane,
    laneLabel: token.label,
    accent: token.accent,
    evidence: repo.homepageUrl ? 'Repo plus live surface' : 'Repo metadata',
  }
})

export const publicRepoLaneCounts = Object.entries(
  publicGithubRepos.reduce<Record<RepoLane, number>>(
    (counts, repo) => {
      counts[repo.lane] += 1
      return counts
    },
    {
      'life-os': 0,
      starlight: 0,
      'agent-ops': 0,
      creator: 0,
      business: 0,
      learning: 0,
      platform: 0,
      design: 0,
      automation: 0,
      archive: 0,
    },
  ),
).map(([lane, count]) => ({
  lane: lane as RepoLane,
  label: laneTokens[lane as RepoLane].label,
  accent: laneTokens[lane as RepoLane].accent,
  count,
}))

export const agenticLifeOsStats = [
  { label: 'GitHub repos scanned', value: String(agenticLifeOsPublicGithub.totalPublic + agenticLifeOsPublicGithub.privateRepoCount) },
  { label: 'Public repo cards', value: String(agenticLifeOsPublicGithub.totalPublic) },
  { label: 'Private repos summarized', value: String(agenticLifeOsPublicGithub.privateRepoCount) },
  { label: 'Operating loops', value: '8' },
  { label: 'Offer paths', value: '4' },
] as const

export const agenticLifeOsPublicScan = {
  generatedAt: agenticLifeOsPublicGithub.generatedAt,
  source: agenticLifeOsPublicGithub.source,
  totalPublic: agenticLifeOsPublicGithub.totalPublic,
  privateRepoCount: agenticLifeOsPublicGithub.privateRepoCount,
}

export const offerPackages = [
  {
    name: 'Public Blueprint',
    audience: 'Builders evaluating the Agentic Life OS model.',
    promise: 'Understand the architecture, module map, and first workflow without exposing private operating data.',
    deliveryMode: 'Sanitized docs, examples, install notes, and public repo evidence.',
    status: 'Free public entry',
    cta: 'Explore the map',
    href: '#system-map',
  },
  {
    name: 'Starter Operator Kit',
    audience: 'Solo founders and creators who want a local command spine.',
    promise: 'Run a clean daily command loop, connect repo evidence, and start moving work through proof gates.',
    deliveryMode: 'Template profile, setup checklist, starter loop prompts, and health-check cadence.',
    status: 'Product candidate',
    cta: 'Review the loops',
    href: '#loops',
  },
  {
    name: 'Private Life OS Implementation',
    audience: 'Selected high-trust clients and FrankX private operating work.',
    promise: 'Connect business, creator, memory, learning, health, wealth, and family modules with bounded execution.',
    deliveryMode: 'Guided implementation sprint with explicit privacy, approval, and evidence boundaries.',
    status: 'Private implementation',
    cta: 'Request the scope',
    href: '/contact',
  },
  {
    name: 'Enterprise Intelligence System',
    audience: 'Teams that need agent governance, memory, evals, and repo-operating discipline.',
    promise: 'Deploy the Starlight substrate and operating doctrine without personal-life modules.',
    deliveryMode: 'Architecture engagement, repo harness, governance model, and validation gates.',
    status: 'Advisory system',
    cta: 'Map your system',
    href: '/contact',
  },
] as const

export const operatingIntent = {
  headline: 'Turn ambition into a weekly evidence loop.',
  copy:
    'Agentic Life OS exists to remove the gap between big goals and visible progress. It routes decisions, agent work, memory, proof, and distribution into one operating cadence so business, learning, health, wealth, and creative output stop competing for attention.',
  promise:
    'The result is not a productivity dashboard. It is a proof-producing command system: decide the highest-leverage move, execute with bounded agents, capture evidence, and convert the proof into the next offer, lesson, asset, or operating upgrade.',
} as const

export const resultEngines = [
  {
    name: 'Decide',
    intent: 'Pick the next move that actually changes the business or life system.',
    mechanism: 'Daily command loop, repo status, offer priorities, open blockers, and risk gates.',
    result: 'One short execution queue instead of scattered tabs, chats, and half-started ideas.',
    accent: 'emerald' as AtlasColor,
  },
  {
    name: 'Execute',
    intent: 'Turn the selected move into bounded agent work that can be reviewed.',
    mechanism: 'Skill routing, swarm lanes, worker handoffs, local gates, and human approval for sensitive actions.',
    result: 'More work reaches a finished artifact: page, doc, product packet, research brief, or shipped code.',
    accent: 'cyan' as AtlasColor,
  },
  {
    name: 'Prove',
    intent: 'Attach evidence so progress compounds instead of disappearing into chat history.',
    mechanism: 'Git commits, public repo cards, ledger entries, screenshots, checks, and deployment URLs.',
    result: 'Each week leaves assets that can sell, teach, automate, or make the next decision easier.',
    accent: 'sky' as AtlasColor,
  },
  {
    name: 'Convert',
    intent: 'Move proof into revenue, trust, learning, and operating advantage.',
    mechanism: 'Offer funnel, public blueprint, operator kit, private implementation, and enterprise intelligence path.',
    result: 'The system becomes a sales surface and an internal operating spine at the same time.',
    accent: 'amber' as AtlasColor,
  },
] as const

export const resultMetrics = [
  {
    label: 'Weekly proof artifact',
    value: '1+',
    note: 'A page, packet, release, workflow, research memo, or verified code change.',
  },
  {
    label: 'Decision latency',
    value: 'lower',
    note: 'Fewer open loops because each domain has an owner, cadence, and safety gate.',
  },
  {
    label: 'Reusable leverage',
    value: 'higher',
    note: 'Work becomes templates, prompts, repo assets, cards, and operator-kit components.',
  },
  {
    label: 'Public trust',
    value: 'visible',
    note: 'Public GitHub evidence and live routes show what exists without exposing private data.',
  },
] as const

export const lifeOsModules = [
  {
    key: 'business',
    name: 'Business OS',
    repo: 'agentic-business-os',
    purpose: 'Offers, client delivery, compliance, proof, pricing, revenue, and operational blockers.',
    risk: 'Production',
    status: 'Private module',
    accent: 'amber' as AtlasColor,
  },
  {
    key: 'creator',
    name: 'Creator OS',
    repo: 'agentic-creator-os',
    purpose: 'Content systems, workshops, visual assets, video, music, and repeatable production lanes.',
    risk: 'Production',
    status: 'Private module',
    accent: 'violet' as AtlasColor,
  },
  {
    key: 'memory',
    name: 'Second Brain OS',
    repo: 'second-brain-os',
    purpose: 'Persistent knowledge storage, private summaries, source distillation, and durable context.',
    risk: 'Private',
    status: 'Private module',
    accent: 'sky' as AtlasColor,
  },
  {
    key: 'orchestration',
    name: 'Orchestration OS',
    repo: 'agentic-orchestration-os',
    purpose: 'Ecosystem routing, command grids, package checks, local toolkits, and agent coordination.',
    risk: 'Production',
    status: 'Private module',
    accent: 'cyan' as AtlasColor,
  },
  {
    key: 'investor',
    name: 'Investor OS',
    repo: 'agentic-investor-os',
    purpose: 'Capital allocation, deal notes, due diligence, and business cashflow visibility.',
    risk: 'Private',
    status: 'Private module',
    accent: 'emerald' as AtlasColor,
  },
  {
    key: 'health',
    name: 'Health OS',
    repo: 'agentic-health-os',
    purpose: 'Energy, training, nutrition, sleep, recovery, and clinician-prep patterns with human authority.',
    risk: 'Private',
    status: 'Private module',
    accent: 'rose' as AtlasColor,
  },
  {
    key: 'research',
    name: 'Life Sciences Researcher IS',
    repo: 'life-sciences-researcher-is',
    purpose: 'Research-only biomedical lookup across public databases and literature. Not patient-specific advice.',
    risk: 'Private',
    status: 'Private module',
    accent: 'sky' as AtlasColor,
  },
  {
    key: 'family',
    name: 'Family OS',
    repo: 'agentic-family-os',
    purpose: 'Heritage preservation, story transcription, narration, genealogy, and family vault mapping.',
    risk: 'Private',
    status: 'Private module',
    accent: 'violet' as AtlasColor,
  },
] as const

export const intelligenceSystems = [
  {
    name: 'Starlight Intelligence System',
    repoName: 'Starlight-Intelligence-System',
    layer: 'Substrate',
    purpose: 'Memory, provenance, taxonomy, validation, release artifacts, and proof for agentic systems.',
    proofGate: 'Health checks, explicit public/private boundaries, and evidence paths on release.',
    href: publicRepoUrl('Starlight-Intelligence-System'),
    accent: 'sky' as AtlasColor,
  },
  {
    name: 'Agentic Ops Hub',
    repoName: 'agentic-ops-hub',
    layer: 'Governance',
    purpose: 'Agent instruction control plane, handoffs, coordination rules, and repo fleet doctrine.',
    proofGate: 'Sync generated agent rules before release-quality work.',
    href: publicRepoUrl('agentic-ops-hub'),
    accent: 'cyan' as AtlasColor,
  },
  {
    name: 'Starlight Swarm Runtime',
    repoName: 'starlight-swarm',
    layer: 'Swarm runtime',
    purpose: 'Queen-worker topology, dry-run safety spine, escalation ladders, and bounded loop execution.',
    proofGate: 'Dry-run, typecheck, tests, and approval gates for production or money movement.',
    href: publicRepoUrl('starlight-swarm'),
    accent: 'emerald' as AtlasColor,
  },
  {
    name: 'AI Capability Registry',
    repoName: 'ai-capability-registry',
    layer: 'Capability index',
    purpose: 'Index of skills, plugins, activation routes, and available agent capability surfaces.',
    proofGate: 'Regenerate the capability index after route, plugin, or skill changes.',
    href: publicRepoUrl('ai-capability-registry'),
    accent: 'violet' as AtlasColor,
  },
  {
    name: 'Health Intelligence System',
    repoName: 'health-intelligence-system',
    layer: 'Domain vertical',
    purpose: 'Safety-gated health and clinician-prep patterns separated from research-only workflows.',
    proofGate: 'Human clinical authority and dated evidence remain explicit.',
    href: publicRepoUrl('health-intelligence-system'),
    accent: 'rose' as AtlasColor,
  },
  {
    name: 'Design and Visual Intelligence',
    repoName: 'starlight-design-intelligence',
    layer: 'Quality gate',
    purpose: 'Design taste, visual QA, motion rubrics, and premium experience validation.',
    proofGate: 'Responsive screenshots and taste-rubric checks before handoff.',
    href: publicRepoUrl('starlight-design-intelligence'),
    accent: 'amber' as AtlasColor,
  },
] as const

export const operatingLoops = [
  {
    name: 'Daily Command Loop',
    cadence: 'Daily',
    owner: 'Chief operator',
    purpose: 'Select the highest-leverage work, route it to one bounded execution lane, and end with evidence.',
    inputs: ['Progress ledger', 'repo status', 'open decisions'],
    outputs: ['one execution queue', 'handoff notes', 'evidence path'],
    safetyGate: 'No production, billing, DNS, secret, or destructive mutation without explicit named approval.',
    accent: 'emerald' as AtlasColor,
  },
  {
    name: 'Business Ops Loop',
    cadence: 'Daily plus weekly review',
    owner: 'business-command',
    purpose: 'Turn offers, client delivery, invoices, proof, and launch blockers into a visible operating cadence.',
    inputs: ['offer docs', 'client state', 'revenue assets'],
    outputs: ['next best offers', 'delivery board', 'proof updates'],
    safetyGate: 'Commercial claims must be specific, dated, and backed by evidence.',
    accent: 'amber' as AtlasColor,
  },
  {
    name: 'Learning And Mastery Loop',
    cadence: 'Weekly',
    owner: 'learning-systems',
    purpose: 'Convert research, courses, repos, and experiments into skill upgrades and reusable playbooks.',
    inputs: ['research notes', 'course material', 'repo experiments'],
    outputs: ['skill deltas', 'practice loops', 'playbook cards'],
    safetyGate: 'Sources, dates, and assumptions stay visible.',
    accent: 'sky' as AtlasColor,
  },
  {
    name: 'Growth And Distribution Loop',
    cadence: 'Weekly',
    owner: 'growth-ops',
    purpose: 'Move audience attention into useful downloads, demos, trust proof, and follow-up workflows.',
    inputs: ['site analytics', 'downloads', 'public repo proof'],
    outputs: ['funnel improvements', 'content briefs', 'conversion tests'],
    safetyGate: 'No inflated outcomes or vague authority claims.',
    accent: 'cyan' as AtlasColor,
  },
  {
    name: 'Creator Production Loop',
    cadence: 'Weekly',
    owner: 'creator-ops',
    purpose: 'Turn ideas, music, video, articles, and visual systems into publishable creative assets.',
    inputs: ['idea queue', 'media vault', 'visual standards'],
    outputs: ['publishable assets', 'clips', 'campaign packs'],
    safetyGate: 'Rights, sources, and brand boundaries are checked before publishing.',
    accent: 'violet' as AtlasColor,
  },
  {
    name: 'Health And Excellence Loop',
    cadence: 'Daily private log plus weekly review',
    owner: 'health-intelligence-ops',
    purpose: 'Support energy, training, nutrition, sleep, recovery, and clinician preparation without replacing professionals.',
    inputs: ['private logs', 'training plan', 'clinician questions'],
    outputs: ['review packet', 'habit adjustments', 'question list'],
    safetyGate: 'No diagnosis, treatment, or medical decisioning without qualified professional authority.',
    accent: 'rose' as AtlasColor,
  },
  {
    name: 'Wealth And Capital Loop',
    cadence: 'Weekly',
    owner: 'investor-ops',
    purpose: 'Track capital allocation, due diligence, portfolio state, and business cashflow connections.',
    inputs: ['cashflow state', 'deal notes', 'portfolio evidence'],
    outputs: ['research packets', 'decision log', 'risk notes'],
    safetyGate: 'Research support only. No automated trades, money movement, or financial advice claims.',
    accent: 'emerald' as AtlasColor,
  },
  {
    name: 'Swarm And Evals Loop',
    cadence: 'Per coherent work wave',
    owner: 'starlight-substrate-ops',
    purpose: 'Route bounded worker lanes, collect handoffs, validate evidence, and preserve context for the next run.',
    inputs: ['task charter', 'skills', 'repo evidence'],
    outputs: ['worker handoffs', 'eval notes', 'verified changes'],
    safetyGate: 'Workers are scoped, dry-run capable, and blocked from irreversible action without approval.',
    accent: 'cyan' as AtlasColor,
  },
] as const

export const dnaCards = [
  {
    name: 'Intent capture',
    layer: 'Command',
    description: 'A messy ambition becomes a bounded task charter with audience, risk, data boundaries, and success evidence.',
    execution: 'Use command prompts, skills, and repo-local instructions to reduce ambiguity before work starts.',
    result: 'The system knows whether it is building a page, changing code, preparing research, or routing a worker lane.',
    evidence: ['task charter', 'approval gates', 'repo-local instructions'],
    accent: 'emerald' as AtlasColor,
  },
  {
    name: 'Agentic execution',
    layer: 'Swarm',
    description: 'Work is decomposed into specialist lanes with clear inputs, expected outputs, and handoff format.',
    execution: 'Route through skills such as ecosystem graph ops, business command, repo harness, visual intelligence, and swarm ops.',
    result: 'Parallelizable work moves faster while preserving one accountable final integration point.',
    evidence: ['worker briefs', 'handoff notes', 'verification commands'],
    accent: 'cyan' as AtlasColor,
  },
  {
    name: 'Memory and proof',
    layer: 'Substrate',
    description: 'Outputs are attached to durable evidence, not left as chat residue.',
    execution: 'Write generated artifacts, ledger entries, repo links, screenshots, and test results into the right layer.',
    result: 'The next run starts from known state instead of rediscovering the same facts.',
    evidence: ['work ledger', 'generated data files', 'public repo URLs'],
    accent: 'sky' as AtlasColor,
  },
  {
    name: 'Offer packaging',
    layer: 'Funnel',
    description: 'The operating system becomes clear commercial paths: public blueprint, kit, private implementation, or enterprise system.',
    execution: 'Map modules and loops to buyer outcomes, privacy constraints, proof gates, and next actions.',
    result: 'The public page explains the product without leaking private operating data.',
    evidence: ['offer packages', 'route map', 'CTA paths'],
    accent: 'amber' as AtlasColor,
  },
  {
    name: 'Quality gates',
    layer: 'Verification',
    description: 'Claims, code, design, motion, privacy, and links are checked before handoff.',
    execution: 'Run local fast gates, visual QA, type checks, link checks, and deployment verification when appropriate.',
    result: 'The system favors shipped truth over theatre.',
    evidence: ['type-check', 'build', 'screenshots', 'Vercel preview'],
    accent: 'rose' as AtlasColor,
  },
] as const

export const commandSurfaces = [
  {
    command: '/research',
    skill: 'ecosystem-graph-ops',
    use: 'Gather repo, product, market, and system context before shaping the map.',
    output: 'source-backed atlas nodes',
  },
  {
    command: '/content-strategy',
    skill: 'business-command',
    use: 'Turn the system into public positioning, funnel logic, and offer boundaries.',
    output: 'offer cards and buyer paths',
  },
  {
    command: '/factory',
    skill: 'site-download-page-ops',
    use: 'Package the public page as a conversion surface with concrete assets.',
    output: 'page route and CTA structure',
  },
  {
    command: '/seo-check',
    skill: 'repo-harness',
    use: 'Verify route metadata, claims, links, and static checks.',
    output: 'pre-handoff gate results',
  },
  {
    command: '/publish',
    skill: 'release-site',
    use: 'Move a coherent change set through preview verification and production only when ready.',
    output: 'verified live URL',
  },
  {
    command: '/acos',
    skill: 'starlight-swarm',
    use: 'Route multi-agent work with bounded lanes, handoffs, and safety rules.',
    output: 'worker queue and eval notes',
  },
] as const

export const systemMapNodes: SystemMapNode[] = [
  {
    id: 'alos',
    kind: 'core',
    label: 'Agentic Life OS',
    kicker: 'Private master offer',
    description: 'One command spine for business ops, learning, growth, creator output, personal excellence, and agent swarms.',
    accent: 'emerald',
    position: { x: 300, y: 205 },
    metric: '8 loops',
    associatedCommands: ['/acos', '/factory'],
    inputsOutputs: { inputs: ['Progress ledger', 'repo status'], outputs: ['one execution queue', 'evidence path'] },
    relatedRepos: ['frankx.ai-vercel-website', 'agentic-ops-hub']
  },
  {
    id: 'sis',
    kind: 'substrate',
    label: 'Starlight Intelligence',
    kicker: 'Memory and proof',
    description: 'The substrate for provenance, taxonomy, validation, release evidence, and durable context.',
    accent: 'sky',
    position: { x: 0, y: 40 },
    repo: 'Starlight-Intelligence-System',
    href: publicRepoUrl('Starlight-Intelligence-System'),
  },
  {
    id: 'swarm',
    kind: 'substrate',
    label: 'Swarm Runtime',
    kicker: 'Bounded workers',
    description: 'Queen-worker routing, dry-run safety, escalation ladders, and scoped execution lanes.',
    accent: 'cyan',
    position: { x: 0, y: 300 },
    repo: 'starlight-swarm',
    href: publicRepoUrl('starlight-swarm'),
  },
  {
    id: 'business',
    kind: 'module',
    label: 'Business Ops',
    kicker: 'Revenue and delivery',
    description: 'Offers, clients, compliance, pricing, proof, and launch blockers become a visible cadence.',
    accent: 'amber',
    position: { x: 300, y: 0 },
  },
  {
    id: 'creator',
    kind: 'module',
    label: 'Creator Production',
    kicker: 'Media factory',
    description: 'Ideas, writing, music, video, and visual systems become reusable creative output.',
    accent: 'violet',
    position: { x: 575, y: 40 },
  },
  {
    id: 'learning',
    kind: 'module',
    label: 'Learning Loops',
    kicker: 'Skill compounding',
    description: 'Research, experiments, and courses become upgraded skills and reusable playbooks.',
    accent: 'sky',
    position: { x: 575, y: 280 },
  },
  {
    id: 'private-life',
    kind: 'module',
    label: 'Private Life Modules',
    kicker: 'Health, wealth, family',
    description: 'Sensitive domains stay private with safety gates, human authority, and no public data leakage.',
    accent: 'rose',
    position: { x: 300, y: 410 },
    metric: 'private',
  },
  {
    id: 'frankx',
    kind: 'surface',
    label: 'frankx.ai Funnel',
    kicker: 'Public surface',
    description: 'The productized route turns the map into a buyer-readable offer, demo, and public evidence layer.',
    accent: 'cyan',
    position: { x: 835, y: 145 },
    repo: 'frankx.ai-vercel-website',
    href: publicRepoUrl('frankx.ai-vercel-website'),
  },
  {
    id: 'github',
    kind: 'proof',
    label: 'GitHub Atlas',
    kicker: 'Public proof',
    description: 'Public repos become rich cards; private repos are summarized only as aggregate counts.',
    accent: 'emerald',
    position: { x: 835, y: 360 },
    href: 'https://github.com/frankxai',
    metric: `${agenticLifeOsPublicGithub.totalPublic} public`,
  },
]

export const systemMapEdges: SystemMapEdge[] = [
  { id: 'sis-alos', source: 'sis', target: 'alos', label: 'memory/proof', animated: true },
  { id: 'swarm-alos', source: 'swarm', target: 'alos', label: 'execution', animated: true },
  { id: 'business-alos', source: 'business', target: 'alos', label: 'ops' },
  { id: 'creator-alos', source: 'creator', target: 'alos', label: 'assets' },
  { id: 'learning-alos', source: 'learning', target: 'alos', label: 'skills' },
  { id: 'private-alos', source: 'private-life', target: 'alos', label: 'private' },
  { id: 'alos-frankx', source: 'alos', target: 'frankx', label: 'offer' },
  { id: 'alos-github', source: 'alos', target: 'github', label: 'evidence' },
  { id: 'github-frankx', source: 'github', target: 'frankx', label: 'rich cards' },
]

export const featuredPublicRepos = [
  'Starlight-Intelligence-System',
  'agentic-ops-hub',
  'starlight-swarm',
  'ai-capability-registry',
  'health-intelligence-system',
  'starlight-design-intelligence',
  'frankx.ai-vercel-website',
  'ai-architect-academy',
]
  .map((name) => publicGithubRepos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()))
  .filter((repo): repo is PublicRepoCard => Boolean(repo))
