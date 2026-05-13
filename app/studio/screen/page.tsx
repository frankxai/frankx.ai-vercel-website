import { ProducerPlaceholderPage, makeProducerMetadata } from '@/components/studio/ProducerPlaceholderPage'

export const dynamic = 'force-static'
export const metadata = makeProducerMetadata('screen-producer')

export default function StudioScreenPage() {
  return (
    <ProducerPlaceholderPage
      producerId="screen-producer"
      exampleSentence="Record yourself shipping a feature. Out comes a tutorial blog, a 60-second Short, a GitHub README section, and a Mermaid diagram of the architecture. SE content as first-class."
    />
  )
}
