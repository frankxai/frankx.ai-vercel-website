import { list, put } from '@vercel/blob'

export const expertAuthorityEngineKeys = [
  'expert',
  'audience',
  'authority',
  'product',
  'funnel',
] as const

export const expertAuthorityStages = [
  'Hidden Expert',
  'Emerging Authority',
  'Market Machine',
  'Intelligence Operator',
] as const

export const expertAuthorityConstraints = [
  'Expert Intelligence',
  'Audience Intelligence',
  'Authority Engine',
  'Product Intelligence',
  'Funnel Intelligence',
] as const

export type ExpertAuthorityEngineKey = (typeof expertAuthorityEngineKeys)[number]
export type ExpertAuthorityStage = (typeof expertAuthorityStages)[number]
export type ExpertAuthorityConstraint = (typeof expertAuthorityConstraints)[number]
export type ExpertAuthorityAnswers = Record<ExpertAuthorityEngineKey, number>

export type ExpertAuthoritySignal = {
  id: string
  capturedAt: string
  score: number
  stage: ExpertAuthorityStage
  weakestEngine: ExpertAuthorityConstraint
  foundingInterest: boolean
  answers: ExpertAuthorityAnswers
  source: string
}

export type ExpertAuthoritySnapshot = {
  total: number
  stages: Record<string, number>
  constraints: Record<string, number>
  averageScores: Record<ExpertAuthorityEngineKey, number>
  foundingInterest: number
  updatedAt: string
}

const SIGNAL_PREFIX = 'intelligence/expert-authority/responses/v1/'
const MAX_SIGNALS = 1000

function emptySnapshot(): ExpertAuthoritySnapshot {
  return {
    total: 0,
    stages: Object.fromEntries(expertAuthorityStages.map((stage) => [stage, 0])),
    constraints: Object.fromEntries(
      expertAuthorityConstraints.map((constraint) => [constraint, 0])
    ),
    averageScores: Object.fromEntries(
      expertAuthorityEngineKeys.map((key) => [key, 0])
    ) as Record<ExpertAuthorityEngineKey, number>,
    foundingInterest: 0,
    updatedAt: new Date(0).toISOString(),
  }
}

function isSignal(value: unknown): value is ExpertAuthoritySignal {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<ExpertAuthoritySignal>
  return Boolean(
    typeof candidate.id === 'string' &&
      typeof candidate.capturedAt === 'string' &&
      typeof candidate.score === 'number' &&
      expertAuthorityStages.includes(candidate.stage as ExpertAuthorityStage) &&
      expertAuthorityConstraints.includes(
        candidate.weakestEngine as ExpertAuthorityConstraint
      ) &&
      typeof candidate.foundingInterest === 'boolean' &&
      candidate.answers &&
      expertAuthorityEngineKeys.every(
        (key) =>
          typeof candidate.answers?.[key] === 'number' &&
          Number.isInteger(candidate.answers[key]) &&
          candidate.answers[key] >= 0 &&
          candidate.answers[key] <= 4
      ) &&
      typeof candidate.source === 'string'
  )
}

/**
 * Persist only anonymized diagnostic evidence. Names and email addresses stay
 * in Resend and the operator inbox; they are intentionally excluded here.
 *
 * Every response is an immutable Blob event. This append-only shape avoids
 * counter races and preserves the evidence needed to recompute any aggregate.
 */
export async function recordExpertAuthoritySignal(
  input: Omit<ExpertAuthoritySignal, 'id' | 'capturedAt'>
) {
  const signal: ExpertAuthoritySignal = {
    ...input,
    id: crypto.randomUUID(),
    capturedAt: new Date().toISOString(),
  }

  const sortableTimestamp = signal.capturedAt.replaceAll(':', '-').replaceAll('.', '-')
  await put(
    `${SIGNAL_PREFIX}${sortableTimestamp}-${signal.id}.json`,
    JSON.stringify(signal),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
    }
  )

  return signal.id
}

async function loadSignals(): Promise<ExpertAuthoritySignal[]> {
  const result = await list({ prefix: SIGNAL_PREFIX, limit: MAX_SIGNALS })
  const responses = await Promise.all(
    result.blobs.map(async (blob) => {
      try {
        const response = await fetch(blob.url, { cache: 'no-store' })
        if (!response.ok) return null
        const value: unknown = await response.json()
        return isSignal(value) ? value : null
      } catch (error) {
        console.error(`Unable to read Expert Authority signal ${blob.pathname}:`, error)
        return null
      }
    })
  )

  return responses.filter((signal): signal is ExpertAuthoritySignal => signal !== null)
}

export async function getExpertAuthoritySnapshot(): Promise<ExpertAuthoritySnapshot> {
  const signals = await loadSignals()
  if (signals.length === 0) return emptySnapshot()

  const snapshot = emptySnapshot()
  const scoreSums = Object.fromEntries(
    expertAuthorityEngineKeys.map((key) => [key, 0])
  ) as Record<ExpertAuthorityEngineKey, number>

  for (const signal of signals) {
    snapshot.total += 1
    snapshot.stages[signal.stage] = (snapshot.stages[signal.stage] ?? 0) + 1
    snapshot.constraints[signal.weakestEngine] =
      (snapshot.constraints[signal.weakestEngine] ?? 0) + 1

    if (signal.foundingInterest) snapshot.foundingInterest += 1

    for (const key of expertAuthorityEngineKeys) {
      scoreSums[key] += signal.answers[key]
    }

    if (signal.capturedAt > snapshot.updatedAt) {
      snapshot.updatedAt = signal.capturedAt
    }
  }

  snapshot.averageScores = Object.fromEntries(
    expertAuthorityEngineKeys.map((key) => [
      key,
      Number((scoreSums[key] / snapshot.total).toFixed(2)),
    ])
  ) as Record<ExpertAuthorityEngineKey, number>

  return snapshot
}
