'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  Clock,
  Cpu,
  FileText,
  Flame,
  LayoutDashboard,
  MessageSquare,
  Mic,
  Monitor,
  Music,
  Scissors,
  Share2,
  Sparkles,
  Upload,
  Video,
  Zap,
} from 'lucide-react'
import calendarData from '@/data/video-creation-calendar.json'

/* ─── Animation Presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
}

/* ─── Pillar Config ─── */
const pillars = [
  {
    id: 'ai-architecture',
    name: 'AI Architecture',
    description:
      'Enterprise AI tutorials, multi-agent patterns, production system walkthroughs. Deep technical content that establishes authority.',
    cadence: '1x/week',
    icon: Cpu,
    color: 'from-emerald-400 to-cyan-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
  {
    id: 'music-production',
    name: 'Music Production',
    description:
      'AI music creation with Suno, prompt engineering for audio, genre-specific production techniques. Creative meets technical.',
    cadence: '1x/2 weeks',
    icon: Music,
    color: 'from-violet-400 to-pink-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    badge: 'bg-violet-500/20 text-violet-300',
  },
  {
    id: 'creator-tools',
    name: 'Creator Tools & ACOS',
    description:
      'Claude Code workflows, ACOS demos, MCP servers, developer tooling. Practical how-tos that drive product adoption.',
    cadence: '1x/week',
    icon: Zap,
    color: 'from-cyan-400 to-blue-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    badge: 'bg-cyan-500/20 text-cyan-300',
  },
  {
    id: 'opinion',
    name: 'Opinion & Analysis',
    description:
      'Industry hot takes, trend analysis, builder thesis arguments. Short-form thought leadership that sparks discussion.',
    cadence: '1x/2 weeks',
    icon: MessageSquare,
    color: 'from-amber-400 to-orange-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  {
    id: 'shorts',
    name: 'Shorts & Clips',
    description:
      'Sub-60s clips, reaction cuts, rapid demos. Algorithm fuel for discovery. Repurpose long-form or create original hooks.',
    cadence: '2x/week',
    icon: Scissors,
    color: 'from-pink-400 to-rose-400',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/5',
    badge: 'bg-pink-500/20 text-pink-300',
  },
]

/* ─── Pillar Badge Colors for Calendar ─── */
const pillarBadgeMap: Record<string, string> = {
  'ai-architecture': 'bg-emerald-500/20 text-emerald-300',
  'music-production': 'bg-violet-500/20 text-violet-300',
  'creator-tools': 'bg-cyan-500/20 text-cyan-300',
  opinion: 'bg-amber-500/20 text-amber-300',
  shorts: 'bg-pink-500/20 text-pink-300',
}

const statusConfig: Record<string, { label: string; color: string }> = {
  idea: { label: 'Idea', color: 'bg-white/20' },
  scripted: { label: 'Scripted', color: 'bg-cyan-500' },
  recording: { label: 'Recording', color: 'bg-amber-500 animate-pulse' },
  editing: { label: 'Editing', color: 'bg-violet-500' },
  ready: { label: 'Ready', color: 'bg-emerald-500' },
  published: { label: 'Published', color: 'bg-emerald-400' },
}

/* ─── Script Templates ─── */
const templates = [
  {
    id: 'tutorial',
    title: 'Tutorial / Deep Dive',
    duration: '~15 min',
    wordCount: '~2,000 words',
    icon: BookOpen,
    color: 'text-emerald-400',
    sections: [
      { name: 'Hook', words: '100', time: '30s', description: 'Pattern interrupt. State the problem. Preview the payoff.' },
      { name: 'Context / Why This Matters', words: '200', time: '1.5min', description: 'Industry context, personal experience, stakes.' },
      { name: 'Core Tutorial (3-5 steps)', words: '1,200', time: '9min', description: 'Step-by-step walkthrough. Screen recording + voiceover. Each step: show, explain, result.' },
      { name: 'Common Mistakes', words: '200', time: '1.5min', description: 'What most people get wrong. Adds authority and saves viewer time.' },
      { name: 'Recap + Next Steps', words: '150', time: '1min', description: 'Summarize key takeaways. Link to next video or resource.' },
      { name: 'CTA', words: '50', time: '30s', description: 'Subscribe, comment prompt, link to blog post or product.' },
    ],
  },
  {
    id: 'reaction',
    title: 'Reaction / Analysis',
    duration: '~8 min',
    wordCount: '~1,000 words',
    icon: Flame,
    color: 'text-amber-400',
    sections: [
      { name: 'Hook + Hot Take', words: '80', time: '30s', description: 'Strong opening opinion. Controversial or surprising angle.' },
      { name: 'Context / Source Material', words: '150', time: '1min', description: 'What prompted this. News, announcement, trend, or data point.' },
      { name: 'Analysis (3 points)', words: '500', time: '4min', description: 'Break down why this matters. Each point: claim, evidence, implication.' },
      { name: 'What This Means for Builders', words: '200', time: '1.5min', description: 'Practical takeaway. How should the audience respond or adapt?' },
      { name: 'Closing + CTA', words: '70', time: '30s', description: 'Restate thesis. Ask for engagement. Tease next video.' },
    ],
  },
  {
    id: 'short',
    title: 'Short / Clip',
    duration: '~60 sec',
    wordCount: '~150 words',
    icon: Scissors,
    color: 'text-pink-400',
    sections: [
      { name: 'Hook', words: '20', time: '5s', description: 'Stop the scroll. One sentence that demands attention.' },
      { name: 'Core Point', words: '80', time: '30s', description: 'One insight, one demo, one result. Dense and visual.' },
      { name: 'Proof / Result', words: '30', time: '15s', description: 'Show the output. Screenshot, metric, before/after.' },
      { name: 'CTA', words: '20', time: '10s', description: 'Follow for more. Link to full video. Simple and direct.' },
    ],
  },
]

/* ─── Production Checklist ─── */
interface ChecklistItem {
  id: string
  label: string
}

interface ChecklistPhase {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  items: ChecklistItem[]
}

const phases: ChecklistPhase[] = [
  {
    id: 'pre',
    name: 'Pre-Production',
    icon: FileText,
    color: 'text-cyan-400',
    items: [
      { id: 'pre-1', label: 'Script written and reviewed' },
      { id: 'pre-2', label: 'Thumbnail designed (1280x720, high contrast)' },
      { id: 'pre-3', label: 'Title + description drafted (SEO keywords)' },
      { id: 'pre-4', label: 'Equipment check (mic, camera, lighting)' },
      { id: 'pre-5', label: 'Screen recording software configured' },
      { id: 'pre-6', label: 'Demo environment prepared (clean desktop, dark theme)' },
    ],
  },
  {
    id: 'rec',
    name: 'Recording',
    icon: Mic,
    color: 'text-emerald-400',
    items: [
      { id: 'rec-1', label: 'Audio levels tested (-12 to -6 dB)' },
      { id: 'rec-2', label: 'Camera framed and focused' },
      { id: 'rec-3', label: 'Intro/hook recorded first' },
      { id: 'rec-4', label: 'Main content captured' },
      { id: 'rec-5', label: 'B-roll and screen recordings captured' },
      { id: 'rec-6', label: 'Backup copy of all raw files' },
    ],
  },
  {
    id: 'post',
    name: 'Post-Production',
    icon: Monitor,
    color: 'text-violet-400',
    items: [
      { id: 'post-1', label: 'Rough cut assembled' },
      { id: 'post-2', label: 'Audio cleaned and normalized' },
      { id: 'post-3', label: 'Jump cuts and dead air removed' },
      { id: 'post-4', label: 'Lower thirds and callouts added' },
      { id: 'post-5', label: 'Chapter timestamps defined' },
      { id: 'post-6', label: 'End screen and cards configured' },
      { id: 'post-7', label: 'Final export (1080p min, 4K preferred)' },
    ],
  },
  {
    id: 'pub',
    name: 'Publishing',
    icon: Upload,
    color: 'text-amber-400',
    items: [
      { id: 'pub-1', label: 'Upload to YouTube (unlisted first)' },
      { id: 'pub-2', label: 'Title, description, tags finalized' },
      { id: 'pub-3', label: 'Custom thumbnail uploaded' },
      { id: 'pub-4', label: 'Cards and end screens added' },
      { id: 'pub-5', label: 'Schedule publish time (optimal: Tue/Thu 9am ET)' },
      { id: 'pub-6', label: 'Cross-post to X, LinkedIn, newsletter' },
      { id: 'pub-7', label: 'Blog post linked or created' },
    ],
  },
]

/* ─── Component ─── */
export default function VideoCreationClient() {
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleTemplate = (id: string) => {
    setExpandedTemplate((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-16">
      {/* ═══════════════ Header ═══════════════ */}
      <motion.div {...fadeUp}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/70">
                  Track 3 — Video Intelligence
                </p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Video Creation Strategy
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
              Production calendar, script templates, and publishing workflows for the
              FrankX YouTube channel. Private strategy dashboard.
            </p>
          </div>
          <Link
            href="/admin/youtube"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            YouTube Admin
            <ArrowUpRight className="h-3 w-3 opacity-50" />
          </Link>
        </div>
      </motion.div>

      {/* ═══════════════ Section 1: Strategy Overview ═══════════════ */}
      <motion.section {...fadeUp}>
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Content Pillars</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              className={`rounded-2xl border ${pillar.border} ${pillar.bg} p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]`}
              {...stagger}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.color} text-white`}
              >
                <pillar.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">
                {pillar.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                {pillar.description}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/35">
                <Clock className="h-3 w-3" />
                {pillar.cadence}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════ Section 2: Content Calendar ═══════════════ */}
      <motion.section {...fadeUp}>
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">
            4-Week Production Calendar
          </h2>
        </div>
        <div className="space-y-6">
          {calendarData.weeks.map((week, wi) => (
            <motion.div
              key={week.weekOf}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm sm:p-6"
              {...stagger}
              transition={{ duration: 0.5, delay: wi * 0.08 }}
            >
              <div className="mb-4 flex flex-wrap items-baseline gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {week.label}
                </h3>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-white/40">
                  {week.theme}
                </span>
              </div>
              <div className="space-y-3">
                {week.slots.map((slot) => {
                  const status = statusConfig[slot.status] || statusConfig.idea
                  const badge = pillarBadgeMap[slot.pillar] || 'bg-white/10 text-white/60'
                  const pillarLabel =
                    (calendarData.pillars as Record<string, { label: string }>)[slot.pillar]?.label || slot.pillar
                  return (
                    <div
                      key={`${slot.date}-${slot.title}`}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3"
                    >
                      <span className="font-mono text-xs text-white/30">
                        {slot.date}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge}`}
                      >
                        {pillarLabel}
                      </span>
                      <span className="flex-1 text-sm text-white/80">
                        {slot.title}
                      </span>
                      <div className="flex items-center gap-2">
                        {slot.duration && (
                          <span className="flex items-center gap-1 text-xs text-white/30">
                            <Clock className="h-3 w-3" />
                            {slot.duration}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-xs text-white/50">
                          <span
                            className={`h-2 w-2 rounded-full ${status.color}`}
                          />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════ Section 3: Script Templates ═══════════════ */}
      <motion.section {...fadeUp}>
        <div className="mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-violet-400" />
          <h2 className="text-xl font-semibold text-white">Script Templates</h2>
        </div>
        <div className="space-y-4">
          {templates.map((tpl, ti) => {
            const isOpen = expandedTemplate === tpl.id
            return (
              <motion.div
                key={tpl.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/[0.1]"
                {...stagger}
                transition={{ duration: 0.5, delay: ti * 0.06 }}
              >
                <button
                  onClick={() => toggleTemplate(tpl.id)}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${tpl.color}`}
                  >
                    <tpl.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">
                      {tpl.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tpl.duration}
                      </span>
                      <span>{tpl.wordCount}</span>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 text-white/30" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-white/30" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.04] px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <div className="space-y-3">
                      {tpl.sections.map((sec, si) => (
                        <div
                          key={si}
                          className="flex gap-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-4"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-xs font-bold text-white/40">
                            {si + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-baseline gap-3">
                              <h4 className="text-sm font-semibold text-white/90">
                                {sec.name}
                              </h4>
                              <div className="flex gap-2 text-xs text-white/30">
                                <span>{sec.words} words</span>
                                <span>|</span>
                                <span>{sec.time}</span>
                              </div>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-white/45">
                              {sec.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ═══════════════ Section 4: Production Checklist ═══════════════ */}
      <motion.section {...fadeUp}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clapperboard className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">
              Production Checklist
            </h2>
          </div>
          <span className="text-xs text-white/30">
            {checkedItems.size} /{' '}
            {phases.reduce((sum, p) => sum + p.items.length, 0)} completed
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {phases.map((phase, pi) => {
            const phaseChecked = phase.items.filter((it) =>
              checkedItems.has(it.id)
            ).length
            const phaseTotal = phase.items.length
            return (
              <motion.div
                key={phase.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm sm:p-6"
                {...stagger}
                transition={{ duration: 0.5, delay: pi * 0.08 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <phase.icon className={`h-4 w-4 ${phase.color}`} />
                    <h3 className="text-sm font-semibold text-white">
                      {phase.name}
                    </h3>
                  </div>
                  <span className="text-xs text-white/30">
                    {phaseChecked}/{phaseTotal}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mb-4 h-1 rounded-full bg-white/[0.06]">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                    style={{
                      width: `${phaseTotal > 0 ? (phaseChecked / phaseTotal) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="space-y-2">
                  {phase.items.map((item) => {
                    const isChecked = checkedItems.has(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="flex w-full items-start gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/[0.03]"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            isChecked
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isChecked && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </span>
                        <span
                          className={`text-xs leading-relaxed transition-colors ${
                            isChecked
                              ? 'text-white/30 line-through'
                              : 'text-white/60'
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ═══════════════ Section 5: Analytics Placeholder ═══════════════ */}
      <motion.section {...fadeUp}>
        <div className="mb-6 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">
            Analytics Dashboard
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <LayoutDashboard className="h-8 w-8 text-white/20" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white/80">
              YouTube Analytics Dashboard
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/40">
              Coming with YouTube Data API v3 integration. Track views,
              subscribers, watch time, and engagement across all content pillars.
            </p>

            {/* Placeholder chart area */}
            <div className="mt-8 w-full max-w-2xl">
              <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6">
                <div className="mb-4 flex items-center justify-between text-xs text-white/25">
                  <span>Views / Week</span>
                  <span>Last 12 Weeks</span>
                </div>
                <div className="flex items-end justify-between gap-2">
                  {[20, 35, 28, 42, 55, 48, 62, 75, 68, 85, 92, 100].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/30 to-cyan-500/20"
                        style={{ height: `${h}px` }}
                      />
                    )
                  )}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-white/15">
                  <span>W1</span>
                  <span>W6</span>
                  <span>W12</span>
                </div>
              </div>
            </div>

            {/* Placeholder metric cards */}
            <div className="mt-6 grid w-full max-w-2xl grid-cols-4 gap-3">
              {[
                { label: 'Subscribers', value: '---' },
                { label: 'Total Views', value: '---' },
                { label: 'Watch Time (hrs)', value: '---' },
                { label: 'Avg. CTR', value: '---' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center"
                >
                  <p className="text-lg font-bold text-white/20">{m.value}</p>
                  <p className="mt-1 text-[10px] text-white/25">{m.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-white/25">
              Integration requires{' '}
              <code className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-emerald-400/60">
                YOUTUBE_API_KEY
              </code>{' '}
              and OAuth consent screen setup
            </p>
          </div>
        </div>
      </motion.section>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  )
}
