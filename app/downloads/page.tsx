import { Metadata } from 'next'
import DownloadsClient from './DownloadsClient'

export const metadata: Metadata = {
  title: 'Free Downloads | FrankX.AI',
  description: 'Download free guides, frameworks, books, and software resources for AI-powered creators.',
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-6 backdrop-blur-md">
            Creative Artifacts
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Creator Downloads
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Beautifully designed guides, books, software systems, and open-source frameworks to accelerate your creative and developer workflows.
          </p>
        </div>

        {/* Client Component */}
        <DownloadsClient />
      </main>
    </div>
  )
}
