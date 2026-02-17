# A/B Testing Quick Reference Card
*Fast decision-making guide for email variant testing*

---

## Before Starting a Test

### ✅ Pre-Flight Checklist

- [ ] **Clear hypothesis**: What will win and why?
- [ ] **Single variable**: Testing one thing at a time?
- [ ] **Sufficient sample**: 500+ per variant available?
- [ ] **Sufficient duration**: Can run 2+ sends / 1+ week?
- [ ] **Measurable impact**: 0.5%+ improvement worth it?
- [ ] **Guardrails set**: Max unsub/spam thresholds?
- [ ] **Action plan**: What if A wins? B wins? Tie?

---

## Sample Size Calculator

| Baseline Rate | Target Rate | Improvement | Sample per Variant |
|--------------|-------------|-------------|-------------------|
| 3% | 4% | +1% | 1,556 |
| 3% | 4.5% | +1.5% | 694 |
| 3% | 5% | +2% | 392 |
| 2% | 3% | +1% | 2,338 |
| 2% | 4% | +2% | 588 |

**FrankX Recommendation:** 500 minimum per variant (1,000 total for 2-variant test)

---

## Confidence Level Guide

| Confidence | P-Value | Meaning | Action |
|-----------|---------|---------|--------|
| <80% | >0.20 | No signal | Continue or abandon |
| 80-90% | 0.10-0.20 | Weak signal | Extend or segment |
| 90-95% | 0.05-0.10 | Moderate | Suggestive, validate |
| **95-99%** | **0.01-0.05** | **Strong** | **Declare winner** ✅ |
| >99% | <0.01 | Very strong | High confidence ✅✅ |

**Target:** 95% confidence before declaring winner

---

## When to Stop a Test

### ✅ Stop If:
- 95%+ confidence + 500+ sample + 2+ sends + 0.5%+ improvement
- Catastrophic failure (>5% unsub spike, deliverability issue)
- External invalidation (site down, major news event)

### ⏳ Keep Running If:
- 90-95% confidence (extend duration)
- <500 sample (extend sends)
- Only 1 send completed (day-of-week variance)
- Top variant <0.5% better (not practical)

### 🛑 Abort If:
- >1% unsub rate spike
- >0.1% spam report rate
- Invalid tracking data (check implementation)

---

## Template Decision Matrix

### Dark Glass
**When to use:**
- Product launches (premium feel)
- Ecosystem updates (brand alignment)
- Mobile-first audience (60%+ opens)
- Apple Mail heavy (dark mode)

**Avoid when:**
- Long-form articles (readability issues)
- Desktop-heavy audience
- Gmail light mode dominant

### White Minimal
**When to use:**
- Long articles (2,000+ words)
- Technical tutorials (focus on content)
- Desktop-heavy audience
- Gmail heavy (light mode default)

**Avoid when:**
- Need visual impact
- Brand showcase moments
- Mobile-only audience

### Gradient Cards
**When to use:**
- Multi-topic digests
- Curated link roundups
- Design-conscious audience
- Need visual separation

**Avoid when:**
- Single-topic email
- Accessibility priority (gradient contrast)
- Plain/simple aesthetic

---

## Metrics Hierarchy

### Primary (Decide Winner)
1. **Click Rate** (60% weight) - True engagement
2. **Open Rate** (40% weight) - Initial interest

### Secondary (Guardrails)
- **Unsubscribe Rate** - Must stay <0.5%
- **Spam Report Rate** - Must stay <0.05%

### Tertiary (Learning)
- Reply rate (bonus signal)
- Device/client breakdown
- Time to click
- Link heatmap

---

## Segment Strategies

| Segment | Size | Best For | Caution |
|---------|------|----------|---------|
| **Active** | 300-700 | Incremental improvements | May not represent full list |
| **New** | 200-500 | Bold experiments | Higher tolerance for change |
| **Dormant** | 200-400 | Re-engagement variants | Low engagement, high unsub risk |
| **Full List** | 500+ | Final validation | Most representative |

**FrankX Strategy:**
1. Test on Active (fastest signal)
2. Validate on Full List
3. Customize per segment if data supports

---

## 2-Variant Test Timeline

### Day 1: Setup
- Create variants
- Set up tracking
- Validate configuration

### Days 2-8: Send 1
- Send to 500 per variant (1,000 total)
- Monitor deliverability
- Check guardrails

### Days 9-15: Send 2
- Second batch (500 per variant)
- Combine data
- Calculate significance

### Day 16: Analysis
- Check confidence (95%+)
- Check sample (500+ per variant)
- Check duration (2 sends, 1 week+)
- Declare winner or extend

---

## Statistical Significance Cheat Sheet

**Formula (Two-Proportion Z-Test):**
```
z = (p₁ - p₂) / SE
SE = √(p × (1-p) × (1/n₁ + 1/n₂))
p-value = 2 × (1 - normalCDF(|z|))
```

