'use client'

/**
 * Ikigai & Branding Workshop — CANONICAL
 *
 * Promoted from V7 (audience-aware synthesis). V1's English-first structure
 * with three V6 imports — NB2 brushstroke hero, NB2 Venn diagram, V5
 * superintelligent prompts — and one Japanese accent (Kamiya quote mid-page).
 *
 * Earlier preview iterations remain live at /workshops/ikigai/v2 through /v7
 * for design comparison. This is the canonical page audiences land on.
 *
 * Original V7 architecture preserved (with the V7 chip removed):
 *
 *   1. NB2 brushstroke hero (V4 generation, variant-1) — replaces the
 *      generic Venn JPG that V1 had
 *   2. NB2 Venn diagram (V6 generation, variant-1) — the structural anchor
 *      after the WorkshopPath
 *   3. V5 superintelligent prompts (lib/workshop-prompts-v5.ts) — peer-
 *      collaborator stance, abundance, embedded image-gen, eval ≥4.2
 *
 * Drops everything else from V3-V6:
 *   - Kanji chapter prefixes (直観 chokkan, 探求 tankyū, …) — alienating
 *     for English-speaking creators
 *   - Inter-chapter intermezzo spreads — editorial-magazine pivot
 *   - "Note before we begin" cultural-primer detours
 *   - IkigaiWisdom 3-master panel — folded to one Kamiya pull-quote
 *   - Noto Serif JP global font load — saves bandwidth, no page-level kanji
 *
 * Keeps from V1:
 *   - WorkshopPath orientation cards (3 paths to start)
 *   - WorkshopProgressRail (sticky pill, English labels)
 *   - Coach GPT card pattern (alternative chat-mode entry)
 *   - English module names (Module 1, 2, 3 — no kanji prefix)
 *   - Site-consistent visual register (dark glass, violet→amber accents)
 *
 * Audience: creators, operators, AI-curious humans at NLDigital + Madrid
 * + frankx.ai visitors. English-fluent. Want frameworks they can apply,
 * not cultural deep dives.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Layers,
  Users,
  Mail,
  Sparkles,
  Compass,
  MessageSquareMore,
  Presentation,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiWizard } from '@/components/workshops/ikigai/IkigaiWizard'
import { SynthesisPanel } from '@/components/workshops/ikigai/SynthesisPanel'
import { BrandingBridge } from '@/components/workshops/ikigai/BrandingBridge'
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { WorkshopProgressRail } from '@/components/workshops/ikigai/WorkshopProgressRail'
import { WORKSHOP_PROMPTS_V5 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v5'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'

// Hero brushstroke variant — 1-4. Files at /public/images/workshops/ikigai-branding/v4-hero-variant-{1..4}.jpg
const HERO_VARIANT: 1 | 2 | 3 | 4 = 1
// Venn diagram NB2 variant — 1-4. Files at /public/images/workshops/ikigai-branding/v6-venn-variant-{1..4}.jpg
const VENN_VARIANT: 1 | 2 | 3 | 4 = 1

const PRESENTER_SECTIONS = [
  'intro',
  'venn',
  'start',
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'module-8',
  'module-9',
  'continue',
]

function StackLink({
  label,
  title,
  body,
  href = '/stack',
  external = false,
}: {
  label: string
  title: string
  body: string
  href?: string
  external?: boolean
}) {
  const cls =
    'group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] p-5 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]'
  const inner = (
    <>
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">{label}</p>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">{body}</p>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-1"
      />
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} prefetch={false} className={cls}>
      {inner}
    </Link>
  )
}

interface ModuleHeaderProps {
  number: string
  title: string
  duration: string
  lead: string
  accent: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
}

function ModuleHeader({ number, title, duration, lead, accent }: ModuleHeaderProps) {
  const accentClass = {
    violet: 'text-violet-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
    sky: 'text-sky-300',
    rose: 'text-rose-300',
  }[accent]
  return (
    <div className="mb-6">
      <p className={`text-xs font-medium uppercase tracking-[0.16em] ${accentClass} mb-2`}>
        Module {number} &middot; {duration}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">{lead}</p>
    </div>
  )
}

export default function IkigaiBrandingWorkshopPage() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [presenterActive, setPresenterActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <WorkshopProgressRail />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section id="intro" className="relative pt-28 pb-12 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.05] via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All workshops
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/25">
                Beginner-friendly
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {workshop.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                9 modules
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                Creators &middot; operators &middot; AI-curious
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Ikigai &amp; Branding{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                Workshop
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-6 max-w-2xl leading-relaxed">
              A walk through ikigai with your AI as peer collaborator — not a tutorial bot.
              Map your purpose, write your sentence, ship a 30-day plan, walk out with three
              brand-launch visuals.
            </p>

            <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mb-8">
              {workshop.overview}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#start"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Start the workshop
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="/go/ikigai-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                Prefer a chat? Open Coach GPT
              </a>
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.04] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
              <span>Facilitating?</span>
              <Link
                href="/workshops/ikigai-branding/present"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-violet-200 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1"
              >
                <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
                Open presenter mode
              </Link>
              <span className="text-zinc-700">·</span>
              <button
                onClick={() => setPresenterActive((v) => !v)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1"
              >
                {presenterActive ? 'Hide' : 'Show'} on-page HUD
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NB2 brushstroke hero — visual anchor ────────────────── */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_80px_-20px_rgba(59,51,128,0.35)]">
            <Image
              src={`/images/workshops/ikigai-branding/v4-hero-variant-${HERO_VARIANT}.jpg`}
              alt="A sumi-e ink brushstroke on dark glass — abstract reading of the four ikigai circles, with the kanji 生き甲斐 as a small signature stamp."
              width={2560}
              height={1440}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
              className="w-full h-auto"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/30 via-transparent to-transparent pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ─── Path orientation ─────────────────────────────────────── */}
      <div id="start" className="scroll-mt-24">
        <WorkshopPath />
      </div>

      {/* ─── NB2 Venn — structural anchor (the framework explained) ─── */}
      <section id="venn" className="py-12 sm:py-16 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              The framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Four questions. One word at the center.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              <em>Ikigai</em> is a Japanese word — roughly &ldquo;a reason to wake&rdquo;. The
              four-circle Venn is the modern entry point: where what you love, what you&apos;re
              good at, what the world needs, and what pays meet.
            </p>
          </div>

          <figure className="max-w-md mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(59,51,128,0.3)]">
              <Image
                src={`/images/workshops/ikigai-branding/v6-venn-variant-${VENN_VARIANT}.jpg`}
                alt="The four-circle Ikigai Venn diagram — what you love, what you are good at, what the world needs, what pays — with the kanji 生き甲斐 at the center where all four overlap."
                width={2048}
                height={2048}
                sizes="(max-width: 768px) 90vw, 448px"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="text-center text-xs text-zinc-500 mt-5 max-w-md mx-auto leading-relaxed">
              The Venn is scaffolding. The depth comes from the longevity research and the
              Japanese masters who wrote about ikigai before the West did —{' '}
              <Link
                href="/research/blue-zones-ikigai-ai-era"
                className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4"
              >
                read the research
              </Link>
              .
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── Optional Module 0 — Initial Read (V5 M0 prompt) ────── */}
      <section className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Optional · run before Module 1
              </p>
              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">3 min</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Start with what your AI already knows about you
            </h3>
            <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
              Most workshops start from a blank page. This one starts from a hypothesis. Run
              this prompt first — your AI uses memory, files, and context to put eight
              candidate Ikigai directions on the table. The Socratic walk in Module 1 then
              falsifies or sharpens the bet.
            </p>
            <PromptStack module={0} prompts={WORKSHOP_PROMPTS} label="Run this first" />
          </div>
        </div>
      </section>

      {/* ─── Module 1 — The Ikigai Map ────────────────────────────── */}
      <section id="module-1" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="1"
            title="The Ikigai Map"
            duration="15 min"
            accent="violet"
            lead="Walk the four circles. Your AI brings the questions, you bring the specifics. We're looking for named moments and real evidence — not categories."
          />
          <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="The AI-native path" />
          <details className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or do the wizard manually — works without AI
            </summary>
            <div className="mt-4">
              <IkigaiWizard value={ikigai} onChange={setIkigai} />
            </div>
          </details>
        </div>
      </section>

      {/* ─── Module 2 — Stress-Test the Loves ─────────────────────── */}
      <section id="module-2" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="2"
            title="Stress-Test the Loves"
            duration="10 min"
            accent="emerald"
            lead="Most Ikigai walks die at the doubt step — &ldquo;I can&apos;t have fun AND earn from this.&rdquo; This prompt asks your AI to bring eight verified humans who already do, with real revenue mechanism. Anti-fabrication gated."
          />
          <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Validate dreams against reality" />
        </div>
      </section>

      {/* ─── Module 3 — Your Purpose Statement ────────────────────── */}
      <section id="module-3" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="3"
            title="Your Purpose Statement"
            duration="10 min"
            accent="amber"
            lead="Eight versions of your one-line Ikigai statement, ranked by how much each costs to claim. You pick the one to ship today and the one to ship in twelve months."
          />
          <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="The AI-native path" />
          <details className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or draft manually below
            </summary>
            <div className="mt-4">
              <SynthesisPanel
                value={ikigai}
                onStatementChange={(statement) =>
                  setIkigai((prev) => ({ ...prev, statement }))
                }
              />
            </div>
          </details>
        </div>
      </section>

      {/* ─── Kamiya quote — the one Japanese cultural moment ─────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote>
              <p className="text-xl sm:text-2xl text-zinc-200 leading-[1.5] [font-family:var(--font-serif)] italic">
                &ldquo;Ikigai is the most universal feeling of meaning we have — the quiet
                sense that one&apos;s life is worth living.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.24em] text-zinc-500">
              — Mieko Kamiya, Ikigai-ni-Tsuite, 1966
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── Module 4 — From Purpose to Brand ─────────────────────── */}
      <section id="module-4" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="4"
            title="From Purpose to Brand"
            duration="10 min"
            accent="violet"
            lead="Positioning, one-reader avatar with a first name, three pillars that survive 52 weeks of weekly publishing. The bridge from who you are to who you serve."
          />
          <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="The AI-native path" />
          <details className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or work the bridge exercises manually
            </summary>
            <div className="mt-4">
              <BrandingBridge value={ikigai} />
            </div>
          </details>
        </div>
      </section>

      {/* ─── Module 5 — The 30-Day Plan ──────────────────────────── */}
      <section id="module-5" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="5"
            title="The 30-Day Plan"
            duration="12 min"
            accent="sky"
            lead="A calendar anchored to your one reader's actual week. Plus your first Monday post — five drafts, kill three, ship one."
          />
          <PromptStack
            module={4}
            prompts={WORKSHOP_PROMPTS}
            label="The AI-native path — these prompts generate your plan"
          />
          <details className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-4">
            <summary className="cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Or use the interactive plan builder below
            </summary>
            <div className="mt-4">
              <ContentOperatingPlan value={ikigai} />
            </div>
          </details>
        </div>
      </section>

      {/* ─── Module 6 — Your AI Companion ────────────────────────── */}
      <section id="module-6" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="6"
            title="Your AI Companion"
            duration="8 min"
            accent="violet"
            lead="One opinionated primary AI plus a pair for what your primary can't do. Tool catalog deferred to frankx.ai/stack so this workshop stays focused on the practice."
          />
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Pick your primary companion" />
          <div className="mt-6">
            <StackLink
              label="full tool catalog"
              title="The GenCreator Stack lives at frankx.ai/stack"
              body="The five jobs every creator runs (Capture · Think · Make · Ship · Measure), the AI companions Frank actually uses, the swap-in alternatives. One canonical surface."
              href="/stack"
            />
          </div>
        </div>
      </section>

      {/* ─── Module 7 — Ship the Live Artifact ───────────────────── */}
      <section id="module-7" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="7"
            title="Ship the Live Artifact"
            duration="10 min"
            accent="amber"
            lead="One real LinkedIn post, one 60-second video script, one cover image — all generated in one prompt response. Before you leave this page."
          />
          <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact now" />
        </div>
      </section>

      {/* ─── Module 8 — Lock the Commitment ──────────────────────── */}
      <section id="module-8" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ModuleHeader
            number="8"
            title="Lock the 30-Day Commitment"
            duration="5 min"
            accent="emerald"
            lead="Four artifacts scheduled at fixed cadence (72h, day 14, day 21, day 30) plus the accountability text you send to one human in the next 90 seconds."
          />
          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Lock the commitment" />

          <GlowCard color="emerald">
            <div className="p-6 sm:p-8 text-center">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white mb-2">Get the Resource Pack</h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Templates for the positioning sentence, audience-of-one, 30-day plan, and the
                GenCreator Stack checklist. Plus a Day-7 check-in from Frank.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ikigai-branding"
                  placeholder="Your email"
                  buttonText="Send the pack"
                  compact
                />
              </div>
            </div>
          </GlowCard>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 flex items-start gap-3">
            <MessageSquareMore
              className="w-5 h-5 text-violet-300 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Prefer a conversation?</p>
              <p className="text-sm text-zinc-400 mb-3">
                The free Ikigai &amp; Branding Coach GPT can walk you through everything on
                this page via chat.
              </p>
              <a
                href="/go/ikigai-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 hover:text-violet-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1"
              >
                Open the Coach GPT
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Module 9 — Brand Launch Kit ─────────────────────────── */}
      <section id="module-9" className="pb-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number="9"
            title="Brand Launch Kit"
            duration="15 min"
            accent="rose"
            lead="Three image-gen prompts the AI writes directly in its response — wallpaper for your phone, a poster for your 30-day plan, and your selfie annotated with your mission. Paste into Nano Banana 2, GPT-Image, or Sora."
          />
          <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
        </div>
      </section>

      {/* ─── Continue the practice ───────────────────────────────── */}
      <section id="continue" className="pb-24 scroll-mt-24 border-t border-white/[0.04] pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              Continue the practice
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Ikigai is not a workshop. It is a way of opening tomorrow morning.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
              The workshop ends. The practice begins tomorrow. Pick one cadence you can
              actually hold.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <StackLink
              label="daily"
              title="The Prompt Library — 98 patterns, red-teamed"
              body="Drop into one each morning. Eval-gated, voice-checked, MIT-licensed — fork what works for your own daily practice."
              href="/prompts"
            />
            <StackLink
              label="weekly"
              title="Other live workshops"
              body="AI in 2026 for graduates, Sovereign Leadership, the bespoke ones. The same hands run the next."
              href="/workshops"
            />
            <StackLink
              label="monthly"
              title="The Library — books, annotated"
              body="Kamiya, Mogi, García & Miralles, Buettner. Read one chapter a month. The lineage of the word."
              href="/library"
            />
            <StackLink
              label="research"
              title="Blue Zones, Ikigai, and the AI Era"
              body="The flagship research grounding this workshop. Twelve minutes. Sourced. FAQ'd."
              href="/research/blue-zones-ikigai-ai-era"
            />
          </div>

          <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/[0.04]">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All workshops
            </Link>
            <Link
              href="/workshops/ai-2026-graduates"
              className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
            >
              AI in 2026 workshop
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Presenter HUD overlay */}
      <PresenterOverlay sectionIds={PRESENTER_SECTIONS} active={presenterActive} />
    </div>
  )
}
