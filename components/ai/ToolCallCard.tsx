'use client'

import { useState } from 'react'
import { ChevronDown, Loader2, Search, Sparkles, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolPart {
  type: string // e.g. 'tool-searchSite'
  toolCallId?: string
  state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  input?: any
  output?: any
  errorText?: string
}

const TOOL_LABELS: Record<string, { label: string; verb: string }> = {
  'tool-searchSite': { label: 'Searched the studio', verb: 'Searching' },
  'tool-getBlogPost': { label: 'Opened an article', verb: 'Reading' },
  'tool-recommendProduct': { label: 'Pulled products', verb: 'Looking up products' },
  'tool-recommendWorkshop': { label: 'Pulled workshops', verb: 'Looking up workshops' },
  'tool-bookDiscoveryCall': { label: 'Booking link ready', verb: 'Preparing booking link' },
  'tool-subscribeNewsletter': { label: 'Newsletter ready', verb: 'Preparing newsletter' },
}

function getMeta(type: string) {
  return TOOL_LABELS[type] || { label: type.replace(/^tool-/, ''), verb: 'Working' }
}

export default function ToolCallCard({ part }: { part: ToolPart }) {
  const [open, setOpen] = useState(false)
  const meta = getMeta(part.type)
  const running = part.state === 'input-streaming' || part.state === 'input-available'
  const errored = part.state === 'output-error'

  const out = part.output as any
  const results = out?.results || out?.products || out?.workshops
  const count: number | undefined = Array.isArray(results)
    ? results.length
    : typeof out?.count === 'number'
      ? out.count
      : undefined
  const bookingUrl = out?.bookingUrl || out?.subscribeUrl
  const single = out?.title ? out : null

  return (
    <div
      className={cn(
        'mt-2 rounded-xl border border-white/10 bg-black/30 text-[12.5px] text-white/75',
        running && 'animate-pulse',
        errored && 'border-rose-400/30 bg-rose-500/10 text-rose-200'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.04]"
      >
        {running ? (
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-white/55" />
        ) : (
          <Search className="h-3.5 w-3.5 shrink-0 text-white/55" />
        )}
        <span className="flex-1 truncate">
          {running ? `${meta.verb}…` : meta.label}
          {typeof count === 'number' && !running && (
            <span className="ml-1 text-white/45">· {count} result{count === 1 ? '' : 's'}</span>
          )}
        </span>
        {!running && (results?.length || single || bookingUrl) && (
          <ChevronDown
            className={cn('h-3.5 w-3.5 shrink-0 text-white/40 transition-transform', open && 'rotate-180')}
          />
        )}
      </button>

      {open && !running && (
        <div className="space-y-2 border-t border-white/[0.06] px-3 py-2">
          {errored && (
            <p className="text-rose-200">{part.errorText || 'Tool call failed.'}</p>
          )}

          {Array.isArray(results) &&
            results.slice(0, 5).map((r: any, i: number) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 transition-colors hover:border-white/15 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="line-clamp-1 text-[12.5px] font-medium text-white/90 group-hover:text-white">
                    {r.title}
                  </span>
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-white/30 transition-colors group-hover:text-white/70" />
                </div>
                {r.description && (
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] text-white/55">
                    {r.description}
                  </p>
                )}
              </a>
            ))}

          {single && (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
              <a
                href={single.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] font-medium text-white/90 hover:text-white"
              >
                {single.title}
              </a>
              {single.description && (
                <p className="mt-0.5 text-[11.5px] text-white/55">{single.description}</p>
              )}
            </div>
          )}

          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11.5px] font-medium text-emerald-200 hover:bg-emerald-400/20"
            >
              <Sparkles className="h-3 w-3" />
              {out?.bookingUrl ? 'Book a discovery call' : 'Subscribe to the newsletter'}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
