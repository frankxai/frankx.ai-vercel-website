import { TallinnFoundryPage } from '@/components/tallinn-experience/TallinnFoundryPage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tallinn Experience Foundry — Small rooms, working artifacts',
  description:
    'A private concept preview for independent, 90-minute working sessions in Tallinn: purpose, creator practice, and human + agent teams.',
  path: '/experiences/tallinn-2026',
  noindex: true,
})

export default function TallinnExperienceFoundryPage() {
  const captureEnabled =
    process.env.VERCEL_ENV === 'production' &&
    process.env.TALLINN_CAPTURE_MODE === 'live'

  return <TallinnFoundryPage captureEnabled={captureEnabled} />
}
