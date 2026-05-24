'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function ConnectLandedTracker() {
  const params = useSearchParams()

  useEffect(() => {
    const utmSource = params?.get('utm_source') ?? undefined
    const utmMedium = params?.get('utm_medium') ?? undefined
    const utmCampaign = params?.get('utm_campaign') ?? undefined
    const eventTag = params?.get('e') ?? params?.get('event') ?? undefined

    trackEvent('connect_landed', {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      event_tag: eventTag,
    })
  }, [params])

  return null
}
