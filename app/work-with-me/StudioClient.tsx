'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { socialLinks } from '@/lib/social-links'
import {
  ArrowRight,
  Brain,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  Factory,
  Flame,
  Globe,
  Heart,
  Landmark,
  Layers,
  Lightbulb,
  Mail,
  MapPin,
  Microscope,
  Radio,
  Rocket,
  Send,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'

/* ─── Ambient background ─── */
function StudioBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />
      <div
        className="absolute -left-60 top-20 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(171,71,199,0.06) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(67,191,227,0.05) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute left-1/3 bottom-0 h-[400px] w-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
    </div>
  )
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─── Data ─── */
const services = [
  {
    title: 'The Leverage Map',
    duration: '1 — 2 days',
    price: 'From EUR 3,000',
    icon: Target,
    color: 'violet' as const,
    description:
      'Find where your expertise, proprietary data, and recurring decisions can create the greatest practical advantage.',
    deliverables: ['Knowledge and workflow map', 'Opportunity portfolio', 'Risk assessment', 'Prioritized roadmap'],
  },
  {
    title: 'The Intelligence Blueprint',
    duration: '1 — 2 weeks',
    price: 'From EUR 8,000',
    icon: Layers,
    color: 'cyan' as const,
    description:
      'Design one high-value intelligence system around a real business outcome, with the knowledge, agents, controls, and delivery path specified.',
    deliverables: ['Intelligence architecture', 'Knowledge model', 'Agent workflow', 'Implementation plan'],
  },
  {
    title: 'The Sovereign System Build',
    duration: '4 — 8 weeks',
    price: 'From EUR 25,000',
    icon: Building2,
    color: 'emerald' as const,
    description:
      'Install the system behind the business: memory, specialist agents, quality gates, operating workflows, and a team-ready adoption model.',
    deliverables: ['Owned AI operating system', 'Agent and skill library', 'Quality gates', 'Team activation'],
  },
  {
    title: 'AI Architecture Partner',
    duration: 'Monthly',
    price: 'From EUR 3,000/mo',
    icon: Shield,
    color: 'amber' as const,
    description:
      'Ongoing architecture, product exploration, and system improvement for leaders who want a fractional AI Architect beside them.',
    deliverables: ['Architecture reviews', 'Opportunity sessions', 'Team coaching', 'System evolution'],
  },
  {
    title: 'Leadership Possibility Lab',
    duration: '1 day',
    price: 'From EUR 5,000',
    icon: Lightbulb,
    color: 'rose' as const,
    description:
      'A working session for founders or leadership teams to expose hidden leverage, test new offers, and align on a practical AI direction.',
    deliverables: ['Capability briefing', 'Opportunity design', 'Strategic alignment', '90-day action plan'],
  },
]

const audiences = [
  {
    title: 'Established experts',
    fit: 'Primary',
    description:
      'You have an audience, courses, frameworks, or years of client work. The next constraint is turning what only you can do into a system without flattening your voice.',
  },
  {
    title: 'Founder-led businesses',
    fit: 'Primary',
    description:
      'Your business has valuable customer knowledge, operating patterns, and data, but AI still lives in isolated tools instead of the way the company works.',
  },
  {
    title: 'Builders becoming experts',
    fit: 'Pathway',
    description:
      'You are still assembling proof and a category. Start with the open systems and Academy pathways, then use a focused sprint when the business case is real.',
  },
]

const intelligenceLayers = [
  {
    label: 'Knowledge',
    icon: Brain,
    description: 'Your frameworks, evidence, language, decisions, customer insight, and proprietary data.',
  },
  {
    label: 'Agents',
    icon: Layers,
    description: 'Specialist roles and skills that apply your standards to research, decisions, and delivery.',
  },
  {
    label: 'Operations',
    icon: Factory,
    description: 'Repeatable workflows across delivery, sales, marketing, administration, and quality control.',
  },
  {
    label: 'Creation',
    icon: Sparkles,
    description: 'Content, music, media, social assets, and product prototypes built from one coherent source.',
  },
  {
    label: 'Growth',
    icon: Rocket,
    description: 'New niches, offers, digital products, and go-to-market experiments informed by real signals.',
  },
]

