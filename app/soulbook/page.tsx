'use client'

import { motion } from 'framer-motion'
import SoulbookHero from '@/components/soulbook/SoulbookHero'
import LifeBookSelector from '@/components/soulbook/LifeBookSelector'
import PillarVisualizer from '@/components/soulbook/PillarVisualizer'
import PremiumButton from '@/components/ui/PremiumButton'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import JsonLd from '@/components/seo/JsonLd'
import { philosophyStatements, pricingTiers } from '@/lib/soulbook/soulbook-data'

const websiteSchema = {
  name: 'Soulbook',
  url: 'https://frankx.ai/soulbook',
  description: 'A transformative journey through 7 pillars of conscious living.',
}

const productSchema = {
  name: 'Soulbook Life Books',
  description: 'Three transformative journeys through the Soulbook framework: Life Symphony, Golden Path, and 7 Pillars.',
  brand: 'FrankX.AI',
  category: 'Personal Development',
  offers: {
    priceCurrency: 'USD',
    minPrice: 97,
    maxPrice: 897,
  },
}

function PhilosophySection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Our Philosophy
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            The principles that guide the Soulbook framework and your transformation journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyStatements.map((statement, i) => (
            <motion.div
              key={statement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassmorphicCard
                variant="premium"
                gradient="aurora"
                hover
                className="h-full p-6 text-center"
              >
                <span className="text-4xl mb-4 block">{statement.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{statement.title}</h3>
                <p className="text-white/60 text-sm">{statement.description}</p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Investment Options
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Choose the level of transformation that resonates with your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassmorphicCard
                variant={tier.popular ? 'luxury' : 'premium'}
                gradient={tier.popular ? 'aurora' : 'custom'}
                border={tier.popular ? 'glow' : 'subtle'}
                hover
                className="h-full p-6 flex flex-col"
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-4">{tier.description}</p>

                <div className="mt-auto mb-6">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <PremiumButton
                  variant={tier.popular ? 'luxury' : 'primary'}
                  size="lg"
                  className="w-full"
                  glow={tier.popular}
                >
                  {tier.cta}
                </PremiumButton>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-green-300 text-sm font-medium">30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AssessmentCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-midnight-950 to-purple-900/20" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Not Sure Where to Start?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Take our free assessment to discover which Life Book aligns with your current needs and transformation goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PremiumButton
              variant="luxury"
              size="xl"
              glow
              href="/assessment"
            >
              Take Free Assessment
            </PremiumButton>
            <PremiumButton
              variant="ghost"
              size="xl"
              href="/contact"
            >
              Schedule a Discovery Call
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-serif text-lg font-bold">
              <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Soulbook
              </span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/community" className="hover:text-white transition-colors">Community</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-sm text-white/40">
            © 2025 FrankX.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function SoulbookPage() {
  return (
    <main className="min-h-screen bg-black">
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Product" data={productSchema} />

      <SoulbookHero />
      <LifeBookSelector />
      <PillarVisualizer />
      <PhilosophySection />
      <PricingSection />
      <AssessmentCTA />
      <FooterSection />
    </main>
  )
}
