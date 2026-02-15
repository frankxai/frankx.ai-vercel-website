'use client'

import { motion } from 'framer-motion'
import { Image as ImageIcon, Layers, HardDrive, Grid3X3 } from 'lucide-react'
import { formatBytes } from '@/lib/vault'

export function VaultStats({
  totalAssets,
  totalCollections,
  totalSize,
  formats,
}: {
  totalAssets: number
  totalCollections: number
  totalSize: number
  formats: Record<string, number>
}) {
  const topFormats = Object.entries(formats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([fmt, count]) => `${count} ${fmt.toUpperCase()}`)
    .join(' / ')

  const stats = [
    { icon: ImageIcon, label: `${totalAssets} Assets`, value: topFormats },
    { icon: Layers, label: `${totalCollections} Collections`, value: 'Organized by type' },
    { icon: HardDrive, label: formatBytes(totalSize), value: 'Total library size' },
    { icon: Grid3X3, label: 'Masonry View', value: 'With lightbox preview' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
        >
          <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
          <div className="text-white font-semibold text-sm">{stat.label}</div>
          <div className="text-white/40 text-xs mt-1">{stat.value}</div>
        </motion.div>
      ))}
    </div>
  )
}
