'use client'

/**
 * Ikigai Workshop — V4 (Composed Canonical)
 *
 * The synthesis of V1 (structure) + V2 (clarity) + V3 (depth) + new elements.
 *
 * Inherits from V1:
 *   - WorkshopPath (3 path-orientation cards near hero)
 *   - Coach GPT integration pattern (hero + close)
 *   - present-mode hooks (?present=1 + PresenterOverlay)
 *
 * Inherits from V2:
 *   - IkigaiWisdom kanji panel + sourced masters
 *   - Source Serif 4 editorial accents
 *   - All 13 prompts (M0/M1/M1.5/M2/M3/M4/M5/M6/M7/M8) via shared registry
 *
 * Inherits from V3:
 *   - Black canvas hero with animated kanji 生き甲斐
 *   - 10 chapters with Japanese concept framing (chokkan, tankyū, …)
 *   - Inter-chapter intermezzo spreads (Kamiya, Mogi, García+Miralles)
 *   - Foundations + Where-this-belongs + Continue-the-practice connection layer
 *   - WCAG AA discipline (MotionConfig, useReducedMotion, focus rings,
 *     contrast sweep, single IntersectionObserver, route-scoped font)
 *
 * New in V4:
 *   - Per-chapter MEANING ANCHOR — one italic line bridging Japanese concept
 *     to FrankX practice (the "why this beat" thread)
 *   - Foundations expanded from 3 to 6 (research + library + prompts + workshops
 *     + methodology + OS spine)
 *   - WorkshopPath path-orientation back from V1
 *   - generateMetadata via route-segment layout (OG image, canonical)
 *   - Hero badge: links to V1/V2/V3 for comparison until promotion
 */

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, Presentation } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiWizard } from '@/components/workshops/ikigai/IkigaiWizard'
import { SynthesisPanel } from '@/components/workshops/ikigai/SynthesisPanel'
import { BrandingBridge } from '@/components/workshops/ikigai/BrandingBridge'
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { GenCreatorStack } from '@/components/workshops/ikigai/GenCreatorStack'
import { AICompanions } from '@/components/workshops/ikigai/AICompanions'
import { IkigaiWisdom } from '@/components/workshops/ikigai/IkigaiWisdom'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { AIConnectors } from '@/components/workshops/ikigai/AIConnectors'
import { WorkshopPath } from '@/components/workshops/ikigai/WorkshopPath'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { WORKSHOP_PROMPTS } from '@/lib/workshop-prompts'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'

// ─── Chapter meta + Japanese concept + meaning anchor ────────────────────
interface ChapterMeta {
  numeral: string
  jp: string
  romaji: string
  translation: string
  english: string
  duration: string
  /** One italic line bridging the Japanese concept to FrankX practice. */
  anchor: string
  module?: number
  manualOpens?: 'wizard' | 'synthesis' | 'bridge' | 'plan'
}

