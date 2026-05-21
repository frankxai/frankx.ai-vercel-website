'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Rocket,
  Code,
  Paintbrush,
  Users,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Brain,
  Heart,
  Star,
  BookOpen,
  Globe,
  Award,
} from 'lucide-react'

// ============================================================================
// AURORA BACKGROUND (matches students/page.tsx)
// ============================================================================

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />

      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[40%] h-[40%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
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
// CONFETTI EFFECT
// ============================================================================

function ConfettiPiece({ delay }: { delay: number }) {
  const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const left = Math.random() * 100
  const rotation = Math.random() * 360
  const size = 6 + Math.random() * 8

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10px',
        width: size,
        height: size * 0.4,
        backgroundColor: color,
        borderRadius: 2,
      }}
      initial={{ y: 0, rotate: 0, opacity: 1 }}
      animate={{
        y: [0, 600 + Math.random() * 400],
        rotate: [rotation, rotation + 720 + Math.random() * 720],
        opacity: [1, 1, 0],
        x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 300],
      }}
      transition={{
        duration: 2.5 + Math.random() * 1.5,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.03} />
      ))}
    </div>
  )
}

// ============================================================================
// FAQ ACCORDION ITEM
// ============================================================================

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className="border border-white/10 rounded-xl overflow-hidden"
      initial={false}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-white/50 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================================================
// DATA
// ============================================================================

const tracks = [
  {
    icon: Code,
    title: 'Portfolio Builder',
    subtitle: 'Ship an AI-powered portfolio project',
    description: 'Build a real project that demonstrates your AI skills. From concept to deployed product — something you can show employers, clients, or collaborators.',
    highlights: ['Deployed on Vercel or similar', 'Code on GitHub', 'Case study write-up'],
    color: 'cyan',
  },
  {
    icon: Rocket,
    title: 'Product Launcher',
    subtitle: 'Build and launch a real AI product',
    description: 'Go beyond a portfolio piece. Build something people actually use — a tool, a SaaS, an API. Ship it and get your first users during the cohort.',
    highlights: ['Live product with users', 'Landing page', 'Launch on Product Hunt or similar'],
    color: 'violet',
  },
  {
    icon: Paintbrush,
    title: 'Creator & Community',
    subtitle: 'Create content, build audience',
    description: 'Document your AI journey publicly. Write, record, or stream. Build an audience while you learn — the most underrated career accelerator.',
    highlights: ['Content series published', 'Audience growth strategy', 'Personal brand established'],
    color: 'emerald',
  },
]

const weeks = [
  {
    number: 1,
    title: 'Foundation',
    description: 'AI tools, personal brand, project kickoff',
    details: [
      'Set up your AI toolkit (Claude, Cursor, v0, GitHub)',
      'Define your project scope and success criteria',
      'Create your personal brand positioning',
      'First public post about your journey',
    ],
    color: 'cyan',
  },
  {
    number: 2,
    title: 'Build',
    description: 'Architecture, implementation, daily progress',
    details: [
      'System architecture and technical decisions',
      'Core feature implementation with AI pair-programming',
      'Daily progress updates in the cohort channel',
      'Peer code reviews and feedback',
    ],
    color: 'violet',
  },
  {
    number: 3,
    title: 'Polish',
    description: 'Testing, design, documentation, content creation',
    details: [
      'UI/UX polish and responsive design',
      'Testing and bug fixes',
      'Documentation and README',
      'Create content about what you built and learned',
    ],
    color: 'emerald',
  },
  {
    number: 4,
    title: 'Ship & Present',
    description: 'Demo day, showcase, graduation',
    details: [
      'Final deployment and production readiness',
      'Prepare your 5-minute demo presentation',
      'Demo Day — present to the cohort and guests',
      'Graduation, certificates, and recommendations',
    ],
    color: 'amber',
  },
]

const benefits = [
  { icon: Brain, title: 'Direct mentorship from AI Architect', description: 'Weekly group sessions + async feedback from someone who builds AI systems professionally.' },
  { icon: Rocket, title: 'A shipped project for your portfolio', description: 'Not a tutorial project — a real thing you designed, built, and deployed.' },
  { icon: Award, title: 'Certificate of completion', description: 'Signed certificate recognizing your 4-week build sprint.' },
  { icon: Star, title: 'Recommendation potential', description: 'Outstanding builders get personal recommendations from Frank.' },
  { icon: BookOpen, title: 'Access to GenCreator framework', description: 'The same AI-powered creation framework used across frankx.ai.' },
  { icon: Users, title: 'Alumni network (43 other builders)', description: 'Join a tight-knit community of motivated builders who shipped together.' },
  { icon: Globe, title: 'Featured on frankx.ai', description: 'Excellent projects get showcased on the website — real visibility.' },
]

