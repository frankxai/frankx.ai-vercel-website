'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  FileText,
  GitPullRequest,
  Headphones,
  Loader2,
  MessageSquare,
  Send,
  Workflow,
  X,
} from 'lucide-react'

import { containerVariants, itemVariants } from '@/lib/motion'
import { Surface, Badge, Divider, BulletList } from '@/components/ui/primitives'

// ── Data ──

const installedLanes = [
  {
    title: 'Sales ops',
    description: 'Leads route and get followed up on without waiting on you.',
    icon: <Workflow className="h-3.5 w-3.5 text-emerald-300" />,
  },
  {
    title: 'Support',
    description: 'First response and triage happen before a human touches it.',
    icon: <Headphones className="h-3.5 w-3.5 text-emerald-300" />,
  },
  {
    title: 'Content',
    description: 'Drafts move from brief to review — nobody starts from a blank page.',
    icon: <MessageSquare className="h-3.5 w-3.5 text-emerald-300" />,
  },
  {
    title: 'Delivery',
    description: 'Status updates and handoffs post themselves.',
    icon: <FileText className="h-3.5 w-3.5 text-emerald-300" />,
  },
  {
    title: 'Reporting',
    description: 'The numbers are ready before you ask for them.',
    icon: <BarChart3 className="h-3.5 w-3.5 text-emerald-300" />,
  },
]

const forYouIf = [
  'Work visibly waits on you — approvals, replies, "let me check" moments that block everyone downstream.',
  "You're running €500k–€10m in revenue, usually with a small team or none at all.",
  "You've already tried hiring or another tool for this, and the bottleneck didn't move.",
  'You want to see exactly where the drag is before you commit to fixing it.',
]

const notForYouIf = [
  "You're pre-revenue or still finding what works — this installs onto a running business, it doesn't build one from zero.",
  'You want an AI chatbot bolted onto the same workflow — that’s a feature, not a system.',
  "You need a full team, not a system — Starlight installs and hands over, it doesn't staff a department.",
  "You're not ready to look directly at where work actually breaks — the diagnostic depends on that.",
]

const arcSteps = [
  {
    phase: 'Week 0',
    title: 'The Starlight Intelligence Blueprint',
    description:
      'A paid diagnostic. I map exactly where work waits on you — every approval queue, every decision that routes through your inbox instead of running on its own. You get a written map of the drag before you spend anything on fixing it.',
  },
  {
    phase: 'Weeks 1–2',
    title: 'Install the core lanes',
    description:
      'We stand up the smallest set of agent lanes that clears the highest-drag routing points the Blueprint found — wired into the tools you already use, not a new platform to learn.',
  },
  {
    phase: 'Weeks 3–4',
    title: 'Operating rhythm + handover',
    description:
      'The system runs on its own cadence. You review outputs instead of routing inputs. A handover doc and runbook transfer ownership, so the system is yours — not a subscription you depend on me for.',
  },
]

const REVENUE_BANDS = [
  'Under €500k',
  '€500k – €1m',
  '€1m – €2.5m',
  '€2.5m – €5m',
  '€5m – €10m',
  '€10m+',
] as const

