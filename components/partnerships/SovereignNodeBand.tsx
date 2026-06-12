import { MapPin } from 'lucide-react'

/**
 * The operator-profile band on /partnerships. Establishes who is on the other
 * side of every partnership: one human architect running an army of agents from
 * Amsterdam, with EMEA enterprise reach through the Oracle AI CoE practice.
 * Static (no client motion) — it sits directly under the animated hero.
 */

const PROOF = [
  { stat: 'Oracle EMEA', label: 'AI Center of Excellence — AI Architect' },
  { stat: '1 + agents', label: 'One operator directing a fleet of build agents' },
  { stat: 'Amsterdam', label: 'EMEA reach, coding-agent-native delivery' },
  { stat: 'Daily ship', label: 'Production surfaces, open source of truth' },
]

export function SovereignNodeBand() {
  return (
    <section aria-label="Operator profile" className="border-t border-white/5 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400/70" aria-hidden />
              <span className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium">
                The sovereign node
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-snug"
              style={{ letterSpacing: '-0.02em' }}
            >
              One architect. An army of agents. A real counterparty.
            </h2>
            <p className="text-base text-zinc-300 leading-[1.7] max-w-xl">
              Every partnership here has a single, accountable human on the other side — not a
              committee. The same Center-of-Excellence architecture delivered for enterprises at
              Oracle EMEA runs the practice itself: strategy, build, and distribution, shipped daily
              from Amsterdam.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
            {PROOF.map((p) => (
              <div key={p.stat} className="bg-[#0a0a0b] p-5">
                <dt className="text-lg font-semibold text-white mb-1">{p.stat}</dt>
                <dd className="text-xs text-zinc-400 leading-relaxed">{p.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