const faqs = [
  { q: 'Is it really free?', a: 'Yes. Completely free. No hidden fees, no upsells. We believe in giving first. The best way to build a community is to genuinely help people succeed.' },
  { q: 'What skills do I need?', a: 'Basic coding or design experience. You should be comfortable with HTML/CSS at minimum, or have design tool experience. AI skills will be taught — that\'s the whole point.' },
  { q: 'What\'s the time commitment?', a: '5-10 hours per week for 4 weeks. The minimum is 5 hours — enough for weekly sessions, building, and one content piece. More ambitious builders typically invest 8-10 hours.' },
  { q: 'Will I get a job from this?', a: 'We provide mentorship, portfolio projects, and recommendations — not job placement. That said, a shipped AI project with a recommendation from an AI Architect is a powerful signal to employers.' },
  { q: 'What tools will we use?', a: 'Claude, ChatGPT, Cursor, v0, Vercel, and GitHub. All free-tier friendly. You\'ll learn to use AI as a true development partner, not just a chatbot.' },
  { q: 'Can I do this remotely?', a: 'Yes, 100% online. Async-first with scheduled weekly live sessions. We\'ll use Discord for daily communication and collaboration.' },
]

// ============================================================================
// COLOR UTILITIES
// ============================================================================

const colorStyles: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: { border: 'border-cyan-500/20 hover:border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'rgba(6, 182, 212, 0.15)' },
  violet: { border: 'border-violet-500/20 hover:border-violet-500/40', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'rgba(139, 92, 246, 0.15)' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'rgba(16, 185, 129, 0.15)' },
  amber: { border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.15)' },
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CohortClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    track: '',
    projectIdea: '',
    whyYou: '',
    commitTime: false,
    commitContent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/cohort/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      setSubmitted(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.track && formData.projectIdea && formData.whyYou && formData.commitTime && formData.commitContent

  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />
      {showConfetti && <Confetti />}

      <div className="relative z-10">

        {/* ================================================================ */}
        {/* HERO */}
        {/* ================================================================ */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Urgency badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span className="text-sm font-medium text-amber-400">
                  Batch 1 — Limited to 44 Builders
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                AI Creator
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400">
                  Accelerator
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-4 leading-relaxed font-light">
                4 Weeks. Build Something Real. Ship It.
              </p>

              <p className="text-white/40 max-w-xl mb-10 leading-relaxed">
                A free, intensive cohort for builders who want to create with AI — mentored by an AI Architect
                with enterprise experience across 8+ industries.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { value: '4', label: 'Weeks' },
                  { value: '44', label: 'Builders Max' },
                  { value: 'Free', label: 'Always' },
                  { value: '100%', label: 'Remote' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Free. Apply Now.
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* WHAT YOU'LL BUILD — 3 TRACKS */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70 mb-3">
                Choose Your Path
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What You&apos;ll Build
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {tracks.map((track, i) => {
                const colors = colorStyles[track.color]
                return (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -4, boxShadow: `0 20px 60px ${colors.glow}` }}
                    className={`relative p-6 rounded-2xl border ${colors.border} bg-white/[0.02] backdrop-blur-sm transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                      <track.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{track.title}</h3>
                    <p className={`text-sm ${colors.text} mb-3`}>{track.subtitle}</p>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{track.description}</p>
                    <ul className="space-y-2">
                      {track.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-white/50">
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* THE PROGRAM — WEEKLY TIMELINE */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-3">
                The Journey
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                4 Weeks to Ship
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-violet-500/40 to-emerald-500/40" />

              <div className="space-y-12">
                {weeks.map((week, i) => {
                  const colors = colorStyles[week.color]
                  const isLeft = i % 2 === 0

                  return (
                    <motion.div
                      key={week.number}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Node */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                        <div className={`w-12 h-12 rounded-full ${colors.bg} border-2 border-[#0a0a0b] flex items-center justify-center`}>
                          <span className={`text-sm font-bold ${colors.text}`}>{week.number}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} mb-2`}>
                          Week {week.number}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{week.title}</h3>
                        <p className="text-white/40 text-sm mb-3">{week.description}</p>
                        <ul className={`space-y-1.5 ${isLeft ? 'md:ml-auto' : ''}`}>
                          {week.details.map((d) => (
                            <li key={d} className={`flex items-start gap-2 text-sm text-white/50 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                              <Calendar className={`w-3.5 h-3.5 ${colors.text} mt-0.5 flex-shrink-0`} />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Spacer for opposite side */}
                      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* YOUR MENTOR */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/70 mb-3">
                Who&apos;s Teaching
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Your Mentor
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                {/* Glow effect */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 blur-sm -z-10" />

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400">FR</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-1">Frank Riemer</h3>
                    <p className="text-cyan-400 text-sm font-medium mb-4">AI Architect | FrankX</p>
                    <p className="text-white/50 leading-relaxed mb-6">
                      I design AI systems for enterprises across 8+ industries. I&apos;ve written 23 books on AI,
                      built 76 AI architect tools, and created 6 research portals. Now I want to help the next
                      generation of builders ship real things with AI.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { value: '8+', label: 'Industries' },
                        { value: '23', label: 'Books' },
                        { value: '76', label: 'AI Tools' },
                        { value: '6', label: 'Research Portals' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* WHAT YOU GET */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/70 mb-3">
                The Value
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What You Get
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-5 rounded-xl border border-white/[0.06] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <benefit.icon className="w-5 h-5 text-cyan-400 mb-3" />
                  <h3 className="text-white font-semibold mb-1 text-sm">{benefit.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* APPLICATION FORM */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5" ref={formRef} id="apply">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/70 mb-3">
                Join Batch 1
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Apply Now
              </h2>
              <p className="text-white/40 mt-3 max-w-lg mx-auto">
                44 spots. We review every application personally. Decisions within 48 hours.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">Application Received</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md mx-auto">
                      We&apos;ll review your application and get back to you within 48 hours.
                      Check your email for a confirmation.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2 text-emerald-400/60 text-sm">
                      <Heart className="w-4 h-4" />
                      <span>Welcome to the builder community</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors"
                        placeholder="https://linkedin.com/in/you"
                      />
                    </div>

                    {/* Track Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-3">Choose Your Track</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { value: 'portfolio', label: 'Portfolio Builder', icon: Code },
                          { value: 'product', label: 'Product Launcher', icon: Rocket },
                          { value: 'creator', label: 'Creator & Community', icon: Paintbrush },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                              formData.track === option.value
                                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                                : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="track"
                              value={option.value}
                              checked={formData.track === option.value}
                              onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                              className="sr-only"
                            />
                            <option.icon className="w-5 h-5" />
                            <span className="text-sm font-medium text-center">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Project Idea */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">What do you want to build?</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.projectIdea}
                        onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors resize-none"
                        placeholder="Describe your project idea in 2-3 sentences..."
                      />
                    </div>

                    {/* Why You */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Why should we pick you?</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.whyYou}
                        onChange={(e) => setFormData({ ...formData, whyYou: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-colors resize-none"
                        placeholder="What makes you a great fit for this cohort?"
                      />
                    </div>

                    {/* Commitments */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.commitTime}
                            onChange={(e) => setFormData({ ...formData, commitTime: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-md border border-white/20 bg-white/[0.04] peer-checked:bg-cyan-500/20 peer-checked:border-cyan-500/50 transition-colors flex items-center justify-center">
                            {formData.commitTime && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                          </div>
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                          I can commit 5+ hours/week for 4 weeks
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.commitContent}
                            onChange={(e) => setFormData({ ...formData, commitContent: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-md border border-white/20 bg-white/[0.04] peer-checked:bg-cyan-500/20 peer-checked:border-cyan-500/50 transition-colors flex items-center justify-center">
                            {formData.commitContent && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                          </div>
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                          I will create at least 1 public content piece about the experience
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!isFormValid || submitting}
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isFormValid && !submitting
                          ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] cursor-pointer'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                      whileHover={isFormValid && !submitting ? { scale: 1.01 } : {}}
                      whileTap={isFormValid && !submitting ? { scale: 0.99 } : {}}
                    >
                      {submitting ? 'Submitting...' : 'Apply for Batch 1'}
                    </motion.button>

                    {error && (
                      <p className="text-center text-sm text-red-400 bg-red-400/10 rounded-lg py-2 px-4">
                        {error}
                      </p>
                    )}

                    <p className="text-center text-xs text-white/30">
                      Your application is sent directly to Frank for review.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FAQ */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400/70 mb-3">
                Questions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Frequently Asked
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FAQItem
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FINAL CTA */}
        {/* ================================================================ */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to build?
              </h2>
              <p className="text-white/40 max-w-md mx-auto mb-8">
                44 spots. Free. 4 weeks. The only requirement is that you actually ship.
              </p>
              <motion.button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply for Batch 1
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FOOTER */}
        {/* ================================================================ */}
        <footer className="py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-white/30 text-sm">
                A{' '}
                <Link href="/" className="text-white/50 hover:text-white transition-colors underline underline-offset-2">
                  FrankX
                </Link>{' '}
                initiative
              </p>
              <div className="flex items-center gap-6">
                {[
                  { href: '/gencreator', label: 'GenCreator' },
                  { href: '/students', label: 'Students' },
                  { href: '/books', label: 'Books' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/30 hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}
