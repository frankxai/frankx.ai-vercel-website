'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

import { allowsAnalyticsMeasurement, sanitizeAnalyticsEventUrl } from '@/lib/analytics-policy'
import {
  DATADOG_RUM_SCRIPT_URL,
  datadogRumConfig,
  isSensitiveRumPath,
  redactRumPath,
} from '@/lib/datadog-rum-config'

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

type RumEvent = {
  type?: string
  view?: { url?: string; referrer?: string; name?: string }
  resource?: { url?: string }
  error?: { resource?: { url?: string } }
}

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

function pathOf(url: string): string {
  try {
    return new URL(url, 'https://frankx.invalid').pathname
  } catch {
    return url.split(/[?#]/, 1)[0]
  }
}

/** Drops the query and hash, then swaps any credential in the path for ":token". */
function redactUrl(url: string): string {
  const withoutQuery = sanitizeAnalyticsEventUrl(url)
  try {
    const parsed = new URL(withoutQuery)
    parsed.pathname = redactRumPath(parsed.pathname)
    return parsed.toString()
  } catch {
    return redactRumPath(withoutQuery)
  }
}

/**
 * Datadog expects beforeSend to edit the event in place and cannot discard view events, so a view
 * on a credential route is rewritten and every other event raised there is dropped.
 */
function redactRumEvent(event: RumEvent): boolean {
  const onCredentialPage = Boolean(event.view?.url && isSensitiveRumPath(pathOf(event.view.url)))
  if (onCredentialPage && event.type !== 'view') return false

  if (event.view?.url) event.view.url = redactUrl(event.view.url)
  if (event.view?.name) event.view.name = redactRumPath(pathOf(event.view.name))
  if (event.view) event.view.referrer = ''
  if (event.resource?.url) event.resource.url = redactUrl(event.resource.url)
  if (event.error?.resource?.url) event.error.resource.url = redactUrl(event.error.resource.url)
  return true
}

function initRum() {
  if (!config || rumInitialized || !window.DD_RUM) return
  rumInitialized = true
  window.DD_RUM.init({
    ...config,
    trackingConsent: 'granted',
    beforeSend: redactRumEvent,
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
