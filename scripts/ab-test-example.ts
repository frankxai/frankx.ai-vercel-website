/**
 * A/B Test Example Script
 * Demonstrates how to set up and run email A/B tests
 *
 * Usage:
 *   npx tsx scripts/ab-test-example.ts
 */

import {
  selectVariant,
  calculateSignificance,
  checkTestCompletion,
  validateABTest,
  calculateSampleSize,
  estimateTestDuration,
} from '@/lib/email-sequences/ab-testing'
import { ABTest, EmailVariant } from '@/types/ab-testing'

// Example 1: Create A/B test configuration
const exampleTest: ABTest = {
  id: 'test_001',
  name: 'Email Template Redesign',
  description: 'Test dark glass vs white minimal template',

  // Test configuration
  variants: [
    {
      id: 'variant_a',
      name: 'Dark Glass',
      description: 'Brand-aligned glassmorphic template',
      template: 'dark-glass',
      weight: 50,
      impressions: 0,
      createdAt: new Date(),
    },
    {
      id: 'variant_b',
      name: 'White Minimal',
      description: 'Clean white background template',
      template: 'white-minimal',
      weight: 50,
      impressions: 0,
      createdAt: new Date(),
    },
  ],

  primaryMetric: 'click_rate',
  minimumSampleSize: 500,
  minimumDuration: 7,
  confidenceThreshold: 95,

  // Targeting
  segment: {
    type: 'active',
  },

  // Status
  status: 'running',
  startedAt: new Date('2026-02-01'),

  // Metadata
  createdBy: 'frank@frankx.ai',
  createdAt: new Date('2026-02-01'),
  updatedAt: new Date('2026-02-01'),
}

// Example 2: Validate test configuration
console.log('=== A/B Test Validation ===')
const validationErrors = validateABTest(exampleTest)
if (validationErrors.length > 0) {
  console.log('❌ Validation failed:')
  validationErrors.forEach(error => console.log(`  - ${error}`))
} else {
  console.log('✅ Test configuration is valid')
}
console.log()

// Example 3: Variant selection (deterministic)
console.log('=== Variant Selection ===')
const subscribers = ['user_001', 'user_002', 'user_003', 'user_004', 'user_005']
subscribers.forEach(subscriberId => {
  const variant = selectVariant(exampleTest, subscriberId)
  console.log(`${subscriberId} → ${variant.name}`)
})
console.log()

// Verify consistency (same subscriber always gets same variant)
const variant1 = selectVariant(exampleTest, 'user_001')
const variant2 = selectVariant(exampleTest, 'user_001')
console.log(`Consistency check: ${variant1.id === variant2.id ? '✅' : '❌'}`)
console.log()

// Example 4: Sample size calculation
console.log('=== Sample Size Calculation ===')
const sampleSize = calculateSampleSize({
  baselineRate: 0.03, // 3% current click rate
  minimumEffect: 0.01, // Want to detect 1% improvement
  confidence: 95,
  power: 0.8,
})
console.log(`Baseline: 3% click rate`)
console.log(`Target: Detect 1% improvement (3% → 4%)`)
console.log(`Confidence: 95%, Power: 80%`)
console.log(`Required sample size: ${sampleSize} per variant`)
console.log()

// Example 5: Test duration estimation
console.log('=== Test Duration Estimation ===')
const duration = estimateTestDuration({
  sampleSizePerVariant: 500,
  variantCount: 2,
  emailsPerSend: 1000,
  sendsPerWeek: 2,
})
console.log(`Sample needed: 500 per variant (1,000 total)`)
console.log(`List size: 1,000 subscribers`)
console.log(`Send frequency: 2x per week`)
console.log(`Estimated duration: ${duration} days (~${Math.ceil(duration / 7)} weeks)`)
console.log()

// Example 6: Statistical significance calculation
console.log('=== Statistical Significance ===')

// Scenario A: Clear winner
const scenarioA = calculateSignificance({
  metricA: 0.03, // Variant A: 3% click rate
  metricB: 0.05, // Variant B: 5% click rate
  sampleA: 500,
  sampleB: 500,
})
console.log('Scenario A: Clear Winner')
console.log(`  Variant A: 3% (500 samples)`)
console.log(`  Variant B: 5% (500 samples)`)
console.log(`  Z-score: ${scenarioA.zScore}`)
console.log(`  P-value: ${scenarioA.pValue}`)
console.log(`  Confidence: ${scenarioA.confidence}%`)
console.log(`  Significant: ${scenarioA.isSignificant ? '✅' : '❌'}`)
console.log(`  Effect: +${scenarioA.effect * 100}% absolute (${scenarioA.relativeEffect}% relative)`)
console.log()

