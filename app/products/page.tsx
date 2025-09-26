'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Users, Download, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'
import { ContentLoader, SkeletonProduct } from '@/components/ui/LoadingStates'

const products = [
  {
    title: 'The Creative AI Toolkit',
    subtitle: 'Creative Intelligence Launch Kit',
    price: 47,
    originalPrice: 97,
    category: 'Bestseller',
    description: '100+ curated AI prompts, workflow templates, and the creative energy framework for ethical AI collaboration.',
    features: [
      'Multi-agent validated prompts',
      'Implementation roadmap',
      'Community access (30 days)',
      'Quick reference cards'
    ],
    testimonial: {
      text: "This toolkit eliminated my AI overwhelm and gave me a clear system.",
      author: "Sarah Chen",
      role: "Digital Marketing Director"
    },
    href: '/products/creative-ai-toolkit',
    badge: 'Most Popular'
  },
  {
    title: 'Agentic Creator OS Blueprint',
    subtitle: 'Build Your Agentic Creator OS',
    price: 67,
    originalPrice: 127,
    category: 'Technical',
    description: 'Complete technical specifications and implementation guide for building sophisticated AI agent teams.',
    features: [
      '6-agent team framework',
      '90-day implementation plan',
      '12 real case studies',
      'Performance monitoring dashboard'
    ],
    testimonial: {
      text: "The technical depth is incredible. I now have the capacity of a full agency team.",
      author: "Maria Santos",
      role: "Strategy Consultant"
    },
    href: '/products/agentic-creator-os',
    badge: 'Technical Excellence'
  },
  {
    title: 'Vibe OS: Suno Music Mastery',
    subtitle: 'Creative Music Systems for Visionaries',
    price: 37,
    originalPrice: 67,
    category: 'Creative',
    description: '50+ proven Suno prompts, creative workflows, and production techniques for professional music creation.',
    features: [
      '50+ genre-specific prompts',
      'Creative workflow templates',
      'Production enhancement guide',
      'Music business strategies'
    ],
    testimonial: {
      text: "My music production workflow is now 10x faster and more creative.",
      author: "Alex Rivera",
      role: "Music Producer"
    },
    href: '/products/vibe-os',
    badge: 'Creative Edge'
  }
]

const stats = [
  { number: '10,000+', label: 'Creators Transformed' },
  { number: '500K+', label: 'Hours Saved' },
  { number: '94%', label: 'Success Rate' },
  { number: '4.9/5', label: 'Average Rating' }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8"
            >
              <Shield className="w-4 h-4 mr-2" />
              Agent Team Validated
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-100 via-purple-200 to-slate-300 bg-clip-text text-transparent"
            >
              Premium Digital Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your reality with premium systems designed by the FrankX.ai Agent Team's collective intelligence
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <GlassmorphicCard
                  variant="luxury"
                  border="glow"
                  hover
                  className="h-full p-8 flex flex-col"
                >
                  {/* Badge */}
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-slate-100">
                      {product.title}
                    </h3>
                    <p className="text-purple-300 font-medium mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-200">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Testimonial */}
                    <div className="mb-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-300 italic mb-3">
                        "{product.testimonial.text}"
                      </p>
                      <div className="text-xs">
                        <span className="font-medium text-slate-200">
                          {product.testimonial.author}
                        </span>
                        <span className="text-slate-400 ml-1">
                          {product.testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl font-bold text-purple-300">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-slate-400 line-through ml-3">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <PremiumButton
                    variant="luxury"
                    size="lg"
                    glow
                    className="w-full mb-4"
                    href={product.href}
                  >
                    Get Instant Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </PremiumButton>

                  <p className="text-center text-slate-400 text-sm">
                    30-day satisfaction guarantee
                  </p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <GlassmorphicCard
              variant="premium"
              gradient="purple"
              className="p-12 max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-purple-200 bg-clip-text text-transparent">
                Ready to Transform Your Reality?
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join thousands of creators, entrepreneurs, and leaders who've already transformed their workflows with creative AI
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <PremiumButton
                  variant="luxury"
                  size="xl"
                  glow
                  href="/soul-frequency-assessment"
                >
                  Start with Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </PremiumButton>

                <div className="flex items-center text-slate-400 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Join 10,000+ transformed creators
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>
    </div>
  )
}