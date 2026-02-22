/**
 * Conversion Event Tracking
 *
 * Thin wrapper around the existing analytics system for key conversion events.
 * Provides typed helpers so we track consistently across the site.
 */

import { trackEvent } from '@/lib/analytics'

// =============================================================================
// NEWSLETTER EVENTS
// =============================================================================

export function trackNewsletterSignup(stream: string, location: string) {
  trackEvent('newsletter_signup', { stream, location })
}

// =============================================================================
// CTA EVENTS
// =============================================================================

export function trackCtaClick(cta: string, location: string, destination?: string) {
  trackEvent('cta_click', { cta, location, destination })
}

// =============================================================================
// CONTENT ENGAGEMENT
// =============================================================================

export function trackVideoPlay(videoId: string, title: string) {
  trackEvent('video_play', { videoId, title })
}

export function trackProductView(productId: string, productName: string) {
  trackEvent('product_view', { productId, productName })
}

export function trackArticleRead(slug: string, category: string) {
  trackEvent('article_read', { slug, category })
}
