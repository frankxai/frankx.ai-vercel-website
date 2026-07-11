'use client'

import { useSyncExternalStore } from 'react'
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import {
  allowsAnalyticsMeasurement,
  hasDoNotTrack,
  sanitizeAnalyticsUrl,
} from '@/lib/analytics-policy'

const subscribeToMeasurementPolicy: (onStoreChange: () => void) => () => void = () => () => {}
const getServerMeasurementPermission = () => false
const getBrowserMeasurementPermission = () =>
  allowsAnalyticsMeasurement(typeof navigator !== 'undefined' ? navigator.doNotTrack : undefined)

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
  const measurementAllowed = useSyncExternalStore(
    subscribeToMeasurementPolicy,
    getBrowserMeasurementPermission,
    getServerMeasurementPermission,
  )

  if (!measurementAllowed) return null

  return (
    <>
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  )
}
