# Email A/B Testing Framework
*Scientific methodology for optimizing email performance at FrankX*

---

## Executive Summary

**Recommended Approach for FrankX:**
- Start with **2-variant tests** (50/50 split) for fastest learning
- Minimum **500 subscribers per variant** for statistical significance
- Run tests for **2-3 sends minimum** (1-2 weeks) to account for variance
- Target **95% confidence** before declaring winner
- Test **one variable at a time** (template style, then subject lines, then content)

**Phase 1 Priority Test:**
```
Variant A: Dark glassmorphic (brand-aligned, premium)
Variant B: White minimal (industry standard, high contrast)
```

**Success Metrics:**
1. Primary: Click rate (engagement)
2. Secondary: Open rate, unsubscribe rate
3. Tertiary: Reply rate, conversion rate

---

## 1. Test Methodology

### Sample Size Calculation

**Formula for 95% confidence, 80% power:**
```
n = 2 × (z₁ + z₂)² × p × (1-p) / (δ)²

Where:
- z₁ = 1.96 (95% confidence)
- z₂ = 0.84 (80% power)
- p = baseline click rate (e.g., 0.03 = 3%)
- δ = minimum detectable effect (e.g., 0.01 = 1% absolute improvement)
```

**FrankX Baseline Assumptions:**
- Email list size: ~2,000-5,000 subscribers (growing)
- Expected baseline click rate: 2-4% (industry avg for newsletters)
- Target improvement: 1-2% absolute (25-50% relative)

**Sample Size Table:**

| Baseline Rate | Target Improvement | Sample per Variant | Total Needed |
|---------------|-------------------|-------------------|--------------|
| 3% | +1% (to 4%) | 1,556 | 3,112 |
| 3% | +1.5% (to 4.5%) | 694 | 1,388 |
| 3% | +2% (to 5%) | 392 | 784 |

**FrankX Recommendation:**
- Minimum 500 subscribers per variant (1,000 total)
- For 2,000+ list: Can run 2-variant test in single send
- For smaller lists: Run test over 2-3 sends, combine data

### Statistical Significance Thresholds

**Confidence Levels:**
- 90% (p < 0.10): Suggestive, continue testing
- 95% (p < 0.05): Standard threshold, can declare winner
- 99% (p < 0.01): High confidence, strong winner

**Use z-test for proportions:**
```
z = (p₁ - p₂) / √(p × (1-p) × (1/n₁ + 1/n₂))

Where:
- p₁, p₂ = click rates for variants
- p = pooled proportion
- n₁, n₂ = sample sizes
```

