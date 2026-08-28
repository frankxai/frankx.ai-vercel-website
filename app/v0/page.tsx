import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Check, ExternalLink, ShieldCheck } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { FoundryStudio } from '@/components/v0/FoundryStudio'
import { FoundryStudies } from '@/components/v0/FoundryStudies'
import { FoundryWorkflow } from '@/components/v0/FoundryWorkflow'
import {
  creatorLaunchTemplate,
  releaseGates,
  templatePortfolio,
  v0Studies,
} from '@/content/v0/foundry'

export const metadata: Metadata = {
  title: 'Product Foundry',
  description:
    'Live v0 interface studies, an open creator-business starter, and the workflow that turns visual prototypes into evidence-backed products.',
  alternates: { canonical: '/v0' },
  openGraph: {
    title: 'Product Foundry | FrankX',
    description:
      'Live v0 interface studies, an open creator-business starter, and the workflow that turns visual prototypes into evidence-backed products.',
    url: '/v0',
    type: 'website',
  },
}

const sourcePolicy = [
  {
    title: 'Open FrankX templates',
    note: 'Public source, an explicit license, documented setup, and reproducible deployment evidence.',
  },
  {
    title: 'Interactive design references',
    note: 'Live v0 studies make visual ideas inspectable. They are not labeled as products without source and release proof.',
  },
  {
    title: 'Clean-room commercial research',
    note: 'We study observable workflows, then write original specifications. Proprietary code, assets, and prompts are never copied.',
  },
] as const

export default function V0FoundryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <FoundryStudio studies={v0Studies} />

      <section id="free-template" className="border-b border-white/10 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] text-emerald-300/75">The open flagship</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                One product you can actually take home.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-white/48 lg:justify-self-end">
              Creator Launch OS is the first release with public source, an MIT license, clean cloud
              gates, responsive evidence, and a direct Vercel deployment path.
            </p>
          </div>

          <article className="mt-10 overflow-hidden rounded-[1.8rem] border border-white/12 bg-[#111214]">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
              <div className="relative min-h-[470px] overflow-hidden border-b border-white/10 bg-[#e9e4da] lg:min-h-[680px] lg:border-b-0 lg:border-r">
                <Image
                  src="/images/v0/template/creator-launch-os-desktop.webp"
                  alt="Creator Launch OS storefront and release studio"
                  fill
                  priority={false}
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-full bg-black/80 px-4 py-3 backdrop-blur sm:inset-x-6 sm:bottom-6">
                  <span className="font-mono text-[10px] text-white/58">Captured from the public source</span>
                  <span className="font-mono text-[10px] text-lime-300">Responsive review passed</span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-10">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1.5 font-mono text-[10px] text-emerald-300">
                      {creatorLaunchTemplate.label}
                    </span>
                    <span className="font-mono text-2xl text-lime-300">6/6</span>
                  </div>
                  <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                    {creatorLaunchTemplate.name}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-white/55">{creatorLaunchTemplate.description}</p>
                  <div className="mt-8 border-y border-white/10">
                    <p className="py-4 font-mono text-[10px] text-white/35">Verified gates</p>
                    <ul className="divide-y divide-white/10 border-t border-white/10">
                      {creatorLaunchTemplate.capabilities.map((capability) => (
                        <li key={capability} className="flex gap-3 py-4 text-xs leading-5 text-white/58">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-300" aria-hidden="true" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackedLink
                    href={creatorLaunchTemplate.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    eventName="v0_template_source_clicked"
                    eventProperties={{ template: creatorLaunchTemplate.slug }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    View public source
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href={creatorLaunchTemplate.deployUrl}
                    target="_blank"
                    rel="noreferrer"
                    eventName="v0_template_deploy_clicked"
                    eventProperties={{ template: creatorLaunchTemplate.slug }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/72 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    Deploy with Vercel
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <FoundryWorkflow />

      <section id="interface-studies" className="border-b border-white/10 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] text-cyan-300/70">Visual source index</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                See the work before you read the label.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-lg text-sm leading-7 text-white/48">
                Seven studies are captured as visual evidence. All nineteen remain live and searchable.
                Each is an interactive design reference until it earns product-level proof.
              </p>
              <p className="mt-3 font-mono text-[10px] text-emerald-300/65">Zero false deployment claims</p>
            </div>
          </div>
          <div className="mt-10">
            <FoundryStudies studies={v0Studies} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0c0d0e] py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] text-emerald-300/70">Business systems</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Twenty-two businesses. Two clear lanes.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-white/48 lg:justify-self-end">
              Creators need an audience-to-delivery workflow. AI startups need a task-to-reliable-operation
              workflow. The shared kernel compounds; the surface stays specific.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {templatePortfolio.map((lane) => (
              <section key={lane.lane} aria-labelledby={`lane-${lane.lane.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-6">
                  <div>
                    <h3 id={`lane-${lane.lane.replace(/\s+/g, '-').toLowerCase()}`} className="font-display text-2xl font-semibold">
                      {lane.lane}
                    </h3>
                    <p className="mt-3 max-w-lg text-xs leading-5 text-white/40">{lane.promise}</p>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">{lane.products.length} builds</span>
                </div>
                <ol className="divide-y divide-white/10">
                  {lane.products.map((item, index) => (
                    <li key={item.product} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 py-5 sm:grid-cols-[34px_0.8fr_1.2fr] sm:gap-5">
                      <span className="font-mono text-[10px] text-emerald-300/52">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-sm font-semibold text-white/78">{item.product}</p>
                        <p className="mt-1 text-[11px] text-white/30">{item.audience}</p>
                      </div>
                      <p className="col-start-2 text-xs leading-5 text-white/42 sm:col-start-auto">{item.outcome}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <p className="font-mono text-[11px] tracking-[0.12em] text-white/40">Release contract</p>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                A maturity label is a claim.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                Demo, remixable source, and deployable product are different states. The interface
                names the state and keeps the evidence beside it.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {releaseGates.map((gate, index) => (
                <li key={gate} className="bg-[#101113] p-5 sm:p-6">
                  <span className="font-mono text-[10px] text-emerald-300/55">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-3 text-sm leading-6 text-white/62">{gate}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-3">
            {sourcePolicy.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/42">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-7 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/[0.055] p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] text-emerald-300/75">Start from proof</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                Clone the open product, then use v0 where visual iteration compounds.
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <TrackedLink
                href={creatorLaunchTemplate.deployUrl}
                target="_blank"
                rel="noreferrer"
                eventName="v0_final_cta_clicked"
                eventProperties={{ destination: 'deploy_template' }}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Deploy the free template
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/shop/templates"
                eventName="v0_final_cta_clicked"
                eventProperties={{ destination: 'commercial_templates' }}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white/72 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                See commercial builds
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
