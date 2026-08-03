import Link from 'next/link'
import type { Metadata } from 'next'
import { Compass, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Founder Ecosystems | FrankX',
  description: 'Founder ecosystems, mapped from the ground. Practical, field-tested workspace guides for builders, creators, and operators.',
  openGraph: {
    title: 'Founder Ecosystems | FrankX',
    description: 'Practical, field-tested workspace guides for builders, creators, and operators.',
    type: 'website',
  },
  alternates: { canonical: 'https://frankx.ai/ecosystems' },
}

function EcosystemsSchema() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Founder Ecosystems',
    description: 'Field-tested workspace and community guides for startup founders and AI architects.',
    url: 'https://frankx.ai/ecosystems',
    author: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: 'https://frankx.ai',
      jobTitle: 'AI Architect',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 2,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Amsterdam',
          url: 'https://frankx.ai/ecosystems/amsterdam',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Zadar & Split',
          url: 'https://frankx.ai/ecosystems/zadar-split',
        }
      ],
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default function EcosystemsIndexPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans">
      <EcosystemsSchema />

      <section className="relative overflow-hidden border-b border-white/[0.08] pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-x-0 top-0 h-px bg-emerald-450/40" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Cartography Series</span>
          </div>
          
          <h1 className="mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-serif font-medium leading-[1.05] tracking-tight text-white">
            Founder ecosystems, mapped from the ground.
          </h1>
          <p className="mt-6 max-w-2xl text-md leading-relaxed text-zinc-400 sm:text-lg">
            Practical field guides for choosing workspaces, connecting with local research clusters, and finding the developer rooms that actually matter.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-2xl font-serif font-medium text-white">Mapped Cities</h2>
            <p className="text-zinc-500 text-xs mt-1">Select a city to explore its detailed workspace cartography.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amsterdam Card */}
            <Link href="/ecosystems/amsterdam" className="group">
              <article className="bg-[#101012] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-colors flex flex-col justify-between h-56">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-zinc-500 text-xs font-mono">NETHERLANDS</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-white mt-4 group-hover:text-emerald-400 transition-colors">Amsterdam</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-2">
                    54 workspaces, the free baseline circuit, the UvA/Science Park AI cluster, and A'DAM Toren tenant analysis.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors mt-4">
                  Explore Ecosystem
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>

            {/* Zadar / Split Card */}
            <Link href="/ecosystems/zadar-split" className="group">
              <article className="bg-[#101012] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-emerald-500/30 transition-colors flex flex-col justify-between h-56">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-zinc-500 text-xs font-mono">CROATIA</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-white mt-4 group-hover:text-emerald-400 transition-colors">Zadar &amp; Split</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-2">
                    Dalmatian Coast workspaces (COIN, Code Hub, WIP, Amosfera, Smartspace), local tech hub incubators, and the free beachfront/library circuit.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors mt-4">
                  Explore Ecosystem
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>

            {/* Template Pitch Card */}
            <article className="bg-[#101012] border border-dashed border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-56 md:col-span-2">
              <div>
                <span className="text-zinc-500 text-xs font-mono">YOUR CITY</span>
                <h3 className="text-xl font-semibold text-zinc-350 mt-4">Map Your Local Ecosystem</h3>
                <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                  Fork our open-source template and publish a field-tested workspace guide for your startup community.
                </p>
              </div>
              <a 
                href="https://github.com/frankxai/founder-ecosystems" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-semibold transition-colors mt-4"
              >
                Get the template
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.08] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Compiled by Frank · Buy people, not desks.</span>
          </div>
          <span>Updated July 2026</span>
        </div>
      </footer>
    </div>
  )
}
