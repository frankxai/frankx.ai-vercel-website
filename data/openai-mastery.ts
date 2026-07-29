export type OpenAISurface = 'chat' | 'work' | 'codex' | 'api'

export type OpenAIAudience =
  | 'founder'
  | 'creator'
  | 'researcher'
  | 'developer'
  | 'team'

export type OpenAIResourceFormat =
  | 'docs'
  | 'academy'
  | 'video'
  | 'github'
  | 'exercise'

export type OpenAIResourceStatus =
  | 'evergreen'
  | 'current'
  | 'upcoming'
  | 'replay'
  | 'stale'
  | 'deprecated'

export type OpenAIResource = {
  id: string
  title: string
  url: string
  provider: string
  audiences: OpenAIAudience[]
  surfaces: OpenAISurface[]
  level: 'start' | 'practice' | 'advanced'
  format: OpenAIResourceFormat
  publishedAt?: string
  lastVerifiedAt: string
  status: OpenAIResourceStatus
  official: boolean
  summary: string
  editorialNote?: string
  recordedBeforeWorkLaunch?: boolean
  qualitySignals?: string
  replacementUrl?: string
}

export type OpenAIMode = {
  id: Exclude<OpenAISurface, 'api'>
  label: string
  shortLabel: string
  href: string
  promise: string
  useWhen: string[]
  notFor: string
  starter: {
    title: string
    outcome: string
    steps: string[]
  }
  resourceIds: string[]
}

export type OpenAIRolePath = {
  id: OpenAIAudience
  label: string
  shortLabel: string
  primarySurface: Exclude<OpenAISurface, 'api'>
  secondarySurface: Exclude<OpenAISurface, 'api'>
  promise: string
  firstTask: string
  nextHref: string
  nextLabel: string
}

export const OPENAI_MASTERY_VERIFIED_AT = '2026-07-29'

export const openAIModes: OpenAIMode[] = [
  {
    id: 'chat',
    label: 'Chat',
    shortLabel: 'Think with ChatGPT',
    href: '/learn/chatgpt-mastery',
    promise: 'Fast conversation for questions, exploration, drafting, and decisions.',
    useWhen: [
      'You want to ask, compare, brainstorm, or improve a draft.',
      'The task benefits from quick back-and-forth.',
      'You are still clarifying the outcome.',
    ],
    notFor:
      'A substantial multi-step deliverable or software work that needs repository tools and technical review.',
    starter: {
      title: 'Turn one fuzzy decision into a decision brief',
      outcome: 'A one-page option comparison with risks, recommendation, and next action.',
      steps: [
        'State the decision, context, constraints, and deadline.',
        'Ask for three credible options and the tradeoffs of each.',
        'Challenge the recommendation, then request a one-page final brief.',
      ],
    },
    resourceIds: ['use-chatgpt', 'chatgpt-101', 'chatgpt-102', 'responsible-use'],
  },
  {
    id: 'work',
    label: 'ChatGPT Work',
    shortLabel: 'Delegate an outcome',
    href: '/learn/chatgpt-work-mastery',
    promise: 'Longer-running knowledge work that ends in a reviewable deliverable.',
    useWhen: [
      'The result is a report, deck, spreadsheet, site, or project plan.',
      'The task needs context from several files or connected tools.',
      'You want to steer checkpoints while the work continues.',
    ],
    notFor:
      'A quick question that Chat can answer in a few turns, or codebase work that needs diffs, tests, and developer detail.',
    starter: {
      title: 'Build a weekly operating brief from scattered inputs',
      outcome: 'A reviewable brief with decisions, risks, owners, and an executive summary.',
      steps: [
        'Create a folder with last week’s notes, metrics, and open decisions.',
        'Define the audience, required sections, trusted sources, and review standard.',
        'Ask Work to produce the brief, inspect every claim, then save the pattern as a reusable workflow.',
      ],
    },
    resourceIds: [
      'get-started-work',
      'work-get-started-event',
      'work-reimagine-guide',
      'work-small-business',
      'work-responsible-use',
      'work-deep-research',
      'work-marketing-replay',
      'work-bizops-replay',
      'work-researchers-replay',
    ],
  },
  {
    id: 'codex',
    label: 'Codex',
    shortLabel: 'Build and verify software',
    href: '/learn/codex-mastery',
    promise: 'Developer workflows with repositories, diffs, shell commands, tests, and review.',
    useWhen: [
      'The work happens inside a real repository.',
      'Success can be checked with tests, types, builds, or a reviewable diff.',
      'You need developer controls, Git context, or parallel implementation tasks.',
    ],
    notFor:
      'General research and document production where technical details would create noise for a nontechnical user.',
    starter: {
      title: 'Complete one bounded repository improvement',
      outcome: 'A reviewed diff with the relevant checks passing and no unrelated changes.',
      steps: [
        'Open a real repository and add or review its AGENTS.md instructions.',
        'Give Codex one small task with a clear done-state and verification command.',
        'Inspect the diff, run the checks, and ask Codex to explain remaining risks.',
      ],
    },
    resourceIds: [
      'codex-best-practices',
      'codex-agents-md',
      'codex-bootcamp',
      'codex-fundamentals',
      'github-codex',
      'github-plugins',
    ],
  },
]

