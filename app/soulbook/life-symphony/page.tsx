'use client';

import { motion } from 'framer-motion';
import PremiumButton from '@/components/ui/PremiumButton';

export default function LifeSymphonyPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
          Life <span className="text-amber-400">Symphony</span>
        </h1>
        <p className="text-xl text-slate-400 mb-8">
          Orchestrate your life's work into a masterpiece.
          This comprehensive program is coming soon to the Soulbook collection.
        </p>
        <PremiumButton variant="luxury" size="lg" href="/soulbook">
          Back to Soulbook
        </PremiumButton>
      </motion.div>
    </div>
  );
}
