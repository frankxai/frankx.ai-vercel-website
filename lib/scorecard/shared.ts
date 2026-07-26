// Generic, pure, dependency-free scoring primitives shared by every
// scorecard/assessment product (Operator Scorecard, AI CoE Readiness
// Assessment, and any future one). Extracted from lib/scorecard/engine.ts
// once a second concrete product needed the same scoring arithmetic —
// dimension tallying, percent-of-max, tier resolution, and "lowest-scoring
// dimension" ceiling selection. Each product still owns its own content
// (dimensions, questions, tier copy, ceiling copy) and its own richer types;
// this file only holds the math that is identical across all of them.
//
// No framework imports — importable from Next.js client components and
// directly from node:test via --experimental-strip-types.

export interface ScoredOption {
  id: string
  points: number
}

export interface ScorableQuestion<D extends string> {
  id: string
  dimension: D
  options: ScoredOption[]
}

export interface DimensionScore<D extends string> {
  dimension: D
  label: string
  raw: number
  max: number
  pct: number
}

export interface ScoreTally<D extends string> {
  dimensionScores: DimensionScore<D>[]
  totalRaw: number
  totalMax: number
  /** 0-100, rounded. */
  totalScore: number
}

/**
 * Tallies raw/max/pct per dimension and the overall 0-100 score from a
 * completed (or partial) answer set. `answers` maps questionId -> optionId.
 * Unanswered or unrecognized options score 0 — never throws.
 */
export function tallyScores<D extends string>(
  dimensions: { id: D; label: string }[],
  questions: ScorableQuestion<D>[],
  answers: Record<string, string>,
): ScoreTally<D> {
  const byDimension = new Map<D, { raw: number; max: number }>()
  for (const dim of dimensions) byDimension.set(dim.id, { raw: 0, max: 0 })

  let totalRaw = 0
  let totalMax = 0

  for (const question of questions) {
    const bucket = byDimension.get(question.dimension)
    if (!bucket) continue
    const maxPoints = question.options.reduce((max, o) => Math.max(max, o.points), 0)
    bucket.max += maxPoints
    totalMax += maxPoints

    const chosenId = answers[question.id]
    const option = question.options.find((o) => o.id === chosenId)
    const points = option?.points ?? 0
    bucket.raw += points
    totalRaw += points
  }

  const dimensionScores: DimensionScore<D>[] = dimensions.map((dim) => {
    const bucket = byDimension.get(dim.id)!
    return {
      dimension: dim.id,
      label: dim.label,
      raw: bucket.raw,
      max: bucket.max,
      pct: bucket.max === 0 ? 0 : Math.round((bucket.raw / bucket.max) * 100),
    }
  })

  const totalScore = totalMax === 0 ? 0 : Math.round((totalRaw / totalMax) * 100)

  return { dimensionScores, totalRaw, totalMax, totalScore }
}

/**
 * Resolves the highest tier whose `minScore` the score satisfies. Tiers need
 * not be pre-sorted. Assumes at least one tier has `minScore === 0` (or
 * lower) so every score resolves to something.
 */
export function resolveTier<T extends { minScore: number }>(tiers: T[], score: number): T {
  let match = tiers[0]
  for (const tier of tiers) {
    if (score >= tier.minScore) match = tier
  }
  return match
}

/**
 * Picks the lowest-scoring dimension — the single named ceiling. Ties break
 * toward whichever dimension appears first in `dimensionScores` (i.e. first
 * in the product's declared dimension order), so each product controls its
 * own tie-break priority simply by how it orders its DIMENSIONS array.
 */
export function lowestScoringDimension<D extends string>(dimensionScores: DimensionScore<D>[]): D {
  let lowest = dimensionScores[0]
  for (const d of dimensionScores) {
    if (d.pct < lowest.pct) lowest = d
  }
  return lowest.dimension
}
