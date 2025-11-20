'use client'

import { useSyncExternalStore } from 'react'

type AnalyticsAdapter = {
  track?: (event: string, properties?: Record<string, any>) => void
  identify?: (userId: string, traits?: Record<string, any>) => void
  group?: (groupId: string, traits?: Record<string, any>) => void
}

type AnalyticsEvent = {
  name: string
  params: Record<string, any>
  timestamp: number
}

const eventBuffer: AnalyticsEvent[] = []
const subscribers = new Set<() => void>()

let adapter: AnalyticsAdapter | null = null

export function configureAnalytics(customAdapter: AnalyticsAdapter) {
  adapter = customAdapter
}

function emitUpdate() {
  subscribers.forEach((listener) => listener())
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  const payload: AnalyticsEvent = {
    name,
    params,
    timestamp: Date.now()
  }

  eventBuffer.push(payload)

  if (typeof window !== 'undefined') {
    if (adapter?.track) {
      adapter.track(name, params)
    } else {
      const posthog = (window as any).posthog
      const segment = (window as any).analytics

      if (posthog?.capture) posthog.capture(name, params)
      if (segment?.track) segment.track(name, params)
    }
  } else {
    console.log('Analytics Event:', payload)
  }

  emitUpdate()
}

export function identifyUser(userId: string, traits: Record<string, any> = {}) {
  if (adapter?.identify) {
    adapter.identify(userId, traits)
    return
  }

  if (typeof window !== 'undefined') {
    const posthog = (window as any).posthog
    const segment = (window as any).analytics
    if (posthog?.identify) posthog.identify(userId, traits)
    if (segment?.identify) segment.identify(userId, traits)
  } else {
    console.log('Analytics Identify:', { userId, traits })
  }
}

export function groupUser(groupId: string, traits: Record<string, any> = {}) {
  if (adapter?.group) {
    adapter.group(groupId, traits)
    return
  }

  if (typeof window !== 'undefined') {
    const posthog = (window as any).posthog
    const segment = (window as any).analytics
    if (posthog?.group) posthog.group(groupId, traits)
    if (segment?.group) segment.group(groupId, traits)
  } else {
    console.log('Analytics Group:', { groupId, traits })
  }
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

function getSnapshot() {
  return [...eventBuffer]
}

export function useFunnelMetrics(eventsOfInterest: string[]) {
  const getMetricsSnapshot = () => {
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

  return useSyncExternalStore(subscribe, getMetricsSnapshot, getMetricsSnapshot)
}

export type FunnelMetric = {
  event: string
  count: number
}