# Vibe OS Components Library
## Glassmorphic Aurora Design System

### Core Component Specifications

---

## 1. NAVIGATION COMPONENTS

### A. Primary Navigation Header
```tsx
// components/vibe-os/NavigationHeader.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { containers, typography, focusRings, touchTargets } from '@/lib/responsive'
import { contrast, patterns } from '@/lib/accessibility'

interface NavigationItem {
  label: string
  href: string
  badge?: string
}

const navigationItems: NavigationItem[] = [
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Login', href: '/login' }
]

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <GlassmorphicCard
      variant="premium"
      gradient="aurora"
      border="subtle"
      className="fixed top-0 z-50 w-full backdrop-blur-xl"
    >
      <nav className={`${containers.content} ${containers.mobilePadding} py-4`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-aurora-400 to-pulse-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className={`${typography.h6} ${contrast.textOnDark} font-bold`}>
              VIBE OS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  ${typography.bodySmall} ${contrast.textOnDarkSecondary}
                  ${focusRings.default} ${touchTargets.minimum}
                  hover:text-aurora-400 transition-colors duration-200
                  relative group py-2
                `}
              >
                {item.label}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-pulse-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aurora-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-gradient-to-r from-aurora-500 to-pulse-500 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-aurora-500/25 transition-all duration-300">
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${touchTargets.comfortable} ${contrast.textOnDark} p-2`}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-white/10"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`${typography.body} ${contrast.textOnDarkSecondary} hover:text-aurora-400 transition-colors py-2`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button className="bg-gradient-to-r from-aurora-500 to-pulse-500 text-white px-6 py-3 rounded-xl font-medium mt-4">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </GlassmorphicCard>
  )
}
```

---

## 2. HERO SECTION COMPONENTS

### A. Hero Section Main
```tsx
// components/vibe-os/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { containers, typography, forms, flexPatterns } from '@/lib/responsive'
import { contrast } from '@/lib/accessibility'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Aurora Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-950 via-midnight-900 to-nebula-950" />

        {/* Aurora animations */}
        <motion.div
          className="absolute inset-0 bg-aurora-vortex opacity-60"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        <motion.div
          className="absolute inset-0 bg-pulse-halo opacity-40"
          animate={{
            backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Content */}
      <div className={`relative z-10 ${containers.content} ${containers.mobilePadding} min-h-screen ${flexPatterns.center} pt-20`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Headline */}
          <h1 className={`${typography.display} ${contrast.textOnDark} font-bold mb-6 leading-tight`}>
            <span className="block">Transform Ideas</span>
            <span className="block bg-gradient-to-r from-aurora-400 via-pulse-400 to-aurora-500 bg-clip-text text-transparent">
              Into Music
            </span>
            <span className="block">At the Speed of Thought</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${typography.bodyLarge} ${contrast.textOnDarkSecondary} mb-8 max-w-3xl mx-auto leading-relaxed`}
          >
            Vibe OS is the premium AI music creation system that transforms your ideas
            into flow-state optimized music. Complete workflow from conception to distribution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${forms.buttonGroup} mb-12`}
          >
            <button className="bg-gradient-to-r from-aurora-500 to-pulse-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-aurora-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>Start Creating</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button className="border border-aurora-400/30 text-aurora-400 px-8 py-4 rounded-xl font-semibold hover:bg-aurora-400/10 hover:border-aurora-400/50 transition-all duration-300 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <GlassmorphicCard variant="luxury" gradient="aurora" border="glow" className="p-4 max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-midnight-800 to-midnight-900 rounded-xl overflow-hidden relative">
                {/* Video placeholder with play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-aurora-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-aurora-400/30 hover:bg-aurora-500/30 transition-colors">
                    <svg className="w-8 h-8 text-aurora-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Interface mockup overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/50 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-aurora-500/20 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-2 bg-aurora-400/30 rounded-full mb-2">
                          <div className="h-full w-3/4 bg-aurora-400 rounded-full" />
                        </div>
                        <div className="text-xs text-aurora-300">Creating: Ambient Focus Track</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-aurora-400/50 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-aurora-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

---

## 3. FEATURE COMPONENTS

### A. Feature Card
```tsx
// components/vibe-os/FeatureCard.tsx
'use client'

import { motion } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { typography } from '@/lib/responsive'
import { contrast } from '@/lib/accessibility'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accent?: 'aurora' | 'pulse' | 'nebula'
  index?: number
}

const accentColors = {
  aurora: {
    icon: 'text-aurora-400',
    glow: 'bg-aurora-400/20',
    border: 'border-aurora-400/30'
  },
  pulse: {
    icon: 'text-pulse-400',
    glow: 'bg-pulse-400/20',
    border: 'border-pulse-400/30'
  },
  nebula: {
    icon: 'text-nebula-400',
    glow: 'bg-nebula-400/20',
    border: 'border-nebula-400/30'
  }
}

