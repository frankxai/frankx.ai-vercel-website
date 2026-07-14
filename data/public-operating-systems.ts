export type OperatingSystemStage = 'open-source' | 'public-blueprint' | 'private-system'

export type OperatingSystemGoal =
  | 'create'
  | 'business'
  | 'learn'
  | 'life'
  | 'agents'
  | 'music'
  | 'legacy'

export interface PublicOperatingSystem {
  id: string
  name: string
  stage: OperatingSystemStage
  audience: string
  outcome: string
  mechanism: string
  firstWin: string
  boundary: string
  detailHref: string
  proofHref: string
  proofLabel: string
  goals: OperatingSystemGoal[]
  relatedSystemIds: string[]
}

export interface OperatingSystemGoalOption {
  id: OperatingSystemGoal
  label: string
  prompt: string
  recommendationId: string
}

export const operatingSystemGoals: OperatingSystemGoalOption[] = [
  {
    id: 'create',
    label: 'Ship creative work',
    prompt: 'Turn ideas, briefs, and source material into a repeatable publishing system.',
    recommendationId: 'agentic-creator-os',
  },
  {
    id: 'business',
    label: 'Run the business',
    prompt: 'Make decisions, ownership, evidence, and recurring operations visible.',
    recommendationId: 'agentic-business-os',
  },
  {
    id: 'learn',
    label: 'Learn or research',
    prompt: 'Control sources, feedback, project state, and review across serious study.',
    recommendationId: 'agentic-student-os',
  },
  {
    id: 'life',
    label: 'Organize life',
    prompt: 'Build a private command spine for commitments, admin, knowledge, and records.',
    recommendationId: 'agentic-life-os',
  },
  {
    id: 'agents',
    label: 'Build an agent system',
    prompt: 'Add memory, provenance, governance, and verification to an agent fleet.',
    recommendationId: 'starlight-intelligence-system',
  },
  {
    id: 'music',
    label: 'Produce music',
    prompt: 'Connect creative direction, prompts, release evidence, and media production.',
    recommendationId: 'agentic-music-os',
  },
  {
    id: 'legacy',
    label: 'Preserve knowledge',
    prompt: 'Keep family-safe stories, decisions, and source records retrievable over time.',
    recommendationId: 'family-intelligence-os',
  },
]

