'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'cyan' | 'purple' | 'emerald' | 'yellow'
  intensity?: 'subtle' | 'medium' | 'strong'
  tiltEnabled?: boolean
}

export default function InteractiveCard({
  children,
  className = '',
  glowColor = 'cyan',
  intensity = 'medium',
  tiltEnabled = true
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  const glowColors = {
    cyan: 'rgba(6, 182, 212, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    emerald: 'rgba(16, 185, 129, 0.3)',
    yellow: 'rgba(245, 158, 11, 0.3)'
  }

  const glowIntensities = {
    subtle: '0_0_20px',
    medium: '0_0_30px',
    strong: '0_0_50px'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (tiltEnabled) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 ${className}`}
      style={
        tiltEnabled
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: `${glowIntensities[intensity]}_${glowColors[glowColor]}`,
        borderColor: isHovered ? `${glowColor === 'cyan' ? 'rgb(6, 182, 212)' : glowColor === 'purple' ? 'rgb(168, 85, 247)' : glowColor === 'emerald' ? 'rgb(16, 185, 129)' : 'rgb(245, 158, 11)'}50` : 'rgb(255, 255, 255, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          background: `linear-gradient(135deg, ${glowColor === 'cyan' ? 'rgb(6, 182, 212)' : glowColor === 'purple' ? 'rgb(168, 85, 247)' : glowColor === 'emerald' ? 'rgb(16, 185, 129)' : 'rgb(245, 158, 11)'}, transparent, ${glowColor === 'cyan' ? 'rgb(147, 51, 234)' : glowColor === 'purple' ? 'rgb(236, 72, 153)' : glowColor === 'emerald' ? 'rgb(59, 130, 246)' : 'rgb(239, 68, 68)'})`
        }}
      />

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                glowColor === 'cyan' ? 'bg-cyan-400' :
                glowColor === 'purple' ? 'bg-purple-400' :
                glowColor === 'emerald' ? 'bg-emerald-400' :
                'bg-yellow-400'
              }`}
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 200,
                opacity: 0
              }}
              animate={{
                y: [null, -20, -40],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Content with 3D transform */}
      <div
        className="relative z-10"
        style={{
          transform: tiltEnabled ? 'translateZ(20px)' : undefined
        }}
      >
        {children}
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"
          style={{
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-out'
          }}
        />
      </motion.div>
    </motion.div>
  )
}