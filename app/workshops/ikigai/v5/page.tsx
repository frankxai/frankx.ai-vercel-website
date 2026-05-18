'use client'

/**
 * Ikigai Workshop — V5 (Editorial Magazine)
 *
 * The fifth iteration. Frank's V4 feedback identified three gaps:
 *   1. V4 hero is missing the actual Venn diagram (brushstroke is ambient, not structural)
 *   2. The prompts are still too restrictive — should treat the AI as a peer collaborator
 *      with massive context, not a tutorial-bot
 *   3. The tool lists clutter the workshop — extract to /stack
 *
 * V5 thesis: less is more. Real Venn as hero, prompts redesigned for
 * superintelligence (via @prompt-conductor swarm), tool inventory linked
 * to /stack rather than embedded, single-column reading flow that works
 * equally well on mobile and desktop.
 *
 * Inherits the WCAG AA + reduced-motion + focus-visible discipline from V3/V4.
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
import { IkigaiVenn } from '@/components/workshops/ikigai/IkigaiVenn'
import { IkigaiWisdom } from '@/components/workshops/ikigai/IkigaiWisdom'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { PresenterOverlay } from '@/components/workshops/ikigai/PresenterOverlay'
import { WORKSHOP_PROMPTS_V5 as WORKSHOP_PROMPTS } from '@/lib/workshop-prompts-v5'
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

// ─── Animated chapter intro ─────────────────────────────────────────────
function ChapterIntro({ meta }: { meta: ChapterMeta }) {
  const slug = meta.numeral
  return (
    <header
      id={`chapter-${slug}`}
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

// ─── Stack link card — replaces inline tool inventories ─────────────────
function StackLink({
  label,
  title,
  body,
  href = '/stack',
}: {
  label: string
  title: string
  body: string
  href?: string
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] p-5 sm:p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
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

export default function IkigaiV5Page() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [presenterActive, setPresenterActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const heroParallaxY = useTransform(
    scrollYProgress,
    [0, 0.15],
    shouldReduceMotion ? [0, 0] : [0, -80],
  )
  const heroParallaxOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('present') === '1') setPresenterActive(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* ─── Hero ────────────────────────────────────────────────── */}
        <motion.section
          id="intro"
          style={{ y: heroParallaxY, opacity: heroParallaxOpacity }}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20"
        >
          <div
            aria-hidden="true"
            className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#3b3380]/[0.05] blur-[180px] pointer-events-none"
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
              V5 &middot; Editorial Magazine
            </div>
          </div>

          <div className="relative z-10 w-full max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-6 text-center [font-family:var(--font-serif-editorial)] italic">
              the workshop
            </p>

            <div id="venn" className="scroll-mt-24">
              <IkigaiVenn />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 sm:mt-16 text-center"
            >
              <h1 className="text-2xl sm:text-3xl text-white leading-[1.3] [font-family:var(--font-serif-editorial)] italic mb-3">
                A walk through ikigai, with your AI as peer.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md mx-auto">
                Ten chapters. Thirteen prompts. Four cadences for after. {workshop.duration} on
                desktop or mobile.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [0, 6, 0] }}
            transition={{
              opacity: { duration: 1, delay: 3.2 },
              y: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 3.2 },
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          >
            <Link
              href="#wisdom"
              className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2 py-1"
            >
              <span>Begin</span>
              <span aria-hidden="true" className="block w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
            </Link>
          </motion.div>
        </motion.section>

        {/* ─── Cultural primer ─────────────────────────────────────── */}
        <section className="py-20 sm:py-28 border-t border-white/[0.04]" aria-labelledby="cultural-primer">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                The four-circle Venn the West loves was drawn in 2014, fusing a Japanese word
                with a career-coaching framework. The original concept is quieter — the small,
                daily reason a life feels worth waking up to.
              </p>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-6">
                We use the Venn as scaffolding. The depth comes from the masters who wrote about
                it, and from{' '}
                <Link
                  href="/research/blue-zones-ikigai-ai-era"
                  className="text-violet-300 hover:text-violet-200 transition-colors underline underline-offset-4 not-italic"
                >
                  the longevity research
                </Link>{' '}
                that found ikigai at the center of every Blue Zone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Wisdom panel ────────────────────────────────────────── */}
        <div id="wisdom" className="scroll-mt-24">
          <IkigaiWisdom />
        </div>

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

        {/* ─── 02 · 試金石 · Touchstone ────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[2]} />
        <ChapterBody>
          <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Bring the proof" />
        </ChapterBody>

        <Intermezzo {...INTERMEZZOS[0]} />

        {/* ─── 03 · 言葉 · The Word ────────────────────────────────── */}
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

        {/* ─── 04 · 橋 · The Bridge ────────────────────────────────── */}
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

        {/* ─── 05 · 暦 · The Almanac ──────────────────────────────── */}
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

        {/* ─── 06 · 道具 · The Instrument — TOOL LIST EXTRACTED ────── */}
        <ChapterIntro meta={CHAPTERS[6]} />
        <ChapterBody>
          <PromptStack module={5} prompts={WORKSHOP_PROMPTS} label="Pick the AI you live in" />
          <div className="mt-8">
            <StackLink
              label="full catalog"
              title="The GenCreator Stack lives at frankx.ai/stack"
              body="The five jobs every creator runs (Capture · Think · Make · Ship · Measure), the AI companions Frank actually uses, the swap-in alternatives. Maintained as one canonical surface so this workshop stays focused on the practice."
              href="/stack"
            />
          </div>
        </ChapterBody>

        {/* ─── 07 · 出航 · Setting Sail ────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[7]} />
        <ChapterBody>
          <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact today" />
        </ChapterBody>

        {/* ─── 08 · 約束 · The Promise ────────────────────────────── */}
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

        {/* ─── 09 · 風景 · The Vision ──────────────────────────────── */}
        <ChapterIntro meta={CHAPTERS[9]} />
        <ChapterBody>
          <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
          <p className="mt-8 text-sm text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
            Each prompt asks your AI to write the image-gen prompt directly as part of its
            response — paste once into Nano Banana 2 or GPT-Image-2, generate four, keep the one
            you would actually use as a wallpaper or share.
          </p>
        </ChapterBody>

        {/* ─── Continue the practice — points to /prompts library ─── */}
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
                <p id="continue-practice" className="text-xs uppercase tracking-[0.32em] text-zinc-400 mb-4 [font-family:var(--font-serif-editorial)] italic">
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

              <div className="mt-12 text-center">
                <Link
                  href="/workshops/ikigai-branding/present"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-zinc-200 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2 py-1"
                >
                  <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
                  Facilitating? Open presenter mode
                </Link>
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
