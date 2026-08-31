'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const CanvaAgentGraph = dynamic(
  () => import('./CanvaAgentGraph').then((module) => module.CanvaAgentGraph),
  {
    ssr: false,
    loading: () => (
      <div
        className="hidden h-[640px] items-center justify-center rounded-[2rem] border border-white/10 bg-[#0d0f10] text-sm text-white/60 md:flex"
        role="status"
      >
        Loading the interactive system map…
      </div>
    ),
  }
)

export function CanvaGraphStage() {
  const [showGraph, setShowGraph] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const sync = () => setShowGraph(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return showGraph ? <CanvaAgentGraph /> : null
}
