import Link from 'next/link'
import { ExternalLink, MapPin } from 'lucide-react'
import { CapabilityBadge } from './CapabilityBadge'
import { formatContext, formatPricing, type ProviderJoin } from '@/lib/llm-hub/registry'

interface ProviderCardProps {
  provider: ProviderJoin
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const { org, flagship, models, platforms } = provider
  const accent = org.accent_color || '#a855f7'
  const anchor = `#${org.slug}`

  return (
    <article
      id={org.slug}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden
            />
            <h3 className="text-lg font-bold leading-tight">{org.name}</h3>
          </div>
          <p className="text-xs text-white/40">
            {org.founded ? `Founded ${org.founded}` : null}
            {org.founded && org.headquarters ? ' · ' : null}
            {org.headquarters ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" aria-hidden />
                {org.headquarters}
              </span>
            ) : null}
          </p>
        </div>
        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md p-1.5 text-white/30 transition-colors hover:bg-white/5 hover:text-white/70"
          aria-label={`Visit ${org.name}`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </header>

      {org.one_liner ? (
        <p className="mb-4 text-sm leading-relaxed text-white/60">{org.one_liner}</p>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {(org.capability_focus || []).map((cap) => (
          <CapabilityBadge key={cap} capability={cap} href={`${anchor}-${cap}`} />
        ))}
      </div>

      {flagship ? (
        <div
          className="mb-4 rounded-xl border p-3"
          style={{ borderColor: `${accent}26`, backgroundColor: `${accent}0d` }}
        >
          <p
            className="mb-0.5 text-[10px] uppercase tracking-wider"
            style={{ color: accent }}
          >
            Flagship
          </p>
          <p className="text-sm font-semibold text-white">{flagship.name}</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
            <div>
              <p className="text-white/30">Context</p>
              <p className="font-mono text-white/80">
                {formatContext(flagship.context_window_beta || flagship.context_window)}
              </p>
            </div>
            <div>
              <p className="text-white/30">Price (in/out)</p>
              <p className="font-mono text-white/80">{formatPricing(flagship)}</p>
            </div>
            <div>
              <p className="text-white/30">Released</p>
              <p className="font-mono text-white/80">{flagship.released || '—'}</p>
            </div>
          </div>
        </div>
      ) : null}

      {models.length > 0 ? (
        <div className="mb-4">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-white/30">
            Models ({models.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {models.map((m) => (
              <Link
                key={m.id}
                href={`/llm-hub/${m.id}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60 transition-colors hover:border-white/30 hover:text-white"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {models.some((m) =>
        ['claude-fable-5', 'claude-opus-4-8', 'gpt-5-5', 'grok-4-3', 'gemini-3-5-flash', 'gemini-3-5-pro', 'kimi-k2-7-code', 'minimax-m3', 'nemotron-3-ultra'].includes(m.id)
      ) ? (
        <Link
          href="/blog/frontier-model-routing-without-fable-5"
          className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2 text-xs leading-relaxed text-emerald-200/80 transition-colors hover:border-emerald-400/40 hover:text-emerald-100"
        >
          Mentioned in the Frontier Model Freedom routing guide
        </Link>
      ) : null}

      {platforms.length > 0 ? (
        <div className="mb-4">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-white/30">
            Agentic platforms
          </p>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60 transition-colors hover:border-white/30 hover:text-white"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {org.notable_tech && org.notable_tech.length > 0 ? (
        <div className="mt-auto border-t border-white/5 pt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wider text-white/30">
            Notable tech
          </p>
          <p className="text-xs leading-relaxed text-white/50">
            {org.notable_tech.join(' · ')}
          </p>
        </div>
      ) : null}
    </article>
  )
}
