/**
 * "Second Brain That Survives the Summit" — the one independent lab Frank may
 * host during MVU week two. Single source of truth for the /mvu/lab page.
 *
 * RSVP is native to frankx.ai — no third-party event tool. Registrations flow
 * through /api/subscribe (mvu-tallinn-2026) and Frank approves each seat by
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
  /** Human date string, e.g. "Thursday 31 July 2026". Empty until set. */
  dateLabel: string
  /** Human time string, e.g. "17:00–18:30". Empty until set. */
  timeLabel: string
  /** Neighbourhood only until confirmed — exact address goes in the approval email, never Git. */
  venueLabel: string
  city: string
  capacity: number
  price: string
}

export const MVU_LAB: MvuLab = {
  confirmed: false,
  title: 'Second Brain That Survives the Summit',
  tagline:
    'Ninety minutes to leave Tallinn with a system that keeps what you found here — not a camera roll of slides you never reopen.',
  dateLabel: '', // e.g. 'Thursday 31 July 2026' — set when locked
  timeLabel: '', // e.g. '17:00–18:30'
  venueLabel: '', // e.g. 'Central Tallinn — exact address in your confirmation'
  city: 'Tallinn',
  capacity: 16,
  price: 'Free — approval-gated',
}
