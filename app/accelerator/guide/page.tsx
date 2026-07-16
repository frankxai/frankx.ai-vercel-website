import type { Metadata } from 'next'
import Link from 'next/link'
import { AcceleratorSubnav } from '@/components/accelerator/AcceleratorSubnav'

export const metadata: Metadata = {
  title: 'Venture Fabric Guide — How FrankX Accelerator Works',
  description:
    'Operating model for FrankX Accelerator and Starlight Portfolio OS: layers, human gates, open modules, Foundry vs program routes, and what pilots include.',
  alternates: { canonical: 'https://frankx.ai/accelerator/guide' },
}

export default function AcceleratorGuidePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white/70">
      <AcceleratorSubnav active="/accelerator/guide" />
      <article className="mx-auto max-w-3xl px-6 pb-32 pt-16 lg:pt-24">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-400/60">
          Accelerator · Guide
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          How Venture Fabric works.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          A plain-language operating model for programs, partners, and serious operators. No return
          promises. No autonomous investing. Software, workflows, and human judgment.
        </p>

        <div className="mt-16 space-y-14 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white">The problem</h2>
            <p className="mt-4">
              Accelerators and funds already know how to select and advise. What breaks at scale is
              amplification: every founder reinvents AI tooling, diligence lives in scattered docs,
              and partner time cannot clone. Venture Fabric turns amplification into infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">The three layers</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5">
              <li>
                <strong className="text-white">L1 Founder</strong> —{' '}
                <Link href="/foundry" className="text-emerald-400 hover:underline">
                  Foundry
                </Link>{' '}
                installs one OS into one business.
              </li>
              <li>
                <strong className="text-white">L2 Portfolio</strong> —{' '}
                <Link href="/accelerator/portfolio-os" className="text-cyan-400 hover:underline">
                  Portfolio OS
                </Link>{' '}
                equips a program to support many companies.
              </li>
              <li>
                <strong className="text-white">L3 Capital brands</strong> — Starlight / Arcanea
                Accelerator names may attach capital theses later. They are not required to sell L1
                or L2.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">What a program pilot includes</h2>
            <ul className="mt-4 space-y-2">
              <li>· Fit evaluation and scope (diligence sprint <em>or</em> kit installs)</li>
              <li>· Program control plane (Git-first) and agent role pack</li>
              <li>· Day-0 OS kit pattern for portfolio companies</li>
              <li>· Human gate list for money, outreach, and publication</li>
              <li>· 30-day support loop template from Investor OS patterns</li>
            </ul>
            <p className="mt-4">
              Pilots do not include automated capital allocation, custody, legal fund setup, or
              guaranteed founder outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Open modules you can inspect today</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/frankxai/Starlight-Intelligence-System"
                  rel="noopener"
                  className="text-cyan-400 hover:underline"
                >
                  Starlight Intelligence System
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/frankxai/agentic-investor-os"
                  rel="noopener"
                  className="text-cyan-400 hover:underline"
                >
                  agentic-investor-os
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/frankxai/agentic-business-os"
                  rel="noopener"
                  className="text-cyan-400 hover:underline"
                >
                  agentic-business-os
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/frankxai/agentic-creator-os"
                  rel="noopener"
                  className="text-cyan-400 hover:underline"
                >
                  agentic-creator-os
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Thesis skins</h2>
            <p className="mt-4">
              <Link href="/accelerator/starlight" className="text-violet-300 hover:underline">
                Starlight
              </Link>{' '}
              emphasizes systems and operator infrastructure.{' '}
              <Link href="/accelerator/arcanea" className="text-amber-300 hover:underline">
                Arcanea
              </Link>{' '}
              emphasizes creative intelligence and taste. Same fabric, different kit emphasis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Next step</h2>
            <p className="mt-4">
              Programs:{' '}
              <Link href="/accelerator#apply" className="text-cyan-400 hover:underline">
                apply for a pilot
              </Link>
              . Founders:{' '}
              <Link href="/foundry" className="text-emerald-400 hover:underline">
                Foundry
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
