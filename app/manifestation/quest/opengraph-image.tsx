import { ImageResponse } from 'next/og'
import { ManifestationOg, OG_SIZE } from '@/lib/og/manifestation-og'

export const runtime = 'nodejs'
export const alt = 'The 10-Day Reality Architect Quest'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <ManifestationOg
      eyebrow="The Reality Architect Quest"
      lines={['10 days. One vision.', 'Shipped.']}
      footer="Manifestation Master → Reality Architect · a guided daily loop"
    />,
    { ...OG_SIZE }
  )
}
