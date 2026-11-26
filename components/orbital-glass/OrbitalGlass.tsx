'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import { onMotionPreferenceChange, prefersReducedMotion } from '@/lib/liquid/core/env.js'
import {
  ORBIT_LENS_CQW,
  ORBIT_RX_CQW,
  ORBIT_RY_CQW,
  orbitPoint,
  orbitVars,
  restingPhase,
} from '@/lib/orbital-glass/orbit'
import { createOrbitController, type OrbitController } from './orbit-controller'
import styles from './orbital-glass.module.css'

export interface OrbitalSatellite {
  id: string
  title: string
  /** One short line on the chip. Keep it a fact, not a slogan. */
  detail?: string
  /**
   * A sentence the lens shows while this chip is hovered or focused. About 60
   * characters fit the lens; longer text wraps past the circle.
   */
  body?: string
  /** Internal paths render a Link. In-page anchors and external URLs render a plain anchor. */
  href?: string
  /** Decorative; the title carries the meaning. */
  icon?: ReactNode
}

export interface OrbitalGlassProps {
  /** Accessible name of the whole composition. */
  label: string
  /** Steps of one loop, in order. Chips are numbered in this order. Three to eight read well. */
  satellites: readonly OrbitalSatellite[]
  /** Static content for the focal lens when no chip is active. Nothing in it animates. */
  subject: ReactNode
  /**
   * Real imagery that sits under the glass. Required on purpose: glass over
   * nothing is a grey box, and taste.md refuses it.
   */
  backdrop: ReactNode
  /** One spectrum per page. Tech is emerald and cyan, soul is amber. */
  spectrum?: 'tech' | 'soul'
  /** Seconds per revolution. */
  period?: number
  className?: string
}

type Vars = CSSProperties & Record<`--${string}`, string>

const VIEWBOX_W = 160
const VIEWBOX_H = 90
const UNITS_PER_CQW = VIEWBOX_W / 100

const subscribeMotion = (notify: () => void) => onMotionPreferenceChange(() => notify())
const motionAllowedNow = () => !prefersReducedMotion()
// The server and the first client render agree on "no motion", so hydration
// matches; the real preference is read on the next render.
const motionAllowedOnServer = () => false

const isInternal = (href: string) => /^\/(?!\/)/.test(href)
const isExternal = (href: string) => /^https?:\/\//.test(href)

/**
 * Orbital glass: numbered glass chips on one ring around a focal glass lens,
 * over real imagery. The ring shows the order of a loop; the lens reads out
 * the step you are on.
 *
 * The server renders the complete composition at rest. Motion is an upgrade
 * that starts from that exact composition, and it runs only when all of these
 * hold; otherwise the ring simply stays where it is:
 *   - `prefers-reduced-motion` is not set
 *   - the container is at least 960 px wide (narrower containers render a
 *     stack instead of a ring)
 *   - the frame governor has not tripped (22 ms between frames, shared with
 *     the liquid field, so a browser capped at 30 fps reads as over budget)
 * It eases to a stop on hover or focus of any chip, pauses off-screen, and
 * has a visible button (WCAG 2.2.2, moving content longer than five seconds).
 *
 * The glass material is the repo's vendored `.liquid-glass` recipe. This
 * component adds geometry and motion, never a second set of opacity values.
 */
