# Checkout Recovery Series

3-email sequence to recover abandoned checkouts (started but didn't complete purchase).

---

## Email 1: "Forgot something?" (1 hour after abandonment)

**Subject:** You left something behind

**Preheader:** Your Golden Path order is waiting

**Body:**

Hey {{firstName}},

You started checking out for **The Golden Path** but didn't complete your order.

**Technical issue?** Reply and I'll help.

**Not sure if it's worth it?** I get it. $297 is real money.

Here's what you get:
- 80-page structured workbook
- 40+ interactive exercises
- 4-week transformation program
- 3 core pillars: Awareness, Emotional Mastery, Purpose
- Lifetime access + updates

**1,200+ creators** have used it. Most say Week 2 (Emotional Mastery) alone was worth 10x the price.

**Your cart is still active:**
[Complete Your Order](/soulbook/golden-path/checkout?session={{checkout_session_id}})

Questions? Hit reply.

— Frank

P.S. If you're on the fence, check the [FAQ section](/soulbook/golden-path#faq). Covers most concerns.

---

## Email 2: "Common objections" (24 hours after abandonment)

**Subject:** 3 reasons people hesitate (and why they're wrong)

**Preheader:** Addressing the "but what if..." thoughts

**Body:**

{{firstName}},

Still haven't completed your Golden Path order.

Let me guess what's holding you back:

### 1. "I don't have time for a 4-week program"

**Reality**: 30-45 minutes per day. Less time than you spend on Twitter.

Most people who say "no time" actually mean "not a priority." Which is fine - but be honest about it.

### 2. "I'm not sure it'll work for me"

**Reality**: 30-day guarantee. Try all 4 weeks. If you're not clearer about your patterns, emotions, and purpose, I refund everything.

Zero risk.

### 3. "$297 is expensive for a PDF"

**Fair point.** If you're comparing it to a $15 Kindle book, yes.

But compare it to:
- Therapy: $150/session × 4 weeks = $600+
- Coaching: $500-2,000/month
- Doing nothing: How much is lack of clarity costing you?

**This isn't a PDF. It's a structured system** that 1,200+ people have used to transform their relationship with themselves.

**Your order is still waiting:**
[Complete Your Order](/soulbook/golden-path/checkout?session={{checkout_session_id}})

— Frank

P.S. If none of this resonates, that's fine. [Delete this email and move on](#). No hard feelings.

---

## Email 3: "Final call" (48 hours after abandonment)

**Subject:** Your cart expires in 24 hours

**Preheader:** Last chance to complete your order

**Body:**

{{firstName}},

Your Golden Path checkout session expires in 24 hours.

After that, you'll need to start over.

**Here's what happens if you don't buy:**

Nothing. Seriously.

You'll keep getting my free weekly emails. You'll still have access to free resources. Life goes on.

**Here's what happens if you do buy:**

You get a structured 4-week framework for building awareness, mastering emotions, and clarifying purpose.

**The difference:**
- Not buying: You stay in reactive mode, same patterns, same outcomes
- Buying: You spend 4 weeks systematically building clarity

**Both are valid choices.** But make the choice consciously.

**Complete your order:**
[Finish Checkout - Expires in 24h](/soulbook/golden-path/checkout?session={{checkout_session_id}})

**Not ready?** No problem. You can always buy later at the regular price.

— Frank

P.S. This is the last email about this cart. After 72 hours, the session expires and I stop following up.

---

## Sequence Configuration

**Trigger**: Started checkout but didn't complete payment

**Trigger Events**:
- User clicks "Get Instant Access" button
- Lemon Squeezy checkout session created
- User leaves checkout page without payment
- No `order.success` webhook received within 10 minutes

**Targeting**:
- ✅ Created checkout session
- ❌ Payment completed
- ❌ Already owns product
- ✅ Email provided during checkout

**Schedule**:
| Email | Time After Abandonment |
|-------|------------------------|
| 1 | 1 hour (immediate recovery) |
| 2 | 24 hours (address objections) |
| 3 | 48 hours (final urgency) |

**Session Expiry**: 72 hours (Lemon Squeezy default)

**Actions**:
- Email 1: Tag `checkout-abandoned`
- Email 2: Tag `checkout-objections-sent`
- Email 3: Tag `checkout-final-warning`
- If purchases: Remove from sequence, start `golden-path-onboarding`

**Conversion Events**:
- If completes checkout: Exit sequence immediately
- If 72 hours pass: Mark session expired, remove from sequence
- If explicitly declines (clicks "delete this email"): Tag `not-interested`, remove from sequence

**Performance Goals**:
- 30% recovery rate (industry average: 10-15%)
- Email 1: 40% open rate (fresh abandonment)
- Email 2: 25% open rate (objection handling)
- Email 3: 20% open rate (final urgency)

**A/B Test Ideas**:
- Subject lines: Question vs statement vs urgency
- Timing: 1h/24h/48h vs 30m/12h/36h
- Incentive: No discount vs 10% off vs bonus resource
- Tone: Helpful vs urgent vs indifferent

---

## Revenue Impact

**Assumptions**:
- 40% of visitors start checkout (100 visitors → 40 checkouts)
- 50% complete without recovery (20 sales without emails)
- 30% recovery rate from abandoned carts (20 × 30% = 6 additional sales)

**Without Recovery Sequence**: 20 sales × $297 = $5,940/month  
**With Recovery Sequence**: 26 sales × $297 = $7,722/month  
**Incremental Revenue**: $1,782/month ($21,384/year)

**ROI**: 6 recovered sales × $297 = $1,782/month from automated emails (zero marginal cost)

---

## Technical Implementation

### Webhook Handler Updates

**Checkout Started Event**:
```typescript
// app/api/checkout/webhook/route.ts
case 'checkout.created':
  // Store checkout session
  const session = {
    id: data.id,
    email: data.customer_email,
    productId: data.product_id,
    createdAt: new Date().toISOString()
  }
  
  // Schedule recovery emails (1h, 24h, 48h)
  scheduleRecoverySequence(session)
  break;
```

**Order Success Event**:
```typescript
case 'order.created':
  // Cancel recovery sequence
  cancelRecoverySequence(data.customer_email, data.product_id)
  
  // Start upsell sequence instead
  if (data.product_id === 'golden-path') {
    enrollInSequence(subscriber.id, 'golden-path-upsell')
  }
  break;
```

### Recovery Email Scheduler

```typescript
// lib/email-sequences/recovery.ts
export function scheduleRecoverySequence(session: CheckoutSession) {
  const { id, email, productId } = session
  const now = new Date()
  
  // Email 1: 1 hour later
  createDelivery({
    subscriberId: email,
    sequenceId: 'checkout-recovery',
    stepId: 'recovery-01',
    templateId: 'recovery-01-template',
    status: 'scheduled',
    scheduledFor: addHours(now, 1).toISOString(),
    metadata: { checkoutSessionId: id, productId }
  })
  
  // Email 2: 24 hours later
  createDelivery({
    subscriberId: email,
    sequenceId: 'checkout-recovery',
    stepId: 'recovery-02',
    templateId: 'recovery-02-template',
    status: 'scheduled',
    scheduledFor: addHours(now, 24).toISOString(),
    metadata: { checkoutSessionId: id, productId }
  })
  
  // Email 3: 48 hours later
  createDelivery({
    subscriberId: email,
    sequenceId: 'checkout-recovery',
    stepId: 'recovery-03',
    templateId: 'recovery-03-template',
    status: 'scheduled',
    scheduledFor: addHours(now, 48).toISOString(),
    metadata: { checkoutSessionId: id, productId }
  })
}
```
