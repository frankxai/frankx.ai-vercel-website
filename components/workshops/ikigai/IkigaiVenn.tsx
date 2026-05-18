'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * IkigaiVenn — the actual four-circle Venn diagram, hand-authored SVG.
 *
 * Editorial restraint: single violet accent at low opacity. Where circles
 * overlap, additive alpha brightens naturally. Labels in Source Serif italic
 * outside the circles. Center holds the kanji 生き甲斐 in Noto Serif JP.
 *
 * Honest framing: this Venn is the Western scaffolding (Marc Winn, 2014).
 * The deeper concept lives in the masters panel + the Blue Zones research.
 * The Venn is here because it works as orientation, not because it's truth.
 *
 * Used in V5 hero and anywhere we need to ground "Ikigai" visually.
 */

interface CircleSpec {
  cx: number
  cy: number
  r: number
  label: string
  position: 'top' | 'right' | 'bottom' | 'left'
}

// Geometry — four circles that overlap symmetrically with the center
// pooling all four. Tuned so each pairwise overlap is a clean lens.
const CIRCLES: CircleSpec[] = [
  { cx: 400, cy: 260, r: 200, label: 'what you love', position: 'top' },
  { cx: 540, cy: 400, r: 200, label: 'what you are good at', position: 'right' },
  { cx: 400, cy: 540, r: 200, label: 'what the world needs', position: 'bottom' },
  { cx: 260, cy: 400, r: 200, label: 'what pays', position: 'left' },
]

const LABEL_POSITIONS: Record<
  CircleSpec['position'],
  { x: number; y: number; anchor: 'middle' | 'end' | 'start' }
> = {
  top: { x: 400, y: 40, anchor: 'middle' },
  right: { x: 770, y: 408, anchor: 'end' },
  bottom: { x: 400, y: 770, anchor: 'middle' },
  left: { x: 30, y: 408, anchor: 'start' },
}

export function IkigaiVenn({
  showCaption = true,
  className = '',
}: {
  showCaption?: boolean
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <figure className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="venn-title venn-desc"
        role="img"
        className="w-full h-auto"
      >
        <title id="venn-title">The four circles of Ikigai</title>
        <desc id="venn-desc">
          Four overlapping circles labelled what you love, what you are good at, what the world
          needs, and what pays. At their intersection sits the Japanese word 生き甲斐 — ikigai
          — meaning a reason to wake.
        </desc>

        {/* Subtle outer halo for grounding */}
        <defs>
          <radialGradient id="venn-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(167, 139, 250, 0.06)" />
            <stop offset="60%" stopColor="rgba(167, 139, 250, 0.02)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="380" fill="url(#venn-halo)" />

        {/* Four ikigai circles — single accent, additive alpha at overlaps */}
        {CIRCLES.map((c, i) => (
          <motion.circle
            key={c.position}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="rgba(167, 139, 250, 0.10)"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.2"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, scale: 1, transition: { duration: 1.0, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] } }
            }
            animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true, margin: '-80px' }}
            style={{ mixBlendMode: 'screen' as const, transformOrigin: `${c.cx}px ${c.cy}px` }}
          />
        ))}

        {/* Outer labels — editorial serif italic */}
        {CIRCLES.map((c) => {
          const pos = LABEL_POSITIONS[c.position]
          return (
            <motion.text
              key={`label-${c.position}`}
              x={pos.x}
              y={pos.y}
              textAnchor={pos.anchor}
              dominantBaseline="middle"
              className="fill-zinc-300 [font-family:var(--font-serif-editorial)]"
              fontSize="24"
              fontStyle="italic"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, transition: { duration: 0.8, delay: 1.0 + ['top', 'right', 'bottom', 'left'].indexOf(c.position) * 0.12 } }}
              animate={shouldReduceMotion ? { opacity: 1 } : undefined}
              viewport={{ once: true, margin: '-80px' }}
            >
              {c.label}
            </motion.text>
          )
        })}

        {/* Center kanji — 生き甲斐 */}
        <motion.g
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, transition: { duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] } }}
          animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : undefined}
          viewport={{ once: true, margin: '-80px' }}
          style={{ transformOrigin: '400px 400px' }}
        >
          <text
            x="400"
            y="395"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white [font-family:var(--font-jp-serif)]"
            fontSize="56"
            fontWeight="200"
            letterSpacing="-2"
          >
            生き甲斐
          </text>
          <text
            x="400"
            y="438"
            textAnchor="middle"
            className="fill-zinc-400"
            fontSize="11"
            letterSpacing="6"
            style={{ textTransform: 'uppercase' as const }}
          >
            i k i g a i
          </text>
        </motion.g>
      </svg>

      {showCaption && (
        <figcaption className="mt-6 text-center text-xs text-zinc-500 [font-family:var(--font-serif-editorial)] italic max-w-md mx-auto leading-relaxed">
          The Western scaffolding &mdash; drawn in 2014, useful as orientation. The original
          Japanese concept is{' '}
          <a
            href="/research/blue-zones-ikigai-ai-era"
            className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4 not-italic"
          >
            quieter
          </a>
          .
        </figcaption>
      )}
    </figure>
  )
}
