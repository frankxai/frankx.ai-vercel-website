import type { Metadata } from 'next'

/**
 * Route-segment layout for Ikigai V8 — Coach-first.
 *
 * V8 thesis: one Coach prompt drives the conversational arc; nine
 * micro-prompts are deepening tools. ~750 words total prompt content
 * (81% reduction from V5). Clean integer module numbering (1-9, no
 * fractional 1.5 hack).
 *
 * Use case page: the V8 preview lives at /workshops/ikigai/v8 alongside
 * V2-V7 archived previews. Canonical workshop stays at
 * /workshops/ikigai-branding. If V8 reads cleaner in NLDigital / Madrid
 * trial runs, promote its content to canonical with a single file swap.
 */

export const metadata: Metadata = {
  title: 'Ikigai & Branding Workshop V8 · FrankX',
  description:
    'V8 preview — one Coach prompt drives the conversation, nine micro-prompts sharpen each phase. Map purpose, write your sentence, ship a 30-day plan, walk out with three brand visuals. Free.',
  alternates: {
    canonical: '/workshops/ikigai/v8',
  },
  robots: {
    // V8 is a preview surface — keep out of the index until promoted to
    // canonical. Canonical at /workshops/ikigai-branding remains indexable.
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Ikigai & Branding Workshop V8',
    description:
      'One Coach. Nine modules. Less is more. 75 minutes. Free. For creators, operators, the AI-curious.',
    images: [
      {
        url: '/images/workshops/ikigai-branding/v4-hero-variant-1.jpg',
        width: 2560,
        height: 1440,
        alt: 'Ikigai workshop — sumi-e ink brushstroke on dark glass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikigai & Branding Workshop V8',
    description: 'One Coach. Nine modules. Map purpose, ship the artifact.',
  },
}

export default function IkigaiV8Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
