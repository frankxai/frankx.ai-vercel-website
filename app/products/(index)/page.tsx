'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Music,
  BookOpen,
  Cpu,
  CheckCircle2,
  Package,
  Search,
  Layers,
  Terminal,
  Coins,
  Shield,
  ExternalLink,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { GlowCard, type GlowColor } from '@/components/ui/glow-card'
import rawProducts from '@/data/products.json'

interface NormalizedProduct {
  id: string
  slug: string
  name: string
  headline: string
  description: string
  category: string
  badge?: string
  price: number
  priceDisplay: string
  currency: string
  originalPrice?: number
  highlights: string[]
  color: GlowColor
  icon: typeof Cpu
  isFree: boolean
  isWaitlist: boolean
  featured: boolean
  href: string
  primaryCtaHref: string
  primaryCtaLabel: string
}

// Background atmosphere — restrained ambient depth
function ProductsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0a0a0b]" />
      <div
        className="absolute -right-60 top-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.04) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)',
          filter: 'blur(128px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

const CATEGORY_TABS = [
  'All',
  'Agentic systems',
  'Systems and code',
  'Creative and media',
  'Wealth and operations',
  'Books and wisdom',
  'Free starter kits',
] as const

type CategoryTab = (typeof CATEGORY_TABS)[number]

const CATEGORY_MAPPINGS: Record<string, string[]> = {
  'Agentic systems': [
    'agentic-creator-os',
    'agent-fleet-pro',
    'agentic-media-machine',
    'agentic-content-engine',
  ],
  'Systems and code': [
    'system-architect-starter-kit',
    'command-center-template',
    'starlight-operator-pack',
    'reality-architect-os',
    'starlight-protocol-spec',
  ],
  'Creative and media': [
    'vibe-os',
    'generative-creator-os',
    'visual-creation-loop',
    'creation-chronicles',
    '5-suno-prompts',
    'suno-prompt-library',
    'aurora-ui-kit',
    'creative-ai-toolkit',
  ],
  'Wealth and operations': [
    'founders-circle-guild',
    'dpi-field-kit',
    'income-architecture-blueprint',
    'memory-palace-os',
    '12-stream-atlas',
    'anti-slop-content-matrix',
    'capability-to-cash-audit',
    'dpi-stream-taxonomy',
  ],
  'Books and wisdom': [
    'creators-soulbook',
    'golden-age-book',
    'book-love-and-poetry',
    'book-spartan-mindset',
    'book-self-development',
    'book-imagination',
    'book-manifestation',
  ],
}

const FLAGSHIP_IDS = ['agentic-creator-os', 'vibe-os', 'creators-soulbook']

function resolveProductColor(category: string, price: number): GlowColor {
  if (category.includes('Music') || category.includes('Creative')) return 'emerald'
  if (category.includes('Architecture') || category.includes('Engineering') || category.includes('Agentic')) return 'cyan'
  if (category.includes('Wealth') || category.includes('Income') || price > 500) return 'amber'
  return 'cyan'
}

function resolveProductIcon(category: string, id: string) {
  if (id.includes('music') || id.includes('suno') || id.includes('audio') || id.includes('vibe')) return Music
  if (id.includes('book') || category === 'Books' || category === 'book') return BookOpen
  if (id.includes('income') || id.includes('dpi') || id.includes('wealth') || id.includes('cash')) return Coins
  if (id.includes('agent') || id.includes('fleet') || id.includes('mesh')) return Terminal
  if (id.includes('architect') || id.includes('system') || id.includes('mcp')) return Layers
  return Cpu
}

