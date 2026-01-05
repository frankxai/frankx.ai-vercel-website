import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllGuides, getGuide } from '@/lib/guides'
import { mdxComponents } from '@/components/blog/MDXComponents'
import Link from 'next/link'

// Static generation - content is read at build time
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide Not Found' }
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: [`/api/og?title=${encodeURIComponent(guide.title)}`]
    }
  }
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return notFound()
  return (
    <div className="min-h-screen bg-[#030712]">
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/guides" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium">
            ← All Guides
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">{guide.title}</h1>
          <div className="text-sm text-slate-400 mb-8 flex items-center gap-3">
            <span>{guide.readingTime}</span>
            <span className="text-slate-600">•</span>
            <span>{new Date(guide.date).toLocaleDateString()}</span>
            <span className="text-slate-600">•</span>
            <span>{guide.author}</span>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-white/75">
            <MDXRemote source={guide.content} components={mdxComponents as any} />
          </div>
        </div>
      </main>
    </div>
  )
}
