'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { allowsAnalyticsMeasurement } from '@/lib/analytics-policy'
import { privacySafeBeforeSend } from '@/lib/privacy-safe-analytics-client'

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

/**
 * Privacy-aware wrapper.
 * We now render Analytics and SpeedInsights while respecting DNT and GPC signals.
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

  if (measurementAllowed === false) return null

  return (
    <>
      <Analytics beforeSend={privacySafeBeforeSend} />
      <SpeedInsights />
    </>
  )
}
