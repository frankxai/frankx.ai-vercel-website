# Email A/B Testing Framework - Documentation Index

This directory contains a comprehensive A/B testing framework for email variant optimization at FrankX.

---

## 📚 Documentation Files

### 1. **ab-testing-framework.md** (43 KB)
**Purpose:** Complete scientific methodology and implementation guide

**Contents:**
- Executive summary with FrankX-specific recommendations
- Statistical methodology (sample size, significance, duration)
- Variant assignment strategies
- Decision matrix (when to use dark/white/gradient templates)
- Full code implementation (TypeScript types, database schema, logic)
- Results analysis guide
- 6-month testing roadmap

**Use when:** Setting up a new test, understanding statistical concepts, implementing code

---

### 2. **ab-testing-quick-reference.md** (9 KB)
**Purpose:** Fast decision-making cheat sheet

**Contents:**
- Pre-flight checklist
- Sample size calculator (table)
- Confidence level guide
- When to stop/continue tests
- Template decision matrix
- Common pitfalls
- Emergency stop triggers
- Test documentation template

**Use when:** Running a live test, making quick decisions, need stats lookup

---

### 3. **ab-testing-workflow.md** (10 KB)
**Purpose:** Visual diagrams and process flows

**Contents:**
- Test lifecycle flow (draft → running → completed)
- Variant selection algorithm
- Statistical significance decision tree
- Multi-variant tournament strategy
- Metrics hierarchy pyramid
- Send → Track → Analyze → Decide flow
- Segment testing funnel
- 6-month testing roadmap

**Use when:** Training team, understanding processes, planning test sequences

---

## 💻 Code Files

### 4. **types/ab-testing.ts** (8 KB)
**Purpose:** TypeScript type definitions

**Key Types:**
- `ABTest` - Main test configuration
- `EmailVariant` - Variant definition
- `ABTestMetrics` - Performance tracking
- `StatisticalResult` - Significance analysis
- `TestCompletionCheck` - Completion status
- `EmailSend` - Individual send tracking

**Use when:** Building features, ensuring type safety, understanding data model

---

### 5. **lib/email-sequences/ab-testing.ts** (11 KB)
**Purpose:** Core testing logic library

**Key Functions:**
- `selectVariant()` - Deterministic variant assignment
- `calculateSignificance()` - Two-proportion z-test
- `checkTestCompletion()` - Test completion logic
- `validateABTest()` - Configuration validation
- `calculateSampleSize()` - Sample size estimation
- `estimateTestDuration()` - Duration estimation

**Use when:** Implementing variant selection, calculating stats, checking test status

---

### 6. **scripts/ab-test-example.ts** (9 KB)
**Purpose:** Practical examples and demonstrations

**Examples:**
- Test configuration
- Variant selection (deterministic)
- Sample size calculation
- Statistical significance scenarios
- Test completion checks
- Multi-variant tournament
- Confidence level interpretation

**Use when:** Learning the API, debugging, validating implementation

---

### 7. **types/email-sequences.ts** (Updated)
**Purpose:** Integration with existing email sequences

**Changes:**
- Added `variant` field to `EmailTemplate`
- Added `abTestId`, `variantId` to `EmailDelivery`
- Added `device`, `client` tracking fields

**Use when:** Integrating A/B tests with email sequences

---

## 🚀 Quick Start Guide

### Phase 1: Setup (Week 1)

1. **Read documentation:**
   - `ab-testing-framework.md` (Executive Summary + Section 1-2)
   - `ab-testing-quick-reference.md` (full read)

2. **Review code:**
   - `types/ab-testing.ts` (understand data model)
   - `scripts/ab-test-example.ts` (run examples)

3. **Create first test:**
   ```typescript
   import { validateABTest } from '@/lib/email-sequences/ab-testing'
   
   const test: ABTest = {
     id: 'test_001',
     name: 'Dark Glass vs White Minimal',
     variants: [
       { id: 'a', name: 'Dark Glass', template: 'dark-glass', weight: 50 },
       { id: 'b', name: 'White Minimal', template: 'white-minimal', weight: 50 },
     ],
     primaryMetric: 'click_rate',
     minimumSampleSize: 500,
     minimumDuration: 7,
     confidenceThreshold: 95,
     // ... rest of config
   }
   
   const errors = validateABTest(test)
   if (errors.length === 0) console.log('✅ Test ready')
   ```

### Phase 2: Run Test (Week 2-3)

