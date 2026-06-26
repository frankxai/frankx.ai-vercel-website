/**
 * Client-safe intake taxonomy — no Node imports, no side effects.
 *
 * The intent enum, labels, and types live here so client components
 * (e.g. components/contact/ContactForm.tsx) can import them without
 * pulling `node:fs` / `node:path` from lib/contact-intake.ts into the
 * client bundle. lib/contact-intake.ts re-exports everything here.
 */

export const INTENTS = [
  'workshop',
  'sprint',
  'partnership',
  'press',
  'advisory',
  'executive',
  'general',
] as const

export type Intent = (typeof INTENTS)[number]

export const INTENT_LABEL: Record<Intent, string> = {
  workshop: 'Workshop (1-day team build)',
  sprint: 'Implementation sprint (5–10 days)',
  partnership: 'Partnership',
  press: 'Press / speaking',
  advisory: 'Advisory / retainer',
  executive: 'Strategic Advisor (private engagement)',
  general: 'General inquiry',
}

/** Whether an intent is commercial (routes to the booking nudge in the ack). */
export const INTENT_IS_COMMERCIAL: Record<Intent, boolean> = {
  workshop: true,
  sprint: true,
  partnership: true,
  press: false,
  advisory: true,
  executive: true,
  general: false,
}

/**
 * The 24-hour artifact promised in the auto-acknowledgement, per intent.
 * See docs/strategy/PREMIUM_OPERATIONS.md — "Mechanic #1 in detail".
 * This is the single most important UX move: the requester learns within
 * 30 seconds of submitting that something useful is on the way, named.
 */
export const INTENT_24H_ARTIFACT: Record<Intent, string> = {
  workshop:
    'a 15-minute Loom critiquing your current stack and workflow, before the workshop',
  sprint:
    'a written one-page architecture critique of what you described, before the kickoff call',
  partnership:
    'a written one-page memo proposing how a partnership could be structured',
  press:
    'a concierge reply with sample quotes or answers to your questions, as relevant',
  advisory:
    'a 30-minute voice-memo on the question you raised, in office-hours format',
  executive:
    'a concierge reply naming a private call window; the one-page strategic brief follows within seven days',
  general: 'a real reply from Frank, with whatever is most useful to your question',
}
