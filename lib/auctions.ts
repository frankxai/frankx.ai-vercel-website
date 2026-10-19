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

type AuctionWindow = { status: string; startingBid: number; startTime?: string; endTime: string }

/**
 * The shop's auction card label. It uses the same window check as /auctions and the bid API, so
 * the shop never calls a set of closed drops live.
 */
export function auctionShopLabel(auctions: AuctionWindow[], now: number = Date.now()) {
  const live = auctions.filter((auction) => auction.status === 'active' && isAuctionWindowOpen(auction, now))
  if (live.length > 0) {
    const lowestBid = Math.min(...live.map((auction) => auction.startingBid))
    return { title: 'Live auctions', badge: 'Live', priceRange: `Bids from $${lowestBid}` }
  }
  // /auctions lists `upcoming` drops as open, so the shop can say "Upcoming" for those.
  if (auctions.some((auction) => auction.status === 'upcoming')) {
    return { title: 'Auctions', badge: 'Upcoming', priceRange: '' }
  }
  // An `active` drop that has not reached its start time is listed under Closed Drops on
  // /auctions, so the shop claims neither "Upcoming" nor "closed" for it.
  const notStartedYet = (auction: AuctionWindow) => {
    const start = auction.startTime ? Date.parse(auction.startTime) : NaN
    return auction.status === 'active' && Number.isFinite(start) && now < start
  }
  if (auctions.some(notStartedYet)) {
    return { title: 'Auctions', badge: 'See drop schedule', priceRange: '' }
  }
  return { title: 'Auctions', badge: 'All drops closed', priceRange: '' }
}
