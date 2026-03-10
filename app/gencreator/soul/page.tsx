'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'
import Image from 'next/image'
import { ArrowRight, Download, FileText, Scroll, Copy, Check } from 'lucide-react'

import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'
import { soulDimensions } from '@/lib/gencreator/gencreator-data'
import type { GlowColor } from '@/components/ui/glow-card'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GenCreator Soul — Build Your soul.md',
  description: 'The 7 dimensions of a complete GenCreator. Build your personal soul.md — the operating file that defines who you are as a creator.',
  url: 'https://frankx.ai/gencreator/soul',
  author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
}

const soulMdTemplate = `# soul.md — Your GenCreator Operating File

## Identity
- Name:
- Craft:
- Stack:
- Mission:

## Energy
- Peak hours:
- Movement practice:
- Recovery ritual:
- Energy score (1-10):

## Mind
- Currently learning:
- Books this month:
- Mental model I use most:
- Learning velocity (1-10):

## Craft
- Primary skill:
- Secondary skills:
- Current project:
- Craft score (1-10):

## Voice
- My perspective on:
- What I would say if no one judged:
- Writing style in 3 words:
- Voice clarity (1-10):

## Capital
- Revenue streams:
- Monthly target:
- Highest-leverage activity:
- Financial health (1-10):

## Circle
- Mentors:
- Peers:
- Community I serve:
- Network strength (1-10):

## Legacy
- What I want to leave behind:
- System that works without me:
- 10-year vision:
- Legacy clarity (1-10):
`

interface SoulForm {
  name: string
  craft: string
  stack: string
  mission: string
  peakHours: string
  movement: string
  recovery: string
  energyScore: string
  learning: string
  books: string
  mentalModel: string
  learningScore: string
  primarySkill: string
  secondarySkills: string
  currentProject: string
  craftScore: string
  perspective: string
  uncensored: string
  writingStyle: string
  voiceScore: string
  revenue: string
  monthlyTarget: string
  leverage: string
  financialScore: string
  mentors: string
  peers: string
  communityServed: string
  networkScore: string
  legacy: string
  systemWithout: string
  tenYearVision: string
  legacyScore: string
}

const emptySoul: SoulForm = {
  name: '', craft: '', stack: '', mission: '',
  peakHours: '', movement: '', recovery: '', energyScore: '',
  learning: '', books: '', mentalModel: '', learningScore: '',
  primarySkill: '', secondarySkills: '', currentProject: '', craftScore: '',
  perspective: '', uncensored: '', writingStyle: '', voiceScore: '',
  revenue: '', monthlyTarget: '', leverage: '', financialScore: '',
  mentors: '', peers: '', communityServed: '', networkScore: '',
  legacy: '', systemWithout: '', tenYearVision: '', legacyScore: '',
}

function generateSoulMd(s: SoulForm): string {
  return `# soul.md — Your GenCreator Operating File

## Identity
- Name: ${s.name || '___'}
- Craft: ${s.craft || '___'}
- Stack: ${s.stack || '___'}
- Mission: ${s.mission || '___'}

## Energy
- Peak hours: ${s.peakHours || '___'}
- Movement practice: ${s.movement || '___'}
- Recovery ritual: ${s.recovery || '___'}
- Energy score (1-10): ${s.energyScore || '___'}

## Mind
- Currently learning: ${s.learning || '___'}
- Books this month: ${s.books || '___'}
- Mental model I use most: ${s.mentalModel || '___'}
- Learning velocity (1-10): ${s.learningScore || '___'}

## Craft
- Primary skill: ${s.primarySkill || '___'}
- Secondary skills: ${s.secondarySkills || '___'}
- Current project: ${s.currentProject || '___'}
- Craft score (1-10): ${s.craftScore || '___'}

## Voice
- My perspective on: ${s.perspective || '___'}
- What I would say if no one judged: ${s.uncensored || '___'}
- Writing style in 3 words: ${s.writingStyle || '___'}
- Voice clarity (1-10): ${s.voiceScore || '___'}

## Capital
- Revenue streams: ${s.revenue || '___'}
- Monthly target: ${s.monthlyTarget || '___'}
- Highest-leverage activity: ${s.leverage || '___'}
- Financial health (1-10): ${s.financialScore || '___'}

## Circle
- Mentors: ${s.mentors || '___'}
- Peers: ${s.peers || '___'}
- Community I serve: ${s.communityServed || '___'}
- Network strength (1-10): ${s.networkScore || '___'}

## Legacy
- What I want to leave behind: ${s.legacy || '___'}
- System that works without me: ${s.systemWithout || '___'}
- 10-year vision: ${s.tenYearVision || '___'}
- Legacy clarity (1-10): ${s.legacyScore || '___'}
`
}

