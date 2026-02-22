import { notFound } from 'next/navigation'

import dynamic from 'next/dynamic'

const PromptDetailView = dynamic(() => import('@/components/prompt-library/PromptDetailView'), {
  loading: () => <div className="min-h-screen bg-[#0a0a0b]" />,
})
import { CATEGORIES, PROMPTS, getPromptById, getPromptsByCategory } from '@/lib/prompts'
import { createMetadata } from '@/lib/seo'

// Generate static paths for all prompts
export function generateStaticParams() {
  return PROMPTS.map((prompt) => ({
    category: prompt.category,
    id: prompt.id,
  }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PromptPageProps) {
  const { category, id } = await params
  const prompt = getPromptById(id)

  if (!prompt || prompt.category !== category) {
    return createMetadata({
      title: 'Prompt Not Found',
      description: 'The requested prompt was not found.',
      path: `/prompt-library/${category}/${id}`,
    })
  }

  const categoryInfo = CATEGORIES.find((item) => item.id === prompt.category)

  return createMetadata({
    title: `${prompt.title} - ${categoryInfo?.name || 'Prompt'} | FrankX`,
    description: prompt.description,
    keywords: [...prompt.tags, prompt.aiTool, prompt.category, 'prompt', 'ai prompt'],
    path: `/prompt-library/${category}/${id}`,
  })
}

type PromptPageProps = {
  params: Promise<{ category: string; id: string }>
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { category, id } = await params
  const prompt = getPromptById(id)

  if (!prompt || prompt.category !== category) {
    notFound()
  }

  const categoryInfo = CATEGORIES.find((item) => item.id === prompt.category)
  const relatedPrompts = getPromptsByCategory(prompt.category).filter((item) => item.id !== prompt.id).slice(0, 3)

  return (
    <PromptDetailView prompt={prompt} category={categoryInfo} relatedPrompts={relatedPrompts} />
  )
}
