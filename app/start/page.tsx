import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function StartHere() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Here</h1>
          <p className="text-gray-700 mb-8">A quick path to get the most value from this site.</p>

          <ol className="list-decimal ml-6 space-y-4 text-gray-800">
            <li>
              Read the <Link className="text-purple-600 hover:text-purple-700" href="/guides/modern-guide">Modern Guide</Link> (30–45 minutes). Skim summaries; apply one framework.
            </li>
            <li>
              Grab a template from <Link className="text-purple-600 hover:text-purple-700" href="/resources">Resources</Link> and run a 2‑week experiment.
            </li>
            <li>
              Explore the <Link className="text-purple-600 hover:text-purple-700" href="/reading/index.html">Reading Index</Link> for deeper topics.
            </li>
          </ol>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-3">Where to next</h2>
            <ul className="list-disc ml-6 text-gray-800 space-y-2">
              <li><Link className="text-purple-600 hover:text-purple-700" href="/blog">Latest articles</Link></li>
              <li><Link className="text-purple-600 hover:text-purple-700" href="/guides">Guides</Link> (role‑based playbooks, safety, agents)</li>
              <li><Link className="text-purple-600 hover:text-purple-700" href="/assets/intelligence-era-onepager.html">Executive one‑pager</Link></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

