'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Camera,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Eye,
  FileSearch,
  Fingerprint,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  MessageSquare,
  Palette,
  ScanSearch,
  Settings2,
  Shield,
  Sparkles,
  Terminal,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

/* ─── Data ─────────────────────────────────────────────────────────── */

const architectureLayers = [
  {
    number: '01',
    title: 'Scanner',
    icon: ScanSearch,
    color: 'cyan',
    description:
      'Recursively indexes every image across the codebase. Maps file paths, dimensions, formats, and byte sizes into a structured inventory.',
    stat: '408 images indexed',
  },
  {
    number: '02',
    title: 'Auditor',
    icon: FileSearch,
    color: 'violet',
    description:
      'Cross-references images against page usage, alt text coverage, format optimization, and responsive sizing rules.',
    stat: '268 pages mapped',
  },
  {
    number: '03',
    title: 'Brand DNA',
    icon: Fingerprint,
    color: 'amber',
    description:
      'Validates visual consistency against brand palette, aspect ratios, naming conventions, and quality thresholds.',
    stat: 'Per-image grading',
  },
  {
    number: '04',
    title: 'Intelligence',
    icon: Cpu,
    color: 'emerald',
    description:
      'Scores overall visual health, detects orphans, duplicates, oversized assets, and missing responsive variants.',
    stat: 'Health score engine',
  },
  {
    number: '05',
    title: 'Integration',
    icon: Layers,
    color: 'blue',
    description:
      'Connects with ACOS, Claude Code, Cloudinary, and n8n to automate fixes, uploads, and CDN optimization.',
    stat: '6 integrations',
  },
  {
    number: '06',
    title: 'CLI',
    icon: Terminal,
    color: 'rose',
    description:
      'Single-command interface: scan, audit, fix, report. Generates markdown reports and JSON inventories for CI pipelines.',
    stat: 'vis scan --fix',
  },
]

const beforeAfterStats = [
  { label: 'Health Score', before: '1/100', after: '76/100', icon: TrendingUp },
  { label: 'Placeholders Replaced', before: '2 active', after: '0 remaining', icon: ImageIcon },
  { label: 'Duplicates Fixed', before: '3 detected', after: '0 remaining', icon: CheckCircle2 },
  { label: 'Images Indexed', before: '0', after: '408', icon: BarChart3 },
  { label: 'Pages Mapped', before: '0', after: '268', icon: LayoutGrid },
  { label: 'Orphaned Images', before: '333 unknown', after: '333 catalogued', icon: Eye },
]

const howItWorks = [
  {
    step: '01',
    title: 'Scan',
    icon: ScanSearch,
    description:
      'Point VIS at any directory. It recursively discovers every image file, extracts metadata, and builds a structured inventory in seconds.',
  },
  {
    step: '02',
    title: 'Audit',
    icon: Shield,
    description:
      'Cross-reference images against every page. Detect orphans, missing alt text, oversized files, placeholder SVGs, and brand inconsistencies.',
  },
  {
    step: '03',
    title: 'Fix',
    icon: Wrench,
    description:
      'Auto-replace placeholders, compress oversized assets, generate responsive variants, and update references across the codebase.',
  },
]

const integrations = [
  { name: 'ACOS', icon: Settings2, description: 'Agentic Creator OS orchestration', href: '/acos' },
  { name: 'Claude Code', icon: Bot, description: 'AI-powered codebase operations', href: null },
  { name: 'nanobanana', icon: Sparkles, description: 'AI image generation pipeline', href: null },
  { name: 'Cloudinary', icon: Cloud, description: 'CDN optimization and transforms', href: null },
  { name: 'n8n', icon: Zap, description: 'Workflow automation triggers', href: null },
  { name: 'Slack', icon: MessageSquare, description: 'Audit report notifications', href: null },
]

/* ─── Color utility ────────────────────────────────────────────────── */

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
}

