import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Products | AI-Powered Tools for Creators & Architects',
  description: 'Explore the FrankX product suite: Agentic Creator OS, Creative AI Toolkit, Suno Prompt Library, and more. Built for creators who ship.',
  path: '/products',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
