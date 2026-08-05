import valueLadderData from '@/data/value-ladder.json'

export interface ValueLadderTier {
  tier: number
  id: string
  name: string
  badge: string
  price: number
  priceDisplay: string
  billingPeriod: string
  icp: string
  headline: string
  subheadline: string
  deliverables: string[]
  roiArgument: string
  ctaText: string
  ctaHref: string
  highlight: boolean
}

export function getValueLadderTiers(): ValueLadderTier[] {
  return valueLadderData as ValueLadderTier[]
}

export function getTierById(id: string): ValueLadderTier | undefined {
  return getValueLadderTiers().find((t) => t.id === id)
}

export function getTiersByICP(icpKeyword: string): ValueLadderTier[] {
  const kw = icpKeyword.toLowerCase()
  return getValueLadderTiers().filter((t) => t.icp.toLowerCase().includes(kw))
}
