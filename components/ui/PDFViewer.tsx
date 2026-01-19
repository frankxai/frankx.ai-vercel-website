'use client'

import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, Mail, Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
  url: string
  htmlFallbackUrl?: string
  title: string
  description?: string
  onEmailRequest?: () => void
  className?: string
}

export default function PDFViewer({
  url,
  htmlFallbackUrl,
  title,
  description,
  onEmailRequest,
  className = ''
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useHtmlFallback, setUseHtmlFallback] = useState(false)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error)

    // Try HTML fallback if available
    if (htmlFallbackUrl && !useHtmlFallback) {
      console.log('Attempting HTML fallback:', htmlFallbackUrl)
      setUseHtmlFallback(true)
      setIsLoading(false)
      setError(null)
      return
    }

    setError('PDF not available')
    setIsLoading(false)
  }, [htmlFallbackUrl, useHtmlFallback])

  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [url, title])

  const goToPrevPage = useCallback(() => {
    setPageNumber(prev => Math.max(1, prev - 1))
  }, [])

  const goToNextPage = useCallback(() => {
    setPageNumber(prev => Math.min(numPages || prev, prev + 1))
  }, [numPages])

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(2.0, prev + 0.2))
  }, [])

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(0.5, prev - 0.2))
  }, [])

  return (
    <div className={`relative w-full ${className}`}>
      {/* Header with controls */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900/95 to-gray-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-t-2xl p-4 shadow-lg shadow-cyan-500/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm text-gray-400 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Email button */}
            {onEmailRequest && (
              <button
                onClick={onEmailRequest}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 transition-all"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Email Me</span>
              </button>
            )}
          </div>
        </div>

        {/* Page navigation */}
        {numPages && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-400">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* PDF viewer */}
      <div className="relative bg-gray-900 border-x border-b border-cyan-500/20 rounded-b-2xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading PDF...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-20">
            <div className="text-center p-8 max-w-md">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">PDF Preview Unavailable</h3>
              <p className="text-gray-400 mb-6">
                We're updating this guide. You can still download the HTML version or get it via email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {htmlFallbackUrl && (
                  <a
                    href={htmlFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-cyan-500/30"
                  >
                    <Download size={18} />
                    <span>View HTML Version</span>
                  </a>
                )}
                {onEmailRequest && (
                  <button
                    onClick={onEmailRequest}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all"
                  >
                    <Mail size={18} />
                    <span>Email Me</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center p-6 min-h-[600px] overflow-auto">
          {useHtmlFallback && htmlFallbackUrl ? (
            <div className="w-full max-w-4xl">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4 text-center">
                <p className="text-yellow-400 text-sm">
                  Showing HTML preview. PDF version coming soon.
                </p>
              </div>
              <iframe
                src={htmlFallbackUrl}
                className="w-full h-[800px] bg-white rounded-lg shadow-2xl"
                title={`${title} HTML Preview`}
              />
            </div>
          ) : (
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              error=""
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-2xl"
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  )
}
