import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DigitalViolin } from '@/components/music-lab/violin/DigitalViolin'

type ViolinMode = 'play' | 'guided' | 'perform'

export default async function DigitalViolinPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const { mode } = await searchParams
  const initialMode: ViolinMode = mode === 'guided' || mode === 'perform' ? mode : 'play'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FrankX Digital Violin',
    applicationCategory: 'MusicApplication',
    operatingSystem: 'Web browser',
    url: 'https://frankx.ai/music-lab/violin',
    description: 'A browser violin with four strings, first-position fingering, guided notes, continuous bow expression, and local performance replay.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }

  return (
    <main className="min-h-screen bg-[#11100e] text-stone-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <header className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
        <Link
          href="/music-lab"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-stone-500 transition-colors duration-200 hover:text-[#e49773] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9855f]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Music Lab
        </Link>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#d9855f]">Browser instrument</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-stone-50 sm:text-5xl lg:text-6xl">Digital Violin</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
            Choose a string and finger, then shape each note with bow speed and pressure. Practice guided phrases or record a local performance take.
          </p>
        </div>
      </header>
      <DigitalViolin initialMode={initialMode} />
    </main>
  )
}
