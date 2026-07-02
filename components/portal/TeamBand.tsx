import { Users } from 'lucide-react'
import type { TeamMember } from '@/content/portal/types'

type TeamBandProps = {
  team: TeamMember[]
}

/**
 * Speaks to the partner's team, not just the individual — role + how Frank
 * helps, as a quiet list band (not cards; this is a supporting section, not
 * a feature grid).
 */
export function TeamBand({ team }: TeamBandProps) {
  if (!team.length) return null

  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2 text-sm font-bold text-white/45">
          <Users className="h-4 w-4" />
          Who this also serves
        </div>
        <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-4xl">
          Built for the whole team.
        </h2>

        <ul className="mt-8 divide-y divide-white/[0.06] rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
          {team.map((member, i) => (
            <li key={i} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-sm font-bold text-white">{member.role}</span>
              <span className="text-sm leading-6 text-white/64 sm:max-w-xl sm:text-right">
                {member.howFrankHelps}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
