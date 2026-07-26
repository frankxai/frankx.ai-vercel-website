'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { allowsAnalyticsMeasurement } from '@/lib/analytics-policy'
import { initializePrivacySafeAnalytics } from '@/lib/privacy-safe-analytics-client'

const subscribeToMeasurementPolicy: (onStoreChange: () => void) => () => void = () => () => {}
const getServerMeasurementPermission = () => false
const getBrowserMeasurementPermission = () =>
  allowsAnalyticsMeasurement(typeof navigator !== 'undefined' ? navigator.doNotTrack : undefined)

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

  useEffect(() => {
    if (measurementAllowed) {
      initializePrivacySafeAnalytics()
    }
  }, [measurementAllowed])

  if (!measurementAllowed) return null

  return <SpeedInsights />
}
