import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { AgenticRole } from '@/lib/agentic-roles'
import { StageBadge } from './StageBadge'

export function RoleCard({ role, index }: { role: AgenticRole; index: number }) {
  return (
    <li className="group relative flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 motion-reduce:transition-none hover:border-emerald-400/40 hover:bg-white/[0.05] focus-within:border-emerald-400/60 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-slate-400" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <StageBadge stage={role.stage} />
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-tight text-white">
        <Link
          href={`/agentic-creator/${role.slug}`}
          className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-300"
        >
          {role.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-400">{role.youBecome}</p>
      <div className="mt-5 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">First win</p>
        <p className="mt-2 text-base leading-relaxed text-slate-100">{role.firstWin}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
        Read the role
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </li>
  )
}