export const openAIRolePaths: OpenAIRolePath[] = [
  {
    id: 'founder',
    label: 'Founder or operator',
    shortLabel: 'Founder',
    primarySurface: 'work',
    secondarySurface: 'chat',
    promise:
      'Use Chat to pressure-test choices, then Work to turn the decision into a brief, plan, deck, or operating artifact.',
    firstTask:
      'Turn customer notes, metrics, and current priorities into a weekly founder operating brief.',
    nextHref: '/foundry',
    nextLabel: 'See the FrankX Foundry',
  },
  {
    id: 'creator',
    label: 'Creator or independent expert',
    shortLabel: 'Creator',
    primarySurface: 'work',
    secondarySurface: 'chat',
    promise:
      'Use Chat for ideation and editorial sparring; use Work for research-backed briefs, production packs, and finished assets.',
    firstTask:
      'Turn one source interview and your voice notes into a campaign brief, article, and distribution plan.',
    nextHref: '/guides/openai-chatgpt-guide',
    nextLabel: 'Open the creator guide',
  },
  {
    id: 'researcher',
    label: 'Researcher or analyst',
    shortLabel: 'Researcher',
    primarySurface: 'work',
    secondarySurface: 'chat',
    promise:
      'Use Work for multi-source analysis and reviewable evidence; use Chat to interrogate assumptions and refine questions.',
    firstTask:
      'Create a sourced decision memo from a small, approved evidence pack and verify every material claim.',
    nextHref: '/research',
    nextLabel: 'Explore FrankX Research',
  },
  {
    id: 'developer',
    label: 'Developer or technical builder',
    shortLabel: 'Developer',
    primarySurface: 'codex',
    secondarySurface: 'chat',
    promise:
      'Use Codex for repository work and validation; keep Chat nearby for design exploration and concise explanations.',
    firstTask:
      'Ask Codex to fix one real issue, run the narrow checks, and return a reviewable diff plus a risk summary.',
    nextHref: '/ai-architect-academy',
    nextLabel: 'Enter AI Architect Academy',
  },
  {
    id: 'team',
    label: 'Team lead, admin, or enablement owner',
    shortLabel: 'Team lead',
    primarySurface: 'work',
    secondarySurface: 'codex',
    promise:
      'Start with one governed Work workflow, then bring in Codex where technical implementation or controlled automation is required.',
    firstTask:
      'Map one recurring team workflow, define its approved inputs and human review, and test the smallest useful version.',
    nextHref: '/foundry',
    nextLabel: 'Discuss an implementation',
  },
]

