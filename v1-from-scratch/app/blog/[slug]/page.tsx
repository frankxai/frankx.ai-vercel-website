import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { SunoEmbed } from '@/components/music/SunoEmbed'

// MDX components
const components = {
  SunoEmbed,
  a: (props: any) => <a {...props} className="text-cyan-400 hover:text-cyan-300 underline" />,
  h2: (props: any) => <h2 {...props} className="text-3xl font-bold mt-12 mb-4" />,
  h3: (props: any) => <h3 {...props} className="text-2xl font-bold mt-8 mb-3" />,
  p: (props: any) => <p {...props} className="mb-4 leading-relaxed" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside mb-4 space-y-2" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside mb-4 space-y-2" />,
  code: (props: any) => <code {...props} className="bg-slate-900 px-2 py-1 rounded text-cyan-400 text-sm" />,
  pre: (props: any) => <pre {...props} className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto mb-6" />,
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on Frank's blog`,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <article className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-12">
          <Link
            href="/blog"
            className="text-slate-400 hover:text-cyan-400 mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          <time className="text-sm text-slate-500 block mb-4">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>

          <h1 className="text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-xl text-slate-400 leading-relaxed">
              {post.description}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="text-slate-400 hover:text-cyan-400"
            >
              ← Back to Blog
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-cyan-400"
            >
              Home
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}
