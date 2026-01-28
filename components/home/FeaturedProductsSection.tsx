'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { homepageContent } from '@/data/homepage'
import { trackEvent } from '@/lib/analytics'

const colorMap = {
  cyan: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    card: 'border-cyan-500/20 hover:border-cyan-400/30',
    gradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    text: 'text-cyan-400'
  },
  emerald: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    card: 'border-emerald-500/20 hover:border-emerald-400/30',
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    text: 'text-emerald-400'
  }
}

export function FeaturedProductsSection() {
  const { featuredProducts } = homepageContent

  return (
    <section className="py-16 md:py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {featuredProducts.sectionTitle}
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            {featuredProducts.sectionSubtitle}
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {featuredProducts.products.map((product, index) => {
            const colors = colorMap[product.color as keyof typeof colorMap]

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  href={product.href}
                  onClick={() => trackEvent('product_click', {
                    location: 'homepage_featured',
                    product_id: product.id
                  })}
                  className={`group block h-full p-8 md:p-10 rounded-2xl bg-white/[0.02] border ${colors.card} hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Badge */}
                    <div className="mb-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colors.badge}`}>
                        {product.badge}
                      </span>
                    </div>

                    {/* Title & tagline */}
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                      {product.name}
                    </h3>
                    <p className={`text-lg font-medium mb-4 ${colors.text}`}>
                      {product.tagline}
                    </p>
                    <p className="text-base text-white/50 leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                      {product.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-white/[0.06]">
                      {product.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-2xl font-bold text-white mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/40 uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-base font-medium text-white group-hover:text-emerald-400 transition-colors">
                      Explore {product.name.split(':')[0]}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all products link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-base text-white/50 hover:text-emerald-400 transition-colors"
          >
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
