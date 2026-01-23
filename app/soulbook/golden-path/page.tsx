'use client';

import { motion } from 'framer-motion';
import PremiumButton from '@/components/ui/PremiumButton';

export default function GoldenPathPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          The <span className="text-gold-400">Golden Path</span>
        </h1>
        <p className="text-xl text-slate-400 mb-8">
          Discover your true purpose and align your daily actions with your destiny.
          This transformative journey is coming soon.
        </p>
        <PremiumButton variant="luxury" size="lg" href="/soulbook">
          Back to Soulbook
        </PremiumButton>
      </motion.div>
    </div>
  );
}
