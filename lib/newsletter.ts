import newsletterStreams from '@/data/newsletter-streams.json'

export type NewsletterStream = (typeof newsletterStreams.streams)[number]

export function getStreams(): NewsletterStream[] {
  return newsletterStreams.streams
}

export function getFeaturedStreams(): NewsletterStream[] {
  return newsletterStreams.streams.filter((s) => s.featured)
}

export function getStream(id: string): NewsletterStream | undefined {
  return newsletterStreams.streams.find((s) => s.id === id)
}

export function getStreamByListType(listType: string): NewsletterStream | undefined {
  return newsletterStreams.streams.find((s) => s.listType === listType)
}

// Color utility — maps stream color names to Tailwind classes
export function getStreamColors(stream: NewsletterStream) {
  const colorMap: Record<string, { text: string; bg: string; border: string; badge: string }> = {
    violet: {
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      badge: 'bg-violet-500/20 text-violet-300',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      badge: 'bg-emerald-500/20 text-emerald-300',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      badge: 'bg-amber-500/20 text-amber-300',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      badge: 'bg-purple-500/20 text-purple-300',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      badge: 'bg-blue-500/20 text-blue-300',
    },
    gold: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-400/30',
      badge: 'bg-amber-500/20 text-amber-300',
    },
  }
  return colorMap[stream.color] || colorMap.violet
}
