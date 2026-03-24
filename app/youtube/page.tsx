'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Play,
  Calendar,
  Cpu,
  Music,
  MessageSquare,
  Scissors,
  MonitorPlay,
  PenLine,
  Film,
  Mic,
  Share2,
  ExternalLink,
  Youtube,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import type { GlowColor } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'
import calendarData from '@/data/video-creation-calendar.json'

// ── Animated background ──

function YouTubeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(244,63,94,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ── Data ──

const pillarIcons: Record<string, typeof Cpu> = {
  'ai-architecture': Cpu,
  'music-production': Music,
  'creator-tools': MonitorPlay,
  opinion: MessageSquare,
  shorts: Scissors,
}

const pillarDescriptions: Record<string, string> = {
  'ai-architecture': 'Enterprise AI systems, multi-agent orchestration, MCP servers, RAG patterns. Deep technical tutorials from production experience.',
  'music-production': 'Suno AI prompt engineering, genre mastery, production workflows. From 12,000+ songs to commercial-ready tracks.',
  'creator-tools': 'Claude Code advanced workflows, ACOS commands, content automation pipelines. Tools that 10x your output.',
  opinion: 'Industry analysis, hot takes on AI content, the solo builder thesis. Data-driven perspectives that challenge the mainstream.',
  shorts: 'Rapid-fire clips, production montages, compressed workflows. Algorithm-optimized content for maximum reach.',
}

const pipelineSteps = [
  { num: '01', title: 'Research', description: 'Topic validation, competitor gaps, audience signals', icon: PenLine, command: '/deep-research' },
  { num: '02', title: 'Script', description: 'AI-assisted scripting with Claude Code', icon: Film, command: '/video-produce' },
  { num: '03', title: 'Record', description: 'Screen recording + talking head with CapCut', icon: Mic, command: null },
  { num: '04', title: 'Edit', description: 'Post-production, B-roll, captions', icon: Film, command: null },
  { num: '05', title: 'Distribute', description: 'Clip, atomize, cross-post everywhere', icon: Share2, command: '/video-clip' },
]

export default function YouTubePage() {
  const pillars = calendarData.pillars as Record<string, { label: string; color: string; cadence: string }>
  const weeks = calendarData.weeks

  return (
    <>
      <YouTubeBackground />
      <main className="relative min-h-screen">
        {/* ── Hero ── */}
        <section className="pt-32 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <Youtube className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                YouTube Channel
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              AI Architecture. Music.{' '}
              <span className="bg-gradient-to-r from-red-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Code.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Deep technical tutorials, production music workflows, and honest takes on building
              with AI. From an Oracle AI Architect who ships code, creates music, and builds in public.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://www.youtube.com/@frankxai?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20"
              >
                <Play className="h-5 w-5" />
                Subscribe
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
              <Link
                href="/watch"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                <MonitorPlay className="h-5 w-5" />
                Watch Library
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-white/5 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: '5', label: 'Content Pillars', sublabel: 'Diverse topics' },
                { value: '12+', label: 'Videos Planned', sublabel: 'First month' },
                { value: 'Weekly', label: 'Upload Cadence', sublabel: 'Consistent schedule' },
                { value: 'AI', label: 'Powered Pipeline', sublabel: 'Claude Code workflows' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/40">{stat.sublabel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content Pillars ── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
                Content Pillars
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Five Pillars of Content
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Each pillar serves a different audience need — from deep technical dives to quick opinion pieces.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(pillars).map(([key, pillar], i) => {
                const Icon = pillarIcons[key] || Cpu
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <GlowCard color={pillar.color as GlowColor}>
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{pillar.label}</h3>
                            <span className="text-xs text-white/40">{pillar.cadence}</span>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                          {pillarDescriptions[key]}
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Video Roadmap ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                <Calendar className="mr-1.5 inline h-4 w-4" />
                Roadmap
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                4-Week Content Calendar
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                What&apos;s coming up. Every video planned, scripted, and produced with AI-powered workflows.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {weeks.map((week, wi) => (
                <motion.div
                  key={week.weekOf}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: wi * 0.1 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-white">{week.label}</h3>
                    <span className="text-xs text-white/40">{week.theme}</span>
                  </div>
                  <div className="space-y-3">
                    {week.slots.map((slot) => {
                      const pillar = pillars[slot.pillar as keyof typeof pillars]
                      return (
                        <div
                          key={slot.date + slot.title}
                          className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                        >
                          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                            {(() => {
                              const Icon = pillarIcons[slot.pillar] || Cpu
                              return <Icon className="h-4 w-4 text-white/70" />
                            })()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium leading-snug text-white">{slot.title}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs text-white/40">{pillar?.label}</span>
                              {slot.duration && (
                                <>
                                  <span className="text-white/20">&middot;</span>
                                  <span className="text-xs text-white/40">{slot.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Production Pipeline ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
                Production Pipeline
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                How Every Video Gets Made
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                A 5-step AI-powered pipeline from research to distribution, using Claude Code commands at every stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 overflow-hidden rounded-2xl border border-white/[0.08]"
            >
              <Image
                src="/images/youtube/youtube-pipeline-infographic.png"
                alt="AI-Powered YouTube Production Pipeline — Research, Script, Record, Edit, Clip, Distribute"
                width={1376}
                height={768}
                className="w-full"
                priority={false}
              />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {pipelineSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-center"
                  >
                    <span className="mb-3 block text-3xl font-bold text-white/10">{step.num}</span>
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-1 font-semibold text-white">{step.title}</h4>
                    <p className="text-xs leading-relaxed text-slate-400">{step.description}</p>
                    {step.command && (
                      <code className="mt-2 inline-block rounded bg-white/5 px-2 py-0.5 text-[10px] text-cyan-400/70">
                        {step.command}
                      </code>
                    )}
                    {/* Arrow connector (hidden on last) */}
                    {i < pipelineSteps.length - 1 && (
                      <div className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-white/20 lg:block">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Subscribe CTA ── */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Youtube className="mx-auto mb-6 h-12 w-12 text-red-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Subscribe to the Channel
              </h2>
              <p className="mx-auto mb-3 text-sm text-white/40">
                Oracle AI Architect &middot; 12,000+ AI songs &middot; Building in public
              </p>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                Get weekly tutorials, production deep dives, and behind-the-scenes of building
                an AI-powered creator studio.
              </p>
              <div className="mb-8 flex justify-center">
                <a
                  href="https://www.youtube.com/@frankxai?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20"
                >
                  <Play className="h-5 w-5" />
                  Subscribe on YouTube
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
              <div className="mx-auto max-w-md">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/30">
                  Or get video updates by email
                </p>
                <EmailSignup
                  listType="newsletter"
                  placeholder="your@email.com"
                  buttonText="Notify Me"
                  compact
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white">Explore More</h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Watch Library',
                  description: 'Curated collection of the best AI, tech, and creator videos from across the web.',
                  href: '/watch',
                  color: 'violet' as GlowColor,
                },
                {
                  title: 'YouTube Strategy Guide',
                  description: 'Step-by-step playbook for building an AI-powered YouTube channel.',
                  href: '/youtube-strategy',
                  color: 'cyan' as GlowColor,
                },
                {
                  title: 'Blog',
                  description: 'In-depth articles on AI architecture, creator tools, and building in public.',
                  href: '/blog',
                  color: 'emerald' as GlowColor,
                },
              ].map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlowCard color={link.color} href={link.href}>
                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white">{link.title}</h3>
                      <p className="mb-4 text-sm text-slate-400">{link.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-white/60">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
