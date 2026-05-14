'use client'

import { ArrowUpRight, Sparkles } from 'lucide-react'

interface Companion {
  name: string
  /** 1-2 character monogram glyph */
  glyph: string
  /** Brand accent color — tailwind class for both bg and border */
  accent: 'emerald' | 'violet' | 'sky' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'stone'
  /** Strength in 2-3 words */
  bestFor: string
  /** Longer rationale */
  why: string
  /** Free tier? */
  freeTier: boolean
  url: string
  tier: 'major' | 'secondary'
}

const COMPANIONS: Companion[] = [
  // — Majors (the 5 every creator should know) —
  {
    name: 'ChatGPT',
    glyph: 'G',
    accent: 'emerald',
    bestFor: 'General-purpose default',
    why: '200M+ weekly actives. Strongest brand awareness. Voice, image, search built in. Best free tier for casual creators.',
    freeTier: true,
    url: 'https://chat.openai.com',
    tier: 'major',
  },
  {
    name: 'Claude',
    glyph: 'C',
    accent: 'amber',
    bestFor: 'Long reasoning + code',
    why: 'Anthropic Series F at $183B valuation. Best long-context (200K+ tokens). Cleanest voice for long-form writing. Cowork mode is the killer feature.',
    freeTier: true,
    url: 'https://claude.ai',
    tier: 'major',
  },
  {
    name: 'Gemini',
    glyph: 'G',
    accent: 'sky',
    bestFor: 'Google ecosystem',
    why: 'Native Workspace integration (Docs, Sheets, Gmail). 1M+ token context. Best free model for image + multimodal. Deep Google Search grounding.',
    freeTier: true,
    url: 'https://gemini.google.com',
    tier: 'major',
  },
  {
    name: 'Grok',
    glyph: 'X',
    accent: 'stone',
    bestFor: 'Real-time X / news',
    why: 'xAI native to X. Best for current events, trend analysis, live data. Less filtered tone. Strong for opinionated takes.',
    freeTier: true,
    url: 'https://grok.com',
    tier: 'major',
  },
  {
    name: 'Perplexity',
    glyph: 'P',
    accent: 'cyan',
    bestFor: 'Research with citations',
    why: 'Search-native AI. Every answer cites sources you can audit. Best for fact-checking, market scans, and competitive intel. Pro tier unlocks Claude + GPT.',
    freeTier: true,
    url: 'https://perplexity.ai',
    tier: 'major',
  },
  // — Secondary (specialists worth knowing) —
  {
    name: 'NotebookLM',
    glyph: 'NB',
    accent: 'indigo',
    bestFor: 'Source synthesis',
    why: 'Google research lab tool. Drop 10 docs/PDFs/URLs, get audio overview + Q&A grounded in your sources. Best for research consolidation.',
    freeTier: true,
    url: 'https://notebooklm.google.com',
    tier: 'secondary',
  },
  {
    name: 'Le Chat',
    glyph: 'LC',
    accent: 'rose',
    bestFor: 'EU-sovereign AI',
    why: 'Mistral, French. Best for teams with EU data-residency requirements. Strong on European languages. Open-weights option.',
    freeTier: true,
    url: 'https://chat.mistral.ai',
    tier: 'secondary',
  },
  {
    name: 'Cursor',
    glyph: '⌘',
    accent: 'violet',
    bestFor: 'AI-native coding',
    why: 'For creators who code: VS Code fork with Claude + GPT in the editor. Composer mode replaces 70% of solo coding. Required if you build products.',
    freeTier: true,
    url: 'https://cursor.com',
    tier: 'secondary',
  },
  {
    name: 'Lovable',
    glyph: 'L',
    accent: 'rose',
    bestFor: 'No-code product MVP',
    why: 'Type-to-build full-stack web apps. Best for creators shipping their first product without engineers. Outputs real React + Supabase.',
    freeTier: true,
    url: 'https://lovable.dev',
    tier: 'secondary',
  },
  {
    name: 'ElevenLabs',
    glyph: '11',
    accent: 'stone',
    bestFor: 'Voice cloning + TTS',
    why: 'Industry-grade voice synthesis. Clone your voice once, generate narration for shorts / audiobooks / podcasts. Multilingual.',
    freeTier: true,
    url: 'https://elevenlabs.io',
    tier: 'secondary',
  },
]