export const openAIResources: OpenAIResource[] = [
  {
    id: 'use-chatgpt',
    title: 'Choose between Chat, ChatGPT Work, and Codex',
    url: 'https://learn.chatgpt.com/docs/use-chatgpt',
    provider: 'OpenAI',
    audiences: ['founder', 'creator', 'researcher', 'developer', 'team'],
    surfaces: ['chat', 'work', 'codex'],
    level: 'start',
    format: 'docs',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The canonical explanation of the three desktop modes and their boundaries.',
  },
  {
    id: 'chatgpt-101',
    title: 'ChatGPT 101: a guide to your AI superassistant',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/videos/chatgpt-101-a-guide-to-your-ai-superassistant-recording',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'creator', 'researcher', 'team'],
    surfaces: ['chat'],
    level: 'start',
    format: 'video',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'The strongest broad official introduction for everyday ChatGPT use.',
    qualitySignals: 'Official replay with a large learner audience and companion exercises.',
  },
  {
    id: 'chatgpt-102',
    title: 'ChatGPT 102: use AI to do your best work',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/videos/chatgpt-102-leveraging-ai-to-do-your-best-work-recording',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'creator', 'researcher', 'team'],
    surfaces: ['chat'],
    level: 'practice',
    format: 'video',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'Projects, deeper research, and reusable workflows after the basics.',
  },
  {
    id: 'responsible-use',
    title: 'Responsible use of ChatGPT at work',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/resources/responsible-use-of-chatgpt-at-work-2025-09-08',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'creator', 'researcher', 'developer', 'team'],
    surfaces: ['chat', 'work'],
    level: 'start',
    format: 'academy',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'evergreen',
    official: true,
    summary: 'A shared baseline for privacy, verification, and accountable human review.',
  },
  {
    id: 'get-started-work',
    title: 'Get started with ChatGPT Work',
    url: 'https://learn.chatgpt.com/docs/get-started-with-work',
    provider: 'OpenAI',
    audiences: ['founder', 'creator', 'researcher', 'team'],
    surfaces: ['work'],
    level: 'start',
    format: 'docs',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'Current Work capabilities, local and cloud behavior, deliverables, and review guidance.',
  },
  {
    id: 'work-get-started-event',
    title: 'Get started with ChatGPT Work',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/events/get-started-with-chatgpt-work-00rtqho2qa',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'creator', 'researcher', 'team'],
    surfaces: ['work'],
    level: 'start',
    format: 'academy',
    publishedAt: '2026-07-30',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'upcoming',
    official: true,
    summary: 'A Work-native walkthrough of choosing a task, providing context, and reviewing the result.',
    editorialNote: 'Promote the replay after OpenAI publishes it.',
  },
  {
    id: 'work-reimagine-guide',
    title: 'ChatGPT Work: Reimagine Guide for team activators',
    url: 'https://academy.openai.com/public/clubs/champions-ecqup/resources/chatgpt-work-reimagine-guide-for-team-activators-2026-07-08',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'team'],
    surfaces: ['work'],
    level: 'practice',
    format: 'academy',
    publishedAt: '2026-07-09',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'Choose, test, package, and measure one governed team workflow.',
  },
  {
    id: 'work-small-business',
    title: 'How small businesses can put ChatGPT Work into practice',
    url: 'https://academy.openai.com/public/clubs/small-business-ipf4m/events/how-small-businesses-can-put-chatgpt-work-into-practice-4100tgvv69',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'team'],
    surfaces: ['work'],
    level: 'practice',
    format: 'academy',
    publishedAt: '2026-08-06',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'upcoming',
    official: true,
    summary: 'Practical small-business workflows across sales, marketing, finance, operations, and support.',
    editorialNote: 'Promote the replay after OpenAI publishes it.',
  },
  {
    id: 'work-responsible-use',
    title: 'Verify and review substantial work',
    url: 'https://learn.chatgpt.com/docs/get-started-with-work#review-the-result',
    provider: 'OpenAI',
    audiences: ['founder', 'creator', 'researcher', 'team'],
    surfaces: ['work'],
    level: 'start',
    format: 'docs',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The non-negotiable review loop for numbers, claims, files, and finished artifacts.',
  },
  {
    id: 'work-deep-research',
    title: 'Deep research',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/resources/deep-research',
    provider: 'OpenAI Academy',
    audiences: ['researcher', 'founder', 'team'],
    surfaces: ['chat', 'work'],
    level: 'practice',
    format: 'academy',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'A current official primer for multi-source research and evidence review.',
  },
  {
    id: 'work-marketing-replay',
    title: 'How marketing teams use the desktop agent workflow',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/videos/how-marketing-teams-use-codex-recording-2026-06-22',
    provider: 'OpenAI Academy',
    audiences: ['creator', 'founder', 'team'],
    surfaces: ['work', 'codex'],
    level: 'practice',
    format: 'video',
    publishedAt: '2026-06-22',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'Campaign briefs, creative direction, production handoff, and reusable workflows.',
    recordedBeforeWorkLaunch: true,
  },
  {
    id: 'work-bizops-replay',
    title: 'How business operations teams use the desktop agent workflow',
    url: 'https://academy.openai.com/public/clubs/work-users-ynjqu/videos/how-business-operations-teams-use-codex-2026-06-17',
    provider: 'OpenAI Academy',
    audiences: ['founder', 'team'],
    surfaces: ['work', 'codex'],
    level: 'practice',
    format: 'video',
    publishedAt: '2026-06-17',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'Dashboards, weekly updates, decision decks, and recurring operational work.',
    recordedBeforeWorkLaunch: true,
  },
  {
    id: 'work-researchers-replay',
    title: 'Codex for Faculty and Researchers',
    url: 'https://academy.openai.com/public/clubs/higher-education-05x4z/events/codex-for-faculty-and-researchers-lm708a7oum',
    provider: 'OpenAI Academy',
    audiences: ['researcher'],
    surfaces: ['work', 'codex'],
    level: 'practice',
    format: 'video',
    publishedAt: '2026-06-12',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'Research quality, reproducibility, structured analysis, and accountable human review.',
    recordedBeforeWorkLaunch: true,
  },
  {
    id: 'codex-best-practices',
    title: 'Codex best practices',
    url: 'https://learn.chatgpt.com/guides/best-practices',
    provider: 'OpenAI',
    audiences: ['developer'],
    surfaces: ['codex'],
    level: 'start',
    format: 'docs',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'How to scope, steer, and review work across Codex surfaces.',
  },
  {
    id: 'codex-agents-md',
    title: 'Use AGENTS.md for durable repository instructions',
    url: 'https://learn.chatgpt.com/docs/agent-configuration/agents-md',
    provider: 'OpenAI',
    audiences: ['developer', 'team'],
    surfaces: ['codex'],
    level: 'practice',
    format: 'docs',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The current instruction-file reference for repository-aware Codex work.',
  },
  {
    id: 'codex-bootcamp',
    title: 'Codex Bootcamp',
    url: 'https://academy.openai.com/public/clubs/builders-etkn1/tags/codex-for-builders-6a1f09c4a9f06c84af305c74',
    provider: 'OpenAI Academy',
    audiences: ['developer'],
    surfaces: ['codex'],
    level: 'practice',
    format: 'academy',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The durable Academy hub for the current 101, 201, and 301 builder progression.',
  },
  {
    id: 'codex-fundamentals',
    title: 'Codex Fundamentals for software engineers',
    url: 'https://academy.openai.com/public/clubs/builders-etkn1/videos/codex-for-software-engineers-2026-03-13',
    provider: 'OpenAI Academy',
    audiences: ['developer'],
    surfaces: ['codex'],
    level: 'start',
    format: 'video',
    publishedAt: '2026-03-13',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'replay',
    official: true,
    summary: 'A strong official technical foundation for practical Codex use.',
  },
  {
    id: 'github-codex',
    title: 'openai/codex',
    url: 'https://github.com/openai/codex',
    provider: 'GitHub',
    audiences: ['developer'],
    surfaces: ['codex'],
    level: 'advanced',
    format: 'github',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The official open-source Codex CLI and primary implementation repository.',
    qualitySignals: '102K stars; pushed 2026-07-28; release v0.145.0 published 2026-07-21.',
  },
  {
    id: 'github-plugins',
    title: 'openai/plugins',
    url: 'https://github.com/openai/plugins',
    provider: 'GitHub',
    audiences: ['developer', 'team'],
    surfaces: ['codex'],
    level: 'advanced',
    format: 'github',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The current official catalog of Codex plugin and skill examples.',
    qualitySignals: '4.8K stars; pushed 2026-07-14.',
  },
  {
    id: 'github-cookbook',
    title: 'openai/openai-cookbook',
    url: 'https://github.com/openai/openai-cookbook',
    provider: 'GitHub',
    audiences: ['developer'],
    surfaces: ['api'],
    level: 'advanced',
    format: 'github',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'Official examples and guides for building directly with the OpenAI API.',
    qualitySignals: '75K stars; pushed 2026-07-28.',
  },
  {
    id: 'github-agents-python',
    title: 'openai/openai-agents-python',
    url: 'https://github.com/openai/openai-agents-python',
    provider: 'GitHub',
    audiences: ['developer'],
    surfaces: ['api'],
    level: 'advanced',
    format: 'github',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The official Python SDK for production agent workflows.',
    qualitySignals: '28.2K stars; release v0.19.0 published 2026-07-27.',
  },
  {
    id: 'github-agents-js',
    title: 'openai/openai-agents-js',
    url: 'https://github.com/openai/openai-agents-js',
    provider: 'GitHub',
    audiences: ['developer'],
    surfaces: ['api'],
    level: 'advanced',
    format: 'github',
    lastVerifiedAt: OPENAI_MASTERY_VERIFIED_AT,
    status: 'current',
    official: true,
    summary: 'The official JavaScript and TypeScript SDK for agents and voice workflows.',
    qualitySignals: '3.5K stars; release v0.14.0 published 2026-07-28.',
  },
]

