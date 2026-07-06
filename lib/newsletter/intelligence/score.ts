import type { NewsletterExperiment, NewsletterSimulationScore } from './types'

export function calculateVariantScore(score: NewsletterSimulationScore): number {
  return Math.round(
    score.clarity * 0.24 +
      score.trust * 0.22 +
      score.utility * 0.24 +
      score.conversionFit * 0.16 +
      score.retentionFit * 0.14
  )
}

export function rankExperimentVariants(experiment: NewsletterExperiment) {
  return [...experiment.scores]
    .map((score) => ({
      ...score,
      weightedScore: calculateVariantScore(score),
      variant: experiment.variants.find((variant) => variant.id === score.variantId) || null,
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore)
}

export function getExperimentWinner(experiment: NewsletterExperiment) {
  return experiment.variants.find((variant) => variant.id === experiment.decision.winningVariantId) || null
}
