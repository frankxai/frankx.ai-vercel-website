'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Heart,
  Brain,
  Users,
  Target,
  Compass,
  Zap,
  Check,
  Star,
  Quote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 7 Pillars Data
const pillars = [
  {
    id: 1,
    name: 'Consciousness',
    icon: Brain,
    color: '#AB47C7',
    description: 'Awaken your inner awareness and transcend limiting beliefs',
    angle: 0,
  },
  {
    id: 2,
    name: 'Connection',
    icon: Heart,
    color: '#F59E0B',
    description: 'Build authentic relationships and deepen human bonds',
    angle: 51.43,
  },
  {
    id: 3,
    name: 'Community',
    icon: Users,
    color: '#43BFE3',
    description: 'Create impact through collective consciousness',
    angle: 102.86,
  },
  {
    id: 4,
    name: 'Purpose',
    icon: Target,
    color: '#10B981',
    description: 'Align your actions with your deepest calling',
    angle: 154.29,
  },
  {
    id: 5,
    name: 'Direction',
    icon: Compass,
    color: '#F59E0B',
    description: 'Navigate life with clarity and intentional choices',
    angle: 205.71,
  },
  {
    id: 6,
    name: 'Energy',
    icon: Zap,
    color: '#AB47C7',
    description: 'Master your vitality and cultivate unlimited potential',
    angle: 257.14,
  },
  {
    id: 7,
    name: 'Expression',
    icon: Sparkles,
    color: '#43BFE3',
    description: 'Unleash your creative force and authentic voice',
    angle: 308.57,
  },
]

