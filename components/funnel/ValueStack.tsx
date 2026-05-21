import { Check, ArrowDown } from 'lucide-react'
import type { ProductInclusion } from '@/data/products'

/**
 * ValueStack — itemized list of what the buyer receives.
 *
 * Renders inclusions grouped by tier-of-introduction so the buyer can see
 * "everything below this tier, plus..." structure cleanly. Specificity
 * beats hype — every line is a concrete artifact, not a benefit claim.
 */
export function ValueStack({
  includes,
  bonuses,
}: {
  includes: ProductInclusion[]
  bonuses?: ProductInclusion[]
}) {
  return (
    <div className="space-y-6">
      <ul className="space-y-3">
        {includes.map((inc, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
          >
            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-1">{inc.label}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{inc.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {bonuses && bonuses.length > 0 && (
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDown className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wider">Bonuses</h3>
          </div>
          <ul className="space-y-2">
            {bonuses.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl border border-amber-500/[0.15] bg-amber-500/[0.03]"
              >
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">{b.label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
