'use client'

/**
 * Ikigai & Branding Workshop — V9 (Solo Edition)
 *
 * Different user from canonical's 90-minute live workshop attendees.
 * V9 is for the person reading this on a Sunday afternoon — at their own
 * pace, over an hour or a weekend, no facilitator, no rush.
 *
 * Differentiations from canonical:
 *   - Hero copy emphasizes self-paced, pause-anywhere
 *   - Drops the WorkshopProgressRail (a 90-min timer surface, not solo)
 *   - Drops the presenter-mode link
 *   - Drops the 5-outcomes-in-90-min panel — replaced with a calmer
 *     "what you'll have when you're done" framing
 *   - Per-module: adds a quiet "Pause point — good place to stop" callout
 *
 * Shares with canonical:
 *   - Kanji left rail (mobile: compact horizontal)
 *   - NB2 brushstroke hero
 *   - IkigaiVenn SVG (the same upgrade canonical got)
 *   - V8 Coach prompt + 7 micros via WORKSHOP_PROMPTS_V8
 *   - Kamiya quote
 *   - purpose-to-brand-flow bridge image
 *   - Continue-the-practice grid
 *
 * Preview route, noindex. If solo-edition lands, it could fork into its
 * own canonical at /workshops/ikigai-branding-solo or similar.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Users, Mail, Pause } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiVenn } from '@/components/workshops/ikigai/IkigaiVenn'
import { PromptCard } from '@/components/workshops/ikigai/PromptCard'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { WORKSHOP_PROMPTS_V8 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v8'

const HERO_VARIANT: 1 | 2 | 3 | 4 = 1
const COACH_PROMPT = WORKSHOP_PROMPTS.find((p) => p.id === 'coach')!

interface StackLinkProps {
  label: string
  title: string
  body: string
  href?: string
}

function StackLink({ label, title, body, href = '/stack' }: StackLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] p-5 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">{label}</p>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">{body}</p>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-1"
      />
    </Link>
  )
}

interface ModuleHeaderProps {
  number: number
  title: string
  lead: string
  accent: 'violet' | 'amber' | 'emerald' | 'sky' | 'rose'
}

function ModuleHeader({ number, title, lead, accent }: ModuleHeaderProps) {
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
        Module {number}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">{lead}</p>
    </div>
  )
}

function PausePoint({ note }: { note: string }) {
  return (
    <div className="mt-5 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 flex items-start gap-3">
      <Pause className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
      <p className="text-[13px] text-zinc-500 italic leading-relaxed [font-family:var(--font-serif-editorial)]">
        {note}
      </p>
    </div>
  )
}

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
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-white/90">き</span>
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-white/90">甲</span>
        <span className="text-[40px] sm:text-[52px] lg:text-[96px] text-white/90">斐</span>
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

export default function IkigaiSoloEditionPage() {
  const [scrollUnlocked, setScrollUnlocked] = useState(false)

  // V9 thesis: solo walkers don't need a progress timer. The "where am I"
  // gets surfaced once you've actually scrolled past the framework — kept
  // for orientation, never urgency.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      if (window.scrollY > 1200) setScrollUnlocked(true)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* No WorkshopProgressRail — V9 doesn't time you */}

      {/* Floating "solo-edition" tag — only after scroll, never blocking */}
      {scrollUnlocked && (
        <div className="fixed top-4 right-4 z-40 pointer-events-none print:hidden">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.08] text-amber-300 text-[10px] uppercase tracking-[0.24em] backdrop-blur-xl">
            <Pause className="w-3 h-3" aria-hidden="true" />
            Solo edition · no rush
          </span>
        </div>
      )}

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
            <div className="flex justify-start">
              <KanjiAnchor />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-amber-500/15 text-amber-300 border-amber-500/25">
                  Solo edition · self-paced
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  An hour, an evening, or a weekend &mdash; no rush
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Ikigai &amp; Branding{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                  Solo
                </span>
              </h1>
              <p className="text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed">
                The 90-minute workshop, slowed down to your pace. One Coach. Seven
                modules. Pause anywhere. Come back tomorrow. The artefacts wait.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/go/ikigai-coach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Open the Coach GPT
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/workshops/ikigai-branding"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Or the live 90-min version
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

      {/* ─── What you'll have when you're done (no time pressure) ── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              When you&apos;re done &mdash; not when the clock says
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Five things to take with you
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Each module produces one. Stop after any of them. Come back when you&apos;re ready.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4 list-none">
            {[
              'Your one-sentence ikigai statement (two versions — today, and grown into)',
              'A brand positioning + one named reader + three pillars',
              'A 30-day rhythm someone with a job can hold',
              'Three real humans living from your direction (sourced or marked unverified)',
              'One artefact you can publish — LinkedIn + script + image-gen prompt',
            ].map((o, i) => (
              <li
                key={i}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 flex items-start gap-3"
              >
                <span className="text-[10px] uppercase tracking-[0.24em] text-violet-300 tabular-nums mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-zinc-200 leading-relaxed">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── AI-as-mirror framing ────────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2">
              How we use AI here
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Mirror. Explorer. Researcher. Not ground truth.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Your AI is the most patient thinking partner you&apos;ve ever had &mdash; but
              it&apos;s not authority. You own the judgment. Every conversation teaches
              it more of who you are; the next one starts a little less from zero.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                label: 'mirror',
                title: 'Returns what you&rsquo;ve shared, sharpened',
                body: 'It restates your own words back to you, more specific. You hear yourself differently.',
              },
              {
                label: 'explorer',
                title: 'Pushes for the moment you skipped',
                body: 'When you answer in categories, it asks for a named moment, a real date, a first name.',
              },
              {
                label: 'researcher',
                title: 'Finds the humans already doing it',
                body: 'Three real names with sourced links. Anything unverified is marked unverified — no fabrication.',
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-300/90 mb-2">
                  {c.label}
                </p>
                <h3
                  className="text-base font-semibold text-white tracking-tight mb-2 leading-snug"
                  dangerouslySetInnerHTML={{ __html: c.title }}
                />
                <p className="text-sm text-zinc-400 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The framework — SVG Venn ─────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              The framework
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Four questions. One word at the center.
            </h2>
          </div>

          <figure>
            <IkigaiVenn />
            <figcaption className="text-center text-xs text-zinc-500 mt-5 max-w-md mx-auto leading-relaxed">
              The Venn is scaffolding &mdash;{' '}
              <Link
                href="/research/blue-zones-ikigai-ai-era"
                className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4"
              >
                the depth is in the research
              </Link>
              .
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── COACH — primary entry ───────────────────────────────── */}
      <section className="relative pb-16 pt-4 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
        <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2">
              Start here
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              One Coach. One conversation. Your pace.
            </h2>
            <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Open the GPT, answer the first question, see what you say. Stop whenever.
              The conversation waits.
            </p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <a
              href="/go/ikigai-coach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              Open the Coach GPT (free, in ChatGPT)
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="text-[11px] text-zinc-500 mt-2">
              opens in a new tab · no signup required
            </p>
          </div>

          <div className="flex items-center gap-3 max-w-md mx-auto mb-6">
            <span className="flex-1 h-px bg-white/[0.06]" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              Or paste into your own AI
            </span>
            <span className="flex-1 h-px bg-white/[0.06]" aria-hidden="true" />
          </div>

          <PromptCard prompt={COACH_PROMPT} />
        </div>
      </section>

      {/* ─── Module 1 — The Map ──────────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={1}
            title="The Map"
            accent="violet"
            lead="Three ikigai directions on the table — safe, stretch, wild. Drawn from what your AI already knows about you."
          />
          <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Good place to stop. Sleep on the three directions. Pick which one to sharpen tomorrow." />
        </div>
      </section>

      {/* ─── Module 2 — Stress-Test ──────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={2}
            title="Stress-Test"
            accent="emerald"
            lead="Three real humans already earning a living from your direction. Named. Sourced."
          />
          <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Click their links. Read for a few minutes. Are any of these lives shaped like yours could be?" />
        </div>
      </section>

      {/* ─── Module 3 — The Statement ────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={3}
            title="The Statement"
            accent="amber"
            lead="Three versions of your one-line ikigai statement, ranked by claim-cost."
          />
          <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Write your today-statement on paper. Look at it tomorrow morning. Still feel true? Move on. Doesn't? Rewrite the prompt." />
        </div>
      </section>

      {/* ─── Kamiya quote ────────────────────────────────────────── */}
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
                &ldquo;Ikigai is the most universal feeling of meaning we have &mdash; the
                quiet sense that one&apos;s life is worth living.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.24em] text-zinc-500">
              — Mieko Kamiya, Ikigai-ni-Tsuite, 1966
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ─── Bridge visual — purpose → brand ─────────────────────── */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(59,51,128,0.3)]">
            <Image
              src="/images/workshops/ikigai-branding/purpose-to-brand-flow.jpg"
              alt="From purpose to brand — a diagram bridging the one-line ikigai statement to brand positioning"
              width={2048}
              height={1280}
              sizes="(max-width: 768px) 90vw, 768px"
              className="w-full h-auto"
            />
          </figure>
        </div>
      </section>

      {/* ─── Module 4 — Brand ────────────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={4}
            title="The Brand"
            accent="violet"
            lead="Positioning, one reader with a first name, three pillars that survive twelve months."
          />
          <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Read your three pillars to one trusted person. Watch their face. Did they nod or did they squint?" />
        </div>
      </section>

      {/* ─── Module 5 — The 30-Day Plan ──────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={5}
            title="The 30-Day Plan"
            accent="sky"
            lead="A rhythm someone with a job can hold. Four Monday topics, one mid-week ritual, one end-of-month artifact."
          />
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Put the four Mondays in your calendar before you keep going. The plan only works if it lives outside this page." />
        </div>
      </section>

      {/* ─── Module 6 — Ship the Artifact ────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModuleHeader
            number={6}
            title="Ship the Artifact"
            accent="amber"
            lead="Three artifacts in one Coach response — a LinkedIn post, a 60-second script, an image-gen prompt."
          />
          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Deepening tool" />
          <PausePoint note="Publish one of the three before you start Module 7. The Commit module loses its bite if there's nothing to commit to yet." />
        </div>
      </section>

      {/* ─── Module 7 — Commitment ───────────────────────────────── */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ModuleHeader
            number={7}
            title="Lock the Commitment"
            accent="emerald"
            lead="Three calendar entries plus the SMS you send to one human asking them to check in on you at day 14."
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
        </div>
      </section>

      {/* ─── Continue the practice ───────────────────────────────── */}
      <section className="pb-24 border-t border-white/[0.04] pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              Keep going
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              The workshop ends. The practice begins tomorrow.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <StackLink
              label="daily"
              title="The Prompt Library — 98 patterns, red-teamed"
              body="Drop into one each morning. Eval-gated, voice-checked, MIT-licensed."
              href="/prompt-library"
            />
            <StackLink
              label="weekly"
              title="Other live workshops"
              body="AI in 2026 for graduates, Sovereign Leadership, the bespoke ones."
              href="/workshops"
            />
            <StackLink
              label="monthly"
              title="The Library — books, annotated"
              body="Kamiya, Mogi, García & Miralles, Buettner. The lineage of the word."
              href="/library"
            />
            <StackLink
              label="research"
              title="Blue Zones, Ikigai, and the AI Era"
              body="The flagship research grounding this workshop. Sourced. FAQ'd."
              href="/research/blue-zones-ikigai-ai-era"
            />
          </div>

          <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/[0.04]">
            <Link
              href="/workshops/ikigai-branding"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] px-1 py-0.5"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Live 90-minute version
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
    </div>
  )
}
