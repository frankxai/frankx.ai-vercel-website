import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Learn | Independent AI Course Picks & Learning Paths',
  description:
    'Find the right AI course for your goal. Independent course selections, free ecosystem maps, AI Architect Academy paths, and practical FrankX field notes.',
  path: '/learn',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
