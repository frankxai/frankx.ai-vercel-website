import { TrackedLink } from '@/components/analytics/TrackedLink'
import { getJournalEntrySummaries, formatJournalDate } from '@/lib/journal'
import type { JournalHub } from '@/lib/journal-policy'

/** Reciprocal links share the public loader: a draft can never leak here. */
export function RelatedJournalNotes({ hub, articleSlug }: { hub?: JournalHub; articleSlug?: string }) {
  const entries = getJournalEntrySummaries().filter((entry) =>
    (hub && entry.topicHubs.includes(hub)) ||
    (articleSlug && entry.relatedArticles.includes(articleSlug)),
  ).slice(0, 3)
  if (!entries.length) return null
  return (
    <aside aria-label="Related founder notes" className="mt-10 border-t border-white/10 pt-7">
      <h2 className="text-sm font-medium text-white/80">From the founder journal</h2>
      <ul className="mt-3 space-y-2">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <TrackedLink href={`/journal/${entry.slug}`} eventName="journal_navigation"
              eventProperties={{ destination: 'contextual_entry', entry_kind: entry.kind }}
              className="inline-flex min-h-11 flex-col justify-center gap-1 text-sm text-tech-light hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-tech-light">
              {entry.title}
              <time dateTime={entry.date} className="text-xs text-white/65">{formatJournalDate(entry.date, 'short')}</time>
            </TrackedLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
