'use client'

import {
  inject,
  track as trackVercelEvent,
  type BeforeSendEvent,
} from '@vercel/analytics'

import {
  hasDoNotTrack,
  hasGlobalPrivacyControl,
  sanitizeAnalyticsProperties,
  sanitizeAnalyticsUrl,
} from './analytics-policy.ts'

let analyticsInitialized = false

export function privacySafeBeforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (hasGlobalPrivacyControl()) return null
  if (hasDoNotTrack(typeof window === 'undefined' ? undefined : window.navigator.doNotTrack)) {
    return null
  }

  return {
    ...event,
    url: sanitizeAnalyticsUrl(event.url),
  }
}

/**
 * Always attempt to initialize the Vercel provider (with beforeSend privacy filter).
 * The beforeSend + hasDoNotTrack will drop events when explicitly blocked.
 * This ensures the measurement script is delivered reliably.
 */
export function initializePrivacySafeAnalytics(): boolean {
  if (typeof window === 'undefined') return false
  if (hasGlobalPrivacyControl()) return false
  if (hasDoNotTrack(window.navigator.doNotTrack)) return false
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
