'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download,
  ExternalLink,
} from 'lucide-react'
import type { VaultAsset } from '@/lib/vault-types'
import { formatBytes } from '@/lib/vault'

export function VaultLightbox({
  asset,
  assets,
  currentIndex,
  onClose,
  onNavigate,
}: {
  asset: VaultAsset
  assets: VaultAsset[]
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}) {
  const [copied, setCopied] = useState(false)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < assets.length - 1

  const copyPath = useCallback(async () => {
    await navigator.clipboard.writeText(asset.src)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [asset.src])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev')
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate, hasPrev, hasNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {hasPrev && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate('prev') }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate('next') }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-6xl w-full mx-4 flex flex-col lg:flex-row gap-6 max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-1 min-h-[400px] lg:min-h-[600px] rounded-xl overflow-hidden bg-[#111113]">
          <Image
            src={asset.src}
            alt={asset.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority
          />
        </div>

        {/* Info panel */}
        <div className="lg:w-80 bg-[#111113] rounded-xl p-6 border border-white/10 overflow-y-auto">
          {/* Format badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 uppercase">
            {asset.format}
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{asset.title}</h2>
          <p className="text-white/40 text-sm mb-6">{asset.collection}</p>

          {/* Metadata */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Filename</span>
              <span className="text-white/70 font-mono text-xs truncate ml-2 max-w-[180px]">{asset.filename}</span>
            </div>
            {asset.width && asset.height && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Dimensions</span>
                <span className="text-white/70">{asset.width} x {asset.height}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Size</span>
              <span className="text-white/70">{formatBytes(asset.fileSize)}</span>
            </div>
            {asset.createdAt && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Date</span>
                <span className="text-white/70">{asset.createdAt}</span>
              </div>
            )}
            {asset.model && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Model</span>
                <span className="text-white/70">{asset.model}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {asset.tags.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-medium text-white/40 uppercase tracking-wider block mb-2">
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {asset.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/50 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompt */}
          {asset.prompt && (
            <div className="mb-6">
              <span className="text-sm font-medium text-white/40 uppercase tracking-wider block mb-2">
                Prompt
              </span>
              <p className="text-white/60 text-sm font-mono leading-relaxed bg-white/[0.03] rounded-lg p-3 border border-white/5">
                {asset.prompt}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={copyPath}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Path'}
            </button>
            <a
              href={asset.src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          </div>

          {/* Position indicator */}
          <div className="mt-4 text-center text-white/30 text-xs">
            {currentIndex + 1} / {assets.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
