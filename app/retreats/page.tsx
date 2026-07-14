import { StarlightRetreatVision } from '@/components/retreats/StarlightRetreatVision'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Starlight Retreats — Founding vision',
  description:
    'A developing series of small working rooms and destination retreats where meaningful ideas become systems, artifacts and 30-day practices.',
  path: '/retreats',
  noindex: true,
})

export default function RetreatsPage() {
  return <StarlightRetreatVision />
}
