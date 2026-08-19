'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2,
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Camera,
  ScrollText,
} from 'lucide-react'

export type InfographicStyle = 'davinci' | 'photorealistic' | '3d-isometric' | 'default'

export interface LiquidGlassZoomProps {
  src: string
  alt: string
  title?: string
  caption?: string
  styleType?: InfographicStyle
  aspectRatio?: '16:9' | '1.91:1' | '4:3' | '1:1'
  priority?: boolean
  className?: string
}

const styleBadges: Record<
  InfographicStyle,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; border: string; bg: string }
> = {
  davinci: {
    label: 'Da Vinci Technical Manuscript',
    icon: ScrollText,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
  },
  photorealistic: {
    label: 'Photorealistic Macro Studio',
    icon: Camera,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
  },
  '3d-isometric': {
    label: '3D Isometric Architecture',
    icon: Layers,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
  },
  default: {
    label: 'InfoGenius Flagship',
    icon: Sparkles,
    color: 'text-white/70',
    border: 'border-white/20',
    bg: 'bg-white/5',
  },
}

export function LiquidGlassZoom({
  src,
  alt,
  title,
  caption,
  styleType = 'default',
  aspectRatio = '16:9',
  priority = false,
  className = '',
}: LiquidGlassZoomProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const badge = styleBadges[styleType] || styleBadges.default
  const BadgeIcon = badge.icon

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1.91:1'
      ? 'aspect-[1.91/1]'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : 'aspect-square'

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setIsZoomed(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(window.location.origin + src)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const downloadImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    const a = document.createElement('a')
    a.href = src
    a.download = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
      {/* Primary Card */}
      <div className={`my-8 group relative rounded-2xl border border-white/10 bg-[#0c0d10] p-2 transition-colors duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.15)] ${className}`}>
        {/* Specular Rim Light */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-500/[0.02] pointer-events-none" />

        {/* Header Metadata */}
        {(title || styleType !== 'default') && (
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.border} ${badge.color}`}>
                <BadgeIcon className="w-3.5 h-3.5" />
                {badge.label}
              </span>
              {title && <span className="text-xs font-semibold text-white/90 tracking-wide">{title}</span>}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
              aria-label="Expand image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inspect</span>
            </button>
          </div>
        )}

        {/* Image Container with Accessible Button Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`relative block w-full ${aspectClass} overflow-hidden rounded-xl bg-black/40 cursor-zoom-in group/img text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
          aria-label={`Expand ${title || alt} in high resolution`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-2xl">
              <Maximize2 className="w-4 h-4 text-cyan-400" />
              Click to Zoom & Inspect High-Res
            </div>
          </div>
        </button>

        {/* Caption */}
        {caption && (
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-xs text-white/50 leading-relaxed italic">{caption}</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title || alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleClose()
            }}
          >
            {/* Top Controls Bar */}
            <div className="absolute top-4 left-4 right-4 z-60 flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.border} ${badge.color}`}>
                  <BadgeIcon className="w-4 h-4" />
                  {badge.label}
                </span>
                {title && <span className="text-sm font-semibold text-white hidden sm:inline">{title}</span>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                  aria-label="Copy image link"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={downloadImage}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                  aria-label="Download image"
                  title="Download asset"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                  aria-label="Close viewer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <motion.button
              type="button"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsZoomed(!isZoomed)
              }}
              className={`relative max-w-6xl max-h-[80vh] w-full ${aspectClass} overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} text-left focus:outline-none`}
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                sizes="100vw"
                quality={95}
              />
            </motion.button>

            {/* Bottom Caption */}
            {caption && (
              <div
                className="absolute bottom-6 left-4 right-4 text-center max-w-3xl mx-auto pointer-events-none"
              >
                <p className="text-xs sm:text-sm text-white/70 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 inline-block">
                  {caption}
                </p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
export default LiquidGlassZoom
