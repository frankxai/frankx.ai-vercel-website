'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ParticleField } from '@/components/valentines/ParticleField'
import { ScrollReveal } from '@/components/valentines/ScrollReveal'

// ─── Scroll Progress ────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div className="fire-scroll-progress" style={{ width: `${progress}%` }} />
}

function Divider() {
  return <div className="fire-divider my-4" />
}

// ─── Quarterly Roadmap ──────────────────────────────────────────────

const quarters = [
  {
    quarter: 'Q1',
    title: 'Foundation',
    months: 'Jan — Mar',
    theme: 'Ship the core. Build the foundation everything else stands on.',
    goals: [
      'Launch frankx.ai with full ecosystem — products, blog, shop, vault',
      'Publish first 5 books (Golden Age, Soulbook, Love & Poetry, Spartan Mindset, Self-Development)',
      'Ship AI Architect Academy MVP — labs, commands, cross-platform installer',
      'Establish template monetization with affiliate deploy buttons',
      'ACOS v10 — autonomous intelligence layer for all Claude Code workflows',
    ],
  },
  {
    quarter: 'Q2',
    title: 'Momentum',
    months: 'Apr — Jun',
    theme: 'Revenue from content. Audience from value. Flywheel accelerating.',
    goals: [
      'First $1,000 month from digital products (templates, courses, tools)',
      'AI Architect Newsletter — weekly, 500+ subscribers',
      'Investor Intelligence vertical — premium AI agent products',
      'Music catalog expansion — 100 new tracks across genres',
      'Inner Circle launch — premium community for AI builders',
    ],
  },
  {
    quarter: 'Q3',
    title: 'Amplification',
    months: 'Jul — Sep',
    theme: 'Scale what works. Kill what doesn\u2019t. Let revenue speak.',
    goals: [
      'First $5,000 month from combined streams',
      'Course launch — "Build Your First AI Agent" (premium, $297+)',
      'Speaking / workshop opportunities from content authority',
      'Arcanea creative universe — games, art, interactive experiences',
      'Coaching program pilot — 1:1 AI architecture mentoring',
    ],
  },
  {
    quarter: 'Q4',
    title: 'Harvest',
    months: 'Oct — Dec',
    theme: 'Compound returns. Plant seeds for 2027. Gratitude.',
    goals: [
      'Sustainable $10,000/month from multiple revenue streams',
      'Full book series published (10+ titles)',
      'AI Architect Academy recognized as industry resource',
      'Clear runway for 2027 — financial, creative, relational',
      'Annual review, lessons documented, next Fire Horse 60 years away',
    ],
  },
]

// ─── The Four Brands ────────────────────────────────────────────────

const brands = [
  {
    name: 'FrankX.ai',
    tagline: 'Build what matters.',
    description:
      'The hub. Personal brand, blog, products, books, music, community. Everything flows through here. The face of the entire operation.',
    color: 'text-amber-300/60',
    border: 'border-amber-500/10',
  },
  {
    name: 'ACOS',
    tagline: 'Autonomous intelligence.',
    description:
      'Agentic Creator Operating System. 22 skills, 8 specialist agents, self-improving with safety guarantees. The engine under every workflow I run.',
    color: 'text-violet-300/60',
    border: 'border-violet-500/10',
  },
  {
    name: 'Arcanea',
    tagline: 'Where mythology meets code.',
    description:
      '10 Gates progression, creative universe, generative art, interactive fiction. The soul of the creative side — mythology-infused development.',
    color: 'text-teal-300/60',
    border: 'border-teal-500/10',
  },
  {
    name: 'AI Architect Academy',
    tagline: 'Learn by building.',
    description:
      'Labs, commands, skills, courses. Teaching AI architecture through hands-on building, not lectures. Cross-platform: Claude Code, Cursor, Windsurf, Cline.',
    color: 'text-cyan-300/60',
    border: 'border-cyan-500/10',
  },
]

// ─── Daily Non-Negotiables ──────────────────────────────────────────

const dailyPractices = [
  { practice: 'Ship something', note: 'A commit, a page, a song, a paragraph. Every day.' },
  { practice: 'Write 500+ words', note: 'Blog, book, documentation, newsletter. Words compound.' },
  { practice: 'One creative act', note: 'Music production, generative art, code that isn\u2019t work.' },
  { practice: 'Move your body', note: 'Gym, walk, stretch. The mind follows the body.' },
  { practice: 'Review the vision', note: 'Re-read these goals. Not as obligation — as orientation.' },
]

// ─── Nine Personal Principles ───────────────────────────────────────

