import { ArrowUpRight } from 'lucide-react'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { DomainCategory } from '@/lib/research/domains'
import { researchHubs } from '@/lib/research/hubs'
import { publicResearchCategory, publicTopicMaps } from '@/lib/research/topic-maps.public'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]'

const mapCountForHub = (category: DomainCategory) =>
  publicTopicMaps.filter(
    (map) => publicResearchCategory(map.category) === category,
  ).length

/**
 * The seven hub doors. Brand marks for the frontier hub are carried by the model
 * watch section rather than repeated here.
 */
export default function HubDoors() {
  return (
    <section
      id="hubs"
      aria-labelledby="hubs-title"
      className="scroll-mt-24 border-b border-white/[0.08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">03 / Hubs</p>
          <h2
            id="hubs-title"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            {researchHubs.length} research hubs
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Each hub groups the topic maps that answer one question. Pick the question
            you are working on.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {researchHubs.map((hub) => {
            const count = mapCountForHub(hub.category)
            return (
              <li key={hub.slug} className="last:sm:col-span-2">
                <TrackedLink
                  href={`/research/hubs/${hub.slug}`}
                  eventName="research_hub_open"
                  eventProperties={{ hub: hub.slug, placement: 'research_index' }}
                  className={`group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-emerald-300/35 hover:bg-emerald-300/[0.03] ${focusRing}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] tracking-[0.06em] text-emerald-200/80">
                      {hub.question}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 flex-none text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-white">
                    {hub.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{hub.description}</p>
                  <p className="mt-4 font-mono text-[10.5px] text-white/40">{count} topic maps</p>
                </TrackedLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
