'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SoulbookIcon from '@/components/soulbook/SoulbookIcon'
import PillarProgress from '@/components/soulbook/PillarProgress'
import SparkBorder from '@/components/ui/SparkBorder'
import PremiumButton from '@/components/ui/PremiumButton'
import JsonLd from '@/components/seo/JsonLd'

// ─── Data ────────────────────────────────────────────────────────
// The 7 pillars — mapped to REAL Self-Development book chapters
const pillars = [
  {
    number: 1,
    title: 'Energy',
    description: 'Physical vitality, breathwork, nutrition, and movement. The foundation everything else builds on.',
    icon: 'vitality',
    color: 'emerald',
    chapter: 'chapter-01-energy',
    readTime: '12 min',
  },
  {
    number: 2,
    title: 'Mind',
    description: 'Mental clarity, cognitive edge, and psychological resilience. How you think determines how you live.',
    icon: 'awareness',
    color: 'cyan',
    chapter: 'chapter-02-mind',
    readTime: '14 min',
  },
  {
    number: 3,
    title: 'Soul',
    description: 'Deeper purpose, meaning, and inner alignment. The compass that guides every decision.',
    icon: 'soul',
    color: 'violet',
    chapter: 'chapter-03-soul',
    readTime: '11 min',
  },
  {
    number: 4,
    title: 'Craft',
    description: 'Skill mastery, deliberate practice, and meaningful work. What you build with your hands and mind.',
    icon: 'craft',
    color: 'amber',
    chapter: 'chapter-04-craft',
    readTime: '13 min',
  },
  {
    number: 5,
    title: 'Capital',
    description: 'Financial intelligence, multiple income streams, and building wealth that compounds.',
    icon: 'capital',
    color: 'yellow',
    chapter: 'chapter-05-capital',
    readTime: '12 min',
  },
  {
    number: 6,
    title: 'Circle',
    description: 'Relationships, your network of excellence, and the five people you spend the most time with.',
    icon: 'relationships',
    color: 'rose',
    chapter: 'chapter-06-circle',
    readTime: '10 min',
  },
  {
    number: 7,
    title: 'Legacy',
    description: 'Long-term thinking, building something that endures, and designing a life that outlasts you.',
    icon: 'journey',
    color: 'purple',
    chapter: 'chapter-07-legacy',
    readTime: '11 min',
  },
]

// The 6 core books — all free to read
const books = [
  { slug: 'self-development', title: 'The Art of Self-Development', subtitle: 'The complete 7-pillar framework', chapters: 10, color: 'emerald', icon: 'pillars' },
  { slug: 'spartan-mindset', title: 'Spartan Mindset', subtitle: 'Discipline, training, mental toughness', chapters: 10, color: 'red', icon: 'vitality' },
  { slug: 'imagination', title: 'Imagination', subtitle: 'Creative visualization and mental models', chapters: 8, color: 'violet', icon: 'creation' },
  { slug: 'manifestation', title: 'Manifestation', subtitle: 'Psychology of turning thought into reality', chapters: 8, color: 'amber', icon: 'soul' },
  { slug: 'love-and-poetry', title: 'Love & Poetry', subtitle: 'Rumi, Rilke, Neruda, and original verse', chapters: 8, color: 'rose', icon: 'emotions' },
  { slug: 'golden-age', title: 'The Golden Age of Creators', subtitle: 'AI, the creator economy, and building', chapters: 5, color: 'amber', icon: 'journey' },
]

// Color utility — Tailwind classes per color
const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  yellow: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  rose: { border: 'border-rose-500/20', bg: 'bg-rose-500/10', text: 'text-rose-400' },
  purple: { border: 'border-purple-500/20', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  red: { border: 'border-red-500/20', bg: 'bg-red-500/10', text: 'text-red-400' },
}

