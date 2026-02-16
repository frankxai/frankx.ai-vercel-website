'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PDFEmailModal from '@/components/ui/PDFEmailModal'

// Dynamic import to avoid SSR issues
const PDFViewer = dynamic(() => import('@/components/ui/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[600px] bg-gray-900 rounded-2xl border border-cyan-500/20">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading PDF viewer...</p>
      </div>
    </div>
  )
})

export default function SoulbookPreviewPage() {
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  // Generate stable sessionId on mount using lazy state initializer
  const [sessionId] = useState(() => `session-${Date.now()}`)

  // PDF at /products/, HTML template as fallback
  const pdfUrl = '/products/soulbook-7-pillars-framework.pdf'
  const htmlFallbackUrl = '/pdf-templates/soulbook-guide.html'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-cyan-500/10 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all border border-white/10 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Downloads</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">Free Framework</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            The Creator&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Soulbook</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            A 7-pillar life system for creators who build, ship, and grow.
          </p>

          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
            The operating system I use to balance 500+ AI songs, enterprise architecture, and creative output.
            Structured frameworks, daily practices, and the same principles behind every product I ship.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <span>7 Pillars</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span>15-min read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </div>
              <span>Free PDF</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={pdfUrl}
              download
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
            >
              <span>Download PDF</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setEmailModalOpen(true)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:scale-105"
            >
              <span>Send to Email</span>
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-950 px-4 text-sm text-gray-500">Preview Below</span>
          </div>
        </div>

        {/* PDF Viewer */}
        <PDFViewer
          url={pdfUrl}
          htmlFallbackUrl={htmlFallbackUrl}
          title="The Creator's Soulbook"
          description="A 7-pillar life system for creators who build, ship, and grow."
          onEmailRequest={() => setEmailModalOpen(true)}
        />
      </div>

      {/* Email Modal */}
      <PDFEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        pdfTitle="The Creator's Soulbook"
        pdfUrl={pdfUrl}
        guideSlug="soulbook"
        sessionId={sessionId}
        htmlFallbackUrl={htmlFallbackUrl}
      />
    </div>
  )
}
