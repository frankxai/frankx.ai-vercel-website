"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/generated-2025-10-24T23-14-28-940Z-j02d4g.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-arcanea-void/30 to-frankx-cloud" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
        >
          Where Enterprise AI
          <br />
          <span className="gradient-text">Meets Your Creative Soul</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/95 font-light leading-relaxed drop-shadow-lg"
        >
          I went from building AI systems for Fortune 500s to creating my first song at midnight.
          Now I'm here to awaken the <span className="font-semibold text-frankx-gold">generative creator in you</span> through
          soul-aligned technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 bg-frankx-gold text-arcanea-void rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
            Discover Your Creative OS
          </button>
          <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold text-lg hover:bg-white/30 transition-colors border-2 border-white/40">
            Explore Communities
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-white/90"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-frankx-gold">10,000+</div>
            <div className="text-sm uppercase tracking-wider">Creators Awakened</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-frankx-gold">1,000+</div>
            <div className="text-sm uppercase tracking-wider">Songs Released</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-frankx-gold">∞</div>
            <div className="text-sm uppercase tracking-wider">Possibilities Unlocked</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
