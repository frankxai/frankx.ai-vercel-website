'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Eye,
  EyeOff,
  HardDrive,
  Layers,
  FileImage,
  FileType,
} from 'lucide-react'
import type { VaultManifest, VaultCollection, VaultAsset } from '@/lib/vault-types'
import { formatBytes } from '@/lib/vault'

function StatCard({
  icon: Icon,
  label,
  value,
  accent = 'cyan',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  accent?: string
}) {
  const colors: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }

  return (
    <div className={`rounded-xl border p-4 ${colors[accent]}`}>
      <Icon className="w-5 h-5 mb-2" />
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </div>
  )
}

export function VaultAdminClient({
  manifest,
  collections,
}: {
  manifest: VaultManifest
  collections: VaultCollection[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showHidden, setShowHidden] = useState(true)
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

  const allAssets = useMemo(
    () => collections.flatMap(c => c.assets),
    [collections]
  )

  const missingThumbs = useMemo(
    () => allAssets.filter(a => !a.thumbnail && a.format !== 'svg'),
    [allAssets]
  )

  const searchResults = useMemo(() => {
    if (!searchQuery) return null
    const q = searchQuery.toLowerCase()
    return allAssets.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.filename.toLowerCase().includes(q) ||
        a.tags.some(t => t.includes(q)) ||
        a.collection.toLowerCase().includes(q)
    )
  }, [allAssets, searchQuery])

  const filteredCollections = useMemo(() => {
    if (!showHidden) return collections.filter(c => !c.hidden)
    return collections
  }, [collections, showHidden])

  const formatBreakdown = Object.entries(manifest.formats)
    .sort((a, b) => b[1] - a[1])

  const copyToClipboard = async (path: string) => {
    await navigator.clipboard.writeText(path)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/vault"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Vault
            </Link>
            <h1 className="text-3xl font-bold">Vault Admin</h1>
            <p className="text-white/40 mt-1">
              Asset management dashboard — generated {new Date(manifest.generatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHidden(!showHidden)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                showHidden
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-white/50 border border-white/10'
              }`}
            >
              {showHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {showHidden ? 'Showing hidden' : 'Hidden filtered'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard icon={ImageIcon} label="Total Assets" value={manifest.totalAssets} accent="cyan" />
          <StatCard icon={Layers} label="Collections" value={manifest.totalCollections} accent="purple" />
          <StatCard icon={HardDrive} label="Total Size" value={formatBytes(manifest.totalSize)} accent="emerald" />
          <StatCard icon={AlertTriangle} label="Missing Thumbs" value={missingThumbs.length} accent="amber" />
          <StatCard icon={FileImage} label="With Thumbs" value={allAssets.length - missingThumbs.length} accent="emerald" />
        </div>

        {/* Format Breakdown */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileType className="w-5 h-5 text-cyan-400" />
            Format Breakdown
          </h2>
          <div className="flex flex-wrap gap-3">
            {formatBreakdown.map(([fmt, count]) => {
              const pct = ((count / manifest.totalAssets) * 100).toFixed(0)
              return (
                <div
                  key={fmt}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10"
                >
                  <span className="text-sm font-mono font-bold text-white uppercase">{fmt}</span>
                  <span className="text-white/70 text-sm">{count}</span>
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search all assets by name, filename, tag, or collection..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-cyan-500/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Search Results ({searchResults.length})
            </h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {searchResults.slice(0, 50).map(asset => (
                <AssetRow
                  key={asset.id}
                  asset={asset}
                  copiedPath={copiedPath}
                  onCopy={copyToClipboard}
                />
              ))}
              {searchResults.length > 50 && (
                <p className="text-white/40 text-sm py-2">
                  Showing first 50 of {searchResults.length} results
                </p>
              )}
            </div>
          </div>
        )}

        {/* Missing Thumbnails */}
        {missingThumbs.length > 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              Missing Thumbnails ({missingThumbs.length})
            </h2>
            <p className="text-white/50 text-sm mb-4">
              These non-SVG assets don't have a _thumb.jpeg variant. Consider generating thumbnails for faster grid loading.
            </p>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {missingThumbs.map(asset => (
                <div
                  key={asset.id}
                  className="flex items-center gap-3 py-1.5 text-sm"
                >
                  <span className="text-white/40 font-mono text-xs w-16">{asset.format}</span>
                  <span className="text-white/60 truncate flex-1">{asset.src}</span>
                  <span className="text-white/30 text-xs">{formatBytes(asset.fileSize)}</span>
                  <button
                    onClick={() => copyToClipboard(asset.src)}
                    className="text-white/30 hover:text-white/70 transition-colors"
                  >
                    {copiedPath === asset.src ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collections Table */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            All Collections ({filteredCollections.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-left border-b border-white/10">
                  <th className="pb-3 pr-4">#</th>
                  <th className="pb-3 pr-4">Collection</th>
                  <th className="pb-3 pr-4 text-right">Assets</th>
                  <th className="pb-3 pr-4 text-right">Thumbs</th>
                  <th className="pb-3 pr-4 text-right">Coverage</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCollections.map((c, i) => {
                  const thumbCount = c.assets.filter(a => a.thumbnail).length
                  const svgCount = c.assets.filter(a => a.format === 'svg').length
                  const needsThumbs = c.count - thumbCount - svgCount
                  const coverage = c.count > 0
                    ? Math.round(((thumbCount + svgCount) / c.count) * 100)
                    : 100

                  return (
                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 text-white/30">{i + 1}</td>
                      <td className="py-3 pr-4">
                        <Link
                          href={`/vault/${c.id}`}
                          className="text-white hover:text-cyan-400 transition-colors font-medium"
                        >
                          {c.name}
                        </Link>
                        {c.hidden && (
                          <span className="ml-2 text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded">
                            hidden
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right text-white/70">{c.count}</td>
                      <td className="py-3 pr-4 text-right text-white/70">{thumbCount}</td>
                      <td className="py-3 pr-4 text-right">
                        <span className={coverage === 100 ? 'text-emerald-400' : coverage > 50 ? 'text-amber-400' : 'text-rose-400'}>
                          {coverage}%
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {needsThumbs === 0 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <span className="text-amber-400 text-xs">{needsThumbs} need thumbs</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function AssetRow({
  asset,
  copiedPath,
  onCopy,
}: {
  asset: VaultAsset
  copiedPath: string | null
  onCopy: (path: string) => void
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors">
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0 relative">
        <Image
          src={asset.thumbnail || asset.src}
          alt={asset.title}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white/80 text-sm font-medium truncate">{asset.title}</div>
        <div className="text-white/30 text-xs font-mono truncate">{asset.src}</div>
      </div>
      <span className="text-white/40 text-xs uppercase font-mono">{asset.format}</span>
      <span className="text-white/30 text-xs">{formatBytes(asset.fileSize)}</span>
      {asset.width && asset.height && (
        <span className="text-white/30 text-xs">{asset.width}x{asset.height}</span>
      )}
      <button
        onClick={() => onCopy(asset.src)}
        className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
      >
        {copiedPath === asset.src ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <a
        href={asset.src}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/30 hover:text-cyan-400 transition-colors flex-shrink-0"
      >
        <Eye className="w-4 h-4" />
      </a>
    </div>
  )
}
