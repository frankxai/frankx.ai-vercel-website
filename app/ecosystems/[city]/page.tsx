import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import amsterdamData from '../../../content/ecosystems/amsterdam.json'
import zadarSplitData from '../../../content/ecosystems/zadar-split.json'
import type { EcosystemData } from '@/data/ecosystems'
import EcosystemMap from '@/components/ecosystems/EcosystemMap'
import DecisionMatrix from '@/components/ecosystems/DecisionMatrix'
import SpacesTable from '@/components/ecosystems/SpacesTable'
import { 
  FreeCircuitSection, 
  AdamTorenSection, 
  UvaClusterSection, 
  EventsRailSection 
} from '@/components/ecosystems/SpecializedSections'
import { Compass, ShieldCheck } from 'lucide-react'

interface PageProps {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return [
    { city: 'amsterdam' },
    { city: 'zadar-split' }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const city = resolvedParams.city.toLowerCase()
  
  if (city !== 'amsterdam' && city !== 'zadar-split') {
    return {
      title: 'Ecosystem Not Found',
    }
  }

  const cityName = city === 'amsterdam' ? 'Amsterdam' : 'Zadar & Split'
  const title = `The ${cityName} Founder Ecosystem | FrankX`
  const description = `Field-tested guide to ${cityName} coworking spaces, the free baseline circuit, and local builder networks.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://frankx.ai/ecosystems/${city}`,
    },
    alternates: {
      canonical: `https://frankx.ai/ecosystems/${city}`,
    },
  }
}

function SchemaOrgJsonLd({ data }: { data: EcosystemData }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `The ${data.city} Founder Ecosystem`,
    description: `A field-tested coworking and workspace guide for the ${data.city} startup community.`,
    url: `https://frankx.ai/ecosystems/${data.city.toLowerCase().replace(/ & /g, '-')}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${data.city} Workspaces`,
      numberOfItems: data.spaces.length,
      itemListElement: data.spaces.map((space, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'LocalBusiness',
          name: space.name,
          address: space.address || `${data.city}, ${data.country}`,
          location: space.latitude && space.longitude ? {
            '@type': 'Place',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: space.latitude,
              longitude: space.longitude
            }
          } : undefined
        }
      }))
    }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default async function CityEcosystemPage({ params }: PageProps) {
  const resolvedParams = await params
  const city = resolvedParams.city.toLowerCase()
  
  if (city !== 'amsterdam' && city !== 'zadar-split') {
    notFound()
  }

  const data = (city === 'amsterdam' ? amsterdamData : zadarSplitData) as unknown as EcosystemData

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans">
      <SchemaOrgJsonLd data={data} />

      <header className="relative overflow-hidden border-b border-white/[0.08] pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-x-0 top-0 h-px bg-emerald-450/40" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Field Guide · {data.city} · July 2026
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-white">
            The {data.city} Founder Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-400 text-sm leading-relaxed sm:text-base">
            All spaces mapped and priced — plus the free circuit, academic clusters, and a weighted decision matrix. Built around field-tested builder motions.
          </p>

          <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500 font-mono">
            <span>Doctrine:</span>
            <span className="text-zinc-300 italic">"{data.doctrine}"</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Plate I — The Map */}
        <section id="map-section" className="space-y-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate I</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">The Cartography</h2>
          </div>
          <EcosystemMap spaces={data.spaces} />
        </section>

        {/* Plate II — The Free Circuit */}
        <section id="free-circuit">
          <FreeCircuitSection circuit={data.free_circuit} />
        </section>

        {/* Plate III — Comparison (Soho vs ADAM) */}
        {city === 'amsterdam' && (
          <section id="comparison" className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Plate III</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white mt-1">Soho House vs A'DAM — The Decision</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between border-l-4 border-l-emerald-500/80">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Recommended social layer</span>
                  <h3 className="text-xl font-semibold text-white mt-2">Soho House · Every House</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">approx €2,100 - €4,450/yr</p>
                  <ul className="mt-4 space-y-2.5 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span><strong>Global expansion default:</strong> Unlocks 50+ Houses.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between border-l-4 border-l-zinc-650">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Skip as default</span>
                  <h3 className="text-xl font-semibold text-white mt-2">A'DAM Works (A'DAM Toren)</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-1">€250/mo flex · €400/mo dedicated</p>
                  <ul className="mt-4 space-y-2.5 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-500 shrink-0">✓</span>
                      <span><strong>Music HQ:</strong> Sony, MassiveMusic, WINK.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Plate IV — A'DAM Toren detail */}
        {city === 'amsterdam' && (
          <section id="adam-toren">
            <AdamTorenSection adamToren={data.adam_toren} />
          </section>
        )}

        {/* Plate V — UvA Science Park & DLAB */}
        <section id="uva-cluster">
          <UvaClusterSection cluster={data.uva_science_park_cluster} dLab={data.demonstrator_lab} />
        </section>

        {/* Plate VI — Decision Matrix */}
        <section id="decision-matrix">
          <DecisionMatrix matrix={data.decision_matrix} />
        </section>

        {/* Plate VIII — Events Rail */}
        <section id="events-rail">
          <EventsRailSection events={data.events_rail} />
        </section>

        {/* Plate IX — Full Directory */}
        <section id="full-directory">
          <SpacesTable spaces={data.spaces} />
        </section>
      </main>

      <footer className="border-t border-white/[0.08] py-16 bg-[#09090b]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Workspace Ecosystem · Mapped for FrankX.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/ecosystems" className="hover:text-white transition-colors">Ecosystems Index</Link>
            <a href="https://github.com/frankxai/founder-ecosystems" className="hover:text-white transition-colors">Get Template</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
