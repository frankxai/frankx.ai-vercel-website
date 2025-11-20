'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function LiquidHeroPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Hero Section with Liquid Morphing */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated liquid blob background */}
        <motion.div
          className="absolute inset-0"
          style={{ y, opacity }}
        >
          {/* Multiple morphing blobs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-500 to-red-500 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -50, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/showcase"
              className="inline-block mb-8 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← Back to Showcase
            </Link>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-purple-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Liquid
            <br />
            Design
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Fluid animations that morph and flow like water.
            Experience design that moves with purpose.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with Morphing Cards */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Fluid Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Morphing', desc: 'Smooth shape transitions', color: 'from-purple-500 to-pink-500' },
              { title: 'Flowing', desc: 'Natural movement patterns', color: 'from-cyan-500 to-blue-500' },
              { title: 'Adaptive', desc: 'Responds to interaction', color: 'from-pink-500 to-red-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-80 rounded-3xl overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Animated gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <h3 className="text-3xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.desc}</p>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Liquid Button */}
      <section className="py-32 relative overflow-hidden">
        {/* Background blobs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Ready to Flow?
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of designers creating fluid, beautiful experiences.
          </motion.p>

          <motion.button
            className="relative px-12 py-6 text-xl font-semibold rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
            <span className="relative z-10">Start Creating</span>
          </motion.button>
        </div>
      </section>
    </div>
  )
}
