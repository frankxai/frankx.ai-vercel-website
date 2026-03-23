import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Frontend Design Patterns — Interactive Component Library | FrankX.AI',
  description:
    'Live component pattern library: hover effects, cursor-following glows, scroll animations, glassmorphic cards, and micro-interactions. Code alongside preview.',
  keywords: [
    'frontend patterns',
    'component library',
    'design patterns',
    'micro-interactions',
    'glassmorphism components',
  ],
  path: '/design-lab/frontend-design',
})

export default function FrontendDesignLayout({ children }: { children: React.ReactNode }) {
  return children
}
