import PromptLibraryView from '@/components/prompt-library/PromptLibraryView'
import { CATEGORIES, PROMPTS, getFeaturedPrompts, getPromptStats } from '@/lib/prompts'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Prompt Library',
  description:
    'Explore high-performance prompt systems for Claude, ChatGPT, Midjourney, Suno, and more—curated for the FrankX Intelligence Atlas.',
  path: '/prompt-library',
})

export default function PromptLibraryPage() {
  const stats = getPromptStats()
  const featuredPrompts = getFeaturedPrompts()

  return (
    <PromptLibraryView
      prompts={PROMPTS}
      categories={CATEGORIES}
      featuredPrompts={featuredPrompts}
      stats={stats}
    />
  )
}
