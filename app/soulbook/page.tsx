'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SoulbookHero from '@/components/soulbook/SoulbookHero'
import LifeBookSelector from '@/components/soulbook/LifeBookSelector'
import PillarVisualizer from '@/components/soulbook/PillarVisualizer'
import PremiumButton from '@/components/ui/PremiumButton'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import JsonLd from '@/components/seo/JsonLd'
import { philosophyStatements } from '@/lib/soulbook/soulbook-data'

const websiteSchema = {
  name: 'Soulbook',
  url: 'https://frankx.ai/soulbook',
  description: 'A transformative journey through 7 pillars of conscious living.',
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
              href="/soulbook/vault"
            >
              Open the free vault
            </PremiumButton>
            <PremiumButton
              variant="ghost"
              size="xl"
              href="/soulbook/assessment"
            >
              Take free assessment
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

      <SoulbookHero />
      <LifeBookSelector />
      <PillarVisualizer />
      <PhilosophySection />
      <AssessmentCTA />
      <FooterSection />
    </main>
  )
}
