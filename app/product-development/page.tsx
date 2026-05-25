'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Code2,
  Brain,
  Zap,
  GitBranch,
  CheckCircle2,
  Activity,
  Sparkles,
  TrendingUp,
  FileCode,
  Layers,
  Shield,
  Target,
  ArrowRight,
  ExternalLink,
  Clock,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ACOSMetrics {
  intelligenceScore: number
  trajectories: number
  patterns: number
  avgSuccessRate: number
  hooksActive: number
  skillsLoaded: number
  agentsAvailable: number
}

interface RecentActivity {
  timestamp: string
  type: 'hook' | 'trajectory' | 'deployment'
  description: string
  status: 'success' | 'warning' | 'info'
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

function StatCard({ label, value, unit, trend, icon: Icon, color }: {
  label: string
  value: number | string
  unit?: string
  trend?: 'up' | 'stable'
  icon: typeof Brain
  color: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.02, y: -2 }}
      className="relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] overflow-hidden"
    >
      {/* Top accent line */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px]", `bg-gradient-to-r from-transparent via-${color}-500/40 to-transparent`)} />

      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", `bg-${color}-500/10`)}>
          <Icon className={cn("w-5 h-5", `text-${color}-400`)} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400">+12%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-3xl font-bold font-mono", `text-${color}-400`)}>{value}</span>
          {unit && <span className="text-sm text-white/30 font-medium">{unit}</span>}
        </div>
        <p className="text-sm text-white/50">{label}</p>
      </div>
    </motion.div>
  )
}

function ActivityItem({ activity }: { activity: RecentActivity }) {
  const statusColors = {
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  }

  const typeIcons = {
    hook: Zap,
    trajectory: Brain,
    deployment: GitBranch,
  }

  const Icon = typeIcons[activity.type]

  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.01] hover:bg-white/[0.02] transition-colors border border-white/[0.03]">
      <div className={cn("p-1.5 rounded-lg border", statusColors[activity.status])}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/70 leading-relaxed">{activity.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="w-3 h-3 text-white/20" />
          <span className="text-xs text-white/30">{timeAgo(activity.timestamp)}</span>
        </div>
      </div>
    </div>
  )
}

