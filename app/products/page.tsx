'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Star } from 'lucide-react'
import { motion } from 'framer-motion'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { trackEvent } from '@/lib/analytics'
import { getProductCards } from '@/lib/products'

const productCards = getProductCards()

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />
        <div className="relative mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
            >
              <Shield className="mr-2 h-4 w-4" />
              Creator-Tested & Proven
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl font-bold bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent sm:text-6xl lg:text-7xl"
            >
              Creator Operating Systems
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-16 max-w-4xl text-xl leading-relaxed text-slate-300 sm:text-2xl"
            >
              Ship faster, ship smarter, ship consistently. Each system combines battle-tested workflows, AI-powered automation, and measurable rituals so you spend less time managing tools and more time creating.
            </motion.p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {productCards.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <GlassmorphicCard variant="luxury" border="glow" hover className="flex h-full flex-col p-8">
                  <div className="mb-6">
                    {product.badge ? (
                      <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-bold text-slate-100">{product.name}</h3>
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-300">
                      {product.category ?? 'FrankX Featured'}
                    </p>
                    <p className="mb-6 leading-relaxed text-slate-300">{product.summary}</p>

                    <ul className="mb-8 space-y-3">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center text-sm text-slate-200">
                          <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-emerald-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {product.testimonial ? (
                      <div className="rounded-xl border border-slate-700/30 bg-slate-800/40 p-4">
                        <div className="mb-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <p className="mb-3 text-sm italic text-slate-300">"{product.testimonial.text}"</p>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                          {product.testimonial.author}
                          {product.testimonial.role ? ` — ${product.testimonial.role}` : ''}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-purple-300">${product.price}</div>
                      {product.originalPrice ? (
                        <div className="text-sm text-slate-500 line-through">${product.originalPrice}</div>
                      ) : null}
                    </div>
                    <Link
                      href={product.href}
                      onClick={() => trackEvent('product_card_click', { productId: product.id })}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-purple-500 hover:to-indigo-500"
                    >
                      View Product
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-4xl border border-white/10 bg-white/5 px-8 py-12 text-white">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Need tactical resources between products?</h2>
              <p className="mt-3 text-white/70">
                Free essays, AI music sessions, template drops, and a weekly dispatch curated for creators shipping real work. No corporate fluff—just tools that matter.
              </p>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/resources"
                onClick={() => trackEvent('product_resources_cta', { location: 'products-page' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15"
              >
                Browse Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
              <PremiumButton
                onClick={() => trackEvent('product_newsletter_cta', { location: 'products-page' })}
                href="/creation-chronicles"
                variant="luxury"
                glow
              >
                Join the Dispatch
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
