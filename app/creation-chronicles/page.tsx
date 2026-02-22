'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Send, Music2, BookOpen, Sparkles, ChevronRight } from 'lucide-react'

import songs from '@/data/songs.json'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import { EmailSignup } from '@/components/email-signup'

const songRecords = songs as SongRecord[]

// ============================================================================
// DATA
// ============================================================================

const timeline = [
  {
    phase: 'Signal',
    headline: 'Subscribe to Creation Chronicles',
    description: 'Weekly intelligence from the studio—essays, prompts, and music drops that keep you in the Golden Age momentum.',
    action: 'Join the Dispatch',
    href: '#signup',
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    phase: 'Activate',
    headline: 'Join the Inner Circle',
    description: 'Members receive vault access, live ritual labs, and direct collaboration with the FrankX agent collective.',
    action: 'Explore Inner Circle',
    href: '/inner-circle',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    phase: 'Transform',
    headline: 'Build with Systems',
    description: 'From Creative AI Toolkit to Vibe OS—products and partnerships that compound your results.',
    action: 'Browse Products',
    href: '/products',
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-violet-500/5',
  },
]

const featuredEssays = [
  {
    title: 'The Golden Age of Intelligence Manifesto',
    summary: 'What the Golden Age looks like for creators, families, and enterprises—and why the Chronicles exist.',
    href: '/blog/golden-age-of-intelligence',
  },
  {
    title: 'Agentic SEO Publishing Masterplan',
    summary: 'A 12-day surge that coordinates essays, satellite posts, and automation so stories flood every channel.',
    href: '/blog/agentic-seo-publishing-masterplan',
  },
  {
    title: 'Intelligence Atlas Volume I',
    summary: 'The research spine behind the Chronicles—adoption metrics, governance rituals, and the drop roadmap.',
    href: '/intelligence-atlas',
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
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
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
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  Creation Chronicles
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Stories, Sound, and Systems
                <span className="block mt-2 text-white/60">for the Golden Age.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-white/50 mb-10 leading-relaxed">
                The Chronicles document everything I build—longform essays, ritual-ready music,
                and live dispatches from the intelligence frontier.
              </p>

              {/* Email Signup */}
              <div className="max-w-md mx-auto">
                <EmailSignup
                  listType="creation-chronicles"
                  placeholder="Enter your email"
                  buttonText="Join the Dispatch"
                  redirectTo="/thank-you"
                  compact={true}
                  className="mb-4"
                />
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  Read the Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Editorial Quote */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif-italic text-white/70 leading-relaxed">
                "Each day we make some. We make something prettier."
              </p>
              <cite className="block mt-4 text-sm text-white/40 not-italic">— My father's philosophy</cite>
            </motion.blockquote>
          </div>
        </section>

        {/* Timeline Cards */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-2">
                The Journey
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Signal → Activate → Transform
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={entry.href}
                    className="group block relative p-6 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${entry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative">
                      <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${entry.color} mb-4`}>
                        {entry.phase}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {entry.headline}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed mb-4">
                        {entry.description}
                      </p>
                      <span className="flex items-center gap-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                        {entry.action}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Essays & Music */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Featured Essays */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/5">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Featured Essays</h3>
                </div>

                <div className="space-y-4">
                  {featuredEssays.map((essay, i) => (
                    <motion.div
                      key={essay.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={essay.href}
                        className="group block p-5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all"
                      >
                        <h4 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                          {essay.title}
                        </h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                          {essay.summary}
                        </p>
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

              {/* Music Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Music2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Latest Suno Sessions</h3>
                </div>

                <p className="text-sm text-white/50 mb-6">
                  Use these tracks as ritual soundtracks for writing, strategy, or launching new offers.
                </p>

                <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <SongGrid songs={songRecords} limit={3} />
                </div>

                <a
                  href="https://suno.com/@frankx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Explore full Suno archive
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-3 rounded-xl bg-white/5 w-fit mx-auto mb-6">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay in the Signal Loop
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                One focused transmission a week. No noise—just the latest story, framework,
                and soundtrack I'm shipping.
              </p>

              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <iframe
                  src="https://embeds.beehiiv.com/3dca3b4d-918d-48fe-8d02-838d92d93a08?slim=true"
                  title="Creation Chronicles Newsletter"
                  className="w-full h-32 rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
