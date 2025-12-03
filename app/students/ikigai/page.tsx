import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ikigai Workshop | FrankX.ai',
  description: 'Find your purpose in the Age of Intelligence. A self-guided workshop to discover your ikigai and build your path forward.',
}

export default function IkigaiWorkshopPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Simple header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/students"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Student Hub</span>
          </Link>
          <span className="text-sm text-slate-500">Privacy-first · Data stays in your browser</span>
        </div>
      </header>

      {/* Embedded standalone workshop */}
      <main>
        <iframe
          src="/students-workshop/index.html"
          className="w-full"
          style={{ height: 'calc(100vh - 64px)', border: 'none' }}
          title="Ikigai Workshop"
        />
      </main>
    </div>
  )
}