const CHAPTERS: ChapterMeta[] = [
  {
    numeral: '00',
    jp: '直観',
    romaji: 'chokkan',
    translation: 'Intuition',
    english: 'Ask your AI for an initial read',
    anchor: 'What your AI already knows about you, before you ask.',
    duration: '3 min',
    module: 0,
  },
  {
    numeral: '01',
    jp: '探求',
    romaji: 'tankyū',
    translation: 'Inquiry',
    english: 'Map your four circles',
    anchor: 'Specificity is craftsmanship. Vagueness is the slop you came to leave.',
    duration: '15 min',
    module: 1,
    manualOpens: 'wizard',
  },
  {
    numeral: '01.5',
    jp: '試金石',
    romaji: 'shikinseki',
    translation: 'Touchstone',
    english: 'Stress-test the loves against reality',
    anchor: 'Doubt is data. Bring proof or bring a friction to design around.',
    duration: '10 min',
    module: 1.5,
  },
  {
    numeral: '02',
    jp: '言葉',
    romaji: 'kotoba',
    translation: 'The Word',
    english: 'Write the sentence',
    anchor: 'Boring + specific beats poetic + abstract. The card is small for a reason.',
    duration: '10 min',
    module: 2,
    manualOpens: 'synthesis',
  },
  {
    numeral: '03',
    jp: '橋',
    romaji: 'hashi',
    translation: 'The Bridge',
    english: 'From purpose to brand',
    anchor: 'From who you are to who you serve. Name one human. The rest follows.',
    duration: '10 min',
    module: 3,
    manualOpens: 'bridge',
  },
  {
    numeral: '04',
    jp: '暦',
    romaji: 'koyomi',
    translation: 'The Almanac',
    english: 'A 30-day rhythm, not a sprint',
    anchor: 'Cadence beats intensity. Mondays decide months.',
    duration: '12 min',
    module: 4,
    manualOpens: 'plan',
  },
  {
    numeral: '05',
    jp: '道具',
    romaji: 'dōgu',
    translation: 'The Instrument',
    english: 'Pick the AI you live in',
    anchor: 'Master one. The other four can wait. Toolbelt envy is a tax.',
    duration: '8 min',
    module: 5,
  },
  {
    numeral: '06',
    jp: '出航',
    romaji: 'shukkō',
    translation: 'Setting Sail',
    english: 'Ship the live artifact',
    anchor: 'Ship before you feel ready. The artifact is the proof.',
    duration: '10 min',
    module: 6,
  },
  {
    numeral: '07',
    jp: '約束',
    romaji: 'yakusoku',
    translation: 'The Promise',
    english: 'Lock the 30-day commitment',
    anchor: 'Public commitment increases follow-through 3×. Send the SMS now.',
    duration: '5 min',
    module: 7,
  },
  {
    numeral: '08',
    jp: '風景',
    romaji: 'fūkei',
    translation: 'The Vision',
    english: 'Three visuals you walk out with',
    anchor: 'Three prompts. One photo. Six surfaces. The brand becomes seeable.',
    duration: '15 min',
    module: 8,
  },
]

// ─── Inter-chapter intermezzo spreads ────────────────────────────────────
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

// ─── Foundations — 6 cards across the FrankX stack ───────────────────────
interface Foundation {
  kanji: string
  label: string
  title: string
  href: string
  body: string
}

const FOUNDATIONS: Foundation[] = [
  {
    kanji: '長',
    label: 'flagship research',
    title: 'Blue Zones, Ikigai, and the AI Era',
    href: '/research/blue-zones-ikigai-ai-era',
    body: 'Where ikigai came from (Kamiya 1966 → Buettner 2005 → García & Miralles 2016) and why AI makes it load-bearing. The substrate of this workshop.',
  },
  {
    kanji: '識',
    label: 'adjacent research',
    title: 'Conscious AI Operating Systems',
    href: '/research/conscious-ai-operating-systems',
    body: 'The architectural answer. Sovereign AI as the instrument of meaning, never the replacement for it.',
  },
  {
    kanji: '法',
    label: 'method',
    title: 'Research methodology',
    href: '/research/methodology',
    body: 'How the research surfaces are sourced, validated, and updated. The discipline behind every claim.',
  },
  {
    kanji: '本',
    label: 'library',
    title: 'The Library OS',
    href: '/library',
    body: 'Annotated books. Kamiya, Mogi, García & Miralles, Burnett & Evans — every Ikigai lens, sourced.',
  },
  {
    kanji: '型',
    label: 'patterns',
    title: '98 prompts, red-teamed',
    href: '/prompts',
    body: 'The pattern library this workshop’s 13 prompts draw from. Eval-gated, voice-checked, MIT.',
  },
  {
    kanji: '塾',
    label: 'workshops',
    title: 'Other live workshops',
    href: '/workshops',
    body: 'AI in 2026 for graduates, Sovereign Leadership, the bespoke ones. The cohort beside this one.',
  },
  {
    kanji: '網',
    label: 'os spine',
    title: 'FrankX OS — the meta map',
    href: '/os',
    body: 'Watch / Workshop / Library / Prompt Hub / Research / ACO — nine modules, one operating system.',
  },
]

