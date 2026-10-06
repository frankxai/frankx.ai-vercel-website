'use client'

import {
  inject,
  track as trackVercelEvent,
  type BeforeSendEvent,
} from '@vercel/analytics'

import {
  allowsAnalyticsMeasurement,
  sanitizeAnalyticsProperties,
  sanitizeAnalyticsUrl,
} from './analytics-policy.ts'

let analyticsInitialized = false

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean }

function browserAllowsAnalyticsMeasurement(): boolean {
  if (typeof window === 'undefined') return false

  const privacyNavigator = window.navigator as PrivacyNavigator
  return allowsAnalyticsMeasurement(
    privacyNavigator.doNotTrack,
    privacyNavigator.globalPrivacyControl,
  )
}

/**
 * Keep the origin. Vercel drops the event when `url` is only a path
 * (`body/o must match pattern ^https?://`). Query and hash stay removed.
 */
function absoluteAnalyticsUrl(pathname: string, source: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  try {
    return `${new URL(source).origin}${path}`
  } catch {
    return `https://www.frankx.ai${path}`
  }
}

export function privacySafeBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (!browserAllowsAnalyticsMeasurement()) return null

  return {
    ...event,
    url: absoluteAnalyticsUrl(sanitizeAnalyticsUrl(event.url), event.url),
  }
}

export function initializePrivacySafeAnalytics(): boolean {
  if (!browserAllowsAnalyticsMeasurement()) return false
  if (analyticsInitialized) return true

  try {
    inject({ beforeSend: privacySafeBeforeSend })
    analyticsInitialized = true
    return true
  } catch {
    return false
  }
}

export function trackPrivacySafeAnalyticsEvent(
  name: string,
  properties: Record<string, unknown> = {},
): boolean {
  if (!initializePrivacySafeAnalytics()) return false

  try {
    trackVercelEvent(name, sanitizeAnalyticsProperties(properties))
    return true
  } catch {
    return false
  }
}
