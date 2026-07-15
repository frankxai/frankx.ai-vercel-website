'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Deliberately not imported from a specific product's engine (operator-scorecard,
// ai-coe-readiness, or any future one) — this component only ever reads `dimension` as an
// opaque React key, so it stays product-agnostic and structurally accepts any of them.
interface DimensionScoreLike {
  dimension: string
  label: string
  raw: number
  max: number
  pct: number
}

interface DimensionRadarProps {
  scores: DimensionScoreLike[]
  size?: number
  color?: string
  /**
   * 'full' — labeled report radar (reveal/report screens).
   * 'mini' — unlabeled corner instrument that assembles live as the visitor
   * answers questions. See OperatorScorecardClient's in-flow header widget.
   */
  mode?: 'full' | 'mini'
  /**
   * One-time SVG stroke-draw-in on first mount — Beat 2 of the reveal
   * sequence ("the radar draws itself"). No-op under reduced motion, where
   * the shape is simply present in its resolved state.
   */
  strokeReveal?: boolean
  reducedMotion?: boolean
}

// Self-contained SVG radar — no chart dependency. Adapted from
// components/llm-hub/BenchmarkRadar.tsx's single-subject geometry, restyled
// for the operator scorecard's sharper, tech-primary (emerald/cyan) palette
// per DESIGN_TASTE's "FrankX business surfaces feel direct, commercial, sharp"
// brand-behavior rule, distinct from the soul-frequency quiz's aurora treatment.
//
// Positions are driven by an internally GSAP-tweened proxy (not React state)
// so the shape can redraw every frame without a re-render — this is what
// lets the 'mini' instrument visibly grow with each answer, and lets the
// 'full' radar trace itself in on reveal via stroke-dashoffset.
export function DimensionRadar({
  scores,
  size,
  color = '#10b981',
  mode = 'full',
  strokeReveal = false,
  reducedMotion = false,
}: DimensionRadarProps) {
  const dim = size ?? (mode === 'mini' ? 88 : 340)
  const cx = dim / 2
  const cy = dim / 2
  const r = dim * (mode === 'mini' ? 0.36 : 0.34)
  const n = scores.length
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const axisPoint = (i: number, mag: number) => ({
    x: cx + Math.cos(angle(i)) * r * mag,
    y: cy + Math.sin(angle(i)) * r * mag,
  })

  const labelPoint = (i: number) => ({
    x: cx + Math.cos(angle(i)) * (r + 34),
    y: cy + Math.sin(angle(i)) * (r + 34),
  })

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const polygonRef = useRef<SVGPolygonElement>(null)
  const fillRef = useRef<SVGPolygonElement>(null)
  const dotsRef = useRef<(SVGCircleElement | null)[]>([])
  const labelsRef = useRef<SVGGElement>(null)
  const animated = useRef<number[]>(scores.map(() => 0))
  const hasMounted = useRef(false)

  const pointsFor = (pcts: number[]) =>
    pcts
      .map((p, i) => {
        const pt = axisPoint(i, Math.max(0, Math.min(1, p)))
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`
      })
      .join(' ')

  const applyFrame = (pcts: number[]) => {
    animated.current = pcts
    const pts = pointsFor(pcts)
    polygonRef.current?.setAttribute('points', pts)
    fillRef.current?.setAttribute('points', pts)
    pcts.forEach((p, i) => {
      const dot = dotsRef.current[i]
      if (!dot) return
      const pt = axisPoint(i, Math.max(0, Math.min(1, p)))
      dot.setAttribute('cx', pt.x.toFixed(1))
      dot.setAttribute('cy', pt.y.toFixed(1))
    })
  }

  useGSAP(
    () => {
      const targets = scores.map((s) => s.pct / 100)

      if (reducedMotion) {
        applyFrame(targets)
        if (polygonRef.current) {
          polygonRef.current.style.strokeDasharray = 'none'
          polygonRef.current.style.strokeDashoffset = '0'
        }
        if (fillRef.current) fillRef.current.style.opacity = '1'
        dotsRef.current.forEach((d) => d && (d.style.opacity = '1'))
        if (labelsRef.current) labelsRef.current.style.opacity = '1'
        hasMounted.current = true
        return
      }

      if (!hasMounted.current && strokeReveal) {
        // First paint of the full report radar: place the shape at its
        // resolved position silently, then trace the outline in — the
        // instrument drawing what it found, not the shape growing.
        applyFrame(targets)
        let len = 0
        try {
          len = polygonRef.current?.getTotalLength() ?? 0
        } catch {
          len = 0
        }
        if (polygonRef.current && len > 0) {
          polygonRef.current.style.strokeDasharray = `${len}`
          polygonRef.current.style.strokeDashoffset = `${len}`
        }
        if (fillRef.current) fillRef.current.style.opacity = '0'
        dotsRef.current.forEach((d) => d && (d.style.opacity = '0'))
        if (labelsRef.current) labelsRef.current.style.opacity = '0'

        const tl = gsap.timeline()
        if (polygonRef.current && len > 0) {
          tl.to(polygonRef.current, { strokeDashoffset: 0, duration: 1.05, ease: 'power2.out' })
        }
        if (fillRef.current) {
          tl.to(fillRef.current, { opacity: 1, duration: 0.5, ease: 'power1.out' }, '-=0.45')
        }
        if (labelsRef.current) {
          tl.to(labelsRef.current, { opacity: 1, duration: 0.4, ease: 'power1.out' }, '-=0.35')
        }
        const dots = dotsRef.current.filter((d): d is SVGCircleElement => d !== null)
        if (dots.length) {
          tl.to(dots, { opacity: 1, duration: 0.25, stagger: 0.04, ease: 'power1.out' }, '-=0.3')
        }
      } else {
        // Live quiz updates (mini mode) or any subsequent score change:
        // tween the whole shape smoothly from where it was to where it is.
        const from = [...animated.current]
        const proxy = { t: 0 }
        gsap.to(proxy, {
          t: 1,
          duration: 0.4,
          ease: 'power2.out',
          onUpdate: () => {
            const current = from.map((f, i) => f + (targets[i] - f) * proxy.t)
            applyFrame(current)
          },
        })
        if (fillRef.current) fillRef.current.style.opacity = '1'
        dotsRef.current.forEach((d) => d && (d.style.opacity = '1'))
        if (labelsRef.current) labelsRef.current.style.opacity = '1'
      }

      hasMounted.current = true
    },
    { dependencies: [scores.map((s) => s.pct).join(','), strokeReveal, reducedMotion, mode] },
  )

  const showLabels = mode === 'full'

  return (
    <svg
      width="100%"
      height="auto"
      viewBox={`0 0 ${dim} ${dim}`}
      role="img"
      aria-label={`Dimension breakdown: ${scores.map((s) => `${s.label} ${s.pct}%`).join(', ')}`}
      className={mode === 'mini' ? 'mx-auto' : 'mx-auto max-w-[420px]'}
    >
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={scores
            .map((_, i) => {
              const p = axisPoint(i, lvl)
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}

      {mode === 'full' &&
        scores.map((s, i) => {
          const p = axisPoint(i, 1)
          return (
            <line
              key={s.dimension}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
          )
        })}

      <polygon ref={fillRef} points="" fill={`${color}26`} stroke="none" />
      <polygon ref={polygonRef} points="" fill="none" stroke={color} strokeWidth={mode === 'mini' ? 1.5 : 2} />

      {scores.map((s, i) => (
        <circle
          key={s.dimension}
          ref={(el) => {
            dotsRef.current[i] = el
          }}
          cx={cx}
          cy={cy}
          r={mode === 'mini' ? 2 : 3.5}
          fill={color}
        />
      ))}

      {showLabels && (
        <g ref={labelsRef}>
          {scores.map((s, i) => {
            const lp = labelPoint(i)
            return (
              <g key={s.dimension}>
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10.5}
                  fill="rgba(255,255,255,0.65)"
                  className="font-mono uppercase tracking-wider"
                >
                  {s.label}
                </text>
                <text
                  x={lp.x}
                  y={lp.y + 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill={color}
                  className="font-mono font-semibold"
                >
                  {s.pct}%
                </text>
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}
