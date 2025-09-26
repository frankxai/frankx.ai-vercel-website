import { notFound } from 'next/navigation'

import PromptCategoryView from '@/components/prompt-library/PromptCategoryView'
import { CATEGORIES, getPromptsByCategory, type PromptCategory } from '@/lib/prompts'

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params
  const category = categoryParam as PromptCategory
  const categoryInfo = CATEGORIES.find((item) => item.id === category)

  if (!categoryInfo) {
    notFound()
  }

  const prompts = getPromptsByCategory(category)
  const otherCategories = CATEGORIES.filter((item) => item.id !== categoryInfo.id)

  return (
    <PromptCategoryView
      category={categoryInfo}
      prompts={prompts}
      otherCategories={otherCategories}
    />
  )
}
