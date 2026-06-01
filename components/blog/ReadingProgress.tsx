'use client'

import { useEffect, useState } from 'react'

/**
 * Thin scroll-progress bar fixed to the top of the viewport.
 * Pure client, no layout impact — reflects how far through the page the reader is.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const height = el.scrollHeight - el.clientHeight
      setProgress(height > 0 ? Math.min(100, (el.scrollTop / height) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
