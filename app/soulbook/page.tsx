'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SoulbookHero from '@/components/soulbook/SoulbookHero'
import LifeBookSelector from '@/components/soulbook/LifeBookSelector'
import PillarVisualizer from '@/components/soulbook/PillarVisualizer'
import PremiumButton from '@/components/ui/PremiumButton'
import { GlowCard } from '@/components/ui/glow-card'
import JsonLd from '@/components/seo/JsonLd'
import { philosophyStatements } from '@/lib/soulbook/soulbook-data'

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
              <GlowCard
                color="violet"
                className="h-full p-6 text-center"
              >
                <span className="text-4xl mb-4 block">{statement.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{statement.title}</h3>
                <p className="text-white/60 text-sm">{statement.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExclusiveAccessSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Begin Your Journey
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Soulbook is a premium, guided experience. Explore the pillars above for free —
            when you&apos;re ready for the full transformation, request access below.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Free Preview', desc: 'Explore all 7 pillars and core philosophy' },
              { label: 'Guided Journey', desc: 'Structured programs with exercises and reflection' },
              { label: 'Full Transformation', desc: 'Complete system with coaching integration' },
            ].map((tier) => (
              <GlowCard key={tier.label} color="violet" className="p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">{tier.label}</h3>
                <p className="text-white/50 text-sm">{tier.desc}</p>
              </GlowCard>
            ))}
          </div>

          <PremiumButton
            variant="luxury"
            size="xl"
            glow
            href="/start"
          >
            Request Access
          </PremiumButton>

          <p className="mt-6 text-white/30 text-sm">
            Limited availability. Application reviewed within 48 hours.
          </p>
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
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/community" className="hover:text-white transition-colors">Community</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <p className="text-sm text-white/40">
            © 2026 FrankX.AI. All rights reserved.
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
      <ExclusiveAccessSection />
      <AssessmentCTA />
      <FooterSection />
    </main>
  )
}
