import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'

export const metadata: Metadata = {
  title: 'Arcanea Track — Creative Thesis for Portfolio Programs',
  description:
    'Arcanea is the creative intelligence thesis inside FrankX Venture Fabric — media, worldbuilding, design taste, and creator OS packs for culture-heavy portfolios.',
  alternates: { canonical: 'https://frankx.ai/accelerator/arcanea' },
}

export default function ArcaneaTrackPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <AcceleratorSubnav active="/accelerator/arcanea" />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-400/60">
          Thesis skin · Arcanea
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          Arcanea: the creative thesis.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          Arcanea is premium creative intelligence — worlds, media, music, design systems, and
          taste. Programs focused on creators, IP, entertainment, or culture-heavy products skin
          Portfolio OS with Arcanea packs so amplification includes craft, not only ops automation.
        </p>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <GlowCard color="amber" className="p-6">
            <h2 className="text-base font-semibold text-white">Creative OS</h2>
            <p className="mt-2 text-sm text-white/60">
              Creator OS kits, studio patterns, and agent packs for content and product storytelling.
            </p>
          </GlowCard>
          <GlowCard color="violet" className="p-6">
            <h2 className="text-base font-semibold text-white">Taste systems</h2>
            <p className="mt-2 text-sm text-white/60">
              Design contracts, visual intelligence, and quality gates so portfolio output stays
              premium under speed.
            </p>
          </GlowCard>
          <GlowCard color="white" className="p-6">
            <h2 className="text-base font-semibold text-white">Later brand</h2>
            <p className="mt-2 text-sm text-white/60">
              &ldquo;Arcanea Accelerator&rdquo; may name a creative capital thesis later. Today it is
              a track and kit family — not an open fundraise claim.
            </p>
          </GlowCard>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-6 flex flex-wrap gap-4">
          <Link href="/accelerator/portfolio-os" className="text-sm font-semibold text-cyan-300">
            Portfolio OS →
          </Link>
          <Link href="/accelerator/starlight" className="text-sm font-semibold text-violet-300">
            Starlight systems thesis →
          </Link>
          <a
            href="https://github.com/frankxai/agentic-creator-os"
            rel="noopener"
            className="text-sm font-semibold text-amber-300"
          >
            agentic-creator-os →
          </a>
        </div>
      </section>
    </main>
  )
}
