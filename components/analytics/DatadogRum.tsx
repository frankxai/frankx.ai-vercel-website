'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

import { allowsAnalyticsMeasurement, sanitizeAnalyticsEventUrl } from '@/lib/analytics-policy'
import { DATADOG_RUM_SCRIPT_URL, datadogRumConfig } from '@/lib/datadog-rum-config'

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

type RumEvent = { view?: { url?: string; referrer?: string } }

type DatadogRumGlobal = {
  init: (options: Record<string, unknown>) => void
}

declare global {
  interface Window {
    DD_RUM?: DatadogRumGlobal
  }
}

// Next inlines NEXT_PUBLIC_* only for static `process.env.NAME` reads, so each is spelled out.
const config = datadogRumConfig({
  NEXT_PUBLIC_DD_RUM_APPLICATION_ID: process.env.NEXT_PUBLIC_DD_RUM_APPLICATION_ID,
  NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN: process.env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN,
  NEXT_PUBLIC_DD_RUM_SAMPLE_RATE: process.env.NEXT_PUBLIC_DD_RUM_SAMPLE_RATE,
  NEXT_PUBLIC_DD_RUM_ENV: process.env.NEXT_PUBLIC_DD_RUM_ENV,
})

let rumInitialized = false

/** Datadog expects beforeSend to edit the event in place; only the URL fields are touched. */
function redactViewUrls(event: RumEvent): true {
  if (event.view?.url) event.view.url = sanitizeAnalyticsEventUrl(event.view.url)
  if (event.view) event.view.referrer = ''
  return true
}

function initRum() {
  if (!config || rumInitialized || !window.DD_RUM) return
  rumInitialized = true
  window.DD_RUM.init({
    ...config,
    trackingConsent: 'granted',
    beforeSend: redactViewUrls,
  })
}

/**
 * Real user monitoring with the same gate as PrivacySafeAnalytics: nothing loads until the
 * browser's Do Not Track and Global Privacy Control signals are read and allow measurement.
 * Renders nothing, and loads nothing, when the env vars are unset.
 */
export function DatadogRum() {
  const [measurementAllowed, setMeasurementAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    const privacyNavigator = navigator as PrivacyNavigator
    setMeasurementAllowed(
      allowsAnalyticsMeasurement(privacyNavigator.doNotTrack, privacyNavigator.globalPrivacyControl),
    )
  }, [])

  if (!config || measurementAllowed !== true) return null

  return <Script id="datadog-rum" src={DATADOG_RUM_SCRIPT_URL} strategy="afterInteractive" onLoad={initRum} />
}
