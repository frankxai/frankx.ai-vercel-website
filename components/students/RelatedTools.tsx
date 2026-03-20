'use client'

import Link from 'next/link'
import { ArrowRight, Compass, GraduationCap, Layers, Sparkles, Target, TrendingUp, Users, Presentation } from 'lucide-react'
import { getRelatedTools } from '@/lib/students/data'
import type { StudentTool } from '@/lib/students/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Target, Compass, Users, Sparkles, Layers, Presentation,
}

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-16 border-t border-white/[0.06] pt-10">
      <div className="mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20">
          Continue your journey
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {related.map((tool) => {
          const Icon = iconMap[tool.icon] || Sparkles
          return (
            <Link
              key={tool.slug}
              href={`/students/${tool.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <Icon className="h-4 w-4 shrink-0 text-white/30 group-hover:text-white/60 transition-colors" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white/80 group-hover:text-white truncate">{tool.title}</div>
                <div className="text-[10px] text-white/25 truncate">{tool.duration}</div>
              </div>
              <ArrowRight className="h-3 w-3 shrink-0 text-white/15 group-hover:translate-x-0.5 group-hover:text-white/30 transition-all" />
            </Link>
          )
        })}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/students/ecosystem"
          className="text-[11px] text-white/20 hover:text-white/40 transition-colors"
        >
          See the full ecosystem →
        </Link>
      </div>
    </section>
  )
}
