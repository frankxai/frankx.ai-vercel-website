import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GuidedGuitarTabs } from '@/components/music-lab/guitar/GuidedGuitarTabs'

export default function GuidedGuitarTabsPage() {
  return (
    <main className="min-h-screen bg-[#11100e] text-stone-100">
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
        <Link href="/music-lab" className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-500 transition-colors duration-200 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Music Lab
        </Link>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#d9855f]">Guided notes</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl lg:text-6xl">Guitar Tabs</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
            Read six-string tablature one column at a time, hear each reference pitch, and slow the phrase down before building speed.
          </p>
        </div>
      </header>
      <GuidedGuitarTabs />
    </main>
  )
}
