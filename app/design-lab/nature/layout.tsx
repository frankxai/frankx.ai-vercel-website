import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Nature × Technology Design System — Digital Garden Aesthetic | FrankX.AI',
  description:
    'A premium design philosophy merging organic intelligence with dark technology. Bioluminescent networks, crystal gardens, neural forests — 10 concept images and complete design guidelines for nature-inspired tech interfaces.',
  keywords: [
    'nature tech design',
    'digital garden aesthetic',
    'bioluminescent ui',
    'organic technology design',
    'dark nature theme',
    'premium tech design',
    'glassmorphism nature',
    'ai generated design concepts',
  ],
  path: '/design-lab/nature',
})

export default function NatureDesignLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
