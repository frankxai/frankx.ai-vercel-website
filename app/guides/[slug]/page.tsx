import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllGuides, getGuide } from '@/lib/guides'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

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
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/guides" className="text-purple-600 hover:text-purple-700">← All Guides</Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">{guide.title}</h1>
          <div className="text-sm text-gray-500 mb-8">{guide.readingTime} • {new Date(guide.date).toLocaleDateString()} • {guide.author}</div>
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={guide.content} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
