'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import PremiumButton from '@/components/ui/PremiumButton'

const dotPattern =
  'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'

export default function SoulbookHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-black"
    >
      {/* AI-generated hero image background */}
      <div className="absolute inset-0">
        <Image
          src="/images/soulbook/hero-soulbook.png"
          alt="Soulbook hero background"
          fill
          className="object-cover opacity-40"
          priority
          quality={90}
          aria-hidden="true"
        />
      </div>

      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-midnight-950/80 to-black/90" />
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${dotPattern}")` }}
      />

      {/* Floating manuscript pages */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute w-64 h-80 rounded-lg opacity-10',
              'border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent'
            )}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 20}%`,
              rotate: (i - 2) * 8,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [(i - 2) * 8, (i - 2) * 8 + 2, (i - 2) * 8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Golden glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]"
          style={{ left: '10%', top: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-yellow-500/8 blur-[100px]"
          style={{ right: '10%', bottom: '20%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
        >
          <span className="text-amber-400 text-sm font-medium">The Soulbook Framework</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Write Your Life
          </span>
          <br />
          <span className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white/90">
            Into Masterpiece
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          A transformative journey through 7 pillars of conscious living.
          Discover who you truly are and create the life you were born to live.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PremiumButton
            variant="luxury"
            size="lg"
            glow
            href="#life-books"
            ariaLabel="Explore the three Life Book programs"
          >
            Explore Life Books
          </PremiumButton>
          <PremiumButton
            variant="ghost"
            size="lg"
            href="/free-playbook"
            ariaLabel="Download the free Soulbook playbook"
          >
            Free Playbook
          </PremiumButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
