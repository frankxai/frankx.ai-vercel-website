import { Metadata } from 'next'
import Link from 'next/link'
import { SunoEmbed } from '@/components/music/SunoEmbed'

export const metadata: Metadata = {
  title: 'Music | Frank',
  description: 'Music created with Suno AI. Exploring sound and creativity through technology.',
}

// Featured tracks - Frank can update this list
const featuredTracks = [
  {
    id: 'h7ix8TQmydIGkQIQ',
    title: 'Featured Track 1',
    description: 'An experiment in ambient soundscapes.',
  },
  {
    id: 'orzKPWe8Cu42j9wR',
    title: 'Featured Track 2',
    description: 'Exploring rhythm and texture.',
  },
  // Add more tracks here
]

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Music</h1>
          <div className="text-lg text-slate-300 space-y-4 leading-relaxed">
            <p>
              I've been making music my whole life. Started with guitar and piano at age 5,
              and these days I'm exploring what's possible with AI-assisted creation through Suno.
            </p>
            <p>
              I've created thousands of tracks—many experiments, some keepers. This is where I
              share the ones I'm most excited about.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View Full Catalog on Suno →
            </a>
          </div>
        </header>

        {/* Featured Tracks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">Featured Tracks</h2>
          <div className="space-y-8">
            {featuredTracks.map((track) => (
              <div key={track.id} className="space-y-3">
                <SunoEmbed
                  songId={track.id}
                  title={track.title}
                  height={150}
                />
                {track.description && (
                  <p className="text-sm text-slate-400 pl-1">{track.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="mb-16 border border-slate-800 rounded-lg p-8 bg-slate-900/50">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">My Suno Workflow</h2>
          <div className="text-slate-300 space-y-4 leading-relaxed">
            <p>
              Creating music with Suno is both an art and an experiment. After thousands
              of generations, here's what I've learned:
            </p>
            <ol className="list-decimal list-inside space-y-3 pl-2">
              <li>
                <strong className="text-white">Start with feeling, not genre.</strong> I think
                about the mood I want to create before worrying about style tags.
              </li>
              <li>
                <strong className="text-white">Iterate on prompts.</strong> The first generation
                is rarely the keeper. I refine and experiment.
              </li>
              <li>
                <strong className="text-white">Save everything.</strong> Even the "failures"
                teach me something about how Suno interprets prompts.
              </li>
              <li>
                <strong className="text-white">Embrace happy accidents.</strong> Some of my
                favorite tracks came from unexpected results.
              </li>
            </ol>
            <p className="pt-4">
              <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Read more about my process →
              </Link>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-slate-300 mb-4">
            Want to learn my Suno techniques?
          </p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors"
          >
            Read the Blog
          </Link>
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-slate-800">
          <Link href="/" className="text-slate-400 hover:text-cyan-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
