/**
 * Outbound short-link registry.
 *
 * Any external URL we promote (custom GPTs, tools, partner pages) goes through
 * /go/[slug] so we can:
 *   1. Track clicks (PostHog event + JSONL log fallback)
 *   2. Change the destination in one place if the external URL breaks
 *   3. Keep our domain visible in every share
 *
 * Add an entry here, then link to `/go/<slug>` anywhere on the site.
 */

export interface OutboundLink {
  slug: string
  destination: string
  label: string
  category: 'coach-gpt' | 'tool' | 'partner' | 'social' | 'other'
  description?: string
}

export const outboundLinks: OutboundLink[] = [
  {
    slug: 'ikigai-coach',
    destination:
      'https://chatgpt.com/g/g-69301df74bd8819184c26dfc0b50d65a-ikigai-branding-coach',
    label: 'Ikigai & Branding Coach GPT',
    category: 'coach-gpt',
    description:
      'Free custom GPT that walks you through Ikigai mapping and brand translation via Socratic questioning.',
  },
]

export function getOutboundLink(slug: string): OutboundLink | undefined {
  return outboundLinks.find((l) => l.slug === slug)
}
