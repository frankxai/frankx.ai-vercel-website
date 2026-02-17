/**
 * A/B Testing Library for Email Sequences
 * Scientific variant testing with statistical analysis
 */

import { ABTest, EmailVariant, StatisticalResult, TestCompletionCheck } from '@/types/ab-testing'

/**
 * Select a variant for a subscriber based on test configuration
 * Uses deterministic assignment (subscriber ID + test ID) for consistency
 *
 * @param test - The A/B test configuration
 * @param subscriberId - Unique subscriber identifier
 * @returns Selected variant
 */
export function selectVariant(
  test: ABTest,
  subscriberId: string
): EmailVariant {
  // Deterministic hash: same subscriber always gets same variant in a test
  const hash = hashString(`${subscriberId}-${test.id}`)
  const bucket = hash % 100 // 0-99

  // Cumulative weight assignment
  let cumulative = 0
  for (const variant of test.variants) {
    cumulative += variant.weight
    if (bucket < cumulative) {
      return variant
    }
  }

  // Fallback to first variant (should never reach here if weights sum to 100)
  return test.variants[0]
}

/**
 * Simple string hash function for deterministic variant assignment
 * Uses DJB2 algorithm for consistent hashing
 */
function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) + hash) + char // hash * 33 + char
  }
  return Math.abs(hash)
}

/**
 * Calculate statistical significance between two variants
 * Uses two-proportion z-test
 *
 * @param variantA - First variant to compare
 * @param variantB - Second variant to compare
 * @param metricA - Metric value for variant A (e.g., click rate)
 * @param metricB - Metric value for variant B
 * @param sampleA - Sample size for variant A
 * @param sampleB - Sample size for variant B
 * @returns Statistical analysis result
 */
export function calculateSignificance(params: {
  metricA: number
  metricB: number
  sampleA: number
  sampleB: number
}): StatisticalResult {
  const { metricA, metricB, sampleA, sampleB } = params

  // Pooled proportion
  const pooled = ((metricA * sampleA) + (metricB * sampleB)) / (sampleA + sampleB)

  // Standard error
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / sampleA + 1 / sampleB))

  // Z-score
  const zScore = se === 0 ? 0 : (metricA - metricB) / se

  // P-value (two-tailed)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))

  // Confidence level
  const confidence = (1 - pValue) * 100

  // Significance (95% threshold)
  const isSignificant = pValue < 0.05

  // Effect sizes
  const effect = Math.abs(metricA - metricB)
  const relativeEffect = metricA === 0 ? 0 : ((metricB - metricA) / metricA) * 100

  return {
    zScore: Math.round(zScore * 100) / 100,
    pValue: Math.round(pValue * 10000) / 10000,
    confidence: Math.round(confidence * 10) / 10,
    isSignificant,
    effect: Math.round(effect * 10000) / 10000,
    relativeEffect: Math.round(relativeEffect * 10) / 10,
  }
}

/**
 * Normal distribution CDF (cumulative distribution function)
 * Approximation for z-score to p-value conversion
 * Uses Abramowitz and Stegun approximation
 */
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

  return z > 0 ? 1 - prob : prob
}

/**
 * Check if A/B test has reached statistical significance
 *
 * @param test - The A/B test configuration
 * @param variantMetrics - Array of variant metrics
 * @returns Completion status and recommendation
 */
export function checkTestCompletion(params: {
  test: ABTest
  variantMetrics: Array<{
    variantId: string
    variantName: string
    delivered: number
    clicked: number
    clickRate: number
  }>
}): TestCompletionCheck {
  const { test, variantMetrics } = params

  if (variantMetrics.length < 2) {
    return {
      isComplete: false,
      recommendation: 'Test needs at least 2 variants',
      details: {
        sampleSizeReached: false,
        durationReached: false,
        significanceReached: false,
        guardrailsPassed: false,
      },
    }
  }

  // Check minimum sample size
  const allReachedSampleSize = variantMetrics.every(
    v => v.delivered >= test.minimumSampleSize
  )

  if (!allReachedSampleSize) {
    const minDelivered = Math.min(...variantMetrics.map(v => v.delivered))
    return {
      isComplete: false,
      recommendation: `Continue test. Need ${test.minimumSampleSize} per variant, currently at ${minDelivered}`,
      details: {
        sampleSizeReached: false,
        durationReached: true, // Assume duration check is done elsewhere
        significanceReached: false,
        guardrailsPassed: true,
      },
    }
  }

  // Check minimum duration (if startedAt is set)
  const daysSinceStart = test.startedAt
    ? (Date.now() - test.startedAt.getTime()) / (1000 * 60 * 60 * 24)
    : test.minimumDuration // Assume met if not started yet

  if (daysSinceStart < test.minimumDuration) {
    return {
      isComplete: false,
      recommendation: `Continue test. Need ${test.minimumDuration} days, currently at ${Math.floor(daysSinceStart)} days`,
      details: {
        sampleSizeReached: true,
        durationReached: false,
        significanceReached: false,
        guardrailsPassed: true,
      },
    }
  }

  // Find best performing variant
  const sortedVariants = [...variantMetrics].sort((a, b) => b.clickRate - a.clickRate)
  const topVariant = sortedVariants[0]
  const runnerUp = sortedVariants[1]

  // Check if top variant is significantly better than runner-up
  const significance = calculateSignificance({
    metricA: topVariant.clickRate,
    metricB: runnerUp.clickRate,
    sampleA: topVariant.delivered,
    sampleB: runnerUp.delivered,
  })

  if (significance.isSignificant && significance.confidence >= test.confidenceThreshold) {
    return {
      isComplete: true,
      winner: test.variants.find(v => v.id === topVariant.variantId),
      recommendation: `Declare winner: ${topVariant.variantName} with ${(topVariant.clickRate * 100).toFixed(2)}% click rate vs ${(runnerUp.clickRate * 100).toFixed(2)}% (${significance.confidence.toFixed(1)}% confidence)`,
      details: {
        sampleSizeReached: true,
        durationReached: true,
        significanceReached: true,
        guardrailsPassed: true,
        topVariant: topVariant.variantName,
        confidence: significance.confidence,
      },
    }
  }

  return {
    isComplete: false,
    recommendation: `Continue test. Top variant (${topVariant.variantName}) not significantly better than runner-up (${significance.confidence.toFixed(1)}% confidence, need ${test.confidenceThreshold}%)`,
    details: {
      sampleSizeReached: true,
      durationReached: true,
      significanceReached: false,
      guardrailsPassed: true,
      topVariant: topVariant.variantName,
      confidence: significance.confidence,
    },
  }
}

