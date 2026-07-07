import Link from 'next/link'
import { ArrowUpRight, FileText, Handshake, Music2, PackageCheck, ShieldCheck } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Licensing',
  description:
    'Commercial licensing for FrankX music, templates, partner systems, software packs, and creative assets.',
  path: '/licensing',
})

const lanes = [
  {
    title: 'Music and sync',
    detail: 'Release masters, instrumentals, stems, cues, Canvas assets, and sync dossiers for brands, film, games, creators, and editorial projects.',
    icon: Music2,
  },
  {
    title: 'Templates and operating systems',
    detail: 'FrankX, ACOS, Music IS, workflow kits, prompts, and implementation packs for creators, teams, schools, and agencies.',
    icon: PackageCheck,
  },
  {
    title: 'Partner systems',
    detail: 'Public proof pages, private deal rooms, pilot scopes, co-marketing packages, and implementation support with clear rights boundaries.',
    icon: Handshake,
  },
  {
    title: 'Creative assets',
    detail: 'Art, covers, videos, books, essays, brand systems, and limited drops licensed only through explicit product terms or written agreement.',
    icon: FileText,
  },
]

const rules = [
  'Public pages are for trust and discovery. They do not grant reuse rights.',
  'Paid, gated, private, and partner-only materials cannot be scraped, resold, redistributed, or used for model training without written permission.',
  'Brand names, logos, trade dress, and product names are never included in a code or content license unless explicitly stated.',
  'Smart contracts and collectibles are access, provenance, or license records only. They are not investment products.',
]

const packages = [
  {
    tier: 'Pilot',
    fit: 'One partner team, one asset lane, one proof cycle.',
    scope: 'Rights matrix, private memo or proof page, light implementation support, renewal option.',
  },
  {
    tier: 'Standard',
    fit: 'Agencies, schools, creator teams, and operators who need repeatable use.',
    scope: 'Licensed templates or workflows, training session, support window, approved co-marketing copy.',
  },
  {
    tier: 'Premium',
    fit: 'Campaigns, launch partners, and high-touch creative or AI systems work.',
    scope: 'Custom implementation, Music IS or ACOS package, launch assets, partner proof dossier.',
  },
  {
    tier: 'Strategic',
    fit: 'Platform, lab, label, enterprise, or ecosystem-level relationship.',
    scope: 'Private deal room, executive proof, roadmap alignment, custom counsel-reviewed terms.',
  },
]

export default function LicensingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/10 px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/70">
            Licensing
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Use the work with clear rights.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
            FrankX licenses music, templates, operating systems, software packs,
            partner systems, and creative assets through explicit terms. Public
            access is not a reuse license.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:hello@frankx.ai?subject=Licensing%20request"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-400"
            >
              Request a license
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Affiliate policy
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {lanes.map((lane) => {
            const Icon = lane.icon
            return (
              <div key={lane.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-emerald-300" />
                <h2 className="mt-5 text-xl font-semibold">{lane.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{lane.detail}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">
            Partner packages
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Start small, prove value, expand cleanly.
          </h2>
          <div className="mt-10 grid gap-3">
            {packages.map((item) => (
              <div
                key={item.tier}
                className="grid gap-4 rounded-2xl border border-white/10 bg-[#0a0a0b] p-5 md:grid-cols-[140px_1fr_1.5fr] md:items-center"
              >
                <h3 className="text-lg font-semibold text-white">{item.tier}</h3>
                <p className="text-sm leading-6 text-zinc-300">{item.fit}</p>
                <p className="text-sm leading-6 text-zinc-500">{item.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-300" />
            <h2 className="text-2xl font-semibold">Rights rules</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {rules.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-[#0a0a0b] p-5 text-sm leading-6 text-zinc-300">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.05] p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">
            How requests are handled
          </p>
          <h2 className="mt-4 text-2xl font-semibold">Every serious asset gets a rights check.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300">
            A licensing request is reviewed against the asset owner, public or
            private tier, AI disclosure, source evidence, contributor credits,
            split policy, trademark boundary, and counsel requirement. If the
            rights are not clean, the asset does not ship.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/music-os" className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
              Music OS release gate
            </Link>
            <Link href="/partnerships" className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
              Strategic partnerships
            </Link>
            <Link href="/legal/terms" className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
              Terms
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
