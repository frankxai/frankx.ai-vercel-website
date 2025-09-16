import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog'

export default function InsightsPage() {
  const posts = getAllBlogPosts()
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Weekly Insights</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((p) => (
              <article key={p.slug} className="border rounded-xl p-6 bg-gray-50">
                <h2 className="text-xl font-semibold mb-1">
                  <Link href={`/blog/${p.slug}`} className="text-gray-900 hover:text-purple-700">{p.title}</Link>
                </h2>
                <p className="text-gray-600 mb-2">{p.description}</p>
                <div className="text-sm text-gray-500">{p.readingTime} • {new Date(p.date).toLocaleDateString()}</div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