**Quick Check:**
- If z-score > 1.96 → Likely significant (95%)
- If z-score > 2.58 → Very significant (99%)
- If z-score < 1.65 → Not significant

**Online Calculators:**
- [Evan Miller](https://www.evanmiller.org/ab-testing/chi-squared.html)
- [Optimizely](https://www.optimizely.com/sample-size-calculator/)

---

## Common Pitfalls

| Mistake | Why Bad | Fix |
|---------|---------|-----|
| **P-hacking** | Run until see significance | Decide sample/duration upfront |
| **Peeking** | Check daily, stop early | Only check at milestones |
| **Multiple comparisons** | Test 5 variants, use p<0.05 | Use Bonferroni (p<0.01 for 5) |
| **Ignoring practical** | 0.1% improvement "significant" | Set min improvement (0.5-1%) |
| **Small samples** | 50 per variant "good enough" | Always aim for 500+ |

---

## FrankX Phase 1 Test

**Test Name:** Email Template Redesign
**Hypothesis:** Dark glass performs better due to brand alignment

### Configuration
- Variant A: Dark Glass (50%)
- Variant B: White Minimal (50%)
- Segment: Active subscribers (opened last 3)
- Sample: 500 per variant (1,000 total)
- Primary metric: Click rate
- Threshold: 95% confidence

### Success Criteria
- Click rate improvement: >0.5% absolute
- Unsub rate: <0.5%
- Sample: 500+ per variant
- Duration: 2 sends / 1 week
- Confidence: 95%+

### Timeline
- Week 1: Setup + Send 1
- Week 2: Send 2 + Analyze
- Week 3: Declare winner + Update default

### Next Tests
1. CTA placement (top+bottom vs bottom only)
2. Subject line formula (question vs benefit vs curiosity)
3. Personalization (generic vs name+interest)

---

## Emergency Stops

### Immediate Stop Triggers
- Unsub rate >1% (vs <0.5% normal)
- Spam reports >0.1% (vs <0.05% normal)
- Deliverability <95% (check Resend)
- Major tracking bug (data invalid)
- Site outage during send

### Invalidation Events
- Major news event (affects open behavior)
- Email client update (rendering issue)
- List import (audience shift)
- Seasonal anomaly (holiday, Black Friday)

### Recovery Actions
1. Pause test immediately
2. Identify cause
3. Fix issue
4. Reset metrics if needed
5. Restart test or adjust design

---

## Test Documentation Template

```markdown
## AB Test #XXX: [Test Name]

**Hypothesis:** [What you think will happen and why]

**Configuration:**
- Variants: [List with weights]
- Segment: [Active/New/Full]
- Sample: [Per variant]
- Metric: [Click rate/Open rate]
- Threshold: [95%]

**Result:** [CONFIRMED/REJECTED]

**Winner:** [Variant name] with [X%] vs [Y%] ([Z%] confidence)

**Why It Won:**
- [Insight 1]
- [Insight 2]
- [Insight 3]

**Segments:**
- Mobile: [Finding]
- Desktop: [Finding]
- Apple Mail: [Finding]
- Gmail: [Finding]

**Insight:** [One key learning]

**Action:** [What changes as a result]

**Next Test:** [Follow-up test idea]
```

---

## TypeScript Quick Start

### Select Variant
```typescript
import { selectVariant } from '@/lib/email-sequences/ab-testing'

const variant = selectVariant(test, subscriberId)
// Same subscriber always gets same variant (deterministic)
```

### Calculate Significance
```typescript
import { calculateSignificance } from '@/lib/email-sequences/ab-testing'

const result = calculateSignificance({
  metricA: 0.03,  // 3% click rate
  metricB: 0.05,  // 5% click rate
  sampleA: 500,
  sampleB: 500,
})

console.log(result.confidence) // 98.7
console.log(result.isSignificant) // true
```

### Check Test Completion
```typescript
import { checkTestCompletion } from '@/lib/email-sequences/ab-testing'

const check = checkTestCompletion({
  test,
  variantMetrics: [
    { variantId: 'a', delivered: 500, clicked: 15, clickRate: 0.03 },
    { variantId: 'b', delivered: 500, clicked: 25, clickRate: 0.05 },
  ],
})

console.log(check.isComplete) // true
console.log(check.recommendation) // "Declare winner: B..."
```

---

## Resources

### Calculators
- [Evan Miller A/B Test](https://www.evanmiller.org/ab-testing/chi-squared.html)
- [Sample Size Calculator](https://www.optimizely.com/sample-size-calculator/)
- [Duration Calculator](https://vwo.com/tools/ab-test-duration-calculator/)

### Testing Tools
- **Resend Analytics** - Built-in tracking (free)
- **Litmus** - Email client testing ($99/mo)
- **Mail Tester** - Spam score (free)

### Books
- [Trustworthy Online Controlled Experiments](https://www.amazon.com/dp/1108724264)

---

*Ship fast. Measure rigorously. Compound insights.*
