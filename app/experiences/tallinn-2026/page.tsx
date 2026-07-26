import {
  isTallinnAmplifierOutcome,
  isTallinnAmplifierRole,
  TallinnStudioPage,
} from '@/components/tallinn-experience/TallinnStudioPage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tallinn Session Studio — Make the room travel farther',
  description:
    'An independent Tallinn session studio for speakers, coaches, tribe hosts, venues, and attendees. Shape a live idea into a participant artifact and useful follow-through.',
  path: '/experiences/tallinn-2026',
})

interface TallinnStudioRouteProps {
  searchParams: Promise<{ role?: string; outcome?: string }>
}

export default async function TallinnStudioRoute({ searchParams }: TallinnStudioRouteProps) {
  const { role, outcome } = await searchParams

  return (
    <TallinnStudioPage
      defaultRole={isTallinnAmplifierRole(role) ? role : undefined}
      defaultOutcome={isTallinnAmplifierOutcome(outcome) ? outcome : undefined}
    />
  )
}
