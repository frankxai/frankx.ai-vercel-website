import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FamilyGuide() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Basics for Families</h1>
          <p className="text-gray-700 mb-6">A simple guide to understand AI’s impact and use it safely at home.</p>
          <ol className="list-decimal ml-6 space-y-3 text-gray-800">
            <li>Start with the <Link href="/guides/modern-guide" className="text-purple-600 hover:text-purple-700">Modern Guide</Link> (skim the summaries)</li>
            <li>Pick one collaboration workflow (homework help, planning, budgeting) and set clear rules</li>
            <li>Review the risks and add guardrails (no personal data, review outputs together)</li>
          </ol>
          <div className="mt-8">
            <Link href="/resources" className="text-purple-600 hover:text-purple-700 underline">Open Resources →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

