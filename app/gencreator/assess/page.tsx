'use client'

import { useState, useMemo } from 'react'
import Script from 'next/script'
import { ArrowRight, RotateCcw, Share2 } from 'lucide-react'

import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'

const dimensions = [
  {
    key: 'energy',
    name: 'Energy',
    symbol: '\u26A1',
    question: 'How consistently do you maintain high creative energy?',
    low: 'Burnout cycles, no recovery ritual, inconsistent energy.',
    high: 'Peak hours optimized, movement practice, sustainable output.',
  },
  {
    key: 'mind',
    name: 'Mind',
    symbol: '\uD83E\uDDE0',
    question: 'How actively are you learning and applying new mental models?',
    low: 'Consuming without applying, no learning system.',
    high: 'Active learning pipeline, books → implementation loop.',
  },
  {
    key: 'craft',
    name: 'Craft',
    symbol: '\uD83D\uDD25',
    question: 'How deep is your primary skill? How much do you ship?',
    low: 'Dabbling, no focus area, rarely shipping.',
    high: 'Deep expertise, daily shipping cadence, public portfolio.',
  },
  {
    key: 'voice',
    name: 'Voice',
    symbol: '\uD83C\uDFA4',
    question: 'How clearly do you articulate your unique perspective?',
    low: 'Echoing others, afraid to publish, no consistent voice.',
    high: 'Distinct point of view, regular publishing, recognized voice.',
  },
  {
    key: 'capital',
    name: 'Capital',
    symbol: '\uD83D\uDCB0',
    question: 'How well are you monetizing your creative output?',
    low: 'No revenue, trading time for money, no products.',
    high: 'Multiple streams, digital products, leveraged income.',
  },
  {
    key: 'circle',
    name: 'Circle',
    symbol: '\uD83E\uDD1D',
    question: 'How strong is your creative network and community?',
    low: 'Isolated, no mentors, no peer group.',
    high: 'Active community, mentors, peer accountability.',
  },
  {
    key: 'legacy',
    name: 'Legacy',
    symbol: '\u2B50',
    question: 'How clear is your long-term vision and system for impact?',
    low: 'Day-to-day only, no vision, nothing outlives you.',
    high: 'Clear 10-year vision, systems that compound without you.',
  },
]

const levelThresholds = [
  { min: 0, max: 2.9, label: 'Awakening', color: 'text-red-400', desc: 'You are at the beginning. Embrace it — every master started here.' },
  { min: 3, max: 4.9, label: 'Foundation', color: 'text-amber-400', desc: 'The building blocks are forming. Focus on consistency over intensity.' },
  { min: 5, max: 6.9, label: 'Builder', color: 'text-cyan-400', desc: 'You are actively building. Ship more, reflect weekly, keep compounding.' },
  { min: 7, max: 8.9, label: 'Creator', color: 'text-emerald-400', desc: 'Strong across dimensions. Time to teach others and scale your systems.' },
  { min: 9, max: 10, label: 'GenCreator', color: 'text-violet-400', desc: 'Operating at the frontier. Lead by example, build legacy artifacts.' },
]

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const maxR = 110
  const dims = dimensions.map((d) => d.key)
  const n = dims.length

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (value / 10) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const gridLevels = [2, 4, 6, 8, 10]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[280px]">
      {/* Grid */}
      {gridLevels.map((level) => {
        const points = dims.map((_, i) => getPoint(i, level))
        return (
          <polygon
            key={level}
            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        )
      })}

      {/* Axes */}
      {dims.map((_, i) => {
        const p = getPoint(i, 10)
        return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        )
      })}

      {/* Data polygon */}
      <polygon
        points={dims.map((d, i) => {
          const p = getPoint(i, scores[d] || 0)
          return `${p.x},${p.y}`
        }).join(' ')}
        fill="rgba(245,158,11,0.15)"
        stroke="rgba(245,158,11,0.6)"
        strokeWidth={2}
      />

      {/* Data points */}
      {dims.map((d, i) => {
        const p = getPoint(i, scores[d] || 0)
        return <circle key={d} cx={p.x} cy={p.y} r={4} fill="#f59e0b" />
      })}

      {/* Labels */}
      {dimensions.map((dim, i) => {
        const p = getPoint(i, 12.5)
        return (
          <text
            key={dim.key}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white/50 text-[10px]"
          >
            {dim.symbol} {dim.name}
          </text>
        )
      })}
    </svg>
  )
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GenCreator Self-Assessment',
  description: 'Rate yourself across 7 GenCreator dimensions and get personalized recommendations.',
  url: 'https://frankx.ai/gencreator/assess',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
}

