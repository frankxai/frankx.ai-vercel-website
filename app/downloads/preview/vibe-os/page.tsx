'use client'

import { useRef } from 'react'
import Link from 'next/link'

export default function VibeOSPreviewPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print()
    }
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/downloads"
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Back to Downloads
            </Link>
            <span className="text-white/30">|</span>
            <h1 className="text-white font-semibold">Vibe OS Music Guide</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              ref={iframeRef}
              src="/pdf-templates/vibe-os-guide.html"
              className="w-full h-[calc(100vh-120px)] border-0"
              title="Vibe OS Guide Preview"
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
        <p className="text-sm text-white/70">
          Click <strong className="text-emerald-400">Download PDF</strong> to save • Use Ctrl+P for print options
        </p>
      </div>
    </div>
  )
}
