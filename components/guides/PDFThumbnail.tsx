'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FileText, Download } from 'lucide-react'

interface PDFThumbnailProps {
  title: string
  description: string
  thumbnailUrl?: string
  pdfUrl: string
  slug: string
  pageCount?: number
  className?: string
  onDownload?: () => void
}

export default function PDFThumbnail({
  title,
  description,
  thumbnailUrl,
  pdfUrl,
  slug,
  pageCount,
  className = '',
  onDownload
}: PDFThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = () => {
    onDownload?.()
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${slug}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:border-cyan-500/30 transition-all ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-64 bg-gray-800/50 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="w-20 h-20 text-gray-700" />
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Page count badge */}
        {pageCount && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-xs text-gray-300">
            {pageCount} pages
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  )
}
