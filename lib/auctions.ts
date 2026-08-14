/**
 * Single source of truth for whether an auction's proposal window is open.
 * Used by the auction pages, the auction card, and the bid API so the
 * advertised start/end times actually gate submissions. Fails closed: an
 * unparseable end time counts as closed.
 */
export function isAuctionWindowOpen(
  auction: { startTime?: string; endTime: string },
  now: number = Date.now()
): boolean {
  const start = auction.startTime ? Date.parse(auction.startTime) : NaN
  const end = Date.parse(auction.endTime)
  if (Number.isFinite(start) && now < start) return false
  if (!Number.isFinite(end) || now > end) return false
  return true
}
