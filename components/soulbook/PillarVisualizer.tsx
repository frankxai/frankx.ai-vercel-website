'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { pillars, Pillar } from '@/lib/soulbook/pillars'

const pillarImages: Record<string, string> = {
  consciousness: '/images/soulbook/pillar-consciousness.png',
  identity: '/images/soulbook/pillar-identity.png',
  'emotional-mastery': '/images/soulbook/pillar-emotional-mastery.png',
  relationships: '/images/soulbook/pillar-relationships.png',
  vitality: '/images/soulbook/pillar-vitality.png',
  purpose: '/images/soulbook/pillar-purpose.png',
  creation: '/images/soulbook/pillar-creation.png',
}

const pillarColors: Record<string, string> = {
  amber: 'from-amber-400 to-orange-500',
  purple: 'from-purple-400 to-violet-600',
  violet: 'from-violet-400 to-purple-500',
  rose: 'from-rose-400 to-pink-500',
  emerald: 'from-emerald-400 to-green-500',
  blue: 'from-blue-400 to-cyan-500',
  gold: 'from-amber-300 to-yellow-500',
}

function PillarNode({
  pillar,
  isActive,
  isExpanded,
  onClick,
  position,
}: {
  pillar: Pillar
  isActive: boolean
  isExpanded: boolean
  onClick: () => void
  position: { x: number; y: number }
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: pillar.number * 0.1 }}
    >
      <motion.button
        onClick={onClick}
        className={cn(
          'relative w-20 h-20 rounded-full flex items-center justify-center text-2xl',
          'transition-all duration-300',
          isActive
            ? 'bg-gradient-to-br shadow-lg shadow-amber-500/30 scale-110'
            : 'bg-white/10 hover:bg-white/20'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`View ${pillar.title}`}
      >
        {/* Outer ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 transition-all duration-300',
            isActive ? 'border-amber-400' : 'border-white/10'
          )}
        />
        {/* Inner glow */}
        {isActive && (
          <div
            className={cn(
              'absolute inset-0 rounded-full opacity-50 blur-md',
              `bg-gradient-to-r ${pillar.gradient}`
            )}
          />
        )}
        {/* Icon */}
        <span className="relative z-10">{pillar.icon}</span>
        {/* Number */}
        <span className="absolute -bottom-6 text-xs font-medium text-white/50">
          {pillar.number}
        </span>
      </motion.button>

      {/* Pillar label */}
      <motion.div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center whitespace-nowrap',
          'transition-opacity duration-300',
          isExpanded ? 'opacity-100' : 'opacity-60'
        )}
      >
        <span className={cn(
          'text-sm font-medium',
          isActive ? 'text-amber-300' : 'text-white/70'
        )}>
          {pillar.shortTitle}
        </span>
      </motion.div>
    </motion.div>
  )
}

function PillarDetail({
  pillar,
  onClose,
}: {
  pillar: Pillar
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="absolute right-0 top-0 h-full w-full md:w-96"
    >
      <GlassmorphicCard
        variant="premium"
        gradient="aurora"
        className="h-full overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{pillar.icon}</span>
              <div>
                <span className="text-xs text-amber-400 font-medium">Pillar {pillar.number}</span>
                <h3 className="text-xl font-bold font-serif">{pillar.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close pillar details"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Pillar Visual */}
          {pillarImages[pillar.id] && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
              <Image
                src={pillarImages[pillar.id]}
                alt={pillar.title}
                fill
                className="object-cover"
                sizes="384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          {/* Description */}
          <p className="text-white/70 mb-6">{pillar.description}</p>

          {/* Keywords */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-white/90 mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {pillar.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Practices */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-white/90 mb-2">Practices</h4>
            <ul className="space-y-2">
              {pillar.practices.map((practice, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    `bg-gradient-to-r ${pillar.gradient}`
                  )} />
                  {practice}
                </li>
              ))}
            </ul>
          </div>

          {/* Guiding Questions */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-white/90 mb-2">Guiding Questions</h4>
            <ul className="space-y-2">
              {pillar.questions.map((question, i) => (
                <li key={i} className="text-sm text-white/60 italic">
                  "{question}"
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div>
            <h4 className="text-sm font-medium text-white/90 mb-2">Outcomes</h4>
            <ul className="space-y-2">
              {pillar.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}

export default function PillarVisualizer() {
  const [activePillar, setActivePillar] = useState<Pillar | null>(null)
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)

  // Calculate positions for 7 pillars in a circular layout
  const pillarPositions = useMemo(() => {
    const centerX = 50 // percentage
    const centerY = 50 // percentage
    const radius = 35 // percentage

    return pillars.map((pillar, i) => {
      const angle = (i * 360) / pillars.length - 90 // Start from top
      const radian = (angle * Math.PI) / 180
      return {
        x: centerX + radius * Math.cos(radian),
        y: centerY + radius * Math.sin(radian),
      }
    })
  }, [])

  // Connection paths between pillars
  const connections = useMemo(() => {
    return pillars.map((pillar, i) => {
      const nextPillar = pillars[(i + 1) % pillars.length]
      const currentPos = pillarPositions[i]
      const nextPos = pillarPositions[(i + 1) % pillars.length]

      // Calculate control points for curved path
      const midX = (currentPos.x + nextPos.x) / 2
      const midY = (currentPos.y + nextPos.y) / 2

      return {
        from: currentPos,
        to: nextPos,
        path: `M ${currentPos.x}% ${currentPos.y}% Q ${midX}% ${midY}% ${nextPos.x}% ${nextPos.y}%`,
      }
    })
  }, [pillarPositions])

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight-950 to-black" />
      <div className="absolute inset-0">
        <Image
          src="/images/soulbook/seven-pillars.png"
          alt=""
          fill
          className="object-cover opacity-10"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-midnight-950/80 to-black/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              The 7 Pillars
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Seven interconnected foundations for conscious living and personal transformation.
          </p>
        </motion.div>

        {/* Visualizer */}
        <div className="relative h-[600px] w-full">
          {/* Central core */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </div>
          </motion.div>

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(251, 191, 36, 0.3)" />
                <stop offset="100%" stopColor="rgba(251, 191, 36, 0.3)" />
              </linearGradient>
            </defs>
            {connections.map((conn, i) => (
              <motion.path
                key={i}
                d={conn.path}
                fill="none"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            ))}
          </svg>

          {/* Pillar nodes */}
          {pillars.map((pillar, i) => (
            <PillarNode
              key={pillar.id}
              pillar={pillar}
              isActive={activePillar?.id === pillar.id || hoveredPillar === pillar.number}
              isExpanded={!!activePillar}
              position={pillarPositions[i]}
              onClick={() => setActivePillar(activePillar?.id === pillar.id ? null : pillar)}
            />
          ))}

          {/* Pillar detail panel */}
          <AnimatePresence>
            {activePillar && (
              <PillarDetail
                pillar={activePillar}
                onClose={() => setActivePillar(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Interactive hint */}
        {!activePillar && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 text-sm"
          >
            Click on any pillar to explore its wisdom
          </motion.div>
        )}
      </div>
    </section>
  )
}
