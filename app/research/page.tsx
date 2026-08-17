import ResearchHubLead from './research-hub-lead'
import ResearchHubClient from './research-hub-client'
import { hubFaqs } from '@/lib/research/swarm-board'

// JSON-LD is built from the static hub FAQ registry — not request input.
const faqLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: hubFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export default function ResearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <ResearchHubClient>
        <ResearchHubLead />
      </ResearchHubClient>
    </>
  )
}
