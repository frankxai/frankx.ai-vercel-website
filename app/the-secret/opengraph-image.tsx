import { ImageResponse } from 'next/og'
import { ManifestationOg, OG_SIZE } from '@/lib/og/manifestation-og'

export const runtime = 'nodejs'
export const alt = 'The Secret, Read Honestly'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <ManifestationOg
      eyebrow="The Secret · read honestly"
      lines={['The Law of Attraction,', 'without the mysticism.']}
      footer="What works, what to ignore, and the mechanism underneath"
    />,
    { ...OG_SIZE }
  )
}
