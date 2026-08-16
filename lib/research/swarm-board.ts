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
    job: 'Still-life and quiet interior images',
    architecture:
      'Separate image backend from the text model. Inspect count and on/off states. Save files from magic bytes.',
    primary: 'Grok Imagine (runtime grok-imagine-image)',
    alternate: 'Nano Banana / GPT Image / FAL — HOLD until a valid key returns pixels',
    doNot: 'Do not write “Grok 4.6 generated this image.”',
    evidence: 'first-party',
    evidenceNote: 'Locked three-prompt bake-off 15 Aug 2026. n=1. Quality config id was not the runtime model.',
    href: '/research/image-generation-bakeoff',
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
    a: 'No. Grok 4.6 is the reasoning model. Images in the bake-off came from the separate Grok Imagine backend. The Hermes tool reported grok-imagine-image, not the configured quality id.',
  },
  {
    q: 'Who wrote the Grok 4.6 brief and this hub update?',
    a: 'Hermes default on Grok 4.6 drafted the packet and this board. Claude Code ran a read-only review of the publish path (no n8n, arena stays receipt-gated). Frank remains the human publish gate.',
  },
]