/* ─── Sections ─────────────────────────────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion()
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Back link */}
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            Research Hub
          </Link>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Research &middot; Visual Management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Visual Intelligence
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              System
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            Agentic visual asset management for AI-native creators. Scan, audit, and fix every image
            across your codebase with a single command.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#architecture"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              View Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#case-study"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              Case Study
            </Link>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.3, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Images Indexed', value: '408', icon: Camera },
            { label: 'Pages Mapped', value: '268', icon: LayoutGrid },
            { label: 'Health Score', value: '76/100', icon: TrendingUp },
            { label: 'Architecture Layers', value: '6', icon: Layers },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4">
              <stat.icon className="w-4 h-4 text-white/30 mb-2" />
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProblemSection() {
  const reduce = useReducedMotion()
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Visual Chaos Problem
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed">
            Modern AI-native projects accumulate visual assets faster than any manual process can
            track. FrankX.ai&apos;s initial audit revealed the scope of this challenge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              stat: '333',
              label: 'orphaned images',
              description:
                'Images present in the repository with unknown usage status. Every orphan is wasted storage and potential confusion for contributors.',
              icon: ImageIcon,
              color: 'amber',
            },
            {
              stat: '2',
              label: 'placeholder SVGs on flagship posts',
              description:
                'Default placeholder graphics displayed on high-traffic blog posts instead of proper featured images, reducing visual authority.',
              icon: Palette,
              color: 'rose',
            },
            {
              stat: '0',
              label: 'systematic auditing before VIS',
              description:
                'Every visual decision was manual. There was no automated pipeline to detect issues, enforce brand consistency, or measure visual health.',
              icon: FileSearch,
              color: 'violet',
            },
          ].map((item, index) => {
            const colors = colorMap[item.color] || colorMap.amber
            return (
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.15 + index * 0.08 }}
              >
                <GlowCard color={item.color as any} className="p-6 h-full">
                  <div className={`p-2.5 ${colors.bg} rounded-xl w-fit mb-4`}>
                    <item.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{item.stat}</p>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>{item.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const reduce = useReducedMotion()
  return (
    <section id="architecture" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              6-Layer Architecture
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed">
            Each layer handles a distinct responsibility, from raw file discovery through
            automated remediation. Layers compose into a single CLI command or integrate
            individually via API.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {architectureLayers.map((layer, index) => {
            const colors = colorMap[layer.color] || colorMap.cyan
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.number}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.1 + index * 0.06 }}
              >
                <GlowCard color={layer.color as any} className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold ${colors.text} ${colors.bg} px-2.5 py-1 rounded-full`}>
                      {layer.number}
                    </span>
                    <div className={`p-2 ${colors.bg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{layer.description}</p>
                  <div className={`text-xs font-medium ${colors.text} ${colors.bg} px-3 py-1.5 rounded-full w-fit`}>
                    {layer.stat}
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CaseStudySection() {
  const reduce = useReducedMotion()
  return (
    <section id="case-study" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Case Study: FrankX.ai
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed">
            The Visual Intelligence System was built and validated against the FrankX.ai production
            codebase. Here are the measured results from the first full audit cycle.
          </p>
        </motion.div>

        {/* Before / After grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {beforeAfterStats.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.1 + index * 0.06 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-4 h-4 text-white/30" />
                  <h3 className="text-sm font-bold text-white">{item.label}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Before</p>
                    <p className="text-lg font-semibold text-white/50">{item.before}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-400/60 mb-1">After</p>
                    <p className="text-lg font-bold text-emerald-400">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const reduce = useReducedMotion()
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="w-5 h-5 text-violet-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              How It Works
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed">
            Three steps from visual chaos to measured health. Each step runs independently
            or chains into a single pipeline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {howItWorks.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.step}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.1 + index * 0.1 }}
                className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
              >
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/[0.08]" />
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">
                    {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-white/30" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IntegrationSection() {
  const reduce = useReducedMotion()
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { delay: 0.1 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Integrations
            </h2>
          </div>
          <p className="text-white/50 leading-relaxed">
            VIS connects with the tools already in your stack. Each integration extends the
            pipeline with specialized capabilities.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item, index) => {
            const Icon = item.icon
            const Wrapper = item.href ? Link : 'div'
            const wrapperProps = item.href ? { href: item.href } : {}
            return (
              <motion.div
                key={item.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.1 + index * 0.06 }}
              >
                <Wrapper
                  {...(wrapperProps as any)}
                  className={`block bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 transition-all ${
                    item.href ? 'hover:bg-white/[0.05] hover:border-white/[0.12] group' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/[0.05] rounded-lg">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    {item.href && (
                      <ArrowRight className="w-3 h-3 text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
                    )}
                  </div>
                  <p className="text-xs text-white/40">{item.description}</p>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-violet-500/[0.03] rounded-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Started with VIS
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              The Visual Intelligence System ships as part of ACOS. Install it,
              run a scan, and see your visual health score in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/acos"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Install via ACOS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                View All Products
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link
                href="/blog"
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Read the Blog
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/research"
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Back to Research Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function VisualIntelligencePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <ArchitectureSection />
        <CaseStudySection />
        <HowItWorksSection />
        <IntegrationSection />
        <CTASection />
      </div>
    </main>
  )
}
