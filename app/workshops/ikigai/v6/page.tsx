'use client'

/**
 * Ikigai Workshop — V6 (Composed Synthesis)
 *
 * Frank's V5 critique: missing the V4-style header block, Venn should sit
 * under the hero image not replace it, cultural-primer note feels like a
 * detour. V6 fixes all three.
 *
 * Composition:
 *   - V4-style hero block (back link, version chip, badges row, h1 with
 *     gradient accent, italic-serif subtitle, body line, dual CTA, facilitator
 *     micro-controls) — clear orientation for the audience the moment they land
 *   - NB2 sumi-e brushstroke image (V4's variant-1) — visual anchor
 *   - IkigaiVenn diagram underneath — structural anchor
 *   - NO cultural-primer "note before we begin" section (dropped)
 *   - Straight into Wisdom panel + 10 chapters + Continue-practice
 *   - V5's superintelligent prompts via lib/workshop-prompts-v5.ts
 *
 * frontend-design discipline: distinctive H1 in Playfair italic (magazine
 * masthead feel), restrained single-accent violet, staggered hero reveal,
 * full-bleed brushstroke inside max-w-4xl frame, Venn in max-w-2xl reading
 * width, generous vertical rhythm.
 *
 * ui-ux-pro-max audience clarity: badges (Beginner · time · modules · audience)
 * surface upfront, both CTAs above the fold, mobile-first single-column flow,
 * focus rings on every interactive, prefers-reduced-motion respected.
 */

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Layers,
  Users,
  Mail,
  Presentation,
} from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiWizard } from '@/components/workshops/ikigai/IkigaiWizard'
import { SynthesisPanel } from '@/components/workshops/ikigai/SynthesisPanel'
import { BrandingBridge } from '@/components/workshops/ikigai/BrandingBridge'
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { IkigaiWisdom } from '@/components/workshops/ikigai/IkigaiWisdom'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { WORKSHOP_PROMPTS_V5 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v5'

// Hero brushstroke variant — 1-4. Files at /public/images/workshops/ikigai-branding/v4-hero-variant-{1..4}.jpg
const HERO_VARIANT: 1 | 2 | 3 | 4 = 1
// Venn diagram NB2 variant — 1-4. Files at /public/images/workshops/ikigai-branding/v6-venn-variant-{1..4}.jpg
const VENN_VARIANT: 1 | 2 | 3 | 4 = 1
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'

interface ChapterMeta {
  numeral: string
  jp: string
  romaji: string
  translation: string
  english: string
  duration: string
  anchor: string
  module: number
}

const CHAPTERS: ChapterMeta[] = [
  { numeral: '00', jp: '直観', romaji: 'chokkan', translation: 'Intuition',  english: 'Begin with what your AI already knows about you', duration: '3 min',  anchor: 'The walk starts from a hypothesis, not a blank page.', module: 0 },
  { numeral: '01', jp: '探求', romaji: 'tankyū',  translation: 'Inquiry',    english: 'Walk the four circles',                            duration: '15 min', anchor: 'Specificity is craftsmanship. Vagueness is the slop you came to leave.', module: 1 },
  { numeral: '02', jp: '試金石', romaji: 'shikinseki', translation: 'Touchstone', english: 'Stress-test the loves against reality',  duration: '10 min', anchor: 'Doubt is data. Bring proof or bring a friction.', module: 1.5 },
  { numeral: '03', jp: '言葉', romaji: 'kotoba',  translation: 'The Word',   english: 'Write the sentence',                              duration: '10 min', anchor: 'Boring + specific beats poetic + abstract.', module: 2 },
  { numeral: '04', jp: '橋',   romaji: 'hashi',   translation: 'The Bridge', english: 'From purpose to brand',                            duration: '10 min', anchor: 'Name one human. The rest follows.', module: 3 },
  { numeral: '05', jp: '暦',   romaji: 'koyomi',  translation: 'The Almanac', english: 'A 30-day rhythm, not a sprint',                  duration: '12 min', anchor: 'Cadence beats intensity. Mondays decide months.', module: 4 },
  { numeral: '06', jp: '道具', romaji: 'dōgu',   translation: 'The Instrument', english: 'Pick the AI you live in',                    duration: '8 min',  anchor: 'Master one. Toolbelt envy is a tax.', module: 5 },
  { numeral: '07', jp: '出航', romaji: 'shukkō',  translation: 'Setting Sail', english: 'Ship the live artifact',                       duration: '10 min', anchor: 'Ship before you feel ready. The artifact is the proof.', module: 6 },
  { numeral: '08', jp: '約束', romaji: 'yakusoku', translation: 'The Promise', english: 'Lock the 30-day commitment',                   duration: '5 min',  anchor: 'Public commitment increases follow-through 3×.', module: 7 },
  { numeral: '09', jp: '風景', romaji: 'fūkei',   translation: 'The Vision', english: 'Three visuals you walk out with',                duration: '15 min', anchor: 'Three prompts. One photo. Six surfaces.', module: 8 },
]

const INTERMEZZOS = [
  {
    quote:
      'Ikigai is the most universal feeling of meaning we have — the quiet sense that one’s life is worth living.',
    attribution: 'Mieko Kamiya, Ikigai-ni-Tsuite, 1966',
  },
  {
    quote:
      'Ikigai is something for which you wake up every morning. It is not the same as success — small things are enough.',
    attribution: 'Ken Mogi, The Little Book of Ikigai, 2017',
  },
  {
    quote:
      'Our intuition and curiosity are very powerful internal compasses to help us connect with our ikigai.',
    attribution: 'García & Miralles, Ikigai, 2016',
  },
]

function ChapterIntro({ meta }: { meta: ChapterMeta }) {
  return (
    <header
      id={`chapter-${meta.numeral}`}
      className="scroll-mt-24 pt-20 pb-10 sm:pt-28 sm:pb-14 border-t border-white/[0.04]"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="text-[140px] sm:text-[180px] lg:text-[220px] leading-[0.9] font-light text-white/[0.04] tracking-[-0.04em] -mb-8 sm:-mb-12 select-none [font-family:var(--font-jp-serif)]"
            aria-hidden="true"
            style={{ fontWeight: 200 }}
          >
            {meta.numeral}
          </div>
          <div className="relative">
            <div className="flex items-end gap-4 mb-3 flex-wrap">
              <span
                className="text-5xl sm:text-6xl text-white tracking-[-0.04em] leading-none [font-family:var(--font-jp-serif)]"
                style={{ fontWeight: 400 }}
              >
                {meta.jp}
              </span>
              <span className="text-xs uppercase tracking-[0.32em] text-zinc-400 pb-2">
                {meta.romaji} &middot; {meta.translation}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-3 [font-family:var(--font-serif-editorial)] italic">
              {meta.english}.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-4">
              {meta.anchor}
            </p>
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-400 [font-family:var(--font-serif-editorial)] italic">
              chapter {meta.numeral} &middot; {meta.duration}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

function Intermezzo({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.04]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote>
            <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-200 leading-[1.45] [font-family:var(--font-serif-editorial)] italic tracking-tight">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 text-xs uppercase tracking-[0.24em] text-zinc-400">
            — {attribution}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

function ChapterBody({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

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
  const sharedCls =
    'group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] p-5 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
  const inner = (
    <>
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">{label}</p>
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
          {body}
        </p>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-1"
      />
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={sharedCls}>
      {inner}
    </a>
  ) : (
    <Link href={href} prefetch={false} className={sharedCls}>
      {inner}
    </Link>
  )
}

const PRESENTER_SECTIONS = [
  'intro',
  'venn',
  'wisdom',
  'chapter-00',
  'chapter-01',
  'chapter-02',
  'chapter-03',
  'chapter-04',
  'chapter-05',
  'chapter-06',
  'chapter-07',
  'chapter-08',
  'chapter-09',
  'continue',
]

export default function IkigaiV6Page() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [presenterActive, setPresenterActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* ─── HERO — V4 structure: badges + title + image + Venn ───── */}
        <motion.section
          id="intro"
          style={{ opacity: heroOpacity }}
          className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 overflow-hidden"
        >
          {/* Ambient glow — single restrained accent */}
          <div
            aria-hidden="true"
            className="absolute top-20 left-1/3 w-[60vw] h-[60vw] rounded-full bg-[#3b3380]/[0.06] blur-[180px] pointer-events-none"
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Top bar — back link + version chip */}
            <div className="flex items-center justify-between mb-10 text-xs text-zinc-400">
              <Link
                href="/workshops"
                className="inline-flex items-center gap-1.5 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                All workshops
              </Link>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 [font-family:var(--font-serif-editorial)] italic">
                V6 &middot; Composed Synthesis
              </div>
            </div>

            {/* V4-style header block */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto text-center sm:text-left"
            >
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-5">
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-500/25">
                  Beginner-friendly
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {workshop.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  10 chapters
                </span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  Creators &middot; operators &middot; the AI-curious
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 tracking-tight leading-[1.05] [font-family:var(--font-serif)] italic"
              >
                Ikigai &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-amber-300 not-italic font-semibold">
                  Branding Workshop
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-zinc-300 mb-3 leading-relaxed [font-family:var(--font-serif-editorial)] italic max-w-2xl"
              >
                A walk through ikigai with your AI as peer collaborator — not a tutorial bot.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mb-8"
              >
                Ten chapters. Thirteen prompts. Four cadences for after. Map your purpose,
                write your sentence, ship a 30-day plan, walk out with three brand-launch visuals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6"
              >
                <Link
                  href="#chapter-00"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Start the workshop
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="/go/ikigai-coach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Prefer a chat? Open Coach GPT
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="pt-5 border-t border-white/[0.04] flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-zinc-500"
              >
                <span>Facilitating?</span>
                <Link
                  href="/workshops/ikigai-branding/present"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-violet-200 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1"
                >
                  <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
                  Open presenter mode
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero image — V4 NB2 brushstroke */}
            <motion.figure
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-14 sm:mt-20 max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_80px_-20px_rgba(59,51,128,0.4)]">
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
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </motion.figure>

            {/* Venn diagram — NB2-rendered structural anchor, under the hero image */}
            <motion.figure
              id="venn"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 sm:mt-28 max-w-xl mx-auto scroll-mt-24"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-8 text-center [font-family:var(--font-serif-editorial)] italic">
                the four circles, the kanji, the center
              </p>
              <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_-20px_rgba(59,51,128,0.3)]">
                <Image
                  src={`/images/workshops/ikigai-branding/v6-venn-variant-${VENN_VARIANT}.jpg`}
                  alt="A four-circle Ikigai Venn diagram on dark glass — what you love, what you are good at, what the world needs, what pays — with the kanji 生き甲斐 at the center where all four overlap."
                  width={2048}
                  height={2048}
                  sizes="(max-width: 768px) 90vw, 512px"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="text-center text-xs text-zinc-500 mt-6 [font-family:var(--font-serif-editorial)] italic max-w-md mx-auto leading-relaxed">
                Use the Venn as scaffolding. The depth comes from the masters below — and from{' '}
                <Link
                  href="/research/blue-zones-ikigai-ai-era"
                  className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4 not-italic"
                >
                  the longevity research
                </Link>{' '}
                that found ikigai at the center of every Blue Zone.
              </figcaption>
            </motion.figure>
          </div>
        </motion.section>

        {/* ─── Wisdom panel — straight to the masters, no detour ──── */}
        <div id="wisdom" className="scroll-mt-24">
          <IkigaiWisdom />
        </div>

        {/* ─── Chapter 00 · 直観 ──────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[0]} />
        <ChapterBody>
          <PromptStack module={0} prompts={WORKSHOP_PROMPTS} label="Begin with intuition" />
        </ChapterBody>

        {/* ─── 01 · 探求 ──────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[1]} />
        <ChapterBody>
          <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="Walk the four circles" />
          <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <summary className="cursor-pointer text-sm text-zinc-300 hover:text-zinc-100 transition-colors [font-family:var(--font-serif-editorial)] italic">
              Or work through the wizard manually
            </summary>
            <div className="mt-5">
              <IkigaiWizard value={ikigai} onChange={setIkigai} />
            </div>
          </details>
        </ChapterBody>

        {/* ─── 02 · 試金石 ────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[2]} />
        <ChapterBody>
          <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Bring the proof" />
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[0]} />

        {/* ─── 03 · 言葉 ──────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[3]} />
        <ChapterBody>
          <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="Write the sentence" />
          <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <summary className="cursor-pointer text-sm text-zinc-300 hover:text-zinc-100 transition-colors [font-family:var(--font-serif-editorial)] italic">
              Or draft manually
            </summary>
            <div className="mt-5">
              <SynthesisPanel
                value={ikigai}
                onStatementChange={(statement) =>
                  setIkigai((prev) => ({ ...prev, statement }))
                }
              />
            </div>
          </details>
        </ChapterBody>

        {/* ─── 04 · 橋 ────────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[4]} />
        <ChapterBody>
          <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="Build the bridge" />
          <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <summary className="cursor-pointer text-sm text-zinc-300 hover:text-zinc-100 transition-colors [font-family:var(--font-serif-editorial)] italic">
              Or work the bridge manually
            </summary>
            <div className="mt-5">
              <BrandingBridge value={ikigai} />
            </div>
          </details>
        </ChapterBody>

        {/* ─── 05 · 暦 ────────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[5]} />
        <ChapterBody>
          <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="Generate the rhythm" />
          <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
            <summary className="cursor-pointer text-sm text-zinc-300 hover:text-zinc-100 transition-colors [font-family:var(--font-serif-editorial)] italic">
              Or use the plan builder
            </summary>
            <div className="mt-5">
              <ContentOperatingPlan value={ikigai} />
            </div>
          </details>
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[1]} />

        {/* ─── 06 · 道具 — tool list extracted to /stack ──────────── */}
        <ChapterIntro meta={CHAPTERS[6]} />
        <ChapterBody>
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Pick the AI you live in" />
          <div className="mt-8">
            <StackLink
              label="full catalog"
              title="The GenCreator Stack lives at frankx.ai/stack"
              body="The five jobs every creator runs (Capture · Think · Make · Ship · Measure), the AI companions Frank actually uses, the swap-in alternatives. One canonical surface so this workshop stays focused on the practice."
              href="/stack"
            />
          </div>
        </ChapterBody>

        {/* ─── 07 · 出航 ──────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[7]} />
        <ChapterBody>
          <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact today" />
        </ChapterBody>

        {/* ─── 08 · 約束 ──────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[8]} />
        <ChapterBody>
          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Lock the commitment" />

          <div className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-7 sm:p-10 text-center">
            <Mail className="w-7 h-7 text-zinc-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl text-white mb-2 [font-family:var(--font-serif-editorial)] italic">
              Receive the Resource Pack
            </h3>
            <p className="text-sm text-zinc-300 mb-6 max-w-md mx-auto leading-relaxed">
              Templates, the 30-day plan, the GenCreator stack checklist, plus a Day-7 check-in
              from Frank.
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
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[2]} />

        {/* ─── 09 · 風景 ──────────────────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[9]} />
        <ChapterBody>
          <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
          <p className="mt-8 text-sm text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
            Each prompt asks your AI to write the image-gen prompt directly as part of its
            response — paste once into Nano Banana 2 or GPT-Image-2, generate four, keep the one
            you would actually use as a wallpaper or share.
          </p>
        </ChapterBody>

        {/* ─── Continue the practice ───────────────────────────────── */}
        <section
          id="continue"
          className="py-20 sm:py-28 border-t border-white/[0.04]"
          aria-labelledby="continue-practice"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-10">
                <p
                  id="continue-practice"
                  className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic"
                >
                  Continue the practice
                </p>
                <h2 className="text-2xl sm:text-3xl text-zinc-100 leading-[1.4] [font-family:var(--font-serif-editorial)] italic mb-3">
                  Ikigai is not a workshop. It is a way of opening tomorrow morning.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The workshop ends. The practice begins tomorrow.
                </p>
              </div>

              <div className="space-y-4">
                <StackLink
                  label="daily"
                  title="The Prompt Library — 98 patterns, red-teamed"
                  body="Drop into one each morning. The patterns Frank actually uses, eval-gated and voice-checked, MIT-licensed so you can fork them for your own daily practice."
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
                  body="The flagship research grounding this workshop. Twelve minutes. Sourced. FAQ’d."
                  href="/research/blue-zones-ikigai-ai-era"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Closing colophon ──────────────────────────────────── */}
        <footer className="py-24 border-t border-white/[0.04]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="text-7xl text-white/30 mb-6 select-none [font-family:var(--font-jp-serif)]"
              style={{ fontWeight: 200 }}
              aria-hidden="true"
            >
              生
            </div>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-3">
              The walk is not the end. The walk is the small daily thing — the reason you wake
              up tomorrow and write the post you committed to.
            </p>
            <p className="text-xs text-zinc-400 mb-8">
              Designed and shipped by Frank Riemer &middot;{' '}
              <Link
                href="/"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                frankx.ai
              </Link>
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 pt-8 border-t border-white/[0.04]">
              <Link
                href="/workshops/ikigai-branding"
                className="inline-flex items-center gap-1.5 hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                V1 canonical
              </Link>
              <Link
                href="/workshops/ikigai/v5"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V5 magazine
              </Link>
              <Link
                href="/workshops/ikigai/v4"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V4 with hero
              </Link>
              <Link
                href="/workshops/ikigai/v3"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V3 cinema
              </Link>
              <Link
                href="/workshops/ikigai/v2"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V2 clean
              </Link>
            </div>
          </div>
        </footer>

        <PresenterOverlay sectionIds={PRESENTER_SECTIONS} active={presenterActive} />
      </div>
    </MotionConfig>
  )
}
