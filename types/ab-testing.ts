/**
 * A/B Testing Framework Types
 * Scientific email variant testing for FrankX
 */

export type ABTestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'archived'
export type ABTestMetricType = 'click_rate' | 'open_rate' | 'unsubscribe_rate' | 'reply_rate' | 'conversion_rate'
export type ABTestSegmentType = 'all' | 'new' | 'active' | 'dormant' | 'custom'

/**
 * Email variant configuration
 * Each variant represents a different email design/content approach
 */
export interface EmailVariant {
  id: string
  name: string
  description?: string
  template: string // Template ID or component name (e.g., 'dark-glass', 'white-minimal')
  weight: number // 0-100, must sum to 100 across all variants in a test
  impressions: number // Times sent
  createdAt: Date
}

/**
 * Variant performance metrics
 * Tracks all engagement and negative signals
 */
export interface ABTestMetrics {
  // Primary metrics
  delivered: number
  opened: number
  clicked: number

  // Secondary metrics
  unsubscribed: number
  replied: number
  spamReports: number

  // Calculated rates
  openRate: number // opened / delivered
  clickRate: number // clicked / delivered
  unsubscribeRate: number // unsubscribed / delivered
  replyRate: number // replied / delivered

  // Breakdown
  deviceBreakdown?: {
    mobile: number
    desktop: number
    tablet: number
    unknown: number
  }

  clientBreakdown?: {
    appleMail: number
    gmail: number
    outlook: number
    other: number
  }
}

/**
 * Variant with performance data
 * Used for analytics and reporting
 */
export interface VariantPerformance extends EmailVariant {
  metrics: ABTestMetrics
  lastUpdated: Date
}

/**
 * Statistical analysis result
 * Compares two variants for significance
 */
export interface StatisticalResult {
  zScore: number // Test statistic for two-proportion z-test
  pValue: number // Probability of observing this result by chance
  confidence: number // 0-100 (e.g., 95 = 95% confidence)
  isSignificant: boolean // p < 0.05 (95% confidence threshold)
  effect: number // Absolute difference in primary metric (e.g., 0.02 = 2% improvement)
  relativeEffect: number // Percentage improvement (e.g., 50 = 50% relative lift)
}

/**
 * A/B test configuration and state
 * Core test entity with variants, targeting, and results
 */
export interface ABTest {
  id: string
  name: string
  description?: string

  // Configuration
  variants: EmailVariant[]
  primaryMetric: ABTestMetricType
  minimumSampleSize: number // Per variant (e.g., 500)
  minimumDuration: number // In days (e.g., 7)
  confidenceThreshold: number // 90, 95, or 99

  // Targeting
  segment?: {
    type: ABTestSegmentType
    customFilter?: string // SQL-like filter for custom segments
  }

  // Status
  status: ABTestStatus
  startedAt?: Date
  completedAt?: Date

  // Results
  winner?: string // Variant ID of winning variant
  statistical?: {
    variantComparisons: Array<{
      variantA: string
      variantB: string
      result: StatisticalResult
    }>
  }

  // Metadata
  createdBy: string
  createdAt: Date
  updatedAt: Date
  notes?: string[] // Timestamped notes for learnings/decisions
}

/**
 * A/B test setup configuration
 * Simplified interface for creating new tests
 */
export interface ABTestConfig {
  // Test setup
  testName: string
  variants: Array<{
    name: string
    template: string
    weight: number
  }>

  // Target audience
  segment: ABTestSegmentType
  sampleSize: number // Total subscribers to test

  // Success criteria
  primaryMetric: ABTestMetricType
  minimumImprovement: number // e.g., 0.01 for 1% absolute improvement
  confidenceLevel: 90 | 95 | 99

  // Guardrails
  maxUnsubscribeRate: number // e.g., 0.005 for 0.5%
  maxSpamRate: number // e.g., 0.001 for 0.1%
}

/**
 * A/B test result summary
 * High-level outcome with recommendation
 */
export interface ABTestResult {
  test: ABTest
  winner: VariantPerformance
  runners: VariantPerformance[]
  recommendation: string
  insights: string[]
}

