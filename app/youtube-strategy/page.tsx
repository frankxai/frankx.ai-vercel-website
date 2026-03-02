'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  Calendar,
  PenLine,
  Video,
  Scissors,
  BarChart3,
  Zap,
  Bot,
  Music,
  Workflow,
  Layers,
  Play,
  ExternalLink,
  Youtube,
  Megaphone,
  Heart,
  Target,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import type { GlowColor } from '@/components/ui/glow-card'
import { EmailSignup } from '@/components/email-signup'

// ── Animated background ──

function StrategyBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ── Data ──

const toolBadges = [
  { name: 'Claude Code', color: 'from-orange-500 to-amber-500' },
  { name: 'Opus Clip', color: 'from-violet-500 to-purple-500' },
  { name: 'CapCut', color: 'from-cyan-500 to-blue-500' },
  { name: 'Suno AI', color: 'from-pink-500 to-rose-500' },
  { name: 'Vercel', color: 'from-slate-300 to-slate-400' },
  { name: 'n8n', color: 'from-emerald-500 to-green-500' },
]

const frameworkSteps = [
  {
    num: '01',
    title: 'Define Your Pillars',
    icon: Compass,
    color: 'emerald' as GlowColor,
    description: 'Pick 3-5 content pillars that represent your expertise. Each pillar serves a different audience need and gives you variety without losing focus.',
    tips: [
      'Choose pillars you can sustain for 6+ months',
      'Mix technical depth with accessible opinion pieces',
      'Include at least one short-form pillar for algorithm reach',
    ],
  },
  {
    num: '02',
    title: 'Plan Your Calendar',
    icon: Calendar,
    color: 'cyan' as GlowColor,
    description: 'Map out 4 weeks of content at a time. Assign each slot to a pillar with clear cadence. This prevents decision fatigue and keeps you consistent.',
    tips: [
      'Set realistic cadence — 2-3 videos/week is a strong start',
      'Theme each week to batch similar research',
      'Leave one "flex" slot for trending topics',
    ],
  },
  {
    num: '03',
    title: 'Script with Claude Code',
    icon: PenLine,
    color: 'violet' as GlowColor,
    description: 'Use /video-produce to generate structured scripts. Claude Code understands video pacing — hooks, segments, transitions, CTAs — all formatted for your teleprompter.',
    tips: [
      'Start with a strong hook in the first 8 seconds',
      'Use /deep-research for topic validation first',
      'Include timestamps for B-roll insertion points',
    ],
    command: '/video-produce',
  },
  {
    num: '04',
    title: 'Record & Edit',
    icon: Video,
    color: 'amber' as GlowColor,
    description: 'Screen recording for tutorials, talking head for opinions. CapCut handles captions, transitions, and color grading. Keep it authentic — don\'t over-produce.',
    tips: [
      'Invest in lighting over camera quality',
      'Use CapCut auto-captions — 95% accuracy, minor edits needed',
      'Record in batches: 2-3 videos per session',
    ],
  },
  {
    num: '05',
    title: 'Clip & Atomize',
    icon: Scissors,
    color: 'rose' as GlowColor,
    description: 'One long-form video becomes 5+ assets. Opus Clip extracts viral moments. /video-clip generates formatted shorts. Each video feeds your entire content ecosystem.',
    tips: [
      'Target 15-60 second clips for Shorts/Reels',
      'Use /video-clip to auto-identify peak moments',
      'Cross-post: YouTube Shorts, X, Instagram Reels',
    ],
    command: '/video-clip',
  },
  {
    num: '06',
    title: 'Distribute & Measure',
    icon: BarChart3,
    color: 'blue' as GlowColor,
    description: 'Push to all platforms with /video-to-blog for written repurposing. Track CTR, retention, and click-through. Use data to refine pillars and double down on winners.',
    tips: [
      'Repurpose every video into a blog post',
      'Track average % viewed, not just views',
      'A/B test thumbnails on the first 3 videos',
    ],
    command: '/video-to-blog',
  },
]

const tools = [
  {
    name: 'Claude Code',
    description: 'AI-powered scripting, research, and workflow automation. The backbone of every production step.',
    color: 'amber' as GlowColor,
    icon: Bot,
  },
  {
    name: 'Opus Clip',
    description: 'AI clip extraction from long-form video. Identifies viral moments and generates optimized shorts.',
    color: 'violet' as GlowColor,
    icon: Scissors,
  },
  {
    name: 'CapCut',
    description: 'Video editing with auto-captions, transitions, and effects. Fast enough for daily production.',
    color: 'cyan' as GlowColor,
    icon: Video,
  },
  {
    name: 'Suno AI',
    description: 'AI music generation for intros, outros, and background tracks. Custom music for every video.',
    color: 'rose' as GlowColor,
    icon: Music,
  },
  {
    name: 'n8n',
    description: 'Workflow automation connecting all tools. Auto-distribute, auto-notify, auto-index.',
    color: 'emerald' as GlowColor,
    icon: Workflow,
  },
  {
    name: 'ACOS',
    description: 'Agentic Creator OS — the meta-layer that orchestrates all tools into one system.',
    color: 'orange' as GlowColor,
    icon: Layers,
  },
]

const contentThemes = [
  {
    title: 'Authority',
    subtitle: 'Build credibility',
    icon: Target,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    examples: ['Deep tutorials', 'Architecture patterns', 'Production walkthroughs', 'Case studies'],
  },
  {
    title: 'Reach',
    subtitle: 'Grow your audience',
    icon: Megaphone,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    examples: ['Shorts & clips', 'Hot takes', 'Trend reactions', 'Tool comparisons'],
  },
  {
    title: 'Connection',
    subtitle: 'Build community',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    examples: ['Behind the scenes', 'Build-in-public logs', 'Q&A sessions', 'Creator stories'],
  },
]

