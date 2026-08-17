'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { allowsAnalyticsMeasurement } from '@/lib/analytics-policy'
import { privacySafeBeforeSend } from '@/lib/privacy-safe-analytics-client'

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

/**
 * The site's only default browser measurement surface.
 *
 * Vercel Web Analytics is aggregate and cookieless. Optional marketing
 * providers stay unmounted until the product has a real consent control.
 */
export function PrivacySafeAnalytics() {
  const [measurementAllowed, setMeasurementAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const privacyNavigator = navigator as PrivacyNavigator
    setMeasurementAllowed(
      allowsAnalyticsMeasurement(
        privacyNavigator.doNotTrack,
        privacyNavigator.globalPrivacyControl,
      ),
    )
  }, [])

  if (!measurementAllowed) return null

  return (
    <>
      <Analytics beforeSend={privacySafeBeforeSend} />
      <SpeedInsights />
    </>
  )
}
