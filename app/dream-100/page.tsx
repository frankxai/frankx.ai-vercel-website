import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

import { PlatformHero, PlatformShell, SectionHeader } from '@/components/platform/platform-ui'
import { dream100, getMembersByCategory } from '@/lib/dream100'

export const metadata: Metadata = {
  title: 'Dream 100 — contribution before contact',
  description:
    'The people and organizations FrankX studies, supports, and hopes to earn the right to collaborate with over time.',
  alternates: { canonical: 'https://frankx.ai/dream-100' },
  openGraph: {
    title: 'Dream 100 — FrankX',
    description: 'A contribution engine for long-term relationships, not a prospect list.',
    url: 'https://frankx.ai/dream-100',
    type: 'website',
  },
}

const cohortLabel = { priority: 'Now', active: 'Active', horizon: 'Horizon' } as const

export default function Dream100Page() {
  const priority = dream100.members.filter((member) => member.priority === 1)

  return (
    <PlatformShell>
      <PlatformHero
        eyebrow="Dream 100 · Public registry"
        title="Contribution before contact."
        highlight="Long-term relationships, earned in public."
        deck="These are the people and organizations whose work changes how we build. The aim is not proximity for its own sake. It is to notice carefully, understand accurately, make something useful, and let collaboration become a possible consequence."
        primaryCta={{ label: 'Read this week’s signals', href: '/signals' }}
        secondaryCta={{ label: 'View creator specimens', href: 'https://gencreator.ai/showcase' }}
        metrics={[
          { value: '4 × 25', label: 'balanced fields of attention' },
          { value: String(priority.length), label: 'priority relationships this cycle' },
          { value: '5 stages', label: 'observe to collaborate' },
        ]}
        visualTitle="Relationship sequence"
        visualItems={['Observe', 'Understand', 'Contribute', 'Converse', 'Collaborate']}
      />

      <section className="border-y border-white/[0.07] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <SectionHeader
            eyebrow="Priority cohort"
            title="Twenty relationships receiving the clearest attention now"
            deck="Priority means higher research cadence and more deliberate contribution. It is not a judgment of status or value."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            {priority.map((member, index) => (
              <a key={member.id} href={member.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-[#0a0a0b] p-5 hover:bg-white/[0.035]">
                <span className="font-mono text-[11px] text-emerald-300/55">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-white">{member.name}</span>
                <ExternalLink className="h-3.5 w-3.5 text-white/25 group-hover:text-emerald-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow={`Registry · snapshot ${dream100.snapshotId}`}
            title="One hundred sources of consequential work"
            deck="Four fields prevent the list from collapsing into model-company attention alone. Each row records why the work matters and how closely it is being followed."
          />

          <div className="mt-16 space-y-24">
            {dream100.categories.map((category, categoryIndex) => {
              const members = getMembersByCategory(category.id)
              return (
                <section key={category.id} id={category.id} className="scroll-mt-28">
                  <div className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[170px_1fr]">
                    <p className="font-mono text-xs text-emerald-300">{String(categoryIndex + 1).padStart(2, '0')} / 04</p>
                    <div>
                      <h2 className="text-3xl font-semibold tracking-tight text-white">{category.title}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/52">{category.description}</p>
                    </div>
                  </div>
                  <ol>
                    {members.map((member, index) => (
                      <li key={member.id} className="grid gap-4 border-b border-white/[0.075] py-6 sm:grid-cols-[50px_220px_90px_1fr_auto] sm:items-start">
                        <span className="font-mono text-[11px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                        <a href={member.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-200">
                          {member.name} <ExternalLink className="h-3 w-3 text-white/25 group-hover:text-emerald-300" />
                        </a>
                        <span className="w-fit rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/42">
                          {cohortLabel[member.cohort]}
                        </span>
                        <p className="max-w-2xl text-sm leading-6 text-white/48">{member.why}</p>
                        <Link href="/signals" className="inline-flex items-center gap-1 text-xs text-white/35 hover:text-emerald-300">
                          Signals <ArrowRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.018] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Operating rule" title={dream100.principle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <p className="text-base leading-8 text-white/60">{dream100.methodology.relationship}</p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/signals" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
                Inspect the evidence ledger <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://gencreator.ai/showcase" className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-white">
                Open the creator showcase <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PlatformShell>
  )
}
