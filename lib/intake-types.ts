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
  'general',
] as const

export type Intent = (typeof INTENTS)[number]

export const INTENT_LABEL: Record<Intent, string> = {
  workshop: 'Workshop (1-day team build)',
  sprint: 'Implementation sprint (5–10 days)',
  partnership: 'Partnership',
  press: 'Press / speaking',
  advisory: 'Advisory / retainer',
  general: 'General inquiry',
}

/** Whether an intent is commercial (routes to the booking nudge in the ack). */
export const INTENT_IS_COMMERCIAL: Record<Intent, boolean> = {
  workshop: true,
  sprint: true,
  partnership: true,
  press: false,
  advisory: true,
  general: false,
}
