import type { Metadata } from 'next'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import BookPage from '@/components/manifestation/BookPage'
import { theSecret, experiments } from '@/data/manifestation'

export const metadata: Metadata = createMetadata({
  title: 'The Secret, Read Honestly — Law of Attraction Without the Mysticism',
  description:
    "What The Secret and the Law of Attraction actually get right, what to ignore, and the grounded mechanisms underneath — with experiments you can run.",
  path: '/the-secret',
  keywords: ['the secret', 'law of attraction', 'rhonda byrne', 'does the law of attraction work', 'manifestation'],
})

const faqs = [
  {
    question: 'Does the Law of Attraction actually work?',
    answer:
      'Not as advertised. Focused attention plus a felt, specific intention changes what you notice and how you act — and those changes produce results. But "ask, believe, receive" leaves out the doing, and the quantum framing is metaphor. Read it as attention and behaviour, not physics.',
  },
  {
    question: 'Is The Secret based on science?',
    answer:
      'The "quantum physics" and "frequency of the universe" claims are metaphor, not science. The parts that hold up — vivid mental rehearsal, specificity, emotional state shaping behaviour — are grounded in neuroscience and behavioural science, just not in the way the book frames them.',
  },
  {
    question: 'What should I take from The Secret?',
    answer:
      'Get specific about what you want, feel it as real (which pre-loads behaviour and steadies your state), and then act on what your attention surfaces. Drop the implication that thinking alone delivers, and reject any idea that people attract their own misfortune.',
  },
]

export default function TheSecretPage() {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'The Secret, Read Honestly',
          description:
            'A grounded review of The Secret and the Law of Attraction: what works, what to ignore, and the real mechanisms underneath.',
          url: 'https://frankx.ai/the-secret',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />
      <FAQPageJsonLd faqs={faqs} />
      <BookPage
        title={theSecret.title}
        author={theSecret.author}
        year={theSecret.year}
        oneLine={theSecret.oneLine}
        honestTake={theSecret.honestTake}
        principlesHeading="Ask, Believe, Receive — reframed"
        principlesIntro="The famous three steps, with the grounded mechanism each one is really pointing at."
        principles={theSecret.principles}
        whatWorked={theSecret.whatWorked}
        whatToIgnore={theSecret.whatToIgnore}
        experiments={experiments.filter((x) => x.tag === 'attention' || x.tag === 'imagination')}
        experimentsIntro="Start with the two that test the real mechanism behind the book — imagination and attention."
      />
    </>
  )
}
