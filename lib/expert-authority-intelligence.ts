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

const constraintByEngine: Record<ExpertAuthorityEngineKey, ExpertAuthorityConstraint> = {
  expert: 'Expert Intelligence',
  audience: 'Audience Intelligence',
  authority: 'Authority Engine',
  product: 'Product Intelligence',
  funnel: 'Funnel Intelligence',
}

export function isExpertAuthorityAnswers(value: unknown): value is ExpertAuthorityAnswers {
  if (!value || typeof value !== 'object') return false

  return expertAuthorityEngineKeys.every((key) => {
    const score = (value as Record<string, unknown>)[key]
    return typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 4
  })
}

/**
 * Derive every diagnostic label from the submitted answer vector. Client copy
 * is never trusted as a source for scoring, segmentation, or operator email.
 */
export function deriveExpertAuthorityResult(answers: ExpertAuthorityAnswers) {
  const score = expertAuthorityEngineKeys.reduce((total, key) => total + answers[key], 0)
  const weakestKey = expertAuthorityEngineKeys.reduce((weakest, key) =>
    answers[key] < answers[weakest] ? key : weakest
  )

  const stage: ExpertAuthorityStage =
    score <= 5
      ? 'Hidden Expert'
      : score <= 10
        ? 'Emerging Authority'
        : score <= 15
          ? 'Market Machine'
          : 'Intelligence Operator'

  return {
    score,
    stage,
    weakestEngine: constraintByEngine[weakestKey],
  }
}
