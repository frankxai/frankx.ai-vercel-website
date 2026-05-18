'use client'

/**
 * Ikigai Workshop — V3 (Editorial Cinema)
 *
 * The premium concept: black canvas, animated SVG kanji hero, Noto Serif JP
 * typography, each chapter framed with a Japanese concept name + numeral + serif
 * title. Generous Ma (negative space). Sumi-e accents, no glow-blobs, no
 * gradient text. Editorial magazine pacing meets cinematic scroll.
 *
 * The thesis: the workshop is a Japanese practice borrowed by the West.
 * V3 honors the source while keeping the FrankX premium discipline.
 *
 * Canonical lives at /workshops/ikigai-branding. This URL is an opinionated
 * alternative for Frank to evaluate against V2.
 */

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import { IkigaiWizard } from '@/components/workshops/ikigai/IkigaiWizard'
import { SynthesisPanel } from '@/components/workshops/ikigai/SynthesisPanel'
import { BrandingBridge } from '@/components/workshops/ikigai/BrandingBridge'
import { ContentOperatingPlan } from '@/components/workshops/ikigai/ContentOperatingPlan'
import { GenCreatorStack } from '@/components/workshops/ikigai/GenCreatorStack'
import { AICompanions } from '@/components/workshops/ikigai/AICompanions'
import { PromptStack } from '@/components/workshops/ikigai/PromptStack'
import { AIConnectors } from '@/components/workshops/ikigai/AIConnectors'
import { WORKSHOP_PROMPTS } from '@/lib/workshop-prompts'
import { emptyIkigai, type IkigaiState } from '@/components/workshops/ikigai/types'
import { getWorkshopBySlug } from '@/data/workshops'

// ─── Module → Japanese concept mapping ────────────────────────────────────
interface ChapterMeta {
  numeral: string
  jp: string
  romaji: string
  translation: string
  english: string
  duration: string
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
    duration: '3 min',
    module: 0,
  },
  {
    numeral: '01',
    jp: '探求',
    romaji: 'tankyū',
    translation: 'Inquiry',
    english: 'Map your four circles',
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
    duration: '10 min',
    module: 1.5,
  },
  {
    numeral: '02',
    jp: '言葉',
    romaji: 'kotoba',
    translation: 'The Word',
    english: 'Write the sentence',
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
    duration: '8 min',
    module: 5,
  },
  {
    numeral: '06',
    jp: '出航',
    romaji: 'shukkō',
    translation: 'Setting Sail',
    english: 'Ship the live artifact',
    duration: '10 min',
    module: 6,
  },
  {
    numeral: '07',
    jp: '約束',
    romaji: 'yakusoku',
    translation: 'The Promise',
    english: 'Lock the 30-day commitment',
    duration: '5 min',
    module: 7,
  },
  {
    numeral: '08',
    jp: '風景',
    romaji: 'fūkei',
    translation: 'The Vision',
    english: 'Three visuals you walk out with',
    duration: '15 min',
    module: 8,
  },
]

// ─── Japanese-master pull quotes for inter-chapter spreads ────────────────
const INTERMEZZOS = [
  {
    quote: 'Ikigai is the most universal feeling of meaning we have — the quiet sense that one’s life is worth living.',
    attribution: 'Mieko Kamiya, Ikigai-ni-Tsuite, 1966',
    afterChapter: '01.5',
  },
  {
    quote: 'Ikigai is something for which you wake up every morning. It is not the same as success — small things are enough.',
    attribution: 'Ken Mogi, The Little Book of Ikigai, 2017',
    afterChapter: '04',
  },
  {
    quote: 'Our intuition and curiosity are very powerful internal compasses to help us connect with our ikigai.',
    attribution: 'García & Miralles, Ikigai, 2016',
    afterChapter: '07',
  },
]

// ─── Animated SVG kanji — strokes draw on mount ───────────────────────────
function AnimatedKanji() {
  return (
    <div
      aria-label="生き甲斐 — ikigai — a reason to wake up"
      className="select-none flex items-baseline justify-center gap-2 [font-family:var(--font-jp-serif)] font-light text-white/95"
    >
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        生
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] leading-none tracking-[-0.04em] text-zinc-400"
        style={{ fontWeight: 200 }}
      >
        き
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        甲
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-[18vw] sm:text-[14vw] md:text-[12rem] lg:text-[15rem] leading-none tracking-[-0.04em]"
        style={{ fontWeight: 200 }}
      >
        斐
      </motion.span>
    </div>
  )
}

