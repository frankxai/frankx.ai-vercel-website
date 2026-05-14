'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  StickyNote,
  X,
  Compass,
  Sparkles,
  Target,
  UserCircle,
  Layers3,
  TrendingUp,
  Calendar,
  Wand2,
  Send,
  Brain,
  Mic,
  BarChart3,
  Play,
  Rocket,
  Mail,
  Pause,
  RotateCcw,
} from 'lucide-react'

// ---- Slide data ---------------------------------------------------------

interface SlideDef {
  id: string
  eyebrow: string
  title: string
  module?: string
  minutes: number
  color: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
  speakerNotes: string[]
  body: () => React.ReactNode
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

const SLIDES: SlideDef[] = [
  // 0 — Cover
  {
    id: 'cover',
    eyebrow: 'A 75-minute workshop',
    title: 'Ikigai & Branding',
    minutes: 1,
    color: 'violet',
    speakerNotes: [
      'Open with: "Today you leave with a purpose statement and a 30-day plan. Not a feeling."',
      'Set tone: practical, generous, no fluff. Phones face down for the wizard sections.',
    ],
    body: () => (
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-xs font-medium text-violet-300 uppercase tracking-wider">
          <Compass className="w-3 h-3" />
          A 75-minute workshop
        </div>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="text-white">Ikigai </span>
          <span className="text-zinc-500">&amp;</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400"> Branding</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Find what makes time disappear. Translate it into a brand the world remembers.
        </p>
        <div className="text-sm text-zinc-600 pt-12">
          frankx.ai · Frank Riemer · AI Architect
        </div>
      </div>
    ),
  },
  // 1 — Outcomes
  {
    id: 'outcomes',
    eyebrow: 'The promise',
    title: 'What you walk out with',
    minutes: 4,
    color: 'amber',
    speakerNotes: [
      'Read the four bullets aloud. Pause after each.',
      'Frame: "If you write all four down today, the next 30 days plan themselves."',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: 'A purpose statement', sub: 'Two lines. Fits on a business card.', icon: Compass, color: 'violet' },
          { title: 'A brand positioning', sub: 'Positioning sentence + audience-of-one + 3 content pillars.', icon: Target, color: 'amber' },
          { title: 'A 30-day content plan', sub: 'Calendar generated from your pillars. CSV + Notion + Sheet.', icon: Calendar, color: 'emerald' },
          { title: 'The GenCreator Stack', sub: 'Five tools across Capture · Think · Make · Ship · Measure.', icon: Wand2, color: 'sky' },
        ].map((o) => {
          const Icon = o.icon
          return (
            <div key={o.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{o.title}</h3>
                <p className="text-sm text-zinc-400">{o.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    ),
  },
  // 2 — 3Cs
  {
    id: '3cs',
    eyebrow: 'Framework',
    title: 'The 3Cs — Skills that compound with AI',
    minutes: 6,
    color: 'sky',
    speakerNotes: [
      'Ikigai = WHAT to build. 3Cs = HOW to build it without getting automated around.',
      'Collaboration = pair with AI (PAIR · PACE). Communication = make outputs land (BLUF · SCQA). Creation = ship small.',
    ],
    body: () => (
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Collaboration', items: ['PACE: Plan → Act → Check → Evolve', 'PAIR with AI: Plan · Ask · Iterate · Review', 'Iteration speed + decision clarity'], color: 'violet' },
          { title: 'Communication', items: ['BLUF and SCQA frameworks', 'Design docs + demo scripts', 'Clear, reproducible outputs'], color: 'amber' },
          { title: 'Creation', items: ['Goldilocks scope', 'Build → measure → learn', "Ship small. Show, don't tell."], color: 'emerald' },
        ].map((c) => (
          <div key={c.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{c.title}</h3>
            <ul className="space-y-3">
              {c.items.map((i, idx) => (
                <li key={idx} className="text-sm text-zinc-400 flex items-start gap-2 leading-relaxed">
                  <span className="text-zinc-600">—</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  // 3 — Module 1 intro
  {
    id: 'module-1-intro',
    eyebrow: 'Module 1 · 15 min',
    title: 'Map your four circles',
    module: 'Module 1',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'Four circles: love · good · needs · pays.',
      'External evidence beats internal guessing. Other people\'s words, not yours.',
    ],
    body: () => (
      <div className="relative max-w-3xl mx-auto">
        <Image
          src="/images/workshops/ikigai-branding/ikigai-venn.jpg"
          alt="Ikigai Venn diagram"
          width={1920}
          height={960}
          priority
          className="w-full h-auto rounded-3xl border border-white/[0.06]"
        />
      </div>
    ),
  },
  // 4 — Module 1 deep
  {
    id: 'module-1-deep',
    eyebrow: 'Module 1',
    title: 'Four questions. Specific answers.',
    module: 'Module 1',
    minutes: 12,
    color: 'violet',
    speakerNotes: [
      'Run the wizard live. 3 min per circle. Use Coach GPT deep-links if a participant stalls.',
      'Push past generic. "Specificity beats volume."',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: 'What I love', q: 'What activities make time disappear for you?', hint: 'Name specific moments from the last 12 months.' },
          { label: "What I'm good at", q: 'What do people keep thanking you for?', hint: "External evidence only. Other people's words." },
          { label: 'What the world needs', q: 'Whose problem do you care about for ten years?', hint: 'The narrower the "who", the stronger the answer.' },
          { label: 'What pays', q: 'What are people already paying for in this space?', hint: 'Real invoices. Real courses. Follow the money.' },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2">{c.label}</p>
            <p className="text-lg font-semibold text-white mb-2 leading-snug">{c.q}</p>
            <p className="text-xs text-zinc-500">{c.hint}</p>
          </div>
        ))}
      </div>
    ),
  },
  // 5 — Module 2
  {
    id: 'module-2',
    eyebrow: 'Module 2 · 10 min',
    title: 'Write the sentence',
    module: 'Module 2',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'Two to three lines. Fits on a business card.',
      'Quality test: if a competitor could say the same sentence verbatim, sharpen it.',
    ],
    body: () => (
      <div className="space-y-6">
        <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-violet-500/[0.04] p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-3">The template</p>
          <p className="text-2xl sm:text-3xl text-white leading-relaxed font-medium tracking-tight">
            I help <span className="text-amber-300">[who]</span> achieve <span className="text-emerald-300">[outcome]</span>
            <br />by <span className="text-violet-300">[how]</span>, using <span className="text-sky-300">[skills]</span> in <span className="text-rose-300">[domain]</span>.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">Worked example</p>
          <p className="text-base text-zinc-300 leading-relaxed italic">
            "I help early-career analysts turn messy spreadsheets into decisions,
            by pairing them with AI workflows, using ten years of consulting craft, in finance and operations teams."
          </p>
        </div>
      </div>
    ),
  },
  // 6 — Module 3 Brand Bridge
  {
    id: 'module-3',
    eyebrow: 'Module 3 · 10 min',
    title: 'The Brand Bridge',
    module: 'Module 3',
    minutes: 10,
    color: 'amber',
    speakerNotes: [
      'Three exercises. Each anchored to the Module 2 statement.',
      'Audience-of-One is the hardest. Force a single real-feeling name.',
    ],
    body: () => (
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Target, title: 'Positioning Sentence', sub: 'Force a trade-off. Who you are NOT for.' },
          { icon: UserCircle, title: 'Audience of One', sub: 'A single name. A specific situation. This week\'s problem.' },
          { icon: Layers3, title: 'Three Content Pillars', sub: '12 months of posts without repeating.' },
        ].map((b) => {
          const Icon = b.icon
          return (
            <div key={b.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.sub}</p>
            </div>
          )
        })}
      </div>
    ),
  },
  // 7 — Module 4 hooks
  {
    id: 'module-4-hooks',
    eyebrow: 'Module 4 · LinkedIn Top Voice',
    title: 'Five hook formats',
    module: 'Module 4',
    minutes: 5,
    color: 'emerald',
    speakerNotes: [
      'Pattern over creativity. Rotate the five so you never stare at a blank page.',
      'Have them pick ONE format and draft a real hook for their pillar live.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        {[
          { name: 'Contrarian Take', pattern: 'Everyone says X. I think the opposite — and here is why.' },
          { name: 'Story Open', pattern: 'Last [time], [vivid moment]. Here is what it taught me.' },
          { name: 'Counter-Wisdom', pattern: 'The advice is X. The advice is wrong for [audience].' },
          { name: 'Numbered Breakdown', pattern: '[N] things I learned about Y after [proof of work].' },
          { name: 'Vulnerable Confession', pattern: 'I used to [bad pattern]. Here is what changed it.' },
        ].map((h) => (
          <div key={h.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="font-semibold text-white mb-1.5">{h.name}</p>
            <p className="text-zinc-400 italic leading-relaxed text-xs">"{h.pattern}"</p>
          </div>
        ))}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-center">
          <p className="text-emerald-200 font-medium text-sm">
            Pick ONE. Draft a hook for your pillar in the next 90 seconds.
          </p>
        </div>
      </div>
    ),
  },
  // 8 — Weekly rhythm + channels
  {
    id: 'module-4-rhythm',
    eyebrow: 'Module 4',
    title: '3 · 2 · 1 · 1 — Weekly rhythm',
    module: 'Module 4',
    minutes: 4,
    color: 'emerald',
    speakerNotes: [
      'Three Insight · Two Build-in-Public · One Connection · One Rest.',
      'Rest day is non-negotiable. Algorithm rewards consistency, not exhaustion.',
    ],
    body: () => (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Insight', count: 3, color: 'violet-500' },
            { label: 'Build-in-Public', count: 2, color: 'amber-500' },
            { label: 'Connection', count: 1, color: 'emerald-500' },
            { label: 'Rest', count: 1, color: 'zinc-700' },
          ].map((r) => (
            <div key={r.label} className={`rounded-2xl border border-${r.color}/30 bg-${r.color}/10 p-5 text-center`}>
              <p className="text-4xl font-bold text-white mb-1">{r.count}</p>
              <p className="text-xs text-zinc-300 uppercase tracking-wider">{r.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-sm text-zinc-400 leading-relaxed">
            <span className="text-white font-medium">Each channel has a different job.</span>{' '}
            LinkedIn = authority. Threads = raw thinking. Newsletter = consolidation. Shorts = visualize pillars.
            Stop reposting the same thing four times.
          </p>
        </div>
      </div>
    ),
  },
  // 9 — 30-day calendar
  {
    id: 'module-4-calendar',
    eyebrow: 'Module 4 · The deliverable',
    title: 'Your 30-day calendar',
    module: 'Module 4',
    minutes: 3,
    color: 'emerald',
    speakerNotes: [
      'Three formats: Notion · Google Sheet · CSV. They pick what they live in.',
      'Pro tip: 60 min Sunday batch. Schedule with Buffer / Typefully. Real attention compounds.',
    ],
    body: () => (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1.5 text-xs">
          {Array.from({ length: 28 }).map((_, i) => {
            const day = i % 7
            const isRest = day === 6
            const archetype = day < 3 ? 'Insight' : day < 5 ? 'Build' : day === 5 ? 'Connect' : 'Rest'
            const colorClass = isRest
              ? 'border-white/[0.04] bg-white/[0.01] text-zinc-700'
              : day < 3
                ? 'border-violet-500/20 bg-violet-500/[0.04] text-violet-200'
                : day < 5
                  ? 'border-amber-500/20 bg-amber-500/[0.04] text-amber-200'
                  : 'border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-200'
            return (
              <div key={i} className={`rounded-lg border p-2 text-center ${colorClass}`}>
                <div className="font-semibold text-[10px]">D{i + 1}</div>
                <div className="text-[9px] mt-0.5 leading-tight">{archetype}</div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold">
            Notion template
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-zinc-200 text-sm font-medium">
            Google Sheet
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.10] text-zinc-200 text-sm font-medium">
            Download CSV
          </div>
        </div>
      </div>
    ),
  },
  // 10 — GenCreator Stack
  {
    id: 'module-5',
    eyebrow: 'Module 5 · 5 min',
    title: 'The GenCreator Stack',
    module: 'Module 5',
    minutes: 5,
    color: 'sky',
    speakerNotes: [
      'Five jobs every creator runs. Pick one tool per job. Master it. Then expand.',
      'Discipline: add a tool only when an existing tool fails you twice.',
    ],
    body: () => (
      <div className="grid grid-cols-5 gap-3">
        {[
          { icon: Mic, title: 'Capture', tool: 'Loom', color: 'violet' },
          { icon: Brain, title: 'Think', tool: 'Claude Cowork', color: 'sky' },
          { icon: Wand2, title: 'Make', tool: 'Suno · NB2', color: 'amber' },
          { icon: Send, title: 'Ship', tool: 'Buffer · Beehiiv', color: 'emerald' },
          { icon: BarChart3, title: 'Measure', tool: 'Plausible', color: 'rose' },
        ].map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-zinc-300" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{c.title}</p>
              <p className="text-xs text-zinc-500">{c.tool}</p>
            </div>
          )
        })}
      </div>
    ),
  },
  // 11 — Live artifact
  {
    id: 'module-6',
    eyebrow: 'Module 6 · The artifact',
    title: 'Watch the post get written',
    module: 'Module 6',
    minutes: 5,
    color: 'amber',
    speakerNotes: [
      'Play Loom OR demo live: Claude Cowork in second window.',
      'Narrate: "Notice I rejected the first 2 hooks. Specificity beats template."',
      'Close: "AI-assisted. Voice-preserved. Ship today."',
    ],
    body: () => (
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div className="aspect-video bg-[#050507] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-amber-500/[0.04] to-transparent" />
          <div className="relative text-center">
            <div className="w-20 h-20 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center mx-auto mb-4">
              <Play className="w-9 h-9 text-amber-300 ml-1" fill="currentColor" />
            </div>
            <p className="text-base text-zinc-300 font-medium">90 seconds · Claude Cowork demo</p>
            <p className="text-xs text-zinc-500 mt-1">A LinkedIn post written in real time</p>
          </div>
        </div>
      </div>
    ),
  },
  // 12 — Activation
  {
    id: 'module-7',
    eyebrow: 'Module 7 · Activation',
    title: '4 visible artifacts in 30 days',
    module: 'Module 7',
    minutes: 4,
    color: 'emerald',
    speakerNotes: [
      'Public commitment increases follow-through 3×.',
      'Have them text the commitment to one person before leaving the room.',
    ],
    body: () => (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: TrendingUp, title: '1 post', sub: 'Pick one hook format. Ship Monday.' },
            { icon: Play, title: '1 short video', sub: '45–90 seconds. Captions on. Pillar in title.' },
            { icon: UserCircle, title: '1 conversation', sub: 'DM or email to your audience-of-one.' },
            { icon: Rocket, title: '1 small product', sub: 'Template · checklist · mini-guide.' },
          ].map((a) => {
            const Icon = a.icon
            return (
              <div key={a.title} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-base font-semibold text-white mb-1">{a.title}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{a.sub}</p>
              </div>
            )
          })}
        </div>
      </div>
    ),
  },
  // 13 — Outro
  {
    id: 'outro',
    eyebrow: 'Stay in touch',
    title: 'Three ways to keep going',
    minutes: 3,
    color: 'violet',
    speakerNotes: [
      'Show QR codes. Promise Resource Pack lands in inbox tonight.',
      'Day-7 check-in is the secret weapon.',
    ],
    body: () => (
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Sparkles, title: 'Coach GPT', sub: 'Walk through everything in chat.', url: 'frankx.ai/go/ikigai-coach', color: 'violet' },
          { icon: Mail, title: 'Resource Pack', sub: 'Templates + Day-7 check-in.', url: 'frankx.ai/workshops/ikigai-branding', color: 'amber' },
          { icon: Compass, title: 'AI Architect Newsletter', sub: 'Weekly intelligence for makers.', url: 'frankx.ai/newsletter', color: 'emerald' },
        ].map((c) => {
          const Icon = c.icon
          return (
            <div key={c.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{c.title}</h3>
              <p className="text-sm text-zinc-400 mb-3">{c.sub}</p>
              <p className="text-xs text-zinc-500 font-mono break-all">{c.url}</p>
            </div>
          )
        })}
      </div>
    ),
  },
]

