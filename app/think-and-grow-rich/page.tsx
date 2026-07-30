import type { Metadata } from 'next'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'
import BookPage from '@/components/manifestation/BookPage'
import { thinkAndGrowRich, experiments } from '@/data/manifestation'

export const metadata: Metadata = createMetadata({
  title: 'Think and Grow Rich as a System — Napoleon Hill, Reframed',
  description:
    "Napoleon Hill's 13 principles read as mechanisms, not mysticism: definiteness of purpose as a spec, auto-suggestion as mental rehearsal, the mastermind as your council.",
  path: '/think-and-grow-rich',
  keywords: ['think and grow rich', 'napoleon hill', '13 principles', 'definiteness of purpose', 'manifestation system'],
})

const faqs = [
  {
    question: 'Is Think and Grow Rich still worth reading?',
    answer:
      'Yes, if you read it as a set of mechanisms rather than a creed. It is uneven and occasionally mystical, and the research method behind it does not meet a modern bar — but its insistence on a definite, written goal pursued daily with other minds maps cleanly onto how you actually build things.',
  },
  {
    question: 'What is "definiteness of purpose"?',
    answer:
      'Hill\'s term for one clear, burning goal. In modern terms it is a spec: a single concrete outcome, written down, that beats a fog of vague wishes — the same reason a good brief beats vibes.',
  },
  {
    question: 'What is the mastermind principle?',
    answer:
      'Two or more minds aligned on a definite goal outperform one. Today that means your peer group — and your AI agents — operating as a coordinated council. Aligned minds compound.',
  },
]

export default function ThinkAndGrowRichPage() {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'Think and Grow Rich as a System',
          description:
            "Napoleon Hill's principles reframed as grounded mechanisms you can run — definiteness of purpose, auto-suggestion, the mastermind, persistence.",
          url: 'https://frankx.ai/think-and-grow-rich',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />
      <FAQPageJsonLd faqs={faqs} />
      <BookPage
        title={thinkAndGrowRich.title}
        author={thinkAndGrowRich.author}
        year={thinkAndGrowRich.year}
        oneLine={thinkAndGrowRich.oneLine}
        honestTake={thinkAndGrowRich.honestTake}
        principlesHeading="The principles, as mechanisms"
        principlesIntro="Six of Hill's load-bearing principles, each translated from 1937 language into the system it actually describes."
        principles={thinkAndGrowRich.principles}
        experiments={experiments.filter((x) => x.tag === 'imagination' || x.tag === 'system')}
        experimentsIntro="Hill's method is a system. Start with daily rehearsal, then run one full loop end to end."
      />
    </>
  )
}
