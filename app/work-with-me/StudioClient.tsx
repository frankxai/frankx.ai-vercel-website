'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
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
    title: 'AI Architecture Assessment',
    duration: '1 — 2 days',
    price: 'From EUR 3,000',
    icon: Target,
    color: 'violet' as const,
    description:
      'Comprehensive review of your current AI landscape, infrastructure readiness, and strategic alignment. Delivered with a prioritized roadmap.',
    deliverables: ['Current-state analysis', 'Gap assessment', 'Prioritized roadmap', 'Executive summary'],
  },
  {
    title: 'Architecture Sprint',
    duration: '1 — 2 weeks',
    price: 'From EUR 8,000',
    icon: Layers,
    color: 'cyan' as const,
    description:
      'End-to-end solution architecture for a specific AI use case. Includes technology selection, cost modeling, and production-ready design.',
    deliverables: ['Solution architecture', 'Technology selection', 'Cost model', 'Implementation plan'],
  },
  {
    title: 'AI Practice Builder',
    duration: '4 — 8 weeks',
    price: 'From EUR 25,000',
    icon: Building2,
    color: 'emerald' as const,
    description:
      'Build your internal AI Center of Excellence. Governance frameworks, reusable patterns, team enablement, and toolchain configuration.',
    deliverables: ['Governance framework', 'Pattern library', 'Team training', 'Toolchain setup'],
  },
  {
    title: 'Architecture Partner',
    duration: 'Monthly',
    price: 'From EUR 3,000/mo',
    icon: Shield,
    color: 'amber' as const,
    description:
      'Ongoing AI architecture partnership. Architecture reviews, design sessions, team coaching, and strategic guidance — like having a fractional AI Architect on your team.',
    deliverables: ['Architecture reviews', 'Design sessions', 'Team coaching', 'Strategic guidance'],
  },
  {
    title: 'AI Strategy Session',
    duration: '1 day',
    price: 'From EUR 5,000',
    icon: Lightbulb,
    color: 'rose' as const,
    description:
      'Hands-on workshop for leadership teams. Demystify AI, identify high-value use cases, and align on an actionable AI strategy.',
    deliverables: ['AI landscape briefing', 'Use case identification', 'Strategy alignment', 'Action plan'],
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
  { step: '01', label: 'Discover', icon: Microscope, description: 'Understand the landscape, stakeholders, and constraints' },
  { step: '02', label: 'Architect', icon: Layers, description: 'Design the solution with validated patterns and pricing' },
  { step: '03', label: 'Visualize', icon: Sparkles, description: 'Communicate through architecture diagrams and prototypes' },
  { step: '04', label: 'Prototype', icon: Rocket, description: 'Build working proof-of-concepts that demonstrate value' },
  { step: '05', label: 'Deliver', icon: CheckCircle2, description: 'Hand over production-ready designs and documentation' },
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
            <span className="text-sm text-slate-400">Open to build together</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AI Architecture
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#AB47C7] via-blue-400 to-[#43BFE3] bg-clip-text text-transparent">
              Studio
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            I architect AI systems, coach builders, and create what doesn&apos;t exist yet.
            <br className="hidden sm:block" />
            GenAI, RAG, Agentic AI, and Cloud-Native architectures.
          </p>

          <div className="flex flex-wrap gap-4">
            <PremiumButton href="#contact" variant="primary" size="lg" glow>
              Let&apos;s Build Something
              <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
            <PremiumButton href="/research" variant="ghost" size="lg">
              View Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </PremiumButton>
          </div>
        </motion.div>
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
            Focused engagements designed to move your AI ambitions from vision to production.
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
            A proven five-phase approach refined across 110+ solution designs.
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
              Let&apos;s Build Something Great
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Every engagement starts with a conversation. Share your challenge, and
              I&apos;ll outline how we can solve it together.
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
                href="https://linkedin.com/in/frankriemer"
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
                    placeholder="Describe your AI challenge or project..."
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
        <ServicesSection />
        <IndustriesSection />
        <MethodologySection />
        <ProofPointsSection />
        <ContactSection />
        <FooterLinksSection />
      </main>
    </>
  )
}
