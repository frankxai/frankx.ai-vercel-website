import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Frank</h1>
          <p className="text-gray-700 mb-4">
            I help creators, founders, and teams use AI to amplify authentic expression and deliver real outcomes.
            After 15+ years architecting enterprise systems, my work focuses on building practical, safe, and human‑centered
            intelligence workflows.
          </p>
          <p className="text-gray-700 mb-4">
            This site shares guides, playbooks, and tools you can put to work immediately. Start with the Resources page
            for the modern guide and templates, or browse the complete reading index for deeper dives.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

