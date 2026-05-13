import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('audio-producer')

export default function StudioAudioPage() {
  return (
    <ProducerPlaceholderPage
      producerId="audio-producer"
      exampleSentence="Walk-and-talk for 8 minutes. By the time you reach the machine, a blog draft, a podcast snippet, and a newsletter excerpt are ready for review."
    />
  )
}
