import { learningPaths } from '@/data/learning-paths'
import { recommendedCourses } from '@/data/learning-catalog'
import JsonLd from '@/components/seo/JsonLd'
import LearnShell from '@/components/learn/LearnShell'

export default function LearnPage() {
  const learningCollectionSchema = {
    name: 'FrankX Learn',
    description:
      'Independent AI course selections, official resources, and capability-based learning paths.',
    url: 'https://frankx.ai/learn',
    hasPart: learningPaths.map((path) => ({
      '@type': 'LearningResource',
      name: path.title,
      description: path.description,
      url: `https://frankx.ai/learn/${path.slug}`,
      educationalLevel:
        path.difficulty === 'beginner'
          ? 'Beginner'
          : path.difficulty === 'intermediate'
            ? 'Intermediate'
            : 'Advanced',
      timeRequired: `PT${path.estimatedHours}H`,
    })),
  }

  const courseListSchema = {
    name: 'FrankX independent AI course selections',
    numberOfItems: recommendedCourses.length,
    itemListElement: recommendedCourses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.verdict,
        url: course.canonicalUrl,
        provider: { '@type': 'Organization', name: course.provider },
        educationalLevel: course.level,
      },
    })),
  }

  const breadcrumbSchema = {
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://frankx.ai/learn' },
    ],
  }

  return (
    <>
      <JsonLd type="CollectionPage" data={learningCollectionSchema} />
      <JsonLd type="ItemList" data={courseListSchema} />
      <JsonLd type="BreadcrumbList" data={breadcrumbSchema} />
      <LearnShell />
    </>
  )
}
