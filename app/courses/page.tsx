import JsonLd from '@/components/seo/JsonLd'
import CoursesShell, { courseCardsForSchema } from '@/components/courses/CoursesShell'

export default function CoursesPage() {
  const courseListSchema = {
    name: 'FrankX Course Roadmap',
    description:
      'Planned course roadmap for AI foundations, agent architecture systems, and creator business systems.',
    numberOfItems: courseCardsForSchema.length,
    itemListElement: courseCardsForSchema.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: `https://frankx.ai${course.href}`,
        provider: { '@type': 'Organization', name: 'FrankX.AI' },
      },
    })),
  }

  return (
    <>
      <JsonLd type="ItemList" data={courseListSchema} />
      <CoursesShell />
    </>
  )
}