export const publicOperatingSystems: PublicOperatingSystem[] = [
  {
    id: 'agentic-creator-os',
    name: 'Agentic Creator OS',
    stage: 'open-source',
    audience: 'Creators and small teams moving from isolated prompts to a publishing operation.',
    outcome: 'Run research, production, review, and distribution as one visible workflow.',
    mechanism: 'Portable skills, commands, specialist agents, workflow gates, and compounding creative memory.',
    firstWin: 'Route one real brief through a defined research, production, and review path.',
    boundary: 'Publishing remains review-gated. Platform credentials and private audience data stay outside the public system.',
    detailHref: '/acos',
    proofHref: 'https://github.com/frankxai/agentic-creator-os',
    proofLabel: 'Inspect the repository',
    goals: ['create', 'business', 'music'],
    relatedSystemIds: ['starlight-intelligence-system', 'agentic-music-os', 'agentic-business-os'],
  },
  {
    id: 'agentic-business-os',
    name: 'Agentic Business OS',
    stage: 'open-source',
    audience: 'Founder-operators who need an operating cadence before they need more automation.',
    outcome: 'Connect decisions, evidence, ownership, recurring reviews, and customer work.',
    mechanism: 'A reusable repository profile, decision records, quality gates, and bounded agent workflows.',
    firstWin: 'Create one decision log and one weekly operating review around a live business constraint.',
    boundary: 'No autonomous money movement, legal conclusion, customer send, or production mutation.',
    detailHref: '/ecosystem/agentic-business-os',
    proofHref: 'https://github.com/frankxai/agentic-business-os',
    proofLabel: 'Inspect the repository',
    goals: ['business', 'agents'],
    relatedSystemIds: ['starlight-intelligence-system', 'agentic-creator-os', 'agentic-life-os'],
  },
  {
    id: 'agentic-student-os',
    name: 'Agentic Student OS',
    stage: 'public-blueprint',
    audience: 'Advanced students and researchers managing difficult projects, sources, and feedback.',
    outcome: 'Make study state, evidence, questions, and review gates visible without outsourcing judgment.',
    mechanism: 'Source queues, project state, spaced review, supervisor feedback, and explicit human approval.',
    firstWin: 'Generate a first-week study system for a technical project, thesis, or evidence review.',
    boundary: 'A blueprint, not a packaged application. Academic integrity and high-stakes judgment stay human-controlled.',
    detailHref: '/ecosystem/agentic-student-os',
    proofHref: '/ecosystem/agentic-student-os#starter',
    proofLabel: 'Build a starter plan',
    goals: ['learn', 'agents'],
    relatedSystemIds: ['starlight-intelligence-system', 'research-intelligence-os'],
  },
  {
    id: 'agentic-life-os',
    name: 'Agentic Life OS',
    stage: 'private-system',
    audience: 'Founder-operators who need one private command spine across work, learning, admin, and memory.',
    outcome: 'Turn scattered commitments and records into reviewable operating loops.',
    mechanism: 'A typed core profile connecting business, creator, memory, orchestration, health, finance, and family modules.',
    firstWin: 'Design a private first-week loop around the area creating the most administrative drag.',
    boundary: 'The implementation is private. Health, finance, family, credentials, and memory never enter the public graph.',
    detailHref: '/ecosystem/agentic-life-os',
    proofHref: '/ecosystem/agentic-life-os#starter',
    proofLabel: 'Build a starter plan',
    goals: ['life', 'business', 'legacy'],
    relatedSystemIds: ['starlight-intelligence-system', 'agentic-business-os', 'family-intelligence-os'],
  },
  {
    id: 'starlight-intelligence-system',
    name: 'Starlight Intelligence System',
    stage: 'open-source',
    audience: 'AI architects and engineering teams building durable multi-agent systems.',
    outcome: 'Give an agent fleet memory, provenance, governance, validation, and release evidence.',
    mechanism: 'A composable intelligence protocol and repository substrate shared across agent runtimes.',
    firstWin: 'Map one agent workflow to explicit memory, authority, evidence, and failure boundaries.',
    boundary: 'The public protocol carries no private memory. Production authority remains outside the agent substrate.',
    detailHref: '/starlight-intelligence-system',
    proofHref: 'https://github.com/frankxai/Starlight-Intelligence-System',
    proofLabel: 'Inspect the repository',
    goals: ['agents', 'business', 'learn'],
    relatedSystemIds: ['agentic-creator-os', 'agentic-business-os', 'agentic-student-os', 'agentic-life-os'],
  },
  {
    id: 'agentic-music-os',
    name: 'Agentic Music OS',
    stage: 'open-source',
    audience: 'AI-native artists and producers coordinating songs, visuals, evidence, and releases.',
    outcome: 'Keep creative direction, production state, rights evidence, and release assets connected.',
    mechanism: 'Music-specific operating cards, prompt evidence, media formats, release gates, and reusable workflows.',
    firstWin: 'Create one release packet that ties the track, visual direction, rights notes, and required formats together.',
    boundary: 'No automatic distribution, rights conclusion, account action, or spend.',
    detailHref: '/music',
    proofHref: 'https://github.com/frankxai/agentic-music-os',
    proofLabel: 'Inspect the repository',
    goals: ['music', 'create'],
    relatedSystemIds: ['agentic-creator-os', 'starlight-intelligence-system'],
  },
  {
    id: 'research-intelligence-os',
    name: 'Research Intelligence OS',
    stage: 'open-source',
    audience: 'Researchers who need sources, claims, notes, and open questions to remain traceable.',
    outcome: 'Move from source collection to a reviewable evidence graph and research decision log.',
    mechanism: 'Research intake, provenance, synthesis, uncertainty, and handoff patterns built on the Starlight substrate.',
    firstWin: 'Turn one research question into a source queue with claim and uncertainty records.',
    boundary: 'Research support only. It does not create clinical, legal, or financial authority.',
    detailHref: '/ecosystem/research-intelligence-os',
    proofHref: 'https://github.com/frankxai/research-intelligence-os',
    proofLabel: 'Inspect the repository',
    goals: ['learn', 'agents'],
    relatedSystemIds: ['agentic-student-os', 'starlight-intelligence-system'],
  },
  {
    id: 'family-intelligence-os',
    name: 'Family Intelligence OS',
    stage: 'open-source',
    audience: 'Families and builders preserving stories, provenance, and records across generations.',
    outcome: 'Keep source-backed family knowledge retrievable without making private history public.',
    mechanism: 'Family-safe capture, provenance, access boundaries, story records, and durable exports.',
    firstWin: 'Create one source-backed story record with consent, provenance, and a private storage decision.',
    boundary: 'Public code is separate from private family data. Consent and access control come before automation.',
    detailHref: '/ecosystem/family-intelligence-os',
    proofHref: 'https://github.com/frankxai/family-intelligence-os',
    proofLabel: 'Inspect the repository',
    goals: ['legacy', 'life'],
    relatedSystemIds: ['agentic-life-os', 'starlight-intelligence-system'],
  },
]

export function getPublicOperatingSystem(id: string): PublicOperatingSystem | undefined {
  return publicOperatingSystems.find((system) => system.id === id)
}
