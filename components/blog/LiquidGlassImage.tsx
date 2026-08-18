'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LiquidGlassImageProps {
  src: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  aspectRatio?: string
}

export function LiquidGlassImage({
  src,
  alt = 'Visual Infographic',
  caption,
  width = 1200,
  height = 675,
  className,
  priority = false,
  aspectRatio = '16/9',
}: LiquidGlassImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setZoomLevel(1)
      } else if (isOpen && (e.key === '+' || e.key === '=')) {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3.5))
      } else if (isOpen && e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1))
      } else if (isOpen && e.key === '0') {
        setZoomLevel(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setZoomLevel(1)
  }

  const handleClose = () => {
    setIsOpen(false)
    setZoomLevel(1)
  }

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.min(prev + 0.5, 3.5))
  }

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel(1)
  }

  return (
    <>
      {/* ── Standard Inline View with Liquid Glass Aesthetics ────────────── */}
      <figure className="my-10 group relative">
        <div
          onClick={handleOpen}
          className={cn(
            'relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0A0A0B]/80 backdrop-blur-2xl cursor-zoom-in transition-all duration-500 shadow-2xl hover:border-emerald-500/40 hover:shadow-emerald-500/10',
            className
          )}
        >
          {/* Specular Liquid Glass Ambient Rim Light */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.08] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Core Image */}
          <div className="relative w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>

          {/* Interactive Inspection Badge on Hover */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-[#0A0A0B]/70 backdrop-blur-xl text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inspect 4K View</span>
          </div>
        </div>

        {/* Caption */}
        {(caption || (alt && alt !== 'image' && alt !== 'Visual Infographic')) && (
          <figcaption className="mt-3.5 text-center text-xs md:text-sm text-white/50 tracking-wide flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
            <span>{caption || alt}</span>
          </figcaption>
        )}
      </figure>

      {/* ── Fullscreen Liquid Glass Lightbox Modal ────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#050507]/90 backdrop-blur-3xl"
          >
            {/* Header Telemetry & Close Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#111113]/80 backdrop-blur-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Infographic Telemetry Inspector
                </span>
                <span className="text-xs text-white/40 border-l border-white/10 pl-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
              </div>

              {/* Top Controls: Zoom + Close */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-[#111113]/80 backdrop-blur-xl">
                  <button
                    onClick={zoomIn}
                    aria-label="Zoom in"
                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={zoomOut}
                    aria-label="Zoom out"
                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetZoom}
                    aria-label="Reset zoom"
                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  aria-label="Close inspector"
                  className="p-3 rounded-full border border-white/10 bg-[#111113]/80 backdrop-blur-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Wrapper with Zoom & Pan */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              ref={imageRef}
              className={cn(
                'relative max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl md:rounded-3xl border border-white/15 bg-[#0A0A0B] shadow-[0_0_80px_rgba(0,0,0,0.8)]',
                zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              )}
            >
              <motion.div
                drag={zoomLevel > 1}
                dragConstraints={imageRef}
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="relative flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width * 1.5}
                  height={height * 1.5}
                  className="max-h-[80vh] w-auto object-contain select-none pointer-events-none"
                />
              </motion.div>
            </motion.div>

            {/* Bottom Caption Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-6 right-6 z-50 flex justify-center pointer-events-none"
            >
              <div className="max-w-2xl px-5 py-2.5 rounded-full border border-white/10 bg-[#111113]/90 backdrop-blur-2xl text-center text-xs md:text-sm text-white/80 pointer-events-auto shadow-2xl">
                {caption || alt}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