// ─── Where this belongs — the FrankX OS context ─────────────────────────
interface OSContext {
  module: string
  href: string
  role: string
}

const OS_CONTEXT: OSContext[] = [
  { module: 'Workshop OS', href: '/os/workshops', role: 'this workshop ships here' },
  { module: 'Library OS', href: '/library', role: 'the books behind the masters' },
  { module: 'Prompt Hub', href: '/prompts', role: 'the patterns you keep using' },
  { module: 'Research Hub', href: '/research', role: 'the thinking under the practice' },
]

// ─── Continue your practice — post-workshop forward path ─────────────────
interface NextStep {
  kanji: string
  label: string
  title: string
  href: string
  body: string
  external?: boolean
}

const NEXT_STEPS: NextStep[] = [
  {
    kanji: '日',
    label: 'daily',
    title: 'Daily — drop into a prompt',
    href: '/prompts',
    body: 'Workshop ends. The practice begins tomorrow. Pick one prompt each morning. Compounding beats intensity.',
  },
  {
    kanji: '週',
    label: 'weekly',
    title: 'Weekly — book a follow-up workshop',
    href: '/workshops',
    body: 'AI in 2026 for graduates, the Founder’s Circle, the bespoke ones. The same hands run the next.',
  },
  {
    kanji: '月',
    label: 'monthly',
    title: 'Monthly — return to the books',
    href: '/library',
    body: 'Kamiya’s Ikigai-ni-Tsuite, Mogi, García & Miralles. Three lenses. One chapter a month.',
  },
  {
    kanji: '年',
    label: 'yearly',
    title: 'Yearly — submit your year-one artifact',
    href: 'mailto:frank@frankx.ai?subject=Ikigai+year-one+artifact',
    body: 'Twelve months from today, send Frank what you shipped. Best three become guest features.',
    external: true,
  },
]

// ─── NextStepBody — shared body for the Continue cards ───────────────────
function NextStepBody({ step }: { step: NextStep }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <span
          className="text-5xl text-white/85 leading-none [font-family:var(--font-jp-serif)] group-hover:text-white transition-colors"
          style={{ fontWeight: 200 }}
          aria-hidden="true"
        >
          {step.kanji}
        </span>
        <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-2" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
        {step.label}
      </p>
      <h3 className="text-base font-semibold text-white mb-2 leading-snug">
        {step.title}
      </h3>
      <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
        {step.body}
      </p>
    </>
  )
}

// ─── Animated kanji — h1 LCP element ─────────────────────────────────────
function AnimatedKanji() {
  return (
    <h1
      aria-label="生き甲斐 — ikigai — a reason to wake up"
      className="select-none flex items-baseline justify-center gap-2 [font-family:var(--font-jp-serif)] font-light text-white/95 m-0"
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        生
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] leading-none tracking-[-0.04em] text-zinc-400"
        style={{ fontWeight: 200 }}
      >
        き
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        甲
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        斐
      </motion.span>
    </h1>
  )
}

