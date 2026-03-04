'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Music2, Sparkles, ChevronRight, Radio } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'

// ============================================================================
// DATA — real Suno track IDs from the FrankX catalog
// ============================================================================

const featuredTracks = [
  {
    sunoId: '9cbad174-9276-427f-9aed-1ba00c7db3db',
    title: 'Vibe O S',
    genre: 'Female Hip Hop',
  },
  {
    sunoId: '3faa6621-9edb-441f-9ba9-279be2716bba',
    title: 'Art Of Soulful Living',
    genre: 'Rock / EDM',
  },
]

const featuredEssays = [
  {
    title: 'The Golden Age of Intelligence Manifesto',
    summary: 'What the Golden Age looks like for creators, families, and enterprises—and why the Chronicles exist.',
    href: '/blog/golden-age-of-intelligence',
    category: 'Manifesto',
  },
  {
    title: 'Agentic SEO Publishing Masterplan',
    summary: 'A 12-day surge that coordinates essays, satellite posts, and automation so stories flood every channel.',
    href: '/blog/agentic-seo-publishing-masterplan',
    category: 'Strategy',
  },
  {
    title: 'Suno Prompt Engineering: The Complete Guide',
    summary: 'The 5-layer prompt architecture that turns AI text into professional, genre-specific music.',
    href: '/blog/suno-prompt-engineering-complete-guide',
    category: 'Tutorial',
  },
]

const streams = [
  {
    phase: 'Signal',
    headline: 'Weekly Intelligence Drops',
    description: 'One focused transmission: the latest story, framework, and soundtrack I\'m shipping that week.',
    action: 'Subscribe below',
    href: '#signup',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    dot: 'bg-emerald-400',
  },
  {
    phase: 'Depth',
    headline: 'Inner Circle Access',
    description: 'Members receive vault access, live ritual labs, and direct collaboration with the FrankX agent collective.',
    action: 'Explore Inner Circle',
    href: '/inner-circle',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    dot: 'bg-cyan-400',
  },
  {
    phase: 'Build',
    headline: 'Products & Systems',
    description: 'From ACOS to Vibe OS—tools that compound your output every week you use them.',
    action: 'Browse Products',
    href: '/products',
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    dot: 'bg-violet-400',
  },
]

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CreationChroniclesPage() {
  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">

        {/* ── Hero ── */}
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Creation Chronicles</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.08]">
                Stay in the Signal Loop
              </h1>

              <p className="text-lg md:text-xl text-white/50 mb-4 max-w-2xl mx-auto leading-relaxed">
                One focused transmission a week. No noise—just the latest story,
                framework, and soundtrack I&apos;m shipping.
              </p>
              <p className="text-sm text-white/30 mb-10">
                Stories, sound, and systems — from the intelligence frontier.
              </p>

              {/* Sign up */}
              <div id="signup" className="max-w-md mx-auto mb-6">
                <EmailSignup
                  listType="creation-chronicles"
                  placeholder="your@email.com"
                  buttonText="Join the Signal"
                  compact={true}
                />
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                Read the blog first
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/30 mb-3">
                What&apos;s in each transmission
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Signal → Depth → Build
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {streams.map((s, i) => (
                <motion.div
                  key={s.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={s.href}
                    className={`group block relative p-6 rounded-2xl border ${s.border} ${s.bg} hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${s.color}`}>
                        {s.phase}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{s.headline}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{s.description}</p>
                    <span className={`flex items-center gap-1 text-sm font-medium ${s.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                      {s.action}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest from the studio ── */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Essays */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/[0.08]">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">From the Archive</h3>
                </div>

                <div className="space-y-3">
                  {featuredEssays.map((essay, i) => (
                    <motion.div
                      key={essay.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        href={essay.href}
                        className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all"
                      >
                        <span className="flex-shrink-0 mt-0.5 text-xs font-semibold uppercase tracking-wider text-emerald-400/60 w-14">
                          {essay.category}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1 leading-snug">
                            {essay.title}
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                            {essay.summary}
                          </p>
                        </div>
                        <ArrowRight className="flex-shrink-0 w-4 h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all mt-0.5" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View all articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Music embeds */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/[0.08]">
                    <Music2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Soundtrack of the Build</h3>
                </div>

                <div className="space-y-4">
                  {featuredTracks.map((track, i) => (
                    <motion.div
                      key={track.sunoId}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
                    >
                      <div className="px-4 pt-4 pb-1 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-white">{track.title}</p>
                          <p className="text-xs text-white/40">{track.genre}</p>
                        </div>
                        <a
                          href={`https://suno.com/song/${track.sunoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Open in Suno ↗
                        </a>
                      </div>
                      <iframe
                        src={`https://suno.com/embed/${track.sunoId}`}
                        className="w-full h-[200px]"
                        style={{ border: 'none' }}
                        allow="autoplay; clipboard-write"
                        loading="lazy"
                        title={track.title}
                      />
                    </motion.div>
                  ))}
                </div>

                <a
                  href="https://suno.com/@frankx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Full Suno archive @frankx
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Quote ── */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl md:text-3xl text-white/60 leading-relaxed italic font-serif">
                &ldquo;Each day we make some. We make something prettier.&rdquo;
              </p>
              <cite className="block mt-4 text-sm text-white/30 not-italic">— My father&apos;s philosophy</cite>
            </motion.blockquote>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section id="signup" className="py-20 border-t border-white/5">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 text-center"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">Weekly Transmission</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stay in the Signal Loop
                </h2>
                <p className="text-white/50 mb-8 max-w-sm mx-auto">
                  One focused transmission a week. No noise—just the latest story,
                  framework, and soundtrack I&apos;m shipping.
                </p>

                <div className="max-w-sm mx-auto">
                  <EmailSignup
                    listType="creation-chronicles"
                    placeholder="your@email.com"
                    buttonText="Join the Signal"
                    compact
                  />
                </div>

                <p className="mt-4 text-xs text-white/20">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  )
}
