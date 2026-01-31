'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Eye, Check, X, Home, Package, Music } from 'lucide-react'

/**
 * Variant Comparison Dashboard
 *
 * Admin page to compare all page variants side by side
 */

const homepageVariants = [
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
  {
    id: 'v7',
    name: 'Minimalist',
    description: 'Apple-inspired ultra-clean, maximum whitespace, light mode, subtle typography',
    style: 'Apple/Zen',
    pros: ['Ultra clean', 'Fast loading', 'Timeless elegance'],
    cons: ['Light mode only', 'May feel too sparse', 'Less distinctive'],
    color: 'slate',
  },
  {
    id: 'v8',
    name: 'Brutalist',
    description: 'Raw aesthetic, harsh contrasts, monospace fonts, anti-design elements',
    style: 'Brutalist/Anti-design',
    pros: ['Highly memorable', 'Stands out', 'Developer appeal'],
    cons: ['Polarizing', 'Not for everyone', 'Readability concerns'],
    color: 'rose',
  },
  {
    id: 'v9',
    name: 'Gradient Wave',
    description: 'Stripe/Linear inspired, smooth animated gradients, flowing curves',
    style: 'Stripe/Linear',
    pros: ['Modern and premium', 'Beautiful animations', 'Professional feel'],
    cons: ['Animation heavy', 'Similar to many SaaS sites'],
    color: 'indigo',
  },
  {
    id: 'v10',
    name: 'Feed',
    description: 'Twitter/X style social feed, timeline format, activity updates',
    style: 'Social/Twitter',
    pros: ['Familiar UX', 'Shows activity', 'Engaging format'],
    cons: ['May feel derivative', 'Less unique', 'Requires content updates'],
    color: 'blue',
  },
]

const productsVariants = [
  {
    id: 'products-v1',
    name: 'Grid (Current)',
    description: 'Standard product grid with cards, descriptions, and highlights',
    style: 'Classic e-commerce',
    pros: ['Familiar UX', 'Clear information hierarchy', 'Works well'],
    cons: ['Not distinctive', 'Could be more engaging'],
    color: 'violet',
  },
  {
    id: 'products-v2',
    name: 'Bento Grid',
    description: 'Modern bento box layout with varying card sizes and visual hierarchy',
    style: 'Modern SaaS',
    pros: ['Visual interest', 'Highlights featured product', 'Modern feel'],
    cons: ['May be harder to scan', 'Complex layout'],
    color: 'cyan',
  },
  {
    id: 'products-v3',
    name: 'Timeline',
    description: 'Storytelling timeline showing product roadmap and launch dates',
    style: 'Roadmap/Timeline',
    pros: ['Shows progression', 'Creates anticipation', 'Unique approach'],
    cons: ['May feel incomplete', 'Less focus on individual products'],
    color: 'emerald',
  },
]

const musicLabVariants = [
  {
    id: 'music-lab-v1',
    name: 'Tutorial (Current)',
    description: 'Educational focus with step-by-step guide to AI music creation',
    style: 'Documentation/Tutorial',
    pros: ['Educational value', 'Good for beginners', 'Clear CTAs'],
    cons: ['Less immersive', 'Doesn\'t showcase music well'],
    color: 'pink',
  },
  {
    id: 'music-lab-v2',
    name: 'Player-Centric',
    description: 'Large waveform, prominent player controls, album art focus',
    style: 'Spotify/Apple Music',
    pros: ['Immersive', 'Music-first experience', 'Engaging player'],
    cons: ['Less educational', 'Requires actual playback'],
    color: 'violet',
  },
  {
    id: 'music-lab-v3',
    name: 'Studio',
    description: 'DJ booth / production studio aesthetic with knobs and faders',
    style: 'Pro Audio/Studio',
    pros: ['Professional feel', 'Unique design', 'Appeals to producers'],
    cons: ['May be too technical', 'Niche appeal'],
    color: 'purple',
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  slate: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
}

type Variant = {
  id: string
  name: string
  description: string
  style: string
  pros: string[]
  cons: string[]
  color: string
}

function VariantCard({ variant, isSelected, onToggle }: { variant: Variant; isSelected: boolean; onToggle: () => void }) {
  const colors = colorClasses[variant.color] || colorClasses.slate

  return (
    <div
      onClick={onToggle}
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
}

function VariantSection({
  title,
  icon: Icon,
  variants,
  selectedIds,
  onToggle,
  basePath,
}: {
  title: string
  icon: React.ElementType
  variants: Variant[]
  selectedIds: string[]
  onToggle: (id: string) => void
  basePath: string
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white/60" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {variants.map((v) => {
          const colors = colorClasses[v.color] || colorClasses.slate
          return (
            <Link
              key={v.id}
              href={`/${v.id}`}
              target="_blank"
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors.border} ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity text-sm`}
            >
              <Eye className="w-3 h-3" />
              {v.id.toUpperCase()}
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            isSelected={selectedIds.includes(variant.id)}
            onToggle={() => onToggle(variant.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default function VariantsPage() {
  const [selectedHomepage, setSelectedHomepage] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedMusicLab, setSelectedMusicLab] = useState<string[]>([])

  const toggleHomepage = (id: string) => {
    setSelectedHomepage(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }
  const toggleProducts = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }
  const toggleMusicLab = (id: string) => {
    setSelectedMusicLab(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }

  const totalSelected = selectedHomepage.length + selectedProducts.length + selectedMusicLab.length

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Design Variants</h1>
          <p className="text-white/60 max-w-2xl">
            Compare all page design variants. Click on a variant to mark it for consideration.
            Each variant has a distinct design philosophy to test different approaches.
          </p>
        </div>

        {/* Homepage Variants */}
        <VariantSection
          title="Homepage (10 variants)"
          icon={Home}
          variants={homepageVariants}
          selectedIds={selectedHomepage}
          onToggle={toggleHomepage}
          basePath=""
        />

        {/* Products Variants */}
        <VariantSection
          title="Products Page (3 variants)"
          icon={Package}
          variants={productsVariants}
          selectedIds={selectedProducts}
          onToggle={toggleProducts}
          basePath="products-"
        />

        {/* Music Lab Variants */}
        <VariantSection
          title="Music Lab (3 variants)"
          icon={Music}
          variants={musicLabVariants}
          selectedIds={selectedMusicLab}
          onToggle={toggleMusicLab}
          basePath="music-lab-"
        />

        {/* Selected summary */}
        {totalSelected > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
            <p className="text-sm text-white/80 mb-1">
              <strong>Selected ({totalSelected}):</strong>
            </p>
            <p className="text-xs text-white/50">
              {[...selectedHomepage, ...selectedProducts, ...selectedMusicLab].map(v => v.toUpperCase()).join(', ')}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
