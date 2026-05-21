import { getStreams } from '@/lib/newsletter'
import { getLatestIssue } from '@/lib/newsletter-issues'
import NewsletterHero from '@/components/newsletter/NewsletterHero'
import StreamShowcase from '@/components/newsletter/StreamShowcase'
import StreamCompare from '@/components/newsletter/StreamCompare'
import NewsletterCTA from '@/components/newsletter/NewsletterCTA'
import WeeklyIssueCallout from '@/components/newsletter/WeeklyIssueCallout'

export default function NewsletterPage() {
  const streams = getStreams()
  const latestIssue = getLatestIssue()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <WeeklyIssueCallout latest={latestIssue} />
      <NewsletterHero streams={streams} />
      <StreamShowcase streams={streams} />
      <StreamCompare streams={streams} />
      <NewsletterCTA />
    </main>
  )
}
