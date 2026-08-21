export type EvidenceKind = 'first-party' | 'vendor-claim' | 'independent-composite' | 'not-run'

export type SwarmRecommendation = {
  job: string
  architecture: string
  primary: string
  alternate: string
  doNot: string
  evidence: EvidenceKind
  evidenceNote: string
  href: string
}

export type FlagshipModel = {
  id: string
  name: string
  job: string
  architecture: string
  evidence: EvidenceKind
  note: string
  href: string
  status: 'ga' | 'previous' | 'preview'
}

export const SWARM_BOARD_AS_OF = '2026-08-16'

export const swarmRecommendations: SwarmRecommendation[] = [
  {
    job: 'Long-running coding and knowledge agents',
    architecture:
      'One reasoning model with tools, verification loops, and a human publish gate. Do not swap the model mid-task.',
    primary: 'Grok 4.6',
    alternate: 'Claude Opus / Fable 5 when the task is long-horizon and cost is secondary',
    doNot: 'Do not treat Artificial Analysis Index ties as a “win.”',
    evidence: 'independent-composite',
    evidenceNote: 'AA Intelligence Index 61 for Grok 4.6 (vendor + AA, 12 Aug 2026). No SIS arena receipt for Grok.',
    href: '/research/grok-4-6',
  },
  {
    job: 'Receipt-gated model battles',
    architecture:
      'Dispatch only models the Starlight arena harness can pin. Publish JSON or do not publish a winner.',
    primary: 'Claude Fable / Opus / Sonnet / Haiku',
    alternate: 'Hold Grok, GPT, and Gemini until the harness can write a receipt',
    doNot: 'Do not invent a Grok 4.6 arena winner from vendor benches.',
    evidence: 'first-party',
    evidenceNote: 'SIS tools/arena is Claude Code Agent-native. Existing /research/model-arena cards are those receipts.',
    href: '/research/model-arena',
  },
  {
    job: 'Quiet product still-life',
    architecture:
      'Use a native image tool already in the session. Inspect the pixels. Show only frames that pass QA.',
    primary: 'Grok Imagine, Codex image_gen, or Antigravity generate_image',
    alternate: 'Pick the CLI you are already in',
    doNot: 'Do not route this work through FAL. Do not publish missed briefs.',
    evidence: 'first-party',
    evidenceNote: 'Same prompt, 16 Aug 2026. All three returned a publishable still-life. Quality id still did not appear in the Grok tool result. Video not run.',
    href: '/blog/grok-imagine-bakeoff-2026',
  },
  {
    job: 'Catalog, price, and compare closed models',
    architecture:
      'Keep a registry with live pricing and compare pages. Routing rows must name evidence kind.',
    primary: 'LLM Hub / AI Ops models catalog',
    alternate: 'Dated analysis posts when a flagship ships',
    doNot: 'Do not dump vendor tables onto Arcanea or starlightintelligence.org.',
    evidence: 'vendor-claim',
    evidenceNote: 'Hub registry plus /llm-hub/compare/grok-4-6-vs-grok-4-3. Prices are vendor list.',
    href: '/llm-hub',
  },
  {
    job: 'Lowest-cost closed frontier chat',
    architecture: 'Prefer the cheaper prior Grok when 500k context and agent stamina are not required.',
    primary: 'Grok 4.3',
    alternate: 'Grok 4.6 when the task is long-running',
    doNot: 'Do not retire 4.3 solely because 4.6 exists.',
    evidence: 'vendor-claim',
    evidenceNote: 'Existing hub routing: 4.3 remains the cheap closed-frontier row.',
    href: '/blog/grok-4-3-analysis-2026',
  },
]

export const flagshipModels: FlagshipModel[] = [
  {
    id: 'grok-4-6',
    name: 'Grok 4.6',
    job: 'Long-running agents at mid price',
    architecture: 'Post-training / agent RL refresh. 500k context.',
    evidence: 'independent-composite',
    note: 'AA Index 61 (vendor + AA, 12 Aug 2026). No SIS arena receipt.',
    href: '/research/grok-4-6',
    status: 'ga',
  },
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    job: 'Receipt-gated arena + long-horizon Claude work',
    architecture: '1M context. SIS arena can pin Fable. Use when the harness must write a JSON receipt.',
    evidence: 'first-party',
    note: 'Model Arena cards are Claude Code Agent receipts. Launch benches remain vendor-claim.',
    href: '/research/model-arena',
    status: 'ga',
  },
  {
    id: 'claude-opus-4-8',
    name: 'Claude Opus 4.8',
    job: 'Cost-secondary coding and knowledge work',
    architecture: '1M context. Point release after 4.7. Registry notes $5/$25 unchanged.',
    evidence: 'vendor-claim',
    note: 'From the in-repo model registry. Not re-benchmarked in this wave.',
    href: '/llm-hub',
    status: 'ga',
  },
  {
    id: 'gpt-5-5',
    name: 'GPT-5.5',
    job: 'Long-context OpenAI agents',
    architecture: '1M context. Registry: agentic/long-context step; narrow terminal-agent edge claimed by vendor.',
    evidence: 'vendor-claim',
    note: 'No first-party SIS receipt in this wave.',
    href: '/llm-hub',
    status: 'ga',
  },
  {
    id: 'gemini-3-5-flash',
    name: 'Gemini 3.5 Flash',
    job: 'Shipped Google 3.5 line',
    architecture: '1M context. Flash is the GA 3.5 model. Pro remains preview in the registry.',
    evidence: 'vendor-claim',
    note: 'Antigravity generate_image is a separate native image path, not this text model.',
    href: '/llm-hub',
    status: 'ga',
  },
  {
    id: 'grok-4-3',
    name: 'Grok 4.3',
    job: 'Cheaper closed-frontier chat',
    architecture: '1M context. Keep when 4.6 agent stamina is not required.',
    evidence: 'vendor-claim',
    note: 'Previous xAI flagship. Do not retire it only because 4.6 exists.',
    href: '/blog/grok-4-3-analysis-2026',
    status: 'previous',
  },
]

export const hubFaqs = [
  {
    q: 'How does the FrankX swarm pick a model?',
    a: 'By job and architecture, not by a single leaderboard. A recommendation names the primary model, an alternate, what not to do, and the evidence kind: first-party, vendor-claim, independent composite, or not-run.',
  },
  {
    q: 'Did you run Grok 4.6 against Claude in Model Arena?',
    a: 'No. Model Arena only publishes SIS JSON receipts. The current harness dispatches Claude Code Agent models. Vendor and Artificial Analysis scores for Grok 4.6 stay labeled and live on /research/grok-4-6.',
  },
  {
    q: 'Is Grok Imagine the same as Grok 4.6?',
    a: 'No. Grok 4.6 is the reasoning model. Still-lifes came from Grok Imagine, Codex image_gen, and Antigravity generate_image.',
  },
  {
    q: 'Who wrote the Grok 4.6 brief and this hub update?',
    a: 'Hermes default on Grok 4.6 drafted the packet and this board. Claude Code ran a read-only review of the publish path (no n8n, arena stays receipt-gated). Frank remains the human publish gate.',
  },
  {
    q: 'Which flagship should I start with?',
    a: 'Match the job. Long-running mid-price agents: Grok 4.6. Receipt-gated battles: Claude Fable or Opus via Model Arena. Cheap closed chat: Grok 4.3. Google 3.5 that shipped: Gemini 3.5 Flash. GPT-5.5 stays vendor-claim until we run it.',
  },
]
