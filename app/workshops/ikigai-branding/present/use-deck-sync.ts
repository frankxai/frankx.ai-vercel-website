'use client'

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'

/**
 * Dual-screen deck sync. The presenter view (/present) and the speaker view
 * (/present/speaker) both call useDeckSync — a change in one window broadcasts
 * the new slide index to the other via BroadcastChannel, with a localStorage
 * fallback for browsers without it. SSR-safe: no window access during render.
 *
 * Drop-in compatible with useState<number>: returns { index, setIndex } where
 * setIndex accepts a value or an updater, exactly like a React state setter.
 */

const CHANNEL = 'ikigai-branding-deck'
const STORAGE_KEY = 'ikigai-branding-deck-index'

export function useDeckSync(initial: number): {
  index: number
  setIndex: Dispatch<SetStateAction<number>>
} {
  const [index, setIndexState] = useState(initial)
  const channelRef = useRef<BroadcastChannel | null>(null)
  // Guards against echoing a value we just received back out to the channel.
  const applyingRemote = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Hydrate from a peer window that's already further along.
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      const parsed = Number(stored)
      if (Number.isInteger(parsed) && parsed >= 0) {
        applyingRemote.current = true
        setIndexState(parsed)
        applyingRemote.current = false
      }
    }

    if ('BroadcastChannel' in window) {
      const ch = new BroadcastChannel(CHANNEL)
      ch.onmessage = (e) => {
        const next = Number(e.data)
        if (Number.isInteger(next) && next >= 0) {
          applyingRemote.current = true
          setIndexState(next)
          applyingRemote.current = false
        }
      }
      channelRef.current = ch
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || e.newValue === null) return
      const next = Number(e.newValue)
      if (Number.isInteger(next) && next >= 0) {
        applyingRemote.current = true
        setIndexState(next)
        applyingRemote.current = false
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      channelRef.current?.close()
      channelRef.current = null
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const setIndex = useCallback<Dispatch<SetStateAction<number>>>((value) => {
    setIndexState((prev) => {
      const next = typeof value === 'function' ? (value as (p: number) => number)(prev) : value
      if (!applyingRemote.current && typeof window !== 'undefined' && next !== prev) {
        channelRef.current?.postMessage(next)
        try {
          window.localStorage.setItem(STORAGE_KEY, String(next))
        } catch {
          /* private mode / quota — sync degrades to in-window only */
        }
      }
      return next
    })
  }, [])

  return { index, setIndex }
}
