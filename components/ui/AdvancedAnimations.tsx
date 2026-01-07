'use client'

import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { motionDurations, motionSpring, viewportSettings } from '@/lib/design/motion'

// Parallax Scroll Animation
export function ParallaxContainer({ children, offset = 50 }: { children: ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])
  const springY = useSpring(y, { stiffness: 400, damping: 90 })

  return (
    <motion.div ref={ref} style={{ y: springY }}>
      {children}
    </motion.div>
  )
}

// Fade In Up with Stagger (Accessibility-aware)
export function StaggerContainer({ children, staggerDelay = 0.1 }: { children: ReactNode; staggerDelay?: number }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings.once}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: shouldReduceMotion ? 0 : motionDurations.slow, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating Animation (Accessibility-aware)
export function FloatingElement({ children, duration = 6, offset = 10 }: {
  children: ReactNode;
  duration?: number;
  offset?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      animate={{
        y: [-offset, offset, -offset],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic Hover Effect
export function MagneticHover({ children, intensity = 0.3 }: { children: ReactNode; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const deltaX = (x - centerX) * intensity
    const deltaY = (y - centerY) * intensity

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  )
}

// Morphing Background
export function MorphingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// Reveal Animation
export function RevealAnimation({ children, direction = "up" }: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Typewriter Effect
export function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Glow Pulse Effect
export function GlowPulse({ children, color = "purple" }: { children: ReactNode; color?: string }) {
  const colorMap = {
    purple: 'shadow-purple-500/50',
    blue: 'shadow-blue-500/50',
    cyan: 'shadow-cyan-500/50',
    green: 'shadow-green-500/50',
    red: 'shadow-red-500/50'
  }

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px ${colorMap[color as keyof typeof colorMap]}`,
          `0 0 40px ${colorMap[color as keyof typeof colorMap]}`,
          `0 0 20px ${colorMap[color as keyof typeof colorMap]}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Smooth Page Transition
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// Interactive Card Hover
export function InteractiveCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <motion.div
        whileHover={{
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Scroll Progress Indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transform-origin-left z-50"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

// Multi-Layer Parallax for Hero Sections
export function ParallaxLayer({
  children,
  offset = -50,
  blur = 0,
  className
}: {
  children: ReactNode
  offset?: number
  blur?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])
  const springY = useSpring(y, motionSpring.gentle)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: shouldReduceMotion ? 0 : springY,
        filter: blur > 0 ? `blur(${blur}px)` : 'none'
      }}
    >
      {children}
    </motion.div>
  )
}