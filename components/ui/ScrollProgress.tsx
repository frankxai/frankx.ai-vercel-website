'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #10B981, #06B6D4, #3B82F6)',
      }}
    />
  )
}
