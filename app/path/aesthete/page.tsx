import { TrackingLink } from '@/components/ui/TrackingLink'
import AuroraGradient from '@/components/ui/AuroraGradient'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { PathMechanism } from '../PathMechanism'

export const metadata = createMetadata({
  title: 'The Creator',
  description: 'GenCreator: the framework for visual, musical, and narrative work. Principles, handbook, and blueprints.',
  path: '/path/aesthete',
})

const STEPS = [
  {
    title: 'Remove Technical Friction',
    body: 'Manual, ad-hoc handling of multi-modal work — video, audio, generative art — burns time you should be spending on taste. Systematize it.',
  },
  {
    title: 'Automate Without Losing the Signal',
    body: "Systemizing output doesn't have to flatten your voice. GenCreator scales the pipeline, not the taste.",
  },
  {
    title: 'Stop Paying Agency Overhead',
    body: "Keeping a high aesthetic bar shouldn't require unsustainable hours or outsourcing your voice. Build the leverage yourself.",
  },
] as const

export default function AesthetePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <AuroraGradient variant="purple" intensity="normal" className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-6 pb-24 pt-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="mb-6 text-sm text-fuchsia-300/80">The Creator</p>
          <div className="mb-6 max-w-4xl">
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <SplitTextReveal text="Where meaning" as="span" />
              <br />
              <SplitTextReveal text="meets execution." as="span" delay={0.2} className="text-fuchsia-300" />
            </h1>
          </div>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            I spent years as an AI architect at Oracle building systems that had to hold under real load. Then I pointed the same discipline at something no one asked me to: 12,000+ AI songs, a visual practice, a framework I called GenCreator. Aesthetic work still needs versioning, QA, and a repeatable pipeline — most creators just never build one.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/gencreator"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'aesthete' }}
              className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-fuchsia-500 px-8 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/20 transition-[background-color,box-shadow,transform] duration-200 hover:bg-fuchsia-600 hover:shadow-xl hover:shadow-fuchsia-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
            >
              Explore the GenCreator Framework
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </TrackingLink>
            <p className="ml-2 text-xs tracking-wide text-white/40">Principles, handbook, and blueprints — the actual system, not a course.</p>
          </div>
        </div>
      </AuroraGradient>
      <PathMechanism heading="The Pipeline" accent="fuchsia" steps={STEPS} />
    </main>
  )
}