/**
 * Validate A/B test configuration
 *
 * @param test - Test configuration to validate
 * @returns Validation errors (empty array if valid)
 */
export function validateABTest(test: Partial<ABTest>): string[] {
  const errors: string[] = []

  // Validate variants
  if (!test.variants || test.variants.length < 2) {
    errors.push('Test must have at least 2 variants')
  }

  if (test.variants) {
    // Check weights sum to 100
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0)
    if (totalWeight !== 100) {
      errors.push(`Variant weights must sum to 100, currently ${totalWeight}`)
    }

    // Check for duplicate names
    const names = test.variants.map(v => v.name)
    const uniqueNames = new Set(names)
    if (names.length !== uniqueNames.size) {
      errors.push('Variant names must be unique')
    }

    // Check for valid templates
    test.variants.forEach(v => {
      if (!v.template || v.template.trim() === '') {
        errors.push(`Variant "${v.name}" has no template`)
      }
    })
  }

  // Validate sample size
  if (!test.minimumSampleSize || test.minimumSampleSize < 100) {
    errors.push('Minimum sample size should be at least 100 per variant')
  }

  // Validate duration
  if (!test.minimumDuration || test.minimumDuration < 1) {
    errors.push('Minimum duration should be at least 1 day')
  }

  // Validate confidence threshold
  if (test.confidenceThreshold && ![90, 95, 99].includes(test.confidenceThreshold)) {
    errors.push('Confidence threshold must be 90, 95, or 99')
  }

  return errors
}

/**
 * Calculate required sample size for A/B test
 * Based on baseline rate and minimum detectable effect
 *
 * @param baselineRate - Current conversion rate (e.g., 0.03 for 3%)
 * @param minimumEffect - Minimum improvement to detect (e.g., 0.01 for 1%)
 * @param confidence - Confidence level (90, 95, or 99)
 * @param power - Statistical power (typically 0.8)
 * @returns Required sample size per variant
 */
export function calculateSampleSize(params: {
  baselineRate: number
  minimumEffect: number
  confidence?: 90 | 95 | 99
  power?: number
}): number {
  const { baselineRate, minimumEffect, confidence = 95, power = 0.8 } = params

  // Z-scores for confidence levels
  const zAlpha = {
    90: 1.645,
    95: 1.96,
    99: 2.576,
  }[confidence]

  // Z-score for power (typically 0.84 for 80% power)
  const zBeta = power === 0.8 ? 0.84 : 1.28 // 0.9 power = 1.28

  // Effect size
  const p1 = baselineRate
  const p2 = baselineRate + minimumEffect

  // Sample size formula
  const numerator = 2 * Math.pow(zAlpha + zBeta, 2) * p1 * (1 - p1)
  const denominator = Math.pow(p2 - p1, 2)

  return Math.ceil(numerator / denominator)
}

/**
 * Estimate test duration based on email send frequency
 *
 * @param sampleSizePerVariant - Required sample size per variant
 * @param variantCount - Number of variants
 * @param emailsPerSend - Subscribers per email send
 * @param sendsPerWeek - Frequency of email sends
 * @returns Estimated days to complete test
 */
export function estimateTestDuration(params: {
  sampleSizePerVariant: number
  variantCount: number
  emailsPerSend: number
  sendsPerWeek: number
}): number {
  const { sampleSizePerVariant, variantCount, emailsPerSend, sendsPerWeek } = params

  const totalSampleNeeded = sampleSizePerVariant * variantCount
  const subscribersPerWeek = emailsPerSend * sendsPerWeek
  const weeksNeeded = totalSampleNeeded / subscribersPerWeek
  const daysNeeded = Math.ceil(weeksNeeded * 7)

  return daysNeeded
}
