'use client'

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { hasDoNotTrack, sanitizeAnalyticsUrl } from '@/lib/analytics-policy'

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (hasDoNotTrack(typeof navigator === 'undefined' ? undefined : navigator.doNotTrack)) {
    return null
  }

  return {
    ...event,
    url: sanitizeAnalyticsUrl(event.url),
  }
}

/**
 * The site's only default browser measurement surface.
 *
 * Vercel Web Analytics is aggregate and cookieless. Optional marketing
 * providers stay unmounted until the product has a real consent control.
 */
export function PrivacySafeAnalytics() {
  return (
    <>
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  )
}
