'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft } from 'lucide-react'
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

  // Use HTML template as primary source (PDFs are empty directory)
  // Fallback chain: PDF → HTML template → Error
  const pdfUrl = '/pdfs/vibe-os-guide.pdf'
  const htmlFallbackUrl = '/pdf-templates/vibe-os-guide.html'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-cyan-500/10 bg-gray-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            <span>Back to Downloads</span>
          </Link>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        sessionId={`session-${Date.now()}`}
        htmlFallbackUrl={htmlFallbackUrl}
      />
    </div>
  )
}
