'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

import { getAllAffiliates } from '@/lib/affiliates/affiliate-manager'
import AffiliateCard from '@/components/affiliates/AffiliateCard'
import AffiliateDisclosure from '@/components/affiliates/AffiliateDisclosure'
import { StaggerContainer, StaggerItem } from '@/components/ui/AdvancedAnimations'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

export default function AffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const allAffiliates = getAllAffiliates()

  const filteredAffiliates = allAffiliates.filter(
    (affiliate) =>
      affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      affiliate.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 pb-16 pt-24 text-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-16 text-center">
              <h1 className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">Affiliate Partners</h1>
              <p className="mx-auto mb-12 max-w-4xl text-xl text-slate-300">
                A curated list of tools and services we rely on inside the FrankX intelligence stack.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <GlassmorphicCard variant="premium" className="mb-12 p-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search affiliates..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                />
              </div>
            </GlassmorphicCard>
          </StaggerItem>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {filteredAffiliates.map((affiliate, index) => (
              <StaggerItem key={affiliate.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <AffiliateCard affiliate={affiliate} trackingId={`affiliates-page-${affiliate.id}`} />
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <AffiliateDisclosure className="mx-auto max-w-4xl" />
      </div>
    </div>
  )
}
