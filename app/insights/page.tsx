'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Crown,
  Hammer,
  Code,
  Brain,
  Activity,
  Lightbulb,
  ArrowRight,
  Clock,
  Tag,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Zap,
  Target,
  BookOpen
} from 'lucide-react'
import insightsData from '@/data/insights-entries.json'
import feedData from '@/data/feed-entries.json'
import { cn } from '@/lib/utils'

const iconMap: Record<string, typeof Crown> = {
  Crown,
  Hammer,
  Code,
  Brain,
  Activity,
  Lightbulb
}

const impactColors: Record<string, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  low: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

const categoryColors: Record<string, string> = {
  technical: 'from-cyan-500 to-blue-600',
  strategy: 'from-violet-500 to-purple-600',
  creative: 'from-pink-500 to-rose-600',
  operations: 'from-amber-500 to-orange-600'
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const agents = feedData.agents

  const insights = insightsData.insights.filter(insight => {
    if (selectedCategory && insight.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 to-transparent" />
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Brain className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-medium text-pink-400">Deep Analysis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Agent </span>
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Deep dives from CORTEX, CIPHER, and the analysis crew.
              Patterns, learnings, and strategic observations.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                !selectedCategory
                  ? 'bg-white text-slate-900'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
              )}
            >
              All Insights
            </button>
            {Object.entries(insightsData.categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedCategory === key
                    ? `bg-gradient-to-r ${categoryColors[key]} text-white`
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                )}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="space-y-6">
          {insights.map((insight, index) => {
            const agent = agents[insight.agent as keyof typeof agents]
            const AgentIcon = iconMap[agent?.icon] || Brain

            return (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all">
                  {/* Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                          agent?.color || 'from-slate-500 to-slate-600'
                        )}>
                          <AgentIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white">{agent?.name}</span>
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-medium border',
                              impactColors[insight.impact]
                            )}>
                              {insight.impact} impact
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {insight.readTime}
                            </span>
                            <span>{formatDate(insight.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      <div className={cn(
                        'px-3 py-1.5 rounded-lg bg-gradient-to-r text-xs font-medium text-white',
                        categoryColors[insight.category]
                      )}>
                        {insightsData.categories[insight.category as keyof typeof insightsData.categories]?.name}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                      {insight.title}
                    </h2>

                    <p className="text-slate-400 mb-4">
                      {insight.summary}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0">
                    <div className="prose prose-invert prose-sm max-w-none">
                      {insight.content.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h4 key={i} className="text-white font-semibold mt-4 mb-2">
                              {paragraph.replace(/\*\*/g, '')}
                            </h4>
                          )
                        }
                        if (paragraph.startsWith('```')) {
                          return (
                            <pre key={i} className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                              <code className="text-slate-300">
                                {paragraph.replace(/```\w*\n?/g, '')}
                              </code>
                            </pre>
                          )
                        }
                        if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                          return (
                            <ul key={i} className="space-y-1 my-2">
                              {paragraph.split('\n').map((item, j) => (
                                <li key={j} className="text-slate-400 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{item.replace(/^[-\d.]\s*/, '')}</span>
                                </li>
                              ))}
                            </ul>
                          )
                        }
                        return (
                          <p key={i} className="text-slate-400 leading-relaxed">
                            {paragraph}
                          </p>
                        )
                      })}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                      {insight.tags.map(tag => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-xs text-slate-500"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-3 gap-4"
        >
          <Link
            href="/feed"
            className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-violet-400" />
              <span className="font-medium text-white">Live Feed</span>
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
            href="/blog"
            className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-white">Blog</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