export const openAIUpdates = [
  {
    date: '2026-07-23',
    title: 'Voice and multi-folder projects reached the desktop workflow',
    summary:
      'Voice can coordinate work across Chat, Work, and Codex, while local projects can include multiple related folders.',
    href: 'https://learn.chatgpt.com/docs/whats-new',
  },
  {
    date: '2026-07-21',
    title: 'Codex CLI 0.145 added deeper history and coordination',
    summary:
      'The release expanded thread history, imports, audio support, multi-agent workflows, and Windows behavior.',
    href: 'https://learn.chatgpt.com/docs/changelog',
  },
  {
    date: '2026-07-09',
    title: 'Codex moved into the ChatGPT desktop app',
    summary:
      'Chat, ChatGPT Work, and Codex now live in one desktop app while retaining different interfaces and histories.',
    href: 'https://learn.chatgpt.com/docs/app',
  },
  {
    date: '2026-07-09',
    title: 'ChatGPT Work established the deliverable lane',
    summary:
      'Work can gather context, complete multi-step knowledge work, and create reviewable documents, presentations, spreadsheets, Sites, and other outputs.',
    href: 'https://learn.chatgpt.com/docs/get-started-with-work',
  },
] as const

export function getOpenAIResource(id: string): OpenAIResource {
  const resource = openAIResources.find((item) => item.id === id)
  if (!resource) {
    throw new Error(`Unknown OpenAI resource: ${id}`)
  }
  return resource
}

export function getResourcesForMode(
  surface: Exclude<OpenAISurface, 'api'>,
): OpenAIResource[] {
  const mode = openAIModes.find((item) => item.id === surface)
  if (!mode) return []
  return mode.resourceIds.map(getOpenAIResource)
}
