/**
 * "Second Brain That Survives the Summit" — the one independent lab Frank may
 * host during MVU week two. Single source of truth for the /mvu/lab page.
 *
 * Frank edits THIS file to set the final date, venue, and RSVP link. Until
 * `lumaUrl` is set (here or via NEXT_PUBLIC_MVU_LAB_LUMA_URL), the page shows
 * an email-capture fallback instead of a dead RSVP button — so interest is
 * never lost while the Luma event is still being created.
 */

export interface MvuLab {
  /** Whether the lab is confirmed to run. false → page shows "gauging interest". */
  confirmed: boolean
  title: string
  tagline: string
  /** Human date string, e.g. "Thursday 31 July 2026". Empty until set. */
  dateLabel: string
  /** Human time string, e.g. "17:00–18:30". Empty until set. */
  timeLabel: string
  /** Neighbourhood / venue, kept vague until confirmed (private venues stay off Git). */
  venueLabel: string
  city: string
  capacity: number
  price: string
  /** Luma event URL. Prefer the env var; this is the committed fallback. */
  lumaUrl: string
}

export const MVU_LAB: MvuLab = {
  confirmed: false,
  title: 'Second Brain That Survives the Summit',
  tagline:
    'A 90-minute lab to leave Tallinn with a working second-brain spine — not another camera roll of slides you never reopen.',
  dateLabel: '', // e.g. 'Thursday 31 July 2026' — set when locked
  timeLabel: '', // e.g. '17:00–18:30'
  venueLabel: '', // e.g. 'Central Tallinn — exact address in the confirmation'
  city: 'Tallinn',
  capacity: 16,
  price: 'Free — approval-gated',
  lumaUrl: '',
}

/** Resolved RSVP link: env wins so Frank can set it without a redeploy-blocking edit. */
export function getLabRsvpUrl(): string {
  return process.env.NEXT_PUBLIC_MVU_LAB_LUMA_URL || MVU_LAB.lumaUrl || ''
}
