import { notFound } from 'next/navigation'

import PromptDetailView from '@/components/prompt-library/PromptDetailView'
import { CATEGORIES, getPromptById, getPromptsByCategory } from '@/lib/prompts'

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