const industries = [
  { name: 'Healthcare', icon: Heart, color: 'text-rose-400' },
  { name: 'Automotive', icon: Car, color: 'text-cyan-400' },
  { name: 'Financial Services', icon: Landmark, color: 'text-amber-400' },
  { name: 'Chemical / IP', icon: Microscope, color: 'text-emerald-400' },
  { name: 'Telecom', icon: Radio, color: 'text-violet-400' },
  { name: 'Energy', icon: Flame, color: 'text-orange-400' },
  { name: 'Retail', icon: ShoppingCart, color: 'text-teal-400' },
  { name: 'Public Sector', icon: Globe, color: 'text-blue-400' },
]

const methodology = [
  { step: '01', label: 'Discover', icon: Microscope, description: 'Listen deeply and map the business, ambitions, assets, and constraints' },
  { step: '02', label: 'Distill', icon: Brain, description: 'Extract the knowledge, judgment, evidence, language, and repeatable methods' },
  { step: '03', label: 'Architect', icon: Layers, description: 'Design memory, agents, workflows, controls, and the human operating model' },
  { step: '04', label: 'Activate', icon: Zap, description: 'Apply the system to operations, sales, marketing, creation, and delivery' },
  { step: '05', label: 'Productize', icon: Rocket, description: 'Turn new capability into offers, products, niches, and distribution experiments' },
  { step: '06', label: 'Compound', icon: CheckCircle2, description: 'Capture outcomes and decisions so every cycle starts more intelligently' },
]

const proofPoints = [
  { value: '110+', label: 'Solution Designs' },
  { value: '11', label: 'Industry Frameworks' },
  { value: '76', label: 'AI Architect Tools' },
  { value: '23', label: 'Books Published' },
  { value: '6', label: 'Research Portals' },
]

