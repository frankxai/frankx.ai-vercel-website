'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, Music } from 'lucide-react';
import PremiumButton from '@/components/ui/PremiumButton';

export default function LifeSymphonyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero with image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/soulbook/life-symphony.png"
            alt="Life Symphony - Complete 7-Pillar Transformation"
            fill
            className="object-cover opacity-50"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm text-amber-300 text-sm font-medium border border-amber-400/30">
              <Music className="w-4 h-4" />
              <span>Complete Transformation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-serif">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Life Symphony
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              Orchestrate your complete transformation through all 7 pillars of conscious living.
              A comprehensive 12-week journey to transform every area of your life in harmony.
            </p>

            <div className="flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>12 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>24 sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>All 7 Pillars</span>
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
            <div className="text-6xl">🎼</div>
            <h2 className="text-3xl font-bold font-serif text-white">
              Coming Soon
            </h2>
            <p className="text-xl text-white/60 max-w-xl mx-auto">
              Life Symphony is being carefully crafted to deliver the most comprehensive
              transformation experience. Join the waitlist to be notified at launch.
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