// ─── Scroll reveal wrapper ──────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Page ───────────────────────────────────────────────────────
export default function SoulbookPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <JsonLd
        type="WebSite"
        data={{
          name: 'Soulbook — 7 Pillars of a Complete Life',
          url: 'https://frankx.ai/soulbook',
          description: 'A practical framework for building every dimension of your life. 11 books, 82 chapters, all free to read.',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(245,158,11,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-32 pb-24">
          {/* Stats badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-10"
          >
            <span className="text-white/40 text-sm">Free Framework</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="text-white/40 text-sm">11 Books</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="text-white/40 text-sm">82 Chapters</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">7 Pillars of</span>
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              a Complete Life
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Energy. Mind. Soul. Craft. Capital. Circle. Legacy.
            <br className="hidden sm:block" />
            A practical framework for building every dimension of your life.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <SparkBorder color="amber" speed="normal">
              <PremiumButton variant="luxury" size="lg" glow href="#pillars">
                Start Reading
              </PremiumButton>
            </SparkBorder>
            <PremiumButton variant="ghost" size="lg" href="/soulbook/assessment">
              Take the Assessment
            </PremiumButton>
          </motion.div>
        </div>

        {/* Fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          YOUR PROGRESS (only shows if user has read at least 1)
      ═══════════════════════════════════════════════════════════ */}
      <section className="px-6">
        <div className="max-w-2xl mx-auto">
          <PillarProgress />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE 7 PILLARS
      ═══════════════════════════════════════════════════════════ */}
      <section id="pillars" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-medium text-amber-400/70 uppercase tracking-widest mb-3">
                The Framework
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                7 Pillars. 7 Chapters. Free.
              </h2>
              <p className="text-white/35 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Each pillar is a full chapter from{' '}
                <Link href="/books/self-development" className="text-white/50 underline underline-offset-2 decoration-white/20 hover:text-white/70 transition-colors">
                  The Art of Self-Development
                </Link>
                . Read in order or start with what matters most right now.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {pillars.map((pillar, i) => {
              const c = colorClasses[pillar.color] || colorClasses.amber
              return (
                <Reveal key={pillar.number} delay={i * 0.04}>
                  <Link
                    href={`/books/self-development/${pillar.chapter}`}
                    className={`group block p-5 rounded-xl border ${c.border} bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-300 h-full`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                        <SoulbookIcon id={pillar.icon} size="sm" className={c.text} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/20 block leading-none mb-0.5">
                          0{pillar.number}
                        </span>
                        <h3 className="font-semibold text-white/85 group-hover:text-white transition-colors text-[15px] leading-tight">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[13px] text-white/30 leading-relaxed mb-3">
                      {pillar.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/15">{pillar.readTime} read</span>
                      <span className={`text-[11px] font-medium ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Read chapter &rarr;
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}

            {/* +3 more card */}
            <Reveal delay={0.3}>
              <Link
                href="/books/self-development"
                className="group flex flex-col items-center justify-center text-center p-5 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 h-full min-h-[140px]"
              >
                <span className="text-2xl font-bold text-white/15 mb-1">+3</span>
                <span className="text-[13px] text-white/25 group-hover:text-white/40 transition-colors leading-snug">
                  Rituals, Environment
                  <br />& Integration
                </span>
                <span className="text-[11px] text-white/15 mt-2 group-hover:text-amber-400/50 transition-colors">
                  Read all 10 chapters &rarr;
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-y border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {[
              {
                step: '01',
                title: 'Read',
                desc: 'Pick a pillar. Each is a full chapter — practical, no filler, immediately useful.',
              },
              {
                step: '02',
                title: 'Assess',
                desc: 'Take the free self-assessment. Find which pillars need the most work right now.',
              },
              {
                step: '03',
                title: 'Apply',
                desc: 'Use the practices from each chapter. Small daily actions that compound over months.',
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div className="text-center md:text-left">
                  <span className="text-[11px] font-mono text-amber-400/40 mb-2 block">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white/85 mb-2">{item.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BOOK LIBRARY
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-medium text-white/25 uppercase tracking-widest mb-3">
                Go Deeper
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                The Complete Library
              </h2>
              <p className="text-white/35 max-w-md mx-auto text-sm leading-relaxed">
                6 books across discipline, imagination, manifestation, poetry, and the creator economy. All free to read.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {books.map((book, i) => {
              const c = colorClasses[book.color] || colorClasses.amber
              return (
                <Reveal key={book.slug} delay={i * 0.04}>
                  <Link
                    href={`/books/${book.slug}`}
                    className={`group block p-5 rounded-xl border ${c.border} bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                        <SoulbookIcon id={book.icon} size="sm" className={c.text} />
                      </div>
                      <h3 className="font-semibold text-white/75 group-hover:text-white transition-colors text-sm leading-tight">
                        {book.title}
                      </h3>
                    </div>
                    <p className="text-[12px] text-white/25 mb-3">{book.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/15">
                        {book.chapters} chapters
                      </span>
                      <span className="text-[11px] text-white/15 group-hover:text-amber-400/50 transition-colors">
                        Read &rarr;
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.25}>
            <div className="text-center mt-8">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors"
              >
                View all 11 books including the Arcanea universe
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ASSESSMENT CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-950/20 via-black to-black p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  Find Your Starting Point
                </span>
              </h2>
              <p className="text-white/35 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                Not sure which pillar to focus on first? Take the free self-assessment.
                It takes 3 minutes and shows you exactly where to begin.
              </p>
              <SparkBorder color="amber" speed="normal">
                <PremiumButton variant="luxury" size="xl" glow href="/soulbook/assessment">
                  Take Free Assessment
                </PremiumButton>
              </SparkBorder>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          GET THE FRAMEWORK
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-3 tracking-tight">
                  Get the Framework Guide
                </h2>
                <p className="text-white/30 text-sm mb-5 leading-relaxed">
                  All 7 pillars on one page — key practices, reflection questions, and how to use them. Print it, save it, put it on your wall.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                  <Link
                    href="/soulbook/framework"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500/15 border border-amber-500/25 text-amber-300 text-sm font-medium hover:bg-amber-500/25 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    View &amp; Save as PDF
                  </Link>
                  <Link
                    href="/newsletter"
                    className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/50 transition-colors"
                  >
                    Or subscribe for weekly exercises
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Mini pillar preview */}
              <div className="w-48 shrink-0 hidden md:block">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 space-y-2">
                  {pillars.slice(0, 4).map((p) => {
                    const c = colorClasses[p.color] || colorClasses.amber
                    return (
                      <div key={p.number} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded ${c.bg} flex items-center justify-center shrink-0`}>
                          <span className="text-[9px] font-mono text-white/30">{p.number}</span>
                        </div>
                        <span className="text-[11px] text-white/30">{p.title}</span>
                      </div>
                    )
                  })}
                  <div className="text-[10px] text-white/15 pl-7">+3 more...</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer className="py-10 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/soulbook"
            className="text-sm font-medium text-white/25 hover:text-white/40 transition-colors"
          >
            Soulbook
          </Link>
          <div className="flex items-center gap-6 text-[13px] text-white/20">
            <Link href="/about" className="hover:text-white/50 transition-colors">About</Link>
            <Link href="/books" className="hover:text-white/50 transition-colors">All Books</Link>
            <Link href="/blog" className="hover:text-white/50 transition-colors">Blog</Link>
            <Link href="/newsletter" className="hover:text-white/50 transition-colors">Newsletter</Link>
          </div>
          <span className="text-xs text-white/10">&copy; 2026 FrankX</span>
        </div>
      </footer>
    </main>
  )
}
