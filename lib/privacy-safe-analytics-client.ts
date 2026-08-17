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

export function privacySafeBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (!browserAllowsAnalyticsMeasurement()) return null

  return {
    ...event,
    url: sanitizeAnalyticsUrl(event.url),
  }
}

/**
 * Establishes the provider queue and privacy middleware synchronously.
 *
 * Custom events may fire from descendant effects before the layout analytics
 * effect runs. Initializing here guarantees `beforeSend` is registered before
 * the first event and keeps the provider script singleton.
 */
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
