import Link from 'next/link'
import { ArrowRight, Home, Search, BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import PremiumButton from '@/components/ui/PremiumButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            404
          </div>
          <motion.div
            className="w-24 h-24 mx-auto mb-6"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)]">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Intelligence Not Found
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Even our most sophisticated AI agents couldn't locate this page.
            Let's guide you back to the knowledge you're seeking.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          <GlassmorphicCard
            variant="premium"
            hover
            className="p-6 group cursor-pointer"
          >
            <Link href="/" className="block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <Home className="w-6 h-6 text-purple-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-100 group-hover:text-purple-200 transition-colors">
                    Intelligence Hub
                  </h3>
                  <p className="text-sm text-slate-400">
                    Return to home base
                  </p>
                </div>
              </div>
            </Link>
          </GlassmorphicCard>

          <GlassmorphicCard
            variant="premium"
            hover
            className="p-6 group cursor-pointer"
          >
            <Link href="/search" className="block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Search className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-100 group-hover:text-blue-200 transition-colors">
                    Search Hub
                  </h3>
                  <p className="text-sm text-slate-400">
                    Find what you need
                  </p>
                </div>
              </div>
            </Link>
          </GlassmorphicCard>

          <GlassmorphicCard
            variant="premium"
            hover
            className="p-6 group cursor-pointer"
          >
            <Link href="/guides" className="block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                    Guides
                  </h3>
                  <p className="text-sm text-slate-400">
                    Implementation wisdom
                  </p>
                </div>
              </div>
            </Link>
          </GlassmorphicCard>

          <GlassmorphicCard
            variant="premium"
            hover
            className="p-6 group cursor-pointer"
          >
            <Link href="/products" className="block">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Sparkles className="w-6 h-6 text-green-300" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-100 group-hover:text-green-200 transition-colors">
                    Products
                  </h3>
                  <p className="text-sm text-slate-400">
                    Premium resources
                  </p>
                </div>
              </div>
            </Link>
          </GlassmorphicCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-slate-400 mb-6">
            Or start your conscious AI journey with our free assessment
          </p>

          <PremiumButton
            href="/soul-frequency-assessment"
            variant="luxury"
            size="lg"
            glow
          >
            Start AI Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </PremiumButton>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-700/30"
        >
          <p className="text-sm text-slate-500">
            Still can't find what you're looking for?{' '}
            <Link
              href="mailto:hello@frankx.ai"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Contact our team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}