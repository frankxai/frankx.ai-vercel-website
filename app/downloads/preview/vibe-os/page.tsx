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

export default function VibeOSPreviewPage() {
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  // Generate stable sessionId on mount using lazy state initializer
  const [sessionId] = useState(() => `session-${Date.now()}`)

  // Use HTML template as primary source (PDFs are empty directory)
  // Fallback chain: PDF → HTML template → Error
  const pdfUrl = '/pdfs/vibe-os-guide.pdf'
  const htmlFallbackUrl = '/pdf-templates/vibe-os-guide.html'

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-sm font-medium">Music & Creativity</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Poppins']">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Vibe OS</span> Guide
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            AI Music Creation System for engineering flow state and neuro-state transformation
          </p>

          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
            From midnight studio sessions to 500+ released AI songs. This is the system behind every track - a framework for turning creative energy into music that actually ships.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400">🎵</span>
              </div>
              <span>Proven System</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400">⏱️</span>
              </div>
              <span>10-min read</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">🔥</span>
              </div>
              <span>500+ Songs Created</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setEmailModalOpen(true)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              <span>Get Via Email</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
          title="Vibe OS"
          description="AI Music Creation System for engineering neuro-state"
          onEmailRequest={() => setEmailModalOpen(true)}
        />
      </div>

      {/* Email Modal */}
      <PDFEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        pdfTitle="Vibe OS"
        pdfUrl={htmlFallbackUrl || pdfUrl}
        guideSlug="vibe-os"
        sessionId={sessionId}
        htmlFallbackUrl={htmlFallbackUrl}
      />
    </div>
  )
}
