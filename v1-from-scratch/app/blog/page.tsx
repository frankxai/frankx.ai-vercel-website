import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Frank',
  description: 'Writing about AI, music, and everything I learn along the way.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Writing about AI systems, music production with Suno, and everything
            I'm learning along the way. Real experiments, real insights.
          </p>
        </header>

        {/* Posts List */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-l-2 border-slate-700 pl-6 hover:border-cyan-500 transition-colors"
            >
              <Link href={`/blog/${post.slug}`}>
                <time className="text-sm text-slate-500 mb-2 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h2 className="text-2xl font-bold text-white hover:text-cyan-400 mb-3 transition-colors">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-slate-400 leading-relaxed mb-3">
                    {post.description}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-12 mt-12 border-t border-slate-800">
          <Link href="/" className="text-slate-400 hover:text-cyan-400">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
