import { Shield } from 'lucide-react'

/**
 * RefundGuarantee — visible refund commitment on every paid product page.
 *
 * Trust signal that costs nothing and removes friction. Stated upfront — not
 * buried in checkout. The day-count and policy come from the product registry.
 */
export function RefundGuarantee({
  days,
  guarantee,
}: {
  days: number
  guarantee: string
}) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 flex gap-3">
      <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-emerald-400 mb-1">
          {days}-day no-questions refund
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">{guarantee}</p>
      </div>
    </div>
  )
}
