import { StrategyPageLayout } from '@/components/strategy/StrategyPageLayout'

export const metadata = {
  title: 'Short-Form Nexus | FrankX Strategy',
  description: 'The architectural multiplier for accelerating reach through AI-powered content atomization.',
}

export default function ShortFormNexusPage() {
  return (
    <StrategyPageLayout
      title="Short-Form Nexus"
      description="The multiplier engine for the modern architect. We use AI to atomize high-fidelity content into a thousand points of discovery."
      heroVideoId="pOLR5jE5Vjw"
      stats={[
        { label: 'Multiplication', value: '20x' },
        { label: 'Velocity', value: 'Instant' },
        { label: 'Surface Area', value: 'Global' },
        { label: 'Cost', value: 'Minimal' },
      ]}
      steps={[
        {
          title: 'Content Atomization',
          description: 'We treat long-form video as a library of discrete intellectual atoms. Every statement, every insight, and every demo is an entry point into your deeper ecosystem.'
        },
        {
          title: 'Algorithmic Resonance',
          description: 'Use AI to identify moments of high resonance. Opus Pro acts as our signal detector, finding the specific frames and frequencies that will trigger the algorithmic discovery engines.'
        },
        {
          title: 'High-Fidelity Framing',
          description: 'Precision in the edit. We ensure every vertical clip maintains the aesthetic depth of the original, using face-tracking and code-cropping to keep the focus on the value.'
        },
        {
          title: 'Omni-Channel Distribution',
          description: 'A single insight cascaded across TikTok, Reels, and Shorts. This isn\'t just posting; it\'s building a cloud of presence that always points back to your primary intelligence hub.'
        }
      ]}
      tools={[
        {
          name: 'Opus Clip',
          description: 'The core engine for AI content atomization.',
          url: 'https://opus.pro'
        },
        {
          name: 'Typefully',
          description: 'Strategic scheduling for LinkedIn and X.',
          url: 'https://typefully.com'
        },
        {
          name: 'FrankX Brand Kit',
          description: 'Unified visual standards for all short-form output.',
          url: '/brand'
        }
      ]}
    />
  )
}
