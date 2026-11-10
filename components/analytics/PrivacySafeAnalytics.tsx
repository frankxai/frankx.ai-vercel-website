'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { allowsAnalyticsMeasurement } from '@/lib/analytics-policy'
import { privacySafeBeforeSend } from '@/lib/privacy-safe-analytics-client'
import { getInboundUtm } from '@/lib/utm'

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

/**
 * Privacy-aware wrapper.
 * We now render Analytics and SpeedInsights while respecting DNT and GPC signals.
 */
export function PrivacySafeAnalytics() {
  const [measurementAllowed, setMeasurementAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const privacyNavigator = navigator as PrivacyNavigator
    const allowed = allowsAnalyticsMeasurement(
      privacyNavigator.doNotTrack,
      privacyNavigator.globalPrivacyControl,
    )
    // Remember the landing page's utm_* for the tab, so a conversion on a later
    // page still carries its campaign. Skipped when measurement is declined.
    if (allowed) getInboundUtm()
    setMeasurementAllowed(allowed)
  }, [])

  // Fail closed while browser privacy signals are still unresolved.
  if (measurementAllowed !== true) return null

  return (
    <>
      <Analytics beforeSend={privacySafeBeforeSend} />
      <SpeedInsights />
    </>
  )
}
