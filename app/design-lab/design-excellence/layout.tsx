import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Design Excellence — Principles, Standards & Systems | FrankX.AI',
  description:
    'The FrankX design system: glassmorphism, dark-first color palette, typography scale, spacing grid, and component quality standards. Interactive reference.',
  keywords: [
    'design system',
    'glassmorphism',
    'dark mode design',
    'design excellence',
    'ui standards',
  ],
  path: '/design-lab/design-excellence',
})

export default function DesignExcellenceLayout({ children }: { children: React.ReactNode }) {
  return children
}