export function OrbitalGlass({
  label,
  satellites,
  subject,
  backdrop,
  spectrum = 'tech',
  period = 90,
  className,
}: OrbitalGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<OrbitController | null>(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const motionAllowed = useSyncExternalStore(subscribeMotion, motionAllowedNow, motionAllowedOnServer)
  // The controller holds the chip elements, so it must be rebuilt when they
  // change, not only when their count does.
  const idsKey = satellites.map((satellite) => satellite.id).join('|')

  useEffect(() => {
    pausedRef.current = paused
    controllerRef.current?.setUserPaused(paused)
  }, [paused])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionAllowed) return
    const controller = createOrbitController(root, { period })
    controller.setUserPaused(pausedRef.current)
    controllerRef.current = controller
    return () => {
      controller.destroy()
      controllerRef.current = null
    }
  }, [motionAllowed, period, idsKey])

  const rootVars: Vars = {
    '--og-rx': `${ORBIT_RX_CQW}cqw`,
    '--og-ry': `${ORBIT_RY_CQW}cqw`,
    '--og-lens': `${ORBIT_LENS_CQW}cqw`,
  }

  const activeIndex = activeId === null ? -1 : satellites.findIndex((satellite) => satellite.id === activeId)
  const active = activeIndex >= 0 ? satellites[activeIndex] : null
  const reading = Boolean(active?.body)

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={label}
      data-spectrum={spectrum}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={rootVars}
    >
      <div className={styles.stage} data-og-stage tabIndex={-1}>
        <div className={styles.backdrop} data-og-backdrop aria-hidden="true">
          {backdrop}
        </div>
        <div className={styles.veil} aria-hidden="true" />

        <svg
          className={styles.path}
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          aria-hidden="true"
          focusable="false"
        >
          <ellipse
            className={styles.pathLine}
            cx={VIEWBOX_W / 2}
            cy={VIEWBOX_H / 2}
            rx={ORBIT_RX_CQW * UNITS_PER_CQW}
            ry={ORBIT_RY_CQW * UNITS_PER_CQW}
          />
        </svg>

        <div className={`${styles.lens} liquid-glass`} data-reading={reading ? '' : undefined}>
          <div className={styles.subject}>{subject}</div>
          {/* Hidden from assistive tech: the chip's own link text and the
              step list on the page already carry this. It is a sighted aid. */}
          {active && reading ? (
            <div className={styles.reader} aria-hidden="true">
              <p className={styles.readerEyebrow}>
                Step {activeIndex + 1} of {satellites.length}
              </p>
              <p className={styles.readerTitle}>{active.title}</p>
              <p className={styles.readerBody}>{active.body}</p>
            </div>
          ) : null}
        </div>

        <ol className={styles.ring} data-og-ring>
          {satellites.map((satellite, index) => {
            const slotVars: Vars = orbitVars(orbitPoint(restingPhase(index, satellites.length)))
            const body = (
              <>
                {satellite.icon ? (
                  <span className={styles.chipIcon} aria-hidden="true">
                    {satellite.icon}
                  </span>
                ) : null}
                <span className={styles.chipText}>
                  <span className={styles.chipHead}>
                    <span className={styles.chipIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.chipTitle}>{satellite.title}</span>
                  </span>
                  {satellite.detail ? <span className={styles.chipDetail}>{satellite.detail}</span> : null}
                </span>
              </>
            )
            const chipClass = `${styles.chip} liquid-glass`
            return (
              <li
                key={satellite.id}
                className={styles.slot}
                data-og-slot
                style={slotVars}
                onPointerEnter={() => setActiveId(satellite.id)}
                onPointerLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(satellite.id)}
                onBlur={() => setActiveId(null)}
              >
                {satellite.href && isInternal(satellite.href) ? (
                  <Link href={satellite.href} className={chipClass}>
                    {body}
                  </Link>
                ) : satellite.href ? (
                  <a
                    href={satellite.href}
                    className={chipClass}
                    rel={isExternal(satellite.href) ? 'noopener noreferrer' : undefined}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={chipClass}>{body}</div>
                )}
              </li>
            )
          })}
        </ol>

        <button
          type="button"
          className={`${styles.control} liquid-glass`}
          data-og-control
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? (
            <Play className={styles.controlIcon} aria-hidden="true" />
          ) : (
            <Pause className={styles.controlIcon} aria-hidden="true" />
          )}
          <span>{paused ? 'Resume motion' : 'Pause motion'}</span>
        </button>
      </div>
    </div>
  )
}
