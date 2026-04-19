import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Learn Orchestration | Arrange, Score & Conduct Music | FrankX Music Academy',
  description:
    'Master orchestration — learn to arrange music for ensembles, understand instrument families, read scores, and use AI for orchestral composition. From an AI Architect who creates orchestral music.',
  path: '/music/learn/orchestration',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
