import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function BlogFooterCTA() {
  return (
    <div className="flex justify-center">
      <Link
        href="/start"
        aria-label="Start here: find your founder constraint with the Founder Stack map"
        className="inline-flex min-h-6 items-center gap-2 rounded-md py-1 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
      >
        Start here
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  )
}
