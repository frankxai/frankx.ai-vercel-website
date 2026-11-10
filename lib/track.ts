'use client'

/**
 * The three conversion events recorded in Vercel Web Analytics.
 * Names and props are fixed on purpose. No email, name, or free text.
 *
 *   waitlist_join   { product, source }
 *   cta_click       { cta, location }
 *   checkout_start  { product, price_band }
 *
 * Sends through trackPrivacySafeAnalyticsEvent, which wraps `track` from
 * @vercel/analytics, honours DNT / Global Privacy Control, and strips PII-shaped
 * props. Inbound utm_source/utm_medium/utm_campaign are added when present.
 */

import { trackPrivacySafeAnalyticsEvent } from './privacy-safe-analytics-client.ts'
import { getInboundUtm, type InboundUtm } from './utm.ts'

export const TRACK_EVENTS = ['waitlist_join', 'cta_click', 'checkout_start'] as const

export interface TrackEventProps {
  waitlist_join: { product: string; source: string }
  cta_click: { cta: string; location: string }
  checkout_start: { product: string; price_band: string }
}

export type TrackEventName = keyof TrackEventProps

type Sender = (name: string, props: Record<string, string>) => unknown
type UtmReader = () => InboundUtm

/** Pure: the exact payload that will be sent. Exported for tests. */
export function buildTrackPayload<E extends TrackEventName>(
  event: E,
  props: TrackEventProps[E],
  utm: InboundUtm = {},
): Record<string, string> {
  const payload: Record<string, string> = {}
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string' && value.trim()) payload[key] = value.trim().slice(0, 100)
  }
  // Inbound campaign context. Own keys are never overwritten.
  for (const [key, value] of Object.entries(utm)) {
    if (value && !(key in payload)) payload[key] = value
  }
  return payload
}

export function trackWith<E extends TrackEventName>(
  send: Sender,
  readUtm: UtmReader,
  event: E,
  props: TrackEventProps[E],
): void {
  try {
    send(event, buildTrackPayload(event, props, readUtm()))
  } catch {
    /* analytics must never break the page */
  }
}

export function track<E extends TrackEventName>(event: E, props: TrackEventProps[E]): void {
  trackWith(trackPrivacySafeAnalyticsEvent, getInboundUtm, event, props)
}

export const trackWaitlistJoin = (props: TrackEventProps['waitlist_join']) =>
  track('waitlist_join', props)
export const trackCtaClick = (props: TrackEventProps['cta_click']) => track('cta_click', props)
export const trackCheckoutStart = (props: TrackEventProps['checkout_start']) =>
  track('checkout_start', props)

/** 0 -> free, then bands. Keeps exact prices out of the event. */
export function priceBand(price: number): string {
  if (!(price > 0)) return 'free'
  if (price < 50) return 'under-50'
  if (price < 200) return '50-199'
  if (price < 1000) return '200-999'
  return '1000-plus'
}
