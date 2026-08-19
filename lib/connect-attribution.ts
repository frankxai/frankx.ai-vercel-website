export type ConnectEntry =
  | 'mvu_sabrina_briefing'
  | 'tagged_link'
  | 'direct_or_referral'

type SearchParamsReader = {
  get(name: string): string | null
}

export function getConnectLandedProperties(
  params: SearchParamsReader,
): { entry: ConnectEntry } {
  const referral = params.get('ref')
  const hasCampaignTag = Boolean(
    params.get('utm_source') ||
    params.get('utm_medium') ||
    params.get('utm_campaign') ||
    params.get('e') ||
    params.get('event') ||
    referral
  )

  return {
    entry:
      referral === 'mvu-sabrina'
        ? 'mvu_sabrina_briefing'
        : hasCampaignTag
          ? 'tagged_link'
          : 'direct_or_referral',
  }
}
