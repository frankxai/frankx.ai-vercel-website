'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function ConnectLandedTracker() {
  const params = useSearchParams()

  useEffect(() => {
    const referral = params?.get('ref')
    const hasCampaignTag = Boolean(
      params?.get('utm_source') ||
      params?.get('utm_medium') ||
      params?.get('utm_campaign') ||
      params?.get('e') ||
      params?.get('event') ||
      referral
    )
    const entry =
      referral === 'mvu-sabrina'
        ? 'mvu_sabrina_briefing'
        : hasCampaignTag
          ? 'tagged_link'
          : 'direct_or_referral'

    trackEvent('connect_landed', { entry })
  }, [params])

  return null
}
