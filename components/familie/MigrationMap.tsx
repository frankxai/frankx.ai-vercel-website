'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion'
import { MapPin } from 'lucide-react'

/**
 * Animated SVG migration map tracing the Riemer family journey:
 * Wolga-Region → Karaganda → Deutschland → Amsterdam
 *
 * Scroll-driven path drawing with spring-animated waypoints.
 * Mobile-first: stacks vertically on small screens.
 */

interface Waypoint {
  id: string
  label: string
  sublabel: string
  jahr: string
  x: number // % position in viewBox
  y: number // % position in viewBox
  farbe: string // Tailwind color
  glowColor: string // RGB for glow
}

const waypoints: Waypoint[] = [
  {
    id: 'wolga',
    label: 'Wolga-Region',
    sublabel: 'Deutsche Kolonien',
    jahr: 'ab 1763',
    x: 15,
    y: 35,
    farbe: 'text-amber-400',
    glowColor: '245, 158, 11',
  },
  {
    id: 'karaganda',
    label: 'Karaganda',
    sublabel: 'Kasachstan',
    jahr: '1914',
    x: 40,
    y: 55,
    farbe: 'text-teal-400',
    glowColor: '20, 184, 166',
  },
  {
    id: 'deutschland',
    label: 'Deutschland',
    sublabel: 'Spätaussiedlung',
    jahr: 'ab 1990',
    x: 65,
    y: 30,
    farbe: 'text-emerald-400',
    glowColor: '16, 185, 129',
  },
  {
    id: 'amsterdam',
    label: 'Amsterdam',
    sublabel: 'Frank Riemer',
    jahr: 'heute',
    x: 88,
    y: 25,
    farbe: 'text-violet-400',
    glowColor: '139, 92, 246',
  },
]

// SVG path connecting all waypoints with smooth curves
const migrationPath = 'M 75 175 C 130 175, 150 220, 200 275 S 280 310, 320 275 S 380 180, 440 175'

export function MigrationMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.3'],
  })

  // Smooth spring-based progress for the path drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 1,
  })

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  const pathOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1])
  const glowOpacity = useTransform(smoothProgress, [0, 1], [0, 0.15])

  // Each waypoint appears at a different scroll progress
  const wp1Opacity = useTransform(smoothProgress, [0, 0.05], [0.3, 1])
  const wp2Opacity = useTransform(smoothProgress, [0.2, 0.35], [0.2, 1])
  const wp3Opacity = useTransform(smoothProgress, [0.5, 0.65], [0.2, 1])
  const wp4Opacity = useTransform(smoothProgress, [0.75, 0.9], [0.2, 1])
  const waypointOpacities = [wp1Opacity, wp2Opacity, wp3Opacity, wp4Opacity]

  const wp1Scale = useTransform(smoothProgress, [0, 0.05], [0.8, 1])
  const wp2Scale = useTransform(smoothProgress, [0.2, 0.35], [0.8, 1])
  const wp3Scale = useTransform(smoothProgress, [0.5, 0.65], [0.8, 1])
  const wp4Scale = useTransform(smoothProgress, [0.75, 0.9], [0.8, 1])
  const waypointScales = [wp1Scale, wp2Scale, wp3Scale, wp4Scale]

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Map container with atmospheric background */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-stone-950/80 via-stone-900/40 to-stone-950/80">
        {/* Subtle texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          }}
        />

        {/* SVG Map — Desktop */}
        <div className="hidden sm:block">
          <svg
            viewBox="0 0 500 350"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid lines for geographic feel */}
            {[80, 140, 200, 260, 320].map((y) => (
              <line
                key={`h-${y}`}
                x1="20"
                y1={y}
                x2="480"
                y2={y}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="0.5"
              />
            ))}
            {[80, 160, 240, 320, 400].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="40"
                x2={x}
                y2="320"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="0.5"
              />
            ))}

            {/* Animated migration path */}
            <motion.path
              d={migrationPath}
              stroke="url(#pathGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{
                pathLength: shouldReduceMotion ? 1 : pathLength,
                opacity: shouldReduceMotion ? 1 : pathOpacity,
              }}
              strokeDasharray="6 4"
            />

            {/* Glow behind path */}
            <motion.path
              d={migrationPath}
              stroke="url(#pathGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              style={{
                pathLength: shouldReduceMotion ? 1 : pathLength,
                opacity: shouldReduceMotion ? 0.15 : glowOpacity,
              }}
              filter="url(#glow)"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="33%" stopColor="#14b8a6" />
                <stop offset="66%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Waypoint markers */}
            {waypoints.map((wp, i) => {
              const cx = wp.x * 5
              const cy = wp.y * 3.5 + 40
              return (
                <g key={wp.id}>
                  {/* Pulse ring */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="16"
                    fill="none"
                    stroke={`rgba(${wp.glowColor}, 0.3)`}
                    strokeWidth="1"
                    style={{
                      opacity: waypointOpacities[i],
                      scale: waypointScales[i],
                    }}
                  />
                  {/* Glow */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="10"
                    fill={`rgba(${wp.glowColor}, 0.15)`}
                    style={{
                      opacity: waypointOpacities[i],
                      scale: waypointScales[i],
                    }}
                  />
                  {/* Center dot */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill={`rgba(${wp.glowColor}, 0.9)`}
                    style={{
                      opacity: waypointOpacities[i],
                      scale: waypointScales[i],
                    }}
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Mobile: Vertical journey layout */}
        <div className="block sm:hidden px-6 py-8">
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-4 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, #f59e0b, #14b8a6, #10b981, #8b5cf6)',
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
                transformOrigin: 'top',
              }}
            />

            <div className="space-y-8 pl-12">
              {waypoints.map((wp, i) => (
                <motion.div
                  key={wp.id}
                  style={{ opacity: waypointOpacities[i] }}
                  className="relative"
                >
                  {/* Dot on the line */}
                  <div
                    className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: `rgba(${wp.glowColor}, 0.9)` }}
                  />

                  <p className="font-serif text-xs uppercase tracking-widest text-white/30">
                    {wp.jahr}
                  </p>
                  <h3 className={`font-serif text-lg font-semibold ${wp.farbe}`}>
                    {wp.label}
                  </h3>
                  <p className="text-sm text-white/40">{wp.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop waypoint labels overlay */}
        <div className="hidden sm:block absolute inset-0">
          {waypoints.map((wp, i) => (
            <motion.div
              key={wp.id}
              className="absolute text-center"
              style={{
                left: `${wp.x}%`,
                top: `${wp.y < 40 ? wp.y + 25 : wp.y - 18}%`,
                transform: 'translateX(-50%)',
                opacity: waypointOpacities[i],
              }}
            >
              <p className="font-serif text-[10px] uppercase tracking-[0.15em] text-white/30">
                {wp.jahr}
              </p>
              <h3 className={`font-serif text-sm font-semibold ${wp.farbe} leading-tight`}>
                {wp.label}
              </h3>
              <p className="text-[10px] text-white/30">{wp.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="mt-4 text-center font-serif text-xs italic text-white/20">
        Die Reise der Riemer-Familie — von der Wolga über Karaganda nach Amsterdam
      </p>
    </div>
  )
}
