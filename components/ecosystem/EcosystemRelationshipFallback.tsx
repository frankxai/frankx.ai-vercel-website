import Link from 'next/link'
import {
  getPublicOperatingSystem,
  publicOperatingSystems,
  type OperatingSystemStage,
  type PublicOperatingSystem,
} from '@/data/public-operating-systems'

const STAGE_LABELS: Record<OperatingSystemStage, string> = {
  'open-source': 'Open source',
  'public-blueprint': 'Public blueprint',
  'private-system': 'Private system',
}

function RelatedLinks({ system }: { system: PublicOperatingSystem }) {
  const related = system.relatedSystemIds
    .map(getPublicOperatingSystem)
    .filter((entry): entry is PublicOperatingSystem => Boolean(entry))
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/[0.06] pt-4">
      {related.map((entry) => (
        <Link key={entry.id} href={entry.detailHref} className="text-xs text-zinc-500 transition-colors hover:text-cyan-300">
          {entry.name}
        </Link>
      ))}
    </div>
  )
}

export default function EcosystemRelationshipFallback({
  label = 'Public relationship lens',
  note = 'The public operating systems and the Starlight substrate they share.',
}: {
  label?: string
  note?: string
}) {
  return (
    <div className="border-y border-white/[0.08] bg-[#050607] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-medium text-cyan-300">{label}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            The public portfolio as an operating map
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{note}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {publicOperatingSystems.map((system) => (
            <article key={system.id} className="min-h-[230px] rounded-lg border border-white/[0.06] bg-white/[0.025] p-4">
              <Link href={system.detailHref} className="group block">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-tight text-zinc-50 group-hover:text-cyan-200">
                    {system.name}
                  </h3>
                  <span className="shrink-0 rounded-md border border-white/[0.08] px-2 py-0.5 text-[10px] text-zinc-500">
                    {STAGE_LABELS[system.stage]}
                  </span>
                </div>
                <p className="text-xs leading-5 text-zinc-500">{system.outcome}</p>
              </Link>
              <RelatedLinks system={system} />
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
