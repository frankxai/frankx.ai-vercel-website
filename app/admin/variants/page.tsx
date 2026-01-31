'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Eye, Check, X } from 'lucide-react'

/**
 * Variant Comparison Dashboard
 *
 * Admin page to compare all homepage variants side by side
 */

const variants = [
  {
    id: 'v1',
    name: 'Elite (Current)',
    description: 'Dark mode, emerald accents, aurora background, embedded Suno player',
    style: 'Premium dark',
    pros: ['Existing brand consistency', 'Good mobile performance', 'Music player integration'],
    cons: ['Sparse content below hero', 'Typography could be richer'],
    color: 'emerald',
  },
  {
    id: 'v2',
    name: 'Premium Raycast',
    description: 'Mesh gradients, glassmorphism, bento grid, premium badges',
    style: 'Raycast/Vercel inspired',
    pros: ['Showcases all products', 'Bento grid is modern', 'Clear content hierarchy'],
    cons: ['May feel busy', 'Glassmorphism can be heavy'],
    color: 'cyan',
  },
  {
    id: 'v3',
    name: 'Editorial Luxury',
    description: 'Magazine-style, heavy serif italics, light mode, generous whitespace',
    style: 'Monocle/NYT editorial',
    pros: ['Sophisticated feel', 'Great typography', 'Timeless design'],
    cons: ['Light mode may not fit brand', 'Less tech-forward'],
    color: 'violet',
  },
  {
    id: 'v4',
    name: 'Dark Terminal',
    description: 'Hacker aesthetic, monospace, command-line UI, matrix vibes',
    style: 'Developer/Hacker',
    pros: ['Appeals to developers', 'Unique and memorable', 'Very on-brand for AI'],
    cons: ['Niche audience', 'May feel intimidating'],
    color: 'green',
  },
  {
    id: 'v5',
    name: 'Vibrant Creator',
    description: 'Bold gradients, playful energy, rounded corners, emoji-friendly',
    style: 'Linear/Notion SaaS',
    pros: ['High energy', 'Approachable', 'Modern SaaS feel'],
    cons: ['Light mode', 'May feel less premium'],
    color: 'pink',
  },
  {
    id: 'v6',
    name: 'Cinematic',
    description: 'Full-bleed images, parallax, dramatic typography, Netflix-style',
    style: 'Apple/Netflix immersive',
    pros: ['Very immersive', 'Dramatic impact', 'Great for storytelling'],
    cons: ['Heavy on images', 'May load slower'],
    color: 'purple',
  },
]

export default function VariantsPage() {
  const [selectedVariants, setSelectedVariants] = useState<string[]>([])

  const toggleVariant = (id: string) => {
    setSelectedVariants(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    )
  }

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Homepage Variants</h1>
          <p className="text-white/60 max-w-2xl">
            Compare all homepage design variants. Click on a variant to mark it for consideration.
            Each variant has a distinct design philosophy to test different approaches.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3 mb-12">
          {variants.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              target="_blank"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${colorClasses[v.color].border} ${colorClasses[v.color].bg} ${colorClasses[v.color].text} hover:opacity-80 transition-opacity`}
            >
              <Eye className="w-4 h-4" />
              {v.id.toUpperCase()}
              <ExternalLink className="w-3 h-3" />
            </Link>
          ))}
        </div>

        {/* Variants grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant) => {
            const isSelected = selectedVariants.includes(variant.id)
            const colors = colorClasses[variant.color]

            return (
              <div
                key={variant.id}
                onClick={() => toggleVariant(variant.id)}
                className={`relative cursor-pointer rounded-2xl border p-6 transition-all ${
                  isSelected
                    ? `${colors.border} ${colors.bg} ring-2 ring-offset-2 ring-offset-[#0a0a0b] ${colors.border.replace('border-', 'ring-')}`
                    : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                {/* Selection indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${
                  isSelected ? `${colors.bg} ${colors.text}` : 'bg-white/5 text-white/20'
                }`}>
                  {isSelected ? <Check className="w-4 h-4" /> : null}
                </div>

                {/* Header */}
                <div className="mb-4">
                  <span className={`text-xs font-medium ${colors.text} uppercase tracking-wider`}>
                    {variant.id}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{variant.name}</h2>
                  <p className="text-sm text-white/40 mt-1">{variant.style}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-white/60 mb-6">{variant.description}</p>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">Pros</p>
                    <ul className="space-y-1">
                      {variant.pros.map((pro) => (
                        <li key={pro} className="text-xs text-white/50 flex items-start gap-2">
                          <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-rose-400 uppercase tracking-wider mb-2">Cons</p>
                    <ul className="space-y-1">
                      {variant.cons.map((con) => (
                        <li key={con} className="text-xs text-white/50 flex items-start gap-2">
                          <X className="w-3 h-3 text-rose-400 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View link */}
                <Link
                  href={`/${variant.id}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  View Full Page
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Selected summary */}
        {selectedVariants.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
            <p className="text-sm text-white/60 mb-2">
              Selected: {selectedVariants.map(v => v.toUpperCase()).join(', ')}
            </p>
            <p className="text-xs text-white/40">
              Click variants to add/remove from consideration
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
