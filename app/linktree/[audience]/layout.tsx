import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ audience: string }>
}

const audienceTitles: Record<string, { title: string; description: string }> = {
  students: {
    title: 'Frank X. Riemer | Resources for Students & Learners',
    description:
      'Free AI resources, tutorials, starter kits, and learning paths. Start building with AI today — curated by Frank X. Riemer.',
  },
  creators: {
    title: 'Frank X. Riemer | Tools for Creators & Artists',
    description:
      'Music production, content systems, and creative AI tools. 65+ AI tracks, prompt library, and the GenCreator framework — by Frank X. Riemer.',
  },
  devs: {
    title: 'Frank X. Riemer | Resources for Developers & Architects',
    description:
      'Open-source agents, agentic systems, and enterprise AI architecture. ACOS, GitHub projects, and technical deep-dives — by Frank X. Riemer.',
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
