import { getStreams } from '@/lib/newsletter'
import NewsletterHero from '@/components/newsletter/NewsletterHero'
import StreamShowcase from '@/components/newsletter/StreamShowcase'
import StreamCompare from '@/components/newsletter/StreamCompare'
import NewsletterCTA from '@/components/newsletter/NewsletterCTA'

export default function NewsletterPage() {
  const streams = getStreams()

  return (
    <main className="relative min-h-screen bg-[#0a0a0b]">
      <NewsletterHero streams={streams} />
      <StreamShowcase streams={streams} />
      <StreamCompare streams={streams} />
      <NewsletterCTA />
    </main>
  )
}
