'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Maximize2, X, Download, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DiagramViewerProps {
  src?: string
  alt: string
  title?: string
  description?: string
  className?: string
  placeholder?: boolean
}

export function DiagramViewer({
  src,
  alt,
  title,
  description,
  className,
  placeholder = false,
}: DiagramViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))
  const handleResetZoom = () => setZoom(1)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setZoom(1)
  }

  const handleDownload = async () => {
    if (!src) return
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${alt.replace(/\s+/g, '-').toLowerCase()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download diagram:', error)
    }
  }

  const renderDiagramContent = (fullscreen: boolean) => (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50',
        className
      )}
    >
      {/* Header */}
      {(title || !placeholder) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            {title && <h4 className="font-medium text-white">{title}</h4>}
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white"
              title="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            {src && (
              <button
                onClick={handleDownload}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Diagram area */}
      <div
        className={cn(
          'flex items-center justify-center overflow-auto',
          fullscreen ? 'h-[calc(100vh-80px)]' : 'h-[400px]'
        )}
      >
        {placeholder || !src ? (
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <Layers className="h-16 w-16 text-slate-600" />
            <div className="text-center">
              <p className="font-medium">Architecture Diagram</p>
              <p className="text-sm text-slate-600">Diagram coming soon</p>
            </div>
          </div>
        ) : (
          <motion.img
            src={src}
            alt={alt}
            className="max-w-none"
            style={{ transform: `scale(${zoom})` }}
            animate={{ scale: zoom }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            draggable={false}
          />
        )}
      </div>
    </div>
  )

  return (
    <>
      {renderDiagramContent(false)}

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) toggleFullscreen()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-7xl"
            >
              {renderDiagramContent(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DiagramViewer
