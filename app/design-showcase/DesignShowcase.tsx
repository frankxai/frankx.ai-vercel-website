'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Rocket, Brain, Music, Zap, Star } from 'lucide-react'

import GlassBlob from '@/components/ui/GlassBlob'
import Floating3DAsset from '@/components/ui/Floating3DAsset'
import BorderBeam, { BorderBeamCard } from '@/components/ui/BorderBeam'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { cn } from '@/lib/utils'

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 0.01, 0, 1] }
  }
}

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-void overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Interactive Spline + Floating Assets
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <GlassBlob className="w-full h-full" />
        </div>

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void via-transparent to-void" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void/50 via-transparent to-void/50" />

        {/* Floating 3D Assets - Depth Composition */}
        <Floating3DAsset
          src="/images/3d/sparkles_3d.png"
          position="custom"
          positionClassName="top-[10%] left-[5%]"
          size="md"
          opacity={40}
          blur="md"
          animation="float"
          delay={0}
        />
        <Floating3DAsset
          src="/images/3d/star_3d.png"
          position="custom"
          positionClassName="top-[20%] right-[8%]"
          size="lg"
          opacity={60}
          blur="sm"
          animation="float-rotate"
          delay={1}
        />
        <Floating3DAsset
          src="/images/3d/crystal_ball_3d.png"
          position="custom"
          positionClassName="bottom-[25%] left-[10%]"
          size="xl"
          opacity={80}
          animation="float"
          delay={0.5}
        />
        <Floating3DAsset
          src="/images/3d/rocket_3d.png"
          position="custom"
          positionClassName="bottom-[15%] right-[5%]"
          size="xl"
          opacity={90}
          animation="float-rotate"
          delay={1.5}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.33, 0.01, 0, 1], delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tech-primary/30 bg-tech-glow mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-tech-primary" />
            <span className="text-sm font-mono text-tech-primary">DESIGN SYSTEM SHOWCASE</span>
          </motion.div>

          <h1 className="text-display-lg md:text-display-xl lg:text-display-2xl font-extrabold tracking-tight mb-6">
            <span className="block text-white">Where Design</span>
            <span className="block bg-gradient-to-r from-tech-primary via-tech-secondary to-soul-primary bg-clip-text text-transparent">
              Becomes Magic
            </span>
          </h1>

          <p className="text-body-lg md:text-heading-3 text-white/70 max-w-2xl mx-auto mb-10">
            Interactive 3D, glassmorphism, animated borders, and floating assets.
            This is the premium FrankX.AI design stack.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button className="group relative px-8 py-4 rounded-xl bg-tech-primary text-void font-semibold overflow-hidden transition-all hover:shadow-glow-tech">
              <span className="relative z-10">Explore Components</span>
              <div className="absolute inset-0 bg-gradient-to-r from-tech-light to-tech-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all">
              View Source
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BENTO GRID - Cards with Border Beam + 3D Assets
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-heading-1 md:text-display-lg font-bold text-white mb-4">
              The Component Library
            </h2>
            <p className="text-body-lg text-white/60 max-w-xl mx-auto">
              Every card breathes. Every border glows. Every element has purpose.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Featured Card - 2x2 */}
            <motion.div variants={item} className="md:col-span-2 md:row-span-2">
              <BorderBeamCard variant="tech" beamDuration={12} className="h-full">
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <Floating3DAsset
                    src="/images/3d/brain_3d.png"
                    position="top-right"
                    size="xl"
                    animation="float"
                  />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-glow border border-tech-primary/30 mb-4">
                      <Brain className="w-4 h-4 text-tech-primary" />
                      <span className="text-xs font-mono text-tech-primary">FEATURED</span>
                    </div>
                    <h3 className="text-heading-1 font-bold text-white mb-3">Creator Studio</h3>
                    <p className="text-body text-white/60 max-w-md">
                      The command center for AI-powered creation. Build workflows,
                      launch products, and scale your creative output.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-tech-primary to-tech-secondary border-2 border-void" />
                      ))}
                    </div>
                    <span className="text-sm text-white/50">2,847 creators active</span>
                  </div>
                </div>
              </BorderBeamCard>
            </motion.div>

            {/* Vibe OS Card */}
            <motion.div variants={item}>
              <BorderBeamCard variant="soul" beamDuration={15} className="h-full">
                <div className="relative h-full p-6">
                  <Floating3DAsset
                    src="/images/3d/music_3d.png"
                    position="top-right"
                    size="lg"
                    animation="float-rotate"
                  />
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <Music className="w-8 h-8 text-soul-primary mb-3" />
                      <h3 className="text-heading-3 font-bold text-white">Vibe OS</h3>
                      <p className="text-sm text-white/50 mt-2">AI music creation</p>
                    </div>
                    <div className="flex items-center gap-2 text-soul-primary">
                      <span className="text-xs font-mono">500+ tracks</span>
                    </div>
                  </div>
                </div>
              </BorderBeamCard>
            </motion.div>

            {/* Innovation Lab Card */}
            <motion.div variants={item}>
              <BorderBeamCard variant="hybrid" beamDuration={18} className="h-full">
                <div className="relative h-full p-6">
                  <Floating3DAsset
                    src="/images/3d/dna_3d.png"
                    position="top-right"
                    size="lg"
                    animation="rotate"
                    duration={20}
                  />
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <Zap className="w-8 h-8 text-hybrid mb-3" />
                      <h3 className="text-heading-3 font-bold text-white">Innovation Lab</h3>
                      <p className="text-sm text-white/50 mt-2">Experimental AI tools</p>
                    </div>
                    <div className="flex items-center gap-2 text-hybrid">
                      <span className="text-xs font-mono">BETA</span>
                    </div>
                  </div>
                </div>
              </BorderBeamCard>
            </motion.div>

            {/* Stats Row - 3 cards */}
            {[
              { icon: Rocket, label: 'Projects Launched', value: '1,247', color: 'tech' },
              { icon: Star, label: 'Creator Rating', value: '4.9', color: 'soul' },
              { icon: Sparkles, label: 'AI Generations', value: '50K+', color: 'tech' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={item}>
                <GlassmorphicCard
                  variant="premium"
                  gradient="aurora"
                  border="subtle"
                  hover
                  className="h-full"
                >
                  <div className="p-6 flex flex-col h-full justify-between">
                    <stat.icon className={cn(
                      'w-6 h-6',
                      stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                    )} />
                    <div>
                      <div className={cn(
                        'text-heading-1 font-bold',
                        stat.color === 'tech' ? 'text-tech-primary' : 'text-soul-primary'
                      )}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/50">{stat.label}</div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GLASSMORPHIC SHOWCASE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tech-primary/10 rounded-full blur-[200px]" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-soul-primary/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-heading-1 md:text-display-lg font-bold text-white mb-4">
              Glassmorphism Variants
            </h2>
            <p className="text-body text-white/60">
              Three tiers of glass depth for different use cases.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {(['default', 'premium', 'luxury'] as const).map((variant, i) => (
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <GlassmorphicCard
                  variant={variant}
                  gradient="aurora"
                  border={i === 2 ? 'glow' : i === 1 ? 'accent' : 'subtle'}
                  hover
                  className="h-[300px]"
                >
                  <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <code className="text-xs font-mono text-tech-primary bg-tech-glow px-2 py-1 rounded">
                        variant=&quot;{variant}&quot;
                      </code>
                    </div>
                    <div>
                      <h3 className="text-heading-3 font-bold text-white capitalize mb-2">
                        {variant}
                      </h3>
                      <p className="text-sm text-white/50">
                        {variant === 'default' && 'Subtle backdrop blur, light glass effect'}
                        {variant === 'premium' && 'Enhanced blur, deeper glass with noise'}
                        {variant === 'luxury' && 'Maximum blur, rich depth, glow border'}
                      </p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Floating3DAsset
            src="/images/3d/gem_3d.png"
            position="custom"
            positionClassName="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="xl"
            animation="float-rotate"
          />

          <h2 className="text-heading-1 md:text-display-lg font-bold text-white mb-6 mt-16">
            Ready to Build Something
            <span className="block bg-gradient-to-r from-tech-primary to-soul-primary bg-clip-text text-transparent">
              Unforgettable?
            </span>
          </h2>

          <p className="text-body-lg text-white/60 mb-10 max-w-xl mx-auto">
            This design system is ready for production.
            Every component is tested, accessible, and performant.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-tech-primary to-tech-secondary text-void font-semibold hover:shadow-glow-tech transition-all">
              Get Started
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:border-white/40 transition-all">
              View Documentation
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