const builderSections = [
  { title: 'Identity', fields: [
    { key: 'name', label: 'Name', placeholder: 'Your creator name' },
    { key: 'craft', label: 'Craft', placeholder: 'AI + Music + Writing' },
    { key: 'stack', label: 'Stack', placeholder: 'Claude, Suno, Next.js, Vercel' },
    { key: 'mission', label: 'Mission', placeholder: 'Build systems that compound' },
  ]},
  { title: 'Energy', fields: [
    { key: 'peakHours', label: 'Peak hours', placeholder: '5am-9am' },
    { key: 'movement', label: 'Movement practice', placeholder: 'Daily walks, gym 3x/week' },
    { key: 'recovery', label: 'Recovery ritual', placeholder: 'Evening reading, no screens after 10' },
    { key: 'energyScore', label: 'Score (1-10)', placeholder: '7' },
  ]},
  { title: 'Mind', fields: [
    { key: 'learning', label: 'Currently learning', placeholder: 'Agent orchestration patterns' },
    { key: 'books', label: 'Books this month', placeholder: 'The Almanack of Naval Ravikant' },
    { key: 'mentalModel', label: 'Mental model I use most', placeholder: 'Compounding / leverage' },
    { key: 'learningScore', label: 'Score (1-10)', placeholder: '8' },
  ]},
  { title: 'Craft', fields: [
    { key: 'primarySkill', label: 'Primary skill', placeholder: 'AI architecture' },
    { key: 'secondarySkills', label: 'Secondary skills', placeholder: 'Music production, content writing' },
    { key: 'currentProject', label: 'Current project', placeholder: 'GenCreator Framework' },
    { key: 'craftScore', label: 'Score (1-10)', placeholder: '9' },
  ]},
  { title: 'Voice', fields: [
    { key: 'perspective', label: 'My perspective on', placeholder: 'AI-human collaboration' },
    { key: 'uncensored', label: 'What I\'d say if no one judged', placeholder: 'Most people are building wrong' },
    { key: 'writingStyle', label: 'Writing style in 3 words', placeholder: 'Direct, technical, warm' },
    { key: 'voiceScore', label: 'Score (1-10)', placeholder: '6' },
  ]},
  { title: 'Capital', fields: [
    { key: 'revenue', label: 'Revenue streams', placeholder: 'Products, consulting, content' },
    { key: 'monthlyTarget', label: 'Monthly target', placeholder: '$5,000' },
    { key: 'leverage', label: 'Highest-leverage activity', placeholder: 'Building digital products' },
    { key: 'financialScore', label: 'Score (1-10)', placeholder: '5' },
  ]},
  { title: 'Circle', fields: [
    { key: 'mentors', label: 'Mentors', placeholder: 'Naval, Pieter Levels, Paul Graham' },
    { key: 'peers', label: 'Peers', placeholder: 'GenCreator community, indie hackers' },
    { key: 'communityServed', label: 'Community I serve', placeholder: 'AI-native creators' },
    { key: 'networkScore', label: 'Score (1-10)', placeholder: '7' },
  ]},
  { title: 'Legacy', fields: [
    { key: 'legacy', label: 'What I want to leave behind', placeholder: 'A framework others build on' },
    { key: 'systemWithout', label: 'System that works without me', placeholder: 'Automated content engine' },
    { key: 'tenYearVision', label: '10-year vision', placeholder: '10,000 GenCreators shipping daily' },
    { key: 'legacyScore', label: 'Score (1-10)', placeholder: '8' },
  ]},
] as const

