'use client'

import { Printer } from 'lucide-react'

export function PrintWorksheetButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b] print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print the map
    </button>
  )
}
