import { TrackingLink } from '@/components/ui/TrackingLink'
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
      <section className="relative min-h-[85vh] overflow-hidden flex flex-col justify-end pb-24 pt-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/20 to-[#0a0a0b] z-0" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-400/80">
              The Creator
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight max-w-4xl leading-[1.05] mb-6">
            Where meaning <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">meets execution.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10">
            I spent years as an AI architect at Oracle building systems that had to hold under real load. Then I pointed the same discipline at something no one asked me to: 12,000+ AI songs, a visual practice, a framework I called GenCreator. Aesthetic work still needs versioning, QA, and a repeatable pipeline — most creators just never build one.
          </p>
          <div className="flex flex-col items-start gap-4">
            <TrackingLink
              href="/gencreator"
              eventName="funnel_cta_clicked"
              eventParams={{ persona: 'aesthete' }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 px-7 py-4 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
            >
              Explore the GenCreator Framework
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </TrackingLink>
            <p className="text-xs text-white/40 font-medium ml-2">Principles, handbook, and blueprints — the actual system, not a course.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">The Pipeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Wand2 className="w-5 h-5 text-fuchsia-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Remove Technical Friction</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Manual, ad-hoc handling of multi-modal work — video, audio, generative art — burns time you should be spending on taste. Systematize it.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Wand2 className="w-5 h-5 text-fuchsia-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automate Without Losing the Signal</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Systemizing output doesn't have to flatten your voice. GenCreator scales the pipeline, not the taste.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0a0b] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Wand2 className="w-5 h-5 text-fuchsia-400/60" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stop Paying Agency Overhead</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Keeping a high aesthetic bar shouldn't require unsustainable hours or outsourcing your voice. Build the leverage yourself.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
