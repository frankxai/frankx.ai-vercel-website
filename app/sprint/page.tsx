import { createMetadata } from '@/lib/seo'
import Link from 'next/link'
import sprintData from '@/data/sprint-current.json'
import {
  Rocket, CheckCircle2, Circle, Clock, Zap, Target,
  ArrowRight, TrendingUp, Flame, Calendar, BarChart3,
  FileText, Send, Share2, Wrench, Package, PenTool
} from 'lucide-react'

export const metadata = createMetadata({
  title: 'Sprint | FrankX',
  description: `Week ${sprintData.current.label.split(' ')[1]}: ${sprintData.current.theme} — ${sprintData.current.tagline}`,
  path: '/sprint',
})

const trackIcons: Record<string, React.ReactNode> = {
  product: <Package className="w-4 h-4" />,
  content: <PenTool className="w-4 h-4" />,
  distribution: <Share2 className="w-4 h-4" />,
  technical: <Wrench className="w-4 h-4" />,
  creative: <Zap className="w-4 h-4" />,
}

const trackColors: Record<string, string> = {
  product: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  content: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  distribution: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  technical: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  creative: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
}

const priorityColors: Record<string, string> = {
  critical: 'text-red-400 bg-red-400/10 border-red-400/20',
  high: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  medium: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  low: 'text-white/40 bg-white/5 border-white/10',
}

const impactColors: Record<string, string> = {
  major: 'bg-emerald-400',
  medium: 'bg-cyan-400',
  small: 'bg-white/30',
}

export default function SprintPage() {
  const { current, lastWeek } = sprintData

  // Calculate stats
  const totalTasks = current.goals.reduce((sum, g) => sum + g.tasks.length, 0)
  const completedTasks = current.goals.reduce(
    (sum, g) => sum + g.tasks.filter((t) => t.done).length,
    0
  )
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Ambient aurora */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(171,71,199,0.04) 0%, transparent 70%)',
            filter: 'blur(128px)',
          }}
        />
      </div>

      {/* Header */}
      <section className="relative border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link
              href="/plan"
              className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              Plan
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 text-sm">Sprint</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Sprint
                </span>
                <span className="text-white/30 text-sm font-mono">{current.dateRange}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {current.label}: {current.theme}
              </h1>
              <p className="text-white/50 text-lg max-w-xl">{current.tagline}</p>
            </div>

            {/* Progress ring */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${(progress / 100) * 220} 220`}
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold font-mono">{progress}%</span>
                </div>
              </div>
              <div className="text-sm text-white/40">
                <div>
                  <span className="text-white/70 font-mono font-semibold">{completedTasks}</span>/{totalTasks} tasks
                </div>
                <div>
                  <span className="text-white/70 font-mono font-semibold">{current.goals.length}</span> objectives
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Sprint Objectives */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold">Sprint Objectives</h2>
          </div>

          <div className="grid gap-4">
            {current.goals.map((goal) => {
              const doneTasks = goal.tasks.filter((t) => t.done).length
              const goalProgress =
                goal.tasks.length > 0
                  ? Math.round((doneTasks / goal.tasks.length) * 100)
                  : 0
              const track = trackColors[goal.track] || trackColors.technical
              const priority = priorityColors[goal.priority] || priorityColors.medium

              return (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${track}`}
                        >
                          {trackIcons[goal.track]}
                          {goal.track}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priority}`}
                        >
                          {goal.priority}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{goal.title}</h3>
                      <p className="text-white/40 text-sm">{goal.description}</p>
                    </div>

                    {/* Mini progress */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                          style={{ width: `${goalProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-white/40">
                        {doneTasks}/{goal.tasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Task checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {goal.tasks.map((task, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-sm ${
                          task.done ? 'text-white/30 line-through' : 'text-white/60'
                        }`}
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                        )}
                        {task.text}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Last Week Review */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold">Last Week: {lastWeek.theme}</h2>
            <span className="text-white/30 text-sm font-mono">{lastWeek.dateRange}</span>
          </div>

          {/* Stats bar */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 mb-6">
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold font-mono text-emerald-400">
                  {lastWeek.stats.commits}
                </div>
                <div className="text-xs text-white/30 mt-1">Commits</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-cyan-400">
                  {(lastWeek.stats.linesAdded / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-white/30 mt-1">Lines Added</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-purple-400">
                  {lastWeek.stats.filesChanged.toLocaleString()}
                </div>
                <div className="text-xs text-white/30 mt-1">Files Changed</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-amber-400">
                  {lastWeek.stats.shipped}
                </div>
                <div className="text-xs text-white/30 mt-1">Items Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-mono bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                  {lastWeek.stats.grade}
                </div>
                <div className="text-xs text-white/30 mt-1">Grade</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lastWeek.highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    impactColors[item.impact] || impactColors.small
                  }`}
                />
                <div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 border-t border-white/[0.06] pt-12">
          <Link
            href="/changelog"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
          >
            <FileText className="w-4 h-4" />
            Changelog
          </Link>
          <Link
            href="/plan"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
          >
            <BarChart3 className="w-4 h-4" />
            Initiatives
          </Link>
          <Link
            href="/goals"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
          >
            <Target className="w-4 h-4" />
            Goals
          </Link>
          <Link
            href="/roadmap"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all bg-white/[0.02] hover:bg-white/[0.04]"
          >
            <Calendar className="w-4 h-4" />
            Roadmap
          </Link>
        </div>
      </div>
    </div>
  )
}