**Online Calculator:** Use [Evan Miller's A/B Test Calculator](https://www.evanmiller.org/ab-testing/chi-squared.html)

### Test Duration Recommendations

**Minimum Test Duration:**
- 2-3 email sends (captures different days/times)
- 1-2 weeks (accounts for audience availability)
- Until both variants reach minimum sample size

**When to Stop Early:**
- 99% confidence reached + 1,000+ samples
- Catastrophic failure (>5% unsubscribe spike)
- External factor invalidates test (major news event, site outage)

**When to Extend:**
- Results hover near 90% confidence (keep running)
- Sample size not reached
- High variance between sends (need more data)

### Segment Strategies

**Test Segments:**

1. **New Subscribers (0-30 days)**
   - Higher engagement, more open to experimentation
   - Best for testing bold variants (dark glass, gradients)
   - Sample: 200-500 per variant

2. **Active Subscribers (opened last 3 emails)**
   - Engaged audience, good baseline metrics
   - Best for incremental improvements
   - Sample: 300-700 per variant

3. **Dormant Subscribers (not opened last 5+ emails)**
   - Low engagement, high unsubscribe risk
   - Test re-engagement variants (plain text, curiosity gaps)
   - Sample: 200-400 per variant

4. **Full List (randomized)**
   - Most representative results
   - Use for final validation after segment tests
   - Sample: 500+ per variant

**FrankX Strategy:**
- Phase 1: Test on Active Subscribers (fastest signal)
- Phase 2: Validate winner on Full List
- Phase 3: Customize variants per segment if data supports

---

## 2. Metrics to Track

### Primary Metrics (Decide Winner)

| Metric | Definition | Target | Weight |
|--------|-----------|--------|--------|
| **Click Rate** | Clicks / Delivered | 3-5% | 60% |
| **Open Rate** | Opens / Delivered | 25-35% | 40% |

**Why Click Rate is Primary:**
- True engagement signal (took action)
- Directly impacts conversions
- Less gamed than open rate (tracking pixels blocked)

### Secondary Metrics (Guardrails)

| Metric | Definition | Threshold | Action |
|--------|-----------|-----------|--------|
| **Unsubscribe Rate** | Unsubs / Delivered | <0.5% | If >1%, stop test |
| **Reply Rate** | Replies / Delivered | >0.1% | Bonus signal |
| **Spam Report Rate** | Spam / Delivered | <0.05% | If >0.1%, stop |

### Tertiary Metrics (Learning)

| Metric | Purpose |
|--------|---------|
| **Email Client Breakdown** | Optimize for top clients (Gmail, Apple Mail, Outlook) |
| **Device Breakdown** | Mobile vs Desktop design priorities |
| **Time to Click** | Content layout effectiveness |
| **Link Heatmap** | Which CTAs/sections get clicks |

### Email Client Breakdown

**Expected Distribution (2026):**
- Apple Mail: 35-45% (dark mode common)
- Gmail: 25-35% (light mode default)
- Outlook: 10-15% (limited CSS support)
- Other: 10-20% (Yahoo, Proton, etc.)

**Tracking:**
- Resend provides client data via webhooks
- Segment results by client (dark glass may perform better on Apple Mail)

### Device Breakdown

**Mobile vs Desktop:**
- Mobile: 60-70% of opens (optimize first)
- Desktop: 30-40% of opens (better click rate)

**Responsive Testing:**
- Preview all variants on iPhone (Apple Mail), Android (Gmail), Desktop (Outlook)
- Use Litmus or Email on Acid for cross-client testing

---

## 3. Variant Assignment

### Traffic Split Strategies

**2-Variant (Recommended for FrankX):**
```
Variant A: 50% (baseline or current champion)
Variant B: 50% (challenger)
```
- Fastest path to significance
- Simple analysis
- Use for template style, color scheme, layout

**3-Variant (Use Sparingly):**
```
Variant A: 34% (baseline)
Variant B: 33% (challenger 1)
Variant C: 33% (challenger 2)
```
- Requires 3x sample size
- Use when testing 3 distinct approaches (dark/light/gradient)
- Run only if list >3,000

**5-Variant (Advanced):**
```
Variant A-E: 20% each
```
- Requires 5x sample size (2,500+ per variant = 12,500+ list)
- Use for initial exploration, then narrow to top 2
- **Not recommended for FrankX current list size**

**Multi-Armed Bandit (Future):**
- Dynamically allocate traffic to best performer
- Requires real-time analytics + automation
- Phase 3+ (after 10+ A/B tests completed)

### When to Declare a Winner

**Decision Criteria (ALL must be met):**

1. **Statistical Significance:** p < 0.05 (95% confidence)
2. **Minimum Sample Size:** 500+ per variant
3. **Minimum Duration:** 2 sends or 1 week
4. **Practical Significance:** Improvement >0.5% absolute (not just statistically significant)
5. **Guardrails Met:** Unsub rate <0.5%, no spam spike

**Example:**
```
Variant A: 500 sends, 15 clicks (3.0% click rate)
Variant B: 500 sends, 25 clicks (5.0% click rate)

z-score = 2.26 → p = 0.024 (95% confidence ✓)
Sample size ✓, Duration ✓, Improvement 2% ✓

Winner: Variant B
```

### Handling Multi-Variant Tests

**5-Variant Tournament Strategy:**

**Round 1: Exploratory (Send 1-2)**
```
A: Dark glass (20%)
B: White minimal (20%)
C: Gradient cards (20%)
D: Plain text (20%)
E: Image-heavy (20%)
```
- Eliminate bottom 2-3 performers
- Advance top 2 to Round 2

**Round 2: Validation (Send 3-4)**
```
Top Performer: 50%
Runner-Up: 50%
```
- Run as 2-variant test
- Declare final winner at 95% confidence

**When to Use:**
- Initial template design (no prior data)
- Major redesign (want to test multiple directions)
- Large list (5,000+) where sample size allows

---

## 4. Decision Matrix

### When to Use White Background

**Use Cases:**
- **Audience:** Corporate, B2B, conservative industries
- **Content Type:** Long-form articles, research, text-heavy
- **Goal:** Accessibility, readability, trust
- **Brand Alignment:** Low (FrankX is premium/dark)

**Signals from Data:**
- Older audience (40+ years) prefers white
- Desktop-heavy opens (white easier on large screens)
- High Gmail % (Gmail light mode default)

**Recommendation for FrankX:**
- Use as Variant B in tests
- May perform better for technical content (AI architecture posts)
- NOT primary brand template

### When to Use Dark Background

**Use Cases:**
- **Audience:** Tech-savvy, creative, younger demographic
- **Content Type:** Visual showcases, product launches, premium announcements
- **Goal:** Brand alignment, premium feel, visual impact
- **Brand Alignment:** High (matches frankx.ai glassmorphic design)

**Signals from Data:**
- High Apple Mail % (dark mode common)
- Mobile-heavy opens (dark easier on eyes)
- Creator/developer audience

**Recommendation for FrankX:**
- Primary brand template (Variant A in tests)
- Best for AI Architect newsletter, product launches, ecosystem updates
- Use glassmorphic cards for content hierarchy

### When to Use Gradient/Cards

**Use Cases:**
- **Audience:** Design-conscious, early adopters
- **Content Type:** Multi-topic newsletters, curated links, showcases
- **Goal:** Visual separation, scannable layout, modern aesthetic
- **Brand Alignment:** Medium-High (FrankX uses gradients as accents)

**Signals from Data:**
- High engagement with visual content
- Short attention span (need visual breaks)
- Mobile-first audience

**Recommendation for FrankX:**
- Use gradient accents on dark base (not full gradient)
- Card-based layout for multi-section emails (Featured Post + Links + CTA)
- Test as Variant C after dark vs white settled

### Decision Tree

```
START: New email campaign
│
├─ Content Type?
│  ├─ Single long article → White minimal (readability)
│  ├─ Product launch → Dark glass (premium)
│  ├─ Multi-topic digest → Dark cards (scannable)
│  └─ Re-engagement → Plain text (personal)
│
├─ Audience Segment?
│  ├─ New subscribers → Dark glass (brand intro)
│  ├─ Active subscribers → Current champion (consistency)
│  └─ Dormant subscribers → Plain text (cut through noise)
│
├─ Brand Alignment Priority?
│  ├─ High (ecosystem, products) → Dark glass
│  ├─ Medium (blog, tutorials) → Test white vs dark
│  └─ Low (transactional) → White minimal
│
└─ Mobile vs Desktop?
   ├─ >70% mobile → Dark + large touch targets
   ├─ 50-70% mobile → Responsive dark or white
   └─ >50% desktop → White (easier on eyes for long reads)

OUTCOME: Template recommendation + A/B test plan
```

### Criteria Summary

| Criteria | White | Dark Glass | Gradient Cards |
|----------|-------|-----------|----------------|
| **Brand Alignment** | Low | High | Medium |
| **Readability (long text)** | High | Medium | Low |
| **Visual Impact** | Low | High | High |
| **Accessibility** | High | Medium | Medium |
| **Mobile Optimized** | Medium | High | High |
| **Apple Mail Dark Mode** | Poor | Excellent | Good |
| **Gmail Light Mode** | Excellent | Good | Good |

---

## 5. Implementation in Code

### TypeScript Types

**File: `types/ab-testing.ts`**
```typescript
export type ABTestStatus = 'draft' | 'running' | 'paused' | 'completed' | 'archived'
export type ABTestMetricType = 'click_rate' | 'open_rate' | 'unsubscribe_rate' | 'reply_rate' | 'conversion_rate'

export interface EmailVariant {
  id: string
  name: string
  description?: string
  template: string // Template ID or component name
  weight: number // 0-100, must sum to 100 across all variants
  impressions: number // Times sent
  createdAt: Date
}

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
  }

  clientBreakdown?: {
    appleMail: number
    gmail: number
    outlook: number
    other: number
  }
}

export interface VariantPerformance extends EmailVariant {
  metrics: ABTestMetrics
  lastUpdated: Date
}

export interface StatisticalResult {
  zScore: number
  pValue: number
  confidence: number // 0-100 (e.g., 95)
  isSignificant: boolean // p < 0.05
  effect: number // Absolute difference in primary metric
  relativeEffect: number // Percentage improvement
}

export interface ABTest {
  id: string
  name: string
  description?: string

  // Configuration
  variants: EmailVariant[]
  primaryMetric: ABTestMetricType
  minimumSampleSize: number // Per variant
  minimumDuration: number // In days
  confidenceThreshold: number // 90, 95, or 99

  // Targeting
  segment?: {
    type: 'all' | 'new' | 'active' | 'dormant' | 'custom'
    customFilter?: string // SQL-like filter for custom segments
  }

  // Status
  status: ABTestStatus
  startedAt?: Date
  completedAt?: Date

  // Results
  winner?: string // Variant ID
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
  notes?: string[]
}

export interface ABTestConfig {
  // Test setup
  testName: string
  variants: Array<{
    name: string
    template: string
    weight: number
  }>

  // Target audience
  segment: 'all' | 'new' | 'active' | 'dormant'
  sampleSize: number // Total subscribers to test

  // Success criteria
  primaryMetric: ABTestMetricType
  minimumImprovement: number // e.g., 0.01 for 1% absolute
  confidenceLevel: 90 | 95 | 99

  // Guardrails
  maxUnsubscribeRate: number // e.g., 0.005 for 0.5%
  maxSpamRate: number // e.g., 0.001 for 0.1%
}

export interface ABTestResult {
  test: ABTest
  winner: VariantPerformance
  runners: VariantPerformance[]
  recommendation: string
  insights: string[]
}
```

### Database Schema

**File: `prisma/schema.prisma` (additions)**
```prisma
model ABTest {
  id                   String   @id @default(cuid())
  name                 String
  description          String?

  // Configuration
  primaryMetric        String   // click_rate, open_rate, etc.
  minimumSampleSize    Int      @default(500)
  minimumDuration      Int      @default(7) // days
  confidenceThreshold  Int      @default(95)

  // Segment
  segmentType          String   @default("all") // all, new, active, dormant, custom
  segmentFilter        String?  // JSON or SQL filter

  // Status
  status               String   @default("draft") // draft, running, paused, completed, archived
  startedAt            DateTime?
  completedAt          DateTime?

  // Results
  winnerId             String?

  // Relations
  variants             EmailVariant[]
  sends                EmailSend[]

  // Metadata
  createdBy            String
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  notes                Json?    // Array of timestamped notes

  @@index([status, startedAt])
  @@index([createdBy, createdAt])
}

model EmailVariant {
  id                   String   @id @default(cuid())
  testId               String

  name                 String
  description          String?
  template             String   // Template component name or ID
  weight               Int      // 0-100

  // Performance (denormalized for quick access)
  impressions          Int      @default(0)
  delivered            Int      @default(0)
  opened               Int      @default(0)
  clicked              Int      @default(0)
  unsubscribed         Int      @default(0)
  replied              Int      @default(0)
  spamReports          Int      @default(0)

  // Calculated rates (updated via trigger or cron)
  openRate             Float    @default(0)
  clickRate            Float    @default(0)
  unsubscribeRate      Float    @default(0)

  // Breakdown (JSON)
  deviceBreakdown      Json?    // { mobile, desktop, tablet }
  clientBreakdown      Json?    // { appleMail, gmail, outlook, other }

  // Relations
  test                 ABTest   @relation(fields: [testId], references: [id], onDelete: Cascade)
  sends                EmailSend[]

  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  @@index([testId, clickRate])
  @@index([testId, openRate])
}

model EmailSend {
  id                   String   @id @default(cuid())
  testId               String?
  variantId            String?

  // Send details
  subscriberId         String
  subject              String
  sentAt               DateTime

  // Delivery
  delivered            Boolean  @default(false)
  deliveredAt          DateTime?
  bounced              Boolean  @default(false)
  bounceReason         String?

  // Engagement
  opened               Boolean  @default(false)
  openedAt             DateTime?
  clicked              Boolean  @default(false)
  clickedAt            DateTime?
  clickCount           Int      @default(0)

  // Negative signals
  unsubscribed         Boolean  @default(false)
  unsubscribedAt       DateTime?
  replied              Boolean  @default(false)
  repliedAt            DateTime?
  spamReport           Boolean  @default(false)
  spamReportedAt       DateTime?

  // Device/Client (from open pixel)
  device               String?  // mobile, desktop, tablet
  client               String?  // appleMail, gmail, outlook, other

  // Relations
  test                 ABTest?  @relation(fields: [testId], references: [id])
  variant              EmailVariant? @relation(fields: [variantId], references: [id])

  @@index([testId, variantId, sentAt])
  @@index([subscriberId, sentAt])
  @@index([opened, clicked])
}
```

### Variant Selection Logic

**File: `lib/email-sequences/ab-testing.ts`**
```typescript
import { ABTest, EmailVariant } from '@/types/ab-testing'
import { prisma } from '@/lib/prisma'

/**
 * Select a variant for a subscriber based on test configuration
 * Uses deterministic assignment (subscriber ID + test ID) for consistency
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
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Track email send for A/B test analytics
 */
export async function trackEmailSend(params: {
  testId: string
  variantId: string
  subscriberId: string
  subject: string
  delivered: boolean
}): Promise<void> {
  await prisma.emailSend.create({
    data: {
      testId: params.testId,
      variantId: params.variantId,
      subscriberId: params.subscriberId,
      subject: params.subject,
      sentAt: new Date(),
      delivered: params.delivered,
      deliveredAt: params.delivered ? new Date() : null,
    },
  })

  // Increment variant impression count
  await prisma.emailVariant.update({
    where: { id: params.variantId },
    data: {
      impressions: { increment: 1 },
      delivered: params.delivered ? { increment: 1 } : undefined,
    },
  })
}

/**
 * Track email event (open, click, unsubscribe, etc.)
 */
export async function trackEmailEvent(params: {
  subscriberId: string
  testId: string
  event: 'opened' | 'clicked' | 'unsubscribed' | 'replied' | 'spam_report'
  device?: string
  client?: string
}): Promise<void> {
  const { subscriberId, testId, event, device, client } = params

  // Find the most recent send for this subscriber + test
  const send = await prisma.emailSend.findFirst({
    where: {
      subscriberId,
      testId,
      delivered: true,
    },
    orderBy: { sentAt: 'desc' },
  })

  if (!send) return // No send found, ignore event

  // Update send record
  const updateData: any = {
    [`${event}`]: true,
    [`${event}At`]: new Date(),
  }

  if (event === 'clicked') {
    updateData.clickCount = { increment: 1 }
  }

  if (device) updateData.device = device
  if (client) updateData.client = client

  await prisma.emailSend.update({
    where: { id: send.id },
    data: updateData,
  })

  // Update variant metrics
  const metricField = event === 'spam_report' ? 'spamReports' : event
  await prisma.emailVariant.update({
    where: { id: send.variantId! },
    data: {
      [metricField]: { increment: 1 },
    },
  })

  // Recalculate rates (could also be done in a cron job)
  await recalculateVariantRates(send.variantId!)
}

/**
 * Recalculate variant performance rates
 */
async function recalculateVariantRates(variantId: string): Promise<void> {
  const variant = await prisma.emailVariant.findUnique({
    where: { id: variantId },
  })

  if (!variant || variant.delivered === 0) return

  const openRate = variant.opened / variant.delivered
  const clickRate = variant.clicked / variant.delivered
  const unsubscribeRate = variant.unsubscribed / variant.delivered

  await prisma.emailVariant.update({
    where: { id: variantId },
    data: { openRate, clickRate, unsubscribeRate },
  })
}

/**
 * Calculate statistical significance between two variants
 */
export function calculateSignificance(
  variantA: EmailVariant,
  variantB: EmailVariant,
  metric: 'clickRate' | 'openRate' = 'clickRate'
): {
  zScore: number
  pValue: number
  confidence: number
  isSignificant: boolean
  effect: number
  relativeEffect: number
} {
  const p1 = variantA[metric]
  const p2 = variantB[metric]
  const n1 = variantA.delivered
  const n2 = variantB.delivered

  // Pooled proportion
  const pooled = ((p1 * n1) + (p2 * n2)) / (n1 + n2)

  // Standard error
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2))

  // Z-score
  const zScore = (p1 - p2) / se

  // P-value (two-tailed)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))

  // Confidence level
  const confidence = (1 - pValue) * 100

  // Significance (95% threshold)
  const isSignificant = pValue < 0.05

  // Effect sizes
  const effect = Math.abs(p1 - p2)
  const relativeEffect = ((p2 - p1) / p1) * 100

  return {
    zScore,
    pValue,
    confidence,
    isSignificant,
    effect,
    relativeEffect,
  }
}

/**
 * Normal distribution CDF (cumulative distribution function)
 * Approximation for z-score to p-value conversion
 */
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

  return z > 0 ? 1 - prob : prob
}

/**
 * Check if A/B test has reached statistical significance
 */
export async function checkTestCompletion(testId: string): Promise<{
  isComplete: boolean
  winner?: EmailVariant
  recommendation: string
  details: any
}> {
  const test = await prisma.aBTest.findUnique({
    where: { id: testId },
    include: { variants: true },
  })

  if (!test || test.variants.length < 2) {
    return {
      isComplete: false,
      recommendation: 'Test not found or insufficient variants',
      details: null,
    }
  }

  // Check minimum sample size
  const allReachedSampleSize = test.variants.every(
    v => v.delivered >= test.minimumSampleSize
  )

  if (!allReachedSampleSize) {
    return {
      isComplete: false,
      recommendation: `Continue test. Need ${test.minimumSampleSize} per variant, currently at ${Math.min(...test.variants.map(v => v.delivered))}`,
      details: { variants: test.variants.map(v => ({ name: v.name, delivered: v.delivered })) },
    }
  }

  // Check minimum duration
  const daysSinceStart = test.startedAt
    ? (Date.now() - test.startedAt.getTime()) / (1000 * 60 * 60 * 24)
    : 0

  if (daysSinceStart < test.minimumDuration) {
    return {
      isComplete: false,
      recommendation: `Continue test. Need ${test.minimumDuration} days, currently at ${Math.floor(daysSinceStart)} days`,
      details: { daysSinceStart },
    }
  }

  // Calculate significance between all variant pairs
  const metric = test.primaryMetric === 'click_rate' ? 'clickRate' : 'openRate'
  const results = []

  for (let i = 0; i < test.variants.length; i++) {
    for (let j = i + 1; j < test.variants.length; j++) {
      const variantA = test.variants[i]
      const variantB = test.variants[j]
      const significance = calculateSignificance(variantA, variantB, metric as any)

      results.push({
        variantA: variantA.name,
        variantB: variantB.name,
        ...significance,
      })
    }
  }

  // Find best performing variant
  const sortedVariants = [...test.variants].sort((a, b) => b[metric] - a[metric])
  const topVariant = sortedVariants[0]
  const runnerUp = sortedVariants[1]

  // Check if top variant is significantly better than runner-up
  const topVsRunner = calculateSignificance(topVariant, runnerUp, metric as any)

  if (topVsRunner.isSignificant && topVsRunner.confidence >= test.confidenceThreshold) {
    return {
      isComplete: true,
      winner: topVariant,
      recommendation: `Declare winner: ${topVariant.name} with ${(topVariant[metric] * 100).toFixed(2)}% ${metric} vs ${(runnerUp[metric] * 100).toFixed(2)}% (${topVsRunner.confidence.toFixed(1)}% confidence)`,
      details: {
        topVsRunner,
        allComparisons: results,
        variants: sortedVariants.map(v => ({
          name: v.name,
          [metric]: v[metric],
          delivered: v.delivered,
        })),
      },
    }
  }

  return {
    isComplete: false,
    recommendation: `Continue test. Top variant (${topVariant.name}) not significantly better than runner-up (${topVsRunner.confidence.toFixed(1)}% confidence, need ${test.confidenceThreshold}%)`,
    details: {
      topVsRunner,
      allComparisons: results,
    },
  }
}
```

### Integration with Email Sender

**File: `lib/email-sequences/sender.ts` (additions)**
```typescript
import { selectVariant, trackEmailSend, trackEmailEvent } from './ab-testing'
import { prisma } from '@/lib/prisma'

/**
 * Send email with A/B test variant selection
 */
export async function sendEmailWithABTest(params: {
  subscriberId: string
  testId: string
  baseSubject: string
  baseContent: string
}): Promise<void> {
  const { subscriberId, testId, baseSubject, baseContent } = params

  // Fetch test configuration
  const test = await prisma.aBTest.findUnique({
    where: { id: testId },
    include: { variants: true },
  })

  if (!test || test.status !== 'running') {
    throw new Error('Test not found or not running')
  }

  // Select variant for this subscriber
  const variant = selectVariant(test, subscriberId)

  // Render email with variant template
  const renderedEmail = await renderEmailTemplate({
    template: variant.template,
    subject: baseSubject,
    content: baseContent,
    subscriberId,
  })

  // Send via Resend
  const result = await resend.emails.send({
    from: 'Frank Xue <frank@frankx.ai>',
    to: await getSubscriberEmail(subscriberId),
    subject: renderedEmail.subject,
    html: renderedEmail.html,
    tags: [
      { name: 'test_id', value: testId },
      { name: 'variant_id', value: variant.id },
      { name: 'variant_name', value: variant.name },
    ],
  })

  // Track send
  await trackEmailSend({
    testId,
    variantId: variant.id,
    subscriberId,
    subject: renderedEmail.subject,
    delivered: result.error ? false : true,
  })
}

/**
 * Webhook handler for Resend events
 */
export async function handleResendWebhook(event: any): Promise<void> {
  const { type, data } = event

  // Extract tags
  const tags = data.tags || []
  const testId = tags.find((t: any) => t.name === 'test_id')?.value
  const subscriberId = data.to // Assumes "to" email is subscriber ID

  if (!testId || !subscriberId) return // Not an A/B test email

  // Map Resend event to tracking event
  const eventMap: Record<string, 'opened' | 'clicked' | 'unsubscribed' | 'replied' | 'spam_report'> = {
    'email.opened': 'opened',
    'email.clicked': 'clicked',
    'email.unsubscribed': 'unsubscribed',
    'email.replied': 'replied',
    'email.spam_complaint': 'spam_report',
  }

  const trackingEvent = eventMap[type]
  if (!trackingEvent) return

  // Extract device/client from user agent (simplified)
  const device = data.device || detectDevice(data.user_agent)
  const client = data.client || detectClient(data.user_agent)

  await trackEmailEvent({
    subscriberId,
    testId,
    event: trackingEvent,
    device,
    client,
  })
}

function detectDevice(userAgent?: string): string {
  if (!userAgent) return 'unknown'
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

function detectClient(userAgent?: string): string {
  if (!userAgent) return 'other'
  if (/Apple Mail/i.test(userAgent)) return 'appleMail'
  if (/Gmail/i.test(userAgent)) return 'gmail'
  if (/Outlook/i.test(userAgent)) return 'outlook'
  return 'other'
}
```

### Analytics Dashboard Query

**File: `lib/email-sequences/analytics.ts`**
```typescript
import { prisma } from '@/lib/prisma'
import { ABTest, VariantPerformance } from '@/types/ab-testing'
import { calculateSignificance } from './ab-testing'

/**
 * Fetch A/B test performance data for dashboard
 */
export async function getABTestPerformance(testId: string): Promise<{
  test: ABTest
  variants: VariantPerformance[]
  comparison: any
  recommendation: string
}> {
  const test = await prisma.aBTest.findUnique({
    where: { id: testId },
    include: { variants: true },
  })

  if (!test) {
    throw new Error('Test not found')
  }

  // Format variant performance
  const variants: VariantPerformance[] = test.variants.map(v => ({
    ...v,
    metrics: {
      delivered: v.delivered,
      opened: v.opened,
      clicked: v.clicked,
      unsubscribed: v.unsubscribed,
      replied: v.replied,
      spamReports: v.spamReports,
      openRate: v.openRate,
      clickRate: v.clickRate,
      unsubscribeRate: v.unsubscribeRate,
      replyRate: v.replied / v.delivered,
      deviceBreakdown: v.deviceBreakdown as any,
      clientBreakdown: v.clientBreakdown as any,
    },
    lastUpdated: v.updatedAt,
  }))

  // Sort by primary metric
  const metric = test.primaryMetric === 'click_rate' ? 'clickRate' : 'openRate'
  const sortedVariants = [...variants].sort((a, b) => b.metrics[metric] - a.metrics[metric])

  // Calculate significance
  let comparison = null
  let recommendation = 'Insufficient data'

  if (sortedVariants.length >= 2) {
    const topVariant = sortedVariants[0]
    const runnerUp = sortedVariants[1]

    comparison = calculateSignificance(
      topVariant as any,
      runnerUp as any,
      metric as any
    )

    if (comparison.isSignificant) {
      recommendation = `${topVariant.name} wins with ${(comparison.relativeEffect).toFixed(1)}% improvement (${comparison.confidence.toFixed(1)}% confidence)`
    } else {
      recommendation = `Continue test. ${topVariant.name} leading but not significant (${comparison.confidence.toFixed(1)}% confidence)`
    }
  }

  return {
    test: test as any,
    variants: sortedVariants,
    comparison,
    recommendation,
  }
}

/**
 * Get breakdown by device for a variant
 */
export async function getDeviceBreakdown(variantId: string): Promise<{
  mobile: number
  desktop: number
  tablet: number
  unknown: number
}> {
  const sends = await prisma.emailSend.groupBy({
    by: ['device'],
    where: {
      variantId,
      opened: true, // Only count opens (device detected from open pixel)
    },
    _count: true,
  })

  const breakdown = {
    mobile: 0,
    desktop: 0,
    tablet: 0,
    unknown: 0,
  }

  sends.forEach(s => {
    const device = s.device || 'unknown'
    breakdown[device as keyof typeof breakdown] = s._count
  })

  return breakdown
}

/**
 * Get breakdown by email client for a variant
 */
export async function getClientBreakdown(variantId: string): Promise<{
  appleMail: number
  gmail: number
  outlook: number
  other: number
}> {
  const sends = await prisma.emailSend.groupBy({
    by: ['client'],
    where: {
      variantId,
      opened: true,
    },
    _count: true,
  })

  const breakdown = {
    appleMail: 0,
    gmail: 0,
    outlook: 0,
    other: 0,
  }

  sends.forEach(s => {
    const client = s.client || 'other'
    breakdown[client as keyof typeof breakdown] = s._count
  })

  return breakdown
}
```

---

## 6. Results Analysis Guide

### Reading Test Results

**Example Test Report:**
```
A/B Test: Email Template Redesign
Started: Feb 1, 2026 | Completed: Feb 14, 2026 (13 days)
Segment: Active Subscribers (last 3 opens)

Variant A: Dark Glass (Current)
  Delivered: 542
  Opened: 178 (32.8% open rate)
  Clicked: 21 (3.9% click rate)
  Unsubscribed: 2 (0.4% unsub rate)

Variant B: White Minimal (Challenger)
  Delivered: 538
  Opened: 201 (37.4% open rate) ↑ 4.6%
  Clicked: 32 (5.9% click rate) ↑ 2.0%
  Unsubscribed: 1 (0.2% unsub rate) ↓ 0.2%

Statistical Analysis (Primary Metric: Click Rate)
  z-score: 2.14
  p-value: 0.032
  Confidence: 96.8%
  Effect: +2.0% absolute (51% relative improvement)

Guardrails: PASSED
  Unsub rate <0.5% ✓ (both variants)
  Spam rate 0% ✓
  Sample size >500 ✓

Recommendation: DECLARE WINNER → Variant B (White Minimal)
  - Statistically significant at 96.8% confidence (>95% threshold)
  - Practical significance: 2% click rate improvement
  - All guardrails passed
  - Consistent performance across 3 sends
```

### Interpreting Results

**When to Trust the Results:**
- ✓ Confidence >95% + sample size >500 + practical significance >0.5%
- ✓ Multiple sends (2-3+) show consistent winner
- ✓ Guardrails passed (no unsub spike)

**When to Question the Results:**
- ✗ Confidence 90-95% (suggestive but not conclusive)
- ✗ Small sample (<500 per variant)
- ✗ Only 1 send (could be day-of-week effect)
- ✗ External event (major news, site outage during test)

**Common Pitfalls:**
1. **P-hacking**: Running test until you see significance, then stopping. Fix: Decide sample size + duration upfront.
2. **Peeking**: Checking results daily and stopping early. Fix: Only check at pre-defined milestones.
3. **Multiple comparisons**: Testing 5 variants without adjusting significance threshold. Fix: Use Bonferroni correction (p < 0.01 for 5 variants).
4. **Ignoring practical significance**: 0.1% improvement is significant but not worth implementing. Fix: Set minimum improvement threshold (0.5-1%).

### Next Steps After Test

**If Winner is Clear:**
1. Update default template to winner
2. Document learnings (why did it win?)
3. Apply insights to other email types
4. Archive test data for future reference

**If No Clear Winner:**
1. Extend test duration (2x sample size)
2. Segment analysis (did one variant win for mobile users?)
3. Qualitative feedback (ask subscribers which they prefer)
4. Consider tie = both are acceptable, use context-based selection

**If Unexpected Result:**
1. Validate data (check for tracking bugs)
2. Check external factors (site issues during test?)
3. Segment breakdown (one segment drove results?)
4. Run follow-up test with refined variants

### Learning Documentation

**Template for Test Learnings:**
```markdown
## AB Test #001: Dark Glass vs White Minimal

**Hypothesis:** Dark glass template will perform better due to brand alignment and mobile-first design.

**Result:** REJECTED. White minimal won with 96.8% confidence (+2% click rate).

**Why It Won:**
- Higher contrast for CTAs (black button on white vs white button on dark)
- Better readability on Gmail desktop (50% of opens)
- Simpler layout = less cognitive load

**Segments:**
- Mobile (65% of opens): Tie (dark 4.1% vs white 4.3%)
- Desktop (35% of opens): White wins (dark 3.5% vs white 8.2%) ★
- Apple Mail: Dark wins (5.2% vs 4.8%)
- Gmail: White wins (3.1% vs 6.4%) ★

**Insight:** Desktop + Gmail users drove white template win. FrankX audience skews technical (desktop for long reads), Gmail prevalent.

**Action:** Use white template for technical/long-form content. Reserve dark glass for mobile-first announcements.

**Next Test:** Test white with gradient accent CTAs (combine white readability + brand colors).
```

---

## 7. Recommendations for FrankX

### Phase 1: Foundation (Weeks 1-2)

**Test #1: Template Style**
- Variant A: Dark glass (50%)
- Variant B: White minimal (50%)
- Segment: Active subscribers
- Sample: 500+ per variant
- Primary metric: Click rate
- Decision: Establish baseline template

**Implementation:**
1. Create 2 email templates (dark + white)
2. Add A/B test infrastructure (types, DB, tracking)
3. Run test on next newsletter send
4. Analyze after 2-3 sends

### Phase 2: Optimization (Weeks 3-4)

**Test #2: CTA Placement**
- Variant A: CTA at top + bottom
- Variant B: CTA at bottom only
- Use winning template from Test #1
- Sample: 500+ per variant
- Primary metric: Click rate

**Test #3: Subject Line Formula**
- Variant A: Question-based ("How to X?")
- Variant B: Benefit-based ("Get X in Y minutes")
- Variant C: Curiosity-based ("The X nobody talks about")
- Sample: 300+ per variant (900+ total)
- Primary metric: Open rate

### Phase 3: Segmentation (Weeks 5-6)

**Test #4: Personalization**
- Variant A: Generic greeting ("Hey,")
- Variant B: Name + interest ("Hey [Name], here's the AI content you asked about")
- Sample: 500+ per variant
- Primary metric: Click + reply rate

**Test #5: Segment-Specific Templates**
- New subscribers: Dark glass (brand intro)
- Active subscribers: White minimal (content-first)
- Dormant subscribers: Plain text (re-engagement)
- Measure: Unsub rate, re-activation rate

### Testing Roadmap (6 months)

| Month | Focus | Tests |
|-------|-------|-------|
| 1 | Foundation | Template style, CTA placement |
| 2 | Content | Subject lines, preview text |
| 3 | Engagement | Personalization, send time |
| 4 | Segmentation | New vs active, interest-based |
| 5 | Advanced | Dynamic content, multi-step sequences |
| 6 | Optimization | Refresh winning variants, test edge cases |

### Success Metrics

**Target Improvements (6 months):**
- Open rate: 25% → 35% (+10% absolute)
- Click rate: 3% → 5% (+2% absolute)
- Unsub rate: 0.5% → <0.3% (-0.2% absolute)
- Reply rate: 0.1% → 0.5% (+0.4% absolute)

**Confidence Calibration:**
- Month 1-2: 95% confidence (learn slowly, avoid false positives)
- Month 3-4: 90% confidence (faster iteration)
- Month 5-6: 99% confidence for major changes, 90% for tweaks

---

## Appendix: Tools & Resources

### Statistical Calculators
- [Evan Miller A/B Test Calculator](https://www.evanmiller.org/ab-testing/chi-squared.html)
- [Optimizely Sample Size Calculator](https://www.optimizely.com/sample-size-calculator/)
- [VWO A/B Test Duration Calculator](https://vwo.com/tools/ab-test-duration-calculator/)

### Email Testing Tools
- **Litmus**: Cross-client rendering, spam testing ($99/mo)
- **Email on Acid**: Similar to Litmus ($99/mo)
- **Mail Tester**: Free spam score checker
- **Resend Email Previews**: Built-in preview across clients (free with Resend)

### Analytics Platforms
- **Resend Analytics**: Built-in open/click tracking (free tier)
- **PostHog**: Product analytics + A/B testing (self-hosted free)
- **Mixpanel**: User analytics (free tier 100k events/mo)

### Learning Resources
- [Trustworthy Online Controlled Experiments](https://www.amazon.com/Trustworthy-Online-Controlled-Experiments-Practical/dp/1108724264) (book)
- [CXL Institute A/B Testing Course](https://cxl.com/institute/online-course/ab-testing-mastery/)
- [Optimizely Stats Engine Whitepaper](https://www.optimizely.com/optimization-resources/stats-engine/)

---

## Quick Reference

### Decision Checklist

Before running an A/B test, ask:

- [ ] **Clear hypothesis**: What do I think will happen and why?
- [ ] **Single variable**: Am I testing one thing at a time?
- [ ] **Sufficient sample**: Do I have 500+ per variant?
- [ ] **Sufficient duration**: Can I run for 2+ sends / 1+ week?
- [ ] **Measurable impact**: Is the minimum improvement (0.5%+) worth the effort?
- [ ] **Guardrails set**: Do I know my max unsub/spam thresholds?
- [ ] **Action plan**: What will I do if A wins? If B wins? If tie?

### When to Stop a Test

**Stop if:**
- 95%+ confidence + 500+ sample + 2+ sends
- Catastrophic failure (>5% unsub spike, major deliverability issue)
- External invalidation (site down, major news event)

**Keep running if:**
- 90-95% confidence (extend duration)
- <500 sample (extend sends)
- Only 1 send completed (day-of-week variance)

### Interpreting Confidence Levels

| Confidence | Meaning | Action |
|------------|---------|--------|
| <80% | No signal | Continue test or abandon |
| 80-90% | Weak signal | Extend test or segment analysis |
| 90-95% | Moderate signal | Suggestive winner, validate with more data |
| 95-99% | Strong signal | Declare winner |
| >99% | Very strong signal | High confidence winner |

---

*A/B testing is a long-term investment in learning. Ship fast, measure rigorously, compound insights.*
