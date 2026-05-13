import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('video-producer')

export default function StudioVideoPage() {
  return (
    <ProducerPlaceholderPage
      producerId="video-producer"
      exampleSentence="Record a 6-minute talking-head. Long-form for YouTube. Three shorts cut and captioned. Higgsfield Soul-ID fills the B-roll for moments you weren't on camera."
    />
  )
}
