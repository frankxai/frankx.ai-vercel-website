import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Licensing | FrankX.AI',
  description:
    'Commercial licensing for FrankX music, research, templates, and methodology — sync, publishing, education, agency, and enterprise use.',
  path: '/licensing',
})

const CATEGORIES = [
  {
    title: 'Music & creative works',
    body: 'Songs, stems, lyrics, and cover art from the FrankX catalog for sync, publishing, commercial background use, or derivative works.',
  },
  {
    title: 'Research & content',
    body: 'Republishing, syndicating, or adapting Research Hub reports, guides, or blog analysis beyond standard fair-use quoting and linking.',
  },
  {
    title: 'Templates & prompt packs',
    body: 'Agency or team use of purchased templates and prompt packs beyond the personal-use license included at checkout — white-labeling, resale, or client delivery.',
  },
  {
    title: 'Methodology & brand',
    body: 'Teaching, coaching, or consulting using FrankX frameworks (ACOS, the Foundry model, Agentic Learning OS) under your own name or program.',
  },
]

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">Licensing</h1>
        <p className="text-white/70 text-[17px] leading-relaxed mb-10 max-w-xl">
          Every digital product you buy from FrankX already includes a personal-use license —
          see{' '}
          <Link href="/legal/terms#license-grant" className="text-emerald-400 hover:text-emerald-300">
            Terms of Service §6
          </Link>
          . This page covers licensing beyond that: using FrankX music, research, templates, or
          methodology commercially, for a client, or under your own brand.
        </p>

        <div className="space-y-4 mb-12">
          {CATEGORIES.map((c) => (
            <div key={c.title} className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <h2 className="text-lg font-semibold mb-2">{c.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <section className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.03] mb-8">
          <h2 className="text-2xl font-semibold mb-3">How it works</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            Public access to a page, product, or track is not a reuse license — see{' '}
            <Link href="/legal/terms#music-licensing" className="text-emerald-400 hover:text-emerald-300">
              Terms of Service §9
            </Link>
            . Commercial, sync, publishing, education, agency, and enterprise licenses are
            granted only through explicit written terms.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            Email{' '}
            <a href="mailto:frank@frankx.ai?subject=Licensing%20inquiry" className="text-emerald-400 hover:text-emerald-300">
              frank@frankx.ai
            </a>{' '}
            with what you want to use, where, and how — you&rsquo;ll get a straight answer and,
            where it fits, a written license.
          </p>
        </section>

        <a
          href="mailto:frank@frankx.ai?subject=Licensing%20inquiry"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
        >
          Start a licensing inquiry
        </a>
      </div>
    </div>
  )
}
