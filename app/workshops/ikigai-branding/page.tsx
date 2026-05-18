'use client'

/**
 * Ikigai & Branding Workshop — CANONICAL (refresh 2026-05-18)
 *
 * What changed in this refresh per Frank's direction:
 *   - Kanji 生き甲斐 moved into the hero as a left-column anchor (desktop),
 *     stacks above title on mobile. Replaces the "ikigai is a Japanese word"
 *     paragraph as the cultural cue — Japanese minimalism, not exposition.
 *   - V8 clean prompts (1 Coach + 7 micros). ~750 words total. No
 *     "frontier-class reasoning model" preambles. Three options not eight.
 *   - 7 essential modules — Map, Stress-Test, Statement, Brand, Plan,
 *     Ship, Commit. Drops AI-Companion (tool catalog lives at /stack) and
 *     Visual-Kit (bonus, moved to V8 preview only).
 *   - Drops V1 fallback components — IkigaiWizard, SynthesisPanel,
 *     BrandingBridge, ContentOperatingPlan. The audience pastes prompts;
 *     they don't manually walk forms.
 *   - Hero trimmed — no "Show on-page HUD" toggle, no module-count badge.
 *     Two CTAs only: Open the Coach + pick a path.
 *
 * What stayed (Frank: "normal workshop page is still better"):
 *   - NB2 brushstroke hero (variant-1) — V4 generation
 *   - NB2 Venn diagram (variant-1) — V6 generation
 *   - Kamiya quote between Module 3 and Module 4
 *   - WorkshopPath, WorkshopProgressRail, PresenterOverlay, EmailSignup
 *
 * V1-V8 preview archive lives at /workshops/ikigai/v2 through /v8 for
 * design comparison. This is the page audiences land on.
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
  Users,
  Mail,
  MessageSquareMore,
  Presentation,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { PromptCard } from '@/components/workshops/ikigai/PromptCard'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { WorkshopProgressRail } from '@/components/workshops/ikigai/WorkshopProgressRail'
import { WORKSHOP_PROMPTS_V8 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v8'
import { getWorkshopBySlug } from '@/data/workshops'

const HERO_VARIANT: 1 | 2 | 3 | 4 = 1
const VENN_VARIANT: 1 | 2 | 3 | 4 = 1

const PRESENTER_SECTIONS = [
  'intro',
  'venn',
  'coach',
  'start',
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'continue',
]

// V8 Coach prompt (id 'coach', module 0) — the spine of the workshop.
const COACH_PROMPT = WORKSHOP_PROMPTS.find((p) => p.id === 'coach')!

interface StackLinkProps {
  label: string
  title: string
  body: string
  href?: string
  external?: boolean
}

function StackLink({
  label,
  title,
  body,
  href = '/stack',
  external = false,
}: StackLinkProps) {
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
  number: number
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

/**
 * Kanji anchor for the hero. Vertical brush-calligraphy column on
 * desktop (lg+), compact horizontal row on mobile to keep the top
 * uncluttered. Romaji + meaning below — quiet authority, not exposition.
 */
function KanjiAnchor() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="select-none"
      aria-hidden="true"
    >
      <div className="flex flex-row lg:flex-col items-start gap-3 lg:gap-0 leading-none font-light tracking-[-0.04em]">
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-white/90">生</span>
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-violet-300/85">き</span>
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-white/90">甲</span>
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-amber-300/85">斐</span>
      </div>
      <div className="mt-4 lg:mt-5 lg:pl-1">
        <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-500">
          i&middot;ki&middot;gai
        </p>
        <p className="text-[13px] text-zinc-400 italic mt-1.5 leading-snug max-w-[15rem] [font-family:var(--font-serif-editorial)]">
          <span className="text-zinc-300">iki</span> &mdash; to live ·{' '}
          <span className="text-zinc-300">kai</span> &mdash; a reason worth waking for
        </p>
      </div>
    </motion.div>
  )
}

