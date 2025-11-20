import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Tools | Frank',
  description: 'Free tools for musicians and creators working with AI.',
}

const tools = [
  {
    id: 'suno-prompt-generator',
    name: 'Suno Prompt Generator',
    description: 'Generate creative, detailed prompts for Suno AI. Built from analyzing thousands of my own tracks.',
    href: '/tools/suno-prompt-generator',
    category: 'Music',
    status: 'live',
  },
  {
    id: 'ai-prompt-library',
    name: 'AI Prompt Library',
    description: 'Curated collection of effective prompts for Claude, ChatGPT, and other AI models. Copy and use in your work.',
    href: '/tools/ai-prompt-library',
    category: 'AI Tools',
    status: 'live',
  },
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="text-slate-400 hover:text-cyan-400 mb-8 inline-block"
          >
            ← Back to Home
          </Link>

          <h1 className="text-5xl font-bold mb-6">Tools</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Free utilities I've built to help musicians and creators working with AI.
            Each tool comes from a real need I had in my own workflow.
          </p>
        </header>

        {/* Hero Image */}
        <div className="mb-16 rounded-xl overflow-hidden border border-slate-800">
          <Image
            src="/images/tools-hero.png"
            alt="AI Creative Tools Visualization"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/50 p-6 transition-all hover:border-cyan-500 hover:bg-slate-900"
            >
              {/* Status Badge */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-cyan-400">
                  {tool.category}
                </span>
                {tool.status === 'live' && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    Live
                  </span>
                )}
              </div>

              {/* Tool Info */}
              <h2 className="mb-3 text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                {tool.name}
              </h2>
              <p className="text-slate-400 leading-relaxed">
                {tool.description}
              </p>

              {/* Arrow Icon */}
              <div className="mt-4 flex items-center gap-2 text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span className="text-sm font-medium">Try it</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 rounded-lg border border-slate-800 bg-slate-900/30 p-8">
          <h3 className="text-2xl font-bold mb-4">More Tools Coming</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            I'm building more utilities based on my daily workflow. Ideas in progress:
          </p>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">→</span>
              <span>Music metadata generator for Spotify/Apple Music distribution</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">→</span>
              <span>Suno lyrics analyzer and improver</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">→</span>
              <span>AI model comparison tool (test same prompt across models)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">→</span>
              <span>Music key and BPM detector</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-12 mt-12 border-t border-slate-800">
          <p className="text-slate-400 mb-4">
            Have an idea for a tool? Let me know on{' '}
            <a href="https://twitter.com/frankxai" className="text-cyan-400 hover:text-cyan-300">
              Twitter
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
