import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'
import { getResearchTopic, researchTopics } from '@/lib/familie/private-portal-content'

export function generateStaticParams() {
  return researchTopics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const topic = getResearchTopic(slug)

  return {
    title: topic ? `${topic.eyebrow} · Privates Familienportal` : 'Thema nicht gefunden',
    description: topic?.description,
    robots: { index: false, follow: false, nocache: true },
  }
}

export default async function ResearchTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getResearchTopic(slug)

  if (!topic) notFound()

  return (
    <PrivateFamilyWorkspace
      eyebrow={topic.eyebrow}
      title={topic.title}
      description={topic.description}
      modules={[
        ...topic.questions.map((question, index) => ({
          title: `Prüffrage ${index + 1}`,
          description: question,
          state: 'bereit' as const,
        })),
        ...topic.nextSteps.map((step, index) => ({
          title: `Nächster Schritt ${index + 1}`,
          description: step,
          state: 'bereit' as const,
        })),
      ]}
    />
  )
}