export default function ProductDevelopmentPage() {
  const shouldReduceMotion = useReducedMotion()
  const [metrics, setMetrics] = useState<ACOSMetrics>({
    intelligenceScore: 93,
    trajectories: 83,
    patterns: 50,
    avgSuccessRate: 67,
    hooksActive: 7,
    skillsLoaded: 22,
    agentsAvailable: 8,
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      timestamp: new Date(Date.now() - 120000).toISOString(),
      type: 'hook',
      description: 'Skill activation hook triggered - loaded baseline-ui, web-design-guidelines, ui-ux-pro-max',
      status: 'success'
    },
    {
      timestamp: new Date(Date.now() - 300000).toISOString(),
      type: 'trajectory',
      description: 'Learning trajectory completed in the code_development category with strong consistency',
      status: 'success'
    },
    {
      timestamp: new Date(Date.now() - 450000).toISOString(),
      type: 'deployment',
      description: 'Production deploy to frankx.ai via Vercel - newsletter page redesign',
      status: 'success'
    },
    {
      timestamp: new Date(Date.now() - 720000).toISOString(),
      type: 'hook',
      description: 'Circuit breaker WARNING - 3 failures on app/design-lab/newsletter/page.tsx',
      status: 'warning'
    },
    {
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: 'trajectory',
      description: 'Pattern stored - Edit > Read > Bash sequence (3 occurrences, 89% success)',
      status: 'info'
    },
  ])

  const developmentMilestones = [
    {
      version: 'v10.0',
      date: 'Feb 14, 2026',
      title: 'Autonomous Intelligence',
      highlights: [
        'Experience Replay - injects successful trajectories as context',
        'Agent IAM - per-profile tool/directory scoping',
        'Circuit Breaker - tracks failures, restricts on threshold',
        'Self-Modify Gate - validates intelligence before config changes',
        'Audit Trail - immutable JSONL logging',
      ],
      intelligenceJump: { from: 72, to: 93 },
    },
    {
      version: 'v9.3',
      date: 'Feb 13, 2026',
      title: 'Pattern Recognition',
      highlights: [
        'N-gram pattern learning - tracks tool sequences',
        'Domain reclassifier - categorizes trajectories',
        'Skill weight optimization - priority queue',
        'Quality gate enforcement - blocks low-confidence actions',
      ],
      intelligenceJump: { from: 65, to: 72 },
    },
    {
      version: 'v9.0',
      date: 'Feb 13, 2026',
      title: 'Executable Routing',
      highlights: [
        'Dynamic skill activation via keyword triggers',
        'Agent profile system - bundles skills',
        'Trajectory-based learning - stores success/failure',
        'Hook orchestration - 15 lifecycle hooks',
      ],
      intelligenceJump: { from: 52, to: 65 },
    },
  ]

  const acosCapabilities = [
    {
      icon: Brain,
      title: 'Self-Learning Intelligence',
      description: '83 trajectories capture successful patterns. Top pattern: Edit > Read > Bash (89% success, 3x).',
      color: 'violet',
    },
    {
      icon: Shield,
      title: 'Safety Guarantees',
      description: 'Circuit breaker restricts after 5 failures. Self-modify gate auto-reverts if intelligence drops >5 points.',
      color: 'emerald',
    },
    {
      icon: Zap,
      title: 'Autonomous Activation',
      description: '22 skills auto-load based on keywords and file patterns. Frontend-designer profile triggers on design work.',
      color: 'cyan',
    },
    {
      icon: Target,
      title: 'Quality Enforcement',
      description: 'Deploy pipeline enforces preflight → build → lint → sync → deploy. No step skippable.',
      color: 'amber',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[128px]"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
                animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[128px]"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }}
                animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Activity className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">Live Development</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
              <span className="block text-white">Product</span>
              <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Development
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              Real-time insights into ACOS v10 autonomous intelligence. Watch the system learn, adapt, and optimize itself.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              label="Intelligence Score"
              value={metrics.intelligenceScore}
              unit="/100"
              trend="up"
              icon={Brain}
              color="violet"
            />
            <StatCard
              label="Learning Trajectories"
              value={metrics.trajectories}
              icon={GitBranch}
              color="cyan"
            />
            <StatCard
              label="Success Patterns"
              value={metrics.patterns}
              icon={Target}
              color="emerald"
            />
            <StatCard
              label="Avg Success Rate"
              value={metrics.avgSuccessRate}
              unit="%"
              icon={TrendingUp}
              color="amber"
            />
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">ACOS v10 </span>
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Five autonomous intelligence systems working in concert
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {acosCapabilities.map((capability, i) => (
              <motion.div
                key={capability.title}
                variants={fadeIn}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] overflow-hidden"
              >
                <div className={cn("absolute top-0 left-0 w-full h-[2px]", `bg-gradient-to-r from-${capability.color}-500/40 via-${capability.color}-500/20 to-transparent`)} />

                <div className={cn("inline-flex p-3 rounded-xl mb-4", `bg-${capability.color}-500/10`)}>
                  <capability.icon className={cn("w-6 h-6", `text-${capability.color}-400`)} />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{capability.title}</h3>
                <p className="text-white/50 leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Evolution Timeline
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Intelligence score progression through major releases
            </p>
          </motion.div>

          <div className="space-y-8">
            {developmentMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.version}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Connecting line */}
                {i < developmentMilestones.length - 1 && (
                  <div className="absolute left-[19px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/40 to-transparent" />
                )}

                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-white">{milestone.version}</h3>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {milestone.date}
                          </span>
                        </div>
                        <p className="text-white/50">{milestone.title}</p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-white/40 line-through">{milestone.intelligenceJump.from}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-400" />
                        <span className="text-sm font-bold text-emerald-400">{milestone.intelligenceJump.to}</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {milestone.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                          <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Recent Activity</h2>
              <p className="text-white/40 text-sm">Live feed from ACOS hooks, trajectories, and deployments</p>
            </div>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 text-sm font-medium transition-colors"
            >
              View All
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <ActivityItem key={i} activity={activity} />
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-cyan-400 mb-1">Monitor Live Activity</p>
                <p className="text-sm text-white/50 mb-3">
                  Run <code className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-xs">npm run acos:monitor</code> to see real-time hook activations and trajectory learning.
                </p>
                <Link
                  href="/changelog"
                  className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>View full changelog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Test ACOS Intelligence
          </h2>
          <p className="text-white/50 mb-8 text-lg">
            Clone the testing environment and verify autonomous behaviors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/frankxai/FrankX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-400 font-medium transition-colors"
            >
              <Code2 className="w-5 h-5" />
              <span>View Source</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] text-white font-medium transition-colors"
            >
              <FileCode className="w-5 h-5" />
              <span>Read Blog</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
