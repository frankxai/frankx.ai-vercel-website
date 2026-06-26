'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Lightbulb,
  PenTool,
  Sparkles,
  ImageIcon,
  Globe,
  Send,
  BarChart3,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

interface ContentItem {
  slug: string
  title: string
  date: string
  category: string
  featured: boolean
  wordCount: number
  hasSocial: boolean
  pipelineStage: string
}

interface PipelineStats {
  total: number
  byStage: Record<string, number>
  socialCoverage: number
}

const STAGES = [
  {
    id: 'draft',
    name: 'Draft',
    icon: PenTool,
    color: 'from-slate-500 to-slate-600',
    border: 'border-slate-500/30',
    bg: 'bg-slate-500/10',
    text: 'text-slate-300',
    acosCmd: '/frankx-ai-blog',
    description: 'Initial content creation',
  },
  {
    id: 'review',
    name: 'Review',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    acosCmd: '/polish-content',
    description: 'Edit, refine, brand voice',
  },
  {
    id: 'images',
    name: 'Images',
    icon: ImageIcon,
    color: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    acosCmd: '/generate-images',
    description: 'Hero, social, infographics',
  },
  {
    id: 'published',
    name: 'Published',
    icon: Globe,
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    acosCmd: '/frankx-ai-deploy',
    description: 'Live on frankx.ai',
  },
  {
    id: 'distributed',
    name: 'Distributed',
    icon: Send,
    color: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-300',
    acosCmd: '/generate-social',
    description: 'Social + newsletter sent',
  },
  {
    id: 'analyzed',
    name: 'Analyzed',
    icon: BarChart3,
    color: 'from-blue-500 to-indigo-500',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    acosCmd: '/frankx-ai-analytics',
    description: 'Performance tracked',
  },
]

export default function PipelinePage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [stats, setStats] = useState<PipelineStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content/inventory')
      if (res.ok) {
        const data = await res.json()
        setContent(data.content || [])
        setStats(data.stats || null)
      }
    } catch {
      console.error('Failed to load pipeline data')
    } finally {
      setLoading(false)
    }
  }

  const getItemsForStage = (stageId: string) =>
    content.filter(c => c.pipelineStage === stageId)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          Loading pipeline...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/content" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Content Pipeline</h1>
              <p className="text-xs text-white/40">{stats?.total || 0} total articles across {STAGES.length} stages</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Pipeline Flow */}
        <div className="flex items-start gap-1 overflow-x-auto pb-4">
          {STAGES.map((stage, i) => {
            const items = getItemsForStage(stage.id)
            const Icon = stage.icon
            const count = stats?.byStage?.[stage.id] || 0

            return (
              <div key={stage.id} className="flex items-start">
                {/* Stage Column */}
                <div className="w-52 flex-shrink-0">
                  {/* Stage Header */}
                  <div className={`rounded-xl border ${stage.border} ${stage.bg} p-3 mb-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stage.color}`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className={`text-sm font-medium ${stage.text}`}>{stage.name}</span>
                      <span className={`ml-auto text-lg font-bold ${stage.text}`}>{count}</span>
                    </div>
                    <p className="text-xs text-white/30">{stage.description}</p>
                    <code className="block text-[10px] text-white/20 mt-1.5 font-mono">{stage.acosCmd}</code>
                  </div>

                  {/* Stage Items */}
                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-white/[0.06] p-4 text-center">
                        <p className="text-xs text-white/15">Empty</p>
                      </div>
                    ) : (
                      items.slice(0, 15).map(item => (
                        <Link
                          key={item.slug}
                          href={`/admin/content/${item.slug}`}
                          className="block rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 hover:bg-white/[0.04] transition-colors group"
                        >
                          <p className="text-xs text-white/70 leading-snug line-clamp-2 group-hover:text-white">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/25">
                            <span>{item.date || 'no date'}</span>
                            <span>{item.wordCount}w</span>
                          </div>
                        </Link>
                      ))
                    )}
                    {items.length > 15 && (
                      <p className="text-xs text-white/20 text-center py-1">+{items.length - 15} more</p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {i < STAGES.length - 1 && (
                  <div className="flex items-center pt-8 px-0.5 flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white/10" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="text-sm font-medium text-white/60 mb-3">ACOS Content Pipeline Commands</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {STAGES.map(stage => {
              const Icon = stage.icon
              return (
                <div key={stage.id} className="flex items-center gap-3 text-xs">
                  <div className={`p-1 rounded ${stage.bg}`}>
                    <Icon className={`w-3 h-3 ${stage.text}`} />
                  </div>
                  <div>
                    <span className="text-white/50">{stage.name}:</span>
                    <code className="ml-1.5 text-white/30 font-mono">{stage.acosCmd}</code>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
