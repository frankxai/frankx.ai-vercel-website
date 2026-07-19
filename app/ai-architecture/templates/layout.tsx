import { createMetadata } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'
import { templatesFaq } from './faq'

export const metadata = createMetadata({
  title: 'Free AI Starter Templates — MIT, Deploy to Vercel | FrankX',
  description: 'Free, MIT-licensed AI starter templates — RAG, multi-agent, MCP server, payments guard, and swarm governance — runnable, BYOK, and one-click deployable to Vercel.',
  path: '/ai-architecture/templates',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: templatesFaq.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(faqJsonLd) }} />
      {children}
    </>
  )
}
