'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ArchitecturePattern } from '@/types/ai-architecture'
import { CATEGORY_META } from '@/types/ai-architecture'
import { DifficultyBadge } from './DifficultyBadge'

interface PatternCardProps {
  pattern: ArchitecturePattern
  icon?: LucideIcon
  index?: number
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

const categoryColors: Record<string, { bg: string; border: string; icon: string }> = {
  'ai-gateway': {
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
  },
  'rag-production': {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
  },
  'multi-agent-orchestration': {
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
  },
  'mcp-servers': {
    bg: 'bg-orange-500/5',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    icon: 'bg-orange-500/20 text-orange-400',
  },
  'llm-ops': {
    bg: 'bg-rose-500/5',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    icon: 'bg-rose-500/20 text-rose-400',
  },
  'vector-databases': {
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
  },
  'ai-coe': {
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: 'bg-blue-500/20 text-blue-400',
  },
  'security-governance': {
    bg: 'bg-red-500/5',
    border: 'border-red-500/20 hover:border-red-500/40',
    icon: 'bg-red-500/20 text-red-400',
  },
  'cost-optimization': {
    bg: 'bg-green-500/5',
    border: 'border-green-500/20 hover:border-green-500/40',
    icon: 'bg-green-500/20 text-green-400',
  },
  observability: {
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: 'bg-purple-500/20 text-purple-400',
  },
}

export function PatternCard({
  pattern,
  icon: Icon,
  index = 0,
  variant = 'default',
  className,
}: PatternCardProps) {
  const colors = categoryColors[pattern.category] || categoryColors['ai-gateway']
  const categoryMeta = CATEGORY_META[pattern.category]

  if (variant === 'compact') {
    return (
      <Link
        href={`/ai-architect-academy/patterns#${pattern.id}`}
        className={cn(
          'group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.04]',
          className
        )}
      >
        {Icon && (
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', colors.icon)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate">{pattern.name}</h4>
          <p className="text-xs text-slate-500 truncate">{categoryMeta?.name}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-white" />
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={className}
      >
        <Link
          href={`/ai-architect-academy/patterns#${pattern.id}`}
          className={cn(
            'group block rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
            colors.border,
            colors.bg
          )}
        >
          <div className="mb-4 flex items-start justify-between">
            {Icon && (
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', colors.icon)}>
                <Icon className="h-6 w-6" />
              </div>
            )}
            <DifficultyBadge level={pattern.difficulty} size="sm" />
          </div>

          <h3 className="mb-2 text-lg font-bold text-white">{pattern.name}</h3>
          <p className="mb-4 text-sm text-slate-400 line-clamp-2">{pattern.problem}</p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-xs text-slate-500">{categoryMeta?.name}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-white">
              Learn more
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      <div
        className={cn(
          'group rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/30',
          colors.border,
          colors.bg
        )}
      >
        <div className="mb-4 flex items-start justify-between">
          {Icon && (
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', colors.icon)}>
              <Icon className="h-6 w-6" />
            </div>
          )}
          <DifficultyBadge level={pattern.difficulty} size="sm" />
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">{pattern.name}</h3>

        <div className="mb-4 space-y-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-600">Problem</span>
            <p className="text-sm text-slate-400">{pattern.problem}</p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-600">Solution</span>
            <p className="text-sm text-slate-400">{pattern.solution}</p>
          </div>
        </div>

        {pattern.technologies && pattern.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {pattern.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-500">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PatternCard