// ---- Component ---------------------------------------------------------

export default function IkigaiPresentPage() {
  const [index, setIndex] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number>(Date.now())
  const tickRef = useRef<number | null>(null)

  const slide = SLIDES[index]
  const total = SLIDES.length

  const next = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total])
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  const startTimer = useCallback(() => {
    startRef.current = Date.now() - elapsed
    setRunning(true)
  }, [elapsed])

  const pauseTimer = useCallback(() => setRunning(false), [])

  const resetTimer = useCallback(() => {
    setElapsed(0)
    startRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (!running) return
    tickRef.current = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 250) as unknown as number
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [running])

  // Keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v)
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer()
      } else if (e.key === 'p' || e.key === 'P') {
        setRunning((v) => !v)
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {})
        } else {
          document.exitFullscreen().catch(() => {})
        }
      } else if (e.key === 'Escape') {
        setNotesOpen(false)
      } else if (/^[0-9]$/.test(e.key)) {
        const target = parseInt(e.key, 10)
        if (target < SLIDES.length) setIndex(target)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, resetTimer])

  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total])

  return (
    <div className="fixed inset-0 bg-[#0a0a0b] text-white overflow-hidden">
      {/* Backdrop gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-amber-500/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-violet-500/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Slide stage */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.04] print:hidden">
          <Link
            href="/workshops/ikigai-branding"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to workshop page
          </Link>
          <div className="text-xs text-zinc-600 font-mono">
            {pad(index + 1)} / {pad(total)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/[0.04] print:hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-400 to-amber-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center px-8 py-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl mx-auto"
            >
              {slide.eyebrow && (
                <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-3">
                  {slide.eyebrow}
                </p>
              )}
              {slide.id !== 'cover' && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-10 max-w-4xl">
                  {slide.title}
                </h2>
              )}
              {slide.body()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer HUD */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.04] print:hidden">
          {/* Nav dots */}
          <div className="flex items-center gap-1">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-violet-400' : 'w-1.5 bg-white/[0.12] hover:bg-white/[0.25]'
                }`}
              />
            ))}
          </div>

          {/* Timer + controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-mono">
              <span className={running ? 'text-emerald-300' : 'text-zinc-500'}>
                {formatTime(elapsed)}
              </span>
              <button
                onClick={running ? pauseTimer : startTimer}
                className="text-zinc-400 hover:text-white p-1"
                aria-label={running ? 'Pause timer' : 'Start timer'}
              >
                {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="text-zinc-500 hover:text-white p-1"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-px h-5 bg-white/[0.08]" />

            <button
              onClick={() => setNotesOpen((v) => !v)}
              className={`p-1.5 rounded-md hover:bg-white/[0.06] ${notesOpen ? 'text-amber-300' : 'text-zinc-400 hover:text-white'}`}
              aria-label="Toggle notes"
            >
              <StickyNote className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {})
                } else {
                  document.exitFullscreen().catch(() => {})
                }
              }}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-white/[0.08]" />

            <button
              onClick={prev}
              disabled={index === 0}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              disabled={index === total - 1}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notes drawer */}
      <AnimatePresence>
        {notesOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-x-0 bottom-16 z-40 px-8 print:hidden"
          >
            <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.10] bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-amber-300" />
                  <p className="text-sm font-semibold text-white">Speaker notes</p>
                  <span className="text-xs text-zinc-500">· suggested {slide.minutes} min</span>
                </div>
                <button
                  onClick={() => setNotesOpen(false)}
                  className="text-zinc-500 hover:text-zinc-200"
                  aria-label="Close notes"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-1.5">
                {slide.speakerNotes.map((n, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-300/60 mt-0.5">›</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <p className="absolute bottom-1 inset-x-0 text-center text-[10px] text-zinc-700 print:hidden">
        ← → next · N notes · P pause · R reset · F fullscreen · 0-9 jump
      </p>

      {/* Print styles — generates PDF with every slide on its own page */}
      <style jsx global>{`
        @media print {
          html, body {
            background: white !important;
            color: black !important;
          }
          .fixed {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}
