export const founderLayers = [
  {
    key: 'state',
    number: '01',
    name: 'State',
    short: 'Capacity before intensity',
    description:
      'Attention, energy, emotional range, and the ability to make consequential decisions without borrowing from tomorrow.',
    action:
      'Protect one daily recovery block, remove one avoidable source of cognitive noise, and name the decision that keeps returning.',
    primaryHref: '/human-layer',
    primaryLabel: 'Strengthen the Human Layer',
  },
  {
    key: 'signal',
    number: '02',
    name: 'Signal',
    short: 'A market can repeat your value',
    description:
      'Positioning, customer truth, founder voice, and a clear reason for the right people to pay attention now.',
    action:
      'Write one sentence that names the founder you serve, the expensive problem, and the result your work makes possible.',
    primaryHref: '/founder-signal',
    primaryLabel: 'Run the Founder Signal Scan',
  },
  {
    key: 'systems',
    number: '03',
    name: 'Systems',
    short: 'The work survives repetition',
    description:
      'Delivery, AI architecture, operating rhythm, memory, and quality controls that turn effort into a dependable capability.',
    action:
      'Choose the workflow that repeats most often and document its inputs, decision points, quality check, and handoff.',
    primaryHref: '/foundry',
    primaryLabel: 'Explore the Foundry',
  },
  {
    key: 'scale',
    number: '04',
    name: 'Scale',
    short: 'Distribution compounds the work',
    description:
      'Offers, distribution, reusable IP, and leverage that grow reach without making the founder the bottleneck in every loop.',
    action:
      'Turn one repeated founder explanation into an owned asset that can teach, qualify, or deliver without another meeting.',
    primaryHref: '/gencreator',
    primaryLabel: 'Build a Distribution Asset',
  },
  {
    key: 'stewardship',
    number: '05',
    name: 'Stewardship',
    short: 'Growth remains worth owning',
    description:
      'Judgment, boundaries, ownership, relationships, and the standards that keep the company useful as its reach increases.',
    action:
      'Write the boundary you will not trade for speed, then add it to the next product, hiring, or partnership decision.',
    primaryHref: '/founders-circle',
    primaryLabel: "Explore Founder's Circle",
  },
] as const

export type FounderLayerKey = (typeof founderLayers)[number]['key']

export const founderStackQuestions = [
  {
    id: 'state-clarity',
    layer: 'state',
    prompt: 'I can identify the one decision that matters most this week.',
  },
  {
    id: 'state-capacity',
    layer: 'state',
    prompt:
      'My current operating rhythm leaves enough capacity for clear judgment.',
  },
  {
    id: 'signal-positioning',
    layer: 'signal',
    prompt:
      'The right customer can quickly explain what I do and why it matters.',
  },
  {
    id: 'signal-voice',
    layer: 'signal',
    prompt:
      'My public work sounds like a founder with a point of view, not a category template.',
  },
  {
    id: 'systems-repeatability',
    layer: 'systems',
    prompt:
      'Our most important work follows a repeatable process with a visible quality check.',
  },
  {
    id: 'systems-memory',
    layer: 'systems',
    prompt:
      'Decisions, customer learning, and operating knowledge remain usable after the week ends.',
  },
  {
    id: 'scale-offer',
    layer: 'scale',
    prompt:
      'My offer turns a specific founder problem into a clear paid result.',
  },
  {
    id: 'scale-distribution',
    layer: 'scale',
    prompt:
      'At least one distribution loop compounds without requiring a fresh launch every time.',
  },
  {
    id: 'stewardship-boundaries',
    layer: 'stewardship',
    prompt:
      'I have written boundaries for the opportunities, clients, and growth I will decline.',
  },
  {
    id: 'stewardship-ownership',
    layer: 'stewardship',
    prompt:
      'The company is becoming more durable without becoming less aligned with why I founded it.',
  },
] as const satisfies ReadonlyArray<{
  id: string
  layer: FounderLayerKey
  prompt: string
}>

export type FounderStackQuestionId =
  (typeof founderStackQuestions)[number]['id']
export type FounderStackAnswers = Partial<
  Record<FounderStackQuestionId, number>
>

export const founderStackScale = [
  { value: 1, label: 'Not true yet' },
  { value: 2, label: 'Rarely true' },
  { value: 3, label: 'Sometimes true' },
  { value: 4, label: 'Usually true' },
  { value: 5, label: 'Consistently true' },
] as const

export type FounderLayerScore = {
  key: FounderLayerKey
  name: string
  score: number
}

export type FounderLayer = (typeof founderLayers)[number]

export type FounderStackResult = {
  overall: number
  phase: 'Stabilize' | 'Clarify' | 'Systemize' | 'Compound'
  scores: FounderLayerScore[]
  constraint: FounderLayer | null
  tiedConstraints: FounderLayer[]
}

export function scoreFounderStack(
  answers: FounderStackAnswers,
): FounderStackResult {
  const scores = founderLayers.map((layer) => {
    const questions = founderStackQuestions.filter(
      (question) => question.layer === layer.key,
    )
    const values = questions.map((question) => answers[question.id] ?? 0)
    const average =
      values.reduce((total, value) => total + value, 0) / values.length

    return {
      key: layer.key,
      name: layer.name,
      score: Math.round((average / 5) * 100),
    }
  })

  const overall = Math.round(
    scores.reduce((total, layer) => total + layer.score, 0) / scores.length,
  )
  const lowestScore = Math.min(...scores.map((layer) => layer.score))
  const lowestKeys = new Set(
    scores
      .filter((layer) => layer.score === lowestScore)
      .map((layer) => layer.key),
  )
  const tiedConstraints = founderLayers.filter((layer) =>
    lowestKeys.has(layer.key),
  )
  const constraint =
    tiedConstraints.length === 1 ? tiedConstraints[0] : null
  const phase =
    overall < 40
      ? 'Stabilize'
      : overall < 60
        ? 'Clarify'
        : overall < 76
          ? 'Systemize'
          : 'Compound'

  return { overall, phase, scores, constraint, tiedConstraints }
}
