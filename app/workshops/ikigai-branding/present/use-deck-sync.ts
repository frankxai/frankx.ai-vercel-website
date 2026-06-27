'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const CHANNEL_NAME = 'ikigai-deck'
const STORAGE_KEY = 'frankx.ikigai-deck.index'

interface SyncMessage {
  index: number
  origin: string
}

/**
 * Cross-window slide-index sync for the Ikigai deck presenter.
 *
 * Pattern:
 *   /present          (audience view, projector)
 *   /present/speaker  (speaker view, laptop)
 *
 * Both routes call useDeckSync(). The hook keeps a shared integer
 * (the slide index) in sync across windows using BroadcastChannel
 * with a localStorage fallback for older browsers and incognito mode.
 *
 * Why not WebSockets / a sync service: we're in one user's browser
 * across two tabs. BroadcastChannel is the native primitive. Total
 * state surface = one integer. Zero infra.
 */
export function useDeckSync(initialIndex = 0) {
  const [index, setIndexInternal] = useState(initialIndex)
  const [hydrated, setHydrated] = useState(false)
  const originRef = useRef<string>(`origin-${Math.random().toString(36).slice(2, 8)}`)
  const channelRef = useRef<BroadcastChannel | null>(null)

  // Hydrate from storage on first mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        const parsed = parseInt(stored, 10)
        if (!Number.isNaN(parsed)) setIndexInternal(parsed)
      }
    } catch {
      /* localStorage disabled — fall back to in-memory only */
    }
    setHydrated(true)
  }, [])

  // Open BroadcastChannel + storage listener
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(CHANNEL_NAME)
      channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        // Ignore our own broadcasts
        if (event.data.origin === originRef.current) return
        setIndexInternal(event.data.index)
      }
      channelRef.current = channel
    }

    // Storage event fires when other tabs modify localStorage
    function handleStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || e.newValue === null) return
      const parsed = parseInt(e.newValue, 10)
      if (!Number.isNaN(parsed)) setIndexInternal(parsed)
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      channelRef.current?.close()
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const setIndex = useCallback((next: number | ((prev: number) => number)) => {
    setIndexInternal((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next
      // Broadcast + persist (do this in setter so we use the resolved value)
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, String(resolved))
        } catch {
          /* ignore */
        }
        if (channelRef.current) {
          channelRef.current.postMessage({ index: resolved, origin: originRef.current })
        }
      }
      return resolved
    })
  }, [])

  return { index, setIndex, hydrated }
}
