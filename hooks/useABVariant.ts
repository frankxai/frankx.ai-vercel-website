'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { homepageTest, type HomepageVariant, getVariantExposureEvent } from '@/lib/ab-testing'

/**
 * Hook to read A/B test variant from cookie
 * Tracks exposure event on mount
 */
export function useHomepageVariant(): HomepageVariant {
  const [variant, setVariant] = useState<HomepageVariant>('elite')
  const [hasTracked, setHasTracked] = useState(false)

  useEffect(() => {
    // Read variant from cookie
    const cookies = document.cookie.split(';')
    const variantCookie = cookies.find(c => c.trim().startsWith(`${homepageTest.cookieName}=`))

    if (variantCookie) {
      const value = variantCookie.split('=')[1] as HomepageVariant
      if (homepageTest.variants.some(v => v.id === value)) {
        setVariant(value)
      }
    }
  }, [])

  useEffect(() => {
    // Track exposure event once
    if (!hasTracked && variant) {
      const exposureEvent = getVariantExposureEvent(variant)
      trackEvent(exposureEvent.event, {
        test_name: exposureEvent.test_name,
        variant_id: exposureEvent.variant_id,
        variant_name: exposureEvent.variant_name,
      })
      setHasTracked(true)
    }
  }, [variant, hasTracked])

  return variant
}

/**
 * Server-side variant reader
 * Use in Server Components via cookies()
 */
export function getServerVariant(cookieValue: string | undefined): HomepageVariant {
  if (!cookieValue) return 'elite'

  const variant = homepageTest.variants.find(v => v.id === cookieValue)
  return variant ? variant.id : 'elite'
}
