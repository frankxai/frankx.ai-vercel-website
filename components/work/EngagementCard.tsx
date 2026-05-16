import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Engagement, EngagementType } from '@/content/work/types'

type EngagementCardProps = {
  engagement: Engagement
}

const TYPE_LABEL: Record<EngagementType, string> = {
  substrate: 'Substrate provider',
  whitelabel: 'Whitelabel',
  consulting: 'Consulting',
  'creator-build': 'Creator build',
  advisory: 'Advisory',
}

const STATUS_LABEL: Record<Engagement['status'], string> = {
  live: 'In motion',
  past: 'Shipped',
  // 'private' should never reach this card — guard upstream.
  private: 'Private',
}

/**
 * Hub card for a single engagement on /work.
 *
 * Substrate-type engagements get the emerald-tinted treatment so the
 * sovereign-node framing reads at a glance. Other types keep the neutral
 * card style. Anonymized clients still render — the schema treats name +
 * client as two separate fields for exactly that case.
 */
export function EngagementCard({ engagement }: EngagementCardProps) {
  const isSubstrate = engagement.engagementType === 'substrate'

  return (
    <Link
      href={`/work/${engagement.slug}`}
      className={`group block rounded-2xl border p-6 lg:p-7 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 ${
        isSubstrate
          ? 'bg-gradient-to-br from-emerald-500/[0.06] via-white/[0.02] to-transparent border-emerald-500/20 hover:border-emerald-400/35'
          : 'bg-white/[0.025] border-white/[0.08] hover:bg-white/[0.04] hover:border-emerald-500/20'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
          {TYPE_LABEL[engagement.engagementType]}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 transition-colors"
          aria-hidden
        />
      </div>

      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
        {engagement.name}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
        {engagement.tagline}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-white/70 border border-white/10">
          {STATUS_LABEL[engagement.status]}
        </span>
        {engagement.ndaStatus !== 'public' ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-white/50 border border-white/10">
            {engagement.ndaStatus === 'partial'
              ? 'Anonymized'
              : 'Private'}
          </span>
        ) : null}
      </div>
    </Link>
  )
}