// ─── Vertical chapter rail (xl only) ─────────────────────────────────────
function VerticalKanjiRail({ active }: { active: number | null }) {
  return (
    <nav
      aria-label="Workshop chapters"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30 [font-family:var(--font-jp-serif)] print:hidden"
    >
      {CHAPTERS.map((c, i) => {
        const isActive = active === i
        return (
          <Link
            key={c.numeral}
            href={`#chapter-${c.numeral.replace('.', '-')}`}
            aria-label={`Chapter ${c.numeral} ${c.romaji} — ${c.english}`}
            aria-current={isActive ? 'location' : undefined}
            className={`group flex items-center gap-2 text-xs transition-all duration-500 min-h-[24px] py-1 px-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`text-base leading-none transition-all duration-500 ${
                isActive ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-100'
              }`}
              style={{ fontWeight: isActive ? 400 : 200 }}
            >
              {c.jp.charAt(0)}
            </span>
            <span
              aria-hidden="true"
              className={`text-[10px] uppercase tracking-[0.16em] tabular-nums transition-opacity duration-500 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`}
            >
              {c.numeral}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

// ─── Chapter intro — Japanese numeral ghost + concept + title + meaning ─
function ChapterIntro({ meta }: { meta: ChapterMeta }) {
  const slug = meta.numeral.replace('.', '-')
  return (
    <header
      id={`chapter-${slug}`}
      className="scroll-mt-24 pt-20 pb-10 sm:pt-28 sm:pb-14 border-t border-white/[0.04]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="text-[160px] sm:text-[200px] lg:text-[240px] leading-[0.9] font-light text-white/[0.05] tracking-[-0.04em] -mb-8 sm:-mb-12 select-none [font-family:var(--font-jp-serif)]"
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
            {/* V4 NEW — per-chapter meaning anchor */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-4 max-w-2xl">
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

// ─── Inter-chapter intermezzo spread ─────────────────────────────────────
function Intermezzo({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.04]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

// ─── ChapterBody wrapper ─────────────────────────────────────────────────
function ChapterBody({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16 sm:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

// ─── Presenter sections array (kept in sync with rendered ids) ───────────
const PRESENTER_SECTIONS = [
  'intro',
  'wisdom',
  'start',
  'chapter-00',
  'chapter-01',
  'chapter-01-5',
  'chapter-02',
  'chapter-03',
  'chapter-04',
  'chapter-05',
  'chapter-06',
  'chapter-07',
  'chapter-08',
  'os-context',
  'continue-practice',
]

export default function IkigaiV4Page() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const [presenterActive, setPresenterActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroParallaxY = useTransform(
    scrollYProgress,
    [0, 0.15],
    shouldReduceMotion ? [0, 0] : [0, -120],
  )
  const heroParallaxOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  // Single IntersectionObserver across all chapters
  useEffect(() => {
    if (typeof window === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            const slug = (e.target as HTMLElement).id.replace('chapter-', '').replace('-', '.')
            const idx = CHAPTERS.findIndex((c) => c.numeral === slug)
            if (idx !== -1) setActiveChapter(idx)
          }
        })
      },
      { threshold: 0.3 },
    )
    CHAPTERS.forEach((c) => {
      const slug = c.numeral.replace('.', '-')
      const el = document.getElementById(`chapter-${slug}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <VerticalKanjiRail active={activeChapter} />

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <motion.section
          id="intro"
          style={{ y: heroParallaxY, opacity: heroParallaxOpacity }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20"
        >
          <div
            aria-hidden="true"
            className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#3b3380]/[0.06] blur-[180px] pointer-events-none"
          />
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-zinc-400 z-10">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              All workshops
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 [font-family:var(--font-serif-editorial)] italic">
              V4 &middot; Composed Canonical
            </div>
          </div>

          <div className="relative z-10">
            <AnimatedKanji />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-12 text-center"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-3">
                i&middot;ki&middot;gai
              </p>
              <p className="text-base sm:text-lg max-w-xl mx-auto text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                the small, daily reason a life feels worth waking up to.
              </p>
              <p className="mt-3 text-xs text-zinc-400 max-w-md mx-auto">
                <span className="text-zinc-200">{workshop.duration}</span>
                <span aria-hidden="true" className="mx-2 text-zinc-500">&middot;</span>
                <span>{workshop.audience}</span>
              </p>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [0, 6, 0] }}
            transition={{
              opacity: { duration: 1, delay: 2.6 },
              y: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 2.6 },
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          >
            <Link
              href="#start"
              className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2 py-1"
            >
              <span>Begin</span>
              <span aria-hidden="true" className="block w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
            </Link>
          </motion.div>
        </motion.section>

        {/* ─── Cultural primer ─────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-white/[0.04]" aria-labelledby="cultural-primer">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p id="cultural-primer" className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-6 [font-family:var(--font-serif-editorial)] italic">
                A note before we begin
              </p>
              <p className="text-xl sm:text-2xl text-zinc-200 leading-[1.6] [font-family:var(--font-serif-editorial)] mb-5">
                The four-circle Venn the West loves was drawn in 2014, fusing a Japanese
                word with a career-coaching framework. The original concept is quieter —
                the small, daily reason a life feels worth waking up to.
              </p>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                We use the Venn as scaffolding. The depth comes from the masters who wrote about it.
                We will quote them as we go.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Wisdom panel (kanji + 3 masters) ────────────────────── */}
        <div id="wisdom" className="scroll-mt-24">
          <IkigaiWisdom />
        </div>

        {/* ─── Path orientation (V1 pattern reintroduced) ──────────── */}
        <div id="start" className="scroll-mt-24 border-t border-white/[0.04]">
          <WorkshopPath />
        </div>

        {/* ─── Foundations (6 cards, expanded from V3's 3) ─────────── */}
        <section className="py-20 sm:py-28 border-t border-white/[0.04]" aria-labelledby="foundations">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-12">
                <p id="foundations" className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
                  Foundations
                </p>
                <h2 className="text-2xl sm:text-3xl text-zinc-200 max-w-2xl mx-auto leading-[1.4] [font-family:var(--font-serif-editorial)] italic">
                  A workshop is only as deep as the system it sits inside. Six places to read deeper before, during, or after the walk.
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {FOUNDATIONS.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={f.href}
                      prefetch={false}
                      className="group block rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 hover:bg-white/[0.03] hover:border-white/[0.12] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black h-full"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span
                          className="text-4xl text-white/80 leading-none [font-family:var(--font-jp-serif)] group-hover:text-white transition-colors"
                          style={{ fontWeight: 200 }}
                          aria-hidden="true"
                        >
                          {f.kanji}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-2">
                        {f.label}
                      </p>
                      <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                        {f.title}
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
                        {f.body}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Chapter 00 · 直観 · Initial Read ────────────────────── */}
        <ChapterIntro meta={CHAPTERS[0]} />
        <ChapterBody>
          <PromptStack module={0} prompts={WORKSHOP_PROMPTS} label="Begin with intuition" />
        </ChapterBody>

        {/* ─── 01 · 探求 · The Map ─────────────────────────────────── */}
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

        {/* ─── 01.5 · 試金石 · Touchstone ──────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[2]} />
        <ChapterBody>
          <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Bring the proof" />
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[0]} />

        {/* ─── 02 · 言葉 · The Word ────────────────────────────────── */}
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

        {/* ─── 03 · 橋 · The Bridge ────────────────────────────────── */}
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

        {/* ─── 04 · 暦 · The Almanac ──────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[5]} />
        <ChapterBody>
          <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="Generate the rhythm" />
          <div className="mt-8">
            <AIConnectors />
          </div>
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

        {/* ─── 05 · 道具 · The Instrument ──────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[6]} />
        <ChapterBody>
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Pick the AI you live in" />
          <div className="mt-8">
            <AICompanions />
          </div>
          <div className="mt-8">
            <GenCreatorStack />
          </div>
        </ChapterBody>

        {/* ─── 06 · 出航 · Setting Sail ────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[7]} />
        <ChapterBody>
          <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact today" />
        </ChapterBody>

        {/* ─── 07 · 約束 · The Promise ────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[8]} />
        <ChapterBody>
          <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Lock the commitment" />

          <div className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-7 sm:p-10 text-center">
            <Mail className="w-7 h-7 text-zinc-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl text-white mb-2 [font-family:var(--font-serif-editorial)] italic">
              Receive the Resource Pack
            </h3>
            <p className="text-sm text-zinc-300 mb-6 max-w-md mx-auto leading-relaxed">
              Templates for the positioning sentence, audience-of-one, 30-day plan, and the GenCreator Stack checklist.
              Plus a Day-7 check-in from Frank.
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

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6 flex items-start gap-3">
            <Presentation className="w-5 h-5 text-zinc-300 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Prefer a chat?</p>
              <p className="text-sm text-zinc-300 mb-3 leading-relaxed">
                The free Ikigai &amp; Branding Coach GPT can walk you through everything on this page via chat.
              </p>
              <a
                href="/go/ikigai-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-200 hover:text-violet-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                Open the Coach GPT
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[2]} />

        {/* ─── 08 · 風景 · The Vision ──────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[9]} />
        <ChapterBody>
          <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 text-sm text-zinc-300 leading-relaxed [font-family:var(--font-serif-editorial)]">
            <p className="text-white mb-2 not-italic font-medium">How these prompts work</p>
            <p>
              Each prompt asks your AI to write a <span className="text-zinc-100 not-italic">prompt string</span> you
              paste into an image-gen tool. Three handoffs: your AI writes the prompt — you paste it into NB2 / GPT-Image-2 / Sora — you generate 4 variants, keep the one you would actually use.
            </p>
          </div>
        </ChapterBody>

        {/* ─── Where this belongs ──────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-white/[0.04]" aria-labelledby="os-context">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-10">
                <p id="os-context" className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
                  Where this belongs
                </p>
                <h2 className="text-xl sm:text-2xl text-zinc-200 leading-[1.5] [font-family:var(--font-serif-editorial)] italic max-w-xl mx-auto">
                  The workshop is one node in a larger operating system. The same hands ship every surface.
                </h2>
              </div>
              <ul className="space-y-3 max-w-xl mx-auto">
                {OS_CONTEXT.map((c) => (
                  <li key={c.module}>
                    <Link
                      href={c.href}
                      prefetch={false}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.03] px-5 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <span className="flex items-center gap-3 flex-wrap">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-amber-300 transition-colors" />
                        <span className="text-sm font-semibold text-white">{c.module}</span>
                        <span aria-hidden="true" className="text-zinc-500">&middot;</span>
                        <span className="text-sm text-zinc-300 [font-family:var(--font-serif-editorial)] italic">
                          {c.role}
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ─── Continue the practice ───────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-white/[0.04]" aria-labelledby="continue-practice">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center mb-12">
                <p id="continue-practice" className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
                  Continue the practice
                </p>
                <h2 className="text-2xl sm:text-3xl text-zinc-100 max-w-2xl mx-auto leading-[1.4] [font-family:var(--font-serif-editorial)] italic">
                  Ikigai is not a workshop. It is a way of opening tomorrow morning.
                </h2>
                <p className="text-sm text-zinc-400 mt-4 max-w-xl mx-auto leading-relaxed">
                  Four cadences. Four kanji. Pick the one you can actually hold.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {NEXT_STEPS.map((s, i) => {
                  const sharedCls =
                    'group block rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 hover:bg-white/[0.03] hover:border-white/[0.12] transition-colors h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                  return (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {s.external ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className={sharedCls}>
                          <NextStepBody step={s} />
                        </a>
                      ) : (
                        <Link href={s.href} prefetch={false} className={sharedCls}>
                          <NextStepBody step={s} />
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
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
              The walk is not the end. The walk is the small daily thing — the reason
              you wake up tomorrow and write the post you committed to.
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
                href="/workshops/ikigai/v2"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V2 editorial clean
              </Link>
              <Link
                href="/workshops/ikigai/v3"
                prefetch={false}
                className="hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 py-0.5"
              >
                V3 editorial cinema
              </Link>
            </div>
          </div>
        </footer>

        {/* Presenter HUD overlay — activates via state toggle or ?present=1 */}
        <PresenterOverlay sectionIds={PRESENTER_SECTIONS} active={presenterActive} />
      </div>
    </MotionConfig>
  )
}