const ACCENT_MAP = {
  emerald: { bg: 'bg-emerald-500/[0.08]', border: 'border-emerald-500/30', text: 'text-emerald-300', glow: 'shadow-emerald-500/[0.15]' },
  violet: { bg: 'bg-violet-500/[0.08]', border: 'border-violet-500/30', text: 'text-violet-300', glow: 'shadow-violet-500/[0.15]' },
  sky: { bg: 'bg-sky-500/[0.08]', border: 'border-sky-500/30', text: 'text-sky-300', glow: 'shadow-sky-500/[0.15]' },
  amber: { bg: 'bg-amber-500/[0.08]', border: 'border-amber-500/30', text: 'text-amber-300', glow: 'shadow-amber-500/[0.15]' },
  rose: { bg: 'bg-rose-500/[0.08]', border: 'border-rose-500/30', text: 'text-rose-300', glow: 'shadow-rose-500/[0.15]' },
  indigo: { bg: 'bg-indigo-500/[0.08]', border: 'border-indigo-500/30', text: 'text-indigo-300', glow: 'shadow-indigo-500/[0.15]' },
  cyan: { bg: 'bg-cyan-500/[0.08]', border: 'border-cyan-500/30', text: 'text-cyan-300', glow: 'shadow-cyan-500/[0.15]' },
  stone: { bg: 'bg-stone-500/[0.08]', border: 'border-stone-500/30', text: 'text-stone-300', glow: 'shadow-stone-500/[0.15]' },
} as const

export function AICompanions() {
  const majors = COMPANIONS.filter((c) => c.tier === 'major')
  const secondary = COMPANIONS.filter((c) => c.tier === 'secondary')

  return (
    <div id="ai-companions" className="space-y-6">
      {/* Majors */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8">
        <div className="mb-5 flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The five AI companions every creator should know
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Pick one. Master it. Add the next when the first fails you twice.
            </h3>
          </div>
          <p className="text-xs text-zinc-500">Last refresh · 2026-05</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {majors.map((c) => (
            <CompanionCard key={c.name} companion={c} large />
          ))}
        </div>
      </div>

      {/* Secondary */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
            Specialists worth knowing
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            Add these when the job specifically demands them
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {secondary.map((c) => (
            <CompanionCard key={c.name} companion={c} large={false} />
          ))}
        </div>
      </div>

      {/* Discipline note */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 sm:p-6">
        <p className="text-sm text-emerald-200 leading-relaxed">
          <span className="font-semibold">The trap:</span> subscribing to all five.
          Most creators run 3+ AI tabs and use one. The compounding skill is{' '}
          <span className="text-white">prompt mastery on one model</span> — not
          tool-juggling. The model you actually open daily beats the model with
          better benchmarks.
        </p>
      </div>
    </div>
  )
}

function CompanionCard({ companion, large }: { companion: Companion; large: boolean }) {
  const c = ACCENT_MAP[companion.accent]

  return (
    <a
      href={companion.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block rounded-2xl border ${c.border} ${c.bg} p-4 hover:shadow-lg ${c.glow} transition-all`}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`flex items-center justify-center rounded-xl border ${c.border} ${c.bg} font-bold ${c.text} ${
            large ? 'w-10 h-10 text-base' : 'w-9 h-9 text-sm'
          } tracking-tight`}
        >
          {companion.glyph}
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
      </div>

      <p className="font-semibold text-white text-sm mb-1">{companion.name}</p>
      <p className={`text-xs ${c.text} mb-2 font-medium leading-snug`}>
        {companion.bestFor}
      </p>

      {large && (
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{companion.why}</p>
      )}

      <div className="flex items-center gap-1.5 mt-auto">
        {companion.freeTier && (
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300">
            Free tier
          </span>
        )}
      </div>
    </a>
  )
}
