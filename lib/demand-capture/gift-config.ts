import type { WaitlistCopy } from './WaitlistForm.tsx'

/**
 * The gift: within a minute of joining, one email with a first practice the person can
 * finish in about 15 minutes. Staged switched off. Sending email is Frank's decision
 * (AGENTS.md §5e), so turning it on is a one-line change to `live`, reviewed like any other.
 */
export type Gift = {
  live: boolean
  title: string
  url: string
  minutes: number
  what: string
  from: string
  replyTo: string
}

export const GIFTS: Record<string, Gift> = {
  'starlight-academy-operator-lab': {
    live: false,
    title: 'Did the agent actually finish?',
    url: 'https://starlightintelligence.academy/academy/evaluation?mode=guided&case=trace-is-not-outcome&utm_source=waitlist&utm_medium=email&utm_campaign=operator-lab-gift',
    minutes: 15,
    what:
      'An agent reports that a supplier update is done. You get three pieces of synthetic evidence and make three calls: what happened, what is missing, and whether you would sign it off. Then you compare your calls with the reference.',
    from: 'Frank <frank@mail.frankx.ai>',
    replyTo: 'frank@frankx.ai',
  },
}

/** Form copy that mentions the gift, only while it is live, so the page never promises an email that is not sent. */
export function giftCopy(productId: string): Partial<WaitlistCopy> {
  const gift = GIFTS[productId]
  if (!gift?.live) return {}
  return {
    quiet: `A first practice by email now, about ${gift.minutes} minutes. Then one email when it opens.`,
    // Neutral on purpose: the reply cannot know whether the email arrived, and must not reveal
    // whether the address was new. It names the practice and a fallback, not a delivery.
    doneText: `You are on the list. New members get a first practice by email, about ${gift.minutes} minutes. If it is not there in a few minutes, check spam or write to ${gift.replyTo}. The next email comes when {product} opens.`,
  }
}
