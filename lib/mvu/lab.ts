/**
 * "Second Brain That Survives the Summit" — the one independent lab Frank may
 * host around Mindvalley U. Single source of truth for the /mvu/lab page.
 *
 * Tallinn 2026 never got confirmed: interest was gauged, the room was never
 * locked, and no session ran. Rather than delete working plumbing, the lab now
 * points at Porto 2027 (12 Jul – 18 Aug 2027, per mindvalley.com/u), where
 * there is a year of lead time instead of a week.
 *
 * RSVP is native to frankx.ai — no third-party event tool. Registrations flow
 * through /api/subscribe (mvu-porto-2027) and Frank approves each seat by
 * hand, which is what keeps a small room a room.
 *
 * Frank edits THIS file to set the final date and venue, and flips `confirmed`
 * once the room is locked.
 */

export interface MvuLab {
  /** false → page frames it as "gauging interest" rather than "reserve a seat". */
  confirmed: boolean
  title: string
  /** The promise, in one breath. */
  tagline: string
  /** Human date string, e.g. "Thursday 22 July 2027". Empty until set. */
  dateLabel: string
  /** Human time string, e.g. "17:00–18:30". Empty until set. */
  timeLabel: string
  /** Neighbourhood only until confirmed — exact address goes in the approval email, never Git. */
  venueLabel: string
  city: string
  capacity: number
  price: string
  /** Official Mindvalley U window the lab sits alongside. */
  eventStart: string
  eventEnd: string
}

export const MVU_LAB: MvuLab = {
  confirmed: false,
  title: 'Second Brain That Survives the Summit',
  tagline:
    'Ninety minutes to leave Porto with a system that keeps what you found there — not a camera roll of slides you never reopen.',
  dateLabel: '', // e.g. 'Thursday 22 July 2027' — set when locked
  timeLabel: '', // e.g. '17:00–18:30'
  venueLabel: '', // e.g. 'Central Porto — exact address in your confirmation'
  city: 'Porto',
  capacity: 16,
  price: 'Free — approval-gated',
  eventStart: '2027-07-12',
  eventEnd: '2027-08-18',
}
