import { ImageResponse } from 'next/og'
import { ManifestationOg, OG_SIZE } from '@/lib/og/manifestation-og'

export const runtime = 'nodejs'
export const alt = 'Manifestation, Honestly — the Reality Architect Hub'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <ManifestationOg eyebrow="Manifestation, honestly" lines={['I ran it as', 'an experiment.']} />,
    { ...OG_SIZE }
  )
}
