'use client'

import { motion } from 'framer-motion'
import { Building2, Heart, TrendingUp, ShoppingBag, Factory, ArrowRight } from 'lucide-react'

/**
 * Oracle AI World - Industry Pack Cards
 *
 * Showcases vertical industry solutions built on Oracle AI platform
 */

const industryPacks = [
  {
    id: 'insurance',
    name: 'Insurance',
    icon: Building2,
    description: 'Claims automation, fraud detection, risk assessment, and customer service optimization',
    useCases: ['Multimodal claims processing', 'Fraud pattern detection', 'Underwriting automation'],
    gradient: 'from-blue-600 to-blue-800',
    accentColor: '#1976D2',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    description: 'Clinical documentation, patient insights, care coordination, and operational efficiency',
    useCases: ['Clinical note summarization', 'Patient journey analytics', 'Resource optimization'],
    gradient: 'from-emerald-600 to-emerald-800',
    accentColor: '#10b981',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: TrendingUp,
    description: 'Risk analysis, compliance automation, customer insights, and investment research',
    useCases: ['Regulatory compliance', 'Market sentiment analysis', 'Portfolio intelligence'],
    gradient: 'from-amber-600 to-amber-800',
    accentColor: '#f59e0b',
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    description: 'Customer experience, inventory optimization, demand forecasting, and personalization',
    useCases: ['Demand prediction', 'Customer sentiment', 'Inventory intelligence'],
    gradient: 'from-purple-600 to-purple-800',
    accentColor: '#8b5cf6',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Quality control, predictive maintenance, supply chain optimization, and safety monitoring',
    useCases: ['Defect detection', 'Equipment health', 'Supply chain resilience'],
    gradient: 'from-slate-600 to-slate-800',
    accentColor: '#64748b',
  },
]

type IndustryPackCardProps = {
  pack: typeof industryPacks[0]
  index: number
}

function IndustryPackCard({ pack, index }: IndustryPackCardProps) {
  const Icon = pack.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${pack.gradient}`} />

      <div className="p-6">
        {/* Icon and title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${pack.accentColor}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: pack.accentColor }} />
          </div>
          <h3 className="text-xl font-bold text-white">{pack.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          {pack.description}
        </p>

        {/* Use cases */}
        <div className="space-y-2 mb-4">
          {pack.useCases.map((useCase, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: pack.accentColor }}
              />
              {useCase}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: pack.accentColor }}>
          <span>Explore Pack</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

export function IndustryPacksGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {industryPacks.map((pack, index) => (
        <IndustryPackCard key={pack.id} pack={pack} index={index} />
      ))}
    </div>
  )
}

export { industryPacks }
