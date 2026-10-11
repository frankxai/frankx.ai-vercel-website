import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { dossierCandidates, dossierReviewPreview, dossierReadingMinutes } from '@/lib/research/dossiers'

export default function ResearchDossierIndex() {
  if (!dossierReviewPreview) return null
  return (
    <section id="dossiers" aria-labelledby="dossiers-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-emerald-300">Editorial preview · Sources checked 9 October 2026</p>
      <h2 id="dossiers-heading" className="mt-4 text-3xl font-semibold tracking-tight">From agent capability to a product you can evaluate</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">Three connected dossiers examine execution layers, coding harnesses and evidence for release. Read the documented capabilities beside the limitations, official diagrams and proposed experiments. Human publication review remains pending.</p>
      <div className="mt-8 divide-y divide-white/15 border-y border-white/15">{dossierCandidates.map((dossier, i) => <Link key={dossier.slug} href={`/research/${dossier.slug}`} className="grid min-h-24 gap-4 py-6 focus-visible:ring-2 focus-visible:ring-emerald-300 md:grid-cols-[3rem_minmax(0,1fr)_auto]"><span className="text-sm tabular-nums text-white/50">0{i + 1}</span><span><span className="block text-xl font-semibold text-white">{dossier.title}</span><span className="mt-2 block max-w-3xl text-sm leading-6 text-white/70">{dossier.description}</span></span><span className="flex items-center gap-3 text-sm text-emerald-300">{dossierReadingMinutes(dossier)} min<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span></Link>)}</div>
    </section>
  )
}
