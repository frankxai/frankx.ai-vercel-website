import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Multi-Cloud AI Comparison — AWS, Azure, Google Cloud & OCI',
  description:
    'Side-by-side comparison of AWS Bedrock, Azure AI Foundry, Google Vertex AI, and Oracle Cloud GenAI for enterprise AI architecture decisions.',
  path: '/ai-architecture/multi-cloud-comparison',
  keywords: [
    'multi-cloud ai comparison',
    'aws bedrock vs vertex ai vs azure',
    'enterprise ai cloud comparison',
    'cloud ai architecture',
  ],
})

export default function MultiCloudComparisonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
