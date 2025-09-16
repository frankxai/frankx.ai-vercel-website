import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllGuides } from '@/lib/guides'

export default function GuidesIndex() {
  const guides = getAllGuides()
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Guides</h1>
          <p className="text-gray-600 mb-10">Curated, practical guides to help you capture value in the intelligence era.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((g) => (
              <article key={g.slug} className="border rounded-xl p-6 bg-gray-50">
                <h2 className="text-xl font-semibold mb-1">
                  <Link href={`/guides/${g.slug}`} className="text-gray-900 hover:text-purple-700">
                    {g.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">{g.description}</p>
                <div className="text-sm text-gray-500">{g.readingTime} • {new Date(g.date).toLocaleDateString()}</div>
              </article>
            ))}
          </div>

          {guides.length === 0 && (
            <p className="text-gray-600">No guides yet. Check back soon.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
