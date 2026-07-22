import offerRegistry from '@/data/site-experience/offer-registry.json'

import type { OfferRecord } from './contracts'

const offers = offerRegistry as OfferRecord[]

export function getOfferForRoute(route: string): OfferRecord | undefined {
  return offers.find((offer) => offer.route === route)
}

export function hasVerifiedPublicPrice(route: string): boolean {
  const offer = getOfferForRoute(route)
  return Boolean(offer?.verifiedPrice && offer.checkoutDestination)
}
