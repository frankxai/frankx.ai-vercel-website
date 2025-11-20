import { Metadata } from 'next'
import { SunoPromptGenerator } from '@/components/tools/SunoPromptGenerator'

export const metadata: Metadata = {
  title: 'Suno Prompt Generator | Tools | Frank',
  description: 'Generate creative, detailed prompts for Suno AI music generation.',
}

export default function SunoPromptGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <a
              href="/tools"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← Tools
            </a>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Suno Prompt Generator</span>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Suno Prompt Generator
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-4">
            After creating thousands of tracks with Suno, I've learned what makes
            a great prompt. This tool helps you craft detailed, effective prompts
            that get better results.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              🎵 Music Generation
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400">
              Free Tool
            </span>
          </div>
        </header>

        {/* Generator Component */}
        <SunoPromptGenerator />

        {/* Tips Section */}
        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold mb-6">Tips for Better Prompts</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Be Specific
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instead of "happy song," try "upbeat indie pop with acoustic guitar,
                bright piano chords, and cheerful vocals."
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Mix Elements
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Combine genre, mood, instruments, and vocal style.
                "Dark synthwave with emotional female vocals and 80s drum machines."
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Use References
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reference artists, eras, or specific sounds. "In the style of Daft Punk's
                Discovery era" gives Suno clear direction.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Experiment
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Don't be afraid to try unusual combinations. Some of my best tracks
                came from unexpected prompt experiments.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 rounded-lg border border-slate-800 bg-slate-900/30 p-8">
          <h3 className="text-2xl font-bold mb-4">About This Tool</h3>
          <p className="text-slate-400 leading-relaxed">
            This generator is based on patterns I've discovered while creating thousands
            of tracks with Suno AI. It helps you structure prompts that give Suno the
            right balance of direction and creative freedom. The suggestions come from
            analyzing what worked (and what didn't) in my own experiments.
          </p>
        </div>
      </div>
    </main>
  )
}
