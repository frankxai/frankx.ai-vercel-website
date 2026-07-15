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

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children
}
