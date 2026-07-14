import { TallinnFoundryPage } from '@/components/tallinn-experience/TallinnFoundryPage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tallinn Working Sessions — 90 minutes, one useful result',
  description:
    'An unlisted review page for small, independent Tallinn sessions. Each session helps 8–12 participants leave with a completed plan, worksheet, or team agreement. Nothing is booked yet.',
  path: '/experiences/tallinn-2026',
  noindex: true,
})

export default function TallinnExperienceFoundryPage() {
  const captureEnabled =
    process.env.VERCEL_ENV === 'production' &&
    process.env.TALLINN_CAPTURE_MODE === 'live' &&
    process.env.TALLINN_PRIVACY_NOTICE_APPROVED === 'true'

  return <TallinnFoundryPage captureEnabled={captureEnabled} />
}
