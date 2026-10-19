import type { RoleStage } from '@/lib/agentic-roles'
import { agenticStages } from '@/lib/agentic-roles'

export function StageBadge({ stage }: { stage: RoleStage }) {
  const live = stage === 'waitlist'
  return (
    <span
      className={
        live
          ? 'inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200'
          : 'inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-300'
      }
    >
      <span
        aria-hidden="true"
        className={live ? 'h-1.5 w-1.5 rounded-full bg-emerald-300' : 'h-1.5 w-1.5 rounded-full border border-slate-400'}
      />
      {agenticStages[stage].label}
    </span>
  )
}
