import { notFound } from 'next/navigation'
import LearningPathPage from '@/components/learn/LearningPathPage'
import { learningPaths } from '@/data/learning-paths'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const path = learningPaths.find((candidate) => candidate.slug === slug)

  if (!path) notFound()

  return <LearningPathPage path={path} />
}
