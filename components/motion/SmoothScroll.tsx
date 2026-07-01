'use client'

import { useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginRegistered = false

export interface SmoothScrollProps {
  children: ReactNode
  /** Lenis interpolation factor — lower is heavier/slower. 0.1 is the buttery default. */
  lerp?: number
}

/**
 * SmoothScroll — Lenis smoothing bridged to GSAP's ticker so ScrollTrigger reads
 * Lenis positions (not native scroll). Wrap a page or route-group layout that ships
 * a `ScrollScene` set-piece — not the global root layout, since most FrankX pages
 * stay on native scroll.
 *
 * Under `prefers-reduced-motion: reduce` this is a no-op: native scroll, zero smoothing.
 * That is the correct fallback — never force smoothing on users who opted out.
 *
 * See the `motion-system` skill for the full two-track model and patterns.
 */
export function SmoothScroll({ children, lerp = 0.1 }: SmoothScrollProps): ReactElement {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger)
      pluginRegistered = true
    }

    const lenis = new Lenis({ lerp, smoothWheel: true })

    // Bridge: every Lenis scroll updates ScrollTrigger; GSAP's ticker drives Lenis' RAF.
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [lerp])

  return <>{children}</>
}
