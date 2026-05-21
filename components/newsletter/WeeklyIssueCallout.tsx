import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import type { NewsletterIssue } from '@/lib/newsletter-issues'

interface WeeklyIssueCalloutProps {
  /** Latest issue (any status). */
  latest: NewsletterIssue | null
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function WeeklyIssueCallout({ latest }: WeeklyIssueCalloutProps) {
  if (!latest) return null

  const isLive = latest.status === 'sent' || latest.status === 'archived'
  const isUpcoming = !isLive
  const sendLabel = latest.sendAt ? formatDate(latest.sendAt) : formatDate(latest.date)

  return (
    <section className="relative border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] px-5 py-4">
          <div className="flex items-start md:items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                <span className="font-mono text-emerald-400">Issue {latest.issue}</span>
                {isUpcoming && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    {sendLabel ? `Ships ${sendLabel}` : 'Coming soon'}
                  </span>
                )}
                {isLive && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    Live
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base font-medium text-white truncate">
                {latest.subject}
              </p>
              {latest.preview && (
                <p className="text-xs md:text-sm text-white/50 leading-relaxed mt-0.5 line-clamp-1">
                  {latest.preview}
                </p>
              )}
            </div>
          </div>
          {isLive ? (
            <Link
              href={`/newsletter/archive/${latest.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors whitespace-nowrap"
            >
              Read Issue {latest.issue}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/newsletter/archive"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              See the archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