1. **Send emails:**
   ```typescript
   import { selectVariant } from '@/lib/email-sequences/ab-testing'
   
   subscribers.forEach(sub => {
     const variant = selectVariant(test, sub.id)
     sendEmail(sub, variant.template)
   })
   ```

2. **Track events:**
   - Open, click, unsubscribe via Resend webhooks
   - Store in database with `testId` + `variantId`

3. **Monitor progress:**
   - Check sample size daily
   - Monitor guardrails (unsub rate)
   - Use quick-reference.md for decisions

### Phase 3: Analyze (Week 4)

1. **Calculate significance:**
   ```typescript
   import { calculateSignificance } from '@/lib/email-sequences/ab-testing'
   
   const result = calculateSignificance({
     metricA: 0.039, // 3.9% click rate
     metricB: 0.059, // 5.9% click rate
     sampleA: 542,
     sampleB: 538,
   })
   
   console.log(`Confidence: ${result.confidence}%`) // 96.8%
   console.log(`Winner: ${result.isSignificant ? 'B' : 'Keep testing'}`)
   ```

2. **Check completion:**
   ```typescript
   import { checkTestCompletion } from '@/lib/email-sequences/ab-testing'
   
   const check = checkTestCompletion({ test, variantMetrics })
   console.log(check.recommendation)
   // "Declare winner: White Minimal with 5.95% click rate..."
   ```

3. **Document learning:**
   - Use template in quick-reference.md
   - Store in test notes
   - Apply insights to next test

---

## 📊 FrankX Test Recommendations

### Immediate Priority (Month 1)

**Test #1: Template Style**
- Variants: Dark Glass (50%) vs White Minimal (50%)
- Segment: Active subscribers (opened last 3)
- Sample: 500 per variant
- Metric: Click rate
- Duration: 2 sends / 1 week
- Expected outcome: Establish baseline template

**Files to use:**
- Read: `ab-testing-framework.md` (Section 4: Decision Matrix)
- Read: `ab-testing-quick-reference.md` (Template Decision Matrix)
- Code: `lib/email-sequences/ab-testing.ts` (selectVariant, calculateSignificance)

---

## 🎯 Success Metrics (6 Months)

| Metric | Baseline | Target | Improvement |
|--------|----------|--------|-------------|
| Open Rate | 25% | 35% | +10% |
| Click Rate | 3% | 5% | +2% |
| Unsub Rate | 0.5% | 0.3% | -0.2% |
| Reply Rate | 0.1% | 0.5% | +0.4% |

---

## 🔗 Related Resources

### Statistical Calculators
- [Evan Miller A/B Test Calculator](https://www.evanmiller.org/ab-testing/chi-squared.html)
- [Optimizely Sample Size Calculator](https://www.optimizely.com/sample-size-calculator/)

### Books
- [Trustworthy Online Controlled Experiments](https://www.amazon.com/dp/1108724264) - Microsoft's A/B testing guide

### Tools
- **Resend Analytics** - Email tracking (built-in)
- **Litmus** - Cross-client testing ($99/mo)

---

## 📝 File Sizes Summary

```
docs/research/
├── ab-testing-framework.md          43 KB  (comprehensive guide)
├── ab-testing-quick-reference.md     9 KB  (cheat sheet)
├── ab-testing-workflow.md           10 KB  (visual diagrams)
└── README-AB-TESTING.md              5 KB  (this file)

types/
└── ab-testing.ts                     8 KB  (type definitions)

lib/email-sequences/
└── ab-testing.ts                    11 KB  (core logic)

scripts/
└── ab-test-example.ts                9 KB  (examples)

TOTAL: ~95 KB of documentation + code
```

---

## 🚨 Critical Reminders

### Before Starting ANY Test:

1. ✅ **Clear hypothesis** - What will win and why?
2. ✅ **Sufficient sample** - 500+ per variant minimum
3. ✅ **Guardrails set** - Unsub <0.5%, Spam <0.05%
4. ✅ **Action plan** - What changes if A wins? B wins?

### Never Do This:

- ❌ Stop test at 90% confidence (wait for 95%)
- ❌ Run test with <500 per variant
- ❌ Peek at results daily and stop early (p-hacking)
- ❌ Test 5 variants without adjusting significance threshold
- ❌ Ignore practical significance (0.1% improvement not worth it)

### Always Do This:

- ✅ Decide sample size + duration upfront
- ✅ Monitor guardrails (unsub rate)
- ✅ Wait for 2+ sends / 1+ week
- ✅ Document learnings
- ✅ Apply insights to next test

---

*Scientific testing. Compounding improvements. Predictable results.*
