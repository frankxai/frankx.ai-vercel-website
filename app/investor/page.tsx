'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Bot,
  Workflow,
  Network,
  Wrench,
  ArrowRight,
  Search,
  BarChart3,
  Zap,
  Building2,
  User,
  Gift,
  DollarSign,
  Layers,
  Shield,
} from 'lucide-react'

import Image from 'next/image'
import { getFeaturedProducts, INVESTOR_CATEGORIES, type InvestorCategory } from '@/lib/investor'
import InvestorProductCard from '@/components/investor/InvestorProductCard'

const hubSections = [
  {
    id: 'agents' as InvestorCategory,
    title: 'AI Agent Packs',
    description:
      'Autonomous agents for due diligence, deal sourcing, market research, and competitive intelligence.',
    icon: Bot,
    href: '/investor/agents',
    color: 'cyan',
    badge: '$47+',
    stat: '5+ agents',
  },
  {
    id: 'workflows' as InvestorCategory,
    title: 'Workflow Templates',
    description:
      'n8n automation templates for deal pipelines, portfolio monitoring, and alert systems.',
    icon: Workflow,
    href: '/investor/workflows',
    color: 'violet',
    badge: '$37+',
    stat: 'Plug & play',
  },
  {
    id: 'architectures' as InvestorCategory,
    title: 'System Architectures',
    description:
      'Full-stack intelligence system blueprints with data pipelines, dashboards, and AI layers.',
    icon: Network,
    href: '/investor/architectures',
    color: 'emerald',
    badge: '$297+',
    stat: 'Production-ready',
  },
  {
    id: 'tools' as InvestorCategory,
    title: 'Tools & Templates',
    description:
      'Notion CRMs, Obsidian vaults, Claude Code configs, and research workspace setups.',
    icon: Wrench,
    href: '/investor/tools',
    color: 'amber',
    badge: '$0+',
    stat: 'Instant setup',
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; glow: string }> = {
  cyan: {
    bg: 'bg-cyan-500/[0.06]',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    icon: 'bg-cyan-500/15 text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
  },
  violet: {
    bg: 'bg-violet-500/[0.06]',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    icon: 'bg-violet-500/15 text-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
  },
  emerald: {
    bg: 'bg-emerald-500/[0.06]',
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    icon: 'bg-emerald-500/15 text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
  },
  amber: {
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-500/20 hover:border-amber-400/40',
    icon: 'bg-amber-500/15 text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    glow: 'group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]',
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

function HubBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <motion.div
        className="absolute -right-60 top-20 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.35, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-40 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function SectionCard({ section }: { section: (typeof hubSections)[0] }) {
  const Icon = section.icon
  const colors = colorMap[section.color]

  return (
    <motion.div variants={staggerChild}>
      <Link href={section.href} className="group block h-full">
        <div
          className={`relative h-full rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 ${colors.glow}`}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className="h-6 w-6" />
              </div>
              {section.badge && (
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}
                >
                  {section.badge}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{section.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{section.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{section.stat}</span>
              <div className="flex items-center gap-1 text-sm text-slate-500 transition-colors group-hover:text-white">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const audiences = [
  {
    icon: User,
    title: 'Everyday Investors',
    description: 'Stocks, ETFs, and crypto on Revolut, eToro, and more — supercharged with AI research tools.',
    color: 'text-cyan-400 bg-cyan-500/15',
  },
  {
    icon: TrendingUp,
    title: 'Crypto & DeFi',
    description: 'Navigate Crypto.com, SwissBorg, and Nexo with AI-powered analysis and yield optimization.',
    color: 'text-violet-400 bg-violet-500/15',
  },
  {
    icon: Building2,
    title: 'Institutional',
    description: 'Deal flow automation, due diligence agents, and portfolio intelligence at scale.',
    color: 'text-emerald-400 bg-emerald-500/15',
  },
]

const platforms = [
  { name: 'Revolut', tagline: 'Banking + investing', href: 'https://revolut.com', gradient: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20' },
  { name: 'eToro', tagline: 'Social & copy trading', href: 'https://etoro.com', gradient: 'from-green-500/20 to-emerald-500/20 border-green-500/20' },
  { name: 'Crypto.com', tagline: 'Full crypto ecosystem', href: 'https://crypto.com', gradient: 'from-slate-500/20 to-blue-500/20 border-slate-500/20' },
  { name: 'SwissBorg', tagline: 'Smart crypto wealth', href: 'https://swissborg.com', gradient: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20' },
  { name: 'Nexo', tagline: 'Crypto yield & lending', href: 'https://nexo.com', gradient: 'from-blue-500/20 to-violet-500/20 border-blue-500/20' },
]

const aiResearchTools = [
  { name: 'Perplexity Finance', description: 'AI-powered financial research with real-time data and cited sources. The starting point for any investment thesis.', icon: Search, color: 'text-cyan-400 bg-cyan-500/15' },
  { name: 'Claude', description: 'Analyze 10-K filings, build investment theses, stress-test portfolios, and generate deep research reports.', icon: Bot, color: 'text-violet-400 bg-violet-500/15' },
  { name: 'Claude Code', description: 'Turn your terminal into a research station. Track portfolios, scrape data, build dashboards, automate analysis.', icon: Layers, color: 'text-emerald-400 bg-emerald-500/15' },
]

const valueTiers = [
  { label: 'Free', price: '$0', description: 'Starter Kit', icon: Gift, color: 'text-emerald-400' },
  { label: 'Templates', price: '$27-47', description: 'Individual tools', icon: Wrench, color: 'text-amber-400' },
  { label: 'Agent Packs', price: '$97-297', description: 'Multi-component', icon: Bot, color: 'text-cyan-400' },
  { label: 'Full Systems', price: '$297-697', description: 'Complete stacks', icon: Layers, color: 'text-violet-400' },
]

export default function InvestorHubPage() {
  const featuredProducts = getFeaturedProducts().slice(0, 6)

  return (
    <>
      <HubBackground />
      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="pb-8 pt-32 sm:pb-12 sm:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
            >
              <Image src="/images/mascot/mascot-v14-dimensional-rift.png" alt="Axi" width={48} height={48} className="rounded-xl" sizes="48px" style={{ boxShadow: '0 0 20px -6px rgba(6,182,212,0.3)' }} />
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-500/30 to-cyan-500/30">
                <TrendingUp className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Invest Smarter with AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your AI{' '}
              <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Investment Edge.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              The platforms I invest on, the AI tools I research with, and the prompts
              that give you an edge — whether you hold stocks, crypto, or both.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#platforms"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                <TrendingUp className="h-4 w-4" />
                Platform Picks
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#ai-tools"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
                AI Research Tools
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Journey Steps */}
        <section className="py-6">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center gap-3 text-xs font-medium text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-amber-400" />
                Research
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-amber-500/40 to-cyan-500/40" />
              <span className="flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
                Analyze
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40" />
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                Deploy
              </span>
            </motion.div>
          </div>
        </section>

        {/* Platforms I Use */}
        <section id="platforms" className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                What I Use Daily
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Investment Platforms
              </h2>
              <p className="mt-2 max-w-lg text-slate-400">
                The platforms powering my portfolio — stocks, crypto, and yield.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {platforms.map((platform, i) => (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`group rounded-xl border bg-gradient-to-br ${platform.gradient} p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <p className="text-base font-bold text-white">{platform.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{platform.tagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-500 transition-colors group-hover:text-white">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* AI Research Stack */}
        <section id="ai-tools" className="border-y border-white/[0.04] py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                AI-Powered Research
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Your Research Stack
              </h2>
              <p className="mt-2 max-w-lg text-slate-400">
                Three AI tools that replace hours of manual research. Use them together for maximum edge.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
              {aiResearchTools.map((tool, i) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{tool.name}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{tool.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Hub Navigation Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {hubSections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Value Ladder */}
        <section className="border-y border-white/[0.04] py-12">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Investment in Your Edge
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Choose Your Level
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {valueTiers.map((tier, i) => {
                const Icon = tier.icon
                return (
                  <motion.div
                    key={tier.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 text-center"
                  >
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] ${tier.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {tier.label}
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">{tier.price}</p>
                    <p className="mt-1 text-xs text-slate-500">{tier.description}</p>
                    {i < valueTiers.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-600 lg:block" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400"
                >
                  Top Picks
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white sm:text-3xl"
                >
                  Featured Products
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-2 text-slate-400"
                >
                  Most popular tools across both institutional and individual tracks
                </motion.p>
              </div>
              <Link
                href="/investor/agents"
                className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-400 transition-all hover:border-white/20 hover:text-white sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <InvestorProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="mt-6 flex justify-center sm:hidden">
              <Link
                href="/investor/agents"
                className="flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                View all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Built For Section */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">Built For You</h2>
              <p className="mx-auto mb-10 max-w-lg text-slate-400">
                Whether you manage a fund or your personal portfolio, these tools scale to your needs.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
              {audiences.map((audience, i) => {
                const Icon = audience.icon
                return (
                  <motion.div
                    key={audience.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <div
                      className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${audience.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white">{audience.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{audience.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-8 sm:p-10"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 bg-amber-500/10 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">Start Investing Smarter Today</h3>
                <p className="mx-auto mb-8 max-w-lg leading-relaxed text-slate-400">
                  Free investment prompts for Claude, a Perplexity research workflow guide, and a portfolio
                  tracking template. No credit card, no catch — just better research.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Download Free Kit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
