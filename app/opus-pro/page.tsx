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
      heroVideoId="eTTMUWP5B0s"
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
    >
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90">
          Active Development
        </p>
        <h2 className="text-2xl font-bold text-white">
          We are currently building this module in public.
        </h2>
        <p className="text-white/75 max-w-2xl">
          If this page is useful, send us an upvote signal and we will prioritize full rollout (workflows,
          templates, and clip automation examples).
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="mailto:hello@frankx.ai?subject=Opus%20Pro%20Upvote%20%E2%86%91"
            className="inline-flex items-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-300 transition-colors"
          >
            Upvote Interest
          </a>
          <a
            href="/contact"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Request Early Access
          </a>
        </div>
        <div className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white/80">
          Meme: "I only wanted one clip." Opus: "Great, here are 47."
        </div>
      </div>
    </StrategyPageLayout>
  )
}
