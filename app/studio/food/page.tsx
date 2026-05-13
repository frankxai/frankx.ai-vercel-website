import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('food-producer')

export default function StudioFoodPage() {
  return (
    <ProducerPlaceholderPage
      producerId="food-producer"
      exampleSentence="Photo of the dish plus a 30-second voice note about the chef's technique. Instagram carousel, Threads post, running travel-blog entry. Restaurant to publish in under ten minutes."
    />
  )
}
