import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { buildCourseData } from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'Build Your AI Creator OS | FrankX Courses',
  description:
    'Explore the free Claude Code introduction and source-based workflow lab. The wider eight-module AI Creator OS curriculum is a roadmap with further modules in development.',
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
    'An AI Creator OS learning path with a free Claude Code introduction and AI-generated source-based workflow lab. Further curriculum modules are in development.',
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
          educationalLevel: 'Beginner',
          teaches: [
            'Claude Code setup and configuration',
            'Source-based drafting and evidence checks',
            'Failure testing and human approval boundaries',
          ],
        }}
      />
      {children}
    </>
  )
}