export default function YouTubeStrategyPage() {
  return (
    <>
      <StrategyBackground />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Strategy Guide
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Build a YouTube Channel{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                with AI-Powered Tools
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              A 6-step framework for creators who want to build a sustainable YouTube channel
              using AI tools at every stage of production. From research to distribution.
            </motion.p>

            {/* Tool badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex flex-wrap gap-3"
            >
              {toolBadges.map((tool) => (
                <span
                  key={tool.name}
                  className={`rounded-full bg-gradient-to-r ${tool.color} px-4 py-1.5 text-sm font-medium text-white/90`}
                >
                  {tool.name}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#framework"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
              >
                Read the Playbook
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/youtube"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
              >
                <Youtube className="h-5 w-5" />
                See It in Action
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 6-Step Framework ── */}
        <section id="framework" className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
                The Framework
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                6 Steps to a Sustainable Channel
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Each step builds on the last. Master one before moving to the next.
              </p>
            </motion.div>

            <div className="space-y-6">
              {frameworkSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                  >
                    <GlowCard color={step.color}>
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                          <div className="flex items-center gap-4 lg:min-w-[200px]">
                            <span className="text-4xl font-bold text-white/10">{step.num}</span>
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white lg:hidden">{step.title}</h3>
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-3 hidden text-xl font-bold text-white lg:block">{step.title}</h3>
                            <p className="mb-4 text-slate-400">{step.description}</p>
                            <ul className="space-y-2">
                              {step.tips.map((tip) => (
                                <li key={tip} className="flex items-start gap-2 text-sm text-slate-300">
                                  <ArrowRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-cyan-400" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                            {step.command && (
                              <code className="mt-4 inline-block rounded bg-white/5 px-3 py-1 text-xs text-cyan-400/70">
                                {step.command}
                              </code>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Frank's Pipeline Visual ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                Real-World Example
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Frank&apos;s Production Pipeline
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                This is the actual workflow behind every video on the FrankX channel.
                One video in, five assets out.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08]"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
            >
              {/* Pipeline flow */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {[
                  { label: 'Research', sub: '/deep-research', icon: '1' },
                  { label: 'Script', sub: '/video-produce', icon: '2' },
                  { label: 'Record', sub: 'CapCut + mic', icon: '3' },
                  { label: 'Edit', sub: 'CapCut Pro', icon: '4' },
                  { label: 'Clip', sub: 'Opus Clip', icon: '5' },
                  { label: 'Distribute', sub: 'n8n + ACOS', icon: '6' },
                ].map((item, i) => (
                  <div key={item.label} className="relative text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-sm font-bold text-amber-400">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/40">{item.sub}</p>
                    {i < 5 && (
                      <div className="absolute right-0 top-5 hidden -translate-x-1/2 text-white/20 lg:block">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Output fan */}
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-white/30">
                  1 Video &rarr; 5 Assets
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['YouTube Long-form', 'YouTube Shorts', 'X Thread', 'Blog Post', 'Newsletter'].map((asset) => (
                    <span
                      key={asset}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/60"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Tools Showcase ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="mb-4 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
                Tool Stack
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                The AI Creator&apos;s Toolkit
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Six tools that form the foundation of an AI-powered production studio.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool, i) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <GlowCard color={tool.color}>
                      <div className="p-6">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="mb-2 font-bold text-white">{tool.name}</h3>
                        <p className="text-sm leading-relaxed text-slate-400">{tool.description}</p>
                      </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Content Theme Framework ── */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                The Content Triangle
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Every video should serve one of three goals. Balance all three over time for sustainable growth.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {contentThemes.map((theme, i) => {
                const Icon = theme.icon
                return (
                  <motion.div
                    key={theme.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center"
                  >
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${theme.bg}`}>
                      <Icon className={`h-6 w-6 ${theme.color}`} />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-white">{theme.title}</h3>
                    <p className="mb-4 text-xs text-white/40">{theme.subtitle}</p>
                    <ul className="space-y-1.5 text-left">
                      {theme.examples.map((ex) => (
                        <li key={ex} className="flex items-center gap-2 text-sm text-slate-300">
                          <ArrowRight className="h-3 w-3 flex-shrink-0 text-white/30" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-10 text-center backdrop-blur-xl"
            >
              <Play className="mx-auto mb-6 h-12 w-12 text-cyan-400" />
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Start Building Your Channel
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-slate-400">
                See this framework in action on the FrankX YouTube channel, or get the complete
                GenCreator OS for templates, workflows, and ready-made production systems.
              </p>
              <div className="mb-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.youtube.com/@frankxai?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-500"
                >
                  <Youtube className="h-5 w-5" />
                  Subscribe
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
                <Link
                  href="/products/generative-creator-os"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
                >
                  GenCreator OS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="mx-auto max-w-md">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/30">
                  Get strategy updates by email
                </p>
                <EmailSignup
                  listType="newsletter"
                  placeholder="your@email.com"
                  buttonText="Subscribe"
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
                  title: 'FrankX YouTube',
                  description: 'See the strategy in action. Tutorials, music production, and opinion pieces.',
                  href: '/youtube',
                  color: 'rose' as GlowColor,
                },
                {
                  title: 'For Creators',
                  description: 'Tools, prompts, and systems for AI-powered creative workflows.',
                  href: '/creators',
                  color: 'violet' as GlowColor,
                },
                {
                  title: 'Watch Library',
                  description: 'Curated collection of the best AI and creator videos from across the web.',
                  href: '/watch',
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
