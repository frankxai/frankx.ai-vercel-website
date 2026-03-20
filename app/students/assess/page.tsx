'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Target,
  Brain,
  Code2,
  Palette,
  Shield,
  Layers,
  Zap,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard } from '@/components/ui/glow-card'

// ── Dimensions ──────────────────────────────────────────────────────────────

const dimensions = [
  {
    key: 'prompting',
    name: 'Prompt Engineering',
    icon: Sparkles,
    question: 'How effectively can you design prompts that get consistent, high-quality results?',
    low: 'Beginning to explore prompt patterns.',
    high: 'Designing system prompts, few-shot chains, and evaluation frameworks.',
    color: 'text-emerald-400',
  },
  {
    key: 'tools',
    name: 'AI Tool Fluency',
    icon: Zap,
    question: 'How many AI tools can you use productively in your daily work?',
    low: 'Trying out basic chat interfaces.',
    high: 'Fluent across Claude, GPT, Gemini, Suno, Midjourney, and coding agents.',
    color: 'text-cyan-400',
  },
  {
    key: 'agentic',
    name: 'Agentic Thinking',
    icon: Layers,
    question: 'Can you design systems where AI agents collaborate autonomously?',
    low: 'Understanding what AI agents are.',
    high: 'Designing multi-agent orchestrations with MCP, memory, and tool use.',
    color: 'text-violet-400',
  },
  {
    key: 'technical',
    name: 'Technical Foundation',
    icon: Code2,
    question: 'How strong is your programming and systems thinking?',
    low: 'Learning fundamentals of programming.',
    high: 'Building production apps with TypeScript, APIs, databases, and CI/CD.',
    color: 'text-amber-400',
  },
  {
    key: 'creative',
    name: 'Creative Application',
    icon: Palette,
    question: 'How well can you apply AI to creative work — writing, music, visuals, content?',
    low: 'Exploring AI for creative experiments.',
    high: 'Shipping creative work regularly with AI-augmented workflows.',
    color: 'text-rose-400',
  },
  {
    key: 'ethics',
    name: 'AI Ethics & Safety',
    icon: Shield,
    question: 'How well do you understand responsible AI use, bias, and safety?',
    low: 'Aware that AI ethics matters.',
    high: 'Can evaluate models for bias, design safety guardrails, and articulate principles.',
    color: 'text-teal-400',
  },
]

const levelThresholds = [
  { min: 0, max: 2.9, label: 'Explorer', color: 'text-white/50', desc: 'You are at the beginning of your AI journey. Every expert started here.' },
  { min: 3, max: 4.9, label: 'Learner', color: 'text-amber-400', desc: 'Foundations are forming. Focus on one dimension at a time.' },
  { min: 5, max: 6.9, label: 'Practitioner', color: 'text-cyan-400', desc: 'You are actively using AI. Ship more projects to level up.' },
  { min: 7, max: 8.9, label: 'Builder', color: 'text-emerald-400', desc: 'Strong AI skills. Ready for agentic systems and advanced patterns.' },
  { min: 9, max: 10, label: 'Architect', color: 'text-violet-400', desc: 'Operating at the frontier. Design systems that others learn from.' },
]

const recommendations: Record<string, { courses: string[]; tools: string[] }> = {
  prompting: {
    courses: ['Anthropic Prompt Engineering Guide (free)', 'Google AI Essentials'],
    tools: ['/students/prompts', '/prompt-library'],
  },
  tools: {
    courses: ['AI for Everyone (DeepLearning.AI)', 'Google AI Essentials'],
    tools: ['/students/ai-briefing', '/music-lab'],
  },
  agentic: {
    courses: ['MCP Server Architecture Workshop (blog)', 'Ultimate Guide to AI Coding Agents (blog)'],
    tools: ['/acos', '/research/state-of-ai-2026'],
  },
  technical: {
    courses: ['MIT Introduction to Deep Learning', 'Stanford ML Specialization'],
    tools: ['/students/coe-builder', '/acos'],
  },
  creative: {
    courses: ['Suno AI Music Creation Workshop (blog)', 'Creator AI Toolkit'],
    tools: ['/music-lab', '/gencreator'],
  },
  ethics: {
    courses: ['Oracle AI Foundations (free cert)', 'AI for Everyone (DeepLearning.AI)'],
    tools: ['/research', '/blog'],
  },
}

