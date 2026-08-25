import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  GitBranch,
  ShieldCheck,
} from 'lucide-react'

import { FoundryStudies } from '@/components/v0/FoundryStudies'
import {
  creatorLaunchTemplate,
  releaseGates,
  verticalRoadmap,
  v0Studies,
} from '@/content/v0/foundry'

export const metadata: Metadata = {
  title: 'Vertical Product Foundry | FrankX',
  description:
    'Free deployable creator products, reviewed v0 interface studies, and the engineering evidence behind each release.',
  alternates: { canonical: '/v0' },
  openGraph: {
    title: 'Vertical Product Foundry | FrankX',
    description:
      'Free deployable creator products, reviewed v0 interface studies, and the engineering evidence behind each release.',
    url: '/v0',
    type: 'website',
  },
}

const lifecycle = [
  { number: '01', label: 'Publish', note: 'Make the offer legible.' },
  { number: '02', label: 'Capture', note: 'Earn the next conversation.' },
  { number: '03', label: 'Convert', note: 'Create a clean decision path.' },
  { number: '04', label: 'Deliver', note: 'Keep the promise visible.' },
  { number: '05', label: 'Retain', note: 'Design the second use.' },
  { number: '06', label: 'Measure', note: 'Track activation, not theater.' },
] as const

const sourcePolicy = [
  {
    title: 'FrankX free templates',
    note: 'Public source, an explicit license, documented setup, and deployment evidence.',
  },
  {
    title: 'v0 interface studies',
    note: 'Interactive design references. A working preview is not presented as a deployable product.',
  },
  {
    title: 'Commercial operating kits',
    note: 'Provider wiring, fulfillment, updates, and support must be named and verified separately.',
  },
] as const

export default function V0FoundryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/10 pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-28">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-emerald-300/80">
              FrankX / Vertical Product Foundry
            </p>
            <h1 className="mt-7 max-w-5xl text-balance font-display text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Useful software,
              <span className="block text-white/45">made public.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58 sm:text-xl">
              Free vertical products for creators, authors, communities, and AI builders—plus the
              design studies and release evidence behind them.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#free-template"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Inspect the free flagship
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#interface-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Browse 19 interface studies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111214]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Product lifecycle
                </span>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/35">
                Shared kernel
              </span>
            </div>
            <ol className="grid sm:grid-cols-2">
              {lifecycle.map((step, index) => (
                <li
                  key={step.label}
                  className={`p-5 sm:p-6 ${index % 2 === 0 ? 'sm:border-r sm:border-white/10' : ''} ${
                    index < lifecycle.length - 2 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <span className="font-mono text-[10px] text-emerald-300/60">{step.number}</span>
                  <p className="mt-3 font-display text-lg font-semibold">{step.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/40">{step.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="free-template" className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/75">
                First public release
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
                One free product with a real release contract.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/42">
              The older v0 outputs remain studies. This is the first package with isolated public
              source, cloud gates, and a clean Vercel deployment path.
            </p>
          </div>

          <article className="mt-10 grid overflow-hidden rounded-[2rem] border border-white/10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[430px] overflow-hidden bg-[#f2efe6] p-7 text-[#11120f] sm:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64645c]">
                    Edition Zero / Free starter
                  </p>
                  <p className="mt-5 max-w-xl font-display text-5xl font-semibold leading-[0.93] tracking-[-0.05em] sm:text-6xl">
                    Make the work easy to trust—and easier to buy.
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#11120f] text-sm font-bold text-[#f2efe6]">
                  0
                </span>
              </div>

              <div className="absolute inset-x-7 bottom-7 rounded-[1.5rem] bg-[#11120f] p-5 text-[#f2efe6] sm:inset-x-10 sm:bottom-10 sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Verified gates
                  </span>
                  <span className="font-mono text-2xl text-[#d9ff5a]">5/6</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  {['Offer', 'Delivery', 'Proof'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/60">
                      <Check className="h-3.5 w-3.5 text-[#d9ff5a]" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#111214] p-7 sm:p-10">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                    {creatorLaunchTemplate.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                    Release candidate
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {creatorLaunchTemplate.name}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">
                  {creatorLaunchTemplate.description}
                </p>
                <ul className="mt-7 divide-y divide-white/10 border-y border-white/10">
                  {creatorLaunchTemplate.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3 py-4 text-sm leading-6 text-white/62">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={creatorLaunchTemplate.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  View public source
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={creatorLaunchTemplate.deployUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/75 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Deploy with Vercel
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {creatorLaunchTemplate.evidence.map((item) => (
              <div key={item} className="border-l border-white/10 pl-4">
                <p className="text-xs leading-5 text-white/42">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="interface-studies" className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">
              Interface intelligence
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              Nineteen studies. Zero false deployment claims.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/48">
              These v0 generations are useful for composition, interaction, and domain translation.
              They are linked as interactive references until each receives public source, security
              review, tests, and a clean-account deploy receipt.
            </p>
          </div>
          <div className="mt-10">
            <FoundryStudies studies={v0Studies} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d0e10] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/70">
                Portfolio sequence
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Build the shared kernel, then earn each vertical.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                Identity, content, commerce, delivery, events, analytics, and workflows compound.
                The audience-specific product should stay focused.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {verticalRoadmap.map((item) => (
                <div
                  key={item.product}
                  className="grid gap-3 py-6 sm:grid-cols-[72px_0.8fr_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300/60">
                    {item.stage}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">{item.product}</p>
                    <p className="mt-1 text-xs text-white/35">{item.audience}</p>
                  </div>
                  <p className="text-sm leading-6 text-white/48">{item.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Release contract
                </p>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                A maturity label is a claim.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
                “Demo,” “remixable,” and “deployable” are different states. The interface names the
                state and links the evidence instead of collapsing them into one button.
              </p>
            </div>

            <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {releaseGates.map((gate, index) => (
                <li key={gate} className="bg-[#101113] p-5 sm:p-6">
                  <span className="font-mono text-[10px] text-emerald-300/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-sm leading-6 text-white/62">{gate}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {sourcePolicy.map((item) => (
              <div key={item.title} className="border-t border-white/15 pt-5">
                <h2 className="font-display text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/42">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-7 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.05] p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/75">
                Build with the system
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Start from a product promise, then use v0 where visual iteration compounds.
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href={creatorLaunchTemplate.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Fork the free template
                <GitBranch className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Commission a vertical build
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
