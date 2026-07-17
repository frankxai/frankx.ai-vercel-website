import Link from 'next/link'
import { ArrowRight, Handshake, Users } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getPublishedPortalPartners } from '@/content/portal'
import { GlowCard } from '@/components/ui/glow-card'
import type { PortalRelationship } from '@/content/portal/types'

export const metadata = createMetadata({
  title: 'Partner Portal',
  description:
    'Personalized hubs for FrankX friends, allies, and partners — what Frank provides, the active build, the year plan, and curated recommendations.',
  path: '/portal',
})

const RELATIONSHIP_LABEL: Record<PortalRelationship, string> = {
  friend: 'Friend',
  ally: 'Ally',
  partner: 'Partner',
  enterprise: 'Enterprise',
}

export default function PortalHubPage() {
  const partners = getPublishedPortalPartners()

  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.22),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(6,182,212,0.13),transparent_32%),linear-gradient(135deg,#070808_0%,#0b1116_48%,#10100b_100%)]" />

        <div className="mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
            <Handshake className="h-4 w-4" />
            Partner Portal
          </div>
          <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            One hub per relationship.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
            What FrankX provides, the active build, the year plan, and the
            research, library, and download recommendations curated for that
            specific person or team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/allies"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
            >
              View allies
            </Link>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:border-white/45 hover:bg-white/10"
            >
              View enterprise partnerships
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2 text-sm font-bold text-white/45">
            <Users className="h-4 w-4" />
            Active portals
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {partners.map((partner) => (
              <GlowCard
                key={partner.slug}
                href={`/portal/${partner.slug}`}
                color={partner.accent === 'soul' ? 'amber' : partner.accent === 'bridge' ? 'teal' : 'emerald'}
                className="rounded-[2.2rem] p-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-3 py-1 text-xs font-bold text-white/70">
                  {RELATIONSHIP_LABEL[partner.relationship]}
                </span>
                <h2 className="mt-5 text-2xl font-black tracking-tight">
                  {partner.name}
                  {partner.org ? <span className="text-white/40"> · {partner.org}</span> : null}
                </h2>
                <p className="mt-3 text-base leading-7 text-white/68">{partner.tagline}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-100">
                  Open portal
                  <ArrowRight className="h-4 w-4" />
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
