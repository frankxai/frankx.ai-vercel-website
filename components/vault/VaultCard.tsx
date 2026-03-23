'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { VaultAsset } from '@/lib/vault-types'
import { formatBytes } from '@/lib/vault'

export function VaultCard({
  asset,
  onClick,
}: {
  asset: VaultAsset
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isSvg = asset.format === 'svg'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all duration-300 break-inside-avoid mb-4"
      style={{
        boxShadow: isHovered ? '0 20px 40px -20px rgba(67, 191, 227, 0.15)' : 'none',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio:
            asset.width && asset.height
              ? `${asset.width}/${asset.height}`
              : isSvg
              ? '1/1'
              : '16/10',
        }}
      >
        <Image
          src={asset.thumbnail || asset.src}
          alt={asset.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        />

        {/* Format badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-medium bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm uppercase">
          {asset.format}
        </div>

        {/* Dimensions */}
        {asset.width && asset.height && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-medium bg-black/50 text-white/50 backdrop-blur-sm">
            {asset.width}x{asset.height}
          </div>
        )}

        {/* Hover content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
            {asset.title}
          </h3>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <span>{formatBytes(asset.fileSize)}</span>
            {asset.tags.length > 0 && (
              <>
                <span className="text-white/20">|</span>
                {asset.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-white/10 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
