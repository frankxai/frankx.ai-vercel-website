import {
  isTallinnAmplifierOutcome,
  isTallinnAmplifierRole,
  TallinnStudioPage,
} from '@/components/tallinn-experience/TallinnStudioPage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tallinn Session Studio — Independent companion concept',
  description:
    'An independent FrankX session studio for people gathering in Tallinn during Mindvalley U 2026.',
  path: '/experiences/mindvalley-university-tallinn-2026',
  canonical: 'https://frankx.ai/experiences/tallinn-2026',
  noindex: true,
})

interface TallinnAliasRouteProps {
  searchParams: Promise<{ role?: string; outcome?: string }>
}

export default async function TallinnAliasRoute({ searchParams }: TallinnAliasRouteProps) {
  const { role, outcome } = await searchParams

  return (
    <TallinnStudioPage
      defaultRole={isTallinnAmplifierRole(role) ? role : undefined}
      defaultOutcome={isTallinnAmplifierOutcome(outcome) ? outcome : undefined}
    />
  )
}
