'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  GitCommit,
  GitBranch,
  Rocket,
  Activity,
  Code2,
  FileCode,
  Zap,
  Brain,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeedEntry {
  id: string
  timestamp: string
  type: 'commit' | 'deploy' | 'hook' | 'trajectory' | 'build'
  title: string
  description: string
  metadata?: {
    commit?: string
    branch?: string
    files?: number
    url?: string
    status?: 'success' | 'warning' | 'info'
    intelligenceScore?: number
  }
  tags: string[]
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const typeConfig = {
  commit: {
    icon: GitCommit,
    label: 'Commit',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  deploy: {
    icon: Rocket,
    label: 'Deploy',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  hook: {
    icon: Zap,
    label: 'Hook',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  trajectory: {
    icon: Brain,
    label: 'Learning',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  build: {
    icon: Code2,
    label: 'Build',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
}

function formatRelativeTime(timestamp: string) {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function FeedItem({ entry, index }: { entry: FeedEntry; index: number }) {
  const config = typeConfig[entry.type]
  const Icon = config.icon

  return (
    <motion.div
      variants={fadeIn}
      custom={index}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-[19px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-white/10 to-transparent" />

      <div className="flex gap-4">
        {/* Icon */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center border",
            config.bg,
            config.border
          )}>
            <Icon className={cn("w-5 h-5", config.color)} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08] transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-md", config.bg, config.color)}>
                    {config.label}
                  </span>
                  <span className="text-xs text-white/30">·</span>
                  <Clock className="w-3 h-3 text-white/20" />
                  <span className="text-xs text-white/30">{formatRelativeTime(entry.timestamp)}</span>
                </div>
                <h3 className="text-white font-medium">{entry.title}</h3>
              </div>

              {entry.metadata?.status && (
                <div className={cn(
                  "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs",
                  entry.metadata.status === 'success' && "bg-emerald-500/10 text-emerald-400",
                  entry.metadata.status === 'warning' && "bg-amber-500/10 text-amber-400",
                  entry.metadata.status === 'info' && "bg-cyan-500/10 text-cyan-400"
                )}>
                  <CheckCircle2 className="w-3 h-3" />
                  {entry.metadata.status}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed mb-3">
              {entry.description}
            </p>

            {/* Metadata */}
            {entry.metadata && (
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {entry.metadata.commit && (
                  <div className="flex items-center gap-1.5 text-white/30">
                    <GitBranch className="w-3 h-3" />
                    <code className="font-mono">{entry.metadata.commit.slice(0, 7)}</code>
                  </div>
                )}
                {entry.metadata.branch && (
                  <div className="flex items-center gap-1.5 text-white/30">
                    <GitBranch className="w-3 h-3" />
                    <span>{entry.metadata.branch}</span>
                  </div>
                )}
                {entry.metadata.files !== undefined && (
                  <div className="flex items-center gap-1.5 text-white/30">
                    <FileCode className="w-3 h-3" />
                    <span>{entry.metadata.files} files</span>
                  </div>
                )}
                {entry.metadata.intelligenceScore !== undefined && (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>{entry.metadata.intelligenceScore}/100</span>
                  </div>
                )}
                {entry.metadata.url && (
                  <a
                    href={entry.metadata.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* Tags */}
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                {entry.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeedPage() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [entries, setEntries] = useState<FeedEntry[]>([])

  useEffect(() => {
    // This will be replaced by real-time data from automation
    const mockEntries: FeedEntry[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        type: 'commit',
        title: 'feat: Complete feed page redesign - remove AI agent personas',
        description: 'Replaced fake "agent" commentary with real development activity. Shows actual commits, deployments, hooks, and learning trajectories.',
        metadata: {
          commit: '70f4beb',
          branch: 'main',
          files: 3,
          status: 'success',
        },
        tags: ['feed', 'redesign', 'ui'],
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        type: 'deploy',
        title: 'Production deploy: frankx.ai',
        description: 'Newsletter page premium redesign deployed to production via Vercel. Premium glassmorphic UI with SparkBorder and GlowButton components.',
        metadata: {
          commit: '09fe44f',
          url: 'https://frankx.ai/design-lab/newsletter',
          status: 'success',
        },
        tags: ['deploy', 'production', 'newsletter'],
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'hook',
        title: 'Skill activation: frontend-designer profile',
        description: 'Auto-loaded baseline-ui, web-design-guidelines, ui-ux-pro-max skills based on keyword triggers and file patterns.',
        metadata: {
          status: 'success',
        },
        tags: ['acos', 'skills', 'automation'],
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 450000).toISOString(),
        type: 'trajectory',
        title: 'Learning pattern stored: Edit > Read > Bash',
        description: 'Successful pattern recognized from 3 occurrences with 89% success rate. Added to trajectory patterns for future context injection.',
        metadata: {
          intelligenceScore: 93,
          status: 'success',
        },
        tags: ['learning', 'pattern', 'acos-v10'],
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 720000).toISOString(),
        type: 'build',
        title: 'Production build completed',
        description: 'Next.js build successful. Generated 4,799 interlinked HTML pages, RSS feed with 50 entries, search index, and vault manifest.',
        metadata: {
          files: 4799,
          status: 'success',
        },
        tags: ['build', 'next.js', 'prebuild'],
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        type: 'commit',
        title: 'feat: ACOS v10 autonomous intelligence',
        description: 'Five new safety systems: Experience Replay, Agent IAM, Circuit Breaker, Self-Modify Gate, Audit Trail. Intelligence score: 72 → 93.',
        metadata: {
          commit: '93539d0',
          branch: 'main',
          files: 28,
          intelligenceScore: 93,
          status: 'success',
        },
        tags: ['acos', 'v10', 'intelligence'],
      },
    ]

    setEntries(mockEntries)
  }, [])

  const filteredEntries = selectedType
    ? entries.filter(e => e.type === selectedType)
    : entries

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
                animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Activity className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">Live Activity</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Development </span>
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Activity Feed
              </span>
            </h1>

            <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              Real-time development activity. Commits, deploys, hooks, learning trajectories, and build events.
            </p>
          </motion.div>

          {/* Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setSelectedType(null)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                !selectedType
                  ? 'bg-white text-slate-900'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10'
              )}
            >
              All Activity
            </button>
            {Object.entries(typeConfig).map(([type, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedType === type
                      ? cn(config.bg, config.color, 'border', config.border)
                      : 'bg-white/5 text-white/40 hover:text-white/60 hover:bg-white/10 border border-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Feed Timeline */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-0"
          >
            {filteredEntries.map((entry, index) => (
              <FeedItem key={entry.id} entry={entry} index={index} />
            ))}
          </motion.div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/30">No activity matches your filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Links */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/product-development"
              className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-5 h-5 text-violet-400" />
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-white font-medium mb-1">ACOS Intelligence</h3>
              <p className="text-sm text-white/40">Live metrics and learning</p>
            </Link>

            <Link
              href="/changelog"
              className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <GitCommit className="w-5 h-5 text-emerald-400" />
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-white font-medium mb-1">Changelog</h3>
              <p className="text-sm text-white/40">Weekly summaries</p>
            </Link>

            <Link
              href="/blog"
              className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-white font-medium mb-1">Blog</h3>
              <p className="text-sm text-white/40">Deep dives and tutorials</p>
            </Link>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-cyan-400 mb-1">Auto-generated from trajectories</p>
                <p className="text-sm text-white/50">
                  This feed will soon auto-update from git commits, deployments, and ACOS learning trajectories. Run{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs">npm run acos:monitor</code>{' '}
                  to see live activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
