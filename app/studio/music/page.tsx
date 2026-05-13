import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('music-producer')

export default function StudioMusicPage() {
  return (
    <ProducerPlaceholderPage
      producerId="music-producer"
      exampleSentence="Drop a Suno export. NB2 cover. Higgsfield cinematic visualizer. Instagram carousel. Spotify-companion post. The 12,000+ catalog learns from every drop."
    />
  )
}
