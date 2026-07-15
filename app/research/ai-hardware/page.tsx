import Link from 'next/link'
import { ArrowRight, CalendarClock, CheckCircle2, Database, FileSearch, Scale, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { HARDWARE_PLATFORMS, HARDWARE_REVIEWED_AT } from '@/data/hardware-intelligence'
import { HARDWARE_CATEGORIES } from '@/data/hardware-taxonomy'
import { ldJson } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'AI Hardware Research: Evidence, Specifications, and Market Taxonomy | FrankX',
  description: 'The evidence and methodology layer behind FrankX AI Hardware Intelligence, covering specifications, model fit, pricing observations, emerging accelerators, and update policy.',
  alternates: { canonical: '/research/ai-hardware' },
}

const researchSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Hardware Research',
  url: 'https://frankx.ai/research/ai-hardware',
  description: 'Evidence, methodology, and update policy for AI hardware and compute decisions.',
  dateModified: HARDWARE_REVIEWED_AT,
}

export default function AIHardwareResearchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(researchSchema) }} />
      <section className="relative overflow-hidden border-b border-white/[0.06] px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_8%,rgba(6,182,212,0.11),transparent_52%),radial-gradient(ellipse_at_18%_16%,rgba(245,158,11,0.06),transparent_44%)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm text-cyan-300"><FileSearch className="h-4 w-4" />Hardware research record</div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Specifications are evidence. Recommendations are inference.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55 sm:text-xl">See how official specifications, dated market observations, workload fit, and editorial judgment become a buyer recommendation.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/ai-hardware" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Use the hardware planner <ArrowRight className="h-4 w-4" /></Link><Link href="/research/methodology" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">Research methodology</Link></div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Official specification', body: 'Memory, bandwidth, architecture, power, software, and vendor-supported configurations.', icon: Database },
              { title: 'Market observation', body: 'Region, VAT, seller, stock, warranty, and observed date. Never treated as a permanent price.', icon: CalendarClock },
              { title: 'Workload inference', body: 'Model, context, batching, media graph, latency, and concurrency mapped conservatively to hardware.', icon: Scale },
              { title: 'Decision boundary', body: 'What should stay local, rented, managed, or deferred, including operational ownership.', icon: ShieldCheck },
            ].map((item) => { const Icon = item.icon; return <div key={item.title} className="bg-[#0d0d0f] p-7"><Icon className="h-5 w-5 text-cyan-300/65" /><h2 className="mt-10 text-lg font-semibold">{item.title}</h2><p className="mt-3 text-sm leading-6 text-white/45">{item.body}</p></div> })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div><p className="text-sm text-emerald-300">Source registry</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Current platform evidence.</h2><p className="mt-5 text-sm leading-6 text-white/45">Reviewed {HARDWARE_REVIEWED_AT}. Retail observations are planning bands; open the official source before treating a specification as current.</p></div>
          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {HARDWARE_PLATFORMS.map((platform) => <a key={platform.id} href={platform.sourceUrl} target="_blank" rel="noreferrer" className="group grid gap-3 py-5 sm:grid-cols-[1fr_170px_auto] sm:items-center"><div><h3 className="text-base font-medium">{platform.name}</h3><p className="mt-1 text-sm text-white/35">{platform.sourceLabel}</p></div><span className="text-sm text-white/45">{platform.memory}</span><ArrowRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/60" /></a>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-sm text-violet-300">Taxonomy watch</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">Research by compute lane.</h2></div><div className="grid gap-3 sm:grid-cols-2">{HARDWARE_CATEGORIES.filter((category) => ['infrastructure', 'edge', 'access'].includes(category.cluster)).map((category) => <Link key={category.slug} href={`/ai-hardware/${category.slug}`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"><div className="flex items-center justify-between"><h3 className="font-medium">{category.shortTitle}</h3><ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white/60" /></div><p className="mt-3 text-sm leading-6 text-white/40">{category.summary}</p></Link>)}</div></div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-8 sm:p-12"><div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]"><div><p className="text-sm text-amber-200">Publication policy</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">What earns a recommendation.</h2></div><div className="space-y-4">{['A verifiable product or official announcement', 'A named workload and software path', 'Capacity, speed, power, price, and support separated', 'Regional buying reality when procurement is discussed', 'Uncertainty and editorial inference labeled'].map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-white/55"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300/70" />{item}</div>)}</div></div></div>
      </section>
    </main>
  )
}
