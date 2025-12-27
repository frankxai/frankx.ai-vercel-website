import Link from 'next/link'
import { getAllGuides } from '@/lib/guides'

export default function GuidesIndex() {
  const guides = getAllGuides()
  return (
    <div className="min-h-screen bg-slate-950">
<main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">Implementation Guides</h1>
          <p className="text-slate-300 mb-10">Systematic guides to capture exponential value in the intelligence era through conscious AI implementation.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((g) => (
              <article key={g.slug} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group">
                <h2 className="text-xl font-semibold mb-1">
                  <Link href={`/guides/${g.slug}`} className="text-slate-100 hover:text-purple-300 group-hover:text-purple-300 transition-colors">
                    {g.title}
                  </Link>
                </h2>
                <p className="text-slate-300 mb-2">{g.description}</p>
                <div className="text-sm text-slate-500">{g.readingTime} • {new Date(g.date).toLocaleDateString()}</div>
              </article>
            ))}
          </div>

          {guides.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-slate-400">Revolutionary guides coming soon. The future of conscious AI implementation awaits.</p>
            </div>
          )}
        </div>
      </main>
</div>
  )
}
