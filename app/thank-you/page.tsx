import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">You're subscribed!</h1>
          <p className="text-gray-700 mb-8">Welcome aboard. You'll receive the next issue with practical, hype‑free insights.</p>
          <div className="space-x-4">
            <Link className="text-purple-600 hover:text-purple-700 underline" href="/guides/modern-guide">Read the Modern Guide</Link>
            <Link className="text-purple-600 hover:text-purple-700 underline" href="/resources">Browse Resources</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

