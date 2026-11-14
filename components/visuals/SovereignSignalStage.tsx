'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useState, type ReactNode } from 'react'
import type { SignalFocusMode } from './SovereignSignalScene'

const DynamicSignalScene = dynamic(() => import('./SovereignSignalScene'), {
  ssr: false,
})

class WebGLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function StaticMeshFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(16,185,129,0.22),transparent_48%),radial-gradient(circle_at_76%_68%,rgba(6,182,212,0.18),transparent_52%),radial-gradient(circle_at_55%_45%,rgba(245,158,11,0.08),transparent_45%)]"
    />
  )
}

export function SovereignSignalStage({
  focusMode = 'skills',
  className = '',
}: {
  focusMode?: SignalFocusMode
  className?: string
}) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0b0f] ${className}`}>
      <StaticMeshFallback />
      {mounted ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <WebGLBoundary fallback={<StaticMeshFallback />}>
            <DynamicSignalScene focusMode={focusMode} reducedMotion={reducedMotion} />
          </WebGLBoundary>
        </div>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]/85"
      />
    </div>
  )
}
