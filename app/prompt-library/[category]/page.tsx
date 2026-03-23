import { notFound } from 'next/navigation'

import PromptCategoryView from '@/components/prompt-library/PromptCategoryView'
import { CATEGORIES, getPromptsByCategory, type PromptCategory } from '@/lib/prompts'
import { createMetadata } from '@/lib/seo'

// Generate static paths for all categories
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.id,
  }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params
  const categoryInfo = CATEGORIES.find((item) => item.id === categoryParam)

  if (!categoryInfo) {
    return createMetadata({
      title: 'Category Not Found',
      description: 'The requested prompt category was not found.',
      path: `/prompt-library/${categoryParam}`,
    })
  }

  return createMetadata({
    title: `${categoryInfo.name} Prompts - FrankX Prompt Library`,
    description: `${categoryInfo.description} Browse our curated collection of ${categoryInfo.name.toLowerCase()} prompts for AI tools.`,
    keywords: [categoryInfo.name.toLowerCase(), 'prompts', 'ai prompts', categoryInfo.id, 'prompt library'],
    path: `/prompt-library/${categoryParam}`,
  })
}

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
