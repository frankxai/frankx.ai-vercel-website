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
    slug: 'book-workshop',
    destination: 'https://frankx.ai/workshops',
    label: 'Book a FrankX workshop',
    category: 'other',
    description:
      'Safe public fallback for workshop booking CTAs while a dedicated booking calendar is verified.',
  },
  {
    slug: 'ikigai-coach',
    destination:
      'https://chatgpt.com/g/g-69301df74bd8819184c26dfc0b50d65a-ikigai-branding-coach',
    label: 'Ikigai & Branding Coach GPT',
    category: 'coach-gpt',
    description:
      'Free custom GPT that walks you through Ikigai mapping and brand translation via Socratic questioning.',
  },
  {
    slug: 'ikigai-notion-template',
    destination: 'https://frankx.ai/workshops/ikigai-branding',
    label: 'Ikigai Notion template',
    category: 'tool',
    description:
      'Needs owner verification for the final Notion duplicate URL. Falls back to the workshop hub instead of a dead redirect.',
  },
  {
    slug: 'ikigai-sheet-template',
    destination: 'https://frankx.ai/workshops/ikigai-branding',
    label: 'Ikigai Google Sheet template',
    category: 'tool',
    description:
      'Needs owner verification for the final Google Sheet URL. Falls back to the workshop hub instead of a dead redirect.',
  },
  {
    slug: 'claude-cowork',
    destination: 'https://frankx.ai/workshops/ikigai-branding',
    label: 'Claude Cowork',
    category: 'tool',
    description:
      'Needs owner verification for the final Claude artifact URL. Falls back to the workshop hub instead of a dead redirect.',
  },
  {
    slug: 'ikigai-prompt-scaffold',
    destination: 'https://frankx.ai/workshops/ikigai-branding',
    label: 'Ikigai prompt scaffold',
    category: 'tool',
    description:
      'Needs owner verification for the final prompt scaffold asset. Falls back to the workshop hub instead of a dead redirect.',
  },
]

export function getOutboundLink(slug: string): OutboundLink | undefined {
  return outboundLinks.find((l) => l.slug === slug)
}
