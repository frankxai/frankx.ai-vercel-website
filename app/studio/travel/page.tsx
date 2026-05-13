import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('travel-producer')

export default function StudioTravelPage() {
  return (
    <ProducerPlaceholderPage
      producerId="travel-producer"
      exampleSentence="EXIF-tagged photos from Open Camera. Instagram carousel with location context, blog post with story, Stories for the daily notebook. Travel logs that build themselves."
    />
  )
}
