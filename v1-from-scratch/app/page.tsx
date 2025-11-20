import { Metadata } from 'next'
import Link from 'next/link'
import { SunoEmbed } from '@/components/music/SunoEmbed'
import { getFeaturedPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Frank | Musician + AI Architect',
  description: 'Personal site of Frank - Playing music since 5, building AI at Oracle, creating with Suno, sharing everything I learn.',
}

export default async function HomePage() {
  // Get latest 3 posts
  const posts = await getFeaturedPosts()
  const latestPosts = posts.slice(0, 3)

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Simple Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Hi, I'm Frank</h1>
          <div className="text-xl text-slate-300 space-y-4 leading-relaxed">
            <p>
              I've been playing guitar and piano since I was 5 years old.
            </p>
            <p>
              By day, I'm an AI Architect at Oracle. In my free time, I create music with Suno AI
              and write about what I'm learning.
            </p>
            <p>
              This is where I share my experiments, workflows, and discoveries—openly and honestly.
            </p>
          </div>
        </header>

        {/* Latest Music */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">Latest Music</h2>
          <p className="text-slate-400 mb-6">
            Here's what I've been working on with Suno:
          </p>
          <SunoEmbed
            songId="h7ix8TQmydIGkQIQ"
            title="Recent Creation"
          />
          <div className="mt-4">
            <Link
              href="/music"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Listen to more music →
            </Link>
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">Free Tools</h2>
          <p className="text-slate-400 mb-6">
            Utilities I've built from my own workflow. Free to use:
          </p>
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 hover:border-cyan-500 transition-colors group">
            <Link href="/tools/suno-prompt-generator">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-cyan-400">🎵 Music Tool</span>
                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">→</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 mb-2 transition-colors">
                Suno Prompt Generator
              </h3>
              <p className="text-slate-400 text-sm">
                Generate detailed prompts for Suno AI. Built from analyzing thousands of tracks.
              </p>
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/tools"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Browse all tools →
            </Link>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-100">Latest from the Blog</h2>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <article key={post.slug} className="border-l-2 border-slate-700 pl-4 hover:border-cyan-500 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-semibold text-white hover:text-cyan-400 mb-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-slate-400 text-sm mb-2">{post.description}</p>
                  )}
                  <time className="text-xs text-slate-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Read all posts →
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-16 border border-slate-800 rounded-lg p-8 bg-slate-900/50">
          <h2 className="text-2xl font-bold mb-4 text-slate-100">Stay Updated</h2>
          <p className="text-slate-300 mb-6">
            I share weekly updates on what I'm learning with AI, new music I've created,
            and workflows that actually work. No spam, just real insights.
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
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* Simple Footer Links */}
        <footer className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <nav className="flex justify-center gap-6 mb-4">
            <Link href="/about" className="hover:text-cyan-400">About</Link>
            <Link href="/music" className="hover:text-cyan-400">Music</Link>
            <Link href="/blog" className="hover:text-cyan-400">Blog</Link>
            <Link href="/tools" className="hover:text-cyan-400">Tools</Link>
            <Link href="/resources" className="hover:text-cyan-400">Resources</Link>
            <a
              href="https://suno.com/@frankx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400"
            >
              Suno Profile ↗
            </a>
          </nav>
          <p>© {new Date().getFullYear()} Frank. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
