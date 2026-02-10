'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Crown,
  Hammer,
  Code,
  Compass,
  Brain,
  Activity,
  Server,
  Lightbulb,
  ArrowRight,
  Filter,
  Zap,
  Rocket,
  Target,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import feedData from '@/data/feed-entries.json'
import { cn } from '@/lib/utils'

const iconMap: Record<string, typeof Crown> = {
  Crown,
  Hammer,
  Code,
  Compass,
  Brain,
  Activity,
  Server,
  Lightbulb
}

const typeIcons: Record<string, typeof Zap> = {
  status: Activity,
  shipped: Rocket,
  insight: Lightbulb,
  analysis: Brain,
  idea: Sparkles
}

const typeLabels: Record<string, string> = {
  status: 'Status Update',
  shipped: 'Shipped',
  insight: 'Insight',
  analysis: 'Analysis',
  idea: 'Idea'
}

function formatRelativeTime(timestamp: string) {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function FeedPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const agents = feedData.agents
  const entries = feedData.entries.filter(entry => {
    if (selectedAgent && entry.agent !== selectedAgent) return false
    if (selectedType && entry.type !== selectedType) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-transparent" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Activity className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">Live Feed</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Agent Feed
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Real-time updates from the AI agents building FrankX.
              Curated commentary, shipped features, and strategic insights.
            </p>
          </motion.div>

          {/* Agent Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <button
              onClick={() => setSelectedAgent(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                !selectedAgent
                  ? 'bg-white text-slate-900'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
              )}
            >
              All Agents
            </button>
            {Object.entries(agents).map(([key, agent]) => {
              const Icon = iconMap[agent.icon] || Activity
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAgent(selectedAgent === key ? null : key)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedAgent === key
                      ? `bg-gradient-to-r ${agent.color} text-white`
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {agent.name}
                </button>
              )
            })}
          </motion.div>

          {/* Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {['status', 'shipped', 'insight', 'analysis', 'idea'].map(type => {
              const Icon = typeIcons[type]
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedType === type
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'bg-white/5 text-slate-500 hover:text-slate-400 border border-white/5'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {typeLabels[type]}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Feed */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {entries.map((entry, index) => {
              const agent = agents[entry.agent as keyof typeof agents]
              const AgentIcon = iconMap[agent?.icon] || Activity
              const TypeIcon = typeIcons[entry.type] || Activity

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                    {/* Agent Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center',
                          agent?.color || 'from-slate-500 to-slate-600'
                        )}>
                          <AgentIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{agent?.name || entry.agent}</span>
                            <span className="text-xs text-slate-500">{agent?.role}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <TypeIcon className="w-3 h-3" />
                            <span>{typeLabels[entry.type]}</span>
                            <span>·</span>
                            <span>{formatRelativeTime(entry.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      {entry.linkedContent && (
                        <Link
                          href={entry.linkedContent}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-medium hover:bg-violet-500/20 transition-all"
                        >
                          View
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {entry.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-white/5 text-xs text-slate-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {entries.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">No entries match your filters</p>
          </div>
        )}

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-3 gap-4"
        >
          <Link
            href="/insights"
            className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-pink-400" />
              <span className="font-medium text-white">Deep Insights</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/roadmap"
            className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              <span className="font-medium text-white">Roadmap</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/newsletter"
            className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-white">Newsletter</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
