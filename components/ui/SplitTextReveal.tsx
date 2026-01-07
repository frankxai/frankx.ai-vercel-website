'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { motionDurations, motionSpring } from '@/lib/design/motion'

interface SplitTextRevealProps {
  text: string
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  staggerDelay?: number
}

/**
 * Animated text component that reveals words with stagger effect
 * Respects prefers-reduced-motion for accessibility
 */
export function SplitTextReveal({
  text,
  delay = 0,
  className,
  as = 'h1',
  staggerDelay = 0.08
}: SplitTextRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(' ')

  const Component = motion[as] as typeof motion.div

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: delay
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      rotateX: shouldReduceMotion ? 0 : -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        ...motionSpring.snappy,
      },
    },
  }

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={child}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            transformOrigin: 'bottom',
          }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}
