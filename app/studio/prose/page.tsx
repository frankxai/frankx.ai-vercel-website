import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('prose-producer')

export default function StudioProsePage() {
  return (
    <ProducerPlaceholderPage
      producerId="prose-producer"
      exampleSentence="One idea note. Translated to a blog draft, a LinkedIn thread, an X teardown, a newsletter section — all in the same voice, all passing the same brand-voice gate."
    />
  )
}
