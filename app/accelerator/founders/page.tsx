import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'

export const metadata: Metadata = {
  title: 'For Founders — FrankX Accelerator Route Map',
  description:
    'Founders and operators: get a single AI-native business OS via FrankX Foundry. Portfolio OS is for accelerators and funds equipping many companies.',
  alternates: { canonical: 'https://frankx.ai/accelerator/founders' },
}

export default function AcceleratorFoundersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/80">
      <AcceleratorSubnav active="/accelerator/founders" />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
          Founder route
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          You probably want the Foundry — not a fund control plane.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          If you are building one company, one studio, or one service practice, the right product is
          an installed operating system for <em>your</em> brand. That is Foundry. Portfolio OS is for
          people who equip many companies at once.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/foundry"
            className="rounded-full bg-emerald-400 px-8 py-3.5 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300"
          >
            Go to Foundry
          </Link>
          <Link
            href="/foundry/guide"
            className="px-2 py-3.5 text-sm font-semibold text-white/60 hover:text-white"
          >
            Read the operating guide
          </Link>
        </div>
      </section>

      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GlowCard color="emerald" href="/foundry" className="p-8">
            <p className="font-mono text-xs text-emerald-400/70">RIGHT FIT</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Foundry install</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>· One business, one brand, one OS</li>
              <li>· Website + agent harness + claims gate + memory</li>
              <li>· Weekly operating rhythm</li>
              <li>· Application-only, evaluated installs</li>
            </ul>
          </GlowCard>
          <GlowCard color="cyan" href="/accelerator/portfolio-os" className="p-8">
            <p className="font-mono text-xs text-cyan-400/70">ONLY IF</p>
            <h2 className="mt-2 text-xl font-semibold text-white">You run a program</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>· Accelerator, studio, fund, or partner network</li>
              <li>· Need shared diligence + kits for many startups</li>
              <li>· Want white-label machinery with human gates</li>
              <li>· Apply on the Accelerator hub instead</li>
            </ul>
          </GlowCard>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-6 text-sm text-white/50">
          Creator-heavy builders can also explore open modules at{' '}
          <a
            href="https://github.com/frankxai/agentic-creator-os"
            rel="noopener"
            className="text-emerald-400 hover:underline"
          >
            agentic-creator-os
          </a>{' '}
          and the broader product ladder on frankx.ai.
        </p>
      </section>
    </main>
  )
}