const personalPrinciples = [
  {
    number: '1',
    chinese: '一',
    title: 'Ship Over Perfect',
    body: 'The Fire Horse punishes hesitation. A published page beats a perfect draft. A shipped product beats a polished prototype. Move.',
  },
  {
    number: '2',
    chinese: '二',
    title: 'Build in Public',
    body: 'Show the work. Show the process. Show the failures. People connect with builders, not with brands. Transparency is the moat nobody can copy.',
  },
  {
    number: '3',
    chinese: '三',
    title: 'Revenue is Validation',
    body: 'Likes are vanity. Revenue is proof that you built something people need enough to pay for. Chase the transaction, not the impression.',
  },
  {
    number: '4',
    chinese: '四',
    title: 'Depth Over Width',
    body: 'Don\u2019t be a generalist who knows a little about everything. Be the person who goes so deep into AI architecture, music production, and creative systems that nobody can compete on depth.',
  },
  {
    number: '5',
    chinese: '五',
    title: 'Protect the Craft',
    body: 'Every detail matters. The spacing, the typography, the commit message, the lyric. Excellence isn\u2019t a destination — it\u2019s a daily discipline. Don\u2019t ship what you wouldn\u2019t sign.',
  },
  {
    number: '6',
    chinese: '六',
    title: 'Compound Everything',
    body: 'Every blog post improves SEO. Every product adds to the catalog. Every song expands the library. Every day of consistency makes tomorrow easier. The flywheel only works if you keep pushing.',
  },
  {
    number: '7',
    chinese: '七',
    title: 'Stay Humble, Work Relentless',
    body: 'Let the work speak. Don\u2019t claim — demonstrate. Don\u2019t announce — ship. The best marketing is undeniable output. Humility in presentation, intensity in execution.',
  },
  {
    number: '8',
    chinese: '八',
    title: 'Love the People',
    body: 'Tien. Family. Friends. Community. The work means nothing without the people it\u2019s for. Protect the relationships. Make the dinner. Send the message. Show up.',
  },
  {
    number: '9',
    chinese: '九',
    title: 'Remember Your Father',
    body: 'He built houses with his hands. You build digital ones with your mind. Different materials, same principle: measure carefully, build honestly, create something that shelters people. The craft continues.',
  },
]

// ─── Revenue Streams ────────────────────────────────────────────────

const revenueStreams = [
  { stream: 'Digital Templates & Tools', range: '$27 — $297', note: 'AI agent templates, n8n workflows, prompt libraries' },
  { stream: 'Affiliate Revenue', range: '15% — 30%', note: 'Railway, n8n, Vercel deploy button referrals' },
  { stream: 'Books & Content', range: '$0 — $47', note: 'Free + premium tiers, growing library' },
  { stream: 'AI Architect Academy', range: '$97 — $997', note: 'Labs, courses, premium content' },
  { stream: 'Music Licensing', range: 'Per track', note: '500+ AI-produced songs across genres' },
  { stream: 'Consulting & Coaching', range: '$297 — $997/hr', note: 'AI architecture, Oracle Cloud, agent design' },
  { stream: 'Inner Circle Community', range: '$47/mo', note: 'Premium community for AI builders' },
]

// ─── Component ──────────────────────────────────────────────────────

