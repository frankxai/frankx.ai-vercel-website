import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Models 2026 | Frontier Model Benchmarks | FrankX',
  absoluteTitle: true,
  description:
    'Compare frontier AI models across reasoning, coding, multimodal capability, context, pricing, and independently published benchmarks.',
  path: '/ai-ops/models-2026',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
