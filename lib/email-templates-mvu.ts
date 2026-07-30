/**
 * Mindvalley U 2026 (Tallinn) — email for the native RSVP on frankx.ai/mvu/lab.
 *
 * Plain text on purpose. This lands minutes after someone decides to come to a
 * small room in a foreign city — a marketing HTML shell would break the moment.
 * Same restrained register as the Inner Circle waitlist confirmation.
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

I read that. When we build the spine on the day, that's the thing we'll point
it at — not a generic template.`
    : ''

  return {
    subject: 'You’re on the list for the Tallinn lab',
    plainText: `${greeting}

Thank you — that means something. You didn't just save a date; you decided to
spend ninety minutes of a rare two weeks building something that lasts.

Here's the honest shape of it. The lab is capped small and I approve each seat
by hand, so it stays a room and not an audience. If there's a seat for you,
you'll get the time, the place, and one thing to bring. If the room fills before
I reach you, I'll tell you straight — no waitlist theatre.
${heard}

Either way, I'm glad our paths crossed in Tallinn.

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
 * Sent to Frank, not the registrant. He is on his feet at a two-week summit —
 * email is the only surface he'll actually read, so each RSVP (and the human
 * behind it) is pushed to him for the approve/decline call.
 */
export function mvuRsvpAlert({ email, name, intention }: MvuRsvpAlertInput) {
  return {
    subject: `MVU lab RSVP: ${name || email}`,
    plainText: `${name || 'Someone'} <${email}> wants a seat at the Tallinn lab.
${intention ? `\nWhat they want to leave with:\n  "${intention.trim()}"\n` : ''}
Approve or decline by hand — the seat is real, keep the room small.

— frankx.ai/mvu/lab
`,
  }
}
