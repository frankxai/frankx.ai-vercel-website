'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles, Gavel, Layers } from 'lucide-react'

const sections = [
  {
    id: 'templates',
    title: 'Templates & Skills',
    description: 'Claude Code skill packs, n8n workflows, Next.js starters, MCP configs, and AI architecture blueprints.',
    image: '/images/blog/build-your-own-jarvis-hero.png',
    href: '/shop/templates',
    count: 15,
    accent: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    icon: Layers,
    badge: 'New',
    priceRange: '$19 – $297',
  },
  {
    id: 'auctions',
    title: 'Live Auctions',
    description: 'Limited edition prints, 1:1 coaching sessions, custom ACOS builds, and exclusive experiences.',
    image: '/images/gallery/instruments/biotech-grand-piano.png',
    href: '/auctions',
    count: 5,
    accent: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    icon: Gavel,
    badge: 'Live',
    priceRange: '$47 – $1,997',
  },
  {
    id: 'collectibles',
    title: 'Collectibles',
    description: 'ACOS trading cards (40-card Genesis set), bio-tech instrument prints, and mixed drop packs.',
    image: '/images/ecosystem/01-frankx-ecosystem-overview.png',
    href: '/collectibles',
    count: 40,
    accent: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    icon: Sparkles,
    badge: 'Genesis Set',
    priceRange: '$5 – $497',
  },
  {
    id: 'products',
    title: 'Digital Products',
    description: 'Full courses, toolkits, and operating systems. Soulbook, Vibe OS, ACOS, Creative AI Toolkit.',
    image: '/images/blog/golden-age-of-intelligence-hero.png',
    href: '/products',
    count: 10,
    accent: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    icon: ShoppingBag,
    priceRange: 'Free – $997',
  },
]

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col items-center gap-4 mb-8">
              <Image
                src="/images/team/draconia-tiger.png"
                alt="Draconia — Product Forge"
                width={72}
                height={72}
                className="rounded-2xl"
                style={{ boxShadow: '0 0 30px -6px rgba(239,68,68,0.4)' }}
              />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                <ShoppingBag className="w-4 h-4" />
                FrankX Shop
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Build{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                Faster
              </span>
            </h1>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              Templates, blueprints, and tools built by an AI architect who ships in production.
              No theory. Just working code, tested workflows, and real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className={`group relative block overflow-hidden rounded-2xl border ${section.border} bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500`}
              >
                {/* Image */}
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/50 to-transparent" />

                  {section.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-sm">
                      {section.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="w-5 h-5 text-white/40" />
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {section.title}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">
                    {section.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{section.count} items</span>
                    <span>{section.priceRange}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
