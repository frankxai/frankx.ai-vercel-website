import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { buildCourseData } from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'Build Your AI Creator OS | FrankX Courses',
  description:
    'The complete blueprint for building an AI-powered creator business. 8 modules covering Claude Code, ACOS, n8n automation, multi-agent swarms, and revenue systems.',
  path: '/courses/build-your-ai-creator-os',
  keywords: [
    'ai creator os',
    'claude code course',
    'agentic creator os',
    'acos',
    'n8n automation',
    'ai skills',
    'multi-agent systems',
    'creator business',
    'ai architect',
    'personal ai coe',
  ],
})

const courseSchema = buildCourseData({
  name: 'Build Your AI Creator OS',
  description:
    'The complete blueprint for building an AI-powered creator business. Learn Claude Code, ACOS, n8n automation, multi-agent swarms, and revenue systems from an AI Architect who ships this daily.',
  provider: 'FrankX.AI',
  url: 'https://frankx.ai/courses/build-your-ai-creator-os',
})

export default function BuildYourAICreatorOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        type="Course"
        data={{
          ...courseSchema,
          instructor: {
            '@type': 'Person',
            name: 'Frank Riemer',
            jobTitle: 'AI Architect',
            alumniOf: {
              '@type': 'Organization',
              name: 'Oracle',
            },
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'PT24H',
          },
          numberOfCredits: 8,
          educationalLevel: 'Intermediate',
          teaches: [
            'Claude Code setup and configuration',
            'ACOS (Agentic Creator OS) framework',
            'n8n workflow automation',
            'Multi-agent AI swarms',
            'Revenue system integration',
          ],
        }}
      />
      {children}
    </>
  )
}
