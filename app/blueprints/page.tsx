import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Cpu,
  Download,
  Headphones,
  Layers,
  Lock,
  Music,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { BlueprintCardAction } from '@/components/blueprints/BlueprintCardAction'

export const metadata = createMetadata({
  title: 'Architecture blueprints — sovereign creator & music operating systems',
  description:
    'Production-grade blueprints, prompt architectures, and multi-agent workflows. Self-serve access to Vibe OS and Agentic Creator OS.',
  path: '/blueprints',
})

interface BlueprintOffer {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  badge: string
  description: string
  icon: typeof Music
  color: 'emerald' | 'violet'
  deliverables: string[]
  specs: { label: string; value: string }[]
  targetAudience: string
  checkoutHref: string
}

const BLUEPRINTS: BlueprintOffer[] = [
  {
    id: 'vibe-os',
    slug: 'vibe-os',
    name: 'Vibe OS — AI music system & sound architecture',
    tagline: 'From emotional intent to broadcast-ready studio release in minutes',
    price: 97,
    badge: 'Flagship music stack',
    description:
      'The comprehensive sound intelligence architecture used to compose, prompt, stem, and master releases like Star Show Us. Complete Suno v4 prompt mechanics, DAW stem mastering chains, and sensory vibe-state mapping.',
    icon: Music,
    color: 'emerald',
    deliverables: [
      'Suno v4 prompt architecture & style token matrices',
      'Stem isolation & Ableton/Logic mastering rack templates',
      'Dynamic audio visualizer presets for motion artwork & Spotify Canvas',
      'Sensory state mapping system for flow state & deep focus audio',
      'Full commercial rights & zero-royalty license for generated masters',
      'Lifetime updates as frontier audio models drop',
    ],
    specs: [
      { label: 'Architecture format', value: 'Repository + Notion workspace' },
      { label: 'Audio model target', value: 'Suno v4 & Udio 1.5' },
      { label: 'Delivery speed', value: 'Instant access post-checkout' },
      { label: 'Mastering rails', value: 'LUFS-calibrated broadcast chains' },
    ],
    targetAudience: 'Composers, creative technologists, and creators seeking high-status generative soundscapes.',
    checkoutHref: '/checkout/vibe-os',
  },
  {
    id: 'agentic-creator-os',
    slug: 'agentic-creator-os',
    name: 'Agentic Creator OS — autonomous creator swarm blueprint',
    tagline: 'Multi-agent publishing pipeline, self-healing memory, and content factory',
    price: 147,
    badge: 'Enterprise creator runtime',
    description:
      'The exact operating system Frank uses to orchestrate parallel agent swarms across Claude Code, Gemini, and Codex. Includes 12 production pipelines, event-sourced memory vaults, and automated quality gates.',
    icon: Cpu,
    color: 'violet',
    deliverables: [
      'Complete multi-agent fleet configuration (.claude, .gemini, .codex)',
      '12 automated production pipelines (articles, newsletters, books, tools)',
      '5-layer memory vault architecture (strategic, technical, creative, ops, wisdom)',
      'Self-healing loop contracts and automated test-audit harnesses',
      'Starlight Intelligence System (SIS) integration connectors',
      'Deterministic quality-gate linters and anti-slop filters',
    ],
    specs: [
      { label: 'Runtime compatibility', value: 'Node.js, Claude Code, Antigravity, Codex' },
      { label: 'Memory engine', value: 'Event-sourced SQLite + JSONL truth' },
      { label: 'Pipeline count', value: '12 end-to-end production pipelines' },
      { label: 'License type', value: 'Full commercial sovereign developer license' },
    ],
    targetAudience: 'Founders, solopreneurs, and AI architects wanting autonomous leverage without hiring an agency.',
    checkoutHref: '/checkout/agentic-creator-os',
  },
]

export default function BlueprintsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-500/[0.05] via-violet-500/[0.03] to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top label */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-xs font-mono tracking-wider text-emerald-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>sovereign digital blueprints · instant access</span>
          </div>
        </div>

        {/* Hero title & value proposition */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Architecture blueprints for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              autonomous builders
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
            Stop starting from scratch. Deploy battle-tested operating systems, multi-agent pipelines, and generative music architectures built to compound on your own infrastructure.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#blueprint-cards"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-[#0a0a0b] transition-[background-color,box-shadow] duration-200 hover:bg-emerald-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Choose your blueprint
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Blueprint Product Cards Grid */}
        <div id="blueprint-cards" className="mt-10 scroll-mt-24 grid gap-8 lg:grid-cols-2">
          {BLUEPRINTS.map((bp) => {
            const Icon = bp.icon
            const isEmerald = bp.color === 'emerald'
            return (
              <div
                key={bp.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0f]/90 p-8 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/[0.14] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Accent glow on hover */}
                <div
                  className={`pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 opacity-20 group-hover:opacity-40 ${
                    isEmerald ? 'bg-emerald-500' : 'bg-violet-500'
                  }`}
                />

                <div>
                  {/* Card top badge & price */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-wide ${
                        isEmerald
                          ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border border-violet-500/30 bg-violet-500/10 text-violet-300'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{bp.badge}</span>
                    </span>

                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold font-mono text-white">${bp.price}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">one-time payment</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white group-hover:text-white/95">
                    {bp.name}
                  </h2>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{bp.tagline}</p>

                  <p className="mt-4 text-xs text-white/50 leading-relaxed border-t border-white/[0.06] pt-4">
                    {bp.description}
                  </p>

                  {/* Specs grid */}
                  <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 text-xs">
                    {bp.specs.map((spec, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] font-mono text-white/40">{spec.label.toLowerCase()}</span>
                        <span className="font-medium text-white/80">{spec.value.toLowerCase()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables checklist */}
                  <div className="mt-6 space-y-2.5">
                    <p className="text-xs font-mono tracking-wider text-white/40">
                      Included deliverables:
                    </p>
                    {bp.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                        <div
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            isEmerald ? 'bg-emerald-500/10 text-emerald-400' : 'bg-violet-500/10 text-violet-400'
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA & Guarantee */}
                <div className="mt-8 border-t border-white/[0.06] pt-6">
                  <BlueprintCardAction
                    ctaLabel={bp.slug === 'vibe-os' ? 'Get Vibe OS' : 'Get Agentic Creator OS'}
                    product={{
                      id: bp.id,
                      name: bp.name,
                      price: bp.price,
                      badge: bp.badge,
                      deliverables: bp.deliverables,
                      color: bp.color,
                      checkoutHref: bp.checkoutHref,
                    }}
                  />

                  <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-white/40">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
                      <span>secure self-serve checkout</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>immediate repository access</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Guarantee and FAQ banner */}
        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 text-center backdrop-blur-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">Sovereignty and guarantee</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/60 leading-relaxed">
            Every blueprint ships with clean, unminified source code, full markdown documentation, and prompt tokens. Zero ongoing royalties. Run it locally, inspect every line, and adapt it to your workflow.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
            <span>✓ direct git & markdown assets</span>
            <span>✓ commercial use enabled</span>
            <span>✓ source you can inspect</span>
          </div>
        </div>
      </div>
    </div>
  )
}
