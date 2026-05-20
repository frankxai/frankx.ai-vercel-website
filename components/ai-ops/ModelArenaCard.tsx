'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import {
  formatContext,
  formatPricing,
  type ModelEntry,
  type OrganizationEntry,
} from '@/lib/llm-hub/registry'

interface ModelArenaCardProps {
  model: ModelEntry
  org?: OrganizationEntry
  index?: number
  highlight?: boolean
}

export function ModelArenaCard({ model, org, index = 0, highlight = false }: ModelArenaCardProps) {
  const accent = org?.accent_color || '#a855f7'
  const announcement = model.sources?.[0]
  const tags = (model.key_capabilities || []).slice(0, 3)

  return (
    <motion.article
      id={model.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className={`rounded-xl border p-6 transition-colors ${
        highlight
          ? 'border-[var(--accent-hi,#a855f7)]/30 bg-white/[0.03] hover:border-[var(--accent-hi,#a855f7)]/50'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
      }`}
      style={highlight ? ({ ['--accent-hi' as string]: accent } as React.CSSProperties) : undefined}
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          <h3 className="text-lg font-bold leading-tight">{model.name}</h3>
          {highlight ? (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
              style={{ backgroundColor: `${accent}33`, color: accent }}
            >
              New
            </span>
          ) : null}
          {model.status === 'preview' ? (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300">
              Preview
            </span>
          ) : null}
        </div>
        {announcement ? (
          <a
            href={announcement}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-white/30 transition-colors hover:bg-white/5 hover:text-white/70"
            aria-label="Announcement"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </header>

      <p className="mb-1 text-sm text-white/40">
        {org?.name || model.organization}
        {model.released ? ` · ${model.released}` : ''}
      </p>
      {model.frankx_notes ? (
        <p className="mb-4 text-sm leading-relaxed text-white/65">{model.frankx_notes}</p>
      ) : null}

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-white/[0.03] p-2">
          <p className="text-[10px] uppercase tracking-wider text-white/30">Context</p>
          <p className="font-mono text-sm font-medium text-white/85">
            {formatContext(model.context_window_beta || model.context_window)}
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.03] p-2">
          <p className="text-[10px] uppercase tracking-wider text-white/30">Output</p>
          <p className="font-mono text-sm font-medium text-white/85">
            {formatContext(model.max_output_tokens)}
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.03] p-2">
          <p className="text-[10px] uppercase tracking-wider text-white/30">In/Out</p>
          <p className="font-mono text-sm font-medium text-white/85">{formatPricing(model)}</p>
        </div>
      </div>

      {tags.length > 0 ? (
        <ul className="space-y-1.5 text-xs text-white/55">
          {tags.map((cap) => (
            <li key={cap} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              {cap}
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  )
}