// ─── Vertical chapter rail — small kanji glyphs in left margin ────────────
function VerticalKanjiRail({ active }: { active: number | null }) {
  return (
    <nav
      aria-label="Chapter rail"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30 [font-family:var(--font-jp-serif)] print:hidden"
    >
      {CHAPTERS.map((c, i) => {
        const isActive = active === i
        return (
          <Link
            key={c.numeral}
            href={`#chapter-${c.numeral.replace('.', '-')}`}
            className={`group flex items-center gap-2 text-xs transition-all duration-500 ${
              isActive ? 'text-white' : 'text-zinc-700 hover:text-zinc-400'
            }`}
            title={`${c.numeral} · ${c.romaji} · ${c.english}`}
          >
            <span
              className={`text-base leading-none transition-all duration-500 ${
                isActive ? 'opacity-100 scale-110' : 'opacity-50 group-hover:opacity-90'
              }`}
              style={{ fontWeight: isActive ? 400 : 200 }}
            >
              {c.jp.charAt(0)}
            </span>
            <span
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

// ─── Chapter framer — full-bleed intro frame for each module ──────────────
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
          {/* Massive chapter numeral, ghost */}
          <div
            className="text-[160px] sm:text-[200px] lg:text-[240px] leading-[0.9] font-light text-white/[0.05] tracking-[-0.04em] -mb-8 sm:-mb-12 select-none [font-family:var(--font-jp-serif)]"
            aria-hidden
            style={{ fontWeight: 200 }}
          >
            {meta.numeral}
          </div>
          <div className="relative">
            {/* Japanese kanji concept name */}
            <div className="flex items-end gap-4 mb-3">
              <span
                className="text-5xl sm:text-6xl text-white tracking-[-0.04em] leading-none [font-family:var(--font-jp-serif)]"
                style={{ fontWeight: 400 }}
              >
                {meta.jp}
              </span>
              <span className="text-xs uppercase tracking-[0.32em] text-zinc-500 pb-2">
                {meta.romaji} &middot; {meta.translation}
              </span>
            </div>
            {/* English title in editorial serif */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-3 [font-family:var(--font-serif-editorial)] italic">
              {meta.english}.
            </h2>
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-600 [font-family:var(--font-serif-editorial)] italic">
              chapter {meta.numeral} &middot; {meta.duration}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

// ─── Intermezzo spread — single quote, generous whitespace ────────────────
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
            <p
              className="text-xl sm:text-2xl lg:text-3xl text-zinc-200 leading-[1.45] [font-family:var(--font-serif-editorial)] italic tracking-tight"
            >
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8 text-xs uppercase tracking-[0.24em] text-zinc-500">
            — {attribution}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

// ─── Body wrapper — controls content width + rhythm per chapter ──────────
function ChapterBody({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16 sm:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

export default function IkigaiV3Page() {
  const workshop = getWorkshopBySlug('ikigai-branding')!
  const [ikigai, setIkigai] = useState<IkigaiState>(emptyIkigai)
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.15], [0, -120])
  const heroParallaxOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const observers: IntersectionObserver[] = []
    CHAPTERS.forEach((c, i) => {
      const slug = c.numeral.replace('.', '-')
      const el = document.getElementById(`chapter-${slug}`)
      if (!el) return
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.2) setActiveChapter(i)
          })
        },
        { threshold: [0.2, 0.5, 0.8] },
      )
      o.observe(el)
      observers.push(o)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <VerticalKanjiRail active={activeChapter} />

      {/* ─── Hero: black canvas, animated kanji ──────────────────────── */}
      <motion.section
        style={{ y: heroParallaxY, opacity: heroParallaxOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20"
      >
        {/* Single sumi ink-wash accent — restrained, off-center */}
        <div
          aria-hidden
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-[#3b3380]/[0.06] blur-[180px] pointer-events-none"
        />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-zinc-500 z-10">
          <Link
            href="/workshops/ikigai-branding"
            className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors [font-family:var(--font-serif-editorial)] italic"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to canonical
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 [font-family:var(--font-serif-editorial)] italic">
            V3 &middot; Editorial Cinema
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
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500 mb-3">
              i&middot;ki&middot;gai
            </p>
            <p className="text-base sm:text-lg max-w-xl mx-auto text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
              the small, daily reason a life feels worth waking up to.
            </p>
            <p className="mt-3 text-xs text-zinc-600 max-w-md mx-auto">
              <span className="text-zinc-300">{workshop.duration}</span>
              <span className="mx-2 text-zinc-700">&middot;</span>
              <span>{workshop.audience}</span>
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 1, delay: 2.6 },
            y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 2.6 },
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <Link
            href={`#chapter-${CHAPTERS[0].numeral.replace('.', '-')}`}
            className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-zinc-500 hover:text-zinc-300 transition-colors [font-family:var(--font-serif-editorial)] italic"
          >
            <span>Begin</span>
            <span className="block w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
          </Link>
        </motion.div>
      </motion.section>

      {/* ─── Cultural primer — honest about the Western Venn ─────────── */}
      <section className="py-20 sm:py-28 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-zinc-500 mb-6 [font-family:var(--font-serif-editorial)] italic">
              A note before we begin
            </p>
            <p className="text-xl sm:text-2xl text-zinc-300 leading-[1.6] [font-family:var(--font-serif-editorial)] mb-5">
              The four-circle Venn the West loves was drawn in 2014, fusing a Japanese
              word with a career-coaching framework. The original concept is quieter
              — the small, daily reason a life feels worth waking up to.
            </p>
            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed [font-family:var(--font-serif-editorial)] italic">
              We use the Venn as scaffolding. The depth comes from the masters who wrote about it.
              We will quote them as we go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 00 · 直観 · Initial Read ────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[0]} />
      <ChapterBody>
        <PromptStack module={0} prompts={WORKSHOP_PROMPTS} label="Begin with intuition" />
      </ChapterBody>

      {/* ─── 01 · 探求 · The Map ─────────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[1]} />
      <ChapterBody>
        <PromptStack module={1} prompts={WORKSHOP_PROMPTS} label="Walk the four circles" />
        <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
          <summary className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic">
            Or work through the wizard manually
          </summary>
          <div className="mt-5">
            <IkigaiWizard value={ikigai} onChange={setIkigai} />
          </div>
        </details>
      </ChapterBody>

      {/* ─── 01.5 · 試金石 · Touchstone ──────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[2]} />
      <ChapterBody>
        <PromptStack module={1.5} prompts={WORKSHOP_PROMPTS} label="Bring the proof" />
      </ChapterBody>

      <Intermezzo {...INTERMEZZOS[0]} />

      {/* ─── 02 · 言葉 · The Word ────────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[3]} />
      <ChapterBody>
        <PromptStack module={2} prompts={WORKSHOP_PROMPTS} label="Write the sentence" />
        <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
          <summary className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic">
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

      {/* ─── 03 · 橋 · The Bridge ────────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[4]} />
      <ChapterBody>
        <PromptStack module={3} prompts={WORKSHOP_PROMPTS} label="Build the bridge" />
        <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
          <summary className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic">
            Or work the bridge manually
          </summary>
          <div className="mt-5">
            <BrandingBridge value={ikigai} />
          </div>
        </details>
      </ChapterBody>

      {/* ─── 04 · 暦 · The Almanac ──────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[5]} />
      <ChapterBody>
        <PromptStack module={4} prompts={WORKSHOP_PROMPTS} label="Generate the rhythm" />
        <div className="mt-8">
          <AIConnectors />
        </div>
        <details className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5">
          <summary className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200 transition-colors [font-family:var(--font-serif-editorial)] italic">
            Or use the plan builder
          </summary>
          <div className="mt-5">
            <ContentOperatingPlan value={ikigai} />
          </div>
        </details>
      </ChapterBody>

      <Intermezzo {...INTERMEZZOS[1]} />

      {/* ─── 05 · 道具 · The Instrument ──────────────────────────────── */}
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

      {/* ─── 06 · 出航 · Setting Sail ────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[7]} />
      <ChapterBody>
        <PromptStack module={6} prompts={WORKSHOP_PROMPTS} label="Ship one artifact today" />
      </ChapterBody>

      {/* ─── 07 · 約束 · The Promise ────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[8]} />
      <ChapterBody>
        <PromptStack module={7} prompts={WORKSHOP_PROMPTS} label="Lock the commitment" />

        <div className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-7 sm:p-10 text-center">
          <Mail className="w-7 h-7 text-zinc-400 mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl text-white mb-2 [font-family:var(--font-serif-editorial)] italic">
            Receive the Resource Pack
          </h3>
          <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
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
      </ChapterBody>

      <Intermezzo {...INTERMEZZOS[2]} />

      {/* ─── 08 · 風景 · The Vision ──────────────────────────────────── */}
      <ChapterIntro meta={CHAPTERS[9]} />
      <ChapterBody>
        <PromptStack module={8} prompts={WORKSHOP_PROMPTS} label="Generate your visual kit" />
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 text-sm text-zinc-400 leading-relaxed [font-family:var(--font-serif-editorial)]">
          <p className="text-white mb-2 not-italic font-medium">How these prompts work</p>
          <p>
            Each prompt asks your AI to write a <span className="text-zinc-200 not-italic">prompt string</span> you
            paste into an image-gen tool. Three handoffs: your AI writes the prompt — you paste it into NB2 / GPT-Image-2 / Sora — you generate 4 variants, keep the one you would actually use.
          </p>
        </div>
      </ChapterBody>

      {/* ─── Closing colophon ──────────────────────────────────────── */}
      <footer className="py-24 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="text-7xl text-white/20 mb-6 select-none [font-family:var(--font-jp-serif)]"
            style={{ fontWeight: 200 }}
            aria-hidden
          >
            生
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed [font-family:var(--font-serif-editorial)] italic mb-8">
            The walk is not the end. The walk is the daily small thing — the reason
            you wake up tomorrow and write the post you committed to.
          </p>
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <Link
              href="/workshops/ikigai-branding"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Canonical V1
            </Link>
            <Link
              href="/workshops/ikigai/v2"
              className="inline-flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
            >
              Compare V2
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
