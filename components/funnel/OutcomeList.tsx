import { Target } from 'lucide-react'

/**
 * OutcomeList — what the buyer leaves with. Specific, testable, named.
 *
 * No "transform your X" copy. Each outcome is verifiable.
 */
export function OutcomeList({ outcomes }: { outcomes: string[] }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Target className="w-3.5 h-3.5" />
        After this, you can
      </p>
      <ul className="space-y-2">
        {outcomes.map((o, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-200">
            <span className="text-cyan-400 flex-shrink-0 font-medium">{(i + 1).toString().padStart(2, '0')}</span>
            <span className="leading-relaxed">{o}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
