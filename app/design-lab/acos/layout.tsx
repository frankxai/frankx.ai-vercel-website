import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'ACOS Redesign Lab — Design Explorations | FrankX.AI',
  description:
    'Three design concepts for reimagining the ACOS page: Command Center, Skill Galaxy, and Flow Architecture. Live prototypes exploring how to present 75+ skills.',
  keywords: [
    'acos redesign',
    'design lab',
    'ui exploration',
    'skill visualization',
  ],
  path: '/design-lab/acos',
})

export default function ACOSDesignLabLayout({ children }: { children: React.ReactNode }) {
  return children
}
