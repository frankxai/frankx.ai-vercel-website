'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'

/**
 * Animated SVG migration map tracing the Riemer family journey:
 * Deutschland (Wolga) → Karaganda → Deutschland → Amsterdam
 *
 * Uses viewport-triggered staggered animations for reliability.
 * Mobile-first: vertical timeline on small screens.
 */

interface Waypoint {
  id: string
  label: string
  sublabel: string
  jahr: string
  farbe: string
  glowColor: string
  // SVG coordinates (in viewBox 0-500 x 0-300)
  cx: number
  cy: number
}

const waypoints: Waypoint[] = [
  {
    id: 'wolga',
    label: 'Wolga-Region',
    sublabel: 'Deutsche Kolonien',
    jahr: 'ab 1763',
    farbe: 'text-amber-400',
    glowColor: '245, 158, 11',
    cx: 80, cy: 140,
  },
  {
    id: 'karaganda',
    label: 'Karaganda',
    sublabel: 'Kasachstan',
    jahr: '1914',
    farbe: 'text-teal-400',
    glowColor: '20, 184, 166',
    cx: 200, cy: 200,
  },
  {
    id: 'deutschland',
    label: 'Deutschland',
    sublabel: 'Spätaussiedlung',
    jahr: 'ab 1990',
    farbe: 'text-emerald-400',
    glowColor: '16, 185, 129',
    cx: 340, cy: 130,
  },
  {
    id: 'amsterdam',
    label: 'Amsterdam',
    sublabel: 'Frank & Tien',
    jahr: 'heute',
    farbe: 'text-violet-400',
    glowColor: '139, 92, 246',
    cx: 440, cy: 110,
  },
]

// SVG path connecting waypoints with smooth curves
const migrationPath = `M ${waypoints[0].cx} ${waypoints[0].cy} C ${waypoints[0].cx + 50} ${waypoints[0].cy + 40}, ${waypoints[1].cx - 40} ${waypoints[1].cy}, ${waypoints[1].cx} ${waypoints[1].cy} S ${waypoints[2].cx - 60} ${waypoints[2].cy + 50}, ${waypoints[2].cx} ${waypoints[2].cy} S ${waypoints[3].cx - 40} ${waypoints[3].cy}, ${waypoints[3].cx} ${waypoints[3].cy}`

export function MigrationMap() {
  const shouldReduceMotion = useReducedMotion()

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
        opacity: { duration: 0.3, delay: 0.3 },
      },
    },
  }

  const dotVariant = (delay: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
        delay,
      },
    },
  })

  const labelVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    },
  })

  // Staggered delays for each waypoint
  const delays = [0.5, 1.2, 1.9, 2.5]

  return (
    <div className="relative w-full">
      {/* Map container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-stone-950/80 via-stone-900/40 to-stone-950/80">
        {/* Noise texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Desktop SVG Map ── */}
        <motion.div
          className="hidden sm:block p-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <svg
            viewBox="0 0 500 300"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle grid */}
            {[80, 140, 200, 260].map((y) => (
              <line key={`h-${y}`} x1="30" y1={y} x2="470" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            ))}
            {[80, 160, 240, 320, 400].map((x) => (
              <line key={`v-${x}`} x1={x} y1="50" x2={x} y2="270" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            ))}

            {/* Gradient + glow definitions */}
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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

            {/* Glow path (behind) */}
            <motion.path
              d={migrationPath}
              stroke="url(#pathGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              variants={shouldReduceMotion ? undefined : pathVariants}
              style={{ opacity: 0.12 }}
            />

            {/* Main animated path */}
            <motion.path
              d={migrationPath}
              stroke="url(#pathGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 4"
              fill="none"
              variants={shouldReduceMotion ? undefined : pathVariants}
            />

            {/* Waypoint dots */}
            {waypoints.map((wp, i) => (
              <g key={wp.id}>
                {/* Pulse ring */}
                <motion.circle
                  cx={wp.cx} cy={wp.cy} r="16"
                  fill="none"
                  stroke={`rgba(${wp.glowColor}, 0.25)`}
                  strokeWidth="1"
                  variants={dotVariant(delays[i])}
                />
                {/* Glow disc */}
                <motion.circle
                  cx={wp.cx} cy={wp.cy} r="10"
                  fill={`rgba(${wp.glowColor}, 0.12)`}
                  variants={dotVariant(delays[i])}
                />
                {/* Center dot */}
                <motion.circle
                  cx={wp.cx} cy={wp.cy} r="4"
                  fill={`rgba(${wp.glowColor}, 0.9)`}
                  variants={dotVariant(delays[i])}
                />
              </g>
            ))}

            {/* Waypoint labels */}
            {waypoints.map((wp, i) => {
              const above = wp.cy > 160
              const ty = above ? wp.cy - 28 : wp.cy + 28
              return (
                <motion.g key={`label-${wp.id}`} variants={labelVariant(delays[i])}>
                  <text
                    x={wp.cx} y={ty}
                    textAnchor="middle"
                    className="fill-white/25"
                    style={{ fontSize: '8px', fontFamily: 'var(--font-serif), Georgia, serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {wp.jahr}
                  </text>
                  <text
                    x={wp.cx} y={ty + 14}
                    textAnchor="middle"
                    fill={`rgba(${wp.glowColor}, 0.9)`}
                    style={{ fontSize: '11px', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 600 }}
                  >
                    {wp.label}
                  </text>
                  <text
                    x={wp.cx} y={ty + 26}
                    textAnchor="middle"
                    className="fill-white/25"
                    style={{ fontSize: '8px', fontFamily: 'var(--font-serif), Georgia, serif' }}
                  >
                    {wp.sublabel}
                  </text>
                </motion.g>
              )
            })}
          </svg>
        </motion.div>

        {/* ── Mobile: Vertical journey ── */}
        <motion.div
          className="block sm:hidden px-6 py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-4 top-0 bottom-0 w-px origin-top"
              style={{
                background: 'linear-gradient(to bottom, #f59e0b, #14b8a6, #10b981, #8b5cf6)',
              }}
              variants={{
                hidden: { scaleY: 0, opacity: 0 },
                visible: {
                  scaleY: 1,
                  opacity: 1,
                  transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />

            <div className="space-y-8 pl-12">
              {waypoints.map((wp, i) => (
                <motion.div
                  key={wp.id}
                  variants={labelVariant(delays[i])}
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
        </motion.div>
      </div>

      {/* Caption */}
      <p className="mt-4 text-center font-serif text-xs italic text-white/20">
        Die Reise unserer Vorfahren — von der Wolga über Karaganda nach Amsterdam
      </p>
    </div>
  )
}