export default function FeatureCard({
  icon,
  title,
  description,
  accent = 'aurora',
  index = 0
}: FeatureCardProps) {
  const colors = accentColors[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <GlassmorphicCard
        variant="luxury"
        gradient="aurora"
        border="accent"
        className="p-8 h-full group cursor-pointer"
      >
        <div className="text-center">
          {/* Icon with glow effect */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className={`absolute inset-0 ${colors.glow} blur-xl rounded-full group-hover:blur-2xl transition-all duration-300`} />
            <div className={`relative w-full h-full flex items-center justify-center ${colors.icon}`}>
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className={`${typography.h4} ${contrast.textOnDark} font-bold mb-4 group-hover:text-${accent}-400 transition-colors`}>
            {title}
          </h3>

          {/* Description */}
          <p className={`${typography.body} ${contrast.textOnDarkSecondary} leading-relaxed`}>
            {description}
          </p>

          {/* Hover indicator */}
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            className={`h-0.5 ${colors.glow.replace('/20', '')} mx-auto mt-6 transition-all duration-300`}
          />
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}
```

### B. Feature Icons
```tsx
// components/vibe-os/FeatureIcons.tsx
export const IdeaCaptureIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
)

export const AIComposerIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

export const FlowOptimizerIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

export const StudioSuiteIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
)

export const DistributionIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

export const AnalyticsIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
```

---

## 4. PRICING COMPONENTS

### A. Pricing Card
```tsx
// components/vibe-os/PricingCard.tsx
'use client'

import { motion } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import { typography, touchTargets, focusRings } from '@/lib/responsive'
import { contrast } from '@/lib/accessibility'

interface PricingTier {
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  ctaText: string
  ctaLink: string
}

interface PricingCardProps extends PricingTier {
  index: number
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
  ctaText,
  ctaLink,
  index
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${popular ? 'z-10 scale-105' : 'z-0'}`}
    >
      {/* Popular badge */}
      {popular && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="bg-gradient-to-r from-pulse-500 to-aurora-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>POPULAR</span>
          </div>
        </motion.div>
      )}

      <GlassmorphicCard
        variant={popular ? "luxury" : "premium"}
        gradient={popular ? "pulse" : "aurora"}
        border={popular ? "glow" : "accent"}
        hover={true}
        className={`p-8 h-full ${popular ? 'border-pulse-400/50' : ''}`}
      >
        <div className="text-center">
          {/* Tier name */}
          <h3 className={`${typography.h4} ${contrast.textOnDark} font-bold mb-4`}>
            {name}
          </h3>

          {/* Price */}
          <div className="mb-6">
            <span className={`${typography.h2} ${contrast.textOnDark} font-bold`}>
              ${price.toLocaleString()}
            </span>
            <span className={`${typography.body} ${contrast.textOnDarkSecondary} ml-2`}>
              /lifetime
            </span>
          </div>

          {/* Description */}
          <p className={`${typography.bodySmall} ${contrast.textOnDarkSecondary} mb-8`}>
            {description}
          </p>

          {/* Features list */}
          <ul className="space-y-4 mb-8 text-left">
            {features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + featureIndex * 0.1 }}
                className={`${typography.bodySmall} ${contrast.textOnDarkSecondary} flex items-start space-x-3`}
              >
                <svg className="w-5 h-5 text-aurora-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href={ctaLink}
            className={`
              block w-full
              ${touchTargets.comfortable} ${focusRings.primary}
              ${popular
                ? 'bg-gradient-to-r from-pulse-500 to-aurora-500 text-white hover:shadow-xl hover:shadow-pulse-500/25'
                : 'border border-aurora-400/30 text-aurora-400 hover:bg-aurora-400/10 hover:border-aurora-400/50'
              }
              px-6 py-4 rounded-xl font-semibold text-center
              transition-all duration-300 hover:scale-105
            `}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {ctaText}
          </motion.a>
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}
```

---

## 5. SHARED UTILITY COMPONENTS

### A. Section Container
```tsx
// components/vibe-os/SectionContainer.tsx
import { containers, spacing } from '@/lib/responsive'
import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'aurora' | 'midnight'
  spacing?: 'tight' | 'normal' | 'loose'
}

const backgroundStyles = {
  default: '',
  aurora: 'bg-aurora-vortex opacity-30',
  midnight: 'bg-midnight-radial opacity-40'
}

const spacingStyles = {
  tight: containers.sectionSpacingTight,
  normal: containers.sectionSpacing,
  loose: containers.sectionSpacingLoose
}

export default function SectionContainer({
  children,
  className = '',
  background = 'default',
  spacing = 'normal'
}: SectionContainerProps) {
  return (
    <section className={`relative ${spacingStyles[spacing]} ${className}`}>
      {background !== 'default' && (
        <div className={`absolute inset-0 ${backgroundStyles[background]}`} />
      )}
      <div className={`relative z-10 ${containers.content} ${containers.mobilePadding}`}>
        {children}
      </div>
    </section>
  )
}
```

### B. Animated Counter
```tsx
// components/vibe-os/AnimatedCounter.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}
```

### C. Loading States
```tsx
// components/vibe-os/LoadingStates.tsx
'use client'

import { motion } from 'framer-motion'

export const SpinnerLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-aurora-400/30 border-t-aurora-400 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export const PulseLoader = () => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-3 h-3 bg-aurora-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </div>
)

export const SkeletonLoader = ({ className }: { className?: string }) => (
  <motion.div
    className={`bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded ${className}`}
    animate={{
      backgroundPosition: ['200% 0', '-200% 0'],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }}
    style={{
      backgroundSize: '200% 100%'
    }}
  />
)
```

This component library provides a complete foundation for building the Vibe OS landing page with consistent glassmorphic styling, aurora theming, and professional interactions that maintain the premium positioning while ensuring accessibility and performance.