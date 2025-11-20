import { Metadata } from 'next'
import { AIPromptLibrary } from '@/components/tools/AIPromptLibrary'

export const metadata: Metadata = {
  title: 'AI Prompt Library | Tools | Frank',
  description: 'Curated collection of effective prompts for Claude, ChatGPT, Midjourney, and more.',
}

export default function AIPromptLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
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
            <span className="text-slate-400">AI Prompt Library</span>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            AI Prompt Library
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-4">
            A curated collection of effective prompts I use daily with Claude, ChatGPT,
            Midjourney, and other AI tools. Copy, modify, and use them in your own work.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              🤖 Multi-Model
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400">
              Free Library
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400">
              Copy & Paste Ready
            </span>
          </div>
        </header>

        {/* Library Component */}
        <AIPromptLibrary />

        {/* Tips Section */}
        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold mb-6">Tips for Better AI Prompts</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Be Specific About Format
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tell the AI exactly what format you want: bullet points, table, code,
                essay, etc. Clear format instructions lead to better outputs.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Provide Context
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Give the AI context about your situation, audience, and goals.
                "Write for developers" vs "Write for beginners" produces very different results.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Use Examples
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Show examples of what you want. "Like this: [example]" helps the AI
                understand your style and expectations better than descriptions alone.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ✓ Iterate and Refine
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                First response rarely perfect. Ask for adjustments: "Make it more concise"
                or "Add technical details". Conversation improves results.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 rounded-lg border border-slate-800 bg-slate-900/30 p-8">
          <h3 className="text-2xl font-bold mb-4">About This Library</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            These are prompts I actually use in my daily work—building AI systems at Oracle,
            creating music with Suno, writing content, and more. I've tested and refined
            each one through real projects.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The library grows as I discover new patterns that work. Check back regularly
            for updates, or subscribe to my newsletter to get notified of new additions.
          </p>
        </div>
      </div>
    </main>
  )
}