export default function AssessPage() {
  const [scores, setScores] = useState<Record<string, number>>({})
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)

  const currentDim = dimensions[step]

  const average = useMemo(() => {
    const vals = Object.values(scores)
    if (vals.length === 0) return 0
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
  }, [scores])

  const level = levelThresholds.find((t) => average >= t.min && average <= t.max) || levelThresholds[0]

  const weakest = useMemo(() => {
    if (Object.keys(scores).length < 7) return null
    const sorted = [...dimensions].sort((a, b) => (scores[a.key] || 0) - (scores[b.key] || 0))
    return sorted[0]
  }, [scores])

  const strongest = useMemo(() => {
    if (Object.keys(scores).length < 7) return null
    const sorted = [...dimensions].sort((a, b) => (scores[b.key] || 0) - (scores[a.key] || 0))
    return sorted[0]
  }, [scores])

  const handleScore = (value: number) => {
    setScores((prev) => ({ ...prev, [currentDim.key]: value }))
    if (step < dimensions.length - 1) {
      setStep(step + 1)
    } else {
      setComplete(true)
    }
  }

  const reset = () => {
    setScores({})
    setStep(0)
    setComplete(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-[#02030b] to-amber-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-violet-200">
            Self-Assessment
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-violet-100 to-amber-100 bg-clip-text text-transparent">
              Where Do You Stand?
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Score yourself across 7 dimensions. Takes 2 minutes.
            <br className="hidden sm:block" />
            Be honest — this is for you, not for show.
          </p>
        </div>
      </section>

      {/* Assessment */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          {!complete ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-xs text-white/40">
                  <span>Dimension {step + 1} of {dimensions.length}</span>
                  <span>{Math.round(((step) / dimensions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-violet-500 transition-all duration-300"
                    style={{ width: `${(step / dimensions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 text-center">
                <div className="mb-3 text-4xl">{currentDim.symbol}</div>
                <h2 className="text-2xl font-bold text-white">{currentDim.name}</h2>
                <p className="mt-3 text-sm text-white/60">{currentDim.question}</p>
              </div>

              {/* Scale hints */}
              <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-lg border border-red-500/10 bg-red-500/5 p-3">
                  <p className="font-medium text-red-300/70">1-3: Low</p>
                  <p className="mt-1 text-white/40">{currentDim.low}</p>
                </div>
                <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-3">
                  <p className="font-medium text-emerald-300/70">8-10: High</p>
                  <p className="mt-1 text-white/40">{currentDim.high}</p>
                </div>
              </div>

              {/* Score buttons */}
              <div className="flex flex-wrap justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleScore(n)}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-white/60 transition-all hover:border-amber-400/40 hover:bg-amber-500/15 hover:text-amber-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-xs text-white/30 hover:text-white/60"
                >
                  &larr; Go back
                </button>
              )}
            </div>
          ) : (
            /* Results */
            <div className="space-y-8">
              {/* Overall score */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/30">Your GenCreator Level</p>
                <div className={`mt-2 text-5xl font-bold ${level.color}`}>{average}</div>
                <div className={`mt-2 text-lg font-semibold ${level.color}`}>{level.label}</div>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/50">{level.desc}</p>
              </div>

              {/* Radar chart */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
                <h3 className="mb-4 text-center text-lg font-semibold text-white">Your Dimension Map</h3>
                <RadarChart scores={scores} />
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  {dimensions.map((dim) => (
                    <div key={dim.key} className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
                      <span className="text-white/50">{dim.symbol} {dim.name}</span>
                      <span className={`font-semibold ${(scores[dim.key] || 0) >= 7 ? 'text-emerald-400' : (scores[dim.key] || 0) >= 4 ? 'text-amber-400' : 'text-red-400'}`}>
                        {scores[dim.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="grid gap-4 sm:grid-cols-2">
                {strongest && (
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/50">Strongest</p>
                    <p className="mt-2 text-lg font-semibold text-emerald-300">{strongest.symbol} {strongest.name}</p>
                    <p className="mt-1 text-xs text-white/40">Score: {scores[strongest.key]}/10 — This is your superpower. Lean into it.</p>
                  </div>
                )}
                {weakest && (
                  <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-300/50">Growth Edge</p>
                    <p className="mt-2 text-lg font-semibold text-red-300">{weakest.symbol} {weakest.name}</p>
                    <p className="mt-1 text-xs text-white/40">Score: {scores[weakest.key]}/10 — Focus here for the biggest growth unlock.</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <PremiumButton variant="luxury" size="lg" href="/gencreator/soul">
                  Build Your soul.md
                  <ArrowRight className="h-5 w-5" />
                </PremiumButton>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.06]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Script id="assess-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
