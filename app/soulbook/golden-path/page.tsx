'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, Compass } from 'lucide-react';
import PremiumButton from '@/components/ui/PremiumButton';

export default function GoldenPathPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero with image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/soulbook/golden-path.png"
            alt="Golden Path - Accelerated 4-Week Breakthrough"
            fill
            className="object-cover opacity-50"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm text-purple-300 text-sm font-medium border border-purple-400/30">
              <Compass className="w-4 h-4" />
              <span>Accelerated Breakthrough</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-serif">
              <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Golden Path
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              Your accelerated 4-week breakthrough through the 3 most transformative pillars:
              Consciousness, Emotional Mastery, and Purpose.
            </p>

            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>4 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>8 sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>3 Core Pillars</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-8 p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          >
            <div className="text-6xl">🛤️</div>
            <h2 className="text-3xl font-bold font-serif text-white">
              Coming Soon
            </h2>
            <p className="text-xl text-white/60 max-w-xl mx-auto">
              The Golden Path is designed for rapid transformation. Focused, intensive,
              and results-driven. Join the waitlist to secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PremiumButton variant="luxury" size="lg" glow href="/soulbook">
                Back to Soulbook
              </PremiumButton>
              <PremiumButton variant="ghost" size="lg" href="/soulbook/assessment">
                Take Assessment
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
