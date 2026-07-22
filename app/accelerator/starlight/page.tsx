import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'

export const metadata: Metadata = {
  title: 'Starlight Track — Systems Thesis for Portfolio Programs',
  description:
    'Starlight is the systems, agentic-company, and infrastructure thesis inside FrankX Venture Fabric — substrate, OS family, and Portfolio OS for B2B and operator-heavy portfolios.',
  alternates: { canonical: 'https://frankx.ai/accelerator/starlight' },
}

export default function StarlightTrackPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <AcceleratorSubnav active="/accelerator/starlight" />

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-violet-400/60">
          Thesis skin · Starlight
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          Starlight: the systems thesis.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          Starlight is the intelligence substrate and agentic-company architecture. When a portfolio
          is B2B, operator-led, CoE-shaped, or infrastructure-heavy, programs skin Portfolio OS with
          Starlight kits — not a separate random product line.
        </p>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <GlowCard color="violet" className="p-6">
            <h2 className="text-base font-semibold text-white">Substrate</h2>
            <p className="mt-2 text-sm text-white/60">
              Memory, skills, evals, multi-harness fleets —{' '}
              <a
                href="https://github.com/frankxai/Starlight-Intelligence-System"
                rel="noopener"
                className="text-violet-300 hover:underline"
              >
                Starlight Intelligence System
              </a>
              .
            </p>
          </GlowCard>
          <GlowCard color="cyan" className="p-6">
            <h2 className="text-base font-semibold text-white">Company OS</h2>
            <p className="mt-2 text-sm text-white/60">
              Business OS + Investor OS patterns for serious operators who need gates, not hype.
            </p>
          </GlowCard>
          <GlowCard color="white" className="p-6">
            <h2 className="text-base font-semibold text-white">Later brand</h2>
            <p className="mt-2 text-sm text-white/60">
              &ldquo;Starlight Accelerator&rdquo; may name a capital thesis after proof exists. Today
              it is a track inside Venture Fabric — not a promise of funding.
            </p>
          </GlowCard>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-6 flex flex-wrap gap-4">
          <Link href="/accelerator/portfolio-os" className="text-sm font-semibold text-cyan-300">
            Portfolio OS →
          </Link>
          <Link href="/accelerator/arcanea" className="text-sm font-semibold text-amber-300">
            Arcanea creative thesis →
          </Link>
          <Link href="/os" className="text-sm font-semibold text-white/60">
            FrankX OS surface →
          </Link>
        </div>
      </section>
    </main>
  )
}
