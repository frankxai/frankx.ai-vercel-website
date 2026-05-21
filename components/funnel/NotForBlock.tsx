import { XCircle } from 'lucide-react'

/**
 * NotForBlock — clarity-first "this is not for you if..." display.
 *
 * Counter-intuitive: stating who shouldn't buy increases conversion among
 * the right audience because the offer feels honest, not desperate.
 */
export function NotForBlock({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/40 p-5">
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <XCircle className="w-3.5 h-3.5" />
        Not for you if
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2">
            <span className="text-zinc-600 flex-shrink-0">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
