import { StrategyPageLayout } from '@/components/strategy/StrategyPageLayout'

export const metadata = {
  title: 'Video Intelligence | FrankX Strategy',
  description: 'The architectural framework for building narrative gravity and trust through high-fidelity video.',
}

export default function VideoIntelligencePage() {
  return (
    <StrategyPageLayout
      title="Video Intelligence"
      description="A framework for creators who build with depth. Transform high-fidelity video from a distribution channel into a source of narrative gravity."
      heroVideoId="VMj-3S1tku0"
      stats={[
        { label: 'Retention', value: 'High' },
        { label: 'Signal', value: 'Pure' },
        { label: 'Intent', value: 'Direct' },
        { label: 'Format', value: 'Atmos' },
      ]}
      steps={[
        {
          title: 'Establish Narrative Gravity',
          description: "We don't capture attention; we create gravity. By solving fundamental technical problems with uncompromising depth, we attract the builders who value precision over hype."
        },
        {
          title: 'Integrated Knowledge Nodes',
          description: 'Every video acts as a node in your intelligence network. Embedded directly into research-backed articles, video provides the human dimension to technical documentation.'
        },
        {
          title: 'The Resonance Loop',
          description: 'Design content that invites participation. When viewers code along with a "Build With Me" session, they aren\'t just consumers—they are practitioners in your ecosystem.'
        },
        {
          title: 'Semantic Discovery',
          description: 'Optimize for the query, not the algorithm. By being the definitive answer to specific technical challenges, you build a library of permanent value.'
        }
      ]}
      tools={[
        {
          name: 'Obsidian + Claude',
          description: 'Scripting and research synthesis.',
          url: 'https://claude.ai'
        },
        {
          name: 'Screen Studio',
          description: 'High-quality screen recording with auto-zoom.',
          url: 'https://screen.studio'
        },
        {
          name: 'Descript',
          description: 'Text-based video editing for rapid rough cuts.',
          url: 'https://descript.com'
        }
      ]}
    />
  )
}
