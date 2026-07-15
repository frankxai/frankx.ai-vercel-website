'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function ConnectLandedTracker() {
  const params = useSearchParams()

  useEffect(() => {
    const hasCampaignTag = Boolean(
      params?.get('utm_source') ||
      params?.get('utm_medium') ||
      params?.get('utm_campaign') ||
      params?.get('e') ||
      params?.get('event')
    )

    trackEvent('connect_landed', {
      entry: hasCampaignTag ? 'tagged_link' : 'direct_or_referral',
    })
  }, [params])

  return null
}
