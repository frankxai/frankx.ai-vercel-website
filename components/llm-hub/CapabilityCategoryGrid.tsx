import Link from 'next/link'
import { CAPABILITIES, CAPABILITY_ORDER } from '@/lib/llm-hub/capabilities'
import type { ProviderJoin } from '@/lib/llm-hub/registry'
import { getCapabilityGroups } from '@/lib/llm-hub/registry'

export function CapabilityCategoryGrid() {
  const groups = getCapabilityGroups()
  // Stable, controlled ordering
  const ordered = CAPABILITY_ORDER.map((cap) =>
    groups.find((g) => g.capability === cap)
  ).filter(Boolean) as Array<{ capability: keyof typeof CAPABILITIES; providers: ProviderJoin[] }>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ordered.map(({ capability, providers }) => {
        const meta = CAPABILITIES[capability]
        const Icon = meta.icon
        return (
          <div
            key={capability}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${meta.accent}1a`,
                  color: meta.accent,
                }}
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {meta.label}
              </h3>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-white/50">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {providers.length === 0 ? (
                <span className="text-[11px] italic text-white/30">
                  No tracked providers yet
                </span>
              ) : (
                providers.map((p) => (
                  <Link
                    key={p.org.slug}
                    href={`#${p.org.slug}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    style={{ borderColor: `${p.org.accent_color || '#888'}33` }}
                  >
                    {p.org.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
