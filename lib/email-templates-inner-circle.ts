/**
 * Inner Circle email templates — dedicated sequence for /inner-circle waitlist + members.
 *
 * Why this file exists:
 * The generic welcome sequence (lib/email-templates-welcome.ts) sends the same Email 1
 * to every listType, which means /inner-circle signups read a pitch for the prompt
 * library and GenCreator OS — not what they signed up for.
 *
 * Per /hub-audit inner-circle launch-readiness audit (2026-05-22, T-10 to launch),
 * this gap is the second-biggest launch risk after pricing silence. Top operators
 * (Lenny, Sahil, Pomp Letter) all send a listType-specific welcome that addresses
 * what the reader just signed up for.
 *
 * Wiring:
 *   app/api/subscribe/route.ts conditional branch on listType === 'inner-circle'
 *   → sendInnerCircleWelcome(email, name)
 *
 * Three-email sequence:
 *   1. Waitlist confirmation (sends immediately on signup)
 *   2. Pricing reveal (sends 2026-05-27 — T-5 from launch — bulk send to all waitlist)
 *   3. Launch day (sends 2026-06-01 09:00 CET to confirmed Circle members)
 */

import type { ReactNode } from 'react'

export interface InnerCircleEmailContext {
  /** Recipient first name, if captured during signup. */
  name?: string
  /** Recipient email — for unsubscribe links. */
  email: string
  /** Waitlist join timestamp (ISO). */
  joinedAt?: string
  /** Optional: waitlist position number (e.g., "47" → user knows they're 47th in line) */
  waitlistPosition?: number
}

// ============================================================================
// Email 1: Waitlist Confirmation (immediate)
// ============================================================================

export function innerCircleWaitlistEmail(ctx: InnerCircleEmailContext) {
  const greeting = ctx.name ? `Hi ${ctx.name}` : 'Hi there'

  return {
    subject: `You're on the Inner Circle interest list`,
    preview: 'One note when the scope is real. No payment is collected.',
    plainText: `${greeting},

You're on the Inner Circle interest list.

Inner Circle is not currently open. It is not a paid membership or a live community, and no payment is collected.

You'll get one note when the scope, cadence and operating contract are real, plus occasional FrankX field notes. Unsubscribe anytime.

If you have a question, hit reply.

—Frank

Frank Riemer
AI Architect · FrankX founder
Creator of FrankX — frankx.ai

---
Unsubscribe: https://frankx.ai/unsubscribe?email=${encodeURIComponent(ctx.email)}&list=inner-circle
`,
  }
}

// ============================================================================
// Email 2: Pricing Reveal (T-5 — sent 2026-05-27 to entire waitlist)
// ============================================================================

export function innerCirclePricingRevealEmail(ctx: InnerCircleEmailContext & {
  /** Circle tier monthly price (e.g., "$119"). Sourced from data/inner-circle/pricing.ts. */
  circleMonthly: string
  /** Circle tier annual price (e.g., "$999"). */
  circleAnnual: string
  /** Founding-member bonus copy (e.g., "First 100: founders Slack + exclusive July masterclass") */
  foundingBonus: string
}) {
  const greeting = ctx.name ? `Hi ${ctx.name}` : 'Hi'

  return {
    subject: `Inner Circle pricing — locked in`,
    preview: `${ctx.circleMonthly}/month or ${ctx.circleAnnual}/year. Doors open June 1.`,
    plainText: `${greeting},

Inner Circle pricing, as promised:

CIRCLE — ${ctx.circleMonthly}/month or ${ctx.circleAnnual}/year (save ~30%)

What's inside:
• Weekly Creation Chronicles dispatch (also sent to free tier)
• Selected Chronicles essays (members only)
• Private vault: prompt packs, agent templates, sonic drops, video lessons
• Monthly live masterclass (recorded + indexed in vault)
• Live build labs every other week (real-time, hands-on)
• Template + prompt pack access (updated weekly)

ALLIANCE — Starting $2,000/month, custom scope
Bespoke strategy + dedicated agent builds + executive briefings.
Reply if interested; this is conversation, not checkout.

FOUNDING MEMBER BONUS
${ctx.foundingBonus}

Billing starts June 1, 2026. Cancel anytime, no lock-in, one click.

Doors open Monday June 1 09:00 CET. The checkout email lands in your inbox at that exact moment.

If you want to think about it, you have until next Monday. If you already know, hit reply with "yes" and I'll save your spot.

—Frank

P.S. The math: at ${ctx.circleAnnual}/year, the cost-per-day works out to ~$2.70. The agent desk alone — submit a prompt or workflow question, get specialist-agent guidance — runs ~3-4x that in any consulting market. The labs, the masterclasses, the vault are the rest of the value. I priced it where I would have paid for it three years ago.

---
Unsubscribe: https://frankx.ai/unsubscribe?email=${encodeURIComponent(ctx.email)}&list=inner-circle
`,
  }
}

// ============================================================================
// Email 3: Launch Day (sent 2026-06-01 09:00 CET to all Circle members)
// ============================================================================

export function innerCircleLaunchEmail(ctx: InnerCircleEmailContext & {
  /** First masterclass URL + date */
  firstMasterclassUrl: string
  firstMasterclassDate: string
  /** First lab session date */
  firstLabDate: string
  /** Vault access URL */
  vaultUrl: string
}) {
  const greeting = ctx.name ? `Welcome in, ${ctx.name}` : 'Welcome in'

  return {
    subject: `You're in. Inner Circle access is live.`,
    preview: 'Your vault URL + first masterclass date + first lab session below.',
    plainText: `${greeting}.

Inner Circle is live as of 09:00 CET.

YOUR ACCESS

Vault → ${ctx.vaultUrl}
(Bookmark this. New drops every Tuesday + Friday.)

FIRST MASTERCLASS
${ctx.firstMasterclassDate} — ${ctx.firstMasterclassUrl}
60 minutes. Live + recorded. Bring one question I should answer.

FIRST LIVE BUILD LAB
${ctx.firstLabDate}
This is where we build something real together. Format: 90 minutes, you bring the goal, we ship in the session, the artifact goes into the vault.

WHAT TO DO TODAY

1. Click the vault link, scroll through the first 10 items. The agent template index is the one to start with.
2. Add the masterclass + lab dates to your calendar. They don't reschedule.
3. Reply to this email with one thing you want me to address in the first masterclass. I'll write the agenda from your replies.

That's it. No onboarding video to watch, no 7-day course to complete, no "next step" button to click. The work is the work.

See you ${ctx.firstMasterclassDate}.

—Frank

P.S. You're a founding member. If you joined before May 30, your name is in the founders Slack channel that opened this morning. Look for the invite in a separate email within 2 hours.

---
Member dashboard: https://frankx.ai/inner-circle/dashboard
Cancel anytime: https://frankx.ai/inner-circle/cancel
`,
  }
}

// ============================================================================
// Helper: build context from subscribe API payload
// ============================================================================

export function buildInnerCircleContext(payload: {
  email: string
  name?: string
  joinedAt?: string
}): InnerCircleEmailContext {
  return {
    email: payload.email,
    name: payload.name,
    joinedAt: payload.joinedAt ?? new Date().toISOString(),
    // waitlistPosition wired by the API route after counting prior signups
  }
}
