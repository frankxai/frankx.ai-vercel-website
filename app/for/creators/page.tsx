'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Music2,
  Sparkles,
  ArrowRight,
  Terminal,
  BookOpen,
  Palette,
  Headphones,
  ChevronDown,
  Zap,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { EmailSignup } from '@/components/email-signup'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const creatorTools = [
  {
    icon: Music2,
    title: 'Music Lab',
    description: '12K+ songs created with Suno AI. Prompt templates, genre guides, and production workflows.',
    href: '/music-lab',
    stat: '12K+ tracks',
    color: 'emerald',
  },
  {
    icon: Sparkles,
    title: 'Prompt Library',
    description: 'Battle-tested prompts for music, writing, image gen, and coding. Copy and adapt.',
    href: '/prompt-library',
    stat: '50+ prompts',
    color: 'cyan',
  },
  {
    icon: Terminal,
    title: 'Agentic Creator OS',
    description: 'Open-source operating system for Claude Code. 630+ skills, 40+ agents, one entry point.',
    href: '/acos',
    stat: 'Open source',
    color: 'purple',
  },
  {
    icon: Palette,
    title: 'AI Art Gallery',
    description: 'Visual explorations generated with nano-banana AI. Techniques and processes shared.',
    href: '/ai-art',
    stat: '40+ artworks',
    color: 'amber',
  },
]

const blogHighlights = [
  {
    title: 'Suno Music Production: Complete Workflow Guide',
    href: '/blog/suno-music-production-workflow',
    tag: 'Music',
  },
  {
    title: 'ACOS: Zero to Production Quickstart',
    href: '/blog/acos-zero-to-production-quickstart',
    tag: 'Tools',
  },
  {
    title: 'Agentic Workflows That Save Hours',
    href: '/blog/agentic-workflows-save-hours',
    tag: 'Workflow',
  },
]

const faqs = [
  {
    q: 'How do I start making music with AI?',
    a: 'Start with Suno AI (suno.com) — it\'s the most accessible AI music tool. Check the Music Lab for prompt templates and the blog for the complete Suno workflow guide. You can create your first song in under 5 minutes.',
  },
  {
    q: 'What is ACOS and do I need it?',
    a: 'ACOS (Agentic Creator OS) supercharges Claude Code with 630+ skills and 40+ agents for creative work. If you use Claude Code for content, music, or building, ACOS makes you 10x faster. It\'s free and open source.',
  },
  {
    q: 'Are the prompts really free?',
    a: 'Yes. The Prompt Library is completely free. These are the same prompts I use daily for music production, writing, image generation, and coding. Copy them, adapt them, make them yours.',
  },
  {
    q: 'What tools does FrankX use for creating?',
    a: 'Suno AI for music, Claude Code with ACOS for writing and building, nano-banana (Gemini) for images, Next.js + Vercel for the website. Everything is documented on the blog and in Creation Chronicles.',
  },
  {
    q: 'How can I learn more about AI-powered creation?',
    a: 'Start with the blog — especially the Suno workflow guide and ACOS quickstart. Then explore the curated courses on the Students page (free from Oracle, Google, MIT). Join the newsletter for weekly insights.',
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: 'bg-purple-500/20 text-purple-400',
    text: 'text-purple-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
  },
}

export default function CreatorsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)' }} />
        <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)' }} />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              <Headphones className="h-3.5 w-3.5" />
              For Creators
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Build your </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                creator empire
              </span>
              <span className="text-white"> with AI</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
              Music, art, content, tools — everything you need to create at scale.
              12K+ songs, 70+ tutorials, and open-source tools. All free to start.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/music-lab"
                className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
              >
                <Music2 className="h-4 w-4" />
                Start with Music
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/prompt-library"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Browse Prompts
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative border-y border-white/5 bg-white/[0.02] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12K+', label: 'Songs Created' },
              { value: '70+', label: 'Tutorials' },
              { value: '630+', label: 'AI Skills' },
              { value: 'Free', label: 'To Start' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Tools Grid */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Your creative toolkit</h2>
            <p className="mt-3 text-lg text-white/50">Everything open, documented, ready to use.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {creatorTools.map((tool, i) => {
              const c = colorMap[tool.color]
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={tool.href} className="group block h-full">
                    <div className={`h-full rounded-2xl border ${c.border} ${c.bg} p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <span className={`text-xs font-medium ${c.text}`}>{tool.stat}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">{tool.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{tool.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-white/30 group-hover:text-white/60 transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Start here</h2>
              <p className="mt-2 text-white/50">Essential reads for AI creators.</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="space-y-3">
            {blogHighlights.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={post.href}
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">
                      {post.tag}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="relative py-16">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 text-center backdrop-blur-sm"
          >
            <Zap className="mx-auto h-8 w-8 text-emerald-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Weekly creator insights
            </h2>
            <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
              AI music techniques, prompt templates, and creative workflows. Every week.
            </p>
            <div className="max-w-sm mx-auto">
              <EmailSignup
                listType="creation-chronicles"
                placeholder="your@email.com"
                buttonText="Join Free"
                compact
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Questions creators ask
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-semibold text-white">{faq.q}</h3>
                  <ChevronDown className={`h-4 w-4 text-white/40 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to create?
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Everything is free to start. Pick a tool and make something.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/music-lab"
              className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Music Lab
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/prompt-library"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Prompt Library
            </Link>
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              ACOS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