// ── Application form ──

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function ApplicationForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    revenueBand: '',
    blocker: '',
    phone: '', // honeypot — left empty by real applicants
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/blueprint-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setFormState('error')
        return
      }

      setFormState('success')
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">Application received</h3>
        <p className="mx-auto max-w-md text-white/60">
          I read every application myself. Expect a reply within a few business days.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="blueprint-name" className="mb-1.5 block text-sm font-medium text-white/70">
            Name
          </label>
          <input
            id="blueprint-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="blueprint-email" className="mb-1.5 block text-sm font-medium text-white/70">
            Email
          </label>
          <input
            id="blueprint-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="blueprint-company" className="mb-1.5 block text-sm font-medium text-white/70">
            Company
          </label>
          <input
            id="blueprint-company"
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="blueprint-website" className="mb-1.5 block text-sm font-medium text-white/70">
            Website
          </label>
          <input
            id="blueprint-website"
            type="text"
            value={formData.website}
            onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
            placeholder="company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="blueprint-revenue" className="mb-1.5 block text-sm font-medium text-white/70">
          Revenue band
        </label>
        <select
          id="blueprint-revenue"
          required
          value={formData.revenueBand}
          onChange={(e) => setFormData((prev) => ({ ...prev, revenueBand: e.target.value }))}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25 [&>option]:bg-[#131417] [&>option]:text-white"
        >
          <option value="" disabled>
            Select a revenue band
          </option>
          {REVENUE_BANDS.map((band) => (
            <option key={band} value={band}>
              {band}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="blueprint-blocker" className="mb-1.5 block text-sm font-medium text-white/70">
          Where does work currently wait on you?
        </label>
        <textarea
          id="blueprint-blocker"
          required
          rows={4}
          value={formData.blocker}
          onChange={(e) => setFormData((prev) => ({ ...prev, blocker: e.target.value }))}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/25"
          placeholder="Approvals, replies, decisions that only you can make — be specific."
        />
      </div>

      {/* Honeypot — hidden from real users and screen readers, visible to bots that autofill forms */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="blueprint-phone">Leave this field empty</label>
        <input
          id="blueprint-phone"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      {formState === 'error' && (
        <p role="alert" className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-3.5 text-sm font-semibold text-[#04110c] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {formState === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Apply for a Blueprint slot
          </>
        )}
      </button>
    </form>
  )
}

// ── Page ──

export default function AgenticCompanyPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <motion.section
        className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-28"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div variants={itemVariants}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
              Starlight — Agentic Company Program
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-balance text-white md:text-6xl">
              The agentic company,{' '}
              <span className="text-emerald-400">installed in 30 days.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 text-balance md:text-xl">
              For founder-led businesses doing €500k–€10m, where the founder is still the routing
              layer. Starlight installs the minimum intelligence system that increases output
              without adding headcount.
            </p>

            <motion.div className="mt-8 flex flex-wrap items-center gap-4" variants={itemVariants}>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-[#04110c] transition-opacity hover:opacity-90"
              >
                Apply for a Blueprint slot
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-white/50">
                Week 0 is a paid diagnostic — not a call with a slide deck.
              </span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Surface tone="glass" padding="lg" className="border-emerald-500/15">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                  Founder
                </span>
                <ArrowRight className="h-4 w-4 text-white/30" />
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  5 lanes
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-white/55">
                What Weeks 1–2 installs. Illustrative lane set — the Blueprint decides which lanes
                your business actually needs.
              </p>
              <BulletList items={installedLanes} />
            </Surface>
          </motion.div>
        </div>
      </motion.section>

      <Divider tone="subtle" className="mx-auto max-w-6xl" />

      {/* Qualifier */}
      <motion.section
        className="mx-auto max-w-6xl px-6 py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div className="mb-12 max-w-2xl" variants={itemVariants}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
            Who this is for
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Built for the founder who is still the bottleneck.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <Surface tone="base" padding="lg" className="h-full border-emerald-500/15">
              <div className="mb-5 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">This is for you if</h3>
              </div>
              <ul className="space-y-4">
                {forYouIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm leading-relaxed text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Surface tone="base" padding="lg" className="h-full">
              <div className="mb-5 flex items-center gap-2 text-white/50">
                <X className="h-5 w-5" />
                <h3 className="text-lg font-semibold text-white">Not for you if</h3>
              </div>
              <ul className="space-y-4">
                {notForYouIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-white/30" />
                    <span className="text-sm leading-relaxed text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </Surface>
          </motion.div>
        </div>
      </motion.section>

      <Divider tone="subtle" className="mx-auto max-w-6xl" />

      {/* The arc */}
      <motion.section
        className="mx-auto max-w-6xl px-6 py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div className="mb-12 max-w-2xl" variants={itemVariants}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
            How it installs
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            The Starlight Intelligence Blueprint
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {arcSteps.map((step, index) => (
            <motion.div key={step.phase} variants={itemVariants}>
              <Surface tone="base" padding="lg" className="h-full">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-4xl font-bold text-white/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Badge variant={index === 0 ? 'success' : 'info'} size="sm">
                    {step.phase}
                  </Badge>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{step.description}</p>
              </Surface>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Divider tone="subtle" className="mx-auto max-w-6xl" />

      {/* Proof strip */}
      <motion.section
        className="mx-auto max-w-4xl px-6 py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Surface tone="highlight" padding="lg">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <GitPullRequest className="h-5 w-5" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                How this page got built
              </span>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              This page was built by the system it sells.
            </h2>
            <p className="text-base leading-relaxed text-white/70">
              That&apos;s not a metaphor. I run one operating registry — 93 repos under active
              management as of this writing — and this offer installs a version of that same
              system into your business. This exact page was scaffolded end-to-end by a Claude
              Code agent working from a written brief, on its own branch (
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-cyan-300">
                agent/claude/agentic-company-offer
              </code>
              ), shipped as a pull request for me to review before it went live. No agency, no dev
              team — one founder and a fleet of agents that write, test, and ship code under
              review.
            </p>
          </Surface>
        </motion.div>
      </motion.section>

      {/* Apply */}
      <motion.section
        id="apply"
        className="mx-auto max-w-4xl px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Surface tone="glass" padding="lg" className="sm:p-12">
            <div className="mb-8 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Apply
              </span>
              <h2 className="mt-3 mb-4 text-3xl font-bold text-white md:text-4xl">
                Apply for a Blueprint slot
              </h2>
              <p className="mx-auto mb-2 max-w-lg text-base leading-relaxed text-white/65">
                Tell me where work currently waits on you. I review every application personally.
              </p>
              <p className="mx-auto max-w-lg text-sm text-white/45">
                Pricing isn&apos;t listed here. The Blueprint is scoped and quoted on the call,
                based on what the diagnostic finds — not a flat package price.
              </p>
            </div>

            <ApplicationForm />
          </Surface>
        </motion.div>
      </motion.section>

      {/* Disclosure */}
      <div className="mx-auto max-w-4xl px-6 pb-16">
        <p className="text-center text-xs text-white/35">
          Written with AI assistance (Claude Code); reviewed and edited by Frank before
          publishing.
        </p>
      </div>
    </div>
  )
}
