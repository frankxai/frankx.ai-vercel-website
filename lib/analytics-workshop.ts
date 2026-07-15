/**
 * analytics-workshop.ts
 *
 * Workshop funnel event helpers.
 *
 * Client-side: fires through the site's privacy-safe aggregate analytics boundary.
 * Server-side: no-op for now (server-side analytics deferred per spec).
 * Never throws — analytics failures are always silent.
 */

import { trackEvent } from '@/lib/analytics'

// ─── Fire helper ──────────────────────────────────────────────────

function fireEvent(eventName: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined') return
  trackEvent(eventName, props)
}

// ─── Public API ───────────────────────────────────────────────────

/**
 * Track a view of an OS module page (e.g. /os/workshops, /os/watch).
 *
 * Fire this on page mount in any OS module.
 *
 * @param moduleId - The module identifier, e.g. "workshops", "watch", "aco", "acos", "coe-hub"
 */
export function trackOsModuleView(moduleId: string): void {
  fireEvent('os_module_view', { module_id: moduleId })
}

/**
 * Track a step in the workshop conversion funnel.
 *
 * @param step - The funnel step name
 * @param workshopSlug - The workshop URL slug (e.g. "sovereign-leadership")
 * @param metadata - Optional additional properties (max 10 keys for Plausible)
 */
export function trackWorkshopFunnelStep(
  step: 'linktree_click' | 'workshop_view' | 'intake_opened' | 'intake_submitted' | 'booking_confirmed',
  workshopSlug: string,
  metadata?: Record<string, string>
): void {
  fireEvent('workshop_funnel_step', {
    step,
    workshop_slug: workshopSlug,
    ...metadata,
  })
}

/**
 * Track when an attendee's content has been reposted by Frank
 * as part of the amplification loop.
 *
 * @param personId - CRM person ID (e.g. "p_r3k9x2m7")
 * @param workshopId - CRM workshop ID (e.g. "w_nldigital_may19")
 * @param platform - The social platform where the content was reposted
 */
export function trackAmplificationRepost(
  personId: string,
  workshopId: string,
  platform: 'linkedin' | 'twitter' | 'youtube'
): void {
  fireEvent('amplification_repost', {
    person_id: personId,
    workshop_id: workshopId,
    platform,
  })
}
