'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Code2,
  Layers,
  ArrowRight,
  Terminal,
  BookOpen,
  Shield,
  Cpu,
  ChevronDown,
  GitBranch,
  Database,
  Boxes,
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

const architectureAreas = [
  {
    icon: Boxes,
    title: 'Multi-Agent Systems',
    description: 'Production patterns for agent orchestration, swarm intelligence, and autonomous workflows at scale.',
    href: '/blog/swarm-intelligence-multi-agent-orchestration',
    stat: 'Production-tested',
    color: 'cyan',
  },
  {
    icon: Terminal,
    title: 'ACOS for Developers',
    description: '75+ skills, 38 agents in an open-source operating system for Claude Code. Built for shipping.',
    href: '/acos',
    stat: 'Open source',
    color: 'purple',
  },
  {
    icon: Database,
    title: 'RAG & Vector Architecture',
    description: 'Enterprise RAG patterns, vector database comparisons, and retrieval optimization strategies.',
    href: '/research/rag-production-patterns',
    stat: 'Deep dives',
    color: 'emerald',
  },
  {
    icon: Shield,
    title: 'Enterprise AI Architecture',
    description: 'Production OCI GenAI patterns, agent security frameworks, and enterprise deployment guides.',
    href: '/ai-architect',
    stat: 'Multi-Cloud',
    color: 'amber',
  },
]

const technicalPosts = [
  {
    title: 'Production Agentic AI Systems: Architecture Patterns',
    href: '/blog/production-agentic-ai-systems',
    tag: 'Architecture',
  },
  {
    title: 'Swarm Intelligence & Multi-Agent Orchestration',
    href: '/blog/swarm-intelligence-multi-agent-orchestration',
    tag: 'Agents',
  },
  {
    title: 'Production LLM Agents: OCI Operating Model',
    href: '/blog/production-llm-agents-oci-part-3-operating-model',
    tag: 'Enterprise',
  },
  {
    title: 'Creator Intelligence Systems 2026',
    href: '/blog/creator-intelligence-systems-2026',
    tag: 'Research',
  },
]

const faqs = [
  {
    q: 'What tech stack does FrankX use?',
    a: 'Next.js 16 + TypeScript + Tailwind CSS on Vercel for the web platform. Claude Code with ACOS for AI development. Oracle Cloud Infrastructure for enterprise work. The full stack is documented at frankx.ai/about.',
  },
  {
    q: 'How do I build multi-agent systems?',
    a: 'Start with the "Swarm Intelligence" article on the blog — it covers orchestration patterns, agent coordination, and production deployment. ACOS includes 40+ agent templates you can study and adapt.',
  },
  {
    q: 'Is ACOS useful for enterprise AI development?',
    a: 'ACOS was built from enterprise AI architecture experience. The skill system, agent architecture, and workflow patterns are production-tested. The Pro System tier ($197) includes enterprise-focused configuration guides.',
  },
  {
    q: 'What cloud platforms do you cover?',
    a: 'Primary focus on Oracle Cloud Infrastructure (OCI) GenAI services, with comparison guides for AWS, Azure, and GCP. The AI Architect hub covers multi-cloud architecture patterns.',
  },
  {
    q: 'Do you offer consulting or architecture reviews?',
    a: 'Coaching programs are in development. Currently offering 1:1 async support through the Pro System tier. Join the waitlist at frankx.ai/coaching for enterprise coaching access.',
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; text: string }> = {
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
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    text: 'text-emerald-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    text: 'text-amber-400',
  },
}

export default function ArchitectsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }} />
        <div className="absolute -left-40 bottom-20 h-[600px] w-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)' }} />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-16">
        {/* Codex — AI Architect character accent */}
        <div className="pointer-events-none absolute right-6 top-20 hidden w-48 opacity-[0.12] lg:block xl:w-56">
          <Image src="/images/team/codex-falcon.png" alt="" width={224} height={224} className="object-contain" aria-hidden="true" />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              <Cpu className="h-3.5 w-3.5" />
              For Architects & Engineers
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Enterprise AI architecture </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                that ships
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
              Production patterns for multi-agent systems, RAG architectures, and agentic workflows.
              Built from enterprise experience, documented for everyone.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ai-architecture"
                className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
              >
                <Layers className="h-4 w-4" />
                Architecture Hub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                Research Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Credentials bar */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.03] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '4+', label: 'Years Enterprise AI' },
              { value: '75+', label: 'AI Skills Built' },
              { value: '38', label: 'Agent Templates' },
              { value: '70+', label: 'Technical Articles' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Areas */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Architecture patterns</h2>
            <p className="mt-3 text-lg text-white/50">Production-tested, enterprise-grade, documented.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {architectureAreas.map((area, i) => {
              const c = colorMap[area.color]
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={area.href} className="group block h-full">
                    <div className={`h-full rounded-2xl border ${c.border} ${c.bg} p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                          <area.icon className="h-6 w-6" />
                        </div>
                        <span className={`text-xs font-medium ${c.text}`}>{area.stat}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">{area.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{area.description}</p>
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

      {/* Technical Blog Posts */}
      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Technical deep dives</h2>
              <p className="mt-2 text-white/50">Architecture patterns and production guides.</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="space-y-3">
            {technicalPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={post.href}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 uppercase tracking-wider">
                      {post.tag}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-white group-hover:text-cyan-400 transition-colors">
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
            <GitBranch className="mx-auto h-8 w-8 text-cyan-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Architecture insights weekly
            </h2>
            <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
              Production AI patterns, agent architectures, and enterprise deployment strategies.
            </p>
            <div className="max-w-sm mx-auto">
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

      {/* FAQ */}
      <section className="relative border-t border-white/5 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Questions architects ask
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
            Build something that matters.
          </h2>
          <p className="text-lg text-white/50 mb-8">
            Architecture patterns, agent templates, and production guides. All open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai-architecture"
              className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Architecture Hub
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              ACOS
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              Research Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
