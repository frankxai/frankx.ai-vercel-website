'use client'

import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { initializePrivacySafeAnalytics } from '@/lib/privacy-safe-analytics-client'

/**
 * Privacy-aware wrapper.
 * We now always attempt to initialize (the beforeSend inside handles explicit DNT/GPC).
 * SpeedInsights is always rendered so the scripts load reliably.
 * This fixes the previous overly-conservative gate that caused zero collection.
 */
export function PrivacySafeAnalytics() {
  useEffect(() => {
    initializePrivacySafeAnalytics()
  }, [])

  return <SpeedInsights />
}