export default function IkigaiBrandingWorkshopPage() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [presenterActive, setPresenterActive] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <WorkshopProgressRail />

      {/* ─── Hero — kanji left, content right ────────────────────── */}
      <section id="intro" className="relative pt-28 pb-12 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.05] via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All workshops
          </Link>

          <div className="grid lg:grid-cols-[auto,1fr] gap-x-14 gap-y-10 items-center">
            {/* Kanji anchor — left column on desktop, top on mobile */}
            <div className="flex justify-start">
              <KanjiAnchor />
            </div>

            {/* Title + body + CTAs */}
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
              <p className="text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed">
                One Coach. Seven modules. Walk out with a one-sentence purpose, a brand,
                a 30-day plan, and the artifact you publish today.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#coach"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Open the Coach
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#start"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Or pick a path
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.04] text-xs text-zinc-500">
                <span>Facilitating? </span>
                <Link
                  href="/workshops/ikigai-branding/present"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-violet-200 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1"
                >
                  <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
                  Open presenter mode
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── NB2 brushstroke hero ────────────────────────────────── */}
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

      {/* ─── The framework — NB2 Venn ────────────────────────────── */}
      <section id="venn" className="py-10 sm:py-14 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              The framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Four questions. One word at the center.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              The four-circle Venn is the entry point: where what you love, what
              you&apos;re good at, what the world needs, and what pays meet.
            </p>
          </div>

          <figure className="max-w-md mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(59,51,128,0.3)]">
              <Image
                src={`/images/workshops/ikigai-branding/v6-venn-variant-${VENN_VARIANT}.jpg`}
                alt="The four-circle Ikigai Venn diagram — what you love, what you are good at, what the world needs, what pays — with the kanji 生き甲斐 at the center."
                width={2048}
                height={2048}
                sizes="(max-width: 768px) 90vw, 448px"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="text-center text-xs text-zinc-500 mt-5 max-w-md mx-auto leading-relaxed">
              The Venn is scaffolding. The depth comes from the longevity research and
              the Japanese masters who wrote about ikigai before the West did —{' '}
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

      {/* ─── THE COACH — primary entry ───────────────────────────── */}
      <section
        id="coach"
        className="relative pb-16 pt-4 scroll-mt-24 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
        <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-[300px] h-[300px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2">
              The spine of this workshop
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Open the Ikigai &amp; Branding Coach
            </h2>
            <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              One prompt. One conversation. Your AI walks the whole arc with you —
              Map → Statement → Brand → Plan → Ship — one question at a time.
            </p>
            <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed mt-3">
              Then drop into the modules below when you want to sharpen a phase.
            </p>
          </div>

          <PromptCard prompt={COACH_PROMPT} />
        </div>
      </section>

      {/* ─── Path orientation — for the linear walkers ───────────── */}
      <div id="start" className="scroll-mt-24">
        <WorkshopPath />
      </div>

      {/* ─── Module 1 — The Map ──────────────────────────────────── */}
      <section id="module-1" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={1}
            title="The Map"
            duration="8 min"
            accent="violet"
            lead="Three ikigai directions on the table — safe, stretch, wild — drawn from what your AI already knows about you. Three, not eight."
          />
          <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Module 2 — Stress-Test ──────────────────────────────── */}
      <section id="module-2" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={2}
            title="Stress-Test"
            duration="8 min"
            accent="emerald"
            lead="Three real humans already earning a living from your direction. Named. Sourced. Or marked unverified. The doubt step dies with evidence."
          />
          <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Module 3 — The Statement ────────────────────────────── */}
      <section id="module-3" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={3}
            title="The Statement"
            duration="10 min"
            accent="amber"
            lead="Three versions of your one-line ikigai statement, ranked by claim-cost. The one you ship today and the one you're growing into."
          />
          <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Kamiya quote — the one cultural moment ──────────────── */}
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
                &ldquo;Ikigai is the most universal feeling of meaning we have — the
                quiet sense that one&apos;s life is worth living.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.24em] text-zinc-500">
              — Mieko Kamiya, Ikigai-ni-Tsuite, 1966
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── Module 4 — Brand ────────────────────────────────────── */}
      <section id="module-4" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={4}
            title="The Brand"
            duration="10 min"
            accent="violet"
            lead="Positioning, one reader with a first name, three pillars that survive twelve months of weekly publishing. Built on your actual words, not invented."
          />
          <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Module 5 — The 30-Day Plan ──────────────────────────── */}
      <section id="module-5" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={5}
            title="The 30-Day Plan"
            duration="8 min"
            accent="sky"
            lead="A rhythm someone with a job can hold. Four Monday topics, one mid-week ritual, one end-of-month artifact."
          />
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Module 6 — Ship the Artifact ────────────────────────── */}
      <section id="module-6" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={6}
            title="Ship the Artifact"
            duration="10 min"
            accent="amber"
            lead="Three artifacts in one response — a LinkedIn post, a 60-second script, an image-gen prompt. Same idea, three shapes. Use your actual words."
          />
          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
        </div>
      </section>

      {/* ─── Module 7 — Commitment + Resource Pack ───────────────── */}
      <section id="module-7" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ModuleHeader
            number={7}
            title="Lock the Commitment"
            duration="5 min"
            accent="emerald"
            lead="Three calendar entries plus the SMS you send to one human asking them to check in on you at day 14. Done in 90 seconds."
          />
          <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />

          <GlowCard color="emerald">
            <div className="p-6 sm:p-8 text-center">
              <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white mb-2">Get the Resource Pack</h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Templates for the positioning sentence, audience-of-one, 30-day plan, and
                the GenCreator Stack checklist. Plus a Day-7 check-in from Frank.
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
              <p className="text-sm font-semibold text-white mb-1">
                Prefer the chat-only path?
              </p>
              <p className="text-sm text-zinc-400 mb-3">
                The free Ikigai &amp; Branding Coach GPT runs the same arc as one
                conversation — Coach prompt prefilled.
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

      {/* ─── Continue the practice ───────────────────────────────── */}
      <section
        id="continue"
        className="pb-24 scroll-mt-24 border-t border-white/[0.04] pt-16 sm:pt-20"
      >
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
