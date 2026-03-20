import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import Script from 'next/script'

export const metadata: Metadata = createMetadata({
  title: 'AI Skills Assessment — Find Your Level | FrankX',
  description:
    'Measure your AI proficiency across 6 dimensions: Prompt Engineering, Tool Fluency, Agentic Thinking, Technical Foundation, Creative Application, and AI Ethics. Get personalized recommendations.',
  path: '/students/assess',
  keywords: ['ai skills assessment', 'ai proficiency test', 'ai career readiness', 'prompt engineering skills'],
  type: 'website',
})

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does the AI Skills Assessment measure?',
      acceptedAnswer: { '@type': 'Answer', text: 'Six dimensions of AI proficiency: Prompt Engineering, AI Tool Fluency, Agentic Thinking, Technical Foundation, Creative Application, and AI Ethics. Each scored 1-10 with personalized recommendations.' },
    },
    {
      '@type': 'Question',
      name: 'Is the assessment free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free. No account needed. Results are calculated in your browser and never sent to any server. You can export your results as JSON.' },
    },
  ],
}

export default function AssessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script id="assess-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
    </>
  )
}