export default function VisionPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <ScrollProgress />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <ParticleField variant="fire" />

        <div className="absolute w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px] top-1/4" />
        <div className="absolute w-[250px] h-[250px] bg-violet-500/[0.02] rounded-full blur-[80px] bottom-1/4 left-1/4" />

        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Link
              href="/year-of-the-fire-horse"
              className="text-amber-300/30 text-xs tracking-[0.2em] uppercase hover:text-amber-300/50 transition-colors"
            >
              &larr; Year of the Fire Horse
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-amber-300/40 text-sm tracking-[0.3em] uppercase mt-8 mb-6"
          >
            Personal Blueprint
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-8 leading-tight"
          >
            2026 Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-body-serif text-lg md:text-xl text-white/40 italic max-w-xl mx-auto leading-relaxed"
          >
            Goals, principles, and the deeper why behind everything
            I&apos;m building this year.
          </motion.p>
        </div>
      </section>

      {/* ─── The Deeper Why ──────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-16 font-light tracking-wide">
              The Deeper Why
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm animate-flame-breathe">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5">
                <p>
                  My father built houses with his hands.
                </p>
                <p>
                  Concrete, wood, steel, glass. He understood that a home is not
                  a product &mdash; it is a promise. A promise that the walls
                  will hold, the roof will shelter, the foundation will not
                  shift. He measured twice. He built honestly. And when he was
                  done, a family had somewhere to live.
                </p>
                <p>
                  I build digital houses.
                </p>
                <p>
                  Code, content, systems, experiences. Different materials, same
                  principle. The craft is in the care. The value is in the
                  utility. The pride is in the knowing that{' '}
                  <span className="text-amber-300/60">
                    what you made actually works
                  </span>
                  .
                </p>
                <p className="text-white/35">
                  2026 is the year I finish building the house. Not a prototype.
                  Not a demo. The real thing &mdash; a sustainable creative
                  business built on products people actually need, content that
                  actually helps, and craftsmanship that actually shows.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />

      {/* ─── Four Brands ─────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0a] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Four Brands
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              One ecosystem. Four faces.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brands.map((brand, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className={`p-6 md:p-8 rounded-2xl bg-white/[0.02] border ${brand.border} h-full`}
                >
                  <h3 className={`font-display text-xl md:text-2xl font-light mb-1 ${brand.color}`}>
                    {brand.name}
                  </h3>
                  <p className="text-xs text-white/25 tracking-wider uppercase mb-4">
                    {brand.tagline}
                  </p>
                  <p className="font-body-serif text-sm text-white/40 leading-relaxed italic">
                    {brand.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Quarterly Arc ───────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0c0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              The Quarterly Arc
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Foundation &rarr; Momentum &rarr; Amplification &rarr; Harvest.
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {quarters.map((q, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="principle-number text-3xl md:text-4xl font-light">
                      {q.quarter}
                    </span>
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-white/60 font-light">
                        {q.title}
                      </h3>
                      <p className="text-xs text-white/25">{q.months}</p>
                    </div>
                  </div>
                  <p className="font-body-serif text-sm text-white/35 italic mb-4">
                    {q.theme}
                  </p>
                  <ul className="space-y-2">
                    {q.goals.map((goal, j) => (
                      <li key={j} className="flex gap-3 text-sm text-white/40">
                        <span className="text-amber-300/40 flex-shrink-0 mt-0.5">&#9656;</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Revenue Architecture ────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Revenue Architecture
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Seven streams. One engine.
            </p>
          </ScrollReveal>

          <div className="space-y-3">
            {revenueStreams.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-4 md:p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/55 font-medium truncate">
                      {r.stream}
                    </p>
                    <p className="text-xs text-white/25 mt-0.5">{r.note}</p>
                  </div>
                  <span className="text-sm text-amber-300/50 font-mono whitespace-nowrap">
                    {r.range}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Nine Personal Principles ────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0a] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Nine Principles
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              Personal rules for the Fire Horse year.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {personalPrinciples.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <span className="text-xl text-amber-300/40">{p.chinese}</span>
                    <span className="principle-number text-2xl md:text-3xl font-light">
                      {p.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-white/60 font-light mb-3">
                      {p.title}
                    </h3>
                    <p className="font-body-serif text-sm md:text-base text-white/40 leading-relaxed italic">
                      {p.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Daily Non-Negotiables ───────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#080a0d] to-[#0a0a0f]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-4xl text-white/40 text-center mb-4 font-light tracking-wide">
              Daily Non-Negotiables
            </h2>
            <p className="text-center text-white/20 text-sm mb-16 italic">
              The fire stays lit through repetition.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {dailyPractices.map((d, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 p-5 md:p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-amber-300/30 text-lg mt-0.5">&#9670;</span>
                  <div>
                    <p className="text-sm md:text-base text-white/60 font-medium">
                      {d.practice}
                    </p>
                    <p className="text-xs text-white/30 mt-1 italic">
                      {d.note}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Closing Commitment ──────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a08] to-[#0a0a0f]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-20 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm animate-flame-breathe">
              <div className="font-body-serif text-base md:text-lg text-white/55 leading-relaxed italic space-y-5 text-center">
                <p>
                  This is not a wish list.
                </p>
                <p>
                  It is a commitment &mdash; written down, published publicly,
                  and revisited daily. The Fire Horse year does not reward those
                  who dream quietly. It rewards those who{' '}
                  <span className="text-amber-300/60">move</span>.
                </p>
                <p>
                  I will ship more than I plan.
                  I will publish more than I polish.
                  I will build in public, fail in public,
                  and learn in public.
                </p>
                <p>
                  And when December comes &mdash; when the Horse has run its
                  year &mdash; I will look back and know: I did not wait. I did
                  not hesitate. I arrived.
                </p>
                <p className="text-amber-300/50">
                  马到成功.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <section className="relative px-6 py-16 md:py-20">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        <div className="relative z-20 max-w-lg mx-auto text-center">
          <ScrollReveal>
            <Link
              href="/year-of-the-fire-horse"
              className="inline-flex items-center gap-2 text-sm text-amber-300/40 hover:text-amber-300/60 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Year of the Fire Horse
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 pt-8 border-t border-white/[0.04]">
              <p className="text-xs text-white/15 tracking-wide">
                Written February 2026. Revisited daily.
              </p>
              <p className="text-xs text-white/10 mt-1">FrankX.ai</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
