'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  Code2,
  GraduationCap,
  Music,
  Palette,
  Rocket,
  Sparkles,
  Brain,
  Network,
  Clock,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

// ── Types ────────────────────────────────────────────────────────────────────

type Background = 'student' | 'career-changer' | 'creator' | 'technical'
type Interest = 'music' | 'code' | 'content' | 'business' | 'research' | 'architecture'
type TimeCommitment = '2h' | '5h' | '10h'

interface PathStep {
  week: string
  title: string
  description: string
  tools: { name: string; href: string }[]
}

// ── Path Generation ─────────────────────────────────────────────────────────

function generatePath(bg: Background, interests: Interest[], time: TimeCommitment): PathStep[] {
  const steps: PathStep[] = []

  // Week 1: Always start with foundations
  steps.push({
    week: 'Week 1',
    title: 'AI Foundations',
    description: 'Understand the landscape, assess your skills, and find your direction.',
    tools: [
      { name: 'State of AI 2026', href: '/students/ai-briefing' },
      { name: 'Skills Assessment', href: '/students/assess' },
      { name: 'Ikigai Finder', href: '/students/ikigai' },
    ],
  })

  // Week 2: Based on background
  if (bg === 'student' || bg === 'career-changer') {
    steps.push({
      week: 'Week 2',
      title: 'Prompt Engineering',
      description: 'Master the fundamentals of communicating with AI models.',
      tools: [
        { name: 'Student Prompts', href: '/students/prompts' },
        { name: 'Prompt Library', href: '/prompt-library' },
        { name: 'Blog: Prompt Guide', href: '/blog' },
      ],
    })
  } else {
    steps.push({
      week: 'Week 2',
      title: 'AI Tools Deep Dive',
      description: 'Get hands-on with the tools that matter for your work.',
      tools: [
        { name: 'Prompt Library', href: '/prompt-library' },
        { name: 'ACOS Overview', href: '/acos' },
        { name: 'Ecosystem Map', href: '/students/ecosystem' },
      ],
    })
  }

  // Weeks 3-4: Based on interests
  if (interests.includes('music')) {
    steps.push({
      week: time === '2h' ? 'Week 3' : 'Weeks 3-4',
      title: 'AI Music Production',
      description: 'Create music with Suno AI. Learn prompt engineering for audio.',
      tools: [
        { name: 'Music Lab', href: '/music-lab' },
        { name: 'Blog: Suno Guide', href: '/blog/suno-ai-music-creation-workshop' },
      ],
    })
  }

  if (interests.includes('code') || interests.includes('architecture')) {
    steps.push({
      week: time === '2h' ? 'Week 3' : 'Weeks 3-4',
      title: 'Agentic Systems',
      description: 'Build AI agents, learn MCP, and explore multi-agent patterns.',
      tools: [
        { name: 'ACOS', href: '/acos' },
        { name: 'Research: State of AI', href: '/research/state-of-ai-2026' },
        { name: 'AI Architecture', href: '/ai-architecture' },
      ],
    })
  }

  if (interests.includes('content') || interests.includes('business')) {
    steps.push({
      week: time === '2h' ? 'Week 3' : 'Weeks 3-4',
      title: 'Creator Systems',
      description: 'Build content pipelines and creator business frameworks.',
      tools: [
        { name: 'GenCreator', href: '/gencreator' },
        { name: 'Blog', href: '/blog' },
        { name: 'Products', href: '/products' },
      ],
    })
  }

  if (interests.includes('research')) {
    steps.push({
      week: time === '2h' ? 'Week 3' : 'Weeks 3-4',
      title: 'AI Research',
      description: 'Explore 17+ research domains with validated claims and sources.',
      tools: [
        { name: 'Research Hub', href: '/research' },
        { name: 'State of AI 2026', href: '/research/state-of-ai-2026' },
      ],
    })
  }

  // Final step: Build + Career
  steps.push({
    week: time === '2h' ? 'Week 4' : time === '5h' ? 'Weeks 5-6' : 'Weeks 5-8',
    title: 'Build Your AI System',
    description: 'Design your personal AI toolkit and plan your next steps.',
    tools: [
      { name: 'CoE Builder', href: '/students/coe-builder' },
      { name: 'Role Navigator', href: '/students/roles' },
      { name: 'Ecosystem Map', href: '/students/ecosystem' },
    ],
  })

  return steps
}

// ── Page ─────────────────────────────────────────────────────────────────────

const backgrounds: { key: Background; label: string; icon: typeof GraduationCap; desc: string }[] = [
  { key: 'student', label: 'Student', icon: GraduationCap, desc: 'Currently in school or university' },
  { key: 'career-changer', label: 'Career Changer', icon: Rocket, desc: 'Transitioning from another field' },
  { key: 'creator', label: 'Creator', icon: Palette, desc: 'Artist, musician, writer, content creator' },
  { key: 'technical', label: 'Technical', icon: Code2, desc: 'Developer, engineer, or architect' },
]

const interests: { key: Interest; label: string; icon: typeof Music }[] = [
  { key: 'music', label: 'Music', icon: Music },
  { key: 'code', label: 'Code', icon: Code2 },
  { key: 'content', label: 'Content', icon: BookOpen },
  { key: 'business', label: 'Business', icon: Rocket },
  { key: 'research', label: 'Research', icon: Brain },
  { key: 'architecture', label: 'Architecture', icon: Network },
]