/**
 * Email send record for tracking
 * Individual email delivery and engagement events
 */
export interface EmailSend {
  id: string
  testId?: string
  variantId?: string

  // Send details
  subscriberId: string
  subject: string
  sentAt: Date

  // Delivery
  delivered: boolean
  deliveredAt?: Date
  bounced: boolean
  bounceReason?: string

  // Engagement
  opened: boolean
  openedAt?: Date
  clicked: boolean
  clickedAt?: Date
  clickCount: number

  // Negative signals
  unsubscribed: boolean
  unsubscribedAt?: Date
  replied: boolean
  repliedAt?: Date
  spamReport: boolean
  spamReportedAt?: Date

  // Device/Client (detected from open pixel)
  device?: 'mobile' | 'desktop' | 'tablet' | 'unknown'
  client?: 'appleMail' | 'gmail' | 'outlook' | 'other'
}

/**
 * Variant assignment strategy
 * Determines how subscribers are allocated to variants
 */
export interface VariantAssignmentStrategy {
  type: 'deterministic' | 'random' | 'multi_armed_bandit'
  seed?: string // For deterministic hashing
  explorationRate?: number // For MAB (e.g., 0.1 = 10% exploration)
}

/**
 * Test completion check result
 * Determines if test has reached statistical significance
 */
export interface TestCompletionCheck {
  isComplete: boolean
  winner?: EmailVariant
  recommendation: string
  details: {
    sampleSizeReached: boolean
    durationReached: boolean
    significanceReached: boolean
    guardrailsPassed: boolean
    topVariant?: string
    confidence?: number
  }
}

/**
 * Segment filter for custom audience targeting
 */
export interface SegmentFilter {
  // Subscriber attributes
  subscriptionAge?: {
    min?: number // Days since subscribed
    max?: number
  }

  lastOpenAge?: {
    min?: number // Days since last open
    max?: number
  }

  totalOpens?: {
    min?: number
    max?: number
  }

  totalClicks?: {
    min?: number
    max?: number
  }

  // Tags/interests
  tags?: string[] // Any of these tags
  excludeTags?: string[] // None of these tags

  // Geographic
  timezone?: string[]
  country?: string[]

  // Engagement score
  engagementScore?: {
    min?: number // 0-100
    max?: number
  }
}

/**
 * Test learning documentation
 * Captures insights from completed tests
 */
export interface TestLearning {
  testId: string
  testName: string
  hypothesis: string
  result: 'confirmed' | 'rejected' | 'inconclusive'
  winner?: string
  loser?: string

  // Insights
  whyItWon?: string
  segmentFindings?: {
    segment: string
    finding: string
  }[]
  insights: string[]
  recommendations: string[]

  // Next steps
  nextTest?: string
  actionTaken?: string

  // Metadata
  documentedBy: string
  documentedAt: Date
}

/**
 * A/B test analytics dashboard data
 * Aggregated view for UI display
 */
export interface ABTestDashboard {
  tests: {
    total: number
    running: number
    completed: number
    winnersDeclared: number
  }

  performance: {
    avgOpenRateLift: number // Average improvement in open rate across winners
    avgClickRateLift: number // Average improvement in click rate
    avgUnsubRateChange: number // Average change in unsub rate
  }

  recentTests: Array<{
    id: string
    name: string
    status: ABTestStatus
    startedAt: Date
    variants: number
    leader?: {
      name: string
      metric: number
      confidence: number
    }
  }>

  learnings: TestLearning[]
}

/**
 * Event tracking payload
 * Sent to analytics system on email events
 */
export interface EmailEventPayload {
  subscriberId: string
  testId?: string
  variantId?: string
  event: 'sent' | 'delivered' | 'opened' | 'clicked' | 'unsubscribed' | 'replied' | 'spam_report' | 'bounced'
  timestamp: Date
  metadata?: {
    device?: string
    client?: string
    userAgent?: string
    linkClicked?: string
    bounceReason?: string
  }
}
