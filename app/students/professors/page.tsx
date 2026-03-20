'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  GraduationCap,
  Presentation,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import { workshopTemplates, syllabusSuggestions } from '@/lib/students/professor-data'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

const formatColors: Record<string, GlowColor> = {
  '2-hour': 'emerald',
  'half-day': 'violet',
  'full-day': 'amber',
}

const formatLabels: Record<string, string> = {
  '2-hour': '2 Hours',
  'half-day': 'Half Day (4h)',
  'full-day': 'Full Day (8h)',
}

function WorkshopCard({ template }: { template: typeof workshopTemplates[0] }) {
  const [expanded, setExpanded] = useState(false)
  const color = formatColors[template.format]

  return (
    <GlowCard color={color} className="!rounded-3xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-white/50">
              {formatLabels[template.format]}
            </span>
            <h3 className="text-lg font-bold text-white">{template.title}</h3>
            <p className="mt-1 text-xs text-white/35">{template.description}</p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mb-4">
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Students will:</h4>
          <ul className="space-y-1.5">
            {template.learningObjectives.map((obj) => (
              <li key={obj} className="flex items-start gap-2 text-xs text-white/50">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/60 transition-colors"
        >
          {expanded ? 'Hide' : 'Show'} full agenda
          <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Agenda (expandable) */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-1.5 border-t border-white/[0.06] pt-4"
          >
            {template.agenda.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2">
                <span className="shrink-0 text-[10px] font-mono text-white/25 w-16">{item.time}</span>
                <span className="flex-1 text-xs text-white/60">{item.activity}</span>
                {item.tool && item.toolHref && (
                  <Link href={item.toolHref} className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium text-white/40 hover:text-white/60 transition-colors">
                    {item.tool}
                  </Link>
                )}
              </div>
            ))}

            {/* Prerequisites */}
            <div className="mt-3 pt-3 border-t border-white/[0.04]">
              <h4 className="mb-1 text-[10px] font-semibold text-white/25">Prerequisites:</h4>
              <ul className="space-y-1">
                {template.prerequisites.map((p) => (
                  <li key={p} className="text-[11px] text-white/30">- {p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </GlowCard>
  )
}

export default function ProfessorsPage() {
  const [copied, setCopied] = useState(false)

  const copyShareLink = () => {
    navigator.clipboard.writeText('https://frankx.ai/students/professors — Free AI workshop toolkit for educators. 3 workshop formats with pre-built agendas using interactive tools. Share with your students.')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#050507]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-amber-600/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-5xl px-5 pb-20 pt-24"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb */}
        <motion.div variants={fadeUp} className="mb-8">
          <Link href="/students" className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors">
            <GraduationCap className="h-3 w-3" />
            Student Hub
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="flex items-start gap-5 mb-6">
            <FrankOmega variant="pointing" size="sm" glow />
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                <Presentation className="h-3 w-3" />
                For Educators
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                AI Workshop Toolkit
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-base text-white/40 leading-relaxed">
            Everything you need to run an AI workshop for your students. Three formats, pre-built agendas, interactive tools, and syllabus suggestions. All free, browser-based, and privacy-first.
          </p>

          {/* Credential strip */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Shield, text: 'Privacy-first — browser only, no student data collected' },
              { icon: Sparkles, text: 'Free — every tool is accessible without accounts' },
              { icon: Users, text: 'Proven — used by an AI architect with 12K+ songs and 90+ articles' },
            ].map((cred) => (
              <div key={cred.text} className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                <cred.icon className="h-3 w-3 text-white/30" />
                <span className="text-[11px] text-white/35">{cred.text}</span>
              </div>
            ))}
          </div>

          {/* Share button */}
          <div className="mt-6">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/50 hover:bg-white/[0.06] transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied share link' : 'Copy share link for colleagues'}
            </button>
          </div>
        </motion.section>

        {/* Workshop Templates */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">Workshop Templates</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Three formats, fully planned</h2>
            <p className="mt-1 text-xs text-white/30">Each agenda links directly to interactive tools. Students follow along in their browsers.</p>
          </div>

          <div className="space-y-4">
            {workshopTemplates.map((template) => (
              <motion.div key={template.id} variants={fadeUp}>
                <WorkshopCard template={template} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Syllabus Suggestions */}
        <motion.section variants={fadeUp} className="mb-14">
          <div className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">Course Design</span>
            <h2 className="mt-1 text-2xl font-bold text-white">Syllabus suggestions</h2>
            <p className="mt-1 text-xs text-white/30">Pre-designed course structures you can adapt for your program.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {syllabusSuggestions.map((syllabus) => (
              <GlowCard key={syllabus.id} color="violet" className="!rounded-2xl">
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <BookOpen className="h-4 w-4 text-white/40" />
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40">{syllabus.weeks} weeks</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{syllabus.title}</h3>
                  <p className="mt-1 text-[11px] text-white/30 leading-relaxed">{syllabus.description}</p>
                  <div className="mt-3 space-y-1.5">
                    {syllabus.modules.map((mod) => (
                      <div key={mod.week} className="flex items-start gap-2 text-[10px]">
                        <span className="shrink-0 text-white/20 w-12">{mod.week}</span>
                        <span className="text-white/40">{mod.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeUp}>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Custom workshop design</h2>
            <p className="text-sm text-white/35 mb-6">
              Need a tailored workshop for your institution? Frank designs custom AI workshops for universities, bootcamps, and corporate teams.
            </p>
            <Link
              href="/coaching"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
            >
              Discuss custom workshop
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.section>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-[11px] font-mono text-white/15">frankx.ai/students/professors · Workshop Toolkit by Frank X. Riemer</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
