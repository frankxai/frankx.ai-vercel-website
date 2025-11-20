import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources | Frank',
  description: 'Free guides, templates, and resources for musicians and AI creators.',
}

const resources = [
  {
    id: 'suno-prompt-guide',
    title: 'The Complete Suno Prompt Guide',
    description: 'A comprehensive PDF guide to writing better Suno prompts. Based on analyzing thousands of my own tracks.',
    category: 'Guide',
    format: 'PDF',
    pages: '24 pages',
    status: 'available',
    downloadLink: '#', // Frank can add real link
  },
  {
    id: 'genre-prompt-templates',
    title: '50 Suno Genre Templates',
    description: 'Ready-to-use prompt templates for 50 different music genres. Copy, customize, and create.',
    category: 'Template',
    format: 'PDF',
    pages: '15 pages',
    status: 'available',
    downloadLink: '#',
  },
  {
    id: 'music-workflow-checklist',
    title: 'AI Music Creation Workflow',
    description: 'My complete process for creating, organizing, and sharing AI-generated music.',
    category: 'Checklist',
    format: 'PDF',
    pages: '8 pages',
    status: 'available',
    downloadLink: '#',
  },
  {
    id: 'notion-music-template',
    title: 'Notion Music Database Template',
    description: 'Track your Suno creations, prompts, and iterations in Notion. Includes pre-built views.',
    category: 'Template',
    format: 'Notion',
    pages: 'Database',
    status: 'coming-soon',
    downloadLink: '#',
  },
]

export default function ResourcesPage() {
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

          <h1 className="text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-6">
            Free guides, templates, and workflows from my experience creating music
            with AI. Everything I wish I had when I started.
          </p>
          <p className="text-slate-400">
            All resources are free. No signup required. Just download and use.
          </p>
        </header>

        {/* Resources Grid */}
        <div className="space-y-6 mb-16">
          {resources.map((resource) => (
            <article
              key={resource.id}
              className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/50 p-8 transition-all hover:border-cyan-500 hover:bg-slate-900"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {resource.category}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                    {resource.format}
                  </span>
                  {resource.pages && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400">
                      {resource.pages}
                    </span>
                  )}
                </div>
                {resource.status === 'coming-soon' && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                {resource.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                {resource.description}
              </p>

              {/* Download Button */}
              {resource.status === 'available' ? (
                <a
                  href={resource.downloadLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
                >
                  <span>Download Free</span>
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-500 font-medium rounded-lg cursor-not-allowed"
                >
                  <span>Coming Soon</span>
                </button>
              )}
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">Get New Resources First</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            I create new guides and templates regularly. Join my newsletter to get
            them delivered straight to your inbox when they're ready.
          </p>
          <form
            action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"
            method="post"
            className="flex gap-2"
          >
            <input
              type="email"
              name="email_address"
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Request Resources */}
        <div className="border-t border-slate-800 pt-12">
          <h3 className="text-xl font-bold mb-4">Need Something Else?</h3>
          <p className="text-slate-400 mb-4">
            Have an idea for a resource that would help you? Let me know on{' '}
            <a href="https://twitter.com/frankxai" className="text-cyan-400 hover:text-cyan-300">
              Twitter
            </a>{' '}
            or via{' '}
            <a href="mailto:frank@frankx.ai" className="text-cyan-400 hover:text-cyan-300">
              email
            </a>
            . I build resources based on what people actually need.
          </p>
        </div>
      </div>
    </main>
  )
}
