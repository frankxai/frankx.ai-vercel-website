import Link from 'next/link'
import { FlaskConical } from 'lucide-react'

export function WorkshopProvenanceNotice() {
  return (
    <aside className="my-7 flex gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-4 text-sm leading-6 text-cyan-50/90">
      <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
      <p>
        <span className="font-semibold text-white">Studio architecture.</span> This format is a prepared facilitator draft to tailor and pilot; it is not presented as a workshop Frank has already delivered. See the{' '}
        <Link href="/workshops" className="font-semibold underline decoration-cyan-300/30 underline-offset-4 hover:text-white">
          workshop provenance guide
        </Link>
        .
      </p>
    </aside>
  )
}
