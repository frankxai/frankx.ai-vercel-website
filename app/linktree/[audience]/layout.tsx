import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ audience: string }>
}

const audienceTitles: Record<string, { title: string; description: string }> = {
  students: {
    title: 'Frank X. Riemer | Resources for Students & Learners',
    description:
      'AI tutorials, starter resources, and learning paths curated by Frank X. Riemer.',
  },
  creators: {
    title: 'Frank X. Riemer | Tools for Creators & Artists',
    description:
      'Music tools, content systems, the public prompt library, and creator resources from Frank X. Riemer.',
  },
  devs: {
    title: 'Frank X. Riemer | Resources for Developers & Architects',
    description:
      'Open-source agents, agent systems, enterprise AI architecture, and public GitHub projects from Frank X. Riemer.',
  },
}

export async function generateStaticParams() {
  return [{ audience: 'students' }, { audience: 'creators' }, { audience: 'devs' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { audience } = await params
  const meta = audienceTitles[audience] || audienceTitles.students

  return createMetadata({
    title: meta.title,
    description: meta.description,
    path: `/linktree/${audience}`,
    image: `/api/og?title=FrankX Links&subtitle=${encodeURIComponent(
      audience === 'students'
        ? 'For Students & Learners'
        : audience === 'creators'
          ? 'For Creators & Artists'
          : 'For Developers & Architects'
    )}`,
    type: 'website',
  })
}

export default function AudienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