const timeOptions: { key: TimeCommitment; label: string; desc: string }[] = [
  { key: '2h', label: '2 hours/week', desc: '4-week path, casual pace' },
  { key: '5h', label: '5 hours/week', desc: '6-week path, steady progress' },
  { key: '10h', label: '10+ hours/week', desc: '8-week path, intensive immersion' },
]

export default function PathfinderPage() {
  const [step, setStep] = useState(0)
  const [bg, setBg] = useState<Background | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])
  const [time, setTime] = useState<TimeCommitment | null>(null)
  const [path, setPath] = useState<PathStep[] | null>(null)

  const toggleInterest = (key: Interest) => {
    setSelectedInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const generateResults = () => {
    if (bg && selectedInterests.length > 0 && time) {
      setPath(generatePath(bg, selectedInterests, time))
      setStep(3)
    }
  }

  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-600/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-24">
        {/* Breadcrumb */}
        <Link href="/students" className="mb-8 inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors">
          <GraduationCap className="h-3 w-3" />
          Learning Paths
        </Link>

        {/* Hero */}
        <div className="mb-10 text-center">
          <FrankOmega variant="chibi-avatar" size="sm" glow rounded className="mx-auto mb-4 border-2 border-cyan-500/20" />
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            AI Path{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Finder
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/35">
            Three questions. One personalized learning path. All free.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex justify-center gap-2">
          {[0, 1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'w-10 bg-cyan-500' : 'w-6 bg-white/[0.08]'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Background */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-6 text-center text-lg font-semibold text-white">What describes you best?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {backgrounds.map((b) => {
                  const Icon = b.icon
                  return (
                    <button
                      key={b.key}
                      onClick={() => { setBg(b.key); setStep(1) }}
                      className={`group rounded-2xl border p-5 text-left transition-all ${
                        bg === b.key ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                      }`}
                    >
                      <Icon className="mb-2 h-5 w-5 text-white/40" />
                      <div className="text-sm font-semibold text-white">{b.label}</div>
                      <div className="text-[11px] text-white/30">{b.desc}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-2 text-center text-lg font-semibold text-white">What interests you most?</h2>
              <p className="mb-6 text-center text-xs text-white/30">Select one or more</p>
              <div className="grid gap-2 grid-cols-3 sm:grid-cols-6">
                {interests.map((i) => {
                  const Icon = i.icon
                  const selected = selectedInterests.includes(i.key)
                  return (
                    <button
                      key={i.key}
                      onClick={() => toggleInterest(i.key)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                        selected ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${selected ? 'text-cyan-400' : 'text-white/30'}`} />
                      <span className="text-[11px] font-medium text-white/60">{i.label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(0)} className="text-xs text-white/25 hover:text-white/50">
                  <ArrowLeft className="inline h-3 w-3 mr-1" />Back
                </button>
                <button
                  onClick={() => selectedInterests.length > 0 && setStep(2)}
                  disabled={selectedInterests.length === 0}
                  className="rounded-xl bg-cyan-600 px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-30 transition-all hover:-translate-y-0.5"
                >
                  Next <ArrowRight className="inline h-3 w-3 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Time */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="mb-6 text-center text-lg font-semibold text-white">How much time can you invest weekly?</h2>
              <div className="space-y-3">
                {timeOptions.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => { setTime(t.key); generateResults() }}
                    className={`w-full flex items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                      time === t.key ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                    }`}
                  >
                    <Clock className="h-5 w-5 shrink-0 text-white/30" />
                    <div>
                      <div className="text-sm font-semibold text-white">{t.label}</div>
                      <div className="text-[11px] text-white/30">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <button onClick={() => setStep(1)} className="text-xs text-white/25 hover:text-white/50">
                  <ArrowLeft className="inline h-3 w-3 mr-1" />Back
                </button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {step === 3 && path && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8 text-center">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <Sparkles className="h-3 w-3" />
                  Your personalized path
                </div>
                <h2 className="text-2xl font-bold text-white">Your AI Learning Path</h2>
                <p className="mt-1 text-xs text-white/30">
                  {bg && backgrounds.find(b => b.key === bg)?.label} · {selectedInterests.map(i => interests.find(x => x.key === i)?.label).join(', ')} · {timeOptions.find(t => t.key === time)?.label}
                </p>
              </div>

              <div className="space-y-4">
                {path.map((step, i) => (
                  <GlowCard key={i} color={i === 0 ? 'emerald' : i === path.length - 1 ? 'violet' : 'cyan'} className="!rounded-2xl">
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/40">{step.week}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-[11px] text-white/35">{step.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {step.tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/40 hover:text-white/60 hover:border-white/[0.15] transition-colors"
                          >
                            {tool.name} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => { setStep(0); setBg(null); setSelectedInterests([]); setTime(null); setPath(null) }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white/40 hover:bg-white/[0.06]"
                >
                  Start over
                </button>
                <Link
                  href="/students/ecosystem"
                  className="rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
                >
                  Explore full ecosystem →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