/* ─── Sections ─── */

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-400">AI Architecture Studio · Sovereign Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Turn what only you know
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#AB47C7] via-blue-400 to-[#43BFE3] bg-clip-text text-transparent">
              into what your business can do.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            I help experts and founder-led teams capture their knowledge, judgment, and methods,
            then build an AI-powered operating system around them — so the business can make
            sharper decisions, create stronger work, serve more people, and launch new products.
          </p>

          <div className="flex flex-wrap gap-4">
            <PremiumButton href="#contact" variant="primary" size="lg" glow>
              Design My Advantage
              <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
            <PremiumButton href="/foundry" variant="ghost" size="lg">
              Inspect the Foundry
              <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PositioningSection() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
              The Advantage
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your expertise should become infrastructure.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Personal branding makes expertise visible. Sovereign Intelligence makes it usable.
              It preserves how you think, equips agents to work by your standards, and connects
              that intelligence to the parts of the business where it creates value.
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              Sovereign means the context, memory, agents, and workflows remain under your
              direction. The result is not a generic chatbot or a pile of automations. It is an
              architecture your team can inspect, operate, and improve.
            </p>
          </div>

          <div className="space-y-3">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{audience.title}</h3>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
                    {audience.fit}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IntelligenceSystemSection() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
          One System
        </p>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          One source of truth. Five forms of leverage.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
          Starlight is the intelligence engine. Sovereign Intelligence is the principle. The
          FrankX Foundry is how both become yours — connected to agents, creator workflows,
          business operations, and learning loops.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {intelligenceLayers.map((layer, index) => (
            <div
              key={layer.label}
              className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between">
                <layer.icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                <span className="font-mono text-[10px] text-white/25">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">{layer.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How I Work</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Start with the smallest engagement that can expose real leverage. Build further only
            when the evidence supports it.
          </p>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <motion.div key={s.title} variants={shouldReduceMotion ? {} : fadeUp} custom={i}>
              <GlowCard color={s.color} className="h-full">
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <s.icon className="h-6 w-6 text-white/80" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {s.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{s.description}</p>

                  <ul className="space-y-2 mb-6">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/5">
                    <span className="text-lg font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {s.price}
                    </span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FoundrySection() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-3">
            Beyond Advisory
          </p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
            Build the system. Keep the intelligence.
          </h2>
          <p className="text-white/60 text-base mb-6">
            The FrankX Foundry installs the full architecture — knowledge base, agent harness,
            brand and quality contracts, operating workflows, and compounding business memory —
            derived for your business and kept under your direction. Application-only, with a
            small number of installs per quarter.
          </p>
          <Link
            href="/foundry"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Explore the Foundry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function IndustriesSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Industry Expertise</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Deep domain knowledge across regulated and high-complexity industries.
          </p>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {industries.map((ind, i) => (
            <motion.div key={ind.name} variants={shouldReduceMotion ? {} : fadeUp} custom={i}>
              <div className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300">
                <ind.icon className={`h-8 w-8 ${ind.color} transition-transform duration-300 group-hover:scale-110`} />
                <span className="text-sm font-medium text-slate-300">{ind.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MethodologySection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Methodology</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            From signal to system to scale: six phases that turn hidden expertise into working leverage.
          </p>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methodology.map((m, i) => (
              <motion.div key={m.step} variants={shouldReduceMotion ? {} : fadeUp} custom={i}>
                <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 group">
                  <span className="text-xs font-mono text-slate-500 mb-3">{m.step}</span>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:border-white/20 transition-colors">
                    <m.icon className="h-6 w-6 text-white/70 group-hover:text-white/90 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{m.label}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>

                  {/* Arrow connector for large screens */}
                  {i < methodology.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-slate-600" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProofPointsSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {proofPoints.map((p, i) => (
            <motion.div key={p.label} variants={shouldReduceMotion ? {} : fadeUp} custom={i}>
              <div className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] bg-clip-text text-transparent mb-2">
                  {p.value}
                </div>
                <div className="text-sm text-slate-400">{p.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <section id="contact" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column — info */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Bring the problem you cannot stop thinking about.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Share the business, the expertise, and where you suspect AI could change the
              trajectory. I&apos;ll tell you whether an assessment, a sprint, a Foundry build, or
              no engagement at all is the right next move.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:frank@frankx.ai"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                frank@frankx.ai
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Users className="h-5 w-5" />
                </div>
                LinkedIn
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="h-5 w-5" />
                </div>
                Europe &middot; Remote-first
              </div>
            </div>

            <PremiumButton href="mailto:frank@frankx.ai" variant="primary" size="lg" glow>
              Start a Conversation
              <Calendar className="ml-2 h-5 w-5" />
            </PremiumButton>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlowCard color="violet" className="h-full">
              <form
                action="mailto:frank@frankx.ai"
                method="POST"
                encType="text/plain"
                className="p-6 sm:p-8 space-y-5"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#AB47C7]/40 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#AB47C7]/40 focus:border-transparent transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#AB47C7]/40 focus:border-transparent transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#AB47C7]/40 focus:border-transparent transition-all resize-none"
                    placeholder="What do you know, own, or repeatedly do that should become more valuable with AI?"
                  />
                </div>
                <PremiumButton type="submit" variant="primary" size="lg" className="w-full">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </PremiumButton>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FooterLinksSection() {
  const links = [
    { label: 'Research', href: '/research' },
    { label: 'Books', href: '/books' },
    { label: 'GenCreator', href: '/gencreator' },
    { label: 'Students', href: '/students' },
  ]

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Main ─── */
export default function StudioClient() {
  return (
    <>
      <StudioBackground />
      <main className="relative">
        <HeroSection />
        <PositioningSection />
        <IntelligenceSystemSection />
        <ServicesSection />
        <FoundrySection />
        <IndustriesSection />
        <MethodologySection />
        <ProofPointsSection />
        <ContactSection />
        <FooterLinksSection />
      </main>
    </>
  )
}
