import { ImageResponse } from 'next/og'
import { ManifestationOg, OG_SIZE } from '@/lib/og/manifestation-og'

export const runtime = 'nodejs'
export const alt = 'Think and Grow Rich as a System'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <ManifestationOg
      eyebrow="Think and Grow Rich"
      lines={['Napoleon Hill,', 'as a system.']}
      footer="13 principles read as mechanisms, not mysticism"
    />,
    { ...OG_SIZE }
  )
}