const pricingTiers = [
  {
    name: 'Foundation',
    price: 97,
    description: 'Begin your transformation',
    features: [
      'Complete 7 Pillars Framework',
      'Life Symphony Workbook',
      'Digital Access to Resources',
      'Community Forum Access',
      'Monthly Group Calls',
    ],
    popular: false,
  },
  {
    name: 'Mastery',
    price: 297,
    description: 'Accelerate your growth',
    features: [
      'Everything in Foundation',
      'Golden Path Coaching Program',
      '1-on-1 Monthly Sessions',
      'Personalized Development Plan',
      'Priority Support',
      'Advanced Workshops',
    ],
    popular: true,
  },
  {
    name: 'Architect',
    price: 897,
    description: 'Full transformation experience',
    features: [
      'Everything in Mastery',
      'Weekly 1-on-1 Coaching',
      'Custom Framework Design',
      'Direct Access to Frank',
      'VIP Retreat Access',
      'Lifetime Community Membership',
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Tech Entrepreneur',
    content:
      "The Soulbook transformed how I approach both business and life. Frank's 7 Pillars gave me a framework I never knew I needed.",
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    content:
      'Life Symphony unlocked a level of creative expression I thought was impossible. This is more than a framework—it\'s a movement.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Executive Coach',
    content:
      "I've studied personal development for 20 years. The Soulbook is the most comprehensive and actionable system I've encountered.",
    rating: 5,
  },
]

function AnimatedParticles() {
  const particles = Array.from({ length: 50 })
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function PillarConstellation() {
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null)
  const centerRadius = 200

  return (
    <div className="relative mx-auto h-[600px] w-full max-w-3xl md:h-[700px]">
      {/* Center Hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl"
        style={{
          boxShadow: '0 0 60px rgba(171, 71, 199, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
        animate={{
          boxShadow: [
            '0 0 60px rgba(171, 71, 199, 0.3)',
            '0 0 80px rgba(67, 191, 227, 0.4)',
            '0 0 60px rgba(171, 71, 199, 0.3)',
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="text-center">
          <div className="text-xs font-semibold text-white/90">SOUL</div>
          <div className="text-xs font-semibold text-white/90">BOOK</div>
        </div>
      </motion.div>

      {/* Connection Lines */}
      {pillars.map((pillar) => {
        const angle = (pillar.angle * Math.PI) / 180
        const x = Math.cos(angle) * centerRadius
        const y = Math.sin(angle) * centerRadius

        return (
          <motion.line
            key={`line-${pillar.id}`}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${x}px)`}
            y2={`calc(50% + ${y}px)`}
            stroke={selectedPillar === pillar.id ? pillar.color : 'rgba(255, 255, 255, 0.1)'}
            strokeWidth="2"
            className="absolute inset-0"
            style={{ transformOrigin: 'center' }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: pillar.id * 0.1 }}
            component="line"
          />
        )
      })}

      {/* Pillar Nodes */}
      {pillars.map((pillar, index) => {
        const angle = (pillar.angle * Math.PI) / 180
        const x = Math.cos(angle) * centerRadius
        const y = Math.sin(angle) * centerRadius
        const Icon = pillar.icon
        const isSelected = selectedPillar === pillar.id

        return (
          <motion.div
            key={pillar.id}
            className="absolute left-1/2 top-1/2 cursor-pointer"
            style={{
              x: x - 40,
              y: y - 40,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setSelectedPillar(pillar.id)}
            onHoverEnd={() => setSelectedPillar(null)}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full blur-xl"
              style={{ backgroundColor: pillar.color }}
              animate={{
                opacity: isSelected ? 0.4 : 0.2,
                scale: isSelected ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Node */}
            <div
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full backdrop-blur-xl"
              style={{
                backgroundColor: `${pillar.color}15`,
                border: `2px solid ${pillar.color}40`,
                boxShadow: isSelected ? `0 0 30px ${pillar.color}60` : 'none',
              }}
            >
              <Icon className="mb-1 h-6 w-6" style={{ color: pillar.color }} />
              <div className="text-[9px] font-semibold text-white/90">{pillar.name}</div>
            </div>

            {/* Description Tooltip */}
            <motion.div
              className="absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-black/80 p-3 text-center backdrop-blur-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isSelected ? 1 : 0,
                y: isSelected ? 0 : -10,
                pointerEvents: isSelected ? 'auto' : 'none',
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xs leading-relaxed text-white/80">{pillar.description}</p>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function SoulbookPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0a0a0b] to-cyan-900/20" />
        <AnimatedParticles />

        {/* Liquid Gradient */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white/90">
                By Frank van den Bergh
              </span>
            </div>

            <h1 className="mb-6 text-balance text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
              The <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Soulbook</span>
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-pretty text-xl leading-relaxed text-white/70 md:text-2xl">
              A revolutionary framework for conscious living. Transform your life through 7 foundational pillars, creative expression, and purpose alignment.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-purple-500/70"
              >
                <span className="relative z-10">Begin Your Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10"
              >
                Explore the Framework
              </Button>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="text-sm text-white/50">Scroll to explore</div>
            <div className="h-12 w-6 rounded-full border-2 border-white/30">
              <motion.div
                className="mx-auto mt-2 h-2 w-2 rounded-full bg-white/50"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Three Life Books Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-balance text-5xl font-bold text-white md:text-6xl">
              Three <span className="bg-gradient-to-r from-gold-400 to-amber-400 bg-clip-text text-transparent">Life Books</span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
              The Soulbook is built on three interconnected systems that guide your transformation
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Life Symphony',
                subtitle: 'Creative Expression',
                description: 'Compose the masterpiece of your life through authentic creative expression and artistic flow',
                color: '#AB47C7',
                icon: Sparkles,
              },
              {
                title: 'Golden Path',
                subtitle: 'Purpose Alignment',
                description: 'Discover and walk your unique path toward fulfillment, aligned with your deepest purpose',
                color: '#F59E0B',
                icon: Compass,
              },
              {
                title: '7 Pillars',
                subtitle: 'Foundation Framework',
                description: 'Build an unshakeable foundation through the seven pillars of conscious, intentional living',
                color: '#43BFE3',
                icon: Target,
              },
            ].map((book, index) => {
              const Icon = book.icon
              return (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group relative h-full overflow-hidden border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all hover:bg-white/[0.05]">
                    {/* Gradient Accent */}
                    <div
                      className="absolute left-0 top-0 h-1 w-full"
                      style={{ backgroundColor: book.color }}
                    />

                    {/* Glow on Hover */}
                    <motion.div
                      className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity group-hover:opacity-20"
                      style={{ backgroundColor: book.color }}
                    />

                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${book.color}20` }}>
                      <Icon className="h-8 w-8" style={{ color: book.color }} />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-white">{book.title}</h3>
                    <div className="mb-4 text-sm font-medium" style={{ color: book.color }}>
                      {book.subtitle}
                    </div>
                    <p className="leading-relaxed text-white/60">{book.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7 Pillars Interactive Constellation */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-balance text-5xl font-bold text-white md:text-6xl">
              The <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">7 Pillars</span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
              Hover over each pillar to explore the foundation of conscious living
            </p>
          </motion.div>

          <PillarConstellation />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative overflow-hidden py-32">
        {/* Ambient Animation */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-white/10 bg-white/[0.03] p-12 backdrop-blur-xl md:p-16">
                <Quote className="mb-8 h-12 w-12 text-purple-400" />
                
                <blockquote className="mb-8 text-balance text-3xl font-medium leading-relaxed text-white md:text-4xl">
                  "The Soulbook is not just a framework—it's a mirror reflecting your highest potential, a compass guiding you home to yourself."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500" />
                  <div>
                    <div className="font-semibold text-white">Frank van den Bergh</div>
                    <div className="text-sm text-white/60">Creator of FrankX & The Soulbook</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-balance text-5xl font-bold text-white md:text-6xl">
              Transformation <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
              Real people, real transformations through the Soulbook framework
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                  <div className="mb-6 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  <p className="mb-6 leading-relaxed text-white/80">
                    "{testimonial.content}"
                  </p>

                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="mb-6 text-balance text-5xl font-bold text-white md:text-6xl">
              Choose Your <span className="bg-gradient-to-r from-gold-400 to-amber-400 bg-clip-text text-transparent">Path</span>
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/60">
              Every journey begins with a single step. Select the path that resonates with your transformation
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={tier.popular ? 'md:-mt-8' : ''}
              >
                <Card
                  className={`relative h-full border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl ${
                    tier.popular ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-1 text-sm font-semibold text-white">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="mb-2 text-2xl font-bold text-white">{tier.name}</h3>
                    <p className="text-sm text-white/60">{tier.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">${tier.price}</span>
                      <span className="text-white/60">/one-time</span>
                    </div>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                        <span className="leading-relaxed text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.popular
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                        : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                    variant={tier.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    Start {tier.name}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-32">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-6 text-balance text-5xl font-bold text-white md:text-6xl">
              Your transformation begins <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">now</span>
            </h2>
            
            <p className="mx-auto mb-12 max-w-2xl text-pretty text-xl leading-relaxed text-white/70">
              Join thousands who have transformed their lives through the Soulbook framework. The journey of a lifetime awaits.
            </p>

            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 px-12 py-6 text-lg text-white shadow-2xl shadow-purple-500/40 transition-all hover:shadow-purple-500/60"
            >
              <span className="relative z-10">Begin Your Soulbook Journey</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <div className="mb-2 text-xl font-bold text-white">FrankX</div>
              <div className="text-sm text-white/60">© 2026 All rights reserved</div>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
