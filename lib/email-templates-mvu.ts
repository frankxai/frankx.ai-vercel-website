/**
 * Mindvalley U 2027 (Porto) — email for the native RSVP on frankx.ai/mvu/lab.
 *
 * Plain text on purpose. This lands minutes after someone decides to come to a
 * small room in a foreign city — a marketing HTML shell would break the moment.
 * Same restrained register as the Inner Circle waitlist confirmation.
 *
 * The register is deliberately different from the 2026 version: this arrives
 * a year ahead of the event, not during it, so it must not imply a locked room.
 */

type MvuRsvpInput = {
  name?: string
  /** What the person wrote they want to leave with — echoed back so they feel heard. */
  intention?: string
}

export function mvuRsvpConfirmation({ name, intention }: MvuRsvpInput) {
  const greeting = name ? `${name},` : 'Hi,'

  const heard = intention
    ? `

You said you want to leave with:

  "${intention.trim()}"

I read that. If this runs, that's what we point the session at — not a generic
template.`
    : ''

  return {
    subject: 'You’re on the list for the Porto lab',
    plainText: `${greeting}

Thank you — that means something.

Here's the honest shape of it. Mindvalley U runs in Porto from 12 July to
18 August 2027. This lab is not part of the official program and it is not
confirmed yet: I'm gauging whether enough people genuinely want it before I
commit to a room.

I floated the same session for Tallinn in 2026 and never locked a venue, so it
never ran. I'd rather tell you that now than let you find out later. This time
there's a year of lead time instead of a week.

You'll hear from me either way, well before July — a date and a place, or a
straight cancellation. No waitlist theatre.
${heard}

— Frank
frankx.ai/mvu
`,
  }
}

type MvuRsvpAlertInput = {
  email: string
  name?: string
  intention?: string
}

/**
 * Sent to Frank, not the registrant, so each RSVP (and the human behind it) is
 * pushed to him for the approve/decline call rather than sitting in a dashboard.
 */
export function mvuRsvpAlert({ email, name, intention }: MvuRsvpAlertInput) {
  return {
    subject: `MVU lab RSVP: ${name || email}`,
    plainText: `${name || 'Someone'} <${email}> wants a seat at the Porto lab.
${intention ? `\nWhat they want to leave with:\n  "${intention.trim()}"\n` : ''}
Approve or decline by hand — the seat is real, keep the room small.

— frankx.ai/mvu/lab
`,
  }
}
