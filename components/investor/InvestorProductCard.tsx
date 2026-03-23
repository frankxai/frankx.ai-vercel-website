'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Search,
  FileText,
  Workflow,
  Eye,
  Network,
  GitBranch,
  BookOpen,
  BarChart3,
  TrendingUp,
  Activity,
  Terminal,
  Layers,
  Gift,
  LayoutDashboard,
} from 'lucide-react'
import type { InvestorProduct } from '@/lib/investor'
import { COMPLEXITY_META } from '@/lib/investor'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  'file-text': FileText,
  workflow: Workflow,
  eye: Eye,
  network: Network,
  'git-branch': GitBranch,
  'book-open': BookOpen,
  'bar-chart': BarChart3,
  'trending-up': TrendingUp,
  activity: Activity,
  terminal: Terminal,
  layers: Layers,
  gift: Gift,
  'layout-dashboard': LayoutDashboard,
}

const categoryColors: Record<string, { border: string; icon: string; badge: string }> = {
  agents: {
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: 'bg-cyan-500/20 text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
  },
  workflows: {
    border: 'border-violet-500/20 hover:border-violet-500/40',
    icon: 'bg-violet-500/20 text-violet-400',
    badge: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  },
  architectures: {
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    icon: 'bg-emerald-500/20 text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  },
  tools: {
    border: 'border-amber-500/20 hover:border-amber-500/40',
    icon: 'bg-amber-500/20 text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  },
}

export default function InvestorProductCard({
  product,
  index,
}: {
  product: InvestorProduct
  index: number
}) {
  const Icon = iconMap[product.icon] || Layers
  const colors = categoryColors[product.category] || categoryColors.tools
  const complexity = COMPLEXITY_META[product.complexity]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group relative flex h-full flex-col rounded-2xl border bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute -right-2 -top-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase text-white ${
              product.badge === 'FREE'
                ? 'bg-emerald-500'
                : product.badge === 'Bundle'
                  ? 'bg-violet-500'
                  : product.badge === 'Premium'
                    ? 'bg-amber-500'
                    : 'bg-cyan-500'
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Icon and complexity */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${complexity.color}`}
          >
            {complexity.name}
          </span>
        </div>

        {/* Title and subtitle */}
        <h3 className="mb-2 text-lg font-bold text-white">{product.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-2">
          {product.subtitle}
        </p>

        {/* Tech stack tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {product.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span
            className={`text-sm font-bold ${product.price === 0 ? 'text-emerald-400' : 'text-white'}`}
          >
            {product.priceLabel}
          </span>
          <Link
            href={product.cta.href}
            className="flex items-center gap-1 text-slate-400 transition-colors group-hover:text-cyan-400"
          >
            <span className="text-xs font-medium">{product.cta.label}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