export default function ProductsPage() {
  const [selectedTab, setSelectedTab] = useState<CategoryTab>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllCards, setShowAllCards] = useState(false)

  // Normalize all products once, excluding Arcanea mythology per FrankX brand boundary
  const allProducts: NormalizedProduct[] = useMemo(() => {
    return (rawProducts as any[])
      .filter((p) => !p.id.includes('arcanea') && !p.slug?.includes('arcanea') && p.brand !== 'arcanea')
      .map((p) => {
        const price = p.offer?.primaryPrice ?? p.price ?? 0
        const currency = p.offer?.currency ?? 'USD'
        const priceDisplay =
          p.offer?.primaryPriceDisplay ??
          (price === 0 ? 'Free' : currency === 'EUR' ? `€${price}` : `$${price}`)
        const name = p.name ?? p.title ?? p.slug
        const headline = p.headline ?? p.description ?? ''
        const description = p.summary ?? p.promise ?? p.description ?? ''
        const category = p.category || 'General'

        const isWaitlist = Boolean(
          p.offer?.ctaPrimary?.toLowerCase().includes('waitlist') ||
          p.cta?.label?.toLowerCase().includes('waitlist')
        )

        // Truthful transformation highlights — no invented engineering claims for books
        const highlights =
          Array.isArray(p.transformation) && p.transformation.length > 0
            ? p.transformation.slice(0, 3)
            : []

        const primaryCtaHref = isWaitlist
          ? (p.offer?.ctaPrimaryHref ?? `/waitlist?intent=${p.slug}`)
          : (price === 0
              ? (p.offer?.ctaPrimaryHref ?? p.cta?.href ?? `/products/${p.slug}`)
              : (p.offer?.ctaPrimaryHref?.startsWith('http')
                  ? p.offer.ctaPrimaryHref
                  : `/checkout/${p.slug}`))

        const primaryCtaLabel =
          p.offer?.ctaPrimary ??
          p.cta?.label ??
          (isWaitlist ? 'Join waitlist' : price === 0 ? 'Free access' : 'Acquire')

        return {
          id: p.id,
          slug: p.slug,
          name,
          headline,
          description,
          category,
          badge: p.badge,
          price,
          priceDisplay,
          currency,
          originalPrice: p.offer?.originalPrice,
          highlights,
          color: resolveProductColor(category, price),
          icon: resolveProductIcon(category, p.id),
          isFree: price === 0,
          isWaitlist,
          featured: FLAGSHIP_IDS.includes(p.id) || p.featured === true || price >= 147,
          href: `/products/${p.slug}`,
          primaryCtaHref,
          primaryCtaLabel,
        }
      })
  }, [])

  // Filtered list based on active tab and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Tab matching
      if (selectedTab === 'Free starter kits') {
        if (!product.isFree) return false
      } else if (selectedTab !== 'All') {
        const allowedIds = CATEGORY_MAPPINGS[selectedTab]
        if (!allowedIds || !allowedIds.includes(product.id)) {
          return false
        }
      }

      // Search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = product.name.toLowerCase().includes(query)
        const matchHeadline = product.headline.toLowerCase().includes(query)
        const matchDesc = product.description.toLowerCase().includes(query)
        const matchCategory = product.category.toLowerCase().includes(query)
        if (!matchName && !matchHeadline && !matchDesc && !matchCategory) {
          return false
        }
      }

      return true
    })
  }, [allProducts, selectedTab, searchQuery])

  // Split flagship spotlight from progressive catalog to prevent 33-card wall in All view
  const isDefaultAllView = selectedTab === 'All' && !searchQuery.trim()
  const flagshipProducts = useMemo(() => {
    return allProducts.filter((p) => FLAGSHIP_IDS.includes(p.id))
  }, [allProducts])

  // Flagships already render in the spotlight above the grid in the default All view.
  const gridProducts = useMemo(() => {
    if (!isDefaultAllView) return filteredProducts
    return filteredProducts.filter((p) => !FLAGSHIP_IDS.includes(p.id))
  }, [isDefaultAllView, filteredProducts])

  const visibleProducts = useMemo(() => {
    if (!isDefaultAllView) return gridProducts
    if (showAllCards) return gridProducts
    // In All view without search, show 9 curated systems initially
    return gridProducts.slice(0, 9)
  }, [isDefaultAllView, showAllCards, gridProducts])

  // Structured Data Schema for Google Product Carousel with verified currencies and stock status
  const structuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'FrankX AI Digital Estate and Architecture Solutions',
      description:
        'Production agent frameworks, system prompt suites, multi-modal workflows, and enterprise AI blueprints by AI Architect Frank Riemer.',
      numberOfItems: allProducts.length,
      itemListElement: allProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.headline || product.description,
          url: `https://www.frankx.ai/products/${product.slug}`,
          sku: product.id,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: product.currency,
            availability: product.isWaitlist
              ? 'https://schema.org/PreOrder'
              : 'https://schema.org/InStock',
          },
        },
      })),
    }
  }, [allProducts])

  return (
    <>
      <ProductsBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                The sovereign digital estate
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Operational systems.
              <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300">
                Engineered for production.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              Agent frameworks, system prompt suites, multi-modal pipelines and advisory playbooks.
            </motion.p>
          </div>
        </section>

        {/* Flagship Architectures Spotlight (in default All view) */}
        {isDefaultAllView && (
          <section className="pb-12">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-1">
                    Flagship architectures
                  </p>
                  <h2 className="text-xl font-bold text-white">
                    Primary operational foundations
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {flagshipProducts.map((product) => {
                  const Icon = product.icon
                  return (
                    <div
                      key={`spotlight-${product.id}`}
                      className="flex flex-col"
                    >
                      <GlowCard
                        color={product.color}
                        className="group flex flex-col h-full p-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] hover:border-emerald-500/40 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1"
                      >
                        <div className="mb-5 flex items-start justify-between gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {product.priceDisplay}
                          </span>
                        </div>

                        <div className="mb-4 flex-1">
                          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400/80 block mb-1">
                            Flagship system
                          </span>
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
                            {product.headline || product.description}
                          </p>
                        </div>

                        {product.highlights.length > 0 && (
                          <div className="mb-6 border-t border-white/5 pt-4">
                            <p className="text-[11px] font-semibold tracking-wider text-slate-400 mb-2.5">
                              Core deliverables
                            </p>
                            <ul className="space-y-2">
                              {product.highlights.map((highlight, hIdx) => (
                                <li
                                  key={hIdx}
                                  className="flex items-start gap-2.5 text-xs leading-snug text-slate-300"
                                >
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                                  <span className="line-clamp-2">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                          <Link
                            href={product.href}
                            onClick={() =>
                              trackEvent('product_explore_click', { productId: product.id })
                            }
                            className="min-h-[44px] flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-[background-color,border-color,color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                          >
                            <span>Inspect blueprint</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>

                          {!product.isFree ? (
                            <Link
                              href={
                                product.isWaitlist
                                  ? (product.primaryCtaHref || `/waitlist?intent=${product.slug}`)
                                  : (product.primaryCtaHref.startsWith('http')
                                      ? product.primaryCtaHref
                                      : `/checkout/${product.slug}`)
                              }
                              onClick={() =>
                                trackEvent(
                                  product.isWaitlist ? 'product_waitlist_click' : 'product_checkout_click',
                                  { productId: product.id }
                                )
                              }
                              className="min-h-[44px] flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-black hover:bg-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                            >
                              <span>{product.isWaitlist ? 'Join waitlist' : 'Acquire'}</span>
                            </Link>
                          ) : (
                            <Link
                              href={product.primaryCtaHref || product.href}
                              onClick={() =>
                                trackEvent('product_free_access_click', { productId: product.id })
                              }
                              className="min-h-[44px] flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                            >
                              <span>{product.primaryCtaLabel || 'Free access'}</span>
                            </Link>
                          )}
                        </div>
                      </GlowCard>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Filter and Search Controls */}
        <section className="sticky top-20 z-20 border-y border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl py-4">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedTab === tab
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setSelectedTab(tab)
                        trackEvent('products_tab_change', { tab })
                      }}
                      className={`min-h-[44px] rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-[background-color,color,border-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                        isActive
                          ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]'
                          : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search systems and blueprints..."
                  aria-label="Search systems and blueprints"
                  className="min-h-[44px] w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-10 py-2 text-sm text-white placeholder-slate-500 transition-[border-color,background-color] duration-300 outline-none focus-visible:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-slate-400">
              <span>
                Showing <strong className="text-white">{filteredProducts.length}</strong> operational systems
              </span>
              {selectedTab !== 'All' && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab('All')
                    setSearchQuery('')
                  }}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors duration-200"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="my-16 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
                <SlidersHorizontal className="mx-auto mb-4 h-8 w-8 text-slate-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">No blueprints matched your query</h3>
                <p className="mb-6 text-sm text-slate-400">
                  Try adjusting your search terms or switch to another category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab('All')
                    setSearchQuery('')
                  }}
                  className="min-h-[44px] rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors duration-200"
                >
                  View all blueprints
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visibleProducts.map((product, index) => {
                    const Icon = product.icon

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                        className="flex flex-col"
                      >
                        <GlowCard
                          color={product.color}
                          className="group flex flex-col h-full p-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1"
                        >
                          {/* Header Badges */}
                          <div className="mb-5 flex items-start justify-between gap-3">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/90 border border-white/10 group-hover:border-emerald-500/30 transition-colors duration-300"
                            >
                              <Icon className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              {product.badge && (
                                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-slate-300 border border-white/10">
                                  {product.badge}
                                </span>
                              )}
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  product.isFree
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                                }`}
                              >
                                {product.priceDisplay}
                              </span>
                            </div>
                          </div>

                          {/* Title and Summary */}
                          <div className="mb-4 flex-1">
                            <span className="text-[11px] font-medium tracking-[0.08em] text-slate-400 block mb-1">
                              {product.category}
                            </span>
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
                              {product.headline || product.description}
                            </p>
                          </div>

                          {/* Deliverables / Transformation Highlights (truthful, only rendered when present) */}
                          {product.highlights.length > 0 && (
                            <div className="mb-6 border-t border-white/5 pt-4">
                              <p className="text-[11px] font-semibold tracking-wider text-slate-400 mb-2.5">
                                Core deliverables
                              </p>
                              <ul className="space-y-2">
                                {product.highlights.map((highlight, hIdx) => (
                                  <li
                                    key={hIdx}
                                    className="flex items-start gap-2.5 text-xs leading-snug text-slate-300"
                                  >
                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                                    <span className="line-clamp-2">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                            <Link
                              href={product.href}
                              onClick={() =>
                                trackEvent('product_explore_click', { productId: product.id })
                              }
                              className="min-h-[44px] flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-[background-color,border-color,color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                            >
                              <span>Inspect blueprint</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>

                            {!product.isFree ? (
                              <Link
                                href={
                                  product.isWaitlist
                                    ? (product.primaryCtaHref || `/waitlist?intent=${product.slug}`)
                                    : (product.primaryCtaHref.startsWith('http')
                                        ? product.primaryCtaHref
                                        : `/checkout/${product.slug}`)
                                }
                                onClick={() =>
                                  trackEvent(
                                    product.isWaitlist ? 'product_waitlist_click' : 'product_checkout_click',
                                    { productId: product.id }
                                  )
                                }
                                className={`min-h-[44px] flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 ${
                                  product.isWaitlist
                                    ? 'border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 focus-visible:ring-amber-500/40'
                                    : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] focus-visible:ring-emerald-500/50'
                                }`}
                              >
                                <span>{product.isWaitlist ? 'Join waitlist' : 'Acquire'}</span>
                              </Link>
                            ) : (
                              <Link
                                href={product.primaryCtaHref || product.href}
                                onClick={() =>
                                  trackEvent('product_free_access_click', { productId: product.id })
                                }
                                className="min-h-[44px] flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                              >
                                <span>{product.primaryCtaLabel || 'Free access'}</span>
                              </Link>
                            )}
                          </div>
                        </GlowCard>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Progressive Reveal Toggle to Avoid Card Wall in All View */}
                {isDefaultAllView && !showAllCards && gridProducts.length > 9 && (
                  <div className="mt-12 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAllCards(true)}
                      className="min-h-[44px] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-8 py-3 text-sm font-semibold text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-[border-color,background-color,color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                    >
                      <span>Show all {gridProducts.length} systems</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Architectural FAQ Section */}
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Architecture and delivery FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'What formats and deliverables are included?',
                  a: 'Assets are delivered as markdown documents, prompt files, Obsidian vaults or scripts, as listed on each product page.',
                },
                {
                  q: 'How does digital delivery work?',
                  a: 'Free resources link to a download or reading page, or to the waitlist while they are not ready. Paid products open for purchase later; join the launch list on each page.',
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]"
                >
                  <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 md:p-12 backdrop-blur-xl">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

              <div className="relative flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium border border-emerald-500/20">
                  <Shield className="w-4 h-4" />
                  Sovereign architecture
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Deploy elite AI architectures in your own stack
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Start with open specifications and free starter kits, or join the launch list for paid kits.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-2">
                  <Link
                    href="/products/agent-fleet-pro"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-footer', target: 'agent-fleet-pro' })
                    }
                    className="min-h-[44px] flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    <span>Inspect Agent Fleet Pro</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/newsletter"
                    onClick={() =>
                      trackEvent('cta_click', { location: 'products-footer', target: 'newsletter' })
                    }
                    className="min-h-[44px] flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/[0.08] transition-[background-color,border-color] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <span>Read the dispatch</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
