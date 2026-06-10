'use client'

import { useEffect, useRef, useState } from 'react'
import type { ActivityEvent } from './types'

export type LiveStatus = 'off' | 'connecting' | 'live' | 'offline'

const IDLE_MS = 12000

/**
 * Connects to a local Agent Observatory server (default localhost:4317) over
 * Server-Sent Events and tracks which agents are currently running.
 *
 * Works on a locally-served site; on the deployed (https) site the connection
 * to a local http server is blocked by mixed-content rules, so status falls
 * back to "offline" — the showcase simply stays static. That's expected.
 */
export function useLiveActivity(enabled: boolean, serverUrl = 'http://localhost:4317') {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set())
  const [status, setStatus] = useState<LiveStatus>('off')
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    if (!enabled) {
      setStatus('off')
      setActiveIds(new Set())
      return
    }
    setStatus('connecting')
    const es = new EventSource(`${serverUrl}/stream`)
    const timerMap = timers.current

    const expire = (id: string) => {
      const t = timers.current.get(id)
      if (t) clearTimeout(t)
      timers.current.set(
        id,
        setTimeout(() => {
          setActiveIds((prev) => {
            const next = new Set(prev)
            next.delete(id)
            return next
          })
          timers.current.delete(id)
        }, IDLE_MS),
      )
    }

    const touch = (agentId?: string) => {
      if (!agentId) return
      const id = `agent:${agentId}`
      setActiveIds((prev) => new Set(prev).add(id))
      expire(id)
    }
    const stop = (agentId?: string) => {
      if (!agentId) return
      const id = `agent:${agentId}`
      const t = timers.current.get(id)
      if (t) clearTimeout(t)
      timers.current.delete(id)
      setActiveIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }

    es.onopen = () => setStatus('live')
    es.onerror = () => setStatus((s) => (s === 'live' ? 'connecting' : 'offline'))
    es.onmessage = (m) => {
      try {
        const ev: ActivityEvent = JSON.parse(m.data)
        if (ev.hook_event_type === 'SubagentStop') stop(ev.agent_id)
        else if (ev.agent_id) touch(ev.agent_id)
      } catch {}
    }

    return () => {
      es.close()
      timerMap.forEach((t) => clearTimeout(t))
      timerMap.clear()
    }
  }, [enabled, serverUrl])

  return { activeIds, status }
}
