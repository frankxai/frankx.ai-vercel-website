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
 *   - WorkshopPath, WorkshopProgressRail, EmailSignup
 *
 * V1 (the former V4-composed-canonical) is the single archive at
 * /workshops/ikigai/v1 — unlinked from canonical, kept for reference.
 * This is the page audiences land on.
 */

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
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import { PromptCard } from '@/components/workshops/ikigai/PromptCard'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { WorkshopProgressRail } from '@/components/workshops/ikigai/WorkshopProgressRail'
import { WORKSHOP_PROMPTS_V8 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v8'
import { getWorkshopBySlug } from '@/data/workshops'

const HERO_VARIANT: 1 | 2 | 3 | 4 = 1

// V8 Coach prompt (id 'coach', module 0) — the spine of the workshop.
const COACH_PROMPT = WORKSHOP_PROMPTS.find((p) => p.id === 'coach')!

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

export default function IkigaiBrandingWorkshopPage() {
  const workshop = getWorkshopBySlug('ikigai-branding')!

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
                  href="#start"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  Or pick a path
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

      {/* ─── 90-min outcomes + AI-as-mirror framing ──────────────── */}
      <section id="what-you-leave-with" className="pb-12 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-300 mb-2">
              90 minutes &middot; what you walk out with
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Five tangible artefacts you can paste, post, or schedule
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Every module produces something you can ship before you stand up. The
              Coach holds the conversation; each module sharpens one of the artefacts
              you walk out with.
            </p>
          </div>

          <ol className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-12 list-none">
            {[
              {
                n: '01',
                t: 'Your one-sentence ikigai statement',
                b: 'Two versions — the one you ship today, and the one you grow into by next year.',
              },
              {
                n: '02',
                t: 'A brand positioning that holds 12 months',
                b: 'One reader with a first name, three pillars that survive a year of weekly publishing.',
              },
              {
                n: '03',
                t: 'A 30-day rhythm you can actually hold',
                b: 'Four Monday topics, one mid-week ritual, one end-of-month artifact. Built for someone with a job.',
              },
              {
                n: '04',
                t: 'Three named humans living from your direction',
                b: 'Real first names with revenue mechanisms, sourced or marked unverified. The doubt step becomes a research step.',
              },
              {
                n: '05',
                t: 'One artefact you publish today',
                b: 'A LinkedIn post + a 60-second script + an image-gen prompt, all from one Coach response.',
              },
            ].map((o) => (
              <li
                key={o.n}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-violet-300 tabular-nums">
                    {o.n}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                    {o.t}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed pl-[2.6rem] sm:pl-[3rem]">
                  {o.b}
                </p>
              </li>
            ))}
          </ol>

          {/* AI-as-mirror framing — how we use AI in this workshop */}
          <div className="pt-10 mt-2 border-t border-white/[0.06]">
            <div className="text-center mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-300 mb-2">
                How we use AI here
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                Mirror, explorer, researcher
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Your AI is the most patient thinking partner you&apos;ve ever had &mdash;
                but it&apos;s not authority. You still own the judgment. The point of
                this workshop is to teach it who you are, across all future sessions,
                so it gets sharper at reflecting you back.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
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
                  body: 'Three real names with sourced links. Anything it can&rsquo;t verify is marked &ldquo;unverified&rdquo; — no fabrication.',
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
                  <p
                    className="text-sm text-zinc-400 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: c.body }}
                  />
                </div>
              ))}
            </div>

            <p className="text-center text-[13px] text-zinc-500 italic max-w-2xl mx-auto leading-relaxed [font-family:var(--font-serif-editorial)]">
              Not ground truth. Context engineering, not authority. We train it across
              sessions &mdash; every new conversation starts a little less from zero.
            </p>
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
            <Image
              src="/images/workshops/ikigai-branding/ikigai-venn.jpg"
              alt="The four-circle Ikigai Venn diagram — what you love, what you are good at, what the world needs, what pays — with the kanji 生き甲斐 at the center."
              width={1400}
              height={1400}
              sizes="(max-width: 768px) 90vw, 448px"
              className="w-full h-auto rounded-3xl border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(59,51,128,0.3)]"
            />
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

          {/* Primary path — open the custom GPT (free, in ChatGPT) */}
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

          {/* Divider — secondary path for paste-into-your-own-AI */}
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
            lead="Three ikigai directions on the table — safe, stretch, wild — drawn from what your AI already knows about you."
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
            lead="Three real humans already earning a living from your direction. Named with sourced links, or marked unverified. The doubt step becomes a research step."
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
          <p className="text-center text-xs text-zinc-500 mt-4 max-w-md mx-auto leading-relaxed">
            From the one-sentence purpose to a brand that holds twelve months of weekly
            publishing. Module 4 walks the bridge.
          </p>
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
            lead="Positioning, one reader with a first name, three pillars that survive twelve months of weekly publishing. Built from what you actually said earlier in the conversation."
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
              <h3 className="text-xl font-semibold text-white mb-2">Stay in the loop</h3>
              <p className="text-sm text-zinc-400 mb-5 max-w-md mx-auto">
                Join the workshop list. The Coach is yours forever; this gets you the next
                workshop date and a Day-7 nudge from Frank to check on what you shipped.
              </p>
              <div className="max-w-sm mx-auto">
                <EmailSignup
                  listType="ikigai-branding"
                  placeholder="Your email"
                  buttonText="Join"
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
            {[
              {
                kanji: '究',
                label: 'research',
                title: 'Blue Zones, Ikigai, and the AI Era',
                body: 'The flagship research grounding this workshop. Twelve minutes. Sourced and FAQ’d.',
                href: '/research/blue-zones-ikigai-ai-era',
              },
              {
                kanji: '型',
                label: 'patterns',
                title: 'The Prompt Library',
                body: 'Drop into one each morning. Red-teamed, MIT-licensed — fork what works for your own daily practice.',
                href: '/prompt-library',
              },
              {
                kanji: '本',
                label: 'library',
                title: 'The Library — books, annotated',
                body: 'Kamiya, Mogi, García &amp; Miralles, Buettner. Read one chapter a month. The lineage of the word.',
                href: '/library',
              },
              {
                kanji: '塾',
                label: 'workshops',
                title: 'Other live workshops',
                body: 'AI in 2026 for graduates, Sovereign Leadership, the bespoke ones. The same hands run the next.',
                href: '/workshops',
              },
            ].map((f) => (
              <Link
                key={f.title}
                href={f.href}
                prefetch={false}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 hover:bg-white/[0.03] hover:border-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] h-full"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className="text-4xl text-white/80 leading-none [font-family:var(--font-jp-serif)] group-hover:text-white transition-colors"
                    style={{ fontWeight: 200 }}
                    aria-hidden="true"
                  >
                    {f.kanji}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-1"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                  {f.label}
                </p>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {f.title}
                </h3>
                <p
                  className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic"
                  dangerouslySetInnerHTML={{ __html: f.body }}
                />
              </Link>
            ))}
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

    </div>
  )
}
