import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Readiness Assessment | FrankX',
  description:
    'Evaluate your AI readiness across strategy, tools, skills, and implementation. Get personalized recommendations and a clear roadmap for your AI journey.',
  path: '/assess',
  keywords: [
    'ai readiness assessment',
    'ai maturity evaluation',
    'ai adoption strategy',
    'ai skills assessment',
    'ai implementation readiness',
  ],
})

// FAQ schema for structured data
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does the AI Readiness Assessment measure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The assessment evaluates four dimensions of AI readiness: Strategy (organizational approach to AI adoption and governance), Tools (daily AI tool usage and evaluation processes), Skills (prompt engineering, agent architectures, and technical proficiency), and Implementation (production deployment experience and ROI measurement).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the AI Readiness Assessment take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The assessment contains 15 carefully designed questions and takes approximately 3 to 5 minutes to complete. Results are generated instantly with personalized recommendations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I get after completing the assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You receive an overall AI readiness score, a category-by-category breakdown across Strategy, Tools, Skills, and Implementation, your AI maturity level (Explorer, Builder, Architect, or Visionary), and three personalized content recommendations. You can also unlock a detailed report by providing your email.',
      },
    },
  ],
}

export default function AssessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
