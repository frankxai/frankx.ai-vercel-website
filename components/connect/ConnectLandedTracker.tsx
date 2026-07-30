'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'
import { getConnectLandedProperties } from '@/lib/connect-attribution'

export function ConnectLandedTracker() {
  const params = useSearchParams()

  useEffect(() => {
    trackEvent('connect_landed', getConnectLandedProperties(params))
  }, [params])

  return null
}
