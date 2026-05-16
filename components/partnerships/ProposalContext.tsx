import type { ProposalStatus } from '@/content/partnerships/proposals/types'

type ProposalContextProps = {
  recipientRole: string
  sentDate: string
  status: ProposalStatus
}

/**
 * Provenance band — top of every unlisted proposal page. Communicates:
 *   – this URL is not public, it was sent to a specific recipient
 *   – the date it left Frank's hands
 *   – the current status in the proposal lifecycle
 *
 * Visual treatment: subdued amber/zinc, sits above the hero so the recipient
 * always has the context of what they are looking at without having to ask.
 * Status pill uses semantic color (draft = zinc, sent = blue, reviewing =
 * amber, closed-won = emerald, closed-archived = zinc/50).
 */
function statusColor(status: ProposalStatus): string {
  switch (status) {
    case 'draft':
      return 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20'
    case 'sent':
      return 'bg-blue-500/10 text-blue-300 border-blue-500/20'
    case 'reviewing':
      return 'bg-amber-500/10 text-amber-300 border-amber-500/20'
    case 'closed-won':
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    case 'closed-archived':
      return 'bg-zinc-500/5 text-zinc-500 border-zinc-500/10'
  }
}

function formatDate(date: string): string {
  if (date === 'draft') return 'Draft'
  try {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return date
  }
}

export function ProposalContext({
  recipientRole,
  sentDate,
  status,
}: ProposalContextProps) {
  return (
    <section
      aria-label="Proposal context"
      className="border-b border-amber-500/10 bg-amber-500/[0.025]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-300">
            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400/70 font-medium">
              Unlisted proposal
            </span>
            <span className="text-zinc-500" aria-hidden>
              ·
            </span>
            <span>
              Sent to{' '}
              <span className="text-white font-medium">{recipientRole}</span>
            </span>
            <span className="text-zinc-500" aria-hidden>
              ·
            </span>
            <span className="text-zinc-400">{formatDate(sentDate)}</span>
          </div>
          <span
            className={`inline-flex items-center gap-2 self-start sm:self-auto px-2.5 py-1 rounded-full border text-[11px] tracking-wide font-medium uppercase ${statusColor(status)}`}
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-current opacity-80"
            />
            {status.replace('-', ' ')}
          </span>
        </div>
      </div>
    </section>
  )
}
