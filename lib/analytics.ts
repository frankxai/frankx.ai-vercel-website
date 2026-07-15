'use client'

import { useSyncExternalStore } from 'react'
import { track as trackVercelEvent } from '@vercel/analytics'

import { hasDoNotTrack, sanitizeAnalyticsProperties } from '@/lib/analytics-policy'

type AnalyticsEvent = {
  name: string
  params: Record<string, any>
  timestamp: number
}

const eventBuffer: AnalyticsEvent[] = []
const subscribers = new Set<() => void>()

function emitUpdate() {
  subscribers.forEach((listener) => listener())
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  const safeParams = sanitizeAnalyticsProperties(params)
  const payload: AnalyticsEvent = {
    name,
    params: safeParams,
    timestamp: Date.now()
  }

  eventBuffer.push(payload)

  if (typeof window !== 'undefined') {
    if (hasDoNotTrack(window.navigator.doNotTrack)) {
      emitUpdate()
      return
    }

    try {
      trackVercelEvent(name, safeParams)
    } catch {
      /* analytics must never break the page */
    }
  } else {
    console.log('Analytics Event:', payload)
  }

  emitUpdate()
}

/** Shorts engagement tracker — standardizes event names + props. */
export function trackShortEvent(
  action:
    | 'play'
    | 'view'
    | 'complete'
    | 'share'
    | 'next'
    | 'prev'
    | 'open_detail'
    | 'open_player'
    | 'close_player',
  short: { id: string; category?: string; author?: string }
) {
  trackEvent(`short_${action}`, {
    short_id: short.id,
    category: short.category,
    author: short.author,
  })
}

export function getBufferedEvents() {
  return [...eventBuffer]
}

export function clearBufferedEvents() {
  eventBuffer.length = 0
  emitUpdate()
}

function subscribe(listener: () => void) {
  subscribers.add(listener)
  return () => {
    subscribers.delete(listener)
  }
}

export function useFunnelMetrics(eventsOfInterest: string[]) {
  const getClientSnapshot = () => {
    const counts = new Map<string, number>()
    for (const event of eventBuffer) {
      if (eventsOfInterest.includes(event.name)) {
        counts.set(event.name, (counts.get(event.name) ?? 0) + 1)
      }
    }
    return eventsOfInterest.map((eventName) => ({
      event: eventName,
      count: counts.get(eventName) ?? 0
    }))
  }

  const getServerSnapshot = () =>
    eventsOfInterest.map((eventName) => ({ event: eventName, count: 0 }))

  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

export type FunnelMetric = {
  event: string
  count: number
}
