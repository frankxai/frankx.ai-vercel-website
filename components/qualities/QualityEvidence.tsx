import Link from 'next/link'
import { ArrowUpRight, BookOpen, FileText, Microscope, Wrench } from 'lucide-react'

import type { QualityLink } from '@/lib/qualities'

const icons = {
  Research: Microscope,
  Essay: FileText,
  'Book chapter': BookOpen,
  Build: Wrench,
} as const

export default function QualityEvidence({ items }: { items: QualityLink[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const Icon = icons[item.kind]
        return (
          <Link
            key={`${item.href}-${item.title}`}
            href={item.href}
            className="group grid gap-4 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
          >
            <span className="font-mono text-[10px] text-white/50">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/65">
                <Icon className="h-3.5 w-3.5" />
                {item.kind}
              </span>
              <span className="mt-2 block font-display text-lg font-semibold text-white group-hover:text-emerald-100">
                {item.title}
              </span>
              <span className="mt-2 block max-w-2xl text-sm leading-6 text-white/55">{item.note}</span>
            </span>
            <ArrowUpRight className="hidden h-4 w-4 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300 sm:block" />
          </Link>
        )
      })}
    </div>
  )
}
