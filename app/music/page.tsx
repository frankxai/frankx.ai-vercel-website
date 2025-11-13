import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { SongGrid } from '@/components/music/SongGrid'
import { LoadingSkeleton } from '@/components/ui/LoadingStates'
import { createMetadata } from '@/lib/seo'
import AnimatedMesh from '@/components/ui/AnimatedMesh'
import ShimmerText from '@/components/ui/ShimmerText'
import { Music, Sparkles, Clock, Headphones } from 'lucide-react'

export const metadata = createMetadata({
  title: 'Music Catalog - 500+ AI-Generated Songs | FrankX.AI',
  description: 'Explore 500+ songs created with Suno AI. From epic orchestral to lo-fi beats, experimental soundscapes to commercial tracks.',
  path: '/music',
})

export default function MusicCatalogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedMesh variant="hero" speed="slow" className="opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/60 mb-6">
              <Music className="h-4 w-4" />
              Music Laboratory
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
              <ShimmerText
                as="span"
                shimmerColor="multi"
                speed="slow"
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
              >
                500+ Songs.
                <br />
                Infinite Experiments.
              </ShimmerText>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-[1.7] tracking-wide max-w-3xl mb-8">
              My sonic playground with Suno AI. From orchestral epics to lo-fi beats, experimental soundscapes to commercial tracks. Every song is a technique explored, a prompt refined, a creative boundary pushed.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <span>500+ Tracks</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <span>20+ Genres</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-amber-400" />
                <span>100% AI-Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Techniques Section */}
      <section className="py-12 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What I'm Exploring</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Prompt Engineering</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Advanced prompt structures for genre blending, vocal direction, and instrumental layering with Suno v4/v4.5.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Style Transfer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Experimenting with cross-genre fusion, taking classical compositions into electronic realms and vice versa.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Iterative Refinement</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Multi-generation workflows, building on previous outputs to achieve specific sonic characteristics and emotional tones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Full Catalog</h2>
            <p className="text-slate-400">
              Browse all tracks, filter by genre, search by mood or technique. Each song is an experiment in AI-powered music production.
            </p>
          </div>

          <Suspense fallback={<LoadingSkeleton type="grid" count={12} />}>
            <SongGrid />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to learn these techniques?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm documenting my Suno AI workflow, prompt patterns, and production techniques. Get the playbook, prompts, and behind-the-scenes breakdowns of how these tracks were created.
          </p>
          <a
            href="/library/research"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:-translate-y-0.5 transition-transform"
          >
            <Sparkles className="h-5 w-5" />
            Explore Suno Techniques
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