// ── Radar Chart ─────────────────────────────────────────────────────────────

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const maxR = 110
  const keys = dimensions.map((d) => d.key)
  const n = keys.length

  const getPoint = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  const dataPoints = keys.map((k, i) => getPoint(i, (scores[k] / 10) * maxR))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[280px]">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = keys.map((_, i) => getPoint(i, maxR * level))
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
        return <path key={level} d={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      })}

      {/* Axes */}
      {keys.map((_, i) => {
        const p = getPoint(i, maxR)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      })}

      {/* Data */}
      <path d={dataPath} fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.6)" strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(139,92,246,0.8)" />
      ))}

      {/* Labels */}
      {keys.map((k, i) => {
        const p = getPoint(i, maxR + 24)
        const dim = dimensions[i]
        return (
          <text
            key={k}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-white/40 text-[9px] font-medium"
          >
            {dim.name.split(' ')[0]}
          </text>
        )
      })}
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AssessPage() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(dimensions.map((d) => [d.key, 5]))
  )
  const [showResults, setShowResults] = useState(false)

  const avgScore = useMemo(() => {
    const vals = Object.values(scores)
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }, [scores])

  const level = useMemo(
    () => levelThresholds.find((l) => avgScore >= l.min && avgScore <= l.max) || levelThresholds[0],
    [avgScore]
  )

  const weakest = useMemo(() => {
    const entries = Object.entries(scores)
    entries.sort((a, b) => a[1] - b[1])
    return entries[0]?.[0]
  }, [scores])

  const strongest = useMemo(() => {
    const entries = Object.entries(scores)
    entries.sort((a, b) => b[1] - a[1])
    return entries[0]?.[0]
  }, [scores])

  const reset = () => {
    setScores(Object.fromEntries(dimensions.map((d) => [d.key, 5])))
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-600/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-24">
        {/* Breadcrumb */}
        <Link href="/students" className="mb-8 inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors">
          <GraduationCap className="h-3 w-3" />
          Learning Paths
        </Link>

        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <FrankOmega variant="thinking" size="sm" glow />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
            <Target className="h-3 w-3" />
            AI Skills Assessment
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Find your{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">level</span>
          </h1>
          <p className="mt-2 text-sm text-white/35">
            Rate yourself on 6 dimensions. Get personalized recommendations. No account needed.
          </p>
        </div>

        {/* Assessment grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Sliders */}
          <div className="space-y-5">
            {dimensions.map((dim) => {
              const Icon = dim.icon
              const val = scores[dim.key]
              return (
                <div key={dim.key} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${dim.color}`} />
                    <h3 className="text-sm font-semibold text-white">{dim.name}</h3>
                    <span className={`ml-auto text-lg font-bold ${dim.color}`}>{val}</span>
                  </div>
                  <p className="mb-3 text-xs text-white/30">{dim.question}</p>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={val}
                    onChange={(e) => setScores((s) => ({ ...s, [dim.key]: Number(e.target.value) }))}
                    className="w-full accent-violet-500"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-white/20">
                    <span>{dim.low}</span>
                    <span>{dim.high}</span>
                  </div>
                </div>
              )
            })}

            <button
              onClick={() => setShowResults(true)}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5"
            >
              See My Results
            </button>
          </div>

          {/* Radar chart (sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5">
              <RadarChart scores={scores} />
              <div className="mt-4 text-center">
                <div className={`text-lg font-bold ${level.color}`}>{level.label}</div>
                <div className="text-xs text-white/30">Avg: {avgScore.toFixed(1)}/10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            {/* Mobile radar */}
            <div className="lg:hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5">
              <RadarChart scores={scores} />
              <div className="mt-4 text-center">
                <div className={`text-lg font-bold ${level.color}`}>{level.label}</div>
                <div className="text-xs text-white/30">Avg: {avgScore.toFixed(1)}/10</div>
              </div>
            </div>

            {/* Level card */}
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/5 to-white/[0.02] p-6">
              <div className={`mb-2 text-2xl font-bold ${level.color}`}>
                You are: {level.label}
              </div>
              <p className="text-sm text-white/50">{level.desc}</p>
            </div>

            {/* Strongest / Focus area */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <div className="text-xs font-semibold text-emerald-400 mb-2">Strongest Dimension</div>
                <div className="text-sm font-semibold text-white">
                  {dimensions.find((d) => d.key === strongest)?.name}
                </div>
                <div className="text-xs text-white/30 mt-1">Score: {scores[strongest || '']}/10</div>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                <div className="text-xs font-semibold text-amber-400 mb-2">Focus Area</div>
                <div className="text-sm font-semibold text-white">
                  {dimensions.find((d) => d.key === weakest)?.name}
                </div>
                <div className="text-xs text-white/30 mt-1">Score: {scores[weakest || '']}/10</div>
              </div>
            </div>

            {/* Recommendations for weakest */}
            {weakest && recommendations[weakest] && (
              <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Recommended for {dimensions.find((d) => d.key === weakest)?.name}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {recommendations[weakest].courses.map((c) => (
                    <div key={c} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                      <div className="text-xs font-medium text-white/70">{c}</div>
                      <div className="text-[10px] text-white/25 mt-0.5">Course</div>
                    </div>
                  ))}
                  {recommendations[weakest].tools.map((t) => (
                    <Link key={t} href={t} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 hover:border-violet-500/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-white/70 group-hover:text-white">{t}</div>
                        <ArrowRight className="h-3 w-3 text-white/20" />
                      </div>
                      <div className="text-[10px] text-white/25 mt-0.5">FrankX Tool</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/50 hover:bg-white/[0.06] transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Retake
              </button>
              <Link
                href="/students/ecosystem"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/50 hover:bg-white/[0.06] transition-colors"
              >
                Explore ecosystem
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/students/ai-briefing"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                State of AI 2026
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
