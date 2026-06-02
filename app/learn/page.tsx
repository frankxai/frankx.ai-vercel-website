import JsonLd from '@/components/seo/JsonLd'
import LearnShell from '@/components/learn/LearnShell'
import { learningPaths } from '@/data/learning-paths'

export default function LearnPage() {
  const learningPathSchema = {
    name: 'FrankX AI Learning Paths',
    description: 'Curated video learning paths covering AI architecture, music production with AI, prompt engineering, and creative AI workflows.',
    numberOfItems: learningPaths.length,
    itemListElement: learningPaths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LearningResource',
        name: path.title,
        description: path.description,
        url: `https://frankx.ai/learn/${path.slug}`,
        provider: { '@type': 'Organization', name: 'FrankX.AI' },
        educationalLevel: path.difficulty === 'beginner' ? 'Beginner' : path.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
        learningResourceType: 'Video',
        numberOfItems: path.videos.length,
      },
    })),
  }

  return (
    <>
      <JsonLd type="ItemList" data={learningPathSchema} />
      <LearnShell />
    </>
  )
}