// Scenario B: Close race
const scenarioB = calculateSignificance({
  metricA: 0.03, // Variant A: 3% click rate
  metricB: 0.035, // Variant B: 3.5% click rate
  sampleA: 500,
  sampleB: 500,
})
console.log('Scenario B: Close Race')
console.log(`  Variant A: 3.0% (500 samples)`)
console.log(`  Variant B: 3.5% (500 samples)`)
console.log(`  Z-score: ${scenarioB.zScore}`)
console.log(`  P-value: ${scenarioB.pValue}`)
console.log(`  Confidence: ${scenarioB.confidence}%`)
console.log(`  Significant: ${scenarioB.isSignificant ? '✅ Yes' : '❌ No - keep testing'}`)
console.log()

// Scenario C: Small sample
const scenarioC = calculateSignificance({
  metricA: 0.03, // Variant A: 3% click rate
  metricB: 0.05, // Variant B: 5% click rate
  sampleA: 100, // Only 100 samples
  sampleB: 100,
})
console.log('Scenario C: Small Sample')
console.log(`  Variant A: 3% (100 samples)`)
console.log(`  Variant B: 5% (100 samples)`)
console.log(`  Z-score: ${scenarioC.zScore}`)
console.log(`  P-value: ${scenarioC.pValue}`)
console.log(`  Confidence: ${scenarioC.confidence}%`)
console.log(`  Significant: ${scenarioC.isSignificant ? '✅' : '❌'}`)
console.log(`  Note: Even with 2% difference, 100 samples may not be enough`)
console.log()

// Example 7: Test completion check
console.log('=== Test Completion Check ===')

// Mock variant metrics (after running test)
const variantMetrics = [
  {
    variantId: 'variant_a',
    variantName: 'Dark Glass',
    delivered: 542,
    clicked: 21,
    clickRate: 0.0387, // 3.87%
  },
  {
    variantId: 'variant_b',
    variantName: 'White Minimal',
    delivered: 538,
    clicked: 32,
    clickRate: 0.0595, // 5.95%
  },
]

const completionCheck = checkTestCompletion({
  test: exampleTest,
  variantMetrics,
})

console.log(`Test complete: ${completionCheck.isComplete ? '✅ Yes' : '⏳ No'}`)
console.log(`Recommendation: ${completionCheck.recommendation}`)
console.log()
console.log('Guardrails:')
console.log(`  ✓ Sample size reached: ${completionCheck.details.sampleSizeReached ? 'Yes' : 'No'}`)
console.log(`  ✓ Duration reached: ${completionCheck.details.durationReached ? 'Yes' : 'No'}`)
console.log(`  ✓ Significance reached: ${completionCheck.details.significanceReached ? 'Yes' : 'No'}`)
console.log(`  ✓ Guardrails passed: ${completionCheck.details.guardrailsPassed ? 'Yes' : 'No'}`)
console.log()

if (completionCheck.winner) {
  console.log(`🏆 Winner: ${completionCheck.winner.name}`)
  console.log(`   Confidence: ${completionCheck.details.confidence?.toFixed(1)}%`)
}

// Example 8: Decision matrix
console.log()
console.log('=== Decision Matrix ===')
console.log('When to use each template:')
console.log()
console.log('Dark Glass:')
console.log('  ✓ Product launches (premium feel)')
console.log('  ✓ Ecosystem updates (brand alignment)')
console.log('  ✓ Mobile-first audience')
console.log('  ✓ Apple Mail heavy list')
console.log()
console.log('White Minimal:')
console.log('  ✓ Long-form articles (readability)')
console.log('  ✓ Technical tutorials (focus on content)')
console.log('  ✓ Desktop-heavy audience')
console.log('  ✓ Gmail heavy list')
console.log()
console.log('Gradient Cards:')
console.log('  ✓ Multi-topic digests (visual separation)')
console.log('  ✓ Curated link roundups')
console.log('  ✓ Design-conscious audience')

// Example 9: Confidence level interpretation
console.log()
console.log('=== Confidence Level Guide ===')
console.log('< 80%:   No clear signal - continue test or abandon')
console.log('80-90%:  Weak signal - extend test or segment analysis')
console.log('90-95%:  Moderate signal - suggestive winner, validate with more data')
console.log('95-99%:  Strong signal - declare winner ✅')
console.log('> 99%:   Very strong signal - high confidence winner ✅✅')

// Example 10: Multi-variant tournament
console.log()
console.log('=== Multi-Variant Tournament Strategy ===')
console.log('Round 1: Exploratory (5 variants × 20% = 100%)')
console.log('  A: Dark Glass')
console.log('  B: White Minimal')
console.log('  C: Gradient Cards')
console.log('  D: Plain Text')
console.log('  E: Image-Heavy')
console.log()
console.log('Action: Eliminate bottom 3, advance top 2')
console.log()
console.log('Round 2: Validation (2 variants × 50% = 100%)')
console.log('  Winner: Dark Glass (50%)')
console.log('  Runner: White Minimal (50%)')
console.log()
console.log('Action: Run until 95% confidence, declare final winner')
