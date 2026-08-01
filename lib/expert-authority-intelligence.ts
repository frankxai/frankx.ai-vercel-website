import { kv } from '@vercel/kv'

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

const KEYS = {
  responses: 'expert-authority:responses:v1',
  total: 'expert-authority:response-count:v1',
  stages: 'expert-authority:stage-counts:v1',
  constraints: 'expert-authority:constraint-counts:v1',
  scoreSums: 'expert-authority:engine-score-sums:v1',
  foundingInterest: 'expert-authority:founding-interest-count:v1',
  updatedAt: 'expert-authority:updated-at:v1',
} as const

function normalizeHash(value: Record<string, unknown> | null) {
  return Object.fromEntries(
    Object.entries(value ?? {}).map(([key, count]) => [key, Number(count) || 0])
  )
}

/**
 * Persist only anonymized diagnostic evidence. Names and email addresses stay
 * in Resend and the operator inbox; they are intentionally excluded here.
 */
export async function recordExpertAuthoritySignal(
  input: Omit<ExpertAuthoritySignal, 'id' | 'capturedAt'>
) {
  const signal: ExpertAuthoritySignal = {
    ...input,
    id: crypto.randomUUID(),
    capturedAt: new Date().toISOString(),
  }

  const transaction = kv.multi()
  transaction.lpush(KEYS.responses, JSON.stringify(signal))
  transaction.ltrim(KEYS.responses, 0, 999)
  transaction.incr(KEYS.total)
  transaction.hincrby(KEYS.stages, signal.stage, 1)
  transaction.hincrby(KEYS.constraints, signal.weakestEngine, 1)
  transaction.set(KEYS.updatedAt, signal.capturedAt)

  if (signal.foundingInterest) {
    transaction.incr(KEYS.foundingInterest)
  }

  for (const key of expertAuthorityEngineKeys) {
    transaction.hincrby(KEYS.scoreSums, key, signal.answers[key])
  }

  await transaction.exec()
  return signal.id
}

export async function getExpertAuthoritySnapshot(): Promise<ExpertAuthoritySnapshot> {
  const [totalValue, stagesValue, constraintsValue, scoreSumsValue, foundingValue, updatedAtValue] =
    await Promise.all([
      kv.get<number>(KEYS.total),
      kv.hgetall<Record<string, unknown>>(KEYS.stages),
      kv.hgetall<Record<string, unknown>>(KEYS.constraints),
      kv.hgetall<Record<string, unknown>>(KEYS.scoreSums),
      kv.get<number>(KEYS.foundingInterest),
      kv.get<string>(KEYS.updatedAt),
    ])

  const total = Number(totalValue) || 0
  const scoreSums = normalizeHash(scoreSumsValue)
  const averageScores = Object.fromEntries(
    expertAuthorityEngineKeys.map((key) => [
      key,
      total > 0 ? Number(((scoreSums[key] ?? 0) / total).toFixed(2)) : 0,
    ])
  ) as Record<ExpertAuthorityEngineKey, number>

  return {
    total,
    stages: normalizeHash(stagesValue),
    constraints: normalizeHash(constraintsValue),
    averageScores,
    foundingInterest: Number(foundingValue) || 0,
    updatedAt: updatedAtValue || new Date(0).toISOString(),
  }
}
