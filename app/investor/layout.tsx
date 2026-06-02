import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Invest with AI | Platforms, Research Tools & Prompts | FrankX',
  description:
    'Use AI to invest smarter. The platforms I use (Revolut, eToro, Crypto.com), research tools (Perplexity, Claude), and investment prompts that give you an edge.',
  path: '/investor',
  keywords: [
    'ai investing',
    'invest with ai',
    'ai investment research',
    'perplexity finance',
    'claude investing prompts',
    'revolut investing',
    'crypto.com',
    'swissborg',
    'portfolio management ai',
    'ai trading tools',
    'claude code investor',
    'investment thesis ai',
  ],
})

const investorLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://frankx.ai/investor#webpage',
      url: 'https://frankx.ai/investor',
      name: 'Invest with AI | Platforms, Research Tools & Prompts',
      description:
        'Use AI to invest smarter. The platforms I use (Revolut, eToro, Crypto.com), research tools (Perplexity, Claude), and investment prompts that give you an edge.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      about: {
        '@type': 'Thing',
        name: 'AI-Powered Investing',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://frankx.ai#org',
      name: 'FrankX',
      url: 'https://frankx.ai',
      description:
        'FrankX publishes AI tools, agent packs, workflows, and research stacks for individual investors and institutional teams.',
      founder: {
        '@type': 'Person',
        name: 'Frank Riemer',
        jobTitle: 'AI Architect',
      },
      sameAs: ['https://github.com/frankxai'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://frankx.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Investor Hub',
          item: 'https://frankx.ai/investor',
        },
      ],
    },
  ],
})

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: investorLd }}
      />
      {children}
    </>
  )
}