export default function SoulPage() {
  const [activeDimension, setActiveDimension] = useState<number | null>(null)
  const [soulForm, setSoulForm] = useState<SoulForm>(emptySoul)
  const [copied, setCopied] = useState(false)
  const [showBuilder, setShowBuilder] = useState(false)

  const updateField = useCallback((key: string, value: string) => {
    setSoulForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const generatedMd = generateSoulMd(soulForm)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(generatedMd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedMd])

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedMd], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'soul.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [generatedMd])

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-[#02030b] to-rose-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)]" />

        {/* FRANK-Omega thinking accent */}
        <div className="pointer-events-none absolute left-4 bottom-4 hidden w-36 opacity-[0.06] lg:block">
          <Image src="/images/mascot/frank-omega-thinking-v1.png" alt="" width={144} height={144} className="object-contain" aria-hidden="true" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
            7 Dimensions
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-amber-100 to-yellow-100 bg-clip-text text-transparent">
              GenCreator Soul
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            You are the document you write about yourself.
            <br className="hidden sm:block" />
            <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-amber-300">soul.md</code> is the file where your creative identity lives.
          </p>
        </div>
      </section>

      {/* ─── What is soul.md? ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">What is soul.md?</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Every AI agent has a configuration file that defines its identity. Claude has <code className="rounded bg-white/[0.08] px-1 text-amber-300/80">CLAUDE.md</code>.
                Your soul.md is the same idea — but for you, the creator. It is the document where
                your creative identity persists. Your values, your craft, your vision, your edges.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                The original insight: <span className="italic text-amber-200/70">&ldquo;The AI did not remember the document. It <em>was</em> the document.&rdquo;</span>{' '}
                The same is true for you. You become what you write about yourself — across 7 dimensions,
                reviewed weekly, refined monthly, carried forward like a compass through every creative season.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Write yourself into existence. Then keep writing.
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-white/[0.06] bg-[#0d1117] p-4 font-mono text-xs md:min-w-[280px]">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="space-y-1 text-white/50">
                <p><span className="text-emerald-400">$</span> cat ~/soul.md</p>
                <p className="text-amber-300"># GenCreator: You</p>
                <p className="text-white/30">## Energy: 8/10</p>
                <p className="text-white/30">## Craft: AI + Music</p>
                <p className="text-white/30">## Voice: Direct, technical, warm</p>
                <p className="text-white/30">## Legacy: Systems that outlive me</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Dimensions Explorer ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            The 7 Dimensions
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/50">
            Seven facets of a complete creator. Each one a lens — a way of seeing yourself more clearly. Open any dimension to reflect.
          </p>

          {/* Dimension selector */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {soulDimensions.map((dim) => (
              <button
                key={dim.number}
                onClick={() => setActiveDimension(activeDimension === dim.number ? null : dim.number)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  activeDimension === dim.number
                    ? 'border-amber-400/40 bg-amber-500/15 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    : 'border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/[0.15] hover:text-white/80'
                }`}
              >
                <span className="text-lg">{dim.symbol}</span>
                {dim.name}
              </button>
            ))}
          </div>

          {/* Expanded dimension */}
          <AnimatePresence mode="wait">
            {activeDimension !== null && (
              <motion.div
                key={activeDimension}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mb-12"
              >
                {soulDimensions
                  .filter((d) => d.number === activeDimension)
                  .map((dim) => (
                    <GlowCard key={dim.number} color={dim.glowColor as GlowColor} className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{dim.symbol}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{dim.name}</h3>
                          <p className="text-sm text-amber-300/70">{dim.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-white/60 mb-6">{dim.description}</p>
                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                          Reflection Questions
                        </p>
                        <ul className="space-y-3">
                          {dim.questions.map((q, i) => (
                            <li key={i} className="flex gap-3 text-sm text-white/50">
                              <span className="mt-0.5 shrink-0 text-amber-400/60">{i + 1}.</span>
                              {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlowCard>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* All dimensions compact grid (when none expanded) */}
          {activeDimension === null && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {soulDimensions.map((dim) => (
                <GlowCard
                  key={dim.number}
                  color={dim.glowColor as GlowColor}
                  className="cursor-pointer p-5"
                  onClick={() => setActiveDimension(dim.number)}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{dim.symbol}</span>
                    <h3 className="text-lg font-semibold text-white">{dim.name}</h3>
                  </div>
                  <p className="text-sm text-white/50">{dim.tagline}</p>
                  <p className="mt-3 text-xs text-white/30">{dim.questions.length} questions &rarr;</p>
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Interactive Soul Builder ─── */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Build Your soul.md
            </h2>
            <p className="mt-4 text-white/50">
              Fill in each dimension. Your soul.md generates in real-time. Download when ready.
            </p>
            <button
              onClick={() => setShowBuilder(!showBuilder)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/20"
            >
              <FileText className="h-4 w-4" />
              {showBuilder ? 'Hide Builder' : 'Open Interactive Builder'}
            </button>
          </div>

          <AnimatePresence>
            {showBuilder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                  {/* Form */}
                  <div className="space-y-6">
                    {builderSections.map((section) => (
                      <div key={section.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-300/70">
                          {section.title}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {section.fields.map((field) => (
                            <div key={field.key}>
                              <label className="mb-1 block text-xs text-white/40">{field.label}</label>
                              <input
                                type="text"
                                value={soulForm[field.key as keyof SoulForm]}
                                onChange={(e) => updateField(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/80 placeholder:text-white/20 focus:border-amber-400/40 focus:outline-none focus:ring-1 focus:ring-amber-400/20"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live Preview */}
                  <div className="lg:sticky lg:top-4 lg:self-start">
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500/80" />
                          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-xs text-white/20">~/soul.md</span>
                      </div>
                      <pre className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap font-mono text-xs text-white/50 leading-relaxed scrollbar-hide">
                        {generatedMd}
                      </pre>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white/80"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download .md
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Static template fallback */}
          {!showBuilder && (
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117] p-6 font-mono text-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs text-white/20">~/soul.md</span>
              </div>
              <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap text-white/50 leading-relaxed scrollbar-hide">
                {soulMdTemplate}
              </pre>
            </div>
          )}

          {/* Related reading */}
          <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30">Go Deeper</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <a href="/blog/how-to-build-your-soul-md" className="text-sm text-emerald-400 hover:text-emerald-300">
                How to Build Your soul.md (blog) →
              </a>
              <a href="/blog/gencreator-7-dimensions-complete-guide" className="text-sm text-emerald-400 hover:text-emerald-300">
                The 7 Dimensions Guide (blog) →
              </a>
              <a href="/gencreator/assess" className="text-sm text-emerald-400 hover:text-emerald-300">
                Take the Self-Assessment →
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/manifesto">
              <Scroll className="h-5 w-5" />
              Read the Manifesto
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="soul-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
