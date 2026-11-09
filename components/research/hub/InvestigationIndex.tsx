'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { FeaturedInvestigation } from '@/lib/research/featured-investigations'

export interface InvestigationStat {
  primary: string
  secondary: string
}

export interface LeadManifest {
  url: string
  rounds: string
  lastMeasured: string
  note?: string
}

const inspectables = [
  'Harness receipts as raw JSON',
  'Third-party figures with source and licence',
  'Methodology in the open repository',
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]'

export default function InvestigationIndex({
  items,
  stats,
  lead,
}: {
  items: FeaturedInvestigation[]
  stats: Record<string, InvestigationStat>
  lead: LeadManifest
}) {
  const [view, setView] = useState<'cards' | 'table'>('cards')
  const [first, ...rest] = items

  return (
    <section
      id="investigations"
      aria-labelledby="investigations-title"
      className="scroll-mt-24 border-b border-white/[0.08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">
              01 / Published investigations
            </p>
            <h2
              id="investigations-title"
              className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Investigations with their evidence attached
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Each piece publishes what it rests on. Open the one you need to check first.
            </p>
          </div>

          <div
            role="group"
            aria-label="Read the investigations as"
            className="hidden items-center gap-2 lg:flex"
          >
            <button
              type="button"
              aria-pressed={view === 'cards'}
              onClick={() => setView('cards')}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[13px] transition-colors ${focusRing} ${
                view === 'cards'
                  ? 'border-emerald-300/45 bg-emerald-300/[0.08] text-white'
                  : 'border-white/[0.08] text-white/55 hover:border-white/20 hover:text-white'
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              aria-pressed={view === 'table'}
              onClick={() => setView('table')}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[13px] transition-colors ${focusRing} ${
                view === 'table'
                  ? 'border-emerald-300/45 bg-emerald-300/[0.08] text-white'
                  : 'border-white/[0.08] text-white/55 hover:border-white/20 hover:text-white'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Cards. Hidden at md+ only when the reader chose the table. */}
        <ol className={`mt-8 grid gap-4 md:mt-10 md:grid-cols-2 ${view === 'table' ? 'lg:hidden' : ''}`}>
          <li className="md:col-span-2">
            <TrackedLink
              href={first.href}
              eventName="research_investigation_open"
              eventProperties={{ href: first.href, placement: 'research_lead' }}
              className={`group grid gap-6 rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.04] p-6 transition-colors hover:border-emerald-300/45 hover:bg-emerald-300/[0.06] sm:p-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 ${focusRing}`}
            >
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10.5px] tracking-[0.06em] text-emerald-200/90">
                    {first.kind}
                  </span>
                  <span className="font-mono text-[10.5px] text-white/40">01</span>
                </div>
                <h3 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {first.title}
                </h3>
                <p className="mt-4 max-w-[52ch] text-sm leading-6 text-white/70 md:text-[15px] md:leading-7">
                  {first.blurb}
                </p>
                <ul className="mt-6 grid gap-2">
                  {inspectables.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] text-white/70">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-emerald-300"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Open the receipts
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-emerald-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>

              <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a0b]/70">
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
                  <span className="font-mono text-[10px] tracking-[0.06em] text-white/45">
                    public JSON
                  </span>
                  <span className="font-mono text-[10px] text-emerald-300">GET</span>
                </div>
                <p className="break-all px-4 pt-3 font-mono text-[11.5px] leading-5 text-white/55">
                  {lead.url}
                </p>
                <dl className="grid grid-cols-2 gap-4 px-4 py-4">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.06em] text-white/40">rounds</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">
                      {lead.rounds}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.06em] text-white/40">
                      last measured
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">
                      {lead.lastMeasured}
                    </dd>
                  </div>
                </dl>
                {lead.note ? (
                  <p className="mt-auto border-t border-white/[0.08] px-4 py-3 text-[11.5px] leading-5 text-white/50">
                    {lead.note}
                  </p>
                ) : null}
              </div>
            </TrackedLink>
          </li>

          {rest.map((item, index) => {
            const stat = stats[item.href]
            return (
              <li key={item.href}>
                <TrackedLink
                  href={item.href}
                  eventName="research_investigation_open"
                  eventProperties={{ href: item.href, placement: 'research_featured' }}
                  className={`group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-emerald-300/35 hover:bg-emerald-300/[0.03] ${focusRing}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] tracking-[0.06em] text-emerald-200/80">
                      {item.kind}
                    </span>
                    <span className="font-mono text-[10.5px] text-white/40">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-white/60">{item.blurb}</p>
                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-4">
                    <p className="text-[11.5px] leading-5 text-white/50">
                      <span className="block font-medium text-white/75">{stat?.primary}</span>
                      {stat?.secondary}
                    </p>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 flex-none text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    />
                  </div>
                </TrackedLink>
              </li>
            )
          })}
        </ol>

        {/* Table. Only rendered on md+ because five columns need the width. */}
        <div className={`mt-10 hidden ${view === 'table' ? 'lg:block' : 'lg:hidden'}`}>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Published investigations, the evidence behind each one, and when it was last
              checked.
            </caption>
            <thead>
              <tr className="border-y border-white/[0.12]">
                {['No.', 'Investigation', 'What it rests on', 'Detail', ''].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="py-3 pr-6 font-mono text-[10px] font-normal tracking-[0.09em] text-white/45 last:pr-0"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const stat = stats[item.href]
                return (
                  <tr
                    key={item.href}
                    className="border-b border-white/[0.08] transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="w-10 py-5 pr-6 align-top font-mono text-[11px] text-white/40">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <th scope="row" className="py-5 pr-6 align-top font-normal">
                      <TrackedLink
                        href={item.href}
                        eventName="research_investigation_open"
                        eventProperties={{ href: item.href, placement: 'research_table' }}
                        className={`font-display text-[17px] font-semibold tracking-tight text-white hover:text-emerald-200 ${focusRing}`}
                      >
                        {item.title}
                      </TrackedLink>
                      <span className="mt-1 block text-[12.5px] text-white/50">{item.kind}</span>
                    </th>
                    <td className="py-5 pr-6 align-top text-[12.5px] text-white/65">
                      {stat?.primary}
                      <span className="mt-1 block font-mono text-[10.5px] text-white/40">
                        {stat?.secondary}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-5 pr-6 align-top font-mono text-[11px] text-white/45">
                      {item.meta}
                    </td>
                    <td className="w-6 py-5 align-top">
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-white/35" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
