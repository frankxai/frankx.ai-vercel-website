import { TrackingLink } from '@/components/ui/TrackingLink'
import AuroraGradient from '@/components/ui/AuroraGradient'
import InteractiveCard from '@/components/ui/InteractiveCard'
import { SplitTextReveal } from '@/components/ui/SplitTextReveal'
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'The Creator | FrankX',
  description: 'GenCreator: the framework for visual, musical, and narrative work. Principles, handbook, and blueprints.',
  path: '/path/aesthete',
})

export default function AesthetePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <AuroraGradient variant="purple" intensity="normal" className="relative min-h-[85vh] overflow-hidden flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-fuchsia-400/80">
              The Creator
            </p>
          </div>
          
          <div className="mb-6 max-w-4xl">
            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
              <SplitTextReveal text="Where meaning" as="span" />
              <br />
              <SplitTextReveal text="meets execution." as="span" delay={0.2} className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400" />
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            I spent years as an AI architect at Oracle building systems that had to hold under real load. Then I pointed the same discipline at something no one asked me to: 12,000+ AI songs, a visual practice, a framework I called GenCreator. Aesthetic work still needs versioning, QA, and a repeatable pipeline — most creators just never build one.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/gencreator"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'aesthete' }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 h-14 text-sm font-medium shadow-lg shadow-fuchsia-500/20 transition-[background-color,box-shadow,transform] hover:shadow-xl hover:shadow-fuchsia-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] active:scale-[0.98]"
            >
              Explore the GenCreator Framework
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </TrackingLink>
            <p className="text-xs text-white/40 font-medium ml-2 tracking-wide">Principles, handbook, and blueprints — the actual system, not a course.</p>
          </div>
        </div>
      </AuroraGradient>

      <section className="border-t border-white/5 py-24 bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">The Pipeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InteractiveCard glowColor="purple" intensity="subtle" className="p-8 h-full">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Wand2 className="w-5 h-5 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">Remove Technical Friction</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Manual, ad-hoc handling of multi-modal work — video, audio, generative art — burns time you should be spending on taste. Systematize it.
              </p>
            </InteractiveCard>

            <InteractiveCard glowColor="purple" intensity="subtle" className="p-8 h-full">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Wand2 className="w-5 h-5 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">Automate Without Losing the Signal</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Systemizing output doesn't have to flatten your voice. GenCreator scales the pipeline, not the taste.
              </p>
            </InteractiveCard>

            <InteractiveCard glowColor="purple" intensity="subtle" className="p-8 h-full">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                <Wand2 className="w-5 h-5 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight">Stop Paying Agency Overhead</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Keeping a high aesthetic bar shouldn't require unsustainable hours or outsourcing your voice. Build the leverage yourself.
              </p>
            </InteractiveCard>
          </div>
        </div>
      </section>
    </main>
  )
}
